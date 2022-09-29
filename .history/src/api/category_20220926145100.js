import axios from '~/axios';

export function getCategoryList(){
    return axios.get("/admin/category")
}

export function createCategory(data) {
    return axios.post("/admin/rule", data)
}

export function updateCategory(id, data) {
    return axios.post(`/admin/rule/${id}`, data)
}

export function updateCategoryStatus(id, status) {
    return axios.post(`/admin/rule/${id}/update_status`, { status })
}

export function deleteCategory(id) {
    return axios.post(`/admin/rule/${id}/delete`)
}