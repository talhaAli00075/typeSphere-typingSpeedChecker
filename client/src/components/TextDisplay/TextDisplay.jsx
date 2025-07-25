import React, { useState, useEffect, useRef } from "react";
import "./TextDisplay.css";
import axios from "axios";

const TextDisplay = ({
  retryPara,
  para,
  slectedTimmer,
  resultToggle,
  resultset,
}) => {
  const [timeLeft, setTimeLeft] = useState(slectedTimmer);
  const [userTypedInput, setUserTypedInput] = useState("");
  const [visibleInput, setVisibleInput] = useState("");
  const [isTypingStart, setIsTypingStart] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setUserTypedInput("");
    setVisibleInput("");
    setTimeLeft(slectedTimmer);
    setIsTypingStart(false);
    setSaveMessage("");
  }, [para, slectedTimmer]);

  useEffect(() => {
    if (!isTypingStart || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;
        if (updated === 0) {
          calculateResult();
        }
        return updated;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isTypingStart]);

  const calculateResult = () => {
    const correctChars = visibleInput
      .split("")
      .filter((char, i) => char === para[i]).length;

    const totalTyped = userTypedInput.length;
    const accuracy = Math.round((correctChars / (totalTyped || 1)) * 100);
    const wpm = Math.round((correctChars / 5) / (slectedTimmer / 60));
    const wrongTyped = totalTyped - correctChars;

    const resultData = {
      wpm,
      accuracy,
      totalTyped,
      wrongTyped,
      timer: slectedTimmer,
    };

    resultset(resultData);
    resultToggle(true);
    saveResult(resultData);
  };

  const saveResult = async (data) => {
    const userId = localStorage.getItem("userId");

    console.log("User ID before saving:", userId);
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      setSaveMessage("Login required to save result.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/save-result", {
        userId,
        ...data,
      });
      console.log("Result saved:", res.data);
      setSaveMessage("Result saved successfully.");
    } catch (error) {
      console.error("Error saving result:", error);
      setSaveMessage("Failed to save result.");
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (!isTypingStart) setIsTypingStart(true);

    if (key === "Backspace") {
      setUserTypedInput((prev) => prev.slice(0, -1));
      setVisibleInput((prev) => prev.slice(0, -1));
      return;
    }

    if (key.length !== 1) return;

    const currentIndex = visibleInput.length;
    if (currentIndex >= para.length) return;

    const currentChar = para[currentIndex];

    setUserTypedInput((prev) => prev + key);

    if (key === currentChar) {
      const newVisible = visibleInput + key;
      setVisibleInput(newVisible);

      if (newVisible.length === para.length) {
        calculateResult();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleInput, isTypingStart]);

  const renderParagraph = () => {
    return para.split("").map((char, index) => {
      let className = "default";

      if (index < visibleInput.length) {
        className = visibleInput[index] === char ? "correct" : "incorrect";
      } else if (index === visibleInput.length) {
        className = "cursor";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="display-main">
      <div className="text-timer">
        <p>{timeLeft}</p>
      </div>

      <div className="text-area" onClick={() => inputRef.current?.focus()}>
        <p className="paragraph">{renderParagraph()}</p>
        <input
          ref={inputRef}
          className="hidden-input"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <div className="text-repeat">
        <img
          src="/images/icons8-repeat-50.png"
          alt="refresh"
          onClick={retryPara}
        />
      </div>

      {saveMessage && <p className="save-message">{saveMessage}</p>}
    </div>
  );
};

export default TextDisplay;
