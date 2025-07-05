// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 targetAmount;
        uint256 currentAmount;
        uint256 deadline;
        string imageUrl;
        address[] backers;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public campaignCount = 0;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _imageUrl
    ) public returns (uint256) {
        require(_targetAmount > 0, "Target amount must be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[campaignCount];

        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.currentAmount = 0;
        newCampaign.deadline = _deadline;
        newCampaign.imageUrl = _imageUrl;

        campaignCount++;
        return campaignCount - 1; // Return the ID of the newly created campaign
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];

        require(campaign.deadline > block.timestamp, "Campaign has ended");
        require(msg.value > 0, "Donation must be greater than zero");
        require(campaign.currentAmount + msg.value <= campaign.targetAmount, "Donation exceeds target amount");

        campaign.backers.push(msg.sender);
        campaign.donations.push(msg.value);
        
        (bool success, ) = campaign.owner.call{value: msg.value}("");
        require(success, "Transfer failed");
        campaign.currentAmount += msg.value;
    }

    function getBackers(uint256 _campaignId) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[_campaignId];
        return (campaign.backers, campaign.donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount); // Create an array to hold all campaigns
        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
}