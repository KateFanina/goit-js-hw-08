import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryHtmlText = galleryItems
  .map(
    ({ preview, original, description }) => ` 
       <a data-type="image" class="gallery__item" href=${original}>
          <img alt=${description} class="gallery__image" src=${preview} />
       </a>`
  )
  .join('');
gallery.insertAdjacentHTML('beforeend', galleryHtmlText);

gallery.addEventListener('click', openImage);

function openImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
