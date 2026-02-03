
import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";




const PLR11Settings = () => {


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
                            <img alt="inage" src="/assets/Dashboard/settings/profile.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Profile</div>
                        </div>
                    </Link>
                </Col>

                <Col>
                    <Link to='/main/edit-stakes'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/stake.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Stake</div>
                        </div>
                    </Link>

                </Col>
            </Row>

            {/* <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/rules'>

                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/rules.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Rules</div>
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


            <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-4 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                <Col>
                    <Link to='/main/edit-stakes'>
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/stake.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Stake</div>
                        </div>
                    </Link>

                </Col>
                <Col>
              <Link to='/main/pending-bets'>
                <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                  <img alt="inage" src="/assets/Dashboard/settings/exposure.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                  <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Exposure</div>
                </div>
              </Link>
            </Col>

            </Row> */}

        </Auxiliary>
    );
};
export default PLR11Settings;







