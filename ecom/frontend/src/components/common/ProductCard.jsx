import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white flex flex-col overflow-hidden hover:shadow-md transition-all"
    >
      <div className="w-full bg-gray-50">
        {/* <a href=" " className="block"> */}
        <img
          src={product.images[0]}
          alt="Product 1"
          className="w-full object-cover object-top aspect-[230/307]"
        />
        {/* </a> */}
      </div>
      <div className="p-2 flex-1 flex flex-col">
        <div className="flex-1">
          <a href=" " className="block border-0 outline-0">
            <h5 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
              {product.name}
            </h5>
          </a>
          <p className="text-sm mt-1 text-slate-600 truncate">
            Flowy and elegant red dress
          </p>
          <div className="flex flex-wrap justify-between gap-2 mt-3">
            <div className="flex gap-2">
              <h6 className="text-sm sm:text-base font-bold text-slate-900">
                ${product.discountPrice}
              </h6>
              <h6 className="text-sm sm:text-base text-slate-600">
                <strike>${product.sellingPrice}</strike>
              </h6>
            </div>
            <div className="flex items-center gap-0.5">
              <svg
                className="w-[14px] h-[14px] fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-[14px] h-[14px] fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-[14px] h-[14px] fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-[14px] h-[14px] fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-[14px] h-[14px] fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
