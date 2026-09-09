import './globals.css';
import Navbar from '@/components/UserInt/navbar';
import Footer from '@/components/UserInt/footer';
import { CartProvider } from '@/context/CartContext';
import WhatsAppButton from '@/components/UserInt/wppButton';
import { ToastContainer } from 'react-toastify';


export const metadata = {
  metadataBase: new URL("https://santodesvio.com.ar"),

  title: {
    default: "Santo Desvío | Cerveza artesanal argentina",
    template: "%s | Santo Desvío",
  },

  description:
    "Cervecería artesanal Santo Desvío. Elaboramos cerveza de autor en [CIUDAD], [PROVINCIA]. Conocé nuestros estilos, dónde comprarlos y cómo visitarnos.",

  applicationName: "Santo Desvío",
  authors: [{ name: "Santo Desvío" }],
  creator: "Santo Desvío",
  publisher: "Santo Desvío",
  category: "food and drink",

  keywords: [
    "cerveza artesanal",
    "Santo Desvío",
    "cervecería artesanal [CIUDAD]",
    "cerveza artesanal [PROVINCIA]",
    "IPA artesanal",
    "growler",
    "cerveza tirada",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://santodesvio.com.ar",
    siteName: "Santo Desvío",
    title: "Santo Desvío | Cerveza artesanal argentina",
    description:
      "Cervecería artesanal de autor en [CIUDAD]. Nuestros estilos, puntos de venta y contacto.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 px en /public
        width: 1200,
        height: 630,
        alt: "Santo Desvío — cerveza artesanal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Santo Desvío | Cerveza artesanal argentina",
    description: "Cervecería artesanal de autor en [CIUDAD].",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Descomentá cuando tengas el código de Search Console (paso 5)
  // verification: { google: "TU_CODIGO_DE_VERIFICACION" },
};

// En Next 15+ viewport y themeColor van en un export separado
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000", // el color de tu marca
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black text-santo-white flex flex-col min-h-screen">
        <CartProvider>
        <Navbar />
        <main className="flex-grow">
          {/* Contenedor que renderizará los toasts en pantalla */}
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
          {children}
        </main>
        <Footer />
        <WhatsAppButton/>
        </CartProvider>
      </body>
    </html>
  );
}