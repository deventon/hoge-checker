import dataHelper from "../../utils/dataHelper";
import axios from "axios";

export default async (req, res) => {
  const currentHoge = await dataHelper.callEtherscanApi(); // get current wallet balance
  const currentPrice = await dataHelper.callCoinmarketcapApi(); // get current conversion ratio
  const lastUpdated = new Date().toString().substr(0, 24);

  // get last conversion ratio
  const currentConversionCall = await axios({
    url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentPrice",
    method: "get",
  });
  const lastPrice = currentConversionCall.data;
  const priceIncrease = currentPrice > lastPrice ? true : false;

  const etherscanConfig = {
    url: `https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentHoge`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: `${currentHoge}`,
  };

  const coinmarketcapConfig = {
    url: `https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentPrice`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: `${currentPrice}`,
  };

  const lastUpdatedConfig = {
    url: `https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/lastUpdated`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(lastUpdated),
  };

  const priceIncreaseConfig = {
    url: `https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/priceIncrease`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(priceIncrease),
  };

  try {
    await axios(etherscanConfig);
    await axios(coinmarketcapConfig);
    await axios(lastUpdatedConfig);
    await axios(priceIncreaseConfig);
  } catch (ex) {
    console.log(ex);
  }

  return res
    .status(200)
    .send([currentHoge, currentPrice, lastUpdated, priceIncrease]);
};
