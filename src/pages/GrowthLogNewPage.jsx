import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantsController from '../controllers/PlantsController'
import GrowthLogController from '../controllers/GrowthLogController'

export default function GrowthLogNewPage() {
    const [plants, setPlants] = useState([])
    const [plantID, setPlantID] = useState('')
    const [date, setDate] = useState('')
    const [height, setHeight] = useState('')
    const [note, setNote] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        PlantsController.getAllPlants()
            .then(setPlants)
            .catch(() => setError('Failed to load plants'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await GrowthLogController.createGrowthLog({
                plantID: Number(plantID),
                date,
                height: Number(height),
                note
            })
            navigate('/growthlogs')
        } catch {
            setError('Failed to create growth log')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center w-[80vw] max-w-xl mt-10">
                <h2 className="text-3xl font-bold text-green-700 mb-6">Add Growth Log</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Plant</label>
                        <select
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={plantID}
                            onChange={e => setPlantID(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select plant...</option>
                            {plants.map(plant => (
                                <option key={plant.id} value={plant.id}>
                                    {plant.name} ({plant.species})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Date</label>
                        <input
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            placeholder="e.g. 01.12.2025."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                            required
                            min="0"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-gray-700">Note</label>
                        <input
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition-colors font-semibold"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
