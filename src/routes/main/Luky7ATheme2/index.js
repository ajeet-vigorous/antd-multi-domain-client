import React from "react";
import { connect } from "react-redux";
import FlipCountdown from '@rumess/react-flip-countdown';
import io from 'socket.io-client';
import moment from "moment";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from "axios";

import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import GameCard from "../../../components/casino_components/GameCard/GameCard";
import GameCard2 from "../../../components/casino_components/GameCard2/GameCard2";
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import CardCasino from "../../../components/casino_components/CasinoCard/CasinoCard";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import { httpPost } from "../../../http/http";
import { betChipsData } from '../../../http/http';
import { Row, Col, Typography, Image, Card, Divider, Button } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles
import { LockOutlined } from '@ant-design/icons';
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";
import { getSocket, initSocket } from '../../../components/SocketConnection/SocketConnection';


const { Text } = Typography;
class Lucky7Atheme2 extends React.Component {
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
      backBetModalMobile: false,
      showLoader: false,
      resultData: {},
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
      shortName: "lucky7eu",
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
    const isMobile = window.matchMedia('(max-width: 100vw)').matches;

    if (isMobile && this.inputRef.current) {
      setTimeout(() => {
        this.inputRef.current.focus();
      }, 0);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users && nextProps.users.betPlaceSucess) {
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
  increaseCount = () => {
    const increasedCount = (parseFloat(this.state.count) + 0.01).toFixed(2);
    this.setState({ count: parseFloat(increasedCount) });
  };

  decreaseCount = () => {
    const decreasedCount = (parseFloat(this.state.count) - 0.01).toFixed(2);
    this.setState({ count: parseFloat(decreasedCount) });
  };


  handleBackOpen = (data, sectionRef) => {
    console.log(data, "4444444444444444");
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
        count: data.rate,
        teamname: data.name,
        time: 7,
      });

      this.scrollTimeout = setInterval(() => {
        this.setState(
          (prevState) => ({ time: prevState.time - 1 }),
          () => {
            if (this.state.time === 0) {
              clearInterval(this.scrollTimeout);
              this.setState({ backBetModal: false });
            }
          }
        );
      }, 1000);

      setTimeout(() => {
        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });

          if (
            window.innerWidth <= 768 &&
            this.inputRef.current &&
            sectionRef &&
            sectionRef.current
          ) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              this.inputRef.current.focus();
            }, 0);
          }
        }
      }, 0);
    } catch (error) {
      console.error("Error handling back open:", error);
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
    this.setState({ ResultModel: true, resultData: data });
  };

  componentDidMount() {
    this.getDomainSettingByDomainName();
    this.updateSocket()
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
        shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "lucky7eu",
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

      if (socketUrl) {
        await this.connectSocket(socketUrl, socketPerm, casinoDetails.shortName)
      }
      // else {
      //   await this.callCache(cacheUrl);
      // }
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

    if (socketUrl) {
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
      "eventId": eventId,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      isDeclare: false
    };

    let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq)
    let betList = getCasinoDetails?.data?.casinoBetData

    let totalProfitLoss = 0
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

  handleClose = () => {
    this.setState({ newCasinoModal: false, betOpen: false, stakeopen: false, backBetModal: false, backBetModalMobile: false, });
  };
  handleCloseResult = () => {
    this.setState({ ResultModel: false, });
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

  updateStackOnclic = (num) => {
    let { betSlipData } = this.state;
    betSlipData.stake = num;
    this.setState({
      betSlipData: betSlipData,
    });
  };

  placeBet = async () => {
    const { casinoData } = this.state;
    this.setState({ LoadingBet: true })
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let betObject = {
      "roundId": t1.mid,
      "sid": this.state.betSlipData.sid,
      "rate": (this.state.count - this.state.oddsDifference) + "",
      "amount": Number(this.state.betSlipData.stake),
      "casinoType": this.state.shortName ? this.state.shortName : "lucky7eu",
      "eventId": this.props.match.params.eventId,
      "betFor": this.state.betFor + "",
    }

    const result = await httpPost("casino/casinoBetPlace", betObject);
    console.log(result, "1112222");
    // console.log(result, "tttttttttttt");
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

        // this.props.dispatch(getUserBalance());
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



  componentWillUpdate() {
    this.updateSocket()
  }



  updateSocket() {
    let userID = JSON.parse(localStorage.getItem("user_id_tvs99"));
    let token_Id = userID?.token;
    let socket = getSocket();

    if (!socket || socket == null) {
      socket = initSocket(token_Id);
    }

    socket.on("fetchCasinoBetList", (data) => {
      if(data?.fetch){
        this.betList(this.props.match.params.eventId)
      }
    });

  }



  render() {
    const { casinoData, name, shortName, ResultModel, time, count, backBetModal, tvUrl, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, alertStatus, betChipsData, isFatch, message, error, domainSettingByDomainName, resultData, declaredBetList,
      DeclaredTotalProfitLoss,
      decalaredListModal, } = this.state;
    let LOWCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[0] ? casinoData.data.t2[0] : {};
    let HIGHCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[1] ? casinoData.data.t2[1] : {};
    let Even = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[2] ? casinoData.data.t2[2] : {};
    let Odd = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[3] ? casinoData.data.t2[3] : {};
    let Red = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[4] ? casinoData.data.t2[4] : {};
    let Black = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[5] ? casinoData.data.t2[5] : {};
    let CardA = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[6] ? casinoData.data.t2[6] : {};
    let Card2 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[7] ? casinoData.data.t2[7] : {};
    let Card3 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[8] ? casinoData.data.t2[8] : {};
    let Card4 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[9] ? casinoData.data.t2[9] : {};
    let Card5 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[10] ? casinoData.data.t2[10] : {};
    let Card6 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[11] ? casinoData.data.t2[11] : {};
    let Card7 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[12] ? casinoData.data.t2[12] : {};
    let Card8 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[13] ? casinoData.data.t2[13] : {};
    let Card9 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[14] ? casinoData.data.t2[14] : {};
    let Card10 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[15] ? casinoData.data.t2[15] : {};
    let CardJ = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[16] ? casinoData.data.t2[16] : {};
    let CardQ = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[17] ? casinoData.data.t2[17] : {};
    let CardK = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[18] ? casinoData.data.t2[18] : {};
    let t1 = casinoData && casinoData.data && casinoData.data && casinoData.data.t1 && casinoData.data.t1[0] ? casinoData.data.t1[0] : {};

    // let socket = getSocket();
    // let socket2 = initSocket();

    // console.log(socket, "ggggggggggggg");
    // console.log(socket2, "1111111");

    return (
      <>

        <div className={`gx-overflow-y-auto`}>
          {/* {
              isFatch ?
                <ErrorTost message={message} toastClose={this.toastClose} error={error} /> : null
            } */}
          {
            alertStatus?.status === true ?
              <CasinoAlertModal
                onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
              : null

          }
          {decalaredListModal && decalaredListModal === true ? (
            <DecalaredCasinoBetList totalProfitLoss={DeclaredTotalProfitLoss} declaredBetList={declaredBetList} closeDeclaredModal={this.closeDeclaredModal} />
          ) : null}
          {ResultModel &&
            ResultModel === true ? (
            <ResultModelBmx
              handleClose={this.handleCloseResult}
              name={name ? name : "Lucky7-A"}
              shortName={shortName ? shortName : "lucky7eu"}
              result={resultData}
            />
          ) : null}
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
                PageTitle={name ? name : "Lucky7-A"}
                ruleImage={"/assets/images/rulesImage/lucky7-rules.webp"}
                t1={t1}
              />
              <Card className="ant-card gx-bg-black gx-text-white p-0 gx-my-0  ant-space-align-center gx-position-relative" >
                <iframe src={tvUrl ? tvUrl : null} title=" " className="gx-w-100" style={{ height: "350px" }} />
                <div className="gx-w-100 gx-p-3 gx-position-absolute gx-top-0 gx-left-0">
                  <Row gutter={[16, 8]} className="gx-pt-2">
                    <Col span={24}>
                      <Text className="gx-text-white" strong>Card</Text>
                    </Col>
                    <Col>
                      <img
                        src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`}
                        alt="card"
                        className=" gx-rounded-sm"
                        style={{ height: '3rem' }}
                      />
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

              <div className="gx-mt-1 gx-mx-1 gx-border-2 gx-border-dark">
                <div className="gx-w-100">
                  <Row gutter={[4, 4]} className="gx-w-100 ant-space-align-center gx-pl-1">
                    <Col xs={10} md={10} className="gx-w-100">
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={LOWCard}
                        Name={LOWCard.nat ? LOWCard.nat : LOWCard.nation ? LOWCard.nation : "LOWCard"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                    <Col xs={4} md={4} className="gx-bg-flex gx-justify-content-center ant-space-align-center gx-w-full">
                      <div className="gx-d-flex gx-justify-content-center ant-space-align-center">
                        <img src="/assets/images/casino-images/7.jpg" alt="aaaaaa" style={{ height: "54px", width: "50px" }} />
                      </div>
                    </Col>
                    <Col xs={10} md={10} className="gx-w-100">
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={HIGHCard}
                        Name={HIGHCard.nat ? HIGHCard.nat : HIGHCard.nation ? HIGHCard.nation : "HIGHCard"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                  </Row>
                </div>
              </div>


              <Row gutter={[16, 16]} className="gx-mt-1 gx-mx-1 gx-border-2 gx-border-dark">
                <Col xs={24} md={12} className="">
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Even}
                        Name={Even.nat ? Even.nat ? Even.nation : Even.nation : "Even"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                    <Col span={12}>
                      <GameCard
                        handleBackOpen={this.handleBackOpen}
                        Data={Odd}
                        Name={Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : "Odd"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={12} className="">
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <GameCard2
                        handleBackOpen={this.handleBackOpen}
                        Data={Red}
                        select={"Red"}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                    <Col span={12}>
                      <GameCard2
                        handleBackOpen={this.handleBackOpen}
                        Data={Black}
                        section1Ref={this.section1Ref}
                        posArray={posArray}
                        oddsDifference={oddsDifference}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>


              <Row gutter={[16, 16]} className="gx-mt-1 gx-mx-1 gx-border-2 gx-border-dark">
                <Col span={24} className="">
                  <Text className="gx-d-flex gx-justify-content-center ant-space-align-center gx-py-2 gx-text-black gx-fs-lg gx-font-weight-bold">
                    {CardA?.rate ? (parseFloat(CardA.rate - oddsDifference)).toFixed(2).replace(/\.?0+$/, "") : 0}
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
                <div className="gx-w-100 gx-mt-1">
                  {/* <MyBetTabBmx
                      totalProfitLoss={totalProfitLoss} /> */}
                  <BetListTableBmx betList={betList} />
                </div>
                : null}
              <Row justify={"center"} className="gx-my-1">
                <Button className="gx-bg-grey gx-text-white gx-font-weight-semi-bold" onClick={() => {
                  this.setState({ decalaredListModal: true });
                  this.declaredbetListfunc();
                }}>
                  Completed Casino Bets
                </Button>
              </Row>
              <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className="gx-my-1 gx-mx-1 ">
                <RoundedTabBmx />
                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2">
                  {casinoData && casinoData.result && casinoData?.result ? casinoData?.result?.map((element, index) => (
                    <div onClick={() => this.handleResultModel(element)} style={{ backgroundColor: '#368011', width: '24px', height: '24px' }} className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold" >
                      <p className="text-[#FFFF2E] font-normal text-sm">{element && element.result && element.result === "0" ? "T" : element && element.result && element.result === "1" ? "L" : element && element.result && element.result === "2" ? "H" : "-"}</p>
                    </div>
                  )) : null}
                </div>
              </div>
            </Col>
          </Row>

          {/* <Col span={8}> */}

          {/* </Col> */}

        </div>

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

export default connect(mapStateToProps)(Lucky7Atheme2);
