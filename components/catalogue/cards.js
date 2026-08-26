// mis-componentes/beer-catalogue/BeerCard.js
import React from 'react';

// Estilos en línea para mantener el ejemplo autocontenido
const cardStyles = {
    card: {
        backgroundColor: '#1c1c1c',
        border: '1px solid #d4af37',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '300px',
        margin: '10px',
        color: '#fff',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        maxWidth: '100px',
        height: 'auto',
        marginBottom: '15px',
    },
    name: {
        color: '#d4af37',
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    style: {
        fontSize: '1em',
        marginBottom: '10px',
        color: '#ccc',
    },
    stats: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        margin: '10px 0',
        fontSize: '0.9em',
        borderTop: '1px solid #444',
        borderBottom: '1px solid #444',
        padding: '10px 0',
    },
    description: {
        fontSize: '0.95em',
        lineHeight: '1.4',
        marginBottom: '15px',
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#d4af37',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

const BeerCard = ({ name, style, ibu, abv, srm, description, imageUrl }) => {
    return (
        <div style={cardStyles.card}>
            <img src={imageUrl} alt={name} style={cardStyles.image} />
            <div style={cardStyles.name}>{name}</div>
            <div style={cardStyles.style}>{style}</div>
            <div style={cardStyles.stats}>
                <span>IBU: {ibu}</span>
                <span>ABV: {abv}%</span>
                <span>SRM: {srm}</span>
            </div>
            <p style={cardStyles.description}>{description}</p>
            <button style={cardStyles.button}>Pedir ahora</button>
        </div>
    );
};

export default BeerCard;