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

// import ErrorTost from '../../components/ErrorTost/ErrorTost';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Card, Col, Row, Typography, Button } from "antd";
import PlaceBetMobileBmxBet from "../../../components/casino_components/PlaceBetMobileBmxBet/PlaceBetMobileBmxBet";
import PlaceBetMobileBmx from "../../../components/casino_components/PlaceBetMobileBmx/PlaceBetMobileBmx";
import { FaLock } from "react-icons/fa";
import DecalaredCasinoBetList from "../../../components/casino_components/DecalaredCasinoBetList/DecalaredCasinoBetList";
import CasinoAlertModal from "../../../components/casino_components/CasinoAlertModal/CasinoAlertModal";


// import { userActions } from "../../_actions";
const { Text } = Typography;

class Teenpatti20Theme2 extends React.Component {
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
            shortName: "teen9",
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
                message: "",
            },
            declaredBetList: [],
            DeclaredTotalProfitLoss: "",
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
            // this.setState({
            //     backBetModal: false,
            // });

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
            let videoUrlType = casinoDetails?.videoUrlType;
            let selectedVideoUrl = casinoDetails?.[`videoUrl${videoUrlType}`]
            this.setState({
                casinoDetails: casinoDetails,
                fetchData: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : {},
                socketURL: casinoDetails && casinoDetails.socketURL ? casinoDetails.socketURL : {},
                tvUrl: selectedVideoUrl && selectedVideoUrl ? selectedVideoUrl : "",
                cacheURL: casinoDetails && casinoDetails.cacheURL ? casinoDetails.cacheURL : {},
                socketPerm: casinoDetails && casinoDetails.fetchData ? casinoDetails.fetchData : "",
                betStatus: casinoDetails && casinoDetails.betStatus ? casinoDetails.betStatus : "",
                cashinoStatus: casinoDetails && casinoDetails.cashinoStatus ? casinoDetails.cashinoStatus : "",
                eventId: casinoDetails && casinoDetails.eventId ? casinoDetails.eventId : "",
                minStake: casinoDetails && casinoDetails.minStake ? casinoDetails.minStake : "",
                maxStake: casinoDetails && casinoDetails.maxStake ? casinoDetails.maxStake : "",
                name: casinoDetails && casinoDetails.name ? casinoDetails.name : "",
                shortName: casinoDetails && casinoDetails.shortName ? casinoDetails.shortName : "teen9",
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
            "rate": this.state.count + "",
            "amount": Number(this.state.betSlipData.stake),
            "casinoType": this.state.shortName ? this.state.shortName : "teen9",
            "eventId": this.props.match.params.eventId,
            "betFor": this.state.betSlipData.betFor + "",
            "nat": this.state.betSlipData.nat
        }

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

    // declaredbetListfunc = async (eventId) => {
    //     let betReq = {
    //         eventId: this.props.match.params.eventId,
    //         fromDate: moment().format("YYYY-MM-DD"),
    //         toDate: moment().format("YYYY-MM-DD"),
    //         isDeclare: true,
    //     };

    //     let getCasinoDetails = await httpPost(`casino/diamondBetsList`, betReq);
    //     let totalProfitLoss = 0;
    //     let betList = getCasinoDetails?.data?.casinoBetData;

    //     if (betList && betList.length > 0) {
    //         betList?.map((bet, key) => {
    //             let profitLoss = "Not Declare";
    //             let profitLossCount = 0;
    //             if (bet.isDeclare) {
    //                 profitLossCount = bet.profitLoss ? bet.profitLoss : 0;
    //                 profitLoss = bet.profitLoss;
    //             }
    //             totalProfitLoss += Number(profitLossCount);
    //             betList[key].profitLoss = profitLoss;
    //         });
    //     }
    //     if (getCasinoDetails) {
    //         this.setState({
    //             declaredBetList: betList,
    //             DeclaredTotalProfitLoss: totalProfitLoss,
    //         });
    //     }
    // };
    handleAlertModal = () => {
        this.setState({
            alertStatus: {
                status: false,
                type: "",
                message: "",
            },
        });
    };

    closeDeclaredModal = () => {
        this.setState({
            declaredBetList: [],
            DeclaredTotalProfitLoss: "",
            decalaredListModal: false,
        });
    };

    render() {
        const { casinoData, name, shortName, ResultModel, time, count, backBetModal, tvUrl, betList, showLoader, LoadingBet, posArray, oddsDifference, totalProfitLoss, betChipsData, isFatch, message, error, domainSettingByDomainName,
            decalaredListModal, DeclaredTotalProfitLoss, declaredBetList,
            alertStatus } = this.state;
        let { data, result } = casinoData ? casinoData : {};
        let t1 = data && data?.t1 && data.t1[0] ? data.t1[0] : {};
        let Winner = data && data?.t2 && data.t2[0] ? data.t2[0] : {};
        let Pair = data && data?.t2 && data.t2[1] ? data.t2[1] : {};
        let Flush = data && data?.t2 && data.t2[2] ? data.t2[2] : {};
        let Straight = data && data?.t2 && data.t2[3] ? data.t2[3] : {};
        let Trio = data && data?.t2 && data.t2[4] ? data.t2[4] : {};
        let StraightFlush = data && data?.t2 && data.t2[5] ? data.t2[5] : {};
        return (
            <>
                <div className=" gx-overflow-y-auto">

                    {alertStatus?.status === true ?
                        <CasinoAlertModal onConfirm={this.handleAlertModal} alertStatus={alertStatus} />
                        : null}

                    {decalaredListModal && decalaredListModal === true ? (
                        <DecalaredCasinoBetList totalProfitLoss={DeclaredTotalProfitLoss} declaredBetList={declaredBetList} closeDeclaredModal={this.closeDeclaredModal} />
                    ) : null}
                    {ResultModel &&
                        ResultModel === true ? (
                        <ResultModelBmx
                            handleClose={this.handleCloseResult}
                            name={name ? name : "Teenpatti Test"}
                            shortName={shortName ? shortName : "teen9"}
                            result={this.state.result}
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
                                PageTitle={name ? name : "Teenpatti Test"}
                                ruleImage={"/assets/images/rulesImage/tp-rules.webp"}
                                t1={t1}
                            />
                            <Card className="ant-card gx-bg-black gx-text-white gx-my-0  ant-space-align-center gx-position-relative">
                                <iframe
                                    src={tvUrl ? tvUrl : null}
                                    title=" "
                                    className="gx-w-100"
                                    style={{ height: "350px" }}
                                />
                                <div className="gx-w-100 gx-px-2 gx-py-3 gx-position-absolute gx-top-0 gx-left-0">
                                    <Row gutter={[16, 8]} className="gx-pt-2">
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong> TIGER </Text>
                                        </Col>
                                        <Col>
                                            <Row gutter={[8, 8]} className="">
                                                {[t1?.C1, t1?.C2, t1?.C3]?.map((card, index) => (
                                                    <Col key={index} xs={8}>
                                                        <img src={`/cards/${card || 1}.png`} alt="card" className=" gx-rounded-sm" style={{ height: "3rem" }} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong> LION</Text>
                                        </Col>
                                        <Col>
                                            <Row gutter={[8, 8]} className="">
                                                {[t1?.C4, t1?.C5, t1?.C6]?.map((card, index) => (
                                                    <Col key={index} xs={8}>
                                                        <img src={`/cards/${card || 1}.png`} alt="card" className=" gx-rounded-sm" style={{ height: "3rem" }} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Text className="gx-text-white" strong> DRAGON</Text>
                                        </Col>
                                        <Col>
                                            <Row gutter={[8, 8]} className="">
                                                {[t1?.C7, t1?.C8, t1?.C9]?.map((card, index) => (
                                                    <Col key={index} xs={8}>
                                                        <img src={`/cards/${card || 1}.png`} alt="card" className=" gx-rounded-sm" style={{ height: "3rem" }} />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
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
                            <Card bordered className="gx-bg-white gx-text-white gx-my-0 gx-px-3">
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom">
                                    <Col span={12} className="gx-bg-white  gx-py-2 gx-text-left">

                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey" >
                                        <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">TIGER</Text>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey" >
                                        <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">Lion</Text>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey" >
                                        <Text strong className="gx-text-white gx-text-uppercase gx-font-weight-semi-bold">Dragon</Text>
                                    </Col>
                                </Row>

                                {/* Winner */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {Winner && Winner.nat ? Winner.nat : Winner.nation ? Winner.nation : "Winner"}
                                        <div className={`${posArray[Winner.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[Winner.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Winner && Winner?.tstatus === 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Winner, type: "Yes", odds: Winner.trate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Winner.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.trate ? (Winner.trate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Winner.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Winner.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase   gx-font-weight-semi-bold ${Winner.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.trate ? (Winner.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Winner && Winner?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Winner, type: "Yes", odds: Winner.lrate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.lsection, betFor: "lion" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Winner.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.lrate ? (Winner.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Winner.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Winner.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Winner.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.lrate ? (Winner.lrate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Winner && Winner?.dstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Winner, type: "Yes", odds: Winner.drate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.dsection, betFor: "dragon" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Winner.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.drate ? (Winner.drate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Winner.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Winner.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Winner.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Winner && Winner.drate ? (Winner.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>


                                {/* Pair */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {Pair && Pair.nat ? Pair.nat : Pair.nation ? Pair.nation : "Pair"}
                                        <div className={`${posArray[Pair.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[Pair.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Pair && Pair?.tstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Pair, type: "Yes", odds: Pair.trate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.trate ? (Pair.trate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Pair.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Pair.sid] ?? 0.00}
                                                </div> */}
                                            </>

                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.trate ? (Pair.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Pair && Pair?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Pair, type: "Yes", odds: Pair.lrate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.lsection, betFor: "lion" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.lrate ? (Pair.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Pair.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Pair.sid] ?? 0.00}
                                                </div> */}
                                            </>

                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.lrate ? (Pair.lrate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Pair && Pair?.dstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Pair, type: "Yes", odds: Pair.drate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.dsection, betFor: "dragon" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.drate ? (Pair.drate - oddsDifference) : '-'}
                                                </Text>

                                                {/* <div className={`${posArray[Pair.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Pair.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Pair.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Pair && Pair.drate ? (Pair.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>

                                {/* Flush */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {Flush && Flush.nat ? Flush.nat : Flush.nation ? Flush.nation : "Flush"}
                                        <div className={`${posArray[Flush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[Flush.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Flush && Flush?.tstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Flush, type: "Yes", odds: Flush.trate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.trate ? (Flush.trate - oddsDifference) : '-'}
                                                </Text>

                                                {/* <div className={`${posArray[Flush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Flush.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.trate ? (Flush.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Flush && Flush?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Flush, type: "Yes", odds: Flush.lrate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.lsection, betFor: "lion" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.lrate ? (Flush.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Flush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Flush.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.lrate ? (Flush.lrate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Flush && Flush?.dstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Flush, type: "Yes", odds: Flush.drate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.dsection, betFor: "dragon" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.drate ? (Flush.drate - oddsDifference) : '-'}
                                                </Text>

                                                {/* <div className={`${posArray[Flush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Flush.sid] ?? 0.00}
                                                </div> */}
                                            </>

                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Flush.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Flush && Flush.drate ? (Flush.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>

                                {/* Straight */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {Straight && Straight.nat ? Straight.nat : Straight.nation ? Straight.nation : "Straight"}
                                        <div className={`${posArray[Straight.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[Straight.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Straight && Straight?.tstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Straight, type: "Yes", odds: Straight.trate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.trate ? (Straight.trate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Straight.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Straight.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.trate ? (Straight.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Straight && Straight?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Straight, type: "Yes", odds: Straight.lrate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.lsection, betFor: "lion" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.lrate ? (Straight.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Straight.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Straight.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.lrate ? (Straight.lrate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Straight && Straight?.dstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Straight, type: "Yes", odds: Straight.drate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.dsection, betFor: "dragon" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.drate ? (Straight.drate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Straight.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Straight.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Straight.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Straight && Straight.drate ? (Straight.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>

                                {/* Trio */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {Trio && Trio.nat ? Trio.nat : Trio.nation ? Trio.nation : "Trio"}
                                        <div className={`${posArray[Trio.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[Trio.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Trio && Trio?.tstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Trio, type: "Yes", odds: Trio.trate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.trate ? (Trio.trate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Trio.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Trio.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.trate ? (Trio.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Trio && Trio?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Trio, type: "Yes", odds: Trio.lrate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.lsection, betFor: "lion" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.lrate ? (Trio.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[Trio.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Trio.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.lrate ? (Trio.lrate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {Trio && Trio?.dstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: Trio, type: "Yes", odds: Trio.drate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.dsection, betFor: "dragon" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.drate ? (Trio.drate - oddsDifference) : '-'}
                                                </Text>

                                                {/* <div className={`${posArray[Trio.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                                    {posArray[Trio.sid] ?? 0.00}
                                                </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${Trio.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{Trio && Trio.drate ? (Trio.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>

                                {/* StraightFlush */}
                                <Row className="gx-text-center gx-fs-sm gx-border-bottom ">
                                    <Col span={12}
                                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                                        className={`gx-py-2 gx-text-left gx-font-weight-semi-bold gx-text-black gx-font-weight-semi-bold`}>
                                        {StraightFlush && StraightFlush.nat ? StraightFlush.nat ? StraightFlush.nation : StraightFlush.nation : "StraightFlush"}
                                        <div className={`${posArray[StraightFlush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[StraightFlush.sid] ?? 0.00}
                                        </div>
                                    </Col>
                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {StraightFlush && StraightFlush?.tstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.trate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.trate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.trate ? (StraightFlush.trate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[StraightFlush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                            {posArray[StraightFlush.sid] ?? 0.00}
                                        </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.trate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.trate ? (StraightFlush.trate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {StraightFlush && StraightFlush?.lstatus == 'True' ?
                                            <>
                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.lrate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.lrate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.lrate ? (StraightFlush.lrate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[StraightFlush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                             {posArray[StraightFlush.sid] ?? 0.00}
                                         </div> */}
                                            </>
                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.lrate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.lrate ? (StraightFlush.lrate - oddsDifference) : '-'}

                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>

                                    <Col span={4} className="gx-py-2 gx-bg-grey gx-position-reletive" >
                                        {StraightFlush && StraightFlush?.dstatus == 'True' ?
                                            <>

                                                <Text strong
                                                    onClick={() => this.handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.drate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.tsection, betFor: "tiger" }, this.section1Ref)}
                                                    className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.drate < 0
                                                        ? "gx-text-red gx-w-100"
                                                        : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.drate ? (StraightFlush.drate - oddsDifference) : '-'}
                                                </Text>
                                                {/* <div className={`${posArray[StraightFlush.sid] < 0 ? "gx-text-red" : "gx-text-green-0"} flex justify-center items-center text-[16px] font-[500]`}>
                                             {posArray[StraightFlush.sid] ?? 0.00}
                                         </div> */}
                                            </>

                                            :
                                            <Text strong className={`gx-text-white gx-text-uppercase gx-font-weight-semi-bold ${StraightFlush.drate < 0
                                                ? "gx-text-red gx-w-100"
                                                : "gx-text-green-0 gx-w-100"}`}>{StraightFlush && StraightFlush.drate ? (StraightFlush.drate - oddsDifference) : '-'}
                                                <div style={{ background: "rgba(0,0,0,0.3)" }}
                                                    className="gx-top-0 gx-left-0   gx-h-100 gx-w-100 gx-position-absolute gx-bg-flex gx-justify-content-center gx-align-items-center"
                                                > <FaLock className="gx-fs-lg gx-font-weight-heavy gx-text-white" />
                                                </div>
                                            </Text>
                                        }
                                    </Col>
                                </Row>
                            </Card>













                            

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
                                <div className="gx-w-100">
                                    {/* <MyBetTabBmx
                                            totalProfitLoss={totalProfitLoss} /> */}
                                    <BetListTableBmx betList={betList} />
                                </div>
                                : null}

                            <Row justify={"center"} className="gx-my-2">
                                <Button className="gx-bg-grey gx-text-white gx-font-weight-semi-bold" onClick={() => {
                                    this.setState({ decalaredListModal: true });
                                    this.declaredbetListfunc();
                                }}>
                                    Completed Casino Bets
                                </Button>
                            </Row>

                            <div style={{ backgroundColor: "rgba(0,0,0,0.3)" }} className=" pb-36 bg-black/30">
                                <RoundedTabBmx />
                                <div className="gx-bg-flex gx-justify-content-end gx-align-items-center gx-py-2 gx-px-2">
                                    {result && result.length > 0 ? result?.map((element, index) => (
                                        <div onClick={() => this.handleResultModel(element)} style={{ backgroundColor: '#368011', width: '24px', height: '24px' }} className="gx-rounded-circle gx-p-1 gx-ml-1 cursor-pointer gx-fs-md gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white gx-font-weight-semi-bold" >
                                            <p className="text-[#FF4502] font-normal text-sm">{element && element.result === '31' ? "D" : element && element.result === '11' ? <p className="text-yellow-200 font-normal text-sm">T</p> : element && element.result === '21' ? <p className="text-[#FF4502] font-normal text-sm">L</p> : "-"}</p>
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

export default connect(mapStateToProps)(Teenpatti20Theme2);