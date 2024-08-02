import { retriveDataBySlug } from "@/app/lib/firebase/service";

export const dynamic = "force-dynamic";

export default async function DetailInfoPage(props) {
  const { params } = props;

  const data = await retriveDataBySlug("info", params.slug);

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-600">
        <video className="w-full h-full max-h-96" controls>
          <source src={data.image[1].url} type="video/mp4" />
        </video>

        <div className="bg-white p-4 px-6">
          <h3>{data.name}</h3>
          <p>{data.deskripsi}</p>
        </div>
      </div>
    </div>
  );
}
