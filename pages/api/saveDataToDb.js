import dataHelper from "../../utils/dataHelper";
import axios from "axios";

export default async (req, res) => {
  const currentHoge = await dataHelper.callEtherscanApi();
  const currentPrice = await dataHelper.callCoinmarketcapApi();
  const lastUpdated = new Date().toString().substr(0, 24);

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

  try {
    await axios(etherscanConfig);
    await axios(coinmarketcapConfig);
    await axios(lastUpdatedConfig);
  } catch (ex) {
    console.log(ex);
  }

  return res.status(200).send([currentHoge, currentPrice, lastUpdated]);
};
