import moment from "moment";
import { httpPost } from "../../../http/http";
import { useState } from "react";
import { Button, Modal, Table } from "antd";
import MyBetTabBmx from "../MyBetTabBmx/MyBetTabBmx";

function DecalaredCasinoBetList({closeDeclaredModal ,declaredBetList,totalProfitLoss}) {

    const columns = [
        {
            title: 'Team',
            dataIndex: 'playerName',
            key: 'playerName',
            render: (value, row) =>
                <span className="gx-py-1 gx-text-black gx-font-weight-semi-bold gx-text-center">
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
            render: (value, row) => <span className="gx-text-right gx-text-nowrap gx-font-weight-semi-bold gx-text-black">{row.odds}</span>
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
                <span className={`px-3 py-1 gx-font-weight-semi-bold gx-text-nowrap ${row.profitLoss < 0 ? "gx-text-red" : row.profitLoss > 0 ? "gx-text-green-0" : "text-black"}`}>{row.profitLoss}
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



  

    return (
        <>
       <Modal
      open={true}
      title={`Completed Casino Bet List`}
      onCancel={closeDeclaredModal}
      footer={
        <Button
          className="gx-bg-grey gx-text-white gx-border-redius0"
          onClick={() => closeDeclaredModal()}
        >
          Close
        </Button>
      }
      className="gx-px-3 "
    >
<MyBetTabBmx totalProfitLoss={Number(totalProfitLoss)} />
<Table className="gx-table-responsive "
            columns={columns}
            dataSource={declaredBetList}
            bordered
            pagination={false}

            size="small"
        />

        </Modal>
            
        </>
    )
}

export default DecalaredCasinoBetList
