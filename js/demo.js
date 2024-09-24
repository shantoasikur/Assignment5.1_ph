document.addEventListener('DOMContentLoaded', function () {
    let totalCoins = parseInt(document.getElementById('tcoin').textContent);

    // All donate now buttons
    const donateButtons = document.querySelectorAll('.donateNow');

    donateButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cause = this.getAttribute('data-cause');
            const inputField = document.getElementById(`${cause}-input`);
            const donationAmount = parseInt(inputField.value);
            const causeCoinElement = document.getElementById(`${cause}-coin`);

            if (!donationAmount || donationAmount <= 0 || donationAmount > totalCoins) {
                alert('Invalid donation amount');
                return;
            }

            // Update total coins
            totalCoins -= donationAmount;
            document.getElementById('tcoin').textContent = totalCoins;

            // Update the cause-specific coin
            const currentCauseCoins = parseInt(causeCoinElement.textContent);
            causeCoinElement.textContent = currentCauseCoins + donationAmount;

            // Add to transaction history
            addToHistory(cause, donationAmount);

            // Clear input field
            inputField.value = '';
        });
    });

    function addToHistory(cause, amount) {
        const historyList = document.getElementById('history-list');
        const newTransaction = document.createElement('li');
        const causeName = cause.charAt(0).toUpperCase() + cause.slice(1); // Capitalize cause name
        newTransaction.textContent = `Donated ${amount} BDT to ${causeName}`;
        historyList.appendChild(newTransaction);
    }
});
