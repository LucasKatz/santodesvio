import './globals.css'; 

export const metadata = {
  title: 'Santo Desvío - Cerveza Artesanal Rebelde',
  description: 'Cambia tu ruta, toma el Santo Desvío.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-santo-dark text-santo-white">
        {children}
      </body>
    </html>
  );
}