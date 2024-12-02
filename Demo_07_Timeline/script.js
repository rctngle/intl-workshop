
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
				// Parse and sort data
				const sortedData = results.data
					.filter(row => row.DateTime) // Ensure DateTime exists
					.sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime)); // Sort by DateTime


				console.log('Sorted data:', sortedData); // Log sorted data
				setData(sortedData); // Set sorted data to state
			},
			error: (err) => console.error('Error parsing CSV:', err),
		});

		
		
	}, []);

	const groupByMonth = (data) => {
		return data.reduce((acc, row) => {
			const date = new Date(row.DateTime);
			const monthKey = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(date);
			if (!acc[monthKey]) acc[monthKey] = [];
			acc[monthKey].push(row);
			return acc;
		}, {});
	};

	const groupedData = groupByMonth(data);

	return (
					
		<>
			{Object.entries(groupedData).length > 0 && (
				<div className="months">
					{Object.entries(groupedData).map(([month, rows], monthIndex) => (
						<div className="month" key={monthIndex}>
							<div className="month-label">
								<h2>{month}</h2>
								<div>({rows.length})</div>
							</div>
							<div className="month-images">
								{rows.map((row, rowIndex) => (
									<div className="entry" key={rowIndex}>
										<div className="entry-image">
											<img src={`../media/${row.Filename}`} alt={`Image ${rowIndex}`} />
										</div>
										{row.Note && <div className="note">{row.Note}</div>}
									</div>
								))}
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
