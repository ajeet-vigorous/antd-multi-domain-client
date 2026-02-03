import React from "react";
import { connect } from "react-redux";
import FlipCountdown from "@rumess/react-flip-countdown";
// import BetLocked from "../../../components/casino_components/BetLocked/BetLocked";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";
// import PlaceBetMobileBmx from "../../casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
// import Loader from "../../components/Loader/Loader";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import { betChipsData } from "../../../http/http";
// import PlaceBetMobileBmxBet from "../../casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import { httpPost } from "../../../http/http";

// import ErrorTost from '../../components/ErrorTost/ErrorTost';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button, Card, Col, Row, Typography } from "antd";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import { FaLock } from "react-icons/fa";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import { NotificationManager } from "react-notifications";

// import { userActions } from "../../_actions";

class cards32ATheme2 extends React.Component {
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
      shortName: "card32-a",
      betList: [],
      betresponse: [],
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
      declaredBetList: [],
      DeclaredTotalProfitLoss: '',
      decalaredListModal: false,

      alertStatus: {
        status: false,
        type: "",
        message: "",
      },
    };
    this.socket = null;
    this.section1Ref = React.createRef();
    this.scrollTimeout = null;
    this.inputRef = React.createRef();
  }
  closeDeclaredModal = () => {
    this.setState({
      declaredBetList: [],
      DeclaredTotalProfitLoss: '',
      decalaredListModal: false,
    })
  }
  checkWindowWidth() {
    const isMobile = window.matchMedia("(max-width: 100vw)").matches;

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
      };
    } else {
      return {
        ...nextProps,
      };
    }
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
        count: data.odds,
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

  componentDidMount() {
    this.getDomainSettingByDomainName();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    let requestData = {
      eventId: this.props.match.params.eventId,
    };
    this.getDidMountData(requestData);
    this.betChipData();

    if (this.inputRef.current) {
      this.inputRef.current.addEventListener(
        "touchstart",
        this.handleTouchStart
      );
    }
    if (window.innerWidth <= 768 && this.inputRef.current) {
      this.inputRef.current.focus();
      this.inputRef.current.dispatchEvent(new Event("touchstart"));
    }
  }

  getDomainSettingByDomainName = () => {
    try {
      let domainSetting = localStorage.getItem("domainSettingByDomainName");
      if (domainSetting) {
        const parsedDomainSetting = JSON.parse(domainSetting);
        this.setState({ domainSettingByDomainName: parsedDomainSetting });
      } else {
        this.setState({ domainSettingByDomainName: null });
      }
    } catch {
      console.error("Error parsing domainSettingByDomainName:");
      this.setState({ domainSettingByDomainName: null });
    }
  };

  getDidMountData = async (requestData) => {
    this.setState({ showLoader: true });
    let getCasinoDetails = await httpPost(
      `casino/getDiamondCasinoByEventId`,
      requestData
    );
    if (!getCasinoDetails.error) {
      let casinoDetails = getCasinoDetails.data;
      this.setState({
        casinoDetails: casinoDetails,
        fetchData:
          casinoDetails && casinoDetails.fetchData
            ? casinoDetails.fetchData
            : {},
        socketURL:
          casinoDetails && casinoDetails.socketURL
            ? casinoDetails.socketURL
            : {},
        tvUrl:
          casinoDetails && casinoDetails.videoUrl1
            ? casinoDetails.videoUrl1
            : "",
        cacheURL:
          casinoDetails && casinoDetails.cacheURL ? casinoDetails.cacheURL : {},
        socketPerm:
          casinoDetails && casinoDetails.fetchData
            ? casinoDetails.fetchData
            : "",
        betStatus:
          casinoDetails && casinoDetails.betStatus
            ? casinoDetails.betStatus
            : "",
        cashinoStatus:
          casinoDetails && casinoDetails.cashinoStatus
            ? casinoDetails.cashinoStatus
            : "",
        eventId:
          casinoDetails && casinoDetails.eventId ? casinoDetails.eventId : "",
        minStake:
          casinoDetails && casinoDetails.minStake ? casinoDetails.minStake : "",
        maxStake:
          casinoDetails && casinoDetails.maxStake ? casinoDetails.maxStake : "",
        name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
        shortName:
          casinoDetails && casinoDetails.shortName
            ? casinoDetails.shortName
            : "card32-a",
        setting:
          casinoDetails && casinoDetails.setting ? casinoDetails.setting : {},
        oddsDifference:
          casinoDetails &&
            casinoDetails.setting &&
            casinoDetails.setting.oddsDifference
            ? casinoDetails.setting.oddsDifference
            : 0,
      });
      if (casinoDetails.eventId) {
        this.betList(casinoDetails.eventId);
      }

      let socketPerm = "";
      let socketUrl = "";
      let cacheUrl = "";
      if (casinoDetails.fetchData) {
        socketPerm = casinoDetails.fetchData;
      }
      if (casinoDetails.socketURL) {
        socketUrl = casinoDetails.socketURL;
      }
      if (casinoDetails.cacheURL) {
        cacheUrl = casinoDetails.cacheURL;
      }

      if (socketUrl) {
        await this.connectSocket(
          socketUrl,
          socketPerm,
          casinoDetails.shortName
        );
      }
      // else {
      //   await this.callCache(cacheUrl);
      // }
    } else {
    }
    this.setState({ showLoader: false });
  };

  connectSocket = async (socketUrl, socketPerm, shortName) => {
    if (!socketUrl) {
      socketUrl = this.state.socketURL;
    }
    if (!socketPerm) {
      socketPerm = this.state.socketPerm;
    }
    if (!shortName) {
      shortName = this.state.shortName;
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

      this.socket.emit("JoinRoom", shortName);
      this.socket.on(shortName, (data) => {
        this.setState({
          currentRoundId:
            data &&
              data.data &&
              data.data.t1 &&
              data.data.t1[0] &&
              data.data.t1[0].mid
              ? data.data.t1[0].mid
              : 0,
        });
        this.setState({ casinoData: data });
        this.updatePos();
      });
    }
  };

  callCache = async (cacheUrl) => {
    try {
      this.interval = setInterval(
        async () => this.getMarketCacheUrl(cacheUrl),
        1000
      );
    } catch (error) {
      console.error("Error calling cache:", error);
    }
  };

  getMarketCacheUrl = async (cacheUrl) => {
    try {
      const response = await axios.get(cacheUrl);
      this.setState({ casinoData: response?.data?.data });
    } catch (error) {
      console.error("Error fetching cache data:", error);
    }
  };

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
      if (value.startsWith("0") && value.length > 1) {
        value = value.slice(1);
      }
      betSlipData.stake = value;
      this.setState({
        betSlipData: betSlipData,
      });
    } catch (error) {
      console.error("Error updating stake:", error);
    }
  };

  updatePos = async () => {
    const { betList, currentRoundId } = this.state;
    if (betList && betList.length > 0) {
      const filteredBets = betList.filter(
        (element) => element.roundId == currentRoundId
      );
      let pushPos = {};
      filteredBets.forEach((bet) => {
        const posArray = bet.posArray;
        Object.entries(posArray).forEach(([key, value]) => {
          pushPos[key] = (pushPos[key] || 0) + Number(value);
        });
      });

      this.setState({ posArray: pushPos });
    }
  };

  betList = async (eventId) => {
    let betReq = {
      eventId: eventId,
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      isDeclare: false
    };

    let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq);
    let totalProfitLoss = 0;
    let betList = getCasinoDetails?.data?.casinoBetData;

    if (betList && betList.length > 0) {
      betList.map((bet, key) => {
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
      this.setState({ betList: betList, totalProfitLoss: totalProfitLoss });
    }
  };

  componentWillUnmount() {
    clearInterval(this.cacheInterval);
    clearTimeout(this.timer);
    if (this.inputRef.current) {
      this.inputRef.current.removeEventListener(
        "touchstart",
        this.handleTouchStart
      );
    }
    this.cleanupWebSocket();
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }

  cleanupWebSocket = () => {
    if (this.socket) {
      this.socket.close();
    }
  };

  handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && !this.state.isConnected) {
      this.connectSocket();
    } else if (document.visibilityState === "hidden") {
      this.cleanupWebSocket();
    }
  };

  handleResultModel = (data) => {
    this.setState({ ResultModel: true, result: data });
  };

  betChipData = () => {
    try {
      let betChipsDatas = JSON.parse(localStorage.getItem("betChipsData"));
      const myArray =
        betChipsDatas && Object.keys(betChipsDatas).length > 0
          ? Object.values(betChipsDatas)
          : Object.values(betChipsData);
      this.setState({ betChipsData: myArray });
    } catch (error) {
      console.error(
        "Error parsing JSON from localStorage: betChipsDatas",
        error
      );
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
    this.setState({ LoadingBet: true });
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let betObject = {
      roundId: t1.mid,
      sid: this.state.betSlipData.data.sid,
      rate: this.state.count + "",
      amount: Number(this.state.betSlipData.stake),
      casinoType: this.state.shortName ? this.state.shortName : "card32-a",
      eventId: this.props.match.params.eventId,
      betFor: this.state.betSlipData.nat + "",
      isLay: this.state.betSlipData.type === "No" ? true : false,
    };

    const result = await httpPost("casino/casinoBetPlace", betObject);
    if (result) {
      if (result.error === false) {
        this.setState(
          {
            betresponse: result.data,
            alertStatus: {
              status: true,
              type: "success",
              message: result.message,
            },
          },
        );
        // NotificationManager.success(result?.data?.message, "success", 1000, () => {
        //   alert('callback');
        // });
        this.setState({ isFatch: true, message: "Bet Successful", error: false })
        setTimeout(() => {
          this.setState({ isFatch: false })
        }, 3000);
        this.betList(this.props.match.params.eventId)
        result?.data?.totalCoins && localStorage.setItem("client-wallet-balance", result?.data?.totalCoins)
        result?.data?.exposure && localStorage.setItem("client-wallet-exposure", result?.data?.exposure)
        // this.props.dispatch(userActions.getUserBalance());
      }
      else {
        // NotificationManager.error(result?.data?.message, "error", 1000, () => {
        //   alert('callback');
        // });
        this.setState({
          isFatch: true,
          message: result.message,
          error: true,
          alertStatus: {
            status: true,
            type: "error",
            message: result.data.message,
          },
        })
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
    this.setState({ LoadingBet: false });
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

  handleAlertModal = () => {
    this.setState({
      alertStatus: {
        status: false,
        type: "",
        message: "",
      },
    });
  };

  toastClose = () => {
    this.setState({ isFatch: false });
  };

  inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (value < 0 || isNaN(Number(value))) {
      value = 0;
    }

    if (value[0] === "0" && value.length > 1) {
      value = value.substring(1);
    }

    let { betSlipData } = this.state;
    betSlipData.stake = value;
    this.setState({
      betSlipData: betSlipData,
      [name]: Number(value),
    });
  };

  handleClose = () => {
    this.setState({ backBetModal: false, backBetModalMobile: false });
  };

  handleCloseResult = () => {
    this.setState({ ResultModel: false });
  };

  render() {
    const {
      casinoData,
      name,
      shortName,
      ResultModel,
      time,
      count,
      backBetModal,
      tvUrl,
      betList,
      showLoader,
      LoadingBet,
      posArray,
      oddsDifference,
      totalProfitLoss,
      betChipsData,
      isFatch,
      message,
      error,
      domainSettingByDomainName,
      decalaredListModal,
      declaredBetList,
      DeclaredTotalProfitLoss,
      alertStatus,

    } = this.state;
    let { data, result } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let Player8 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Player9 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let Player10 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let Player11 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    const { Text } = Typography;
    const maxValue = Math.max(t1.C1, t1.C2, t1.C3, t1.C4);
    const getColorClass = (value) =>
      value === maxValue ? "gx-text-green-0" : "gx-text-white";

    let resultCard;
    if (t1 && t1.desc && typeof t1.desc === "string") {
      resultCard = t1.desc.split(",");
    } else {
      resultCard = [];
    }

    return (
      <>
        <div
          className={`overflow-auto h-screen scroll-smooth  ${domainSettingByDomainName &&
            domainSettingByDomainName.clientNotification
            ? "md:pt-[105px] pt-[100px]"
            : "md:pt-[72px] pt-[70px]"
            }`}
        >
          {/* {
              isFatch ?
                <ErrorTost message={message} toastClose={this.toastClose} error={error} /> : null
            } */}
          {alertStatus?.status === true ?
            <CasinoAlertModal onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
            : null}


          {ResultModel && ResultModel === true ? (
            <ResultModelBmx
              handleClose={this.handleCloseResult}
              name={name ? name : "Card 32-A"}
              shortName={shortName ? shortName : "card32-a"}
              result={this.state.result}
            />
          ) : null}

          {decalaredListModal && decalaredListModal === true ? (
            <DecalaredCasinoBetList totalProfitLoss={DeclaredTotalProfitLoss} declaredBetList={declaredBetList} closeDeclaredModal={this.closeDeclaredModal} />
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
                    time={time}
                    inputChange={this.inputChange}
                    decreaseCount={this.decreaseCount}
                    increaseCount={this.increaseCount}
                    count={count}
                  />
                ) : null}
              </>
            } */}

          <Row justify="center">
            <Col
              xs={24} // Full width on extra small screens
              sm={24} // Full width on small screens
              md={24} // Full width on medium screens
              lg={14} // Approximately 41% width on large screens
              xl={12} // Approximately 41% width on extra large screens
              xxl={10} // Approximately 41% width on double extra large screens
            >
              <PageHeaderTheme
                PageTitle={name ? name : "Card 32-A"}
                ruleImage={"/rulesImage/tp-rules.webp"}
                t1={t1}
              />
              <Card className="ant-card gx-bg-dark gx-text-white p-0 gx-my-0  ant-space-align-center gx-position-relative">
                <iframe
                  src={tvUrl ? tvUrl : null}
                  title=" "
                  className="gx-w-100"
                  style={{ height: "350px" }}
                />
                <div className="gx-w-100 gx-p-3 gx-position-absolute gx-top-0 gx-left-0">
                  <Row gutter={[16, 8]} className="gx-pt-2">
                    <div className="gx-w-100 gx-px-1 lg:space-y-1 space-y-0">
                      <div>
                        <Text className="gx-text-white gx-font-weight-semi-bold " > Card</Text>
                        <div
                          className={`gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4
                            ? "gx-text-green-0"
                            : "gx-text-white"
                            }`}
                        >
                          Player 8 :
                          <span className="gx-text-yellow">
                            {t1 && t1.C1 ? t1.C1 : null}
                          </span>
                        </div>
                        <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                          {resultCard &&
                            resultCard[0] &&
                            resultCard[0] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[0]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[4] &&
                            resultCard[4] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[4]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[8] &&
                            resultCard[8] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[8]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[12] &&
                            resultCard[12] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[12]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[16] &&
                            resultCard[16] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[16]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[20] &&
                            resultCard[20] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[20]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[24] &&
                            resultCard[24] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[24]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[28] &&
                            resultCard[28] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[28]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[32] &&
                            resultCard[32] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[32]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <div
                          className={` ${getColorClass(
                            t1.C2
                          )} gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                        >
                          Player 9 :
                          <span className="gx-text-yellow">
                            {t1 && t1.C2 ? t1.C2 : null}
                          </span>
                        </div>
                        <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                          {resultCard &&
                            resultCard[1] &&
                            resultCard[1] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[1]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[5] &&
                            resultCard[5] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[5]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[9] &&
                            resultCard[9] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[9]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[13] &&
                            resultCard[13] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[13]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[17] &&
                            resultCard[17] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[17]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[21] &&
                            resultCard[21] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[21]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[25] &&
                            resultCard[25] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[25]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[29] &&
                            resultCard[29] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[29]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[33] &&
                            resultCard[33] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[33]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <div
                          className={` ${getColorClass(
                            t1.C3
                          )} gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                        >
                          Player 10 :
                          <span className="gx-text-yellow">
                            {t1 && t1.C3 ? t1.C3 : null}
                          </span>
                        </div>
                        <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                          {resultCard &&
                            resultCard[2] &&
                            resultCard[2] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[2]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[6] &&
                            resultCard[6] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[6]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[10] &&
                            resultCard[10] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[10]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[14] &&
                            resultCard[14] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[14]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[18] &&
                            resultCard[18] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[18]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[22] &&
                            resultCard[22] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[22]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[26] &&
                            resultCard[26] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[26]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[30] &&
                            resultCard[30] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[30]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[34] &&
                            resultCard[34] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[34]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <div
                          className={` ${getColorClass(
                            t1.C4
                          )} gx-font-weight-semi-bold p-[1px] tracking-tight text-[12px]`}
                        >
                          Player 11 :
                          <span className="gx-text-yellow">{t1.C4}</span>
                        </div>
                        <div style={{ gap: "2px" }} className="gx-bg-flex space-x-2 gx-justify-content-start">
                          {resultCard &&
                            resultCard[3] &&
                            resultCard[3] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[3]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[7] &&
                            resultCard[7] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[7]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[11] &&
                            resultCard[11] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[11]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[15] &&
                            resultCard[15] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[15]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[19] &&
                            resultCard[19] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[19]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[23] &&
                            resultCard[23] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[23]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[27] &&
                            resultCard[27] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[27]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[31] &&
                            resultCard[31] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[31]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                          {resultCard &&
                            resultCard[35] &&
                            resultCard[35] !== "1" ? (
                            <img
                              src={`/cards/${resultCard[35]}.png`}
                              alt="card"
                              className="gx-rounded-sm"
                              style={{ height: "2rem" }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
                <div
                  className=" gx-position-absolute"
                  style={{ bottom: "16px", right: "16px" }}
                >
                  <FlipCountdown
                    titlePosition="hidden"
                    hideYear
                    hideMonth
                    hideDay
                    hideHour
                    hideMinute
                    endAtZero
                    size="small"
                    endAt={new Date(
                      Date.now() + 1000 * (t1?.autotime || 0)
                    ).toUTCString()}
                  />
                </div>
              </Card>
              <Row gutter={[20, 20]} className="gx-px-2">
                <Col xs={24} sm={12}>
                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-fs-sm gx-border-bottom"
                  >
                    <Col
                      span={12}
                      className="  gx-py-2 gx-text-left"
                    ></Col>
                    <Col span={6} className="gx-py-2  gx-bg-grey">
                      <Text
                        strong
                        className="gx-text-white gx-text-nowrap gx-fs-lg gx-text-uppercase gx-font-weight-bold"
                      >
                        Back
                      </Text>
                    </Col>
                    <Col span={6} className="gx-py-2 gx-bg-grey">
                      <Text
                        strong
                        className="gx-text-white gx-text-nowrap gx-fs-lg gx-text-uppercase gx-font-weight-bold"
                      >
                        Lay
                      </Text>
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-fs-sm gx-border-bottom"
                  >
                    <Col
                      span={12}
                      className=" gx-bg-flex gx-align-items-center  gx-py-2 gx-text-left"
                    >
                      <Text

                        className="gx-text-black gx-fs-md gx-text-uppercase gx-font-weight-bold"
                      >
                        {" "}
                        {Player8 && Player8.nat
                          ? Player8.nat : Player8.nation ? Player8.nation
                            : "Player 8"}{" "}
                      </Text>
                      <div
                        className={`${posArray[Player8.sid] < 0
                          ? "gx-text-red"
                          : "gx-text-green-0"
                          } text-[12px]`}
                      >
                        {" "}
                        {posArray[Player8.sid]}
                      </div>
                    </Col>
                    <Col
                      span={6}
                      className="gx-py-2 "
                      style={{ backgroundColor: "#72BBEF" }}
                    >
                      {Player8 && Player8.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-lgaai cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player8,
                                type: "Yes",
                                odds: Player8.b1 - oddsDifference,
                                nat: Player8.nat ? Player8.nat : Player8.nation,
                                type: "Yes",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player8 && Player8.b1 ? (Player8.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player8 && Player8.bs1 ? Player8.bs1 : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-lgaai">
                          <div className=" text-center relative darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player8 && Player8.b1 ? (Player8.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player8 && Player8.bs1 ? Player8.bs1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col
                      span={6}
                      className="gx-bg-flex gx-justify-content-center gx-position-relative   gx-align-items-center gx-p-0"
                      style={{ backgroundColor: "#FAA9BA" }}
                    >
                      {Player8 && Player8.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-khaii cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player8,
                                odds: Player8.l1,
                                nat: Player8.nat ? Player8.nat : Player8.nation,
                                type: "No",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                            {Player8 && Player8.l1 ? Player8.l1 : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                            {Player8 && Player8.ls1 ? Player8.ls1: "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-khaii">
                          <div className=" text-center relative dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player8 && Player8.l1 ? Player8.l1 : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player8 && Player8.ls1 ? Player8.ls1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-fs-sm gx-border-bottom"
                  >
                    <Col
                      span={12}
                      className=" gx-bg-flex gx-align-items-center  gx-py-2 gx-text-left"
                    >
                      <Text
                        strong
                        className="gx-text-black gx-text-uppercase gx-fs-md gx-font-weight-bold"
                      >
                        {" "}
                        {Player9 && Player9.nat
                          ? Player9.nat : Player9.nation ? Player9.nation
                            : "Player 9"}{" "}
                      </Text>
                      <div
                        className={`${posArray[Player9.sid] < 0
                          ? "gx-text-red"
                          : "gx-text-green-0"
                          } text-[12px]`}
                      >
                        {" "}
                        {posArray[Player9.sid]}
                      </div>
                    </Col>
                    <Col
                      span={6}
                      className="gx-py-2 "
                      style={{ backgroundColor: "#72BBEF" }}
                    >
                      {Player9 && Player9.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-lgaai cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player9,
                                type: "Yes",
                                odds: Player9.b1 - oddsDifference,
                                nat: Player9.nat ? Player9.nat : Player9.nation,
                                type: "Yes",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player9 && Player9.b1 ? (Player9.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player9 && Player9.bs1 ? Player9.bs1 : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-lgaai">
                          <div className=" text-center relative darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player9 && Player9.b1 ? (Player9.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player9 && Player9.bs1 ? Player9.bs1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col
                      span={6}
                      className="gx-bg-flex gx-justify-content-center gx-position-relative   gx-align-items-center gx-p-0"
                      style={{ backgroundColor: "#FAA9BA" }}
                    >
                      {Player9 && Player9.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-khaii cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player9,
                                type: "Yes",
                                odds: Player9.l1,
                                nat: Player9.nat ? Player9.nat : Player9.nation,
                                type: "No",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player9 && Player9.l1
                                ? Player9.l1 
                                : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player9 && Player9.ls1
                                ? Player9.ls1
                                : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-khaii">
                          <div className=" text-center relative dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player9 && Player9.l1 ? Player9.l1 : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player9 && Player9.ls1 ? Player9.ls1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>

                <Col className="gx-py-0 gx-my-0" xs={24} sm={12}>
                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-d-none  gx-d-sm-flex gx-fs-sm gx-border-bottom"

                  >
                    <Col
                      span={12}
                      className="  gx-py-2 gx-text-left"
                    ></Col>
                    <Col span={6} className="gx-py-2 gx-bg-grey ">
                      <Text
                        strong
                        className="gx-text-white gx-fs-lg gx-text-nowrap gx-text-uppercase gx-font-weight-bold"
                      >
                        Back
                      </Text>
                    </Col>
                    <Col span={6} className="gx-py-2 gx-bg-grey">
                      <Text
                        strong
                        className="gx-text-white gx-text-nowrap gx-fs-lg gx-text-uppercase gx-font-weight-bold"
                      >
                        Lay
                      </Text>
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-fs-sm gx-border-bottom"
                  >
                    <Col
                      span={12}
                      className=" gx-bg-flex gx-align-items-center  gx-py-2 gx-text-left"
                    >
                      <Text
                        strong
                        className="gx-text-black gx-fs-md gx-text-uppercase gx-font-weight-bold"
                      >
                        {" "}
                        {Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}
                      </Text>
                      <div
                        className={`${posArray[Player10.sid] < 0
                          ? "gx-text-red"
                          : "gx-text-green-0"
                          } gx-fs-sm`}
                      >
                        {" "}
                        {posArray[Player10.sid]}
                      </div>
                    </Col>
                    <Col
                      span={6}
                      className="gx-py-2 "
                      style={{ backgroundColor: "#72BBEF" }}
                    >
                      {Player10 && Player10.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-lgaai cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player10,
                                type: "Yes",
                                odds: Player10.b1 - oddsDifference,
                                nat: Player10.nat ? Player10.nat : Player10.nation,
                                type: "Yes",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player10 && Player10.b1 ? (Player10.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player10 && Player10.bs1 ? Player10.bs1 : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-lgaai">
                          <div className=" text-center relative darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player10 && Player10.b1 ? (Player10.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player10 && Player10.bs1 ? Player10.bs1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col
                      span={6}
                      className="gx-bg-flex gx-justify-content-center gx-position-relative   gx-align-items-center gx-p-0"
                      style={{ backgroundColor: "#FAA9BA" }}
                    >
                      {Player10 && Player10.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-khaii cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player10,
                                type: "Yes",
                                odds: Player10.l1,
                                nat: Player10.nat ? Player10.nat : Player10.nation,
                                type: "No",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player10 && Player10.l1
                                ? Player10.l1 
                                : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player10 && Player10.ls1
                                ? Player10.ls1 
                                : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-khaii">
                          <div className=" text-center relative dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player10 && Player10.l1 ? Player10.l1 : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player10 && Player10.ls1 ? Player10.ls1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 20]}
                    className="gx-text-center gx-fs-sm gx-border-bottom"
                  >
                    <Col
                      span={12}
                      className=" gx-bg-flex gx-align-items-center  gx-py-2 gx-text-left"
                    >
                      <Text
                        strong
                        className="gx-text-black gx-bg-flex gx-fs-md  gx-text-uppercase gx-font-weight-bold"
                      >
                        {" "}
                        {Player11 && Player11.nat
                          ? Player11.nat : Player11.nation ? Player11.nation
                            : "Player 11"}{" "}
                      </Text>
                      <div
                        className={`${posArray[Player11.sid] < 0
                          ? "gx-text-red"
                          : "gx-text-green-0"
                          } text-[12px]`}
                      >
                        {" "}
                        {posArray[Player11.sid]}
                      </div>
                    </Col>
                    <Col
                      span={6}
                      className="gx-py-2 "
                      style={{ backgroundColor: "#72BBEF" }}
                    >
                      {Player11 && Player11.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-lgaai cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player11,
                                type: "Yes",
                                odds: Player11.b1 - oddsDifference,
                                nat: Player11.nat ? Player11.nat : Player11.nation,
                                type: "Yes",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player11 && Player11.b1 ? (Player11.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player11 && Player11.bs1 ? Player11.bs1 : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-lgaai">
                          <div className=" text-center relative darktext py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player11 && Player11.b1 ? (Player11.b1 - oddsDifference) : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player11 && Player11.bs1 ? Player11.bs1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col
                      span={6}
                      className="gx-bg-flex gx-justify-content-center gx-position-relative   gx-align-items-center gx-p-0"
                      style={{ backgroundColor: "#FAA9BA" }}
                    >
                      {Player11 && Player11.gstatus === "ACTIVE" ? (
                        <div
                          className="gx-w-100 odds-bet-khaii cursor-pointer "
                          onClick={() =>
                            this.handleBackOpen(
                              {
                                data: Player11,
                                type: "Yes",
                                odds: Player11.l1,
                                nat: Player11.nat ? Player11.nat : Player11.nation,
                                type: "No",
                              },
                              this.section1Ref
                            )
                          }
                        >
                          <div className=" text-center dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player11 && Player11.l1
                                ? Player11.l1 
                                : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player11 && Player11.ls1
                                ? Player11.ls1 
                                : "-"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="gx-w-100 odds-bet-khaii">
                          <div className=" text-center relative dark-text py-1">
                            <div className="gx-fs-lg gx-font-weight-bold">
                              {Player11 && Player11.l1 ? Player11.l1 : "-"}
                            </div>
                            <div className="gx-fs-sm gx-font-weight-semi-bold">
                              {Player11 && Player11.ls1 ? Player11.ls1 : "-"}
                            </div>
                            <div
                              style={{ background: "rgba(0,0,0,0.3)" }}
                              className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                            >
                              <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              {backBetModal === true ? (
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
              ) : null}

              {backBetModal === true ? (
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
              ) : null}

              {betList && betList.length > 0 ? (
                <div className="gx-w-100 gx-mt-1">
                  {/* <MyBetTabBmx
                      totalProfitLoss={totalProfitLoss} /> */}
                  <BetListTableBmx betList={betList} />
                </div>
              ) : null}
              <Row justify={"center"} className="gx-my-1">
                <Button
                  className="gx-bg-grey gx-text-white gx-font-weight-semi-bold"
                  onClick={() => {
                    this.setState({ decalaredListModal: true });
                    this.declaredbetListfunc();
                  }}
                >
                  Completed Casino Bets
                </Button>
              </Row>
              <div
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                className="gx-my-1 gx-mx-1 "
              >
                <RoundedTabBmx />
                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2">
                  {casinoData && casinoData.result && casinoData?.result
                    ? casinoData?.result?.map((element, index) => (
                      <div
                        onClick={() => this.handleResultModel(element)}
                        style={{
                          backgroundColor: "#368011",
                          width: "24px",
                          height: "24px",
                        }}
                        className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold"
                      >
                        <p className="text-yellow-200 font-normal text-sm">
                          {element && element.result === "1" ? (
                            "8"
                          ) : element && element.result === "2" ? (
                            <p className="text-yellow-200 font-normal text-sm">
                              9
                            </p>
                          ) : element && element.result === "3" ? (
                            <p className="text-yellow-200 font-normal text-sm">
                              10
                            </p>
                          ) : element && element.result === "4" ? (
                            <p className="text-yellow-200 font-normal text-sm">
                              11
                            </p>
                          ) : (
                            "-"
                          )}
                        </p>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
          </Row>
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

export default connect(mapStateToProps)(cards32ATheme2);
