import React from "react";
import './Result.css'

const Result = ({wpm , accuracy, totalTyped , wrongTyped}) => {
  let noteImprove = `You have typed a total of ${totalTyped} characters, among which ${wrongTyped} were incorrect, reflecting slight inaccuracies in your typing performance.`;
  let grade = `default`;

  if (wpm <= 10 && accuracy <= 50) {
    noteImprove = `You typed ${totalTyped} characters, with ${wrongTyped} incorrect entries. Your current typing speed is ${wpm} WPM with ${accuracy}% accuracy. This indicates major room for improvement. Begin with slow, focused drills and home-row key mastery. Your fundamentals need attention.`;
    grade = `Grade: F - Beginner Level`;
  }

  else if (wpm <= 20 && accuracy <= 60) {
    noteImprove = `You typed ${totalTyped} characters, and made ${wrongTyped} mistakes. Your speed of ${wpm} WPM and ${accuracy}% accuracy show basic familiarity with the keyboard, but frequent errors are holding you back. Prioritize accuracy over speed. Practice 15 minutes daily on structured lessons.`;
    grade = `Grade: E - Below Average`;
  }

  else if (wpm <= 30 && accuracy <= 70) {
    noteImprove = `Out of ${totalTyped} characters typed, ${wrongTyped} were incorrect. With ${wpm} WPM and ${accuracy}% accuracy, your typing shows developing control, but error rate is still significant. Use typing tests to track progress. Consistency is key.`;
    grade = `Grade: D - Developing`;
  }

  else if (wpm <= 40 && accuracy >= 75) {
    noteImprove = `You typed ${totalTyped} characters and made ${wrongTyped} mistakes. Your typing speed of ${wpm} WPM with ${accuracy}% accuracy is decent. You're building rhythm but need to reduce errors. Focus on high-accuracy typing in coming sessions.`;
    grade = `Grade: C - Average`;
  }

  else if (wpm <= 50 && accuracy >= 80) {
    noteImprove = `Great progress! You typed ${totalTyped} characters with ${wrongTyped} incorrect. Your ${wpm} WPM speed and ${accuracy}% accuracy reflect growing proficiency. You're ready for real-world typing tasks. Work on consistency with longer sessions.`;
    grade = `Grade: B - Competent`;
  }

  else if (wpm <= 60 && accuracy >= 90) {
    noteImprove = `Excellent job! You typed ${totalTyped} characters with only ${wrongTyped} wrong inputs. ${wpm} WPM at ${accuracy}% accuracy shows strong efficiency. Keep refining your pace and try technical passages for further mastery.`;
    grade = `Grade: A - Proficient`;
  }

  else if (wpm > 60 && accuracy >= 95) {
    noteImprove = `Outstanding performance! Out of ${totalTyped} characters typed, only ${wrongTyped} were incorrect. You're typing at ${wpm} WPM with ${accuracy}% accuracy — ideal for professional environments and exams. Maintain with advanced drills.`;
    grade = `Grade: A+ - Expert Typist`;
  }

  else {
    noteImprove = `Typing data is inconsistent. You typed ${totalTyped} characters with ${wrongTyped} errors. Please retry the test with a stable internet connection or check your device.`;
    grade = `Grade: N/A`;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px"}} className="resut-main">
      <div className="result-container">
        <img src="/images/keyboardNewTranspenenetsst.png" alt="" />
        <div className="result-actual">
      <h2>Typing Test Complete</h2>
      <p id="wpm"><strong>WPM: </strong> {wpm}</p>
      <p id="accuracy"><strong>Accuracy:</strong> {accuracy}%</p>
      <p id="wrong"><strong id="strong">Performance Review: </strong>{noteImprove}<span>{grade}</span></p>
      <button onClick={() => window.location.reload()}>Restart</button>
      </div>
        <img src="/images/keyboardNewTranspenenetsst.png" alt="" />
      </div>
    </div>
  );
};

export default Result;
