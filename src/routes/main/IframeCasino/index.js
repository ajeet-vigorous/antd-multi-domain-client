import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { casinoLoginUrl } from "../../../appRedux/actions/User";
import Loader from "../../../components/loader";


const IframeCasino = () => {

    const { gameId } = useParams();
    const dispatch = useDispatch();
    const { casinoLoginUrlData, loading } = useSelector((state) => state.UserReducer);
    const domain = window.location.origin.replace(/^[^.]+\./, '');


    useEffect(() => {
        getCasinoLoginUrl()
    }, [gameId])

    const getCasinoLoginUrl = () => {
        let reqData = {
            "gameId": gameId + "",
            "platformId": "mobile",
           
            "redirectUrl": `${domain}/main/dashboard`,
            "providerName": gameId === "3031" ? "diamond" : "",

        }
        dispatch(casinoLoginUrl(reqData))
    }

    return (
        <>
            {loading ? <Loader props={loading} /> :
                <Row>
                    <Col xs={24}>
                        {casinoLoginUrlData ? (
                            <>
                                <iframe src={casinoLoginUrlData?.url} title=" " loading='lazy' className="gx-w-100" style={{ height: "98vh" }} />
                            </>

                        ) : null
                        }
                    </Col>
                </Row>}
        </>
    )
}

export default IframeCasino;