// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.14 <0.9.0;

contract Tickets {
    address public owner = msg.sender;
    uint constant TOTAL_TICKETS = 10;

    struct Ticket{
        address ID;
        uint price;
    }

    Ticket[TOTAL_TICKETS] public tickets;

    constructor() {
        for(uint i = 0; i < TOTAL_TICKETS; i++) {
            tickets[i].ID = address(0x00);
            tickets[i].price = 1e17;
        }
    }

    function buyTicket(uint _index) public payable {
        require(_index < TOTAL_TICKETS && _index >= 0);
        require(tickets[_index].ID == address(0x00));
        require(msg.value == tickets[_index].price);
        tickets[_index].ID = msg.sender;
        tickets[_index].price = 0;
    }
}