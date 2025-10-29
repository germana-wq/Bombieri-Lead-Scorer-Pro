
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const scoreColor = score > 7.5 ? 'text-green-500' : score > 4.5 ? 'text-yellow-500' : 'text-accent-motion';
  const strokeColor = score > 7.5 ? '#22c55e' : score > 4.5 ? '#eab308' : '#D32210';
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg">
      <h3 className="text-lg font-ibm-plex font-semibold text-dark-altern mb-4">Puntaje de Afinidad</h3>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 140 140">
          <circle
            className="text-gray-200"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="70"
            cy="70"
          />
          <circle
            strokeWidth="12"
            stroke={strokeColor}
            fill="transparent"
            r={radius}
            cx="70"
            cy="70"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-sora text-4xl font-bold ${scoreColor}`}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">sobre 10</p>
    </div>
  );
};

export default ScoreDisplay;
