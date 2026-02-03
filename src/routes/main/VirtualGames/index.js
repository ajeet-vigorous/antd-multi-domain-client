import React, { useState } from "react";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

const VirtualGames = () => {
    const [loading, setLoading] = useState(false);
    const { gameName } = useParams();

    const handleIframeLoad = () => {
        setLoading(false);
    };

    // Fetch user and token
    const user = JSON.parse(localStorage.getItem('user_id_tvs99')) || {};
    const token = user.token || '';

    const getIframeSrc = () => {
        switch (gameName) {
            case "dus-ka-dam":
                return `https://winx777.com/virtual/DusKaDum/index.php?token=${token}`;
            case "roultee":
                return `https://winx777.com/virtual/roulete/index.php?token=${token}`;
            case "andar-bahar":
                return `https://winx777.com/virtual/AndarBahar/index.php?token=${token}`;
            default:
                return null;
        }
    };

    const iframeSrc = getIframeSrc();
    const titleMap = {
        "dus-ka-dam": "Dus Ka Dum",
        "roultee": "Roulette",
        "andar-bahar": "Andar Bahar"
    };
    const iframeTitle = titleMap[gameName] || "Game";

    return (
        <Row>
            <Col xs={24}>
                {iframeSrc ? (
                    <iframe
                        src={iframeSrc}
                        title={iframeTitle}
                        loading="lazy"
                        className="gx-w-100"
                        style={{height: '95vh'}}
                        onLoad={handleIframeLoad}
                    />
                ) : (
                    <div>No game found</div>
                )}
            </Col>
        </Row>
    );
};

export default VirtualGames;


