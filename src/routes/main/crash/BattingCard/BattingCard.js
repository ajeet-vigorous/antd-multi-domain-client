import React, { useEffect, useRef, useState } from "react";
import "./battingCard.css";
import { aviatorCashOut, aviatorPlaceBets, resetAviatorBetFlag, resetAviatorCashout } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";
import socket from "../aviator/aviatorSocket";

const BettingCard = ({ bettingData, aviatorSocketData }) => {
  const [placedRounds, setPlacedRounds] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [advanceBet, setAdvanceBet] = useState(null);

  const [activeTab1, setActiveTab1] = useState("Bet1");
  const [autobetStatus1, setAutobetStatus1] = useState(false);
  const [autoCashoutStatus1, setAutoCashoutStatus1] = useState(false);
  const [cashOutValue1, setCashOutValue1] = useState(5.5);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const prevTriggered1 = useRef(false);
  const { aviatorBetPlaceData, aviatorLoading1, aviatorLoadingCashout1, aviatorBetFlag, aviatorOneTimeBet, aviatorOneTimeCashout, aviatorCashoutData } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (
      advanceBet &&
      data?.gameStatus === "open" &&
      data?.roundId !== undefined &&
      !placedRounds.includes(data.roundId)
    ) {
      handleBetPlace(advanceBet.amount, { ...data, roundId: data.roundId });
      setAdvanceBet(null);
    }
  }, [data?.gameStatus, data?.roundId]);

  useEffect(() => {
    setData(bettingData);
    if (bettingData.gameStatus === "close") {
      dispatch(resetAviatorBetFlag());
      dispatch(resetAviatorCashout());
      setPlacedRounds([]);
    }
  }, [bettingData]);


  const handleBetPlace = async (newbetPlaceData, passedData) => {
    if (!aviatorSocketData?.betStatus) {
      message.error(aviatorSocketData?.setting?.errorMessage);
      return;
    }

    if (aviatorSocketData) {
      if (newbetPlaceData > aviatorSocketData?.maxStake) {
        message.error(`max bet amount ${aviatorSocketData?.maxStake}`);
        return;
      }
      if (newbetPlaceData < aviatorSocketData?.minStake) {
        message.error(`min bet amount ${aviatorSocketData?.minStake}`);
        return;
      }
    }

    const roundId = passedData?.roundId;
    const reqData = {
      roundId,
      amount: newbetPlaceData,
      casinoType: "aviator",
      eventId: 303031,
    };
    const reqDataC = {
      roundId,
      eventId: 303031,
      betId: aviatorBetPlaceData?.betInsertId,
    };

    try {
      if (passedData?.gameStatus === "open" && passedData?.isBetting) {
        // if (placedRounds.includes(roundId)) return;
        const betResult = await dispatch(aviatorPlaceBets(reqData));

        if (!betResult.error) setPlacedRounds((prev) => [...prev, roundId]);
      } else if (
        passedData?.gameStatus === "running" &&
        !passedData?.isBetting &&
        aviatorBetFlag &&
        !aviatorOneTimeCashout
      ) {
        await dispatch(aviatorCashOut(reqDataC));
      } else if (
        (passedData?.gameStatus === "waiting" || passedData?.gameStatus === "running") &&
        !passedData?.isBetting
      ) {
        setAdvanceBet({ amount: newbetPlaceData });
        message.success("Your bet will be placed in the next round.");
      }
    } catch (error) {
      console.error("Bet Error:", error);
    }
  };


  const cancelAdvanceBet = () => {
    setAdvanceBet(null);
    message.info("Advance bet canceled.");
  };


  const getButtonLabel = () => {
    if (!data?.isBetting && data?.gameStatus === "running" && aviatorBetFlag && !aviatorOneTimeCashout)
      return "Cashout";
    // if (data?.gameStatus === "open" && data?.isBetting && !aviatorOneTimeBet)
    //   return "BET";
    if (data?.gameStatus === "open" && data?.isBetting && aviatorOneTimeBet)
      return "CANCEL";

    return "BET";
  };

  const getButtonColorClass = () => {
    if (!data?.isBetting && data?.gameStatus === "running" && aviatorBetFlag && !aviatorOneTimeCashout)
      return "gx-bg-orange";
    // if (data?.gameStatus === "open" && data?.isBetting && !aviatorOneTimeBet)
    //   return "gx-bg-green-0";
    if (data?.gameStatus === "open" && data?.isBetting && aviatorOneTimeBet)
      return "gx-bg-red";
    return "gx-bg-green-0";
  };

  const handleChange1 = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCashOutValue1(value);
    }
  };

  useEffect(() => {
    if (activeTab1 === 'Auto1' && autobetStatus1 && data?.gameStatus === 'waiting' && (betAmount != null || !betAmount <= 0)) {
      const reqData = {
        roundId: data?.roundId,
        amount: betAmount,
        casinoType: "aviator",
        eventId: 303031,
      };
      dispatch(aviatorPlaceBets(reqData));
      setCashoutAmount(betAmount)
    }

  }, [data?.gameStatus == 'waiting', activeTab1 === 'Auto1'])


  useEffect(() => {
    const multiplier = Number(data?.curentMultiplier);
    const target = Number(cashOutValue1);

    if (
      activeTab1 === 'Auto1' &&
      autoCashoutStatus1 &&
      data?.gameStatus === 'running' &&
      !isNaN(multiplier) &&
      !isNaN(target) &&
      multiplier > 0 &&
      Math.abs(multiplier - target) <= 0.1 &&
      !prevTriggered1.current
    ) {
      prevTriggered1.current = true;
      const reqDataC = {
        roundId: data?.roundId,
        eventId: 303031,
        betId: aviatorBetPlaceData?.betInsertId,
      };
      dispatch(aviatorCashOut(reqDataC));

    }

    if (data?.gameStatus !== 'running') {
      prevTriggered1.current = false;
    }
  }, [data, activeTab1, autoCashoutStatus1, cashOutValue1]);





  return (
    <div className="betting-card1">
      {/* Tab Switch */}
      <div className="tab-buttons1-box">
        <div className="tab-buttons1">
          <button
            className={`tab-button1 ${activeTab1 === "Bet1" ? "active" : ""}`}
            onClick={() => setActiveTab1("Bet1")}
          >
            Bet
          </button>
          <button
            className={`tab-button1 ${activeTab1 === "Auto1" ? "active" : ""}`}
            onClick={() => setActiveTab1("Auto1")}
          >
            Auto
          </button>
        </div>
      </div>
      <div className="bet-controls">
        <div className="amount-controls">
          <div className="amount-adjust">
            <button onClick={() => setBetAmount(betAmount - 10)}>-</button>
            <input
              type="text"
              className="amount-display"
              value={betAmount}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val)) setBetAmount(val);
              }}
            />
            <button onClick={() => setBetAmount(betAmount + 10)}>+</button>
          </div>
          <div className="preset-buttons">
            {[10.0, 50.0, 100.0, 1000.0].map((amt) => (
              <button key={amt} onClick={() => setBetAmount(amt)} className="preset-button">
                {amt.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {/* 🟡 Advance Bet Info and Cancel */}

        <div className="place-bet">
          {advanceBet ? <button className="place-bet-button gx-bg-red" onClick={cancelAdvanceBet}>
            Cancel
            <div className="gx-fs-sm" >
              Waiting For Next round
            </div>
          </button> : <button
            // disabled={getButtonLabel() === "WAIT"}
            className={`place-bet-button ${getButtonColorClass()}`}
            onClick={() => handleBetPlace(betAmount, data)}
          >
            {aviatorLoading1 || aviatorLoadingCashout1 ? (
              <Spin
                tip="Loading..."
                size="large"
                indicator={
                  <div
                    className="custom-spinner"
                    style={{
                      width: 24,
                      height: 24,
                      border: "6px solid #fff",
                      borderTop: "3px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                }
              />
            ) : (
              <>
                {getButtonLabel()}
                <div>
                  {getButtonLabel() !== "CASHOUT" && (
                    <>
                      {data?.gameStatus === "running" && aviatorBetFlag && !aviatorOneTimeCashout && (
                        (betAmount * data?.curentMultiplier).toFixed(2)
                      )}
                      {
                        (
                          (
                            data?.gameStatus === "open" &&
                            data?.isBetting &&
                            !aviatorOneTimeBet
                          ) || (
                            data?.gameStatus !== "open" &&
                            !data?.isBetting &&
                            !aviatorOneTimeBet &&
                            !aviatorOneTimeCashout
                          )
                        ) && betAmount.toFixed(2)
                      }

                    </>
                  )}
                </div>
              </>
            )}
          </button>}
        </div>
      </div>
      {activeTab1 === "Auto1" && (
        <div className="auto-settings">
          <div className="toggle-row">
            <div className="toggle-group">
              <span className="toggle-label">Auto Bet</span>
              <span className={`custom-switch1 ${autobetStatus1 ? "active" : ""}`}>
                <input
                  id="autobet-switch1"
                  type="checkbox"
                  onChange={(e) => setAutobetStatus1(e.target.checked)}
                />
                <label htmlFor="autobet-switch1"></label>
              </span>
            </div>

            <div className="toggle-group">
              <span className="toggle-label">Auto Cash Out</span>
              <span className={`custom-switch1 ${autoCashoutStatus1 ? "active" : ""}`}>
                <input
                  id="autocashout-switch1"
                  type="checkbox"
                  onChange={(e) => setAutoCashoutStatus1(e.target.checked)}
                />
                <label htmlFor="autocashout-switch1"></label>
              </span>
              <input
                disabled={autoCashoutStatus1 == true}
                type="number"
                value={cashOutValue1}
                onChange={(e) => handleChange1(e)}
                className="cashout-input1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingCard;

