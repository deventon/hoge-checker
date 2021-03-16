import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentConversion, setCurrentConversion] = useState(0);
  const [value, setValue] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [earnedInEur, setEarnedInEur] = useState(0);
  const [profitInPercent, setProfitInPercent] = useState();
  const [profitWithFeesInPercent, setProfitWithFeesInPercent] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [priceIncrease, setPriceIncrease] = useState(true);

  const initialHoge = 2323770;

  const getProfitInPercent = (balance, investment) => {
    const profit = balance / investment - 1;
    return (profit * 100).toFixed(2);
  };

  const getDataFromDb = async () => {
    console.log("tick!");
    await fetch("/api/getDataFromDb").then(async (response) => {
      const res = JSON.parse(await response.text());
      const currentPrice = res.currentConversion;
      const currentHoge = res.currentHoge.toFixed(0);
      const earnedHoge = currentHoge - initialHoge;
      const earnedInEur = (earnedHoge * currentPrice).toFixed(2);
      const currentValue = (currentPrice * currentHoge).toFixed(2);
      setPriceIncrease(res.priceIncrease);
      setLastUpdated(res.lastUpdated);
      setValue(currentValue);
      setCurrentBalance(earnedHoge);
      setEarnedInEur(earnedInEur);
      setCurrentConversion(currentPrice);
      setProfitInPercent(getProfitInPercent(currentValue, 425));
      setProfitWithFeesInPercent(getProfitInPercent(currentValue, 352.7));
    });
  };

  useEffect(() => {
    getDataFromDb();
    const refreshTimer = setInterval(() => {
      getDataFromDb();
    }, 30000);

    return () => clearInterval(refreshTimer);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={{ color: priceIncrease ? "green" : "red" }}>€ {value}</h1>
      <h3 style={{ color: priceIncrease ? "green" : "red", marginTop: "-25px" }}>€ {currentConversion.toFixed(7)}</h3>
      <h4>
        HOGE from transactions: {currentBalance} (€ {earnedInEur})
      </h4>
      {/* <h4>
        Profit: {profitInPercent}% ({profitWithFeesInPercent}% with fees)
      </h4> */}
      <br />
      <p>Last updated: {lastUpdated}</p>
    </div>
  );
}
