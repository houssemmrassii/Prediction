import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard1: React.FC = () => {
  return (
    <div className="dashboard-container">
      <iframe
        title="TT PB (2)"
        src="https://app.powerbi.com/reportEmbed?reportId=3a9cb021-128e-4458-85b7-1bc47068565f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730"
        frameBorder="0"
        allowFullScreen={true}
        className="powerbi-iframe"
      ></iframe>
    </div>
  );
};

export default Dashboard1;
