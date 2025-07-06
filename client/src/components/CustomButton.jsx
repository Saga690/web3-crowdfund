import React from 'react'

const CustomButton = ({btnType, title, handleClick, styles}) => {
  
  return (
    <button type='{btnType}' className={`px-4 rounded-[10px] outline-none font-semibold text-[16px] leading-[26px] text-white min-h-[52px] ${styles}`} onClick={handleClick}>
      {title}
    </button>
  )
}

export default CustomButton