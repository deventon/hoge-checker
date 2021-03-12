// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const cmcApiUrl =
	'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=8438&convert=eur';
const apiKey = '1653a0ef-4bfb-4170-b0c2-a26d89833300';
const config = {
	url: cmcApiUrl,
	method: 'get',
	headers: {
		'X-CMC_PRO_API_KEY': apiKey,
	},
};

export default async (req, res) => {
	const cmcApiResponse = await axios(config);
	const currentPrice = cmcApiResponse.data.data['8438'].quote.EUR.price;
	console.log(currentPrice);
	res.status(200).send(currentPrice);
};
