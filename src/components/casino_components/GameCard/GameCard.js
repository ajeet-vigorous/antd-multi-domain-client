import React from 'react';
import BgSkyCardTheme2 from '../BgSkyCardTheme2/BgSkyCardTheme2';
import BgSkyButtonTheme2 from '../BgSkyButtonTheme2/BgSkyButtonTheme2';
import BetLockedRoundedBmx from '../BetLockedRoundedBmx/BetLockedRoundedBmx';
import { Typography, Row, Col } from 'antd';

const { Text } = Typography;
export default function GameCard(props) {
    const { Data, Name, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className='gx-w-100'>
            <Row justify="center" align="middle">
                <Text className="gx-uppercase gx-fs-lg gx-p-2 gx-font-weight-semi-bold">
                    {Data && Data.rate ? (parseFloat(Data.rate - oddsDifference)).toFixed(2).replace(/\.?0+$/, "") : 0}
                </Text>
            </Row>
            <div className="gx-position-relative">
                {Data.gstatus === "1" ? (
                    <BgSkyButtonTheme2
                        ele={Name}
                        handleBackOpen={handleBackOpen}
                        data={Data}
                        section1Ref={section1Ref}
                    />
                ) : (
                    <>
                        <BgSkyCardTheme2 ele={Name} />
                        <BetLockedRoundedBmx />
                    </>)}
            </div>
            <Row justify="center" align="middle">
                <Text className={`gx-d-flex gx-justify-content-center ant-space-align-center gx-font-weight-semi-bold ${posArray[Data.sid] < 0 ? "gx-text-red" : "gx-text-green-0"}`}>
                    {posArray[Data.sid] ?? 0}
                </Text>
            </Row>
        </div>
    );
}