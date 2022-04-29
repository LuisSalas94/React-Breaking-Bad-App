import React, { useState, useEffect } from "react";
import "./App.css";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const initialQuote = {
	text: "Text",
	author: "Author",
};

function App() {
	const [quote, setQuote] = useState(initialQuote);
	const [spinner, setSpinner] = useState(true);

	const callBReakingBadAPI = async () => {
		setSpinner(true);
		const url = "https://www.breakingbadapi.com/api/quote/random";
		const resp = await fetch(url);
		const [newQuote] = await resp.json();
		const { quote, author } = newQuote;
		setQuote({
			text: quote,
			author: author,
		});
		setSpinner(false);
	};

	useEffect(() => {
		callBReakingBadAPI();
	}, []);

	return (
		<div className="app">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
				alt="logo"
			/>
			<button onClick={() => callBReakingBadAPI()}>Get another quote</button>
			{spinner ? <Spinner /> : <Quote quote={quote} />}
		</div>
	);
}

export default App;
