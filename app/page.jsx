import CollectionInfoComponent from "./components/info/CollectionInfoComponent";
import Banner from "./components/layouts/Banner";
import Footer from "./components/layouts/Footer";
import ProductCollection from "./components/product/ProductCollection";
import { getDataProduk } from "./services/products";

export default async function Home() {
  const { data } = await getDataProduk(`${process.env.HOSTNAME}api/product`);
  return (
    <>
      <Banner />
      <ProductCollection data={data} limit="8" />
      <CollectionInfoComponent limit="8" />
      <Footer />
    </>
  );
}
