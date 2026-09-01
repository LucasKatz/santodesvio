"use client"

import React, { useState, useEffect } from 'react';
import BeerCard from '@/components/catalogue/cards';

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
        fetch('/api/beers')
            .then((res) => res.json())
            .then((data) => {
                // Validamos que los datos recibidos sean realmente un array
                if (Array.isArray(data)) {
                    setBeers(data);
                } else {
                    console.error('La API no devolvió un array:', data);
                    setBeers([]); // Evita que se rompa el componente asignando array vacío
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error al cargar las cervezas:', err);
                setBeers([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Cargando catálogo...</div>;
    }

    return (
        <div style={containerStyles}>
            {/* El operador opcional ?. garantiza que sólo mapée si es un array válido */}
            {beers?.map((beer) => (
                <BeerCard key={beer._id} {...beer} />
            ))}
        </div>
    );
};

export default BeerCatalogue;