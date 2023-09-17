export const currencyPattern = "[0-9.,]{0,}";
const locale = "en-US";
const formatting_options = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 1,
}

export function removeCurrencyFormat(price) {
  const priceFormmated = price.replaceAll('$', '').replaceAll(',', '');
  return priceFormmated;

}

export function setCurrencyFormat(price) {
  let finalPrice = "0";
  let delta = "";

  if (price !== "" && !isNaN(Number(price))) {
    const floatPrice = Number(price);
    const formattedPrice = floatPrice
      .toLocaleString(locale, formatting_options)
      .replace('$', '');

    if (price.includes(".") && formattedPrice.includes(".0")) {
      delta = ".";
    }

    finalPrice = formattedPrice.replace('.0', '') + delta;
  }

  return finalPrice;
}