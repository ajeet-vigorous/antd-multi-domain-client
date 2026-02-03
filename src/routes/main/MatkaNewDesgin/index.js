import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { httpPost } from "../../../http/http";


const MatkaNewDesgin = () => {
  let { matkaEventId, matkaName } = useParams()
  const [ismatkaList, setIsmatkaList] = useState({});

  useEffect(()=>{
    getMatkaListByEventID()
  },[])

  const history = useHistory()



const getMatkaListByEventID = async () => {

  let betReq = {
    "matkaEventId": matkaEventId,
  };

  let getMatkaDetails = await  httpPost(`matka/getMatkaByMatkaEventId`, betReq);
  if (getMatkaDetails?.data) {
    setIsmatkaList(getMatkaDetails.data ? getMatkaDetails?.data : {});
  }

  

}
  


  return (
    <Row
      gutter={[16, 16]}
      className=" gx-w-100 gx-ml-0 gx-my-2"
      justify="center"
      align="middle"
    >
      <Col xs={24}>
        <Row justify={"center"}>
          <Col xs={24} className=" gx-fs-xxl gx-text-center gx-font-weight-heavy gx-text-uppercase" style={{ color: "#26122D" }}> 
            {matkaName}
          </Col>
        </Row>
        <Row className="gx-py-2 gx-mt-4" justify={"center"}>
          <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-single/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/single.png" />
          </Col>
          <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-jodi/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/jodi.png" />
          </Col>
        </Row>

        <Row className="gx-py-2" justify={"center"}>
          <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-single-patti/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/singlepatti.png" />
          </Col>
          <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-double-patti/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/double.png" />
          </Col>
          
        </Row>
        <Row className="gx-py-2" justify={"center"}>
        <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-tripple-patti/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/triple.png" />
          </Col>
          <Col xl={4} md={10} xs={12}>
            <img className="gx-bg-grey gx-rounded-circle" onClick={() => history.push(`/main/matka-odd-even/${matkaEventId}`)} alt="single" src="/matkaNewImages/images/odd-even.png" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MatkaNewDesgin;
