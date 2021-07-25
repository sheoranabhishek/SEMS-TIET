(function ($) {
    "use strict"; // Chart
  
    if ($('#report-line-chart').length) {
      var ctx = $('#report-line-chart')[0].getContext('2d');
      var myChart = new chart_js__WEBPACK_IMPORTED_MODULE_1___default.a(ctx, {
        type: 'line',
        data: {
          labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: '# of Votes',
            data: [0, 200, 200, 200, 200, 200, 200, 1050, 950, 1100, 900, 1200],
            borderWidth: 2,
            borderColor: '#3160D8',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }, {
            label: '# of Votes',
            data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
            borderWidth: 2,
            borderDash: [2, 2],
            borderColor: '#BCBABA',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: '12',
                fontColor: '#777777'
              },
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                fontSize: '12',
                fontColor: '#777777',
                callback: function callback(value, index, values) {
                  return value + 'V';
                }
              },
              gridLines: {
                color: '#D8D8D8',
                zeroLineColor: '#D8D8D8',
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false
              }
            }]
          }
        }
      });
    }
  
    if ($('#report-pie-chart').length) {
      var _ctx = $('#report-pie-chart')[0].getContext('2d');
  
      var myPieChart = new chart_js__WEBPACK_IMPORTED_MODULE_1___default.a(_ctx, {
        type: 'pie',
        data: {
          labels: ["Yellow", "Dark"],
          datasets: [{
            data: [15, 10, 65],
            backgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            borderWidth: 5,
            borderColor: "#fff"
          }]
        },
        options: {
          legend: {
            display: false
          }
        }
      });
    }
  
    if ($('#report-donut-chart').length) {
      var _ctx2 = $('#report-donut-chart')[0].getContext('2d');
  
      var myDoughnutChart = new chart_js__WEBPACK_IMPORTED_MODULE_1___default.a(_ctx2, {
        type: 'doughnut',
        data: {
          labels: ["Yellow", "Dark"],
          datasets: [{
            data: [15, 10, 65],
            backgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            borderWidth: 5,
            borderColor: "#fff"
          }]
        },
        options: {
          legend: {
            display: false
          },
          cutoutPercentage: 80
        }
      });
    }

  })($);