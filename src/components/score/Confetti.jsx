import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import "./Confetti.css";

export default function COnfetti() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [show, setShow] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    setHeight(confettiRef.current.clientHeight);
    setWidth(confettiRef.current.clientWidth);
    handleShow();
  }, []);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div className="App">
      <div className="confetti-wrap" ref={confettiRef}>
        <Confetti
          recycle={show}
          numberOfPieces={200}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    </div>
  );
}
