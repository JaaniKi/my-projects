import React, { useState, useEffect } from 'react';

const Gallery = ({ images }) => {
  // Tallennamme auki olevan kuvan indeksin
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Avaa modaalin valitsemalla kuvan indeksi
  const openModal = (index) => {
    setSelectedIndex(index);
  };

  // Sulkee modaalin, jos klikataan modaalin taustaa tai sulkupainiketta
  const closeModal = (e) => {
    if (
      e.target.classList.contains('modal') ||
      e.target.classList.contains('close-button')
    ) {
      setSelectedIndex(null);
    }
  };

  // Lisätään näppäimistönavigointi modaalin ollessa auki
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') {
          // Siirrytään seuraavaan kuvaan (silmukoi takaisin alkuun, jos ollaan lopussa)
          setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (e.key === 'ArrowLeft') {
          // Siirrytään edelliseen kuvaan (silmukoi loppuun, jos ollaan alussa)
          setSelectedIndex((prevIndex) =>
            (prevIndex - 1 + images.length) % images.length
          );
        } else if (e.key === 'Escape') {
          // Suljetaan modaalin
          setSelectedIndex(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Poistetaan tapahtumakuuntelija, kun komponentti unmountataan tai selectedIndex muuttuu
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, images.length]);

  return (
    <div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            loading="lazy" // Huom! Lisätty myös lazy loading
            onClick={() => openModal(index)}
            className="gallery-image"
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <span className="close-button">&times;</span>
          <img
            className="modal-content"
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
