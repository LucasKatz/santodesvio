// mis-componentes/packaging/index.js
import React from 'react';
import PackagingCard from './packagingCard';

// Datos para los 3 Growlers/Botellas
const packagings = [
    {
        size: '1l',
        type: 'Botella de Litro',
        description: 'Ideal para probar o llevar una pinta a casa.',
        imageUrl: '/botella1.png',
        price: '5.00',
    },
    {
        size: '1 Litro',
        type: 'Growler de 2Lts',
        description: 'Tamaño medio, perfecto para recargar.',
        imageUrl: '/botella2.png',
        price: '12.00',
    },
    {
        size: '5 Litros',
        type: 'Botellon de 5lts',
        description: 'La opción clásica. Mantiene frescura por más tiempo.',
        imageUrl: '/botellon5.png',
        price: '19.00',
    },
];

// Datos para el Balde de 20L
const eventKeg = {
    size: '20 Litros',
    type: 'Balde para Eventos',
    description: 'Rinde ~40 pintas. Incluye canilla party pump.',
    imageUrl: '/barril20.png',
    price: '180.00',
};

const sectionStyles = {
    padding: '40px 20px',
    backgroundColor: '#0a0a0a',
};

const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'sans-serif',
};

const titleStyles = {
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '2.2em',
    marginBottom: '20px',
};

const PackagingCatalogue = () => {
    return (
        <section style={sectionStyles}>
            <div style={titleStyles}>Recargas & Growlers</div>
            <div style={containerStyles}>
                {packagings.map((pkg, index) => (
                    <PackagingCard key={index} {...pkg} />
                ))}
            </div>

            <div style={{ ...titleStyles, marginTop: '40px' }}>Para Eventos</div>
            <div style={containerStyles}>
                <PackagingCard {...eventKeg} />
            </div>
        </section>
    );
};

export default PackagingCatalogue;