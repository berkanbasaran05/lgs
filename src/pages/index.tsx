import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { FormFooter, Input, Select } from "@/components/FormElements";
import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import * as Yup from "yup";
import Header from "../components/Typography/Header";
import Spinner from "@/components/Loading/Spinner";
import LGSForm from "@/components/Form/LGSForm";




export default function Home() {
  

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
      <Header variant="h1" className="mt-12 text-brand-palette-primary ">
        LGS PUANINI HEMEN HESAPLA, BURSUNU ÖĞREN!
      </Header>
      <Header variant="h5" className="items-center mt-4 text-brand-red-primary">
        {" "}
        Cihangir Okulları   LGS'de başarılı olan öğrencilere %100'e varan burs
        imkanı sağlayarak başarıyı ödüllendiriyor.
      </Header>

      <div className="w-full md:w-3/4 relative  justify-center items-center backdrop-blur-md min-h-screen mt-24   p-3 md:p-12  rounded-2xl shadow-2xl ">
        <LGSForm></LGSForm>
      </div>

      <footer className="mt-4 text-xs text-gray-500" >
       <a href='https://www.cihangir.k12.tr/'> ©2024. Cihangir Okulları - Tüm hakları saklıdır.</a>
      </footer>
    </main>
  );
}
