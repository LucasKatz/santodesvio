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
        return <div className="text-white text-center py-12">Cargando catálogo...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-10 px-4">
            {/* Contenedor al 80% de ancho con máximo 1200px para centrar la grilla de 4 columnas */}
            <div className="w-[80%] max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {beers?.map((beer) => (
                    <BeerCard key={beer._id} {...beer} />
                ))}
            </div>
        </div>
    );
};

export default BeerCatalogue;