import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getMatkaList } from "../../../appRedux/actions/User";
import Loader from "../../../components/loader";



const MatkaList = () => {
    const [matkaList, setMatkaList] = useState([]);

    const dispatch = useDispatch();
    const { getMatkaListData, loading } = useSelector((state) => state.UserReducer);

    useEffect(() => {
        dispatch(getMatkaList());
    }, [dispatch]);

    useEffect(() => {
        if (getMatkaListData) {
            const sortedSessions = getMatkaListData.sort((a, b) => a.priority - b.priority);
            const filteredData = sortedSessions?.filter(item => item.matkaStatus === true)?.map((item, index) => ({
                key: `${item._id}-${index}`,
                isDeclare: item.isDeclare,
                isDeleted: item.isDeleted,
                _id: item._id,
                name: item.name,
                shortName: item.shortName,
                sportsId: item.sportsId,
                matkaEventId: item.matkaEventId,
                maxStake: item.maxStake,
                minStake: item.minStake,
                betStatus: item.betStatus,
                matkaStatus: item.matkaStatus,
                openTime: item.showOpenTime,
                closeTime: item.closeTime,
                resultTime: item.resultTime,
                priority: item.priority,
                createdAt: item.createdAt,
                isHaroopAndarBahar: item?.isHaroopAndarBahar
            }));
            setMatkaList(filteredData);
        }
    }, [getMatkaListData]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <Row justify={'end'} className="gx-py-2">
                        <Col xl={24} lg={24} md={24} xs={24}>
                            <Link to='/main/matka-bet-list'>
                                <div style={{ color: "#26122D" }} className="gx-bg-light-grey-7 gx-py-2 gx-fs-xl gx-text-uppercase gx-font-weight-heavy gx-bg-flex gx-justify-content-center">
                                    Matka Bet List
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        {matkaList.map((item) => (
                            <Col xs={24} key={item.key} className="gx-my-2">

                                {item?.isHaroopAndarBahar === true ? (

                                    <Link to={`/main/satta-matkas/${item.matkaEventId}`}>
                                        <div className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white">
                                            {item.name} - {moment().format('DD-MM-YYYY')}
                                        </div>
                                        <div className="gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1">
                                            <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">
                                                {moment().format('DD-MM-YYYY')} {moment(item.openTime, 'HH:mm').format('hh:mm A')}
                                            </span>
                                        </div>
                                    </Link>

                                ) : (
                                    <Link to={`/main/matka-type/${item.name}/${item.matkaEventId}`}>
                                        <div className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-py-1 gx-text-white gx-text-uppercase">
                                            {item.name} - {moment().format('DD-MM-YYYY')}
                                        </div>
                                        <div className="gx-bg-flex gx-justify-content-center gx-bg-white gx-py-1">
                                            <span className="gx-text-blue gx-font-weight-semi-bold gx-fs-lg">
                                                {moment().format('DD-MM-YYYY')} {moment(item.openTime, 'HH:mm').format('hh:mm A')}
                                            </span>
                                        </div>
                                    </Link>
                                )}
                                {/* <Link to={`/main/satta-matka/${item.matkaEventId}`}> */}

                            </Col>
                        ))}
                    </Row>
                    <div className="back-menu gx-mt-3">
                        <Link to='/main/dashboard/'>
                            <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                                BACK TO MAIN MENU
                            </div>
                        </Link>
                    </div>
                </>
            }
        </>
    );
}

export default MatkaList;
