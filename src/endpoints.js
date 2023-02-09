import axios from "axios"
import { encodeUsername } from "./utils"

const apiRoot = "https://powerful-island-75819.herokuapp.com"

const urls = {
    login: () => `${apiRoot}/auth/token/login/`,
    register: () => `${apiRoot}/auth/users/`,
    logout: () => `${apiRoot}/auth/token/logout/`,
    getCards: () => `${apiRoot}/ecard/`,
    getCard: (pk) => `${apiRoot}/ecard/${pk}/`,
    getComments: (pk) => `${apiRoot}/comments/${pk}/`,
    createCard: () => `${apiRoot}/ecard/`,
    createStyle: () => `${apiRoot}/styles/`,
}

const auth = token => ({
    headers: {
        Authorization: `Token ${token}`,
    }
})

const login = async (body) => {
    body.username = encodeUsername(body.username.trim())
    return axios.post(urls.login(), body)
}

const register = async (body) => {
    body.username = encodeUsername(body.username.trim())
    return axios.post(urls.register(), body)
}

const logout = async (token) => {
    return axios.post(urls.logout(), '', auth(token))
}

const getCards = async () => {
    const data = await axios.get(urls.getCards()).then(res => res.data)
    return data.results
}

const getCard = async (pk) => {
    return await axios.get(urls.getCard(pk)).then(res => res.data)
}

const createCard = async (token, card) => {
    if (!card.style) {
        card.style = 1
    } else if (typeof card.style === 'object') {
        card.style = (await createStyle(card.style)).pk
    }
    const data = await axios.post(urls.createCard(), card, auth(token))
        .then(res => res.data)
    return data
}

const createStyle = async (token, style) => {
    const data = await axios.post(urls.createStyle(), style, auth(token))
        .then(res => res.data)
    return data
}

export {
    login,
    register,
    logout,
    getCards,
    getCard,
    createCard,
    createStyle,
    urls,
}
