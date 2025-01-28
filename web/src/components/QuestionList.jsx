const questions = [
    "What is React?",
    "What is JSX?",
    "What is the Virtual DOM?",
    "What are hooks in React?",
    "What is useState?",
    "What is useEffect?",
    "Explain component lifecycle.",
    "What is the context API?",
    "What is Redux?",
    "What is React Router?"
  ];
  
  const QuestionList = ({ attempted }) => {
    return (
      <div className="space-y-2">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
              attempted.includes(index) ? 'bg-green-500' : 'bg-white border border-gray-400'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };
  
  export default QuestionList;
  