import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import productCategory from "../helpers/productCategory.js";
import QueryProducts from "../components/QueryProducts.js";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const URLCategoryList = URLSearch.getAll("category");

  const URLCategoryListObject = {};
  URLCategoryList.forEach(el => {
    URLCategoryListObject[el] = true;
  })

  const [sortBy,setSortBy] = useState("");
  const [selectCategory, setSelectCategory] = useState(URLCategoryListObject);
  const [filterCategoryList,setFilterCategoryList] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const category = params.category;

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:8080/api/filter-product",{category:filterCategoryList});
    const dataResponse = response?.data;

    setProducts(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const {name,value,checked} = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value] : checked
      }
    });
  }

  const handleSoryBy = (e) => {
    const {value} = e.target;
    setSortBy(value);

    if(value === 'asc'){
      setProducts((prev) => prev.sort((a,b) => a.sellingPrice - b.sellingPrice))
    }
    if(value === 'desc'){
      setProducts((prev) => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() =>{

  },[sortBy]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map((categoryName,idx) => {
      if(selectCategory[categoryName]) {
        return categoryName
      }
      return null
    }).filter(el => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el,idx) => {
      if((arrayOfCategory.length - 1) === idx) {
        return `category=${el}`
      } 
      return `category=${el}&&`
    }).join("");

    navigate('/category-product?'+urlFormat)
  },[selectCategory]);

  useEffect(() => {
    fetchData();
  },[filterCategoryList]);

  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Side Nav */}
        <div className="bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll scroll-none">
          {/* Sort By  */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-600">
              Sort by:
            </h3>

            <form className="py-2 flex flex-col gap-2 text-sm">
              <div className="flex gap-3 items-center">
                <input type="radio" name="sortBy" id="lowToHigh" checked={sortBy=="asc"} value={"asc"} onChange={handleSoryBy}/>
                <label htmlFor="lowToHigh">Price - Low to High</label>
              </div>

              <div className="flex gap-3 items-center">
                <input type="radio" name="sortBy" id="highToLow" checked={sortBy=="desc"} value={"desc"} onChange={handleSoryBy}/>
                <label htmlFor="highToLow">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By  */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-600">
              category:
            </h3>

            <form className="py-2 flex flex-col gap-2 text-sm">
              {productCategory.map((category, idx) => {
                return (
                  <div key={category.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked= {selectCategory[category?.value]}
                      name="category"
                      value={category?.value}
                      id={category?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={category?.value}>{category?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* Right side */}
        <div>
          <div>
            <p className="text-lg px-4 py-1 font-medium text-slate-500 ">Search Result: <span className="text-black">{products?.length}</span></p>
          </div>
          <div className="p-2 max-h-[calc(100vh-150px)] overflow-y-scroll scroll-none">
            {products.length !== 0 && (
              <QueryProducts data={products} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
