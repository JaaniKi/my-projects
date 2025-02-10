import React, { useState, useEffect } from 'react';
import imagesData from './data/images';
import Gallery from './components/gallery';
import './App.css';

const categories = [
  { label: 'Kaikki kuvat', value: 'all' },
  { label: 'Maisemat', value: 'maisema' },
  { label: 'Puolustusvoimat', value: 'puolustusvoimat' },
  { label: 'Henkilökuvat', value: 'henkilökuvat' },
  { label: 'Muut', value: 'muut' },
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(imagesData);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(imagesData);
    } else {
      setFilteredImages(imagesData.filter((img) => img.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="app-container">
      <header>
        <h1>Media Portfolio</h1>
      </header>

      <nav className="filter-tabs">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={activeCategory === category.value ? 'active' : ''}
          >
            {category.label}
          </button>
        ))}
      </nav>

      {/* Käytetään Gallery-komponenttia kuvien näyttämiseen */}
      <Gallery images={filteredImages} />
    </div>
  );
};

export default App;
