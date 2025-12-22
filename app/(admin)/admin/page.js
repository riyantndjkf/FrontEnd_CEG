import HomePageAdmin from '@/views/homepage/HomePageAdmin'
import React from 'react'
import RoleGuard from '@/components/shared/RoleGuard'

export const metadata = {
    title: "Admin",
    description: "Halaman Admin - Chemical Engineering Games",
};

export default function Admin() {
    return (
        <RoleGuard allowedRoles={["ADMIN"]}>
            <HomePageAdmin />
        </RoleGuard>
    )
}
