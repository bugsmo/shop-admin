import axios from '~/axios'

export function getGoodsList(page, query = {}) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""
    return axios.get(`/admin/goods/${page}${r}`)
}

export function updateGoodsStatus(id, status) {
    return axios.post(`/admin/goods/${id}/changestatus`, { status })
}

export function createGoods(data) {
    return axios.post(`/admin/goods`, data)
}

export function updateGoods(id, data) {
    return axios.post(`/admin/goods/${id}`, data)
}

export function deleteGoods(id) {
    return axios.post(`/admin/goods/${id}/delete`)
}