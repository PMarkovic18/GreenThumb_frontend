import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PlantsController from '../controllers/PlantsController'
import GrowthLogController from '../controllers/GrowthLogController'

export default function PlantPage() {
    const { plantId } = useParams()
    const navigate = useNavigate()
    const [plant, setPlant] = useState(null)
    const [growthLogs, setGrowthLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [deletingLogId, setDeletingLogId] = useState(null)

    useEffect(() => {
        PlantsController.getPlantWithGrowthLogs(plantId)
            .then(({ plant, growthLogs }) => {
                setPlant(plant)
                setGrowthLogs(growthLogs)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load plant')
                setLoading(false)
            })
    }, [plantId])

    const handleDeleteLog = async (logId) => {
        setDeletingLogId(logId)
        try {
            await GrowthLogController.deleteGrowthLog(logId)
            setGrowthLogs(logs => logs.filter(log => log.id !== logId))
        } catch (e) {
            setError('Failed to delete growth log')
        } finally {
            setDeletingLogId(null)
        }
    }

    // Filter growth logs by search
    const filteredGrowthLogs = growthLogs.filter(
        log =>
            log.date.toLowerCase().includes(search.toLowerCase()) ||
            (log.note && log.note.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="relative bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center w-[80vw] max-w-full mt-10">
                {/* Edit and Add Growth Log buttons in top right */}
                {plant && (
                    <div className="absolute top-6 right-6 flex gap-2">
                        <button
                            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
                            onClick={() => navigate(`/plants/${plant.id}/edit`)}
                        >
                            Edit
                        </button>
                        <button
                            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition-colors"
                            onClick={() => navigate(`/plants/${plant.id}/growthlogs/new`)}
                        >
                            Add Growth Log
                        </button>
                    </div>
                )}
                {loading && <div className="text-gray-500">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {plant && (
                    <>
                        <h2 className="text-4xl font-bold text-green-700 mb-4">{plant.name}</h2>
                        <div className="mb-8 text-lg text-gray-700">{plant.species}</div>
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Growth Logs</h3>
                        <div className="w-full bg-green-100/40 rounded-lg p-4 mb-2 shadow-inner">
                            <input
                                type="text"
                                className="mb-6 px-4 py-2 border border-green-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Search growth logs by date or note..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <ul className="w-full">
                                {filteredGrowthLogs.length === 0 && (
                                    <li className="text-gray-500">No growth logs.</li>
                                )}
                                {filteredGrowthLogs.map(log => (
                                    <li
                                        key={log.id}
                                        className="mb-4 p-4 rounded bg-green-50 shadow flex flex-col"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                                <span className="font-semibold text-green-800">{log.date}</span>
                                                <span className="text-gray-700 md:ml-6">Height: {log.height} cm</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors"
                                                    onClick={() => navigate(`/plants/${plant.id}/growthlogs/${log.id}/edit`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors"
                                                    onClick={() => handleDeleteLog(log.id)}
                                                    disabled={deletingLogId === log.id}
                                                >
                                                    {deletingLogId === log.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                        <span className="italic text-gray-600 mt-2 md:max-w-xs break-words">
                                            {log.note}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
