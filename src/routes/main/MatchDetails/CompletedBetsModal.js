import { Button, Modal, Table } from "antd"

function CompletedBetsModal({ handleClose, totalSessionPlusMinus, completeddataList, compltedBetsColumn }) {
  return (
    <>
      <Modal
        open={true}
        title={`COMPLETED FANCY BET`}
        onCancel={handleClose}
        footer={
          <Button
            className="gx-bg-grey gx-text-white gx-border-redius0"
            onClick={() => handleClose()}
          > Close </Button>
        }
        className="gx-px-3"
      >
        <div className="gx-bg-flex gx-px-2 gx-justify-content-between gx-bg-grey gx-fs-lg gx-font-weight-semi-bold gx-text-white gx-py-1">
          <div>COMPLETED FANCY BETS</div> <div className={`${totalSessionPlusMinus >= 0 ? "gx-text-green" : "gx-text-red"}`}>{totalSessionPlusMinus ? Number.parseFloat(totalSessionPlusMinus).toFixed(2) : 0}</div>
        </div>
        <Table
          className="gx-w-100 gx-mx-0 gx-my-0"
          size="small"
          rowHoverable={false}
          title=""
          scroll={{ x: true }}
          dataSource={completeddataList}
          columns={compltedBetsColumn}
          pagination={false}
          bordered
          rowClassName={(row, index) => row.Type === 'NO' || row.Type === 'Khai' ? 'matchdtailsNoBackground' : row.Type === 'YES' || row.Type === 'Lagai' ? 'matchdtailsYesBackground' : "gx-bg-light-grey"}
        />
      </Modal>
    </>
  )
}

export default CompletedBetsModal
