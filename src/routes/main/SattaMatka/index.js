import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { httpPost } from "../../../http/http";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Modal, Row, Select } from "antd";
import BetListTableMatka from "./BatListTableMatka";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import MatkaMessage from "./MatkaMessage";

const Matka = (props) => {
  const [selectedGame, setSelectedGame] = useState('');
  const [sattaList, setSattaList] = useState({});
  const [domainSettingByDomainName, setDomainSettingByDomainName] = useState(null);
  const [message, setMessage] = useState("");
  const [betChipsData, setBetChipsData] = useState([]);
  const [error, setError] = useState("");
  const [betSlipData, setBetSlipData] = useState({});
  const [backBetModal, setBackBetModal] = useState(false);
  const [backBetModalMobile, setBackBetModalMobile] = useState(false);
  const [time, setTime] = useState(7);
  const [isFetch, setIsFetch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, setErrorType] = useState(0);
  const [resMessage, setResMessage] = useState("");
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [betList, setBetList] = useState([]);
  const [LoadingBet, setLoadingBet] = useState(false);
  const [betresponse, setBetresponse] = useState(null);
  const section1Ref = useRef();
  const scrollTimeout = useRef(null);
  const inputRef = useRef();
  const [activeTab, setActiveTab] = useState(0)

  const dispatch = useDispatch();

  const params = useParams()
  useEffect(() => {
    getDomainSettingByDomainName();
    const marketEvent = {
      "matkaEventId": params.marketEvent
    };
    getMatkaList(marketEvent);
    betListFunction(marketEvent);
    betChipData();
    checkWindowWidth();
  }, [params.marketEvent]);

  const checkWindowWidth = () => {
    const isMobile = window.matchMedia('(max-width: 100vw)').matches;
    if (isMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  const getDomainSettingByDomainName = () => {
    try {
      let domainSetting = localStorage.getItem('domainSettingByDomainName');
      if (domainSetting) {
        const parsedDomainSetting = JSON.parse(domainSetting);
        setDomainSettingByDomainName(parsedDomainSetting);
      } else {
        setDomainSettingByDomainName(null);
      }
    } catch {
      console.error('Error parsing domainSettingByDomainName:');
      setDomainSettingByDomainName(null);
    }
  };

  const betChipData = async () => {
    try {
      let betChipsDatas = JSON.parse(localStorage.getItem('betChipsData'));
      const myArray = betChipsDatas && Object.keys(betChipsDatas).length > 0 ? Object.values(betChipsDatas) : Object.values(betChipsData);
      setBetChipsData(myArray);
    } catch (error) {
      console.error('Error parsing JSON from localStorage: betChipsDatas', error);
      setBetChipsData(betChipsData);
    }
  };

  const getMatkaList = async (matkaEventId) => {
    // setIsFetch(true);
    let sattaList = await httpPost('matka/getMatkaByMatkaEventId', matkaEventId);
    if (sattaList) {
      setSattaList(sattaList.data ? sattaList?.data : {});
    } else {
      setShowAlert(true);
      setErrorType(1);
      setResMessage("Something went wrong");
    }
    // setIsFetch(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleBackOpen = (data, sectionRef) => {
    if (scrollTimeout.current) {
      clearInterval(scrollTimeout.current);
    }
    setBackBetModal(true);
    setBackBetModalMobile(true);
    setBetSlipData({ ...data, stake: "0" });
    setTime(7);
    scrollTimeout.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(scrollTimeout.current);
          setBackBetModal(false);
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimeout(() => {
      if (sectionRef && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768 && inputRef.current && sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);
        }
      }
    }, 0);
  };

  const updateStake = (event) => {
    try {
      let { value } = event.target;
      if (value.startsWith('0') && value.length > 1) {
        value = value.slice(1);
      }
      setBetSlipData(prevBetSlipData => ({
        ...prevBetSlipData,
        stake: value,
      }));
    } catch (error) {
      console.error('Error updating stake:', error);
    }
  };

  const updateStackOnclick = (num) => {
    setBetSlipData(prevBetSlipData => ({
      ...prevBetSlipData,
      stake: num,
    }));
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    setBetSlipData(prevBetSlipData => ({
      ...prevBetSlipData,
      [name]: Number(value),
    }));
  };

  const betListFunction = async (eventId) => {
    let betReq = {
      "matkaEventId": eventId?.matkaEventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
    };

    let getCasinoDetails = await httpPost(`matka/matkaBetList`, betReq);
    let totalProfitLoss = 0;
    let betList = getCasinoDetails?.data;
    if (betList && betList.length > 0) {
      betList.map((bet) => {
        totalProfitLoss += Number(bet.profitLoss);
      });
    }
    if (getCasinoDetails) {
      setBetList(betList);
      setTotalProfitLoss(totalProfitLoss);
    }
  };

  const placeBet = async () => {
    setLoadingBet(true);
    let t1 = betSlipData?.data?.t1?.[0] || {};
    let betObject = {
      "matkaEventId": betSlipData?.data?.matkaEventId,
      "gameType": betSlipData?.gameType,
      "betType": betSlipData?.betType,
      "betNumber": betSlipData?.betNumber,
      "amount": Number(betSlipData.stake)
    };

    const result = await httpPost("matka/matkaPlaceBet", betObject);
    if (result) {
      if (!result.error) {
        setBetresponse(result.data);
        setIsFetch(true);
        setMessage("Bet Successful");
        setError(false);
        setTimeout(() => {
          setIsFetch(false);
        }, 3000);
        betListFunction(params.eventId);
        // dispatch(userActions.getUserBalance());
      } else {
        setIsFetch(true);
        setMessage(result.message);
        setError(true);
        setTimeout(() => {
          setIsFetch(false);
        }, 3000);
      }
    }
    handleClose();
    setLoadingBet(false);
  };

  const handleClose = () => {
    setBackBetModal(false);
    setBackBetModalMobile(false);
  };

  const handleBetStatus = () => {
    setIsFetch(true);
    setTimeout(() => {
      setIsFetch(false);
      setMessage("Your Bet is Closed Please Connect With Upline");
      setError(true);
    }, 3000);
  };

  const handleBetBlock = () => {
    setIsFetch(true);
    setMessage("Matka Bet Timeout");
    setError(true);
    setTimeout(() => {
      setIsFetch(false);
    }, 3000);
  };

  const toastClose = () => {
    setIsFetch(false);
  };

  const onClickMenu = (url) => {
    props.history.push(url);
  };
  const cards = Array.from({ length: 100 }, (_, index) => index + 1);
  const cardData = Array.from({ length: 10 }, (_, index) => index + 1);


  const handleChange = (value) => {
    setActiveTab(value)
  };



  return (
    <>
      {
        isFetch ?
          <MatkaMessage message={message} toastClose={toastClose} error={error} /> : null
      }

      <Row justify={"center"}>
        <Col className="gx-bg-flex gx-justify-content-center" span={18}>
          <Select
            defaultValue=""
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: "",
                label: "Select matka",
              },
              {
                value: 1,
                label: "Single Patti",
              },
              {
                value: 2,
                label: "Harup Andar Bahar",
              },
            ]}
          />
        </Col>
      </Row>

      {activeTab === 1 && <Row justify={"center"}>
        <Col xs={24} sm={18}>
          <Row className="gx-bg-flex gx-bg-red gx-my-2 gx-py-2 gx-mx-2 gx-justify-content-center gx-align-items-center" >
            <span className="gx-fs-lg gx-font-weight-heavy gx-text-white">Single Patti</span>
          </Row>
          <Row gutter={[20, 20]} >
            {cards.map((card, index) => (
              <Col key={index} className="gx-text-center" xs={12} sm={8} md={6}>
                {sattaList?.betStatus === true ?
                  <>
                    {sattaList?.jodiBet === true ?
                      <div
                        className="gx-fs-lg gx-rounded-sm gx-py-3 gx-text-white "
                        onClick={() => handleBackOpen({ data: sattaList, gameType: "JODI", betType: "OPEN", betNumber: card.toString().padStart(2, "0") },)}
                        style={{ backgroundColor: "#008080" }} >
                        {card.toString().padStart(2, "0")}
                      </div>
                      :
                      <div
                        onClick={() => handleBetBlock()}
                        // onClick={() => alert(" Single Patti betStatus == false, Matka Bet Timeout")}

                        className="gx-fs-lg gx-rounded-sm gx-py-3 gx-text-white "
                        style={{ backgroundColor: "#008080" }}>
                        {card.toString().padStart(2, "0")}
                      </div>
                    }
                  </> :
                  <div
                    onClick={() => handleBetStatus()}
                    // onClick={() => alert(" Single Patti betStatus == false, Your Bet is Closed Please Connect With Upline")}
                    className="gx-fs-lg gx-rounded-sm gx-py-3 gx-text-white "
                    style={{ backgroundColor: "#008080" }}>
                    {card.toString().padStart(2, "0")}
                  </div>
                }
                <div className="gx-py-1">0</div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      }
      {activeTab === 2 && <Row justify={"center"}>
        <Col xs={24} sm={14}>
          <Row
            className="gx-bg-flex gx-bg-red gx-my-2 gx-py-2 gx-mx-2 gx-justify-content-center gx-align-items-center"
            justify={"center"}
          >
            <span className="gx-fs-lg gx-font-weight-heavy gx-text-white">
            Harup Ander Bahar
            </span>
          </Row>
          <div className="gx-w-100" style={{ display: "flex", flexWrap: "wrap", gap: "10px", }} >
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr auto",
                margin: "10px",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  borderRadius: "4px",
                  padding: "3px 0",
                  backgroundColor: "red",
                  color: "#fff",
                }}
              >
               <span className="gx-px-2">Hapur Andar</span> 
              </div>
            </div>

            <div className="gx-bg-flex gx-align-items-center  gx-w-100 gx-mx-2" style={{ gap: "5px" }}>
              {cardData.map((card) => (
                <div
                  key={card}
                  className="gx-w-100 gx-py-1"
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: '4px', borderRadius: "4px", backgroundColor: "#008080", textAlign: "center"
                  }}
                >
                  {sattaList?.betStatus === true ?
                    <>
                      {sattaList?.openBet === true ?
                        <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                          onClick={() => handleBackOpen({
                            data: sattaList, gameType: "SINGLE", betType: "OPEN",
                            betNumber: card?.toString().padStart(1, "0")
                          },)}
                        >
                          {card.toString().padStart(2, "0")}
                        </div>
                        :
                        <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                          onClick={() => handleBetBlock()}
                        // onClick={() => alert(" Hapur Andar CLOSE betStatus == false, Matka Bet Timeout")}

                        >
                          {card.toString().padStart(2, "0")}
                        </div>
                      }
                    </> :
                    <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                      // onClick={() => alert(" Hapur Andar OPEN betStatus == false, Your Bet is Closed Please Connect With Upline")}
                      onClick={() => handleBetStatus()}
                    >
                      {card.toString().padStart(2, "0")}
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>

          <div
            className="gx-w-100 gx-my-2"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px", }}
          >
            <div
              style={{ display: "grid", gridTemplateRows: "1fr auto", margin: "10px", borderRadius: "4px", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "18px",
                  borderRadius: "4px",
                  padding: "3px 0",
                  backgroundColor: "red",
                  color: "#fff",
                }}
              >
               <span className="gx-px-2">Hapur Bahar</span> 
              </div>
            </div>
            <div className="gx-bg-flex gx-align-items-center gx-w-100 gx-mx-2" style={{ gap: "5px" }}>
              {cardData.map((card) => (
                <div
                  key={card}
                  className="gx-w-100 gx-py-1"
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: '4px', borderRadius: "4px", backgroundColor: "#008080", textAlign: "center"
                  }}
                >
                  {sattaList?.betStatus === true ?
                    <>
                      {sattaList?.closeBet === true ?
                        <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                          onClick={() => handleBackOpen({
                            data: sattaList, gameType: "SINGLE", betType: "CLOSE",
                            betNumber: card?.toString().padStart(1, "0")
                          },)}
                        >
                          {card.toString().padStart(2, "0")}
                        </div>
                        :
                        <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                          // onClick={() => alert(" Hapur Andar CLOSE betStatus == false, Matka Bet Timeout")}
                          onClick={() => handleBetBlock()}

                        >
                          {card.toString().padStart(2, "0")}
                        </div>
                      }
                    </> :
                    <div style={{ fontSize: "18px", borderRadius: "4px", color: "#fff", }}
                      onClick={() => handleBetStatus()}
                    // onClick={() => alert(" Hapur Andar CLOSE betStatus == false, Your Bet is Closed Please Connect With Upline")}
                    >
                      {card.toString().padStart(2, "0")}
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>

        </Col>
      </Row>}

      {backBetModal === true ?
        <PlaceBetMobileBmx
          betSlipData={betSlipData}
          time={time}
          // count={count}
          betChipsData={betChipsData}
          section1Ref={section1Ref}
          inputRef={inputRef}
          updateStake={updateStake}
          placeBet={placeBet}
          updateStackOnclick={updateStackOnclick}
          handleClose={handleClose}
          LoadingBet={LoadingBet}
        />
        : null}

      {backBetModal === true ?
        <PlaceBetMobileBmxBet
          betSlipData={betSlipData}
          time={time}
          // count={count}
          betChipsData={betChipsData}
          section1Ref={section1Ref}
          inputRef={inputRef}
          updateStake={updateStake}
          placeBet={placeBet}
          updateStackOnclick={updateStackOnclick}
          handleClose={handleClose}
          LoadingBet={LoadingBet}
        />
        : null}

      <div className="gx-my-2">
        <BetListTableMatka betList={betList} betListFunction={betListFunction}/>
      </div>
    </>
  );
};

export default Matka;