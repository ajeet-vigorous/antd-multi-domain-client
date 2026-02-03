import React, { useEffect, useRef, useState } from "react";
import "./battingCard.css";
import { aviatorCashOut, aviatorPlaceBets, resetAviatorBetFlag, resetAviatorCashout } from "../../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { message, Spin } from "antd";

const BettingCard = ({ bettingData }) => {
  const [placedRounds, setPlacedRounds] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [cashoutAmount, setCashoutAmount] = useState(0);
  const amounts = [10.0, 50.0, 100.0, 1000.0];
  const dispatch = useDispatch();
  const [data, setData] = useState({})
  const [crash, setCrash] = useState(false)
  const [advanceBetPlaceFlag, setAdvanceBetPlaceFlag] = useState(false)

  const { aviatorBetPlaceData, aviatorBetPlaceMessage, aviatorLoading1, aviatorLoadingCashout1, aviatorCashoutData, aviatorCashout, aviatorOneTimeCashout, aviatorBetFlag, aviatorOneTimeBet } = useSelector((state) => state.UserReducer)


  useEffect(() => {
    setData(bettingData);
    if (data.gameStatus == "close") {
      dispatch(resetAviatorBetFlag());
      dispatch(resetAviatorCashout());
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
      betId: aviatorBetPlaceData?.betInsertId,
    };

    console.log("bet place wait for txr round", passedData);

    try {
      if (passedData?.isBetting && passedData?.gameStatus === "open") {
        if (placedRounds.includes(roundId)) {
          console.warn("Bet already placed for this round.");
          return;
        }

        const betResult = await dispatch(aviatorPlaceBets(reqData));
        if (!betResult.error) {
          console.log("Bet placed successfully");
          setPlacedRounds(prev => [...prev, roundId]);
        } else {
          console.error("Bet placement failed");
        }
      }
      else if (passedData?.isBetting === false && passedData?.gameStatus === "running" &&
        aviatorBetFlag &&
        aviatorBetPlaceData?.betInsertId != null &&
        !aviatorOneTimeCashout
      ) {
        const cashoutResult = await dispatch(aviatorCashOut(reqDataC));
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




  const handleAdvanceBetPlace = async (newbetPlaceData, passedData) => {
    setAdvanceBetPlaceFlag(true)

    // let roundId = '';
    // if (
    //   !passedData?.isBetting &&
    //   passedData?.gameStatus !== "open" &&
    //   (aviatorOneTimeCashout || !aviatorOneTimeCashout)
    // ) {
    //   if (data?.gameStatus === "open") {
    //     roundId = data?.roundId;
    //   }
    // }


    const reqData = {
      roundId: data?.roundId,
      amount: newbetPlaceData,
      casinoType: "aviator",
      eventId: 303031,
    };

    const reqDataC = {
      roundId: data?.roundId,
      eventId: 303031,
      betId: aviatorBetPlaceData?.betInsertId,
    };

    console.log("11", passedData, reqData);

    try {
      if (!passedData?.isBetting && passedData?.gameStatus !== "open" && (aviatorOneTimeCashout || !aviatorOneTimeCashout)) {
        // if (placedRounds.includes(roundId)) {
        //   console.warn("Bet already placed for this round.");
        //   return;
        // }
        console.log("This bet place is next round");
        // const betResult = await dispatch(aviatorPlaceBets(reqData));
        // if (!betResult.error) {
        //   console.log("Bet placed successfully");
        //   setPlacedRounds(prev => [...prev, roundId]);
        // } else {
        //   console.error("Bet placement failed");
        // }
      }
      // else if (passedData?.isBetting === false && passedData?.gameStatus === "running" &&
      //   aviatorBetFlag &&
      //   aviatorBetPlaceData?.betInsertId != null &&
      //   !aviatorOneTimeCashout
      // ) {
      //   const cashoutResult = await dispatch(aviatorCashOut(reqDataC));
      //   if (!cashoutResult.error) {
      //     console.log("Cashout successful");
      //   } else {
      //     console.error("Cashout failed");
      //   }
      // }
      // else {
      //   console.log("No valid condition matched");
      // }
    } catch (error) {
      console.error("Error in handleBetPlace:", error);
    }
  };

  useEffect(() => {
    let reqdata = {
      roundId: data?.roundId,
      amount: betAmount,
      casinoType: "aviator",
      eventId: 303031,
    }
    console.log("advance Bet Place successfull", reqdata);
  }, [!data?.isBetting && data?.gameStatus !== "open" && (aviatorOneTimeCashout || !aviatorOneTimeCashout) && advanceBetPlaceFlag])





  const getButtonLabel = (data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) => {
    if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag && !aviatorOneTimeCashout)
      return "Cashout";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet) ||
      (data?.gameStatus === 'running' && aviatorOneTimeCashout) ||
      (!data?.isBetting && data?.gameStatus === 'waiting') ||
      (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag))
      return "BET";
    if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet))
      return "CANCEL";
    return;
  };

  const getButtonColorClass = (data, aviatorBetFlag, aviatorOneTimeBet) => {
    if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag && !aviatorOneTimeCashout)
      return "gx-bg-orange";
    if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet) ||
      (data?.gameStatus === 'running' && aviatorOneTimeCashout) ||
      (!data?.isBetting && data?.gameStatus === 'waiting') ||
      (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag))
      return "gx-bg-green-0";
    if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet))
      return "gx-bg-red";
    return "gx-bg-green-0";
  };

  return (
    <div className="betting-card1">

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
            // disabled={getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) === "WAIT"}
            className={`place-bet-button ${getButtonColorClass(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout)}`}
            onClick={() => {
              const currentData = { ...data };
              if (data?.gameStatus === "open") {
                handleBetPlace(betAmount, currentData);
              } else {
                handleAdvanceBetPlace(betAmount, currentData);
              }
            }}
          >
            {aviatorLoading1 || aviatorLoadingCashout1 ? <Spin tip="Loading..." size="large" indicator={
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

              {getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout)}
              <div>
                {(getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) != "CASHOUT") && (
                  <>
                    {(data?.gameStatus === 'running' && aviatorBetFlag && !aviatorOneTimeCashout) && (cashoutAmount * data?.curentMultiplier).toFixed(2)}

                    {((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet && !aviatorOneTimeCashout) ||
                      (data?.gameStatus === 'running' && !data?.isBetting && aviatorOneTimeBet && aviatorOneTimeCashout) ||
                      (data?.gameStatus === 'running' && !data?.isBetting && !aviatorOneTimeBet && !aviatorOneTimeCashout) ||
                      (data?.gameStatus === 'waiting' && !data?.isBetting && (!aviatorOneTimeBet && !aviatorOneTimeCashout) || (aviatorOneTimeBet && aviatorOneTimeCashout))) &&
                      (betAmount).toFixed(2)}
                  </>
                )}
              </div>
            </>
            }

          </button>
        </div>
      </div>



    </div>
  );
};

export default BettingCard;



// import React, { useEffect, useRef, useState } from "react";
// import "./battingCard.css";
// import { aviatorCashOut, aviatorPlaceBets, resetAviatorBetFlag, resetAviatorCashout } from "../../../../appRedux/actions/User";
// import { useDispatch, useSelector } from "react-redux";
// import { message, Spin } from "antd";

// const BettingCard = ({ bettingData }) => {
//   const [placedRounds, setPlacedRounds] = useState([]);
//   const [activeTab1, setActiveTab1] = useState("Bet1");
//   const [betAmount, setBetAmount] = useState(10);
//   const [cashoutAmount, setCashoutAmount] = useState(0);
//   const [autobetStatus1, setAutobetStatus1] = useState(false);
//   const [autoCashoutStatus1, setAutoCashoutStatus1] = useState(false);
//   const [cashOutValue1, setCashOutValue1] = useState(5.5);
//   const amounts = [10.0, 50.0, 100.0, 1000.0];
//   const dispatch = useDispatch();
//   const [data, setData] = useState({})
//   const [crash, setCrash] = useState(false)
//   const prevTriggered1 = useRef(false);

//   const { aviatorBetPlaceData, aviatorBetPlaceMessage, aviatorLoading1, aviatorLoadingCashout1, aviatorCashoutData, aviatorCashout, aviatorOneTimeCashout, aviatorBetFlag, aviatorOneTimeBet } = useSelector((state) => state.UserReducer)


//   useEffect(() => {
//     setData(bettingData);
//     if (data.gameStatus == "close") {
//       dispatch(resetAviatorBetFlag());
//       dispatch(resetAviatorCashout());
//       setCrash(true);
//       setPlacedRounds([])
//     } else if (data.gameStatus == "waiting") {
//       setCrash(false);
//     }
//   }, [bettingData]);


//   const handleBetPlace = async (newbetPlaceData, passedData) => {
//     setCashoutAmount(newbetPlaceData)
//     const roundId = passedData?.roundId;

//     const reqData = {
//       roundId,
//       amount: newbetPlaceData,
//       casinoType: "aviator",
//       eventId: 303031,
//     };

//     const reqDataC = {
//       roundId,
//       eventId: 303031,
//       betId: aviatorBetPlaceData?.betInsertId,
//     };

//     try {
//       if (
//         passedData?.isBetting &&
//         passedData?.gameStatus === "open"
//       ) {
//         if (placedRounds.includes(roundId)) {
//           console.warn("Bet already placed for this round.");
//           return;
//         }

//         const betResult = await dispatch(aviatorPlaceBets(reqData));
//         if (!betResult.error) {
//           console.log("Bet placed successfully");
//           setPlacedRounds(prev => [...prev, roundId]);
//         } else {
//           console.error("Bet placement failed");
//         }
//       }
//       else if (
//         passedData?.isBetting === false &&
//         passedData?.gameStatus === "running" &&
//         aviatorBetFlag &&
//         aviatorBetPlaceData?.betInsertId != null &&
//         !aviatorOneTimeCashout
//       ) {
//         const cashoutResult = await dispatch(aviatorCashOut(reqDataC));
//         if (!cashoutResult.error) {
//           console.log("Cashout successful");
//         } else {
//           console.error("Cashout failed");
//         }
//       }
//       else {
//         console.log("No valid condition matched");
//       }
//     } catch (error) {
//       console.error("Error in handleBetPlace:", error);
//     }
//   };




//   const getButtonLabel = (data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) => {
//     if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag && !aviatorOneTimeCashout)
//       return "Cashout";
//     if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet))
//       return "BET";
//     if ((data?.gameStatus === 'running' && aviatorOneTimeCashout))
//       return "CASHOUT";
//     if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet))
//       return "CANCEL";
//     if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet))
//       return "CASHOUT";
//     if (
//       (!data?.isBetting && data?.gameStatus === 'waiting') ||
//       (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag)
//     )
//       return "WAIT";
//     return;
//   };

//   const getButtonColorClass = (data, aviatorBetFlag, aviatorOneTimeBet) => {
//     if (!data?.isBetting && data?.gameStatus === 'running' && aviatorBetFlag && !aviatorOneTimeCashout)
//       return "gx-bg-orange";
//     if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet))
//       return "gx-bg-green-0";
//     if ((data?.gameStatus === 'running' && aviatorOneTimeCashout))
//       return "gx-bg-blue";
//     if ((data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet))
//       return "gx-bg-red";
//     if ((data?.gameStatus === 'open' && data?.isBetting && aviatorOneTimeBet))
//       return "gx-bg-orange";
//     if (
//       (!data?.isBetting && data?.gameStatus === 'waiting') ||
//       (!data?.isBetting && data?.gameStatus === 'running' && !aviatorBetFlag)
//     )
//       return "gx-bg-red";
//     return "gx-bg-red";
//   };


//   const handleChange1 = (e) => {
//     const value = e.target.value;
//     if (!isNaN(value)) {
//       setCashOutValue1(value);
//     }
//   };

//     useEffect(() => {
//       if (activeTab1 === 'Auto1' && autobetStatus1 && data?.gameStatus === 'waiting' && (betAmount != null || !betAmount <= 0)) {
//         const reqData = {
//           roundId: data?.roundId,
//           amount: betAmount,
//           casinoType: "aviator",
//           eventId: 303031,
//         };
//         dispatch(aviatorPlaceBets(reqData));
//         setCashoutAmount(betAmount)
//       }
  
//     }, [data?.gameStatus == 'waiting', activeTab1 === 'Auto1'])
  
  
//     useEffect(() => {
//       const multiplier = Number(data?.curentMultiplier);
//       const target = Number(cashOutValue1);
  
//       if (
//         activeTab1 === 'Auto1' &&
//         autoCashoutStatus1 &&
//         data?.gameStatus === 'running' &&
//         !isNaN(multiplier) &&
//         !isNaN(target) &&
//         multiplier > 0 &&
//         Math.abs(multiplier - target) <= 0.1 &&
//         !prevTriggered1.current
//       ) {
//         prevTriggered1.current = true;
//         const reqDataC = {
//           roundId: data?.roundId,
//           eventId: 303031,
//           betId: aviatorBetPlaceData?.betInsertId,
//         };
//         dispatch(aviatorCashOut(reqDataC));
  
//       }
  
//       if (data?.gameStatus !== 'running') {
//         prevTriggered1.current = false;
//       }
//     }, [data, activeTab1, autoCashoutStatus1, cashOutValue1]);

//   return (
//     <div className="betting-card1">
//       {/* Tab Switch */}
//         <div className="tab-buttons1-box">
//       <div className="tab-buttons1">
//         <button
//           className={`tab-button1 ${activeTab1 === "Bet1" ? "active" : ""}`}
//           onClick={() => setActiveTab1("Bet1")}
//         >
//           Bet
//         </button>
//         <button
//           className={`tab-button1 ${activeTab1 === "Auto1" ? "active" : ""}`}
//           onClick={() => setActiveTab1("Auto1")}
//         >
//           Auto
//         </button>
//         </div>
//       </div>




//       {/* Bet Controls */}
//       <div className="bet-controls">

//         <div className="amount-controls">
//           <div className="amount-adjust">
//             <button onClick={() => setBetAmount(betAmount - 10)}>-</button>
//             <input
//               type="text"
//               className="amount-display"
//               value={betAmount}
//               min={0}
//               onChange={(e) => {
//                 const val = parseFloat(e.target.value);
//                 if (!isNaN(val)) setBetAmount(val);
//               }}
//             />
//             {/* <div className="amount-display">{betAmount.toFixed(2)}</div> */}
//             <button onClick={() => setBetAmount(betAmount + 10)}>+</button>
//           </div>
//           <div className="preset-buttons">
//             {amounts.map((amount) => (
//               <button
//                 key={amount}
//                 onClick={() => setBetAmount(amount)}
//                 className="preset-button"
//               >
//                 {amount.toFixed(2)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Place Bet Button */}
//         <div className="place-bet">

//           <button
//             disabled={getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) === "WAIT"}

//             className={`place-bet-button ${getButtonColorClass(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout)}`}
//             onClick={() => {
//               const currentData = { ...data };
//               handleBetPlace(betAmount, currentData);
//             }}
//           >
//             {aviatorLoading1 || aviatorLoadingCashout1 ? <Spin tip="Loading..." size="large" indicator={
//               <div
//                 className="custom-spinner"
//                 style={{
//                   width: 24,
//                   height: 24,
//                   border: '6px solid #fff',
//                   borderTop: '3px solid transparent',
//                   borderRadius: '50%',
//                   animation: 'spin 1s linear infinite'
//                 }}
//               />
//             } /> : <>

//               {getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout)}

//               <div>
//                 {(getButtonLabel(data, aviatorBetFlag, aviatorOneTimeBet, aviatorCashoutData, aviatorOneTimeCashout) !== "CASHOUT") && (
//                   <>
//                     {(data?.gameStatus === 'running' && aviatorBetFlag) && (cashoutAmount * data?.curentMultiplier).toFixed(2)}
//                     {(data?.gameStatus == 'open' && data?.isBetting && aviatorOneTimeBet) &&
//                       0.00}
//                     {(data?.gameStatus === 'open' && data?.isBetting && !aviatorOneTimeBet && !aviatorOneTimeCashout) &&
//                       (betAmount).toFixed(2)}

//                   </>
//                 )}
// {data?.gameStatus === 'running' ? "bet place next round" : ''}

//               </div>
//             </>
//             }

//           </button>


//         </div>



//       </div>





//       {/* Auto Settings */}
//       {activeTab1 === "Auto1" && (
//         <div className="auto-settings">
//           <div className="toggle-row">
//             <div className="toggle-group">
//               <span className="toggle-label">Auto Bet</span>
//               <span className={`custom-switch1 ${autobetStatus1 ? "active" : ""}`}>
//                 <input
//                   id="autobet-switch1"
//                   type="checkbox"
//                   onChange={(e) => setAutobetStatus1(e.target.checked)}
//                 />
//                 <label htmlFor="autobet-switch1"></label>
//               </span>
//             </div>

//             <div className="toggle-group">
//               <span className="toggle-label">Auto Cash Out</span>
//               <span className={`custom-switch1 ${autoCashoutStatus1 ? "active" : ""}`}>
//                 <input
//                   id="autocashout-switch1"
//                   type="checkbox"
//                   onChange={(e) => setAutoCashoutStatus1(e.target.checked)}
//                 />
//                 <label htmlFor="autocashout-switch1"></label>
//               </span>
//               <input
//               disabled={autoCashoutStatus1 == true}
//                 type="number"
//                 value={cashOutValue1}
//                 onChange={(e) => handleChange1(e)}
//                 className="cashout-input1"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BettingCard;



