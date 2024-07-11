const { forwardRef } = require("react");

const InputComponent = forwardRef(({ title, name, type, id }, ref) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <label
        htmlFor="name_product"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        {title}
      </label>
      <input
        required
        type={type}
        name={name}
        id={id}
        ref={ref}
        className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
      />
    </div>
  );
});

export default InputComponent;
