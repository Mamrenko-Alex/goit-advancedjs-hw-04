import { getImages } from "./js/paxabay-api";

getImages()
    .then(data => console.log(data))