import React from "react";
import { connect } from "react-redux";
import FlipCountdown from "@rumess/react-flip-countdown";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import { httpPost } from "../../../http/http";
import { betChipsData } from "../../../http/http";
import { Row, Col, Typography, Card, message, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";
import { FaLock } from "react-icons/fa";

const { Text } = Typography;

// import { userActions } from "../../_actions";

class TeenpattiOneDayTheme2 extends React.Component {
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
      shortName: "teen20",
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
      let casinoDetails = getCasinoDetails?.data;
      let videoUrlType = casinoDetails?.videoUrlType;
      let selectedVideoUrl = casinoDetails?.[`videoUrl${videoUrlType}`]
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
        tvUrl: selectedVideoUrl && selectedVideoUrl ? selectedVideoUrl : "",
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
            : "teen20",
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
    this.setState({ ResultModel: true, resultData: data });
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
    console.log(this.state.betSlipData, "11222222222222");
    
    this.setState({ LoadingBet: true, })
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let betObject = {
      "roundId": t1.mid,
      "sid": this.state.betSlipData.data.sid ? this.state.betSlipData.data.sid : this.state.betSlipData.data.sectionId,
      "rate": this.state.count + "",
      "amount": Number(this.state.betSlipData.stake),
      "casinoType": this.state.shortName ? this.state.shortName : "teen",
      "eventId": this.props.match.params.eventId,
      "betFor": this.state.betSlipData.nat + "",
      "isLay": this.state.betSlipData.type == "No" ? true : false,
    }
    // if(this.state.betSlipData.type === "No"){


    // }
    //httpPostBet
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
  declaredbetListfunc = async () => {
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
      resultData,
      alertStatus, minStake, maxStake, declaredBetList,
      DeclaredTotalProfitLoss,
      decalaredListModal,
    } = this.state;
    let { data, result } = casinoData ? casinoData : {};

    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let t2 = data && data.t1 && data.t1[1] ? data.t1[1] : {};
    let PlayerA = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let PlayerB = data && data.t1 && data.t1[1] ? data.t1[1] : {};
    return (
      <>

        <div className={`gx-overflow-y-auto`}>
          {
            alertStatus?.status === true ?
              <CasinoAlertModal onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
              : null
          }
          {/* {
                            isFatch ?
                                <ErrorTost message={message} toastClose={this.toastClose} error={error} /> : null
                        } */}
          {ResultModel &&
            ResultModel === true ? (
            <ResultModelBmx
              handleClose={this.handleCloseResult}
              name={name ? name : "1 Day Teenpatti"}
              shortName={shortName ? shortName : "teen"}
              result={resultData}
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
                                        time={time}
                                        inputChange={this.inputChange}
                                        decreaseCount={this.decreaseCount}
                                        increaseCount={this.increaseCount}
                                        count={count}
                                    />
                                ) : null}
                            </>
                        } */}
          {decalaredListModal && decalaredListModal === true ? (
            <DecalaredCasinoBetList totalProfitLoss={DeclaredTotalProfitLoss} declaredBetList={declaredBetList} closeDeclaredModal={this.closeDeclaredModal} />
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
                PageTitle={name ? name : "20-20 Teenpatti"}
                ruleImage={"/assets/images/rulesImage/tp-rules.webp"}
                t1={t1}
              />

              <Card className="ant-card gx-bg-black gx-text-white p-0 gx-my-0  ant-space-align-center gx-position-relative" >
                <iframe src={tvUrl ? tvUrl : null} title=" " className="gx-w-100" style={{ height: "350px" }} />
                <div className="gx-w-100 gx-py-3 gx-position-absolute gx-top-0 gx-left-0">
                  <Row gutter={[16, 8]} className="gx-py-3 gx-px-2 gx-bg-flex ">
                    <div>
                      <Col >
                        <Row gutter={[8, 8]} className="">
                          {[t1?.C1, t1?.C2, t1?.C3]?.map((card, index) => (
                            <Col key={index} xs={8}>
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
                      <Col span={24}>
                        <Text className="gx-text-white" strong>PLAYER A</Text>
                      </Col>
                    </div>
                    <div>
                      <Col >
                        <Row gutter={[8, 8]} className="">
                          {[t2?.C1, t2?.C2, t2?.C3]?.map((card, index) => (
                            <Col key={index} xs={8}>
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
                      <Col span={24}>
                        <Text className="gx-text-white" strong>PLAYER B</Text>
                      </Col>
                    </div>

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

              <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">

                <Row className="gx-text-center gx-fs-sm gx-border-bottom">
                  <Col span={12} className="gx-bg-grey  gx-py-2 gx-text-left">
                    MIN: {minStake ? minStake : "100"}&nbsp;
                    MAX: {maxStake ? maxStake : "10000"}
                  </Col>
                  <Col span={6} className="gx-py-2 " style={{ backgroundColor: '#72BBEF' }}>
                    <Text strong className="gx-text-black gx-text-uppercase gx-font-weight-semi-bold">lagai</Text>
                  </Col>
                  <Col span={6} className="gx-py-2" style={{ backgroundColor: '#FAA9BA' }}>
                    <Text strong className="gx-text-black gx-text-uppercase gx-font-weight-semi-bold">khai</Text>
                  </Col>
                </Row>

                <Row className="gx-text-center gx-border-bottom">
                  <Col span={12} className="">
                    <Row className="gx-text-center ">
                      <Col span={24} style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                      <div className=" gx-text-left gx-w-100">{PlayerA && PlayerA.nat ? PlayerA.nat : PlayerA.nation ? PlayerA.nation : "Player A"}</div>
                        <span className="gx-text-right gx-w-100">
                          {posArray[PlayerA.sid ? PlayerA.sid : PlayerA.sectionId] && <div className={posArray[PlayerA.sid ? PlayerA.sid : PlayerA.sectionId] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-text-right  gx-w-100"}>
                            {posArray[PlayerA.sid ? PlayerA.sid : PlayerA.sectionId]}
                          </div>}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  {PlayerA && PlayerA.gstatus === 'ACTIVE' ? (
                    <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                      <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer gx-py-2">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerA, type: "Yes", odds: PlayerA.b1 - oddsDifference, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation }, this.section1Ref)}>
                          <Text strong className="gx-text-18 gx-text-black">{PlayerA && PlayerA.b1 ? (PlayerA.b1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                      </div>
                    </Col>
                  ) :
                    (
                      <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                        <div className="gx-text-center">
                          <Text strong className="gx-text-18 gx-text-black">{PlayerA && PlayerA.b1 ? (PlayerA.b1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                        <div style={{ zIndex: "1000", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                          <div className="gx-text-center">
                            <FaLock style={{ fontSize: 16, color: 'white' }} />
                          </div>
                        </div>
                      </Col>)}


                  {PlayerA && PlayerA.gstatus === 'ACTIVE' ? (
                    <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                      <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer gx-py-2">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerA, type: "No", odds: PlayerA.l1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation }, this.section1Ref)}>
                          <Text strong className="gx-text-18 gx-text-black">{PlayerA && PlayerA.l1 ? (PlayerA.l1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                      </div>
                    </Col>
                  ) :
                    (
                      <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerA, type: "No", odds: PlayerA.l1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation }, this.section1Ref)}>
                       <Text strong className="gx-text-18 gx-text-black">{PlayerA && PlayerA.l1 ? (PlayerA.l1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                        <div style={{ zIndex: "1000", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                          <div className="gx-text-center">
                            <FaLock style={{ fontSize: 16, color: 'white' }} />
                          </div>
                        </div>
                      </Col>)}

                </Row>

                <Row className="gx-text-center gx-border-bottom">
                  <Col span={12} className=" gx-border-white">
                    <Row style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-center  ">
                      <Col span={24} className="gx-text-capitalize gx-d-flex gx-text-black gx-font-weight-semi-bold gx-py-2">

                        <div className="gx-w-100 gx-text-left">{PlayerB && PlayerB.nat ? PlayerB.nat : PlayerB.nation ? PlayerB.nation : "Player B"}</div>

                        {posArray[PlayerB.sid ? PlayerB.sid : PlayerB.sectionId] && <div className={posArray[PlayerB.sid ? PlayerB.sid : PlayerB.sectionId] < 0 ? "gx-text-red gx-text-right " : "gx-text-green-0 gx-text-right"}>
                          {posArray[PlayerB.sid ? PlayerB.sid : PlayerB.sectionId]}
                        </div>}

                        {/* <div className={posArray[PlayerB.sid] < 0 ? "gx-text-red gx-w-100" : "gx-text-green-0 gx-w-100"}>
                        {posArray[PlayerB.sid]}
                        </div> */}
                      </Col>
                    </Row>
                  </Col>
                  {PlayerB && PlayerB.gstatus === 'ACTIVE' ? (
                    <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                      <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer gx-py-2 ">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerB, type: "Yes", odds: PlayerB.b1 - oddsDifference, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation }, this.section1Ref)}>
                         <Text strong className="gx-text-18 gx-text-black">{PlayerB && PlayerB.b1 ? (PlayerB.b1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                      </div>
                    </Col>
                  ) :
                    (
                      <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerB, type: "Yes", odds: PlayerB.b1 - oddsDifference, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation }, this.section1Ref)}>
                          <Text strong className="gx-text-18 gx-text-black">{PlayerB && PlayerB.b1 ? (PlayerB.b1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                        <div style={{ zIndex: "1000", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                          <div className="gx-text-center">
                            <FaLock style={{ fontSize: 16, color: 'white' }} />
                          </div>
                        </div>
                      </Col>)}


                  {PlayerB && PlayerB.gstatus === 'ACTIVE' ? (
                    <Col span={6} className=" gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                      <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer gx-py-2">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerB, type: "No", odds: PlayerB.l1 - oddsDifference, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation }, this.section1Ref)}>
                          <Text strong className="gx-text-18 gx-text-black">{PlayerB && PlayerB.l1 ? (PlayerB.l1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                      </div>
                    </Col>
                  ) :
                    (
                      <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: PlayerB, type: "No", odds: PlayerB.l1 - oddsDifference, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation }, this.section1Ref)}>
                          <Text strong className="gx-text-18 gx-text-black">{PlayerB && PlayerB.l1 ? (PlayerB.l1 / 100).toFixed(2) : "-"}</Text>
                        </div>
                        <div style={{ zIndex: "1000", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                          <div className="gx-text-center">
                            <FaLock style={{ fontSize: 16, color: 'white' }} />
                          </div>
                        </div>
                      </Col>)}
                </Row>

              </Card>

              {backBetModal === true ?
                // <PlaceBetMobileBmxBet
                //     betSlipData={this.state.betSlipData}
                //     time={time}
                //     count={count}
                //     betChipsData={betChipsData}
                //     section1Ref={this.section1Ref}
                //     inputRef={this.inputRef}
                //     updateStake={this.updateStake}
                //     placeBet={this.placeBet}
                //     updateStackOnclick={this.updateStackOnclick}
                //     handleClose={this.handleClose}
                //     LoadingBet={LoadingBet}
                // />
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
                  inputChange={this.inputChange}
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
                  inputChange={this.inputChange}
                />
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

              {/* <div className="pb-20"> */}
              {betList && betList.length > 0 ?
                <div className="gx-w-100">
                  {/* <MyBetTabBmx
                                            totalProfitLoss={totalProfitLoss} /> */}
                  <BetListTableBmx betList={betList} />
                </div>
                : null}
              <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className=" pb-36 bg-black/30">
                <RoundedTabBmx />
                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2">
                  {result && result.length > 0 ? result?.map((element, index) => (
                    <div onClick={() => this.handleResultModel(element)} style={{ backgroundColor: '#368011', width: '24px', height: '24px' }} className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold" >
                      <p className="">{element && element.result === '2' ? "B" : element && element.result === '1' ? <p className="">A</p> : "-"}</p>
                    </div>
                  )) : null}
                </div>
              </div>

            </Col >
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

export default connect(mapStateToProps)(TeenpattiOneDayTheme2);
