import React from 'react';
import { Button } from 'antd';


export default function BgSkyCardTheme2(props) {
    const { ele } = props;

    return (
        <div
            type="primary"
            className='gx-w-100 gx-h-100 gx-py-2 gx-text-white gx-items-center gx-text-center gx-fs-md gx-px-4 gx-font-weight-semi-bold gx-text-uppercase gx-rounded-sm gx-bg-grey'
        >
            {ele}
        </div>
    );
}

