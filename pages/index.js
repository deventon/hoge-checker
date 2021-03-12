import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
	const [price, setPrice] = useState(0);
	const [value, setValue] = useState(500);
	useEffect(() => {
		fetch('/api/getCurrentPrice').then(async (response) => {
			const currentPrice = await response.text();
			const currentPriceAsInt = +currentPrice;
			setPrice(currentPrice);
			const currentValue = (currentPriceAsInt * 1081428.793).toPrecision(5);
			setValue(currentValue);
		});
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1>Aktueller Wert: {value}€</h1>
		</div>
	);
}
