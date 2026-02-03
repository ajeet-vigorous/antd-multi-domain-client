import { AutoComplete, Button, Col, Input, Modal, Row, Table } from "antd"
import { RxCross2 } from "react-icons/rx";

function BetPlaceModal({ setShowBetPlaceModal, timeLeft, betModalData, inputValue, setInputValue, processingBet, betChips, setTimeLeft, placeNewBet, options, handleInputChange }) {
  const handleClose = () => {
    setShowBetPlaceModal(false)
  }

  return (
    <>
      <Modal
        open={true}
        title={``}
        width={700}
        onCancel={handleClose}
        closeIcon={<span ><RxCross2 className="gx-text-grey gx-bg-transparent"  size={25} /></span>}
        footer={
          <Button
            className="gx-bg-grey gx-text-white gx-border-redius0 "
            onClick={() => handleClose()}
            
          >
            Close
          </Button>
        }
        className="gx-text-uppercase"
      >

        <Row id="betPLaceModal"
         justify={"center"}
         >
          {timeLeft > 0 && (
            <Col
              style={{ border: "2px solid #8B8000" }}
              className="gx-px-0 gx-py-0 gx-rounded-lg gx-d-none gx-d-lg-block  gx-mx-0 gx-my-2"
              xs={24}
              sm={22}
            >
              <div className="gx-my-1 gx-mx-1">
                <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
                  <div
                    style={{ gap: "20px" }}
                  // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
                  //   }`}
                  >
                    <span>{betModalData?.sessionName} </span>

                    <span>
                    Rate : {betModalData?.runs ? betModalData?.runs : "0"} [{betModalData?.odds ? betModalData?.odds  : 0}] 
                      <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF' : '#fff' }}>

                        (
                        {betModalData?.printData ? betModalData?.printData : ""})
                      </span>

                    </span>
                  </div>
                  <span
                    style={{ width: "30px", height: "30px" }}
                    className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
                  >
                    <span>{timeLeft}</span>
                  </span>
                </div>
                <div
                  style={{ gap: "10px" }}
                  className="gx-bg-flex  gx-justify-content-center gx-align-items-center"
                >
                  <span>Amount</span>
                  <span>
                    <Input
                      value={inputValue}
                      onChange={(values) => setInputValue(Number(values.target.value))}
                      type="number"
                      className="gx-font-weight-semi-bold gx-fs-lg"
                    />
                  </span>
                  <Button  className="gx-text-uppercase" onClick={() => setInputValue(0)} type="danger">
                      Clear
                    </Button>



















                  
                </div>
                <div className="gx-text-justify">
                  {/* {betChips &&
                    Object.keys(betChips).map((key, index) => {
                      // if (index % 4 === 0) {
                        return (
                          <div
                            key={`row-${index}`}
                            style={{
                              display: "flex",
                              // justifyContent: "center",
                              flexWrap: "wrap",
                              marginBottom: "10px",
                              // gap: "px", // Add gap between buttons
                              padding: "0 10px", // Add padding to the row for left/right spacing
                            }}
                          >
                            
                          </div>
                        );
                      // }
                      return null;
                    })} */}
                    {Object.keys(betChips)
                              // .slice(index, index + 4)
                              .map((subKey) => (
                                <Button
                                  className="gx-px-5 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
                                  key={subKey}
                                  onClick={() => setInputValue(betChips[subKey])}
                                  style={{ margin: "5px" }}
                                >
                                  {betChips[subKey]}
                                </Button>
                              ))}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "5px",
                    }}
                    className=""
                  >
                    
                    <Button
                     className="gx-text-uppercase"
                      onClick={() => {
                        setTimeLeft(0);
                        setInputValue(0);
                      }}
                      type="danger"
                    >
                      Close
                    </Button>
                    <Button
                    disabled={processingBet}
                    onClick={() => placeNewBet()}
                    className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
                      } gx-text-white gx-text-uppercase  gx-mb-0 gx-px-2`}
                  >
                    Done
                    {/* {/ <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center"> /} */}
                    {/* {/ <Button className="gx-px-2" size="small">Done</Button> /} */}
                    {processingBet && <div className="loaderSpinner gx-px-1"></div>}
                    {/* {/ </div> /} */}


                  </Button>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
        <Row id="betPLaceModal"
         justify={"center"}
         >
          {timeLeft > 0 && (
            <Col
              style={{ border: "2px solid #8B8000" }}
              className="gx-px-0 gx-py-0 gx-rounded-lg gx-d-lg-none gx-d-block  gx-mx-0 gx-my-2"
              xs={24}
              sm={22}
            >
              <div className="gx-my-1 gx-mx-1">
                <div className="gx-bg-flex gx-align-items-center gx-fs-xl  gx-px-5 ">
                  <div
                    style={{ gap: "20px" }}
                  // className={`gx-bg-flex   gx-justify-content-between ${betModalData?.printData === 'Lagai' || betModalData?.printData === 'Yes' ? 'gx-text-blue' : betModalData?.printData === 'Khai' || betModalData?.printData === 'No' ? 'gx-text-red' : 'gx-text-black'
                  //   }`}
                  >
                    <span>{betModalData?.sessionName} </span>

                    <span>
                    Rate : {betModalData?.runs ? betModalData?.runs : "0"} [{betModalData?.odds ? betModalData?.odds : 0}] 
                      <span style={{ color: betModalData?.printData === 'No' || betModalData?.printData === 'Khai' ? '#FAA9BA' : betModalData?.printData === 'Yes' || betModalData?.printData === 'Lagai' ? '#72BBEF' : '#fff' }}>

                        (
                        {betModalData?.printData ? betModalData?.printData : ""})
                      </span>

                    </span>
                  </div>
                  <span
                    style={{ width: "30px", height: "30px" }}
                    className="gx-bg-grey gx-bg-flex gx-justify-content-center gx-align-items-center gx-rounded-circle gx-font-weight-semi-bold gx-fs-xl gx-text-white gx-text-center"
                  >
                    <span>{timeLeft}</span>
                  </span>
                </div>
                <div
                  style={{ gap: "10px" }}
                  className="gx-bg-flex gx-mt-3 gx-justify-content-center gx-align-items-center"
                >
                  <span>Amount</span>
                  <span>
                    <Input
                      value={inputValue}
                      onChange={(values) => setInputValue(Number(values.target.value))}
                      type="number"
                      className="gx-font-weight-semi-bold gx-fs-lg"
                    />
                  </span>

                  <Button  className="gx-text-uppercase gx-bg-yellow gx-text-black" onClick={() => setInputValue(0)} >
                      Clear
                    </Button>










                 
                </div>
                <div className="gx-text-justify gx-mt-2">
                  {/* {betChips &&
                    Object.keys(betChips).map((key, index) => {
                      // if (index % 4 === 0) {
                        return (
                          <div
                            key={`row-${index}`}
                            style={{
                              display: "flex",
                              // justifyContent: "center",
                              flexWrap: "wrap",
                              marginBottom: "10px",
                              // gap: "px", // Add gap between buttons
                              padding: "0 10px", // Add padding to the row for left/right spacing
                            }}
                          >
                            
                          </div>
                        );
                      // }
                      return null;
                    })} */}
                    {Object.keys(betChips)
                              // .slice(index, index + 4)
                              .map((subKey) => (
                                <Button
                                  className="gx-px-2 gx-font-weight-semi-bold gx-text-white gx-bg-grey gx-bg-grey"
                                  key={subKey}
                                  onClick={() => setInputValue(betChips[subKey])}
                                  style={{ margin: "4px" }}
                                >
                                  {betChips[subKey]}
                                </Button>
                              ))}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "1px",
                    }}
                    className="gx-mt-1"
                  >
                    
                    <Button
                     className="gx-text-uppercase"
                      onClick={() => {
                        setTimeLeft(0);
                        setInputValue(0);
                      }}
                      type="danger"
                    >
                      Close
                    </Button>
                    <Button
                    disabled={processingBet}
                    onClick={() => placeNewBet()}
                    className={`${processingBet ? "gx-bg-primary" : "gx-bg-primary"
                      } gx-text-white gx-text-uppercase  gx-mb-0 gx-px-2`}
                  >
                    Done
                    {/* {/ <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center"> /} */}
                    {/* {/ <Button className="gx-px-2" size="small">Done</Button> /} */}
                    {processingBet && <div className="loaderSpinner gx-px-1"></div>}
                    {/* {/ </div> /} */}


                  </Button>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>

      </Modal>
    </>
  )
}

export default BetPlaceModal
