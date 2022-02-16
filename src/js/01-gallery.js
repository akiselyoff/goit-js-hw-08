import SimpleLightbox from 'simplelightbox';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join('');
}

galleryEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);
galleryEl.addEventListener('click', onClickGalleryItem);

function onClickGalleryItem(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const imgSrc = event.target.dataset.source;

  showModal(imgSrc);
}
let instance;
function showModal(imgSrc) {
  instance = basicLightbox.create(
    `<img src="${imgSrc}" style="display:block; height: 100vh">`,
  );

  instance.show(() => {
    addEscListener();
  });
}

function onEscClick(event) {
  if (event.code === 'Escape') {
    instance.close(() => {
      removeEscListener();
    });
  }
}

function addEscListener() {
  window.addEventListener('keydown', onEscClick);
}

function removeEscListener() {
  window.removeEventListener('keydown', onEscClick);
}
