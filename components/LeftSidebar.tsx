
'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import { useAudio } from '@/providers/AudioProvider';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';


const LeftSidebar = () => {
    const { user } = useUser();
    const topPodcasters = useQuery(api.users.getTopUserByPodcastCount ); 
    

    const pathname= usePathname();
    const router = useRouter();
    const {signOut} = useClerk();
    const{audio} = useAudio();

const handleDynamicRoute = (profileId: string | undefined) => {
  // Navigate to the dynamic page using the userId
  window.location.href = `/profile/${profileId}`;
};


  return (
<section className={cn('left_sidebar h-[calc(100vh-5px)]',{'h-[calc(100vh-140px)]':audio?.audioUrl})}>
    <nav     className="flex flex-col gap-6">
        <Link href={'/'} className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
            <Image src="/icons/logo.svg" alt='logo' width={23} height={27}/>
            <h1 className='text-24 font-extrabold text-white max-lg:hidden'>Podster</h1>
        </Link>
        


        {sidebarLinks.map(({ route, label, imgURL,}) => {
            const isActive = pathname === route || pathname.startsWith(`${route}/`);
                    return <Link
                    className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                        'bg-nav-focus border-r-4 border-orange-1': isActive
                        })}
                        href={route}
                        key={label}
                        onClick={(e) => {
                        e.preventDefault();
                        if (route === '/profile') {
                            handleDynamicRoute(user?.id);
                        } else {
                            router.push(route);
                        }
                        }}
                    >
                        <Image src={imgURL} alt={label} width={24} height={24} />
                                <p>{label}</p>
                    </Link>
})}
       

    </nav>
    
    <SignedIn>
        <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
            <Button  className=' text-16 w-full bg-orange-1 font-extrabold' onClick={() => signOut(() => router.push('/sign-in'))}>
                Log Out
            </Button>
        </div>
    </SignedIn>
    <SignedOut>
        <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
            <Button asChild className=' text-16 w-full bg-orange-1 font-extrabold ' >

                <Link href='/sign-in'  className='text-16 text-white-1 font-bold'>Sign In</Link>
            </Button>
        </div>
    </SignedOut>
</section>
)
}

export default LeftSidebar