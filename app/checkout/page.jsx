"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import TabelProduct from "../components/product/TabelProduct";
import PenerimaForm from "../components/form/PenerimaForm";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [penerima, setPenerima] = useState({});
  const [carts, setCarts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [kurir, setKurir] = useState("jne");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resProvinsi = await fetch(`/api/rajaongkir/provinsi`);
      const { data: provinsiData } = await resProvinsi.json();
      setProvinsi(provinsiData);

      if (session?.user) {
        setCarts(session.user.carts);
        setPenerima({
          nama_penerima: session.user.fullName || "",
          no_hp_penerima: session.user.no_hp || "",
          alamat_lengkap: session.user.alamat.alamat_lengkap || "",
          kota_id: session.user.alamat.kota_id || "",
          provinsi_id: session.user.alamat.province_id || "",
          kode_pos: session.user.alamat.kode_pos || "",
        });

        if (session.user.alamat.province_id) {
          const resKota = await fetch(
            `/api/rajaongkir/kota?provinsi=${session.user.alamat.province_id}`
          );
          const { data: kotaData } = await resKota.json();
          setKota(kotaData);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const handleProvinsiChange = async (e) => {
    const selectedProvinsi = e.target.value;
    setPenerima((prevState) => ({
      ...prevState,
      provinsi_id: selectedProvinsi,
      kota_id: "",
    }));

    const resKota = await fetch(`/api/rajaongkir/kota?id=${selectedProvinsi}`);
    const { data: kotaData } = await resKota.json();
    setKota(kotaData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPenerima((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateInput = () => {
    let newErrors = {};
    if (!penerima.nama_penerima)
      newErrors.nama_penerima = "Nama penerima harus diisi";
    if (!penerima.no_hp_penerima)
      newErrors.no_hp_penerima = "No HP penerima harus diisi";
    if (!penerima.alamat_lengkap)
      newErrors.alamat_lengkap = "Alamat lengkap harus diisi";
    if (!penerima.provinsi_id) newErrors.provinsi_id = "Provinsi harus dipilih";
    if (!penerima.kota_id) newErrors.kota_id = "Kota harus dipilih";
    if (!penerima.kode_pos) newErrors.kode_pos = "Kode pos harus diisi";
    if (!kurir) newErrors.kurir = "kuris harus di pilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalHarga =
    carts && carts.length > 0
      ? carts.reduce((total, cart) => total + cart.harga * cart.qty, 0)
      : 0;

  const totalBerat =
    carts && carts.length > 0
      ? carts.reduce((total, cart) => total + cart.berat * cart.qty, 0)
      : 0;

  const handleCekOngkir = async () => {
    if (validateInput()) {
      const res = await fetch(`/api/rajaongkir/ongkir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...penerima,
          kurir: kurir,
          berat: totalBerat,
        }),
      });

      if (res.status === 200) {
      }
    }
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form>
              <PenerimaForm
                penerima={penerima}
                errors={errors}
                handleInputChange={handleInputChange}
                handleProvinsiChange={handleProvinsiChange}
                provinsi={provinsi}
                kota={kota}
                kurir={kurir}
                setKurir={setKurir}
              />
              <button
                onClick={handleCekOngkir}
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Cek Ongkir
              </button>
            </form>

            <TabelProduct
              carts={carts}
              totalBerat={totalBerat}
              totalHarga={totalHarga}
            />
          </div>
        )}

        <style jsx>{`
          .loader {
            border-top-color: #3498db;
            animation: spin 1s infinite linear;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
