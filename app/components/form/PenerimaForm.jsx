export default function PenerimaForm({
  penerima,
  errors,
  handleInputChange,
  handleProvinsiChange,
  provinsi,
  kota,
  kurir,
  setKurir,
}) {
  return (
    <div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="nama_penerima"
        >
          Nama Penerima
        </label>
        <input
          type="text"
          id="nama_penerima"
          name="nama_penerima"
          value={penerima.nama_penerima}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded ${
            errors.nama_penerima ? "border-red-500" : ""
          }`}
        />
        {errors.nama_penerima && (
          <p className="text-red-500 text-sm">{errors.nama_penerima}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="no_hp_penerima"
        >
          No HP Penerima
        </label>
        <input
          type="text"
          id="no_hp_penerima"
          name="no_hp_penerima"
          value={penerima.no_hp_penerima}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded ${
            errors.no_hp_penerima ? "border-red-500" : ""
          }`}
        />
        {errors.no_hp_penerima && (
          <p className="text-red-500 text-sm">{errors.no_hp_penerima}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="alamat_lengkap"
        >
          Alamat Lengkap
        </label>
        <input
          type="text"
          id="alamat_lengkap"
          name="alamat_lengkap"
          value={penerima.alamat_lengkap}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded ${
            errors.alamat_lengkap ? "border-red-500" : ""
          }`}
        />
        {errors.alamat_lengkap && (
          <p className="text-red-500 text-sm">{errors.alamat_lengkap}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="provinsi">
          Provinsi
        </label>
        <select
          id="provinsi"
          name="provinsi_id"
          value={penerima.provinsi_id}
          onChange={handleProvinsiChange}
          className={`w-full border p-2 rounded ${
            errors.provinsi_id ? "border-red-500" : ""
          }`}
        >
          <option value="">Pilih Provinsi</option>
          {provinsi.map((prov) => (
            <option key={prov.province_id} value={prov.province_id}>
              {prov.province}
            </option>
          ))}
        </select>
        {errors.provinsi_id && (
          <p className="text-red-500 text-sm">{errors.provinsi_id}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="kota">
          Kota
        </label>
        <select
          id="kota"
          name="kota_id"
          value={penerima.kota_id}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded ${
            errors.kota_id ? "border-red-500" : ""
          }`}
        >
          <option value="">Pilih Kota</option>
          {kota.map((kotaItem) => (
            <option key={kotaItem.city_id} value={kotaItem.city_id}>
              {kotaItem.city_name}
            </option>
          ))}
        </select>
        {errors.kota_id && (
          <p className="text-red-500 text-sm">{errors.kota_id}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="kota">
          Kota
        </label>
        <select
          id="kurir"
          name="kurir"
          value={kurir}
          onChange={(e) => setKurir(e.target.value)}
          className={`w-full border p-2 rounded ${
            errors.kurir ? "border-red-500" : ""
          }`}
        >
          <option value="jne">JNE</option>
          <option value="pos">POS Indonesia</option>
          <option value="tiki">TIKI</option>
        </select>
        {errors.kurir && <p className="text-red-500 text-sm">{errors.kurir}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="kode_pos">
          Kode Pos
        </label>
        <input
          type="text"
          id="kode_pos"
          name="kode_pos"
          value={penerima.kode_pos}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded ${
            errors.kode_pos ? "border-red-500" : ""
          }`}
        />
        {errors.kode_pos && (
          <p className="text-red-500 text-sm">{errors.kode_pos}</p>
        )}
      </div>
    </div>
  );
}
