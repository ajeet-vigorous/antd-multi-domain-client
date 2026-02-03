import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FaTimes } from "react-icons/fa";
import { Col, Divider, Row } from "antd";
import { Button, Flex } from "antd";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

export default function PlaceBetMobileBmxBet(props) {
  const {
    betSlipData,
    count,
    time,
    section1Ref,
    inputRef,
    updateStake,
    placeBet,
    updateStackOnclick,
    handleClose,
    betChipsData,
    LoadingBet,
  } = props;

  return (
    <div
      className="gx-py-1 gx-d-lg-block gx-d-none"
      ref={section1Ref}
      id="section1"
    >
      <div
        style={{ border: "2px solid #C99D1E", borderRadius: "5px" }}
        className="gx-p-1"
      >
        <div className="">
          <div className="gx-d-flex gx-justify-content-between gx-align-items-center">
            <div className="gx-text-black gx-fs-md gx-font-weight-bold gx-text-center gx-w-100 gx-text-nowrap">
              {betSlipData?.nat ? betSlipData?.nat : betSlipData?.nation} :
            </div>
            <span className="gx-w-100 gx-text-left">RATE : {count}</span>
            <div className="gx-bg-dark gx-rounded-circle gx-text-white gx-p-2">
              <CountdownCircleTimer
                isPlaying
                duration={7}
                colors={["#000000"]}
                colorsTime={[7]}
                size={20}
                strokeWidth={0}
                className="gx-bg-white gx-fs-lg"
              >
                {({ remainingTime }) => (remainingTime === 7 ? 7 : time)}
              </CountdownCircleTimer>
            </div>
          </div>
          <div
            className="gx-d-flex gx-justify-content-center gx-align-items-center"
            style={{ gap: "5px" }}
          >
            <span className="gx-text-black gx-fs-lg gx-font-weight-bold">
              AMOUNT
            </span>
            {LoadingBet ? (
              <input
                style={{ border: "2px solid #2B132D" }}
                ref={inputRef}
                type="number"
                className="gx-px-1 gx-ml-2"
                placeholder="0"
              />
            ) : (
              <input
                style={{ border: "2px solid #2B132D" }}
                ref={inputRef}
                type="number"
                className="gx-px-1 gx-ml-2"
                placeholder="0"
                value={betSlipData.stake}
                onChange={updateStake}
              />
            )}

            {/* <Button
                            onClick={placeBet}
                            style={{
                                backgroundColor: '#3A61A2',
                                borderRadius: '2px%',
                            }}
                            className='gx-postion-relative gx-text-white gx-rounded-xxl gx-mb-0 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-sm gx-px-5 gx-py-1'
                        >
                            {LoadingBet && (
                                <div className='gx-postion-absolute gx-d-flex gx-mb-0 gx-justify-content-center gx-align-items-center gx-w-100 gx-h-100 gx-bg-transparent'>
                                    <div
                                        style={{
                                            borderTop: '5px solid #ffffff',
                                            borderRadius: '50%',
                                            width: '1.25rem',
                                            height: '1.25rem',
                                            animation: 'spin 1s linear infinite'
                                        }}
                                    ></div>
                                </div>
                            )}
                            Done
                            <style>
                                {` @keyframes spin { 0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }} `}
                            </style>
                        </Button> */}
            <Button
              disabled={LoadingBet}
              onClick={() => placeBet()}
              className={`${LoadingBet ? "gx-bg-dark" : "gx-bg-grey"
                } gx-text-white gx-rounded-xxl gx-mb-0 gx-px-5`}
            >

              <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center">
                <div className="gx-px-2">Done</div>
                {LoadingBet && <div className="loaderSpinner "></div>}
              </div>



            </Button>
          </div>
        </div>
        <div className="gx-text-center gx-my-2">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              margin: "",
              gap: "5px",
              padding: "",
            }}
          >
            {betChipsData && betChipsData.length > 0
              ? betChipsData.map((element, index) => (
                <Button
                  style={{ backgroundColor: "#61ACDE", borderRadius: "6px" }}
                  onClick={() => updateStackOnclick(element)}
                  className=" gx-text-white gx-font-weight-bold gx-mb-0 gx-mr-0"
                  key={index}
                >
                  {element}
                </Button>
              ))
              : null}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "5px",
          }}
        >
          <Button
            className="gx-mb-0"
            type="danger"
            onClick={() => updateStackOnclick("0")}
          >
            Clear Input
          </Button>
          <Button
            className="gx-mb-0"
            type="danger"
            onClick={() => handleClose()}
          >
            Clear Close
          </Button>
        </div>
      </div>
    </div>
  );
}
