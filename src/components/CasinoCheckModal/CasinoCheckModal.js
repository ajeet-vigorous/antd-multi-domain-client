import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Row, Col } from 'antd';  // Import Modal and Button from Ant Design
import { CASINOPRICE } from '../../constants/global';


export default function CasinoCheckModal(props) {
    console.log(props, "tttt");
    
    const { handleClose, betSlipData } = props;
    const history = useHistory();

    const onClickMenu = (url) => history.push(url);

    const onClickAviator = (gameId) => {
        history.push(`/main/iframe-casino/${gameId}`);
        handleClose();
    };
    const handleOk = () => {
        if (betSlipData.name === "Aviator") {
            onClickAviator(201206);
        } else if (betSlipData.name === "Ludo") {
            onClickAviator(600113);

        } else if (betSlipData.name === "IntCasino") {
            onClickAviator(900000);
        }

        else {
            onClickMenu('/main/int-casino');
        }
        handleClose();
    };

    return (
        <Modal

            visible={true}
            width={700}
            footer={false}
        // style={{ borderRadius: '15px' }}
        // bodyStyle={{ borderRadius: '15px' }}
        >
            <div className="gx-text-center gx-space-y-2 ">
                <div className="gx-d-flex gx-justify-content-center gx-align-items-center gx-flex-column gx-py-2">
                    <img src={betSlipData.image} alt="Casino" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                </div>
                <div className="gx-text-base gx-text-blue gx-font-bold gx-text-center">
                    Please Note
                </div>
                <div className="gx-fs-xl gx-text-lg  gx-text-black gx-text-center">
                    (1 Point = ₹{CASINOPRICE.PRICE})
                </div>
                <div className="gx-md:text-xl gx-text-base gx-text-black gx-px-4 gx-text-center">
                    <p><span className="gx-text-blue">For Example:</span> If you place ₹{CASINOPRICE.AMOUNT}, your bet will be ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE}. Win or loss will be according to the above calculation. If your balance is ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE}, then it will show ₹{CASINOPRICE.AMOUNT} in the {betSlipData.name} and your bet of ₹{CASINOPRICE.AMOUNT} in the {betSlipData.name} will be considered as ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE} rupees.</p>
                    <p>यदि आप ₹{CASINOPRICE.AMOUNT} लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE} होगी। यदि आपका बैलेंस ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE} है तो {betSlipData.nameHindi} में यह ₹{CASINOPRICE.AMOUNT} दिखाएगा और {betSlipData.nameHindi} में आपकी ₹{CASINOPRICE.AMOUNT} रुपये की शर्त ₹{CASINOPRICE.AMOUNT * CASINOPRICE.PRICE} रुपये मानी जाएगी।</p>
                </div>
                <div>
                    {betSlipData.name === "Ludo" ?
                    <div className='gx-md:text-xl gx-text-base gx-text-red gx-px-4 gx-text-center'>
                        Note. अगर कोई क्लाइंट लूडो क्विक टेबल में एंट्री करता है और वह बिना गेम खेले खत्म करे एग्जिट करे तो उसकी राशि नुकसान में मान्य होगी ।
                    </div>
                    : null}
                </div>
            </div>
            <Row className='gx-bg-flex gx-justify-center '>
                <Col
                    lg={11}
                    xl={11}
                    xxl={11}
                    style={{ background: "#0E1C64" }}
                    key="submit" className="gx-btn gx-text-white" onClick={handleOk} >
                    Ok I Agree
                </Col>
                <Col
                    lg={11}
                    xl={11}
                    xxl={11}
                    style={{ background: "#951D1B" }}
                    key="back" className="gx-btn gx-bg-red gx-text-white" onClick={handleClose}>
                    No, I Don't Agree
                </Col>
            </Row>
        </Modal>
    );
}