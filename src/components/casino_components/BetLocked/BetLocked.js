import React from 'react';
import { Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export default function BetLocked() {
  return (
    <Row gutter={[20,20]}
    justify="center"
    align="middle"
    className="ant-row gx-position-absolute gx-top-0 gx-left-0 gx-w-100 gx-h-100 gx-bg-white"
    // style={{  width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.2)' }}
>
    {/* Uncomment and use the Ant Design Lock icon if needed */}
    <LockOutlined style={{ fontSize: 16, color: 'white' }} />
</Row>
  );
}

