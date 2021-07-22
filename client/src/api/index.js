import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3003/api',
})

export const insertOrder = payload => api.post(`/order`, payload)
export const getAllGoods = () => api.get(`/items`)
export const getAllCategories = () => api.get(`/categories`)
export const getAllConfigs = () => api.get(`/configs`)

const apis = {
    insertOrder,
    getAllGoods,
    getAllCategories,
    getAllConfigs
}

export default apis