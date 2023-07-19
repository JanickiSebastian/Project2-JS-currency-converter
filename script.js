const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/a/";

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

async function getCurrencyRate(currency) {
    const response = await fetch(`${apiUrl}${currency}`);
    const data = await response.json();
    return data.rates[0].mid;
}

function calculateResult(rate, amount) {
    const result = rate * amount;
    return result.toFixed(2);
}

async function convertCurrency() {
    const currencySelect = document.getElementById("currency");
    const selectedCurrency = currencySelect.value;
    const amountInput = document.getElementById("amount");
    const amount = amountInput.value;

    showLoader();

    try {
        const rate = await getCurrencyRate(selectedCurrency);
        const result = calculateResult(rate, amount);

        document.getElementById("result").innerText = `${amount} ${selectedCurrency} = ${result} PLN`;
    } catch (error) {
        document.getElementById("result").innerText = "Błąd. Spróbuj ponownie później.";
    }

    hideLoader();
}

document.getElementById("convertBtn").addEventListener("click", convertCurrency);