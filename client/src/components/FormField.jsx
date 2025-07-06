import React from 'react'

const FormField = ({labelName, placeholder, inputType, isTextArea, value, handleChange}) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
        {labelName && (
            <span className='font-semibold text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
                {labelName}
            </span>
        )}
        {isTextArea ? (
            <textarea
                required
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                rows={10}
                className='bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] outline-none border-[1px] border-[#3a3a43] py-[15px] sm:px-[25px] sm:min-w-[300px]'
            />
        ) : (
            <input
                required
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                type={inputType}
                step="0.1"
                className='bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] outline-none border-[1px] border-[#3a3a43] py-[15px] sm:px-[25px] sm:min-w-[300px]'
            />
        )}
    </label>
  )
}

export default FormField