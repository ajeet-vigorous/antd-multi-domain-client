// import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
// import Title from "antd/lib/skeleton/Title";
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const MatkaNewDesginOddEven = () => {

//   const history = useHistory();
//   const { Option } = Select;

//   return (
//     // <div style={{ padding: '40px', background: '#fff', width: '100%', maxWidth: '80%', margin: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//     <Row justify={"center"} align={"middle"}>
//       <Col

//         xs={24}
//         sm={20}
//         lg={22}
//       >
//         <Typography className="gx-text-grey gx-fs-xxl gx-font-weight-bold gx-text-center gx-pb-3">
//           ODD EVEN
//         </Typography>

//         <Form className=" gx-font-weight-semi-bold  gx-fs-lg" >
//           {/* Select Market */}
//           <Row  style={{ border:"3px solid lightGrey"}} justify={"center"} className="gx-pt-3 gx-bg-grey gx-rounded-sm  gx-mb-3 gx-px-2 gx-fs-xxl">
//             <Col xs={24} md={8}>
//               <Form.Item className="gx-fs-xxl"  required>
//                 <label className="gx-text-white minMax" >Market Type</label>
//                 <Select size="large" placeholder="Select Market Type">
//                   <Option value="">Select Market Type</Option>
//                   <Option value="market2">Closed Market</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col xs={24} md={16}>
//               <Row>
//                 <Col xs={12}>
//                   <Form.Item
//                     className="gx-fs-xxl"
//                     // label=""
//                     required
//                   >
//                     <label className="gx-text-white minMax">Select Even/Odd</label>
//                     <Select size="large" placeholder="Select Even/ Odd">
//                       <Option value="">Select Even/ Odd</Option>
//                       <Option value="market2">ODD</Option>
//                       <Option value="market2">EVEN</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//                 <Col xs={12}>
//                   <Form.Item className="gx-fs-xxl"  required>
//                     <label className="gx-text-white minMax">Amount</label>
//                     <Input size="large" className="gx-rounded-0" />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>



//         </Form>

//       </Col>
//     </Row>
//   );
// };

// export default MatkaNewDesginOddEven;


import { Button, Col, Form, Input, message, Row, Select, Typography } from "antd";
import Title from "antd/lib/skeleton/Title";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { httpPost } from "../../../http/http";
import { NotificationManager } from "react-notifications";
import BetListTableMatka from "../SattaMatka/BatListTableMatka";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";


const OddEvenMatka = () => {
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
  const [selectedGameType, setSelectedGameType] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

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
      gameType: 'oddEven'
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
    if (!selectedMarket) {
      message.error("select market type")
    } else
      if (!selectedGameType) {
        message.error("select game type")
      } else if (!amount) {
        message.error("enter amount")
      }

    setLoadingBet(true);

    let betObject = {
      "matkaEventId": matkaEventId,
      "gameType": 'ODD_EVEN',
      "betType": selectedMarket,
      "betNumber": selectedGameType,
      "amount": amount
    };

    const result = await httpPost("matka/matkaPlaceBet", betObject);
    if (result) {
      if (!result.error) {
        setBetresponse(result.data);
        setIsFetch(true);
        // setMessage("Bet Successful");
        setError(false);
        setTimeout(() => {
          setIsFetch(false);
        }, 3000);
        betListFunction(params.eventId);
        // dispatch(userActions.getUserBalance());
      } else {
        setIsFetch(true);
        // setMessage(result.message);
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
    NotificationManager.error('Your Bet is Closed Please Connect With Upline', "Error", 1000, () => {
      alert('callback');
    });
  };



  const cardData = Array.from({ length: 10 }, (_, index) => index + 1);







  const handalChnage = (value) => {
    setSelectedMarket(value);
  };

  const handalChnageType = (value) => {
    if (!selectedMarket) {
      return message.error("Please select market Type");
    }
    setSelectedGameType(value);
  };

  const handleInputChange = (e) => {
    if (!selectedMarket) {
      return message.error("Please select market Type");
    } else if (!selectedGameType) {
      return message.error("Please select game Type");
    }
    setAmount(e.target.value);
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





  return (
    <>

      <Typography style={{ color: "#26122D" }} className=" gx-fs-xxl gx-font-weight-heavy gx-text-center gx-my-3 gx-text-uppercase">{ismatkaList?.name ? ismatkaList?.name : '-'}-ODDS-EVEN</Typography>
      <Row justify={"center"}>

        <Col className="gx-bg-flex gx-justify-content-center " span={18}>

          <Select size="large" placeholder="Market Type" onChange={handalChnage} style={{ width: 300 }}>
            {showOpenBet && <Option value="OPEN">Open Market</Option>}
            {showCloseBet && <Option value="CLOSE">Close Market</Option>}
          </Select>

        </Col>
      </Row>
      <Row justify={"center"} className=" gx-align-items-center gx-mt-4">
        <Col xs={12} sm={8} md={4} lg={4} className=" gx-bg-flex gx-flex-column">
          <label className="gx-text-white minMax gx-text-grey gx-fs-md gx-font-weight-heavy gx-py-1">Game Type</label>
          <Select onChange={handalChnageType} className="gx-w-100" size="large" placeholder="Select Even/ Odd" >
            <Option value="ODD">ODD</Option>
            <Option value="EVEN">EVEN</Option>
          </Select>
        </Col>
        <Col xs={12} sm={8} md={4} lg={4} className="">
          <label className="gx-text-white minMax gx-text-grey gx-fs-md gx-font-weight-heavy gx-py-1">Amount</label>
          <Input type="number" size="large" className="gx-rounded-0 gx-w-100" value={amount} onChange={handleInputChange} />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} sm={12} md={5}>
          <Button size="large" style={{ paddingInline: "50px" }} className="gx-bg-grey gx-w-100  gx-text-white gx-font-weight-semi-bold gx-mt-3" onClick={placeBet}>
            Submit
          </Button>
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
      <Row justify={"space-between"} className="gx-mt-2">
        <Col className="" xs={12} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-semi-bold">Min: {ismatkaList?.minStake} </span>
        </Col>

        <Col className="gx-bg-flex gx-justify-content-end" xs={12} sm={8} md={4} lg={4}>
          <span className="gx-fs-md gx-font-weight-semi-bold">Max: {ismatkaList?.maxStake}</span>
        </Col>
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

export default OddEvenMatka;
