const data = [
	{
		Filename: 'IMG_0138.jpeg',
		DateTime: '2023-03-28 17:31:04',
		Latitude: 55.82827778,
		Longitude: 4.254888889,
		DominantColor: '#5E7867',
		AverageColor: '#607968',
	},
	{
		Filename: 'IMG_0332.jpeg',
		DateTime: '2023-04-18 17:32:46',
		Latitude: 55.82826944,
		Longitude: 4.254888889,
		DominantColor: '#85615D',
		AverageColor: '#85605B',
	},
	{
		Filename: 'IMG_0336.jpeg',
		DateTime: '2023-04-20 08:22:52',
		Latitude: 55.82849167,
		Longitude: 4.254938889,
		DominantColor: '#868A8D',
		AverageColor: '#868A8D',
	},
	{
		Filename: 'IMG_0385.jpeg',
		DateTime: '2024-01-11 10:24:36',
		Latitude: 52.08200556,
		Longitude: 4.301816667,
		DominantColor: '#7D7565',
		AverageColor: '#7E7666',
	},
]

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