

import React, { useState, useEffect } from "react";
import { Layout, Popover } from "antd";
import { Link } from "react-router-dom";

import { toggleCollapsedSideNav } from "../../appRedux/actions";
import UserInfo from "../../components/UserInfo";
import Auxiliary from "util/Auxiliary";
import { userSignOut } from "../../appRedux/actions/Auth";
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import Info from "./Info";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import { domainSettingByDomain, getMatchList, userBalance } from "../../appRedux/actions/User";
import { useLocation } from "react-router-dom";
import { useBalance } from '../../ContextApi'
import Marquee from "react-fast-marquee";
import settings from "../../domainConfig";
import Rules from "./rules";

const { Header } = Layout;

const Topbar = () => {
  const [searchText, setSearchText] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const { locale, navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);

  const auth = JSON.parse(useSelector((state) => state.auth?.authUser));
  const { exposureSaga, balanceSaga } = useSelector((state) => state.UserReducer);
  const width = useSelector(({ common }) => common.width);
  const { balance, setBalance } = useBalance();



  const dispatch = useDispatch();
  const location = useLocation();
  // let notification = localStorage.getItem("notification");
  const { doaminsettingData } = useSelector(state => state.UserReducer)
  const [showNotification, setNotification] = useState();
  useEffect(() => {
    let notificationData = localStorage.getItem("notification");
    let data = notificationData ? notificationData : doaminsettingData?.userNotification
    setNotification(data)
  }, [doaminsettingData]);
  useEffect(() => {
    let domainSetting = {
      domainUrl: window.location.origin,
    };
    dispatch(userBalance());
    const balanceInterval = setInterval(() => {
      dispatch(userBalance());
    }, 5000)

    const interval = setInterval(() => {
      // dispatch(getMatchList());
      dispatch(domainSettingByDomain(domainSetting))
    }, 60 * 1000 * 5);
    return () => {
      clearInterval(balanceInterval);
      clearInterval(interval);
    };
  }, [dispatch]);
  
  useEffect(() => {
    const initData = localStorage.getItem("matchList");

    const intervalId = setInterval(() => {
      localStorage.removeItem("matchList");
    }, 1000 * 60 * 3);
    if (!initData) {
      dispatch(getMatchList());
    }
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path[1] === 'main') {
      switch (path[2]) {
        case 'rules':
          setDisplayNumber('Rules');
          break;
        case 'matches':
          setDisplayNumber('MATCHES');
          break;

        case 'dashboard':
          setDisplayNumber('');
          break;
        case 'profile':
          setDisplayNumber('PROFILE');
          break;
        case 'freegame':
          setDisplayNumber('Free Games');
          break;
        case 'changepassword':
          setDisplayNumber('Change Password');
          break;
        case 'casino':
          setDisplayNumber('');
          break;
        case 'ledger':
          setDisplayNumber('Ledgers');
          break;
        case 'statement':
          setDisplayNumber('Statement');
          break;

        default:
          setDisplayNumber('');
          break;
      }
    }
  }, [location]);


  useEffect(() => {
    // notification = localStorage.getItem("notification");
    const preventBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const allowBodyScroll = () => {
      document.body.style.overflow = 'auto';
    };

    preventBodyScroll();
    allowBodyScroll();

    return () => {
      allowBodyScroll();
    };
  }, []);

  //  let userID = JSON.parse(localStorage.getItem("user_id"));
  //  let exposure = JSON.parse(localStorage.getItem("client-wallet-exposure"));
  //  let balance = JSON.parse(localStorage.getItem("client-wallet-balance"));
  // const modalOpen = localStorage.getItem("modalopen")

  let userID = JSON.parse(localStorage.getItem("user_id_tvs99"));
  let exposureLocal = JSON.parse(localStorage.getItem("client-wallet-exposure"));
  let balanceLocal = JSON.parse(localStorage.getItem("client-wallet-balance"));
  const modalOpen = localStorage.getItem("modalopen");

  let client = userID?.data ? userID?.data : auth?.data;
  // let clientBalance = balance?.coins ? balance?.coins : balanceSaga;
  // let clientExposure = balance?.exposure ? balance?.exposure : exposureSaga;


  let clientBalance = balanceLocal ? balanceLocal : balanceSaga;
  let clientExposure = exposureLocal ? exposureLocal : exposureSaga;

  const Notification = localStorage.getItem("notification");



  return (
    <>
      <Header className='gx-bg-flex gx-w-100 gx-justify-content-between  gx-align-content-center '>
        {modalOpen && <Rules />}
        <div>
          <Link to="/main/dashboard" className=" gx-pointer">
            <img alt="" src={settings?.logo} width={90} height={50} /></Link>
        </div>
        <div className='gx-text-white'>
          <span>{client?.username} ({client?.name})</span><br />
          {/* <span>chips: {Number.parseFloat(Math.abs(clientBalance)).toFixed(2)}</span> */}
        </div>

        <div className='' >
          <ul className="gx-header-notifications gx-ml-auto gx-text-white" style={{ height: '53px' }}>

            {width >= TAB_SIZE ?
              <Auxiliary>

                {displayNumber && (
                  <li className="gx-msg gx-px-5 gx-font-weight-semi-bold gx-bg-white gx-text-black gx-bg-flex   gx-align-items-center  gx-h-100" >
                    {displayNumber}
                  </li>
                )}


                <Link className="gx-text-white gx-fs-xl" to="/main/dashboard">
                  <li className="gx-notify gx-px-5 gx-font-weight-semi-bold">
                    <HomeOutlined />&nbsp;&nbsp;   HOME
                  </li>
                </Link>

                <li className="gx-msg gx-px-5 gx-font-weight-semi-bold gx-pointer" onClick={() => dispatch(userSignOut())}>
                  <LogoutOutlined />&nbsp;&nbsp;  LOGOUT
                </li>
              </Auxiliary> : null
            }
            <li className="gx-language">

            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
                  <div className="gx-linebar ">
                    <i className="gx-icon-btn icon icon-menu"
                      onClick={() => {
                        dispatch(toggleCollapsedSideNav(!navCollapsed));
                      }}
                    />
                  </div> : null}
              </Auxiliary>
            }
          </ul>
        </div>
      </Header>
      {/* {Notification != 'undefined'  ? (
        <Marquee style={{ minHeight: "28px" }} className="gx-fx-xl gx-bg-grey gx-text-white gx-text-uppercase gx-font-weight-semi-bold gx-border gx-bg-flex gx-align-items-center">
          {Notification}
        </Marquee>
      ) : null} */}
      {Notification && Notification !== undefined && Notification !== 'undefined' && Notification !== null && (
        <marquee style={{ minHeight: "28px" }} className="gx-fx-xl gx-bg-grey gx-text-white gx-text-uppercase gx-font-weight-semi-bold gx-border gx-bg-flex gx-align-items-center">
          {Notification}
        </marquee>
      )}
      <div className="gx-py-1 gx-bg-flex gx-justify-content-center gx-bg-white gx-box-shadow">
        {/* <span>Chips: {Number.parseFloat(Math.abs(clientBalance)).toFixed(2)}</span>&nbsp;&nbsp; */}
        {/* <span>Chips: {Math.floor(Math.abs(clientBalance) * 100) / 100.00}</span>&nbsp;&nbsp; */}
        {/* <span>Chips: {Math.abs(clientBalance) % 1 === 0 ?
          Math.abs(clientBalance).toFixed(2) :
          Math.floor(Math.abs(clientBalance) * 100) / 100.00}</span>&nbsp;&nbsp; */}
           {(Math.floor(Number(clientBalance) * 100) / 100).toFixed(2)}
        <Link to='/main/pending-bets'>
          | Exp: <span className={`${clientExposure > 0 ? 'gx-text-green-0' : 'gx-text-red'}`}>{Number.parseFloat(Math.abs(clientExposure)).toFixed(2)}</span>
        </Link>
      </div>
    </>
  );
};

export default Topbar;
