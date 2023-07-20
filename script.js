const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/a/";

function toggleLoader(show) {
  const loader = document.getElementById("loader");
  loader.style.display = show ? "block" : "none";
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

function isValidAmount(amount) {
  return parseFloat(amount) >= 0.01;
}

async function convertCurrency() {
  const currencySelect = document.getElementById("currency");
  const selectedCurrency = currencySelect.value;
  const amountInput = document.getElementById("amount");
  const amount = amountInput.value;
  if (!isValidAmount(amount)) {
    document.getElementById("result").innerText = "Błędna kwota. Wpisz liczbę większą lub równą 0.01.";
    return;
}
toggleLoader(true);
  try {
    const rate = await getCurrencyRate(selectedCurrency);
    const result = calculateResult(rate, amount);

    document.getElementById(
      "result"
    ).innerText = `${amount} ${selectedCurrency} = ${result} PLN`;
  } catch (error) {
    document.getElementById("result").innerText =
      "Błąd. Spróbuj ponownie później.";
  }

  toggleLoader(false);
}

document
  .getElementById("convertBtn")
  .addEventListener("click", convertCurrency);
