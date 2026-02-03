import React from 'react';
import BetLockedRounded from "../BetLockedRounded/BetLockedRounded";
import { Image, Typography } from 'antd';

const { Paragraph } = Typography;
export default function CasinoCard(props) {
    const { Data, num, handleBackOpen, posArray, section1Ref } = props;
    return (
        <div className="gx-d-flax gx-justify-content-center">
            <div className="gx-position-relative gx-d-flex  gx-justify-content-center">
            {Data?.gstatus === "0" || Data?.gstatus == "SUSPENDED" ? (
                    <>
                        <img src={`/assets/images/casino-images/${num}.jpg`} alt="aaaaaa" className="gx-rounded-sm"
                            style={{ height: '4rem', width:"3rem" }} />
                        <BetLockedRounded />
                    </>
                ) : (
                    <div
                        onClick={() => handleBackOpen(Data, section1Ref)}
                        className="gx-position-relative gx-d-flex  gx-justify-content-center"
                    >
                        <img src={`/assets/images/casino-images/${num}.jpg`} alt="aaaaaa" className="gx-rounded-sm"
                            style={{ height: '4rem', width:"3rem" }} />
                    </div>
                )}
            </div>
            <Paragraph className={`gx-flex gx-justify-content-center gx-items-center gx-text-center gx-font-weight-semi-bold ${posArray[Data.sid] < 0 ? "gx-text-red" : "gx-text-green-0"}`}>{posArray[Data.sid] ?? 0.00}</Paragraph>
        </div>
    );

}