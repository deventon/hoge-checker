// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const etherscanApiUrl =
  "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xfad45e47083e4607302aa43c65fb3106f1cd7607&address=0x7ea1a754f7659edAE464d6904833d12f5F7Dd226&tag=latest&apikey=CJVBRIJ7NFDTZ3E2GUWSD2FYWU5GWJGDTR";
const config = {
  url: etherscanApiUrl,
  method: "get",
};

export default async (req, res) => {
  const etherscanApiResponse = await axios(config);
  const currentWalletBalance = etherscanApiResponse.data.result;
  const currentWalletBalanceAsInt = +currentWalletBalance;
  const currentWalletBalanceCorrected = currentWalletBalanceAsInt / 1000000000;
  const earnedHoge = currentWalletBalanceCorrected - 1080587;
  return res.status(200).send(earnedHoge);
};
