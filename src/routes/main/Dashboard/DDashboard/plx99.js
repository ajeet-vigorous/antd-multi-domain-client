
import React from "react";
import { Col, Row } from "antd";
import Auxiliary from "util/Auxiliary";
import { Link } from "react-router-dom";



const Plx99Dashboard = ({handleCasinoOpen}) => {
    return (
        <>
            <Auxiliary >
                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/matches'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/inplay.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle"/>
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Inplay</div>
                            </div>
                        </Link>
                    </Col>

                    <Col onClick={() => handleCasinoOpen({ image: "/assets/Dashboard/int-casino.png", name: "Casino", gameId: "0", nameHindi: "कैसीनो" })}>
                        {/* <Link to='/main/int-casino'> */}
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/int-casino.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Int casino</div>
                        </div>
                        {/* </Link> */}
                    </Col>



                </Row>

                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/casino'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/diamond-casino.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">casino</div>
                            </div>
                        </Link>
                    </Col>

                    <Col onClick={() => handleCasinoOpen({ image: "/assets/Dashboard/int-casino.png", name: "IntCasino", gameId: "900000", nameHindi: "एविएटर" })}>
                        {/* <Link to={`/main/iframe-casino/${201206}`}> */}
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/rg-casino.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">RG casino</div>
                        </div>
                        {/* </Link> */}
                    </Col>

                </Row>

                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>


                    <Col>
                        <Link to='/main/matka'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/matka.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">Matka</div>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/main/ledger'>
                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/ledger.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2" >my ledger</div>
                            </div>
                        </Link>
                    </Col>


                </Row>

                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>

                    <Col onClick={() => handleCasinoOpen({ image: "/assets/Dashboard/aviator.png", name: "Aviator", gameId: "201206", nameHindi: "एविएटर" })}>
                        {/* <Link to={`/main/iframe-casino/${201206}`}> */}
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/aviator.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle"/>
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">aviator</div>
                        </div>
                        {/* </Link> */}
                    </Col>

                    <Col
                        onClick={() => handleCasinoOpen({ image: "/assets/Dashboard/ludo.png", name: "Ludo", gameId: "600113", nameHindi: "लूडो" })}
                    >
                        {/* <Link to={`/main/iframe-casino/${600113}`}> */}
                        <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                            <img alt="inage" src="/assets/Dashboard/ludo.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle"/>
                            <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">LUDO</div>
                        </div>
                        {/* </Link> */}
                    </Col>





                </Row>

                <Row className="gx-flex-gap-150 gx-bg-flex gx-mb-1 ant-row-no-wrap gx-justify-content-center" gutter={[20, 20]}>
                    <Col>
                        <Link to='/main/statement'>

                            <div style={{ width: "100px" }} className="gx-bg-flex gx-flex-column gx-justify-content-center gx-align-items-center">
                                <img alt="inage" src="/assets/Dashboard/statement.png" className=" gx-p-3 gx-bg-grey gx-rounded-circle" />
                                <div className="gx-font-weight-bold gx-text-black gx-text-center gx-text-uppercase gx-py-2">statement</div>
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
export default Plx99Dashboard;