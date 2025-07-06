import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="sm:w-[288px] w-full bg-[#1c1c24] rounded-[15px] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px] border border-[#3a3a43]"
      />
      <div className="p-4 flex flex-col">
        <div className="flex flex-row items-center justify-between mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-medium text-[12px] text-[#808191]">
            Education
          </p>{" "}
          {/* TODO: Add a category on chain in smart contract */}
        </div>
        <div className="block">
          <h3 className="font-semibold text-[16px] text-white leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-normal text-[12px] text-[#808191] leading-[18px] truncate">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd]">
              {amountCollected} ETH
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] truncate">
              Raised of {target} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd]">
              {remainingDays} days
            </h4>
            <p className="mt-[3px] font-normal text-[12px] text-[#808191]">
              Left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <img
            src={thirdweb}
            alt="user"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
          <p className="ml-[12px] font-normal text-[14px] text-[#808191] truncate">
            {owner.slice(0, 6)}...{owner.slice(-4)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
