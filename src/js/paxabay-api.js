import axios from "axios";

axios.defaults.headers['key'] = '40858568-c2cbea82fefa532e5a07e25a9';
axios.defaults.headers['q'] = 'yellow+flowers';
axios.defaults.headers['image_type'] = 'photo';


export function getImages(params) {
    return axios.get('https://pixabay.com/api/')
        .then(resp => resp.json())
}
