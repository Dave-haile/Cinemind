import Footer from "./Footer"
import Navbar from "./Navbar"

const MainLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navbar />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </>
    )
}
export default MainLayout