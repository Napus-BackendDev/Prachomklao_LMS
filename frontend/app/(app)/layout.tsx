import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <main>
                <Navbar />
                {children}
            </main>
            <Footer />
        </div>
    )
}