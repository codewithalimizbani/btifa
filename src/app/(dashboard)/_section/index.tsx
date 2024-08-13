"use client"

import { type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { Stack, Container } from "@mui/material";

import { useWallets } from "src/hooks/useWallet";

import CustomTable from "src/components/CustomTable";

const columns = [
  {
    title: "Wallet Address",
    modify: (row: any) => row.walletAddress,
  },
  {
    title: "Net Profit",
    modify: (row: any) => row.netProfit,
  },
];

const WalletTable = () => {
  const {push} = useRouter()
  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    handlePageChange(newPage)
  };
  const { wallets, currentPage, totalPages, loading, error, handlePageChange } = useWallets();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

 
  return (
    <Container>
 <Stack sx={{width:"100%", height:"80vh"}}>
  <CustomTable
      page={currentPage}
      handleChangePage={handleChangePage}
      totalCount={totalPages}
      title="Wallets"
      columns={columns}
      data={wallets}
      onTableClick={(id)=>push(id)}
    />
    </Stack>
    </Container>
  );
};

export default WalletTable;
