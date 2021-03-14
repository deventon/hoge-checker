import dataHelper from "../dataHelper";
import axios from "axios";

export default async (req, res) => {
  const currentHoge = await dataHelper.callEtherscanApi();
  const currentPrice = await dataHelper.callCoinmarketcapApi();

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

  try {
    const etherscanResponse = await axios(etherscanConfig);
    const coinmarketcapResponse = await axios(coinmarketcapConfig);
  } catch (ex) {
    console.log(ex);
  }

  return res.status(200).send([currentHoge, currentPrice]);
};
