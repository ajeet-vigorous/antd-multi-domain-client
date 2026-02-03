import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";


const BackMenuButton = () => {
    return (
        <>
        <Row justify={"center"}>
            <Col xxl={14} xl={14} lg={10} md={16} sm={18} xs={24}>
               <Link to='/main/dashboard/'>
                <div  className="gx-bg-grey gx-py-2 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                    BACK TO MAIN MENU
                </div>
               </Link>
            </Col>
        </Row>
        </>
    )
}
export default BackMenuButton;