import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../src/assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper'
import {Button,TextField,InputAdornment,IconButton} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from '../styles/Username.module.css';
import { useAuthStore } from '../store/store';
export default function Register() {

  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [showPassword,setShowPassword] = useState(false)
  const formik = useFormik({

    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit : async values => {
      if(file){
        const formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset',"vtgp88wg")
        fetch(`https://api.cloudinary.com/v1_1/dxkxrii3x/image/upload`,{
          method: "POST",
          body: formData
        })
        .then(async (res) => {
          const data = await res.json()
          values = await Object.assign(values, { profile : data?.secure_url || ''})
          let registerPromise = registerUser(values)
          toast.promise(registerPromise, {
          loading: 'Creating...',
          success : <b>Register Successfully...!</b>,
          error : <b>Could not Register.</b>
          });
          registerPromise.then(function(){ navigate('/')});
        })
        .catch(async (err) => {
          console.log(err)
          values = await Object.assign(values, { profile : ''})
          let registerPromise = registerUser(values)
          toast.promise(registerPromise, {
            loading: 'Creating...',
            success : <b>Register Successfully...!</b>,
            error : <b>Could not Register.</b>
          })
          registerPromise.then(function(){ navigate('/')});
        })
      }
      else{
        values = await Object.assign(values, { profile : ''})
        let registerPromise = registerUser(values)
        toast.promise(registerPromise, {
          loading: 'Creating...',
          success : <b>Register Successfully...!</b>,
          error : <b>Could not Register.</b>
        })
      }
    }//onsubmit end

  })//end

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

      {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}

      <div className='flex justify-center items-center mt-16'>
        <div className={styles.glass} style={{ width: "45%", paddingTop: '1em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-2'>
                  <label htmlFor="profile">
                    <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' accept='image/*'/>
              </div>

              <div className="textbox flex flex-col items-center gap-2">
                  <TextField label="Email" {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                  
                  <TextField label="Username" {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />

                  <TextField label="Password" {...formik.getFieldProps('password')} className={styles.textbox} placeholder='Password' type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>)}} />
                  {/* <TextField label="Password" {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' /> */}
                  <Button variant='contained' className={styles.btn} type='submit'>Register</Button>
              </div>

              <div className="text-center py-2">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

