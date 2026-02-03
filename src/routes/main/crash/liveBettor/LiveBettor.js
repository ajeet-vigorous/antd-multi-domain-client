import React, { useEffect, useState } from 'react';
import './liveBettor.css';

const LiveBettors = () => {
  const [displayCount, setDisplayCount] = useState(2);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // Use 3 fixed avatars (can also randomize)
    setAvatars([1, 2, 3].map(i => `https://i.pravatar.cc/45?img=${i}`));

    let secondsPassed = 0;
    const maxSeconds = 20;
    const maxCount = 400;

    const interval = setInterval(() => {
      setDisplayCount((prev) => {
        const randomIncrement = Math.floor(Math.random() * 50) + 1;
        const next = prev + randomIncrement;
        return next > maxCount ? maxCount : next;
      });

      secondsPassed += 1;
      if (secondsPassed >= maxSeconds) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-bettors">
      <div className="avatars">
        {avatars.map((src, idx) => (
          <img key={idx} src={src} alt={`Avatar ${idx}`} className="avatarliveBettor" />
        ))}
      </div>
      <span className="count">{displayCount}</span>
    </div>
  );
};

export default LiveBettors;


export const LiveBettorsBetList = () => {
  const [displayCount, setDisplayCount] = useState(2);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // Use 3 fixed avatars (can also randomize)
    setAvatars([1, 2, 3].map(i => `https://i.pravatar.cc/45?img=${i}`));

    let secondsPassed = 0;
    const maxSeconds = 20;
    const maxCount = 400;

    const interval = setInterval(() => {
      setDisplayCount((prev) => {
        const randomIncrement = Math.floor(Math.random() * 50) + 1;
        const next = prev + randomIncrement;
        return next > maxCount ? maxCount : next;
      });

      secondsPassed += 1;
      if (secondsPassed >= maxSeconds) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-bettors-betlist">
      <div className="avatars">
        {avatars.map((src, idx) => (
          <img key={idx} src={src} alt={`Avatar ${idx}`} className="avatarliveBettor"/>
        ))}
      </div>
      <span className="count-betlist">{displayCount}</span> / <span className="count-betlist">{displayCount} Bets</span>
    </div>
  );
};