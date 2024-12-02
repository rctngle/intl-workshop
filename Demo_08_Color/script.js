function App() {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		// Google Sheets CSV URL
		const csvURL = 'https://docs.google.com/spreadsheets/d/1KvAyUCLkbHkZ9d4zwUy4dmNJ1wlTq23TboRJNcLwwVc/gviz/tq?tqx=out:csv';

		// Fetch the CSV and parse it using PapaParse
		Papa.parse(csvURL, {
			download: true,
			header: true, // Treat the first row as headers
			complete: (results) => {
				// Parse and sort data
				const sortedData = results.data
					.filter(row => row.AverageColor) // Ensure AverageColor exists
					.sort((a, b) => calculateBrightness(a.AverageColor) - calculateBrightness(b.AverageColor)); // Sort by brightness

				console.log('Sorted data by color:', sortedData);
				setData(sortedData); // Set sorted data to state
			},
			error: (err) => console.error('Error parsing CSV:', err),
		});
	}, []);

	// Calculate the brightness of a hex color
	const calculateBrightness = (hex) => {
		// Remove the leading # if present
		const color = hex.startsWith('#') ? hex.slice(1) : hex;

		// Convert to R, G, B
		const r = parseInt(color.substring(0, 2), 16);
		const g = parseInt(color.substring(2, 4), 16);
		const b = parseInt(color.substring(4, 6), 16);

		// Calculate brightness using the formula
		return 0.299 * r + 0.587 * g + 0.114 * b;
	};


	return (
		<>
			<div className="introduction">
				<h1>Unimages</h1>
				<p>A collection of inconsequential images from my photo library from June 2021 – December 2024</p>
			</div>
			{data.length > 0 && (
				<div className="entries">
					{data.map((row, rowIndex) => {
						return (
							<div
								className="entry"
								key={rowIndex}
								style={{background: row.AverageColor}}							
							>
								<div className="entry-image">
									<img src={`../media/${row.Filename}`} alt={`Entry ${rowIndex}`} />
								</div>
								<div className="meta">
									<div className="meta-row">
										<h4>Taken</h4>
										<div>{row.DateTime}</div>
									</div>
									{row.Longitude && row.Latitude &&
										<div className="meta-row">
											<h4>Location</h4>
											<div>{parseFloat(row.Latitude).toFixed(3)}, {parseFloat(row.Longitude).toFixed(3)}</div>
										</div>
									}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

// Render the App component into the root div
ReactDOM.render(<App />, document.getElementById('root'));
