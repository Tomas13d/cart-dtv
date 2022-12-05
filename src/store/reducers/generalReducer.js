import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as generalActions from '../actions/generalActions'


const initializeState = {
    windowFlag: false,
    selectedCategorie: {
      cod_subrubro: "",
      items: [],
    },
  };



export const setSelectedCategorie = createAsyncThunk(
  'SET_CATEGORY',
  generalActions.setSelectedCategorie
)


export const generalSlice = createSlice({
  name: 'general',
  initialState: initializeState,
  extraReducers: (builder) => {
    builder.addCase(setSelectedCategorie.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      setSelectedCategorie.fulfilled,
      (state, action) => {
          state.loading = false
          state.selectedCategorie = action.payload
          state.error = ''
      
      }
    )
    builder.addCase(setSelectedCategorie.rejected, (state, action) => {
      state.loading = false
      state.selectedCategorie = {
        cod_subrubro: "",
        items: [],
      }
      state.error = action.error.message || 'something went wrong'
    })
  },
})

export default generalSlice.reducer