"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export default function Component() {
  const [selectedOption, setSelectedOption] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !submitted) {
      setSubmitted(true)
    }
  }, [timeLeft, submitted])

  const handleSubmit = () => {
    if (selectedOption && !submitted) {
      setSubmitted(true)
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 1000)
    }
  }

  const options = [
    { value: "paris", label: "Paris" },
    { value: "london", label: "London" },
    { value: "berlin", label: "Berlin" },
    { value: "madrid", label: "Madrid" },
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="relative">
        <CardTitle className="text-2xl font-bold text-[#FF2D55]">Geography Quiz</CardTitle>
        <CardDescription>Test your knowledge of world capitals</CardDescription>
        <div className="absolute top-4 right-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#FF2D55]" />
          <span className="font-semibold text-[#FF2D55]">{timeLeft}s</span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={(timeLeft / 30) * 100} className="mb-4" />
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Question 1 of 1</h3>
          <p className="text-gray-700">What is the capital of France?</p>
        </div>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
          {options.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Label
                htmlFor={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === option.value
                    ? "bg-[#FF2D55] text-white"
                    : "bg-background hover:bg-[#FFE5EA] hover:text-[#FF2D55]"
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                {option.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption || submitted}
          className="w-full bg-[#FF2D55] hover:bg-[#FF1A47]"
        >
          {submitted ? "Submitted" : "Submit Answer"}
        </Button>
      </CardFooter>
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
                {selectedOption === "paris" ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {submitted && !showAnimation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 mt-4 rounded-b-lg"
        >
          {selectedOption === "paris" ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2" />
              <span>Correct! Paris is indeed the capital of France.</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="mr-2" />
              <span>Sorry, that's incorrect. The correct answer is Paris.</span>
            </div>
          )}
        </motion.div>
      )}
    </Card>
  )
}