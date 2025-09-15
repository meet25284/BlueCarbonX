import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Portfolio({ transactions }) {
  const totalCredits = transactions.reduce((sum, transaction) => sum + transaction.quantity, 0)

  const consumptionByMonth = {}
  transactions.forEach(transaction => {
    const date = new Date(transaction.date)
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
    consumptionByMonth[monthYear] = (consumptionByMonth[monthYear] || 0) + transaction.quantity
  })

  const sortedMonths = Object.keys(consumptionByMonth).sort()
  const consumptionChartData = {
    labels: sortedMonths.map(monthYear => {
      const [year, month] = monthYear.split('-')
      return new Date(year, parseInt(month) - 1).toLocaleString('default', { month: 'short', year: '2-digit' })
    }),
    datasets: [
      {
        label: 'Credits Consumed',
        data: sortedMonths.map(monthYear => consumptionByMonth[monthYear]),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Credits' }, beginAtZero: true },
    },
  }

  return (
    <div className="mc-page" style={{paddingTop:'32px', paddingBottom:'32px'}}>
      <div className="mc-container">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-custom-blue mb-6">My Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="mc-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Credits Held</h2>
            <p className="text-5xl font-extrabold text-custom-blue">{totalCredits}</p>
          </div>

          <div className="mc-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Credit Consumption Over Time</h2>
            {transactions.length > 0 ? (
              <Line data={consumptionChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-600">Make some purchases to see your consumption graph!</p>
            )}
          </div>
        </div>

        <div className="mc-card">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
          {transactions.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Item</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{transaction.itemName}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{transaction.quantity}</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{transaction.price} MATIC</td>
                    <td className="py-2 px-4 border-b text-sm text-gray-700">{(transaction.totalPrice || 0).toFixed(2)} MATIC</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No transactions yet. Start purchasing credits to see your history!</p>
          )}
        </div>
      </div>
    </div>
  )
}
