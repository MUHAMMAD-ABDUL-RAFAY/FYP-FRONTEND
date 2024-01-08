import { create } from 'zustand';
import {persist} from 'zustand/middleware'

export const useAuthStore = create(persist((set) => ({
    auth : {
        username : '',
        avatar: '',
        email: '',
        active : false,
    },
    setUsername : (name) => set((state) => (
        { auth : { ...state.auth, username : name }
    })),
    setEmail: (mail) => set((state) => ({ auth : { ...state.auth, email : mail }})),
    setLoginStatus : (loginState) => set((state) => ({auth: {...state.auth,active:loginState}})),
    setAvatar : (image) => set((state) => ({auth: {...state.auth,avatar:image}})),
    resetUserDetails: () => set((state) => ({auth: {username : '',avatar: '',email: '',active : false,}})),
}),
    {
        name : 'user-details',
        getStorage : () => localStorage
    }
))