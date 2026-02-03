import React, { useEffect, useRef, useState } from "react";
import "./battingCard.css";
import { aviatorCashOut2, aviatorPlaceBets2, resetAviatorBetFlag2, resetAviatorCashout2 } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";

const BettingCard2 = ({ bettingData, aviatorSocketData }) => {
  const [placedRounds, setPlacedRounds] = useState([]);
  const [activeTab, setActiveTab] = useState("Bet");
  const [betAmount, setBetAmount] = useState(10);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const [autometicCash2, setAutometicCash2] = useState(false)
  const [advanceBet2, setAdvanceBet2] = useState(null);
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
    if (
      advanceBet2 &&
      data?.gameStatus === "open" &&
      data?.roundId !== undefined &&
      !placedRounds.includes(data.roundId)
    ) {
      handleBetPlace(advanceBet2.amount, { ...data, roundId: data.roundId });
      setAdvanceBet2(null);
    }
  }, [data?.gameStatus, data?.roundId]);

  useEffect(() => {
    setData(bettingData);
    if (bettingData.gameStatus === "close") {
      dispatch(resetAviatorBetFlag2());
      dispatch(resetAviatorCashout2());
      setPlacedRounds([]);
    }
  }, [bettingData]);


  // useEffect(() => {
  //   setData(bettingData);
  //   if (data.gameStatus == "close") {
  //     dispatch(resetAviatorBetFlag2());
  //     dispatch(resetAviatorCashout2());
  //     setCrash(true);
  //     setPlacedRounds([])
  //   } else if (data.gameStatus == "waiting") {
  //     setCrash(false);
  //   }
  // }, [bettingData]);




  const handleBetPlace = async (newbetPlaceData, passedData) => {
    console.log(aviatorSocketData, "aviatorSocketData");
    
    if (!aviatorSocketData?.betStatus) {
      message.error(aviatorSocketData?.setting?.errorMessage);
      return;
    }
    if (aviatorSocketData) {
      if (newbetPlaceData > aviatorSocketData?.maxStake) {
        message.error(` max bet amount ${aviatorSocketData?.maxStake}`);
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
      betId: aviatorBetPlaceData2?.betInsertId,
    };

    try {
      if (passedData?.gameStatus === "open" && passedData?.isBetting) {
        console.log("eeeeeeeeeeeeeeeee");
        // if (placedRounds.includes(roundId)) return;
        console.log("ffffffffffffff");
        const betResult = await dispatch(aviatorPlaceBets2(reqData));
        if (!betResult.error) setPlacedRounds((prev) => [...prev, roundId]);
      } else if (
        passedData?.gameStatus === "running" &&
        !passedData?.isBetting &&
        aviatorBetFlag2 &&
        !aviatorOneTimeCashout2
      ) {
        await dispatch(aviatorCashOut2(reqDataC));
      } else if (
        (passedData?.gameStatus === "waiting" || passedData?.gameStatus === "running") &&
        !passedData?.isBetting
      ) {
        setAdvanceBet2({ amount: newbetPlaceData });
        message.success("Your bet will be placed in the next round.");
      }
    } catch (error) {
      console.error("Bet Error:", error);
    }
  };


  const cancelAdvanceBet = () => {
    setAdvanceBet2(null);
    message.info("Advance bet canceled.");
  };



  const getButtonLabel = () => {
    if (!data?.isBetting && data?.gameStatus === "running" && aviatorBetFlag2 && !aviatorOneTimeCashout2)
      return "Cashout";
    if (data?.gameStatus === "open" && data?.isBetting && aviatorOneTimeBet2)
      return "CANCEL";

    return "BET";
  };

  const getButtonColorClass = () => {
    if (!data?.isBetting && data?.gameStatus === "running" && aviatorBetFlag2 && !aviatorOneTimeCashout2)
      return "gx-bg-orange";
    if (data?.gameStatus === "open" && data?.isBetting && aviatorOneTimeBet2)
      return "gx-bg-red";
    return "gx-bg-green-0";
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
          {advanceBet2 ? <button className="place-bet-button gx-bg-red" onClick={cancelAdvanceBet}>
            Cancel
            <div className="gx-fs-sm" >
              Waiting For Next round
            </div>
          </button> : <button
            // disabled={getButtonLabel() === "WAIT"}
            className={`place-bet-button ${getButtonColorClass()}`}
            onClick={() => handleBetPlace(betAmount, data)}
          >
            {aviatorLoading2 || aviatorLoadingCashout2 ? (
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
                      {data?.gameStatus === "running" && aviatorBetFlag2 && !aviatorOneTimeCashout2 && (
                        (betAmount * data?.curentMultiplier).toFixed(2)
                      )}
                      {
                        (
                          (
                            data?.gameStatus === "open" &&
                            data?.isBetting &&
                            !aviatorOneTimeBet2
                          ) || (
                            data?.gameStatus !== "open" &&
                            !data?.isBetting &&
                            !aviatorOneTimeBet2 &&
                            !aviatorOneTimeCashout2
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
