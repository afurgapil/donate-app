// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Donate {
    address payable public operator;
    address public donationAddress;

    constructor() {
        operator = payable(msg.sender);
    }

    function deposit() public payable {
        require(msg.value > 0, "Please send some Ether to make a deposit.");
    }

    function setDonationAddress(address _donationAddress) public {
        require(msg.sender == operator, "Only the operator can set the donation address");
        donationAddress = _donationAddress;
    }

    function sendDonation() public {
        require(msg.sender == operator, "Only the operator can send the donation");
        require(donationAddress != address(0), "Donation address is not set");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available in the contract");

        payable(donationAddress).transfer(balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
