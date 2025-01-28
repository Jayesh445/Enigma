import { useState } from "react";
import EmotionActionDetector from "./Face";

function Button({ children, onClick, isActive, isCompleted }) {
  return (
    <button
      className={`h-14 w-14 text-sm font-medium text-xl rounded-lg  ${
        isCompleted ? "bg-green-500 text-white" : isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return <div className="rounded-lg border bg-white p-4 shadow-md">{children}</div>;
}

const reactQuestions = [
  { id: 1, text: "What is React?", options: ["A library", "A framework", "A language", "A database"] },
  { id: 2, text: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON Syntax"] },
  { id: 3, text: "What hook is used for state management?", options: ["useEffect", "useReducer", "useState", "useMemo"] },
  { id: 4, text: "What is the virtual DOM?", options: ["A real DOM", "A lightweight copy of the DOM", "A component", "A database"] },
  { id: 5, text: "What does useEffect do?", options: ["Manages side effects", "Handles state", "Renders components", "Fetches CSS"] },
  { id: 6, text: "How do you pass data to a child component?", options: ["Props", "State", "Context", "Redux"] },
  { id: 7, text: "Which method is used to update the state?", options: ["setState", "updateState", "modifyState", "changeState"] },
  { id: 8, text: "What is the use of keys in lists?", options: ["To identify elements uniquely", "To order elements", "To delete elements", "To change elements"] },
  { id: 9, text: "What is React Router used for?", options: ["Navigation", "State management", "Styling", "Animations"] },
  { id: 10, text: "What is a Higher Order Component?", options: ["A component that renders another component", "A hook", "A method", "A state manager"] },
  { id: 11, text: "What is the purpose of useContext?", options: ["To share state between components", "To modify state", "To fetch data", "To create components"] },
  { id: 12, text: "What does useRef return?", options: ["A mutable reference", "A function", "A component", "A DOM element"] },
  { id: 13, text: "What is the main advantage of React?", options: ["Reusability of components", "Speed", "Security", "Database management"] },
  { id: 14, text: "What is Redux used for?", options: ["State management", "Routing", "Styling", "Animation"] },
  { id: 15, text: "Which hook is used for performance optimization?", options: ["useMemo", "useState", "useEffect", "useContext"] },
  { id: 16, text: "How do you create a React component?", options: ["Function or class", "Variable", "JSON", "Loop"] },
  { id: 17, text: "What does React.Fragment do?", options: ["Groups elements without adding extra nodes", "Renders a div", "Adds styles", "Handles errors"] },
  { id: 18, text: "What is an uncontrolled component?", options: ["A component that manages its own state", "A component that has no props", "A component with useEffect", "A component that is not used"] },
  { id: 19, text: "Which hook helps to cache computed values?", options: ["useMemo", "useEffect", "useState", "useReducer"] },
  { id: 20, text: "What is Prop Drilling?", options: ["Passing props through multiple levels", "A debugging tool", "An API call", "A React Router method"] },
];

export default function FullScreenQuiz() {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [testSubmitted, setTestSubmitted] = useState(false);
  const question = reactQuestions.find(q => q.id === selectedQuestion);

  const handleAnswerSelect = (option) => {
    setAnswers(prev => ({ ...prev, [selectedQuestion]: option }));
  };

  const handleSubmit = () => {
    setCompletedQuestions(prev => new Set([...prev, selectedQuestion]));
    const nextQuestion = selectedQuestion < 20 ? selectedQuestion + 1 : null;
    setSelectedQuestion(nextQuestion);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6">
      <div className="grid w-full  grid-cols-4 gap-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="col-span-1 space-y-2 border-r pr-4">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Questions:</h2>
          <div className="grid grid-cols-4 gap-2">
            {reactQuestions.map(({ id }) => (
              <Button key={id} onClick={() => setSelectedQuestion(id)} isActive={selectedQuestion === id} isCompleted={completedQuestions.has(id)}>
                {id}
              </Button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <Card>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">{question?.text}</h3>
            <div className="space-y-2">
              {question?.options.map((option, idx) => (
                <button key={idx} className="block w-full rounded-lg border p-3 text-left hover:bg-gray-100" onClick={() => handleAnswerSelect(option)}>
                  {option}
                </button>
              ))}
            </div>
          </Card>
          {selectedQuestion ? (
            <button className="mt-4 w-full rounded-lg bg-green-500 p-3 text-white hover:bg-green-600" onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button className="mt-4 w-full rounded-lg bg-red-500 p-3 text-white hover:bg-red-600" onClick={handleSubmitTest}>
              Submit Test
            </button>
          )}
        </div>
        <div className="col-span-1"><EmotionActionDetector/></div>
      </div>
      {testSubmitted && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-lg font-bold">Test Submitted!</div>}
    </div>
  );
}
