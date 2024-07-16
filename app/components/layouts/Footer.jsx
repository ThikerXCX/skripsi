import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto grid grid-cols-3 gap-4 py-10">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Alamat :</h2>
          <p className="mb-2">Samping hotel 95, Jl. Imam Bonjol No.88</p>
          <p className="mb-2">
            Bansir Laut, Kec. Pontianak Tenggara, Kota Pontianak, Kalimantan
            Barat
          </p>
          <h2 className="text-2xl font-bold mb-4">Jam Buka :</h2>
          <p className="mb-4">Senin - Sabtu: 09.00 - 21.00 WIB</p>
          <p className="mb-4">Minggu : 10.00 - 19.00 WIB</p>
          <div className="flex space-x-2">
            <Link
              href="https://www.facebook.com/ECcomp"
              className="text-gray-400 hover:text-gray-300"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/laptop_second_ptk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-gray-400 hover:text-gray-300"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://wa.me/085750026398"
              className="text-gray-400 hover:text-gray-300"
            >
              <FaWhatsapp size={20} />
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="h-64 overflow-hidden rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8168687462166!2d109.35361707408269!3d-0.04887469995063293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59c0c7e5de93%3A0x671bc058a649cca5!2sEC%20Computer%20Pontianak!5e0!3m2!1sen!2sid!4v1721102494546!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p>&copy; 2024 ThikerXCX.</p>
      </div>
    </div>
  );
}
