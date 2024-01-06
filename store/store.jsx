import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        username : '',
        avatar: '',
        email: '',
        active : false
    },
    setUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }})),
    setEmail: (mail) => set((state) => ({ auth : { ...state.auth, email : mail }})),
    setLoginStatus : (loginState) => set((state) => ({auth: {...state.auth,active:loginState}})),
    setAvatar : (image) => set((state) => ({auth: {...state.auth,avatar:image}})),
}))