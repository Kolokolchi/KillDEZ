import AdminPanel from "../../../components/AdminPanel";
import "../../../css/rebrand.css";
import "../../../css/rebrand-admin.css";

export const metadata = {
  title: "KILL DEZ Admin — Панель заявок",
  robots: { index: false, follow: false },
  icons: { icon: "/images/brand/favicon.svg" },
};

export default function AdminPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/admin.css" />
      <AdminPanel />
    </>
  );
}
