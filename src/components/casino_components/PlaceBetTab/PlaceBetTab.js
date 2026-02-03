import React from 'react';

export default function RoundedTab(props) {
  const { backBetModal } = props;

  return (
    <div className={`colour_sky flex text-left py-1.5 px-3 text-white ${backBetModal === true ? "rounded-t" : "rounded"} text-base font-medium`}>
      Place Bet
    </div>
  );
}

