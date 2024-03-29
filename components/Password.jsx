import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NoImage from '../src/assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import styles from '../styles/Username.module.css';
import {Button,TextField,InputAdornment,IconButton} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Avatar} from '@mui/material';
export default function Password() {

  const navigate = useNavigate()
  const { username,email,avatar } = useAuthStore(state => state.auth)
  const setLoginStatus = useAuthStore(state => state.setLoginStatus);
  const setAvatar = useAuthStore(state => state.setAvatar)
  const setEmail = useAuthStore(state => state.setEmail)
  // const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      const toastId = toast.loading("Checking")
      try {
        let res = await verifyPassword({ username, password : values.password })
        let {token} = res.data
        localStorage.setItem('token', token);
        setLoginStatus(true)
        setAvatar(avatar || '')
        setEmail(email)
        toast.dismiss(toastId)
        toast.success('Login Successfully')
        navigate('/dashboard')  
      } 
      catch(error) {
        toast.dismiss(toastId)
        toast.error("Password doesn't Match")
      }
      
      // toast.promise(loginPromise, {
      //   loading: 'Checking...',
      //   success : <b>Login Successfully...!</b>,
      //   error : <b>Password Not Match!</b>
      // });

      // loginPromise.then(res => {
      //   let { token } = res.data;
      //   console.log(apiData)
      //   localStorage.setItem('token', token);
      //   setLoginStatus(true)
      //   setAvatar(apiData?.profile || '')
      //   setEmail(apiData?.email)
      //   navigate('/dashboard')
      // })
    }
  })

  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}

      <div className='flex justify-center items-center mt-16'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center px-4 py-4">
            <h4 className='text-5xl font-bold'>Hello {username}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  {/* <img src={avatar || NoImage} className={styles.profile_img} alt="avatar" /> */}
                  <Avatar alt="avatar" src={avatar || NoImage} className={styles.profile_img} sx={{width:'135px', height:'135px'}}/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <TextField label="Password" {...formik.getFieldProps('password')} className={styles.textbox} placeholder='Password' type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>)}} />
                  <Button variant='contained' className={styles.btn} type='submit'>Sign In</Button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
