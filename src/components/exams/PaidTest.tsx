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
import { useRouter } from "next/navigation";
import axios from "axios";

// TypeScript Interfaces
interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// Updated Question distribution with fixed question counts per standard
const questionDistributions: { [standard: string]: { subjects: { [subject: string]: number } } } = {
  "5": {
    subjects: {
      English: 20,
      Mathematics: 25,
      Mental_ability: 10,
      Science: 25,
      Social_Science: 20,
    },
  },
  "6": {
    subjects: {
      English: 20,
      Mathematics: 25,
      Mental_ability: 10,
      Science: 25,
      Social_Science: 20,
    },
  },
  "7": {
    subjects: {
      English: 20,
      Mathematics: 25,
      Mental_ability: 10,
      Science: 25,
      Social_Science: 20,
    },
  },
  "8": {
    subjects: {
      English: 20,
      Mathematics: 25,
      Mental_ability: 10,
      Science: 25,
      Social_Science: 20,
    },
  },
  "9": {
    subjects: {
      English: 20,
      Mathematics: 25,
      Mental_ability: 10,
      Science: 25,
      Social_Science: 20,
    },
  },
  "10": {
    subjects: {
      English: 10,
      Mathematics: 35,
      Mental_ability: 10,
      Science: 35,
      Social_Science: 10,
    },
  },
};

// Helper Functions

// Fetch User Standard from API
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

// Fetch Questions for a Specific Subject
const fetchQuestions = async (std: string, subject: string): Promise<Question[]> => {
  const fileName = `${std}/${std}_${subject}.json`;
  try {
    const response = await fetch(`/questions/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions for ${subject}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions for ${subject}:`, error);
    throw error;
  }
};

// Get Random Questions from All Questions
const getRandomQuestions = (num: number, allQuestions: Question[]): Question[] => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// PaidTest Component
const PaidTest: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();

  // State Variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Full-Screen Management Functions
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Failed to enter full-screen:", err);
      });
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit full-screen:", err);
      });
    }
  };

  // Enter Full-Screen on Mount and Exit on Unmount
  useEffect(() => {
    enterFullScreen();

    return () => {
      exitFullScreen();
    };
  }, []);

  // Visibility Change Handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsTimerPaused(true);
        setIsWarningVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isTimerPaused]);

  // Timer Management
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

  // Load Questions on Mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const std = await fetchUserStandard(token);

        const subjectDistribution = questionDistributions[std].subjects;
        const totalQuestions = Object.values(subjectDistribution).reduce((a, b) => a + b, 0);
        setTotalQuestions(totalQuestions);

        const allQuestions: Question[] = [];

        // Fetch questions in parallel
        const questionsPromises = Object.entries(subjectDistribution).map(async ([subject, count]) => {
          const questions = await fetchQuestions(std, subject);
          const selected = getRandomQuestions(count, questions);
          return selected;
        });

        const questionsArrays = await Promise.all(questionsPromises);
        questionsArrays.forEach((questions) => allQuestions.push(...questions));

        setSelectedQuestions(allQuestions);

        setTimeLeft(45);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
  }, [token]);

  // Handle Option Selection
  const handleOptionClick = (option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  // Handle Answer Submission
  const handleSubmit = async () => {
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      const confirmed = window.confirm("Are you sure you want to submit the exam?");
      if (confirmed) {
        try {
          const totalMarks = calculateMarks();
          const storedToken = localStorage.getItem("token");
          if (!storedToken) {
            throw new Error("Token not found");
          }
          const parsedToken = JSON.parse(storedToken) as string;

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/gio-event/storeMarks`,
            { marks: totalMarks },
            { headers: { Authorization: `Bearer ${parsedToken}` } }
          );

          if (response.status === 200) {
            setSubmitted(true);
            exitFullScreen(); // Exit full-screen upon submission
            router.push('/gio-event/quiz-done');
          }
        } catch (error) {
          console.error("Error submitting marks:", error);
        }
      }
    } else {
      if (!submitted) {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          handleNextQuestion();
        }, 1000);
      }
    }
  };

  // Calculate Total Marks
  const calculateMarks = () => {
    return userAnswers.reduce((total, answer, index) => {
      if (answer === null || answer === undefined) return total; // Skipped question
      return answer === selectedQuestions[index].answer ? total + 4 : total - 1;
    }, 0);
  };

  // Handle Moving to Next Question
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 >= totalQuestions) {
      handleSubmit(); // Automatically submit when last question is reached
    } else {
      setTimeLeft(45);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, handleSubmit]);

  // Handle Skip Question
  const handleSkip = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = null; // Mark as skipped
    setUserAnswers(newAnswers);
    handleNextQuestion();
  };

  // Handle Continue After Warning
  const handleContinue = () => {
    setIsWarningVisible(false);
    setIsTimerPaused(false);
    handleNextQuestion();
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <React.Fragment>
      <Card className="w-full max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        {submitted ? (
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-center text-[#FF2D55] mb-6">
              PaidTest Results
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
                  <p className="text-[#FF2D55]">
                    {userAnswers[index] !== null && userAnswers[index] !== undefined ? userAnswers[index] : "Skipped"}
                  </p>
                  <p className="font-semibold mt-2">Correct Answer:</p>
                  <p className="text-green-600">{question.answer}</p>
                  <p className="font-semibold mt-2">Explanation:</p>
                  <p>{question.explanation}</p>
                  {userAnswers[index] === question.answer ? (
                    <p className="mt-2 text-green-600">
                      <CheckCircle2 className="inline" /> Correct!
                    </p>
                  ) : userAnswers[index] === null || userAnswers[index] === undefined ? (
                    <p className="mt-2 text-yellow-600">
                      <Clock className="inline" /> Skipped!
                    </p>
                  ) : (
                    <p className="mt-2 text-red-600">
                      <XCircle className="inline" /> Wrong!
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#FF2D55] hover:bg-[#FF1A47]"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="relative">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-[#FF2D55]">
                  PaidTest
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
                  Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                </h3>
                <p className="text-gray-700">{currentQuestion?.question}</p>
              </div>
              <RadioGroup
                value={userAnswers[currentQuestionIndex] || ""}
                onValueChange={handleOptionClick}
                className="space-y-3"
                disabled={isTimerPaused}
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
                      } ${isTimerPaused ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="sr-only"
                        disabled={isTimerPaused}
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
                {currentQuestionIndex + 1 >= totalQuestions ? "Submit" : "Next Question"}
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
                  You've left the browser
                </h2>
                <p className="mb-6">Your quiz will pause until you return.</p>
                <Button onClick={handleContinue} className="bg-[#FF2D55] hover:bg-[#FF1A47]">
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submission Animation */}
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
                  className="text-center"
                >
                  <p className="text-xl font-semibold">Processing...</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </React.Fragment>
  );
};

export default PaidTest;
