import ProductCard from "./productCard";

const products = [
  {
    id: 1,
    name: 'El Querubín',
    style: 'American Pale Ale',
    abv: '5.4%',
    price: '$3.500',
    tagline: 'Una APA rebelde con toques cítricos y refrescante final.',
    imageUrl: '/Querubin.png'
  },
  {
    id: 2,
    name: 'Fuego Santo',
    style: 'Oatmeal Stout',
    abv: '6.8%',
    price: '$3.800',
    tagline: 'Cuerpo denso, sabor ahumado, alma de fuego.',
    imageUrl: '/Fuego.png'
  },
  {
    id: 3,
    name: 'Silencio',
    style: 'India Pale Ale',
    abv: '7.1%',
    price: '$4.000',
    tagline: 'Amargor intenso. Un desvío totalmente necesario.',
    imageUrl: '/Silencio.png'  },
  {
    id: 4,
    name: 'Desvío 666',
    style: 'Double IPA',
    abv: '8.5%',
    price: '$4.500',
    tagline: 'Doble lúpulo, máxima potencia punk.',
    imageUrl: '/Desvio666.png'
  },
    {
    id: 5,
    name: 'Naranja',
    style: 'Falopa Barata',
    abv: '8.5%',
    price: '$4.500',
    tagline: 'Doble lúpulo, máxima potencia punk.',
    imageUrl: '/Naranja.png'
  },
    {
    id: 6,
    name: 'Infierno',
    style: 'Alguna Roja Supongo',
    abv: '8.5%',
    price: '$4.500',
    tagline: 'Doble lúpulo, máxima potencia punk.',
    imageUrl: '/Infierno.png'
  },
];

export default function ProductGrid() {
  return (
    <section id="cervezas" className="py-20 px-6 bg-santo-dark">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h3 className="font-santo-display text-5xl md:text-6xl text-santo-ochre">
            Nuestras Cervezas
          </h3>
          <p className="text-xl text-santo-white/70 max-w-xl mx-auto mt-4 font-santo-alt">
            Fabricadas sin concesiones para los amantes de la buena birra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}