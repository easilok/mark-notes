import React from 'react';
import { AlertTriangle, RefreshCw } from 'react-feather';

import '../styles/error.scss';

const Error: React.FC = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <div className="error-page__content">
        <AlertTriangle size={128} />
        <span>Error Conecting to Server</span>
        <span>Please Refresh to try again</span>
      </div>
      <button className="error-reload">
        <RefreshCw size={30} onClick={refreshPage} />
      </button>
    </div>
  );
};

export default Error;
