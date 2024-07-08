export async function getData(url) {
    const res = await fetch(url,
        {
            cache : "force-cache",
            next : {
                tags : ['products']
            }
        }
    );
    if (!res.ok) {
        throw new Error('gagal mendapatkan data')
    }
    return res.json();

}