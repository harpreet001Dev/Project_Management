import React from 'react'

const TextBox = React.forwardRef(({placeholder,label,name,type,register,error},ref)=>{
return(
    <div className='flex flex-col gap-1'>
        <input className='py-2 px-4 border-b focus:outline-none focus:border-blue-500'
        placeholder={placeholder}
        name={name}
        type={type}
        {...register}
        />
        {error && <span>{error}</span>}
    </div>
)
})

export default TextBox;