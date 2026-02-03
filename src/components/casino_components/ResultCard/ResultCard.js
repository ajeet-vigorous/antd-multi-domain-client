import React from 'react';

export default function ResultCard(props) {
    const { num } = props;
    return (
        <img className='gx-size-40 gx-mx-1 gx-border-secondary' src={`/cards/${num}.png`} alt="card" />
    );
}
