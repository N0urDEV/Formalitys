// Currency conversion utility
// 1 EUR = 10.5 MAD (approximate rate, should be updated regularly)
const MAD_TO_EUR_RATE = 10.5;

export const convertMadToEur = (madAmount: number): number => {
  return Math.round((madAmount / MAD_TO_EUR_RATE) * 100) / 100;
};

export const formatPrice = (madAmount: number): string => {
  const eurAmount = convertMadToEur(madAmount);
  return `${madAmount} MAD (${eurAmount}€)`;
};

export const formatPriceWithBreakdown = (basePrice: number, additionalFee?: number): string => {
  const total = basePrice + (additionalFee || 0);
  const eurTotal = convertMadToEur(total);
  const eurBase = convertMadToEur(basePrice);
  const eurFee = additionalFee ? convertMadToEur(additionalFee) : 0;
  
  if (additionalFee) {
    return `${basePrice} MAD (${eurBase}€) + ${additionalFee} MAD (${eurFee}€) = ${total} MAD (${eurTotal}€)`;
  }
  
  return `${total} MAD (${eurTotal}€)`;
};
