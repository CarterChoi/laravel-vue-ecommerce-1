import axiosClient from "../axios";

export function login({commit}, data) {
    return axiosClient.post('login', data)
        .then(({data}) => {
            console.log('axiosClientThen: ' , data)
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
        })
        .catch((err) => {
            console.error('axiosClientCatch:', err);
            return Promise.reject(err);
        });
}

export function logout({commit}) {
    return axiosClient.post('/logout')
        .then((response) => {
            commit('setToken', null)

            return response;
        })
}

