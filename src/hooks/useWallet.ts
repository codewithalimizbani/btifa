
import axios from 'axios';
import { useState, useEffect } from 'react';



export interface Wallet {
    walletAddress: string;
    netProfit: number;
    // add other fields as necessary based on the API response
  }
  

export const useWallets = (initialPage: number = 1) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages,] = useState<number>(140);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallets = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<any>(`https://onchain.dextrading.com/valuable_wallets`, {
        params: {
          page,
          limit: 50,
          network: 'eth',
        },
      });

      setWallets(response.data);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchWallets(newPage);
    }
  };

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage]);

  return { wallets, currentPage, totalPages, loading, error, handlePageChange };
};
