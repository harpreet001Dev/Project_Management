import React from 'react'

export const Button =(({label,type,onClick=()=>{}},ref)=>{
return(
    <div className='flex items-center justify-center mt-3'>
        <button className='bg-blue-500 text-center px-5 text-white rounded-md' type={label} onClick={onClick}>{label}</button>
    </div>
)
})
