

import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { FaHome, FaInfo } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaTrophy } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { IoKeyOutline, IoLogOut, IoBook, IoSettings } from "react-icons/io5";
import { FaArrowRightLong, FaMoneyBill1Wave } from "react-icons/fa6";
import SidebarLogo from "./SidebarLogo";
// import UserProfile from "./UserProfile";

import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../appRedux/actions";
import { TbCards } from "react-icons/tb";
import settings from "../../domainConfig";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);
  const dispatch = useDispatch();
  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={[selectedKeys]}
          theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
          mode="inline">
            
          {/* {/ <MenuItemGroup style={{marginLeft:"0px !important" ,paddingLeft:"0px !important"}} key="main" className="gx-menu-group" > /} */}
            <Menu.Item style={{marginLeft:"0px !important" ,paddingLeft:"0px !important"}} key="main/dashboard" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link to="/main/dashboard" style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " >
                <FaHome size={25} className=""/>
              <span className='gx-fs-lg gx-font-weight-semi-bold'>
                  <IntlMessages id="sidebar.home" /></span>
              </Link>
              <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/inplay" className="gx-border-bottom-2 ">
             <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
             <Link to="/main/matches" style={{gap:"10px"}} className="gx-bg-flex gx-justify-content-start gx-align-items-center gx-text-white "><BsPlayFill size={20} /> 
                <span className='gx-fs-lg gx-font-weight-semi-bold'><IntlMessages id="sidebar.inplay" /></span></Link>
                <FaArrowRightLong size={20} />
             </div>
            </Menu.Item>

            <Menu.Item key="main/casino" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link to="/main/casino" style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center "><TbCards size={20} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'><IntlMessages id="sidebar.casino" /></span></Link>

            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/freegame" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link to="/main/freegame" style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center "> <FaTrophy size={20} /> 
                <span className='gx-fs-lg  gx-font-weight-semi-bold'> <IntlMessages id="sidebar.freegame" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/ledger" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link to="/main/ledger" style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center "> <BsCash size={18} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.ledger" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/statement" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/statement"> <IoBook size={17} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.statement" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/exposure" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/pending-bets"> <FaMoneyBill1Wave size={15} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.exposure" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/profile" className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/profile">  <CgProfile size={20} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.profile" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/rules" className="gx-border-bottom-2">
              <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/rules">< FaInfo size={20} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.rules" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            <Menu.Item key="main/password" className="gx-border-bottom-2">
              <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/changepassword"> <IoKeyOutline size={18} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.password" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>
            <Menu.Item key="main/setting" className="gx-border-bottom-2">
              <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/settings"> <IoSettings size={18} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> <IntlMessages id="sidebar.settings" /></span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>

            {settings?.matkaVisible && <Menu.Item key="main/matkabetlist" className="gx-border-bottom-2">
              <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
              <Link style={{gap:"10px"}} className="gx-bg-flex gx-text-white gx-justify-content-start gx-align-items-center " to="/main/matka-bet-list"> <IoBook size={18} />
                <span className='gx-fs-lg gx-font-weight-semi-bold'> Matka Bet List</span></Link>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>}

            <Menu.Item key="main/logout" onClick={() => dispatch(userSignOut())} className="gx-border-bottom-2">
            <div className="gx-bg-flex gx-justify-content-between gx-align-items-center ">
            <div style={{gap:"10px"}} className="gx-bg-flex gx-justify-content-start gx-align-items-center ">
            <IoLogOut size={20} />  <span className='gx-fs-lg gx-font-weight-semi-bold'>LOGOUT </span>
            </div>
            <FaArrowRightLong size={20} />
              </div>
            </Menu.Item>
          {/* {/ </MenuItemGroup> /} */}
        </Menu>
      </div >
    </>
  );
};

export default React.memo(SidebarContent);

