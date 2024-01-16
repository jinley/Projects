import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '1d6f900e5723ded196e3a682f8de4457',
        language: 'ko-KR',
    },
});

export default instance;