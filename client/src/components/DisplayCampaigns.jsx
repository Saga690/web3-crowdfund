import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { FundCard } from "./";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };


  return (
    <div>
        <h1 className="font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
        <div className="mt-[20px] flex flex-wrap gap-[26px]">
            {isLoading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}
            {!isLoading && campaigns.length === 0 && (
                <h1 className="font-semibold text-[20px] text-[#808191] text-center">
                    You have not created any campaigns yet
                </h1>
            )}
            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard key={campaign.pId} {...campaign} handleClick={() => handleNavigate(campaign)} />)}
        </div>
    </div>
  )
};

export default DisplayCampaigns;
