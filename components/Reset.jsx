import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'
import { Button,TextField,IconButton,InputAdornment } from '@mui/material';
import styles from '../styles/Username.module.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')
  const [showPassword,setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd: ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values)
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/password') })

    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width : "50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>
          {/* removed py-20 from form className */}
          <form className='' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
              <TextField label="New Password" {...formik.getFieldProps('password')} className={styles.textbox} placeholder='New Password' type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>)}} />
                  <TextField label="Repeat Password" {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} placeholder='Repeat Password' type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>)}} />
                  
                  {/* <TextField label="Password" {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' /> */}
                  
                  {/* <TextField label="Repeat Password" {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat Password' /> */}
                  <Button variant='contained' className={styles.btn} type='submit'>Reset</Button>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
