// mis-componentes/beer-catalogue/index.js
import React from 'react';
import BeerCard from './cards';

// Datos de ejemplo para las 6 cards
const beers = [
    {
        name: 'Golden Ale',
        style: 'Refrescante',
        ibu: 20,
        abv: 4.5,
        srm: 5,
        description: 'Dorada, suave y con un final limpio. Ideal para días calurosos.',
        imageUrl: '/Fuego.png',
    },
    {
        name: 'IPA San Antonio',
        style: 'Lupulada',
        ibu: 60,
        abv: 6.2,
        srm: 10,
        description: 'Intensa, con notas cítricas y resinosas del lúpulo.',
        imageUrl: '/Silencio.png',
    },
    {
        name: 'Honey Santo',
        style: 'Con Miel',
        ibu: 15,
        abv: 5.0,
        srm: 7,
        description: 'Con miel artesanal local. Dulce y balanceada.',
        imageUrl: '/Querubin.png',
    },
    {
        name: 'Stout Desvío',
        style: 'Negra Tostada',
        ibu: 35,
        abv: 5.8,
        srm: 40,
        description: 'Sabor intenso a café y chocolate negro.',
        imageUrl: '/Desvio666.png',
    },
    {
        name: 'Red Ale',
        style: 'Maltosa',
        ibu: 25,
        abv: 5.2,
        srm: 18,
        description: 'Equilibrio de malta caramelo y ligero amargor.',
        imageUrl: '/Fuego.png',
    },
    {
        name: 'NEIPA Rito',
        style: 'Hazy/Turbia',
        ibu: 40,
        abv: 6.8,
        srm: 6,
        description: 'Ultra frutal, cuerpo sedoso y bajo amargor.',
        imageUrl: '/Naranja.png',
    },
];

const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#000',
};

const BeerCatalogue = () => {
    return (
        <div style={containerStyles}>
            {beers.map((beer, index) => (
                <BeerCard key={index} {...beer} />
            ))}
        </div>
    );
};

export default BeerCatalogue;