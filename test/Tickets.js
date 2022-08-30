const Tickets = artifacts.require("Tickets");
const assert = require("assert");
const { isTypedArray } = require("util/types");

contract('Tickets', (accounts) => {
    const BUYER = accounts[1];

    it("should allow a user to buy a ticket", async () => {
        const instance = await Tickets.deployed();
        const originalTicket = await instance.tickets(3);
        await instance.buyTicket(3, {from:BUYER, value:originalTicket.price});
        const newTicket = await instance.tickets(3);
        assert.equal(newTicket.ID, BUYER);
    })

})