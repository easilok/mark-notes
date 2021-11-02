import React, { useState, useEffect } from 'react';
// dayjs plugin
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface PeriodicUpdateProps {
  interval?: number;
  timeReference: string;
  className?: string;
  onClick?: () => void;
}

const TimeAgo: React.FC<PeriodicUpdateProps> = ({
  interval,
  timeReference,
  className,
  onClick,
}) => {
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateTextSync = () => {
      if (timeReference.length > 0) {
        setTimeElapsed(dayjs().to(dayjs(timeReference)));
      } else {
        setTimeElapsed('Pending Sync');
      }
    };
    updateTextSync();
    const timerRef = setInterval(updateTextSync, interval || 1000);

    return () => clearInterval(timerRef);
  }, [setTimeElapsed, timeReference]);

  return (
    <span className={className} onClick={onClick}>
      {timeElapsed}
    </span>
  );
};

export default TimeAgo;
