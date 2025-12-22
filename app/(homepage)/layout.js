import Navbar from "@/components/shared/Dashboard/navbar";
import RoleGuard from "@/components/shared/RoleGuard";

export default function Layout({ children }) {
    return (
        <RoleGuard allowedRoles={["PESERTA"]}>
            <Navbar />
            {children}
        </RoleGuard>
    );
}