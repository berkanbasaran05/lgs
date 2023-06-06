import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ErrorMsg from './error-msg';
import * as Yup from 'yup';
import Header from '../Typography/Header';

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
  turkishCorrectAnswer: Yup.number().required('Türkçe doğru cevabını giriniz.'),
  historyCorrectAnswer: Yup.number().required('Tarih doğru cevabını giriniz.'),
  religionCorrectAnswer: Yup.number().required('Din kültürü doğru cevabını giriniz.'),
  foreignLanguageCorrectAnswer: Yup.number().required('Yabancı dil doğru cevabını giriniz.'),
  mathPointCorrectAnswer: Yup.number().required('Matematik doğru cevabını giriniz.'),
  sciencePointCorrectAnswer: Yup.number().required('Fen bilimleri doğru cevabını giriniz.'),
  turkishWrongAnswer: Yup.number().required('Türkçe yanlış cevabını giriniz.'),
  historyWrongAnswer: Yup.number().required('Tarih yanlış cevabını giriniz.'),
  religionWrongAnswer: Yup.number().required('Din kültürü yanlış cevabını giriniz.'),
  foreignLanguageWrongAnswer: Yup.number().required('Yabancı dil yanlış cevabını giriniz.'),
  mathPointWrongAnswer: Yup.number().required('Matematik yanlış cevabını giriniz.'),
  sciencePointWrongAnswer: Yup.number().required('Fen bilimleri yanlış cevabını giriniz.')
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
  const opendiv = () => {
   setopen(!open)
  }
  const {
    handleChange,
    handleSubmit,
    handleBlur,
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
      turkishCorrectAnswer: 0,
      historyCorrectAnswer: 0,
      religionCorrectAnswer: 0,
      foreignLanguageCorrectAnswer: 0,
      mathPointCorrectAnswer: 0,
      sciencePointCorrectAnswer: 0,

turkishWrongAnswer: 0,
historyWrongAnswer: 0,
religionWrongAnswer: 0,
foreignLanguageWrongAnswer: 0,
mathPointWrongAnswer: 0,
sciencePointWrongAnswer: 0
},
onSubmit: async (values, { resetForm }) => {
try {
await axios.post('http://localhost:8080/lgs-sonuc', values);
toast.success('Sınav Cevaplarınız Başarıyla İletildi.Size Tarafımızdan Dönüş Sağlanacaktır.', {
position: 'top-left'
});
resetForm();
handlePageRefresh();
} catch (error) {
toast.error('Mesaj gönderilirken bir hata oluştu.');
console.log(error);
}
},
validationSchema: lgsSchema
});
        
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
              placeholder="Türkçe Yanlış Cevap"
              required
            />
             </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
             Net Doğru: {Math.max(0, values.turkishCorrectAnswer - values.turkishWrongAnswer / 3).toFixed(2)}
              
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
               placeholder=""
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
              placeholder=""
              required
            />
            </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px] font-normal"
              style={{ whiteSpace: "nowrap" }}
            >
              Net Doğru: {Math.max(0, values.historyCorrectAnswer - values.historyWrongAnswer / 3).toFixed(2)}
              
            </span>

        
        </div>
        
        <div className='flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl'>
        <div className="w-[200px] md:w-[300px]">
              <span className="text-[8px] md:text-[12px]  font-normal">
              Din Kültürü ve Ahlak Bilgisi (10 Soru)
              </span>{" "}
            </div>
            <div className="flex flex-row space-x-4 w-[300px]">
            <div className='flex flex-col'>
              <span>Doğru</span>
            <input
               className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
               value={values.religionCorrectAnswer}
               onChange={handleChange}
               onBlur={handleBlur}
               name="religionCorrectAnswer"
               type="number"
               placeholder=""
               required
             />
            </div>
            <div className='flex flex-col'>
              <span>Yanlış</span>
              <input
             className="bg-transparent  text-center  px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary"
              value={values.religionWrongAnswer}
              onChange={handleChange}
              onBlur={handleBlur}
              name="religionWrongAnswer"
              type="number"
              placeholder=""
              required
            />
            </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
              Net Doğru: {Math.max(0, values.religionCorrectAnswer - values.religionWrongAnswer / 3).toFixed(2)}
              
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
              placeholder=""
              required
            />
            </div>
                

            </div>
            <span
              className="text-[10px] md:text-[12px]"
              style={{ whiteSpace: "nowrap" }}
            >
               Net Doğru: {Math.max(0, values.foreignLanguageCorrectAnswer - values.foreignLanguageWrongAnswer / 3).toFixed(2)}

              
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
               Net Doğru: {Math.max(0, values.mathPointCorrectAnswer - values.mathPointWrongAnswer / 3).toFixed(2)}
             
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
            type="number"
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
              Net Doğru: {Math.max(0, values.sciencePointCorrectAnswer - values.sciencePointWrongAnswer / 3).toFixed(2)}
              
            </span>
          </div>


        









      
      
      
        
      {!open && (
           <button
              type='button'
              className="p-4  bg-brand-palette-primary text-white items-center justify-center text-center text-sm rounded-xl px-4 py-4  mt-12 mb-12 w-3/4 shadow-md  hover:text-white"
              onClick={opendiv}
              
              
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
                        placeholder="Veli Adı"
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
                  <span className="text-[8px] md:text-[12px] font-normal ">
                    Kişisel verilere ilişkin beyan ve rıza onay formunu okudum,
                    onaylıyorum.
                  </span>{" "}
                </div>
                <div className="flex flex-row space-x-4">
                  
                </div>
              </div>

        <button type="submit" className="p-4 bg-brand-palette-primary text-white rounded-2xl w-2/4">
       
      Gönder
</button>
        </>
      )}

   <div className='flex flex-col mt-8 items-start text-sm space-y-1'>
   <span>• 2023 MEB LGS sınav istatistikleri (net ortalamaları ve standart sapma değerleri) kullanılarak puan hesaplaması yapılmaktadır. Dolayısıyla tüm puan hesaplama uygulamaları tahmini olacaktır.</span>
<span>• Sistemi kullanarak alacağınız puan tahmini puandır, kanuni bağlayıcılığı yoktur.</span>
<span>• Sınavın kolay olması durumunda puanlar düşer, zor olması durumunda puanlar yükselir.</span>
<span>• Yerleştirme sisteminde önemli olan aldığınız puan değil, tüm sınava girenler içindeki sıralamanızdır.</span>
   </div>

      
</form>
);
};

export default LGSForm;    



