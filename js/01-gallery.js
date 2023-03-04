import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryListEl = document.querySelector('.gallery');

const makeGalleryItemCard = ({ preview, original, description }) =>
  `<div class="gallery__item">
<a class="gallery__link" href="${original}">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</div>`;

const markup = galleryItems
  .map(element => makeGalleryItemCard(element))
  .join('');
galleryListEl.innerHTML = markup;

let activeModal = null;
const handleGalleryItemClick = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const originalSizeImage = event.target.dataset.source;
  const modal = basicLightbox.create(
    `<img src="${originalSizeImage}" width="1280">`
  );
  modal.show();
  activeModal = modal;

  const handleModalCLoseOnEsc = event => {
    if (event.code === 'Escape' && activeModal) {
      activeModal.close();
      activeModal = null;
      window.removeEventListener('keydown', handleModalCLoseOnEsc);
    }
  };

  window.addEventListener('keydown', handleModalCLoseOnEsc);
};

galleryListEl.addEventListener('click', handleGalleryItemClick);
