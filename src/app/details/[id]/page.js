"use client"
import Header from '../../components/header'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Page = ({params}) => {
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setError(false)
      setSuccess(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [error, success]);

  const addComment = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("content", comment);
    formdata.append("product_id", params.id);
    const data = {};
    formdata.forEach((value, key) => (data[key] = value));
    axios.post("https://event-reg.app/flutter_test/api/comment", data, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
      .then((res) => {
        setComment('')
        axios.get(`https://event-reg.app/flutter_test/api/products/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }).then((res) => {
          setProduct(res.data.data)
          setSuccess('Comment Added Successfully')
        })
        .catch((e) => {
          setError('Error Adding Comment')
          console.log(e);
        });
      })
      .catch((e) => {
        setError(e.response.data.data)
      });
  };

  const addRate = (rate) => {
    const formdata = new FormData();
    formdata.append("rate", rate);
    formdata.append("product_id", params.id);
    const data = {};
    formdata.forEach((value, key) => (data[key] = value));
    axios.post("https://event-reg.app/flutter_test/api/rate", data, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
      .then((res) => {
        axios.get(`https://event-reg.app/flutter_test/api/products/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }).then((res) => {
          setProduct(res.data.data)
          setSuccess('Rating Added Successfully')
        })
        .catch((e) => {
          setError('Error Adding Rate')
          console.log(e);
        });
      })
      .catch((e) => {
        setError(e.response.data.data)
      });
  };

  const addToCart = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("product_id", params.id);
    const data = {};
    formdata.forEach((value, key) => (data[key] = value));
    axios.post("https://event-reg.app/flutter_test/api/orders", data, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
      .then((res) => {
        axios.get(`https://event-reg.app/flutter_test/api/products/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }).then((res) => {
          setProduct(res.data.data)
          setSuccess('Added To Cart Successfully')
        })
        .catch((e) => {
          setError('Error Adding To Cart')
          console.log(e);
        });
      })
      .catch((e) => {
        setError(e.response.data.data)
      });
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)
    if (!token) {
      window.location.href = "/auth/login";
    }
    axios.get(`https://event-reg.app/flutter_test/api/products/${params.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => {
      setProduct(res.data.data)
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
    <Header/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {success ? (
          <div className="mb-10 bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4" role="alert">
            <p className="font-bold">{success}</p>
          </div>
      ) : ''}
      {error ? (
          <div className="mb-10 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
      ) : ''}
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className='sticky top-16'>
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2">
                  <button onClick={addToCart} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.title}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">  
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Rate:
                </span>
              </div>
                <div className="flex items-center">
                  <svg onClick={() => addRate(1)} className={ product.rate >= 0.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => addRate(2)} className={ product.rate >= 1.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => addRate(3)} className={ product.rate >= 2.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => addRate(4)} className={ product.rate >= 3.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg onClick={() => addRate(5)} className={ product.rate >= 4.5 ? "cursor-pointer w-4 h-4 text-yellow-300 me-1" :  "cursor-pointer w-4 h-4 text-gray-300 me-1 dark:text-gray-500"}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {product.rate?.toLocaleString()}
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    out of
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>
            <div className='mt-5'>
              <section className="bg-white dark:bg-gray-900 py-8 antialiased">
              <div className="max-w-2xl mx-auto px-4">
                <form  onSubmit={addComment} className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={6}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required=""
                      value={comment}
                      onChange={(v) => setComment(v.target.value)}
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Post comment
                  </button>
                </form>
              </div>
              {product.comments?.map((item, key) => {
                let date = new Date(item.created_at)
                return (
                  <article key={item.id} className={key == 0 ? "p-6 text-base bg-white rounded-lg dark:bg-gray-900" : "p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"}>
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="/User-avatar.svg"
                            alt={item.user.name}
                          />
                          {item.user.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                            {date.toISOString().split('T')[0]}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {item.content}
                    </p>
                  </article>
                )})}
                </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
