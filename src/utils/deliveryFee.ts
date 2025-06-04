export const calculateDeliveryFee = (subtotal: number): number => {
  if (subtotal >= 10000) return 3000;

  const tiers = [
    { min: 1, max: 249, fee: 50 },
    { min: 250, max: 499, fee: 100 },
    { min: 500, max: 749, fee: 150 },
    { min: 750, max: 999, fee: 200 },
    { min: 1000, max: 1249, fee: 250 },
    { min: 1250, max: 1499, fee: 300 },
    { min: 1500, max: 1749, fee: 350 },
    { min: 1750, max: 1999, fee: 400 },
    { min: 2000, max: 2249, fee: 450 },
    { min: 2250, max: 2499, fee: 500 },
    { min: 2500, max: 2749, fee: 550 },
    { min: 2750, max: 2999, fee: 600 },
    { min: 3000, max: 3249, fee: 650 },
    { min: 3250, max: 3499, fee: 700 },
    { min: 3500, max: 3749, fee: 750 },
    { min: 3750, max: 3999, fee: 800 },
    { min: 4000, max: 4249, fee: 850 },
    { min: 4250, max: 4499, fee: 900 },
    { min: 4500, max: 4749, fee: 950 },
    { min: 4750, max: 4999, fee: 1000 },
    { min: 5000, max: 5249, fee: 1050 },
    { min: 5250, max: 5499, fee: 1100 },
    { min: 5500, max: 5749, fee: 1150 },
    { min: 5750, max: 5999, fee: 1200 },
    { min: 6000, max: 6249, fee: 1250 },
    { min: 6250, max: 6499, fee: 1300 },
    { min: 6500, max: 6749, fee: 1350 },
    { min: 6750, max: 6999, fee: 1400 },
    { min: 7000, max: 7249, fee: 1450 },
    { min: 7250, max: 7499, fee: 1500 },
    { min: 7500, max: 7749, fee: 1550 },
    { min: 7750, max: 7999, fee: 1600 },
    { min: 8000, max: 8249, fee: 1650 },
    { min: 8250, max: 8499, fee: 1700 },
    { min: 8500, max: 8749, fee: 1750 },
    { min: 8750, max: 8999, fee: 1800 },
    { min: 9000, max: 9249, fee: 1850 },
    { min: 9250, max: 9499, fee: 1900 },
    { min: 9500, max: 9749, fee: 1950 },
    { min: 9750, max: 9999, fee: 2000 }
  ];

  const tier = tiers.find(t => subtotal >= t.min && subtotal <= t.max);
  return tier ? tier.fee : 3000; // Default to 3000 if no tier matches (amount > 10000)
};