import fetchit from "../lib/fetchit";
import { API_CMS } from "../config/api";

export function getDepartments({ placeId }) {
    if (!placeId) return
    const url = `${API_CMS}/${placeId}`
    return fetchit(url, null, 'GET')
}
