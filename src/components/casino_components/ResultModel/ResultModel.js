import { IoCloseSharp } from 'react-icons/io5';
import { BsTrophyFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { httpPost } from "../../_helpers/http"
import ResultCard from '../../components/ResultCard/ResultCard';

const ResultModel = (props) => {

    const { handleClose, name, result } = props;
    const [resultDetails, setResultDetails] = useState('')
    const [resultCard, setResultCard] = useState('')
    const [resultDesc, setResultDesc] = useState('')

    useEffect(() => {
        getResultByApi();
    }, )

    const getResultByApi = async () => {
        let resultBody = {
            "roundId": result.mid
        }
        let resultData = await httpPost('sports/casinoSearchResult', resultBody);
        handleResponseCasino(resultData && resultData.data[0] ? resultData.data[0] : {})
        setResultDetails(resultData && resultData.data[0] ? resultData.data[0] : {})
    };

    const handleResponseCasino = (data) => {
        if (data && data.gtype === "teen20") {
            let resultCard = data.cards ? data.cards.split(',') : []
            setResultCard(resultCard);
           
        }
        // else if (data && data.gtype === "queen") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "race20") {
        //     const groupedCards = { 'H': [], 'D': [], 'C': [], 'S': [] };
        //     let spliceData = data.cards ? data.cards.split(",") : [];
        //     spliceData.map((data) => {
        //         const cardType1 = { 'H': 'H', 'D': 'D', 'S': 'S', 'C': 'C' };
        //         const value = data.slice(1, 2);
        //         const cardType = cardType1[value];
        //         if (cardType === "H") {
        //             groupedCards['H'].push(data);
        //         } else if (cardType === "C") {
        //             groupedCards['C'].push(data);
        //         } else if (cardType === "D") {
        //             groupedCards['D'].push(data);
        //         } else if (cardType === "S") {
        //             groupedCards['S'].push(data);
        //         } return groupedCards;
        //     });
        //     setGroupedCards(groupedCards);
        // } 
        // else if (data && data.gtype === "abj") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        else if (data && data.gtype === "ab20") {
            let resultCard = data.cards ? data.cards.split(',') : []
            setResultCard(resultCard);
        }
        // else if (data && data.gtype === "worli2") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "worli") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "superover") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        else if (data && data.gtype === "teen8") {
            let resultCard = data.cards ? data.cards.split(',') : []
            setResultCard(resultCard);
        }
        // else if (data && data.gtype === "teen9") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "card32eu") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        else if (data && data.gtype === "card32") {
            let resultCard = data.cards ? data.cards.split(',') : []
            setResultCard(resultCard);
        }
        else if (data && data.gtype === "aaa") {
            let resultDesc = data.desc ? data.desc.split('|') : []
            setResultDesc(resultDesc);
        }
        else if (data && data.gtype === "lucky7eu") {
            let resultDesc = data.desc ? data.desc.split('|') : []
            setResultDesc(resultDesc);
        }
        else if (data && data.gtype === "dt20") {
            let resultDesc = data.desc ? data.desc.split('*') : []
            setResultDesc(resultDesc);
            let resultCard = data.cards ? data.cards.split(',') : []
            setResultCard(resultCard);
        }
        // else if (data && data.gtype === "dt202") {
        //     let resultDesc = data.desc ? data.desc.split('*') : []
        //     setResultDesc(resultDesc);
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "dt6") {
        //     let resultDesc = data.desc ? data.desc.split('*') : []
        //     setResultDesc(resultDesc);
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "poker20") {
        //     let resultDesc = data.desc ? data.desc.split('##') : []
        //     setResultDesc(resultDesc);
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "poker") {
        //     let resultDesc = data.desc ? data.desc.split('##') : []
        //     setResultDesc(resultDesc);
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "War") {
        //     let resultDesc = data.sid ? data.sid.split(',') : []
        //     setResultDesc(resultDesc);
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "baccarat") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // }
        //  else if (data && data.gtype === "baccarat2") {
        //     let resultCard = data.cards ? data.cards.split(',') : []
        //     setResultCard(resultCard);
        // } 
        // else if (data && data.gtype === "cmeter") {
        //     const groupedCards = { '1-9': [], '10-K': [] };
        //     let spliceData = data.cards ? data.cards.split(",") : [];
        //     spliceData.map((data) => {
        //         const number = {
        //             '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
        //             '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
        //             'J': '11', 'Q': '12', 'K': '13', 'A': '1'
        //         };
        //         const value = data.slice(0, -2);
        //         const numericValue = number[value];
        //         if (numericValue >= 1 && numericValue <= 9) {
        //             groupedCards['1-9'].push(data);
        //         } else if (numericValue >= 10 && numericValue <= 13) {
        //             groupedCards['10-K'].push(data);
        //         } return groupedCards;
        //     });
        // setGroupedCards(groupedCards);
        // }
    }


    return (

        <div className='w-full z-50 fixed px-2 h-screen bg-black/30 top-0 overflow-y-auto'>
            <div className="w-11/12 lg:min-w-[60%] lg:max-w-fit z-50 mx-auto top-4 pt-10">
                <div className="w-full h-full flex justify-between bg-[#3C444B] p-2 items-center">
                    <h2 className="text-[#FDCD21] text-lg">
                        {name}
                    </h2>
                    <div className='text-center pl-2' onClick={handleClose}>
                        <IoCloseSharp className='text-white cursor-pointer' size={24} />
                    </div>
                </div>
                <div className='p-3 bg-[#2E3439]'>
                    <div className='flex justify-start items-center text-base text-[#AAAFB5]'>
                        <span className='font-bold'>Round Id:</span> {result.mid}
                    </div>
                    {resultDetails.gtype === "teen20" ?
                        <div className='grid xl:grid-cols-3 grid-cols-1 xl:space-y-0 space-y-5'>
                            <div className='col-span-2 grid grid-cols-2 divide-x divide-grey-500'>
                                <div className='space-x-4 flex md:flex-row flex-col-reverse justify-center items-center'>
                                    {resultDetails.win === "1" ?
                                        <div className='flex justify-end items-end pt-2 '>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div> : null
                                    }
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='text-[24px] font-[500] text-[#6D7278]'>Player A</p>
                                        <div className='flex md:space-x-2 space-x-0.5 py-2'>
                                            <ResultCard num={resultCard[0]} />
                                            <ResultCard num={resultCard[1]} />
                                            <ResultCard num={resultCard[2]} />
                                        </div>
                                    </div>

                                </div>
                                <div className='space-x-4 flex md:flex-row flex-col-reverse justify-center items-center'>
                                    {resultDetails.win === "3" ?
                                        <div className='flex justify-end items-end pt-2 '>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div> : null
                                    }
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='text-[24px] font-[500] text-[#6D7278]'>Player B</p>
                                        <div className='flex md:space-x-2 space-x-0.5 py-2'>
                                            <ResultCard num={resultCard[3]} />
                                            <ResultCard num={resultCard[4]} />
                                            <ResultCard num={resultCard[5]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full border-2 border-[#3C444B] bg-[#23292E] space-y-0 py-2 h-12'>
                                <div className='flex justify-center items-center text-base'>
                                    <p className='font-medium text-[#6D7278]'>Winner : <span className='text-[#AAAFB5]'>{resultDetails.win === 0 ?
                                        "Player A" : resultDetails.win === 1 ? "Player A" : resultDetails.win === 2 ? "Player A" : "Player B"}</span> </p>
                                </div>
                            </div>
                        </div>
                        // : resultDetails.gtype === "teen9" ?
                        //     <div className=''>
                        //         <div className='flex flex-col justify-center items-center'>
                        //             <p className='text-[24px] font-[500]'>Tiger</p>
                        //             <div className='flex space-x-2 py-2'>
                        //                 <ResultCard num={resultCard[0]} />
                        //                 <ResultCard num={resultCard[3]} />
                        //                 <ResultCard num={resultCard[6]} />
                        //             </div>
                        //         </div>
                        //         {resultDetails.win === "11" ?
                        //             <div className='flex justify-center items-center pt-2 '>
                        //                 <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //             </div> : null
                        //         }
                        //         <div className='flex flex-col justify-center items-center'>
                        //             <p className='text-[24px] font-[500]'>Lion</p>
                        //             <div className='flex space-x-2 py-2'>
                        //                 <ResultCard num={resultCard[1]} />
                        //                 <ResultCard num={resultCard[4]} />
                        //                 <ResultCard num={resultCard[7]} />
                        //             </div>
                        //         </div>
                        //         {resultDetails.win === "21" ?
                        //             <div className='flex justify-center items-center pt-2 '>
                        //                 <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //             </div> : null
                        //         }
                        //         <div className='flex flex-col justify-center items-center'>
                        //             <p className='text-[24px] font-[500]'>Dragon</p>
                        //             <div className='flex space-x-2 py-2'>
                        //                 <ResultCard num={resultCard[2]} />
                        //                 <ResultCard num={resultCard[5]} />
                        //                 <ResultCard num={resultCard[8]} />
                        //             </div>
                        //         </div>
                        //         {resultDetails.win === "31" ?
                        //             <div className='flex justify-center items-center pt-2 '>
                        //                 <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //             </div> : null
                        //         }
                        //     </div>

                        // : resultDetails.gtype === "race20" ?
                        //     <div>
                        //         <div className='flex items-center lg:space-x-5 space-x-3 px-2'>
                        //             <div className='flex flex-col space-y-3 px-3'>
                        //                 <div className='flex items-center space-x-2'>
                        //                     <img src="/images/spade-race.png" alt="spade-race" className='w-10' />
                        //                     {groupedCards['H'].map((card, index) => (
                        //                         <ResultCard num={card} />
                        //                     ))}
                        //                 </div>
                        //                 <div className='flex items-center space-x-2'>
                        //                     <img src="/images/heart-race.png" alt="spade-race" className='w-10' />
                        //                     {groupedCards['D'].map((card, index) => (
                        //                         <ResultCard num={card} />
                        //                     ))}
                        //                 </div>
                        //                 <div className='flex items-center space-x-2'>
                        //                     <img src="/images/club-race.png" alt="spade-race" className='w-10' />
                        //                     {groupedCards['C'].map((card, index) => (
                        //                         <ResultCard num={card} />
                        //                     ))}
                        //                 </div>
                        //                 <div className='flex items-center space-x-2'>
                        //                     <img src="/images/diamond-race.png" alt="spade-race" className='w-10' />
                        //                     {groupedCards['S'].map((card, index) => (
                        //                         <ResultCard num={card} />
                        //                     ))}
                        //                 </div>
                        //             </div>
                        //             <div className='flex lg:space-x-2 space-x-1'>
                        //                 <div className=' bg-[#EFEDED] border border-[#FFFF00] px-3 py-1 text-center text-4xl'>
                        //                     <p>W</p>
                        //                     <p>I</p>
                        //                     <p>N</p>
                        //                     <p>N</p>
                        //                     <p>E</p>
                        //                     <p>R</p>
                        //                 </div>
                        //                 <div className='flex flex-col'>
                        //                     {resultDetails.win === "1" ?
                        //                         <div className='flex justify-center items-center space-x-2'>
                        //                             <img src="/cards/KHH.png" alt="" className="h-14 w-11" />
                        //                             <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div> :
                        //                         <div className='flex justify-center items-center h-full'>
                        //                             <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div>
                        //                     }
                        //                     {resultDetails.win === "2" ?
                        //                         <div className='flex justify-center items-center space-x-2'>
                        //                             <img src="/cards/KDD.png" alt="" className="h-14 w-11" />
                        //                             <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div> :
                        //                         <div className='flex justify-center items-center h-full'>
                        //                             <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div>
                        //                     }
                        //                     {resultDetails.win === "3" ?
                        //                         <div className='flex justify-center items-center space-x-2'>
                        //                             <img src="/cards/KCC.png" alt="" className="h-14 w-11" />
                        //                             <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div> :
                        //                         <div className='flex justify-center items-center h-full'>
                        //                             <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div>
                        //                     }
                        //                     {resultDetails.win === "4" ?
                        //                         <div className='flex justify-center items-center space-x-2'>
                        //                             <img src="/cards/KSS.png" alt="" className="h-14 w-11" />
                        //                             <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div> :
                        //                         <div className='flex justify-center items-center h-full'>
                        //                             <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                        //                         </div>
                        //                     }
                        //                 </div>
                        //             </div>
                        //         </div>
                        //         <div className='flex justify-center items-center pt-2 text-base'>
                        //             <p className='font-medium text-green-500'>Result: <span className='text-black'>{resultDetails.desc}</span> </p>
                        //         </div>
                        //     </div>
                        // : resultDetails.gtype === "btable" ?
                        //     <div>
                        //         <div className='flex justify-center items-center text-base space-x-1'>
                        //             <img src={`/cards/${resultDetails && resultDetails.cards ? resultDetails.cards : null}.png`} alt="card" className="h-14 w-11" />
                        //         </div>
                        //         <div className='flex justify-center items-center pt-2 text-base'>
                        //             <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDesc[0]}</span> </p>
                        //         </div>
                        //         <div className='flex justify-center items-center py-1 pb-2 '>
                        //             <span className='text-black'>{resultDesc[1]} | {resultDesc[2]} | {resultDesc[3]} | {resultDesc[4]}</span>
                        //         </div>
                        //     </div>
                        //  : resultDetails.gtype === "abj" ?
                        //     <div className="space-y-2">
                        //         <div className="">
                        //             <div className=" flex justify-center items-center font-bold text-[16px] w-full" >
                        //                 Andar
                        //             </div>
                        //             <div className=" flex justify-center items-center py-4">
                        //                 {/* <Slider {...settings2} className="w-[350px] ">
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                        //                     </div>
                        //                 </Slider> */}
                        //             </div>
                        //         </div>
                        //         <div className="">
                        //             <div className="flex justify-center items-center font-bold text-[16px] " >
                        //                 Bahar
                        //             </div>
                        //             <div className=" flex justify-center items-center py-4">
                        //                 {/* <Slider {...settings3} className="w-[350px] ">
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                        //                     </div>
                        //                     <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                        //                         {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                        //                     </div>
                        //                 </Slider> */}
                        //             </div>
                        //         </div>

                        //     </div> 
                        : resultDetails.gtype === "ab20" ?
                            <div className="space-y-2">
                                <div className="">
                                    <div className=" flex justify-center items-center font-bold text-[16px] w-full" >
                                        Andar
                                    </div>
                                    {/* <div className=" flex justify-center items-center py-4">
                                                            <Slider {...settings2} className="w-[350px] ">
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                                                                </div>
                                                            </Slider>
                                                        </div> */}
                                </div>
                                <div className="">
                                    <div className="flex justify-center items-center font-bold text-[16px] " >
                                        Bahar
                                    </div>
                                    {/* <div className=" flex justify-center items-center py-4">
                                                            <Slider {...settings3} className="w-[350px] ">
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                                                                </div>
                                                            </Slider>
                                                        </div> */}
                                </div>
                            </div>
                            //  : resultDetails.gtype === "worli2" ?
                            //     <div>
                            //         <div className='flex justify-center items-center space-x-2'>
                            //             {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                            //             {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                            //             {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                            //         </div>
                            //         <div className='flex justify-center items-center text-base py-2'>
                            //             <span className='bg-[#169733] text-white px-6'>{resultDetails.sid}-{resultDetails.win}</span>
                            //         </div>
                            //     </div> 
                            // : resultDetails.gtype === "worli" ?
                            //     <div>
                            //         <div className='flex justify-center items-center space-x-2'>
                            //             {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                            //             {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                            //             {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                            //         </div>
                            //         <div className='flex justify-center items-center text-base py-2'>
                            //             <span className='bg-[#169733] text-white px-6'>{resultDetails.sid}-{resultDetails.win}</span>
                            //         </div>
                            //     </div> 
                            // : resultDetails.gtype === "superover" ?
                            //     <div className='flex justify-center items-center text-base'>
                            //         <h1 className='text-center'>Result not available</h1>
                            //     </div>
                            : resultDetails.gtype === "teen8" ?
                                <div className=''>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='text-[24px] font-[500]'>Dealer</p>
                                        <div className='flex justify-center items-center w-full space-x-1'>
                                            {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                            {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                            {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                        </div>
                                    </div>
                                    <div className='py-6 flex '>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 1</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 2</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                {resultCard[4] === "4" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 3</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                                                {resultCard[7] === "7" ? null : <ResultCard num={resultCard[7]} />}
                                                {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 4</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 5</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 6</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 7</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                        <div className="text-center flex flex-col items-center">
                                            <p className='text-[24px] font-[500]'>Player 8</p>
                                            <div className='flex justify-center items-center w-full space-x-1'>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div>
                                    </div>
                                </div>
                                //  : resultDetails.gtype === "card32eu" ?
                                //     <div className='space-y-4'>
                                //         <div className='grid grid-cols-3'>
                                //             <div className=''>
                                //             </div>
                                //             <div className='flex flex-col justify-center items-center'>
                                //                 <p className='text-[24px] font-[500]'>Player 8</p>
                                //                 {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                //             </div>
                                //             {resultDetails.win === "1" ?
                                //                 <div className='flex justify-center items-center'>
                                //                     <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                //                 </div> : null
                                //             }
                                //         </div>
                                //         <div className='grid grid-cols-3'>
                                //             <div className=''>
                                //             </div>
                                //             <div className='flex flex-col justify-center items-center'>
                                //                 <p className='text-[24px] font-[500]'>Player 9</p>
                                //                 {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                //             </div>
                                //             {resultDetails.win === "2" ?
                                //                 <div className='flex justify-center items-center'>
                                //                     <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                //                 </div> : null
                                //             }
                                //         </div>
                                //         <div className='grid grid-cols-3'>
                                //             <div className=''>
                                //             </div>
                                //             <div className='flex flex-col justify-center items-center'>
                                //                 <p className='text-[24px] font-[500]'>Player 10</p>
                                //                 {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                //             </div>
                                //             {resultDetails.win === "3" ?
                                //                 <div className='flex justify-center items-center'>
                                //                     <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                //                 </div> : null
                                //             }
                                //         </div>
                                //         <div className='grid grid-cols-3'>
                                //             <div className=''>
                                //             </div>
                                //             <div className='flex flex-col justify-center items-center'>
                                //                 <p className='text-[24px] font-[500]'>Player 11</p>
                                //                 {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                //             </div>
                                //             {resultDetails.win === "4" ?
                                //                 <div className='flex justify-center items-center'>
                                //                     <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                //                 </div> : null
                                //             }
                                //         </div>
                                //     </div> 
                                : resultDetails.gtype === "card32" ?
                                    <div className='space-y-4'>
                                        <div className='grid grid-cols-3'>
                                            <div className=''>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='text-[24px] font-[500]'>Player 8</p>
                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                            </div>
                                            {resultDetails.win === "1" ?
                                                <div className='flex justify-center items-center pt-2 '>
                                                    <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                </div> : null
                                            }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                            <div className=''>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='text-[24px] font-[500]'>Player 9</p>
                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                            </div>
                                            {resultDetails.win === "2" ?
                                                <div className='flex justify-center items-center pt-2 '>
                                                    <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                </div> : null
                                            }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                            <div className=''>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='text-[24px] font-[500]'>Player 10</p>
                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                            </div>
                                            {resultDetails.win === "3" ?
                                                <div className='flex justify-center items-center pt-2 '>
                                                    <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                </div> : null
                                            }
                                        </div>
                                        <div className='grid grid-cols-3'>
                                            <div className=''>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='text-[24px] font-[500]'>Player 11</p>
                                                {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                            </div>
                                            {resultDetails.win === "4" ?
                                                <div className='flex justify-center items-center pt-2 '>
                                                    <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                    : resultDetails.gtype === "aaa" ?
                                        <div className='lg:flex block justify-between items-center lg:space-y-0 space-y-4 pt-4'>

                                            <div className='flex justify-center items-center text-base space-x-1 w-full'>
                                                {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                            </div>
                                            <div className='w-full border-2 border-[#3C444B] bg-[#23292E] space-y-0 py-2'>
                                                <div className='flex justify-center items-center text-base'>
                                                    <p className='font-medium text-[#6D7278]'>Winner <span className='text-[#AAAFB5]'>{resultDesc[0]}</span> </p>
                                                </div>
                                                <div className='flex justify-center items-center text-base'>
                                                    <p className='font-medium text-[#6D7278]'>Odd/Even <span className='text-[#AAAFB5]'>{resultDesc[2]}</span> </p>
                                                </div>
                                                <div className='flex justify-center items-center text-base'>
                                                    <p className='font-medium text-[#6D7278]'>Color <span className='text-[#AAAFB5]'>{resultDesc[1]}</span> </p>
                                                </div>
                                                <div className='flex justify-center items-center text-base'>
                                                    <p className='font-medium text-[#6D7278]'>Under/Over <span className='text-[#AAAFB5]'>{resultDesc[3]}</span> </p>
                                                </div>
                                                <div className='flex justify-center items-center text-base'>
                                                    <p className='font-medium text-[#6D7278]'>Card <span className='text-[#AAAFB5]'>{resultDesc[4]}</span> </p>
                                                </div>
                                            </div>
                                        </div>
                                        : resultDetails.gtype === "lucky7" ?
                                            <div>
                                                <div className='flex justify-center items-center text-base space-x-1'>
                                                    {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                                </div>
                                                <div className='flex justify-center items-center pt-2 text-base'>
                                                    <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDetails.desc}</span> </p>
                                                </div>
                                                <div className='flex justify-center items-center py-1 pb-2 '>

                                                </div>
                                            </div>
                                            : resultDetails.gtype === "lucky7eu" ?
                                                <div className='flex lg:flex-row flex-col lg:space-y-0 space-y-4  justify-between items-center pt-5'>
                                                    <div className='flex justify-center items-center text-base space-x-1 w-full'>
                                                        {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                                    </div>
                                                    <div className='w-full border-2 border-[#3C444B] bg-[#23292E] space-y-0 py-2'>
                                                        <div className='flex justify-center items-center text-base'>
                                                            <p className='font-medium text-[#6D7278]'>Winner :  <span className='text-[#AAAFB5]'>{resultDesc[0]}</span> </p>
                                                        </div>
                                                        <div className='flex justify-center items-center text-base'>
                                                            <p className='font-medium text-[#6D7278]'>Odd/Even :  <span className='text-[#AAAFB5]'>{resultDesc[4]}</span> </p>
                                                        </div>
                                                        <div className='flex justify-center items-center text-base'>
                                                            <p className='font-medium text-[#6D7278]'>Color :  <span className='text-[#AAAFB5]'>{resultDesc[2]}</span> </p>
                                                        </div>
                                                        <div className='flex justify-center items-center text-base'>
                                                            <p className='font-medium text-[#6D7278]'>Card : <span className='text-[#AAAFB5]'>{resultDesc[6]}</span> </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                : resultDetails.gtype === "dt20" ?
                                                    <div div className=''>
                                                        <div className='grid xl:grid-cols-2 grid-cols-1 gap-2'>
                                                            <div className="grid grid-cols-2 gap-2 divide-x divide-[#AAAFB5]">
                                                                <div className='flex justify-center items-center'>
                                                                    <div>
                                                                        <p className='text-3xl py-2 text-[#AAAFB5]'>Dragon</p>
                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-center items-center'>
                                                                    <div>
                                                                        <p className='text-3xl py-2 text-[#AAAFB5]'>Tiger</p>
                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col justify-center items-center pt-2 '>
                                                                <p className='text-base font-medium bg-[#23292E] text-[#74797F] p-3 border border-white w-full'>Winner : <span className='text-[#AAAFB5]'>{resultDesc[0]}</span></p>
                                                                {/* <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                            <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    //  : resultDetails.gtype === "dt6" ?
                                                    //     <div div className='lg:block hidden'>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className="flex items-center space-x-2">
                                                    //                 {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                    //                 {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                    //             </div>
                                                    //             <div className='flex flex-col justify-center items-center pt-2 '>
                                                    //                 <p className='text-base font-medium text-green-500'>Result:<span className='text-black'>{resultDesc[0]}</span></p>
                                                    //                 <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                    //                 <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div> 
                                                    // : resultDetails.gtype === "dt202" ?
                                                    //     <div div className='lg:block hidden'>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className="flex items-center space-x-2">
                                                    //                 {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                    //                 {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                    //             </div>
                                                    //             <div className='flex flex-col justify-center items-center pt-2 '>
                                                    //                 <p className='text-base font-medium text-green-500'>Result:<span className='text-black'>{resultDesc[0]}</span></p>
                                                    //                 <p className='text-base font-medium text-green-500'>Dragon:<span className='text-black'>{resultDesc[1]}</span></p>
                                                    //                 <p className='text-base font-medium text-green-500'>Tiger:<span className='text-black'>{resultDesc[2]}</span></p>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div>
                                                    // : resultDetails.gtype === "poker20" ?
                                                    //     <div className='lg:block hidden'>
                                                    //         <div className='grid grid-cols-2 w-full'>
                                                    //             <div className='flex flex-col justify-center items-center space-y-2 border-r py-2'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[0]} />
                                                    //                     <ResultCard num={resultCard[1]} />
                                                    //                 </div>
                                                    //                 {resultDetails.win === "11" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> :
                                                    //                     <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>}
                                                    //             </div>
                                                    //             <div className='flex flex-col justify-center items-center space-y-2 border-r py-2'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[2]} />
                                                    //                     <ResultCard num={resultCard[3]} />
                                                    //                 </div>
                                                    //                 {resultDetails.win === "21" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> :
                                                    //                     <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>}
                                                    //             </div>

                                                    //             <div className='flex flex-col justify-center items-center space-y-2 col-span-2 border-t border-b p-4'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[4]} />
                                                    //                     <ResultCard num={resultCard[5]} />
                                                    //                     <ResultCard num={resultCard[6]} />
                                                    //                     <ResultCard num={resultCard[7]} />
                                                    //                     <ResultCard num={resultCard[8]} />
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='space-y-1 border-t border-b p-2'>
                                                    //                 <p className='text-base font-[500] text-[#169733]'>Winner:<span className='text-black'>{resultDesc[0]}</span></p>
                                                    //                 <p className='text-base font-[500] text-yellow-400'>Player {resultDesc[1]}</p>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div> 
                                                    // : resultDetails.gtype === "poker" ?
                                                    //     <div className='lg:block hidden'>
                                                    //         <div className='grid grid-cols-2 w-full'>
                                                    //             <div className='flex flex-col justify-center items-center space-y-2 border-r py-2'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[0]} />
                                                    //                     <ResultCard num={resultCard[1]} />
                                                    //                 </div>
                                                    //                 {resultDetails.win === "11" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> :
                                                    //                     <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>}
                                                    //             </div>
                                                    //             <div className='flex flex-col justify-center items-center space-y-2 border-r py-2'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[2]} />
                                                    //                     <ResultCard num={resultCard[3]} />
                                                    //                 </div>
                                                    //                 {resultDetails.win === "21" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> :
                                                    //                     <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>}
                                                    //             </div>

                                                    //             <div className='flex flex-col justify-center items-center space-y-2 col-span-2 border-t border-b p-4'>
                                                    //                 <p className='text-[24px] font-[500]'>Player A</p>
                                                    //                 <div className='flex space-x-2 py-2'>
                                                    //                     <ResultCard num={resultCard[4]} />
                                                    //                     <ResultCard num={resultCard[5]} />
                                                    //                     <ResultCard num={resultCard[6]} />
                                                    //                     <ResultCard num={resultCard[7]} />
                                                    //                     <ResultCard num={resultCard[8]} />
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='space-y-1 border-t border-b p-2'>
                                                    //                 <p className='text-base font-[500] text-[#169733]'>Winner:<span className='text-black'>{resultDesc[0]}</span></p>
                                                    //                 <p className='text-base font-[500] text-yellow-400'>Player {resultDesc[1]}</p>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div> 
                                                    // : resultDetails.gtype === "War" ?
                                                    //     <div>
                                                    //         <div className='lg:block hidden'>
                                                    //             <div className='flex flex-col justify-center items-center'>
                                                    //                 <p className='text-lg font-medium'>Dealer</p>
                                                    //                 <ResultCard num={resultCard[6]} />
                                                    //             </div>
                                                    //             <div className='grid grid-cols-6 gap-10 py-6'>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 1</p>
                                                    //                     <ResultCard num={resultCard[0]} />
                                                    //                     {resultDesc.includes("1") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 2</p>
                                                    //                     <ResultCard num={resultCard[1]} />
                                                    //                     {resultDesc.includes("2") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 3</p>
                                                    //                     <ResultCard num={resultCard[2]} />
                                                    //                     {resultDesc.includes("3") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 4</p>
                                                    //                     <ResultCard num={resultCard[3]} />
                                                    //                     {resultDesc.includes("4") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 5</p>
                                                    //                     <ResultCard num={resultCard[4]} />
                                                    //                     {resultDesc.includes("5") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //                 <div className="text-center flex flex-col items-center space-y-1">
                                                    //                     <p className='text-lg font-medium'>Player 6</p>
                                                    //                     <ResultCard num={resultCard[5]} />
                                                    //                     {resultDesc.includes("6") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //         </div>
                                                    //         <div className='lg:hidden block p-2 space-y-1'>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Dealer</p>
                                                    //                     <ResultCard num={resultCard[6]} />
                                                    //                 </div>
                                                    //                 <div>
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 1</p>
                                                    //                     <ResultCard num={resultCard[0]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("1") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 2</p>
                                                    //                     <ResultCard num={resultCard[1]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("2") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 3</p>
                                                    //                     <ResultCard num={resultCard[2]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("3") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 4</p>
                                                    //                     <ResultCard num={resultCard[3]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("4") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 5</p>
                                                    //                     <ResultCard num={resultCard[4]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("5") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex justify-between items-center border border-gray-400 p-2 shadow-lg'>
                                                    //                 <div className='flex items-center space-x-8'>
                                                    //                     <p>Player 6</p>
                                                    //                     <ResultCard num={resultCard[5]} />
                                                    //                 </div>
                                                    //                 <div className='flex items-end justify-end px-2'>
                                                    //                     {resultDesc.includes("6") ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //                 </div>
                                                    //             </div>

                                                    //         </div>
                                                    //     </div>
                                                    //  : resultDetails.gtype === "cmeter" ?
                                                    //     <div className='flex justify-between items-center'>
                                                    //         <div className='space-y-2'>
                                                    //             <div className='flex items-center space-x-6'>
                                                    //                 <div>
                                                    //                     <p className='text-[24px] font-[500]'>Low Cards</p>
                                                    //                 </div>
                                                    //                 <div className='flex space-x-1'>
                                                    //                     {groupedCards['1-9'].map((card, index) => (
                                                    //                         <ResultCard num={card} />
                                                    //                     ))}
                                                    //                 </div>
                                                    //             </div>
                                                    //             <div className='flex items-center space-x-6'>
                                                    //                 <div>
                                                    //                     <p className='text-[24px] font-[500]'>High Cards</p>
                                                    //                 </div>
                                                    //                 <div className='flex space-x-1'>
                                                    //                     {groupedCards['10-K'].map((card, index) => (
                                                    //                         <ResultCard num={card} />
                                                    //                     ))}
                                                    //                 </div>
                                                    //             </div>
                                                    //         </div>
                                                    //         <div>
                                                    //             <img src="/images/2DD.png" alt="" className="h-11 w-10" />
                                                    //         </div>
                                                    //     </div>
                                                    //  : resultDetails.gtype === "cmatch20" ?
                                                    //     <div className='flex justify-center items-center text-base space-x-1'>
                                                    //         <ResultCard num={resultDetails.cards} />
                                                    //     </div>
                                                    //  : resultDetails.gtype === "baccarat" ?
                                                    //     <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className='text-2xl font-medium'>Player</div>
                                                    //             <div className='flex justify-center items-center text-base space-x-1'>
                                                    //                 <span className='-rotate-90'>
                                                    //                     {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                    //                 </span>
                                                    //                 {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                    //                 {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                    //             </div>
                                                    //             {resultDetails.win === "1" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //         </div>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className='text-2xl font-medium'>Player</div>
                                                    //             <div className='flex justify-center items-center text-base space-x-1'>
                                                    //                 {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                    //                 {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                    //                 <span className='rotate-90'>
                                                    //                     {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                    //                 </span>
                                                    //             </div>
                                                    //             {resultDetails.win === "2" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //         </div>
                                                    //     </div>
                                                    //  : resultDetails.gtype === "baccarat2" ?
                                                    //     <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className='text-2xl font-medium'>Player</div>
                                                    //             <div className='flex justify-center items-center text-base space-x-1'>
                                                    //                 <span className='-rotate-90'>
                                                    //                     {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                    //                 </span>
                                                    //                 {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                    //                 {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                    //             </div>
                                                    //             {resultDetails.win === "1" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //         </div>
                                                    //         <div className='flex flex-col justify-center items-center space-y-2'>
                                                    //             <div className='text-2xl font-medium'>Player</div>
                                                    //             <div className='flex justify-center items-center text-base space-x-1'>
                                                    //                 {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                    //                 {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                    //                 <span className='rotate-90'>
                                                    //                     {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                    //                 </span>
                                                    //             </div>
                                                    //             {resultDetails.win === "2" ? <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                    //         </div>
                                                    //     </div>
                                                    : <>
                                                        {/* 3card jugement page model  */}
                                                        {/* <div className='flex justify-center items-center space-x-2'>
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                </div> */}
                                                        {/*3card jugement page model  */}
                                                        {/* oneday teenpatti page model  */}
                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Player A</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex justify-center items-center pt-2 '>
                                                                                                                                        <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Player B</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                </div> */}
                                                        {/* oneday teenpatti page model  */}
                                                        {/* test teenpatti page model  */}
                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Tiger</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex justify-center items-center pt-2 '>
                                                                                                                                        <span className='text-[#169733] pulse rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Lion</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Dragon</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                </div> */}
                                                        {/* test teenpatti page model  */}
                                                        {/* dragon tiger page model  */}
                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>

                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center pt-2 '>
                                                                                                                                        <p className='font-medium text-green-400'>Result: <span className='text-black'>Dragon|No Pair</span> </p>
                                                                                                                                        <p className='font-medium text-green-400'>Dragon: <span className='text-black'>Black|Even|Card4</span> </p>
                                                                                                                                        <p className='font-medium text-green-400'>Tiger: <span className='text-black'>Black|Even|Card2</span> </p>
                                                                                                                                    </div>
                                                                                                                                </div> */}
                                                        {/* dragon tiger page model  */}
                                                    </>}
                </div>
            </div >
        </div >
    );
}

export default ResultModel;