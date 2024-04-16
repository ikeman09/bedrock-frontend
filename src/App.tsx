import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [data, setData] = useState("");

	const handleClick = async () => {
		try {
			const response = await fetch("<your-function-url");

			const reader = response.body!.getReader();
			const decoder = new TextDecoder();

			reader.read().then(function processText({ done, value }) {
				if (done) {
					console.log("Stream completed");
					return;
				}
				const textChunk = decoder.decode(value, { stream: true });
				setData((prevData) => prevData + textChunk);
				return reader.read().then(processText);
			});
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={handleClick}>Call Lambda Function!</button>
				<p>{data}</p>
			</div>
		</>
	);
}

export default App;
