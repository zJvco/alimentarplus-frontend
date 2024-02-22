import api from "./config"

export const getAllOngDonations = async (ongId, token) => {
    const response = await api.get(`ongs/${ongId}/donations`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return response.data
}

export const getAllSupermarkets = async (token) => {
    const response = await api.get("/supermarkets", {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const getProductById = async (productId, token) => {
    const response = await api.get(`/products/${productId}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const getSupermarketById = async (marketId, token) => {
    const response = await api.get(`/supermarkets/${marketId}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const getDonationsLast30Days = async (marketId, token) => {
    const response = await api.get(`supermarkets/${marketId}/dashboard/donations-last-30-days`, {
      headers: {
          "Authorization": "Bearer " + token
      }
    })

    return response.data
  }

export const getMarketProducts = async (marketId, token) => {
    const response = await api.get(`supermarkets/${marketId}/products`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return response.data
}

export const getMarketDonations = async (marketId, token) => {
    const response = await api.get(`supermarkets/${marketId}/donations`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return response.data
}

export const getAllPlans = async (token) => {
    const response = await api.get(`/plans/`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const updateMarketPlan = async (marketId, planId, token) => {
    const data = {
        "id": planId
    }

    const response = await api.post(`/supermarkets/${marketId}/update-plan`, JSON.stringify(data), {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const getMarketProductById = async (marketId, productId, token) => {
    const response = await api.get(`/supermarkets/${marketId}/products/${productId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return response.data
}

export const deleteMarketProductById = async (marketId, productId, token) => {
    const response = await api.delete(`/supermarkets/${marketId}/products/${productId}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    return response.data
}

export const updateMarketProductById = async (marketId, productId, data, token) => {
    const response = await api.put(`/supermarkets/${marketId}/products/${productId}`, JSON.stringify(data), {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return response.data
}