import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./betList.css";
import { setDiamondBetsList } from "../../../../appRedux/actions/User";
import moment from "moment";
import LiveBettors, { LiveBettorsBetList } from "../liveBettor/LiveBettor";

function BetLists({ bettingData }) {
    const [activeTab, setActiveTab] = useState("Tab1");
    const [aviatorData, setAviatorData] = useState({});
    const [aviatorBetList, setAviatorBetList] = useState([]);

    const dispatch = useDispatch();
    const { loading, diamondBetsList } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        setAviatorData(bettingData);
    }, [bettingData]);

    useEffect(() => {
        if (diamondBetsList?.casinoBetData?.length) {
            const formattedData = diamondBetsList.casinoBetData.map(bet => ({
                id: bet._id,
                username: bet.userInfo?.username || "",
                amount: bet.amount,
                cashout: bet.profit > 0 ? bet.profit : bet.loss,
                createdAt: bet.createdAt,
            }));
            setAviatorBetList(formattedData);
        }
    }, [diamondBetsList]);

    useEffect(() => {
        const betReq = {
            eventId: 303031,
            fromDate: moment().format("YYYY-MM-DD"),
            toDate: moment().format("YYYY-MM-DD"),
            isDeclare: false,
        };
        dispatch(setDiamondBetsList(betReq));
    }, [dispatch]);

    function formatUsername(username = "ajeet") {
        if (typeof username !== "string") return "";
        const parts = username.includes(" ") ? username.split(" ") : [username];
        return parts.map(part => {
            if (part.length <= 2) return part;
            return `${part[0]}${"*".repeat(part.length - 2)}${part[part.length - 1]}`;
        }).join(" ");
    }

    return (
        <section className="bet-section">
            <div className="tab-wrapper">
                <div className="tab-container">
                    <button className={`tab-button ${activeTab === "Tab1" ? "active" : "inactive"}`} onClick={() => setActiveTab("Tab1")}>All Bets</button>
                    <button className={`tab-button ${activeTab === "Tab2" ? "active" : "inactive"}`} onClick={() => setActiveTab("Tab2")}>Previous</button>
                    <button className={`tab-button ${activeTab === "Tab3" ? "active" : "inactive"}`} onClick={() => setActiveTab("Tab3")}>Top</button>
                </div>

                <div className="live-bet-count-box-betlist">
                    <div className="bet-tabliveBettor">
                        <LiveBettorsBetList />
                    </div>
                    <div className="bet-live-price">
                        <div className="live-bettors-betlist">
                            <div className="live-bet-price-amount">9999.95</div>
                            <div className="live-bet-win">Total Win</div>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === "Tab1" && (
                        <div className="tab-pane">
                            <div className="tab-inner">
                                <div className="footer-item header">
                                    <div className="footer-user">Player</div>
                                    <div className="bet-amount">Bet</div>
                                    <div className="bet-multiplier">X</div>
                                    <div className="text-right">Win</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="footer-list">
                {aviatorBetList?.map((bet, index) => (
                    <div key={bet.id} className="footer-item">
                        <div className="footer-user">
                            <img src={`https://i.pravatar.cc/45/${index}`} alt="img" className="avatar" />
                            <span>{formatUsername(bet.username)}</span>
                        </div>
                        <div className="bet-amount">{bet.amount?.toFixed(2)}</div>
                        <div className="bet-multiplier">3.45</div>

                        <div className="text-right">
                            <div style={{ color: bet.cashout > 0 ? "green" : "red" }}>
                                {bet.cashout?.toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BetLists;
