"use client"

import React, { useState, useEffect } from 'react';
import BeerCard from './cards';

const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#000',
    minHeight: '100vh'
};

const BeerCatalogue = () => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ahora la consulta es interna a tu propio servidor de Next.js
        fetch('/api/beers')
            .then((res) => res.json())
            .then((data) => {
                setBeers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al cargar las cervezas:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Cargando catálogo...</div>;
    }

    return (
        <div style={containerStyles}>
            {beers.map((beer) => (
                <BeerCard key={beer._id} {...beer} />
            ))}
        </div>
    );
};

export default BeerCatalogue;