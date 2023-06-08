import { useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ErrorMsg from './error-msg';
import * as Yup from 'yup';
import Header from '../Typography/Header';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { FormFooter } from '../FormElements';
import Button from '../Button';

interface FormValues {
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
}

const lgsSchema = Yup.object().shape({
  parentName: Yup.string().required('Veli adını giriniz.'),
  parentPhone: Yup.string().required('Veli telefonunu giriniz.'),
  parentEmail: Yup.string().email('Geçerli bir e-posta adresi giriniz.').required('Veli e-posta adresini giriniz.'),
  studentName: Yup.string().required('Öğrenci adını giriniz.'),
  campus: Yup.string().required('Kampüs adını giriniz.'),
  turkishCorrectAnswer: Yup.number()
    .max(20, 'Türkçe doğru cevap sayısı 20\'yi geçemez.')
    .required('Türkçe doğru cevabını giriniz.'),
  turkishWrongAnswer: Yup.number()
    .max(20, 'Türkçe yanlış cevap sayısı 20\'yi geçemez.')
    .required('Türkçe yanlış cevabını giriniz.'),

  historyCorrectAnswer: Yup.number().required('Tarih doğru cevabını giriniz.'),
  religionCorrectAnswer: Yup.number().required('Din kültürü doğru cevabını giriniz.'),
  foreignLanguageCorrectAnswer: Yup.number().required('Yabancı dil doğru cevabını giriniz.'),
  mathPointCorrectAnswer: Yup.number().required('Matematik doğru cevabını giriniz.').typeError(''),
  sciencePointCorrectAnswer: Yup.number().required('Fen bilimleri doğru cevabını giriniz.').typeError(''),
  historyWrongAnswer: Yup.number().required('Tarih yanlış cevabını giriniz.'),
  religionWrongAnswer: Yup.number().required('Din kültürü yanlış cevabını giriniz.'),
  foreignLanguageWrongAnswer: Yup.number().required('Yabancı dil yanlış cevabını giriniz.'),
  mathPointWrongAnswer: Yup.number().required('Matematik yanlış cevabını giriniz.').typeError(''),
  sciencePointWrongAnswer: Yup.number().required('Fen bilimleri yanlış cevabını giriniz.').typeError('')
});

const LGSForm = () => {
  const campuses = [
    {
      value: 1,
      text: "Atakent",
    },
    {
      value: 2,
      text: "Bahçeşehir",
    },
    {
      value: 3,
      text: "Büyükçekmece",
    },
    { value: 4, text: "Çekmeköy" },
    { value: 5, text: "Kayseri" },
  ];
  const [open, setopen] = useState(false);
  const handlePageRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 4000); // 4 san
  };
  const router = useRouter();

  const opendiv = () => {
   setopen(!open)
  }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    errors,
    values,
    touched
  } = useFormik<FormValues>({
    initialValues: {
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      studentName: '',
      campus: '',
      turkishCorrectAnswer: NaN,
      historyCorrectAnswer: NaN,
      religionCorrectAnswer: NaN,
      foreignLanguageCorrectAnswer: NaN,
      mathPointCorrectAnswer: NaN,
      sciencePointCorrectAnswer: NaN,

turkishWrongAnswer: NaN,
historyWrongAnswer: NaN,
religionWrongAnswer: NaN,
foreignLanguageWrongAnswer: NaN,
mathPointWrongAnswer: NaN,
sciencePointWrongAnswer: NaN
},
onSubmit: async (values, { resetForm }) => {
  
try {
  setLoading(true); 
await axios.post('https://cihangir.onrender.com/lgs-sonuc', values);
toast.success('Sınav Cevaplarınız Başarıyla İletildi.Yönlendiriliyorsunuz.', {
position: 'top-center'
});
resetForm();
setTimeout(() => {
  router.push('/tebrikler')
}, 3000); 
} catch (error) {
toast.error('Mesaj gönderilirken bir hata oluştu.',{position:'top-center'});
console.log(error);

}finally{
  setLoading(false);
}
},



validationSchema: lgsSchema
});
const [loading, setLoading] = useState(false);
const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
  const { name, value } = event.target;

  if (
    name === 'turkishCorrectAnswer' ||
    name === 'turkishWrongAnswer' ||
    name === 'religionCorrectAnswer' ||
    name === 'religionWrongAnswer' ||
    name === 'historyCorrectAnswer' ||
    name === 'historyWrongAnswer'||
    name === 'foreignLanguageCorrectAnswer' ||
    name === 'foreignLanguageWrongAnswer'||
    name === 'sciencePointCorrectAnswer' ||
    name === 'sciencePointWrongAnswer'||
    name === 'mathPointCorrectAnswer' ||
    name === 'mathPointWrongAnswer'
  ) {
    const maxTurkishQuestionCount = 21;
    const maxHistoryQuestionCount = 10;
    const maxsciencePointQuestionCount = 21;
    const maxmathPointQuestionCount = 21;
    const maxreligionQuestionCount = 10;
    const maxforeignLanguageQuestionCount = 10;

    if (/^\d+$/.test(value)) { // Sadece sayıya izin veren kontrol
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        if (name === 'turkishCorrectAnswer' || name === 'turkishWrongAnswer') {
          const turkishCorrectAnswer = parseInt(String(values.turkishCorrectAnswer), 10) || 0;
          const turkishWrongAnswer = parseInt(String(values.turkishWrongAnswer), 10) || 0;
          const turkishTotal = turkishCorrectAnswer + turkishWrongAnswer + parsedValue;

          if (turkishTotal <= maxTurkishQuestionCount || parsedValue === maxTurkishQuestionCount -1) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, 0); // Geçersiz değer olduğunda sıfırla
          }
        } else if (name === 'historyCorrectAnswer' || name === 'historyWrongAnswer') {
          const historyCorrectAnswer = parseInt(String(values.historyCorrectAnswer), 10) || 0;
          const historyWrongAnswer = parseInt(String(values.historyWrongAnswer), 10) || 0;
          const historyTotal = historyCorrectAnswer + historyWrongAnswer + parsedValue;

          if (historyTotal <= maxHistoryQuestionCount || parsedValue === maxHistoryQuestionCount) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
          }
        } else if (name === 'sciencePointCorrectAnswer' || name === 'sciencePointWrongAnswer') {
          const sciencePointCorrectAnswer = parseInt(String(values.sciencePointCorrectAnswer), 10) || 0;
          const sciencePointWrongAnswer = parseInt(String(values.sciencePointWrongAnswer), 10) || 0;
          const sciencePointTotal = sciencePointCorrectAnswer + sciencePointWrongAnswer + parsedValue ;

          if (sciencePointTotal <= maxsciencePointQuestionCount || parsedValue === maxsciencePointQuestionCount - 1) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
          }
        }
        else if (name === 'mathPointCorrectAnswer' || name === 'mathPointWrongAnswer') {
          const mathPointCorrectAnswer = parseInt(String(values.mathPointCorrectAnswer), 10) || 0;
          const mathPointWrongAnswer = parseInt(String(values.mathPointWrongAnswer), 10) || 0;
          const mathPointTotal = mathPointCorrectAnswer + mathPointWrongAnswer + parsedValue;

          if (mathPointTotal <= maxmathPointQuestionCount  || parsedValue === maxmathPointQuestionCount -1) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
          }
        }
        else if (name === 'religionCorrectAnswer' || name === 'religionWrongAnswer') {
          const religionCorrectAnswer = parseInt(String(values.religionCorrectAnswer), 10) || 0;
          const religionWrongAnswer = parseInt(String(values.religionWrongAnswer), 10) || 0;
          const religionTotal = religionCorrectAnswer + religionWrongAnswer + parsedValue;

          if (religionTotal <= maxreligionQuestionCount || parsedValue === maxreligionQuestionCount) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
          }
        } else if (name === 'foreignLanguageCorrectAnswer' || name === 'foreignLanguageWrongAnswer') {
          const foreignLanguageCorrectAnswer = parseInt(String(values.foreignLanguageCorrectAnswer), 10) || 0;
          const foreignLanguageWrongAnswer = parseInt(String(values.foreignLanguageWrongAnswer), 10) || 0;
          const foreignLanguageTotal = foreignLanguageCorrectAnswer + foreignLanguageWrongAnswer + parsedValue;

          if (foreignLanguageTotal <= maxforeignLanguageQuestionCount || parsedValue === maxforeignLanguageQuestionCount  ) {
            setFieldValue(name as keyof FormValues, parsedValue.toString()); // Değeri string olarak ayarla
          } else {
            setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
          }
        }
        
      } else {
        setFieldValue(name as keyof FormValues, ''); // Geçersiz değer olduğunda sıfırla
      }
    } else {
      setFieldValue(name as keyof FormValues, ''); // Harf girildiğinde sıfırla
    }
  } else {
    setFieldValue(name as keyof FormValues, value); // Diğer alanlara doğrudan değeri ayarla
  }
};


const calculateNetCorrect = (correctAnswer: number, wrongAnswer: number): number => {
  const netCorrect = Math.max(0, (correctAnswer - wrongAnswer / 3));
  return isNaN(netCorrect) ? 0 : netCorrect;
};






        
        return (
        <form className="flex flex-col  items-center space-y-4 mt-4 w-full" onSubmit={handleSubmit}>


          <Header variant="h5"> SÖZEL BÖLÜM - TOPLAM 50 SORU</Header>
      
        <div className='flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl'>
        <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px]  font-normal">
                Türkçe (20 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
            <div className='flex flex-col'>
              <span>Doğru</span>
            <input
               className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
               value={values.turkishCorrectAnswer}
               onChange={handleChange}
              
              
               onBlur={handleBlur}
               name="turkishCorrectAnswer"
               type="number"
               pattern="[0-9]*"
               placeholder="Türkçe Doğru Cevap"
               required
             />
            </div>
             <div className='flex flex-col'>
              <span>Yanlış</span>
             <input
             className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
              value={values.turkishWrongAnswer}
              onChange={handleChange}
              onBlur={handleBlur}
              name="turkishWrongAnswer"
              type="number"
              pattern="[0-9]*"
              placeholder="Türkçe Yanlış Cevap"
              required
            />
             </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
             Net Doğru: {isNaN(values.turkishCorrectAnswer) || isNaN(values.turkishWrongAnswer)
            ? 0
            : Math.max(-10, (values.turkishCorrectAnswer - values.turkishWrongAnswer / 3)).toFixed(2)}

              
            </span>

        
        </div>

        <div className='flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl'>
        <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px]  font-normal">
              T.C. İnkılâp Tarihi ve Atatürkçülük (10 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
            <div className='flex flex-col'>
              <span>Doğru</span>
              <input
               className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
               value={values.historyCorrectAnswer}
               onChange={handleChange}
               onBlur={handleBlur}
               name="historyCorrectAnswer"
               type="number"
               max='10'
               placeholder=""
               pattern="[0-9]*"
               required
             />

            </div>
            <div className='flex flex-col'>
              <span>Yanlış</span>
              <input
             className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
              value={values.historyWrongAnswer}
              onChange={handleChange}
              onBlur={handleBlur}
              name="historyWrongAnswer"
              type="number"
              pattern="[0-9]*"
              placeholder=""
              required
            />
            </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px] font-normal"
              style={{ whiteSpace: "nowrap" }}
            >
              Net Doğru: {isNaN(values.historyCorrectAnswer) || isNaN(values.historyWrongAnswer)
            ? 0
            : Math.max(-10, (values.historyCorrectAnswer - values.historyWrongAnswer / 3)).toFixed(2)}

              
            </span>

        
        </div>
        
        <div className='flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl'>
  <div className="w-[200px] md:w-[300px]">
    <span className="text-[8px] md:text-[12px]  font-normal">
      Din Kültürü ve Ahlak Bilgisi (10 Soru)
    </span>{" "}
  </div>
  <div className="flex flex-row space-x-4 w-[300px]">
    <div className='flex flex-col'>
      <span>Doğru</span>
      <input
        className="bg-transparent  text-center px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
        value={values.religionCorrectAnswer}
        onChange={handleChange}
        onBlur={handleBlur}
        name="religionCorrectAnswer"
        type="number"
        pattern="[0-9]*"
        placeholder=""
        required
      />
    </div>
    <div className='flex flex-col'>
      <span>Yanlış</span>
      <input
        className="bg-transparent text-center px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
        value={values.religionWrongAnswer}
        onChange={handleChange}
        onBlur={handleBlur}
        name="religionWrongAnswer"
        type="number"
        pattern="[0-9]*"
        placeholder=""
        // Adım değeri 1 olarak ayarlandı
        required
      />
    </div>
  </div>
  <span
    className="text-[10px] md:text-[12px]"
    style={{ whiteSpace: "nowrap" }}
  >
    Net Doğru: {isNaN(values.religionCorrectAnswer) || isNaN(values.religionWrongAnswer)
  ? 0
  : Math.max(-10, (values.religionCorrectAnswer - values.religionWrongAnswer / 3)).toFixed(2)}

  </span>
</div>


        <div className='flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl'>
        <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px]  font-normal">
              Yabancı Dil (10 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
            <div className='flex flex-col'>
              <span>Doğru</span>
            <input
               className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
               value={values.foreignLanguageCorrectAnswer}
               onChange={handleChange}
               onBlur={handleBlur}
               name="foreignLanguageCorrectAnswer"
               type="number"
               pattern="[0-9]*"
               placeholder=""
               required
             />
            </div>
            <div className='flex flex-col'>
              <span>Yanlış</span>
            <input
             className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
              value={values.foreignLanguageWrongAnswer}
              onChange={handleChange}
              onBlur={handleBlur}
              name="foreignLanguageWrongAnswer"
              type="number"
              pattern="[0-9]*"
              placeholder=""
              required
            />
            </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
              Net Doğru: {isNaN(values.foreignLanguageCorrectAnswer) || isNaN(values.foreignLanguageWrongAnswer)? 0 : Math.max(-10, values.foreignLanguageCorrectAnswer - values.foreignLanguageWrongAnswer / 3).toFixed(2)}

              
            </span>

        
        </div>




        <div className="mt-12">
            <Header variant="h5" className="uppercase mt-12">
              Sayısal Bölüm - Toplam 40 Soru
            </Header>
          </div>
      












          <div className="flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl">
            <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px] font-normal">
                Matematik (20 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
             <div className='flex flex-col'>
              <span>Doğru</span>
             <input
            value={values.mathPointCorrectAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            name="mathPointCorrectAnswer"
            type="number"
            pattern="[0-9]*"
            placeholder="Türkçe Doğru Cevap"
            required
            className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
          />
             </div>
           {touched.mathPointCorrectAnswer && <ErrorMsg error={errors.mathPointCorrectAnswer} />}

            <div className='flex flex-col'>
              <span>Yanlış</span>
            <input
            value={values.mathPointWrongAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            name="mathPointWrongAnswer"
            type="number"
            pattern="[0-9]*"
            placeholder="Türkçe Doğru Cevap"
            required
            className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
          />
            </div>
           {touched.mathPointWrongAnswer && <ErrorMsg error={errors.mathPointWrongAnswer} />}
            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
               Net Doğru: {isNaN(values.mathPointCorrectAnswer) || isNaN(values.mathPointWrongAnswer)
              ? 0
              : Math.max(-10, (values.mathPointCorrectAnswer - values.mathPointWrongAnswer / 3)).toFixed(2)}

             
            </span>
          </div>
          

          <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
            <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px] font-normal ">
                Fen Bilimleri (20 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
           <div className='flex flex-col'>
            <span>Doğru</span>
           <input
            value={values.sciencePointCorrectAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            name="sciencePointCorrectAnswer"
            type='number'
            pattern="[0-9]*"
            placeholder="Türkçe Doğru Cevap"
            required
            className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
          />
           </div>
           {touched.sciencePointCorrectAnswer && <ErrorMsg error={errors.sciencePointCorrectAnswer} />}
          
         <div className='flex flex-col'>
          <span>Yanlış</span>
         <input
            value={values.sciencePointWrongAnswer}
            onChange={handleChange}
            onBlur={handleBlur}
            name="sciencePointWrongAnswer"
            type="number"
            pattern="[0-9]*"
            placeholder="Türkçe Doğru Cevap"
            required
            className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
          />
         </div>
          
          
           {touched.sciencePointWrongAnswer && <ErrorMsg error={errors.sciencePointWrongAnswer} />}
              
            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
              Net Doğru: {isNaN(values.sciencePointCorrectAnswer) || isNaN(values.sciencePointWrongAnswer)
              ? 0
              : Math.max(-10, (values.sciencePointCorrectAnswer - values.sciencePointWrongAnswer / 3)).toFixed(2)}

            </span>
          </div>


        









      
      
      
        
          {!open && (
  <button
    type='button'
    className="p-4 bg-brand-palette-primary text-white items-center justify-center text-center text-sm rounded-xl px-4 py-4 mt-12 mb-12 w-3/4 shadow-md hover:text-white"
    onClick={() => {
      if (
        !values.turkishCorrectAnswer ||
        !values.historyCorrectAnswer ||
        !values.religionCorrectAnswer ||
        !values.foreignLanguageCorrectAnswer ||
        !values.mathPointCorrectAnswer ||
        !values.sciencePointCorrectAnswer ||
        !values.turkishWrongAnswer ||
        !values.historyWrongAnswer ||
        !values.religionWrongAnswer ||
        !values.foreignLanguageWrongAnswer ||
        !values.mathPointWrongAnswer ||
        !values.sciencePointWrongAnswer
      ) {
        toast.error('Lütfen Cevapları Giriniz',{position:'top-center'})
      } else {
        opendiv();
      }
    }}
  >
    Puanını Hesapla Ve Burs Fırsatlarını Gör
  </button>
)}

      {open && (
        
        <>
        <div className="mt-12">
                <Header variant="h5" className="uppercase mt-12">
                  İLETİŞİM BİLGİLERİ
                </Header>
              </div>
              <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
                <div className="w-[200px] md:w-[300px]">
                  <span className="text-[8px] md:text-[12px] font-normal ">
                    Velinin Adı Soyadı
                  </span>{" "}
                </div>
                <div className="flex flex-row space-x-4 w-[300px]">
                <input
                        className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                        value={values.parentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="parentName"
                        type="text"
                        placeholder="Veli Adıı"
                        required
                      />
                      {touched.parentName && <ErrorMsg error={errors.parentName} />}


                </div>
              </div>
              <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
                <div className="w-[200px] md:w-[300px]">
                  <span className="text-[8px] md:text-[12px] font-normal ">
                    Velinin Cep Telefonu
                  </span>{" "}
                </div>
                <div className="flex flex-row space-x-4 w-[300px]">
                <input
                        className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                        value={values.parentPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="parentPhone"
                        type="phone"
                        pattern="[0-9]*"
                        placeholder=""
                        required
                      />
                       {touched.parentPhone && <ErrorMsg error={errors.parentPhone} />}
                </div>
              </div>
              <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
                <div className="w-[200px] md:w-[300px]">
                  <span className="text-[8px] md:text-[12px] font-normal ">
                    Velinin E-Mail Adresi
                  </span>{" "}
                </div>
                <div className="flex flex-row space-x-4 w-[300px]">
                <input
                        className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                        value={values.parentEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="parentEmail"
                        type="email"
                        placeholder="Veli Email"
                        required
                      />
                       {touched.parentEmail && <ErrorMsg error={errors.parentEmail} />}
                </div>
              </div>
              <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
                <div className="w-[200px] md:w-[300px]">
                  <span className="text-[8px] md:text-[12px] font-normal ">
                    Öğrencinin Adı Soyadı
                  </span>{" "}
                </div>
                <div className="flex flex-row space-x-4 w-[300px]">
                <input
                        className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                        value={values.studentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="studentName"
                        type="text"
                        placeholder="Veli Adı"
                        required
                      />
                     {touched.studentName && <ErrorMsg error={errors.studentName} />}  
                </div>
              </div>
              <div className='flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl'>
              <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px] font-normal ">
                    Kampüs Seçiniz
                  </span>{" "}
                </div>
                <div className='flex flex-row space-x-4 w-[300px]'>
                <select
                  className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                  value={values.campus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="campus"
                  required
                >
                  <option value="" disabled>Kampüs Seçiniz</option>
                  {campuses.map((campus) => (
                    <option key={campus.value} value={campus.text} className=''>
                      {campus.text}
                    </option>
                  ))}
                </select>

        {touched.campus && <ErrorMsg error={errors.campus} />}
        </div>
              </div>
              <div className="flex flex-row space-x-4 items-center justify-between text-xs p-4 w-full shadow-md rounded-2xl">
                <div className="w-[200px] md:w-[300px]">
                  <Link href={'/'} className='text-[12px] font-thin'>  Kişisel verilere ilişkin beyan ve rıza onay formunu okudum,
                    onaylıyorum.</Link>
                </div>
                <div className="flex flex-row space-x-4">
                <input
                        className="bg-transparent  text-center  px-1 py-4 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
                        value={values.studentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="checkbox"
                        type="checkbox"
                        placeholder="Veli Adı"
                        required
                      />
                
                </div>
              </div>

              <Button
              loading={loading}
              fallback={
                <div className="flex relative items-center">
                  <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-current"
                      d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                    />
                  </svg>
                  <span className="ml-2 text-sm">Yükleniyor</span>
                </div>
              }
              type="submit"
              className="p-4 bg-brand-palette-primary text-white rounded-2xl w-2/4">
              <span className="ml-1.5 mr-1">Gönder</span>
            </Button>
        </>
      )}

   <div className='flex flex-col mt-8 items-start text-sm space-y-1'>
   <span>• 2022 MEB LGS sınav istatistikleri (net ortalamaları ve standart sapma değerleri) kullanılarak puan hesaplaması yapılmaktadır. Dolayısıyla tüm puan hesaplama uygulamaları tahmini olacaktır.</span>
<span>• Sistemi kullanarak alacağınız puan tahmini puandır, kanuni bağlayıcılığı yoktur.</span>
<span>• Sınavın kolay olması durumunda puanlar düşer, zor olması durumunda puanlar yükselir.</span>
<span>• Yerleştirme sisteminde önemli olan aldığınız puan değil, tüm sınava girenler içindeki sıralamanızdır.</span>
   </div>

      
</form>
);
};

export default LGSForm;    



