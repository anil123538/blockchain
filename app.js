import { ethers } from 'ethers';
const contractAddress = "0xC5E0e0b25c9B4b4a5f9c3Ed6e1f13E3e88f8e034"; // Replace with your contract address
const abi = [ [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "addBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "becomeMember",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_deadline",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "BookBorrowed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "BookReturn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "Borrowbook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			}
		],
		"name": "MembershipPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PenaltyCharge",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "returnBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "withdrawfunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "books",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getbalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookid",
				"type": "uint256"
			}
		],
		"name": "getBooksdetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "membershipfee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "students",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isMember",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "borrowedcount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; // Paste your ABI here

let provider, signer, contract;

async function initialize() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Connected to contract:", contractAddress);

        // Example: Update the UI with initial state
        const balance = await provider.getBalance(contractAddress);
        document.getElementById("output").innerText = `Contract Balance: ${ethers.utils.formatEther(balance)} ETH`;
    } else {
        alert("Please install Metamask!");
    }
}

document.getElementById("become-member").addEventListener("click", async () => {
    try {
        const tx = await contract.becomeMember({ value: ethers.utils.parseEther("1") });
        await tx.wait();
        alert("Membership purchased!");
    } catch (error) {
        console.error(error);
        alert("Failed to purchase membership");
    }
});

document.getElementById("borrow-book").addEventListener("click", async () => {
    const bookId = prompt("Enter Book ID:");
    try {
        const tx = await contract.Borrowbook(bookId);
        await tx.wait();
        alert(`Book ID ${bookId} borrowed!`);
    } catch (error) {
        console.error(error);
        alert("Failed to borrow book");
    }
});

document.getElementById("return-book").addEventListener("click", async () => {
    const index = prompt("Enter Borrowed Book Index:");
    try {
        const tx = await contract.returnBook(index);
        await tx.wait();
        alert(`Book returned!`);
    } catch (error) {
        console.error(error);
        alert("Failed to return book");
    }
});

document.getElementById("withdraw-funds").addEventListener("click", async () => {
    try {
        const tx = await contract.withdrawfunds();
        await tx.wait();
        alert("Funds withdrawn!");
    } catch (error) {
        console.error(error);
        alert("Failed to withdraw funds");
    }
});


initialize();
