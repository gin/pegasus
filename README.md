# pegasus
2025 ETHDenver hackathon project

<details>
PEGASUS - Depeg Monitor

🏆 2025 ETHDenver Hackathon Project

Category: On-chain SecurityPrize Amount: $1,000

🚀 Overview

PEGASUS Depeg Monitor is an on-chain security tool that detects price deviations for stablecoins and other pegged assets (e.g., Liquid Staking Tokens, Liquid Restaking Tokens). The system monitors token prices, identifies depegging events, and generates real-time alerts using the Sentinel SDK.

🎯 Features

Real-Time Monitoring: Tracks stablecoin and pegged asset prices.

Depeg Detection: Triggers alerts if the price deviates beyond a defined threshold.

AI-Enhanced Analysis: Uses predictive models to forecast potential depegs.

Blockchain Integration: Fetches live price data via Chainlink price oracles.

Event Alerts: Generates structured alerts using Sentinel SDK.
</details>


## Setup
Setup `sentinel` ([link to official guide](https://github.com/haas-labs/ext-sentinel-py-sdk/blob/main/docs/Install/Virtualenv.md))

```bash
# Clone SDK
git clone --depth 1 git@github.com:haas-labs/ext-sentinel-py-sdk.git
cd ext-sentinel-py-sdk

# Create virtual environment
# (so dependencies does not interfere with your system's)
python3 -m venv .venv
source .venv/bin/activate

# Install
./scripts/install all

# Test if `sentinel` is working correctly
# If it works, there should be some text about how to use `sentinel`
sentinel --help
```

Next, we'll run `sentinel` with our depeg event detector.

```bash
export DEV_TRANSACTION_WS_URI=ws://proxy:9300

sentinel launch --profile depeg-detector/profile.yaml

# sentinel launch --profile depeg-detector/profile.yaml --env-vars .envs/local.yml --rich-logging
```
