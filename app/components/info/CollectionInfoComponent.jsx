import { getDataInfo } from "@/app/services/info";
import InfoCard from "../card/InfoCard";
import InfoCardSquare from "../card/InfoCardSquare";

export default async function CollectionInfoComponent(props) {
  const { limit } = props ?? null;
  const { data } = await getDataInfo(`${process.env.HOSTNAME}api/info`);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Info & Tips Seputar Laptop dan Komputer
          </h2>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* {limit
            ? data.map((item, index) => {
                if (index < limit) {
                  return <InfoCard key={item.id} data={item} />;
                }
              })
            : data.map((item, index) => {
                return <InfoCard key={item.id} data={item} />;
              })} */}
          {limit
            ? data.map((item, index) => {
                if (index < limit) {
                  return <InfoCardSquare key={item.id} data={item} />;
                }
              })
            : data.map((item, index) => {
                return <InfoCardSquare key={item.id} data={item} />;
              })}
        </ul>
      </div>
    </section>
  );
}
