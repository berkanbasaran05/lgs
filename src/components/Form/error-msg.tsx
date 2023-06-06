import React, { FC } from 'react'

type ErrorProps = {
    error?:string
}

const ErrorMsg: FC<ErrorProps> = ({  error }) =>  {
  return (
    <p style={{color:'red'}}>{error}</p> 
  )
}

export default ErrorMsg;