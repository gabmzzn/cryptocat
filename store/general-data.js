import { createSlice } from '@reduxjs/toolkit'

const initialGD = {
    isAuthenticated: false,
}

const GeneralData = createSlice({
    name: 'authentication',
    initialState: initialGD,
    reducers: {
        data() {

        },
    },
})

export const GeneralDataActions = GeneralDataSlice.actions

export default GeneralDataSlice.reducer