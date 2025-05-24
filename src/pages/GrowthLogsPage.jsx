import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GrowthLogController from '../controllers/GrowthLogController'

export default function GrowthLogsPage() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        GrowthLogController.getAllGrowthLogs()
            .then(data => {
                setLogs(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load growth logs')
                setLoading(false)
            })
    }, [])

    const filteredLogs = logs.filter(
        log =>
            log.date.toLowerCase().includes(search.toLowerCase()) ||
            (log.note && log.note.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
            <div className="bg-white/80 rounded-xl shadow-lg p-10 flex flex-col items-center w-[80vw] max-w-full mt-10">
                <h2 className="text-4xl font-bold text-green-700 mb-8">All Growth Logs</h2>
                <input
                    type="text"
                    className="mb-6 px-4 py-2 border border-green-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Search growth logs by date or note..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {loading && <div className="text-gray-500">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <ul className="w-full">
                    {filteredLogs.length === 0 && (
                        <li className="text-gray-500">No growth logs.</li>
                    )}
                    {filteredLogs.map(log => (
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
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => navigate(`/plants/${log.plantID}`)}
                                    >
                                        View Plant
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
        </div>
    )
}
