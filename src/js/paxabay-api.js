import axios from "axios";
import { message, KEY } from "./settings";
export { getImages };
    

async function getImages({querry, safesearch, page, perPage}) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${querry}&image_type=photo&orientation=horizontal&safesearch=${safesearch}&page=${page}&per_page=${perPage}`)
        return response.data
    } catch (error) {
        message.error('No response from the server, try again later');
    }
}
