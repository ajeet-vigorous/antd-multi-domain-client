// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
// import Aviator from "./aviator/Aviator";
// import { Col, Row } from "antd";
// import BettingCard from "./BattingCard/BattingCard";
// import ChatBox from "./chatBox/ChatBox";
// import BettingCard2 from "./BattingCard/BattingCard2";
// import { useDispatch } from "react-redux";
// import { aviatorRoundIdDetails, setDiamondBetsList } from "../../../appRedux/actions/User";
// import BetLists from "./BetLists/BetLists";
// import moment from "moment";
// import { useSelector } from "react-redux";
// import { disconnectAviatorSocket, getAviatorSocket } from "./aviator/aviatorSocket";
// import { CONST } from "../../../appRedux/sagas/HTTP";
// import { httpPost } from "../../../http/http";

// const AviatorGame = () => {
//     const { gameName, gameId } = useParams()
//     const [showMessages, setShowMessages] = useState(window.innerWidth >= 1024);
//     const [showMenu, setShowMenu] = useState(false);
//     const [dataa, setdata] = useState({});
//     const [crashPoint, setCrashPoint] = useState([])
//     const [aviatorSocketData, setAviatorSocketData] = useState({});
//     const [lastCrashValue, setLastCrashValue] = useState([])
//     const dispatch = useDispatch()



//     const handleMessagesToggle = () => {
//         setShowMessages(!showMessages);
//     };
//     useEffect(() => {
//         getAaiatorFGame();
//     }, []);

//     useEffect(() => {
//         if (!aviatorSocketData) return;

//         const socket = getAviatorSocket({ aviatorSocketData });
//         socket.emit("joinGame", { gameName: "aviator" });

//         socket.on(`crashValue`, function (data) {
//             let gamesData = JSON.parse(data);
//             setdata(gamesData);
//             if (gamesData?.gameStatus === "close" && gamesData?.crashStatus === true) {
//                 const newCrashValue = parseFloat(gamesData?.crashValue);
//                 if (!isNaN(newCrashValue)) {
//                     setCrashPoint(prev => {
//                         const updated = [newCrashValue, ...prev];
//                         return updated.slice(0, 30);
//                     });
//                 }
//             }
//         });

//         fetchData();

//         return () => {
//             socket.disconnect();
//             disconnectAviatorSocket();
//         };
//     }, [aviatorSocketData]);




//     const getAaiatorFGame = async () => {
//         let getCasinoDetails = await httpPost(`casino/getDiamondCasinoByEventId`, { eventId: 303031 })
//         if (getCasinoDetails && getCasinoDetails.data) {

//             setAviatorSocketData(getCasinoDetails.data);
//         }
//     }

//     const fetchData = async () => {
//         const reqData = {
//             gameType: "avaitor"
//         };

//         if (!aviatorSocketData) {
//             return null
//         }

//         console.log(aviatorSocketData, "1111111111111111");


//         try {
//             const res = await fetch(`${aviatorSocketData?.socketURL}/v1/game/getRoundIdDetails`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(reqData)
//             });
//             const json = await res.json();

//             if (json?.data?.data?.length > 0) {
//                 const crashValues = json.data.data.map(item => item.creashValue);
//                 setCrashPoint(crashValues);
//             }
//             else {
//                 console.error("No Data Found");
//             }
//         } catch (err) {
//             console.error('Error:', err);
//         }
//     };

//     const handleMenuToggle = () => {
//         setShowMenu(!showMenu);
//     };

//     useEffect(() => {
//         if (crashPoint.length > 0) {
//             setLastCrashValue(crashPoint);
//         }
//     }, [crashPoint]);


//     return (
//         <Row justify={'center'} className="gx-mx-0 gx-px-0" style={{ background: 'black' }}>
//             <Col xxl={5} xl={7} lg={8} xs={24} className="gx-order-lg-1 gx-order-2 gx-mx-0 gx-px-1">
//                 <BetLists bettingData={dataa} />
//             </Col>
//             <Col xxl={14} xl={17} lg={16} xs={24} className="gx-order-lg-2 gx-mx-0 gx-px-1 gx-order-1">
//                 <Row>
//                     <Col xs={24}>
//                         <Aviator gameName={gameName} gameId={gameId} data={dataa} lastCrashList={lastCrashValue} />
//                         {/* <CarCrash gameName={gameName} gameId={gameId} data={dataa} lastCrashList={lastCrashValue} /> */}
//                     </Col>

//                     <Col md={12} xs={24}>
//                         <BettingCard bettingData={dataa} aviatorSocketData={aviatorSocketData} />
//                     </Col>
//                     <Col md={12} xs={24}>
//                         <BettingCard2 bettingData={dataa} aviatorSocketData={aviatorSocketData} />
//                     </Col>
//                 </Row>
//             </Col>
//             <Col xxl={5} xs={24} className="gx-order-sm-3 gx-mx-0 gx-px-1 ">
//                 <ChatBox />
//             </Col>
//         </Row>

//     );
// };

// export default AviatorGame;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Aviator from "./aviator/Aviator";
import { Col, Row } from "antd";
import BettingCard from "./BattingCard/BattingCard";
import BettingCard2 from "./BattingCard/BattingCard2";
import ChatBox from "./chatBox/ChatBox";
import BetLists from "./BetLists/BetLists";
import { getAviatorSocket, disconnectAviatorSocket } from "./aviator/aviatorSocket";
import { httpPost } from "../../../http/http";
import { casinoRoundResult } from "../../../appRedux/actions/User";
import { useDispatch } from "react-redux";
import LoadingScreen from "./LoadingScreen";

const AviatorGame = () => {
    const { gameName, gameId } = useParams();
    const [dataa, setData] = useState({});
    const [crashPoint, setCrashPoint] = useState([]);
    const [aviatorSocketData, setAviatorSocketData] = useState(null);
    const [lastCrashValue, setLastCrashValue] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSocketConfig = async () => {
            try {
                const res = await httpPost("casino/getDiamondCasinoByEventId", { eventId: 303031 });
                if (res?.data) {
                    setAviatorSocketData(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch socket config:", err);
            }
        };

        fetchSocketConfig();
    }, []);

    useEffect(() => {
        if (!aviatorSocketData || !aviatorSocketData.socketURL) return;
        const socket = getAviatorSocket({ aviatorSocketData });
        socket.emit("joinGame", { gameName: "aviator" });
        socket.on("crashValue", (data) => {
            try {
                const gamesData = JSON.parse(data);
                setData(gamesData);

                if (gamesData?.gameStatus === "close" && gamesData?.crashStatus === true) {
                    const newCrashValue = parseFloat(gamesData?.crashValue);
                    if (!isNaN(newCrashValue)) {
                        setCrashPoint((prev) => [newCrashValue, ...prev].slice(0, 30));
                    }
                }
            } catch (err) {
                console.error("Invalid JSON in crashValue:", err);
            }
        });

        fetchCrashHistory();

        return () => {
            socket.disconnect();
            disconnectAviatorSocket();
        };
    }, [aviatorSocketData]);

    const fetchCrashHistory = async () => {
        if (!aviatorSocketData?.socketURL) {
            console.warn("Missing socketURL for crash history fetch");
            return;
        }

        try {
            const res = await fetch(`${aviatorSocketData.socketURL}/v1/game/lastRounds`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameType: "avaitor" })
            });

            const json = await res.json();
            const crashValues = json?.data?.map((item) => item.creashValue);
           
            if (crashValues?.length > 0) {
                setCrashPoint(crashValues);
            } else {
                console.warn("No crash data found");
            }
        } catch (err) {
            console.error("Error fetching crash history:", err);
        }
    };

    useEffect(() => {
        if (crashPoint.length > 0) {
            setLastCrashValue(crashPoint);
        }
    }, [crashPoint]);

    // Add a condition to check if the data has been loaded
    if (!dataa || Object.keys(dataa).length === 0 || !aviatorSocketData) {
        return <LoadingScreen />; // Show loading screen if data isn't available
    }

    return (
        <Row justify={'center'} className="gx-mx-0 gx-px-0" style={{ background: 'black' }}>
            <Col xxl={5} xl={7} lg={8} xs={24} className="gx-order-lg-1 gx-order-2 gx-mx-0 gx-px-1">
                <BetLists bettingData={dataa} />
            </Col>
            <Col xxl={14} xl={17} lg={16} xs={24} className="gx-order-lg-2 gx-mx-0 gx-px-1 gx-order-1">
                <Row>
                    <Col xs={24}>
                        <Aviator gameName={gameName} gameId={gameId} data={dataa} lastCrashList={lastCrashValue} />
                    </Col>

                    <Col md={12} xs={24}>
                        <BettingCard bettingData={dataa} aviatorSocketData={aviatorSocketData} />
                    </Col>
                    <Col md={12} xs={24}>
                        <BettingCard2 bettingData={dataa} aviatorSocketData={aviatorSocketData} />
                    </Col>
                </Row>
            </Col>
            <Col xxl={5} xs={24} className="gx-order-sm-3 gx-mx-0 gx-px-1 ">
                <ChatBox />
            </Col>
        </Row>
    );
};

export default AviatorGame;
