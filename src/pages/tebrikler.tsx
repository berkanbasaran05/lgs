import Header from '@/components/Typography/Header'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ReactConfetti from 'react-confetti'
import Confetti from 'react-confetti/dist/types/Confetti'
import { useWindowSize } from 'usehooks-ts'

type Props = {}

const tebrikler = (props: Props) => {
  const { width, height } = useWindowSize()

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white text-black justify-between p-6 `}
    >
      <a href="https://www.cihangir.k12.tr/">
      <Image
        src="/assets/logo/logo-1.png"
        width={150}
        height={150}
        alt="logo"
      />
      </a>
       <ReactConfetti
      width={width}
      height={height}
    />
      
      <div className="w-full md:w-3/4 relative  justify-center items-center backdrop-blur-md  mt-24  space-y-10   p-14 md:p-14  rounded-2xl shadow-2xl ">
        <div className=' flex items-center justify-center'>
        <Header variant="h2" >
        Teşekkür ederiz
        </Header>
        </div>
        <div className='flex items-center justify-center'>
        <Header variant="h2" >
       Kaydınız alınmıştır. Tarafınıza en kısa sürede dönüş yapılacaktır. 
        </Header>
        </div>
      </div>

      <footer className="mt-4 text-xs text-gray-500" >
       <a href='https://www.cihangir.k12.tr/'> ©2023. Cihangir Okulları - Tüm hakları saklıdır.</a>
      </footer>
    </main>
  )
}

export default tebrikler