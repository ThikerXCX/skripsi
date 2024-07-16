"use client";
import { useState, useEffect } from "react";
import { getDataKategori } from "../services/kategori";
import { getDataProduk } from "../services/products";
import { getDataBrand } from "../services/brand";
import ProductCart from "../components/card/ProductCart";

export default function ProductPage() {
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [brand, setBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  useEffect(() => {
    async function fetchData() {
      const kategoriData = await getDataKategori(`/api/kategori`);
      const produkData = await getDataProduk(`/api/product`);
      const brandData = await getDataBrand(`/api/brand`);
      setKategori(kategoriData.data);
      setProducts(produkData.data);
      setBrand(brandData.data);
      setFilteredProduk(produkData.data);
    }

    fetchData();
  }, []);

  const handleKategoriChange = (kategoriName) => {
    setSelectedKategori((prevSelected) => {
      if (prevSelected.includes(kategoriName)) {
        return prevSelected.filter((name) => name !== kategoriName);
      } else {
        return [...prevSelected, kategoriName];
      }
    });
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrand((prevSelected) => {
      if (prevSelected.includes(brandName)) {
        return prevSelected.filter((name) => name !== brandName);
      } else {
        return [...prevSelected, brandName];
      }
    });
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min: Number(min), max: Number(max) });
  };

  useEffect(() => {
    filterProdukByKategoriAndBrandAndPrice(
      selectedKategori,
      selectedBrand,
      priceRange
    );
  }, [selectedKategori, selectedBrand, priceRange]);

  const filterProdukByKategoriAndBrandAndPrice = (
    kategoriNames,
    brandNames,
    priceRange
  ) => {
    const filteredProduk = products.filter((produk) => {
      const matchKategori =
        kategoriNames.length === 0 || kategoriNames.includes(produk.kategori);
      const matchBrand =
        brandNames.length === 0 || brandNames.includes(produk.brand);
      const matchPrice =
        parseFloat(produk.harga) >= priceRange.min &&
        parseFloat(produk.harga) <= priceRange.max;

      return matchKategori && matchBrand && matchPrice;
    });

    setFilteredProduk(filteredProduk);
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl text-center font-bold text-gray-900 sm:text-3xl">
            Koleksi Produk
          </h2>
        </header>

        <div className="mt-8 block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium"> Filters & Sorting </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-4 ${isOpen ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="mt-4">
              <div>
                <p className="block text-xs font-medium text-gray-700">
                  Filters
                </p>
                <p>Kategori</p>
                <div className="flex flex-wrap -mx-2">
                  {kategori.map((kategori) => (
                    <button
                      key={kategori.id}
                      onClick={() => handleKategoriChange(kategori.name)}
                      className={`${
                        selectedKategori.includes(kategori.name)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200`}
                    >
                      {kategori.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p>Brand</p>
                <div className="flex flex-wrap -mx-2">
                  {brand.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandChange(brand.name)}
                      className={`${
                        selectedBrand.includes(brand.name)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p>Price</p>
                <div className="flex flex-wrap -mx-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      handlePriceChange(e.target.value, priceRange.max)
                    }
                    className="px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      handlePriceChange(priceRange.min, e.target.value)
                    }
                    className="px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <div>
              <p className="block text-xs font-medium text-gray-700">Filters</p>
              <p className="m-2 text-center block bg-slate-300 rounded px-2 py-2">
                Kategori
              </p>
              <div className="flex flex-wrap -mx-2">
                {kategori.map((kategori) => (
                  <button
                    key={kategori.id}
                    onClick={() => handleKategoriChange(kategori.name)}
                    className={`${
                      selectedKategori.includes(kategori.name)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200`}
                  >
                    {kategori.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="m-2 text-center block bg-slate-300 rounded px-2 py-2">
                Brand
              </p>
              <div className="flex flex-wrap -mx-2">
                {brand.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.name)}
                    className={`${
                      selectedBrand.includes(brand.name)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="m-2 text-center block bg-slate-300 rounded px-2 py-2">
                Price
              </p>
              <div className="flex flex-wrap -mx-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceChange(e.target.value, priceRange.max)
                  }
                  className="px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200"
                />
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceChange(priceRange.min, e.target.value)
                  }
                  className="px-3 py-1 m-1 text-sm rounded-full cursor-pointer transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProduk.map((produk) => (
                <ProductCart key={produk.id} data={produk} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
