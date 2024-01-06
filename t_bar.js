// Fetch the CSV file
fetch('2023_worldwide_box_office_data.csv')
  .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true, 
          dynamicTyping: true, 
          complete: function(papaResults) {
            // papaResults.data contains the parsed data as an array of objects
            const worldwideData = papaResults.data;

            // Create a stacked bar chart using Plotly
            const trace1 = {
              x: worldwideData.slice(0, 20).map(entry => entry.Rank),
              y: worldwideData.slice(0, 20).map(entry => entry.Foreign),
              type: 'bar',
              name: 'Foreign',
              marker: { color: '#7CA1D9' }                                          
            };

            const trace2 = {
              x: worldwideData.slice(0, 20).map(entry => entry.Rank),
              y: worldwideData.slice(0, 20).map(entry => entry.Domestic),
              type: 'bar',
              name: 'Domestic',
              marker: { color: '#D3E5F8' }   
            };

            const data = [trace1, trace2];

            // Set the layout
            const layout = {
            xaxis: {
              tickvals: worldwideData.slice(0, 20).map(entry => entry.Rank),
              ticktext: worldwideData.slice(0, 20).map(entry => `${entry.Rank}.${entry['Release Group']}`),
              dtick: 1,
              tickangle: 11,
            },
            yaxis: { title: 'Billion USD'},
            legend: { title: ''},
            title: '2023 Worldwide Box Office',
            hovermode: 'closest',
            template: 'plotly_white',
            barmode: 'stack', // Stacked bar chart
            width: 2500,
            height: 450,
          };
          
            // Render the chart
            Plotly.newPlot('myBar', data, layout);
          }
        });
      })
      .catch(error => console.error('Error fetching the CSV file:', error));