import React from 'react';
import { Button, Typography } from 'antd';

const { Text } = Typography;

export default function BgSkyButtonTheme2(props) {
    const { ele, handleBackOpen, data, section1Ref } = props;

    return (
        <div onClick={() => handleBackOpen(data, section1Ref)}
            className="gx-w-100 gx-h-100 gx-py-2 gx-text-white gx-items-center gx-text-center gx-fs-md gx-px-4 gx-font-weight-semi-bold gx-text-uppercase gx-bg-grey gx-pointer"
        >
            {ele}
        </div>
    );
}