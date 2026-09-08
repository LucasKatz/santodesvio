"use client"

import React, { useState, useEffect } from 'react';
import BeerCard from './cards';

const BeerCatalogue = () => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        /* Agregado px-6 en móvil, px-12 en tablet y px-20 en pantallas grandes para mayor aire lateral */
        <div className="bg-black min-h-screen py-10 px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-[1280px] mx-auto">
                {beers.map((beer) => (
                    <BeerCard key={beer._id} {...beer} />
                ))}
            </div>
        </div>
    );
};

export default BeerCatalogue;