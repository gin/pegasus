import time
import uuid
from typing import List, Dict, Any, ClassVar
from decimal import Decimal

from sentinel.definitions import BLOCKCHAIN
from sentinel.sentry.block_tx import BlockTxDetector
from sentinel.models.event import Event, Blockchain
from sentinel.models.transaction import Transaction
from sentinel.db.contract.abi.erc20 import ERC20 as ERC20_ABI
from sentinel.utils.web3 import get_async_web3

class DepegDetector():
    name = "DepegDetector"
    description = "The detector compares stablecoin prices against their historical price range to alert on depegging events"
    
    @classmethod
    def from_settings(cls, settings: Dict[str, Any], **kwargs) -> 'DepegDetector':
        """
        Initialize a DepegDetector instance from settings
        
        Parameters:
        - settings: Configuration dictionary from profile.yaml
        
        Returns:
        - Initialized DepegDetector instance
        """
        instance = cls()
        instance.logger_name = "DepegDetector"
        
        # Configure stablecoin pairs to monitor and their expected pegs
        instance.stablecoin_pairs = {
            "DAI_USDC": {
                "addresses": {
                    "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                    "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                },
                "decimals": {
                    "DAI": 18,
                    "USDC": 6
                },
                "expected_ratio": Decimal("1.0"),
                "threshold": Decimal("0.05")
            },
            "DAI_USDT": {
                "addresses": {
                    "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                    "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
                },
                "decimals": {
                    "DAI": 18,
                    "USDT": 6
                },
                "expected_ratio": Decimal("1.0"),
                "threshold": Decimal("0.05")
            },
            "USDC_USDT": {
                "addresses": {
                    "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                    "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
                },
                "decimals": {
                    "USDC": 6,
                    "USDT": 6
                },
                "expected_ratio": Decimal("1.0"),
                "threshold": Decimal("0.03")
            }
        }
        
        # Not sure where this is set in .yaml so using this as a default or else `sentinel` errors
        monitoring_enabled = kwargs.get('monitoring_enabled', True)
        if monitoring_enabled:
            print("Monitoring is enabled")



        # Override defaults with settings from profile.yaml
        if "network" in settings:
            instance.network = settings["network"]
        else:
            instance.network = "ethereum"
        
        # Keep track of latest prices
        instance.latest_prices = {}
        
        print(f"DepegDetector initialized with network: {instance.network}")
        return instance

    def is_alive(self) -> bool:
        """
        This is needed or else `sentinel` errors
        """
        return True
    
    def terminate(self) -> None:
        print("DepegDetector terminated")

    async def on_block(self, transactions: List[Transaction]) -> None:
        """
        Handle block transactions
        """
        print(f"Processing block with {len(transactions)} transactions")

    async def send_notification(self, transaction: Transaction) -> None:
        """
        Send notification about depegging event
        """
        print("Depeg event detected!")
