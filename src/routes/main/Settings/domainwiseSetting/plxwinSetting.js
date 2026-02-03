
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";




const PLXWINSettings = () => {


    return (
        <Auxiliary>
            <div className="gx-pb-4">
                <Link to='/main/dashboard/'>
                    <div className="gx-bg-grey gx-py-1 gx-text-white gx-font-weight-semi gx-bg-flex gx-justify-content-center">
                        BACK TO MAIN MENU
                    </div>
                </Link>
            </div>
            <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/profile'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/profile.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle"/>
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Profile</div>
                        </div>
                    </Link>
                </Col>

                <Col>
                    <Link to='/main/changepassword'>

                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/password.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">PASSWORD</div>
                        </div>
                    </Link>

                </Col>
            </Row>

        </Auxiliary>
    );
};
export default PLXWINSettings;







