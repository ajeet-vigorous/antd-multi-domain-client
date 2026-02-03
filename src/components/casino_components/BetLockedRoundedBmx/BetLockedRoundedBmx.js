import React from 'react';
import { Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export default function BetLockedRoundedBmx() {
  return (
    <div
      className="gx-position-absolute gx-top-0 gx-w-100 gx-cursor-pointer gx-h-100"
      justify="center"
      align="middle"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <div className='gx-bg-flex gx-justify-content-center gx-align-content-center gx-py-2'>
        <LockOutlined style={{ fontSize: 16, color: 'white' }} />
        {/* <img src='/assets/images/casino-images/padlock.png' alt='Lock' /> */}
      </div>
    </div>
  );
}
