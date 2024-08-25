// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TournamentManager {
    address private owner;
    mapping(uint => string[]) private tournaments;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function addTournament(uint userId, string memory description) public onlyOwner {
        tournaments[userId].push(description);
    }

    function getTournaments(uint userId) public view returns (string[] memory) {
        return tournaments[userId];
    }
}
