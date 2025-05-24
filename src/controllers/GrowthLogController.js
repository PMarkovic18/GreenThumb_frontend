import GrowthLog from '../models/GrowthLog'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const GrowthLogController = {
    async deleteGrowthLog(id) {
        const res = await fetch(`${baseUrl}/api/growthlogs/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete growth log')
        return true
    },
    async createGrowthLog({ plantID, date, height, note }) {
        const res = await fetch(`${baseUrl}/api/growthlogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plantID, date, height, note })
        })
        if (!res.ok) throw new Error('Failed to create growth log')
        return true
    },
    async updateGrowthLog(id, { plantID, date, height, note }) {
        const res = await fetch(`${baseUrl}/api/growthlogs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plantID, date, height, note })
        })
        if (!res.ok) throw new Error('Failed to update growth log')
        return true
    },
    async getAllGrowthLogs() {
        const res = await fetch(`${baseUrl}/api/growthlogs`)
        if (!res.ok) throw new Error('Failed to fetch growth logs')
        const data = await res.json()
        return data.map(log => new GrowthLog(log))
    }
}

export default GrowthLogController
