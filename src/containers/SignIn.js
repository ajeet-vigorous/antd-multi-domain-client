import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  hideMessage,
  showAuthLoader,
  userLoginCheck,
  userSignIn,
} from "../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
import { domainSettingByDomain } from "../appRedux/actions/User";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import settings from "../domainConfig";
import Plr11Login from "./domainLogin/Plr11Login";

const SignIn = () => {
  const [fieldslogin, setFieldsLogin] = useState({
    username: "",
    password: "",
    otp: ""
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
      history.push("/main/rules");
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

  return (
    <>
      {settings?.domainName === 'PLR11' ? <Plr11Login /> :
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="gx-bg-flex gx-box-shadow gx-bg-grey gx-px-1  gx-justify-content-center gx-align-items-center"
        >
          <div style={{ maxWidth: "600px" }} className="gx-bg-grey-revers">
            <div className="  gx-bg-flex gx-flex-column ">
              <div className=" gx-w-100">
                <div className="gx-px-5 gx-py-2">
                  <img src={settings.logo} alt="Neature" height={100} width={500}/>
                </div>
              </div>

              <div className="gx-app-login-content gx-w-100">
                <Form
                  initialValues={{ remember: true }}
                  name="basic"
                  className="gx-signin-form gx-form-row0"
                >
                  <Form.Item
                    rules={[
                      { required: true, message: "User Name can not be blank!" },
                    ]}
                    name="username"
                  >
                    <Input
                      placeholder="UserName"
                      style={{ textTransform: "uppercase" }}
                      name="username"
                      value={fieldslogin.username}
                      onChange={inputChange}
                      className="gx-border-redius0"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "User Password can not be blank!",
                      },
                    ]}
                    name="password"
                  >
                    <Input
                      type="password"
                      placeholder="PASSWORD"
                      name="password"
                      value={fieldslogin.password}
                      onChange={inputChange}
                      className="gx-border-redius0"
                    />
                  </Form.Item>
                  <Button
                    className="gx-mb-0 gx-w-100 gx-bg-primary gx-border-redius0 gx-font-weight-semi-bold gx-fs-lg gx-text-white"
                    style={{
                     
                      border: "none",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    htmlType="submit"
                    onClick={loader ? null : () => onFinish()}
                  >
                    {loader && <div className="loaderSpinner "></div>} <span className="gx-px-2">Login </span>
                  </Button>

                </Form>
              </div>

            </div>
            <div className="gx-text-center gx-py-2 gx-font-weight-bold gx-fs-lg gx-text-white">Note- This Website is not for Indian Territory

            </div>
            <div className="gx-text-red gx-text-center gx-fs-xl gx-font-weight-bold gx-mb-1">18+ Only</div>
          </div>


          
        </div>}
    </>
  );
};

export default SignIn;