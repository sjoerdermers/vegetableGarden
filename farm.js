//1.////////////////////////////////////////////////

const getYieldForPlant = (
  corn,
  environmentFactorsSunLow,
  environmentFactorsSunHigh
) => {
  if (!environmentFactorsSunLow) {
    return corn.yield;
  } else {
    if (!environmentFactorsSunHigh) {
      return corn.yield - (corn.yield / -100) * corn.factor.sun.low;
    } else {
      return corn.yield - (corn.yield / 100) * corn.factor.sun.low;
    }
  }
};

//2.////////////////////////////////////////////////

const getYieldForCrop = (
  input,
  environmentFactorsSunLow,
  environmentFactorsSunHigh
) => {
  if (!environmentFactorsSunLow) {
    return input.crop.yield * input.numCrops;
  } else {
    if (!environmentFactorsSunHigh) {
      return (input.crop.yield * input.numCrops) / 2;
    } else {
      return input.crop.yield * input.numCrops * 1.5;
    }
  }
};

//3./////////////////////////////////////////////////

const getTotalYield = (
  { crops },
  environmentFactorsWindMedium,
  environmentFactorsSunHigh
) => {
  if (!environmentFactorsWindMedium) {
    return (
      crops[0].crop.yield * crops[0].numCrops +
      crops[1].crop.yield * crops[1].numCrops
    );
  } else {
    if (!environmentFactorsSunHigh) {
      return (
        ((crops[0].crop.yield * crops[0].numCrops +
          crops[1].crop.yield * crops[1].numCrops) /
          100) *
        70
      );
    } else {
      return (
        (crops[0].crop.yield * crops[0].numCrops +
          crops[1].crop.yield * crops[1].numCrops) *
        1.5
      );
    }
  }
};

//4.////////////////////////////////////////////////

const getCostsForCrop = (corn, price) => {
  return corn.costs * price.price;
};

//5.////////////////////////////////////////////////

const getRevenueForCrop = (revenue, environmentFactorsWindHigh) => {
  if (!environmentFactorsWindHigh) {
    return revenue[0].corn.counts * revenue[0].price;
  } else {
    return ((revenue[0].corn.counts * revenue[0].price) / 100) * 40;
  }
};

//6.////////////////////////////////////////////////

const getProfitForCrop = (costsAndRevenue, environmentFactorsWindMedium) => {
  if (!environmentFactorsWindMedium) {
    return (
      costsAndRevenue[0].counts * costsAndRevenue[1].price -
      costsAndRevenue[0].costs
    );
  } else {
    return (
      ((costsAndRevenue[0].counts * costsAndRevenue[1].price -
        costsAndRevenue[0].costs) /
        100) *
      70 *
      2
    );
  }
};

//7.////////////////////////////////////////////////

const getTotalProfit = (profit, environmentFactorsWindHighRainLow) => {
  if (!environmentFactorsWindHighRainLow) {
    return (
      (profit[0].yield + profit[1].yield) * profit[2].price -
      (profit[0].costs + profit[1].costs)
    );
  } else {
    w = Math.round(
      (((profit[0].yield + profit[1].yield) * profit[2].price -
        (profit[0].costs + profit[1].costs)) /
        100) *
        50 *
        10
    );
    return w / 10;
  }
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
