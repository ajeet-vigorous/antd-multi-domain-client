import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import socket from "./aviatorSocket";
import CanvasAnimation from "./Canvas";
import "./avaitor.css"
import { BsThreeDots } from "react-icons/bs";
import LiveBettors from "../liveBettor/LiveBettor";
import { IoIosCloseCircle, IoIosVolumeOff, IoIosClose } from "react-icons/io";
import BirdCanvas from "./BirdCanvas";
import backgroundSound from '../audio/background.mp3'
import planeCrash from '../audio/plane-crash.mp3'
import { AiFillSound  } from "react-icons/ai";
import { FaVolumeOff } from "react-icons/fa6";


const Aviator = ({ data, lastCrashList }) => {
  const stateRef = useRef(null);
  const [games, setGames] = useState(data)
  const [lastCrashValue, setLastCrashValue] = useState(0);
  const [bettingPhaseTime, setBettingPhaseTime] = useState(100);
  const [bettingRemainingTime, setBettingRemainingTime] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => {
    const stored = localStorage.getItem("soundOn");
    return stored === null ? true : stored === "true";
  });


  const moveSound = useRef(null);
  const crashSound = useRef(null);
  const soundInterval = useRef(null);
  const prevStatusRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setGames(data);
    if (data.gameStatus == "close") {
      setLastCrashValue(data.crashValue);
      setWaitingTime(data.waitingTime);
    }
    if (data.gameStatus == "open") {
      setBettingPhaseTime(data?.progress);
      setBettingRemainingTime(data?.waitingTime);
    }
  }, [data]);




  useEffect(() => {
    moveSound.current = new Audio(backgroundSound);
    crashSound.current = new Audio(planeCrash);

    moveSound.current.loop = true;
    crashSound.current.loop = false;

    // Set volume levels (optional)
    moveSound.current.volume = 0.5;
    crashSound.current.volume = 1;

    return () => {
      if (moveSound.current) {
        moveSound.current.pause();
        moveSound.current = null;
      }
      if (crashSound.current) {
        crashSound.current.pause();
        crashSound.current = null;
      }
    };
  }, [games?.gameStatus]);

  useEffect(() => {
    prevStatusRef.current = games?.gameStatus;
  }, [games?.gameStatus]);

  useEffect(() => {

    const prevStatus = prevStatusRef.current;

    if (prevStatus === "running" && moveSound.current) {
      moveSound.current.pause();
      moveSound.current.currentTime = 0;
    }

    if (prevStatus === "running" && crashSound.current) {
      crashSound.current.pause();
      crashSound.current.currentTime = 0;
    }

    if (soundInterval.current) {
      clearInterval(soundInterval.current);
      soundInterval.current = null;
    }

    if (soundOn) {
      if (games?.gameStatus === "running") {
        moveSound.current.loop = true;
        crashSound.current.loop = false;
        moveSound.current.play().catch((e) => console.log("Move sound error:", e));
      } else if (games?.gameStatus === "waiting") {
        crashSound.current.loop = false;
        moveSound.current.loop = false;

        setTimeout(() => {
          crashSound.current?.play().catch((e) => console.log("Crash sound error:", e));
        }, 100);
      }
    }

    prevStatusRef.current = games?.gameStatus;
  }, [games?.gameStatus, soundOn]);

  useEffect(() => {
    if (!soundOn) {
      moveSound.current?.pause();
      crashSound.current?.pause();
    }
  }, [soundOn]);


  const getBackgroundStyle = (multiplier) => {
    if (multiplier < 2) {
      return {
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
      };
    } else if (multiplier >= 2 && multiplier < 4) {
      return {
        backgroundColor: 'rgba(255, 255, 0, 0.15)',
      };
    } else if (multiplier >= 4 && multiplier < 10) {
      return {
        backgroundColor: 'rgba(255, 165, 0, 0.15)',
      };
    } else if (multiplier >= 10 && multiplier < 50) {
      return {
        backgroundColor: 'rgba(144, 238, 144, 0.15)',
      };
    } else if (multiplier >= 50 && multiplier < 100) {
      return {
        backgroundColor: 'rgba(0, 191, 255, 0.15)',
      };
    } else if (multiplier >= 100 && multiplier < 1000) {
      return {
        backgroundColor: 'rgba(238, 130, 238, 0.15)',
      };
    } else {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // light white
        color: 'black',
      };
    }
  };

  const getLastCrashColor = (lastCrashPoint) => {
    if (lastCrashPoint < 2) {
      return {
        color: 'rgb(52, 180, 255)',
      };
    } else if (lastCrashPoint >= 2 && lastCrashPoint < 10) {
      return {
        color: 'rgb(145, 62, 248)',
      };
    } else if (lastCrashPoint >= 10) {
      return {
        color: 'rgb(192, 23, 180)',
      };
    }
    else {
      return {
        color: 'black',
      };
    }
  };

  const getAnimationStyle = (multiplier) => {
    if (multiplier < 2) {
      return {
        background: 'radial-gradient(rgba(52, 180, 255, 0.5) 0%, transparent 60%)',
      };
    } else if (multiplier >= 2 && multiplier < 10) {
      return {
        background: 'radial-gradient(rgba(145, 62, 248, 0.5) 0%, transparent 60%)',
      };
    } else if (multiplier > 10) {
      return {
        background: 'radial-gradient(rgba(192, 23, 180, 0.5) 0%, transparent 60%)',
      };
    }
    else {
      return {
        background: 'transparent',
      };
    }
  };



  return (
    <div className="aviator-sec">
      <div className="gx-position-absolute gx-bg-flex gx-justify-content-end gx-py-5 gx-px-3  gx-w-100">
        <div
          onClick={() => {
            const newValue = !soundOn;
            setSoundOn(newValue);
            localStorage.setItem("soundOn", newValue);
          }}
          className="gx-text-grey"
          style={{ zIndex: 1 }}
        >
          {soundOn ? <AiFillSound size={25} /> : <><FaVolumeOff size={25} /></>}
        </div>
      </div>

      <div className={`wrapper ${isOpen ? "opened" : "closed"}`}>
        <div className={`dropdown-container ${isOpen ? "dropdown-open" : ""}`}>
          {isOpen && (
            <>
              <div className="dropdown-content open">
                <div className="header-text">Round History</div>
                <div onClick={toggleDropdown} className="header-icon">
                  <div className="icon-circle1">
                    <IoIosCloseCircle style={{ color: "#888", fontSize: "25px" }} />

                  </div>
                </div>
              </div>

              <div className="dropdown-content open">
                {lastCrashList?.map((reqList, index) => (
                  <div className="history-item" key={index} style={{ ...getLastCrashColor(reqList) }}>
                    {(reqList).toFixed(2)}X
                  </div>
                ))}
              </div>
            </>
          )}

          {/* When closed: show compact dropdown */}
          {!isOpen && (
            <>
              <div className="dropdown-content closed">
                {lastCrashList?.map((reqList, index) => (
                  <div className="history-item" key={index} style={{ ...getLastCrashColor(reqList) }}>
                    {(reqList).toFixed(2)}X
                  </div>
                ))}
              </div>

              <div onClick={toggleDropdown} className="dropdown-toggle">
                <div className="icon-circle1">
                  <BsThreeDots style={{ color: "#888", fontSize: "25px" }} />

                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div ref={stateRef} className="gx-bg-black stage-board" >

        <img
          src="/assets/images/aviator-bg.svg"
          alt="Car"
          className="infinite-rotation"

        />

        <div className="stage-board  gx-w-100" style={games?.gameStatus === "running" ? getAnimationStyle(games?.curentMultiplier ?? 0) : {}}>


          {(() => {
            if (games?.gameStatus === "open") {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    color: 'white',

                    position: 'relative',
                  }}
                >


                  <div className="spinner-con">
                    <div className="animate-spin-slow1" >
                      <img src="/assets/images/partners-logo.svg" alt="kk" className="responsive-icon" />

                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill"
                        style={{ width: `${Math.max(0, Number(bettingPhaseTime).toFixed(2))}%` }}
                      />
                    </div>
                    <div className="progress-bar-title"> <img src="/assets/images/official.svg" alt="kk" className="responsive-icon-official" /></div>
                    {/* <div className="progress-bar-timer">
                      Time Remaining: {Math.floor(bettingRemainingTime).toFixed(0)} s
                    </div> */}
                  </div>
                  <div className="bottom-left-plane">
                    <img className="plane-static" src="/assets/images/plane-0.svg" alt="ll" />

                  </div>
                  <div className="bottom-right-live-bettor">
                    <LiveBettors />

                  </div>
                </div>


              );
            } else {
              return (
                <>
                  {games?.gameStatus == "waiting" && (

                    <div className="crash-message-container">
                      FLEW AWAY!
                      <div className="crash-value">
                        {lastCrashValue ?? 0}X
                      </div>
                    </div>

                  )}

                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    justifyContent: 'center',
                    display: "flex"
                  }}>
                    {games?.gameStatus === "running" && (
                      <span style={{
                        color: "red",
                        // ...getBackgroundStyle(games?.curentMultiplier),
                        width: "30%",
                        height: "30%",
                        textAlign: "center",
                        position: "absolute",
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: "flex",
                        top: "38%",
                        fontWeight: "bold",
                        fontSize: "70px",
                        textShadow: "0 5px 5px rgba(148,0,211,0.8)",
                        // zIndex: 99999,
                        borderRadius: "50%"
                        // animation: "pulse 2s infinite",
                      }}>
                        {games?.curentMultiplier ?? 0}X
                      </span>)}
                    <CanvasAnimation
                      stateRef={stateRef}
                      initialGameStatus={games?.gameStatus}
                      livemultiplier={games?.curentMultiplier}
                      games={games}
                    />

                  </div>

                </>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Aviator;
