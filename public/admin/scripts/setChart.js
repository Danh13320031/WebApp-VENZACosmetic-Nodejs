const barChart = document.querySelectorAll('.bar-chart');
const pieChart = document.querySelectorAll('.pie-chart');

const colorsChartBg = [
  '#ff638581',
  '#36a3eb86',
  '#ffcf5681',
  '#4bc0c080',
  '#9966ff81',
  '#ffa04083',
];
const colorChartBorder = ['#ff6385', '#36a3eb', '#ffcf56', '#4bc0c0', '#9966ff', '#ffa040'];

Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'Roboto';
Chart.defaults.color = '#2484bb';

if (barChart && barChart.length > 0) {
  barChart.forEach((barChart) => {
    const barChartName = barChart.querySelector('.bar-chart-name').getAttribute('data-value');
    const barCharData = barChart.querySelector('.bar-chart-data').getAttribute('data-value');
    const barCharLabels = barChart.querySelector('.bar-chart-labels').getAttribute('data-value');
    const barCharAxis = barChart.querySelector('.bar-chart-axis').getAttribute('data-value');

    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: barCharLabels.split(','),
        datasets: [
          {
            label: '',
            data: barCharData.split(','),
            backgroundColor: barCharLabels
              .split(',')
              .map((_, index) => colorsChartBg[index % colorsChartBg.length]),
            borderColor: barCharLabels
              .split(',')
              .map((_, index) => colorChartBorder[index % colorChartBorder.length]),
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: barChartName,
          },
          legend: {
            display: true,
            position: 'bottom',
            padding: 10,
          },
          datasets: {
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad',
            },
          },
        },
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
  });
}

if (pieChart && pieChart.length > 0) {
  pieChart.forEach((pieChart) => {
    const pieChartName = pieChart.querySelector('.pie-chart-name').getAttribute('data-value');
    const pieCharData = pieChart.querySelector('.pie-chart-data').getAttribute('data-value');
    const pieCharLabels = pieChart.querySelector('.pie-chart-labels').getAttribute('data-value');

    new Chart(pieChart, {
      type: 'pie',
      data: {
        labels: pieCharLabels.split(','),
        datasets: [
          {
            label: pieChartName,
            data: pieCharData.split(','),
            backgroundColor: pieCharLabels
              .split(',')
              .map((_, index) => colorsChartBg[index % colorsChartBg.length]),
            borderColor: pieCharLabels
              .split(',')
              .map((_, index) => colorChartBorder[index % colorChartBorder.length]),
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: pieChartName,
          },
          legend: {
            display: true,
            position: 'bottom',
            padding: 10,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1 / 1,
      },
    });
  });
}
