'use client'

import Image from 'next/image'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Avatar from 'react-avatar';

function Header() {
    return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2x1'>
            <Image
                src="https://links.papareact.com/c2cdd5"
                alt="Trello logo"
                width={300}
                height={100}
                className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
            />
            <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                {/* Box Search */}
                <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                    <input type="text" placeholder='Search' className='flex-1 outline-none p-2'/>
                    <button type='submit' hidden>Search</button>
                </form>

                {/* Avatar profile */}
                <Avatar name='Angel Vivas' round size='50' color='#0055d1'/>
            </div>
        </div>
    </header>
    );
}

export default Header;