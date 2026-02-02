import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { userService } from "@/service/user.service";
import { CartProvider } from "@/context/CartContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  return (
    <CartProvider>
      <Navbar isLoggedIn={!!data} />
      <div className="min-h-[calc(100vh-232px)]">{children}</div>
      <Footer />
    </CartProvider>
  );
}
