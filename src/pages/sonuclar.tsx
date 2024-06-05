import Badge from '@/components/Badge';
import CustomSuspense from '@/components/CustomSuspense'
import { TableFallback } from '@/components/Loading';
import DataTable, { DataTableProps } from '@/components/Table/DataTable';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {CSVLink} from 'react-csv';

export type ResultType = {
  _id:number;
  studentName: string;
  
  turkishCorrectAnswer: number;
  turkishWrongAnswer: number;
  historyCorrectAnswer: number;
  historyWrongAnswer: number;
  religionCorrectAnswer: number;
  religionWrongAnswer: number;
  foreignLanguageCorrectAnswer: number;
  foreignLanguageWrongAnswer: number;
  mathPointCorrectAnswer: number;
  mathPointWrongAnswer: number;
  sciencePointCorrectAnswer: number;
  sciencePointWrongAnswer: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  campus: string;
   };

const sonuclar = () => {
    

  const exportHeaders = [
    { label: 'Öğrenci Adı', key: 'studentName' },
    { label: 'Türkçe Doğru', key: 'turkishCorrectAnswer' },
    { label: 'Türkçe Yanlış', key: 'turkishWrongAnswer' },
    { label: 'İnkılap Doğru', key: 'historyCorrectAnswer' },
    { label: 'İnkılap Yanlış', key: 'historyWrongAnswer' },
    { label: 'Din Kültürü Doğru', key: 'religionCorrectAnswer' },
    { label: 'Din Kültürü Yanlış', key: 'religionWrongAnswer' },
    { label: 'Yabancı Dil Doğru', key: 'foreignLanguageCorrectAnswer' },
    { label: 'Yabancı Dil Yanlış', key: 'foreignLanguageWrongAnswer' },
    { label: 'Matematik Doğru', key: 'mathPointCorrectAnswer' },
    { label: 'Matematik Yanlış', key: 'mathPointWrongAnswer' },
    { label: 'Fen Bilimleri Doğru', key: 'sciencePointCorrectAnswer' },
    { label: 'Fen Bilimleri Yanlış', key: 'sciencePointWrongAnswer' },
    { label: 'Veli Cep', key: 'parentPhone' },
    { label: 'Veli E-Mail', key: 'parentEmail' },
    { label: 'Veli Adı', key: 'parentName' },
    { label: 'Kampüs', key: 'campus' },
  ];
  





    const columns: DataTableProps<ResultType>['columns'] = [
        {
            key: 'öğrenci',
            header: () => 'Öğrenci Adı',
            cell: (row) => <> {row.studentName}</>
        },
        
        
        {
            key: 'turkish',
            header: () => 'Türkçe',
            cell: (row) => (
              <>
                <Badge text={`${row.turkishCorrectAnswer} Doğru`} color="green" />
                <Badge text={`${row.turkishWrongAnswer} Yanlış`} color="red" />
              </>
            )
          },
          {
            key: 'history',
            header: () => 'Inkilap',
            cell: (row) => (
              <>
                <Badge text={`${row.historyCorrectAnswer} Doğru`} color="green" />
                <Badge text={`${row.historyWrongAnswer} Yanlış`} color="red" />
              </>
            )
          },
          {
            key: 'religion',
            header: () => 'Din Kültürü',
            cell: (row) => (
              <>
                <Badge text={`${row.religionCorrectAnswer} Doğru`} color="green" />
                <Badge text={`${row.religionWrongAnswer} Yanlış`} color="red" />
              </>
            )
          },
          {
            key: 'foreignLanguage',
            header: () => 'Yabancı Dil',
            cell: (row) => (
              <>
                <Badge text={`${row.foreignLanguageCorrectAnswer} Doğru`} color="green" />
                <Badge text={`${row.foreignLanguageWrongAnswer} Yanlış`} color="red" />
              </>
            )
          },
          {
            key: 'matematik',
            header: () => 'Mat',
            cell: (row) => <><Badge text={`${row.mathPointCorrectAnswer} Doğru `} color="green" /><Badge text={`${row.mathPointWrongAnswer} Yanlış `} color="red" /></>
          },
         { 
            key:'Fen bilimleri',
            header : ()=> 'Fen Bilimleri',
            cell: (row) => <><Badge text={`${row.sciencePointCorrectAnswer} Doğru `} color="green" /><Badge text={`${row.sciencePointWrongAnswer} Yanlış `} color="red" /></>

         },
         {
          key : 'velicep',
          header : () =>'Veli Cep',
          cell: (row) => <> {row.parentPhone}</>

      },
      {
          key : 'veliemail',
          header : () =>'Veli E-Mail',
          cell: (row) => <> {row.parentEmail}</>

      },
      {
        key: 'title',
        header: () => 'Veli Adı',
        cell: (row) => <> {row.parentName}</>
      },
     
      
      {
        key: 'city',
        header: () => 'Kampüs',
        cell: (row) => (
          <>
            {' '}
            {row.campus}
          </>
        )
      },
      ];
    const router = useRouter();
    const [halls, setHalls] = useState<ResultType[] | undefined>();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notFilteredHalls, setNotFilteredHalls] = useState<
      ResultType[] | undefined
    >();
    const fetcher = async () => {
      setHalls(undefined);
      setError(false);
      setLoading(true);
      try {
        const { data } = await axios.get(`https://cihangir.onrender.com/lgs-sonuc`);
        setHalls(data.sort((a:any, b:any) => a._id - b._id));
        setNotFilteredHalls(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetcher();
    }, []);
   
  
  return (
    <main 
    className={`flex min-h-screen flex-col items-center bg-white text-black justify-between p-6 `}>

      <a href="https://www.cihangir.k12.tr/">
      <Image
        src="/assets/logo/logo-1.png"
        width={150}
        height={150}
        alt="logo"
      />
      </a>
         
        
      {halls && (
  <CSVLink
    data={halls.map(({ _id, ...rest }) => rest)} // ID özelliğini kaldırarak sadece diğer özellikleri tutuyoruz
    headers={exportHeaders}
    filename="cihangirokullari.csv"
    >
    <span className='p-4 bg-brand-palette-primary text-white items-center justify-center text-center text-sm rounded-xl px-4 py-4 mt-12 mb-12 w-3/4 shadow-md hover:text-white'>Excel Olarak Çıktı Al</span>
  </CSVLink>
)}
        
        <CustomSuspense
          isError={error}
          isLoading={loading}
          fallback={<TableFallback />}
          emptyMessage="Kayıt bulunamadı"
          data={halls}>
          {(rendered) => (
            <DataTable dataSet={10} columns={columns} rows={rendered} />
          )}
          
        </CustomSuspense>
   
        <footer className="mt-4 text-xs text-gray-500" >
       <a href='https://www.cihangir.k12.tr/'> ©2024. Cihangir Okulları - Tüm hakları saklıdır.</a>
      </footer>
    </main>
  )
}

export default sonuclar