import React, { useEffect, useState } from 'react';
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaGamepad } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { IoFootballSharp } from "react-icons/io5";
import "./SportsNavigationTab.css";
import { Link } from "react-router-dom";


export default function SportsNavigationTab(props) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = () => {
            let user = JSON.parse(localStorage.getItem('spuser'));
            setUserData(user);
        };
        const timerId = setTimeout(fetchData, 1000);
        return () => clearTimeout(timerId);
    }, []);
    const { activeTab, handleTabClick, sportsData } = props;
    return (
        <div className="">
            <div className="games-main">
                <div className={`${activeTab === 1 ? "cricket-game" : "soccer-game"}`} onClick={() => handleTabClick(1)}>Cricket</div>
                <div className={`${activeTab === 2 ? "cricket-game" : "soccer-game"}`} onClick={() => handleTabClick(2)}>Soccer</div>
                <div className={`${activeTab === 3 ? "cricket-game" : "soccer-game"}`} onClick={() => handleTabClick(3)}>Tennis</div>

                <div className="casino-game">
                    {
                        userData && userData.data && userData.data.casinoStatus === true ?
                            <Link to="/app/casino" style={{ textDecoration: "none" }}>
                                <span className="animation">Casino</span>
                            </Link> :
                            <Link to="/app/dashboard" style={{ textDecoration: "none" }}>
                                <span className="animation">Casino</span>
                            </Link>
                    }
                </div>
                <div className="casino-game">
                    <Link to="/app/matka" style={{ textDecoration: "none" }}>
                        <span className="">Matka</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

