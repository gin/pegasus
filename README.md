# pegasus
2025 ETHDenver hackathon project

ETHDenver track: Identity, Privacy + Security

Bounty 1: Depeg Monitor
<details>
(Copy and paste of Hacken's Depeg Monitor bounty)

Detector should be configured on a Token contract which is has a peg to another token or a value (e.g. stablecoin, Liquid staking, LRT)
Detector should monitor for token price deviation from an safe range.
Detector should generate event for out of range condition.

🗂️ Bounty Category
On-chain Security

💰 Prize Amount
1000

🥇 Number of Projects Awarded
1

🏆 Winner Breakdown
1st place: $1000

📝 Requirements
Teams must develop a Depeg Monitor capable of detecting stablecoin and pegged asset deviations.
The solution should:

Be configured on a token contract that maintains a peg (e.g., stablecoins, Liquid Staking Tokens (LSTs), Liquid Restaking Tokens (LRTs)).
Define a safe range threshold for price variations and trigger an event when the token price falls outside this range.
Use the Sentinel SDK (GitHub).
✅ What does a successful project look like?
Detector successfully detects
depeg

of an asset in a configured interval and generates an Alert with metadata describing depeg
🎨 UI/UX Design Requirements
No front-end is required, the solution should be a command-line tool that runs autonomously.
Must be packaged in Docker or as a standalone executable for Linux, MacOS, and Windows.
🧑‍⚖️ How are we judging it?
How well does the detector identify depegging events?
Are the alerts timely and reliable with minimal false positives?
Is the code well-structured, efficient, and documented for easy maintenance and further development?
How well is the Sentinel SDK integrated?
🌎 Impact on the organization
Stablecoin depegging has caused big losses and financial instability in DeFi.A Depeg Monitor would provide real-time alerts, improving security and risk management for DeFi protocols, and liquidity providers. This tool will help protect on-chain assets by identifying risks before they escalate, making DeFi safer for all participants.

📚 Resources
SDK: https://github.com/haas-labs/ext-sentinel-py-sdk
Example: https://github.com/haas-labs/ext-sentinel-py-sdk/blob/main/examples/block_tx

👀 Some example use cases
We are looking for proof-of-concept implementations that demonstrate a clear approach to detecting and reporting depegging events. For example: Track USDT, USDC, DAI, and other stablecoins against their pegged value to provide early warnings before major depegs occur.

💼 Recruitment Opportunities
We are always looking for talented developers who are passionate about blockchain security. If your work on this bounty demonstrates strong technical skills and an understanding of real-time blockchain event detection, we encourage you to explore opportunities with our team.
</details>

Bounty 2: AI Smart Contract Auditor 
<details>
(Copy and paste of Hacken's AI Smart Contract Auditor bounty)

�� Requirements
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

## Setup for depeg event detector 
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

# Using Anvil (from Foundry) for local blockchain testing but have not figured out how to test the detector
# export DEV_TRANSACTION_WS_URI=ws://127.0.0.1:8545

sentinel launch --profile depeg-detector/profile.yaml

# sentinel launch --profile depeg-detector/profile.yaml --env-vars .envs/local.yml --rich-logging
```

## Setup for audit agent  (incomplete yet, did not submit)
Setup `uv`, a Python package and project manager ([link to official guide](https://docs.astral.sh/uv/#installation))

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh

cd audit-agent
uv run agent.py
```
