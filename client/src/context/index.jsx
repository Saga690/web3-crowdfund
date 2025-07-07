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
import { readContract } from "thirdweb";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const account = useActiveAccount();
  const address = account?.address;

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

  const getCampaigns = async () => {
    try {
      const data = await readContract({
        contract,
        method:
          "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 currentAmount, uint256 deadline, string imageUrl, address[] backers, uint256[] donations)[])",
        params: [],
      });

      console.log("Campaigns data:", data);

      // const campaigns = await contract.call("getCampaigns");
      return data.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.formatEther(campaign.targetAmount.toString()),
        deadline: new Date(Number(campaign.deadline)).toISOString(),
        amountCollected: ethers.formatEther(campaign.currentAmount.toString()),
        image: campaign.imageUrl,
        pId: i,
      }));
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      throw error;
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();
      const userCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
      );
      return userCampaigns;
    } catch (error) {
      console.error("Failed to fetch user campaigns:", error);
      throw error;
    }
  };

  const donate = async (pId, amount) => {
    try {
      const tx = prepareContractCall({
        contract,
        method: "function donateToCampaign(uint256 _campaignId) payable",
        params: [pId],
        value: ethers.parseEther(amount.toString()),
      });

      const receipt = await sendTransaction(tx);
      return receipt;
    } catch (error) {
      console.error("Donation failed:", error);
      throw error;
    }
  };

  const getDonations = async (pId) => {
    try {
      const data = await readContract({
        contract,
        method:
          "function getBackers(uint256 _campaignId) view returns (address[], uint256[])",
        params: [pId],
      });

      const numberOfDonations = data[0].length;
      const donators = [];
      for (let i = 0; i < numberOfDonations; i++) {
        donators.push({
          donator: data[0][i],
          amount: ethers.formatEther(data[1][i].toString()),
        });
      }
      return donators;
    } catch (error) {
      console.error("Failed to fetch donations:", error);
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
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        isLoading,
        error,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
