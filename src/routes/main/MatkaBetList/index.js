import React, { useEffect, useState } from "react";
import { Col, DatePicker, Row, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getMatkaBetList } from "../../../appRedux/actions/User";
import Loader from "../../../components/loader";
import BackMenuButton from "../../../components/BackMenu";

const MatkaBetLists = () => {
    const [isMatkaBetList, setMatkaBetList] = useState([]);
    const [showDate, setShowDate] = useState({
        startDate: moment(),
        endDate: moment()
      });
    const [selectedGameType, setSelectedGameType] = useState(null);
    const [selectedMatkaName, setSelectedMatkaName] = useState(null);
    const dispatch = useDispatch();
    const { loading, matkaBetListData } = useSelector((state) => state.UserReducer);

    const RangePicker = DatePicker.RangePicker;
    const { Option } = Select

    useEffect(() => {
        matkaBetList()
    }, [dispatch]);

    const matkaBetList = () => {

        let betReq = {
            fromDate: moment().format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
        };
        dispatch(getMatkaBetList(betReq));
    }

    useEffect(() => {
        if (matkaBetListData) {

            const filteredData = matkaBetListData.map((item, index) => ({
                
                
                key: `${index}`,
                matkaName: item.matkaName,
                betNumber: item.betNumber,
                gameType: item.gameType,
                amount: item.amount,
                isDeclare: item.isDeclare,
                profitLoss: item.profitLoss,
                createdAt: item.createdAt,
            }));

            const gameTypeFilteredData = selectedGameType
                ? filteredData.filter(item => item.gameType === selectedGameType)
                : filteredData;

            const matkaNameFilteredData = selectedMatkaName
                ? gameTypeFilteredData.filter(item => item.matkaName === selectedMatkaName)
                : gameTypeFilteredData;


            setMatkaBetList(matkaNameFilteredData);
        }
    }, [matkaBetListData, selectedGameType, selectedMatkaName]);
   
    

    const onChange = (dates) => {
        setShowDate({
            startDate: dates[0],
            endDate: dates[1]
        });
        const reqData = {
            toDate: dates[1].format("YYYY-MM-DD"),
            fromDate: dates[0].format("YYYY-MM-DD"),
        };
        dispatch(getMatkaBetList(reqData));
    };
    const handleGameTypeChange = (value) => {
        setSelectedGameType(value);
    };

    const handleMatkaNameChange = (value) => {
        setSelectedMatkaName(value);
    };

    const columns = [
        {
            title: 'SR.',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Matka Name',
            dataIndex: 'matkaName',
            key: 'matkaName',
            align: 'left',
        },
        {
            title: 'Bet Number',
            dataIndex: 'betNumber',
            key: 'betNumber',
            align: 'center',
        },
        {
            title: 'Game Type',
            dataIndex: 'gameType',
            key: 'gameType',
            align: 'center',
        },
        {
            title: 'Amt.',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => Number.parseFloat(Math.abs(amount)).toFixed(2).replace(/\.?0+$/, ""),
            align: 'center',
        },
        {
            title: 'Result',
            dataIndex: 'isDeclare',
            key: 'isDeclare',
            render: (isDeclare, record) => (isDeclare === 1 ? (record.result === null ? "Not Declare" : record.result) : "Not Declare"),
            align: 'center',
        },
        {
            title: 'P&L',
            dataIndex: 'profitLoss',
            key: 'profitLoss',
            render: (profitLoss) => (
                <span className={profitLoss > 0 ? "text-red-500" : "text-green-800"}>
                    {Number.parseFloat(Math.abs(profitLoss)).toFixed(2).replace(/\.?0+$/, "")}
                </span>
            ),
            align: 'center',
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => createdAt ? moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss") : '',
            align: 'left',
        },
    ];
    const uniqueGameTypes = Array.from(new Set(matkaBetListData?.map(item => item.gameType).filter(Boolean)));
    const uniqueMatkaName = Array.from(new Set(matkaBetListData?.map(item => item.matkaName).filter(Boolean)));
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="back-menu">
                        <Link to='/main/dashboard/'>
                            <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                                BACK TO MAIN MENU
                            </div>
                        </Link>
                    </div>
                    <Row justify={'center'} className="gx-mb-1">
                        <Col className="gx-mt-2 gx-py-md-0 gx-bg-flex gx-justify-content-center" sm={8} xs={24}>

                            <RangePicker
                                className="gx-border-redius0 "
                                ranges={{
                                    Today: [moment(), moment()],
                                    Yesterday: [
                                        moment().subtract(1, "days"),
                                        moment().subtract(1, "days"),
                                    ],
                                    "This Week": [
                                        moment().startOf("week"),
                                        moment().endOf("week"),
                                    ],
                                    "Last Week": [
                                        moment().subtract(1, "week").startOf("week"),
                                        moment().subtract(1, "week").endOf("week"),
                                    ],
                                    "This Month": [
                                        moment().startOf("month"),
                                        moment().endOf("month"),
                                    ],
                                    "Last Month": [
                                        moment().subtract(1, "month").startOf("month"),
                                        moment().subtract(1, "month").endOf("month"),
                                    ],
                                }}
                                onChange={onChange}
                                style={{ width: 300 }}
                                value={[showDate.startDate, showDate.endDate]}
                            />
                        </Col>

                        <Col className="gx-mt-2 gx-py-md-0 gx-bg-flex gx-justify-content-center" sm={8} xs={24}>
                            <Select size="large" placeholder="Matka Name" style={{ width: 300 }}
                             onChange={handleMatkaNameChange} 
                             value={selectedMatkaName}
                            >
                                {uniqueMatkaName.map((matkaName) => (
                                    <Option key={matkaName} value={matkaName} className='gx-text-uppercase'>
                                        {matkaName}</Option>

                                ))}
                            </Select>

                        </Col>

                        <Col className="gx-mt-2 gx-py-md-0 gx-bg-flex gx-justify-content-center" sm={8} xs={24}>
                            <Select size="large" placeholder="Games Type" style={{ width: 300 }} onChange={handleGameTypeChange} // Add onChange handler
                                value={selectedGameType} >
                                {uniqueGameTypes.map((gameType) => (
                                    <Option key={gameType} value={gameType}>{gameType}</Option>

                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <Table
                        className="gx-text-uppercase"
                        columns={columns}
                        dataSource={isMatkaBetList}
                        pagination={false}
                        bordered
                        size="small"
                        scroll={{ x: true }}
                    />
                </>
            }
        </>
    );
}

export default MatkaBetLists;
