// import React from 'react';
// import { Table } from 'antd';
// import moment from 'moment';

// export default function BetListTableMatka(props) {
//     const { betList } = props;

//     const columns = [
//         {
//             title: 'SR.',
//             dataIndex: 'index',
//             key: 'index',
//             render: (text, record, index) => index + 1,
//             align: 'center',
//         },
//         {
//             title: 'Matka Name',
//             dataIndex: 'matkaName',
//             key: 'matkaName',
//             align: 'left',
//         },
//         {
//             title: 'Bet Number',
//             dataIndex: 'betNumber',
//             key: 'betNumber',
//             align: 'center',
//         },
//         {
//             title: 'Game Type',
//             dataIndex: 'gameType',
//             key: 'gameType',
//             align: 'center',
//         },
//         {
//             title: 'Amt.',
//             dataIndex: 'amount',
//             key: 'amount',
//             render: (amount) => Number.parseFloat(Math.abs(amount)).toFixed(2).replace(/\.?0+$/, ""),
//             align: 'center',
//         },

//         {
//             title: 'Market Type',
//             dataIndex: 'betType',
//             key: 'betType',
//             align: 'center',
//         },


        
//         {
//             title: 'Result',
//             dataIndex: 'isDeclare',
//             key: 'isDeclare',
//             render: (isDeclare, record) => (isDeclare === 1 ? (record.result === null ? "Not Declare" : record.result) : "Not Declare"),
//             align: 'center',
//         },
//         {
//             title: 'P&L',
//             dataIndex: 'profitLoss',
//             key: 'profitLoss',
//             render: (profitLoss) => (
//                 <span className={profitLoss > 0 ? "text-red-500" : "text-green-800"}>
//                     {Number.parseFloat(Math.abs(profitLoss)).toFixed(2).replace(/\.?0+$/, "")}
//                 </span>
//             ),
//             align: 'center',
//         },
//         {
//             title: 'Created',
//             dataIndex: 'createdAt',
//             key: 'createdAt',
//             render: (createdAt) => createdAt ? moment(createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss") : '',
//             align: 'left',
//         },
//     ];

//     const dataSource = betList ? betList.map((tempData, index) => ({ ...tempData, key: index })) : [];

//     return (
//         <div className="gx-overflow-x-auto gx-w-full gx-text-uppercase">
//             <Table
//                 columns={columns}
//                 dataSource={dataSource}
//                 pagination={false}
//                 bordered
//                 size="small"
//                 scroll={{ x: true }}
//             />
//         </div>
//     );
// }





import React, { useState } from 'react';
import { Table, Modal, message, Button } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { httpPost } from '../../../http/http';


export default function BetListTableMatka(props) {
    const { betList, betListFunction } = props;
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleDeleteClick = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        setLoading(true);
        try {

            let reqData = {
                betId: selectedRecord?._id,
            }

            let responedCancel = await httpPost(`matka/matkaBetCancel`, reqData);
            if (responedCancel?.error == false) {
                message.success(responedCancel?.message || "Bet canceled successfully");
                betListFunction()
                setIsModalVisible(false);
                setSelectedRecord(null);
            }
            else {
                message.error(responedCancel?.message || "Failed to cancel bet");
            }

        } catch (error) {
            message.error("Failed to delete the bet");
        }
         setLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
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
            title: 'Market Type',
            dataIndex: 'betType',
            key: 'betType',
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
        {
            title: 'Cancel Bet',
            dataIndex: '',
            key: 'delete',
            render: (text, record) => (
                <> {record?.isDeleted ? <span className='gx-text-red'>Canceled</span> :
                    <Button
                        type="danger"
                        onClick={() => handleDeleteClick(record)}
                      
                    >
                        Cancel
                    </Button>
                }
                </>

            ),
            align: 'center',
        },
    ];

    const dataSource = betList ? betList.map((tempData, index) => ({ ...tempData, key: index })) : [];

    return (
        <div className="gx-overflow-x-auto gx-w-full gx-text-uppercase">
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                size="small"
                scroll={{ x: true }}
            />

            <Modal
                title="Confirm Cancel"
                visible={isModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
                 confirmLoading={loading} 
            >
                <p>Are you sure you want to Cancel this bet?</p>
            </Modal>
        </div>
    );
}

