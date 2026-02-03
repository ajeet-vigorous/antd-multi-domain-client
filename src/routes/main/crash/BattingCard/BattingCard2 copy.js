import React, { useEffect, useRef, useState } from "react";
import "./battingCard.css";
import { aviatorCashOut2, aviatorPlaceBets2, resetAviatorBetFlag2, resetAviatorCashout2 } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";

const BettingCard2 = ({ bettingData }) => {
  const [placedRounds, setPlacedRounds] = useState([]);
  const [activeTab, setActiveTab] = useState("Bet");
  const [betAmount, setBetAmount] = useState(10);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [autometicCash2, setAutometicCash2] = useState(false)
  const [autobetStatus, setAutobetStatus] = useState(false);
  const [autoCashoutStatus, setAutoCashoutStatus] = useState(false);
  const [cashOutValue, setCashOutValue] = useState(5.20);
  const amounts = [10.0, 50.0, 100.0, 1000.0];
  const dispatch = useDispatch();
  const [data, setData] = useState({})
  const [crash, setCrash] = useState(false)

  const prevTriggered = useRef(false);

  const { aviatorBetPlaceData2, aviatorBetPlaceMessage2, aviatorLoading2, aviatorCashoutData2, aviatorLoadingCashout2, aviatorCashout2, aviatorOneTimeCashout2, aviatorBetFlag2, aviatorOneTimeBet2 } = useSelector((state) => state.UserReducer)


  useEffect(() => {
    setData(bettingData);
    if (data.gameStatus == "close") {
      dispatch(resetAviatorBetFlag2());
      dispatch(resetAviatorCashout2());
      setCrash(true);
      setPlacedRounds([])
    } else if (data.gameStatus == "waiting") {
      setCrash(false);
    }
  }, [bettingData]);


  const handleBetPlace = async (newbetPlaceData, passedData) => {
    setCashoutAmount(newbetPlaceData)
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
      betId: aviatorBetPlaceData2?.betInsertId,
    };

    try {
      if (
        passedData?.isBetting &&
        passedData?.gameStatus === "open"
      ) {
        if (placedRounds.includes(roundId)) {
          console.warn("Bet already placed for this round.");
          return;
        }

        const betResult = await dispatch(aviatorPlaceBets2(reqData));
        if (!betResult.error) {
          console.log("Bet placed successfully");
          setPlacedRounds(prev => [...prev, roundId]);
        } else {
          console.error("Bet placement failed");
        }
      }
      else if (
        passedData?.isBetting === false &&
        passedData?.gameStatus === "running" &&
        aviatorBetFlag2 && !autometicCash2 &&
        aviatorBetPlaceData2?.betInsertId != null &&
        !aviatorOneTimeCashout2
      ) {
        const cashoutResult = await dispatch(aviatorCashOut2(reqDataC));
        if (!cashoutResult.error) {
          console.log("Cashout successful");
        } else {
          console.error("Cashout failed");
        }
      }
      else {
        console.log("No valid condition matched");
      }
    } catch (error) {
      console.error("Error in handleBetPlace:", error);
    }
  };




  const getButtonLabel = (data, aviatorBetFlag2, aviatorOneTimeBet2, aviatorCashoutData2, aviatorOneTimeCashout2) => {
    if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag2 && !aviatorOneTimeCashout2)
      return "Cashout";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet2))
      return "BET";
    if ((data?.gameStatus === 'running' && aviatorOneTimeCashout2))
      return "CASHOUT";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet2))
      return "CANCEL";
    if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet2))
      return "CASHOUT";
    if (
      (!data?.isBetting && data?.gameStatus === 'waiting') ||
      (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag2)
    )
      return "WAIT";
    return;
  };

  const getButtonColorClass = (data, aviatorBetFlag2, aviatorOneTimeBet2) => {
    if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag2 && !aviatorOneTimeCashout2)
      return "gx-bg-orange";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet2))
      return "gx-bg-green-0";
    if ((data?.gameStatus === 'running' && aviatorOneTimeCashout2))
      return "gx-bg-blue";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet2))
      return "gx-bg-red";
    if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet2))
      return "gx-bg-orange";
    if (
      (!data?.isBetting && data?.gameStatus === 'waiting') ||
      (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag2)
    )
      return "gx-bg-red";
    return "gx-bg-red";
  };

  useEffect(() => {
    if (activeTab === 'Auto' && autobetStatus && data?.gameStatus === 'waiting' && (betAmount != null || !betAmount <= 0)) {
      const reqData = {
        roundId: data?.roundId,
        amount: betAmount,
        casinoType: "aviator",
        eventId: 303031,
      };
      dispatch(aviatorPlaceBets2(reqData));
    }

  }, [data?.gameStatus == 'waiting', activeTab === 'Auto'])


  useEffect(() => {
    const multiplier = Number(data?.curentMultiplier);
    const target = Number(cashOutValue);

    if (
      activeTab === 'Auto' &&
      autoCashoutStatus &&
      data?.gameStatus === 'running' &&
      !isNaN(multiplier) &&
      !isNaN(target) &&
      multiplier > 0 &&
      Math.abs(multiplier - target) <= 0.1 &&
      !prevTriggered.current
    ) {
      prevTriggered.current = true;
      const reqDataC = {
        roundId: data?.roundId,
        eventId: 303031,
        betId: aviatorBetPlaceData2?.betInsertId,
      };
      dispatch(aviatorCashOut2(reqDataC));

    }

    if (data?.gameStatus !== 'running') {
      prevTriggered.current = false;
    }
  }, [data, activeTab, autoCashoutStatus, cashOutValue]);



  const handleChange = (e) => {
    const value = e.target.value;
    // Optional: Check for valid number
    if (!isNaN(value)) {
      setCashOutValue(value);
    }
  };


  return (
    <div className="betting-card">
      {/* Tab Switch */}
       <div className="tab-buttons-box">
      <div className="tab-buttons">
        <button className={`tab-button ${activeTab === "Bet" ? "active" : ""}`} onClick={() => setActiveTab("Bet")}>
          Bet
        </button>
        <button className={`tab-button ${activeTab === "Auto" ? "active" : ""}`} onClick={() => setActiveTab("Auto")}  >
          Auto
        </button>
      </div>
      </div>

      {/* Bet Controls */}
      <div className="bet-controls">

        <div className="amount-controls">
          <div className="amount-adjust">
            <button onClick={() => setBetAmount(betAmount - 10)}>-</button>
            <input
              type="text"
              className="amount-display"
              value={betAmount}
              min={0}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val)) setBetAmount(val);
              }}
            />
            {/* <div className="amount-display">{betAmount.toFixed(2)}</div> */}
            <button onClick={() => setBetAmount(betAmount + 10)}>+</button>
          </div>
          <div className="preset-buttons">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className="preset-button"
              >
                {amount.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {/* Place Bet Button */}
        <div className="place-bet">
          <button
            disabled={getButtonLabel(data, aviatorBetFlag2, aviatorOneTimeBet2, aviatorCashoutData2, aviatorOneTimeCashout2) === "WAIT"}

            className={`place-bet-button ${getButtonColorClass(data, aviatorBetFlag2, aviatorOneTimeBet2, aviatorCashoutData2, aviatorOneTimeCashout2)}`}
            onClick={() => {
              const currentData = { ...data };
              handleBetPlace(betAmount, currentData);
            }}
          >
            {aviatorLoading2 || aviatorLoadingCashout2? <Spin tip="Loading..." size="large" indicator={
              <div
                className="custom-spinner"
                style={{
                  width: 24,
                  height: 24,
                  border: '6px solid #fff',
                  borderTop: '3px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              />
            } /> : <>
              {getButtonLabel(data, aviatorBetFlag2, aviatorOneTimeBet2, aviatorCashoutData2, aviatorOneTimeCashout2)}

              <div>
                {(getButtonLabel(data, aviatorBetFlag2, aviatorOneTimeBet2, aviatorCashoutData2, aviatorOneTimeCashout2) !== "CASHOUT") && (
                  <>
                    {(data?.gameStatus === 'running' && aviatorBetFlag2) &&
                      (cashoutAmount * data?.curentMultiplier).toFixed(2)}
                    {(data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet2 && !aviatorOneTimeCashout2) &&
                      (betAmount).toFixed(2)}
                  </>
                )}
              </div> </>}

          </button>


        </div>
      </div>

      {/* Auto Settings */}
      {activeTab === "Auto" && (
        <div className="auto-settings">
          <div className="toggle-row">
            <div className="toggle-group">
              <span className="toggle-label">Auto Bet</span>
              <span className={`custom-switch ${autobetStatus ? "active" : ""}`}>
                <input
                  id="autobet-switch"
                  type="checkbox"
                  onChange={(e) => setAutobetStatus(e.target.checked)}
                />
                <label htmlFor="autobet-switch"></label>
              </span>
            </div>

            <div className="toggle-group">
              <span className="toggle-label">Auto Cash Out</span>
              <span className={`custom-switch ${autoCashoutStatus ? "active" : ""}`}>
                <input
                  id="autocashout-switch"
                  type="checkbox"
                  onChange={(e) => setAutoCashoutStatus(e.target.checked)}
                />
                <label htmlFor="autocashout-switch"></label>
              </span>
              <input
                disabled={autoCashoutStatus == true}
                type="text"
                value={cashOutValue}
                onChange={(e) => handleChange(e)}
                className="cashout-input"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingCard2;
