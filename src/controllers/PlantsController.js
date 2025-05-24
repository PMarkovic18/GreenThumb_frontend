import Plant from '../models/Plant'
import GrowthLog from '../models/GrowthLog'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const PlantsController = {
    async getAllPlants() {
        const res = await fetch(`${baseUrl}/api/plants`)
        if (!res.ok) throw new Error('Failed to fetch plants')
        const data = await res.json()
        return data.map(p => new Plant(p))
    },
    async deletePlant(id) {
        const res = await fetch(`${baseUrl}/api/plants/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete plant')
        return true
    },
    async getPlantWithGrowthLogs(id) {
        const res = await fetch(`${baseUrl}/api/plants/${id}`)
        if (!res.ok) throw new Error('Failed to fetch plant')
        const data = await res.json()
        return {
            plant: new Plant(data.plant),
            growthLogs: data.growthLogs.map(log => new GrowthLog(log))
        }
    },
    async updatePlant(id, { name, species }) {
        const res = await fetch(`${baseUrl}/api/plants/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, species })
        })
        if (!res.ok) throw new Error('Failed to update plant')
        return true
    },
    async createPlant({ name, species }) {
        const res = await fetch(`${baseUrl}/api/plants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, species })
        })
        if (!res.ok) throw new Error('Failed to create plant')
        return true
    }
}

export default PlantsController
