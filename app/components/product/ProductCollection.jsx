import { getDataProduk } from "@/app/services/products";
import Productcard from "../card/InfoCard";
import ProductCart from "../card/ProductCart";

export default async function ProductCollection(props) {
  const limit = props.limit;

  const { data } = await getDataProduk(`${process.env.HOSTNAME}api/product`);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Koleksi Laptop
          </h2>

          {/* <p className="mx-auto mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p> */}
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item, index) => {
            if (index < limit) {
              // return <Productcard key={item.id} data={item} />;
              return <ProductCart key={item.id} data={item} />;
            }
          })}
        </ul>
      </div>
    </section>
  );
}
