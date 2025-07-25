import React from "react";
import "./ControlBar.css";

const ControlBar = ({
  normalRefresh,
  refreshPunc,
  refreshNum,
  refreshCap,
  slectTimer
}) => {
  return (
    <div className="control-main">
      <div className="control-container">
        <div className="control-numPunc">
          <img src="/images/numbers-link.png" alt="" onClick={refreshNum} />
          <img src="/images/puctuation-link.png" alt="" onClick={refreshPunc} />
        </div>
        <div className="extra-space"></div>
        <div className="control-norCapQuo">
          <img src="/images/normal-link.png" alt="" onClick={normalRefresh} />
          <img src="/images/capital-link.png" alt="" onClick={refreshCap} />
          <img src="/images/quates-link.png" alt="" />
        </div>
        <div className="extra-space"></div>
        <div className="control-timer">
          <img src="/images/time-link.png" alt="" />
          <p onClick={()=> slectTimer(15)}>15</p>
          <p onClick={()=> slectTimer(30)}>30</p>
          <p onClick={()=> slectTimer(60)}>60</p>
          <p  onClick={()=> slectTimer(75)}>75</p>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;