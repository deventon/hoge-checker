import dataHelper from "../dataHelper";

export default async (req, res) => {
  return res.status(200).send({
    currentHoge: await axios({
      url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentBalance",
      method: "get",
    }),
    currentConversion: await axios({
      url: "https://kvdb.io/EnEjHiXtEB7h7rnKvWwmZE/currentBalance",
      method: "get",
    }),
  });
};
