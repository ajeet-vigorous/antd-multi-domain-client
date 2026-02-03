// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Form, Input, Button, notification, Card, Row, Col } from 'antd';
//  import { NotificationManager } from "react-notifications";
//  import IntlMessages from "util/IntlMessages";
// // import { changePassword } from "../../../appRedux/actions/Auth";

// const ChangePassword = () => {
//   const dispatch = useDispatch();
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const handlePasswordChange = async () => {

//     if (newPassword !== confirmPassword) {
//       return NotificationManager.error(<IntlMessages id="notification.errorMessage" />,
//         <IntlMessages id="notification.clickMe" />,
//         5000, () => { alert('callback')}
//       );
//     }
//     setConfirmLoading(true);
//     try {
//       const data = {
//         oldPassword: oldPassword,
//         password: newPassword,
//         // isTransaction: false
//       }
//       // await dispatch(changePassword(data));
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("")
//     } catch (error) {
    
//     } finally {
//       setConfirmLoading(false);
//     }
//   };

//   return (

//     <Row justify={'center'}>
//       <Col xxl={5} xl={5} lg={7} md={11} sm={14} xs={20} className=''>

//         <div className='gx-rounded-sm' style={{backgroundColor: '#1B2456'}} >
//           <div className='gx-bg-grey gx-py-3 gx-rounded-lg gx-bg-flex gx-justify-content-center  gx-align-content-center gx-text-white' style={{height: '70px'}}>
//             <div className='gx-h-100 gx-bg-flex gx-justify-content-center gx-font-weight-bold gx-fs-xxl  gx-align-content-center'>Change Password</div>
//           </div>

//           <div className=' gx-px-4 ' style={{backgroundColor: '#1B2456'}}>
//             <Form
//               layout="vertical"
             
//               initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
//               className='gx-py-3'
//             >
//              <Form.Item required>
//               <Input.Password
//               className="gx-border-redius"
//                 value={oldPassword}
//                 placeholder="Enter Old Password"
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 visibilityToggle={false}
//               />
//             </Form.Item>
//             <Form.Item required>
//               <Input.Password
//                 value={newPassword}
//                  className="gx-border-redius"
//                 placeholder="Enter New Password"
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 visibilityToggle={false}
//               />
//             </Form.Item>
//             <Form.Item required>
//               <Input.Password
//                 value={confirmPassword}
//                   className="gx-border-redius"
//                 placeholder="Enter Confirm password"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 visibilityToggle={false}
//               />
//             </Form.Item>

      
// <div className='gx-bg-flex gx-justify-content-center'>
// <div className='gx-bg-red gx-px-3 gx-rounded-xxl gx-py-2 gx-text-white' style={{width: '62px'}} onClick={handlePasswordChange}>
//                   Done
//                 </div>
// </div>
               

          
//             </Form>

//           </div>

//         </div>

//       </Col>
//     </Row>

//   );
// };

// export default ChangePassword;



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Form, Input, Button, notification, Card, Row, Col } from 'antd';
// import { NotificationManager } from "react-notifications";
// import IntlMessages from "util/IntlMessages";
// // import { changePassword } from "../../../appRedux/actions/Auth";

// const ChangePassword = () => {
//   const dispatch = useDispatch();
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const handlePasswordChange = async () => {

//     if (newPassword !== confirmPassword) {
//       return NotificationManager.error(<IntlMessages id="notification.errorMessage" />,
//         <IntlMessages id="notification.clickMe" />,
//         5000, () => { alert('callback') }
//       );
//     }
//     setConfirmLoading(true);
//     try {
//       const data = {
//         oldPassword: oldPassword,
//         password: newPassword,
//         // isTransaction: false
//       }
//       // await dispatch(changePassword(data));
//       console.log(data, "gggggggggggggggggggggg");
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("")
//     } catch (error) {

//     } finally {
//       setConfirmLoading(false);
//     }
//   };

//   return (

//     <Row justify={'center'}>
//       <Col xxl={5} xl={5} lg={7} md={11} sm={14} xs={20} className=''>

//         <div className='gx-rounded-sm' style={{ backgroundColor: '#1B2456' }} >
//           <div className='gx-bg-grey gx-py-3 gx-rounded-lg gx-bg-flex gx-justify-content-center  gx-align-content-center gx-text-white' style={{ height: '70px' }}>
//             <div className='gx-h-100 gx-bg-flex gx-justify-content-center  gx-align-content-center gx-pt-2'>Change Password</div>
//           </div>

//           <div className=' gx-px-4 ' style={{ backgroundColor: '#485BB4' }}>
//             <Form
//               layout="vertical"

//               initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
//               className='gx-py-3'
//             >
//               <Form.Item required>
//                 <Input.Password
//                   className="gx-border-redius"
//                   value={oldPassword}
//                   placeholder="Enter Old Password"
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   visibilityToggle={false}
//                 />
//               </Form.Item>
//               <Form.Item required>
//                 <Input.Password
//                   value={newPassword}
//                   className="gx-border-redius"
//                   placeholder="Enter New Password"
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   visibilityToggle={false}
//                 />
//               </Form.Item>
//               <Form.Item required>
//                 <Input.Password
//                   value={confirmPassword}
//                   className="gx-border-redius"
//                   placeholder="Enter Confirm password"
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   visibilityToggle={false}
//                 />
//               </Form.Item>


//               <div className='gx-bg-flex gx-justify-content-center'>
//                 <div className='gx-bg-red gx-px-3 gx-rounded-xxl gx-py-2 gx-text-white' style={{ width: '62px' }} onClick={handlePasswordChange}>
//                   Done
//                 </div>
//               </div>



//             </Form>

//           </div>

//         </div>

//       </Col>
//     </Row>

//   );
// };

// export default ChangePassword;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { NotificationContainer, NotificationManager } from "react-notifications";
import IntlMessages from "util/IntlMessages";
import { changePassword } from "../../../appRedux/actions/Auth";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handlePasswordChange = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      return NotificationManager.error(
        <IntlMessages id="notification.errorMessage" />,
        <IntlMessages id="notification.clickMe" />,
        5000, () => { alert('callback') }
      );
    }
    setConfirmLoading(true);
    try {
      const data = {
        oldPassword: oldPassword,
        password: newPassword,
      };
      await dispatch(changePassword(data));
      // console.log(data, "gggggggggggggggggggggg");
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Row justify="center">
      <Col xxl={5} xl={5} lg={7} md={11} sm={14} xs={20}>
        <div className='gx-rounded-sm' style={{ backgroundColor: '#1B2456' }} >
          <div className='gx-bg-grey-revers gx-py-3 gx-rounded-lg gx-bg-flex gx-justify-content-center gx-align-content-center gx-text-white' style={{ height: '70px' }}>
            <div className='gx-h-100 gx-bg-flex gx-justify-content-center gx-align-content-center gx-fs-xl gx-pt-2'>Change Password</div>
          </div>
          <div className='gx-px-4 gx-bg-grey-revers'>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
              className='gx-py-3'
              onFinish={handlePasswordChange}
            >
              <Form.Item
                name="oldPassword"
                rules={[{ required: true, message: 'Please enter your old password!' }]}
              >
                <Input.Password
                  className="gx-border-redius"
                  placeholder="Enter Old Password"
                  visibilityToggle={false}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: 'Please enter your new password!' },
                  // { min: 8, message: 'Password must be at least 8 characters!' },
                ]}
              >
                <Input.Password
                  className="gx-border-redius"
                  placeholder="Enter New Password"
                  visibilityToggle={false}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="gx-border-redius"
                  placeholder="Enter Confirm Password"
                  visibilityToggle={false}
                />
              </Form.Item>
              <Form.Item className=''>
                <div className='gx-bg-flex gx-justify-content-center'>
                  <Button
                    type="danger"
                    htmlType="submit"
                    loading={confirmLoading}
                    className='gx-rounded-xxl gx-my-2 gx-text-white gx-bg-flex gx-justify-content-center '
                  >
                    Done
                  </Button></div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>

    </Row>
  );
};

export default ChangePassword;
