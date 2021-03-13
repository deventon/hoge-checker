import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
} from "@chakra-ui/react";

export default function Home() {
  const [currentConversion, setCurrentConversion] = useState(0);
  const [value, setValue] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [earnedInEur, setEarnedInEur] = useState(0);
  const [profitInPercent, setProfitInPercent] = useState();
  const [profitWithFeesInPercent, setProfitWithFeesInPercent] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputProfit, setInputProfit] = useState(0);

  useEffect(async () => {
    await fetch("/api/getDataFromServerFile").then(async (response) => {
      const res = await JSON.parse(await response.text());
      const currentPrice = res.currentConversion;
      const earnedHoge = res.currentHoge;
      const earnedHogeAsInt = parseInt(earnedHoge);
      setCurrentBalance(earnedHogeAsInt);
      const earnedInEur = (earnedHogeAsInt * currentConversion).toPrecision(2);
      setEarnedInEur(earnedInEur);
      const currentPriceAsInt = +currentPrice;
      setCurrentConversion(currentPriceAsInt);
      const currentValue = (currentPriceAsInt * 1081428.793).toPrecision(5);
      setValue(currentValue);
      let buffer = currentValue / 425;
      buffer -= 1;
      const profitInPercent = buffer * 100;
      console.groupCollapsed(buffer);
      setProfitInPercent(profitInPercent.toPrecision(4));
      let buffer2 = currentValue / 352.7;
      buffer2 -= 1;
      const profitWithFeesInPercent = buffer2 * 100;
      setProfitWithFeesInPercent(profitWithFeesInPercent.toPrecision(4));
      debugger;
    });
  }, []);

  const handleChange = (e) => {
    const thisValue = e;
    setInputValue(thisValue);
    const sharehold = +thisValue / 425;
    const profit = (sharehold * value - thisValue).toFixed(2);
    setInputProfit(profit);
  };

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
      <br />
      <label>
        <FormLabel>Your Share:</FormLabel>
        <NumberInput min={0} onChange={handleChange}>
          <NumberInputField />
        </NumberInput>
      </label>
      <h4>Your Profit: € {inputProfit}</h4>
    </div>
  );
}
