
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";
import BackMenuButton from "../../../components/BackMenu";
import settings from "../../../domainConfig";
import PLX99Settings from "./domainwiseSetting/plx99Setting";
import PLXWINSettings from "./domainwiseSetting/plxwinSetting";
import PLR11Settings from "./domainwiseSetting/plr11Setting";
import DRX100Settings from "./domainwiseSetting/drx100Setting";



const Settings = () => {


    return (
        <>
            {settings.domainName === "PLX99" ? (
                <PLX99Settings />
            ) : settings.domainName === "PLXWIN" ? (
                <PLXWINSettings />
            ) : (settings.domainName === "DRX100" || settings.domainName === "JEM29" || settings.domainName === "RACEX9" || settings.domainName === "LION99" || settings.domainName === "BALAJI12" || settings.domainName === "STAR99") ? (
                <DRX100Settings />
            ) : settings.domainName === "PLR11" ? (
                <PLR11Settings />
            ) : settings.domainName === "VET69" ? (
                <PLR11Settings />
            ) : null}
        </>
    );
};
export default Settings;







