import React, { useState } from 'react'
import avatar from '../src/assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import { Button,TextField, Avatar } from '@mui/material';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import {useAuthStore} from '../store/store'
import { useRef } from 'react';
export default function Profile() {
  const toasterRef = useRef()
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  //const setLoginStatus = useAuthStore((state) => state.setLoginStatus)
  const setEmail = useAuthStore((state) => state.setEmail)
  const setAvatar = useAuthStore((state) => state.setAvatar)
  const resetUserDetails = useAuthStore((state) => state.resetUserDetails)
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      // address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      const toastId = toast.loading('Updating')
      if(file){
        const formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset', "vtgp88wg")
        fetch(`https://api.cloudinary.com/v1_1/dxkxrii3x/image/upload`,{
          method: "POST",
          body: formData
        })
        .then(async (res) => {
          const data = await res.json()
          values = await Object.assign(values, { profile : data?.secure_url || apiData?.profile || ''})
          try {
            
            let res = await updateUser(values)
            if(res.data.status === 201){
              console.log("res1",res)
              setAvatar(values.profile || '')
              setEmail(values.email || '')
              toast.dismiss(toastId)
              toast.success('Update Successfully')
            }
            
          } 
          catch(error) {
            toast.dismiss(toastId)
            toast.error("Error in Updating")
          }
          // let updatePromise = updateUser(values);
          // toast.promise(updatePromise, {
          //   loading: 'Updating...',
          //   success : <b>Update Successfully</b>,
          //   error: <b>Could not Update!</b>
          // });
        })
        .catch(async (err) => {
          values = await Object.assign(values, { profile : apiData?.profile || ''})
          try {
            let res = await updateUser(values)
            if(res.data.status === 201){
              console.log("res2",res)
              setAvatar(values.profile || '')
              setEmail(values.email || '')
              toast.dismiss(toastId)
              toast.success('Update Successfully')
            }
          } 
          catch(error) {
            toast.dismiss(toastId)
            toast.error("Error in Updating")
          }
          // let updatePromise = updateUser(values);
          // toast.promise(updatePromise, {
          //   loading: 'Updating...',
          //   success : <b>Update Successfully</b>,
          //   error: <b>Could not Update!</b>
          // });
        })
      }
      else{
        values = await Object.assign(values, { profile : file || apiData?.profile || ''})
        try {
          let res = await updateUser(values)
          if(res.data.status === 201){
            console.log("res3",res,values)
            setAvatar(values?.profile || '')
            setEmail(values?.email || '')
            toast.dismiss(toastId)
            toast.success('Update Successfully')
          }
        } 
        catch(error) {
          toast.dismiss(toastId)
          toast.error("Error in Updating")
        }
        // let updatePromise = updateUser(values);
        // toast.promise(updatePromise, {
        //   loading: 'Updating...',
        //   success : <b>Update Successfully</b>,
        //   error: <b>Could not Update!</b>
        // });
      }
      // const UpdateInfo = ({email,profile}) => {
      //   console.log(profile,email)
      //   setAvatar(profile)
      //   setEmail(email)
      //   toast("Details Updated Successfully")
      // }

    }//end submit
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    resetUserDetails()
    useAuthStore.persist.clearStorage()
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster useRef={toasterRef} position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center mt-16'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '1em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center pb-8 pt-2'>
                  <label htmlFor="profile">
                    {/* <img src={file || apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" /> */}
                    <Avatar src={file || apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" sx={{height:'135px' ,width:'135px'}} />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' accept='image/*'/>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <TextField label="FirstName" {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                  <TextField label="LastName" {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <TextField label="MobileNumber" {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                  <TextField label="Email" {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

               
                  {/* <TextField label="Address" {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' /> */}
                  <Button variant='contained' className={styles.btn} type='submit'>Update</Button>
               
                  
              </div>

              <div className="text-center py-2">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

