import FooterAdmin from "../components/layouts/FooterAdmin";
import NavbarAdmin from "../components/layouts/navbarAdmin";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <NavbarAdmin />
        <div className="bg-white grid-flow-col w-full">
          <main className="p-4">{children}</main>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
}
