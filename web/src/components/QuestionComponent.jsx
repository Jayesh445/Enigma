const questions = [
    {
      question: "What is React?",
      options: ["A JavaScript library for building user interfaces", "A database management system", "A CSS framework", "A backend technology"],
      correctOptionIndex: 0,
    },
    {
      question: "What is JSX?",
      options: ["JavaScript syntax extension", "A JavaScript framework", "A JavaScript library", "A CSS property"],
      correctOptionIndex: 0,
    },
    {
      question: "What is the Virtual DOM?",
      options: ["A virtual version of the actual DOM", "A database model", "A new rendering engine", "A new JavaScript language"],
      correctOptionIndex: 0,
    },
    // Add other questions here...
  ];
  
  const QuestionComponent = ({
    questionIndex,
    markQuestionAsAttempted,
    setCurrentQuestionIndex,
  }) => {
    const currentQuestion = questions[questionIndex];
  
    const handleAnswerSelect = (index) => {
      markQuestionAsAttempted(questionIndex);
      // Optionally, you can handle answer validation here
      // If you want to validate the answer, check if the index matches currentQuestion.correctOptionIndex
      if (questionIndex < questions.length - 1) {
        setCurrentQuestionIndex(questionIndex + 1);
      }
    };
  
    const handlePrevious = () => {
      if (questionIndex > 0) {
        setCurrentQuestionIndex(questionIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (questionIndex < questions.length - 1) {
        setCurrentQuestionIndex(questionIndex + 1);
      }
    };
  
    return (
      <div className="space-y-4">
        <div className="text-2xl font-semibold">{currentQuestion.question}</div>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className="bg-blue-500 text-white p-2 w-full rounded"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="space-x-4">
          <button onClick={handlePrevious} className="bg-gray-500 text-white p-2 rounded">
            Previous
          </button>
          <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default QuestionComponent;
  