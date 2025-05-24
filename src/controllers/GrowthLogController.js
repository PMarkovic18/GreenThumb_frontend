const baseUrl = import.meta.env.VITE_API_BASE_URL

const GrowthLogController = {
    async deleteGrowthLog(id) {
        const res = await fetch(`${baseUrl}/api/growthlogs/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Failed to delete growth log')
        return true
    }
}

export default GrowthLogController
