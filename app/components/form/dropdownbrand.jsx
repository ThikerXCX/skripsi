import { getDataBrand } from "@/app/services/brand";

const { useState, useEffect, forwardRef } = require("react");

const DropDownBrand = forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const brands = await getDataBrand(`/api/brand`);
      setBrand(brands.data);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <label
        htmlFor="brand"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        Brand
      </label>
      <select
        required
        className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
        name="brand"
        id="brand"
        onChange={onChange}
        ref={ref}
      >
        {value
          ? brand.map((item) => (
              <option
                key={item.id}
                selected={value === item.name ? true : false}
                value={item.name}
              >
                {item.name}
              </option>
            ))
          : brand.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
      </select>
    </div>
  );
});

DropDownBrand.displayName = "DropDownBrand";
export default DropDownBrand;
