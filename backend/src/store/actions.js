import axiosClient from "../axios";

export function login({commit}, data) {
    console.log('axiosClientBefore: ' + data)
    return axiosClient.post('/login', data)
        .then(({data}) => {
            console.log('axiosClientThen: ' + data)
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
        })
}

export function logout({commit}) {
    return axiosClient.post('/logout')
        .then((response) => {
            commit('setToken', null)

            return response;
        })
}

