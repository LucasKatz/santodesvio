"use client"

import React, { useState, useEffect } from 'react';
import BeerCard from '@/components/catalogue/cards';

const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centrado horizontal de los elementos
    alignContent: 'center',    // Centrado vertical estable para multilínea (Flex-wrap)
    padding: '20px',
    backgroundColor: '#000',
    minHeight: '100vh',
    width: '80%',              // Ancho de la grilla
    maxWidth: '1200px',        // Límite máximo para evitar estiramientos extremos
    margin: '0 auto',          // Centra el bloque en la pantalla
    boxSizing: 'border-box'
};

const BeerCatalogue = () => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/beers')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBeers(data);
                } else {
                    console.error('La API no devolvió un array:', data);
                    setBeers([]);
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
            {beers?.map((beer) => (
                <BeerCard key={beer._id} {...beer} />
            ))}
        </div>
    );
};

export default BeerCatalogue;