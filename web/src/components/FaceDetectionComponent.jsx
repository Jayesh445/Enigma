const FaceDetectionComponent = () => {
    return (
      <div className="bg-gray-200 h-full flex items-center justify-center p-4">
        <div className="text-center">Face Detection Model Output</div>
        <video id="user-video" className="w-full h-full" autoPlay></video>
      </div>
    );
  };
  
  export default FaceDetectionComponent;
  