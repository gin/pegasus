class DepegDetector():
    name = "DepegDetector"
    description = "The detector compares stablecoin prices against their historical price range to alert on depegging events"

    async def on_block(self, transactions: List[Transaction]) -> None:
        """
        Handle block transactions
        """
        ...

    async def send_notification(self, transaction: Transaction) -> None:
        """
        Send notification about depegging event
        """
        ...
