export default function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    >
      {children}
    </button>
  );
}
