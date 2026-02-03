import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
import settings from "../../domainConfig";


const SidebarLogo = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { width, themeType } = useSelector(({ settings }) => settings);
  let navStyle = useSelector(({ settings }) => settings.navStyle);
  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }
  const dispatch = useDispatch();
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  return (
    <div className="gx-layout-sider-header">
      {(navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) ? <div className="gx-linebar">
        <i
          className={`gx-icon-btn icon icon-${!sidebarCollapsed ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
          onClick={() => {
            setSidebarCollapsed(!sidebarCollapsed)
          }}
        />
      </div> : null}
      {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ?
        <Link to="/" className="gx-site-logo gx-w-100">
          <img alt="lo" src={settings?.logo} />  </Link> :

        themeType === THEME_TYPE_LITE ?
          <Link to="/" className="gx-site-logo gx-w-100">
            <img alt="logo1" src={settings?.logo} />  </Link> :
          <div className=" gx-w-100 gx-bg-flex gx-justify-content-end">
            <TbLogout onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }} size={30} className="gx-text-white" />
          </div>
      }
    </div>
  );
};

export default SidebarLogo;
