
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productsActions from '../actions/productsActions'


const initializeState = {
  productsByCategorie: {},
  allProducts: [],
  searchedProduct: {
    value: "",
    label: ""
  },
  };


export const setProductsByCategorie = createAsyncThunk(
  'SET_PRODUCTS_BY_CATEGORIE',
  productsActions.setProductsByCategorie
)

export const setAllProducts = createAsyncThunk(
  'SET_ALL_PRODUCTS',
  productsActions.setAllProducts
)

export const setSearchedProduct = createAsyncThunk(
  'SET_SEARCHED_PRODUCT',
  productsActions.setSearchedProduct
)




export const productSlice = createSlice({
  name: 'general',
  initialState: initializeState,
  extraReducers: (builder) => {
    builder.addCase(setProductsByCategorie.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      setProductsByCategorie.fulfilled,
      (state, action) => {
          state.loading = false
          state.productsByCategorie = action.payload
          state.error = ''
      }
    )
    builder.addCase(setProductsByCategorie.rejected, (state, action) => {
      state.loading = false
      state.productsByCategorie = {}
      state.error = action.error.message || 'something went wrong'
    })
    builder.addCase(setAllProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      setAllProducts.fulfilled,
      (state, action) => {
          state.loading = false
          state.allProducts = action.payload
          state.error = ''
      }
    )
    builder.addCase(setAllProducts.rejected, (state, action) => {
      state.loading = false
      state.allProducts = []
      state.error = action.error.message || 'something went wrong'
    })
    builder.addCase(setSearchedProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      setSearchedProduct.fulfilled,
      (state, action) => {
          state.loading = false
          state.searchedProduct = action.payload
          state.error = ''
      }
    )
    builder.addCase(setSearchedProduct.rejected, (state, action) => {
      state.loading = false
      state.searchedProduct = {
        value: "",
        label: ""
      }
      state.error = action.error.message || 'something went wrong'
    })
  },
})

export default productSlice.reducer