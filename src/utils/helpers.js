import format from "date-fns/format"
import parseISO from "date-fns/parseISO"

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

export const getFormatedRegisterDataJSONResponse = (data, type) => {
    if (type === "supermarket") {
        return JSON.stringify({
            "user": { ...data["userData"] },
            "supermarket": { ...data["informationData"], "address": { ...data["addressData"] }, "plan": { ...data["planData"] } }
        })
    }
    else if (type === "ong") {
        return JSON.stringify({
            "user": { ...data["userData"] },
            "ong": { ...data["informationData"], "address": { ...data["addressData"] } }
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

export const changeFirstLetterToUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const convertDateType = (dateString) => {
    return format(parseISO(dateString), "dd/MM/yyyy")
}

export const convertDatetimeType = (datetimeString) => {
    return format(parseISO(datetimeString), "dd/MM/yyyy 'às' HH:mm:ss")
}

export const formatDecimalNumber = (number, step) => {
    return Number(number.toFixed(step)).toLocaleString('pt-BR')
}