
// Main App component
function App() {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {

		// Google Sheets CSV URL
		const csvURL = 'https://docs.google.com/spreadsheets/d/1KvAyUCLkbHkZ9d4zwUy4dmNJ1wlTq23TboRJNcLwwVc/gviz/tq?tqx=out:csv'

		// Fetch the CSV and parse it using PapaParse
		Papa.parse(csvURL, {
			download: true,
			header: true, // Treat the first row as headers
			complete: (results) => {
				console.log('Parsed data:', results.data); // Log parsed data
				setData(results.data); // Set parsed data to state
			},
			error: (err) => console.error('Error parsing CSV:', err),
		});
		
	}, []);

	return (
		<>
			<div className="sidebar">
				<h1>UnImages</h1>
				<p>A collection of inconsequential images from my photo library from June 2021 – December 2024</p>

				{data.length === 0 && (
					<p>Loading data...</p>
				)}
			</div>
			
			{data.length > 0 && (
				
				<div className="tabletop">
					{data.map((row, rowIndex) => (
						<div className={`image ${row.Orientation}`} style={{left: Math.random() * 80 + 10 + '%', top: Math.random() * 60 + 20 + '%'}} key={rowIndex}>
							<img src={`../media/${row.Filename}`}/>
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
								<div className="meta-row">
									<h4>Colors</h4>
									<div className="swatches">
										<div style={{background: row.AverageColor}}></div>
										<div style={{background: row.DominantColor}}></div>
									</div>									
								</div>

							</div>
											
						</div>
					))}
				</div>
			)}
		</>
	);
}

// Render the App component into the root div
ReactDOM.render(<App />, document.getElementById('root'));
