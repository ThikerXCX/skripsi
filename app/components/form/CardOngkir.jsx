import { formatRupiah } from "@/app/lib/helper";

export default function CardOngkir({
  ongkir,
  selectedOngkir,
  setSelectedOngkir,
}) {
  return (
    <div className="mt-4">
      {ongkir.map((courier, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold text-lg mb-2">{courier.name}</h2>
          {courier.costs.map((cost, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedOngkir(cost)}
              className={`border p-4 rounded cursor-pointer ${
                selectedOngkir.service === cost.service
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{cost.service}</p>
                  <p className="text-sm text-gray-600">{cost.description}</p>
                </div>
                <div>
                  <p className="font-bold">
                    {formatRupiah(cost.cost[0].value)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ETD: {cost.cost[0].etd} hari
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
