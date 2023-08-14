import React, { useState, useEffect, useRef } from "react";
import "./cursor.scss";
import useMousePosition from "shared/hooks/useMousePosition.hook";
const Cursor = () => {
  const { clientX, clientY } = useMousePosition();
  const [cursorSize, setCursorSize] = useState({ width: 40, height: 40 });
  const [showCursor, setshowCursor] = useState(false);
  const customCursorStyle = {
    left: `${clientX}px`,
    top: `${clientY}px`,
    width: `${cursorSize.width}px`,
    height: `${cursorSize.height}px`,
    opacity: `${!showCursor ? 1 : 0}`,
  };

  const customCursorRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = (e: any) => {
    const { width, height } = e.target.getBoundingClientRect();
    setCursorSize({ width, height });
    setshowCursor(true);
    console.log(e.target);
  };

  const onMouseLeave = (e: any) => {
    setCursorSize({ width: 40, height: 40 });
    setshowCursor(false);
  };

  useEffect(() => {
    const hoverElement = document.querySelectorAll(".custom-cursor-hover");
    console.log(hoverElement);

    hoverElement.forEach((ele) => {
      ele.addEventListener("mouseenter", onMouseEnter);
      ele.addEventListener("mouseleave", onMouseLeave);
    });
    return () => {
      hoverElement.forEach((ele) => {
        ele.removeEventListener("mouseenter", onMouseEnter);
        ele.addEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={customCursorRef}
      className={`custom-cursor`}
      style={customCursorStyle}
    ></div>
  );
};

export default Cursor;
