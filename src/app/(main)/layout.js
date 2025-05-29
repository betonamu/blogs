import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export const metadata = {
    title: "TShop",
    description: "Shop for all your needs",
};

export default async function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}
