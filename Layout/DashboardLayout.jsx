import React from 'react'


// layouts/DashboardLayout.jsx

import BottomBar from "../components/BottomBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      
      
        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>
      
      <BottomBar />
    </div>
  );
}
