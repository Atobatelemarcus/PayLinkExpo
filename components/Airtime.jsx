import React from 'react'
import { useState } from 'react'
import glo from '/assets/glo.jpeg'
import mtn from '/assets/mtn.jpeg'
import airtel from '/assets/airtel.jpeg'
import nine from '/assets/nine.jpeg'
const AirLIst=[
    {
        provider:'MTN',
        img:mtn
    },
    {
        provider:'Airtel',
        img:airtel
    },
    {
        provider:'Glo',
        img:glo
    },
    {
        provider:'9Mobile',
        img:nine
    }
]


 const amounts=[100,200,500,1000]


function Airtime() {
    const [phone,setPhone]=useState([]);
    const [provide, setProvide]=useState("");
    const [selectedAmount,setSelectedAmount]=useState(null);
    const [customAmount,setCustomAmount]=useState('')


     
    const HandleSubmit=(e)=>{
        e.preventDefault();

        const finalAmount= customAmount||selectedAmount;

         if (!phone||!provide||!finalAmount){
        alert("please fill all fields");
        
    }
   else{
    alert('transaction sucessful');
   }
    const payload={
        phone,
        provide,
        amount:Number(finalAmount),
    }

    console.log("submitting:" , payload);

    setPhone('');
    setProvide('');
    setCustomAmount('');
    setSelectedAmount(null);


        
    };
   

    

 
return (
    <>
        <section className='flex flex-col mx-auto bg-slate-100 p-4 items-center w-full justify-center gap-8'>
        <form onSubmit={HandleSubmit} className='gap-8 flex flex-col justify-center w-full'>
        <div className='grid grid-col-1 mt-4 bg-white border border-blue-800 h-30 rounded-lg'>
            
            <div className='flex justify-evenly gap-2 items-center'>
                {
                        AirLIst.map((list,index)=>(
                    <div className='flex flex-col'>
                     <button
                     type='button'
                     key={index}
                     onClick={()=>setProvide(list.provider)}
                     className={`px-4 py-2 rounded-lg transition${provide===list.provider?
                            "bg-purple-800 text-white border border-purple-600"
                            :"bg-gray-200 text-black hover:bg-gray-200"}`}
                            
                    
                     
                     >   
                    <img src={list.img} alt=""  className='w-auto h-7 rounded-full'/>
                     <p className="text-xs text-black text-center">{list.provider}</p>
                     </button>
                     </div>
                        ))
                    }
            </div>
         </div>
         <div className='flex flex-col'>
                 <p className="text-md text-black m-2">Enter phone number</p>
                    <input type="number"
                    name='phoneNumber'
                    onChange={(e)=>setPhone(e.target.value)}
                    value={phone}
                    placeholder='Enter phone number'
                    pattern='[0-9]{11}'
                    className='w-full  p-2 border border-black/50 rounded-md'/>
                <div className='flex flex-row items-center justify-evenly gap-8 w-full mt-4 pr-2'>
                    {amounts.map((amount,index)=>(
                        <button
                        key={index}
                        type='button'
                        onClick={()=>{setSelectedAmount(amount);
                            setCustomAmount('');
                        }
                        }
                        className={`px-2 py-2 rounded-xl text-sm border transition${selectedAmount===amount?
                            "bg-blue-800 text-black border-green-600"
                            :"bg-gray-200 text-black border-blue-800 hover:bg-gray-400"}`}>
                            {amount}
                        </button>

                    ))}
                    </div>
                <input type="number"
                    name='phoneNumber'
                    onChange={(e)=>{setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                    }}
                    value={customAmount}
                    placeholder='Enter Amount'
                    min={50}
                    className='w-full  p-2 border border-black/50 rounded-md mt-4'
                />
            </div>  
            <button className='w-full px-6 py-3 bg-blue-800 rounded-md text-white hover:bg-green-500'>BUY</button>
            </form>


         
        </section>
    </>
  );
};

export default Airtime;