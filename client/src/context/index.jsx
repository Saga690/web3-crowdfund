// Following documentation of created app in thirdweb > code snippets
import React, { createContext, useContext } from "react";
import {
  useConnect,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "../thirdweb";
import { createWallet, injectedProvider } from "thirdweb/wallets";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const account = useActiveAccount();

  const { connect: connectWallet } = useConnect();

  const connect = async () => {
    const wallet = createWallet("io.metamask");

    try {
      if (injectedProvider("io.metamask")) {
        await wallet.connect({ client });
      } else {
        await wallet.connect({
          client,
          walletConnect: { showQrModal: true },
        });
      }

      await connectWallet(() => Promise.resolve(wallet));
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const contract = getContract({
    client,
    chain: defineChain({
      id: parseInt(import.meta.env.VITE_TEMPLATE_CHAIN_ID, 10),
    }),
    address: import.meta.env.VITE_TEMPLATE_CONTRACT_ADDRESS,
  });

  const {
    mutateAsync: sendTransaction,
    isLoading,
    error,
  } = useSendTransaction();

  const publishCampaign = async (form) => {
    try {
      const tx = prepareContractCall({
        contract,
        method:
          "function createCampaign(string _title, string _description, uint256 _targetAmount, uint256 _deadline, string _imageUrl) returns (uint256)",
        params: [
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      const receipt = await sendTransaction(tx);

      console.log("Transaction hash:", receipt?.transactionHash);
      console.log("contract call success", receipt);
      return receipt;
    } catch (error) {
      console.log("contract call failure", error);
      throw error;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address: account?.address,
        contract,
        connect,
        createCampaign: publishCampaign,
        isLoading,
        error,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
