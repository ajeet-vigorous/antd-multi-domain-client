import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTimes } from 'react-icons/fa';
import { Row, Col } from 'antd';


const RulesModelBmx = (props) => {
    const { setRulesModal, PageTitle, ruleImage } = props;
    const handleCloseModal = () => {
        setRulesModal(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleCloseModal);
        return () => {
            document.removeEventListener('click', handleCloseModal);
        };
    }, []);

    return (
        <div className="ant-avatar-string gx-w-100 gx-h-100 gx-position-fixed gx-left-0 gx-top-0" style={{ zIndex: '10000000', background: 'rgba(0, 0, 0, 0.7)', }} onClick={() => handleCloseModal()}>
            <Row justify="center" className='gx-p-2'>
                <Col
                    xs={24} // Full width on extra small screens
                    sm={24} // Full width on small screens
                    md={24} // Full width on medium screens
                    lg={6} // Approximately 41% width on large screens
                    xl={6} // Approximately 41% width on extra large screens
                    xxl={6} // Approximately 41% width on double extra large screens
                >
                    <div className="gx-bg-white mx-auto gx-top-0" style={{}} onClick={(e) => e.stopPropagation()}>
                        <div className="gx-h-100 gx-bg-flex justify-between gx-bg-grey gx-p-2 items-center">
                            <h2 className="gx-text-white gx-fs-sm gx-font-weight-bold ">
                                {PageTitle} Result
                            </h2>
                            <div className='text-center' onClick={() => setRulesModal()}>
                                <FaTimes className='gx-text-white' style={{ cursor: 'pointer' }} size={18} />
                            </div>
                        </div>
                        <div className='gx-w-100 gx-bg-flex gx-align-items-center gx-justify-content-center'>
                            <img src={ruleImage} alt={PageTitle} className='' />
                        </div>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default RulesModelBmx;