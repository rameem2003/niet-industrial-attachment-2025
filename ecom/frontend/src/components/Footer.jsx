import {
  FaBoxOpen,
  FaDollarSign,
  FaHeadset,
  FaCreditCard,
  FaFacebookF,
  FaTiktok,
  FaCcVisa,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 text-sm">
      {/* Top Features */}
      <div className="bg-[#1a1a1a] border-b border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              <FaBoxOpen size={18} />
            </div>
            <div>
              <p className="font-semibold">Free Shipping</p>
              <p className="text-xs">On order over $49.00</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              <FaDollarSign size={18} />
            </div>
            <div>
              <p className="font-semibold">Money Guarantee</p>
              <p className="text-xs">Within 30 days for an exchange</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              <FaHeadset size={18} />
            </div>
            <div>
              <p className="font-semibold">Online Support</p>
              <p className="text-xs">24 hours a day, 7 days a week</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600">
              <FaCreditCard size={18} />
            </div>
            <div>
              <p className="font-semibold">Flexible Payment</p>
              <p className="text-xs">Pay with Multiple Credit Cards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo + Contact */}
        <div className="col-span-1 md:col-span-2 space-y-3">
          <span className="block w-[161px] h-[22px]">
            <img
              src="https://clinicmaster.goeasyapp.com/uploads/files/c4ca4238a0b923820dcc509a6f75849b/c4ca4238a0b923820dcc509a6f75849b//logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </span>
          <p>5611 Wellington Road, Suite 115, Gainesville</p>
          <p className="text-lg font-semibold text-white">(84) 943 446 000</p>
          <a
            href="mailto:goeasyappvn@gmail.com"
            className="text-blue-400 hover:underline"
          >
            goeasyappvn@gmail.com
          </a>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-white font-semibold text-[18px] mb-4">
            Information
          </h3>
          <ul className="space-y-3">
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Privacy Policy
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Delivery time
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Shipping
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Taxes
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Terms of service
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="text-white font-semibold text-[18px] mb-4">
            Customer Services
          </h3>
          <ul className="space-y-3">
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              About us
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Gallery
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Account
            </li>
            <li className="text-[#888888] cursor-pointer hover:text-white transition-colors">
              Wishlist
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-[18px] mb-4 leading-snug">
            Join Our Newsletter And Get $50 Discount For Your First Order
          </h3>
          <div className="flex items-center bg-[#1a1a1a] border border-gray-600 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-transparent text-gray-300 focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              →
            </button>
          </div>

          {/* Socials */}
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:bg-blue-600 hover:text-white transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col items-center gap-3">
          {/* Text upore */}
          <p className="text-gray-500 text-xs text-center">
            SI Entry Theme © 2025 Demo Store. All Rights Reserved. Designed by{" "}
            <span className="text-white font-medium">Smartaddons</span>
          </p>

          {/* Payment Icons niche */}
          <div className="flex gap-4 text-2xl text-gray-400">
            <FaCcVisa className="hover:text-blue-500 cursor-pointer transition-colors" />
            <FaCcPaypal className="hover:text-sky-500 cursor-pointer transition-colors" />
            <FaCcMastercard className="hover:text-red-500 cursor-pointer transition-colors" />
            <FaCcAmex className="hover:text-indigo-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
