import Layout from '../../components/Layout'
import { useState } from 'react'

const sampleStocks = [
  { symbol: 'ETX', name: 'Ethiopia Telecom', volatility: 0.3 },
  { symbol: 'AGR', name: 'AgriFoods', volatility: 0.1 },
  { symbol: 'HEAL', name: 'HealTech', volatility: 0.5 },
  { symbol: 'BANK', name: 'Unity Bank', volatility: 0.2 }
]

export default function DemoEQ(){
  const [risk, setRisk] = useState('medium')
  const score = { low: 0.15, medium: 0.3, high: 0.5 }[risk]
  const suggestions = sampleStocks.filter(s => Math.abs(s.volatility - score) <= 0.2)

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4">EquiMatch — Mock matchmaker</h1>
        <p className="text-gray-600 mb-6">Choose your risk appetite and see quick suggestions.</p>
        <div className="space-y-4">
          <label className="block">Risk appetite</label>
          <select value={risk} onChange={e=>setRisk(e.target.value)} className="p-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="mt-4">
            <h3 className="font-semibold">Suggested matches</h3>
            <div className="mt-2 space-y-2">
              {suggestions.map(s=> (
                <div key={s.symbol} className="p-3 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.name} <span className="text-sm text-gray-500">({s.symbol})</span></div>
                    <div className="text-sm text-gray-500">Volatility: {s.volatility}</div>
                  </div>
                  <button className="btn btn-primary">Add to watchlist</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
