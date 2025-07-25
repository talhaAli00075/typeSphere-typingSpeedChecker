import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import "./App.css";
import ControlBar from "./components/ControlBar/ControlBar";
import TextDisplay from "./components/TextDisplay/TextDisplay";
import Footer from "./components/Footer/Footer";
import { useTyping } from "./hooks/useTyping";
import Result from "./components/Result/Result";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const {
    paragraph,
    handleChange,
    handleChangeCapital,
    handleChangePunc,
    handleChangeNumber,
  } = useTyping();

  const [timeSlect, settimeSlect] = useState(60);
  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState({
    wpm: 0,
    accuracy: 0,
    totalTyped: 0,
    wrongTyped: 0,
  });
  const [showResult, setShowResult] = useState(false);

  // Get user ID from localStorage on load
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    console.log(localStorage)
  }, []);

  return (
    <BrowserRouter>
      <Header refreshPara={handleChange} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-main">
              <div className="app-container">
                {!showResult && (
                  <>
                    <ControlBar
                      normalRefresh={handleChange}
                      refreshPunc={handleChangePunc}
                      refreshNum={handleChangeNumber}
                      refreshCap={handleChangeCapital}
                      slectTimer={settimeSlect}
                    />
                    <TextDisplay
                      retryPara={handleChange}
                      para={paragraph}
                      slectedTimmer={timeSlect}
                      resultToggle={setShowResult}
                      resultset={setResult}
                      resultActualData={result}
                      userId={userId} // 👈 passed to TextDisplay
                    />
                  </>
                )}

                {showResult && <Result {...result} />}
              </div>
            </div>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
