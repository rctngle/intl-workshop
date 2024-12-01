
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
		<div>
			<h1>UnImages</h1>

			{data.length === 0 && (
				<p>Loading data...</p>
			)}
			
			{data.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Filename</th>
							<th>DateTime</th>
							<th>Latitude</th>
							<th>Longitude</th>
							<th>DominantColor</th>
							<th>AverageColor</th>
						</tr>
					</thead>
					<tbody>
						{data.map((row, rowIndex) => (
							<tr key={rowIndex}>
								<td>{row.Filename}</td>
								<td>{row.DateTime}</td>
								<td>{row.Latitude}</td>
								<td>{row.Longitude}</td>
								<td>{row.DominantColor}</td>
								<td>{row.AverageColor}</td>								
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

// Render the App component into the root div
ReactDOM.render(<App />, document.getElementById('root'));
