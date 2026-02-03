import React, { useState } from 'react';
import RulesModelBmx from "../../casino_components/RulesModelBmx/RulesModelBmx";
import { IoInformationCircle } from "react-icons/io5";
import { Row, Col, Typography, Modal } from 'antd';

export default function PageHeaderTheme(props) {
    const { PageTitle, t1, ruleImage } = props;
    const [rulesModal, setRulesModal] = useState(false);
    const { Text, Title } = Typography;

    const handleOpenRules = () => {
        setRulesModal(!rulesModal)
    };

    return (
        <div className='w-full gx-mx-2'>
            {rulesModal ?

                <RulesModelBmx ruleImage={ruleImage} PageTitle={PageTitle} setRulesModal={handleOpenRules} />
                : null}
            <div className="gx-bg-grey">
                <Row gutter={[20, 20]} justify="space-between" align="middle" className=" gx-fs-sm gx-font-weight-bold gx-bg-grey gx-py-1">
                    <Col>
                        <div level={5} className="gx-text-white gx- gx-uppercase" >
                            {PageTitle} 
                        </div>
                    </Col>
                    <Col>
                        <div
                            className="gx-text-white gx-d-flex gx-justify-content-center ant-space-align-center gx-gap-2"
                        >
                            <span>Round ID : {t1?.mid || null}</span>
                            <span onClick={() => handleOpenRules()} className="gx-pointer gx-d-flex gx-justify-content-center ant-space-align-center">
                                <IoInformationCircle size={20} />
                            </span>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    );
}





// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Modal, Input, Form } from "antd";
// // import { changePassword } from "../../appRedux/actions/Auth";
// import { NotificationManager } from "react-notifications";
// import IntlMessages from "util/IntlMessages";
// import { changePassword } from "../../appRedux/actions";

// const PageHeaderTheme = ({handleCloseModal}) => {


//   return (
//       <Modal
//         title="Change Password"
//         open={true}
//         onOk={oldPassword && newPassword && confirmPassword ? handlePasswordChange : ''}
//         confirmLoading={confirmLoading}
//         onCancel={()=>handleCloseModal()}
//         okText="Submit"
//         cancelText="Return"
//         cancelButtonProps={{ className: 'gx-bg-grey gx-text-white gx-border-redius0' }}
//         okButtonProps={{ className: 'gx-border-redius0' }}
//         className="gx-px-3"
//         // headerClassName="gx-bg-grey gx-text-white"
//       >
//          fhfgfghjfgjhfg
//       </Modal>
//   );
// };

// export default ChnagePassword;
