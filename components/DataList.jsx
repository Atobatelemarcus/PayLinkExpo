// src/data.jsx

const DataPlans = {
  MTN: {
    icon: "/icons/mtn.png",
    plans: [
      { plan: "500MB", price: 200, validity: "1 Day", category: "Daily" },
      { plan: "1GB", price: 300, validity: "1 Day", category: "Daily" },
      { plan: "2GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "6GB", price: 1500, validity: "30 Days", category: "Monthly" },
      { plan: "10GB", price: 2000, validity: "30 Days", category: "Best Offer" },
    ],
  },
  Airtel: {
    icon: "/icons/airtel.png",
    plans: [
      { plan: "750MB", price: 300, validity: "2 Days", category: "Daily" },
      { plan: "1.5GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "3GB", price: 1000, validity: "30 Days", category: "Monthly" },
      { plan: "6GB", price: 2000, validity: "30 Days", category: "Best Offer" },
    ],
  },
  Glo: {
    icon: "/icons/glo.png",
    plans: [
      { plan: "1GB", price: 200, validity: "1 Day", category: "Daily" },
      { plan: "2.5GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "5GB", price: 1500, validity: "30 Days", category: "Monthly" },
      { plan: "12GB", price: 2500, validity: "30 Days", category: "Best Offer" },
    ],
  },
  "9mobile": {
    icon: "/icons/9mobile.png",
    plans: [
      { plan: "500MB", price: 200, validity: "2 Days", category: "Daily" },
      { plan: "1.5GB", price: 500, validity: "7 Days", category: "Weekly" },
      { plan: "4.5GB", price: 2000, validity: "30 Days", category: "Monthly" },
      { plan: "10GB", price: 3000, validity: "30 Days", category: "Best Offer" },
    ],
  },
};

export default DataPlans;
