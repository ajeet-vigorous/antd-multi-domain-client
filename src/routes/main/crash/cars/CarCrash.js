import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CityImg from '../img/city.png'
import "../aviator/avaitor.css"
import "./carCrash.css"

const CarCrash = ({ data, lastCrashList }) => {
  const [games, setGames] = useState(data)
  const [lastCrashValue, setLastCrashValue] = useState(0);
  const [bettingPhaseTime, setBettingPhaseTime] = useState(100);
  const [highwayPosition, setHighwayPosition] = useState(0);
  const [cityPosition, setCityPosition] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [carPosition, setCarPosition] = useState(-350);

  const hasRunStarted = useRef(false);

  useEffect(() => {
    setGames(data);
    if (data.gameStatus == "close") {
      setLastCrashValue(data.crashValue);

    }
    if (data.gameStatus === "open") {
      setBettingPhaseTime(data?.progress);
    }

    if (data.gameStatus === "running" && !hasRunStarted.current) {
      handleMoveLeft();
      hasRunStarted.current = true; // Mark that running has started
    }

    if (data.gameStatus === "waiting") {
      handleSpeedOff();
      hasRunStarted.current = false; // Reset when game ends
    }
  }, [data]);







  useEffect(() => {
    const highwayInterval = setInterval(() => {
      setHighwayPosition((prev) => (prev <= -3400 ? 0 : prev - 5)); // Slower movement for highway
    }, 16); // Keep the frame rate

    const cityInterval = setInterval(() => {
      setCityPosition((prev) => (prev <= -1400 ? 0 : prev - 1)); //
    }, 16); // Keep the frame rate

    const wheelInterval = setInterval(() => {
      setWheelRotation((prev) => prev + 10);
    }, 16); // Keep the frame rate

    return () => {
      clearInterval(highwayInterval);
      clearInterval(cityInterval);
      clearInterval(wheelInterval);
    };
  }, []);

  const handleMoveLeft = () => {
    const targetPosition = window.innerWidth * 0.2;
    setCarPosition(-300);
    const moveToPosition = setInterval(() => {
      setCarPosition((prev) => {


        if (prev >= targetPosition) {
          clearInterval(moveToPosition);
          return targetPosition;
        }
        return prev + 2;
      });
    }, 16);
  };

  const handleSpeedOff = () => {
    const targetPosition = window.innerWidth;
    const moveRight = setInterval(() => {
      setCarPosition((prev) => {
        if (prev >= targetPosition) {
          clearInterval(moveRight);
          return targetPosition;
        }
        return prev + 20;
      });
    }, 16);
  };

  return (
    <>



      <div className="overflow-hidden h-[500px] gx-position-relative gx-bg-flex items-center justify-center">

        <div className="flower">
          <img
            src={CityImg}
            alt="Car"
          // className="w-[900px]"

          />
        </div>
        <div className="hero ">
          <div className="hero2">
            <div
              className={games?.gameStatus === "running" ? "highway-running" : "highway"}
            ></div>


            <div
              className="car"
              style={{ transform: `translateX(${carPosition}px)` }}
            >
              <img
                src="https://media.tenor.com/8ckQrn3V9-EAAAAi/orchestrated-orchestratednl.gif"
                alt="Car"
                className="car-img "
              />

            </div>
            <div className="stage-board">
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
                          <img src="https://thumbs.dreamstime.com/b/fuel-up-gasoline-pump-refueling-17950119.jpg" alt="kk" className="" height={100} width={100} />

                        </div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill"
                            style={{ width: `${Math.max(0, Number(bettingPhaseTime).toFixed(2))}%` }}
                          />
                        </div>
                        {/* <div className="progress-bar-title"> <img src="/assets/images/official.svg" alt="kk" className="responsive-icon-official" /></div> */}
                        {/* <div className="progress-bar-timer">
                      Time Remaining: {Math.floor(bettingRemainingTime).toFixed(0)} s
                    </div> */}
                      </div>
                      {/* <div className="car" style={{ zIndex: 9999 }}>
                        <img className="car-img" height={150} width={150} src="https://thumbs.dreamstime.com/b/man-filling-up-fuel-car-gas-pump-petrol-station-conceptual-flat-design-vector-illustration-75832488.jpg" alt="ll" />

                      </div> */}

                    </div>


                  );
                } else {
                  return (
                    <>
                      {/* Crashed State */}
                      {games?.gameStatus === "waiting" && (
                        <div className="crash-message-container">
                          Crashed!
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
                            color: "white",
                            // ...getBackgroundStyle(games?.curentMultiplier),
                            width: "30%",
                            height: "30%",
                            textAlign: "center",
                            position: "absolute",
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: "flex",
                            top: "30%",
                            fontWeight: "bold",
                            fontSize: "70px",
                            // textShadow: "0 5px 5px rgba(148,0,211,0.8)",

                            borderRadius: "50%"
                            // animation: "pulse 2s infinite",
                          }}>
                            {games?.curentMultiplier ?? 0}X
                          </span>)}


                      </div>



                    </>
                  );
                }
              })()}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarCrash;