"use client"

import React, { useState, useEffect } from "react";

const storyLines = [
  "Hello everyone!",
  "My name is Trishiet Ray. I'm 25 years old, and I live in New York City.",
  "I love it here! I work at Instagram as a software engineer.",
  "In my free time, you can find me hanging with friends, fine dining, and playing chess.",
];

export default function ConsoleGame() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex < storyLines.length) {
      const line = storyLines[currentLineIndex];
      let i = -1;
      setTyping(true);

      const interval = setInterval(() => {
        setDisplayedLines((prev) => {
          const lines = [...prev];
          if (!lines[currentLineIndex]) {
            lines[currentLineIndex] = "";
          }
          console.log(line[i], );
          lines[currentLineIndex] += line[i];
          return lines;
        });

        i++;
        if (i === line.length - 1) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [currentLineIndex]);

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter" && !typing && currentLineIndex < storyLines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typing, currentLineIndex]);

  return (
    <div style={{
      backgroundColor: "#111",
      color: "#0f0",
      fontFamily: "monospace",
      padding: "20px",
      height: "100vh",
      overflowY: "auto",
    }}>
      {displayedLines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      {!typing && <div style={{ color: "#888" }}>Press Enter to continue...</div>}
    </div>
  );
}