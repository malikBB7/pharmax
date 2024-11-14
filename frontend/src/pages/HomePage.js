import React, { useState } from 'react';
import IconWithLink from '../components/IconWithLink';
import QualityControl from '../assets/QualityControl.png';
import BatchProcessing from '../assets/BatchProcessing.png';
import SafetyAlert from '../assets/SafetyAlert.png';
import DataAnalytics from '../assets/DataAnalytics.png';
import SafetyControl from '../assets/SafetyControl.png';
import Industry from '../assets/Industry.png';
import Production from '../assets/Production.png';
import SolventRecovery from '../assets/SolventRecovery.png';
import './HomePage.css';

const HomePage = ({ isSidebarOpen }) => {
  return (
    <div className={`icon-container ${isSidebarOpen ? 'shifted-content' : ''}`}>
      <div className="icon-row">
        <IconWithLink imageSrc={QualityControl} link="/quality-control" altText="Quality Control" heading="Quality Control" />
        <IconWithLink imageSrc={BatchProcessing} link="/batch-processing" altText="Batch Processing" heading="Batch Processing" />
        <IconWithLink imageSrc={SafetyAlert} link="/safety-alert" altText="Safety Alert" heading="Safety Alert" />
        <IconWithLink imageSrc={DataAnalytics} link="/data-analytics" altText="Data Analytics" heading="Data Analytics" />
      </div>
      <div className="icon-row">
        <IconWithLink imageSrc={SafetyControl} link="/safety-control" altText="Safety Control" heading="Safety Control" />
        <IconWithLink imageSrc={Industry} link="/industry" altText="Industry" heading="Industry" />
        <IconWithLink imageSrc={Production} link="/production" altText="Production" heading="Production" />
        <IconWithLink imageSrc={SolventRecovery} link="/solvent-recovery" altText="Solvent Recovery" heading="Solvent Recovery" />
      </div>
    </div>
  );
};

export default HomePage;
