import React from 'react';
import { FaLock } from "react-icons/fa";

export default function BetLoked() {
  return (
    <div className="gx-position-absolute gx-top-0 gx-d-flex ant-space-align-center gx-justify-content-center gx-w-100 gx-h-100" style={{
      background: 'rgba(0, 0, 0, 0.7)',
    }}>
      <FaLock size={16} className="gx-text-white" />
    </div>
  );
}

