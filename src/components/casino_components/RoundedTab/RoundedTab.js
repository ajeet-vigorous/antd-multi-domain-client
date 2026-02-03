import React from 'react';

export default function RoundedTab(props) {
  return (
    <div className="colour_sky items-center h-9 px-2 flex justify-between">
      <span className="text-white lg:text-base text-[13px]">
        Last Result
      </span>
      <span className="text-white lg:text-base text-[13px] cursor-pointer hover:underline">View All</span>
    </div>
  );
}

