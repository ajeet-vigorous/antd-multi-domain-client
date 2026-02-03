import React, { useEffect, useState } from "react";
import { Col, Row, DatePicker, Table, Pagination, Button, Radio } from "antd";
import Auxiliary from "util/Auxiliary";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserStatement } from "../../../appRedux/actions/User";
import BackMenuButton from "../../../components/BackMenu";
import Loader from "../../../components/loader";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const Statement = () => {
  const [dateRange, setDateRange] = useState([
    moment().startOf("month"),
    moment().endOf("month"),
  ]);
  const [dates, setDates] = useState(dateRange);
  const [userLists, setUserLists] = useState([]);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalSize, setTotalSize] = useState(0)
  const [activeTab, setActiveTab] = useState(1);
  const [paginationicon, setPaginationIcon] = useState(true)
  const pageSize = 50;
  const dispatch = useDispatch();
  const { userStatement, loading, balanceAmount, message } = useSelector(state => state.UserReducer)
  const { userStatementMessage } = useSelector(state => state.UserReducer)

  const [displayedData, setDisplayedData] = useState([]);
  
  useEffect(() => {
    getUserStatementFun()
  }, [dispatch, currentPage, userId]);

  useEffect(() => {
    setDisplayedData([]);
    filterData();
  }, [userLists, activeTab]);

  useEffect(() => {
    if (!userStatement) return;
    
    let finalData = [];
    let balance = 0;
    
    try {
      if (userStatement?.totalCount) {
        // Case 1: Paginated data with totalCount
        if (userStatement?.statementData?.length > 0) {
          balance = Number(userStatement.balanceAmount) || 0;
          const reversedData = [...userStatement.statementData].reverse();
          
          finalData = reversedData.map((item, index) => {
            balance += Number(item.amount) || 0;
            return {
              key: `${index}`,
              createdAt: item.createdAt || '',
              remark: item.remark || '',
              amount: item.amount || 0,
              newAmount: balance,
              statementFor: item.statementFor || '',
            };
          }).reverse();
          
          setTotalSize(userStatement?.totalCount || 0);
          setPaginationIcon(true);
        }
      } else if (Array.isArray(userStatement) && userStatement.length > 0) {
        // Case 2: Array data without pagination
        balance = Number(userStatement.balanceAmount) || 0;
        let balanceReset = false;
        const reversedData = [...userStatement].reverse();
        
        finalData = reversedData.map((item, index) => {
          if(item.statementFor === "ACCOUNT_STATEMENT" && !balanceReset){
            balance = 0;
            balanceReset = true;
          }
          balance += Number(item.amount) || 0;
          return {
            key: `${index}`,
            createdAt: item.createdAt || '',
            remark: item.remark || '',
            amount: item.amount || 0,
            newAmount: balance,
            statementFor: item.statementFor || '',
          };
        }).reverse();
        
        setPaginationIcon(false);
      }
    } catch (error) {
      console.error("Error processing statement data:", error);
    }

    if (finalData.length > 0) {
      setUserLists(finalData);
      return;
    }

    // Case 3: Message-based data
    if (userStatementMessage?.data?.length > 0) {
      try {
        balance = Number(userStatementMessage.message) || 0;
        const reversedData = [...userStatementMessage.data].reverse();
        
        finalData = reversedData.map((item, index) => {
          if(item.statementFor === "ACCOUNT_STATEMENT"){
            balance = 0;
          }
          balance += Number(item.amount) || 0;
          return {
            key: `${index}`,
            createdAt: item.createdAt || '',
            remark: item.remark || '',
            amount: item.amount || 0,
            newAmount: balance,
            statementFor: item.statementFor || '',
          };
        }).reverse();
        
        setUserLists(finalData);
        setPaginationIcon(false);
      } catch (error) {
        console.error("Error processing message data:", error);
      }
    }
  }, [userStatement, userStatementMessage]);

  const getUserStatementFun = async () => {
    let reqData = {
      userId: userId,
      pageNo: currentPage,
      size: pageSize
    };
    dispatch(getUserStatement(reqData))
  }

  const filterData = () => {
    if (!userLists || userLists.length === 0) {
      return setDisplayedData([]);
    }
    
    const data = userLists.filter((item) => {
      if (!item.statementFor) return false;
      
      if (activeTab === 1) return true; // Show all
      if (activeTab === 2) return item.statementFor !== "ACCOUNT_STATEMENT";
      if (activeTab === 3) return item.statementFor === "ACCOUNT_STATEMENT";
      return true;
    });
    
    setDisplayedData(data || []);
  };

  const RangePicker = DatePicker.RangePicker;

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setCurrentPage(1);

    let reqData = {
      userId: userId,
      pageNo: currentPage,
      size: pageSize
    };

    if (tabIndex === 1) {
      reqData = {
        ...reqData,
        toDate: moment().format("YYYY-MM-DD"),
        fromDate: moment().subtract(60, "days").format("YYYY-MM-DD")
      };
    } 
    else if (tabIndex === 3) {
      reqData.statementFor = 'ACCOUNT_STATEMENT';
    } 
    else if (tabIndex === 2) {
      reqData.statementFor = 'profitLoss';
    }

    dispatch(getUserStatement(reqData));
    setDisplayedData([]);
  };

  const onChange = (dates) => {
    if (!dates || dates.length !== 2) return;
    
    setDates(dates);
    let reqData = {
      userId: userId,
      toDate: dates[1].format("YYYY-MM-DD"),
      fromDate: dates[0].format("YYYY-MM-DD"),
    };
    
    if (activeTab === 3) {
      reqData.statementFor = 'ACCOUNT_STATEMENT';
    }
    if (activeTab === 2) {
      reqData.statementFor = 'profitLoss';
    }
    
    dispatch(getUserStatement(reqData));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-bg-white gx-border gx-border-info">Prev</a>;
    }
    if (type === "next") {
      return <a className="gx-px-2 gx-fs-sm gx-py-2 gx-border gx-bg-white gx-border-info">Next</a>;
    }
    return originalElement;
  };

  return (
    <>
      {loading ? <Loader props={loading} /> :
        <Auxiliary>
          <Row justify={"center"}>
            <Col sm={16} xs={24} className="gx-col-full " >
              <div className="gx-py-2 gx-bg-grey gx-bg-flex gx-justify-content-center gx-text-white gx-w-100">
                MY ACCOUNT STATEMENT ({userLists?.length || 0})
              </div>
              
              <Row className="gx-bg-flex gx-align-items-center gx-w-100 gx-py-1" justify={"space-between"}>
                <Col className="gx-mt-3 gx-py-md-0 gx-py-2 gx-px-4" sm={8} xs={24}>
                  <RangePicker
                    className="gx-border-redius0 gx-ml-2 gx-w-100"
                    ranges={{
                      Today: [moment(), moment()],
                      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                      "This Week": [moment().startOf("week"), moment().endOf("week")],
                      "Last Week": [
                        moment().subtract(1, "week").startOf("week"),
                        moment().subtract(1, "week").endOf("week"),
                      ],
                      "This Month": [moment().startOf("month"), moment().endOf("month")],
                      "Last Month": [
                        moment().subtract(1, "month").startOf("month"),
                        moment().subtract(1, "month").endOf("month"),
                      ],
                    }}
                    onChange={onChange}
                    style={{ width: 300 }}
                    value={dates}
                  />
                </Col>
                
                <Col className="gx-text-white gx-fs-lg gx-py-md-0 gx-py-2 gx-font-weight-bold gx-bg-flex gx-align-items-center gx-justify-content-start" sm={12} xs={24}>
                  <Radio.Group size="small" className="gx-bg-flex gx-w-100 gx-py- gx-my-0 gx-align-items-center gx-justify-content-center">
                    <Radio.Button
                      className={`${activeTab === 1 ? "gx-bg-dark" : "gx-bg-primary"} gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(1)}
                      value="1"
                    >
                      All
                    </Radio.Button>
                    <Radio.Button
                      className={`${activeTab === 2 ? "gx-bg-dark" : "gx-bg-primary"} gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(2)}
                      value="2"
                    >
                      P&L
                    </Radio.Button>
                    <Radio.Button
                      className={`${activeTab === 3 ? "gx-bg-dark" : "gx-bg-primary"} gx-text-white gx-py- gx-my-0`}
                      onClick={() => handleTabClick(3)}
                      value="3"
                    >
                      Account
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>

              <Table
                className="gx-table-responsive"
                dataSource={displayedData}
                pagination={false}
                bordered
                rowKey="createdAt"
                locale={{ emptyText: 'No data available' }}
              >
                <Table.Column
                  className="llllll gx-text-nowrap"
                  title="Date"
                  dataIndex="createdAt"
                  key="createdAt"
                  render={(text) => text ? moment(text).utcOffset("+05:30").format("DD MMM YY") : '-'}
                />
                <Table.Column
                  title="Description"
                  className="llllll gx-text-nowrap"
                  dataIndex="remark"
                  key="remark"
                  render={(text) => <div className="truncate">{text || '-'}</div>}
                />
                <Table.Column
                  title="CREDIT"
                  className="llllll gx-text-nowrap"
                  dataIndex="amount"
                  key="credit"
                  render={(text) => (
                    text > 0 ? (
                      <div className="gx-text-primary gx-font-weight-bold gx-fs-md">
                        {Number.parseFloat(Math.abs(text || 0)).toFixed(2).replace(/\.?0+$/, "")}
                      </div>
                    ) : (
                      <div>0</div>
                    )
                  )}
                />
                <Table.Column
                  title="DEBIT"
                  className="llllll gx-text-nowrap"
                  dataIndex="amount"
                  key="debit"
                  render={(text) => (
                    text < 0 ? (
                      <div className="gx-text-red gx-font-weight-bold gx-fs-md">
                        {Number.parseFloat(Math.abs(text || 0)).toFixed(2).replace(/\.?0+$/, "")}
                      </div>
                    ) : (
                      <div>0</div>
                    )
                  )}
                />
                <Table.Column
                  title="Balance"
                  className="llllll gx-text-nowrap"
                  dataIndex="newAmount"
                  key="balance"
                  render={(text) => (
                    <div className="gx-text-black gx-font-weight-bold gx-fs-md">
                      {Number.parseFloat(text || 0).toFixed(2).replace(/\.?0+$/, "")}
                    </div>
                  )}
                />
              </Table>
             
              {paginationicon && totalSize > 0 && (
                <Pagination
                  className="gx-mt-3"
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalSize}
                  onChange={handlePageChange}
                  itemRender={itemRender}
                  showSizeChanger={false}
                />
              )}
              
              <div className="gx-py-4">
                <Link to='/main/dashboard/'>
                  <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                    BACK TO MAIN MENU
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Auxiliary>
      }
    </>
  );
};

export default Statement;