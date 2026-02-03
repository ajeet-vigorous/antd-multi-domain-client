import React from 'react';

export default function MyBetTabBmx(props) {
  const { totalProfitLoss } = props;
  return (
    <div className="gx-bg-grey gx-text-center gx-py-2 gx-px-3 gx-text-white gx-fs-sm gx-font-weight-semi-bold gx-d-flex gx-justify-content-between gx-align-items-center gx-text-uppercase gx-border-bottom">
      <span></span>
      <span>Casino Bet List </span>
      <span> P/L{" "} <span className={`${totalProfitLoss > 0 ? "gx-text-green" : "gx-text-red"}`}>{totalProfitLoss.toFixed(2)}</span> </span>
    </div>
  );
}



