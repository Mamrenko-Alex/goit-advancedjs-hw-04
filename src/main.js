import { getImages } from "./js/paxabay-api";
import { message, PERPAGE } from "./js/settings";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import _ from 'lodash';

let gallery;
let page = 1;
let currentQuerry = '';
let isLoading = false;


const searchForm = document.querySelector('.search-form');

const elements = {
    body: document.body,
    searchField: searchForm.elements.searchQuery,
    safeSearchField: searchForm.elements.safesearch, 
    galerry: document.querySelector('.gallery')
}

function createGalerry(galerryItems) {
    const markup = galerryItems.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `
        <div class="photo-card">
            <a href="${largeImageURL}" class="gallery__link">
                <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span class="js-data">${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b><span class="js-data">${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b><span class="js-data">${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b><span class="js-data">${downloads}</span>
                </p>
            </div>
        </div>`
    })
    return markup.join('')
}


searchForm.addEventListener('submit', submitHandler)


async function submitHandler(event) {
    event.preventDefault()
    
    const queryParams = {
        querry: elements.searchField.value.trim().toLowerCase(),
        safesearch: elements.safeSearchField.checked,
        perPege: PERPAGE,
        page,
    }

    if (queryParams.querry === '') {
        message.info('The search field must not be empty');
        return
    } else if (queryParams.querry === currentQuerry) {
        message.info('Looks like you were just looking for this.')
        return
    }
    
    page = 1;
    currentQuerry = queryParams.querry

    console.log(queryParams);
    try {
        await getImages(queryParams)
        .then(data => {
            if (data.total === 0) {
                elements.galerry.innerHTML = '';
                message.info('Sorry, there are no images matching your search query. Please try again.');
                return
            }

            message.success(`Hooray! We found ${data.totalHits} images.`)
            elements.galerry.innerHTML = createGalerry(data.hits)

            gallery = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });
            gallery.refresh()
        })
        elements.searchField.value = ''
    } catch (error) {
        message.error(error)
    }
}

document.addEventListener(
    "scroll",
    _.throttle(handlerInfinityScrol, 500)
);

async function handlerInfinityScrol() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (documentHeight - (windowHeight + scrollPosition) <= 90) {
        isLoading = true;
        page += 1;

        const queryParams = {
            querry: currentQuerry,
            safesearch: elements.safeSearchField.checked,
            perPege: PERPAGE,
            page,
        }

        console.log(queryParams);
        try {
            await getImages(queryParams)
                .then(data => {
                    elements.galerry.innerHTML += createGalerry(data.hits)
                    gallery.refresh();
                    const totalPages = Math.ceil(data.totalHits / PERPAGE);

                    if (page >= totalPages) {
                        document.removeEventListener(
                            "scroll",
                            _.throttle(handlerInfinityScrol, 500)
                        );
                        message.info('Sorry, you have viewed all available images.')
                    }
                })
        } catch (error) {
            message.error('somthing is wrong')
        } finally {
            isLoading = false;
        }
    }
}