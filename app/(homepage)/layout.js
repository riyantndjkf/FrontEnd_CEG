import Navbar from "@/components/shared/Dashboard/navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}