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

  const sortedLiveCasinoList = liveCasinoList.sort((a, b) => a.orderBy - b.orderBy);
  return (
    <Card className='gx-bg-transparent'>
      <Row justify={'center'} className=' gx-bg-flax gx-block gx-justify-start gx-items-center  lg:space-y-0 gx-space-x-0  gx-md:px-10' style={{ gap: '10px' }}>
        {sortedLiveCasinoList?.map((casino) => (
          <Col key={casino.gameId} className='gx-px-0 gx-mb-0' xs={10} sm={11} md={8} lg={5} xl={5}>
          <Link to={`/main/iframe-casino/${casino.gameId}`}>
            <Card
              className='gx-position-relative gx-d-block gx-d-sm-none   gx-w-100'
              hoverable
              cover={
                <img
                  alt={casino.title}
                  src={casino.img}
                  className='gx-rounded-lg gx-pointer gx-object-contain  '
                  height={130}
                  width={300}
                />
              }
            >
            </Card>
            <Card
              className='gx-position-relative gx-d-none gx-d-sm-block gx-d-md-none  gx-w-100'
              hoverable
              cover={
                <img
                  alt={casino.title}
                  src={casino.img}
                  className='gx-rounded-lg gx-pointer gx-object-contain  '
                  height={200}
                  width={600}
                />
              }
            >
            </Card>
            <Card
                 className='gx-position-relative gx-d-none gx-d-md-block gx-d-lg-none  gx-w-100'
              hoverable
              cover={
                <img
                  alt={casino.title}
                  src={casino.img}
                  className='gx-rounded-lg gx-pointer gx-object-contain  '
                  height={220}
                  width={400}
                />
              }
            >
            </Card>
            <Card
                 className='gx-position-relative gx-d-none gx-d-lg-block   gx-w-100'
              hoverable
              cover={
                <img
                  alt={casino.title}
                  src={casino.img}
                  className='gx-rounded-lg gx-pointer gx-object-contain  '
                  height={250}
                  width={400}
                />
              }
            >
            </Card>
          </Link>
        </Col>
        ))}
      </Row>
    </Card>
  );
};

export default Casino;
