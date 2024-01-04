// Fetch the CSV file
fetch('2023_worldwide_box_office_data.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data using PapaParse
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function (papaResults) {
        // papaResults.data contains the parsed data as an array of objects
        const worldwideData = papaResults.data;

        // Select the top 20 entries
        const top20Data = worldwideData.slice(0, 20);

        // Create a bubble chart using Plotly
        const trace = {
          x: top20Data.map(entry => entry.Rank),
          y: top20Data.map(entry => entry.Domestic),
          mode: 'markers',
          marker: {
            size: top20Data.map(entry => entry.Domestic*0.000000001),
            sizemode: 'diameter',
            sizeref: 0.01, // Adjust this value to control the size of the bubbles
            color: top20Data.map(entry => entry.Rank),
            colorscale: 'Blues',
            cmin: 0, // Adjust this based on your data
            cmax: 20, // Adjust this based on your data
            colorbar: {
              title: 'Rank'
            }
          },
          text: top20Data.map(entry => entry['Release Group']),
        };

        const layout = {
          title: 'Top 20 US Box Office Movies',
          xaxis: { title: 'Rank' },
          yaxis: { title: 'Domestic Box Office' },
          plot_bgcolor: 'white', // Set plot background color to white
          paper_bgcolor: 'white' 
        };

        // Render the bubble chart
        Plotly.newPlot('myBubble_us', [trace], layout);
      }
    });
  })
  .catch(error => console.error('Error fetching the CSV file:', error));
