import React, { useState } from "react";
import {Col, Row} from "antd";
import Auxiliary from "util/Auxiliary";


const FreeGame = () => {
  const [isTvScreen, setIsTvScreen] = useState(false);
  
  const handleTvScreen = () => {
    setIsTvScreen(!isTvScreen);
}

  return (
    // <Auxiliary>
    <>
    <Row justify={"center"} className="gx-mb-4">
    <Col xl={6} lg={6} sm={24} xs={24} className="gx-col-full gx-bg-flex gx-justify-content-center">
    <div onClick={handleTvScreen} className=" gx-w-100"><img src="/assets/images/free-game.jpg" alt="Free Games" className="gx-w-100" height={250}/></div>
    </Col>
    </Row>

    <Row justify={"center"}>
    <Col  xl={10} lg={10} sm={24} xs={24} className="gx-col-full">
        {isTvScreen ?
                <div className="gx-my-4">
                    <iframe src="https://doodlecricket.github.io/#/" title=" " loading='lazy' className="gx-w-100 " style={{height: 400}} />
                </div> : null
            }
        </Col>
    </Row>
   </>

    // </Auxiliary>
  );
};
export default FreeGame;


