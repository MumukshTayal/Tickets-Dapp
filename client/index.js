import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import configuration from '../build/contracts/Tickets.json';
import ticketImage from './images/ticket.png';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 =new Web3(
    Web3.givenProvider || 'http://127.0.0.1:8545'
);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;
const TOTAL_TICKETS = 10;
const BLANK_ADDRESS = '0x0000000000000000000000000000000000000000';

// 0x0000000000000000000000000000000000000000
// 0x0000000000000000000000000000000000000000

const createElementfromString = (string) => {
    const div = document.createElement('div');
    div.innerHTML = string.trim();
    return div.firstChild;
}

const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');

const refreshTickets = async () => {
    ticketsEl.innerHTML = "";
    for (i=0; i<TOTAL_TICKETS; i++) {
        const ticket = await contract.methods.tickets(i).call();
        // console.log(ticket);
        if (ticket.ID == BLANK_ADDRESS) {
            const ticketEl = createElementfromString(
                `<div class="ticket card" style="width: 18rem;">
                    <img class="card-img-top" src=${ticketImage} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Ticket</h5>
                        <p class="card-text">${ticket.price}</p>
                        <button class="btn btn-primary">Buy</button>
                    </div>
                </div>`
            );
            ticketsEl.appendChild(ticketEl);
        }
    }
}

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    await refreshTickets();
    // console.log("sdjkasdlasmds");
    accountEl.innerHTML = account;
}

main();
