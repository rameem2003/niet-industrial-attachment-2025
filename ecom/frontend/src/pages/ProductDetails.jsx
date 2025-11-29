import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCartItem } from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({});

  const fetchSingleProduct = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/product/single/${id}`
      );
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);

  const fetchCart = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/cart/items`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      dispatch(fetchCartItem(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const addTocart = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/cart/add/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        await fetchCart();
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <main className=" py-5">
      <Container>
        <div>
          <div className="lg:max-w-6xl max-w-xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
              <div className="w-full lg:sticky top-0">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-2 w-16 max-sm:w-14 shrink-0">
                    {product?.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Product1"
                        className="aspect-[64/85] object-cover object-top w-full cursor-pointer  border-b-2 border-black"
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <img
                      src={product?.images ? product.images[0] : null}
                      alt="Product"
                      className="w-full  aspect-[548/712] object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 mt-2 text-sm">
                    {product.description}
                  </p>
                  <div className="flex items-center flex-wrap gap-4 mt-6">
                    <h4 className="text-slate-900 text-2xl sm:text-3xl font-semibold">
                      ${product.discountPrice}
                    </h4>
                    <p className="text-slate-500 text-lg">
                      <strike>${product.sellingPrice}</strike>{" "}
                      <span className="text-sm ml-1.5">Tax included</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-lg px-2.5 bg-green-600 text-white rounded-full">
                      <p>4</p>
                      <svg
                        className="w-[13px] h-[13px] fill-white"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">
                      253 ratings and 27 reviews
                    </p>
                  </div>
                </div>
                <hr className="my-6 border-slate-300" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Sizes
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      type="button"
                      className="w-10 h-9 border border-slate-300 hover:border-blue-600 text-sm cursor-pointer flex items-center justify-center shrink-0"
                    >
                      SM
                    </button>
                    <button
                      type="button"
                      className="w-10 h-9 border border-blue-600 hover:border-blue-600 text-sm cursor-pointer flex items-center justify-center shrink-0"
                    >
                      MD
                    </button>
                    <button
                      type="button"
                      className="w-10 h-9 border border-slate-300 hover:border-blue-600 text-sm cursor-pointer flex items-center justify-center shrink-0"
                    >
                      LG
                    </button>
                    <button
                      type="button"
                      className="w-10 h-9 border border-slate-300 hover:border-blue-600 text-sm cursor-pointer flex items-center justify-center shrink-0"
                    >
                      XL
                    </button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="px-4 py-3 w-[45%] cursor-pointer border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-medium"
                    >
                      Add to wishlist
                    </button>
                    <button
                      onClick={() => addTocart(id)}
                      type="button"
                      className="px-4 py-3 w-[45%] cursor-pointer border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <hr className="my-6 border-slate-300" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Select Delivery Location
                  </h3>
                  <p className="text-slate-500 text-sm mt-2">
                    Enter the pincode of your area to check product
                    availability.
                  </p>
                  <div className="flex items-center gap-2 mt-6 max-w-sm">
                    <input
                      type="number"
                      placeholder="Enter pincode"
                      className="bg-slate-100 px-4 py-2.5 text-sm w-full  border-0 outline-0"
                    />
                    <button
                      type="button"
                      className="border-0 outline-0 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2.5 text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <hr className="my-6 border-slate-300" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Product Information
                  </h3>
                  <div className="mt-4" role="accordion">
                    <div className="hover:bg-slate-100 transition-all">
                      <button
                        type="button"
                        className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center"
                      >
                        <span className="mr-4">Product details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-180"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            clipRule="evenodd"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                      <div className="pb-4 px-4">
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-slate-100 transition-all">
                      <button
                        type="button"
                        className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center"
                      >
                        <span className="mr-4">Vendor details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            clipRule="evenodd"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                      <div className="pb-4 px-4 hidden">
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-slate-100 transition-all">
                      <button
                        type="button"
                        className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center"
                      >
                        <span className="mr-4">Return and exchange policy</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                            clipRule="evenodd"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                      <div className="pb-4 px-4 hidden">
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-6 border-slate-300" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-1.5 mt-6">
                    <svg
                      className="w-5 h-5 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  </div>
                  <div className="flex items-center flex-wrap gap-4 mt-4">
                    <h4 className="text-2xl sm:text-3xl text-slate-900 font-semibold">
                      4.0 / 5
                    </h4>
                    <p className="text-sm text-slate-500">
                      Based on 253 ratings
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-start">
                    <img
                      src="https://readymadeui.com/team-2.webp"
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="ml-3">
                      <h4 className="text-slate-900 text-sm font-semibold">
                        John Doe
                      </h4>
                      <div className="flex space-x-1 mt-1">
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
                        <p className="text-xs text-slate-500 !ml-2">
                          2 months ago
                        </p>
                      </div>
                      <p className="text-sm text-slate-500 mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                  <a
                    href="javascript:void(0)"
                    className="block text-blue-600 hover:underline text-sm mt-6 font-semibold"
                  >
                    Read all reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetails;
