import CartPageClient from "@/components/cart/cartPageClients";

export const metadata = {
  title: "Tu carrito",
  description: "Revisá tu carrito de compras de Santo Desvío antes de finalizar tu pedido.",
  alternates: { canonical: "/cart" },

  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}