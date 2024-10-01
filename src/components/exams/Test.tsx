"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import axios from "axios";

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// Updated Question distribution with fixed question counts
const questionDistributions: {
  [standard: string]: {
    subjects: {
      [subject: string]: number;
    };
  };
} = {
  "5": {
    subjects: {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    },
  },
  "6": {
    subjects: {
      English: 1,
      Mathematics: 1,
      Mental_ability: 1,
      Science: 1,
      Social_Science: 1,
    },
  },
  "7": {
    subjects: {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    },
  },
  "8": {
    subjects: {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    },
  },
  "9": {
    subjects: {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    },
  },
  "10": {
    subjects: {
      English: 5,
      Mathematics: 5,
      Mental_ability: 5,
      Science: 5,
      Social_Science: 5,
    },
  },
};

// Function to calculate fixed questions per subject
const calculateQuestionsPerSubject = (std: string) => {
  const distribution = questionDistributions[std];
  if (!distribution) {
    throw new Error(`No distribution found for standard ${std}`);
  }
  return distribution.subjects;
};

const fetchUserStandard = async (token: string): Promise<string> => {
  try {
    const storedToken = JSON.parse(localStorage.getItem("token") || "null");

    if (!storedToken) {
      throw new Error("Token not found");
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/getUserStd`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    return data.std;
  } catch (error) {
    console.error("Error fetching user standard:", error);
    throw new Error("Failed to fetch user standard");
  }
};

const fetchQuestions = async (
  std: string,
  branch: string
): Promise<Question[]> => {
  const fileName = `${std}/${std}_${branch}.json`;
  try {
    const response = await fetch(`/questions/${fileName}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch questions for ${branch}. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions for ${branch}:`, error);
    throw error;
  }
};

const getRandomQuestions = (
  num: number,
  allQuestions: Question[]
): Question[] => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Quiz: React.FC<{ token: string }> = ({ token }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showAnimation, setShowAnimation] = useState(false);

  // States for warning modal
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // State for final submission confirmation modal
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);

  // Function to enter full-screen mode
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen:", err);
      });
    }
  };

  // Function to exit full-screen mode
  const exitFullScreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit full-screen:", err);
      });
    }
  };

  // useEffect to handle full-screen
  useEffect(() => {
    // Enter full-screen when the quiz starts
    enterFullScreen();

    // Cleanup: Exit full-screen when component unmounts
    return () => {
      exitFullScreen();
    };
  }, []);

  // useEffect to handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User has left the tab
        setIsTimerPaused(true);
        setIsWarningVisible(true);
      } else if (document.visibilityState === "visible" && isTimerPaused) {
        // User has returned to the tab
        // Wait for the user to click "Continue"
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isTimerPaused]);

  // useEffect for timer management
  useEffect(() => {
    if (isTimerPaused || submitted) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isTimerPaused, submitted]);

  // Function to load questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const std = await fetchUserStandard(token);

        const questionCounts = calculateQuestionsPerSubject(std);

        const allQuestions: Question[] = [];

        for (const [branch, count] of Object.entries(questionCounts)) {
          const questions = await fetchQuestions(std, branch);
          const selected = getRandomQuestions(count, questions);
          allQuestions.push(...selected);
        }

        setSelectedQuestions(allQuestions);

        // Initialize userAnswers with nulls for each question
        setUserAnswers(Array(allQuestions.length).fill(null));

        setTimeLeft(45);
      } catch (error) {
        console.error("Error loading questions:", error);
        // Optionally, set an error state to inform the user
      }
    };

    loadQuestions();
  }, [token]);

  const handleOptionClick = (option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!submitted && userAnswers[currentQuestionIndex]) {
      if (currentQuestionIndex === selectedQuestions.length - 1) {
        // If it's the last question, show confirmation modal
        setIsFinalSubmit(true);
      } else {
        // Regular submission for non-last questions
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          if (currentQuestionIndex < selectedQuestions.length - 1) {
            handleNextQuestion();
          } else {
            setSubmitted(true);
            storeMarks();
          }
        }, 1000);
      }
    }
  };

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(45);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }, []);

  const handleContinue = () => {
    setIsWarningVisible(false);
    setIsTimerPaused(false);
    handleNextQuestion();
  };

  const handleSkip = () => {
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      // If it's the last question, directly show results
      setIsFinalSubmit(true);
    } else {
      // Move to the next question without recording an answer
      handleNextQuestion();
    }
  };

  const calculateMarks = () => {
    return userAnswers.reduce((total, answer, index) => {
      if (answer === null) return total; // Skip if no answer (skipped)
      return answer === selectedQuestions[index].answer ? total + 4 : total - 1;
    }, 0);
  };

  const storeMarks = async () => {
    try {
      const totalMarks = calculateMarks();
      const storedToken = JSON.parse(localStorage.getItem("token") || "null");

      if (!storedToken) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/storeMockMarks`,
        { marks: totalMarks },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      // Optionally handle response
    } catch (error) {
      console.error("Error storing marks:", error);
      // Optionally, display an error message to the user
      alert("There was an error saving your score. Please try again later.");
    }
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <React.Fragment>
      <Card className="w-full max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {submitted ? (
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-center text-[#FF2D55] mb-6">
              Quiz Results
            </h2>
            <h4 className="text-xl text-center mb-4">
              Score: {calculateMarks()} out of {selectedQuestions.length * 4}
            </h4>
            <div className="space-y-4">
              {selectedQuestions.map((question, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm">
                  <p className="font-semibold">Question:</p>
                  <p>{question.question}</p>
                  <p className="font-semibold mt-2">Your Answer:</p>
                  <p className="text-gray-700">
                    {userAnswers[index] || "Skipped"}
                  </p>
                  <p className="font-semibold mt-2">Correct Answer:</p>
                  <p className="text-green-600">{question.answer}</p>
                  <p className="font-semibold mt-2">Explanation:</p>
                  <p>{question.explanation}</p>
                  {userAnswers[index] === question.answer ? (
                    <p className="mt-2 text-green-600 flex items-center">
                      <CheckCircle2 className="inline mr-1" /> Correct!
                    </p>
                  ) : userAnswers[index] ? (
                    <p className="mt-2 text-red-600 flex items-center">
                      <XCircle className="inline mr-1" /> Wrong!
                    </p>
                  ) : (
                    <p className="mt-2 text-yellow-600 flex items-center">
                      <Clock className="inline mr-1" /> Skipped!
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6 space-y-4">
              {/* Adds space between buttons */}
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#FF2D55] hover:bg-[#FF1A47]"
              >
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = "/gio-event")} // Change to use history for routing
                className="bg-[#FF2D55] hover:bg-[#FF1A47]"
              >
                Return to Page
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="relative">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-[#FF2D55]">
                  Quiz
                </CardTitle>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#FF2D55]" />
                  <span className="font-semibold text-[#FF2D55]">
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <CardDescription>Answer the question below:</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(timeLeft / 45) * 100} className="mb-4" />

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Question {currentQuestionIndex + 1} of{" "}
                  {selectedQuestions.length}
                </h3>
                <p className="text-gray-700">{currentQuestion?.question}</p>
              </div>
              <RadioGroup
                value={userAnswers[currentQuestionIndex] || ""}
                onValueChange={handleOptionClick}
                className="space-y-3"
                disabled={isTimerPaused} // Disable options if timer is paused
              >
                {currentQuestion?.options.map((option) => (
                  <motion.div
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        userAnswers[currentQuestionIndex] === option
                          ? "bg-[#FF2D55] text-white"
                          : "bg-background hover:bg-[#FFE5EA] hover:text-[#FF2D55]"
                      } ${
                        isTimerPaused ? "opacity-50 cursor-not-allowed" : ""
                      }`} // Conditional styling
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="sr-only"
                        disabled={isTimerPaused} // Disable input if timer is paused
                      />
                      {option}
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={handleSkip}
                disabled={submitted}
                className="bg-gray-500 hover:bg-gray-600 text-blue-500"


              >
                Skip
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted}
                className="bg-[#FF2D55] hover:bg-[#FF1A47]"
              >
                Submit Answer
              </Button>
            </CardFooter>
          </>
        )}

        {/* Warning Modal */}
        <AnimatePresence>
          {isWarningVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-2xl font-bold mb-4">
                  You've Left the Browser
                </h2>
                <p className="mb-6">Your quiz will pause until you return.</p>
                <Button
                  onClick={handleContinue}
                  className="bg-[#FF2D55] hover:bg-[#FF1A47]"
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Submission Confirmation Modal */}
        <AnimatePresence>
          {isFinalSubmit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-2xl font-bold mb-4">Submit Quiz</h2>
                <p className="mb-6">
                  Are you sure you want to submit your final answers?
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => {
                      setIsFinalSubmit(false);
                      setShowAnimation(true);
                      setTimeout(() => {
                        setShowAnimation(false);
                        setSubmitted(true);
                        storeMarks();
                      }, 1000);
                    }}
                    className="bg-[#FF2D55] hover:bg-[#FF1A47]"
                  >
                    Yes, Submit
                  </Button>
                  <Button
                    onClick={() => setIsFinalSubmit(false)}
                    className="bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Overlay */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* You can add a spinner or any animation here */}
                  <Clock className="w-8 h-8 text-[#FF2D55] animate-spin" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </React.Fragment>
  );
};

export default Quiz;
