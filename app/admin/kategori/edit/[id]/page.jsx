import { getDataKategoriById } from "@/app/services/kategori";

export default async function page(props) {
  const { params } = props;
  const data = await getDataKategoriById(`${process.env.HOSTNAME}api/kategori?id=` +  params.id);

  return <div></div>;
}
