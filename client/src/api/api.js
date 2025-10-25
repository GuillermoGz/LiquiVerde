import axios from "axios";

const API = 'http://localhost:4000/api'

export const getProducts = (value) => {
    const params = {};
    if (isNaN(value)) {
        params.q = value;
    } else {
        params.barcode = value;
    }

    return axios.get(`${API}/products`, { params });
};

export const substitucionProduct = (id) => {
    const params = {};
    params.id = id;

    return axios.get(`${API}/substitution`, { params });
};

export const getOptimizeCart = (budget, productIds) => {
    const body = {
        "budget": budget,
        "productIds": productIds
    };

    return axios.post(`${API}/optimize`, body);
};