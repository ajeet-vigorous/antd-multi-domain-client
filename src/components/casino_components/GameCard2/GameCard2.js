import React from 'react';
import { Typography, Row, Col } from 'antd';
import BetLockedRoundedBmx from '../BetLockedRoundedBmx/BetLockedRoundedBmx';
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsFillSuitHeartFill } from "react-icons/bs";

const { Text } = Typography;

export default function GameCard2(props) {
    const { Data, select, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className='gx-w-100'>
            <Row justify="center" align="middle">
                <Text className="gx-uppercase gx-fs-lg gx-p-2 gx-font-weight-semi-bold">
                {Data && Data.rate ? (parseFloat(Data.rate - oddsDifference)).toFixed(2).replace(/\.?0+$/, "") : 0}
                </Text>
            </Row>
            <div className="gx-position-relative">

                {Data.gstatus === "1" ? (
                    <div
                        justify="center"
                        align="middle"
                        onClick={() => handleBackOpen(Data, section1Ref)}
                        className={`gx-bg-grey gx-w-100 ant-space-align-center gx-py-2 gx-fs-lg gx-font-weight-medium ${select === "Red" ? "gx-text-red" : "gx-text-black"} gx-rounded-sm`}
                        // style={{ height: "40px" }}
                    >
                        {select === "Red" ? (
                            <>
                                <BsSuitDiamondFill />
                                <BsFillSuitHeartFill />
                            </>
                        ) : (
                            <>
                                <BsSuitClubFill />
                                <BsSuitSpadeFill />
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div
                            justify="center"
                            align="middle"
                            className={`gx-bg-grey gx-w-100 ant-space-align-center gx-py-2 gx-fs-lg gx-font-weight-medium ${select === "Red" ? "gx-text-red" : "gx-text-black"} gx-rounded-sm`}
                            // style={{ height: "40px" }}
                        >
                            {select === "Red" ? (
                                <>
                                    <BsSuitDiamondFill />
                                    <BsFillSuitHeartFill />
                                </>
                            ) : (
                                <>
                                    <BsSuitClubFill />
                                    <BsSuitSpadeFill />
                                </>
                            )}
                        </div>

                        <BetLockedRoundedBmx />
                    </>
                )}
            </div>
            <Row justify="center" align="middle">
                <Text className={`gx-d-flex gx-justify-content-center ant-space-align-center gx-font-weight-semi-bold ${posArray[Data.sid] < 0 ? "gx-text-red" : "gx-text-green-0"}`}>
                    {posArray[Data.sid] ?? 0}
                </Text>
            </Row>
        </div>
    );
}
