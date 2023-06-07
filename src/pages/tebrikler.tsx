import Header from '@/components/Typography/Header'
import Image from 'next/image'
import React from 'react'

type Props = {}

const tebrikler = (props: Props) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white text-black justify-between p-6 `}
    >
      <Image
        src="/assets/logo/logo-1.png"
        width={150}
        height={150}
        alt="logo"
      ></Image>
      
      <div className="w-full md:w-3/4 relative  justify-center items-center backdrop-blur-md  mt-24  space-y-10   p-14 md:p-14  rounded-2xl shadow-2xl ">
        <div className='items-center justify-center'>
        <Header variant="h5" >
        Teşekkür ederiz
        </Header>
        </div>
        <div className='items-center justify-center'>
        <Header variant="h5" >
       Kaydınız alınmıştır. Tarafınıza en kısa sürede dönüş yapılacaktır 
        </Header>
        </div>
      </div>

      <footer className="mt-4 text-xs text-gray-500">
        ©2023. Cihangir Okulları - Tüm hakları saklıdır.
      </footer>
    </main>
  )
}

export default tebrikler