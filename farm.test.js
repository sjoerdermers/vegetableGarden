const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

//1.////////////////////////////////////////////////

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factor: sun low", () => {
    const environmentFactorsSunLow = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environmentFactorsSunLow)).toBe(15);
  });

  test("Get yield for plant with environment factor: sun high", () => {
    const environmentFactorsSunLow = {
      sun: "low",
    };
    const environmentFactorsSunHigh = {
      sun: "high",
    };
    expect(
      getYieldForPlant(
        corn,
        environmentFactorsSunLow,
        environmentFactorsSunHigh
      )
    ).toBe(45);
  });
});

//2.////////////////////////////////////////////////

describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
  };
  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(input)).toBe(30);
  });

  test("Get yield for crop with environment factor: sun low", () => {
    const environmentFactorsSunLow = {
      sun: "low",
    };

    expect(getYieldForCrop(input, environmentFactorsSunLow)).toBe(15);
  });

  test("Get yield for crop with environment factor: sun high", () => {
    const environmentFactorsSunLow = {
      sun: "low",
    };
    const environmentFactorsSunHigh = {
      sun: "high",
    };

    expect(
      getYieldForCrop(
        input,
        environmentFactorsSunLow,
        environmentFactorsSunHigh
      )
    ).toBe(45);
  });
});

//3./////////////////////////////////////////////////

describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
  };
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
  };
  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
  ];

  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Get total yield with environment factor: wind Medium", () => {
    const environmentFactorsWindMedium = {
      wind: "medium",
    };

    expect(getTotalYield({ crops }, environmentFactorsWindMedium)).toBe(16.1);
  });

  test("Get total yield with environment factor: sun high", () => {
    const environmentFactorsWindMedium = {
      wind: "medium",
    };
    const environmentFactorsSunHigh = {
      sun: "high",
    };

    expect(
      getTotalYield(
        { crops },
        environmentFactorsWindMedium,
        environmentFactorsSunHigh
      )
    ).toBe(34.5);
  });
});

//4.////////////////////////////////////////////////

describe("getCostsForCrop", () => {
  test("Calculate cost for a crop", () => {
    const corn = {
      name: "corn",
      costs: 3,
    };

    const price = { price: 1 };

    expect(getCostsForCrop(corn, price)).toBe(3);
  });
});

//5.////////////////////////////////////////////////

describe("getRevenueForCrop", () => {
  const corn = {
    name: "corn",
    counts: 3,
  };

  test("Calculate Revenue for a crop ", () => {
    const revenue = [{ corn, price: 2 }];
    expect(getRevenueForCrop(revenue)).toBe(6);
  });

  test("Calculate Revenue for a crop with environment factor: wind High", () => {
    const environmentFactorsWindHigh = {
      wind: "medium",
    };
    const revenue = [{ corn, price: 2 }];
    expect(getRevenueForCrop(revenue, environmentFactorsWindHigh)).toBe(2.4);
  });
});

//6.////////////////////////////////////////////////

describe("getProfitForCrop", () => {
  const revenue = { price: 2 };

  const corn = {
    name: "corn",
    counts: 3,
    costs: 3,
  };

  test("Calculate Profit for a crop", () => {
    const costsAndRevenue = [corn, revenue];

    expect(getProfitForCrop(costsAndRevenue)).toBe(3);
  });

  test("Calculate Profit for a crop with environment factor: wind Medium and sun High", () => {
    const costsAndRevenue = [corn, revenue];

    const environmentFactorsWindMedium = {
      wind: "Medium",
      sun: "high",
    };

    expect(
      getProfitForCrop(costsAndRevenue, environmentFactorsWindMedium)
    ).toBe(4.2);
  });
});

//7.////////////////////////////////////////////////

getTotalProfit;

describe("getTotalProfit", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 3,
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 4,
  };

  test("Calculate total profit", () => {
    const revenue = { price: 2 };

    const profit = [corn, pumpkin, revenue];

    expect(getTotalProfit(profit)).toBe(7);
  });

  test("Calculate total profit with environment factor: sun Low and Rain high", () => {
    const revenue = { price: 2 };
    const profit = [corn, pumpkin, revenue];

    const environmentFactorsWindHighRainLow = {
      Rain: "high: -30%",
      sun: "Low",
    };

    expect(getTotalProfit(profit, environmentFactorsWindHighRainLow)).toBe(3.5);
  });
});
