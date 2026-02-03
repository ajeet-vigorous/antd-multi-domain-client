
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";
import CasinoCheckModal from "../../../components/CasinoCheckModal/CasinoCheckModal";
import settings from "../../../domainConfig";
import Plx99Dashboard from "./DDashboard/plx99";
import PlxwinDashboard from "./DDashboard/plxwin";
import Drx100Dashboard from "./DDashboard/drx100";
import PLR11Dashboard from "./DDashboard/plr11";


const Dashboard = () => {
  const [betSlipData, setBetSlipData] = useState({});
  const [casinoDataModal, setCasinoDataModal] = useState(false);

  const handleCasinoOpen = (data) => {
    setBetSlipData({ ...data });
    setCasinoDataModal(true)
  }

  const handleClose = () => {
    setCasinoDataModal(false)
    setBetSlipData({})
  };

  return (
    <>
    {casinoDataModal ? (
      <CasinoCheckModal
        handleClose={handleClose}
        betSlipData={betSlipData}
      />
    ) : settings.domainName === "PLX99" ? (
      <Plx99Dashboard handleCasinoOpen={handleCasinoOpen} />
    ) : settings.domainName === "PLXWIN" ? (
      <PlxwinDashboard handleCasinoOpen={handleCasinoOpen} />
    ) : (settings.domainName === "DRX100" || settings.domainName === "JEM29" || settings.domainName === "RACEX9" || settings.domainName === "LION99" || settings.domainName === "BALAJI12" || settings.domainName === "STAR99") ? (
      <Drx100Dashboard handleCasinoOpen={handleCasinoOpen} />
    ): settings.domainName === "PLR11" ? (
      <PLR11Dashboard handleCasinoOpen={handleCasinoOpen} />
    ) : null}
  </>

  );
};
export default Dashboard;