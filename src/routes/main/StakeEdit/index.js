import React from "react";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { betChipsValues } from "../../../constants/global";
import { userUpdate } from "../../../appRedux/actions";

const StakeEdit = () => {

    const [formattedButtonValues, setFormattedButtonValues] = useState([]);
    const dispatch = useDispatch()
    const Id = JSON.parse(localStorage.getItem("user_id_tvs99"))?.data?.userId

    const { loader } = useSelector((state) => state.auth);

    useEffect(() => {
        let betChipsDataItems = JSON.parse(localStorage.getItem("betChipsData"));
        let betChips = {};
        if (betChipsDataItems != null) {
            betChips = betChipsDataItems;
        } else {
            betChips = betChipsValues;
        }

        const keyValues1 = Object.entries(betChips).map(([key, value]) => ({
            key,
            value: parseInt(value),
        }));
        setFormattedButtonValues(keyValues1);
    }, []);

    const handleKeyChange = (index, newKey) => {
        const updatedValues = [...formattedButtonValues];
        updatedValues[index].key = newKey;
        setFormattedButtonValues(updatedValues);
    };

    // const handleValueChange = (index, newValue) => {
    //     const updatedValues = [...formattedButtonValues];
    //     updatedValues[index].value = Number(newValue);
    //     setFormattedButtonValues(updatedValues);
    // };
    const handleValueChange = (index, newValue) => {
        // Check if the input value is an integer and does not exceed 10 digits
        if (/^\d*$/.test(newValue) && (newValue === '' || newValue.length <= 10)) {
            const updatedValues = [...formattedButtonValues];
            updatedValues[index].value = newValue === '' ? '' : Number(newValue);
            setFormattedButtonValues(updatedValues);
        } else {
            console.log('Please enter a valid integer value with up to 10 digits.');
        }
    };

    // const handleValueChange = (index, newValue) => {
    //     if (newValue === '' || /^[0-9]+$/.test(newValue)) {
    //         const updatedValues = [...formattedButtonValues];
    //         updatedValues[index].value = Number(newValue);
    //         setFormattedButtonValues(updatedValues);
    //     } else {
    //         console.error('Please enter a valid integer value.');
    //     }
    // };

    const handleSubmit = () => {
        const data = {};

        formattedButtonValues.forEach((item) => {
            data[item.key] = item.value;
        });
        let reqData = {
            userId: Id,
            betChipsData: data
        };
        dispatch(userUpdate(reqData))
        localStorage.setItem("betChipsData", JSON.stringify(data));

    };




    return (
        <>
            {loader && <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                backgroundColor: 'rgba(0, 0, 0,0.5)',
                zIndex: 1000
            }} className="gx-bg-flex gx-align-items-center gx-justify-content-center">
                <div className="pulseLoader rounded-full"></div>
            </div>}
            <Row justify={"center"}>
                <Col  md={12} xs={24} className="gx-bg-light-grey ">
                    <Row gutter={[16, 16]} className="gx-pt-4">
                        {formattedButtonValues.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* <Col span={12}>
                                    <div>
                                        <label>Stake Label {index + 1}:</label>
                                        <Input
                                            value={item.key}
                                            onChange={(e) => handleKeyChange(index, e.target.value)}
                                        />
                                    </div>
                                </Col> */}
                                <Col span={12}>
                                    <div>
                                        <label>Stake Value {index + 1}:</label>
                                        <Input
                                            value={item.value}
                                            onChange={(e) => handleValueChange(index, e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                    <Button
                        className="gx-bg-grey gx-text-white"
                        style={{ marginTop: "16px" }}
                        onClick={handleSubmit}
                    >
                        SAVE
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default StakeEdit;














