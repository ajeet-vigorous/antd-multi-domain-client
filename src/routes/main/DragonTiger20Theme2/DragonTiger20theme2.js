import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import io from 'socket.io-client';
import moment from "moment";

import GameCard from "../../../components/casino_components/GameCard/GameCard";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import FlipCountdown from '@rumess/react-flip-countdown';
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { httpPost } from "../../../http/http";
import { betChipsData } from '../../../http/http';
import { Row, Col, Typography, Image, Card, Divider, Button } from 'antd';
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";



class DragonTiger20Theme2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCasinoModal: false,
      betOpen: false,
      myBetOpen: false,
      betSlipData: {},
      fieldsbet: {},
      errorsbet: {},
      count: 0,
      time: 7,
      backBetModal: false,
      backBetModalMobile: false,
      BetPlaceDesktop: false,
      ResultModel: false,
      casinoData: [],
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
      shortName: "dt20",
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


    }

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
      "rate": (Number(this.state.count) - Number(this.state.oddsDifference)) + "",
      "amount": Number(this.state.betSlipData.stake),
      "casinoType": this.state.shortName ? this.state.shortName : "dt20",
      "eventId": this.props.match.params.eventId,
      "betFor": this.state.betSlipData.nat + "",
    }

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
    this.getDomainSettingByDomainName();
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
        shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "dt20",
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

  handleResultModel = (data) => {
    this.setState({ ResultModel: true, result: data });
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

  handleClose = () => {
    this.setState({ backBetModal: false, backBetModalMobile: false, });
  };


  render() {
    const { casinoData, name, alertStatus, shortName, ResultModel, time, count, backBetModal, tvUrl, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, betChipsData, isFatch, message, error, domainSettingByDomainName, declaredBetList,
      DeclaredTotalProfitLoss,
      decalaredListModal, } = this.state;

    let { data, result } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let Dragon = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Tiger = data && data.t2 && data.t2[2] ? data.t2[1] : {};
    let Tie = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    return (
      <>

        <div className={`gx-overflow-y-auto gx-h-100`}>
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

          {ResultModel === true ? (
            <ResultModelBmx
              handleClose={this.handleCloseResult}
              name={name ? name : "20-20 Dragon Tiger"}
              shortName={shortName ? shortName : "dt20"}
              result={this.state.result}
            />
          ) : null}

          <Row justify="center">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              xxl={10}
            >
              <PageHeaderTheme
                className=""
                PageTitle={name ? name : "20-20 Dragon Tiger"}
                ruleImage={"/assets/images/dragon-tiger-20-rules.webp"}
                t1={t1}
              />
              <Card className="ant-card gx-bg-black gx-my-0 gx-text-white ant-space-align-center gx-my-0 gx-position-relative">
                <iframe src={tvUrl ? tvUrl : null} title=" " className='gx-w-100' style={{ height: "350px" }} />
                <div className="gx-w-100 gx-p-3 gx-position-absolute gx-top-0 gx-left-0">
                  <Row gutter={[16, 8]} className="gx-pt-2">
                    <Col>
                      <Row gutter={[8, 8]}>
                        {[t1?.C1, t1?.C2]?.map((card, index) => (
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

              <div className="gx-w-100 gx-px-1 gx-pb-1 gx-pt-1 gx-border-2 gx-border-dark">
                <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-px-2 gx-bg-white gx-py-1" style={{ gap: 4 }}>
                  <GameCard
                    handleBackOpen={this.handleBackOpen}
                    Data={Dragon}
                    Name={Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"}
                    section1Ref={this.section1Ref}
                    posArray={posArray}
                    oddsDifference={oddsDifference}
                  />
                  <GameCard
                    handleBackOpen={this.handleBackOpen}
                    Data={Tie}
                    Name={Tie.nat ? Tie.nat : Tie.nation ? Tie.nation : "Tie"}
                    section1Ref={this.section1Ref}
                    posArray={posArray}
                    oddsDifference={oddsDifference}
                  />
                  <GameCard
                    handleBackOpen={this.handleBackOpen}
                    Data={Tiger}
                    Name={Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                    section1Ref={this.section1Ref}
                    posArray={posArray}
                    oddsDifference={oddsDifference}
                  />
                </div>
              </div>

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

              {betList && betList.length > 0 ?
                <div className="gx-w-100 gx-mt-1">
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


              <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className="gx-w-100 gx-mt-1">
                <RoundedTabBmx />
                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2">
                  {result && result.length > 0 ? result?.map((element, index) => (
                    <div onClick={() => this.handleResultModel(element)} style={{ backgroundColor: '#368011', width: '24px', height: '24px' }} className="gx-rounded-circle gx-p-1 gx-ml-1 gx-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold" >
                      <p>{element && element.result && element.result === "1" ? "D" : element && element.result && element.result === "2" ? "T" : "-"}</p>
                    </div>
                  )) : null}
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

export default connect(mapStateToProps)(DragonTiger20Theme2);