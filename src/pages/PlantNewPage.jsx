import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlantsController from '../controllers/PlantsController'

export default function PlantNewPage() {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await PlantsController.createPlant({ name, species })
            navigate('/plants')
        } catch {
            setError('Failed to create plant')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center w-[80vw] max-w-xl mt-10">
                <h2 className="text-3xl font-bold text-green-700 mb-6">Add New Plant</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-gray-700">Species</label>
                        <input
                            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={species}
                            onChange={e => setSpecies(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors font-semibold"
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
