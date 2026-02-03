import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { httpPost } from "../../../http/http";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Modal, Row, Select, Form, Typography, message } from "antd";
import BetListTableMatka from "../SattaMatka/BatListTableMatka";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import { NotificationManager } from "react-notifications";
import { matkaPlaceBet, userBalance } from "../../../appRedux/actions/User";



const SingleMatka = (props) => {

  const [betChipsData, setBetChipsData] = useState([]);
  const [betSlipData, setBetSlipData] = useState({});
  const [backBetModal, setBackBetModal] = useState(false);
  const [backBetModalMobile, setBackBetModalMobile] = useState(false);
  const [time, setTime] = useState(7);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [betList, setBetList] = useState([]);
  const [LoadingBet, setLoadingBet] = useState(false);
  const section1Ref = useRef();
  const scrollTimeout = useRef(null);
  const inputRef = useRef();
  const [selectedMarket, setSelectedMarket] = useState("");

  const [ismatkaList, setIsmatkaList] = useState({});

  const dispatch = useDispatch();
  let { matkaEventId } = useParams()
  const { Option } = Select

  const { loading, matkaBetSucess, matkaBetsPlace } = useSelector((state) => state.UserReducer);


  useEffect(() => {
    getMatkaListByEventID()
    betListFunction(matkaEventId);
    betChipData();
    checkWindowWidth();
  }, [matkaEventId]);

  useEffect(() => {
    if (matkaBetSucess === true) {
      betListFunction();
      dispatch(userBalance());
    }
  }, [matkaBetSucess])

  const checkWindowWidth = () => {
    const isMobile = window.matchMedia('(max-width: 100vw)').matches;
    if (isMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
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


  const handleBackOpen = async (data, sectionRef) => {
    if (!selectedMarket) {
      return message.error("Please Select Market Type")
    }
    if (ismatkaList.betStatus === false) {
      return NotificationManager.error('Your Bet is Closed Please Connect With Upline', "Error", 1000, () => {
        alert('callback');
      });
    }
    if (scrollTimeout.current) {
      clearInterval(scrollTimeout.current);
    }
    setBackBetModal(true);
    // setBackBetModalMobile(true);

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



  const placeBet = async () => {
    setLoadingBet(true);
    let betObject = {
      "matkaEventId": betSlipData?.data?.matkaEventId,
      "gameType": betSlipData?.gameType,
      "betType": selectedMarket,
      "betNumber": betSlipData?.betNumber,
      "amount": Number(betSlipData.stake)
    };

    dispatch(matkaPlaceBet(betObject))
    handleClose();
    setLoadingBet(false);
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



  const betListFunction = async () => {
    let betReq = {
      "matkaEventId": matkaEventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      gameType: 'single'
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

  const handleClose = () => {
    setBackBetModal(false);
    // setBackBetModalMobile(false);
  };

  const cardData = Array.from({ length: 10 }, (_, index) => index);

  const handalChnage = (value) => {
    setSelectedMarket(value);
    // if (value === "OPEN" || value === "CLOSE") {
    //   setShowBetPlaceModal(true);
    // }
  };

  const getMatkaListByEventID = async () => {
    let betReq = {
      "matkaEventId": matkaEventId,
    };

    let getMatkaDetails = await httpPost(`matka/getMatkaByMatkaEventId`, betReq);
    if (getMatkaDetails?.data) {
      setIsmatkaList(getMatkaDetails.data ? getMatkaDetails?.data : {});
    }

  }

  const showOpenBet = ismatkaList?.openBet;
  const showCloseBet = ismatkaList?.closeBet;

  return (
    <>

      <Typography style={{ color: "#26122D" }} className=" gx-fs-xxl gx-font-weight-heavy gx-text-center gx-text-uppercase gx-my-3">{ismatkaList?.name ? ismatkaList?.name : ''}-SINGLE</Typography>

      <Row justify={"center"}>
        <Col className="gx-bg-flex gx-justify-content-center gx-w-100" >

          <Select size="large" placeholder="Market Type" onChange={handalChnage} style={{ width: 300 }}>
            {showOpenBet && <Option value="OPEN">Open Market</Option>}
            {showCloseBet && <Option value="CLOSE">Close Market</Option>}
          </Select>
        </Col>
      </Row>

      <Row justify={"space-between"} className="gx-mt-2">

        <Col className="gx-bg-flex gx-justify-content-start " xs={12} sm={8} md={8} lg={4}>
          <div className="gx-fs-md gx-font-weight-semi-bold ">Open Time: 
            <span className="gx-text-blue gx-px-1">{ismatkaList?.openTime ? ismatkaList?.openTime : '-'}</span>
            </div>

        </Col>
        <Col className="gx-bg-flex gx-justify-content-end" xs={12} sm={8} md={4} lg={4}>
          <div className="gx-fs-md gx-font-weight-semi-bold">Close Time: 
          <span className="gx-text-red gx-px-1">
            {ismatkaList?.closeTime ? ismatkaList?.closeTime : '-'}
            
            </span>
            </div>
        </Col>
      </Row>
      {/* <Row justify={"start"} className="">

<Col className="gx-bg-flex gx-justify-content-start gx-py-1" xs={12} sm={8} md={8} lg={4}>
  <div className="gx-fs-md gx-font-weight-semi-bold">Close Time: {ismatkaList?.closeTime ? ismatkaList?.closeTime : '-'}</div>
</Col>
</Row> */}

      {/* <Row justify={"start"} className="">

<Col className="gx-bg-flex gx-justify-content-start gx-py-1" xs={12} sm={8} md={8} lg={4}>
  <div className="gx-fs-md gx-font-weight-semi-bold">Matka Bet : {ismatkaList?.betStatus ? 'Open' : 'Close'}</div>
</Col>
</Row> */}
      <Row justify={"space-between"} className="gx-mt-2">
        <Col className="" xs={8} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-semi-bold">Min: {ismatkaList?.minStake} </span>
        </Col>

        <Col className="gx-bg-flex gx-justify-content-end" xs={8} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-semi-bold">Max: {ismatkaList?.maxStake}</span>
        </Col>
      </Row>

      <Row justify={"start"}>

        {cardData.map((card) => (
          <Col key={card} xs={12} sm={8} md={4} lg={4} >
            <div className="gx-bg-grey gx-font-weight-semi-bold gx-fs-md gx-py-2 gx-mt-2" onClick={() => handleBackOpen({
              data: ismatkaList, gameType: "SINGLE", betType: "OPEN",
              betNumber: card?.toString().padStart(1, "0")
            },)}>
              <span className="gx-px-1 gx-py-2 gx-bg-flex gx-justify-content-center gx-text-white">
                {card.toString().padStart(1, "0")}
              </span>
            </div>
          </Col>


        ))}
      </Row>

      {backBetModal === true ?
        <PlaceBetMobileBmx
          betSlipData={betSlipData}
          time={time}
          count={betSlipData?.betNumber}
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
          count={betSlipData?.betNumber}
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

export default SingleMatka;