// import React from "react";
// import {Col, Row} from "antd";
// import Auxiliary from "util/Auxiliary";


// const UnsettleBets = () => {

//   return (
//     <Auxiliary>
//     <Row>
//     <Col  sm={22} xs={22} className="gx-col-full">
//  undseksaheiw bets  getSportsBetsList
//         </Col>

//     </Row>

//     </Auxiliary>
//   );
// };
// export default UnsettleBets;

// import React, { useState, useEffect } from "react";
// import moment from 'moment';
// import { httpPost } from "../../../http/http";
// import { getSportsBetsList } from "../../../appRedux/actions/User";
// import { useDispatch, useSelector } from "react-redux";
// // import Loader from "../../components/Loader/Loader";

// const UnsettleBets = (props) => {
//   const [betLists, setBetList] = useState({});
//   const dispatch = useDispatch();
//   const { sportsBetsList, loading } = useSelector(state => state.UserReducer);

//   useEffect(() => {
//     betList();
//   }, [dispatch]);

//   const betList = async () => {
//     let betReq = {
//       "fancyBet": true,
//       "oddsBet": true,
//       "casinoBet": true,
//       "isDeclare": false,
//     };
//     dispatch(getSportsBetsList(betReq));
//   };

//   useEffect(() => {
//     if (sportsBetsList?.data) {
     
//       setBetList(sportsBetsList?.data);
//     }
//   }, [sportsBetsList?.data]);

//   const onClickMenu = (url) => {
//     props.history.push(url);
//   };


//   let { fancyBetData, oddsBetData, casinoBetData } = betLists;
//   let finalobject = [];
//   if (Array.isArray(fancyBetData)) {
//     fancyBetData.forEach((fancyData) => {
//       let pushObj = {
//         userInfo: fancyData.userInfo,
//         description: fancyData.sessionName,
//         selection: "Fancy",
//         selectionId: fancyData.selectionId,
//         stack: fancyData.amount,
//         odds: fancyData.odds,
//         run: fancyData.run,
//         Type: "Fancy Odds",
//         createdAt: fancyData.createdAt,
//         profit: fancyData.profit,
//         loss: fancyData.loss,
//         type: fancyData.type,
//         isDeclare: fancyData.isDeclare,
//         ip: fancyData.ip,
//         oddsType: fancyData.oddsType,
//         positionInfo: fancyData.positionInfo,
//         deletedRemark: fancyData.deletedRemark,
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   if (Array.isArray(oddsBetData)) {
//     oddsBetData.forEach((oddsData) => {
//       let pushObj = {
//         userInfo: oddsData.userInfo,
//         description: oddsData.teamName,
//         selection: oddsData.oddsType,
//         selectionId: oddsData.selectionId,
//         stack: oddsData.amount,
//         odds: oddsData.odds,
//         Type: "Match Odds",
//         createdAt: oddsData.createdAt,
//         profit: oddsData.profit,
//         loss: oddsData.loss,
//         type: oddsData.type,
//         isDeclare: oddsData.isDeclare,
//         ip: oddsData.ip,
//         run: "",
//         oddsType: oddsData.oddsType,
//         positionInfo: oddsData.positionInfo,
//         deletedRemark: oddsData.deletedRemark,
//         matchName: oddsData.matchName,
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   if (Array.isArray(casinoBetData)) {
//     casinoBetData.forEach((casinoData) => {
//       let pushObj = {
//         userInfo: casinoData.userInfo,
//         description: casinoData.gameName,
//         selection: "Casino",
//         selectionId: casinoData.selectionId,
//         stack: casinoData.debitAmount,
//         odds: casinoData.odds,
//         Type: "Casino Odds",
//         createdAt: casinoData.createdAt,
//         profit: casinoData.profit,
//         loss: casinoData.loss,
//         type: casinoData.type,
//         isDeclare: casinoData.isDeclare,
//         ip: casinoData.ip,
//         run: "",
//         oddsType: casinoData.oddsType,
//         positionInfo: casinoData.positionInfo,
//         deletedRemark: casinoData.deletedRemark,
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   const renderContent = (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     return obj;
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "id",
//       render: renderContent,
//     },
//     {
//       title: "Date",
//       dataIndex: "createdAt",
//       render: (createdAt) =>
//         moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY"),
//     },
//     {
//       title: "Post Datew",
//       dataIndex: "createdAt1",
//       render: (value, row) =>
//         moment(row.createdAt).utcOffset("+05:30").format("DD-MM-YYYY"),
//     },
//     {
//       title: "Collection Name",
//       dataIndex: "eventName",
//       render: renderContent,
//     },
//     {
//       title: "Debit",
//       dataIndex: "debit",
//       render: (value) => Number.parseFloat(Math.abs(value)).toFixed(2),
//     },
//     {
//       title: "Credit",
//       dataIndex: "credit",
//       render: (value) => Number.parseFloat(Math.abs(value)).toFixed(2),
//     }
//   ];


//   return (
//     <div>
     
//       <div className="lg:w-[61%] w-full mx-auto">
//         <div className="background-color text-sm white-text text-center py-1 font-extrabold flex justify-between items-center">
//           <span className="w-full"></span>
//           <span className="w-full uppercase">Pending BETS</span>
//           <span className="text-xs w-full text-right"></span>
//         </div>
//         <div className="w-full overflow-x-auto scrollbar-hide">
//           <table className="w-full text-sm">
//             <thead className="rounded-t background-color">
//               <tr className="white-text text-center font-bold w-full">
//                 <th className="p-0.5 w-[30%]">TEAM</th>
//                 <th className="p-0.5 w-[25%]">DATE</th>
//                 <th className="p-0.5 px-2 w-[10%]">RATE</th>
//                 <th className="p-0.5 w-[20%]">AMT</th>
//                 <th className="p-0.5 w-[15%]">MODE</th>
//               </tr>
//             </thead>
//             <tbody className="">
//               {finalobject && finalobject.length > 0 ? (
//                 <>
//                   {finalobject.map((element, index) => (
//                     <tr
//                       key={index}
//                       className=" background-white text-[14px] font-medium text-[#49494A]"
//                     >
//                       <td className="border-[1px] border-[#3d8282] text-center w-[30%]">
//                         {element.description} <br />
//                         {element.oddsType === "tiedMatch" ? element.matchName : ""}
//                       </td>
//                       <td className="text-start border-[1px] border-[#3d8282] w-[25%] ">
//                         {element && element.createdAt
//                           ? moment(element.createdAt)
//                               .utcOffset("+05:30")
//                               .format("DD-MM-YYYY hh:mm A")
//                           : ""}
//                       </td>
//                       <td className=" whitespace-nowrap border-[1px] border-[#3d8282] w-[10%] px-2">
//                         {element.odds}
//                       </td>
//                       <td className=" whitespace-nowrap border-[1px] border-[#3d8282] text-center w-[15%]">
//                         {Number.parseFloat(Math.abs(element.stack))
//                           .toFixed(2)
//                           .replace(/\.?0+$/, "")}
//                       </td>
//                       <td className=" whitespace-nowrap border-[1px] border-[#3d8282] text-center w-[10%]">
//                         {element.betType === "L" ? "LAGAI" : "KHAI"}
//                       </td>
//                       <marquee className="w-full font-bold red-text  border-[#3D8282]">
//                         {element.deletedRemark}
//                       </marquee>
//                     </tr>
//                   ))}
//                 </>
//               ) : (
//                 <tr className=" background-white text-[14px] font-medium text-[#49494A]">
//                   <td colSpan={5} className=" whitespace-nowrap border-[1px] border-[#3d8282] w-[10%] px-2">
//                     No Data Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <button
//             onClick={() => onClickMenu("/app/TotalLedger")}
//             className="background-color w-full rounded-none md:py-2 py-1 uppercase font-bold white-text text-[13px] tracking-widest"
//           >
//             BACK TO LIST
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnsettleBets;



// import React, { useState, useEffect } from "react";
// import moment from 'moment';
// import { httpPost } from "../../../http/http";
// import { getSportsBetsList } from "../../../appRedux/actions/User";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Tag, Space, Row, Col } from 'antd';
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

// const UnsettleBets = (props) => {
//   const [betLists, setBetList] = useState({});
//   const dispatch = useDispatch();
//   const { sportsBetsList, loading } = useSelector(state => state.UserReducer);

//   useEffect(() => {
//     betList();
//   }, [dispatch]);

//   const betList = async () => {
//     let betReq = {
//       "fancyBet": true,
//       "oddsBet": true,
//       "casinoBet": true,
//       "isDeclare": false,
//     };
//     dispatch(getSportsBetsList(betReq));
//   };

//   useEffect(() => {
//     if (sportsBetsList?.data) {
//       setBetList(sportsBetsList?.data);
//     }
//   }, [sportsBetsList?.data]);

//   const onClickMenu = (url) => {
//     props.history.push(url);
//   };

//   let { fancyBetData, oddsBetData, casinoBetData } = betLists;
//   let finalobject = [];

//   if (Array.isArray(fancyBetData)) {
//     fancyBetData.forEach((fancyData) => {
//       let pushObj = {
//         key: fancyData.id, // assuming id is unique for each bet
//         userInfo: fancyData.userInfo,
//         description: fancyData.sessionName,
//         selection: "Fancy",
//         selectionId: fancyData.selectionId,
//         stack: fancyData.amount,
//         odds: fancyData.odds,
//         run: fancyData.run,
//         Type: "Fancy Odds",
//         createdAt: moment(fancyData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
//         profit: fancyData.profit,
//         loss: fancyData.loss,
//         type: fancyData.type,
//         isDeclare: fancyData.isDeclare,
//         ip: fancyData.ip,
//         oddsType: fancyData.oddsType,
//         positionInfo: fancyData.positionInfo,
//         deletedRemark: fancyData.deletedRemark,
//         matchName : fancyData.matchName
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   if (Array.isArray(oddsBetData)) {
//     oddsBetData.forEach((oddsData) => {
//       let pushObj = {
//         key: oddsData.id, // assuming id is unique for each bet
//         userInfo: oddsData.userInfo,
//         description: oddsData.teamName,
//         selection: oddsData.oddsType,
//         selectionId: oddsData.selectionId,
//         stack: oddsData.amount,
//         odds: oddsData.odds,
//         Type: "Match Odds",
//         createdAt: moment(oddsData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
//         profit: oddsData.profit,
//         loss: oddsData.loss,
//         type: oddsData.type,
//         isDeclare: oddsData.isDeclare,
//         ip: oddsData.ip,
//         run: "",
//         oddsType: oddsData.oddsType,
//         positionInfo: oddsData.positionInfo,
//         deletedRemark: oddsData.deletedRemark,
//         matchName: oddsData.matchName,
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   if (Array.isArray(casinoBetData)) {
//     casinoBetData.forEach((casinoData) => {
//       let pushObj = {
//         key: casinoData.id, // assuming id is unique for each bet
//         userInfo: casinoData.userInfo,
//         description: casinoData.gameName,
//         selection: "Casino",
//         selectionId: casinoData.selectionId,
//         stack: casinoData.debitAmount,
//         odds: casinoData.odds,
//         Type: "Casino Odds",
//         createdAt: moment(casinoData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
//         profit: casinoData.profit,
//         loss: casinoData.loss,
//         type: casinoData.type,
//         isDeclare: casinoData.isDeclare,
//         ip: casinoData.ip,
//         run: "",
//         oddsType: casinoData.oddsType,
//         positionInfo: casinoData.positionInfo,
//         deletedRemark: casinoData.deletedRemark,
   
//       };
//       finalobject.push(pushObj);
//     });
//   }

//   const renderContent = (value, row, index) => {
//     const obj = {
//       children: value,
//       props: {},
//     };
//     return obj;
//   };
//   const components = {
//     body: {
//       cell: ({ children, ...restProps }) => (
//         <td {...restProps} style={{ border: '0.5px solid rgb(61 130 130)' }}>
//           {children}
//         </td>
//       ),
//     },
//   };
//   const columns = [
//     {
//       title: "Team",
//       align: "center",
//       dataIndex: "description",
//       render: (text, record, index) => (
//         <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column gx-text-nowrap">
//           <span>{record.description? record.description : "-"}</span>
//           <span>{record.oddsType === "tiedMatch" ? record.matchName : ""}</span>
//         </div>
//       ),
     
//     },
//     {
//       title: "Date",
//       align: "center",
//       dataIndex: "createdAt",
//       render: (value) =>   (<div className="gx-text-center gx-text-nowrap">
//       { value}
//            </div>)

//     },
    
//     {
//       title: "Rate",
//       dataIndex: "odds",
//       align: "center",
//       render: (value) =>   (<div className="gx-text-center gx-text-nowrap">
//         { value}
//              </div>)
//     },
//     {
//       title: "AMT",
//       align: "center",
//       dataIndex: "stack",
//       render: (value) =>   (<div className="gx-text-center gx-text-nowrap">
//          {  Number.parseFloat(Math.abs(value)).toFixed(2)}
//               </div>)
           
//     },
//     {
//       title: "MODE",
//       align: "center",
//       dataIndex: "type",
//       render: (value,record) => (<div className="gx-text-center gx-text-nowrap">
// { record.type === "N"
//       ? "NO"
//       : record.type === "Y"
//       ? "YES"
//       : record.type === "K"
//       ? "Khai"
//       : record.type === "L"
//       ? "Lagai"
//       : ""}
//       </div>)
//     }
//   ];
//   const customLocale = {
//     emptyText: <div className="gx-text-center gx-text-black" >No data found</div>
//   };
//   return (
//     <Row justify={"center"}>
//       <Col lg={18} xs={24}>
     
//       <div className="background-color text-sm white-text text-center gx-mb-1 font-extrabold flex justify-between items-center">
//         <div className="gx-w-100 gx-text-center gx-bg-grey gx-text-uppercase gx-text-white gx-fs-lg gx-py-1 gx-font-weight-semi-bold ">Pending BETS</div>
//       </div>
//       <div className="w-full overflow-x-auto scrollbar-hide">
//       <Table
//       locale={customLocale}
//       scroll={{ x: true }}
//           columns={columns}
//           dataSource={finalobject}
//           bordered
          
//           size="small"
//           pagination={false}
//           className="text-sm"
//           components={components} 
          
//         />
        
//       </div>
//       <div className="background-color text-sm white-text text-center gx-my-1 gx-py-4  font-extrabold flex justify-between items-center">
//       <Link className="" to="/main/ledger">
//         <div className="gx-w-100 gx-text-center gx-bg-grey gx-text-uppercase gx-text-white gx-fs-lg gx-py-1 gx-font-weight-semi-bold ">BACK TO LIST</div>
//         </Link >
//       </div>
//       </Col>
//     </Row>
//   );
// };

// export default UnsettleBets;













import React, { useState, useEffect } from "react";
import moment from 'moment';
import { httpPost } from "../../../http/http";
import { getSportsBetsList } from "../../../appRedux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space, Row, Col } from 'antd';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UnsettleBets = (props) => {
  const [betLists, setBetList] = useState({});
  const [userLists, setUserLists] = useState([]);
  const dispatch = useDispatch();
  const { sportsBetsList, loading } = useSelector(state => state.UserReducer);

  useEffect(() => {
    betList();
  }, [dispatch]);

  const betList = async () => {
    let betReq = {
      // "fancyBet": true,
      // "oddsBet": true,
      // "casinoBet": true,
      // "isDeclare": false,
      "fancyBet": true,
      "oddsBet": true,
      "diamondBet": true,
      "isDeclare": false,
      "isDeleted": false,
      "isClientExposure": true
      // "matkaBet": true
    };
    dispatch(getSportsBetsList(betReq));
  };

  useEffect(() => {
    if (sportsBetsList?.data) {
      setBetList(sportsBetsList?.data);
    }
  }, [sportsBetsList?.data]);

  const onClickMenu = (url) => {
    props.history.push(url);
  };

  let exposerModal = sportsBetsList && sportsBetsList?.data && sportsBetsList?.data.length > 0 ? sportsBetsList?.data : null
  

  useEffect(() => {
    if (exposerModal ) {
      const filteredData = exposerModal.map((item, index) => ({
        key: `${index}`,
        market: item.market,
        amount: item.amount,
        type: item.type,
        time: item.time,
        rate: item.rate,
        mType: item.marketType
        // mType: (item.type == 'LAGAI' || item.type == "KHAI") ? "Odds" : "Fancy"
      }));
      setUserLists(filteredData);
    }
  }, [exposerModal]);

  let { fancyBetData, oddsBetData, casinoBetData } = betLists;
  let finalobject = [];

  if (Array.isArray(fancyBetData)) {
    fancyBetData.forEach((fancyData) => {
      let pushObj = {
        key: fancyData.id, // assuming id is unique for each bet
        userInfo: fancyData.userInfo,
        description: fancyData.sessionName,
        selection: "Fancy",
        selectionId: fancyData.selectionId,
        stack: fancyData.amount,
        odds: fancyData.odds,
        run: fancyData.run,
        Type: "Fancy Odds",
        createdAt: moment(fancyData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
        profit: fancyData.profit,
        loss: fancyData.loss,
        type: fancyData.type,
        isDeclare: fancyData.isDeclare,
        ip: fancyData.ip,
        oddsType: fancyData.oddsType,
        positionInfo: fancyData.positionInfo,
        deletedRemark: fancyData.deletedRemark,
        matchName : fancyData.matchName
      };
      finalobject.push(pushObj);
    });
  }

  if (Array.isArray(oddsBetData)) {
    oddsBetData.forEach((oddsData) => {
      let pushObj = {
        key: oddsData.id, // assuming id is unique for each bet
        userInfo: oddsData.userInfo,
        description: oddsData.teamName,
        selection: oddsData.oddsType,
        selectionId: oddsData.selectionId,
        stack: oddsData.amount,
        odds: oddsData.odds,
        Type: "Match Odds",
        createdAt: moment(oddsData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
        profit: oddsData.profit,
        loss: oddsData.loss,
        type: oddsData.type,
        isDeclare: oddsData.isDeclare,
        ip: oddsData.ip,
        run: "",
        oddsType: oddsData.oddsType,
        positionInfo: oddsData.positionInfo,
        deletedRemark: oddsData.deletedRemark,
        matchName: oddsData.matchName,
      };
      finalobject.push(pushObj);
    });
  }

  if (Array.isArray(casinoBetData)) {
    casinoBetData.forEach((casinoData) => {
      let pushObj = {
        key: casinoData.id, // assuming id is unique for each bet
        userInfo: casinoData.userInfo,
        description: casinoData.gameName,
        selection: "Casino",
        selectionId: casinoData.selectionId,
        stack: casinoData.debitAmount,
        odds: casinoData.odds,
        Type: "Casino Odds",
        createdAt: moment(casinoData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm A"),
        profit: casinoData.profit,
        loss: casinoData.loss,
        type: casinoData.type,
        isDeclare: casinoData.isDeclare,
        ip: casinoData.ip,
        run: "",
        oddsType: casinoData.oddsType,
        positionInfo: casinoData.positionInfo,
        deletedRemark: casinoData.deletedRemark,
   
      };
      finalobject.push(pushObj);
    });
  }

  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    return obj;
  };
  const components = {
    body: {
      cell: ({ children, ...restProps }) => (
        <td {...restProps} style={{ border: '0.5px solid rgb(61 130 130)' }}>
          {children}
        </td>
      ),
    },
  };


//   const columns = [
//     {
//       title: "Team",
//       align: "center",
//       dataIndex: "description",
//       render: (text, record, index) => (
//         <div className="gx-bg-flex gx-justify-content-center gx-align-items-center gx-flex-column">
//           <span>{record.description? record.description : "-"}</span>
//           <span>{record.oddsType === "tiedMatch" ? record.matchName : ""}</span>
//         </div>
//       ),
     
//     },
//     {
//       title: "Date",
//       align: "center",
//       dataIndex: "createdAt",

//     },
    
//     {
//       title: "Rate",
//       dataIndex: "odds",
//       align: "center",
//       render: (value) =>   (<div className="gx-text-center">
//         { value}
//              </div>)
//     },
//     {
//       title: "AMT",
//       align: "center",
//       dataIndex: "stack",
//       render: (value) =>   (<div className="gx-text-center">
//          {  Number.parseFloat(Math.abs(value)).toFixed(2)}
//               </div>)
           
//     },
//     {
//       title: "MODE",
//       align: "center",
//       dataIndex: "type",
//       render: (value,record) => (<div className="gx-text-center">
// { record.type === "N"
//       ? "NO"
//       : record.type === "Y"
//       ? "YES"
//       : record.type === "K"
//       ? "Khai"
//       : record.type === "L"
//       ? "Lagai"
//       : ""}
//       </div>)
//     }
//   ];


const columns = [

  {
    title: "Match",
    dataIndex: "market",
    render: renderContent,
  },
  {
    title: "Stake",
    dataIndex: "amount",
    render: renderContent
  },
  {
    title: "Rate",
    dataIndex: "rate",
    render: renderContent,
  },

  {
    title: "Type",
    dataIndex: "type",
    render: (value, row) => <span className="gx-text-capitalize">{row.type}</span>
  },
  {
    title: "Time",
    dataIndex: "time",
    render: (value, row) => moment(row.time).format("DD-MM-YYYY hh:mm A")
  },
  {
    title: "Market Type",
    dataIndex: "mType",
    render: (value, row) => <span className="gx-text-capitalize">{row.mType}</span>
  },
];
  
  const customLocale = {
    emptyText: <div className="gx-text-center gx-text-black" >No data found</div>
  };
  return (
    <Row justify={"center"}>
      <Col lg={20} xs={24}>
     
      <div className="background-color text-sm white-text text-center gx-mb-1 font-extrabold flex justify-between items-center">
        <div className="gx-w-100 gx-text-center gx-bg-grey gx-text-uppercase gx-text-white gx-fs-lg gx-py-1 gx-font-weight-semi-bold ">Pending BETS</div>
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide">
      <Table
      locale={customLocale}
      scroll={{ x: true }}
          columns={columns}
          
          // dataSource={finalobject}
          dataSource={userLists}
          bordered
          
          size="small"
          pagination={false}
          className="text-sm"
          components={components} 
          
        />
        
      </div>
      <div className="background-color text-sm white-text text-center gx-my-1 gx-py-4  font-extrabold flex justify-between items-center">
      <Link className="" to="/main/ledger">
        <div className="gx-w-100 gx-text-center gx-bg-grey gx-text-uppercase gx-text-white gx-fs-lg gx-py-1 gx-font-weight-semi-bold ">BACK TO LIST</div>
        </Link >
      </div>
      </Col>
    </Row>
  );
};

export default UnsettleBets;
