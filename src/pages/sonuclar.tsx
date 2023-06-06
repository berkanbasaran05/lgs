import Badge from '@/components/Badge';
import CustomSuspense from '@/components/CustomSuspense'
import { TableFallback } from '@/components/Loading';
import DataTable, { DataTableProps } from '@/components/Table/DataTable';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export type ResultType = {
    parentName: string;
  parentPhone: string;
  parentEmail: string;
  studentName: string;
  campus: string;
  turkishCorrectAnswer: number;
  historyCorrectAnswer: number;
  religionCorrectAnswer: number;
  foreignLanguageCorrectAnswer: number;
  mathPointCorrectAnswer: number;
  sciencePointCorrectAnswer: number;
  turkishWrongAnswer: number;
  historyWrongAnswer: number;
  religionWrongAnswer: number;
  foreignLanguageWrongAnswer: number;
  mathPointWrongAnswer: number;
  sciencePointWrongAnswer: number;
  };

const sonuclar = () => {
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
        setHalls(data);
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

       <Image
        src="/assets/logo/logo-1.png"
        width={150}
        height={150}
        alt="logo"
      ></Image>

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
        <footer className="mt-4 text-xs text-gray-500">
        ©2023. Cihangir Okulları - Tüm hakları saklıdır.
      </footer>
    </main>
  )
}

export default sonuclar