export async function getDataKategori(url) {
    console.log(url);
    const res = await fetch(url,
        {
            cache : "force-cache",
            next : {
                tags : ['kategori']
            }
        }
    );
    if (!res.ok) {
        throw new Error('gagal mendapatkan data')
    }
    return res.json();

}

export async function getDataKategoriById(url) {
    const res = await fetch(url,{
        cache : "no-cache"
    })

    if (!res.ok) {
        throw new Error('gagal mendapatkan data')
    }
    return res.json();

}