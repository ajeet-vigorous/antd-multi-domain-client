import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PiCricketFill, PiTelevisionSimpleBold } from "react-icons/pi";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getMatchList } from "../../../appRedux/actions/User";
import { FaTableTennis } from "react-icons/fa";
import { IoFootballSharp } from "react-icons/io5";
import moment from "moment";
import settings from "../../../domainConfig";

const columns = [
  {
    title: "S/N",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (value, row) => <span className="gx-text-nowrap">{row.name}</span>
  },
  {
    title: "Open Date",
    dataIndex: "opendate",
    key: "opendate",
    render: (value, row) => (
      <span className="gx-text-nowrap">{row.opendate}</span>
    ),
  },
  {
    title: "Competition",
    dataIndex: "competition",
    key: "competition",
  },
  {
    title: "Inplay",
    dataIndex: "inplay",
    key: "inplay",
    render: () => (
      <Tag color="#108ee9" className="gx-border-redius0">
        Inplay
      </Tag>
    ),
  },
  {
    title: "Details",
    dataIndex: "",
    key: "x",
    render: (text, record) => (
      <Link
        to={`/main/match-deatils/${record.marketId}/${record.eventId}`}
        className="link-button"
      >
        Details
      </Link>
    ),
  },
];

const Matches = () => {
  const { matchList, loadingMatch } = useSelector((state) => state.UserReducer);
  const [matchData, setMatchData] = useState([]);
  const [activeTab, setActiveTab] = useState(4);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // localStorage.removeItem('matchList');
  //   dispatch(getMatchList());
  // }, []);

  // let adminMatchList = JSON.parse(localStorage.getItem("matchList"));
  // useEffect(() => {
  //   let matchListData = adminMatchList ? adminMatchList : matchList;
  //   const sortedSessions = matchListData?.sort((a, b) => a.priority - b.priority);
  //   if (sortedSessions) {
  //     const data = sortedSessions?.filter(element=> element.sportId === activeTab)?.map((item, index) => ({
  //       key: item._id,
  //       sn: index + 1,
  //       name: item.matchName,
  //       matchDate: item.matchDate,
  //       seriesName: item.seriesName,
  //       inplay: item.status,
  //       matchName: item.matchName,
  //       marketId: item.marketId,
  //       eventId: item.eventId,
  //       cacheUrl: item.cacheUrl,
  //     }));
  //     setMatchData(data);
  //   }
  // }, [matchList,activeTab]);







  useEffect(() => {
    // localStorage.removeItem('matchList');
    dispatch(getMatchList());
  }, []);

  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));


  const parseMatchDate = (dateString) => {
    if (!dateString) return null; // Handle empty case
    const [datePart, timePart] = dateString.split(' ');

    if (!timePart) return null; // Handle cases with only date

    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    const isPM = timePart.includes('PM');

    let hour = parseInt(hours, 10);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minutes);
  };

  const sortMatchData = (data) => {
    return data?.sort((a, b) => {
      const dateA = parseMatchDate(a.matchDate);
      const dateB = parseMatchDate(b.matchDate);
      const isAM_A = a.matchDate.includes('AM');
      const isAM_B = b.matchDate.includes('AM');
      const hasTimeA = a.matchDate.includes(':');
      const hasTimeB = b.matchDate.includes(':');

      // Check for valid AM/PM and time
      const isValidA = !!dateA && (isAM_A || a.matchDate.includes('PM'));
      const isValidB = !!dateB && (isAM_B || b.matchDate.includes('PM'));

      // Sort based on AM/PM status and valid dates
      if (isValidA && isValidB) {
        if (isAM_A && !isAM_B) return -1; // A is AM, B is PM
        if (!isAM_A && isAM_B) return 1;  // A is PM, B is AM
        return dateA - dateB; // Both valid, sort by date
      } else if (isValidA) {
        return -1; // A is valid, B is invalid
      } else if (isValidB) {
        return 1; // B is valid, A is invalid
      } else {
        // Both invalid or without AM/PM
        if (!isAM_A && !isAM_B) {
          // Both are invalid, but A has time and B does not
          if (hasTimeA && !hasTimeB) return 1; // A goes last
          if (!hasTimeA && hasTimeB) return -1; // B goes last
          return 0; // Both go last
        }
        return 0; // Both invalid or both with no time
      }
    });
  };
  //   const parseMatchDate = (dateString) => {
  //     if (!dateString) return null; // Handle empty case
  //     const [datePart, timePart] = dateString.split(' ');

  //     if (!timePart) return null; // Handle cases with only date

  //     const [day, month, year] = datePart.split('-');
  //     const [hours, minutes] = timePart.split(':');
  //     const isPM = timePart.includes('PM');

  //     let hour = parseInt(hours, 10);
  //     if (isPM && hour !== 12) hour += 12;
  //     if (!isPM && hour === 12) hour = 0;

  //     return new Date(year, month - 1, day, hour, minutes);
  // };

  // const sortMatchData = (data) => {
  //     return data?.sort((a, b) => {
  //         const dateA = parseMatchDate(a.matchDate);
  //         const dateB = parseMatchDate(b.matchDate);

  //         if (!dateA && !dateB) return 0; // Both invalid
  //         if (!dateA) return 1; // A is invalid
  //         if (!dateB) return -1; // B is invalid

  //         const now = new Date();

  //         // Check if dates are in the future or past
  //         const isAFuture = dateA > now;
  //         const isBFuture = dateB > now;

  //         if (isAFuture && !isBFuture) return -1; // A is future, B is past
  //         if (!isAFuture && isBFuture) return 1;  // B is future, A is past

  //         // If both are future, sort by date
  //         if (isAFuture && isBFuture) {
  //             return dateA - dateB; // Sort by date
  //         }

  //         // If both are past, sort by date but keep later dates at the bottom
  //         return dateA - dateB; // Later past dates go to the bottom
  //     });
  // };

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;
    // Filter matches by sportId and sort by date

    const sortedMatchList = matchListData?.sort((a, b) => a.priority - b.priority);
    const filteredAndSortedData = sortedMatchList?.filter(element => element.sportId === activeTab)?.map((item, index) => ({
      key: item._id,
      sn: index + 1,
      name: item.matchName,
      matchDate: item.matchDate,
      seriesName: item.seriesName,
      inplay: item.status,
      matchName: item.matchName,
      marketId: item.marketId,
      eventId: item.eventId,
      cacheUrl: item.cacheUrl,
      status: item.status
    })).sort((a, b) => moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")) ? -1 : 1);
    setMatchData(filteredAndSortedData);
  }, [matchList, activeTab]);

  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;
  const history = useHistory();
  return (
    <>
      {/* {loadingMatch ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "small" }}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "small" }}
          >
            <Spin tip="Loading..." size="large">
              {" "}
              {content}
            </Spin>
          </div>
        </div>
      ) : ( */}
      {/* <Card title=""> */}
      {/* <div style={{ backgroundColor: "rgb(240,240,240)" }}> */}

      {settings?.sportFlag && <Row className="gx-px-2  gx-border-bottom-2" style={{ backgroundColor: "rgb(240,240,240)" }} >
        <Col className="gx-my-2" xs={8}>
          <Button onClick={() => { setActiveTab(4) }}


            className={`gx-w-100 gx-border-0 gx-pl-0 gx-pl-0   gx-m-0 ${activeTab === 4
              ? "gx-bg-grey gx-text-white gx-box-shadow"
              : "gx-bg-white gx-text-black"
              }   `}
          >
            <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><PiCricketFill /> <span>Cricket</span></span>

          </Button>
        </Col>
        <Col className="gx-my-2" xs={8}>
          <Button onClick={() => setActiveTab(1)}

            className={`gx-w-100 gx-border-0 gx-pl-0   gx-m-0 ${activeTab === 1
              ? "gx-bg-grey gx-text-white gx-box-shadow"
              : "gx-bg-white gx-text-black"
              }   `}
          >
            <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><IoFootballSharp /> <span>Football</span></span>

          </Button>
        </Col>
        <Col className="gx-my-2" xs={8}>
          <Button
            onClick={() => {

              setActiveTab(2)
            }}


            className={`gx-w-100 gx-border-0 gx-pl-0   gx-m-0 ${activeTab === 2
              ? "gx-bg-grey gx-text-white gx-box-shadow"
              : "gx-bg-white gx-text-black "
              }   `}
          >
            <span className="gx-bg-flex gx-gap-4 gx-mx-auto  gx-justify-content-center gx-align-items-center"><FaTableTennis size={15} /> <span>Tennis</span></span>
          </Button>
        </Col>

      </Row >
      }
      {/* </div> */}
      {
        matchData?.length > 0 ? matchData?.map((element, index) => (
          <>
            {element.status === 'INPLAY' ?

              <a
                href={`/main/match-deatils/${element.marketId}/${element.eventId}`} // Optional: for accessibility
              >
                <Row
                  justify={"center"}

                  onClick={() => history.push(`/main/match-deatils/${element.marketId}/${element.eventId}`)}

                  className="gx-bg-flex gx-px-2 gx-py-3  gx-box-shadow gx-align-items-center gx-justify-content-start"
                  key={index}
                >


                  <Col lg={5}>
                    <div className="gx-fs-md gx-d-none gx-d-lg-block gx-font-weight-semi-bold gx-pb-1 gx-text-black">
                      {element?.seriesName}
                    </div>
                    <div
                      style={{
                        borderTopRightRadius: "100px",
                        borderBottomRightRadius: "100px",
                      }}
                      className="gx-px-1  gx-bg-grey responsive-text  gx-text-white gx-py-2"
                    >
                      <div className="gx-text-truncate gx-my-1 gx-font-weight-semi-bold ">
                        {element?.matchName}
                      </div>
                      <div className="">{moment(element.matchDate, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY hh:mm A")}</div>
                    </div>
                  </Col>
                  <Col
                    className="gx-bg-flex gx-px-2 gx-align-items-center gx-justify-content-center"
                    lg={4}
                    xl={5}
                  >
                    {/* {element.inplay === "INPLAY" ? (
                  <div className="newBlinking gx-mx-1 "></div>
                ) : null}
                 */}

                    {
                      (() => {
                        const inputMoment = moment(element.matchDate, "DD-MM-YYYY HH:mm:ss A");
                        const currentMoment = moment().add(30, "minutes");
                        return currentMoment.isSameOrAfter(inputMoment) ?
                          <div className="newBlinking gx-mx-1 "></div>
                          : '';
                      })()
                    }

                    <span className="gx-mx-1 gx-text-primary gx-fs-lg">
                      <PiTelevisionSimpleBold />
                    </span>
                    <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                      B
                    </span>
                    <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                      F
                    </span>
                  </Col>
                  <Col className="gx-bg-flex gx-my-1" lg={12}>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsYesBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsNoBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsYesBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsNoBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsYesBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                    <div
                      style={{ width: "9rem", gap: "3px" }}
                      className="inplayElement matchdtailsNoBackground"
                    >
                      {Math.random().toFixed(2)}
                    </div>
                  </Col>
                  <div className="gx-fs-md gx-px-2 gx-d-lg-none gx-d-block gx-font-weight-semi-bold gx-pb-1 gx-text-black">
                    {element?.seriesName}
                  </div>
                </Row></a> :

              <Row
                justify={"center"}
                onClick={() => alert('MATCH WILL BE STARTED SOON')}
                // onClick={() => history.push(`/main/match-deatils/${element.marketId}/${element.eventId}`)}
                className="gx-bg-flex gx-px-2 gx-py-3  gx-box-shadow gx-align-items-center gx-justify-content-start"
                key={index}
              >



                <Col lg={5}>
                  <div className="gx-fs-md gx-d-none gx-d-lg-block gx-font-weight-semi-bold gx-pb-1">
                    {element?.seriesName}
                  </div>
                  <div
                    style={{
                      borderTopRightRadius: "100px",
                      borderBottomRightRadius: "100px",
                    }}
                    className="gx-px-1  gx-bg-grey responsive-text  gx-text-white gx-py-2"
                  >
                    <div className="gx-text-truncate gx-my-1 gx-font-weight-semi-bold ">
                      {element?.matchName}
                    </div>
                    <div className="">{moment(element.matchDate, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY hh:mm A")}</div>
                  </div>
                </Col>
                <Col
                  className="gx-bg-flex gx-px-2 gx-align-items-center gx-justify-content-center"
                  lg={4}
                  xl={5}
                >
                  {element.inplay === "INPLAY" ? (
                    <div className="newBlinking gx-mx-1 "></div>
                  ) : null}
                  <span className="gx-mx-1 gx-text-primary gx-fs-lg">
                    <PiTelevisionSimpleBold />
                  </span>
                  <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                    B
                  </span>
                  <span className="gx-mx-1 gx-text-primary gx-font-italic gx-fs-lg">
                    F
                  </span>
                </Col>
                <Col className="gx-bg-flex gx-my-1" lg={12}>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsYesBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsNoBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsYesBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsNoBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsYesBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                  <div
                    style={{ width: "9rem", gap: "3px" }}
                    className="inplayElement matchdtailsNoBackground"
                  >
                    {Math.random().toFixed(2)}
                  </div>
                </Col>
                <div className="gx-fs-md gx-px-2 gx-d-lg-none gx-d-block gx-font-weight-semi-bold gx-pb-1">
                  {element?.seriesName}
                </div>



              </Row>
            }
          </>
        ))
          :
          <div className="gx-text-center gx-text-black gx-fs-lg gx-font-weight-semi-bold gx-py-2"> No Match Found</div>

      }
      {/* </Card> */}
      {/* {/ )} /} */}
    </>
  );
};

export default Matches;
