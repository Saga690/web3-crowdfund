import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import CountBox from "../components/CountBox";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, contract, getDonations, donate } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    console.log("Donators:", data);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setLoading(true);
    await donate(state.pId, amount);
    setLoading(false);
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="flex flex-col md:flex-row gap-[30px] w-full mt-10">
        <div className="flex-1 min-w-[350px] flex flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-[30px] md:w-[350px] w-full">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>
            <div className="flex flex-row flex-wrap items-center gap-[14px] mt-[20px]">
              <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                <img
                  src={thirdweb}
                  alt="creator"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <h4 className="font-semibold text-[14px] text-white break-all">
                {state.owner}
              </h4>
              <p className="mt-[4px] font-normal text-[12px] text-[#808191]">
                10 Campaigns
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="font-normal text-[16px] leading-[26px] text-[#808191] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-normal text-[16px] leading-[26px] text-[#808191]">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-semibold text-[16px] leading-[26px] text-[#1dc071]">
                      {item.amount} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-normal text-[16px] leading-[26px] text-[#808191]">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>
          <div className="mt-[20px] flex flex-col gap-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-medium text-[20px] leading-[30px] text-center text-[#808191] mt-4">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-{#3a3a13] bg-transparent text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className="mt-[20px] font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
              </div>
              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full mt-[20px] bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
