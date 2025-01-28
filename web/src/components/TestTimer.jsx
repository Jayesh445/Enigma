import React, { useEffect, useState } from 'react';

const TestTimer = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  };

  return (
    <div className="text-xl text-gray-700 font-bold">
      Time Remaining: {formatTime(remainingTime)}
    </div>
  );
};

export default TestTimer;
