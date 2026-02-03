import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { liveCasinoList, virtualCasinoList } from './casinoJson'
// import CommingSoon from '../../components/CommingSoon/CommingSoon';

const { Meta } = Card;

const Casino = ({ history }) => {
  const [gameItem, setGameItem] = useState({});
  const [CommingSoonModal, setCommingSoonModal] = useState(false);
  const [domainSettingByDomainName, setDomainSettingByDomainName] = useState(null);

  useEffect(() => {
    getDomainSettingByDomainName();
    const timer = setTimeout(() => {
      setCommingSoonModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getDomainSettingByDomainName = () => {
    try {
      const domainSetting = localStorage.getItem('domainSettingByDomainName');
      if (domainSetting) {
        const parsedDomainSetting = JSON.parse(domainSetting);
        setDomainSettingByDomainName(parsedDomainSetting);
      } else {
        setDomainSettingByDomainName(null);
      }
    } catch (error) {
      console.error('Error parsing domainSettingByDomainName:', error);
      setDomainSettingByDomainName(null);
    }
  };

  const sortedVirtualCasinoList = virtualCasinoList.sort((a, b) => a.orderBy - b.orderBy);
  const sortedLiveCasinoList = liveCasinoList.sort((a, b) => a.orderBy - b.orderBy);
  return (
    <Card className='gx-bg-transparent'>
      {/* <Typography className='gx-bg-grey gx-text-white gx-mb-3 gx-text-center gx-font-weight-semi-bold gx-fs-lg gx-py-2'>
        Virtual Casino
      </Typography>
      <Row justify="center" className=' gx-bg-flax  gx-block gx-justify-center gx-items-center gx-lg:space-x-3 lg:space-y-0 gx-space-x-0 space-y-3 gx-md:px-10' style={{ gap: '10px' }}>
        {sortedVirtualCasinoList?.map((item, index) => (
          <Col key={index} className='gx-px-0  gx-mb-0' span={10} md={6} lg={3}>
            <Link to={`/main/virtual-games/${item.shortName}/`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.img}
                    className='gx-rounded-base gx-pointer gx-object-contain'
                    style={{ height: '11rem' }}
                  />
                }
              >
              </Card>
            </Link>
          </Col>
        ))}

      </Row> */}

      <Typography className='gx-bg-grey gx-text-white gx-mb-3 gx-text-center gx-font-weight-semi-bold gx-fs-lg gx-py-2'>
        Live Casino
      </Typography>
      <Row justify="center" className=' gx-bg-flax gx-block gx-justify-center gx-items-center gx-lg:space-x-3 lg:space-y-0 gx-space-x-0 space-y-3 gx-md:px-10' style={{ gap: '10px' }}>
        {sortedLiveCasinoList?.map((casino) => (
          <Col key={casino.eventId} className='gx-px-0 gx-mb-0' span={10} md={6} lg={3}>
            <Link to={`/main/${casino.shortName}/${casino.eventId}`}>
              <Card
                className='gx-position-relative'
                hoverable
                cover={
                  <img
                    alt={casino.title}
                    src={casino.img}
                    className='gx-rounded-base gx-pointer gx-object-contain'
                    style={{ height: '11rem' }}
                  />
                }
              >
                {casino.casinoNew && (
                  <div
                    style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'block' }}
                    className="blink gx-d-flex gx-justify-content-center gx-align-items-center gx-position-absolute gx-top-0 gx-right-0 flex justify-center items-center top-0"
                  >
                    <span className="gx-text-white gx-fs-xxs gx-text-center gx-font-weight-bold">New Launch</span>
                  </div>
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Casino;
