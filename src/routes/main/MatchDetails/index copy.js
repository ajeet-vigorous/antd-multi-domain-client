


// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   AutoComplete,
// //   Button,
// //   Col,
// //   Input,
// //   Row,
// //   Select,
// //   Spin,
// //   Table,
// // } from "antd";
// // import { LoadingOutlined } from "@ant-design/icons";
// // import Auxiliary from "util/Auxiliary";
// // import { useParams } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { useSelector } from "react-redux";
// // import {
// //   ErrorModalClose,
// //   getMatchDetail,
// //   getSportsBetsList,
// //   oddsPlaceBets,
// //   placeBets,
// //   userPositionByMarketId,
// // } from "../../../appRedux/actions/User";
// // import { io } from "socket.io-client";
// // import axios from "axios";
// // import MatchModal from "./MatchModal";
// // import moment from "moment";
// // import AlertModal from "./AlertModal";
// // import { betChipsValues } from "../../../constants/global";
// // import CompletedBetsModal from "./CompletedBetsModal";


// // const MatchDetails = () => {
// //   const { marketId, eventId, cacheUrls } = useParams();
// //   const dispatch = useDispatch();
// //   const intervalIdRef = useRef(null);
// //   const [isConnected, setIsConnected] = useState(false);
// //   // const [socket, setSocket] = useState(null);
// //   const [activeTabTv, setActiveTabTv] = useState(false);
// //   const [activeTabFrame, setActiveTabFame] = useState(false);
// //   const [socketDetails, setsocketDetails] = useState(null);
// //   const [matchScoreDetails, setMatchScoreDetails] = useState(null);
// //   const [matchModal, setMatchModal] = useState(false);
// //   const [inputValue, setInputValue] = useState(0);
// //   const [bookmakerCoin, setBookmakerCoin] = useState({ max: null, min: null });
// //   const [sessionCoin, setSessionCoin] = useState({ max: null, min: null });
// //   const [completedModal, setCompltedModal] = useState(false)
// //   const {
// //     matchDetailsResponse,
// //     userpositionbymarketId,
// //     matchList,
// //     sportsBetsList,
// //     processingBet,
// //     betStatus,
// //   } = useSelector((state) => state.UserReducer);







// //   // const decodedCacheUrl = decodeURIComponent(cacheUrls);

// //   const matchlistfromLocalStorage = JSON.parse(
// //     localStorage.getItem("matchList")
// //   );
// //   const matchCacheUrl = matchlistfromLocalStorage?.find((el) => el.marketId === marketId)?.cacheUrl;


// //   // const matchIframeUrl = matchlistfromLocalStorage?.find(({ marketId: id }) => id === marketId)?.scoreIframe ?? null;

// //   const handleCloseCompletedModal = () => {
// //     setCompltedModal(false)
// //   }


// //   ///////////////////////-----------------------handling bet place Error modals------------------//////////////////////////

// //   // useEffect(() => {
// //   //   if (betStatus !== null) {
// //   //     setMessageModal(true);
// //   //     if (betStatus === true) {
// //   //       SetBetStatusUpdate("success");
// //   //     } else if (betStatus === "error") {
// //   //       SetBetStatusUpdate("error");
// //   //     } else {
// //   //       SetBetStatusUpdate("");
// //   //     }
// //   //   }
// //   // }, [betStatus]);

// //   // const handleCloseAlertModal = () => {
// //   //   setMessageModal(false);
// //   //   SetBetStatusUpdate("");
// //   // };


// //   const handleCloseAlertModal = () => {
// //     dispatch(ErrorModalClose())
// //   };

// //   //////////////////////////////////////////////initial code ////////////////////
// //   const socketRef = useRef(null);

// //   useEffect(() => {


// //     const handleVisibilityChange = () => {
// //       if (document.visibilityState === "visible") {
// //         if (!isConnected) {
// //           connectSocket();
// //         }
// //       } else if(document.visibilityState === "hidden") {
// //         cleanupWebSocket();
// //       }
// //     };

// //     document.addEventListener("visibilitychange", handleVisibilityChange);

// //     setupAsyncActions(marketId);

// //     return () => {
// //       document.removeEventListener("visibilitychange", handleVisibilityChange);
// //       cleanupWebSocket();
// //       clearInterval(intervalIdRef.current);
// //     };
// //   }, [ marketId]);

// //   const setupAsyncActions = async (marketId) => {
// //     setMatchScoreDetails("");
// //     getMatchDataByMarketIdWise();
// //     getuserPositionByMarketIdWise();
// //     fetchBetLists();
// //   };

// //   const getMatchDataByMarketIdWise = async () => {
// //     let reqData = {
// //       marketId: marketId,
// //     };
// //     dispatch(getMatchDetail(reqData));
// //   };
// //   useEffect(()=>{
// //     if(betStatus === true){
// //       getuserPositionByMarketIdWise()
// //     }
// //   },[betStatus])

// //   useEffect(() => {

// //     clearInterval(intervalIdRef.current);
// //     if (matchDetailsResponse) {
// //       // getMarketCacheUrl(decodedCacheUrl);
// //       getMarketCacheUrl(matchCacheUrl)
// //       if (matchDetailsResponse?.socketPerm) {
// //         connectSocket(matchDetailsResponse.socketUrl);
// //       } else {
// //         callCache(matchDetailsResponse.cacheUrl);
// //       }
// //     }
// //   }, [matchDetailsResponse]);

// //   const connectSocket = (socketUrl = matchDetailsResponse?.socketUrl) => {
// //     socketRef.current = io(socketUrl, {
// //       transports: ["websocket"],
// //       reconnection: false,
// //     });

// //     socketRef.current.on("connect", () => {
// //       setIsConnected(true);
// //       socketRef.current.emit("marketByEvent", eventId);
// //     });

// //     socketRef.current.on(eventId, (data) => {
// //       setsocketDetails(JSON.parse(data));
// //     });

// //     if (matchDetailsResponse?.socketPerm === true) {
// //       socketRef.current.emit("JoinRoom", marketId);
// //       socketRef.current.on(marketId, (data) => {

// //         setMatchScoreDetails(JSON.parse(data).result);
// //       });
// //     }
// //   };


// //   const getMarketCacheUrl = async (cacheUrl) => {
// //     try {
// //       const response = await axios.get(cacheUrl);
// //       setMatchScoreDetails(response?.data?.result);
// //     } catch (error) {
// //       setMatchScoreDetails(null);
// //       console.error("Error fetching market cache URL:", error);
// //     }
// //   };

// //   const callCache = (cacheUrl) => {

// //     if (intervalIdRef.current) {
// //       clearInterval(intervalIdRef.current);
// //     }
// //     const newIntervalId = setInterval(() => getMarketCacheUrl(cacheUrl), 1000);
// //     intervalIdRef.current = newIntervalId;
// //   };




// //   const cleanupWebSocket = () => {
// //     if (socketRef.current) {
// //       socketRef.current.disconnect();
// //       socketRef.current = null;
// //       setIsConnected(false);
// //     }
// //   };
// //   const getuserPositionByMarketIdWise = async () => {
// //     let reqData = {
// //       marketId: marketId,
// //     };
// //     dispatch(userPositionByMarketId(reqData));
// //   };

// //   const fetchBetLists = async () => {
// //     try {
// //       const BetListData = {
// //         fancyBet: true,
// //         oddsBet: true,
// //         marketId: marketId,
// //         // isDeclare: false,
// //       };
// //       dispatch(getSportsBetsList(BetListData));
// //     } catch (error) {
// //       console.error("Error fetching bet lists:", error);
// //       throw error;
// //     }
// //   };

// //   ///////////////////////////--------------------------handling user positions --------------///////////////
// //   const [returnDataObject, setReturnDataObject] = useState({});
// //   const [returnDataObject2, setReturnDataObject2] = useState({});



// //   useEffect(() => {
// //     if (userpositionbymarketId) {

// //       let oddsPos = [];

// //       let returMatchOdds = {};
// //       let returnTossMatch = {}
// //       if (userpositionbymarketId?.oddsPosition) {
// //         oddsPos = userpositionbymarketId.oddsPosition;
// //         oddsPos.filter(ele => ele.oddsType === "matchOdds").forEach((data) => {
// //           returMatchOdds[data._id] = data.totalPosition.toFixed(2);
// //         });
// //         setReturnDataObject(returMatchOdds);
// //       }
// //       if (userpositionbymarketId?.oddsPosition) {
// //         oddsPos = userpositionbymarketId.oddsPosition;
// //         oddsPos.filter(ele => ele.oddsType === "toss").forEach((data) => {
// //           returnTossMatch[data._id] = data.totalPosition.toFixed(2);
// //         });
// //         setReturnDataObject2(returnTossMatch);
// //       }
// //       if (userpositionbymarketId?.oddsPosition) {
// //         oddsPos = userpositionbymarketId.oddsPosition;
// //         oddsPos.filter(ele => ele.oddsType === "tiedMatch").forEach((data) => {
// //           returnTossMatch[data._id] = data.totalPosition.toFixed(2);
// //         });
// //         setReturnDataObject2(returnTossMatch);
// //       }

// //       // const finalOddsTotalPosTemp = bookmakerTeamData.map((teamData) => {
// //       //   let pushPos = 0;
// //       //   if (returnDataObjectTemp[teamData.betfairSelectionId]) {
// //       //     pushPos += returnDataObjectTemp[teamData.betfairSelectionId];
// //       //   }
// //       //   if (returnDataObjectTemp[teamData.bookmakerSelectionId]) {
// //       //     pushPos += returnDataObjectTemp[teamData.bookmakerSelectionId];
// //       //   }
// //       //   return { ...teamData, finalPos: pushPos };
// //       // });

// //       // setFinalOddsTotalPos(finalOddsTotalPosTemp);
// //     }
// //   }, [userpositionbymarketId]);

// //   //////////////////////////////-----------------------handling scroll effect -----------------------///////////////////////
// //   const scrollToRef = useRef(null);
// //   const inputRef2 = useRef(null);  /////// desktop
// //   const inputRef = useRef(null);  //////// mobile
// //   const scrollToElement = () => {
// //     scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
// //     if (inputRef.current) {

// //       setTimeout(() => {
// //         if (inputRef.current) {
// //           inputRef.current.focus();
// //         }
// //       }, 500);
// //     }
// //     if (inputRef2.current) {

// //       setTimeout(() => {
// //         if (inputRef2.current) {
// //           inputRef2.current.focus();
// //         }
// //       }, 500);
// //     }
// //   };
// //   // const scrollToRef = useRef(null);
// //   // const scrollToElement = () => {
// //   //   scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
// //   // };
// //   ///////////////////---------------------Timer ConCept and bet handling handlebet place ----------------------
// //   const [timeLeft, setTimeLeft] = useState(0);
// //   const [betModalData, setBetModalData] = useState(false);
// //   const [betChips, setBetChips] = useState(betChipsValues);

// //   useEffect(() => {
// //     if (timeLeft === 0) {
// //       setBetModalData({});
// //       setInputValue(0);
// //       return;
// //     }

// //     const intervalId = setInterval(() => {
// //       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
// //     }, 1000);

// //     return () => clearInterval(intervalId);
// //   }, [timeLeft]);

// //   const handlebet = (record) => {
// //     setBetModalData(record);
// //     setTimeLeft(10);
// //   };
// //   useEffect(() => {
// //     const authUser = localStorage.getItem("authUser");
// //     if (authUser) {
// //       const authUserData = JSON.parse(authUser);
// //       const betChipsData = authUserData?.data?.betChipsData;
// //       setBetChips(betChipsData);
// //     } else {
// //       setBetChips(betChipsValues);
// //     }
// //   }, []);
// //   const handleCloseMatchModal = () => {
// //     setMatchModal(false);
// //   };

// //   /////////////////////////////////////////--------------------filtering table  odd , completed and incompletedfancy -------------------------------- ///////////////////////////
// //   const [oddsbetdata, setOddsbetData] = useState();
// //   const [incomletedFancy, setIncompletedFancy] = useState();
// //   const [compltedFancy, setCompletedFancy] = useState();
// //   useEffect(() => {
// //     if (sportsBetsList) {
// //       const sortedOddsBetData = sportsBetsList?.data?.oddsBetData
// //         ? sportsBetsList?.data?.oddsBetData
// //           .slice()
// //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //         : [];
// //       const filteredFancyBetData = sportsBetsList?.data?.fancyBetData
// //         ? sportsBetsList?.data?.fancyBetData.sort(
// //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //         )
// //         : [];
// //       const completeFancy =
// //         filteredFancyBetData && filteredFancyBetData.length > 0
// //           ? filteredFancyBetData.filter((element) => element.isDeclare === 1)
// //           : [];
// //       let showCompletedFancy = [];

// //       completeFancy.map((data) => {
// //         let pos = 0;
// //         if (data.decisionRun >= data.run && data.type === "Y") {
// //           pos = Math.round(data.amount * data.odds);
// //         } else if (data.decisionRun >= data.run && data.type === "N") {
// //           pos = Math.round(-1 * data.amount * data.odds);
// //         } else if (data.decisionRun < data.run && data.type === "Y") {
// //           pos = Math.round(-1 * data.amount);
// //         } else if (data.decisionRun < data.run && data.type === "N") {
// //           pos = Math.round(data.amount);
// //         }
// //         data.pos = pos;
// //         showCompletedFancy.push(data);
// //       });
// //       setOddsbetData(sortedOddsBetData);
// //       setCompletedFancy(showCompletedFancy);
// //       setIncompletedFancy(
// //         filteredFancyBetData && filteredFancyBetData.length > 0
// //           ? filteredFancyBetData.filter((element) => element.isDeclare === 0)
// //           : []
// //       );
// //     }
// //   }, [sportsBetsList]);
// //   ////////////////////-----------------------------placing bets ----------------------//////////////////
// //   useEffect(() => {
// //     const maxCoinData = matchDetailsResponse?.maxMinCoins
// //       ? JSON.parse(matchDetailsResponse?.maxMinCoins)
// //       : {
// //         maximum_match_bet: null,
// //         minimum_match_bet: null,
// //         maximum_session_bet: null,
// //         minimum_session_bet: null,
// //       };

// //     setBookmakerCoin({
// //       max: maxCoinData?.maximum_match_bet,
// //       min: maxCoinData?.minimum_match_bet,
// //     });
// //     setSessionCoin({
// //       max: maxCoinData?.maximum_session_bet,
// //       min: maxCoinData?.minimum_session_bet,
// //     });
// //   }, [matchDetailsResponse]);
// //   useEffect(() => {
// //     if (processingBet === false) {
// //       fetchBetLists();
// //       setTimeLeft(0);
// //     }
// //   }, [processingBet]);

// //   const placeNewBet = () => {

// //     if (betModalData.oddsType === "bookmaker" || betModalData.oddsType === "matchOdds" || betModalData.oddsType === "toss" || betModalData.oddsType === "tiedMatch" ) {
// //       const reqData = {
// //         odds: betModalData.odds + "",
// //         amount: inputValue,
// //         selectionId: betModalData.selectionId + "",
// //         marketId: marketId + "",
// //         betfairMarketId: betModalData.betfairMarketId + "",
// //         eventId: eventId,
// //         betFor: betModalData.betFor + "",
// //         run: betModalData.runs ? betModalData.runs + "" : "0",
// //         oddsType: betModalData.oddsType + "",
// //         type:
// //           betModalData.oddsType === "fancy"
// //             ? betModalData.type + ""
// //             : betModalData.betType + "",
// //       };
// //       if (
// //         // reqData.amount <= bookmakerCoin.max &&
// //         // reqData.amount >= bookmakerCoin.min &&
// //         reqData.amount > 0
// //       ) {
// //         dispatch(oddsPlaceBets(reqData));
// //       } else {
// //         setTimeLeft(0);
// //       }
// //     }
// //     if (betModalData.oddsType === "fancy") {
// //       const reqData = {
// //         odds: betModalData.odds + "",
// //         amount: inputValue,
// //         selectionId: betModalData.selectionId + "",
// //         marketId: marketId + "",
// //         eventId: eventId,
// //         betFor: betModalData.betFor + "",
// //         run: betModalData.runs ? betModalData.runs + "" : "0",
// //         oddsType: betModalData.oddsType + "",
// //         type:
// //           betModalData.oddsType === "fancy"
// //             ? betModalData.type + ""
// //             : betModalData.betType + "",
// //       };
// //       if (
// //         // reqData.amount <= sessionCoin.max &&
// //         // reqData.amount >= sessionCoin.min &&
// //         reqData.amount > 0
// //       ) {
// //         dispatch(placeBets(reqData));
// //       } else {
// //         setTimeLeft(0);
// //       }
// //     }
// //   };

// //   /////////////////////////////-------------------- bests calling every 10 sec ---------------------------------///////////////////////////////
// //   useEffect(() => {
// //     fetchBetLists();
// //     // const fetchBetListsInterval = setInterval(() => {
// //     //   fetchBetLists();
// //     // }, 10000);

// //     // return () => {
// //     //   clearInterval(fetchBetListsInterval);
// //     // };
// //   }, []);
// //   ////////////////////////////----------------------- Bookmaker Data --------------------//////////////////




// //   const data = [];
// //   if (matchScoreDetails) {


// //     matchScoreDetails?.team_data?.forEach((ele, i) => {
// //       data.push({
// //         key: i,
// //         teamName: ele.team_name,
// //         lgaai: ele.lgaai,
// //         khaai: ele.khaai,
// //         positon: ele.positon,
// //         selectionid: ele.selectionid,
// //       });
// //     });
// //   }

// //   const columns = [
// //     {
// //       title: (
// //         <div
// //           style={{ gap: "10rem" }}
// //           className="gx-bg-flex gx-justify-content-start "
// //         >
// //           <span className="gx-d-none gx-d-lg-block">Bookmaker</span>
// //           <span style={{ textWrap: "nowrap" }}>
// //             Min: {bookmakerCoin?.min} Max: {bookmakerCoin?.max}
// //           </span>
// //         </div>
// //       ),
// //       dataIndex: "teamName",
// //       className: "",
// //       key: "teamName",

// //       width: "60%",
// //       render: (text, record, index) => (
// //         <div className="gx-bg-flex gx-">
// //           <div className=" gx-font-weight-semi-bold gx-text-uppercase">
// //             {text}
// //           </div>
// //           <div
// //             className={`gx-font-weight-semi-bold ${userpositionbymarketId?.oddsPosition?.find(
// //               (item) => item?._id === record?.selectionid
// //             )?.Position > 0
// //               ? "gx-text-primary"
// //               : "gx-text-red"
// //               } `}
// //           >
// //             {
// //               userpositionbymarketId?.oddsPosition?.find(
// //                 (item) => item?._id === record?.selectionid
// //               )?.Position.toFixed(2)
// //             }
// //           </div>
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Lagai",
// //       dataIndex: "lgaai",
// //       key: "lgaai",
// //       width: "20%",
// //       align: "center",

// //       render: (text, record, index) => (
// //         <div
// //           onClick={() => {
// //             if (Number(text) <= 0) return;
// //             handlebet({
// //               sessionName: record.teamName,
// //               odds: record.lgaai,
// //               selectionId: record.selectionid,
// //               type: "YES",
// //               betType: "L",
// //               betForMarketId: marketId,
// //               marketId: marketId,
// //               eventId: eventId,
// //               oddsType: "bookmaker",
// //               betFor: "odds",
// //               printData: "Lagai"

// //             });
// //             scrollToElement();
// //           }}
// //           className="gx-font-weight-semi-bold gx-text-blue gx-fs-lg gx-text-uppercase"
// //         >
// //           {(Number(text) * 100).toFixed(0)}
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Khai",
// //       dataIndex: "khaai",
// //       key: "khaai",
// //       width: "20%",
// //       align: "center",
// //       render: (text, record, index) => (
// //         <div
// //           onClick={() => {
// //             if (Number(text) <= 0) return;
// //             handlebet({
// //               sessionName: record.teamName,
// //               odds: record.khaai,
// //               selectionId: record.selectionid,
// //               type: "NO",
// //               betType: "K",
// //               betForMarketId: marketId,
// //               marketId: marketId,
// //               eventId: eventId,
// //               oddsType: "bookmaker",
// //               betFor: "odds",
// //               printData: "Khai"
// //             });
// //             scrollToElement();
// //           }}
// //           className="gx-font-weight-semi-bold gx-text-red gx-fs-lg gx-text-capitalize"
// //         >
// //           {(Number(text) * 100).toFixed(0)}
// //         </div>
// //       ),
// //     },
// //   ];

// //   ///////////////////-----------------------odddsss data -------------------//////////////////////

// //   const oddsData = [];
// //   if (matchDetailsResponse) {

// //     const matchoddsData = matchDetailsResponse?.marketList
// //     ?.filter((el) => el.marketType === "Match Odds")[0]

// //     const sortedSelectionIdData = matchoddsData
// //       ?.selectionIdData?.slice()
// //       ?.sort((a, b) => a.sortPriority - b.sortPriority);

// //       const betfairmatchoddsMarketId = matchoddsData.marketId




// //     sortedSelectionIdData?.forEach((ele, i) => {
// //       oddsData.push({
// //         key: i,
// //         runnerName: ele.runnerName,
// //         selectionId: ele.selectionId,
// //         lgaaiprice: socketDetails
// //           ?.find((el) => el.marketType === "Match Odds")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
// //           ?.availableToLay[0]?.price,
// //         lgaaisize: socketDetails
// //           ?.find((el) => el.marketType === "Match Odds")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)
// //           ?.ex?.availableToLay[0]?.size?.toFixed(2),
// //         khaaiprice: socketDetails
// //           ?.find((el) => el.marketType === "Match Odds")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
// //           ?.availableToBack[0]?.price,
// //         khaaisize: socketDetails
// //           ?.find((el) => el.marketType === "Match Odds")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)
// //           ?.ex?.availableToBack[0]?.size?.toFixed(2),
// //         oddsposition:
// //           returnDataObject[ele.selectionId] !== 0
// //             ? returnDataObject[ele.selectionId]
// //             : "-",
// //           betfairMarketId: betfairmatchoddsMarketId
// //       });
// //     });
// //   }
// //   const oddsColumn = [
// //     {
// //       title: (
// //         <div style={{ display: "flex " }}>
// //           <span>Match Odds</span>
// //         </div>
// //       ),
// //       dataIndex: "runnerName",

// //       key: "runnerName",

// //       width: "60%",
// //       render: (text, record, index) => (
// //         <div className="gx-bg-flex">
// //           <div className=" gx-font-weight-semi-bold ">{text}</div>
// //           <div
// //             className={`gx-font-weight-semi-bold ${
// //               record.oddsposition > 0 ? "gx-text-primary" : "gx-text-red"
// //             }`}
// //           >
// //             {record.oddsposition}
// //           </div>
// //         </div>
// //       ),
// //     },

// //     {
// //       title: "Lay",
// //       dataIndex: "lgaai",
// //       key: "lgaai",
// //       width: "20%",

// //       align: "center",
// //       render: (text, record, index) => (
// //         <div  onClick={() => {
// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.lgaaiprice,
// //             selectionId: record.selectionId,
// //             type: "YES",
// //             betType: "K",
// //             // run:record.lgaaisize,
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "matchOdds",
// //             betFor: "matchOdds",
// //             printData: "Lagai",
// //             betfairMarketId:record.betfairMarketId

// //           });
// //           scrollToElement();
// //         }} className="gx-font-weight-semi-bold gx-text-primary gx-bg-flex gx-flex-column">
// //           <span>{record.lgaaiprice}</span>
// //           <span>{record.lgaaisize}</span>
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Back",
// //       dataIndex: "khaai",
// //       key: "khaai",
// //       width: "20%",
// //       align: "center",
// //       render: (text, record, index) => (
// //         <div onClick={() => {

// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.khaaiprice,
// //             selectionId: record.selectionId,
// //             type: "NO",
// //             betType: "L",
// //             // run:record.khaaisize,
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "matchOdds",
// //             betFor: "matchOdds",
// //             printData: "Lagai",
// //             betfairMarketId:record.betfairMarketId

// //           });
// //           scrollToElement();
// //         }}  className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
// //           <span>{record.khaaiprice}</span>
// //           <span>{record.khaaisize}</span>
// //         </div>
// //       ),
// //     },
// //   ];

// //   ///////////////////////////////////-------------------Tied data --------------////////////////////////

// //   const tiedData = [];
// //   if (matchDetailsResponse) {

// //     const tiedMatchData =  matchDetailsResponse?.marketList
// //     ?.filter((el) => el.marketType === "Tied Match")[0]
// //     const sortedSelectionIdData =tiedMatchData?.selectionIdData?.slice()
// //       ?.sort((a, b) => a.sortPriority - b.sortPriority);
// //       const betfairTiedId = tiedMatchData.marketId
// //     sortedSelectionIdData?.forEach((ele, i) => {
// //       tiedData.push({
// //         key: i,
// //         runnerName: ele.runnerName,
// //         selectionId: ele.selectionId,
// //         lgaaiprice: socketDetails
// //           ?.find((el) => el.marketType === "Tied Match")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
// //           ?.availableToLay[0]?.price,
// //         lgaaisize: socketDetails
// //           ?.find((el) => el.marketType === "Tied Match")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)
// //           ?.ex?.availableToLay[0]?.size.toFixed(2),
// //         khaaiprice: socketDetails
// //           ?.find((el) => el.marketType === "Tied Match")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
// //           ?.availableToBack[0]?.price,
// //         khaaisize: socketDetails
// //           ?.find((el) => el.marketType === "Tied Match")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionId)
// //           ?.ex?.availableToBack[0]?.size.toFixed(2),
// //         tiedposition:
// //           returnDataObject2[ele.selectionId] !== 0
// //             ? returnDataObject2[ele.selectionId]
// //             : "-",
// //             betfairMarketId : betfairTiedId
// //       });
// //     });
// //   }
// //   const tiedColumn = [
// //     {
// //       title: (
// //         <div style={{ display: "flex " }}>
// //           <span>Tied Match</span>
// //         </div>
// //       ),
// //       dataIndex: "runnerName",
// //       width: "60%",
// //       render: (text, record, index) => (
// //         <div className="gx-bg-flex">
// //           <div className=" gx-font-weight-semi-bold ">{text}</div>
// //           <div  className={`gx-font-weight-semi-bold ${record.tiedposition > 0 ? "gx-text-primary" : "gx-text-red" } `}>
// //             {record.tiedposition}
// //           </div>
// //         </div>
// //       ),
// //     },

// //     {
// //       title: "Lay",
// //       dataIndex: "lgaai",
// //       key: "lgaai",
// //       width: "20%",
// //       align: "center",
// //       render: (text, record, index) => (
// //         <div onClick={() => {
// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.lgaaiprice,
// //             selectionId: record.selectionId,
// //             type: "NO",
// //             betType: "K",
// //             run:'0',
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "tiedMatch",
// //             betFor: "tiedMatch",
// //             printData: "Lagai",
// //             betfairMarketId:record.betfairMarketId
// //           });
// //           scrollToElement();
// //         }} className="gx-font-weight-semi-bold gx-text-primary gx-bg-flex gx-flex-column">
// //           <span>{record.lgaaiprice}</span>
// //           <span>{record.lgaaisize}</span>
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Back",
// //       dataIndex: "khaai",
// //       key: "khaai",
// //       width: "20%",
// //       align: "center",
// //       render: (text, record, index) => (
// //         <div onClick={() => {

// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.khaaiprice,
// //             selectionId: record.selectionId,
// //             type: "NO",
// //             betType: "L",
// //             run:'0',
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "tiedMatch",
// //             betFor: "tiedMatch",
// //             printData: "Back",
// //             betfairMarketId:record.betfairMarketId
// //           });
// //           scrollToElement();
// //         }} className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
// //           <span>{record.khaaiprice}</span>
// //           <span>{record.khaaisize}</span>
// //         </div>
// //       ),
// //     },
// //   ];

// //   ///////////////////////////////////-------------------Toss data --------------////////////////////////
// //   const tossData = [];
// //   if (matchDetailsResponse) {
// //     const sortedSelectionIdData = matchScoreDetails?.toss_data

// //     sortedSelectionIdData?.forEach((ele, i) => {
// //       tossData.push({
// //         key: i,
// //         runnerName: ele.team_name,
// //         selectionId: ele.selectionid,
// //         lgaaiprice: ele.lgaai,
// //         lgaaisize: socketDetails
// //           ?.find((el) => el.marketType === "To Win the Toss")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionid)
// //           ?.ex?.availableToLay[0]?.size.toFixed(2),
// //         khaaiprice: ele.khaai,
// //         khaaisize: socketDetails
// //           ?.find((el) => el.marketType === "To Win the Toss")
// //           ?.runners?.find((item) => item.selectionId === ele.selectionid)
// //           ?.ex?.availableToBack[0]?.size.toFixed(2),
// //         tossposition:
// //           returnDataObject2[ele.selectionid] !== 0
// //             ? returnDataObject2[ele.selectionid]
// //             : "-",
// //       });
// //     });
// //   }

// //   const tossColumn = [
// //     {
// //       title: (
// //         <div style={{ display: "flex " }}>
// //           <span>Toss Data</span>
// //         </div>
// //       ),
// //       dataIndex: "runnerName",

// //       key: "runnerName",

// //       width: "60%",
// //       render: (text, record, index) => (
// //         <div className="">
// //           <div className=" gx-font-weight-semi-bold ">{text}</div>
// //           <div className={`gx-font-weight-semi-bold ${record.tossposition > 0 ? "gx-text-primary" : "gx-text-red" } `}>
// //             {record.tossposition}
// //           </div>
// //         </div>
// //       ),
// //     },

// //     {
// //       title: "Lay",
// //       dataIndex: "lgaai",
// //       key: "lgaai",
// //       width: "20%",

// //       align: "center",
// //       render: (text, record, index) => (
// //         <div onClick={() => {

// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.lgaaiprice,
// //             selectionId: record.selectionId,
// //             type: "NO",
// //             betType: "L",
// //             // run:record.khaaisize,
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "toss",
// //             betFor: "toss",
// //             printData: "Lagai",
// //           });
// //           scrollToElement();
// //         }} className="gx-font-weight-semi-bold gx-bg-flex gx-text-primary gx-flex-column">
// //           <span>{record.lgaaiprice}</span>
// //           <span>{record.lgaaisize}</span>
// //         </div>
// //       ),
// //     },
// //     {
// //       title: "Back",
// //       dataIndex: "khaai",

// //       key: "khaai",
// //       width: "20%",
// //       align: "center",
// //       render: (text, record, index) => (
// //         <div onClick={() => {

// //           if (Number(text) <= 0) return;
// //           handlebet({
// //             sessionName: record.teamName,
// //             odds: record.khaaiprice,
// //             selectionId: record.selectionId,
// //             type: "NO",
// //             betType: "K",
// //             // run:record.khaaisize,
// //             betForMarketId: marketId,
// //             marketId: marketId,
// //             eventId: eventId,
// //             oddsType: "toss",
// //             betFor: "toss",
// //             printData: "Back",
// //           });
// //           scrollToElement();
// //         }} className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
// //           <span>{record.khaaiprice}</span>
// //           <span>{record.khaaisize}</span>
// //         </div>
// //       ),
// //     },
// //   ];

// //   //  //////////////////////--------------------------fancy data----------------------/////////////////////////////////

// //   const data2 = [];
// //   if (matchScoreDetails) {
// //     // const sortedSessions = matchScoreDetails.session?.sort((a, b) => a.session_name - b.session_name);

// //     // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
// //     //   const getInitialChar = (str) => str.trim().charAt(0);

// //     //   // Extract starting characters
// //     //   const charA = getInitialChar(a.session_name);
// //     //   const charB = getInitialChar(b.session_name);

// //     //   // Check if characters are digits
// //     //   const isDigitA = /^\d/.test(charA);
// //     //   const isDigitB = /^\d/.test(charB);

// //     //   // If both are digits or both are letters, sort accordingly
// //     //   if (isDigitA && isDigitB) {
// //     //     // Extract numeric part and compare
// //     //     const numA = parseInt(a.session_name.match(/^\d+/)?.[0] || '0', 10);
// //     //     const numB = parseInt(b.session_name.match(/^\d+/)?.[0] || '0', 10);
// //     //     return numA - numB;
// //     //   } 
// //     //   if (isDigitA && !isDigitB) {
// //     //     // Digits come before letters
// //     //     return -1;
// //     //   }
// //     //   if (!isDigitA && isDigitB) {
// //     //     // Letters come after digits
// //     //     return 1;
// //     //   }

// //     //   // If both start with letters, sort alphabetically
// //     //   return a.session_name.localeCompare(b.session_name);
// //     // });

// //     const sortedSessions = matchScoreDetails.session.sort((a, b) => {
// //       // Helper functions
// //       const getInitialChar = (str) => str.trim().charAt(0);
// //       const startsWithDigit = (str) => /^\d/.test(str);
// //       const includesOver = (str) => /OVER/.test(str);
// //       const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
// //       const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

// //       // Extract session names
// //       const nameA = a.session_name;
// //       const nameB = b.session_name;

// //       // Check properties of the session names
// //       const isDigitA = startsWithDigit(nameA);
// //       const isDigitB = startsWithDigit(nameB);
// //       const includesOverA = includesOver(nameA);
// //       const includesOverB = includesOver(nameB);
// //       const containsFirstA = containsFirst(nameA);
// //       const containsFirstB = containsFirst(nameB);

// //       // Handle cases where either session contains "1ST" or "FIRST"
// //       if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
// //       if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

// //       // First priority: Digits with "OVER" come before digits without "OVER"
// //       if (isDigitA && isDigitB) {
// //         if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
// //         if (!includesOverA && includesOverB) return 1;  // "OVER" comes after non-"OVER"

// //         // If both have or don't have "OVER", sort numerically
// //         const numA = getNumericPart(nameA);
// //         const numB = getNumericPart(nameB);
// //         return numA - numB;
// //       }

// //       // Second priority: Digits come before letters
// //       if (isDigitA && !isDigitB) return -1; // Digits come before letters
// //       if (!isDigitA && isDigitB) return 1;  // Letters come after digits

// //       // Third priority: Sort alphabetically for letters
// //       return nameA.localeCompare(nameB);
// //     });


// //     // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
// //     //   return parseInt(a.priority, 10) - parseInt(b.priority, 10);
// //     // });
// //     sortedSessions?.forEach((ele, i) => {
// //       data2.push({
// //         key: i,
// //         session_name: ele.session_name,
// //         oddsYes: ele.oddsYes,
// //         oddsNo: ele.oddsNo,
// //         runsNo: ele.runsNo,
// //         runsYes: ele.runsYes,
// //         running_status: ele.running_status,
// //         session_id: ele.session_id,
// //         max: ele.max,
// //         selectionId: ele.Selection_id,
// //       });
// //     });
// //   }
// //   const fancyColumns = [
// //     {
// //       title: (
// //         <div className="gx-bg-flex gx-justify-content-center">session</div>
// //       ),
// //       dataIndex: "session_name",
// //       key: "session_name",
// //       width: "60%",
// //       padding: "0px",

// //       render: (text, record, index) => {
// //         return (
// //           <div className=" gx-my-0">
// //             <div className="gx-font-weight-semi-bold">{text}</div>
// //             <div className="gx-font-weight-semi-bold gx-fs-sm">
// //               session Limit : {record.max}
// //             </div>
// //           </div>
// //         );
// //       },
// //     },
// //     {
// //       title: "No",
// //       dataIndex: "oddsNo",
// //       key: "oddsNo",
// //       width: "20%",
// //       onCell: (record, rowIndex) => ({
// //         className:
// //           record.running_status === "SUSPENDED"
// //             ? "matchdtailsSuspendBackground"
// //             : "",
// //       }),
// //       align: "center",
// //       render: (text, record) => {
// //         return record.running_status !== "SUSPENDED" ? (
// //           <div
// //             onClick={() => {
// //               if (record.runsNo <= 0) return;
// //               handlebet({
// //                 sessionName: record.session_name,
// //                 odds: record.oddsNo,
// //                 runs: record.runsNo,
// //                 selectionId: record.session_id,
// //                 type: "N",
// //                 betForMarketId: marketId,
// //                 marketId: marketId,
// //                 eventId: eventId,
// //                 oddsType: "fancy",
// //                 betFor: "fancy",
// //                 printData: "No"

// //               });
// //               scrollToElement();
// //             }}
// //           >
// //             <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-red">
// //               {record.runsNo}
// //             </div>
// //             <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-red">
// //               {(Number(text) * 100).toFixed(0)}
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="gx-fs-xs  gx-fs-lg gx-text-red gx-font-weight-semi-bold">0</div>
// //             <div className="gx-fs-xs  gx-fs-xs gx-text-red gx-font-weight-semi-bold">0.00</div>
// //           </>
// //         );
// //       },
// //     },
// //     {
// //       title: "YES",
// //       dataIndex: "oddsYes",
// //       width: "20%",
// //       onCell: (record) => ({
// //         className:
// //           record.running_status === "SUSPENDED"
// //             ? "matchdtailsSuspendBackground"
// //             : "",
// //       }),
// //       key: "oddsYes",

// //       align: "center",
// //       render: (text, record) => {
// //         return record.running_status !== "SUSPENDED" ? (
// //           <div
// //             onClick={() => {
// //               if (record.runsYes <= 0) return;
// //               handlebet({
// //                 sessionName: record.session_name,
// //                 odds: record.oddsYes,
// //                 runs: record.runsYes,
// //                 selectionId: record.session_id,
// //                 type: "Y",
// //                 betForMarketId: marketId,
// //                 marketId: marketId,
// //                 eventId: eventId,
// //                 oddsType: "fancy",
// //                 betFor: "fancy",
// //                 printData: "Yes"
// //               });
// //               scrollToElement();
// //             }}
// //           >
// //             <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-blue">
// //               {record.runsYes}
// //             </div>
// //             <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-blue">
// //               {(Number(text) * 100).toFixed(0)}
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="gx-fs-xs gx-fs-lg gx-text-blue gx-font-weight-semi-bold">0</div>
// //             <div className="gx-fs-xs gx-fs-xs gx-text-blue gx-font-weight-semi-bold">0.00</div>
// //           </>
// //         );
// //       },
// //     },
// //   ];

// //   //  //////////////////////--------------------------match bets data----------------------/////////////////////////////////
// //   const mybets = [
// //     {
// //       title: "Team",
// //       dataIndex: "Team",
// //       key: "Team",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "oddsType",
// //       dataIndex: "oddsType",
// //       key: "oddsType",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Amount",
// //       dataIndex: "Amount",
// //       key: "Amount",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },

// //     {
// //       title: "Rate",
// //       dataIndex: "Rate",
// //       key: "Rate",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Mode",
// //       dataIndex: "Type",
// //       key: "Type",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //   ];
// //   const generateOddsData = () => {
// //     const data = [];

// //     oddsbetdata?.forEach((element, index) => {
// //       data.push({
// //         key: index,
// //         Runs: element.run,
// //         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
// //         Amount: Number.parseFloat(element.amount).toFixed(2),
// //         Type:
// //           element.type === "N"
// //             ? "NO"
// //             : element.type === "Y"
// //               ? "YES"
// //               : element.type === "K"
// //                 ? "Khai"
// //                 : element.type === "L"
// //                   ? "Lagai"
// //                   : "",

// //         Team: element.teamName,
// //         Client: `${element.userInfo && element.userInfo.clientName
// //           ? element.userInfo.clientName
// //           : ""
// //           } ${element.userInfo && element.userInfo.clientCode
// //             ? element.userInfo.clientCode
// //             : ""
// //           }`,
// //         Agent: `${element.userInfo && element.userInfo.creatorName
// //           ? element.userInfo.creatorName
// //           : ""
// //           }`,
// //         oddsType: `${element.oddsType}`,
// //         Date: `${element.createdAt
// //           ? moment(element.createdAt)
// //             .utcOffset("+05:30")
// //             .format("DD MMM hh:mm:ss A")
// //           : ""
// //           }`,
// //         Loss: `${element.loss
// //           ? Number.parseFloat(Math.abs(element.loss)).toFixed(2)
// //           : 0
// //           }`,
// //         Profit: `${element.profit
// //           ? Number.parseFloat(Math.abs(element.profit)).toFixed(2)
// //           : 0
// //           }`,
// //       });
// //     });
// //     return data;
// //   };

// //   const mybetsData = generateOddsData();

// //   //////////////////////////////////////--------------------------------------Incompleted fancy data -------------------////////////////

// //   const IncompltedBetsColumn = [
// //     {
// //       title: "Runner",
// //       dataIndex: "Team",
// //       key: "Team",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },

// //     {
// //       title: "Amount",
// //       dataIndex: "Amount",
// //       key: "Amount",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Run",
// //       dataIndex: "Runs",
// //       key: "Runs",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Rate",
// //       dataIndex: "Rate",
// //       key: "Rate",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Mode",
// //       dataIndex: "Type",
// //       key: "Type",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //   ];

// //   const generateInCompletedData = () => {
// //     const data = [];

// //     incomletedFancy?.forEach((element, index) => {
// //       data.push({
// //         key: index,
// //         Runs: element.run,
// //         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
// //         Amount: Number.parseFloat(element.amount).toFixed(2),
// //         Type:
// //           element.type === "N"
// //             ? "NO"
// //             : element.type === "Y"
// //               ? "YES"
// //               : element.type === "K"
// //                 ? "Khaai"
// //                 : element.type === "L"
// //                   ? "Lagaai"
// //                   : "",

// //         Team: element.sessionName ? element.sessionName : "-",
// //         Client: `${element.userInfo && element.userInfo.clientName
// //           ? element.userInfo.clientName
// //           : ""
// //           } ${element.userInfo && element.userInfo.clientCode
// //             ? element.userInfo.clientCode
// //             : ""
// //           }`,
// //         Agent: `${element.userInfo && element.userInfo.creatorName
// //           ? element.userInfo.creatorName
// //           : ""
// //           }`,
// //         oddsType: `${element.oddsType}`,
// //         Date: `${element.createdAt
// //           ? moment(element.createdAt)
// //             .utcOffset("+05:30")
// //             .format("DD MMM hh:mm:ss A")
// //           : ""
// //           }`,
// //       });
// //     });
// //     return data;
// //   };

// //   const IncompleteddataList = generateInCompletedData();
// //   ////////////////////////////////////////--------------------------------------completed fancy data -------------------////////////////////

// //   const compltedBetsColumn = [
// //     {
// //       title: "Runner",
// //       dataIndex: "Team",
// //       key: "Team",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },

// //     {
// //       title: "Amount",
// //       dataIndex: "Amount",
// //       key: "Amount",
// //     },
// //     {
// //       title: "Run",
// //       dataIndex: "Runs",
// //       key: "Runs",
// //     },
// //     {
// //       title: "Rate",
// //       dataIndex: "Rate",
// //       key: "Rate",
// //     },
// //     {
// //       title: "Mode",
// //       dataIndex: "Type",
// //       key: "Type",
// //     },
// //     {
// //       title: "Date",
// //       dataIndex: "Date",
// //       key: "Date",
// //       render: (value) => <span className="gx-text-nowrap">{value}</span>
// //     },
// //     {
// //       title: "Results",
// //       dataIndex: "results",
// //       key: "results",
// //     },
// //     {
// //       title: "P&L",
// //       dataIndex: "pos",
// //       key: "pos",
// //       render: (value) => <span className={`${value > 0 ? 'gx-text-blue' : value < 0 ? 'gx-text-red' : 'gx-text-black'}`}>{value}</span>
// //     },
// //   ];
// //   const generateCompletedData = () => {
// //     const data = [];

// //     compltedFancy?.forEach((element, index) => {
// //       data.push({
// //         key: index,
// //         Runs: element.run,
// //         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
// //         Amount: Number.parseFloat(element.amount).toFixed(2),
// //         Type:
// //           element.type === "N"
// //             ? "NO"
// //             : element.type === "Y"
// //               ? "YES"
// //               : element.type === "K"
// //                 ? "Khai"
// //                 : element.type === "L"
// //                   ? "Lagai"
// //                   : "",

// //         Team: element.sessionName,
// //         Client: `${element.userInfo && element.userInfo.clientName
// //           ? element.userInfo.clientName
// //           : ""
// //           } ${element.userInfo && element.userInfo.clientCode
// //             ? element.userInfo.clientCode
// //             : ""
// //           }`,
// //         Agent: `${element.userInfo && element.userInfo.creatorName
// //           ? element.userInfo.creatorName
// //           : ""
// //           }`,
// //         oddsType: `${element.oddsType}`,
// //         results: `${element.decisionRun}`,
// //         Date: `${element.createdAt
// //           ? moment(element.createdAt)
// //             .utcOffset("+05:30")
// //             .format("DD MMM hh:mm:ss A")
// //           : ""
// //           }`,
// //         pos: `${Math.round(Math.abs(element.pos))}`,
// //       });
// //     });
// //     return data;
// //   };

// //   const completeddataList = generateCompletedData();
// //   const handleInputChange = (value) => {
// //     if (!isNaN(value)) {
// //       setInputValue(value);
// //     } else if (value === "") {
// //       setInputValue(value);
// //     }
// //   };

// //   const options = Object.keys(betChips).map((key) => ({
// //     value: String(betChips[key]),
// //   }));

// //   // if(!matchDetailsResponse || matchDetailsResponse === undefined){
// //   //   return
// //   // }
// //   // console.log(socketDetails,"socketlsfjdgh")

// //   return (
// //     <Auxiliary>

// //       {
// //         completedModal &&
// //         <CompletedBetsModal handleClose={handleCloseCompletedModal} compltedBetsColumn={compltedBetsColumn} completeddataList={completeddataList} />
// //       }
// //       {/* <AlertModal  onConfirm={handleCloseAlertModal} betStatus={betStatus} /> */}
// //       {betStatus && (
// //         <AlertModal
// //           onConfirm={handleCloseAlertModal}
// //           betStatusUpdate={betStatus}
// //         />
// //       )}


// //       <Row className="gx-bg-flex gx-align-items-center gx-justify-content-between gx-bg-grey">
// //         <span
// //           onClick={() => setActiveTabTv((tv) => !tv)}
// //           className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
// //         >
// //           TV
// //         </span>
// //         <span
// //           onClick={() => {
// //             setActiveTabFame((frame) => !frame);
// //           }}
// //           className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
// //         >
// //           FS
// //         </span>
// //       </Row>
// //       <Row
// //         justify={"center"}
// //         className="gx-bg-flex gx-align-items-center gx-justify-content-between"
// //       >
// //         {activeTabTv && (
// //           <Col
// //             xs={26}
// //             className="gx-bg-flex gx-w-100 gx-justify-content-center"
// //           >
// //             <div className="gx-w-100">
// //               <iframe
// //                 style={{ width: "100%", height: 250 }}
// //                 src={matchDetailsResponse?.tvUrl}
// //                 title=" "
// //                 className="gx-w-100"
// //               ></iframe>
// //             </div>
// //           </Col>
// //         )}
// //       </Row>
// //       <Row justify={"center"}>
// //         <Col xs={24} sm={24} className="gx-col-full">
// //           {matchDetailsResponse?.scoreIframe ? (
// //             <Row
// //               style={{ height: `${activeTabFrame ? "180px" : "110px"}` }}
// //               className=""
// //             >
// //               <iframe
// //                 style={{ width: "100%", height: "100%", border: "none" }}
// //                 src={matchDetailsResponse?.scoreIframe}
// //                 title="Score-I-frame"
// //                 className=""
// //               ></iframe>
// //             </Row>
// //           ) : null}
// //         </Col>

// //         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >


// //        {matchDetailsResponse?.isMatchOdds &&  socketDetails?.find(el => el.marketType === "Match Odds") && 

// //           <Table
// //             className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
// //             size="small"
// //             title=""
// //             dataSource={oddsData}
// //             columns={oddsColumn}
// //             pagination={false}
// //             bordered
// //             scroll={{ x: true }}
// //             rowClassName="no-hover"
// //             style={{ marginTop: "16px" }}
// //           />

// //        }  
// //         </Col> 
// //         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
// //           {data && data.length > 0 ? (
// //             <Table
// //               className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
// //               size="small"
// //               title=""
// //               dataSource={data}
// //               columns={columns}
// //               pagination={false}
// //               bordered
// //               scroll={{ x: true }}
// //               rowClassName="no-hover"
// //               style={{ marginTop: "16px" }}
// //             />
// //           ) : null}
// //         </Col>
// //         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
// //           {matchDetailsResponse?.isTieOdds && matchScoreDetails?.team_data?.length <= 2  && socketDetails?.find(el => el.marketType == "Tied Match")  &&  
// //           <Table
// //             className="gx-w-100 gx-mx-0 gx-my-0"
// //             size="small"
// //             rowHoverable={false}
// //             title=""
// //             dataSource={tiedData}
// //             columns={tiedColumn}
// //             pagination={false}
// //             bordered
// //             style={{ marginTop: "16px" }}
// //           />
// //         } 
// //         </Col> 
// //         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
// //          {/* {matchDetailsResponse?.isToss  && socketDetails?.find(el => el.marketType == "To Win the Toss") && 
// //           <Table
// //             className="gx-w-100 gx-mx-0 gx-my-0"
// //             size="small"
// //             rowHoverable={false}
// //             title=""
// //             dataSource={tossData}
// //             columns={tossColumn}
// //             pagination={false}
// //             bordered
// //             style={{ marginTop: "16px" }}
// //           />
// //           }  */}
// //         </Col>
// //         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
// //           {data2 && data2.length > 0 ? (
// //             <Table
// //               className="gx-w-100 gx-mx-0 gx-my-0"
// //               size="small"
// //               title=""
// //               dataSource={data2}
// //               columns={fancyColumns}
// //               cellPaddingBlockSM
// //               pagination={false}
// //               bordered
// //               style={{ marginTop: "16px" }}
// //             />
// //           ) : null}
// //         </Col>
// //       </Row>
// //       <Row id="betPLaceModal" justify={"center"}>
// //         {timeLeft > 0 && (
// //           <Col
// //             style={{ border: "2px solid #8B8000" }}
// //             className="gx-px-0 gx-py-0 gx-rounded-lg gx-mx-0 gx-my-0"
// //             xs={24}
// //             sm={22}
// //           >
// //             <div className="gx-my-1 gx-lg-block gx-d-none gx-d-lg-block gx-mx-1">
// //               <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
// //                 <div
// //                   style={{ gap: "40px" }}
// //                 // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
// //                 //   }`}
// //                 >
// //                   <span>{betModalData?.sessionName} </span>

// //                   <span>
// //                     Rate : {betModalData.odds}
// //                     <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF': '#fff'}}>

// //                       (
// //                       {betModalData?.printData === "No" ? "NO" : betModalData?.printData === "Yes" ? "Yes" : betModalData?.printData === "Khai" ? 'Khai' : betModalData?.printData === "Lagai" ? 'Lagai' : ''})
// //                     </span>

// //                   </span>
// //                 </div>
// //                 <span
// //                   style={{ width: "30px", height: "30px" }}
// //                   className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
// //                 >
// //                   <span>{timeLeft}</span>
// //                 </span>
// //               </div>
// //               <div
// //                 style={{ gap: "10px" }}
// //                 className="gx-bg-flex  gx-justify-content-center gx-align-items-center"
// //               >
// //                 <span>Amount</span>
// //                 <span>
// //                   <Input
// //                     ref={inputRef}
// //                     value={inputValue}
// //                     onChange={(values) => setInputValue(Number(values.target.value))}
// //                     type="number"
// //                     className="gx-font-weight-semi-bold gx-fs-lg"
// //                   />
// //                 </span>
// //                 <Button
// //                   disabled={processingBet}
// //                   onClick={() => placeNewBet()}
// //                   className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
// //                     } gx-text-white  gx-mb-0 gx-px-2`}
// //                 >
// //                   Done
// //                   {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center"> */}
// //                   {/* <Button className="gx-px-2" size="small">Done</Button> */}
// //                   {processingBet && <div className="loaderSpinner gx-px-1"></div>}
// //                   {/* </div> */}


// //                 </Button>
// //               </div>
// //               <div className="gx-text-center">
// //                 {betChips &&
// //                   Object.keys(betChips).map((key, index) => {
// //                     if (index % 4 === 0) {
// //                       return (
// //                         <div
// //                           key={`row-${index}`}
// //                           style={{
// //                             display: "flex",
// //                             justifyContent: "center",
// //                             flexWrap: "wrap",
// //                             marginBottom: "10px",
// //                             gap: "30px", // Add gap between buttons
// //                             padding: "0 10px", // Add padding to the row for left/right spacing
// //                           }}
// //                         >
// //                           {Object.keys(betChips)
// //                             .slice(index, index + 4)
// //                             .map((subKey) => (
// //                               <Button
// //                                 className="gx-px-5 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
// //                                 key={subKey}
// //                                 onClick={() => setInputValue(betChips[subKey])}
// //                                 style={{ margin: "5px" }}
// //                               >
// //                                 {betChips[subKey]}
// //                               </Button>
// //                             ))}
// //                         </div>
// //                       );
// //                     }
// //                     return null;
// //                   })}
// //                 <div
// //                   style={{
// //                     display: "grid",
// //                     gridTemplateColumns: "repeat(2, 1fr)",
// //                     gap: "5px",
// //                   }}
// //                   className=""
// //                 >
// //                   <Button onClick={() => setInputValue(0)} type="danger">
// //                     ClearInput
// //                   </Button>
// //                   <Button
// //                     onClick={() => {
// //                       setTimeLeft(0);
// //                       setInputValue(0);
// //                     }}
// //                     type="danger"
// //                   >
// //                     Close
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </Col>
// //         )}
// //       </Row>
// //       {timeLeft > 0 && (
// //         <div className="gx-bg-grey gx-w-100 gx-mt-2 gx-d-block gx-d-lg-none">

// //           <div
// //             className={`gx-px-5 gx-py-2 gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-capitalize 
// //               }`}
// //           >
// //              Type:  <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF': '#fff'}}>
// //               {betModalData?.printData} </span><br />
// //             {betModalData?.oddsType} : {betModalData?.sessionName}{" "}
// //           </div>
// //         </div>
// //       )}
// //       <div className="gx-d-lg-none gx-border gx-my-2 gx-d-block">
// //         <div className="gx-bg-flex  gx-justify-content-between gx-px-1 gx-align-items-center">
// //           <div className="gx-text-nowrap">Amount : &nbsp;</div>
// //           <div>
// //             <AutoComplete
// //               style={{ width: "100%" }}
// //               options={options}
// //               disabled={timeLeft <= 0 ? true : false}
// //               value={inputValue}
// //               onChange={handleInputChange}
// //               placeholder="Enter a number or select a value"
// //               filterOption={(inputValue, option) =>
// //                 option.value.includes(inputValue)
// //               }
// //             >
// //               <Input
// //                 type="number"
// //                 ref={inputRef2}
// //                 disabled={timeLeft <= 0 ? true : false}
// //                 readOnly={timeLeft <= 0 ? true : false}
// //                 value={inputValue}
// //                 onChange={(e) => handleInputChange(e.target.value)}
// //               />
// //             </AutoComplete>
// //           </div>
// //           <div className="gx-bg-flex  gx-justify-content-between  gx-align-items-center">
// //             <span className="gx-bg-dark gx-text-white gx-fs-lg- gx-font-weight-bold gx-px-2 gx-py-2 gx-bg-flex  gx-justify-content-between gx-mx-1  gx-align-items-center">
// //               {timeLeft}
// //             </span>
// //             <Button
// //               disabled={processingBet || timeLeft <= 0}
// //               size="smaLL"
// //               onClick={() => placeNewBet()}
// //               className={`${processingBet || timeLeft <= 0 ? "gx-bg-primary" : "gx-bg-primary"
// //                 } gx-text-white  gx-justify-content-center  gx-mb-0 gx-px-2`}
// //             >
// //               Done
// //               {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center">
// //                  <div className="gx-px-2">Done</div> */}
// //               {processingBet && <div className="loaderSpinner "></div>}
// //               {/* </div> */}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <div ref={scrollToRef} className="gx-mb-2"></div>

// //       <Row justify={"center"} className="">
// //         {mybetsData && mybetsData?.length > 0 && (
// //           <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
// //             <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
// //               MATCH BETS
// //             </div>
// //             <Table
// //               className="gx-w-100 gx-mx-0 gx-my-0"
// //               size="small"
// //               rowHoverable={false}
// //               title=""
// //               scroll={{ x: true }}
// //               dataSource={mybetsData}
// //               columns={mybets}
// //               pagination={false}
// //               bordered
// //             />
// //           </Col>
// //         )}
// //         {IncompleteddataList && IncompleteddataList?.length > 0 && (
// //           <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
// //             <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
// //               FANCY BETS
// //             </div>
// //             <Table
// //               className="gx-w-100 gx-mx-0 gx-my-0"
// //               size="small"
// //               rowHoverable={false}
// //               title=""
// //               scroll={{ x: true }}
// //               dataSource={IncompleteddataList}
// //               columns={IncompltedBetsColumn}
// //               pagination={false}
// //               bordered
// //             />
// //           </Col>
// //         )}

// //         {/* {completeddataList && completeddataList?.length > 0 && ( */}
// //         {/* // <Row className="" justify={"center"}> */}
// //         {/* <Col className="gx-px-0 gx-py-1 gx-mx-0 gx-my-0" xs={24} sm={18}>
// //           <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
// //             COMPLETED FANCY BETS
// //           </div>
// //           <Table
// //             className="gx-w-100 gx-mx-0 gx-my-0"
// //             size="small"
// //             rowHoverable={false}
// //             title=""
// //             scroll={{ x: true }}
// //             dataSource={completeddataList}
// //             columns={compltedBetsColumn}
// //             pagination={false}
// //             bordered
// //           />
// //         </Col> */}
// //         {/* )} */}
// //       </Row>
// //       <Row justify={"center"}>
// //         <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
// //           <Button
// //             className="gx-bg-grey gx-text-white gx-font-weight-semi-bold"
// //             onClick={() => {
// //               setCompltedModal(true)

// //             }}
// //           >
// //             Completed Bets
// //           </Button>
// //         </Col >
// //       </Row>
// //       <Row justify={"center"}>
// //         <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
// //           <Button
// //             onClick={() => setMatchModal(true)}
// //             className={`gx-my-0  gx-bg-grey gx-text-white gx-font-weight-semi-bold `}
// //           >
// //             All Matches
// //           </Button>
// //           {matchModal && (
// //             <MatchModal
// //               handleClose={handleCloseMatchModal}
// //               datalist={matchList}
// //               marketId={marketId}
// //             />
// //           )}
// //         </Col>
// //       </Row>
// //     </Auxiliary>
// //   );
// // };
// // export default MatchDetails;




















// import React, { useEffect, useRef, useState } from "react";
// import {
//   AutoComplete,
//   Button,
//   Col,
//   Input,
//   Row,
//   Select,
//   Spin,
//   Table,
// } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import Auxiliary from "util/Auxiliary";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import {
//   ErrorModalClose,
//   getMatchDetail,
//   getSportsBetsList,
//   oddsPlaceBets,
//   placeBets,
//   userPositionByMarketId,
// } from "../../../appRedux/actions/User";
// import { io } from "socket.io-client";
// import axios from "axios";
// import MatchModal from "./MatchModal";
// import moment from "moment";
// import AlertModal from "./AlertModal";
// import { betChipsValues } from "../../../constants/global";
// import CompletedBetsModal from "./CompletedBetsModal";


// const MatchDetails = () => {
//   const { marketId, eventId, cacheUrls } = useParams();
//   const dispatch = useDispatch();
//   const intervalIdRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   // const [socket, setSocket] = useState(null);
//   const [activeTabTv, setActiveTabTv] = useState(false);
//   const [activeTabFrame, setActiveTabFame] = useState(false);
//   const [socketDetails, setsocketDetails] = useState(null);
//   const [matchScoreDetails, setMatchScoreDetails] = useState(null);
//   const [matchModal, setMatchModal] = useState(false);
//   const [inputValue, setInputValue] = useState(0);
//   const [bookmakerCoin, setBookmakerCoin] = useState({ max: null, min: null });
//   const [sessionCoin, setSessionCoin] = useState({ max: null, min: null });
//   const [completedModal, setCompltedModal] = useState(false)
//   const {
//     matchDetailsResponse,
//     userpositionbymarketId,
//     matchList,
//     sportsBetsList,
//     processingBet,
//     betStatus,
//   } = useSelector((state) => state.UserReducer);







//   // const decodedCacheUrl = decodeURIComponent(cacheUrls);

//   // const matchlistfromLocalStorage = JSON.parse(
//   //   localStorage.getItem("matchList")
//   // );
//   // const matchCacheUrl = matchlistfromLocalStorage?.find((el) => el.marketId === marketId)?.cacheUrl;


//   // const matchIframeUrl = matchlistfromLocalStorage?.find(({ marketId: id }) => id === marketId)?.scoreIframe ?? null;

//   const handleCloseCompletedModal = () => {
//     setCompltedModal(false)
//   }


//   ///////////////////////-----------------------handling bet place Error modals------------------//////////////////////////

//   // useEffect(() => {
//   //   if (betStatus !== null) {
//   //     setMessageModal(true);
//   //     if (betStatus === true) {
//   //       SetBetStatusUpdate("success");
//   //     } else if (betStatus === "error") {
//   //       SetBetStatusUpdate("error");
//   //     } else {
//   //       SetBetStatusUpdate("");
//   //     }
//   //   }
//   // }, [betStatus]);

//   // const handleCloseAlertModal = () => {
//   //   setMessageModal(false);
//   //   SetBetStatusUpdate("");
//   // };


//   const handleCloseAlertModal = () => {
//     dispatch(ErrorModalClose())
//   };

//   //////////////////////////////////////////////initial code ////////////////////
//   const socketRef = useRef(null);

//   useEffect(() => {


//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         if (!isConnected) {
//           connectSocket();
//         }
//       } else if(document.visibilityState === "hidden") {
//         cleanupWebSocket();
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     setupAsyncActions(marketId);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       cleanupWebSocket();
//       clearInterval(intervalIdRef.current);
//     };
//   }, [ marketId]);

//   const setupAsyncActions = async (marketId) => {
//     setMatchScoreDetails("");
//     getMatchDataByMarketIdWise();
//     getuserPositionByMarketIdWise();
//     fetchBetLists();
//   };

//   const getMatchDataByMarketIdWise = async () => {
//     let reqData = {
//       marketId: marketId,
//     };
//     dispatch(getMatchDetail(reqData));
//   };
//   useEffect(()=>{
//     if(betStatus === true){
//       getuserPositionByMarketIdWise()
//     }
//   },[betStatus])

//   useEffect(() => {

//     clearInterval(intervalIdRef.current);
//     if (matchDetailsResponse) {
//       // getMarketCacheUrl(decodedCacheUrl);

//       // getMarketCacheUrl(matchCacheUrl)
//       if (matchDetailsResponse?.socketPerm) {
//         connectSocket(matchDetailsResponse.socketUrl);
//       } else {
//         callCache(matchDetailsResponse.cacheUrl);
//       }
//     }
//   }, [matchDetailsResponse]);

//   const connectSocket = (socketUrl = matchDetailsResponse?.socketUrl) => {
//     socketRef.current = io(socketUrl, {
//       transports: ["websocket"],
//       reconnection: false,
//     });

//     socketRef.current.on("connect", () => {
//       setIsConnected(true);
//       socketRef.current.emit("marketByEvent", eventId);
//     });

//     socketRef.current.on(eventId, (data) => {
//       setsocketDetails(JSON.parse(data));
//     });

//     if (matchDetailsResponse?.socketPerm === true) {
//       socketRef.current.emit("JoinRoom", marketId);
//       socketRef.current.on(marketId, (data) => {

//         setMatchScoreDetails(JSON.parse(data).result);
//       });
//     }
//   };


//   const getMarketCacheUrl = async (cacheUrl) => {
//     try {
//       const response = await axios.get(cacheUrl);
//       setMatchScoreDetails(response?.data?.result);
//     } catch (error) {
//       setMatchScoreDetails(null);
//       console.error("Error fetching market cache URL:", error);
//     }
//   };

//   const callCache = (cacheUrl) => {

//     if (intervalIdRef.current) {
//       clearInterval(intervalIdRef.current);
//     }
//     const newIntervalId = setInterval(() => getMarketCacheUrl(cacheUrl), 1000);
//     intervalIdRef.current = newIntervalId;
//   };




//   const cleanupWebSocket = () => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       socketRef.current = null;
//       setIsConnected(false);
//     }
//   };
//   const getuserPositionByMarketIdWise = async () => {
//     let reqData = {
//       marketId: marketId,
//     };
//     dispatch(userPositionByMarketId(reqData));
//   };

//   const fetchBetLists = async () => {
//     try {
//       const BetListData = {
//         fancyBet: true,
//         oddsBet: true,
//         marketId: marketId,
//         // isDeclare: false,
//       };
//       dispatch(getSportsBetsList(BetListData));
//     } catch (error) {
//       console.error("Error fetching bet lists:", error);
//       throw error;
//     }
//   };

//   ///////////////////////////--------------------------handling user positions --------------///////////////
//   const [returnDataObject, setReturnDataObject] = useState({});
//   const [returnDataObject2, setReturnDataObject2] = useState({});



//   useEffect(() => {
//     if (userpositionbymarketId) {

//       let oddsPos = [];

//       let returMatchOdds = {};
//       let returnTossMatch = {}
//       if (userpositionbymarketId?.oddsPosition) {
//         oddsPos = userpositionbymarketId.oddsPosition;
//         oddsPos.filter(ele => ele.oddsType === "matchOdds").forEach((data) => {
//           returMatchOdds[data._id] = data.totalPosition.toFixed(2);
//         });
//         setReturnDataObject(returMatchOdds);
//       }
//       if (userpositionbymarketId?.oddsPosition) {
//         oddsPos = userpositionbymarketId.oddsPosition;
//         oddsPos.filter(ele => ele.oddsType === "toss").forEach((data) => {
//           returnTossMatch[data._id] = data.totalPosition.toFixed(2);
//         });
//         setReturnDataObject2(returnTossMatch);
//       }
//       if (userpositionbymarketId?.oddsPosition) {
//         oddsPos = userpositionbymarketId.oddsPosition;
//         oddsPos.filter(ele => ele.oddsType === "tiedMatch").forEach((data) => {
//           returnTossMatch[data._id] = data.totalPosition.toFixed(2);
//         });
//         setReturnDataObject2(returnTossMatch);
//       }

//       // const finalOddsTotalPosTemp = bookmakerTeamData.map((teamData) => {
//       //   let pushPos = 0;
//       //   if (returnDataObjectTemp[teamData.betfairSelectionId]) {
//       //     pushPos += returnDataObjectTemp[teamData.betfairSelectionId];
//       //   }
//       //   if (returnDataObjectTemp[teamData.bookmakerSelectionId]) {
//       //     pushPos += returnDataObjectTemp[teamData.bookmakerSelectionId];
//       //   }
//       //   return { ...teamData, finalPos: pushPos };
//       // });

//       // setFinalOddsTotalPos(finalOddsTotalPosTemp);
//     }
//   }, [userpositionbymarketId]);

//   //////////////////////////////-----------------------handling scroll effect -----------------------///////////////////////
//   const scrollToRef = useRef(null);
//   const inputRef2 = useRef(null);  /////// desktop
//   const inputRef = useRef(null);  //////// mobile
//   const scrollToElement = () => {
//     scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//     if (inputRef.current) {

//       setTimeout(() => {
//         if (inputRef.current) {
//           inputRef.current.focus();
//         }
//       }, 500);
//     }
//     if (inputRef2.current) {

//       setTimeout(() => {
//         if (inputRef2.current) {
//           inputRef2.current.focus();
//         }
//       }, 500);
//     }
//   };
//   // const scrollToRef = useRef(null);
//   // const scrollToElement = () => {
//   //   scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//   // };
//   ///////////////////---------------------Timer ConCept and bet handling handlebet place ----------------------
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [betModalData, setBetModalData] = useState(false);
//   const [betChips, setBetChips] = useState(betChipsValues);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       setBetModalData({});
//       setInputValue(0);
//       return;
//     }

//     const intervalId = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [timeLeft]);

//   const handlebet = (record) => {
//     setBetModalData(record);
//     setTimeLeft(10);
//   };
//   useEffect(() => {
//     const authUser = localStorage.getItem("authUser");
//     if (authUser) {
//       const authUserData = JSON.parse(authUser);
//       const betChipsData = authUserData?.data?.betChipsData;
//       setBetChips(betChipsData);
//     } else {
//       setBetChips(betChipsValues);
//     }
//   }, []);
//   const handleCloseMatchModal = () => {
//     setMatchModal(false);
//   };




//   /////////////////////////////////////////--------------------filtering table  odd , completed and incompletedfancy -------------------------------- ///////////////////////////
//   const [oddsbetdata, setOddsbetData] = useState();
//   const [incomletedFancy, setIncompletedFancy] = useState();
//   const [compltedFancy, setCompletedFancy] = useState();
//   useEffect(() => {
//     if (sportsBetsList) {
//       const sortedOddsBetData = sportsBetsList?.data?.oddsBetData
//         ? sportsBetsList?.data?.oddsBetData
//           .slice()
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         : [];
//       const filteredFancyBetData = sportsBetsList?.data?.fancyBetData
//         ? sportsBetsList?.data?.fancyBetData.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         )
//         : [];
//       const completeFancy =
//         filteredFancyBetData && filteredFancyBetData.length > 0
//           ? filteredFancyBetData.filter((element) => element.isDeclare === 1)
//           : [];
//       let showCompletedFancy = [];

//       completeFancy.map((data) => {
//         let pos = 0;
//         if (data.decisionRun >= data.run && data.type === "Y") {
//           pos = Math.round(data.amount * data.odds);
//         } else if (data.decisionRun >= data.run && data.type === "N") {
//           pos = Math.round(-1 * data.amount * data.odds);
//         } else if (data.decisionRun < data.run && data.type === "Y") {
//           pos = Math.round(-1 * data.amount);
//         } else if (data.decisionRun < data.run && data.type === "N") {
//           pos = Math.round(data.amount);
//         }
//         data.pos = pos;
//         showCompletedFancy.push(data);
//       });
//       setOddsbetData(sortedOddsBetData);
//       setCompletedFancy(showCompletedFancy);
//       setIncompletedFancy(
//         filteredFancyBetData && filteredFancyBetData.length > 0
//           ? filteredFancyBetData.filter((element) => element.isDeclare === 0)
//           : []
//       );
//     }
//   }, [sportsBetsList]);
//   ////////////////////-----------------------------placing bets ----------------------//////////////////
//   useEffect(() => {
//     const maxCoinData = matchDetailsResponse?.maxMinCoins
//       ? JSON.parse(matchDetailsResponse?.maxMinCoins)
//       : {
//         maximum_match_bet: null,
//         minimum_match_bet: null,
//         maximum_session_bet: null,
//         minimum_session_bet: null,
//       };

//     setBookmakerCoin({
//       max: maxCoinData?.maximum_match_bet,
//       min: maxCoinData?.minimum_match_bet,
//     });
//     setSessionCoin({
//       max: maxCoinData?.maximum_session_bet,
//       min: maxCoinData?.minimum_session_bet,
//     });
//   }, [matchDetailsResponse]);
//   useEffect(() => {
//     if (processingBet === false) {
//       fetchBetLists();
//       setTimeLeft(0);
//     }
//   }, [processingBet]);

//   const placeNewBet = () => {

//     if (betModalData.oddsType === "bookmaker" || betModalData.oddsType === "matchOdds" || betModalData.oddsType === "toss" || betModalData.oddsType === "tiedMatch" ) {
//       const reqData = {
//         odds: betModalData.odds + "",
//         amount: inputValue,
//         selectionId: betModalData.selectionId + "",
//         marketId: marketId + "",
//         betfairMarketId: betModalData.betfairMarketId + "",
//         eventId: eventId,
//         betFor: betModalData.betFor + "",
//         run: betModalData.runs ? betModalData.runs + "" : "0",
//         oddsType: betModalData.oddsType + "",
//         type:
//           betModalData.oddsType === "fancy"
//             ? betModalData.type + ""
//             : betModalData.betType + "",
//       };
//       if (
//         // reqData.amount <= bookmakerCoin.max &&
//         // reqData.amount >= bookmakerCoin.min &&
//         reqData.amount > 0
//       ) {
//         dispatch(oddsPlaceBets(reqData));
//       } else {
//         setTimeLeft(0);
//       }
//     }
//     if (betModalData.oddsType === "fancy") {
//       const reqData = {
//         odds: betModalData.odds + "",
//         amount: inputValue,
//         selectionId: betModalData.selectionId + "",
//         marketId: marketId + "",
//         eventId: eventId,
//         betFor: betModalData.betFor + "",
//         run: betModalData.runs ? betModalData.runs + "" : "0",
//         oddsType: betModalData.oddsType + "",
//         type:
//           betModalData.oddsType === "fancy"
//             ? betModalData.type + ""
//             : betModalData.betType + "",
//       };
//       if (
//         // reqData.amount <= sessionCoin.max &&
//         // reqData.amount >= sessionCoin.min &&
//         reqData.amount > 0
//       ) {
//         dispatch(placeBets(reqData));
//       } else {
//         setTimeLeft(0);
//       }
//     }
//   };

//   /////////////////////////////-------------------- bests calling every 10 sec ---------------------------------///////////////////////////////
//   useEffect(() => {
//     fetchBetLists();
//     // const fetchBetListsInterval = setInterval(() => {
//     //   fetchBetLists();
//     // }, 10000);

//     // return () => {
//     //   clearInterval(fetchBetListsInterval);
//     // };
//   }, []);
//   ////////////////////////////----------------------- Bookmaker Data --------------------//////////////////




//   const data = [];
//   if (matchScoreDetails) {


//     matchScoreDetails?.team_data?.forEach((ele, i) => {
//       data.push({
//         key: i,
//         teamName: ele.team_name,
//         lgaai: ele.lgaai,
//         khaai: ele.khaai,
//         positon: ele.positon,
//         selectionid: ele.selectionid,
//       });
//     });
//   }

//   const columns = [
//     {
//       title: (
//         <div
//           style={{ gap: "10rem" }}
//           className="gx-bg-flex gx-justify-content-start "
//         >
//           <span className="gx-d-none gx-d-lg-block">Bookmaker</span>
//           <span style={{ textWrap: "nowrap" }}>
//             Min: {bookmakerCoin?.min} Max: {bookmakerCoin?.max}
//           </span>
//         </div>
//       ),
//       dataIndex: "teamName",
//       className: "",
//       key: "teamName",

//       width: "60%",
//       render: (text, record, index) => (
//         <div className="gx-bg-flex gx-">
//           <div className=" gx-font-weight-semi-bold gx-text-uppercase">
//             {text}
//           </div>
//           <div
//             className={`gx-font-weight-semi-bold ${userpositionbymarketId?.oddsPosition?.find(
//               (item) => item?._id === record?.selectionid
//             )?.Position > 0
//               ? "gx-text-primary"
//               : "gx-text-red"
//               } `}
//           >
//             {
//               userpositionbymarketId?.oddsPosition?.find(
//                 (item) => item?._id === record?.selectionid
//               )?.Position.toFixed(2)
//             }
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Lagai",
//       dataIndex: "lgaai",
//       key: "lgaai",
//       width: "20%",
//       align: "center",

//       render: (text, record, index) => (
//         <div
//           onClick={() => {
//             if (Number(text) <= 0) return;
//             handlebet({
//               sessionName: record.teamName,
//               odds: record.lgaai,
//               selectionId: record.selectionid,
//               type: "YES",
//               betType: "L",
//               betForMarketId: marketId,
//               marketId: marketId,
//               eventId: eventId,
//               oddsType: "bookmaker",
//               betFor: "odds",
//               printData: "Lagai"

//             });
//             scrollToElement();
//           }}
//           className="gx-font-weight-semi-bold gx-text-blue gx-fs-lg gx-text-uppercase"
//         >
//           {(Number(text) * 100).toFixed(0)}
//         </div>
//       ),
//     },
//     {
//       title: "Khai",
//       dataIndex: "khaai",
//       key: "khaai",
//       width: "20%",
//       align: "center",
//       render: (text, record, index) => (
//         <div
//           onClick={() => {
//             if (Number(text) <= 0) return;
//             handlebet({
//               sessionName: record.teamName,
//               odds: record.khaai,
//               selectionId: record.selectionid,
//               type: "NO",
//               betType: "K",
//               betForMarketId: marketId,
//               marketId: marketId,
//               eventId: eventId,
//               oddsType: "bookmaker",
//               betFor: "odds",
//               printData: "Khai"
//             });
//             scrollToElement();
//           }}
//           className="gx-font-weight-semi-bold gx-text-red gx-fs-lg gx-text-capitalize"
//         >
//           {(Number(text) * 100).toFixed(0)}
//         </div>
//       ),
//     },
//   ];

//   ///////////////////-----------------------odddsss data -------------------//////////////////////

//   const oddsData = [];
//   if (matchDetailsResponse) {

//     const matchoddsData = matchDetailsResponse?.marketList
//     ?.filter((el) => el.marketType === "Match Odds")[0]

//     const sortedSelectionIdData = matchoddsData
//       ?.selectionIdData?.slice()
//       ?.sort((a, b) => a.sortPriority - b.sortPriority);

//       const betfairmatchoddsMarketId = matchoddsData.marketId




//     sortedSelectionIdData?.forEach((ele, i) => {
//       oddsData.push({
//         key: i,
//         runnerName: ele.runnerName,
//         selectionId: ele.selectionId,
//         lgaaiprice: socketDetails
//           ?.find((el) => el.marketType === "Match Odds")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
//           ?.availableToLay[0]?.price,
//         lgaaisize: socketDetails
//           ?.find((el) => el.marketType === "Match Odds")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)
//           ?.ex?.availableToLay[0]?.size?.toFixed(2),
//         khaaiprice: socketDetails
//           ?.find((el) => el.marketType === "Match Odds")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
//           ?.availableToBack[0]?.price,
//         khaaisize: socketDetails
//           ?.find((el) => el.marketType === "Match Odds")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)
//           ?.ex?.availableToBack[0]?.size?.toFixed(2),
//         oddsposition:
//           returnDataObject[ele.selectionId] !== 0
//             ? returnDataObject[ele.selectionId]
//             : "-",
//           betfairMarketId: betfairmatchoddsMarketId
//       });
//     });
//   }
//   const oddsColumn = [
//     {
//       title: (
//         <div style={{ display: "flex " }}>
//           <span>Match Odds</span>
//         </div>
//       ),
//       dataIndex: "runnerName",

//       key: "runnerName",

//       width: "60%",
//       render: (text, record, index) => (
//         <div className="gx-bg-flex">
//           <div className=" gx-font-weight-semi-bold ">{text}</div>
//           <div
//             className={`gx-font-weight-semi-bold ${
//               record.oddsposition > 0 ? "gx-text-primary" : "gx-text-red"
//             }`}
//           >
//             {record.oddsposition}
//           </div>
//         </div>
//       ),
//     },

//     {
//       title: "Lay",
//       dataIndex: "lgaai",
//       key: "lgaai",
//       width: "20%",

//       align: "center",
//       render: (text, record, index) => (
//         <div  onClick={() => {
//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.lgaaiprice,
//             selectionId: record.selectionId,
//             type: "YES",
//             betType: "K",
//             // run:record.lgaaisize,
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "matchOdds",
//             betFor: "matchOdds",
//             printData: "Lay",
//             betfairMarketId: record.betfairMarketId

//           });
//           scrollToElement();
//         }} className="gx-font-weight-semi-bold gx-text-primary gx-bg-flex gx-flex-column">
//           <span>{record.lgaaiprice}</span>
//           <span>{record.lgaaisize}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Back",
//       dataIndex: "khaai",
//       key: "khaai",
//       width: "20%",
//       align: "center",
//       render: (text, record, index) => (
//         <div onClick={() => {

//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.khaaiprice,
//             selectionId: record.selectionId,
//             type: "NO",
//             betType: "L",
//             // run:record.khaaisize,
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "matchOdds",
//             betFor: "matchOdds",
//             printData: "Back",
//             betfairMarketId: record.betfairMarketId

//           });
//           scrollToElement();
//         }}  className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
//           <span>{record.khaaiprice}</span>
//           <span>{record.khaaisize}</span>
//         </div>
//       ),
//     },
//   ];

//   ///////////////////////////////////-------------------Tied data --------------////////////////////////

//   const tiedData = [];
//   if (matchDetailsResponse) {

//     const tiedMatchData =  matchDetailsResponse?.marketList
//     ?.filter((el) => el.marketType === "Tied Match")[0]
//     const sortedSelectionIdData =tiedMatchData?.selectionIdData?.slice()
//       ?.sort((a, b) => a.sortPriority - b.sortPriority);
//       const betfairTiedId = tiedMatchData.marketId
//     sortedSelectionIdData?.forEach((ele, i) => {
//       tiedData.push({
//         key: i,
//         runnerName: ele.runnerName,
//         selectionId: ele.selectionId,
//         lgaaiprice: socketDetails
//           ?.find((el) => el.marketType === "Tied Match")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
//           ?.availableToLay[0]?.price,
//         lgaaisize: socketDetails
//           ?.find((el) => el.marketType === "Tied Match")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)
//           ?.ex?.availableToLay[0]?.size.toFixed(2),
//         khaaiprice: socketDetails
//           ?.find((el) => el.marketType === "Tied Match")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
//           ?.availableToBack[0]?.price,
//         khaaisize: socketDetails
//           ?.find((el) => el.marketType === "Tied Match")
//           ?.runners?.find((item) => item.selectionId === ele.selectionId)
//           ?.ex?.availableToBack[0]?.size.toFixed(2),
//         tiedposition:
//           returnDataObject2[ele.selectionId] !== 0
//             ? returnDataObject2[ele.selectionId]
//             : "-",
//             betfairMarketId : betfairTiedId
//       });
//     });
//   }
//   const tiedColumn = [
//     {
//       title: (
//         <div style={{ display: "flex " }}>
//           <span>Tied Match</span>
//         </div>
//       ),
//       dataIndex: "runnerName",
//       width: "60%",
//       render: (text, record, index) => (
//         <div className="gx-bg-flex">
//           <div className=" gx-font-weight-semi-bold ">{text}</div>
//           <div  className={`gx-font-weight-semi-bold ${record.tiedposition > 0 ? "gx-text-primary" : "gx-text-red" } `}>
//             {record.tiedposition}
//           </div>
//         </div>
//       ),
//     },

//     {
//       title: "Lay",
//       dataIndex: "lgaai",
//       key: "lgaai",
//       width: "20%",
//       align: "center",
//       render: (text, record, index) => (
//         <div onClick={() => {
//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.lgaaiprice,
//             selectionId: record.selectionId,
//             type: "NO",
//             betType: "K",
//             run:'0',
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "tiedMatch",
//             betFor: "tiedMatch",
//             printData: "Lay",
//             betfairMarketId:record.betfairMarketId
//           });
//           scrollToElement();
//         }} className="gx-font-weight-semi-bold gx-text-primary gx-bg-flex gx-flex-column">
//           <span>{record.lgaaiprice}</span>
//           <span>{record.lgaaisize}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Back",
//       dataIndex: "khaai",
//       key: "khaai",
//       width: "20%",
//       align: "center",
//       render: (text, record, index) => (
//         <div onClick={() => {

//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.khaaiprice,
//             selectionId: record.selectionId,
//             type: "NO",
//             betType: "L",
//             run:'0',
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "tiedMatch",
//             betFor: "tiedMatch",
//             printData: "Back",
//             betfairMarketId:record.betfairMarketId
//           });
//           scrollToElement();
//         }} className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
//           <span>{record.khaaiprice}</span>
//           <span>{record.khaaisize}</span>
//         </div>
//       ),
//     },
//   ];

//   ///////////////////////////////////-------------------Toss data --------------////////////////////////
//   const tossData = [];
//   if (matchDetailsResponse) {
//     const sortedSelectionIdData = matchScoreDetails?.toss_data

//     sortedSelectionIdData?.forEach((ele, i) => {
//       tossData.push({
//         key: i,
//         runnerName: ele.team_name,
//         selectionId: ele.selectionid,
//         lgaaiprice: ele.lgaai,
//         lgaaisize: socketDetails
//           ?.find((el) => el.marketType === "To Win the Toss")
//           ?.runners?.find((item) => item.selectionId === ele.selectionid)
//           ?.ex?.availableToLay[0]?.size.toFixed(2),
//         khaaiprice: ele.khaai,
//         khaaisize: socketDetails
//           ?.find((el) => el.marketType === "To Win the Toss")
//           ?.runners?.find((item) => item.selectionId === ele.selectionid)
//           ?.ex?.availableToBack[0]?.size.toFixed(2),
//         tossposition:
//           returnDataObject2[ele.selectionid] !== 0
//             ? returnDataObject2[ele.selectionid]
//             : "-",
//       });
//     });
//   }

//   const tossColumn = [
//     {
//       title: (
//         <div style={{ display: "flex " }}>
//           <span>Toss Data</span>
//         </div>
//       ),
//       dataIndex: "runnerName",

//       key: "runnerName",

//       width: "60%",
//       render: (text, record, index) => (
//         <div className="">
//           <div className=" gx-font-weight-semi-bold ">{text}</div>
//           <div className={`gx-font-weight-semi-bold ${record.tossposition > 0 ? "gx-text-primary" : "gx-text-red" } `}>
//             {record.tossposition}
//           </div>
//         </div>
//       ),
//     },

//     {
//       title: "Lay",
//       dataIndex: "lgaai",
//       key: "lgaai",
//       width: "20%",

//       align: "center",
//       render: (text, record, index) => (
//         <div onClick={() => {

//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.lgaaiprice,
//             selectionId: record.selectionId,
//             type: "NO",
//             betType: "L",
//             // run:record.khaaisize,
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "toss",
//             betFor: "toss",
//             printData: "Lay",
//           });
//           scrollToElement();
//         }} className="gx-font-weight-semi-bold gx-bg-flex gx-text-primary gx-flex-column">
//           <span>{record.lgaaiprice}</span>
//           <span>{record.lgaaisize}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Back",
//       dataIndex: "khaai",

//       key: "khaai",
//       width: "20%",
//       align: "center",
//       render: (text, record, index) => (
//         <div onClick={() => {

//           if (Number(text) <= 0) return;
//           handlebet({
//             sessionName: record.teamName,
//             odds: record.khaaiprice,
//             selectionId: record.selectionId,
//             type: "NO",
//             betType: "K",
//             // run:record.khaaisize,
//             betForMarketId: marketId,
//             marketId: marketId,
//             eventId: eventId,
//             oddsType: "toss",
//             betFor: "toss",
//             printData: "Back",
//           });
//           scrollToElement();
//         }} className="gx-font-weight-semi-bold gx-text-red gx-bg-flex gx-flex-column">
//           <span>{record.khaaiprice}</span>
//           <span>{record.khaaisize}</span>
//         </div>
//       ),
//     },
//   ];

//   //  //////////////////////--------------------------fancy data----------------------/////////////////////////////////

//   const data2 = [];
//   if (matchScoreDetails) {
//     // const sortedSessions = matchScoreDetails.session?.sort((a, b) => a.session_name - b.session_name);

//     // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
//     //   const getInitialChar = (str) => str.trim().charAt(0);

//     //   // Extract starting characters
//     //   const charA = getInitialChar(a.session_name);
//     //   const charB = getInitialChar(b.session_name);

//     //   // Check if characters are digits
//     //   const isDigitA = /^\d/.test(charA);
//     //   const isDigitB = /^\d/.test(charB);

//     //   // If both are digits or both are letters, sort accordingly
//     //   if (isDigitA && isDigitB) {
//     //     // Extract numeric part and compare
//     //     const numA = parseInt(a.session_name.match(/^\d+/)?.[0] || '0', 10);
//     //     const numB = parseInt(b.session_name.match(/^\d+/)?.[0] || '0', 10);
//     //     return numA - numB;
//     //   } 
//     //   if (isDigitA && !isDigitB) {
//     //     // Digits come before letters
//     //     return -1;
//     //   }
//     //   if (!isDigitA && isDigitB) {
//     //     // Letters come after digits
//     //     return 1;
//     //   }

//     //   // If both start with letters, sort alphabetically
//     //   return a.session_name.localeCompare(b.session_name);
//     // });

//     const sortedSessions = matchScoreDetails.session.sort((a, b) => {
//       // Helper functions
//       const getInitialChar = (str) => str.trim().charAt(0);
//       const startsWithDigit = (str) => /^\d/.test(str);
//       const includesOver = (str) => /OVER/.test(str);
//       const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
//       const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

//       // Extract session names
//       const nameA = a.session_name;
//       const nameB = b.session_name;

//       // Check properties of the session names
//       const isDigitA = startsWithDigit(nameA);
//       const isDigitB = startsWithDigit(nameB);
//       const includesOverA = includesOver(nameA);
//       const includesOverB = includesOver(nameB);
//       const containsFirstA = containsFirst(nameA);
//       const containsFirstB = containsFirst(nameB);

//       // Handle cases where either session contains "1ST" or "FIRST"
//       if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
//       if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

//       // First priority: Digits with "OVER" come before digits without "OVER"
//       if (isDigitA && isDigitB) {
//         if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
//         if (!includesOverA && includesOverB) return 1;  // "OVER" comes after non-"OVER"

//         // If both have or don't have "OVER", sort numerically
//         const numA = getNumericPart(nameA);
//         const numB = getNumericPart(nameB);
//         return numA - numB;
//       }

//       // Second priority: Digits come before letters
//       if (isDigitA && !isDigitB) return -1; // Digits come before letters
//       if (!isDigitA && isDigitB) return 1;  // Letters come after digits

//       // Third priority: Sort alphabetically for letters
//       return nameA.localeCompare(nameB);
//     });


//     // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
//     //   return parseInt(a.priority, 10) - parseInt(b.priority, 10);
//     // });
//     sortedSessions?.forEach((ele, i) => {
//       data2.push({
//         key: i,
//         session_name: ele.session_name,
//         oddsYes: ele.oddsYes,
//         oddsNo: ele.oddsNo,
//         runsNo: ele.runsNo,
//         runsYes: ele.runsYes,
//         running_status: ele.running_status,
//         session_id: ele.session_id,
//         max: ele.max,
//         selectionId: ele.Selection_id,
//       });
//     });
//   }
//   const fancyColumns = [
//     {
//       title: (
//         <div className="gx-bg-flex gx-justify-content-center">Session</div>
//       ),
//       dataIndex: "session_name",
//       key: "session_name",
//       width: "60%",
//       padding: "0px",

//       render: (text, record, index) => {
//         return (
//           <div className=" gx-my-0">
//             <div className="gx-font-weight-semi-bold">{text}</div>
//             <div className="gx-font-weight-semi-bold gx-fs-sm">
//               session Limit : {record.max}
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "No",
//       dataIndex: "oddsNo",
//       key: "oddsNo",
//       width: "20%",
//       onCell: (record, rowIndex) => ({
//         className:
//           record.running_status === "SUSPENDED"
//             ? "matchdtailsSuspendBackground"
//             : "",
//       }),
//       align: "center",
//       render: (text, record) => {
//         return record.running_status !== "SUSPENDED" ? (
//           <div
//             onClick={() => {
//               if (record.runsNo <= 0) return;
//               handlebet({
//                 sessionName: record.session_name,
//                 odds: record.oddsNo,
//                 runs: record.runsNo,
//                 selectionId: record.session_id,
//                 type: "N",
//                 betForMarketId: marketId,
//                 marketId: marketId,
//                 eventId: eventId,
//                 oddsType: "fancy",
//                 betFor: "fancy",
//                 printData: "No"

//               });
//               scrollToElement();
//             }}
//           >
//             <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-red">
//               {record.runsNo}
//             </div>
//             <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-red">
//               {(Number(text) * 100).toFixed(0)}
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="gx-fs-xs  gx-fs-lg gx-text-red gx-font-weight-semi-bold">0</div>
//             <div className="gx-fs-xs  gx-fs-xs gx-text-red gx-font-weight-semi-bold">0.00</div>
//           </>
//         );
//       },
//     },
//     {
//       title: "YES",
//       dataIndex: "oddsYes",
//       width: "20%",
//       onCell: (record) => ({
//         className:
//           record.running_status === "SUSPENDED"
//             ? "matchdtailsSuspendBackground"
//             : "",
//       }),
//       key: "oddsYes",

//       align: "center",
//       render: (text, record) => {
//         return record.running_status !== "SUSPENDED" ? (
//           <div
//             onClick={() => {
//               if (record.runsYes <= 0) return;
//               handlebet({
//                 sessionName: record.session_name,
//                 odds: record.oddsYes,
//                 runs: record.runsYes,
//                 selectionId: record.session_id,
//                 type: "Y",
//                 betForMarketId: marketId,
//                 marketId: marketId,
//                 eventId: eventId,
//                 oddsType: "fancy",
//                 betFor: "fancy",
//                 printData: "Yes"
//               });
//               scrollToElement();
//             }}
//           >
//             <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-blue">
//               {record.runsYes}
//             </div>
//             <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-blue">
//               {(Number(text) * 100).toFixed(0)}
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="gx-fs-xs gx-fs-lg gx-text-blue gx-font-weight-semi-bold">0</div>
//             <div className="gx-fs-xs gx-fs-xs gx-text-blue gx-font-weight-semi-bold">0.00</div>
//           </>
//         );
//       },
//     },
//   ];

//   //  //////////////////////--------------------------match bets data----------------------/////////////////////////////////
//   const mybets = [
//     {
//       title: "Team",
//       dataIndex: "Team",
//       key: "Team",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "oddsType",
//       dataIndex: "oddsType",
//       key: "oddsType",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Amount",
//       dataIndex: "Amount",
//       key: "Amount",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },

//     {
//       title: "Rate",
//       dataIndex: "Rate",
//       key: "Rate",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Mode",
//       dataIndex: "Type",
//       key: "Type",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//   ];
//   const generateOddsData = () => {
//     const data = [];

//     oddsbetdata?.forEach((element, index) => {
//       data.push({
//         key: index,
//         Runs: element.run,
//         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
//         Amount: Number.parseFloat(element.amount).toFixed(2),
//         Type:
//           element.type === "N"
//             ? "NO"
//             : element.type === "Y"
//               ? "YES"
//               : element.type === "K"
//                 ? "Khai"
//                 : element.type === "L"
//                   ? "Lagai"
//                   : "",

//         Team: element.teamName,
//         Client: `${element.userInfo && element.userInfo.clientName
//           ? element.userInfo.clientName
//           : ""
//           } ${element.userInfo && element.userInfo.clientCode
//             ? element.userInfo.clientCode
//             : ""
//           }`,
//         Agent: `${element.userInfo && element.userInfo.creatorName
//           ? element.userInfo.creatorName
//           : ""
//           }`,
//         oddsType: `${element.oddsType}`,
//         Date: `${element.createdAt
//           ? moment(element.createdAt)
//             .utcOffset("+05:30")
//             .format("DD MMM hh:mm:ss A")
//           : ""
//           }`,
//         Loss: `${element.loss
//           ? Number.parseFloat(Math.abs(element.loss)).toFixed(2)
//           : 0
//           }`,
//         Profit: `${element.profit
//           ? Number.parseFloat(Math.abs(element.profit)).toFixed(2)
//           : 0
//           }`,
//       });
//     });
//     return data;
//   };

//   const mybetsData = generateOddsData();

//   //////////////////////////////////////--------------------------------------Incompleted fancy data -------------------////////////////

//   const IncompltedBetsColumn = [
//     {
//       title: "Runner",
//       dataIndex: "Team",
//       key: "Team",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },

//     {
//       title: "Amount",
//       dataIndex: "Amount",
//       key: "Amount",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Run",
//       dataIndex: "Runs",
//       key: "Runs",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Rate",
//       dataIndex: "Rate",
//       key: "Rate",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Mode",
//       dataIndex: "Type",
//       key: "Type",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//   ];

//   const generateInCompletedData = () => {
//     const data = [];

//     incomletedFancy?.forEach((element, index) => {
//       data.push({
//         key: index,
//         Runs: element.run,
//         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
//         Amount: Number.parseFloat(element.amount).toFixed(2),
//         Type:
//           element.type === "N"
//             ? "NO"
//             : element.type === "Y"
//               ? "YES"
//               : element.type === "K"
//                 ? "Khaai"
//                 : element.type === "L"
//                   ? "Lagaai"
//                   : "",

//         Team: element.sessionName ? element.sessionName : "-",
//         Client: `${element.userInfo && element.userInfo.clientName
//           ? element.userInfo.clientName
//           : ""
//           } ${element.userInfo && element.userInfo.clientCode
//             ? element.userInfo.clientCode
//             : ""
//           }`,
//         Agent: `${element.userInfo && element.userInfo.creatorName
//           ? element.userInfo.creatorName
//           : ""
//           }`,
//         oddsType: `${element.oddsType}`,
//         Date: `${element.createdAt
//           ? moment(element.createdAt)
//             .utcOffset("+05:30")
//             .format("DD MMM hh:mm:ss A")
//           : ""
//           }`,
//       });
//     });
//     return data;
//   };

//   const IncompleteddataList = generateInCompletedData();
//   ////////////////////////////////////////--------------------------------------completed fancy data -------------------////////////////////

//   const compltedBetsColumn = [
//     {
//       title: "Runner",
//       dataIndex: "Team",
//       key: "Team",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },

//     {
//       title: "Amount",
//       dataIndex: "Amount",
//       key: "Amount",
//     },
//     {
//       title: "Run",
//       dataIndex: "Runs",
//       key: "Runs",
//     },
//     {
//       title: "Rate",
//       dataIndex: "Rate",
//       key: "Rate",
//     },
//     {
//       title: "Mode",
//       dataIndex: "Type",
//       key: "Type",
//     },
//     {
//       title: "Date",
//       dataIndex: "Date",
//       key: "Date",
//       render: (value) => <span className="gx-text-nowrap">{value}</span>
//     },
//     {
//       title: "Results",
//       dataIndex: "results",
//       key: "results",
//     },
//     {
//       title: "P&L",
//       dataIndex: "pos",
//       key: "pos",
//       render: (value) => <span className={`${value > 0 ? 'gx-text-blue' : value < 0 ? 'gx-text-red' : 'gx-text-black'}`}>{value}</span>
//     },
//   ];
//   const generateCompletedData = () => {
//     const data = [];

//     compltedFancy?.forEach((element, index) => {
//       data.push({
//         key: index,
//         Runs: element.run,
//         Rate: Number.parseFloat(100 * element.odds).toFixed(2),
//         Amount: Number.parseFloat(element.amount).toFixed(2),
//         Type:
//           element.type === "N"
//             ? "NO"
//             : element.type === "Y"
//               ? "YES"
//               : element.type === "K"
//                 ? "Khai"
//                 : element.type === "L"
//                   ? "Lagai"
//                   : "",

//         Team: element.sessionName,
//         Client: `${element.userInfo && element.userInfo.clientName
//           ? element.userInfo.clientName
//           : ""
//           } ${element.userInfo && element.userInfo.clientCode
//             ? element.userInfo.clientCode
//             : ""
//           }`,
//         Agent: `${element.userInfo && element.userInfo.creatorName
//           ? element.userInfo.creatorName
//           : ""
//           }`,
//         oddsType: `${element.oddsType}`,
//         results: `${element.decisionRun}`,
//         Date: `${element.createdAt
//           ? moment(element.createdAt)
//             .utcOffset("+05:30")
//             .format("DD MMM hh:mm:ss A")
//           : ""
//           }`,
//         pos: `${Math.round(Math.abs(element.pos))}`,
//       });
//     });
//     return data;
//   };

//   const completeddataList = generateCompletedData();
//   const handleInputChange = (value) => {
//     if (!isNaN(value)) {
//       setInputValue(value);
//     } else if (value === "") {
//       setInputValue(value);
//     }
//   };

//   const options = Object.keys(betChips).map((key) => ({
//     value: String(betChips[key]),
//   }));

//   // if(!matchDetailsResponse || matchDetailsResponse === undefined){
//   //   return
//   // }
//   // console.log(socketDetails,"socketlsfjdgh")


//   return (
//     <Auxiliary>

//       {
//         completedModal &&
//         <CompletedBetsModal handleClose={handleCloseCompletedModal} compltedBetsColumn={compltedBetsColumn} completeddataList={completeddataList} />
//       }
//       {/* <AlertModal  onConfirm={handleCloseAlertModal} betStatus={betStatus} /> */}
//       {betStatus && (
//         <AlertModal
//           onConfirm={handleCloseAlertModal}
//           betStatusUpdate={betStatus}
//         />
//       )}


//       <Row className="gx-bg-flex gx-align-items-center gx-justify-content-between gx-bg-grey">
//         <span
//           onClick={() => setActiveTabTv((tv) => !tv)}
//           className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
//         >
//           TV
//         </span>
//         <span
//           onClick={() => {
//             setActiveTabFame((frame) => !frame);
//           }}
//           className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
//         >
//           FS
//         </span>
//       </Row>
//       <Row
//         justify={"center"}
//         className="gx-bg-flex gx-align-items-center gx-justify-content-between"
//       >
//         {activeTabTv && (
//           <Col
//             xs={26}
//             className="gx-bg-flex gx-w-100 gx-justify-content-center"
//           >
//             <div className="gx-w-100">
//               <iframe
//                 style={{ width: "100%", height: 250 }}
//                 src={matchDetailsResponse?.tvUrl}
//                 title=" "
//                 className="gx-w-100"
//               ></iframe>
//             </div>
//           </Col>
//         )}
//       </Row>
//       <Row justify={"center"}>
//         <Col xs={24} sm={24} className="gx-col-full">
//           {matchDetailsResponse?.scoreIframe ? (
//             <Row
//               style={{ height: `${activeTabFrame ? "180px" : "110px"}` }}
//               className=""
//             >
//               <iframe
//                 style={{ width: "100%", height: "100%", border: "none" }}
//                 src={matchDetailsResponse?.scoreIframe}
//                 title="Score-I-frame"
//                 className=""
//               ></iframe>
//             </Row>
//           ) : null}
//         </Col>

//         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >


//        {matchDetailsResponse?.isMatchOdds &&  socketDetails?.find(el => el.marketType === "Match Odds") && 

//           <Table
//             className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
//             size="small"
//             title=""
//             dataSource={oddsData}
//             columns={oddsColumn}
//             pagination={false}
//             bordered
//             scroll={{ x: true }}
//             rowClassName="no-hover"
//             style={{ marginTop: "16px" }}
//           />

//        }  
//         </Col> 
//         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
//           {data && data.length > 0 ? (
//             <Table
//               className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
//               size="small"
//               title=""
//               dataSource={data}
//               columns={columns}
//               pagination={false}
//               bordered
//               scroll={{ x: true }}
//               rowClassName="no-hover"
//               style={{ marginTop: "16px" }}
//             />
//           ) : null}
//         </Col>
//         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
//           {matchDetailsResponse?.isTieOdds && matchScoreDetails?.team_data?.length <= 2  && socketDetails?.find(el => el.marketType == "Tied Match")  &&  
//           <Table
//             className="gx-w-100 gx-mx-0 gx-my-0"
//             size="small"
//             rowHoverable={false}
//             title=""
//             dataSource={tiedData}
//             columns={tiedColumn}
//             pagination={false}
//             bordered
//             style={{ marginTop: "16px" }}
//           />
//         } 
//         </Col> 
//         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
//        {matchDetailsResponse?.isToss && matchScoreDetails?.toss_data   && matchScoreDetails?.toss_data?.length > 0 &&     
//            <Table
//             className="gx-w-100 gx-mx-0 gx-my-0"
//             size="small"
//             rowHoverable={false}
//             title=""
//             dataSource={tossData}
//             columns={tossColumn}
//             pagination={false}
//             bordered
//             style={{ marginTop: "16px" }}
//           />
//           }  
//         </Col>
//         <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
//           {data2 && data2.length > 0 ? (
//             <Table
//               className="gx-w-100 gx-mx-0 gx-my-0"
//               size="small"
//               title=""
//               dataSource={data2}
//               columns={fancyColumns}
//               cellPaddingBlockSM
//               pagination={false}
//               bordered
//               style={{ marginTop: "16px" }}
//             />
//           ) : null}
//         </Col>
//       </Row>
//       <Row id="betPLaceModal" justify={"center"}>
//         {timeLeft > 0 && (
//           <Col
//             style={{ border: "2px solid #8B8000" }}
//             className="gx-px-0 gx-py-0 gx-rounded-lg gx-mx-0 gx-my-0"
//             xs={24}
//             sm={22}
//           >
//             <div className="gx-my-1 gx-lg-block gx-d-none gx-d-lg-block gx-mx-1">
//               <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
//                 <div
//                   style={{ gap: "40px" }}
//                 // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
//                 //   }`}
//                 >
//                   <span>{betModalData?.sessionName} </span>

//                   <span>
//                     Rate : {betModalData?.odds}
//                     <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' || betModalData?.printData === 'Back' ? '#FAA9BA' : betModalData?.printData === 'Lay' || betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF': '#fff'}}>

//                       (
//                       {betModalData?.printData ? betModalData?.printData : "" })
//                     </span>

//                   </span>
//                 </div>
//                 <span
//                   style={{ width: "30px", height: "30px" }}
//                   className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
//                 >
//                   <span>{timeLeft}</span>
//                 </span>
//               </div>
//               <div
//                 style={{ gap: "10px" }}
//                 className="gx-bg-flex  gx-justify-content-center gx-align-items-center"
//               >
//                 <span>Amount</span>
//                 <span>
//                   <Input
//                     ref={inputRef}
//                     value={inputValue}
//                     onChange={(values) => setInputValue(Number(values.target.value))}
//                     type="number"
//                     className="gx-font-weight-semi-bold gx-fs-lg"
//                   />
//                 </span>
//                 <Button
//                   disabled={processingBet}
//                   onClick={() => placeNewBet()}
//                   className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
//                     } gx-text-white  gx-mb-0 gx-px-2`}
//                 >
//                   Done
//                   {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center"> */}
//                   {/* <Button className="gx-px-2" size="small">Done</Button> */}
//                   {processingBet && <div className="loaderSpinner gx-px-1"></div>}
//                   {/* </div> */}


//                 </Button>
//               </div>
//               <div className="gx-text-center">
//                 {betChips &&
//                   Object.keys(betChips).map((key, index) => {
//                     if (index % 4 === 0) {
//                       return (
//                         <div
//                           key={`row-${index}`}
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             flexWrap: "wrap",
//                             marginBottom: "10px",
//                             gap: "30px", // Add gap between buttons
//                             padding: "0 10px", // Add padding to the row for left/right spacing
//                           }}
//                         >
//                           {Object.keys(betChips)
//                             .slice(index, index + 4)
//                             .map((subKey) => (
//                               <Button
//                                 className="gx-px-5 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
//                                 key={subKey}
//                                 onClick={() => setInputValue(betChips[subKey])}
//                                 style={{ margin: "5px" }}
//                               >
//                                 {betChips[subKey]}
//                               </Button>
//                             ))}
//                         </div>
//                       );
//                     }
//                     return null;
//                   })}
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2, 1fr)",
//                     gap: "5px",
//                   }}
//                   className=""
//                 >
//                   <Button onClick={() => setInputValue(0)} type="danger">
//                     ClearInput
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setTimeLeft(0);
//                       setInputValue(0);
//                     }}
//                     type="danger"
//                   >
//                     Close
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         )}
//       </Row>
//       {timeLeft > 0 && (
//         <div className="gx-bg-grey gx-w-100 gx-mt-2 gx-d-block gx-d-lg-none">

//           <div
//             className={`gx-px-5 gx-py-2 gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-capitalize 
//               }`}
//           >
//              Type:   <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' || betModalData?.printData === 'Back' ? '#FAA9BA' : betModalData?.printData === 'Lay' || betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF': '#fff'}}>
//               {betModalData?.printData} </span><br />
//             {betModalData?.oddsType} : {betModalData?.sessionName}{" "}
//           </div>
//         </div>
//       )}
//       <div className="gx-d-lg-none gx-border gx-my-2 gx-d-block">
//         <div className="gx-bg-flex  gx-justify-content-between gx-px-1 gx-align-items-center">
//           <div className="gx-text-nowrap">Amount : &nbsp;</div>
//           <div>
//             <AutoComplete
//               style={{ width: "100%" }}
//               options={options}
//               disabled={timeLeft <= 0 ? true : false}
//               value={inputValue}
//               onChange={handleInputChange}
//               placeholder="Enter a number or select a value"
//               filterOption={(inputValue, option) =>
//                 option.value.includes(inputValue)
//               }
//             >
//               <Input
//                 type="number"
//                 ref={inputRef2}
//                 disabled={timeLeft <= 0 ? true : false}
//                 readOnly={timeLeft <= 0 ? true : false}
//                 value={inputValue}
//                 onChange={(e) => handleInputChange(e.target.value)}
//               />
//             </AutoComplete>
//           </div>
//           <div className="gx-bg-flex  gx-justify-content-between  gx-align-items-center">
//             <span className="gx-bg-dark gx-text-white gx-fs-lg- gx-font-weight-bold gx-px-2 gx-py-2 gx-bg-flex  gx-justify-content-between gx-mx-1  gx-align-items-center">
//               {timeLeft}
//             </span>
//             <Button
//               disabled={processingBet || timeLeft <= 0}
//               size="smaLL"
//               onClick={() => placeNewBet()}
//               className={`${processingBet || timeLeft <= 0 ? "gx-bg-primary" : "gx-bg-primary"
//                 } gx-text-white  gx-justify-content-center  gx-mb-0 gx-px-2`}
//             >
//               Done
//               {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center">
//                  <div className="gx-px-2">Done</div> */}
//               {processingBet && <div className="loaderSpinner "></div>}
//               {/* </div> */}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div ref={scrollToRef} className="gx-mb-2"></div>

//       <Row justify={"center"} className="">
//         {mybetsData && mybetsData?.length > 0 && (
//           <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
//             <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
//               MATCH BETS
//             </div>
//             <Table
//               className="gx-w-100 gx-mx-0 gx-my-0"
//               size="small"
//               rowHoverable={false}
//               title=""
//               scroll={{ x: true }}
//               dataSource={mybetsData}
//               columns={mybets}
//               pagination={false}
//               bordered
//             />
//           </Col>
//         )}
//         {IncompleteddataList && IncompleteddataList?.length > 0 && (
//           <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
//             <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
//               FANCY BETS
//             </div>
//             <Table
//               className="gx-w-100 gx-mx-0 gx-my-0"
//               size="small"
//               rowHoverable={false}
//               title=""
//               scroll={{ x: true }}
//               dataSource={IncompleteddataList}
//               columns={IncompltedBetsColumn}
//               pagination={false}
//               bordered
//             />
//           </Col>
//         )}

//         {/* {completeddataList && completeddataList?.length > 0 && ( */}
//         {/* // <Row className="" justify={"center"}> */}
//         {/* <Col className="gx-px-0 gx-py-1 gx-mx-0 gx-my-0" xs={24} sm={18}>
//           <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
//             COMPLETED FANCY BETS
//           </div>
//           <Table
//             className="gx-w-100 gx-mx-0 gx-my-0"
//             size="small"
//             rowHoverable={false}
//             title=""
//             scroll={{ x: true }}
//             dataSource={completeddataList}
//             columns={compltedBetsColumn}
//             pagination={false}
//             bordered
//           />
//         </Col> */}
//         {/* )} */}
//       </Row>
//       <Row justify={"center"}>
//         <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
//           <Button
//             className="gx-bg-grey gx-text-white gx-font-weight-semi-bold"
//             onClick={() => {
//               setCompltedModal(true)

//             }}
//           >
//             Completed Bets
//           </Button>
//         </Col >
//       </Row>
//       <Row justify={"center"}>
//         <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
//           <Button
//             onClick={() => setMatchModal(true)}
//             className={`gx-my-0  gx-bg-grey gx-text-white gx-font-weight-semi-bold `}
//           >
//             All Matches
//           </Button>
//           {matchModal && (
//             <MatchModal
//               handleClose={handleCloseMatchModal}
//               datalist={matchList}
//               marketId={marketId}
//             />
//           )}
//         </Col>
//       </Row>
//     </Auxiliary>
//   );
// };
// export default MatchDetails;











import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Auxiliary from "util/Auxiliary";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ErrorModalClose,
  getMatchDetail,
  getSportsBetsList,
  oddsPlaceBets,
  placeBets,
  userPositionByMarketId,
} from "../../../appRedux/actions/User";
import { io } from "socket.io-client";
import axios from "axios";
import MatchModal from "./MatchModal";
import moment from "moment";
import AlertModal from "./AlertModal";
import { betChipsValues } from "../../../constants/global";
import CompletedBetsModal from "./CompletedBetsModal";


const MatchDetails = () => {
  const { marketId, eventId, cacheUrls } = useParams();
  const dispatch = useDispatch();
  const intervalIdRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [activeTabTv, setActiveTabTv] = useState(false);
  const [activeTabFrame, setActiveTabFame] = useState(false);
  const [socketDetails, setsocketDetails] = useState(null);
  const [matchScoreDetails, setMatchScoreDetails] = useState(null);
  const [matchModal, setMatchModal] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [bookmakerCoin, setBookmakerCoin] = useState({ max: null, min: null });
  const [sessionCoin, setSessionCoin] = useState({ max: null, min: null });
  const [completedModal, setCompltedModal] = useState(false)
  const {
    matchDetailsResponse,
    userpositionbymarketId,
    matchList,
    sportsBetsList,
    processingBet,
    betStatus,
  } = useSelector((state) => state.UserReducer);







  // const decodedCacheUrl = decodeURIComponent(cacheUrls);

  const matchlistfromLocalStorage = JSON.parse(
    localStorage.getItem("matchList")
  );
  const matchCacheUrl = matchlistfromLocalStorage?.find((el) => el.marketId === marketId)?.cacheUrl;



  // const matchIframeUrl = matchlistfromLocalStorage?.find(({ marketId: id }) => id === marketId)?.scoreIframe ?? null;

  const handleCloseCompletedModal = () => {
    setCompltedModal(false)
  }


  ///////////////////////-----------------------handling bet place Error modals------------------//////////////////////////

  // useEffect(() => {
  //   if (betStatus !== null) {
  //     setMessageModal(true);
  //     if (betStatus === true) {
  //       SetBetStatusUpdate("success");
  //     } else if (betStatus === "error") {
  //       SetBetStatusUpdate("error");
  //     } else {
  //       SetBetStatusUpdate("");
  //     }
  //   }
  // }, [betStatus]);

  // const handleCloseAlertModal = () => {
  //   setMessageModal(false);
  //   SetBetStatusUpdate("");
  // };


  const handleCloseAlertModal = () => {
    dispatch(ErrorModalClose())
  };

  //////////////////////////////////////////////initial code ////////////////////
  const socketRef = useRef(null);

  const setupAsyncActions = async (marketId) => {
    setMatchScoreDetails("");
    getMatchDataByMarketIdWise();
    getuserPositionByMarketIdWise();
    fetchBetLists();
  };

  const getMatchDataByMarketIdWise = async () => {
    let reqData = {
      marketId: marketId,
    };
    dispatch(getMatchDetail(reqData));
  };
  useEffect(() => {
    if (betStatus === true) {
      getuserPositionByMarketIdWise()
    }
  }, [betStatus])




  const socketUrl1 = matchlistfromLocalStorage?.find((el) => el.marketId === marketId)?.socketUrl;
  const socketPermLoca = matchlistfromLocalStorage?.find((el) => el.marketId === marketId)?.socketPerm;

  useEffect(() => {

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (!isConnected) {
          connectSocket(socketUrl1);
        }
      } else if (document.visibilityState === "hidden") {
        cleanupWebSocket();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    setupAsyncActions(marketId);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cleanupWebSocket();
      clearInterval(intervalIdRef.current);
    };
  }, [eventId, marketId]);










  useEffect(() => {
    if (!matchDetailsResponse) return;

    // Set the socket URL
    // setSocketUrl(matchDetailsResponse.socketUrl);

    // Clear any previous intervals
    getMarketCacheUrl(matchCacheUrl)
    clearInterval(intervalIdRef.current);

    // Determine action based on socket permission
    if (matchDetailsResponse.socketPerm) {
      // Check if the socket is already connected
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
        connectSocket(matchDetailsResponse.socketUrl);
      }
    } else {
      callCache(matchDetailsResponse.cacheUrl);
    }

    // Clean up on unmount
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [matchDetailsResponse]);











  const connectSocket = (socketUrl = matchDetailsResponse?.socketUrl) => {
    socketRef.current = io(socketUrl, {
      transports: ["websocket"],
      reconnection: false,
    });

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      socketRef.current.emit("marketByEvent", eventId);
    });

    socketRef.current.on(eventId, (data) => {
      setsocketDetails(JSON.parse(data));
    });

    if (socketPermLoca === true) {
      socketRef.current.emit("JoinRoom", marketId);
      socketRef.current.on(marketId, (data) => {

        setMatchScoreDetails(JSON.parse(data).result);
      });
    }
  };


  const getMarketCacheUrl = async (cacheUrl) => {
    try {
      const response = await axios.get(cacheUrl);
      setMatchScoreDetails(response?.data?.result);
    } catch (error) {
      setMatchScoreDetails(null);
      console.error("Error fetching market cache URL:", error);
    }
  };

  const callCache = (cacheUrl) => {

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    const newIntervalId = setInterval(() => getMarketCacheUrl(cacheUrl), 1000);
    intervalIdRef.current = newIntervalId;
  };




  const cleanupWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  };
  const getuserPositionByMarketIdWise = async () => {
    let reqData = {
      marketId: marketId,
    };
    dispatch(userPositionByMarketId(reqData));
  };

  const fetchBetLists = async () => {
    try {
      const BetListData = {
        fancyBet: true,
        oddsBet: true,
        marketId: marketId,
        // isDeclare: false,
      };
      dispatch(getSportsBetsList(BetListData));
    } catch (error) {
      console.error("Error fetching bet lists:", error);
      throw error;
    }
  };

  ///////////////////////////--------------------------handling user positions --------------///////////////
  const [returnDataObject, setReturnDataObject] = useState({});
  const [returnDataObject2, setReturnDataObject2] = useState({});
  const [returnDataObject3, setReturnDataObject3] = useState({});



  useEffect(() => {
    if (userpositionbymarketId) {

      let oddsPos = [];

      let returMatchOdds = {};
      let returnTossMatch = {}
      let returnTiedMatch = {}
      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId.oddsPosition;
        oddsPos.filter(ele => ele.oddsType === "matchOdds").forEach((data) => {
          returMatchOdds[data._id] = data.totalPosition.toFixed(2);
        });
        setReturnDataObject(returMatchOdds);
      }
      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId.oddsPosition;
        oddsPos.filter(ele => ele.oddsType === "toss").forEach((data) => {
          returnTossMatch[data._id] = data.totalPosition.toFixed(2);
        });
        setReturnDataObject3(returnTossMatch);
      }
      if (userpositionbymarketId?.oddsPosition) {
        oddsPos = userpositionbymarketId.oddsPosition;
        oddsPos.filter(ele => ele.oddsType === "tiedMatch").forEach((data) => {
          returnTiedMatch[data._id] = data.totalPosition.toFixed(2);
        });
        setReturnDataObject2(returnTiedMatch);
      }

      // const finalOddsTotalPosTemp = bookmakerTeamData.map((teamData) => {
      //   let pushPos = 0;
      //   if (returnDataObjectTemp[teamData.betfairSelectionId]) {
      //     pushPos += returnDataObjectTemp[teamData.betfairSelectionId];
      //   }
      //   if (returnDataObjectTemp[teamData.bookmakerSelectionId]) {
      //     pushPos += returnDataObjectTemp[teamData.bookmakerSelectionId];
      //   }
      //   return { ...teamData, finalPos: pushPos };
      // });

      // setFinalOddsTotalPos(finalOddsTotalPosTemp);
    }
  }, [userpositionbymarketId]);

  //////////////////////////////-----------------------handling scroll effect -----------------------///////////////////////
  const scrollToRef = useRef(null);
  const inputRef2 = useRef(null);  /////// desktop
  const inputRef = useRef(null);  //////// mobile
  const scrollToElement = () => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    if (inputRef.current) {

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
    }
    if (inputRef2.current) {

      setTimeout(() => {
        if (inputRef2.current) {
          inputRef2.current.focus();
        }
      }, 500);
    }
  };
  // const scrollToRef = useRef(null);
  // const scrollToElement = () => {
  //   scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  // };
  ///////////////////---------------------Timer ConCept and bet handling handlebet place ----------------------
  const [timeLeft, setTimeLeft] = useState(0);
  const [betModalData, setBetModalData] = useState(false);
  const [betChips, setBetChips] = useState(betChipsValues);

  useEffect(() => {
    if (timeLeft === 0) {
      setBetModalData({});
      setInputValue(0);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handlebet = (record) => {
    setBetModalData(record);
    setTimeLeft(10);
  };
  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const authUserData = JSON.parse(authUser);
      const betChipsData = authUserData?.data?.betChipsData;
      setBetChips(betChipsData);
    } else {
      setBetChips(betChipsValues);
    }
  }, []);
  const handleCloseMatchModal = () => {
    setMatchModal(false);
  };




  /////////////////////////////////////////--------------------filtering table  odd , completed and incompletedfancy -------------------------------- ///////////////////////////
  const [oddsbetdata, setOddsbetData] = useState();
  const [incomletedFancy, setIncompletedFancy] = useState();
  const [compltedFancy, setCompletedFancy] = useState();
  useEffect(() => {
    if (sportsBetsList) {
      const sortedOddsBetData = sportsBetsList?.data?.oddsBetData
        ? sportsBetsList?.data?.oddsBetData
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      const filteredFancyBetData = sportsBetsList?.data?.fancyBetData
        ? sportsBetsList?.data?.fancyBetData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        : [];
      const completeFancy =
        filteredFancyBetData && filteredFancyBetData.length > 0
          ? filteredFancyBetData.filter((element) => element.isDeclare === 1)
          : [];
      let showCompletedFancy = [];

      completeFancy.map((data) => {
        let pos = 0;
        if (data.decisionRun >= data.run && data.type === "Y") {
          pos = Math.round(data.amount * data.odds);
        } else if (data.decisionRun >= data.run && data.type === "N") {
          pos = Math.round(-1 * data.amount * data.odds);
        } else if (data.decisionRun < data.run && data.type === "Y") {
          pos = Math.round(-1 * data.amount);
        } else if (data.decisionRun < data.run && data.type === "N") {
          pos = Math.round(data.amount);
        }
        data.pos = pos;
        showCompletedFancy.push(data);
      });
      setOddsbetData(sortedOddsBetData);
      setCompletedFancy(showCompletedFancy);
      setIncompletedFancy(
        filteredFancyBetData && filteredFancyBetData.length > 0
          ? filteredFancyBetData.filter((element) => element.isDeclare === 0)
          : []
      );
    }
  }, [sportsBetsList]);
  ////////////////////-----------------------------placing bets ----------------------//////////////////
  useEffect(() => {
    const maxCoinData = matchDetailsResponse?.maxMinCoins
      ? JSON.parse(matchDetailsResponse?.maxMinCoins)
      : {
        maximum_match_bet: null,
        minimum_match_bet: null,
        maximum_session_bet: null,
        minimum_session_bet: null,
      };

    setBookmakerCoin({
      max: maxCoinData?.maximum_match_bet,
      min: maxCoinData?.minimum_match_bet,
    });
    setSessionCoin({
      max: maxCoinData?.maximum_session_bet,
      min: maxCoinData?.minimum_session_bet,
    });
  }, [matchDetailsResponse]);
  useEffect(() => {
    if (processingBet === false) {
      fetchBetLists();
      setTimeLeft(0);
    }
  }, [processingBet]);

  const placeNewBet = () => {

    if (betModalData.oddsType === "bookmaker" || betModalData.oddsType === "matchOdds" || betModalData.oddsType === "toss" || betModalData.oddsType === "tiedMatch") {
      const reqData = {
        odds: betModalData.odds + "",
        amount: inputValue,
        selectionId: betModalData.selectionId + "",
        marketId: marketId + "",
        betfairMarketId: betModalData.betfairMarketId + "",
        eventId: eventId,
        betFor: betModalData.betFor + "",
        run: betModalData.runs ? betModalData.runs + "" : "0",
        oddsType: betModalData.oddsType + "",
        type:
          betModalData.oddsType === "fancy"
            ? betModalData.type + ""
            : betModalData.betType + "",
      };
      if (
        // reqData.amount <= bookmakerCoin.max &&
        // reqData.amount >= bookmakerCoin.min &&
        reqData.amount > 0
      ) {
        dispatch(oddsPlaceBets(reqData));
      } else {
        setTimeLeft(0);
      }
    }
    if (betModalData.oddsType === "fancy") {
      const reqData = {
        odds: betModalData.odds + "",
        amount: inputValue,
        selectionId: betModalData.selectionId + "",
        marketId: marketId + "",
        eventId: eventId,
        betFor: betModalData.betFor + "",
        run: betModalData.runs ? betModalData.runs + "" : "0",
        oddsType: betModalData.oddsType + "",
        type:
          betModalData.oddsType === "fancy"
            ? betModalData.type + ""
            : betModalData.betType + "",
      };
      if (
        // reqData.amount <= sessionCoin.max &&
        // reqData.amount >= sessionCoin.min &&
        reqData.amount > 0
      ) {
        dispatch(placeBets(reqData));
      } else {
        setTimeLeft(0);
      }
    }
  };

  /////////////////////////////-------------------- bests calling every 10 sec ---------------------------------///////////////////////////////
  useEffect(() => {
    fetchBetLists();
    // const fetchBetListsInterval = setInterval(() => {
    //   fetchBetLists();
    // }, 10000);

    // return () => {
    //   clearInterval(fetchBetListsInterval);
    // };
  }, []);
  ////////////////////////////----------------------- Bookmaker Data --------------------//////////////////




  const data = [];
  if (matchScoreDetails) {

    const sortedSelectionIdData = matchScoreDetails?.team_data?.slice()  // Create a copy of the array
      .sort((a, b) => a.team_name.localeCompare(b.team_name));

    sortedSelectionIdData.forEach((ele, i) => {
      data.push({
        key: i,
        teamName: ele.team_name,
        lgaai: ele.lgaai,
        khaai: ele.khaai,
        positon: ele.positon,
        selectionid: ele.selectionid,
      });
    });
  }

  const columns = [
    {
      title: (
        // <div
        //   style={{ gap: "10rem" }}
        //   className="gx-bg-flex gx-justify-content-start "
        // >
        //   <span className="gx-d-none gx-d-lg-block">Bookmaker</span>
        //   <span style={{ textWrap: "nowrap" }}>
        //     Min: {bookmakerCoin?.min} Max: {bookmakerCoin?.max}
        //   </span>
        // </div>
        <div
          style={{}}
          className="gx-bg-flex gx-justify-content-between minMax "
        >
          <span className="">Bookmaker</span>
          <span style={{ textWrap: "nowrap" }}>
            Min: {bookmakerCoin?.min} Max: {bookmakerCoin?.max}
          </span>
        </div>
      ),
      dataIndex: "teamName",
      className: "",
      key: "teamName",

      width: "60%",
      render: (text, record, index) => (
        <div className="gx-bg-flex gx-">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">
            {text}
          </div>
          <div
            className={`gx-font-weight-semi-bold ${userpositionbymarketId?.oddsPosition?.find(
              (item) => item?._id === record?.selectionid
            )?.Position > 0
              ? "gx-text-primary"
              : "gx-text-red"
              } `}
          >
            {
              userpositionbymarketId?.oddsPosition?.find(
                (item) => item?._id === record?.selectionid
              )?.Position.toFixed(2)
            }
          </div>
        </div>
      ),
    },
    {
      title: "Lagai",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      align: "center", onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsYesBackground",
      }),

      render: (text, record, index) => (
        <div
          onClick={() => {
            if (Number(text) <= 0) return;
            handlebet({
              sessionName: record.teamName,
              odds: record.lgaai,
              selectionId: record.selectionid,
              type: "YES",
              betType: "L",
              betForMarketId: marketId,
              marketId: marketId,
              eventId: eventId,
              oddsType: "bookmaker",
              betFor: "odds",
              printData: "Lagai"

            });
            scrollToElement();
          }}
          className="gx-font-weight-semi-bold gx-text-black gx-fs-lg gx-text-uppercase"
        >
          {(Number(text) * 100).toFixed(0)}
        </div>
      ),
    },
    {
      title: "Khai",
      dataIndex: "khaai",
      key: "khaai",
      width: "20%",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div
          onClick={() => {
            if (Number(text) <= 0) return;
            handlebet({
              sessionName: record.teamName,
              odds: record.khaai,
              selectionId: record.selectionid,
              type: "NO",
              betType: "K",
              betForMarketId: marketId,
              marketId: marketId,
              eventId: eventId,
              oddsType: "bookmaker",
              betFor: "odds",
              printData: "Khai"
            });
            scrollToElement();
          }}
          className="gx-font-weight-semi-bold gx-text-black gx-fs-lg gx-text-capitalize"
        >
          {(Number(text) * 100).toFixed(0)}
        </div>
      ),
    },
  ];


  const oddsData = [];
  if (socketDetails) {
    const matchoddsData = socketDetails?.find((el) => el.marketType === "Match Odds")
    const betfairmatchoddsMarketId = matchoddsData?.marketId

    //   const sortedSelectionIdData = matchoddsData?.selectionIdData?.slice()  // Create a copy of the array
    //   .sort((a, b) => a.runnerName.localeCompare(b.runnerName));



    if (matchoddsData) {
      matchoddsData.runners?.forEach((ele, i) => {
        oddsData.push({
          key: i,
          runnerName: ele.selectionName,
          selectionId: ele.selectionId,
          lgaaiprice: socketDetails
            ?.find((el) => el.marketType === "Match Odds")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToLay[0]?.price,
          lgaaisize: socketDetails
            ?.find((el) => el.marketType === "Match Odds")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToLay[0]?.size?.toFixed(2),
          khaaiprice: socketDetails
            ?.find((el) => el.marketType === "Match Odds")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToBack[0]?.price,
          khaaisize: socketDetails
            ?.find((el) => el.marketType === "Match Odds")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToBack[0]?.size?.toFixed(2),
          oddsposition:
            returnDataObject[ele.selectionId] !== 0
              ? returnDataObject[ele.selectionId]
              : "-",
          betfairMarketId: betfairmatchoddsMarketId
        });
      });
    }
  }

  const oddsColumn = [
    {
      title: (
        // <div style={{ display: "flex " }}>
        //   <span>Match Odds</span>
        // </div>
        <div style={{ display: "flex " }} className="gx-bg-flex gx-justify-content-between minMax">
          <span>Match Odds</span>
          <span style={{ textWrap: "nowrap" }}>
            Min: 200 Max: {matchDetailsResponse ? JSON.parse(matchDetailsResponse?.maxMinCoins)?.maximum_matchOdds_coins : ""}
          </span>

        </div>
      ),
      dataIndex: "runnerName",

      key: "runnerName",

      width: "60%",
      render: (text, record, index) => (
        <div className="gx-bg-flex">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div
            className={`gx-font-weight-semi-bold ${record.oddsposition > 0 ? "gx-text-primary" : "gx-text-red"
              }`}
          >
            {record.oddsposition}
          </div>
        </div>
      ),
    },






    {
      title: "Lagai",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "  matchdtailsYesBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {

          if (Number(text) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.khaaiprice,
            selectionId: record.selectionId,
            type: "NO",
            betType: "L",
            // run:record.khaaisize,
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "matchOdds",
            betFor: "matchOdds",
            printData: "Lagai",
            betfairMarketId: record.betfairMarketId

          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-text-black gx-bg-flex gx-flex-column">
          <span>{record.khaaiprice}</span>
          <span className="gx-fs-xs">{record.khaaisize}</span>
        </div>
      ),
    },







    // 

    {
      title: "Khai",
      dataIndex: "khaai",
      key: "khaai",
      width: "20%",
      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {
          if (Number(text) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.lgaaiprice,
            selectionId: record.selectionId,
            type: "YES",
            betType: "K",
            // run:record.lgaaisize,
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "matchOdds",
            betFor: "matchOdds",
            printData: "Khai",
            betfairMarketId: record.betfairMarketId

          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-text-black gx-bg-flex gx-flex-column">
          <span>{record.lgaaiprice}</span>
          <span className="gx-fs-xs">{record.lgaaisize}</span>
        </div>
      ),
    },




  ];

  ///////////////////////////////////-------------------Tied data --------------////////////////////////

  const tiedData = [];
  if (socketDetails) {
  // console.log("matchDetailsResponse",JSON.parse(matchDetailsResponse?.maxMinCoins));
    const tiedMatchData = socketDetails?.find((el) => el.marketType === "Tied Match")

    // const sortedSelectionIdData = tiedMatchData?.selectionIdData?.slice()
    //   ?.sort((a, b) => a.sortPriority - b.sortPriority);


    const betfairTiedId = tiedMatchData?.marketId

    if (tiedMatchData) {
      tiedMatchData.runners?.forEach((ele, i) => {
        tiedData.push({
          key: i,
          runnerName: ele?.selectionName,
          selectionId: ele.selectionId,
          lgaaiprice: socketDetails
            ?.find((el) => el.marketType === "Tied Match")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToLay[0]?.price,
          lgaaisize: socketDetails
            ?.find((el) => el.marketType === "Tied Match")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToLay[0]?.size.toFixed(2),
          khaaiprice: socketDetails
            ?.find((el) => el.marketType === "Tied Match")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToBack[0]?.price,
          khaaisize: socketDetails
            ?.find((el) => el.marketType === "Tied Match")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToBack[0]?.size.toFixed(2),
          tiedposition:
            returnDataObject2[ele.selectionId] !== 0
              ? returnDataObject2[ele.selectionId]
              : "-",
          betfairMarketId: betfairTiedId
        });
      });
    }
  }

  const tiedColumn = [
    {
      title: (
        // <div style={{ display: "flex " }}>
        //   <span>Tied Match</span>
        // </div>
        <div style={{ display: "flex " }} className="gx-bg-flex gx-justify-content-between minMax">
          <span>Tied Match</span>
          <span style={{ textWrap: "nowrap" }}>
            Min: 200 Max: {matchDetailsResponse ? JSON.parse(matchDetailsResponse?.maxMinCoins)?.maximum_tie_coins : ""}
          </span>

        </div>
      ),
      dataIndex: "runnerName",
      width: "60%",
      render: (text, record, index) => (
        <div className="gx-bg-flex">
          <div className=" gx-font-weight-semi-bold ">{text}</div>
          <div className={`gx-font-weight-semi-bold ${record.tiedposition > 0 ? "gx-text-primary" : "gx-text-red"} `}>
            {record.tiedposition}
          </div>
        </div>
      ),
    },

    {
      title: "Lagai",
      dataIndex: "lgaai",
      key: "lgaai",
      width: "20%",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsYesBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {

          if (Number(text) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.khaaiprice,
            selectionId: record.selectionId,
            type: "NO",
            betType: "L",
            run: '0',
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "tiedMatch",
            betFor: "tiedMatch",
            printData: "Lagai",
            betfairMarketId: record.betfairMarketId
          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-text-black gx-bg-flex gx-flex-column">
          <span>{record.khaaiprice}</span>
          <span className="gx-fs-xs">{record.khaaisize}</span>
        </div>
      ),
    },

    {
      title: "Khai",
      dataIndex: "khaai",
      key: "khaai",
      width: "20%",
      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : " matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {
          if (Number(text) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.lgaaiprice,
            selectionId: record.selectionId,
            type: "NO",
            betType: "K",
            run: '0',
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "tiedMatch",
            betFor: "tiedMatch",
            printData: "Khai",
            betfairMarketId: record.betfairMarketId
          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-text-black gx-bg-flex gx-flex-column">
          <span>{record.lgaaiprice}</span>
          <span className="gx-fs-xs">{record.lgaaisize}</span>
        </div>
      ),
    },

  ];

  ///////////////////////////////////-------------------Toss data --------------////////////////////////
  const tossData = [];
  if (socketDetails) {
    // const sortedSelectionIdData = matchScoreDetails?.toss_data

    const tossMarket = socketDetails?.find((el) => el.marketType === "To Win the Toss");
    const betfairTossId = tossMarket?.marketId


    if (tossMarket) {
      tossMarket.runners?.forEach((ele, i) => {
        tossData.push({
          key: i,
          runnerName: ele?.selectionName,
          selectionId: ele.selectionId,
          lgaaiprice: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToLay[0]?.price,
          lgaaisize: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToLay[0]?.size.toFixed(2),
          khaaiprice: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)?.ex
            ?.availableToBack[0]?.price,
          khaaisize: socketDetails
            ?.find((el) => el.marketType === "To Win the Toss")
            ?.runners?.find((item) => item.selectionId === ele.selectionId)
            ?.ex?.availableToBack[0]?.size.toFixed(2),
          tossposition: returnDataObject3[ele.selectionid] !== 0 ? returnDataObject3[ele.selectionid] : "-",
          betfairMarketId: betfairTossId



          // lgaaiprice: Number(ele.lgaai) * 100,
          // lgaaisize: socketDetails
          //   ?.find((el) => el.marketType === "To Win the Toss")
          //   ?.runners?.find((item) => item.selectionId === ele.selectionid)
          //   ?.ex?.availableToLay[0]?.size.toFixed(2),
          // khaaiprice: Number(ele.khaai) * 100,
          // khaaisize: socketDetails
          //   ?.find((el) => el.marketType === "To Win the Toss")
          //   ?.runners?.find((item) => item.selectionId === ele.selectionid)
          //   ?.ex?.availableToBack[0]?.size.toFixed(2),

        });
      });
    }
  }

  const tossColumn = [
    {
      title: (
        <div style={{ display: "flex " }}>
          <span>Toss Match</span>
        </div>
      ),
      dataIndex: "runnerName",

      key: "runnerName",

      width: "60%",
      render: (text, record, index) => (
        <div className="">
          <div className=" gx-font-weight-semi-bold gx-text-uppercase">{text}</div>
          <div className={`gx-font-weight-semi-bold ${record.tossposition > 0 ? "gx-text-primary" : "gx-text-red"} `}>
            {record.tossposition}
          </div>
        </div>
      ),
    },
    {
      title: "Lagai",
      dataIndex: "lgaai",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsYesBackground",
      }),
      key: "lgaai",
      width: "20%",
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {

          if (Number(record.khaaiprice) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.khaaiprice,
            selectionId: record.selectionId,
            type: "NO",
            betType: "K",
            run: record.khaaisize,
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "toss",
            betFor: "toss",
            printData: "Back",
            betfairMarketId: marketId,
          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-text-black gx-bg-flex gx-flex-column">
          <span>{record.khaaiprice}</span>
          <span>{record.khaaisize}</span>
        </div>
      ),
    },








    {
      title: "Khai",
      dataIndex: "khaai",
      key: "khaai",
      width: "20%",
      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground"
            : "matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record, index) => (
        <div onClick={() => {

          if (Number(record.lgaaiprice) <= 0) return;
          handlebet({
            sessionName: record.runnerName,
            odds: record.lgaaiprice,
            selectionId: record.selectionId,
            type: "NO",
            betType: "L",
            run: record.khaaisize,
            betForMarketId: marketId,
            marketId: marketId,
            eventId: eventId,
            oddsType: "toss",
            betFor: "toss",
            printData: "Lay",
          });
          scrollToElement();
        }} className="gx-font-weight-semi-bold gx-bg-flex gx-text-black gx-flex-column">
          <span>{record.lgaaiprice}</span>
          <span>{record.lgaaisize}</span>
        </div>
      ),
    },


  ];

  //  //////////////////////--------------------------fancy data----------------------/////////////////////////////////

  const data2 = [];
  if (matchScoreDetails) {
    // console.log(matchScoreDetails, "matchScoreDetailsmatchScoreDetails11");
    // const sortedSessions = matchScoreDetails.session?.sort((a, b) => a.session_name - b.session_name);

    // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
    //   const getInitialChar = (str) => str.trim().charAt(0);

    //   // Extract starting characters
    //   const charA = getInitialChar(a.session_name);
    //   const charB = getInitialChar(b.session_name);

    //   // Check if characters are digits
    //   const isDigitA = /^\d/.test(charA);
    //   const isDigitB = /^\d/.test(charB);

    //   // If both are digits or both are letters, sort accordingly
    //   if (isDigitA && isDigitB) {
    //     // Extract numeric part and compare
    //     const numA = parseInt(a.session_name.match(/^\d+/)?.[0] || '0', 10);
    //     const numB = parseInt(b.session_name.match(/^\d+/)?.[0] || '0', 10);
    //     return numA - numB;
    //   } 
    //   if (isDigitA && !isDigitB) {
    //     // Digits come before letters
    //     return -1;
    //   }
    //   if (!isDigitA && isDigitB) {
    //     // Letters come after digits
    //     return 1;
    //   }

    //   // If both start with letters, sort alphabetically
    //   return a.session_name.localeCompare(b.session_name);
    // });

    const sortedSessions = matchScoreDetails.session.sort((a, b) => {
      // Helper functions
      const getInitialChar = (str) => str.trim().charAt(0);
      const startsWithDigit = (str) => /^\d/.test(str);
      const includesOver = (str) => /OVER/.test(str);
      const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
      const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

      // Extract session names
      const nameA = a.session_name;
      const nameB = b.session_name;

      // Check properties of the session names
      const isDigitA = startsWithDigit(nameA);
      const isDigitB = startsWithDigit(nameB);
      const includesOverA = includesOver(nameA);
      const includesOverB = includesOver(nameB);
      const containsFirstA = containsFirst(nameA);
      const containsFirstB = containsFirst(nameB);

      // Handle cases where either session contains "1ST" or "FIRST"
      if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
      if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

      // First priority: Digits with "OVER" come before digits without "OVER"
      if (isDigitA && isDigitB) {
        if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
        if (!includesOverA && includesOverB) return 1;  // "OVER" comes after non-"OVER"

        // If both have or don't have "OVER", sort numerically
        const numA = getNumericPart(nameA);
        const numB = getNumericPart(nameB);
        return numA - numB;
      }

      // Second priority: Digits come before letters
      if (isDigitA && !isDigitB) return -1; // Digits come before letters
      if (!isDigitA && isDigitB) return 1;  // Letters come after digits

      // Third priority: Sort alphabetically for letters
      return nameA.localeCompare(nameB);
    });


    // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
    //   return parseInt(a.priority, 10) - parseInt(b.priority, 10);
    // });
    sortedSessions?.forEach((ele, i) => {
      if (ele.com_perm === 'YES') {
        data2.push({
          key: i,
          session_name: ele.session_name,
          oddsYes: ele.oddsYes,
          oddsNo: ele.oddsNo,
          runsNo: ele.runsNo,
          runsYes: ele.runsYes,
          running_status: ele.running_status,
          session_id: ele.session_id,
          max: ele.max,
          selectionId: ele.Selection_id,
        });
      }
    });
  }
  const fancyColumns = [
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-center">Session</div>
      ),
      dataIndex: "session_name",
      key: "session_name",
      width: "60%",
      padding: "0px",

      render: (text, record, index) => {
        return (
          <div className=" gx-my-0">
            <div className="gx-font-weight-semi-bold">{text}</div>
            <div className="gx-font-weight-semi-bold gx-fs-sm">
              session Limit : {record.max}
            </div>
          </div>
        );
      },
    },
    {
      title: "No",
      dataIndex: "oddsNo",
      key: "oddsNo",
      width: "20%",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground matchdtailsNoBackground"
            : "matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div
            onClick={() => {
              if (record.runsNo <= 0) return;
              handlebet({
                sessionName: record.session_name,
                odds: record.oddsNo,
                runs: record.runsNo,
                selectionId: record.session_id,
                type: "N",
                betForMarketId: marketId,
                marketId: marketId,
                eventId: eventId,
                oddsType: "fancy",
                betFor: "fancy",
                printData: "No"

              });
              scrollToElement();
            }}
          >
            <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-black">
              {record.runsNo}
            </div>
            <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-black">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <>
            <div className="gx-fs-xs  gx-fs-lg gx-text-black gx-font-weight-semi-bold">0</div>
            <div className="gx-fs-xs   gx-fs-xs gx-text-black gx-font-weight-semi-bold">0.00</div>
          </>
        );
      },
    },
    {
      title: "YES",
      dataIndex: "oddsYes",
      width: "20%",
      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground matchdtailsYesBackground"
            : "matchdtailsYesBackground",
      }),
      key: "oddsYes",

      align: "center",
      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div
            onClick={() => {
              if (record.runsYes <= 0) return;
              handlebet({
                sessionName: record.session_name,
                odds: record.oddsYes,
                runs: record.runsYes,
                selectionId: record.session_id,
                type: "Y",
                betForMarketId: marketId,
                marketId: marketId,
                eventId: eventId,
                oddsType: "fancy",
                betFor: "fancy",
                printData: "Yes"
              });
              scrollToElement();
            }}
          >
            <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-black">
              {record.runsYes}
            </div>
            <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-black">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <>
            <div className="gx-fs-xs  gx-fs-lg gx-text-black gx-font-weight-semi-bold">0</div>
            <div className="gx-fs-xs  gx-fs-xs gx-text-black gx-font-weight-semi-bold">0.00</div>
          </>
        );
      },
    },
  ];

  //........................................No Commition fancy Data......................................................//

  const NoCommData = [];
  if (matchScoreDetails) {

    // const sortedSessions = matchScoreDetails.session?.sort((a, b) => a.session_name - b.session_name);

    // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
    //   const getInitialChar = (str) => str.trim().charAt(0);

    //   // Extract starting characters
    //   const charA = getInitialChar(a.session_name);
    //   const charB = getInitialChar(b.session_name);

    //   // Check if characters are digits
    //   const isDigitA = /^\d/.test(charA);
    //   const isDigitB = /^\d/.test(charB);

    //   // If both are digits or both are letters, sort accordingly
    //   if (isDigitA && isDigitB) {
    //     // Extract numeric part and compare
    //     const numA = parseInt(a.session_name.match(/^\d+/)?.[0] || '0', 10);
    //     const numB = parseInt(b.session_name.match(/^\d+/)?.[0] || '0', 10);
    //     return numA - numB;
    //   } 
    //   if (isDigitA && !isDigitB) {
    //     // Digits come before letters
    //     return -1;
    //   }
    //   if (!isDigitA && isDigitB) {
    //     // Letters come after digits
    //     return 1;
    //   }

    //   // If both start with letters, sort alphabetically
    //   return a.session_name.localeCompare(b.session_name);
    // });

    const sortedSessions = matchScoreDetails.session.sort((a, b) => {
      // Helper functions
      const getInitialChar = (str) => str.trim().charAt(0);
      const startsWithDigit = (str) => /^\d/.test(str);
      const includesOver = (str) => /OVER/.test(str);
      const getNumericPart = (str) => parseInt(str.match(/^\d+/)?.[0] || '0', 10);
      const containsFirst = (str) => /\b1ST\b|\bFIRST\b/.test(str.toUpperCase());

      // Extract session names
      const nameA = a.session_name;
      const nameB = b.session_name;

      // Check properties of the session names
      const isDigitA = startsWithDigit(nameA);
      const isDigitB = startsWithDigit(nameB);
      const includesOverA = includesOver(nameA);
      const includesOverB = includesOver(nameB);
      const containsFirstA = containsFirst(nameA);
      const containsFirstB = containsFirst(nameB);

      // Handle cases where either session contains "1ST" or "FIRST"
      if (containsFirstA && !containsFirstB) return 1; // "1ST"/"FIRST" comes last
      if (!containsFirstA && containsFirstB) return -1; // "1ST"/"FIRST" comes last

      // First priority: Digits with "OVER" come before digits without "OVER"
      if (isDigitA && isDigitB) {
        if (includesOverA && !includesOverB) return -1; // "OVER" comes before non-"OVER"
        if (!includesOverA && includesOverB) return 1;  // "OVER" comes after non-"OVER"

        // If both have or don't have "OVER", sort numerically
        const numA = getNumericPart(nameA);
        const numB = getNumericPart(nameB);
        return numA - numB;
      }

      // Second priority: Digits come before letters
      if (isDigitA && !isDigitB) return -1; // Digits come before letters
      if (!isDigitA && isDigitB) return 1;  // Letters come after digits

      // Third priority: Sort alphabetically for letters
      return nameA.localeCompare(nameB);
    });


    // const sortedSessions = matchScoreDetails.session.sort((a, b) => {
    //   return parseInt(a.priority, 10) - parseInt(b.priority, 10);
    // });
    sortedSessions?.forEach((ele, i) => {
      if (ele.com_perm === 'NO') {
        NoCommData.push({
          key: i,
          session_name: ele.session_name,
          oddsYes: ele.oddsYes,
          oddsNo: ele.oddsNo,
          runsNo: ele.runsNo,
          runsYes: ele.runsYes,
          running_status: ele.running_status,
          session_id: ele.session_id,
          max: ele.max,
          selectionId: ele.Selection_id,
        });
      }
    });
  }
  const NoCommfancyColumns = [
    {
      title: (
        <div className="gx-bg-flex gx-justify-content-center">No Comm Fancy</div>
      ),
      dataIndex: "session_name",
      key: "session_name",
      width: "60%",
      padding: "0px",

      render: (text, record, index) => {
        return (
          <div className=" gx-my-0">
            <div className="gx-font-weight-semi-bold">{text}</div>
            <div className="gx-font-weight-semi-bold gx-fs-sm">
              session Limit : {record.max}
            </div>
          </div>
        );
      },
    },
    {
      title: "No",
      dataIndex: "oddsNo",
      key: "oddsNo",
      width: "20%",
      onCell: (record, rowIndex) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground matchdtailsNoBackground"
            : "matchdtailsNoBackground",
      }),
      align: "center",
      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div
            onClick={() => {
              if (record.runsNo <= 0) return;
              handlebet({
                sessionName: record.session_name,
                odds: record.oddsNo,
                runs: record.runsNo,
                selectionId: record.session_id,
                type: "N",
                betForMarketId: marketId,
                marketId: marketId,
                eventId: eventId,
                oddsType: "fancy",
                betFor: "fancy",
                printData: "No"

              });
              scrollToElement();
            }}
          >
            <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-black">
              {record.runsNo}
            </div>
            <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-black">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <>
            <div className="gx-fs-xs  gx-fs-lg gx-text-black gx-font-weight-semi-bold">0</div>
            <div className="gx-fs-xs   gx-fs-xs gx-text-black gx-font-weight-semi-bold">0.00</div>
          </>
        );
      },
    },
    {
      title: "YES",
      dataIndex: "oddsYes",
      width: "20%",
      onCell: (record) => ({
        className:
          record.running_status === "SUSPENDED"
            ? "matchdtailsSuspendBackground matchdtailsYesBackground"
            : "matchdtailsYesBackground",
      }),
      key: "oddsYes",

      align: "center",
      render: (text, record) => {
        return record.running_status !== "SUSPENDED" ? (
          <div
            onClick={() => {
              if (record.runsYes <= 0) return;
              handlebet({
                sessionName: record.session_name,
                odds: record.oddsYes,
                runs: record.runsYes,
                selectionId: record.session_id,
                type: "Y",
                betForMarketId: marketId,
                marketId: marketId,
                eventId: eventId,
                oddsType: "fancy",
                betFor: "fancy",
                printData: "Yes"
              });
              scrollToElement();
            }}
          >
            <div className="gx-font-weight-semi-bold gx-fs-lg gx-text-black">
              {record.runsYes}
            </div>
            <div className="gx-font-weight-semi-bold gx-fs-xs gx-text-black">
              {(Number(text) * 100).toFixed(0)}
            </div>
          </div>
        ) : (
          <>
            <div className="gx-fs-xs  gx-fs-lg gx-text-black gx-font-weight-semi-bold">0</div>
            <div className="gx-fs-xs  gx-fs-xs gx-text-black gx-font-weight-semi-bold">0.00</div>
          </>
        );
      },
    },
  ];

  ////////////////////////////////////////////////End Of No Commition Fancy data
















  //  //////////////////////--------------------------match bets data----------------------/////////////////////////////////
  const mybets = [
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "oddsType",
      dataIndex: "oddsType",
      key: "oddsType",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },

    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Mode",
      dataIndex: "Type",
      key: "Type",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
  ];
  const generateOddsData = () => {
    const data = [];

    oddsbetdata?.forEach((element, index) => {
      data.push({
        key: index,
        Runs: element.run,
        Rate: Number.parseFloat(100 * element.odds).toFixed(2),
        Amount: Number.parseFloat(element.amount).toFixed(2),
        Type:
          element.type === "N"
            ? "NO"
            : element.type === "Y"
              ? "YES"
              : element.type === "K"
                ? "Khai"
                : element.type === "L"
                  ? "Lagai"
                  : "",

        Team: element.teamName,
        Client: `${element.userInfo && element.userInfo.clientName
          ? element.userInfo.clientName
          : ""
          } ${element.userInfo && element.userInfo.clientCode
            ? element.userInfo.clientCode
            : ""
          }`,
        Agent: `${element.userInfo && element.userInfo.creatorName
          ? element.userInfo.creatorName
          : ""
          }`,
        oddsType: `${element.oddsType}`,
        Date: `${element.createdAt
          ? moment(element.createdAt)
            .utcOffset("+05:30")
            .format("DD MMM hh:mm:ss A")
          : ""
          }`,
        Loss: `${element.loss
          ? Number.parseFloat(Math.abs(element.loss)).toFixed(2)
          : 0
          }`,
        Profit: `${element.profit
          ? Number.parseFloat(Math.abs(element.profit)).toFixed(2)
          : 0
          }`,
      });
    });
    return data;
  };

  const mybetsData = generateOddsData();

  //////////////////////////////////////--------------------------------------Incompleted fancy data -------------------////////////////

  const IncompltedBetsColumn = [
    {
      title: "Runner",
      dataIndex: "Team",
      key: "Team",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Run",
      dataIndex: "Runs",
      key: "Runs",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Mode",
      dataIndex: "Type",
      key: "Type",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
  ];

  const generateInCompletedData = () => {
    const data = [];

    incomletedFancy?.forEach((element, index) => {
      data.push({
        key: index,
        Runs: element.run,
        Rate: Number.parseFloat(100 * element.odds).toFixed(2),
        Amount: Number.parseFloat(element.amount).toFixed(2),
        Type:
          element.type === "N"
            ? "NO"
            : element.type === "Y"
              ? "YES"
              : element.type === "K"
                ? "Khaai"
                : element.type === "L"
                  ? "Lagaai"
                  : "",

        Team: element.sessionName ? element.sessionName : "-",
        Client: `${element.userInfo && element.userInfo.clientName
          ? element.userInfo.clientName
          : ""
          } ${element.userInfo && element.userInfo.clientCode
            ? element.userInfo.clientCode
            : ""
          }`,
        Agent: `${element.userInfo && element.userInfo.creatorName
          ? element.userInfo.creatorName
          : ""
          }`,
        oddsType: `${element.oddsType}`,
        Date: `${element.createdAt
          ? moment(element.createdAt)
            .utcOffset("+05:30")
            .format("DD MMM hh:mm:ss A")
          : ""
          }`,
      });
    });
    return data;
  };

  const IncompleteddataList = generateInCompletedData();
  ////////////////////////////////////////--------------------------------------completed fancy data -------------------////////////////////

  const compltedBetsColumn = [
    {
      title: "Runner",
      dataIndex: "Team",
      key: "Team",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Run",
      dataIndex: "Runs",
      key: "Runs",
    },
    {
      title: "Rate",
      dataIndex: "Rate",
      key: "Rate",
    },
    {
      title: "Mode",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: "Results",
      dataIndex: "results",
      key: "results",
    },
    {
      title: "P&L",
      dataIndex: "pos",
      key: "pos",
      render: (value) => <span className={`${value > 0 ? 'gx-text-blue' : value < 0 ? 'gx-text-red' : 'gx-text-black'}`}>{value}</span>
    },
  ];
  const generateCompletedData = () => {
    const data = [];

    compltedFancy?.forEach((element, index) => {
      data.push({
        key: index,
        Runs: element.run,
        Rate: Number.parseFloat(100 * element.odds).toFixed(2),
        Amount: Number.parseFloat(element.amount).toFixed(2),
        Type:
          element.type === "N"
            ? "NO"
            : element.type === "Y"
              ? "YES"
              : element.type === "K"
                ? "Khai"
                : element.type === "L"
                  ? "Lagai"
                  : "",

        Team: element.sessionName,
        Client: `${element.userInfo && element.userInfo.clientName
          ? element.userInfo.clientName
          : ""
          } ${element.userInfo && element.userInfo.clientCode
            ? element.userInfo.clientCode
            : ""
          }`,
        Agent: `${element.userInfo && element.userInfo.creatorName
          ? element.userInfo.creatorName
          : ""
          }`,
        oddsType: `${element.oddsType}`,
        results: `${element.decisionRun}`,
        Date: `${element.createdAt
          ? moment(element.createdAt)
            .utcOffset("+05:30")
            .format("DD MMM hh:mm:ss A")
          : ""
          }`,
        pos: `${Math.round(Math.abs(element.pos))}`,
      });
    });
    return data;
  };

  const completeddataList = generateCompletedData();
  const handleInputChange = (value) => {
    if (!isNaN(value)) {
      setInputValue(value);
    } else if (value === "") {
      setInputValue(value);
    }
  };

  const options = Object.keys(betChips).map((key) => ({
    value: String(betChips[key]),
  }));

  // if(!matchDetailsResponse || matchDetailsResponse === undefined){
  //   return
  // }



  return (
    <Auxiliary>

      {
        completedModal &&
        <CompletedBetsModal handleClose={handleCloseCompletedModal} compltedBetsColumn={compltedBetsColumn} completeddataList={completeddataList} />
      }
      {/* <AlertModal  onConfirm={handleCloseAlertModal} betStatus={betStatus} /> */}
      {betStatus && (
        <AlertModal
          onConfirm={handleCloseAlertModal}
          betStatusUpdate={betStatus}
        />
      )}


      <Row className="gx-bg-flex gx-align-items-center gx-justify-content-between gx-bg-grey">
        <span
          onClick={() => setActiveTabTv((tv) => !tv)}
          className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
        >
          TV
        </span>
        <span
          onClick={() => {
            setActiveTabFame((frame) => !frame);
          }}
          className="gx-bg-primary gx-px-3 gx-py-1 gx-font-weight-semi-bold gx-text-white"
        >
          FS
        </span>
      </Row>
      <Row
        justify={"center"}
        className="gx-bg-flex gx-align-items-center gx-justify-content-between"
      >
        {activeTabTv && (
          <Col
            xs={26}
            className="gx-bg-flex gx-w-100 gx-justify-content-center"
          >
            <div className="gx-w-100">
              <iframe
                style={{ width: "100%", height: 250 }}
                src={matchDetailsResponse?.tvUrl}
                title=" "
                className="gx-w-100"
              ></iframe>
            </div>
          </Col>
        )}
      </Row>
      <Row justify={"center"}>
        <Col xs={24} sm={24} className="gx-col-full">
          {matchDetailsResponse?.scoreIframe ? (
            <Row
              style={{ height: `${activeTabFrame ? "220px" : "110px"}` }}
              className=""
            >
              <iframe
                style={{ width: "100%", height: "100%", border: "none" }}
                src={matchDetailsResponse?.scoreIframe}
                title="Score-I-frame"
                className=""
              ></iframe>
            </Row>
          ) : null}
        </Col>

        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >


          {matchDetailsResponse?.isMatchOdds && socketDetails?.find(el => el.marketType === "Match Odds") &&

            <Table
              className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
              size="small"
              title=""
              dataSource={oddsData}
              columns={oddsColumn}
              pagination={false}
              bordered
              scroll={{ x: true }}
              rowClassName="no-hover"
              style={{ marginTop: "16px" }}
            />

          }
        </Col>
        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
          {data && data.length > 0 ? (
            <Table
              className="gx-w-100 custom-ant-table gx-mx-0 gx-my-0"
              size="small"
              title=""
              dataSource={data}
              columns={columns}
              pagination={false}
              bordered
              scroll={{ x: true }}
              rowClassName="no-hover"
              style={{ marginTop: "16px" }}
            />
          ) : null}
        </Col>
        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
          {matchDetailsResponse?.isTieOdds && matchScoreDetails?.team_data?.length <= 2 && socketDetails?.find(el => el.marketType == "Tied Match") &&
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              dataSource={tiedData}
              columns={tiedColumn}
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />
          }
        </Col>
        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24} >
          {matchDetailsResponse?.isToss && tossData && tossData.length > 0 ? (
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              dataSource={tossData}
              columns={tossColumn}
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />
          ) : null}
        </Col>
        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
          {data2 && data2.length > 0 ? (
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              title=""
              dataSource={data2}
              columns={fancyColumns}
              cellPaddingBlockSM
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />
          ) : null}
        </Col>

        <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
          {NoCommData && NoCommData.length > 0 ? (
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              title=""
              dataSource={NoCommData}
              columns={NoCommfancyColumns}
              cellPaddingBlockSM
              pagination={false}
              bordered
              style={{ marginTop: "16px" }}
            />
          ) : null}
        </Col>
      </Row>
      <Row id="betPLaceModal" justify={"center"}>
        {timeLeft > 0 && (
          <Col
            style={{ border: "2px solid #8B8000" }}
            className="gx-px-0 gx-py-0 gx-rounded-lg gx-mx-0 gx-my-0"
            xs={24}
            sm={22}
          >
            <div className="gx-my-1 gx-lg-block gx-d-none gx-d-lg-block gx-mx-1">
              <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
                <div
                  style={{ gap: "40px" }}
                // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
                //   }`}
                >
                  <span>{betModalData?.sessionName} </span>

                  <span>
                    Rate : {betModalData?.odds}
                    <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF' : '#fff' }}>

                      (
                      {betModalData?.printData ? betModalData?.printData : ""})
                    </span>

                  </span>
                </div>
                <span
                  style={{ width: "30px", height: "30px" }}
                  className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
                >
                  <span>{timeLeft}</span>
                </span>
              </div>
              <div
                style={{ gap: "10px" }}
                className="gx-bg-flex  gx-justify-content-center gx-align-items-center"
              >
                <span>Amount</span>
                <span>
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(values) => setInputValue(Number(values.target.value))}
                    type="number"
                    className="gx-font-weight-semi-bold gx-fs-lg"
                  />
                </span>
                <Button
                  disabled={processingBet}
                  onClick={() => placeNewBet()}
                  className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
                    } gx-text-white  gx-mb-0 gx-px-2`}
                >
                  Done
                  {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center"> */}
                  {/* <Button className="gx-px-2" size="small">Done</Button> */}
                  {processingBet && <div className="loaderSpinner gx-px-1"></div>}
                  {/* </div> */}


                </Button>
              </div>
              <div className="gx-text-center">
                {betChips &&
                  Object.keys(betChips).map((key, index) => {
                    if (index % 4 === 0) {
                      return (
                        <div
                          key={`row-${index}`}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginBottom: "10px",
                            gap: "30px", // Add gap between buttons
                            padding: "0 10px", // Add padding to the row for left/right spacing
                          }}
                        >
                          {Object.keys(betChips)
                            .slice(index, index + 4)
                            .map((subKey) => (
                              <Button
                                className="gx-px-5 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
                                key={subKey}
                                onClick={() => setInputValue(betChips[subKey])}
                                style={{ margin: "5px" }}
                              >
                                {betChips[subKey]}
                              </Button>
                            ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "5px",
                  }}
                  className=""
                >
                  <Button onClick={() => setInputValue(0)} type="danger">
                    ClearInput
                  </Button>
                  <Button
                    onClick={() => {
                      setTimeLeft(0);
                      setInputValue(0);
                    }}
                    type="danger"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
      {timeLeft > 0 && (
        <div className="gx-bg-grey gx-w-100 gx-mt-2 gx-d-block gx-d-lg-none">

          <div
            className={`gx-px-5 gx-py-2 gx-text-white gx-fs-lg gx-font-weight-semi-bold gx-text-capitalize 
              }`}
          >
            Type:    <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF' : '#fff' }}>
              {betModalData?.printData} </span><br />
            {betModalData?.oddsType} : {betModalData?.sessionName}{" "}
          </div>
        </div>
      )}
      <div className="gx-d-lg-none gx-border gx-my-2 gx-d-block">
        <div className="gx-bg-flex  gx-justify-content-between gx-px-1 gx-align-items-center">
          <div className="gx-text-nowrap">Amount : &nbsp;</div>
          <div>
            <AutoComplete
              style={{ width: "100%" }}
              options={options}
              disabled={timeLeft <= 0 ? true : false}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a number or select a value"
              filterOption={(inputValue, option) =>
                option.value.includes(inputValue)
              }
            >
              <Input
                type="number"
                ref={inputRef2}
                disabled={timeLeft <= 0 ? true : false}
                readOnly={timeLeft <= 0 ? true : false}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </AutoComplete>
          </div>
          <div className="gx-bg-flex  gx-justify-content-between  gx-align-items-center">
            <span className="gx-bg-dark gx-text-white gx-fs-lg- gx-font-weight-bold gx-px-2 gx-py-2 gx-bg-flex  gx-justify-content-between gx-mx-1  gx-align-items-center">
              {timeLeft}
            </span>
            <Button
              disabled={processingBet || timeLeft <= 0}
              size="smaLL"
              onClick={() => placeNewBet()}
              className={`${processingBet || timeLeft <= 0 ? "gx-bg-primary" : "gx-bg-primary"
                } gx-text-white  gx-justify-content-center  gx-mb-0 gx-px-2`}
            >
              Done
              {/* <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center">
                 <div className="gx-px-2">Done</div> */}
              {processingBet && <div className="loaderSpinner "></div>}
              {/* </div> */}
            </Button>
          </div>
        </div>
      </div>

      <div ref={scrollToRef} className="gx-mb-2"></div>

      <Row justify={"center"} className="">
        {mybetsData && mybetsData?.length > 0 && (
          <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
            <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
              MATCH BETS
            </div>
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              scroll={{ x: true }}
              dataSource={mybetsData}
              columns={mybets}
              pagination={false}
              bordered
            />
          </Col>
        )}
        {IncompleteddataList && IncompleteddataList?.length > 0 && (
          <Col className="gx-px-0 gx-py-0 gx-mx-0 gx-my-0" xs={24} sm={24}>
            <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
              FANCY BETS
            </div>
            <Table
              className="gx-w-100 gx-mx-0 gx-my-0"
              size="small"
              rowHoverable={false}
              title=""
              scroll={{ x: true }}
              dataSource={IncompleteddataList}
              columns={IncompltedBetsColumn}
              pagination={false}
              bordered
            />
          </Col>
        )}

        {/* {completeddataList && completeddataList?.length > 0 && ( */}
        {/* // <Row className="" justify={"center"}> */}
        {/* <Col className="gx-px-0 gx-py-1 gx-mx-0 gx-my-0" xs={24} sm={18}>
          <div className="gx-bg-flex gx-justify-content-center gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
            COMPLETED FANCY BETS
          </div>
          <Table
            className="gx-w-100 gx-mx-0 gx-my-0"
            size="small"
            rowHoverable={false}
            title=""
            scroll={{ x: true }}
            dataSource={completeddataList}
            columns={compltedBetsColumn}
            pagination={false}
            bordered
          />
        </Col> */}
        {/* )} */}
      </Row>
      <Row justify={"center"}>
        <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
          <Button
            className="gx-bg-grey gx-text-white gx-font-weight-semi-bold"
            onClick={() => {
              setCompltedModal(true)

            }}
          >
            Completed Bets
          </Button>
        </Col >
      </Row>
      <Row justify={"center"}>
        <Col className="gx-px-0 gx-py-2 gx-my-1 gx-justify-content-center">
          <Button
            onClick={() => setMatchModal(true)}
            className={`gx-my-0  gx-bg-grey gx-text-white gx-font-weight-semi-bold `}
          >
            All Matches
          </Button>
          {matchModal && (
            <MatchModal
              handleClose={handleCloseMatchModal}
              datalist={matchList}
              marketId={marketId}
            />
          )}
        </Col>
      </Row>
    </Auxiliary>
  );
};
export default MatchDetails;




