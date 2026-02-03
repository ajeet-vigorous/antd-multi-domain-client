// import React, { useEffect, useState } from "react";
// import { Col, Row, Table } from "antd";
// import Auxiliary from "util/Auxiliary";
// import { completeLedgerDetailsList } from "../../../appRedux/actions/User";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";



// const LedgerDetails = () => {
//   const [userLadger, setLadger] = useState([]);
//   const [fancyLedger, setFancyLadger] = useState([]);
//   const [completeDataLadger, setCompleteDataLadger] = useState([]);


//   const dispatch = useDispatch();
//   const { marketId } = useParams();

//   useEffect(() => {
//     completedLedger()
//   }, [dispatch])

//   const { completeLedgerListData } = useSelector((state) => state.UserReducer);

//   const completedLedger = () => {
//     let reqData = {
//       marketId: marketId
//     }
//     dispatch(completeLedgerDetailsList(reqData))
//   }

//   useEffect(() => {

//     if (completeLedgerListData) {
//       const { completeData, oddsBetsData, sessionBetsData, sessionTurnOver } = completeLedgerListData;
//       const filteredData = oddsBetsData?.map((item, index) => ({
//         key: `${index}`,
//         createdAt: item.createdAt,
//         teamName: item.teamName,
//         profitLoss: item.profitLoss,
//         amount: item.amount,
//         rate: item.odds,
//         mode: item.type,

//       }));
//       setLadger(filteredData);
//       const filteredDataSession = sessionBetsData?.map((item, index) => ({
//         key: `${index}`,
//         FcreatedAt: item.createdAt,
//         FsessionName: item.sessionName,
//         Frate: item.odds,
//         Frun: item.run,
//         FdecisionRun: item.decisionRun,
//         Famount: item.amount,
//         Fmode: item.type,
//         FprofitLoss: item.profitLoss

//       }));
//       setFancyLadger(filteredDataSession);
//       setCompleteDataLadger(completeData);

//     }
//   }, [completeLedgerListData]);


//   const renderContent = (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     return obj;
//   };

//   const columns = [

//     {
//       title: 'Team Name',
//       dataIndex: 'teamName',
//       render: renderContent
//     },
//     {
//       title: 'Date',
//       dataIndex: 'createdAt',
//       render: renderContent
//     },
//     {
//       title: 'Rate',
//       dataIndex: 'rate',
//       render: renderContent
//     }, {
//       title: 'Amount',
//       dataIndex: 'amount',
//       render: renderContent
//     },
//     {
//       title: 'Mode',
//       dataIndex: 'mode',
//       render: renderContent
//     },
//     {
//       title: 'P&L',
//       dataIndex: 'profitLoss',
//       render: (values) => (<span className="">{Number.parseFloat(values).toFixed(2)}</span>)
//     },

//   ];

//   const columnsFancy = [

//     {
//       title: 'Runner',
//       dataIndex: 'FsessionName',
//       render: renderContent
//     },
//     {
//       title: 'Date',
//       dataIndex: 'FcreatedAt',
//       render: renderContent
//     },
//     {
//       title: 'Rate',
//       dataIndex: 'Frate',
//       render: renderContent
//     }, {
//       title: 'Run',
//       dataIndex: 'Frun',
//       render: renderContent
//     },
//     {
//       title: 'Res',
//       dataIndex: 'FdecisionRun',
//       render: renderContent
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'Famount',
//       render: renderContent
//     },
//     {
//       title: 'Mode',
//       dataIndex: 'Fmode',
//       render: renderContent
//     },
//     {
//       title: 'P&L',
//       dataIndex: 'FprofitLoss',
//       render: (values) => (<span className="">{Number.parseFloat(values).toFixed(2)}</span>)
//     },

//   ];


//   return (
//     <Auxiliary>
//       <Row justify={"center"}>
//         <Col sm={16}>
//           <div className="gx-py-1 gx-px-2 gx-bg-grey gx-bg-flex gx-justify-content-center">
//             <span>Match Odds</span>
//           </div>
//           <Table
//             columns={columns}
//             dataSource={userLadger}
//             bordered
//             pagination={false}
//             size="small"


//           />

//           <div className="gx-py-1 gx-px-2 gx-bg-red gx-bg-flex gx-justify-content-between">
//             <span></span>
//             <span>Fancy Odds</span>
//             <span>{ }</span>
//           </div>
//           <Table
//             columns={columnsFancy}
//             dataSource={fancyLedger}
//             bordered
//             pagination={false}
//             size="small"


//           />
//         </Col>
//       </Row>
//       <Row justify={"center"} className="gx-mt-5">
//         <Col xs={14}>
//           <div className=" gx-px-2  ">
//             <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Match Plus Minus</span>
//             <div className="gx-bg-flex gx-justify-content-center gx-py-1">{completeDataLadger?.clientOddsAmount > 0 ?
//               <div className=''>
//                 <span>You Won {completeDataLadger?.clientOddsAmount ? Number.parseFloat(completeDataLadger?.clientOddsAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
//               </div> :
//               <div className=''>
//                 <span>You Lost {completeDataLadger?.clientOddsAmount ? Number.parseFloat(completeDataLadger?.clientOddsAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
//               </div>
//             }</div>
//           </div>

//           <div className=" gx-px-2 gx-my-2 ">
//             <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Fancy Plus Minus</span>
//             <div className="gx-bg-flex gx-justify-content-center gx-py-1">{completeDataLadger?.clientSessionAmount > 0 ?
//               <div className=''>
//                 <span>You Won {completeDataLadger?.clientSessionAmount ? Number.parseFloat(completeDataLadger?.clientSessionAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
//               </div> :
//               <div className=''>
//                 <span>You Lost {completeDataLadger?.clientSessionAmount ? Number.parseFloat(completeDataLadger?.clientSessionAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
//               </div>
//             }</div>
//           </div>

//           <div className=" gx-px-2 gx-my-2 ">
//             <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Total Commission</span>
//             <div className="gx-bg-flex gx-justify-content-center gx-py-1"> {(completeDataLadger?.clientOddsComm + completeDataLadger?.clientSessionComm) > 0 ?
//               <div className=''>
//                 <span>You Won {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
//               </div> :
//               <div className=''>
//                 <span>You Lost {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
//               </div>
//             }</div>
//           </div>

//           <div className=" gx-px-2 gx-my-2 ">
//             <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Mob. App. Charges</span>
//             <div className="gx-bg-flex gx-justify-content-center gx-py-1">  <span>You Lost 0/- Coins.</span></div>
//           </div>

//           <div className=" gx-px-2 gx-my-2 ">
//             <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Net Plus Minus</span>
//             <div className="gx-bg-flex gx-justify-content-center gx-py-1">{(completeDataLadger?.clientOddsComm + completeDataLadger?.clientSessionComm + completeDataLadger?.clientSessionAmount + completeDataLadger?.clientOddsAmount) > 0 ?
//               <div className=''>
//                 <span>You Won {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0) + (completeDataLadger?.clientSessionAmount ?? 0) + (completeDataLadger?.clientOddsAmount ?? 0)).toFixed(2).replace(/\.?0+$/, '')} /- Coins.</span>
//               </div> :
//               <div className=''>
//                 <span>You Lost {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0) + (completeDataLadger?.clientSessionAmount ?? 0) + (completeDataLadger?.clientOddsAmount ?? 0)).toFixed(2).replace(/\.?0+$/, '')} /- Coins.</span>
//               </div>
//             }</div>
//           </div>

//         </Col>
//       </Row>
//     </Auxiliary>
//   );
// };
// export default LedgerDetails;



import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import Auxiliary from "util/Auxiliary";
import { completeLedgerDetailsList } from "../../../appRedux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import BackMenuButton from "../../../components/BackMenu";
import moment from "moment";
import Loader from "../../../components/loader";
import { values } from "lodash";



const LedgerDetails = () => {
  const [userLadger, setLadger] = useState([]);
  const [fancyLedger, setFancyLadger] = useState([]);
  const [reacjectedFancyLedger, setReacjectedFancyLadger] = useState([]);

  
  const [completeDataLadger, setCompleteDataLadger] = useState([]);


  const dispatch = useDispatch();
  const { marketId } = useParams();

  useEffect(() => {
    setLadger([])
    setFancyLadger([])
    completedLedger()
  }, [dispatch])

  const { completeLedgerListData, loading } = useSelector((state) => state.UserReducer);

  const completedLedger = () => {
    let reqData = {
      marketId: marketId
    }
    dispatch(completeLedgerDetailsList(reqData))
  }

  useEffect(() => {

    if (completeLedgerListData) {
      const { completeData, oddsBetsData, sessionBetsData, sessionTurnOver } = completeLedgerListData;
      const filteredData = oddsBetsData?.map((item, index) => ({
        key: `${index}`,
        createdAt: moment(item.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
        teamName: item.teamName,
        profitLoss: item.positionInfo[item?.decisionSelectionId],
        amount: item.amount,
        rate: item.odds,
        oddsType: item.oddsType,
        mode: item.type == "K" ? "KHAI" : "LAGAI",

      }));
      setLadger(filteredData);
      const filteredDataSession = sessionBetsData?.filter((item=> item.isDeleted !== 1 ))?.map((item, index) => ({
        key: `${index}`,
        FcreatedAt: moment(item.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
        FsessionName: item.sessionName,
        Frate: item.odds,
        Frun: item.run,
        FdecisionRun: item.decisionRun,
        Famount: item.amount,
        Fmode: item.type === "Y" ? "YES" : 'NO',
        FprofitLoss: item.profitLoss

      }));

      const filteredReajectedDataSession = sessionBetsData?.filter((item=> item.isDeleted === 1 ))?.map((item, index) => ({
        key: `${index}`,
        FcreatedAt: moment(item.createdAt).utcOffset("+05:30").format("DD MMM hh:mm:ss A"),
        FsessionName: item.sessionName,
        Frate: item.odds,
        Frun: item.run,
        FdecisionRun: item.decisionRun,
        Famount: item.amount,
        Fmode: item.type === "Y" ? "YES" : 'NO',
        FprofitLoss: item.profitLoss,
        FdeletedRemark: item?.deletedRemark

      }));
      setReacjectedFancyLadger(filteredReajectedDataSession);

      setFancyLadger(filteredDataSession);
      setCompleteDataLadger(completeData);
    }
  }, [completeLedgerListData]);


  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };

  const columns = [

    {
      title: 'Team Name',
      dataIndex: 'teamName',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
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
      title: 'ODDSTYPE',
      dataIndex: 'oddsType',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },


    {
      title: 'P&L',
      dataIndex: 'profitLoss',
      render: (values) => (
        <span className={`${values >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{Number.parseFloat(values).toFixed(2)}</span>
      )
    },

  ];

  const columnsFancy = [

    {
      title: 'Runner',
      dataIndex: 'FsessionName',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Date',
      dataIndex: 'FcreatedAt',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Rate',
      dataIndex: 'Frate',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    }, {
      title: 'Run',
      dataIndex: 'Frun',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Res',
      dataIndex: 'FdecisionRun',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'Famount',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Mode',
      dataIndex: 'Fmode',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'P&L',
      dataIndex: 'FprofitLoss',
      render: (values) => (<span className={`gx-text-nowrap ${values >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{Number.parseFloat(values).toFixed(2)}</span>)

    },

  ];

  const columnsFancyReacject = [

    {
      title: 'Runner',
      dataIndex: 'FsessionName',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Date',
      dataIndex: 'FcreatedAt',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Rate',
      dataIndex: 'Frate',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    }, {
      title: 'Run',
      dataIndex: 'Frun',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Res',
      dataIndex: 'FdecisionRun',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'Famount',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'Mode',
      dataIndex: 'Fmode',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },
    {
      title: 'P&L',
      dataIndex: 'FprofitLoss',
      render: (values) => (<span className={`gx-text-nowrap ${values >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{Number.parseFloat(values).toFixed(2)}</span>)

    },
    {
      title: 'Remakr',
      dataIndex: 'FdeletedRemark',
      render: (value) => <span className="gx-text-nowrap">{value}</span>
    },

  ];

  const customLocale = {
    emptyText: <div className="gx-text-center gx-text-black" >No data found</div>
  };

  return (
    <>
    {loading ? <Loader props={loading} />:
    <Auxiliary>
      <Row justify={"center"}>
        <Col sm={16}>
          {userLadger && userLadger?.length > 0 ?
            <>
              <div className="gx-py-1 gx-px-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white">
                <span className="gx-font-weight-semi-bold gx-fs-sm">Match Bets</span>
              </div>
              <Table
                columns={columns}
                dataSource={userLadger}
                bordered
                pagination={false}
                scroll={{ x: true }}
                size="small"
              />
            </> : null
          }

          {fancyLedger && fancyLedger?.length > 0 ? <>
            <div className="gx-py-1 gx-px-2 gx-bg-red gx-bg-flex gx-justify-content-between  gx-text-white ">
              <span></span>
              <span className="gx-font-weight-semi-bold gx-fs-sm">Fancy Bets</span>
              <span>{ }</span>
            </div>
            <Table
            className="gx-table-responsive"
              columns={columnsFancy}
              dataSource={fancyLedger}
              bordered
              scroll={{ x: true }}
              pagination={false}
              size="small"
            />
          </> : null
          }

        </Col>
      </Row>
      <Row justify={"center"} className="gx-mt-5">
        <Col xs={24} sm={14}>
          <div className=" gx-px-2  ">
            <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Match Plus Minus</span>
            <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1 ${completeDataLadger?.clientOddsAmount >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{completeDataLadger?.clientOddsAmount > 0 ?
              <div className=''>
                <span className="gx-font-weight-semi-bold gx-fs-lg">You Won {completeDataLadger?.clientOddsAmount ? Number.parseFloat(completeDataLadger?.clientOddsAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
              </div> :
              <div className='gx-font-weight-semi-bold gx-fs-lg'>
                <span >You Lost {completeDataLadger?.clientOddsAmount ? Number.parseFloat(completeDataLadger?.clientOddsAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
              </div>
            }</div>
          </div>

          <div className=" gx-px-2  ">
            <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Fancy Plus Minus</span>
            <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1`}>{completeDataLadger?.clientSessionAmount > 0 ?
              <div className=''>
                <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">You Won {completeDataLadger?.clientSessionAmount ? Number.parseFloat(completeDataLadger?.clientSessionAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
              </div> :
              <div className=''>
                <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg">You Lost {completeDataLadger?.clientSessionAmount ? Number.parseFloat(completeDataLadger?.clientSessionAmount).toFixed(2).replace(/\.?0+$/, '') : 0}/- Coins.</span>
              </div>
            }</div>
          </div>

          <div className=" gx-px-2  ">
            <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Total Commission</span>
            <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1 `}> {(completeDataLadger?.clientOddsComm + completeDataLadger?.clientSessionComm) > 0 ?
              <div className=''>
                <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">You Won {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
              </div> :
              <div className=''>
                <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg">You Lost {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0)).toFixed(2).replace(/\.?0+$/, '')}/- Coins.</span>
              </div>
            }</div>
          </div>

          {/* <div className=" gx-px-2  ">
            <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Mob. App. Charges</span>
            <div className="gx-bg-flex gx-justify-content-center gx-py-1 gx-bg-white gx-text-red gx-font-weight-semi-bold gx-fs-lg">  <span>You Lost 0/- Coins.</span></div>
          </div> */}

          <div className=" gx-px-2  ">
            <span className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">Net Plus Minus</span>
            <div className={`gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1 ${completeDataLadger?.clientSessionAmount >= 0 ? "gx-text-blue" : "gx-text-red"}`}>{(completeDataLadger?.clientOddsComm + completeDataLadger?.clientSessionComm + completeDataLadger?.clientSessionAmount + completeDataLadger?.clientOddsAmount) > 0 ?
              <div className=''>
                <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg" >You Won {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0) + (completeDataLadger?.clientSessionAmount ?? 0) + (completeDataLadger?.clientOddsAmount ?? 0)).toFixed(2).replace(/\.?0+$/, '')} /- Coins.</span>
              </div> :
              <div className=' '>
                <span className="gx-text-red gx-font-weight-semi-bold gx-fs-lg" >You Lost {Number.parseFloat((completeDataLadger?.clientOddsComm ?? 0) + (completeDataLadger?.clientSessionComm ?? 0) + (completeDataLadger?.clientSessionAmount ?? 0) + (completeDataLadger?.clientOddsAmount ?? 0)).toFixed(2).replace(/\.?0+$/, '')} /- Coins.</span>
              </div>
            }</div>
          </div>

        </Col>
      </Row>
      <Row className="gx-py-2" justify={"center"}>
      <Col sm={16}>
            <div className="gx-py-1 gx-px-2 gx-bg-red gx-bg-flex gx-justify-content-between  gx-text-white ">
              <span></span>
              <span className="gx-font-weight-semi-bold gx-fs-sm">Rejected Bets</span>
              <span>{ }</span>
            </div>
            <Table
            className="gx-table-responsive"
              columns={columnsFancyReacject}
              locale={customLocale}
              dataSource={reacjectedFancyLedger}
              bordered
              scroll={{ x: true }}
              pagination={false}
              size="small"
            />
        
        </Col>
              </Row>
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
    </Auxiliary>}

    </>
  );
};
export default LedgerDetails;







