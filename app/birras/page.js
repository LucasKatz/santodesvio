// Tu archivo page.js (app/birra/page.js)
import React from 'react';
import BeerCatalogue from '@/components/catalogue';
import PackagingCatalogue from '@/components/packaging';

export default function BirraPage() {
    return (
        <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
            <header style={{ textAlign: 'center', padding: '40px 0' }}>
                <h1 style={{ fontSize: '3em', color: '#d4af37', margin: 0 }}>SANTO DESVÍO</h1>
                <p style={{ fontSize: '1.2em' }}>NUESTRAS BIRRAS</p>
            </header>

            {/* Catálogo de 6 cervezas */}
            <BeerCatalogue />

            {/* Catálogo de envases y balde */}
            <PackagingCatalogue />

            <footer style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid #222' }}>
                <p>&copy; 2024 Santo Desvío - Artisan Craft Beer</p>
            </footer>
        </main>
    );
}