import axios from "axios";
export { getImages };
    
const KEY = '40858568-c2cbea82fefa532e5a07e25a9'

async function getImages(search) {
    const data = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(res => res.data)
    return data
}
