import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import Auxiliary from "util/Auxiliary";
import { userLedgerList } from "../../../appRedux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BackMenuButton from "../../../components/BackMenu";
import Loader from "../../../components/loader";

const Ledger = () => {
  const [userLadger, setLadger] = useState([]);
  const [calAmount, setCalAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const dispatch = useDispatch();

  const { userLedgerListData, loading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    userLedger();
  }, [dispatch]);

  useEffect(() => {
    if (userLedgerListData) {
      const { calAmount, creditAmount, debitAmount, ledgerData } = userLedgerListData;
      const filteredData = ledgerData.map((item, index) => ({
        key: `${item.userId}-${index}`,
        userID: `${item.userId}`,
        createdAt: item.createdAt,
        eventName: item.eventName,
        balance: item.balance,
        debit: item.amount < 0 ? item.amount : 0,
        credit: item.amount > 0 ? item.amount : 0,
        ledgerType: item.ledgerType,
        remark: item.remark,
        userType: item.userType,
        marketId: item.marketId,
        date: item.date,
        eventId: item?.eventId
      }));
      setLadger(filteredData);
      setCalAmount(calAmount);
      setCreditAmount(creditAmount);
      setDebitAmount(debitAmount);
    }
  }, [userLedgerListData]);

  const userLedger = async () => {
    let localData = JSON.parse(localStorage.getItem('user_id_tvs99'));
    let reqData = {
      downlineUserId: localData?.data?.userId,
    };
    dispatch(userLedgerList(reqData));
  };

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Auxiliary>

          <Row justify={"center"}>
            <Col xl={16} lg={16} md={22} sm={24} xs={24}>
              <div className="gx-py-1 gx-bg-grey ">
                <div className="gx-bg-flex gx-justify-content-center gx-text-white gx-font-weight-semi-bold">
                  MY LEDGER
                </div>
              </div>
              <Row justify={"center"} className="gx-py-3  gx-fs-sm gx-font-weight-semi-bold gx-text-light-gray"  >
              <Col className="gx-py-md-1 gx-py-1" xs={10} sm={8}>
                  <span className="gx-font-weight-semi-bold gx-fs-lg gx-px-2"> Lena:</span>

                  <span className="gx-fs-lg gx-font-weight-semi-bold  gx-text-green-0">
                    {Number.parseFloat(Math.abs(creditAmount ? creditAmount : 0)).toFixed(2)}
                  </span>
                </Col>

                <Col className="gx-bg-flex gx-py-md-1 gx-py-1 gx-justify-content-center " xs={10} sm={8}>
                  <span className="gx-font-weight-semi-bold gx-fs-lg gx-px-2"> Dena:</span>
                  <span className="gx-fs-lg gx-font-weight-semi-bold   gx-text-red">
                    {Number.parseFloat(Math.abs(debitAmount ? debitAmount : 0)).toFixed(2)}
                  </span>
                </Col>
            
                <Col className="gx-py-md-1 gx-py-1" xs={8} sm={8}>
                  <span className="gx-font-weight-semi-bold gx-fs-lg gx-px-2 " > Balance:</span>

                  <span className={`gx-fs-lg gx-font-weight-semi-bold  ${calAmount < 0 ? "gx-text-red" : "gx-text-green-0"}`}>
                    {Number.parseFloat(Math.abs(calAmount ? calAmount : 0)).toFixed(2)}
                  </span>
                </Col>
              </Row>

              <Table className="gx-table-responsive" dataSource={userLadger} bordered pagination={false}>
                <Table.Column
                  className="llllll "
                  title="DESCRIPTION"
                  dataIndex="eventName"
                  align="center"
                  render={(value, row) => {
                   
                    if (row.ledgerType === "diamondCasino") {

                      return (
                        <Link to={`/main/ledger-casino-details/${row?.eventId}/${row?.ledgerType}/${row?.date}`}>

                          <span className="gx-text-link">{row.eventName} ({moment(row.createdAt).format('DD-MMM-YYYY')})</span>
                        </Link>
                      );
                    } if (row.ledgerType === "internationalCasino") {
                      return (
                      <Link to={`/main/international-ledger-casino-details/${row?.marketId}/${row?.ledgerType}/${row?.date}`}>

                        <span className="gx-text-link">{row.eventName} ({moment(row.createdAt).format('DD-MMM-YYYY')})</span>
                      </Link>
                       );

                    }
                    else {
                      return (
                        <Link to={`/main/ledger-details/${row?.marketId}`}>
                          <span className="gx-text-link">{row.eventName} ({moment(row.createdAt).format('DD-MMM-YYYY')})</span>
                        </Link>
                      );
                    }
                  }}
                />

                <Table.Column
                  className="llllll"
                  title="WON BY"
                  align="center"
                  dataIndex="remark"
                  render={(value, row) => <span className="">{row.remark}</span>}
                />
                <Table.Column
                  title="DENA"
                  className="llllll"
                  dataIndex="debit"
                  align="center"
                  render={(value) => (
                    <span className="gx-text-red">{value < 0 ? Number.parseFloat(Math.abs(value)).toFixed(2).replace(/\.?0+$/, '') : 0}</span>
                  )}
                />
                <Table.Column
                  title="LENA"
                  className="llllll "
                  dataIndex="credit"
                  align="center"
                  render={(value) => (
                    <span className="gx-text-green-0">{value > 0 ? Number.parseFloat(Math.abs(value)).toFixed(2).replace(/\.?0+$/, '') : 0}</span>
                  )}
                />
                <Table.Column
                  title="HISAB"
                  className="llllll "
                  dataIndex="balance"
                  align="center"
                  render={(value, row) => (
                    <span className={`${row.balance > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>
                      {row.balance ? Number.parseFloat(Math.abs(row.balance)).toFixed(2).replace(/\.?0+$/, '') : 0}
                    </span>
                  )}
                />
              </Table>
            </Col>
          </Row>
          <div className="gx-py-4">

            <BackMenuButton />
          </div>
        </Auxiliary>
      }
    </>
  );
};

export default Ledger;
