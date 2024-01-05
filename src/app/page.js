"use client"
import Header from './components/header'
import axios from 'axios'
import Link from 'next/link';
import { useEffect, useState } from 'react'
export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [rate, setRate] = useState(0);
  const [token, setToken] = useState("");

  const search = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("rate", rate);
    formdata.append("title", filter);
    const data = {};
    formdata.forEach((value, key) => (data[key] = value));
    axios.post("https://event-reg.app/flutter_test/api/filter-products", data, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
      .then((res) => {
        setProducts(res.data.data)
      })
      .catch((e) => {
        // setError(e.response.data.data)
      });
  };
  const reset = (e) => {
    setFilter('')
    setRate(0)
    e.preventDefault();
    axios.get("https://event-reg.app/flutter_test/api/products", {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => {
      setProducts(res.data.data)
    })
    .catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/auth/login";
    }
    setToken(token)
    axios.get("https://event-reg.app/flutter_test/api/products", {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => {
      setProducts(res.data.data)
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  return (
  <div className='bg-gray-100 dark:bg-gray-800'>
    <Header/>

    <div className='w-10/12 lg:w-6/12 m-auto'>
      <form>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search products..."
            required=""
            value={filter}
            onChange={(v) => setFilter(v.target.value)}/>
          <button onClick={search} type="submit" className="text-white absolute end-20 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
          <button onClick={reset} type="button" className="text-white absolute end-2 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Reset
          </button>
        </div>
        <div className="flex mb-4">
              <div className="mr-4">  
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Rate:
                </span>
              </div>
                <div className="flex items-center">
                  <svg onClick={() => setRate(1)} className={ rate >= 0.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => setRate(2)} className={ rate >= 1.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => setRate(3)} className={ rate >= 2.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => setRate(4)} className={ rate >= 3.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => setRate(5)} className={ rate >= 4.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {rate?.toLocaleString()}
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    out of
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                </div>
          </div>
      </form>
    </div>
    <div className="text-center p-10 ">
      <h1 className="font-bold text-4xl mb-4">Products</h1>
    </div>
    <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products.map((product) => (
        <Link  key={product.id}  href={`/details/${product.id}`}>
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img
                src={product.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">product</span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                </p>
              </div>
            </a>
          </div>
        </Link>
      ))}
    </section>
  </div>
  )
}
