import React from 'react'
interface SideContentProps {
    title : string
    message : string
    children?: React.ReactNode
}
const SideContent = ({ title, message, children }: SideContentProps) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 h-full bg-white">
        <h1 className='text-4xl font-bold'>DevConnect</h1>
        <h2 className='text-blue-500 mt-5'>{title}</h2>
        <p className='font-semibold'>{message}</p>
      </div>
      <main className="flex justify-center items-center w-1/2 h-full bg-gray-50">
        {children}
      </main>
    </div>
  )
}

export default SideContent
