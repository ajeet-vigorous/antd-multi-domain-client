import React from "react";
import { connect } from "react-redux";
import FlipCountdown from '@rumess/react-flip-countdown';
import BetLocked from "../../../components/casino_components/BetLocked/BetLocked";
import axios from "axios";
import io from 'socket.io-client';
import moment from "moment";
// import PlaceBetMobileBmx from "../../casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import ResultModelBmx from "../../../components/casino_components/ResultModelBmx/ResultModelBmx";
import RoundedTabBmx from "../../../components/casino_components/RoundedTabBmx/RoundedTabBmx";
import PageHeaderTheme from "../../../components/casino_components/PageHeaderTheme/PageHeaderTheme";
// import Loader from "../../components/Loader/Loader";
import MyBetTabBmx from "../../../components/casino_components/MyBetTabBmx/MyBetTabBmx";
import BetListTableBmx from "../../../components/casino_components/BetListTableBmx/BetListTableBmx";
import { betChipsData } from '../../../http/http';
// import PlaceBetMobileBmxBet from "../../casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import { httpPost } from "../../../http/http";
import { Row, Col, Typography, Card, message, Button } from "antd";
import BetLockedRounded from "../../../components/casino_components/BetLockedRounded/BetLockedRounded";

// import ErrorTost from '../../components/ErrorTost/ErrorTost';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaLock } from "react-icons/fa";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";
const { Text } = Typography;
class cards32BTheme2 extends React.Component {
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
            shortName: "card32eu",
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
            decalaredListModal: false,
            alertStatus: { status: false, type: "", message: '' }
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
    increaseCount = () => {
        const increasedCount = (parseFloat(this.state.count) + 0.01).toFixed(2);
        this.setState({ count: parseFloat(increasedCount) });
    };

    decreaseCount = () => {
        const decreasedCount = (parseFloat(this.state.count) - 0.01).toFixed(2);
        this.setState({ count: parseFloat(decreasedCount) });
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
            let casinoDetails = getCasinoDetails.data
            this.setState({
                casinoDetails: casinoDetails,
                fetchData: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : {},
                socketURL: casinoDetails && casinoDetails.socketURL ? casinoDetails.socketURL : {},
                tvUrl: casinoDetails && casinoDetails.videoUrl1 ? casinoDetails.videoUrl1 : "",
                cacheURL: casinoDetails && casinoDetails.cacheURL ? casinoDetails.cacheURL : {},
                socketPerm: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : "",
                betStatus: casinoDetails && casinoDetails.betStatus ? casinoDetails.betStatus : "",
                cashinoStatus: casinoDetails && casinoDetails.cashinoStatus ? casinoDetails.cashinoStatus : "",
                eventId: casinoDetails && casinoDetails.eventId ? casinoDetails.eventId : "",
                minStake: casinoDetails && casinoDetails.minStake ? casinoDetails.minStake : "",
                maxStake: casinoDetails && casinoDetails.maxStake ? casinoDetails.maxStake : "",
                name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
                shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "card32eu",
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
            //     await this.callCache(cacheUrl);
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
            filteredBets.forEach((bet) => {
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
            betList.map((bet, key) => {
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
            "sid": this.state.betSlipData.data.sid,
            "rate": this.state.count + "",
            "amount": Number(this.state.betSlipData.stake),
            "casinoType": this.state.shortName ? this.state.shortName : "card32eu",
            "eventId": this.props.match.params.eventId,
            "betFor": this.state.betSlipData.betFor + "",
            "isLay": this.state.betSlipData.type === "No" ? true : false,
        }

        const result = await httpPost("casino/casinoBetPlace", betObject);
        if (result) {
            if (result.error === false) {



                this.setState(
                    {
                        alertStatus: { status: true, type: "success", message: result?.message },
                        betresponse: result.data
                    },
                );
                this.setState({ isFatch: true, message: "Bet Successful", error: false })
                setTimeout(() => {
                    this.setState({ isFatch: false })
                }, 3000);
                this.betList(this.props.match.params.eventId)
                // this.props.dispatch(userActions.getUserBalance());
            }
            else {

                this.setState({ isFatch: true, message: result.message, alertStatus: { status: true, type: "error", message: result?.data.message }, error: true })
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

    toastClose = () => {
        this.setState({ isFatch: false });
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

    handleClose = () => {
        this.setState({ backBetModal: false, backBetModalMobile: false });
    };

    handleCloseResult = () => {
        this.setState({ ResultModel: false, });
    };
    closeDeclaredModal = () => {
        this.setState({
          declaredBetList: [],
          DeclaredTotalProfitLoss: '',
          decalaredListModal: false,
        })
      }

    render() {
        const { casinoData, name, shortName, ResultModel, time, count, backBetModal, tvUrl, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, betChipsData, isFatch, message, error, domainSettingByDomainName, alertStatus,  decalaredListModal,
            declaredBetList, DeclaredTotalProfitLoss } = this.state;
        let { data, result } = casinoData ? casinoData : {};
        let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
        let t2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};

        let Player8 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
        let Player8Odd = data && data.t2 && data.t2[4] ? data.t2[4] : {};
        let Player8Even = data && data.t2 && data.t2[5] ? data.t2[5] : {};


        let Player9 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
        let Player9Odd = data && data.t2 && data.t2[6] ? data.t2[6] : {};
        let Player9Even = data && data.t2 && data.t2[7] ? data.t2[7] : {};

        let Player10 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
        let Player10Odd = data && data.t2 && data.t2[8] ? data.t2[8] : {};
        let Player10Even = data && data.t2 && data.t2[9] ? data.t2[9] : {};

        let Player11 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
        let Player11Odd = data && data.t2 && data.t2[10] ? data.t2[10] : {};
        let Player11Even = data && data.t2 && data.t2[11] ? data.t2[11] : {};


        let CardBlack = data && data.t2 && data.t2[12] ? data.t2[12] : {};
        let CardRed = data && data.t2 && data.t2[13] ? data.t2[13] : {};

        let TwoRed = data && data.t2 && data.t2[26] ? data.t2[26] : {};

        let Single1 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
        let Single2 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
        let Single3 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
        let Single4 = data && data.t2 && data.t2[17] ? data.t2[17] : {};
        let Single5 = data && data.t2 && data.t2[18] ? data.t2[18] : {};
        let Single6 = data && data.t2 && data.t2[19] ? data.t2[19] : {};
        let Single7 = data && data.t2 && data.t2[20] ? data.t2[20] : {};
        let Single8 = data && data.t2 && data.t2[21] ? data.t2[21] : {};
        let Single9 = data && data.t2 && data.t2[22] ? data.t2[22] : {};
        let Single0 = data && data.t2 && data.t2[23] ? data.t2[23] : {};


        let Total8and9 = data && data.t2 && data.t2[24] ? data.t2[24] : {};
        let Total10and11 = data && data.t2 && data.t2[25] ? data.t2[25] : {};




        const maxValue = Math.max(t1.C1, t1.C2, t1.C3, t1.C4);
        const getColorClass = (value) => value === maxValue ? 'text-green-500' : 'text-white';

        let resultCard;
        if (t1 && t1.desc && typeof t1.desc === 'string') {
            resultCard = t1.desc.split(',');
        } else {
            // Handle the case where t1 is undefined or t1.desc is not a string
            resultCard = [];
        }
        

        return (
            <>

                <div className={`overflow-auto h-screen scroll-smooth  ${domainSettingByDomainName && domainSettingByDomainName.clientNotification ? "md:pt-[105px] pt-[100px]" : "md:pt-[72px] pt-[70px]"}`}>
                    {
                        (alertStatus?.status === true) ?

                            <CasinoAlertModal
                                onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
                            : null



                    }

                    {ResultModel &&
                        ResultModel === true ? (
                        <ResultModelBmx
                            handleClose={this.handleCloseResult}
                            name={name ? name : "32 Card B"}
                            shortName={shortName ? shortName : "card32eu"}
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
                        <Col xs={24} sm={24} md={24} lg={15} xl={13} xxl={10}>
                            <PageHeaderTheme
                                PageTitle={name ? name : "20-20 Teenpatti"}
                                ruleImage={"/assets/images/rulesImage/tp-rules.webp"}
                                t1={t1}
                            />
                            {/* 
                            <PageHeaderTheme
                                PageTitle={name ? name : "32 Card B"}
                                ruleImage={"/assets/images/rulesImage/rulesImage/tp-rules.webp"}
                                t1={t1}
                            /> */}

                            {/* <div className="lg:flex w-full h-screen p-1.5 space-x-1.5 "> */}
                            {/* <div className="lg:w-[41%] md:w-full mx-auto"> */}
                            <Card className="ant-card gx-bg-dark gx-text-white gx-my-0  ant-space-align-center gx-position-relative">
                                {/* <div className="bg-black flex justify-between w-full relative md:text-sm text-[10px] xl:h-[400px] md:h-[300px] h-[200px]"> */}
                                <iframe src={tvUrl ? tvUrl : null} title=" "
                                    className="gx-w-100 relative w-full"
                                    style={{ height: "350px" }}

                                />


                                <div className=" gx-position-absolute"
                                    style={{ bottom: "16px", right: "16px" }}>
                                    <FlipCountdown
                                        titlePosition='hidden'
                                        hideYear
                                        hideMonth
                                        hideDay
                                        hideHour
                                        hideMinute
                                        endAtZero
                                        size='small'
                                        endAt={new Date(Date.now() + 1000 * (t1 && t1.autotime ? t1.autotime : null)).toUTCString()}
                                    />
                                </div>

                                <div className="gx-w-100 gx-px-2 gx-py-3 gx-position-absolute gx-top-0 gx-left-0">
                                    <Row gutter={[16, 8]} className="gx-pt-2">
                                        <Col className="gx-text-black gx-font-semibold px-1 lg:py-[2px] py-0 tracking-wide gx-uppercase text-[14px]">Cards</Col>
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong>
                                                Player 8 :
                                                <span className="gx-text-yellow">{t1 && t1.C1 ? t1.C1 : null}</span>
                                                <div className="flex space-x-2 justify-start">
                                                    {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 gx-border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[20] && resultCard[20] !== '1' ? (<img src={`/cards/${resultCard[20]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[24] && resultCard[24] !== '1' ? (<img src={`/cards/${resultCard[24]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[28] && resultCard[28] !== '1' ? (<img src={`/cards/${resultCard[28]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[32] && resultCard[32] !== '1' ? (<img src={`/cards/${resultCard[32]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                </div>
                                            </Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong>
                                                Player 9 :
                                                <span className="gx-text-yellow">{t1 && t1.C2 ? t1.C2 : null}</span>

                                                <div className="flex space-x-2 justify-start">
                                                    {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[17] && resultCard[17] !== '1' ? (<img src={`/cards/${resultCard[17]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[21] && resultCard[21] !== '1' ? (<img src={`/cards/${resultCard[21]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[25] && resultCard[25] !== '1' ? (<img src={`/cards/${resultCard[25]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[29] && resultCard[29] !== '1' ? (<img src={`/cards/${resultCard[29]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[33] && resultCard[33] !== '1' ? (<img src={`/cards/${resultCard[33]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                </div>
                                            </Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong>
                                                Player 10 :
                                                <span className="gx-text-yellow">{t1 && t1.C3 ? t1.C3 : null}</span>


                                                <div className="flex space-x-2 justify-start">
                                                    {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[18] && resultCard[18] !== '1' ? (<img src={`/cards/${resultCard[18]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[22] && resultCard[22] !== '1' ? (<img src={`/cards/${resultCard[22]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[26] && resultCard[26] !== '1' ? (<img src={`/cards/${resultCard[26]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[30] && resultCard[30] !== '1' ? (<img src={`/cards/${resultCard[30]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[34] && resultCard[34] !== '1' ? (<img src={`/cards/${resultCard[34]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                </div>
                                            </Text>
                                        </Col>

                                        <Col span={24}>
                                            <Text className="gx-text-white" strong>
                                                Player 11 :
                                                <span className="gx-text-yellow">{t1.C4}</span>



                                                <div className="flex space-x-2 justify-start">
                                                    {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[19] && resultCard[19] !== '1' ? (<img src={`/cards/${resultCard[19]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[23] && resultCard[23] !== '1' ? (<img src={`/cards/${resultCard[23]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[27] && resultCard[27] !== '1' ? (<img src={`/cards/${resultCard[27]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[31] && resultCard[31] !== '1' ? (<img src={`/cards/${resultCard[31]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    {resultCard && resultCard[35] && resultCard[35] !== '1' ? (<img src={`/cards/${resultCard[35]}.png`} alt="card" style={{ height: "3rem" }} className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                </div>
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                                {/* <div className="gx-absolute gx-top-0 gx-left-0 gx-w-full">
                                            <div className="text-white font-semibold px-1 lg:py-[2px] py-0 tracking-wide uppercase text-[14px]">Cards</div>
                                            <div className="w-full px-1 lg:space-y-1 space-y-0">
                                                <div>
                                                    <div className={`font-semibold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4 ? 'text-green-500' : 'text-white'}`}>
                                                        Player 8 :
                                                        <span className="gx-text-yellow">{t1 && t1.C1 ? t1.C1 : null}</span>
                                                    </div>
                                                    <div className="flex space-x-2 justify-start">
                                                        {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[20] && resultCard[20] !== '1' ? (<img src={`/cards/${resultCard[20]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[24] && resultCard[24] !== '1' ? (<img src={`/cards/${resultCard[24]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[28] && resultCard[28] !== '1' ? (<img src={`/cards/${resultCard[28]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[32] && resultCard[32] !== '1' ? (<img src={`/cards/${resultCard[32]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className={` ${getColorClass(t1.C2)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                                        Player 9 :
                                                        <span className="gx-text-yellow">{t1 && t1.C2 ? t1.C2 : null}</span>
                                                    </div>
                                                    <div className="flex space-x-2 justify-start">
                                                        {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[17] && resultCard[17] !== '1' ? (<img src={`/cards/${resultCard[17]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[21] && resultCard[21] !== '1' ? (<img src={`/cards/${resultCard[21]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[25] && resultCard[25] !== '1' ? (<img src={`/cards/${resultCard[25]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[29] && resultCard[29] !== '1' ? (<img src={`/cards/${resultCard[29]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[33] && resultCard[33] !== '1' ? (<img src={`/cards/${resultCard[33]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className={` ${getColorClass(t1.C3)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                                        Player 10 :
                                                        <span className="gx-text-yellow">{t1 && t1.C3 ? t1.C3 : null}</span>
                                                    </div>
                                                    <div className="flex space-x-2 justify-start">
                                                        {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[18] && resultCard[18] !== '1' ? (<img src={`/cards/${resultCard[18]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[22] && resultCard[22] !== '1' ? (<img src={`/cards/${resultCard[22]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[26] && resultCard[26] !== '1' ? (<img src={`/cards/${resultCard[26]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[30] && resultCard[30] !== '1' ? (<img src={`/cards/${resultCard[30]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[34] && resultCard[34] !== '1' ? (<img src={`/cards/${resultCard[34]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className={` ${getColorClass(t1.C4)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                                        Player 11 :
                                                        <span className="gx-text-yellow">{t1.C4}</span>
                                                    </div>
                                                    <div className="flex space-x-2 justify-start">
                                                        {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[19] && resultCard[19] !== '1' ? (<img src={`/cards/${resultCard[19]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[23] && resultCard[23] !== '1' ? (<img src={`/cards/${resultCard[23]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[27] && resultCard[27] !== '1' ? (<img src={`/cards/${resultCard[27]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[31] && resultCard[31] !== '1' ? (<img src={`/cards/${resultCard[31]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                        {resultCard && resultCard[35] && resultCard[35] !== '1' ? (<img src={`/cards/${resultCard[35]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                {/* </div> */}
                            </Card>
                            <Row className="gx-mx-0">
                                <Col className="gx-px-0" xs={24} sm={24}>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-fs-sm gx-border-bottom">
                                            <Col span={12} className=" gx-py-2 gx-text-left gx-border gx-border-light" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                                                {/* MIN: {minStake ? minStake : "100"}&nbsp;
                                                    MAX: {maxStake ? maxStake : "10000"} */}
                                            </Col>
                                            <Col span={6} className="gx-py-2 gx-bg-grey  gx-border gx-border-light" >
                                                <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">Back</Text>
                                            </Col>
                                            <Col span={6} className="gx-py-2 gx-bg-grey gx-border gx-border-light" style={{ backgroundColor: '#FAA9BA' }}>
                                                <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">Lay</Text>
                                            </Col>
                                        </Row>

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-h-100 gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">
                                                        <div className=" gx-text-center">{Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : "Player 8"}</div>
                                                        {posArray[Player8.sid] && <div className={posArray[Player8.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Player8.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player8 && Player8.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player8, odds: Player8.b1 - oddsDifference, nat: Player8.nat ? Player8.nat : Player8.nation, type: "Yes", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player8 && Player8.b1 ? (Player8.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player8 && Player8.bs1 ? (Player8.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative   gx-bg-flex gx-justify-content-center gx-align-items-center">

                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player8 && Player8.b1 ? (Player8.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player8 && Player8.bs1 ? (Player8.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player8 && Player8.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player8, odds: Player8.l1, nat: Player8.nat ? Player8.nat : Player8.nation, type: "No", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player8 && Player8.l1 ? (Player8.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player8 && Player8.ls1 ? (Player8.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player8 && Player8.l1 ? (Player8.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player8 && Player8.ls1 ? (Player8.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center  gx-h-100">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-align-items-center gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player9 && Player9.nat ? Player9.nat : Player9.nation ? Player9.nation : "Player 9"}</div>

                                                        {posArray[Player9.sid] && <div className={posArray[Player9.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Player9.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player9 && Player9.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player9, odds: Player9.b1 - oddsDifference, nat: Player9.nat ? Player9.nat : Player9.nation, type: "Yes", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player9 && Player9.b1 ? (Player9.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player9 && Player9.bs1 ? (Player9.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player9 && Player9.b1 ? (Player9.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player9 && Player9.bs1 ? (Player9.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player9 && Player9.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player9, odds: Player9.l1, nat: Player9.nat ? Player9.nat : Player9.nation, type: "No", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9 && Player9.l1 ? (Player9.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player9 && Player9.ls1 ? (Player9.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9 && Player9.l1 ? (Player9.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player9 && Player9.ls1 ? (Player9.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}</div>

                                                        {posArray[Player10.sid] && <div className={posArray[Player10.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Player10.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player10 && Player10.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player10, odds: Player10.b1 - oddsDifference, nat: Player10.nat ? Player10.nat : Player10.nation, type: "Yes", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player10 && Player10.b1 ? (Player10.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player10 && Player10.bs1 ? (Player10.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player10 && Player10.b1 ? (Player10.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player10 && Player10.bs1 ? (Player10.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player10 && Player10.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player10, odds: Player10.l1, nat: Player10.nat ? Player10.nat : Player10.nation, type: "No", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">  <div className="text-[14px] font-[600]">{Player10 && Player10.l1 ? (Player10.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player10 && Player10.ls1 ? (Player10.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">  <div className="text-[14px] font-[600]">{Player10 && Player10.l1 ? (Player10.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player10 && Player10.ls1 ? (Player10.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player11 && Player11.nat ? Player11.nat : Player11.nation ? Player11.nation : "Player 11"}</div>

                                                        {posArray[Player11.sid] && <div className={posArray[Player11.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Player11.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player11 && Player11.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player11, odds: Player11.b1 - oddsDifference, nat: Player11.nat ? Player11.nat : Player11.nation, type: "Yes", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player11 && Player11.b1 ? (Player11.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player11 && Player11.bs1 ? (Player11.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player11 && Player11.b1 ? (Player11.b1) - oddsDifference : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player11 && Player11.bs1 ? (Player11.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player11 && Player11.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player11, odds: Player11.l1, nat: Player11.nat ? Player11.nat : Player11.nation, type: "No", betFor: "card32eu" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">     <div className="text-[14px] font-[600]">{Player11 && Player11.l1 ? (Player11.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player11 && Player11.ls1 ? (Player11.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">     <div className="text-[14px] font-[600]">{Player11 && Player11.l1 ? (Player11.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-[500]">{Player11 && Player11.ls1 ? (Player11.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>
                                </Col>

                                {/* <Col className="gx-px-0" xs={24} sm={12}>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border gx-border-light">
                                        <Row className="gx-text-center gx-fs-sm gx-border-bottom gx-gap-1">
                                            <Col span={12} className="gx-border gx-border-light gx-py-2 gx-text-left" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                                            </Col>
                                            <Col span={6} className="gx-py-2 gx-bg-grey ">
                                                <Text strong className="gx-text-white gx-text-nowrap gx-text-uppercase  gx-font-weight-semi-bold">Odd</Text>
                                            </Col>
                                            <Col span={6} className="gx-py-2 gx-bg-grey ">
                                                <Text strong className="gx-bg-grey gx-text-nowrap gx-text-white  gx-text-uppercase gx-font-weight-semi-bold">Even</Text>
                                            </Col>
                                        </Row>

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : "Player 8"}</div>

                                                        {posArray[Player8Odd.sid] && <div className={posArray[Player8Odd.sid] < 0 ? "gx-text-red" : "gx-text-green-0 gx-w-100"}>
                                                            {posArray[Player8Odd.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player8Odd && Player8Odd.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player8Odd, odds: Player8Odd.b1 - oddsDifference, nat: Player8Odd.nat ? Player8Odd.nat : Player8Odd.nation, type: "Yes", betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player8Odd && Player8Odd.b1 ? (Player8Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player8Odd && Player8Odd.bs1 ? (Player8Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black">   <div className="text-[14px] font-[600]">{Player8Odd && Player8Odd.b1 ? (Player8Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player8Odd && Player8Odd.bs1 ? (Player8Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player8Even && Player8Even.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player8Even, type: "Yes", odds: Player8Even.b1 - oddsDifference, nat: Player8Even.nat ? Player8Even.nat : Player8Even.nation, betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player8Even && Player8Even.b1 ? (Player8Even.b1) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player8Even && Player8Even.bs1 ? (Player8Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player8Even && Player8Even.b1 ? (Player8Even.b1) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player8Even && Player8Even.bs1 ? (Player8Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}
                                        </Row>
                                    </Card>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player9 && Player9.nat ? Player9.nat : Player9.nation ? Player9.nation : "Player 9"}</div>

                                                        {posArray[Player9Odd.sid] && <div className={posArray[Player9Odd.sid] < 0 ? "gx-text-red" : "gx-text-green-0 gx-w-100"}>
                                                            {posArray[Player9Odd.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player9Odd && Player9Odd.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player9Odd, odds: Player9Odd.b1 - oddsDifference, nat: Player9Odd.nat ? Player9Odd.nat : Player9Odd.nation, type: "Yes", betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9Odd && Player9Odd.b1 ? (Player9Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player9Odd && Player9Odd.bs1 ? (Player9Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9Odd && Player9Odd.b1 ? (Player9Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player9Odd && Player9Odd.bs1 ? (Player9Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player9Even && Player9Even.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player9Even, type: "Yes", odds: Player9Even.b1 - oddsDifference, nat: Player9Even.nat ? Player9Even.nat : Player9Even.nation, betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9Even && Player9Even.b1 ? (Player9Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player9Even && Player9Even.bs1 ? (Player9Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player9Even && Player9Even.b1 ? (Player9Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player9Even && Player9Even.bs1 ? (Player9Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}
                                        </Row>
                                    </Card>

                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}</div>

                                                        {posArray[Player10Odd.sid] && <div className={posArray[Player10Odd.sid] < 0 ? "gx-text-red" : "gx-text-green-0 gx-w-100"}>
                                                            {posArray[Player10Odd.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player10Odd && Player10Odd.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player10Odd, odds: Player10Odd.b1 - oddsDifference, nat: Player10Odd.nat ? Player10Odd.nat : Player10Odd.nation, type: "Yes", betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player10Odd && Player10Odd.b1 ? (Player10Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player10Odd && Player10Odd.bs1 ? (Player10Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player10Odd && Player10Odd.b1 ? (Player10Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player10Odd && Player10Odd.bs1 ? (Player10Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player10Even && Player10Even.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player10Even, type: "Yes", odds: Player10Even.b1 - oddsDifference, nat: Player10Even.nat ? Player10Even.nat : Player10Even.nation, betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player10Even && Player10Even.b1 ? (Player10Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player10Even && Player10Even.bs1 ? (Player10Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player10Even && Player10Even.b1 ? (Player10Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player10Even && Player10Even.bs1 ? (Player10Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}
                                        </Row>
                                    </Card>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ backgroundColor: "rgba(0,0,0,0.3)", textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Player11 && Player11.nat ? Player11.nat : Player11.nation ? Player11.nation : "Player 11"}</div>

                                                        {posArray[Player11Odd.sid] && <div className={posArray[Player11Odd.sid] < 0 ? "gx-text-red" : "gx-text-green-0 gx-w-100"}>
                                                            {posArray[Player11Odd.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Player11Odd && Player11Odd.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player11Odd, odds: Player11Odd.b1 - oddsDifference, nat: Player11Odd.nat ? Player11Odd.nat : Player11Odd.nation, type: "Yes", betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player11Odd && Player11Odd.b1 ? (Player11Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player11Odd && Player11Odd.bs1 ? (Player11Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{Player11Odd && Player11Odd.b1 ? (Player11Odd.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player11Odd && Player11Odd.bs1 ? (Player11Odd.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {Player11Even && Player11Even.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Player11Even, type: "Yes", odds: Player11Even.b1, nat: Player11Even.nat ? Player11Even.nat : Player11Even.nation, betFor: "oddEven" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player11Even && Player11Even.b1 ? (Player11Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player11Even && Player11Even.bs1 ? (Player11Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{Player11Even && Player11Even.b1 ? (Player11Even.b1 - oddsDifference) : "-"}</div>
                                                                <div className="text-[10px] gx-text-nowrap font-normal">{Player11Even && Player11Even.bs1 ? (Player11Even.bs1) : "-"}</div></Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}
                                        </Row>
                                    </Card>
                                </Col> */}
                            </Row>


                            <Row className="gx-mx-0 gx-my-1">
                                <Col className="gx-px-0" xs={24} sm={24}>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border" >
                                        <Row className="gx-text-center gx-fs-sm gx-border-bottom">
                                            <Col span={12} className="gx-py-2 gx-text-left" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                                                {/* MIN: {minStake ? minStake : "100"}&nbsp;
                                                    MAX: {maxStake ? maxStake : "10000"} */}
                                            </Col>
                                            <Col span={6} className="gx-py-2  gx-bg-grey gx-border gx-border-white" style={{ backgroundColor: '#72BBEF' }}>
                                                <Text strong className="gx-text-white gx-text-nowrap gx-text-uppercase gx-font-weight-semi-bold">Back</Text>
                                            </Col>
                                            <Col span={6} className="gx-py-2 gx-bg-grey gx-border gx-border-white" style={{ backgroundColor: '#FAA9BA' }}>
                                                <Text strong className="gx-text-white gx-text-nowrap gx-text-uppercase gx-font-weight-semi-bold">Lay</Text>
                                            </Col>
                                        </Row>

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{CardBlack && CardBlack.nat ? CardBlack.nat ? CardBlack.nat : CardBlack.nation : "Any Three Card Black"}</div>

                                                        {posArray[CardBlack.sid] && <div className={posArray[CardBlack.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[CardBlack.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {CardBlack && CardBlack.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: CardBlack, type: "Yes", odds: CardBlack.b1 - oddsDifference, nat: CardBlack.nat ? CardBlack.nat : CardBlack.nation, type: "Yes", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{CardBlack && CardBlack.b1 ? (CardBlack.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardBlack && CardBlack.bs1 ? (CardBlack.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{CardBlack && CardBlack.b1 ? (CardBlack.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardBlack && CardBlack.bs1 ? (CardBlack.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {CardBlack && CardBlack.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: CardBlack, odds: CardBlack.l1, nat: CardBlack.nat ? CardBlack.nat : CardBlack.nation, type: "No", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{CardBlack && CardBlack.l1 ? (CardBlack.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardBlack && CardBlack.ls1 ? (CardBlack.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{CardBlack && CardBlack.l1 ? (CardBlack.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardBlack && CardBlack.ls1 ? (CardBlack.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>

                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{CardRed && CardRed.nat ? CardRed.nat : CardRed.nation ? CardRed.nation : "Any Three Card Red"}</div>

                                                        {posArray[CardRed.sid] && <div className={posArray[CardRed.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[CardRed.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {CardRed && CardRed.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: CardRed, type: "Yes", odds: CardRed.b1 - oddsDifference, nat: CardRed.nat ? CardRed.nat : CardRed.nation, type: "Yes", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{CardRed && CardRed.b1 ? (CardRed.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardRed && CardRed.bs1 ? (CardRed.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{CardRed && CardRed.b1 ? (CardRed.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardRed && CardRed.bs1 ? (CardRed.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {CardRed && CardRed.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: CardRed, type: "Yes", odds: CardRed.l1, nat: CardRed.nat ? CardRed.nat : CardRed.nation, type: "No", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{CardRed && CardRed.l1 ? (CardRed.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardRed && CardRed.ls1 ? (CardRed.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"><div className="text-[14px] font-[600]">{CardRed && CardRed.l1 ? (CardRed.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{CardRed && CardRed.ls1 ? (CardRed.ls1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>


                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{TwoRed && TwoRed.nat ? TwoRed.nat : TwoRed.nation ? TwoRed.nation : "Two Black Two Red"}</div>

                                                        {posArray[TwoRed.sid] && <div className={posArray[TwoRed.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[TwoRed.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {TwoRed && TwoRed.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: TwoRed, type: "Yes", odds: TwoRed.b1 - oddsDifference, nat: TwoRed.nat ? TwoRed.nat : TwoRed.nation, type: "Yes", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-nowrap gx-text-black"> <div className="text-[14px] font-[600]">{TwoRed && TwoRed.b1 ? (TwoRed.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{TwoRed && TwoRed.bs1 ? (TwoRed.bs1 / 100).toFixed(2) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-black"> <div className="text-[14px] font-[600]">{TwoRed && TwoRed.b1 ? (TwoRed.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{TwoRed && TwoRed.bs1 ? (TwoRed.bs1 / 100).toFixed(2) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}


                                            {TwoRed && TwoRed.gstatus === 'ACTIVE' ? (
                                                <Col span={6} className="gx-position-relative" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: TwoRed, type: "Yes", odds: TwoRed.l1, nat: TwoRed.nat ? TwoRed.nat : TwoRed.nation, type: "No", betFor: "anyThree" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-black"><div className="text-[14px] font-[600]">{TwoRed && TwoRed.l1 ? (TwoRed.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{TwoRed && TwoRed.ls1 ? (TwoRed.ls1 / 100).toFixed(2) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={6} style={{ backgroundColor: '#FAA9BA' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-black"><div className="text-[14px] font-[600]">{TwoRed && TwoRed.l1 ? (TwoRed.l1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{TwoRed && TwoRed.ls1 ? (TwoRed.ls1 / 100).toFixed(2) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}

                                        </Row>
                                    </Card>
                                </Col>

                                <Col className="gx-px-0" xl={24} lg={24} md={24} xs={24}>
                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-fs-sm gx-border-bottom">
                                            <Col span={12} className="gx-border gx-border-light gx-py-2 gx-text-left" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                                                {/* MIN: {minStake ? minStake : "100"}&nbsp;
                                                    MAX: {maxStake ? maxStake : "10000"} */}
                                            </Col>
                                            <Col span={12} className="gx-py-2 gx-bg-grey gx-text-white gx-border gx-border-light" style={{ backgroundColor: '#72BBEF' }}>
                                                <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">Back</Text>
                                            </Col>
                                            {/* <Col span={6} className="gx-py-2" style={{ backgroundColor: '#FAA9BA' }}>
                                                    <Text strong className="gx-text-black gx-text-uppercase gx-font-weight-semi-bold">Lay</Text>
                                                </Col> */}
                                        </Row>

                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Total8and9 && Total8and9.nat ? Total8and9.nat : Total8and9.nation ? Total8and9.nation : "8 & 9 Total"}</div>

                                                        {posArray[Total8and9.sid] && <div className={posArray[Total8and9.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Total8and9.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Total8and9 && Total8and9.gstatus === 'ACTIVE' ? (
                                                <Col span={12} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Total8and9, type: "Yes", odds: Total8and9.b1 - oddsDifference, nat: Total8and9.nat ? Total8and9.nat : Total8and9.nation, type: "Yes", betFor: "total" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-black">  <div className="text-[14px] font-[600]">{Total8and9 && Total8and9.b1 ? (Total8and9.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{Total8and9 && Total8and9.bs1 ? (Total8and9.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={12} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-black">  <div className="text-[14px] font-[600]">{Total8and9 && Total8and9.b1 ? (Total8and9.b1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{Total8and9 && Total8and9.bs1 ? (Total8and9.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}




                                        </Row>
                                    </Card>

                                    <Card bordered className="gx-bg-white gx-text-white gx-px-3 gx-my-0 gx-border">
                                        <Row className="gx-text-center gx-border-bottom">
                                            <Col span={12} className="">
                                                <Row className="gx-text-center gx-h-100 ">
                                                    <Col span={24} style={{ textWrap: "nowrap" }} className="gx-text-capitalize gx-d-flex  gx-text-black gx-font-weight-semi-bold gx-py-2   ">

                                                        <div className=" gx-text-center">{Total10and11 && Total10and11.nat ? Total10and11.nat : Total10and11.nation ? Total10and11.nation : "10 & 11 Total"}</div>

                                                        {posArray[Total10and11.sid] && <div className={posArray[Total10and11.sid] < 0 ? "gx-text-red gx-w-100 gx-text-right" : "gx-text-green-0 gx-w-100 gx-text-right"}>
                                                            {posArray[Total10and11.sid]}
                                                        </div>}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {Total10and11 && Total10and11.gstatus === 'ACTIVE' ? (
                                                <Col span={12} className="gx-position-relative " style={{ backgroundColor: '#72BBEF' }}>
                                                    <div className="gx-flex-column  gx-justify-center gx-align-items-center gx-cursor-pointer ">
                                                        <div className="gx-text-center" onClick={() => this.handleBackOpen({ data: Total10and11, type: "Yes", odds: Total10and11.b1 - oddsDifference, nat: Total10and11.nat ? Total10and11.nat : Total10and11.nation, type: "Yes", betFor: "total" }, this.section1Ref)}>
                                                            <Text strong className="gx-text-18 gx-text-black"><div className="text-[14px] font-[600]">{Total10and11 && Total10and11.b1 ? (Total10and11.b1 - oddsDifference) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{Total10and11 && Total10and11.bs1 ? (Total10and11.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) :
                                                (
                                                    <Col span={12} style={{ backgroundColor: '#72BBEF' }} className="gx-position-relative gx-bg-flex gx-justify-content-center gx-align-items-center">
                                                        <div className="gx-text-center">
                                                            <Text strong className="gx-text-18 gx-text-black"><div className="text-[14px] font-[600]">{Total10and11 && Total10and11.b1 ? (Total10and11.b1) : "-"}</div>
                                                                {/* <div className="text-[10px] gx-text-nowrap font-normal">{Total10and11 && Total10and11.bs1 ? (Total10and11.bs1) : "-"}</div> */}
                                                            </Text>
                                                        </div>
                                                        <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                                            <div className="gx-text-center">
                                                                <FaLock style={{ fontSize: 16, color: 'white' }} />
                                                            </div>
                                                        </div>
                                                    </Col>)}




                                        </Row>
                                    </Card>
                                </Col>
                            </Row>



                            <div className="w-full space-y-3">





                                <div className="gx-position-relative">
                                    <div className="gx-d-flex gx-justify-content-between gx-align-items-center gx-text-center">
                                        <p></p>
                                        <p className="gx-mb-0">{9.5 - oddsDifference}</p>
                                        <p></p>
                                    </div>
                                    <Row className="gx-w-100 gx-mx-0 gx-d-flex gx-justify-content-between">
                                        <Col className="" style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single1, type: "Yes", odds: 9.5, nat: '1 Single', sid: Single1.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">1</p>
                                            </div>
                                            <div className={`${posArray[Single1.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single1.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col className="" style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single2, type: "Yes", odds: 9.5, nat: '2 Single', sid: Single2.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">2</p>
                                            </div>
                                            <div className={`${posArray[Single2.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single2.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col className="" style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single3, type: "Yes", odds: 9.5, nat: '3 Single', sid: Single3.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">3</p>
                                            </div>
                                            <div className={`${posArray[Single3.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single3.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col className="" style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single4, type: "Yes", odds: 9.5, nat: '4 Single', sid: Single4.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">4</p>
                                            </div>
                                            <div className={`${posArray[Single4.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single4.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col className="" style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single5, type: "Yes", odds: 9.5, nat: '5 Single', sid: Single5.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">5</p>
                                            </div>
                                            <div className={`${posArray[Single5.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single5.sid] ?? 0.00}</div>
                                        </Col>
                                    </Row>
                                    <Row className="gx-w-100 gx-mx-0 gx-d-flex gx-justify-content-between">

                                        <Col style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single6, type: "Yes", odds: 9.5, nat: '6 Single', sid: Single6.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">6</p>
                                            </div>
                                            <div className={`${posArray[Single6.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single6.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single7, type: "Yes", odds: 9.5, nat: '7 Single', sid: Single7.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">7</p>
                                            </div>
                                            <div className={`${posArray[Single7.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single7.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single8, type: "Yes", odds: 9.5, nat: '8 Single', sid: Single8.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">8</p>
                                            </div>
                                            <div className={`${posArray[Single8.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single8.sid] ?? 0.00}</div>
                                        </Col>
                                        <Col style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single9, type: "Yes", odds: 9.5, nat: '9 Single', sid: Single9.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">9</p>
                                            </div>
                                            <div className={`${posArray[Single9.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single9.sid] ?? 0.00}</div>
                                        </Col>

                                        <Col style={{ width: '20%', border: '1px solid #eeeeee' }}>
                                            <div onClick={() => this.handleBackOpen({ data: Single0, type: "Yes", odds: 9.5, nat: '0 Single', sid: Single0.sid, betFor: "number" })} className="gx-bg-grey gx-text-white gx-d-flex gx-justify-content-center gx-align-items-center gx-pointer gx-p-5">
                                                <p className="gx-fs-xxxl gx-font-weight-semi-bold gx-mb-0">0</p>
                                            </div>
                                            <div className={`${posArray[Single0.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} gx-py-1 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-lg gx-font-weifht-semi-bold`} > {posArray[Single0.sid] ?? 0.00}</div>
                                        </Col>
                                    </Row>
                                    {Single1 && Single1.gstatus === 'ACTIVE' ? null : <div style={{ zIndex: "100", backgroundColor: "rgba(0,0,0,0.5)" }} className="gx-flex-column gx-h-100 gx-left-0 gx-top-0  gx-w-100 gx-position-absolute  gx-justify-content-center gx-align-items-center gx-cursor-pointer gx-py-2">
                                        <div className="gx-text-center">
                                            <FaLock style={{ fontSize: 16, color: 'white' }} />
                                        </div>
                                    </div>}
                                    {/* {ENG && ENG.gstatus === '1' ? null : <BetLockedRounded />} */}
                                </div>





                                {/* <div className="relative py-1">
                                        <div className="flex justify-between items-center text-center py-1">
                                            <p></p>
                                            <p className="text-[14px] font-medium gray-text">{9.5 - oddsDifference}</p>
                                            <p></p>
                                        </div>

                                        <div class="w-full grid grid-cols-5 divide-x divide-y py-1">
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single1, type: "Yes", odds: 9.5, nat: '1 Single', sid: 15 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">1</p>
                                                </div>
                                                <div className={`${posArray[1] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[1] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single2, type: "Yes", odds: 9.5, nat: '2 Single', sid: 16 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">2</p>
                                                </div>
                                                <div className={`${posArray[2] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[2] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single3, type: "Yes", odds: 9.5, nat: '3 Single', sid: 17 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">3</p>
                                                </div>
                                                <div className={`${posArray[3] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[3] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single4, type: "Yes", odds: 9.5, nat: '4 Single', sid: 18 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">4</p>
                                                </div>
                                                <div className={`${posArray[4] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[4] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single5, type: "Yes", odds: 9.5, nat: '5 Single', sid: 19 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">5</p>
                                                </div>
                                                <div className={`${posArray[5] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[5] ?? 0.00}</div>
                                            </div>
                                        </div>

                                        <div class="w-full grid grid-cols-5  divide-x divide-y py-1">

                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single6, type: "Yes", odds: 9.5, nat: '6 Single', sid: 20 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">6</p>
                                                </div>
                                                <div className={`${posArray[6] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[6] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single7, type: "Yes", odds: 9.5, nat: '7 Single', sid: 21 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">7</p>
                                                </div>
                                                <div className={`${posArray[7] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[7] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single8, type: "Yes", odds: 9.5, nat: '8 Single', sid: 22 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">8</p>
                                                </div>
                                                <div className={`${posArray[8] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[8] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single9, type: "Yes", odds: 9.5, nat: '9 Single', sid: 23 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">9</p>
                                                </div>
                                                <div className={`${posArray[9] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[9] ?? 0.00}</div>
                                            </div>
                                            <div>
                                                <div onClick={() => this.handleBackOpen({ data: Single0, type: "Yes", odds: 9.5, nat: '0 Single', sid: 24 })} class=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                    <p className="text-[40px] font-semibold">0</p>
                                                </div>
                                                <div className={`${posArray[0] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[0] ?? 0.00}</div>
                                            </div>
                                        </div>
                                    </div> */}

                            </div>

                            {/* {LoadingBet === true ?
                                    <div className='border-[2px] border-[#C99D1E] bg-[#f9f9f9] p-[5px]  lg:block hidden rounded-[5px]' >
                                        <div className="">
                                            <div className='flex justify-between items-center'>
                                                <div className="text-black text-[20px] font-bold text-center w-full whitespace-nowrap">{this.state.betSlipData && this.state.betSlipData.data.nat ? this.state.betSlipData.data.nat : null} :</div>
                                                <span className='w-full text-left'>
                                                    RATE : {this.state.count}
                                                </span>
                                                <div className='bg-black rounded-full white-text p-2'>
                                                    <CountdownCircleTimer
                                                        isPlaying
                                                        duration={7}
                                                        colors={['#000000']}
                                                        colorsTime={[7]}
                                                        size={20}
                                                        strokeWidth={0}
                                                        className="bg-white p-0"
                                                    >
                                                        {({ remainingTime }) => remainingTime === 7 ? time : time}

                                                    </CountdownCircleTimer>
                                                </div>
                                            </div>

                                            <div className='flex justify-center items-center space-x-2'><span>AMOUNT</span>
                                                <input ref={this.inputRef} type="number" className="px-1 w-24 border-2 border-black" placeholder="0" />
                                                <div className='relative flex justify-center'>
                                                    <button className="bg-[#3A61A2] px-3 py-1 uppercase rounded-full text-white text-[13px] tracking-widest flex justify-center items-center">Done
                                                        <button className="w-full white-text px-3 py-2 h-4 flex justify-center items-center space-x-1 cursor-pointer border-[#d4d3e8] rounded-none font-extrabold text-sm" type="submit">
                                                            <div className=" flex items-center justify-center absolute bg-transparent">
                                                                <div className="flex items-center justify-center bg-transparent w-full">
                                                                    <div className="w-5 h-5 rounded-full animate-spin 
                          border-[5px] border-solid border-[#ffffff] border-t-transparent"></div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <div className='row '>
                                                {betChipsData && betChipsData.length > 0 ? betChipsData.map((element, index) => (
                                                    <div key={index} className="col-lg-3 col-md-2 col-4 py-2 ">
                                                        <span onClick={() => this.updateStackOnclick(element)} className='bg-[#61ACDE] p-1.5 px-4 text-white md:font-bold font-medium rounded-md cursor-pointer' key={index}>{element}</span>
                                                    </div>
                                                )) : null}

                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center space-x-1'>
                                            <button className="bg-red-700 text-white text-[15px] rounded-[2px] h-[30px] text-center w-full px-2" >Clear Input</button>
                                            <button className="bg-red-700 text-white text-[15px] rounded-[2px] h-[30px] text-center w-full px-2" onClick={() => this.handleClose()}>Clear Close</button>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        {backBetModal === true ?
                                            <div className='py-1' ref={this.section1Ref} id="section1" >
                                                <div className='border-[2px] border-[#C99D1E] bg-[#f9f9f9] p-[5px]  lg:block hidden rounded-[5px]' >
                                                    <div className="">
                                                        <div className='flex justify-between items-center'>
                                                            <div className="text-black text-[20px] font-bold text-center w-full whitespace-nowrap">{this.state.betSlipData && this.state.betSlipData.data.nat ? this.state.betSlipData.data.nat : null} :</div>
                                                            <span className='w-full text-left'>
                                                                RATE : {this.state.count}
                                                            </span>
                                                            <div className='bg-black rounded-full white-text p-2'>
                                                                <CountdownCircleTimer
                                                                    isPlaying
                                                                    duration={7}
                                                                    colors={['#000000']}
                                                                    colorsTime={[7]}
                                                                    size={20}
                                                                    strokeWidth={0}
                                                                    className="bg-white p-0"
                                                                >
                                                                    {({ remainingTime }) => remainingTime === 7 ? 7 : time}

                                                                </CountdownCircleTimer>
                                                            </div>
                                                        </div>

                                                        <div className='flex justify-center items-center space-x-2'><span>AMOUNT</span>
                                                            <input ref={this.inputRef} type="number" className="px-1 w-24 border-2 border-black" placeholder="0" value={this.state.betSlipData.stake} onChange={this.updateStake} />
                                                            <div className=' flex justify-center'>
                                                                <button onClick={() => this.placeBet()} className="bg-[#3A61A2] px-5 py-1 uppercase rounded-full text-white text-[13px] tracking-widest">Done
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='flex justify-center items-center'>
                                                        <div className='row '>
                                                            {betChipsData && betChipsData.length > 0 ? betChipsData.map((element, index) => (
                                                                <div key={index} className="col-lg-3 col-md-2 col-4 py-2 ">
                                                                    <span onClick={() => this.updateStackOnclick(element)} className='bg-[#61ACDE] p-1.5 px-4 text-white md:font-bold font-medium rounded-md cursor-pointer' key={index}>{element}</span>
                                                                </div>
                                                            )) : null}

                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center space-x-1'>
                                                        <button className="bg-red-700 text-white text-[15px] rounded-[2px] h-[30px] text-center w-full px-2" onClick={() => this.updateStackOnclick("0")}>Clear Input</button>
                                                        <button className="bg-red-700 text-white text-[15px] rounded-[2px] h-[30px] text-center w-full px-2" onClick={() => this.handleClose()}>Clear Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                    </>}

                                {LoadingBet === true ?
                                    <>
                                        <div className='block lg:hidden bg-[#E9E9E9]'>
                                            <div className='flex justify-between items-center py-1 whitespace-nowrap space-x-4'>
                                                <div className='text-sm text-black/30 font-bold pl-2'>Amount</div>
                                                <div className='border-[1px] border-gray-400 w-1/2'>
                                                    <input type="number" className=" w-full text-black/30 bg-[#E9E9E9] focus:outline-none pointer-events-none px-1 text-base " placeholder="0" value={this.state.betSlipData.stake} />

                                                </div>
                                                <div className='flex justify-end items-center'>
                                                    <div className='bg-black white-text px-2'>
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={7}
                                                            colors={['#000000']}
                                                            colorsTime={[7]}
                                                            size={20}
                                                            strokeWidth={0}
                                                            className="bg-white p-0"

                                                        >
                                                            {({ remainingTime }) => remainingTime === 7 ? time : time}
                                                        </CountdownCircleTimer>
                                                    </div>
                                                    <div className='relative flex justify-center px-2'>
                                                        <button className="placebet-button-disable px-2 py-1 uppercase rounded white-text text-[13px] disabled font-bold flex justify-center items-center">Done
                                                            <button className="w-full white-text px-3 py-2 h-4 flex justify-center items-center space-x-1 cursor-pointer border-[#d4d3e8] rounded-none font-extrabold text-sm" type="submit">
                                                                <div className=" flex items-center justify-center absolute bg-transparent">
                                                                    <div className="flex items-center justify-center bg-transparent w-full">
                                                                        <div className="w-5 h-5 rounded-full animate-spin 
                          border-[5px] border-solid border-[#ffffff] border-t-transparent"></div>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {backBetModal === true ?
                                            <div ref={this.section1Ref} id="section1">
                                                <div className='lg:hidden block bg-[#E9E9E9]' >
                                                    <div className='flex justify-between items-center py-1 whitespace-nowrap space-x-4'>
                                                        <div className='text-sm font-bold pl-2'>Amount</div>
                                                        <div className='border-[1px] border-gray-400 w-1/2'>
                                                            <input ref={this.inputRef} type="text" autoFocus  // or type="text"
                                                                autoCapitalize="none" className=" w-full black-text bg-[#E9E9E9] text-base focus:outline-none cursor-pointer placeholder-black px-1" placeholder="0" name="stake" onChange={this.inputChange} list="stake" inputMode="numeric" />
                                                            <datalist id="stake" className='bg-black white-text'>
                                                                {betChipsData.map((element, index) => (
                                                                    <option key={index} value={element ? element : 0} />
                                                                ))}
                                                            </datalist>
                                                        </div>

                                                        <div className='flex justify-end items-center text-base'>
                                                            <div className='bg-black white-text px-2'>
                                                                <CountdownCircleTimer
                                                                    isPlaying
                                                                    duration={7}
                                                                    colors={['#000000']}
                                                                    colorsTime={[7]}
                                                                    size={20}
                                                                    strokeWidth={0}
                                                                    className="bg-white p-0"

                                                                >
                                                                    {({ remainingTime }) => remainingTime === 7 ? 7 : time}
                                                                </CountdownCircleTimer>
                                                            </div>
                                                            <div className=' flex justify-center px-2'>
                                                                <button onClick={() => this.placeBet()} className="placebet-button px-2 py-1 uppercase rounded white-text font-bold text-[13px] cursor-pointer">Done</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : <div className='block lg:hidden bg-[#E9E9E9]'>
                                                <div className='flex justify-between items-center py-1 whitespace-nowrap space-x-4'>
                                                    <div className='text-sm text-black font-bold pl-2'>Amount</div>
                                                    <div className='border-[1px] border-gray-400 w-1/2'>
                                                        <input type="number" className=" w-full text-black/30 bg-[#E9E9E9] focus:outline-none pointer-events-none px-1 text-base " placeholder="0" value="0" />

                                                    </div>
                                                    <div className='flex justify-end items-center'>
                                                        <div className='bg-black/30 white-text text-base px-2'>0

                                                        </div>
                                                        <div className=' flex justify-center px-2'>
                                                            <button className="placebet-button-disable px-2 py-1 uppercase rounded white-text text-[13px] disabled font-bold">Done</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                    </>
                                }
*/}

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
                                <div className="gx-w-100">
                                    {/* <MyBetTabBmx totalProfitLoss={totalProfitLoss} /> */}
                                    <BetListTableBmx betList={betList} />
                                </div>
                            ) : null}

                            <Row justify={"center"} className="gx-my-2">
                                {/* <Col span={8}> */}
                                <Button
                                    className="gx-bg-grey gx-text-white gx-font-weight-semi-bold"
                                    onClick={() => {
                                        this.setState({ decalaredListModal: true });
                                        this.declaredbetListfunc();
                                    }}

                                >
                                    Completed Casino Bets
                                </Button>
                                {/* </Col> */}
                            </Row>

                            <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className="gx-mt-1">
                                <RoundedTabBmx />
                                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2 gx-pointer">
                                    {result && result.length > 0
                                        ? result?.map((element, index) => (
                                            <div
                                                onClick={() => this.handleResultModel(element)}
                                                style={{
                                                    backgroundColor: "#368011",
                                                    width: "24px",
                                                    height: "24px",
                                                }}
                                                className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold"
                                            >
                                                <p className="text-yellow-200 font-normal text-sm">{element && element.result === '1' ? "8" : element && element.result === '2' ? <p className="text-yellow-200 font-normal text-sm">9</p> : element && element.result === '3' ? <p className="text-yellow-200 font-normal text-sm">10</p> : element && element.result === '4' ? <p className="text-yellow-200 font-normal text-sm">11</p> : "-"}</p>
                                            </div>
                                        ))
                                        : null}
                                </div>
                            </div>

                            {/* </div> */}
                            {/* </div> */}
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

export default connect(mapStateToProps)(cards32BTheme2);
