
"use client"

import React from 'react';
import { useParams } from 'next/navigation';

import WalletSummaryChart from 'src/components/WalletSummaryChart';




const WalletSection: React.FC = () => {
  const router = useParams();
  const { walletaddress } = router;


  return (
    <WalletSummaryChart walletAddress={walletaddress as string } />
  );
};

export default WalletSection;
