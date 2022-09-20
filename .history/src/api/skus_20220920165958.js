import axios from '~/axios'

export function getSkusList(page) {
    return axios.get(`/admin/skus/${page}`)
}

export function createSkus(data) {
    return axios.post("/admin/skus", data)
}

export function updateSkus(id, data) {
    return axios.post(`/admin/skus/${id}`, data)
}

export function deleteSkus(id) {
    return axios.post(`/admin/role/${id}/delete`)
}

export function updateSkusStatus(id, status) {
    return axios.post(`/admin/role/${id}/update_status`, { status })
}
