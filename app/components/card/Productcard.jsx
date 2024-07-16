"use client";
import { getDataProduk } from "@/app/services/products";
import { useEffect, useState } from "react";

export default function Productcard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getDataProduk("/api/product");
      setProducts(data);
    }
    fetchData(); // Call the function
  }, []);
  return <></>;
}
