// mis-componentes/packaging/PackagingCard.js
import React from 'react';

const cardStyles = {
    card: {
        backgroundColor: '#1c1c1c',
        border: '1px solid #d4af37',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '250px',
        margin: '10px',
        color: '#fff',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        maxWidth: '80px',
        height: 'auto',
        marginBottom: '15px',
        objectFit: 'contain',
    },
    size: {
        color: '#d4af37',
        fontSize: '1.4em',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    type: {
        fontSize: '1.1em',
        marginBottom: '10px',
        color: '#ccc',
    },
    description: {
        fontSize: '0.9em',
        lineHeight: '1.3',
        marginBottom: '15px',
        flexGrow: 1,
    },
    price: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#d4af37',
        marginBottom: '15px',
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
        width: '100%',
    },
};

const PackagingCard = ({ size, type, description, imageUrl, price }) => {
    // Formateo de precio si viene como número desde MongoDB Atlas
    const formattedPrice = typeof price === 'number' 
        ? price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) 
        : price;

    return (
        <div style={cardStyles.card}>
            <img 
                src={imageUrl || '/placeholder-bottle.png'} 
                alt={`${size || ''} ${type || 'Envase'}`} 
                style={cardStyles.image} 
            />
            <div style={cardStyles.size}>{size}</div>
            <div style={cardStyles.type}>{type}</div>
            <p style={cardStyles.description}>{description}</p>
            <div style={cardStyles.price}>
                {formattedPrice ? `$ ${formattedPrice}` : 'Consultar precio'}
            </div>
            <button style={cardStyles.button}>Pedir ahora</button>
        </div>
    );
};

export default PackagingCard;