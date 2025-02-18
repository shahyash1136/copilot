document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myChart').getContext('2d');
    let chartType = 'bar';
    let myChart = createChart(chartType);
    function createChart(type) {
        return new Chart(ctx, {
            type: type,
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Income',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Expenses',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function getMonthlyValues() {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const incomeValues = [];
        const expensesValues = [];

        months.forEach(month => {
            const income = document.getElementById(`income-${month}`).value;
            const expenses = document.getElementById(`expenses-${month}`).value;
            incomeValues.push(parseFloat(income) || 0);
            expensesValues.push(parseFloat(expenses) || 0);
        });

        return { incomeValues, expensesValues };
    }

    function updateChart() {
        const { incomeValues, expensesValues } = getMonthlyValues();
        myChart.data.datasets[0].data = incomeValues;
        myChart.data.datasets[1].data = expensesValues;
        myChart.update();
    }

    function changeChartType(type) {
        myChart.destroy();
        myChart = createChart(type);
        updateChart();
    }

    document.getElementById('bar-chart-btn').addEventListener('click', function () {
        changeChartType('bar');
    });

    document.getElementById('line-chart-btn').addEventListener('click', function () {
        changeChartType('line');
    });

    document.getElementById('radar-chart-btn').addEventListener('click', function () {
        changeChartType('radar');
    });


    document.getElementById('download-btn').addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = myChart.width;
        canvas.height = myChart.height;

        // Fill the canvas with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the chart on the white background
        ctx.drawImage(myChart.canvas, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'chart.jpg';
        link.click();
    });

    // Update chart when the tab is shown
    document.getElementById('chart-tab').addEventListener('shown.bs.tab', updateChart);

    // Optionally, update chart when input values change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateChart);
    });
});