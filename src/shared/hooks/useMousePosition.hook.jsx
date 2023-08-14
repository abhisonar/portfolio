import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    clientX: null,
    clientY: null,
  });

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseleave", mouseStopHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseleave", mouseStopHandler);
    };
  }, []);

  const mouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({
      clientX: clientX,
      clientY: clientY,
    });
  };

  const mouseStopHandler = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({
      clientX: clientX,
      clientY: clientY,
    });
  };

  return mousePosition;
};

export default useMousePosition;
