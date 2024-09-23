// Initial setup for coins
let totalCoins = 5500; // Coins in the nav bar
document.getElementById("tcoin").innerText = totalCoins;

// Transaction history array
let history = [];

// Function to handle donation logic
function handleDonation(event) {
    const parentCard = event.target.closest('div');
    const inputField = parentCard.querySelector('input[type="number"]');
    const donationAmount = parseInt(inputField.value);

    if (!donationAmount || donationAmount <= 0 || donationAmount > totalCoins) {
        alert("Please enter a valid donation amount within your available coins.");
        return;
    }

    // Update the coins in the nav bar
    totalCoins -= donationAmount;
    document.getElementById("tcoin").innerText = totalCoins;

    // Update the donation amount on the card
    const cardCoinElement = parentCard.querySelector('button h3 span');
    const currentCardCoins = parseInt(cardCoinElement.innerText);
    cardCoinElement.innerText = currentCardCoins + donationAmount;

    // Add transaction to history
    const causeTitle = parentCard.querySelector('h3').innerText;
    history.push({
        cause: causeTitle,
        amount: donationAmount
    });

    // Clear the input field
    inputField.value = "";
}

// Attach event listeners to all "Donate Now" buttons
const donateButtons = document.querySelectorAll(".donateNow");
donateButtons.forEach(button => {
    button.addEventListener('click', handleDonation);
});

// Function to display transaction history
function showHistory() {
    let historyMessage = "Transaction History:\n";
    history.forEach((item, index) => {
        historyMessage += `${index + 1}. ${item.cause}: ${item.amount} BDT\n`;
    });

    if (history.length === 0) {
        historyMessage = "No transactions yet.";
    }

    alert(historyMessage);
}

// Attach event listener to "History" button
const historyButton = document.querySelector('button:contains("History")');
historyButton.addEventListener('click', showHistory);

// Redirect to a new blog page
document.querySelector('button:contains("Blog")').addEventListener('click', () => {
    window.location.href = 'blog.html'; // Redirect to blog.html
});