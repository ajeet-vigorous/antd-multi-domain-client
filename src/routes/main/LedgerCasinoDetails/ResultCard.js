import React from 'react';

export default function ResultCard(props) {
    // if (!props.num) {
    //     return null
    // }
    const { num, showResult } = props;
    return (
        <div>
            <p>{showResult}</p>
            <img src={`/cards/${num}.png`} alt="card" style={{ width: "25%", height: '30%' }} />
        </div>
    );
}

