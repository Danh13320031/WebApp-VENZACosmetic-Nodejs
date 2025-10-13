const barChart = document.getElementById('bar-chart');
const barChartName = document.getElementById('bar-chart-name').getAttribute('data-value');
const barCharData = document.getElementById('bar-chart-data').getAttribute('data-value');
const barCharLabels = document.getElementById('bar-chart-labels').getAttribute('data-value');
const barCharAxis = document.getElementById('bar-chart-axis').getAttribute('data-value');

// Color set
const colorsBg = ['#ff638581', '#36a3eb86', '#ffcf5681', '#4bc0c080', '#9966ff81', '#ffa04083'];
const colorBorder = ['#ff6385', '#36a3eb', '#ffcf56', '#4bc0c0', '#9966ff', '#ffa040'];

// Font set
Chart.defaults.font.family = 'Roboto';
Chart.defaults.color = '#2484bb';

new Chart(barChart, {
  type: 'bar',
  data: {
    labels: barCharLabels.split(','),
    datasets: [
      {
        label: barChartName,
        data: barCharData.split(','),
        backgroundColor: barCharLabels
          .split(',')
          .map((_, index) => colorsBg[index % colorsBg.length]),
        borderColor: barCharLabels
          .split(',')
          .map((_, index) => colorBorder[index % colorBorder.length]),
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: barCharAxis,
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 16 / 9,
  },
});
