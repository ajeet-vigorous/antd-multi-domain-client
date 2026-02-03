
import React from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";



const PlxwinDashboard = ({ handleCasinoOpen }) => {
    return (
        <>
            <Auxiliary>
                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/matches'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/inplay.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase">Inplay</div>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/main/casino'>

                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/diamond-casino.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-py-2 gx-text-black gx-text-center gx-text-uppercase">casino</div>
                            </div>
                        </Link>

                    </Col>

                </Row>



                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>


                    <Col>
                        <Link to='/main/matka-list'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column  gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/images/tvs-pro-matka-white.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Matka</div>
                            </div>
                        </Link>
                    </Col>



                    <Col>
                        <Link to='/main/statement'>

                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/statement.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">statement</div>
                            </div>
                        </Link>

                    </Col>


                </Row>









                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/freegame'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/settings/free-games.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">free games</div>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/main/rules'>

                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/settings/rules.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle"/>
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">rules</div>
                            </div>
                        </Link>

                    </Col>
                </Row>
                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/ledger'>

                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/ledger.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">my ledger</div>
                            </div>
                        </Link>
                    </Col>

                    <Col>
                        <Link to='/main/settings'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/setting.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Setting</div>
                            </div>
                        </Link>
                    </Col>

                </Row>





            </Auxiliary>
        </>

    );
};
export default PlxwinDashboard;