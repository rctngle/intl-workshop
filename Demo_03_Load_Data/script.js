function loadData() {
	
	// Google Sheets CSV URL
	const csvURL = 'https://docs.google.com/spreadsheets/d/1KvAyUCLkbHkZ9d4zwUy4dmNJ1wlTq23TboRJNcLwwVc/gviz/tq?tqx=out:csv'
	
	// Fetch the CSV and parse it using PapaParse
	Papa.parse(csvURL, {
		download: true,
		header: true, // Treat the first row as headers
		complete: (results) => {
			console.log('Parsed data:', results.data) // Log parsed data
			displayData(results.data)
			
		},
		error: (err) => console.error('Error parsing CSV:', err),
	})
}

function displayData(data) {

	data.forEach(entry => {

		const rowHTML = `
			<td>${entry.Filename}</td>
			<td>${entry.DateTime}</td>
			<td>${entry.Latitude}</td>
			<td>${entry.Longitude}</td>
			<td>${entry.DominantColor}</td>
			<td>${entry.AverageColor}</td>
		`

		const tr = document.createElement('tr')
		tr.innerHTML = rowHTML

		document.querySelector('tbody').appendChild(tr)
	})
}

// Call the load data function
loadData()