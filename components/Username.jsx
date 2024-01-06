import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../src/assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
import { Button,TextField } from '@mui/material'
import styles from '../styles/Username.module.css';


export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center mt-16'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center px-4 py-4">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  {/* <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' /> */}

                  <TextField {...formik.getFieldProps('username')} type='text' label="Username" placeholder='Username' className={styles.textbox}/>
                  <Button variant='contained' className={styles.btn} type='submit'>Let's Go</Button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}