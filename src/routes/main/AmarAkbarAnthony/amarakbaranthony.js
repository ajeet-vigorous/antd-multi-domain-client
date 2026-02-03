import React from "react";
import { connect } from "react-redux";
// import { userActions } from "../../_actions";
import { BsSuitSpadeFill, BsSuitClubFill } from "react-icons/bs";
import { ImDiamonds } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import io from 'socket.io-client';
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import BetLockedRoundedBmx from "../../../components/casino_components/BetLockedRoundedBmx/BetLockedRoundedBmx";
import FlipCountdown from '@rumess/react-flip-countdown';
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import axios from "axios";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";

import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
// import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import moment from "moment";

// import ErrorTost from '../../components/ErrorTost/ErrorTost';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CardCasino from "../../../components/casino_components/CasinoCard/CasinoCard";

import { httpPost } from "../../../http/http";
import { betChipsData } from '../../../http/http';
import { Row, Col, Typography, Image, Card, Divider, Button } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles
import { LockOutlined } from '@ant-design/icons';
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";

const { Text } = Typography;


class AmarAkbarAnthony extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backBetModal: false,
      offset: 0,
      betSlipData: {},
      fieldsbet: {},
      errorsbet: {},
      count: 0,
      time: 7,
      casinoData: [],
      ResultModel: false,
      Result: false,
      backBetModalMobile: false,
      showLoader: false,
      result: {},
      casinoDetails: {},
      fetchData: "",
      socketURL: "",
      tvUrl: "",
      cacheURL: "",
      betStatus: "",
      cashinoStatus: "",
      eventId: "",
      minStake: "",
      maxStake: "",
      name: "",
      shortName: "aaa",
      betList: [],
      betresponse: [],
      newCasinoModal: false,
      BetPlaceDesktop: false,
      betFor: null,
      betOpen: false,
      myBetOpen: false,
      setting: {},
      posArray: {},
      currentRoundId: 0,
      oddsDifference: 0,
      totalProfitLoss: 0,
      betChipsData: [],
      message: "",
      isFatch: false,
      error: false,
      socketPerm: "",
      domainSettingByDomainName: null,
      alertStatus: {
        status: false,
        type: "",
        message: ''
      },
      declaredBetList: [],
      DeclaredTotalProfitLoss: '',
      decalaredListModal: false,
    };
    this.socket = null;
    this.section1Ref = React.createRef();
    this.scrollTimeout = null;
    this.inputRef = React.createRef();
  }

  checkWindowWidth() {
    this.getDomainSettingByDomainName();
    const isMobile = window.matchMedia('(max-width: 100vw)').matches;

    if (isMobile && this.inputRef.current) {
      setTimeout(() => {
        this.inputRef.current.focus();
      }, 0);
    }
  }

  getDomainSettingByDomainName = () => {
    try {
      let domainSetting = localStorage.getItem('domainSettingByDomainName');
      if (domainSetting) {
        const parsedDomainSetting = JSON.parse(domainSetting);
        this.setState({ domainSettingByDomainName: parsedDomainSetting });
      } else {
        this.setState({ domainSettingByDomainName: null });
      }
    } catch {
      console.error('Error parsing domainSettingByDomainName:');
      this.setState({ domainSettingByDomainName: null });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && nextProps.user.betPlaceSucess) {
      return {
        ...nextProps,
        backBetModal: false,
        backBetModalMobile: false,
        betSlipData: {},
      }
    } else {
      return {
        ...nextProps,

      }
    }
  }
  increaseCount = () => {
    const increasedCount = (parseFloat(this.state.count) + 0.01).toFixed(2);
    this.setState({ count: parseFloat(increasedCount) });
  };
  handleAlertModal = () => {
    this.setState({
      alertStatus: {
        status: false,
        type: "",
        message: ''
      },

    })
  }
  closeDeclaredModal = () => {
    this.setState({
      declaredBetList: [],
      DeclaredTotalProfitLoss: '',
      decalaredListModal: false,
    })
  }

  decreaseCount = () => {
    const decreasedCount = (parseFloat(this.state.count) - 0.01).toFixed(2);
    this.setState({ count: parseFloat(decreasedCount) });
  };

  inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (value < 0 || isNaN(Number(value))) {
      value = 0;
    }

    if (value[0] === '0' && value.length > 1) {
      value = value.substring(1);
    }

    let { betSlipData } = this.state;
    betSlipData.stake = value;
    this.setState({
      betSlipData: betSlipData,
      [name]: Number(value),
    });
  };

  handleBackOpen = (data, sectionRef) => {

    
    this.betForSet(data.nat ? data.nat : data.nation)

    try {
      this.setState({
        backBetModal: false,
      });

      if (this.scrollTimeout) {
        clearInterval(this.scrollTimeout);
      }

      this.setState({
        backBetModal: true,
        betSlipData: { ...data, stake: "0" },
        count: data?.odds ? data?.odds : data?.b1,
        teamname: data.name,
        time: 7,
      });

      this.scrollTimeout = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time - 1 }), () => {
          if (this.state.time === 0) {
            clearInterval(this.scrollTimeout);
            this.setState({ backBetModal: false });
          }
        });
      }, 1000);

      setTimeout(() => {
        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });

          if (window.innerWidth <= 768 && this.inputRef.current && sectionRef && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              this.inputRef.current.focus();
            }, 0);
          }
        }
      }, 0);
    } catch (error) {
      console.error('Error handling back open:', error);
    }
  };

  betForSet = (nat) => {
    let value = nat.split(' ')[0];
    if (value === "HIGH") {
      this.setState({ betFor: "lowHigh" })
    } else if (value === "LOW") {
      this.setState({ betFor: "lowHigh" })
    } else if (value === "Card") {
      this.setState({ betFor: "cards" })
    } else if (value === "Red") {
      this.setState({ betFor: "color" })
    } else if (value === "Black") {
      this.setState({ betFor: "color" })
    } else if (value === "Odd" || "Even") {
      this.setState({ betFor: "oddEven" })
    }
  }

  handleResultModel = (data) => {
    this.setState({ ResultModel: true, result: data });
  };

  updateStackOnclic = (num) => {
    let { betSlipData } = this.state;
    betSlipData.stake = num;
    this.setState({
      betSlipData: betSlipData,
    });
  };

  placeBet = async () => {
    console.log(this?.state, 'hhhhhhhhhhhhhhhhhh')
    
    const { casinoData } = this.state;
    this.setState({ LoadingBet: true })
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let betObject = {
      "roundId": t1.mid,
      "sid": this.state?.betSlipData?.data?.sid ? this.state?.betSlipData?.data?.sid : this.state?.betSlipData?.sid,
      "rate": this?.state?.count + "",
      "amount": Number(this.state.betSlipData.stake),
      "casinoType": this.state.shortName ? this.state.shortName : "aaa",
      "eventId": this.props.match.params.eventId,
      "betFor": this.state?.betSlipData?.betFor ? this.state?.betSlipData?.betFor : this.state?.betFor + "",
      "isLay": this.state.betSlipData.type === "No" ? true : false,
    }
    // console.log(this.state.betSlipData, "betObjectbetObject");

    

    const result = await httpPost("casino/casinoBetPlace", betObject);
    if (result) {
      if (result.error === false) {

        this.setState(
          {
            betresponse: result.data,
            alertStatus: { status: true, type: "success", message: result.message },
          },
        );
        this.setState({ isFatch: true, message: "Bet Successfull", error: false })
        setTimeout(() => {
          this.setState({ isFatch: false })
        }, 3000);
        this.betList(this.props.match.params.eventId)
        result?.data?.totalCoins && localStorage.setItem("client-wallet-balance", result?.data?.totalCoins)
        result?.data?.exposure && localStorage.setItem("client-wallet-exposure", result?.data?.exposure)
        // this.props.dispatch(userActions.getUserBalance());
      }
      else {
        this.setState({ isFatch: true, message: result.message, error: true, alertStatus: { status: true, type: "error", message: result.data.message }, })
        setTimeout(() => {
          this.setState({ isFatch: false })
        }, 3000);
      }
    }
    else {
      this.setState({ isFatch: true, message: "Some Thing Want Wrong, Please Try Again", error: true, alertStatus: { status: true, type: "error", message: "Some Thing Want Wrong, Please Try Again" }, })
      setTimeout(() => {
        this.setState({ isFatch: false })
      }, 3000);
    }

    this.handleClose();
    this.setState({ LoadingBet: false })
  };
  declaredbetListfunc = async (eventId) => {
    let betReq = {
      eventId: this.props.match.params.eventId,
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      isDeclare: true
    };

    let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq);
    let totalProfitLoss = 0;
    let betList = getCasinoDetails?.data?.casinoBetData;

    if (betList && betList.length > 0) {
      betList?.map((bet, key) => {
        let profitLoss = "Not Declare";
        let profitLossCount = 0;
        if (bet.isDeclare) {
          profitLossCount = bet.profitLoss ? bet.profitLoss : 0;
          profitLoss = bet.profitLoss;
        }
        totalProfitLoss += Number(profitLossCount);
        betList[key].profitLoss = profitLoss;
      });
    }
    if (getCasinoDetails) {
      this.setState({ declaredBetList: betList, DeclaredTotalProfitLoss: totalProfitLoss });
    }
  };


  toastClose = () => {
    this.setState({ isFatch: false });
  };

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    let requestData = {
      eventId: this.props.match.params.eventId,
    }
    this.getDidMountData(requestData)
    this.betChipData()
    if (this.inputRef.current) {
      this.inputRef.current.addEventListener('touchstart', this.handleTouchStart);
    }
    if (window.innerWidth <= 768 && this.inputRef.current) {
      this.inputRef.current.focus();
      this.inputRef.current.dispatchEvent(new Event('touchstart'));
    }
  }

  getDidMountData = async (requestData) => {
    this.setState({ showLoader: true })
    let getCasinoDetails = await httpPost(`casino/getDiamondCasinoByEventId`, requestData)
    if (!getCasinoDetails.error) {
      let casinoDetails = getCasinoDetails?.data
      let videoUrlType = casinoDetails?.videoUrlType;
      let selectedVideoUrl = casinoDetails?.[`videoUrl${videoUrlType}`]
      this.setState({
        casinoDetails: casinoDetails,
        fetchData: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : {},
        socketURL: casinoDetails && casinoDetails.socketURL ? casinoDetails.socketURL : {},
        // tvUrl: casinoDetails && casinoDetails.videoUrl1 ? casinoDetails.videoUrl1 : "",
        tvUrl: selectedVideoUrl && selectedVideoUrl ? selectedVideoUrl : "",

        cacheURL: casinoDetails && casinoDetails.cacheURL ? casinoDetails.cacheURL : {},
        socketPerm: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : "",
        betStatus: casinoDetails && casinoDetails.betStatus ? casinoDetails.betStatus : "",
        cashinoStatus: casinoDetails && casinoDetails.cashinoStatus ? casinoDetails.cashinoStatus : "",
        eventId: casinoDetails && casinoDetails.eventId ? casinoDetails.eventId : "",
        minStake: casinoDetails && casinoDetails.minStake ? casinoDetails.minStake : "",
        maxStake: casinoDetails && casinoDetails.maxStake ? casinoDetails.maxStake : "",
        name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
        shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "aaa",
        setting: casinoDetails && casinoDetails.setting ? casinoDetails.setting : {},
        oddsDifference: casinoDetails && casinoDetails.setting && casinoDetails.setting.oddsDifference ? casinoDetails.setting.oddsDifference : 0,
      })
      if (casinoDetails.eventId) {
        this.betList(casinoDetails.eventId)
      }

      let socketPerm = ""
      let socketUrl = ""
      let cacheUrl = ""
      if (casinoDetails.fetchData) {
        socketPerm = casinoDetails.fetchData
      }
      if (casinoDetails.socketURL) {
        socketUrl = casinoDetails.socketURL
      }
      if (casinoDetails.cacheURL) {
        cacheUrl = casinoDetails.cacheURL
      }

      if (socketPerm === "socket") {
        await this.connectSocket(socketUrl, socketPerm, casinoDetails.shortName)
      } else {
        await this.callCache(cacheUrl);
      }
    } else {

    }
    this.setState({ showLoader: false })
  }

  connectSocket = async (socketUrl, socketPerm, shortName) => {
    if (!socketUrl) {
      socketUrl = this.state.socketURL
    }
    if (!socketPerm) {
      socketPerm = this.state.socketPerm
    }
    if (!shortName) {
      shortName = this.state.shortName
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    if (socketPerm === "socket") {
      this.socket = io.connect(socketUrl, {
        transports: ["websocket"],
        reconnection: false,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99,
      });

      this.socket.emit('JoinRoom', shortName);
      this.socket.on(shortName, data => {
        this.setState({ currentRoundId: data && data.data && data.data.t1 && data.data.t1[0] && data.data.t1[0].mid ? data.data.t1[0].mid : 0 })
        this.setState({ casinoData: data })
        this.updatePos()
      });
    }
  }

  callCache = async (cacheUrl) => {
    try {
      this.interval = setInterval(async () => this.getMarketCacheUrl(cacheUrl), 1000);
    } catch (error) {
      console.error('Error calling cache:', error);
    }
  }

  getMarketCacheUrl = async (cacheUrl) => {
    try {
      const response = await axios.get(cacheUrl);
      this.setState({ casinoData: response?.data?.data })
    } catch (error) {
      console.error('Error fetching cache data:', error);
    }
  }

  updateStackOnclick = (num) => {
    let { betSlipData } = this.state;
    betSlipData.stake = num;
    this.setState({
      betSlipData: betSlipData,
    });
  };

  updateStake = (event) => {
    try {
      let { value } = event.target;
      let { betSlipData } = this.state;
      if (value.startsWith('0') && value.length > 1) {
        value = value.slice(1);
      }
      betSlipData.stake = value;
      this.setState({
        betSlipData: betSlipData,
      });
    } catch (error) {
      console.error('Error updating stake:', error);
    }
  };

  updatePos = async () => {
    const { betList, currentRoundId } = this.state;
    if (betList && betList.length > 0) {
      const filteredBets = betList.filter((element) => element.roundId == currentRoundId);
      let pushPos = {};
      filteredBets && filteredBets.length > 0 && filteredBets.forEach((bet) => {
        const posArray = bet.posArray;
        Object.entries(posArray).forEach(([key, value]) => {
          pushPos[key] = (pushPos[key] || 0) + Number(value);
        });
      });

      this.setState({ posArray: pushPos });
    }
  }

  betList = async (eventId) => {
    let betReq = {
      eventId: eventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      isDeclare: false
    };

    let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq)
    let totalProfitLoss = 0
    let betList = getCasinoDetails?.data?.casinoBetData

    if (betList && betList.length > 0) {
      betList?.map((bet, key) => {
        let profitLoss = "Not Declare"
        let profitLossCount = 0
        if (bet.isDeclare) {
          profitLossCount = bet.profitLoss ? bet.profitLoss : 0
          profitLoss = bet.profitLoss
        }
        totalProfitLoss += Number(profitLossCount)
        betList[key].profitLoss = profitLoss
      })
    }
    if (getCasinoDetails) {
      this.setState({ betList: betList, totalProfitLoss: totalProfitLoss })
    }
  }

  componentWillUnmount() {
    clearInterval(this.cacheInterval);
    clearTimeout(this.timer);
    if (this.inputRef.current) {
      this.inputRef.current.removeEventListener('touchstart', this.handleTouchStart);
    }
    this.cleanupWebSocket();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  cleanupWebSocket = () => {
    if (this.socket) {
      this.socket.close();
    }
  };

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && !this.state.isConnected) {
      this.connectSocket()
    } else if (document.visibilityState === 'hidden') {
      this.cleanupWebSocket();
    }
  };

  betChipData = () => {
    try {
      let betChipsDatas = JSON.parse(localStorage.getItem('betChipsData'));
      const myArray = betChipsDatas && Object.keys(betChipsDatas).length > 0 ? Object.values(betChipsDatas) : Object.values(betChipsData);
      this.setState({ betChipsData: myArray });
    } catch (error) {
      console.error('Error parsing JSON from localStorage: betChipsDatas', error);
      this.setState({ betChipsData: betChipsData });
    }
  };


  handleClose = () => {
    this.setState({ backBetModal: false, backBetModalMobile: false });
  };

  handleCloseResult = () => {
    this.setState({ ResultModel: false, });
  };

  render() {
    const { casinoData, name, shortName, ResultModel, time, count, backBetModal, tvUrl, alertStatus, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, betChipsData, isFatch, message, error, domainSettingByDomainName, declaredBetList,
      DeclaredTotalProfitLoss,
      decalaredListModal, } = this.state;
    let { data, result } = casinoData ? casinoData : {};
    let Amar = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Akbar = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let Anthony = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let Even = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    let Odd = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let Red = data && data.t2 && data.t2[5] ? data.t2[5] : {};
    let Black = data && data.t2 && data.t2[6] ? data.t2[6] : {};
    let CardA = data && data.t2 && data.t2[7] ? data.t2[7] : {};
    let Card2 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
    let Card3 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
    let Card4 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
    let Card5 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
    let Card6 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
    let Card7 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
    let Card8 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
    let Card9 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
    let Card10 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
    let CardJ = data && data.t2 && data.t2[17] ? data.t2[17] : {};
    let CardQ = data && data.t2 && data.t2[18] ? data.t2[18] : {};
    let CardK = data && data.t2 && data.t2[19] ? data.t2[19] : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    return (
      <>

        <div className={`gx-overflow-y-auto`}>
          {/* {
              isFatch ?
                <ErrorTost message={message} toastClose={this.toastClose} error={error} /> : null
            } */}
          {
            alertStatus?.status === true ?
              <CasinoAlertModal onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
              : null

          }
          {decalaredListModal && decalaredListModal === true ? (
            <DecalaredCasinoBetList totalProfitLoss={DeclaredTotalProfitLoss} declaredBetList={declaredBetList} closeDeclaredModal={this.closeDeclaredModal} />
          ) : null}
          {ResultModel &&
            ResultModel === true ? (
            <ResultModelBmx
              handleClose={this.handleCloseResult}
              name={name ? name : "Amar Akbar Anthony"}
              shortName={shortName ? shortName : "aaa"}
              result={this.state.result}
            />
          ) : null}
          {/* {LoadingBet === true ?
              <>
                <PlaceBetMobileBmxBet
                  betSlipData={this.state.betSlipData}
                  time={time}
                  count={count}
                />
              </> :
              <>
                {backBetModal && backBetModal === true ? (
                  <PlaceBetMobileBmx
                    betSlipData={this.state.betSlipData}
                    updateStackOnclic={this.updateStackOnclic}
                    placeBet={this.placeBet}
                    handleClose={this.handleClose}
                    section1Ref={this.section1Ref}
                    time={this.state.time}
                    inputChange={this.inputChange}
                    decreaseCount={this.decreaseCount}
                    increaseCount={this.increaseCount}
                    count={this.state.count}
                  />
                ) : null}
              </>
            } */}

          <Row justify="center">
            <Col
              xs={24} // Full width on extra small screens
              sm={24} // Full width on small screens
              md={24} // Full width on medium screens
              lg={10} // Approximately 41% width on large screens
              xl={10} // Approximately 41% width on extra large screens
              xxl={10} // Approximately 41% width on double extra large screens
            >
              <PageHeaderTheme
                PageTitle={"AAA"}
                ruleImage={"/assets/images/rulesImage/aaaRules.webp"}
                t1={t1}
              />



              <Card className="ant-card gx-bg-black gx-text-white p-0 gx-my-0  ant-space-align-center gx-position-relative gx-mx-1" >
                <iframe src={tvUrl ? tvUrl : null} title=" " className="gx-w-100" style={{ height: "350px" }} />
                <div className="gx-w-100 gx-py-4 gx-px-3 gx-position-absolute gx-top-0 gx-left-0">
                  <Row gutter={[16, 8]} className="gx-pt-2">
                    <Col>
                      <Row gutter={[8, 8]}>
                        {[t1?.C1]?.map((card, index) => (
                          <Col key={index}>
                            <img
                              src={`/cards/${card || 1}.png`}
                              alt="card"
                              className=" gx-rounded-sm"
                              style={{ height: '3rem' }}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>

                  </Row>
                </div>
                <div className=" gx-position-absolute" style={{ bottom: '16px', right: '16px' }}>
                  <FlipCountdown
                    titlePosition="hidden"
                    hideYear
                    hideMonth
                    hideDay
                    hideHour
                    hideMinute
                    endAtZero
                    size="small"
                    endAt={new Date(Date.now() + 1000 * (t1?.autotime || 0)).toUTCString()}
                  />
                </div>
              </Card>


              {/* <Row className="gx-py-1"> */}
              {/* <Col span={24} className="odds-bet"> */}


              {/* <Row gutter={[20, 20]} className="w-full text-center">

                  <Col justify={"center"} xs={24}> */}

              <Row justify={"center"} gutter={[8, 8]} className="gx-w-100 gx-text-center gx-border-dark gx-border-2 gx-mt-1 gx-mx-1">

                <Col xs={8}>
                  <div className="gx-py-2 gx-w-100 ">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>A.</span> {Amar && Amar.nat && Amar.nat ? Amar.nat : "Amar"}
                    </div>

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-w-100 gx-bg-flex ">

                      <div xs={12} style={{ backgroundColor: '#72BBEF' }} className=" gx-w-100 gx-mx-1 gx-py-2 gx-position-relative" onClick={() => this.handleBackOpen({ data: Amar, type: "Yes", odds: Amar.b1 - oddsDifference, nat: Amar.nat, betFor: "aaa" }, this.section1Ref)}>
                        <div className="">{Amar && Amar.b1 && Amar.b1 ? Amar.b1 - oddsDifference : "0.00"}</div>
                        {Amar.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                      <div xs={12} style={{ backgroundColor: '#FAA9BA' }} onClick={() => this.handleBackOpen({ data: Amar, type: "No", odds: Amar.l1, nat: Amar.nat, betFor: "aaa" }, this.section1Ref)} className="gx-position-relative gx-w-100 gx-mx-1 gx-py-2 ">
                        <div className="text-[16px] font-[400] leading-4">{Amar && Amar.l1 && Amar.l1 ? Amar.l1 : "0.00"}</div>
                        {Amar.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>


                    <div className={`${posArray[Amar.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                      {posArray[Amar.sid] ?? 0.00}
                    </div>


                  </div>
                </Col>

                <Col xs={8}>
                  <div className="gx-py-2 gx-w-100">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>B.</span> {Akbar && Akbar.nat && Akbar.nat ? Akbar.nat : "Akbar"}
                    </div>

                    <div className=" gx-fs-md gx-font-weight-semi-bold gx-w-100 gx-bg-flex gx-justify-content-center gx-align-content-center">

                      <div style={{ backgroundColor: '#72BBEF' }} className="gx-mx-1 gx-w-100  gx-py-2 gx-position-relative " onClick={() => this.handleBackOpen({ data: Akbar, type: "Yes", odds: Akbar.b1 - oddsDifference, nat: Akbar.nat, betFor: "aaa" }, this.section1Ref)}>
                        <div className="">{Akbar && Akbar.b1 && Akbar.b1 ? Akbar.b1 - oddsDifference : "0.00"}</div>
                        {Akbar.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                      <div style={{ backgroundColor: '#FAA9BA' }} onClick={() => this.handleBackOpen({ data: Akbar, type: "No", odds: Akbar.l1, nat: Akbar.nat, betFor: "aaa" }, this.section1Ref)} className="gx-w-100 gx-position-relative gx-mx-1 gx-py-2 ">
                        <div className="text-[16px] font-[400] leading-4">{Akbar && Akbar.l1 && Akbar.l1 ? Akbar.l1 : "0.00"}</div>
                        {Akbar.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>

                    <div className={`${posArray[Akbar.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Akbar.sid] ?? 0.00}</div>
                  </div>
                </Col>

                <Col xs={8}>
                  <div className="gx-py-2 gx-w-100">
                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>C.</span>{Anthony && Anthony.nat && Anthony.nat ? Anthony.nat : "Anthony"}
                    </div>

                    <div className=" gx-fs-md gx-font-weight-semi-bold gx-w-100 gx-bg-flex gx-justify-content-center gx-align-content-center">

                      <div style={{ backgroundColor: '#72BBEF' }} className="gx-mx-1 gx-w-100 gx-position-relative gx-py-2 " onClick={() => this.handleBackOpen({ data: Anthony, type: "Yes", odds: Anthony.b1 - oddsDifference, nat: Anthony.nat, betFor: "aaa" }, this.section1Ref)}>
                        <div className="">{Anthony && Anthony.b1 && Anthony.b1 ? Anthony.b1 - oddsDifference : "0.00"}</div>
                        {Anthony.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                      <div style={{ backgroundColor: '#FAA9BA' }} onClick={() => this.handleBackOpen({ data: Anthony, type: "No", odds: Anthony.l1, nat: Anthony.nat, betFor: "aaa" }, this.section1Ref)} className="gx-w-100 gx-position-relative gx-mx-1 gx-py-2 ">
                        <div className="text-[16px] font-[400] leading-4">{Anthony && Anthony.l1 && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                        {Anthony.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>

                    <div className={`${posArray[Anthony.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Anthony.sid] ?? 0.00}</div>
                  </div>
                </Col>

              </Row>

              <Row justify={"center"} gutter={[8, 8]} className="gx-w-100 gx-text-center gx-border-dark gx-border-2 gx-mt-1 gx-mx-1">

                <Col xs={6}>
                  <div className="gx-py-2 gx-w-100 ">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>{Even && Even.b1 ? Even.b1 - oddsDifference : "0.00"}</span>
                    </div>

                    <div className="gx-fs-md gx-text-white gx-font-weight-semi-bold gx-w-100 gx-bg-flex " style={{ height: "33px" }}>

                      <div xs={12} className=" gx-w-100 gx-mx-1 gx-py-2 gx-position-relative gx-bg-grey" onClick={() => this.handleBackOpen({ data: Even, type: "Yes", odds: Even.b1 - oddsDifference, nat: Even.nat, betFor: "oddEven" }, this.section1Ref)}>
                        <div className="">{Even && Even.nat && Even.nat ? Even.nat : "Even"}</div>
                        {Even.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>

                    <div className={`${posArray[Even.sid] < 0 ? "gx-text-red" : "gx-text-green-0"}`}>
                      {posArray[Even.sid] ?? 0.00}
                    </div>


                  </div>
                </Col>

                <Col xs={6}>
                  <div className="gx-py-2 gx-w-100 ">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>{Odd && Odd.b1 ? Odd.b1 - oddsDifference : "0.00"}</span>
                    </div>

                    <div className="gx-fs-md gx-text-white gx-font-weight-semi-bold gx-w-100 gx-bg-flex " style={{ height: "33px" }}>

                      <div xs={12} className=" gx-w-100 gx-mx-1 gx-py-2 gx-position-relative gx-bg-grey" onClick={() => this.handleBackOpen({ data: Odd, type: "Yes", odds: Odd.b1 - oddsDifference, nat: Odd.nat, betFor: "oddEven" }, this.section1Ref)}>
                        <div className="">{Odd && Odd.nat && Odd.nat ? Odd.nat : "Odd"}</div>
                        {Odd.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>

                    <div className={`${posArray[Odd.sid] < 0 ? "gx-text-red" : "gx-text-green-0"}`}>
                      {posArray[Odd.sid] ?? 0.00}
                    </div>


                  </div>
                </Col>

                <Col xs={6}>
                  <div className="gx-py-2 gx-w-100">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>{Red && Red.b1 ? Red.b1 - oddsDifference : "0.00"}</span>
                    </div>

                    <div className=" gx-fs-md gx-font-weight-semi-bold gx-w-100 gx-bg-flex gx-justify-content-center gx-align-content-center" style={{ height: "33px" }}>

                      <div style={{ color: '#FE0000' }} className="gx-mx-1 gx-w-100 gx-py-2 gx-position-relative gx-bg-grey " onClick={() => this.handleBackOpen({ data: Red, type: "Yes", odds: Red.b1 - oddsDifference, nat: Red.nat, betFor: "color" }, this.section1Ref)}>
                        <span className="">
                          <AiFillHeart size={16} />
                        </span>
                        <span className="">
                          <ImDiamonds size={16} />
                        </span>
                        {Red && Red.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>

                    </div>

                    <div className={`${posArray[Red.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Red.sid] ?? 0.00}</div>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="gx-py-2 gx-w-100">

                    <div className="gx-fs-md gx-font-weight-semi-bold gx-py-1" >
                      <span>{Black && Black.b1 ? Black.b1 - oddsDifference : "0.00"}</span>
                    </div>

                    <div className=" gx-fs-md gx-font-weight-semi-bold gx-w-100 gx-bg-flex gx-justify-content-center gx-align-content-center" style={{ height: "33px" }}>

                      <div className="gx-mx-1 gx-w-100  gx-py-2 gx-position-relative gx-bg-grey gx-text-black " onClick={() => this.handleBackOpen({ data: Black, type: "Yes", odds: Black.b1 - oddsDifference, nat: Black.nat, betFor: "color" }, this.section1Ref)}>
                        <span className="">
                          <BsSuitSpadeFill size={16} />
                        </span>
                        <span className="">
                          <BsSuitClubFill size={16} />
                        </span>
                        {Black && Black.gstatus === "ACTIVE" ? null : <BetLockedRoundedBmx />}
                      </div>
                    </div>

                    <div className={`${posArray[Black.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Black.sid] ?? 0.00}</div>
                  </div>
                </Col>

              </Row>

              <Row justify={"center"} gutter={[8, 8]} className="gx-w-100 gx-text-center gx-border-dark gx-border-2 gx-mt-1 gx-mx-1">
                <Col span={24} className="odds-bet">
                  <Text className="flex justify-center items-center text-black text-16 font-bold">
                  {CardA?.rate ? (parseFloat(CardA.rate - oddsDifference)).toFixed(2).replace(/\.?0+$/, "") : 12}
                  </Text>
                  <Row gutter={[8, 8]} className="w-full text-center">
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                 
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={CardA} num={"1"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card2} num={"2"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card3} num={"3"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card4} num={"4"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card5} num={"5"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card6} num={"6"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card7} num={"7"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card8} num={"8"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card9} num={"9"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={Card10} num={"10"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={CardJ} num={"11"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={CardQ} num={"12"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2}>
                      <CardCasino handleBackOpen={this.handleBackOpen} Data={CardK} num={"13"} section1Ref={this.section1Ref} posArray={posArray} />
                    </Col>

                  </Row>

                </Col>
              </Row>

              {backBetModal === true ?
                <PlaceBetMobileBmxBet
                  betSlipData={this.state.betSlipData}
                  time={time}
                  count={count}
                  betChipsData={betChipsData}
                  section1Ref={this.section1Ref}
                  inputRef={this.inputRef}
                  updateStake={this.updateStake}
                  placeBet={this.placeBet}
                  updateStackOnclick={this.updateStackOnclick}
                  handleClose={this.handleClose}
                  LoadingBet={LoadingBet}
                />
                : null}


              {backBetModal === true ?
                <PlaceBetMobileBmx
                  betSlipData={this.state.betSlipData}
                  time={time}
                  count={count}
                  betChipsData={betChipsData}
                  section1Ref={this.section1Ref}
                  inputRef={this.inputRef}
                  updateStake={this.updateStake}
                  placeBet={this.placeBet}
                  updateStackOnclick={this.updateStackOnclick}
                  handleClose={this.handleClose}
                  LoadingBet={LoadingBet}
                />
                : null}

              {betList && betList.length > 0 ?
                <div className="gx-mt-1">
                  {/* <MyBetTabBmx
                      totalProfitLoss={totalProfitLoss} /> */}
                  <BetListTableBmx betList={betList} />
                </div>
                : null}

              <Row justify={"center"} className="gx-my-2">
                {/* <Col span={8}> */}
                <Button className="gx-bg-grey gx-text-white gx-font-weight-semi-bold" onClick={() => {
                  this.setState({ decalaredListModal: true });
                  this.declaredbetListfunc();
                }}>
                  Completed Casino Bets
                </Button>
                {/* </Col> */}
              </Row>

              <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className="gx-mt-1 gx-mb-3">
                <RoundedTabBmx />
                <div className="gx-bg-flex gx-justify-content-end gx-align-content-center gx-py-2 gx-px-2">
                  {result && result.length > 0 ? result?.map((element, index) => (
                    <div onClick={() => this.handleResultModel(element)} style={{ backgroundColor: '#368011', width: '24px', height: '24px' }} className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold" >
                      <p className={`${element && element.result && element.result === "1" ? "gx-text-orange" : element && element.result && element.result === "2" ? "text-[#FFF523]" : "gx-text-yellow"} gx-fs-md gx-font-weight-semi-bold `}>{element && element.result && element.result === "1" ? "A" : element && element.result && element.result === "2" ? "B" : element && element.result && element.result === "3" ? "C" : "-"}</p>
                    </div>
                  )) : null}
                </div>
              </div>
            </Col>

          </Row >

        </div >
      </>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    users,
  };
}

export default connect(mapStateToProps)(AmarAkbarAnthony);
