
const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;


const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));
//const allLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];


const ctxt = document.getElementById('myChart').getContext('2d');
const socket = io();
socket.on('newData', (data) => {console.log('Nouvelle donnée reçue:', data);
  allLabels.pop();
  allLabels.unshift(String.fromCharCode('L'.charCodeAt(0) + (allLabels[0].charCodeAt(0) - 'L'.charCodeAt(0) - 1) % 12));


  myChart.data.labels = allLabels;
  myChart.data.datasets[0].data.pop();
  myChart.data.datasets[0].data.unshift(data);

  myChart.update();
});
socket.emit('greatings');
socket.on('ping', () => console.log(`ping recu par ${socket.id}`) );
socket.emit('pong');




  

// l'objet Chart
const myChart = new Chart(ctxt, {
    type: 'bar',
    data: {
        labels: allLabels,
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  new Array(nbValues).fill(defaultValue),
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });

