import React from 'react';
import styled from 'styled-components';

const SnakeProgressBar = ({ percentage }) => {
  // Determine the color based on percentage
  let progressColor, headColor;
  if (percentage < 20) {
    progressColor = 'linear-gradient(90deg, #8B0000, #B22222)';
    headColor = '#8B0000';
  } else if (percentage < 50) {
    progressColor = 'linear-gradient(90deg, #8B0000, #B22222)';
    headColor = '#8B0000';
  } else {
    progressColor = 'linear-gradient(90deg, #8B0000, #B22222)';
    headColor = '#8B0000';
  }

  return (
    <SnakeProgressContainer>
            <ProgressText>
        {Math.floor(Math.max(0, Math.min(100, percentage)))}%
      </ProgressText>
      <SnakeProgress 
        style={{ 
          width: `${Math.max(0, Math.min(100, percentage))}%`,
          background: progressColor
        }}
      >
        <SnakeScales />
        <SnakeHead style={{ background: headColor }}>
          <div className="mouth"></div>
          <div className="tonge"></div>
        </SnakeHead>
      </SnakeProgress>

    </SnakeProgressContainer>
  );
};

// Styled components
const SnakeProgressContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  position: relative;
`;

const SnakeProgress = styled.div`
  height: 15px;  /* Reduced from 30px */
  background: linear-gradient(90deg, #556B2F, #6B8E23);
  border-radius: 7px 3px 3px 7px;  /* Adjusted to match new height */
  position: relative;
  transition: width 0.5s ease;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;  /* Adjusted */
    width: 10px;  /* Reduced */
    height: 10px;  /* Reduced */
    background: #6B8E23;
    border-radius: 50%;
    z-index: -1;
  }
`;

const SnakeScales = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 2px),
    radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 1px, transparent 2px);
  background-size: 15px 15px;  /* Reduced from 20px */
  border-radius: inherit;
`;

const SnakeHead = styled.div`
  position: absolute;
  right: -12px;  /* Adjusted */
  top: -3px;  /* Adjusted */
  width: 20px;  /* Reduced from 40px */
  height: 20px;  /* Reduced from 40px */
  background: #556B2F;
  border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
  transform: rotate(15deg);

  &:before, &:after {
    content: '';
    position: absolute;
    top: 5px;  /* Adjusted */
    width: 4px;  /* Reduced */
    height: 4px;  /* Reduced */
    background: #fff;
    border-radius: 50%;
  }

  &:before {
    right: 3px;  /* Adjusted */
  }

  &:after {
    right: 10px;  /* Adjusted */
  }

  .mouth {
    position: absolute;
    right: 5px;  /* Adjusted */
    bottom: 3px;  /* Adjusted */
    width: 8px;  /* Reduced */
    height: 4px;  /* Reduced */
    border-bottom: 2px solid #fff;  /* Reduced */
    border-radius: 0 0 50% 50%;
  }
  
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 10px;
  font-family: Arial;
  color: #333;
  font-weight: bolder;
  font-size: 40px;
`;

export default SnakeProgressBar;