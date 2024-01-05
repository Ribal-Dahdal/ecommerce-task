"use client"
import { useEffect, useState } from 'react';
import axios from 'axios'
import Header from '../components/header';
const Page = () => {
  const [orders, seOrders] = useState([]);
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

  const deleteOrder = (id) => {
    axios.delete(`https://event-reg.app/flutter_test/api/orders/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }})
      .then((res) => {
        setSuccess('Order Deleted Successfully')
        axios.get(`https://event-reg.app/flutter_test/api/orders`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }).then((res) => {
          seOrders(res.data.data)
        })
        .catch((e) => {
        });
      })
      .catch((e) => {
        setError('error Deleting the Order')
        console.log(e);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    setToken(token)
    if (!token) {
      window.location.href = "/auth/login";
    }
    axios.get(`https://event-reg.app/flutter_test/api/orders`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => {
      seOrders(res.data.data)
    })
    .catch((e) => {
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4 mx-10 md:mx-0">Shopping Cart</h1>
        </div>
        <div className="mt-8">
          {orders.map((order, key)=>(
            <div key={key} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
              <div className="flex-shrink-0">
                <img
                  src={order.product.image}
                  alt="Product image"
                  className="w-10/12 md:w-44 m-auto object-cover rounded-md"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 mx-10">
                <div className='flex flex-row justify-between'>
                  <h2 className="text-lg font-bold">{order.product.title}</h2>
                  <div onClick={() => deleteOrder(order.id)} className='text-red-500 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{order.product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
