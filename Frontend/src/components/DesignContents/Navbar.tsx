import React from 'react'
import { Input } from '../ui/input'
import { Bell, House, Network, Send, UsersRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const user = useSelector((state: any) => state.auth.user);
    return (
        <div className='h-16 bg-white border-b p-12 flex items-center justify-between '>
            <div className='flex items-center gap-2 '>
                <img src="/logo.png" alt="DevConnect Logo" className='h-16' />
                <Input className='h-10 rounded-2xl' type='search' placeholder='Search' />
            </div>
            <div className='flex space-x-6'>
                <div className='flex flex-col items-center gap-1 hover:cursor-pointer hover:text-blue-500'>
                    <House  />
                    <span >Home</span>
                </div>
                <div className='flex flex-col items-center gap-1 hover:cursor-pointer  hover:text-blue-500'>
                    <Network />
                    <span>My Network</span>
                </div>
                <div className='flex flex-col items-center gap-1 hover:cursor-pointer  hover:text-blue-500'>
                    <UsersRound />
                    <span>Find Team</span>
                </div>
                <div className='flex flex-col items-center gap-1 hover:cursor-pointer  hover:text-blue-500'>
                    <Send />
                    <span>Messaging</span>
                </div>
                <div className='flex flex-col items-center gap-1 hover:cursor-pointer  hover:text-blue-500'>
                    <Bell />
                    <span>Notifications</span>
                </div>
            </div>
            <Link to={`/profile/${user.id}`}>
            <Avatar  className='hover:cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
        </div>
    )
}

export default Navbar

