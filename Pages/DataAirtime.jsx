import React from 'react'
import DataForm from '../components/DataForm'
import Airtime from '../components/Airtime'
import { useState } from 'react'






function DataAirtime() {
const [activeTab, setActiveTab]=useState('Airtime')

  return (
    <>
    <section className='flex flex-col mx-auto bg-slate-100 p-4 items-center w-full justify-center gap-8'>
        <div className='flex flex-row w-full space-x-2 justify-center'>
            <button onClick={()=>setActiveTab('Airtime')}  
            className={`px-12 py-2 border border-blue-500 rounded-md  ${activeTab==='Airtime'?"bg-blue-700 text-white":'bg-white'}`}>Airtime</button>
             <button onClick={()=>setActiveTab('DataForm')}  className={`px-12 py-2 border border-blue-500 rounded-md ${activeTab==='DataForm'?"bg-blue-700 text-white":'bg-white'}`}>Data</button>
        </div>
        {
            activeTab==='Airtime'&&(
                <Airtime/>
            )
        }

         {
            activeTab==='DataForm'&&(
                <DataForm/>
            )
        }

 

    </section>
    </>
  )
}

export default DataAirtime