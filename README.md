# The Most Trustworthy Crowdfunding App™  
> *Where strangers give you ETH for your terrible ideas*

## What is this?

Have you ever looked at Kickstarter and thought:  
> *"What if this was way more complicated and nobody knew how gas fees worked?"*  

Well, you're in luck.

This is a **decentralized crowdfunding app** built on the **Sepolia testnet** (because we like to pretend we’re deploying real projects, but with fake money).  

Users can:
- Connect their **wallets** (yes, MetaMask is required — because what's usability?)
- Create campaigns with real goals like:
  - “Buy me snacks”
  - “Let me beat Playboy”
  - “Fund my singing career (no experience, just vibes)”
- Donate fake ETH to other people’s dreams (or scams — who can tell?)

## Tech Stack

| Tech         | Because... |
|--------------|------------|
| Vite         | CRA is for boomers |
| React        | For all your `useEffect` and `why-is-this-rendering-twice` needs |
| Thirdweb v5  | We like tools that change their API weekly |
| Ethers v6    | `.parseEther()` is the new `BigInt hell` |
| Sepolia      | Real enough to flex, fake enough to not go broke |

## Features

- **Create Campaigns**: Because every idea deserves a smart contract, even dumb ones.
- **Donate ETH**: To anyone brave enough to publish their dreams to the blockchain.
- **Get Donator Lists**: Stalk who gave how much.
- **All on-chain**: You can’t delete your mistakes — welcome to Web3.
- **No Delete Option**: Because decentralization means *"Oops I can't fix that"*.

## How to Run It Locally

1. Clone this repo. Because why not.
2. Run:

    ```bash
    npm install
    ```

3. Create a `.env` file and pretend you know what you're doing:

    ```env
    VITE_TEMPLATE_CHAIN_ID=11155111
    VITE_TEMPLATE_CONTRACT_ADDRESS=0xYourContractAddressHere
    ```

4. Start the app:

    ```bash
    npm run dev
    ```

5. Open your browser and behold your future Web3 empire at [http://localhost:5173](http://localhost:5173)

## Deployment

It’s running on Sepolia, which is basically Ethereum... but cosplay.

Contract methods:
- `createCampaign(string, string, uint256, uint256, string)` — where you dump your dreams
- `donateToCampaign(uint256)` — where others dump their ETH
- `getCampaigns()` — for fetching everyone’s bright ideas
- `getBackers(uint256)` — so you can see who believed in your nonsense

## Known Issues

- Your real wallet gets connected. Your fake ETH disappears. Win-win.
- Transaction hashes may return `undefined`. It’s a **feature**.
- Gas fees simulated for dramatic effect.
- Campaigns can't be deleted. It’s *immutable, baby*.

## Why Use This?

Because what better way to learn Web3 than building an app where **nobody gets their money back** and **nothing can be undone**?

Also:
- Want to fake raise ETH?
- Want to build a fake community?
- Want to test your fake Web3 dev skills?

We got you.

---

## Contributing

Please don’t. It’s chaotic enough already.

---

## License

MIT — because legal stuff.

---

## Final Thoughts

If this breaks, it’s probably your fault. If it works, it’s definitely mine.

GLHF.
