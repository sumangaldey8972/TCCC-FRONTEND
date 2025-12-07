import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    _id: string | null;
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    isVerified: boolean;
    kycStatus: string;
    email: string;
    role: string[];
    registrationType: string[];
    refreshToken: string;
    profilePicture: string;
    country?: string;
    pincode?: string;
    city?: string;
    address?: string;
    bitcoinAddress?: string;
    usdtAddress?: string;
    telegramUsername?: string;
    walletBalance?: number;
    profilePhotoUrl?: string;
    phoneNumber?: string;
    landlineNumber?: string | null;
    password?: string

}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signin(state, action: PayloadAction<{ user: User }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = null;
            state.refreshToken = action.payload.user.refreshToken

        },
        updateUser(state, action: PayloadAction<{ user: User }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = null;
            state.refreshToken = action.payload.user.refreshToken
        },
        signout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false
        }
    }
})

export const { signin, updateUser, signout, } = authSlice.actions;

export default authSlice.reducer;