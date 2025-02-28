# pegasus
2025 ETHDenver hackathon project

ETHDenver track: Identity, Privacy + Security

Bounty 1:
<details>
Category: On-chain Security

🚀 Overview

PEGASUS Depeg Monitor is an on-chain security tool that detects price deviations for stablecoins and other pegged assets (e.g., Liquid Staking Tokens, Liquid Restaking Tokens). The system monitors token prices, identifies depegging events, and generates real-time alerts using the Sentinel SDK.

🎯 Features

Real-Time Monitoring: Tracks stablecoin and pegged asset prices.

Depeg Detection: Triggers alerts if the price deviates beyond a defined threshold.

AI-Enhanced Analysis: Uses predictive models to forecast potential depegs.

Blockchain Integration: Fetches live price data via Chainlink price oracles.

Event Alerts: Generates structured alerts using Sentinel SDK.
</details>

Bounty 2:
<details>
(Copy and paste of Hacken's AI Smart Contract Auditor bounty)

📝 Requirements
The goal of this bounty is to develop an AI-powered security agent that detects vulnerabilities in Solidity smart contracts. The agent should be open-source, self-hostable, and capable of continuous learning using real-world security audit data.
The MVP must feature a chat-based interface, allowing users to submit smart contracts via text input or GitHub integration for automated scanning. The AI model should be pre-trained on real audit reports and security vulnerabilities to ensure high accuracy.

✅ What does a successful project look like?
A successful implementation of this bounty will result in a fully functional, AI-powered smart contract security auditor that can:
✅ Analyze Solidity smart contracts through a chat-based interface or GitHub repository integration
✅ Detect security vulnerabilities using static analysis + AI reasoning
✅ Provide actionable reports that classify risks and suggest mitigations
✅ Be self-hostable and extendable, allowing further training on private datasets

🎨 UI/UX Design Requirements
The application must have a functional user interface, which can be:

A chat-based interface (web-app, CLI, or messaging bot).
A browser-based dApp that allows users to submit smart contracts for analysis.
For browser-based interfaces:
Must be publicly accessible via a demo URL.
Should include an input field for pasting Solidity code and an option to connect a GitHub repository.
Results must be displayed clearly with vulnerability classifications and explanations.
For command-line applications:
Must be packaged in a Docker container for easy deployment.
Should support Linux/MacOS environments.

🧑‍⚖️ How are we judging it?
Success Criteria
1. AI-Powered Smart Contract Security Analysis (40%)

✅ Successfully accepts Solidity code and GitHub repositories as input.
✅ Identifies common vulnerabilities (reentrancy, overflows, access control issues, logic bugs).
✅ Uses a combination of static analysis tools (Slither, Semgrep, Foundry) + AI-based reasoning for enhanced accuracy.
✅ Provides explanations and context for each detected vulnerability.
2. AI Model Training & Security Knowledge (30%)
✅ Model is pre-trained on real-world audit reports provided in JSON/CSV format.
✅ Demonstrates understanding of security best practices by correctly classifying vulnerabilities.
✅ Supports additional training with new security datasets, allowing continued improvement.
3. Deployment & Usability (20%)
✅ Can be self-hosted on a VPS with a Docker-based deployment.
✅ Includes clear documentation on how to install, configure, and extend the system.
✅ Outputs reports in JSON, PDF, or Markdown format, making them easy to integrate into security workflows.
4. Innovation & Scalability (10%)
✅ Allows future customization by supporting additional datasets for fine-tuning.
✅ Demonstrates potential for integration into security pipelines for continuous auditing.
✅ Shows creative ways to enhance AI-powered vulnerability detection beyond static analysis.
Example of a Successful Submission
A team submits a project where:

Users can paste Solidity code or connect a GitHub repo via a chat-based interface.
The AI agent scans the smart contract using static analysis + AI-powered reasoning to detect vulnerabilities.
The system outputs a structured security report with severity classifications and suggested fixes.
The pre-trained model leverages real-world audit data, improving its detection capabilities.
The project is fully self-hostable on a VPS and can be further trained with additional datasets.
Projects that meet or exceed these expectations will be eligible for the $7,000 (1st place) and $3,000 (2nd place) prizes.
</details>

## Setup for depeg event detector (incomplete yet)
Setup `sentinel` ([link to official guide](https://github.com/haas-labs/ext-sentinel-py-sdk/blob/main/docs/Install/Virtualenv.md))

```bash
# Clone SDK
git clone --depth 1 https://github.com/haas-labs/ext-sentinel-py-sdk.git
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
#export DEV_TRANSACTION_WS_URI=ws://proxy:9300

# Using Anvil for local blockchain
export DEV_TRANSACTION_WS_URI=ws://127.0.0.1:8545

sentinel launch --profile depeg-detector/profile.yaml

# sentinel launch --profile depeg-detector/profile.yaml --env-vars .envs/local.yml --rich-logging
```

## Setup for audit agent  (incomplete yet)
Setup `uv`, a Python package and project manager ([link to official guide](https://docs.astral.sh/uv/#installation))

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh

cd audit-agent
uv run agent.py
```
