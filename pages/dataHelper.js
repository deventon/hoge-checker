// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const etherscanApiUrl =
  "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xfad45e47083e4607302aa43c65fb3106f1cd7607&address=0x7ea1a754f7659edAE464d6904833d12f5F7Dd226&tag=latest&apikey=CJVBRIJ7NFDTZ3E2GUWSD2FYWU5GWJGDTR";
const etherscanConfig = {
  url: etherscanApiUrl,
  method: "get",
};

const cmcApiUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=8438&convert=eur";
const apiKey = "1653a0ef-4bfb-4170-b0c2-a26d89833300";
const coinmarketcapConfig = {
  url: cmcApiUrl,
  method: "get",
  headers: {
    "X-CMC_PRO_API_KEY": apiKey,
  },
};

let currentHoge = 0;
let currentConversion = 0;

export default {
  callEtherscanApi: async () => {
    const etherscanApiResponse = await axios(etherscanConfig);
    const currentWalletBalance = etherscanApiResponse.data.result;
    const currentWalletBalanceAsInt = +currentWalletBalance;
    const currentWalletBalanceCorrected =
      currentWalletBalanceAsInt / 1000000000;
    // const earnedHoge = currentWalletBalanceCorrected - 1080587;
    currentHoge = currentWalletBalanceCorrected;
    return currentWalletBalanceCorrected;
  },
  callCoinmarketcapApi: async () => {
    const cmcApiResponse = await axios(coinmarketcapConfig);
    console.log(cmcApiResponse);
    const currentPrice = cmcApiResponse?.data?.data["8438"]?.quote?.EUR?.price;
    currentConversion = currentPrice;
    return currentPrice;
  },
  currentHoge,
  currentConversion,
};
