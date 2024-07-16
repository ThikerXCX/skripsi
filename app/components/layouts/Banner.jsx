export default function Banner() {
  return (
    <div className="h-screen m-2 bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Get the Best Deals on Computers and Accessories!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Explore our wide range of laptops, desktops, and gadgets from top
          brands.
        </p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Shop Now
        </button>
      </div>
      <img
        src="computer-banner.jpg"
        alt="Computer Banner"
        className="hidden md:block w-1/2 h-64 object-cover rounded"
      />
    </div>
  );
}
