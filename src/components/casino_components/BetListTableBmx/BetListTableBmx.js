import React, { useEffect, useState } from "react";
import { Card, Spin, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from 'moment';

const columns = [
    {
        title: 'Team',
        dataIndex: 'playerName',
        key: 'playerName',
        render: (value, row) =>
            <span className="gx-py-1  gx-text-black gx-font-weight-semi-bold gx-text-center">
                {row.playerName}
                <br />
                {row.roundId}
            </span>
    },
    {
        title: 'Mode',
        dataIndex: 'betType',
        key: 'betType',
        render: (value, row) => <span className="gx-text-center gx-text-nowrap gx-font-weight-semi-bold gx-text-black">{row.betType}</span>
    },
    {
        title: 'Rate',
        dataIndex: 'odds',
        key: 'odds',
        render: (value, row) => <span className="gx-text-right gx-text-nowrap gx-font-weight-semi-bold gx-text-black">{(parseFloat(row.odds)).toFixed(2).replace(/\.?0+$/, "")}</span>
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (value, row) => <span className="gx-text-center gx-text-nowrap gx-font-weight-semi-bold gx-text-black">{row.amount}</span>
    },
    {
        title: 'Result',
        dataIndex: 'betType',
        key: 'betType',
        render: (value, row) =>
            <span className={`px-3 py-1 gx-text-nowrap gx-font-weight-semi-bold ${row.profitLoss < 0 ? "gx-text-red" : row.profitLoss > 0 ? "gx-text-green-0" : "text-black"}`}>{row.profitLoss}
                <br />
                {row.isDeclare === 1 ?
                    <small>({row.showResult})</small> : null
                }
            </span>
    },
    {
        title: 'Date & Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value, row) => <span className="gx-text-center gx-text-nowrap gx-font-weight-semi-bold gx-text-black">
            {moment(row?.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss")}
        </span>

    },
];

export default function BetListTableBmx(props) {
    const { betList } = props;
    return (

        // <Card title="Active Matches ">
        <Table className="gx-table-responsive "
            columns={columns}
            dataSource={betList}
            bordered
            pagination={false}
            size="small"
        />
        // </Card>

    );
}