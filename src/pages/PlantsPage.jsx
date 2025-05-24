import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantsController from '../controllers/PlantsController'

export default function PlantsPage() {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

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

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await PlantsController.deletePlant(id)
            setPlants(plants => plants.filter(p => p.id !== id))
        } catch (e) {
            setError('Failed to delete plant')
        } finally {
            setDeletingId(null)
        }
    }

    // Filter plants by search
    const filteredPlants = plants.filter(
        plant =>
            plant.name.toLowerCase().includes(search.toLowerCase()) ||
            plant.species.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="relative bg-white/80 rounded-xl shadow-lg border border-green-200 p-10 flex flex-col items-center w-[80vw] max-w-full mt-10">
                {/* Add New Plant button in top right */}
                <button
                    className="absolute top-6 right-6 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-all font-semibold shadow"
                    onClick={() => navigate('/plants/new')}
                >
                    Add New Plant
                </button>
                <h2 className="text-4xl font-extrabold text-green-700 mb-8 tracking-tight">Plants</h2>
                <input
                    type="text"
                    className="mb-6 px-4 py-2 border border-green-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80"
                    placeholder="Search plants by name or species..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {loading && <div className="text-gray-500">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <ul className="w-full">
                    {filteredPlants.map(plant => (
                        <li
                            key={plant.id}
                            className="mb-4 p-4 rounded bg-green-50 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between border border-green-100 hover:shadow-lg hover:bg-green-100/70 transition-all"
                        >
                            <div>
                                <span className="font-semibold text-lg text-green-800">{plant.name}</span>
                                <span className="block text-gray-600">{plant.species}</span>
                            </div>
                            <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
                                <button
                                    className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-all font-semibold"
                                    onClick={() => navigate(`/plants/${plant.id}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-all font-semibold"
                                    onClick={() => handleDelete(plant.id)}
                                    disabled={deletingId === plant.id}
                                >
                                    {deletingId === plant.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
