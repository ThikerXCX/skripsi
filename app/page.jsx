import CollectionInfoComponent from "./components/info/CollectionInfoComponent";
import Banner from "./components/layouts/Banner";
import Footer from "./components/layouts/Footer";
import ProductCollection from "./components/product/ProductCollection";

export default function Home() {
  return (
    <>
      <Banner />
      <ProductCollection limit="8" />
      <CollectionInfoComponent limit="8" />
      <Footer />
    </>
  );
}
