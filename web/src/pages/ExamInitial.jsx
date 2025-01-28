import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamInitial=() =>{
    const navigate = useNavigate();

    const startExam = () => {
      navigate('/exam-paper');
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">English Test</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to your English Test. Click the button below to start.</p>
        <button
          onClick={startExam}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Start Test
        </button>
      </div>
    );
  };
  
  export default ExamInitial;
 
