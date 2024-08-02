"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import TabelProduct from "../components/product/TabelProduct";
import PenerimaForm from "../components/form/PenerimaForm";
import { ShowToast } from "../lib/utils/successalert";
import Script from "next/script";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const { data: session, update } = useSession();
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [penerima, setPenerima] = useState({});
  const [carts, setCarts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [kurir, setKurir] = useState("jne");
  const [ongkir, setOngkir] = useState();
  const [disabledButtonOngkir, setDisabledButtonOngkir] = useState(false);
  const [selectedOngkir, setSelectedOngkir] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resProvinsi = await fetch(`/api/rajaongkir/provinsi`);
      const { data: provinsiData } = await resProvinsi.json();
      setProvinsi(provinsiData);

      if (session?.user) {
        setCarts(session?.user.carts || []);
        setPenerima({
          nama_penerima: session?.user.fullName || "",
          no_hp_penerima: session?.user.no_hp || "",
          alamat_lengkap: session?.user.alamat.alamat_lengkap || "",
          kota_id: session?.user.alamat.kota_id || "",
          provinsi_id: session?.user.alamat.province_id || "",
          kode_pos: session?.user.alamat.kode_pos || "",
        });

        if (session?.user.alamat.province_id) {
          const resKota = await fetch(
            `/api/rajaongkir/kota?id=${session?.user.alamat.province_id}`
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

  const validateInputOngkir = () => {
    let newErrors = {};
    if (!penerima.alamat_lengkap)
      newErrors.alamat_lengkap = "Alamat lengkap harus diisi";
    if (!penerima.provinsi_id) newErrors.provinsi_id = "Provinsi harus dipilih";
    if (!penerima.kota_id) newErrors.kota_id = "Kota harus dipilih";
    if (!penerima.kode_pos) newErrors.kode_pos = "Kode pos harus diisi";
    if (!kurir) newErrors.kurir = "kuris harus di pilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!kurir) newErrors.kurir = "kurir harus di pilih";
    if (!selectedOngkir)
      newErrors.selectedOngkir = "Pengiriman Paket harus dipilih";
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
    if (validateInputOngkir()) {
      setDisabledButtonOngkir(true);
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
        const { data } = await res.json();
        setOngkir(data);
        setDisabledButtonOngkir(false);
      } else {
        ShowToast("error", "gagal mendapatkan ongkir");
        setDisabledButtonOngkir(false);
      }
    }
    setDisabledButtonOngkir(false);
  };

  const getTransaction = async (order_id) => {
    const response = await fetch(`/api/midtrans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: order_id,
        gross_amount: totalHarga + selectedOngkir.cost[0].value,
        ...penerima,
        ongkir: selectedOngkir,
        item_details: carts,
        email: session?.user.email,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return; // or display an error message
    }
    const order_id = `EC-${v4()}`;

    try {
      const { token, redirectUrl } = await getTransaction(order_id);

      const res = await fetch(`/api/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: order_id,
          penerima: penerima,
          kurir: kurir,
          email: session?.user.email,
          ongkir: selectedOngkir.cost[0].value,
          total_harga: totalHarga,
          item_details: carts,
          total: totalHarga + selectedOngkir.cost[0].value,
          token: token,
          redirectUrl: redirectUrl,
        }),
      });
      if (res.ok) {
        await update({ carts: [] });

        const updateUser = await fetch(`/api/user/cart`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user.email,
            carts: [],
          }),
        });
        if (updateUser.ok) {
          window.snap.pay(token);
        }
      }
    } catch (e) {
      ShowToast("error", e.message);
    }
  };
  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-amBwa0Zs7RgOiSgp"
        strategy="lazyOnload"
      />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={handlePayment}>
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
                disabled={disabledButtonOngkir}
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                {disabledButtonOngkir ? "..loading" : "Cek Ongkir"}
              </button>
              <button
                type="submit"
                className="bg-yellow-500  ml-4 text-white px-4 py-2 rounded mt-4"
              >
                Bayar
              </button>
            </form>

            <TabelProduct
              carts={carts}
              errors={errors}
              totalBerat={totalBerat}
              totalHarga={totalHarga}
              ongkir={ongkir}
              selectedOngkir={selectedOngkir}
              setSelectedOngkir={setSelectedOngkir}
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
