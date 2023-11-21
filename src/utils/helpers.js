export const setLocalStorageData = (data) => {
    localStorage.setItem('KM2sk45sA', JSON.stringify(data))
}

export const updateLocalStorageData = (newData) => {
    const data = JSON.parse(localStorage.getItem('KM2sk45sA'))

    localStorage.setItem('KM2sk45sA', JSON.stringify({...data, ...newData}))
} 

export const getLocalStorageData = () => {
    return JSON.parse(localStorage.getItem('KM2sk45sA'))
}

export const getFormatedRegisterDataJSONResponse = (type) => {
    const data = getLocalStorageData()

    if (type === "supermarket") {
        return JSON.stringify({
            "user": { ...data["userData"] },
            "supermarket": { ...data["informationData"], "address": { ...data["addressData"] }, "plan": { ...data["planData"] } }
        })
    }
    else if (type === "ong") {
        return JSON.stringify({
            "user": { ...data["userData"] },
            "supermarket": { ...data["informationData"], "address": { ...data["addressData"] } }
        })
    }
}

export const filterAvailableValuesByList = (availableValues, data) => {
    return data.map(object => {
        const newObject = {}

        availableValues.forEach(key => {
            if (object[key] !== undefined) {
                newObject[key] = object[key]
            }
        })

        return newObject
    })
}