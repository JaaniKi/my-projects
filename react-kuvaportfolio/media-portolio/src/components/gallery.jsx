import React, { useState } from 'react';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-button')) {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <img 
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => openModal(image)}
            className="gallery-image"
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close-button">&times;</span>
          <img className="modal-content" src={selectedImage.src} alt={selectedImage.alt} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
