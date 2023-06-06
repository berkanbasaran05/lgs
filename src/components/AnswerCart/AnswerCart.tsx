import React, { InputHTMLAttributes ,FC, ChangeEvent} from 'react'
import { Input } from '../FormElements'

export interface  AnswerCartProps {
    props?: InputHTMLAttributes<HTMLInputElement>;
    label?:string;
    correctvalue?:string;
    wrongvalue?:string;
    
    wrongonChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AnswerCart: FC<AnswerCartProps> = ({ props,label,correctvalue,wrongvalue ,wrongonChange}) => {
  return (
    <div className='flex flex-row space-x-4 items-center justify-between  text-xs p-4 w-full shadow-md rounded-2xl'>
    <div className='w-[200px] md:w-[300px]'><span  className='text-[8px] md:text-[12px] '>{label}</span> </div>
    <div className='flex flex-row space-x-4 w-[300px]'>
    <Input
          
          props={{
            className:
              'bg-transparent  text-center  text-black px-1 py-2 p-4 disabled:opacity-80 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary',
           
            placeholder: 'Doğru',
            type: 'text',
            value: correctvalue,
            
           
          }}
          
        />
    
    <Input
          props={{
            className:
              'bg-transparent  text-center px-1 disabled:opacity-80 py-2 w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded-xl focus:ring-brand-palette-primary focus:ring-1 focus:outline-none focus:border-brand-palette-primary',
            
            placeholder: 'Yanlış',
            type: 'number',
            value: wrongvalue,
            onChange:wrongonChange
            
  
          }}
          
        />
    </div>
    <span  className='text-[8px]' style={{ whiteSpace: 'nowrap' }}>Net Cevap :  </span>  
    </div>
  )
}

export default AnswerCart