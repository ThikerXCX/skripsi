import Modal from "@/app/components/core/Modal";
import { retriveDataBySlug } from "@/app/lib/firebase/service";

export default async function DetailInfoPage(props) {
  const { params } = props;

  const data = await retriveDataBySlug("info", params.slug);

  return (
    <Modal>
      <video className="w-full h-full max-h-96" controls>
        <source src={data.image[1].url} type="video/mp4" />
      </video>

      <div className="bg-white p-4 px-6">
        <h3>{data.name}</h3>
        <p>{data.deskripsi}</p>
      </div>
    </Modal>
  );
}
