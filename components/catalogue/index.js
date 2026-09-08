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
        return <div className="text-white text-center py-12">Cargando catálogo...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-10 px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto">
                {beers.map((beer) => (
                    <BeerCard key={beer._id} {...beer} />
                ))}
            </div>
        </div>
    );
};

export default BeerCatalogue;