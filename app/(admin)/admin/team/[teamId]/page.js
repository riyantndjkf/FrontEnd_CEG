import React from "react";
import RoleGuard from "@/components/shared/RoleGuard";
import TeamDetailView from "@/views/admin/team/TeamDetailView";

export const metadata = {
  title: "Detail Tim - Admin",
  description: "Halaman Detail Tim Admin - Chemical Engineering Games",
};

export default function TeamDetailPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <TeamDetailView />
    </RoleGuard>
  );
}
