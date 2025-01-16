const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Sản phẩm', 'Danh mục', 'Đơn hàng', 'Tài khoản', 'Nhóm quyền'],
    datasets: [
      {
        label: 'Biểu đồ thống kê',
        data: [18, 30, 40, 10, 4],
        borderWidth: 1,
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
        ],
        backgroundColor: [
          'rgb(54, 162, 235, 0.4)',
          'rgb(255, 99, 132, 0.4)',
          'rgb(75, 192, 192, 0.4)',
          'rgb(153, 102, 255, 0.4)',
        ],
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
  },
});
