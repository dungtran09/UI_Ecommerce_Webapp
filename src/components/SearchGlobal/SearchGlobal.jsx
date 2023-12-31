import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiGetProductsByStringSearchFields } from "../../apis/apiProducts";
import icons from "../../utils/icons";
import LoaderSm from "../Loader/LoaderSm";
import path from "../../utils/path";
import statusCode from "../../utils/statusCode";

const SearchGlobal = () => {
  const { AiOutlineSearch } = icons;
  const [keySeach, setKeySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [results, setResults] = useState(null);
  const [msgStatus, setMsgStatus] = useState("");
  const [isResults, setIsResults] = useState(false);

  const onChangeHandler = (e) => {
    setShowDropdown(true);
    setShowLoader(false);
    setKeySearch(e.target.value.trim().toString());
    setMsgStatus("Search for ");
  };
  const catDropDown = useRef(null);
  const fetchDataFromKeySearch = async (keySeach) => {
    const res = await apiGetProductsByStringSearchFields({ search: keySeach });
    if (res?.status === statusCode.SUCCESS && res?.results !== 0) {
      setResults(res?.data);
      setShowLoader(false);
      setIsResults(true);
      setMsgStatus("Results for ");
    } else {
      setShowLoader(false);
      setIsResults(false);
      setMsgStatus("No results");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keySeach?.length > 2) {
        fetchDataFromKeySearch(keySeach);
        setShowLoader(true);
        setMsgStatus("Search for ");
      }
    }, 2000);

    if (keySeach?.length === 0) {
      setResults(null);
      setShowLoader(false);
      setShowDropdown(false);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [keySeach, isResults]);

  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (
        catDropDown.current &&
        setShowDropdown &&
        !catDropDown.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setShowLoader(false);
      }
    };
    document.addEventListener("mousedown", closeOpenMenus);
  }, [showDropdown, showLoader]);

  const resultEls = results?.map((result, index) => (
    <Link
      to={`${path.PRODUCTS}/${result?.categoryName}/${result?.slug}/${result?._id}`}
      key={index}
    >
      <div className="flex gap-4 justify-start items-center border-b pb-3 cursor-pointer">
        <dt className="font-medium text-gray-900">
          <img
            src={result?.thumb}
            className=" border w-[30px] object-cover p-1"
            alt="img"
          />
        </dt>
        <dd className="text-gray-700 sm:col-span-2 hover:text-main">
          {result?.title}
        </dd>
      </div>
    </Link>
  ));

  return (
    <>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full outline-none py-2 pe-10 border-b border-gray-200 sm:text-sm"
          onChange={(e) => onChangeHandler(e)}
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>
            <AiOutlineSearch />
          </button>
        </span>
        {showDropdown && (
          <div
            className="w-full absolute end-0 mt-2 rounded-md border border-gray-100 bg-white shadow-lg z-50"
            role="menu"
            ref={catDropDown}
          >
            <div className="p-2 flex justify-start gap-2 py-2.5 pe-5 items-center">
              <span>
                {(showLoader && <LoaderSm />) || (
                  <span className="text-[12px] font-semibold text-gray-500 line-clamp-2">
                    {msgStatus}
                  </span>
                )}
              </span>
              {keySeach ? (
                <>
                  <span className="text-[12px] font-semibold text-gray-500 line-clamp-2">
                    "{keySeach}"
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-3 p-2">
              {isResults ? <>{resultEls}</> : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchGlobal;
