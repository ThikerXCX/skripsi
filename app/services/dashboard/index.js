import { getDataLaporan } from "../laporan";

export async function getDashBoard() {
  const laporan = await getDataLaporan(
    `${process.env.NEXT_PUBLIC_HOSTNAME}api/laporan`
  );

  return laporan.data;
}
