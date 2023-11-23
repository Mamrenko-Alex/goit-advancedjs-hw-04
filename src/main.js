import { getImages } from "./js/paxabay-api";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css'

const searchForm = document.querySelector('.search-form');
const searchField = searchForm.elements.searchQuery;

searchForm.addEventListener('submit', submitHandler)


function submitHandler(event) {
    event.preventDefault()

    getImages(searchField.value)
        .then(data => {
            const images = data.hits
                .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                    return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
                })
            console.log(images);
        }).catch(
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again.',
            }))

    searchField.value = ''
}
