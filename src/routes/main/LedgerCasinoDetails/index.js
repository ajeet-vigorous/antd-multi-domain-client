

import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Table } from "antd";
import Auxiliary from "util/Auxiliary";
import { completeLedgerDetailsList, getdiamondCasinoReportByUser, setDiamondBetsList, setcasinoTransactionReport } from "../../../appRedux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BackMenuButton from "../../../components/BackMenu";
import moment from "moment";
import DemoResult from "./DemoResult";
import Loader from "../../../components/loader";



const LedgerCasinoDetails = () => {
  const [userLadger, setLadger] = useState([]);
  const [fancyLedger, setFancyLadger] = useState([]);
  const [completeDataLadger, setCompleteDataLadger] = useState([]);
  const [showBetList, setBetList] = useState([]);
  const [showModalData, setModalData] = useState([]);
  const [showModal, setModal] = useState(false);



  const dispatch = useDispatch();
  const { marketId, eventId, date, ledgerType } = useParams();
  const { casinoTransactionReport, completeLedgerListData, diamondBetsList, casinoReportLoader, diamondCasinoReportByUserData } = useSelector((state) => state.UserReducer);




  useEffect(() => {
    setLadger([])
    setFancyLadger([])
    completedLedger();
    betList(eventId)
  }, [dispatch])

  const completedLedger = () => {
    let reqData = {
      eventId: eventId,
      fromDate: moment(parseInt(date, 10)).format("yyyy-MM-DD",),
      toDate: moment(parseInt(date, 10)).format("yyyy-MM-DD",),
      casinoType: ledgerType,
    }

    dispatch(getdiamondCasinoReportByUser(reqData))
  }

  // setDiamondBetsList
  // diamondBetsList

  const betList = async (eventId) => {
    let betReq = {
      eventId: eventId,
      isDeleted: false,
      fromDate: moment(parseInt(date, 10)).format("yyyy-MM-DD",),
      toDate: moment(parseInt(date, 10)).format("yyyy-MM-DD",),
    };
    dispatch(setDiamondBetsList(betReq))
  }

  useEffect(() => {

    if (diamondBetsList) {
      const { casinoBetData } = diamondBetsList;
      const filteredData = casinoBetData?.map((item, index) => ({
        key: `${index}`,
        createdAt: moment(item.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
        teamName: item.teamName,
        profitLoss: item.profitLoss,
        amount: item.amount,
        rate: item.odds,
        mode: item.type == "K" ? "KHAI" : "LAGAI",
        roundId: item.roundId,
        playerName: item.playerName,
        showResult: item.showResult,
        eventId: item.eventId,
        sid: item.sid,
        userName: item.userInfo.username,
        userFullName: item.userInfo.name,
        posArray: item.posArray,
        result: item.result,
        isDeclare: item.isDeclare,
        ip: item.ip,
        cards: item.resultDetails.cards,
        gtype: item.resultDetails.gtype,
        win: item.resultDetails.win,
        desc: item.resultDetails.desc,
        // resultDetails: item.resultDetails
        //add more data ...
      }));
      setLadger(filteredData);
      // const filteredDataSession = sessionBetsData?.map((item, index) => ({
      //   key: `${index}`,
      //   FcreatedAt: moment(item.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
      //   FsessionName: item.sessionName,
      //   Frate: item.odds,
      //   Frun: item.run,
      //   FdecisionRun: item.decisionRun,
      //   Famount: item.amount,
      //   Fmode: item.type === "Y" ? "YES" : 'NO',
      //   FprofitLoss: item.profitLoss

      // }));
      // console.log("filteredDataSession", filteredDataSession);
      // setFancyLadger(filteredDataSession);
      // setCompleteDataLadger(completeData);
    }
  }, [completeLedgerListData, diamondBetsList, casinoTransactionReport]);


  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };
  const columns = [

    {
      title: 'TEAM',
      dataIndex: 'roundId',
      // render: renderContent
      render: (values, row) => (
        <span className="gx-text-blue"
          onClick={() => handleResultModel(row)}
        >
          <div className="gx-text-black">{row.playerName}</div>
          {row.roundId}
        </span>
      )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    }, {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Show Result',
      dataIndex: 'showResult',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'P&L',
      dataIndex: 'profitLoss',
      render: (values) => (
        <span className={`${values >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{Math.abs(values).toFixed(2)}</span>
      )
    },

  ];

  const columnsFancy = [

    {
      title: 'Runner',
      dataIndex: 'FsessionName',
      render: renderContent
    },
    {
      title: 'Date',
      dataIndex: 'FcreatedAt',
      render: renderContent
    },
    {
      title: 'Rate',
      dataIndex: 'Frate',
      render: renderContent
    }, {
      title: 'Run',
      dataIndex: 'Frun',
      render: renderContent
    },
    {
      title: 'Res',
      dataIndex: 'FdecisionRun',
      render: renderContent
    },
    {
      title: 'Amount',
      dataIndex: 'Famount',
      render: renderContent
    },
    {
      title: 'Mode',
      dataIndex: 'Fmode',
      render: renderContent
    },
    {
      title: 'P&L',
      dataIndex: 'FprofitLoss',
      render: (values) => (<span className={`${values >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{Number.parseFloat(values).toFixed(2)}</span>)

    },

  ];

  const handleResultModel = (data) => {
    setModalData(data)
    setModal(true)
  };

  const handleClose = () => {
    setModal(false)
  }

  return (
    <>

      {casinoReportLoader ? <Loader props={casinoReportLoader} /> :
        <Auxiliary>
          <Row justify={"center"}>
            <Col sm={15} xs={24}>
              {userLadger && userLadger?.length > 0 ?
                <>
                  <div className="gx-py-1 gx-px-2 gx-bg-red gx-bg-flex gx-justify-content-center gx-text-white">
                    <span className="gx-font-weight-semi-bold gx-fs-lg">Casino Bets</span>
                  </div>
                  <Table
                    className="gx-table-responsive"
                    columns={columns}
                    dataSource={userLadger}
                    bordered
                    pagination={false}
                    size="small"
                  />
                </> : null
              }

              {/* {fancyLedger && fancyLedger?.length > 0 ? <>
              <div className="gx-py-1 gx-px-2 gx-bg-red gx-bg-flex gx-justify-content-between  gx-text-white ">
                <span></span>
                <span className="gx-font-weight-semi-bold gx-fs-lg">Fancy Odds</span>
                <span>{ }</span>
              </div>
              <Table
                columns={columnsFancy}
                dataSource={fancyLedger}
                bordered
                pagination={false}
                size="small"
              />
            </> : null
            } */}

            </Col>
          </Row>

          <>

            {diamondCasinoReportByUserData && diamondCasinoReportByUserData.length > 0 ?
              diamondCasinoReportByUserData.map((element, index) => (
                <Row justify={"center"} className="gx-mt-5">

                  <Col sm={14} xs={24}>
                    <div className=" gx-px-2  ">
                      <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Casino Plus Minus</span>
                      <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1 `}> {Number.parseFloat(element?.clientProfitLoss + element?.clientComm) > 0 ?
                        <div className=''>
                          <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">You Won {Number.parseFloat((element?.clientComm ?? 0) + (element?.clientProfitLoss ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
                        </div> :
                        <div className=''>
                          <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg">You Lost {Number.parseFloat((element?.clientComm ?? 0) + (element?.clientProfitLoss ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
                        </div>
                      }</div>
                    </div>

                    <div className=" gx-px-2  ">
                      <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Total Commission</span>
                      <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1`}>{element?.clientComm > 0 ?
                        <div className=''>
                          <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">You Won {element?.clientComm ? Number.parseFloat(element?.clientComm).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
                        </div> :
                        <div className=''>
                          <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg">You Lost {element?.clientComm ? Number.parseFloat(element?.clientComm).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
                        </div>
                      }</div>
                    </div>

                    <div className=" gx-px-2  ">
                      <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Net Plus Minus</span>
                      <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1 `}> {element?.clientProfitLoss > 0 ?
                        <div className=''>
                          <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">You Won {Number.parseFloat(element?.clientProfitLoss).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
                        </div> :
                        <div className=''>
                          <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg">You Lost {Number.parseFloat(element?.clientProfitLoss).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
                        </div>
                      }</div>
                    </div>

                  </Col>




                </Row>
              ))
              : null}
          </>
          <Row justify={"center"}>
            <Col sm={15} xs={24}>
          <div className="gx-py-4">
                <Link to='/main/dashboard/'>
                  <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                    BACK TO MAIN MENU
                  </div>
                </Link>
              </div>
              </Col>
              </Row>

          {/* <BackMenuButton /> */}
        </Auxiliary>

      }

      <DemoResult
        data={showModalData}
        visible={showModal}
        handleClose={handleClose}
      />

    </>
  );
};
export default LedgerCasinoDetails;