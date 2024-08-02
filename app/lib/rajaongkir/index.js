export async function getKota(id) {
  try {
    const response = await fetch(
      `https://api.rajaongkir.com/starter/city?province=${id}`,

      {
        next: {
          revalidate: 3600 * 24,
        },
        method: "GET",
        headers: {
          key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching cities: ${response.status}`);
    }

    const data = await response.json();
    return data.rajaongkir.results; // assuming the API returns an array of cities in the "results" property
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch cities" };
  }
}

export async function getProvinsi() {
  try {
    const response = await fetch(
      "https://api.rajaongkir.com/starter/province",
      {
        method: "GET",
        headers: {
          key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_KEYRAJA_ONGKIR_KEY,
        },
        cache: "force-cache",
        next: {
          tags: ["provinsi"],
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching cities: ${response.status}`);
    }

    const data = await response.json();
    return data.rajaongkir.results; // assuming the API returns an array of cities in the "results" property
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch Province" };
  }
}
