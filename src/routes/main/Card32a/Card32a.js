import React from "react";
import { connect } from "react-redux";
import io from 'socket.io-client';
import BetLockedRounded from "../../../../components/casino_components/BetLockedRounded/BetLockedRounded";
import { FaGripLinesVertical } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { CASINO } from '../../../_config';
import { FaCircleInfo } from 'react-icons/fa6';
import Sidebar from "../../../../components/Sidebar/Sidebar";
import EditStakeDesktop from '../../../../components/EditStakeDesktop/EditStakeDesktop';
import ResultModel from "../../../casino_components/ResultModel/ResultModel";
import { httpPost } from "../../../_helpers/http";
import RulesCasino from "../../../../components/RulesCasino/RulesCasino";
import BetPlaceCasinoMobile from "../../../../components/BetPlaceCasinoMobile/BetPlaceCasinoMobile";
import BetPlaceDesktopCasino from "../../../../components/BetPlaceDesktopCasino/BetPlaceDesktopCasino";






class Card32a extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      betSlipData: {},
      count: 0,
      casinoData: [],
      BetPlaceDesktop: false,
      ResultModel: false,
      Result: false,
      cardShow: true,
      ResultDetailsModel: false,
      casinoDetails: {},
      RulesCasinoModal: false,
    };
  }

  handleResultModel = (data) => {
    this.setState({ ResultDetailsModel: true, result: data });
  };
  handleCloseResult = () => {
    this.setState({ ResultModel: false, ResultDetailsModel: false, });
  };

  componentDidMount() {
    this.getCasinoDetails();
  }

  getCasinoDetails = async () => {
    let casino = await httpPost('sports/getCasinoList?shortName=card32a');
    let casinoDetails = casino && casino.data && casino.data[0] ? casino.data[0] : {}
    if (casinoDetails) {
      // this.setState({ showAlert: true, errorType: casinoDetails.code, resMessage: casinoDetails.message });
      this.setState({
        casinoDetails: casinoDetails,
        casinoName: casinoDetails.casinoName,
        socketURL: casinoDetails.socketURL,
        shortName: casinoDetails.shortName,
        cacheURL: casinoDetails.cacheURL,
        tvUrl: casinoDetails.tvUrl
      });
      if (casinoDetails.socketPerm === "1") {
        this.socket = io.connect(casinoDetails.socketUrl);
        this.socket.emit('JoinRoom', casinoDetails.shortName);
        this.socket.on(casinoDetails.shortName, this.handleIncomingData);
      } else {
        let config = {
          method: 'GET',
          maxBodyLength: Infinity,
          url: casinoDetails.cacheURL,
          headers: { 'Content-Type': 'application/json' },
        };
        axios.request(config).then((response) => {
          this.handleIncomingData(response.data.data)
        }).catch((error) => {
          console.warn('ERRORRRRRRRRRRRRRCARD32ASocket', error);
        });
        this.interval = setInterval(() => this.loadData(), 1000);
      }
    } else {
      this.setState({ showAlert: true, errorType: 1, resMessage: "Something went wrong" });
    }
    this.setState({ isFetch: false })
  }

  loadData = () => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: this.state.cacheURL,
      headers: { 'Content-Type': 'application/json' },
    };
    axios.request(config).then((response) => {
      this.handleIncomingData(response.data.data)
    }).catch((error) => {
      console.log('ERRORRRRRRRRRRRRRCARD32ASocket', error);
    });
  }

  handleIncomingData = (socketData) => {
    this.setState(() => ({
      casinoData: socketData,
    }));
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleClose = () => {
    this.setState({ betPlaceModal: false, EditStakeModal: false, RulesCasinoModal: false });
  };
  handleRulesCasinoModalOpen = () => {
    this.setState({ RulesCasinoModal: true });
  };


  handleStakeOpen = () => {
    this.setState({ EditStakeModal: true });
  };

  handlechangepage = () => {
    this.props.history.push('/app/innerstatement')
  }

  handleBackOpen = (data) => {
    this.setState({ betPlaceModal: true, betSlipData: { ...data, stake: "0" }, count: data.rate, teamname: data.name });
    setTimeout(() => this.setState({ betPlaceModal: false }), 10000);
  };

  handleBetList = () => {
    this.setState({ betListShow: !this.state.betListShow });
  }

  updateStackOnclick = (num) => {
    let { betSlipData } = this.state;
    betSlipData.stake = num;
    this.setState({
      betSlipData: betSlipData,
    });
  };

  placeBet = () => {
    this.setState({ betPlaceModal: false })
  };

  handleResult = () => {
    this.setState({ ResultModel: !this.state.ResultModel });
  };

  handleCompletedFancyModal = () => {
    this.setState({ showCompletedFancy: !this.state.showCompletedFancy });
  }

  handleCardShow = () => {
    this.setState({ cardShow: !this.state.cardShow });
  };

  render() {
    const { casinoData, casinoName, tvUrl } = this.state;
    const { data, result } = casinoData ? casinoData : {};

    let t1 = data && data.t1[0] ? data.t1[0] : {};
    let Player8 = data && data.t2[0] ? data.t2[0] : {};
    let Player9 = data && data.t2[1] ? data.t2[1] : {};
    let Player10 = data && data.t2[2] ? data.t2[2] : {};
    let Player11 = data && data.t2[3] ? data.t2[3] : {};
    let image = t1 && t1.desc ? t1.desc.split(',') : [];

    return (
      <>
        {this.state &&
          this.state.ResultDetailsModel === true ? (
          <ResultModel
            handleClose={this.handleCloseResult}
            name={"32 CARDS"}
            result={this.state.result}

          />
        ) : null}
        {this.state.EditStakeModal === true ?
          <EditStakeDesktop
            handleClose={this.handleClose}
            stakehandleClose={this.handleClose}
          />
          : null}
        {this.state.RulesCasinoModal === true ?
          <RulesCasino
            handleClose={this.handleClose}
          />
          : null}
        {this.state.betPlaceModal === true ?
          <BetPlaceCasinoMobile
            betSlipData={this.state.betSlipData}
            updateStackOnclick={this.updateStackOnclick}
            inputChange={this.inputChange}
            placeBet={this.placeBet}
            handleClose={this.handleClose}
            count={this.state.count}
          />
          : null}
        <div className="relative h-full page_bg overflow-y-auto flex bg-[#2E3439]">
          <Sidebar />
          {/* <div className="relative h-full page_bg overflow-y-auto"> */}
          <div className="lg:flex w-full h-full p-1.5 lg:space-x-1.5 space-y-4 lg:space-y-0 pb-24">
            <div className="lg:w-[65%] w-full h-full bg-[#3C444B]">
              <div className="bg-[#0B0614] flex justify-between w-full relative md:text-sm text-[10px] xl:h-[610px] md:h-[300px] h-[200px]">
                <iframe src={tvUrl ? tvUrl : CASINO.VideoUrl + `3055`} title=" " className='relative w-full  ' />
                <div className="bg-black/70 flex flex-col justify-center items-center absolute top-0 left-0 lg:p-3 p-1.5">
                  <span className="text-[#E18C18] font-bold lg:text-lg text-sm">{casinoName ? casinoName : "32 CARDS"}</span>
                  <span className="text-white font-semibold lg:text-sm text-xs">Round ID: {t1 && t1.mid ? t1.mid : null}</span>
                </div>
                <div className="flex flex-col justify-end items-end absolute top-0 right-0 lg:p-3 p-1.5 space-y-1">
                  <div className="flex justify-center items-center space-x-2">
                  <span className="p-1.5 lg:text-2xl text-lg rounded-full border-[2px] border-white text-white cursor-pointer"><FaHome /></span>
                    <span onClick={this.handleRulesCasinoModalOpen} className="lg:p-1.5 p-1  text-lg lg:text-2xl rounded-full border-[2px] border-white text-white cursor-pointer"><FaCircleInfo /></span>
                  </div>
                  {/* <div className="lg:block hidden">
                    <div className="py-1 px-2 bg-black/50 rounded-md flex justify-between items-center space-x-2">
                      {this.state.ResultModel ?
                        <div className="grid grid-cols-2 gap-1">
                          {result && result.length > 0 ? result.map((element, index) =>
                            <span onClick={() => this.handleResultModel(element)} key={index} className={`bg-white/20 px-2 py-1 rounded font-bold cursor-pointer ${element.result === "4" ? "text-[#F74242]" : element.result === "1" ? "text-[#ffffff]" : "text-[#EF910F]"}`}>
                              {element.result === "1" ? "8" : element.result === "2" ? "9" : element.result === "3" ? "10" : "11"}</span>)
                            : null}
                        </div>
                        : null}
                    </div>
                  </div> */}
                </div>

                <div className="absolute top-[20%] left-0">
                  <div className="py-1 pr-2 bg-black/50 rounded-md flex justify-between items-center space-x-2 lg:h-72 h-52">
                    <div className={`h-full ${this.state.cardShow ? "w-full" : "w-0"}`}>
                      {this.state.cardShow ? <div className="text-white font-semibold whitespace-nowrap">player 8:<span className="text-yellow-500" >{t1 && t1.C1 ? t1.C1 : 0}</span></div> : null}
                      <img src={`/cards/${image && image[0] ? image[0] : "1"}.png`} alt="card" className="h-8 lg:h-11 w-6 lg:w-9" />
                      {this.state.cardShow ? <div className="text-white font-semibold whitespace-nowrap"> player 9: <span className="text-yellow-500" >{t1 && t1.C2 ? t1.C2 : 0}</span></div> : null}
                      <img src={`/cards/${image && image[1] ? image[1] : "1"}.png`} alt="card" className="h-8 lg:h-11 w-6 lg:w-9" />
                      {this.state.cardShow ? <div className="text-white font-semibold whitespace-nowrap"> player 10: <span className="text-yellow-500" >{t1 && t1.C3 ? t1.C3 : 0}</span></div> : null}
                      <img src={`/cards/${image && image[2] ? image[2] : "1"}.png`} alt="card" className="h-8 lg:h-11 w-6 lg:w-9" />
                      {this.state.cardShow ? <div className="text-white font-semibold whitespace-nowrap"> player 11: <span className="text-yellow-500" >{t1 && t1.C4 ? t1.C4 : 0}</span></div> : null}
                      <img src={`/cards/${image && image[3] ? image[3] : "1"}.png`} alt="card" className="h-8 lg:h-11 w-6 lg:w-9" />
                    </div>
                    <div className="h-full flex justify-center items-center">
                      <FaGripLinesVertical className="h-10 text-white/80 cursor-pointer" onClick={this.handleCardShow} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center absolute bottom-2 right-2">
                  <div className={`${t1 && t1.autotime === "0" ? "loader1" : "loader"}`}>
                  </div>
                  <span className="md:text-4xl text-2xl font-bold text-white absolute">{t1 && t1.autotime ? t1.autotime : null}</span>
                </div>
                {/* <div className="bg-transparent space-y-1 absolute bottom-0 left-0 w-full lg:block hidden">
                  <div className="grid grid-cols-3 gap-1 text-black">
                    <div className="flex justify-between items-center bg-[#353C42] rounded p-2 ">
                      <span className="text-sm font-semibold">{Player8 && Player8.nation ? Player8.nation : "Player 8"}</span>
                      <span className="text-sm font-semibold">0.00</span>
                    </div>

                    <div className=" border-[2px] border-[#72BBEF] w-full rounded relative">
                      <div className="bg-transparent text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player8, type: "Yes", odds: Player8.b1, name: Player8.nation, selectionId: Player8.sid, marketid: Player8.mid, betFor: Player8.nation })}>
                        <span className={`${Player8.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player8 && Player8.b1 ? Player8.b1 : "0.00"}</span>
                      </div>
                      {Player8.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                    <div className="border-[2px] border-[#F994BA] rounded relative w-full ">
                      <div className="bg-transparent text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player8, type: "No", odds: Player8.l1, name: Player8.nation, selectionId: Player8.sid, marketid: Player8.mid, betFor: Player8.nation })}>
                        <span className={`${Player8.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`} >{Player8 && Player8.l1 ? Player8.l1 : "0.00"}</span>
                        {Player8.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-black">
                    <div className="flex justify-between items-center bg-[#DDDDDD] rounded p-2 ">
                      <span className="text-sm font-semibold ">{Player9 && Player9.nation ? Player9.nation : "Player 9"}</span>
                      <span className="text-sm font-semibold">0.00</span>
                    </div>
                    <div className="border-[2px] border-[#72BBEF] rounded relative">
                      <div className="bg-transparent w-full text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player9, type: "Yes", odds: Player9.b1, name: Player9.nation, selectionId: Player9.sid, marketid: Player9.mid, betFor: Player9.nation })}>
                        <span className={`${Player9.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`} >{Player9 && Player9.b1 ? Player9.b1 : "0.00"}</span>
                      </div>
                      {Player9.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                    <div className="border-[2px] border-[#F994BA] rounded relative w-full ">
                      <div className=" text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player9, type: "No", odds: Player9.l1, name: Player9.nation, selectionId: Player9.sid, marketid: Player9.mid, betFor: Player9.nation })}>
                        <span className={`${Player9.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player9 && Player9.l1 ? Player9.l1 : "0.00"}</span>
                      </div>
                      {Player9.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-black">
                    <div className="flex justify-between items-center bg-[#DDDDDD] rounded p-2 ">
                      <span className="text-sm font-semibold ">{Player10 && Player10.nation ? Player10.nation : "Player 10"}</span>
                      <span className="text-sm font-semibold">0.00</span>
                    </div>
                    <div className="border-[2px] border-[#72BBEF] rounded relative w-full ">
                      <div className="bg-transparent text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player10, type: "Yes", odds: Player10.b1, name: Player10.nation, selectionId: Player10.sid, marketid: Player10.mid, betFor: Player10.nation })}>
                        <span className={`${Player10.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player10 && Player10.b1 ? Player10.b1 : "0.00"}</span>
                      </div>
                      {Player10.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                    <div className="border-[2px] border-[#F994BA] w-full rounded relative">
                      <div className="bg-transparent text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player10, type: "No", odds: Player10.l1, name: Player10.nation, selectionId: Player10.sid, marketid: Player10.mid, betFor: Player10.nation })}>
                        <span className={`${Player10.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player10 && Player10.l1 ? Player10.l1 : "0.00"}</span>
                      </div>
                      {Player10.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-black">
                    <div className="flex justify-between items-center bg-[#DDDDDD] rounded p-2 ">
                      <span className="text-sm font-semibold ">{Player11 && Player11.nation ? Player11.nation : "Player 11"}</span>
                      <span className="text-sm font-semibold">0.00</span>
                    </div>
                    <div className="border-[2px] border-[#72BBEF] w-full rounded relative ">
                      <div className="bg-transparent text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player11, type: "Yes", odds: Player11.b1, name: Player11.nation, selectionId: Player11.sid, marketid: Player11.mid, betFor: Player11.nation })}>
                        <span className={`${Player11.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player11 && Player11.b1 ? Player11.b1 : "0.00"}</span>
                        {Player11.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                      </div>
                    </div>
                    <div className="border-[2px] border-[#F994BA] w-full rounded relative">
                      <div className="bg-transparent text-center py-2 cursor-pointers" onClick={() => this.handleBackOpen({ data: Player11, type: "No", odds: Player11.l1, name: Player11.nation, selectionId: Player11.sid, marketid: Player11.mid, betFor: Player11.nation })}>
                        <span className={`${Player11.gstatus === "ACTIVE" ? "text-white" : "text-black"} text-sm font-semibold leading-4`}>{Player11 && Player11.l1 ? Player11.l1 : "0.00"}</span>
                        {Player11.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="bg-transparent space-y-2 py-2 ">
                {/* <div className="grid grid-cols-3 gap-1 text-black">
                  <div className="flex justify-start items-center p-2 ">
                    <span className="text-sm font-semibold uppercase">Main</span>
                  </div>
                  <div className="w-full text-center py-2">
                    <span className="text-sm font-semibold uppercase">Back</span>
                  </div>
                  <div className="w-full text-center py-2">
                    <span className="text-sm font-semibold uppercase">Lay</span>
                  </div>
                </div> */}
                <div className="grid grid-cols-3 gap-1 text-[#AAAFB5]">
                  <div className="flex justify-between items-center bg-[#353C42] rounded p-2 col-span-2 ">
                    <span className="text-sm font-semibold ">{Player8 && Player8.nation ? Player8.nation : "Player 8"}</span>
                    <span className="text-sm font-semibold">0.00</span>
                  </div>
                  <div className="border-[2px] border-[#72BBEF] w-full rounded relative">
                    <div className="bg-[#3F5667] text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player8, type: "Yes", odds: Player8.b1, name: Player8.nation, selectionId: Player8.sid, marketid: Player8.mid, betFor: Player8.nation })}>
                      <span className={`${Player8.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player8 && Player8.b1 ? Player8.b1 : "0.00"}</span>
                    </div>
                    {Player8.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div>
                  {/* <div className="border-[2px] border-[#F994BA] w-full rounded relative">
                    <div className="text-center py-2 cursor-pointer" onClick={() => this.handleBackOpen({ data: Player8, type: "No", odds: Player8.l1, name: Player8.nation, selectionId: Player8.sid, marketid: Player8.mid, betFor: Player8.nation })}>
                      <span className={`${Player8.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player8 && Player8.l1 ? Player8.l1 : "0.00"}</span>
                      {Player8.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                  </div> */}
                </div>
                <div className="grid grid-cols-3 gap-1 text-[#AAAFB5]">
                  <div className="flex justify-between items-center bg-[#353C42] rounded p-2 col-span-2">
                    <span className="text-sm font-semibold ">{Player9 && Player9.nation ? Player9.nation : "Player 9"}</span>
                    <span className="text-sm font-semibold">0.00</span>
                  </div>
                  <div className="border-[2px] border-[#72BBEF] w-full rounded relative">
                    <div className=" bg-[#3F5667] text-center py-2 cursor-pointe" onClick={() => this.handleBackOpen({ data: Player9, type: "Yes", odds: Player9.b1, name: Player9.nation, selectionId: Player9.sid, marketid: Player9.mid, betFor: Player9.nation })}>
                      <span className={`${Player9.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player9 && Player9.b1 ? Player9.b1 : "0.00"}</span>
                    </div>
                    {Player9.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div>
                  {/* <div className="border-[2px] border-[#F994BA] w-full rounded relative">
                    <div className="bg-[#3F5667] text-center py-2 cursor-pointe" onClick={() => this.handleBackOpen({ data: Player9, type: "No", odds: Player9.l1, name: Player9.nation, selectionId: Player9.sid, marketid: Player9.mid, betFor: Player9.nation })}>
                      <span className={`${Player9.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player9 && Player9.l1 ? Player9.l1 : "0.00"}</span>
                      {Player9.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                    </div>
                  </div> */}
                </div>
                <div className="grid grid-cols-3 gap-1 text-[#AAAFB5]">
                  <div className="flex justify-between items-center bg-[#353C42] rounded p-2 col-span-2">
                    <span className="text-sm font-semibold ">{Player10 && Player10.nation ? Player10.nation : "Player 10"}</span>
                    <span className="text-sm font-semibold">0.00</span>
                  </div>
                  <div className="border-[2px] border-[#72BBEF] w-full rounded relative">
                    <div className="bg-[#3F5667] text-center py-2 cursor-pointe" onClick={() => this.handleBackOpen({ data: Player10, type: "Yes", odds: Player10.b1, name: Player10.nation, selectionId: Player10.sid, marketid: Player10.mid, betFor: Player10.nation })}>
                      <span className={`${Player10.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player10 && Player10.b1 ? Player10.b1 : "0.00"}</span>
                    </div>
                    {Player10.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div>
                  {/* <div className="border-[2px] border-[#F994BA] w-full rounded relative ">
                    <div className="cursor-pointer text-center py-2" onClick={() => this.handleBackOpen({ data: Player10, type: "No", odds: Player10.l1, name: Player10.nation, selectionId: Player10.sid, marketid: Player10.mid, betFor: Player10.nation })}>
                      <span className={`${Player10.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player10 && Player10.l1 ? Player10.l1 : "0.00"}</span>
                    </div>
                    {Player10.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div> */}
                </div>
                <div className="grid grid-cols-3 gap-1 text-[#AAAFB5]">
                  <div className="flex justify-between items-center bg-[#353C42] rounded p-2 col-span-2">
                    <span className="text-sm font-semibold ">{Player11 && Player11.nation ? Player11.nation : "Player 11"}</span>
                    <span className="text-sm font-semibold">0.00</span>
                  </div>
                  <div className="border-[2px] border-[#72BBEF] rounded relative">
                    <div className=" w-full bg-[#3F5667] text-center py-2 cursor-pointe" onClick={() => this.handleBackOpen({ data: Player11, type: "Yes", odds: Player11.b1, name: Player11.nation, selectionId: Player11.sid, marketid: Player11.mid, betFor: Player11.nation })}>
                      <span className={`${Player11.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player11 && Player11.b1 ? Player11.b1 : "0.00"}</span>
                    </div>
                    {Player11.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div>
                  {/* <div className="border-[2px] border-[#F994BA] w-full rounded relative">
                    <div className=" bg-[#3F5667] text-center py-2 cursor-pointe" onClick={() => this.handleBackOpen({ data: Player11, type: "No", odds: Player11.l1, name: Player11.nation, selectionId: Player11.sid, marketid: Player11.mid, betFor: Player11.nation })}>
                      <span className={`${Player11.gstatus === "ACTIVE" ? "text-black" : "text-white"} text-sm font-semibold leading-4`}>{Player11 && Player11.l1 ? Player11.l1 : "0.00"}</span>
                    </div>
                    {Player11.gstatus === "ACTIVE" ? null : <BetLockedRounded />}
                  </div> */}
                </div>
              </div>

              <div className="lg:hidden block py-2">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <div className="grid grid-cols-7 gap-2">
                    {result && result.length > 0 ? result.slice(0, 7).map((element, index) =>
                      <span key={index} className={`bg-black/80 px-2 py-1 rounded font-bold cursor-pointer ${element.result === "4" ? "text-[#F74242]" : element.result === "1" ? "text-[#ffffff]" : "text-[#EF910F]"}`}>
                        {element.result === "1" ? "8" : element.result === "2" ? "9" : element.result === "3" ? "10" : "11"}</span>)
                      : null}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {result && result.length > 0 ? result.slice(6, 9).map((element, index) =>
                      <span key={index} className={`bg-black/80 px-2 py-1 rounded font-bold cursor-pointer ${element.result === "4" ? "text-[#F74242]" : element.result === "1" ? "text-[#ffffff]" : "text-[#EF910F]"}`}>
                        {element.result === "1" ? "8" : element.result === "2" ? "9" : element.result === "3" ? "10" : "11"}</span>)
                      : null}
                  </div>
                </div>
              </div>

            </div>
            <div className='2xl:w-[30%] lg:w-[29%] w-full lg:space-y-2 space-y-0 lg:fixed lg:right-4 right-0 pb-28'>
              <div>
                <div className="text-xs bg-[#16191C] text-[#AAAFB5] ">
                  <div className="px-2.5 py-[8px] text-lg capitalize lg:block hidden">LAST RESULTS</div>
                  <div className='w-full bg-black p-2 md:block hidden'>
                    {this.state.ResultModel ?
                      <div className="grid grid-cols-10 gap-1 text-center">
                        {result && result.length > 0 ? result.map((element, index) =>
                          <span onClick={() => this.handleResultModel(element)} key={index} className={`bg-white/20 px-2 py-1 rounded font-bold cursor-pointer ${element.result === "4" ? "text-[#F74242]" : element.result === "1" ? "text-[#ffffff]" : "text-[#EF910F]"}`}>
                            {element.result === "1" ? "8" : element.result === "2" ? "9" : element.result === "3" ? "10" : "11"}</span>)
                          : null}
                      </div>
                      : null}
                  </div>
                </div>
              </div>
              <div className=' text-white pt-2 item-center lg:block hidden'>
                <div className="bg-[#16191C] text-center text-[#AAAFB5] w-full h-10 flex justify-between items-center text-md px-2" >
                  <div className="text-lg font-bold">PLACE BET</div>
                  <div>Range:100-10000</div>
                </div>
                <table className="w-full">
                  <thead className=" bg-[#3C444B]">
                    <tr className='text-[#AAAFB5] w-full text-start text-base'>
                      <th className=" border-0">(Bet for)</th>
                      <th className=" border-0">Odds</th>
                      <th className="text-end border-0">Stake</th>
                      <th className="text-end uppercase border-0">Profit</th>
                    </tr>
                  </thead>
                </table>
                {this.state.betPlaceModal === true ?
                  <BetPlaceDesktopCasino
                    betSlipData={this.state.betSlipData}
                    updateStackOnclick={this.updateStackOnclick}
                    inputChange={this.inputChange}
                    decreaseCount={this.decreaseCount}
                    increaseCount={this.increaseCount}
                    placeBet={this.placeBet}
                    handleClose={this.handleClose}
                    count={this.state.count}
                  />
                  : null}
              </div>
              <div className="lg:border-t-0 border-t border-white">
                <div className="text-xs flex items-center bg-black text-[#AAAFB5]">
                  <div className="px-2.5 py-[8px] text-center text-lg capitalize">My Bets</div>
                </div>

                <div className='w-full overflow-x-auto scrollbar-hide'>
                  <table className="w-full">
                    <thead className=" bg-[#3C444B]">
                      <tr className='text-[#AAAFB5] w-full text-start text-base'>
                        <th className="w-2/5 border-0">Name</th>
                        <th className="w-1/5 border-0">Odds</th>
                        <th className="w-1/5 border-0">Stake</th>
                        <th className="w-1/5 uppercase border-0">p/l</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {/* {oddsBetData && oddsBetData.length > 0 ? oddsBetData.map((element, index) => (
                          <tr className="bg-white text-black ">
                            <td className="">{index + 1} </td>
                            <td className="font-semibold whitespace-nowrap">{element.teamName}</td>
                            <td className='font-semibold whitespace-nowrap'>{element.oddsType}</td>
                            <td className="font-semibold whitespace-nowrap flex justify-start items-center">{element.amount}</td>
                            <td className="font-semibold whitespace-nowrap text-center">{element.odds}</td>
                            <td className="font-semibold whitespace-nowrap">{element.type}</td>
                            <td className="font-semibold whitespace-nowrap">{element.createdAt}</td>
                          </tr>
                        )) : null
                        } */}


                    </tbody>
                  </table>
                </div>
              </div>


            </div>
          </div>
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

export default Card32a;
