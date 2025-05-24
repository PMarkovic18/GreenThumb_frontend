import { useEffect, useState } from 'react'
import PlantsController from '../controllers/PlantsController'

export default function PlantsPage() {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        PlantsController.getAllPlants()
            .then(data => {
                setPlants(data)
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to load plants')
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center max-w-xl w-full">
                <h2 className="text-3xl font-bold text-green-700 mb-6">Plants</h2>
                {loading && <div className="text-gray-500">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <ul className="w-full">
                    {plants.map(plant => (
                        <li key={plant.id} className="mb-4 p-4 rounded bg-green-50 shadow flex flex-col">
                            <span className="font-semibold text-lg">{plant.name}</span>
                            <span className="text-gray-600">{plant.species}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
