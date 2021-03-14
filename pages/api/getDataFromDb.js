import dataHelper from "../dataHelper";

import axios from "axios";

export default async (req, res) => {
  const currentHogeCall = await axios({
    url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentHoge",
    method: "get",
  });
  const currentConversionCall = await axios({
    url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentPrice",
    method: "get",
  });

  console;

  return res.status(200).send({
    currentHoge: currentHogeCall.data,
    currentConversion: currentConversionCall.data,
  });
};
