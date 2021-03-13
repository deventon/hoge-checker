import dataHelper from "../dataHelper";
import axios from "axios";

export default async (req, res) => {
  const currentHoge = await dataHelper.callEtherscanApi();
  const currentPrice = await dataHelper.callCoinmarketcapApi();

  const etherscanConfig = {
    url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      txn: [{ set: "currentBalance", value: currentHoge }],
    },
  };

  const coinmarketcapConfig = {
    url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      txn: [{ set: "currentPrice", value: currentPrice }],
    },
  };

  const etherscanResponse = await axios(etherscanConfig);
  const coinmarketcapResponse = await axios(coinmarketcapConfig);

  return res.status(200).send([currentHoge, currentPrice]);
};
