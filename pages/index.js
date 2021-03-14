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

  const initialHoge = 1081429;

  const getProfitInPercent = (balance, investment) => {
    const profit = balance / investment - 1;
    return (profit * 100).toFixed(2);
  };

  useEffect(async () => {
    await fetch("/api/getDataFromDb").then(async (response) => {
      const res = JSON.parse(await response.text());
      const currentPrice = res.currentConversion;
      const currentHoge = res.currentHoge.toFixed(0);
      const earnedHoge = currentHoge - initialHoge;
      const earnedInEur = (earnedHoge * currentPrice).toFixed(2);
      const currentValue = (currentPrice * currentHoge).toFixed(2);
      setValue(currentValue);
      setCurrentBalance(earnedHoge);
      setEarnedInEur(earnedInEur);
      setCurrentConversion(currentPrice);
      setProfitInPercent(getProfitInPercent(currentValue, 425));
      setProfitWithFeesInPercent(getProfitInPercent(currentValue, 352.7));
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Current HOGE value: € {value}</h1>
      <h4>Earned HOGE through transactions: {currentBalance}</h4>
      <h4>Earned in EUR: € {earnedInEur}</h4>
      <h4>Profit from initial investment: {profitInPercent}%</h4>
      <h4>Profit after transaction fees: {profitWithFeesInPercent}%</h4>
      <br />
    </div>
  );
}
