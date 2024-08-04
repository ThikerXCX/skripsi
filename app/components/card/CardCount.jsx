export default function CardCount({ title, icon, count }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  );
}
