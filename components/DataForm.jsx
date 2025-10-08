import React, { useState } from "react";
import glo from '/assets/glo.jpeg'
import mtn from '/assets/mtn.jpeg'
import airtel from '/assets/airtel.jpeg'
import nine from '/assets/nine.jpeg'

// Example data with category field
const dataPlans = { 
    '9mobile': {
    icon: nine, // you can replace with react-icons or images
    plans: [
       { plan: "500MB", price: 100, validity: "1 Day", category: "Daily" },
      { plan: "1.5GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "4.5GB", price: 1500, validity: "30 Days", category: "Monthly" },
      { plan: "10GB", price: 2500, validity: "30 Days", category: "Best Offer" },
    ],
  },
  MTN: {
    icon:mtn, // you can replace with react-icons or images
    plans: [
      { plan: "500MB", price: 100, validity: "1 Day", category: "Daily" },
      { plan: "1.5GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "4.5GB", price: 1500, validity: "30 Days", category: "Monthly" },
      { plan: "10GB", price: 2500, validity: "30 Days", category: "Best Offer" },
    ],
  },
  Airtel: {
    icon: airtel,
    plans: [
      { plan: "750MB", price: 200, validity: "1 Day", category: "Daily" },
      { plan: "2GB", price: 1000, validity: "7 Days", category: "Weekly" },
      { plan: "6GB", price: 2500, validity: "30 Days", category: "Monthly" },
      { plan: "15GB", price: 4000, validity: "30 Days", category: "Best Offer" },
    ],
  },
  Glo: {
    icon: glo,
    plans: [
      { plan: "1GB", price: 300, validity: "1 Day", category: "Daily" },
      { plan: "3GB", price: 1200, validity: "7 Days", category: "Weekly" },
      { plan: "9GB", price: 3000, validity: "30 Days", category: "Monthly" },
      { plan: "20GB", price: 5000, validity: "30 Days", category: "Best Offer" },
    ]
  },
};

export default function DataForm() {
  const [provider, setProvider] = useState("MTN"); // default provider
  const [category, setCategory] = useState(""); // filter

  const handleBuy = (plan) => {
    alert(`Buying ${plan.plan} for ₦${plan.price} on ${provider}`);
    // here you can call API with user phone number + provider + plan

      console.log(plan);
  };


  return (
    <div className=" mx-auto p-4 space-y-10 w-full">
      {/* Network Providers */}
      <div className="grid grid-cols-1 mt-4  h-30  w-full border border-black/60 rounded-lg">
      <div className="flex gap-2 justify-evenly items-center px-2">
        {Object.keys(dataPlans).map((prov) => (
          <div className='flex flex-col hover:bg-gray-200'>
          <button
            key={prov}
            type="button"
            onClick={() => setProvider(prov)} 
            className={` items-center gap-2  p-2  rounded-lg transition  text-sm ${
              provider === prov ? "bg-gray-100 border border-purple-800 text-white" : ""
            }`}
          >
              <img src={dataPlans[prov].icon} alt=""  className='w-auto h-8 rounded-full'/> 
           <p className="text-xs text-black text-center">{prov}</p>
          </button>
         
          </div>
        ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="grid grid-cols-1 justify-center gap-8 w-full mt-4 border border-black p-2 rounded-lg">
        <div className="flex flex-row justify-evenly gap-1">
        {["Daily", "Weekly", "Monthly", "Best Offer"].map((cat) => (
        
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`p-1 rounded-xl border transition text-xs ${
              category === cat ? "bg-blue-800 text-white" : ""
            }`}
          >
            {cat}
          </button>
          
        ))}
        <button
          type="button"
          onClick={() => setCategory("")}
          className={`border p-2 rounded text-xs mr-2 ${
            category === "" ? "bg-blue-500 text-white" : ""
          }`}
        >
          All
        </button>
      </div>
      </div>

      {/* Plans List */}
      <div className="space-y-3">
        {dataPlans[provider].plans
          .filter((p) => (category ? p.category === category : true))
          .map((plan, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">{plan.plan}</p>
                <p className="text-sm text-gray-500">
                  ₦{plan.price} • {plan.validity}
                </p>
              </div>
              <button
                onClick={() => handleBuy(plan)}
                className="bg-blue-800 text-white  text-sm px-3 py-1 rounded"
              >
                Buy
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}



