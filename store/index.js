import { configureStore } from '@reduxjs/toolkit'

import GeneralDataReducer from './general-data'

const store = configureStore({
    reducer: { GeneralData: GeneralDataReducer },
})

export default store