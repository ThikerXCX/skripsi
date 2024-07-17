"use client";
import Footer from "@/app/components/layouts/Footer";
import DetailProduct from "@/app/components/product/DetailProduct";
import { retriveDataBySlug } from "@/app/lib/firebase/service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS untuk Carousel

export default function DetailProductPage(props) {
  const { params } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const product = await retriveDataBySlug("products", params.slug);
        setData(product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [params]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="grid flex-grow d-block p-4 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <DetailProduct data={data} />
          <div className=" rounded-lg bg-gray-200 lg:col-span-2 overflow-auto">
            <div className="max-h-screen">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
              >
                {data.image.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image.url}
                      alt={image.ref}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
}
