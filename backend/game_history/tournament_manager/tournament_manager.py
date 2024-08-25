import logging
import os
import json
from web3 import Web3
from dotenv import load_dotenv
import time
from eth_account import Account

load_dotenv()

CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

web3 = Web3(Web3.HTTPProvider(RPC_URL))

account = Account.from_key(PRIVATE_KEY)
from_address = account.address

current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'tournament-manager.abi.json')

with open(file_path, 'r') as abi_file:
    contract_abi = json.load(abi_file)

contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)

def add_tournament(user_id, game_info):
    logger = logging.getLogger(add_tournament.__name__)
    transaction = contract.functions.addTournament(user_id, game_info).build_transaction({
        'from': from_address,
        'gasPrice': web3.eth.gas_price * 10,
        'nonce': web3.eth.get_transaction_count(from_address),
    })

    estimated_gas = web3.eth.estimate_gas(transaction)
    transaction['gas'] = estimated_gas

    signed_tx = web3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)

    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    logger.debug(f"Transaction successful with hash: {tx_hash.hex()}")
    logger.debug(f"Transaction receipt: {tx_receipt}")

def get_tournaments(user_id):
    logger = logging.getLogger(get_tournaments.__name__)
    tournaments = contract.functions.getTournaments(user_id).call()
    logger.debug(f"Tournaments for user {user_id}: {tournaments}")
    
    return parse_tournaments(tournaments)

def parse_tournaments(tournaments_list):
    try:
        parsed_tournaments = [json.loads(tournament) for tournament in tournaments_list]
        
        return parsed_tournaments
    except json.JSONDecodeError as e:
        raise ValueError(f"Error parsing tournaments data: {str(e)}")
