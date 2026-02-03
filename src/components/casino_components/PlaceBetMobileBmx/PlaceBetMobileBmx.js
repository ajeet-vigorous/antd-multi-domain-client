import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaTimes } from 'react-icons/fa';
import { Button, Flex } from 'antd';

export default function PlaceBetMobileBmx(props) {
    const { placeBet, inputRef, LoadingBet, inputChange, time, betChipsData ,updateStake} = props;
    return (

        <div className='gx-d-lg-none gx-d-flex gx-justify-content-between gx-align-items-center gx-py-1' style={{gap:'2px'}}>
            <div className='gx-fs-sm gx-font-weight-bold'>Amount</div>
            <div style={{ border: '1px solid #C99D1E' }} className='gx-w-50'>
                <input style={{ backgroundColor: '#E9E9E9' }} ref={inputRef} type="text" autoFocus  // or type="text"
                    autoCapitalize="none" className="gx-w-100 gx-black-text gx-border-dark gx-fs-md gx-px-1" placeholder="0" name="stake" onChange={updateStake} list="stake" inputMode="numeric" />
                <datalist id="stake" className='gx-bg-black gx-white-text'>
                    {betChipsData.map((element, index) => (
                        <option key={index} value={element ? element : 0} />
                    ))}
                </datalist>
            </div>

            <div className='gx-d-flex gx-justify-content-end gx-align-items-center gx-fs-md' style={{gap:'2px'}}>
                <div className='gx-bg-dark gx-text-white gx-py-1 gx-px-2'>
                    <CountdownCircleTimer
                        isPlaying
                        duration={7}
                        colors={['#000000']}
                        colorsTime={[7]}
                        size={20}
                        strokeWidth={0}
                        className="gx-bg-white gx-fs-lg"
                    >
                        {({ remainingTime }) => remainingTime === 7 ? 7 : time}
                    </CountdownCircleTimer>
                </div>
                {/* <Button
                    onClick={placeBet}
                    style={{
                        backgroundColor: '#3A61A2',
                        borderRadius: '2px%',
                    }}
                    className='gx-postion-relative gx-rounded-sm gx-text-white gx-mb-0 gx-d-flex gx-justify-content-center gx-align-items-center gx-fs-sm gx-px-3 gx-py-1'
                >
                    {LoadingBet && (
                        <div className='gx-postion-absolute gx-d-flex gx-justify-content-center gx-align-items-center gx-bg-transparent'>
                            <div
                                style={{
                                    borderTop: '5px solid #ffffff',
                                    borderRadius: '50%',
                                    width: '1.25rem',
                                    height: '1.25rem',
                                    animation: 'spin 1s linear infinite'
                                }}
                            ></div>
                        </div>
                    )}
                    Done
                    <style>
                        {` @keyframes spin { 0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }} `}
                    </style>
                </Button> */}
                  <Button
              disabled={LoadingBet}
              size="smaLL"
              onClick={() => placeBet()}
              className={`${
                LoadingBet ? "gx-bg-dark" : "gx-bg-grey"
              } gx-text-white  gx-justify-content-center gx-rounded-xxl gx-mb-0 gx-px-3`}
            >
           <div className=" gx-bg-flex gx-align-items-center  gx-justify-content-center">
                 <div className="gx-px-2">Done</div>
                 {LoadingBet && <div className="loaderSpinner "></div>}
                 </div>
            </Button>
            </div>
        </div>
    );
}
