import Plant from '../models/Plant'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const PlantsController = {
    async getAllPlants() {
        const res = await fetch(`${baseUrl}/api/plants`)
        if (!res.ok) throw new Error('Failed to fetch plants')
        const data = await res.json()
        // Optionally map to Plant model
        return data.map(p => new Plant(p))
    }
}

export default PlantsController
