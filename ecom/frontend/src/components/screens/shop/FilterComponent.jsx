import axios from "axios";
import React, { useEffect, useState } from "react";

const FilterComponent = ({ handleFilter }) => {
  const [category, setCategory] = useState([]);
  const [id, setId] = useState("");

  const fetchAllCategory = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/category/all`);

      console.log(res);
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    setId(id);
    handleFilter(id);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);
  return (
    <aside className="w-full">
      <ul>
        {category.map((cat, i) => (
          <li
            key={i}
            onClick={() => handleClick(cat._id)}
            className={`${
              cat._id == id ? "bg-red-500" : "bg-slate-400"
            } px-2 py-3 rounded-lg  mb-5 text-white duration-300 hover:translate-x-2 cursor-pointer`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FilterComponent;
