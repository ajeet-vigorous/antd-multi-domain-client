import { Button, Col, Form, Input, message, Row, Select, Typography } from "antd";
import Title from "antd/lib/skeleton/Title";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { httpPost } from "../../../http/http";
import { NotificationManager } from "react-notifications";
import BetListTableMatka from "../SattaMatka/BatListTableMatka";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import { matkaPlaceBet, userBalance } from "../../../appRedux/actions/User";


const DoublePattiMatka = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [sattaList, setSattaList] = useState({});
  const [domainSettingByDomainName, setDomainSettingByDomainName] = useState(null);
  // const [message, setMessage] = useState("");
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
  const [showBetPlaceModal, setShowBetPlaceModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState("");

  const dispatch = useDispatch();
  const { loading, matkaBetSucess, matkaBetsPlace } = useSelector((state) => state.UserReducer);

  const params = useParams()
  useEffect(() => {
    const marketEvent = {
      "matkaEventId": params.marketEvent
    };

    getMatkaListByEventID()
    betListFunction(marketEvent);
    betChipData();
    checkWindowWidth();
  }, [params.marketEvent]);



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






  const handleBackOpen = (data, sectionRef) => {
    if (!selectedMarket) {
      return message.error("please select market type")
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



  const betListFunction = async (eventId) => {
    let betReq = {
      "matkaEventId": eventId?.matkaEventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      gameType: 'doublePatti'
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
    let betObject = {
      "matkaEventId": betSlipData?.data?.matkaEventId,
      "gameType": betSlipData?.gameType,
      "betType": selectedMarket,
      "betNumber": betSlipData?.betNumber,
      "amount": Number(betSlipData.stake)
    };

    dispatch(matkaPlaceBet(betObject))

    // const result = await httpPost("matka/matkaPlaceBet", betObject);
    // if (result) {
    //   if (!result.error) {
    //     setBetresponse(result.data);
    //     setIsFetch(true);
    //     // setMessage("Bet Successful");
    //     setError(false);
    //     setTimeout(() => {
    //       setIsFetch(false);
    //     }, 3000);
    //     betListFunction(params.eventId);
    //     // dispatch(userActions.getUserBalance());
    //   } else {
    //     setIsFetch(true);
    //     alert('3')
    //     // setMessage(result.message);
    //     setError(true);
    //     setTimeout(() => {
    //       setIsFetch(false);
    //     }, 3000);
    //   }
    // }
    handleClose();
    setLoadingBet(false);
  };

  const handleClose = () => {
    setBackBetModal(false);
    setBackBetModalMobile(false);
  };

  const handleBetStatus = () => {
    NotificationManager.error('Your Bet is Closed Please Connect With Upline', "Error", 1000, () => {
      alert('callback');
    });
  };



  const cardData = Array.from({ length: 10 }, (_, index) => index + 1);







  const handalChnage = (value) => {
    setSelectedMarket(value);
    console.log(value, "Selected Market");

    // If a market is selected, open the modal
    if (value === "OPEN" || value === "CLOSE") {
      setShowBetPlaceModal(true);
    }
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

  let { matkaEventId } = useParams()
  const { Option } = Select
  const [ismatkaList, setIsmatkaList] = useState({});



  const showOpenBet = ismatkaList?.openBet;
  const showCloseBet = ismatkaList?.closeBet;


  const history = useHistory()
  const imageData = [
    [550, 668, 244, 299, 226, 488, 677, 118, 334],
    [100, 119, 155, 227, 335, 344, 399, 588, 669],
    [200, 110, 228, 255, 336, 499, 660, 688, 778],
    [300, 166, 229, 337, 355, 445, 599, 779, 788],
    [400, 112, 220, 266, 338, 446, 455, 699, 770],
    [500, 113, 122, 177, 339, 366, 447, 799, 889],
    [600, 114, 277, 330, 448, 466, 556, 880, 899],
    [700, 115, 133, 188, 223, 377, 449, 557, 566],
    [800, 116, 224, 233, 288, 440, 477, 558, 990],
    [900, 117, 144, 199, 225, 388, 559, 577, 667],
    
  ];




  return (
    <>

      <Typography style={{ color: "#26122D" }} className=" gx-fs-xxl gx-font-weight-heavy gx-text-center gx-my-3 gx-text-uppercase">{ismatkaList?.name ? ismatkaList?.name : '-'}-DOUBLE-PATTI</Typography>
      <Row justify={"center"}>

        <Col className="gx-bg-flex gx-justify-content-center gx-mt-2" span={18}>

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
      {/* 
      <Row justify={"start"} className="">

        <Col className="gx-bg-flex gx-justify-content-start gx-py-1" xs={12} sm={8} md={8} lg={4}>
          <div className="gx-fs-md gx-font-weight-semi-bold">Double Patti Matka : {ismatkaList?.betStatus ? 'Open' : 'Close'}</div>
        </Col>
      </Row> */}




      <Row justify={"space-between"} className="gx-mt-2">
        <Col className="" xs={12} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-heavy">Min: {ismatkaList?.minStake} </span>
        </Col>

        <Col className="gx-bg-flex gx-justify-content-end" xs={12} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-heavy">Max: {ismatkaList?.maxStake}</span>
        </Col>
      </Row>

      <Row justify={"start"}>

        {imageData.map((element, index) => (
          <>
            <div style={{ color: "#26122D" }} className="gx-px-2 gx-w-100 gx-my-2 gx-mx-2  gx-py-1 gx-bg-light-grey-7 gx-fs-xl gx-font-weight-heavy gx-bg-flex gx-justify-content-center">{index} </div>
            {element.map((card, index) => (
              <Col key={card} xs={12} sm={8} md={4} lg={4} >
                {/* {ismatkaList?.betStatus === true && showBetPlaceModal === true ? */}
                <div className="gx-bg-grey gx-font-weight-semi-bold gx-fs-md gx-py-2 gx-mt-2" onClick={() => handleBackOpen({
                  data: ismatkaList, gameType: "DOUBLE_PATTI", betType: "OPEN",
                  betNumber: card?.toString().padStart(1, "0")
                },)}>
                  <span className="gx-px-1 gx-py-2 gx-bg-flex gx-justify-content-center gx-text-white">
                    {card.toString().padStart(2, "0")}
                  </span>
                </div>
                {/* :
            <div className="gx-bg-grey gx-font-weight-semi-bold gx-fs-md gx-py-2 gx-mt-2"
              onClick={() => handleBetStatus()}
           >
            <span className="gx-px-1 gx-py-2 gx-bg-flex gx-justify-content-center gx-text-white">
                {card.toString().padStart(2, "0")}
              </span>
            </div>} */}

              </Col>
            ))}
          </>

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

  )
};


export default DoublePattiMatka;

