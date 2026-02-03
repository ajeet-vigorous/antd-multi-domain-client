import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  hideMessage,
  showAuthLoader,
  userLoginCheck,
  userSignIn,
} from "../../appRedux/actions";

import { domainSettingByDomain, getMatchList, userBalance } from "../../appRedux/actions/User";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import settings from "../../domainConfig";

const SignIn = () => {
  const [fieldslogin, setFieldsLogin] = useState({
    username: "",
    password: "",
    otp: "",
  });

  // const [showAdditionalField, setShowAdditionalField] = useState(false);
  let showAdditionalField = false;
  const dispatch = useDispatch();
  const { loader, showMessage, authUser, loginChek, isLogin } = useSelector(
    ({ auth }) => auth
  );




  const history = useHistory();
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      let domainSetting = {
        domainUrl: window.location.origin,
      };

      dispatch(domainSettingByDomain(domainSetting));
      dispatch(getMatchList());
      dispatch(userBalance());
      let checked = JSON.parse(authUser)
      if (checked?.data?.isPasswordChanged === false) {
        history.push("/main/changepassword");
      } else {
        history.push("/main/dashboard");
      }
    }
  }, [authUser, dispatch, history, showMessage]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (!name) {
      return;
    }

    setFieldsLogin((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const onFinish = (values) => {
    // const { otp } = fieldslogin;

    const data = {
      username: fieldslogin.username.toUpperCase(),
      password: fieldslogin.password,
      isClient: true,
      host: window.location.host,
    };
    dispatch(showAuthLoader());
    dispatch(userSignIn(data));
  };

  const onFinishDemo = (values) => {
    const demo = settings?.demoCredentials
    dispatch(showAuthLoader());
    dispatch(userSignIn(demo));
  };



  return (
    <>
      
      <div style={{ width: "100vw", height: "100vh" }}
        className="gx-bg-flex gx-box-shadow gx-bg-grey gx-position-relative gx-justify-content-center gx-align-items-center"
      >
        <div
          style={{ maxWidth: "600px", minWidth: "350px" }}
          className=" gx-rounded-sm gx-py-3"
        >
          <div className="  gx-bg-flex gx-flex-column ">
            <div className=" gx-w-100">
              <div className=" gx-py-1 gx-bg-flex gx-justify-content-center gx-align-items-center">
                <img src={settings.logo} alt="Neature" height={50} width={280} />
              </div>
            </div>

            <div className="gx-app-login-content gx-w-100  gx-py-1">
              <Form
                initialValues={{ remember: true }}
                name="basic"
                className="gx-signin-form gx-form-row0 "
              >
                <Form.Item
                  rules={[
                    { required: true, message: "User Name can not be blank!" },
                  ]}
                  name="username"
                  className=" gx-mb-2"
                >
                  <div className="gx-bg-flex">
                    <div
                      style={{ backgroundColor: "rgb(247 190 39 )" }}
                      className="gx-p-3"
                    >
                      <FaUserAlt className="gx-text-black" />
                    </div>
                    <Input
                      placeholder="UserName"
                      name="username"
                      value={fieldslogin.username}
                      onChange={inputChange}
                      className="gx-border-redius0 gx-text-uppercase"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "User Password can not be blank!",
                    },
                  ]}
                  name="password"
                  className=" gx-mb-2"
                >
                  <div className="gx-bg-flex">
                    <div
                      style={{ backgroundColor: "rgb(247 190 39 )" }}
                      className="gx-p-3"
                    >
                      <FaLock className="gx-text-black" />
                    </div>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={fieldslogin.password}
                      onChange={inputChange}
                      className="gx-border-redius0 gx-text-uppercase"
                    />
                  </div>
                </Form.Item>
                <Button
                  className="gx-mb-0 gx-w-100 gx-border-redius0 gx-font-weight-semi-bold gx-fs-lg gx-text-white"
                  style={{
                    backgroundColor: "rgb(247 190 39 )",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  htmlType="submit"
                  onClick={loader ? null : () => onFinish()}
                >
                  {/* {loader &&   <div className="loaderSpinner "></div> } */}
                  <div className="gx-px-2 gx-text-black">LOG IN </div>{" "}
                  <BiLogIn className="gx-text-black" />
                </Button>
                <Button
                  className="gx-mb-0 gx-w-100 gx-border-redius0 gx-font-weight-semi-bold gx-fs-lg gx-text-white gx-mt-2"
                  style={{
                    backgroundColor: "rgb(247 190 39 )",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  htmlType="submit"
                  onClick={loader ? null : () => onFinishDemo()}
                >
                  {/* {loader &&   <div className="loaderSpinner "></div> } */}
                  <div className="gx-px-2 gx-text-black">LOG IN WITH DEMO ID </div>{" "}
                  <BiLogIn className="gx-text-black" />
                </Button>
                {/* <div className="gx-text-center gx-fs-md gx-my-2 gx-font-weight-semi-bold   gx-text-white gx-text-underline">
                  Note - This Website is not for Indian Territory
                </div>
                <div className="gx-text-center gx-fs-md gx-my-2 gx-font-weight-semi-bold    gx-text-white gx-text-underline">
                  <span className="gx-mx-2">Privacy Policy</span>
                  <span className="gx-mx-2"> Terms & Conditions</span>
                  <span className="gx-mx-2"> Rules & Regulations</span>
                </div> */}
              </Form>
            </div>
          </div>
          <div className="gx-text-center gx-py-2 gx-font-weight-bold gx-fs-lg gx-text-white">Note- This Website Is Not For Indian Territory </div>
          <div className="gx-text-red gx-text-center gx-fs-lg gx-font-weight-bold">18+ Only</div>
        </div>
        {/* <div className="gx-m-4 gx-position-absolute gx-left-0 gx-bottom-0 ">
            <div className="fixed whatsapp_icon_fix gx-mb-md-bottom-5 bottom-4 md:left-8 left-2 gx-mb-5 blink" style={{bottom: 70}}>
              <a passHref={true} href={`https://wa.me/${"+66972270975"}`} title="Whatsapp"
                target="_blank" >
                  <img src="/assets/images/whatss.png" width={70} height={70}/>
                
              </a>
            </div>
          </div> */}
      </div>
      
    </>
  );
};

export default SignIn;