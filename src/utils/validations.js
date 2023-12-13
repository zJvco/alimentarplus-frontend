export const loginValidations = ( values ) => {
    const errors = {}

    const emailPattern = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i

    if (values.email === "") {
        errors.email = "Insira um e-mail"
    }
    else if (!emailPattern.test(values.email)) {
        errors.email = "E-mail inválido"
    }

    return errors
}

export const productValidations = ( values ) => {
    const errors = {}

    if (values.name === "") {
        errors.name = "Insira um nome"
    }

    if (values.brand === "") {
        errors.brand = "Insira uma marca"
    }

    if (values.unit_weight_grams === "") {
        errors.unit_weight_grams = "Insira o peso por unidade"
    }

    if (values.quantity_units === "") {
        errors.quantity_units = "Insira a quantidade de unidades"
    }

    if (values.total_weight_grams === "") {
        errors.total_weight_grams = "Insira o peso total"
    }

    if (values.expiration_date === "") {
        errors.expiration_date = "Insira a data de validade"
    }

    if (values.description === "") {
        errors.description = "Insira a descrição"
    }

    if (values.url_product_img === "") {
        errors.url_product_img = "Necessário a imagem do produto"
    }

    if (values.url_expiration_date_img === "") {
        errors.url_expiration_date_img = "Necessário a imagem da validade do produto"
    }

    return errors
}