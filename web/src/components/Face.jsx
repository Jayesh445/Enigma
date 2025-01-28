import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

const EmotionActionDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [emotion, setEmotion] = useState("Detecting...");
  const [lastPosition, setLastPosition] = useState(null);
  const [lastEyeMovement, setLastEyeMovement] = useState(null);
  const [eyeMovementStartTime, setEyeMovementStartTime] = useState(null);
  const [gazeDirection, setGazeDirection] = useState("center");

  const [positionTimeout, setPositionTimeout] = useState(null);
  const [eyeMovementTimeout, setEyeMovementTimeout] = useState(null);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Path to face-api.js models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      startVideo();
    };

    loadModels();
  }, []);

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Detect emotions, highlight face, and check gaze
  useEffect(() => {
    const detectEmotionAndGaze = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections.length > 0) {
          const detection = detections[0];
          const emotions = detection.expressions;
          const maxEmotion = Object.keys(emotions).reduce((a, b) => (emotions[a] > emotions[b] ? a : b));

          // Check for tension or nervousness
          if (maxEmotion === "fear" || maxEmotion === "surprised" || maxEmotion === "disgust") {
            setEmotion("Suspicious behavior detected (nervousness)");
          } else {
            setEmotion(maxEmotion);
          }

          // Check if user moved significantly
          const { x, y } = detection.detection.box;
          if (lastPosition) {
            const distance = Math.sqrt(Math.pow(x - lastPosition.x, 2) + Math.pow(y - lastPosition.y, 2));
            if (distance > 50) {  // Reduced distance threshold to trigger position alert faster
              if (positionTimeout) clearTimeout(positionTimeout);
              setPositionTimeout(setTimeout(() => {
                alert("Please stay in your position and do not move!");
              }, 200)); // Reduced alert delay to 500ms
            }
          }
          setLastPosition({ x, y });

          // Check gaze direction (e.g., looking away from screen)
          const landmarks = detection.landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const leftEyeCenter = { x: (leftEye[0].x + leftEye[3].x) / 2, y: (leftEye[1].y + leftEye[5].y) / 2 };
          const rightEyeCenter = { x: (rightEye[0].x + rightEye[3].x) / 2, y: (rightEye[1].y + rightEye[5].y) / 2 };

          const eyeDistance = Math.abs(leftEyeCenter.x - rightEyeCenter.x);

          // Track gaze direction and alert if user looks away
          if (eyeDistance > 40) {  // Reduced threshold for eye movement
            if (eyeMovementStartTime === null) {
              setEyeMovementStartTime(Date.now()); // Start tracking the eye movement time
            }

            if (eyeMovementStartTime && Date.now() - eyeMovementStartTime > 200 && !eyeMovementTimeout) {  // Reduced waiting time before triggering alert
              setEyeMovementTimeout(setTimeout(() => {
                alert("Please do not peek or move your eyes aside!");
                setEyeMovementStartTime(null); // Reset tracking after alert
              }, 200)); // Show alert faster
            }
          } else {
            setEyeMovementStartTime(null);
            if (eyeMovementTimeout) {
              clearTimeout(eyeMovementTimeout);
              setEyeMovementTimeout(null);
            }
          }

          // Update gaze direction (left, right, center)
          if (leftEyeCenter.x < video.videoWidth / 3) {
            setGazeDirection("left");
          } else if (leftEyeCenter.x > (video.videoWidth * 2) / 3) {
            setGazeDirection("right");
          } else {
            setGazeDirection("center");
          }

          // Alert if user looks away (left or right)
          if (gazeDirection !== "center" && !eyeMovementTimeout) {
            setEyeMovementTimeout(setTimeout(() => {
              alert("Please focus on the screen!");
            }, 300)); // Reduced alert time for gaze away from center
          }

          setLastEyeMovement(eyeDistance);

          // Draw a square around the face on the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const { width, height } = detection.detection.box;
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);
        } else {
          setEmotion("No face detected");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    if (!loading) {
      const interval = setInterval(() => {
        detectEmotionAndGaze();
      }, 100);  // Decreased interval for faster detection

      return () => clearInterval(interval);
    }
  }, [loading, lastPosition, lastEyeMovement, eyeMovementStartTime, gazeDirection]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tension and Gaze Detector</h1>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={() => setLoading(false)}
          className="rounded-lg shadow-md"
          style={{ position: "absolute", top: 0, left: 0}}
        />
        <canvas
          ref={canvasRef}
          className="rounded-lg"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg">Detected Emotion: <span className="font-bold text-blue-600">{emotion}</span></p>
      </div>
    </div>
  );
};

export default EmotionActionDetector;
