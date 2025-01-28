const StartButton = ({ startTest }) => {
    return (
      <button
        onClick={startTest}
        className="bg-blue-500 text-white p-3 rounded-full text-lg"
      >
        Start Test
      </button>
    );
  };
  
  export default StartButton;
  