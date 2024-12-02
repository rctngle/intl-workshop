
// Main App component
function App() {
	const [data, setData] = React.useState([]);
	const mapContainerRef = React.useRef(null);
	const mapRef = React.useRef(null);

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

		if (!mapContainerRef.current) return;
		// Initialize Mapbox map
		mapboxgl.accessToken = 'pk.eyJ1IjoiYW5lY2RvdGUxMDEiLCJhIjoiY2oxMGhjbmpsMDAyZzJ3a2V0ZTBsNThoMiJ9.1Ce55CnAaojzkqgfX70fAw';
		const map = new mapboxgl.Map({
			container: mapContainerRef.current, // Container ID
			style: 'mapbox://styles/anecdote101/cm45s7yoe009k01r1gtpt6xis', // Map style
			center: [-4.416205, 54.926362], // Initial center [lng, lat]
			zoom: 6.1, // Initial zoom
		});
		mapRef.current = map;
		// Clean up on component unmount		
		return () => map.remove();
		
	}, []);


	React.useEffect(() => {
		// Ensure the map is loaded and data is available before adding markers

		if (mapRef.current && data.length > 0) {
			const map = mapRef.current;

			data.forEach((row) => {

				if (row.Latitude && row.Longitude) {
					console.log(row.Latitude, row.Longitude)
					const imgElement = document.createElement('div')
					imgElement.innerHTML = `<img src="../media/${row.Filename}"/>`
					new mapboxgl.Marker({ element: imgElement })					
						.setLngLat([row.Longitude, row.Latitude])
						.addTo(map);
				}
			});
		}
	}, [data]);

	return (
		<>			
			<div className="list">
				{data.length > 0 && (					
					<>
						<h1>UnImages</h1>
						<p>A collection of inconsequential images from my photo library from June 2021 – December 2024</p>
						{data.map((row, rowIndex) => (
							<div className="image" key={rowIndex}>
								<div>Image {rowIndex}</div>			
								<div>{row.DateTime}</div>
							</div>
						))}
					</>

				)}
			</div>
			<div ref={mapContainerRef} className="map"></div>
		</>
	);
}

// Render the App component into the root div
ReactDOM.render(<App />, document.getElementById('root'));
