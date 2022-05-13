import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

//ADDS A CHORE FOR THE USER'S HOSUEHOLD
export const createResponsibility = createAsyncThunk(
  'responsibilities/addResponsibility',
  async (responsibility, thunkAPI) => {
    try {
      let { chore_id, household_id, profile_id } = responsibility
      //add the chore to the database
      await supabase
        .from('responsibility') // Select the Table
        .insert([
          {
            chore_id,
            household_id,
            profile_id,
          },
        ])
      alert('Responsibility attached!')
      //dispatch fetchALlChores to update the state from db
      // thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      alert('Unable to add Responsibility')
      return error
    }
  }
)

// ***Slice Creator*** //
// const choresSlice = createSlice({
//   name: 'allChores',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllChores.fulfilled, (state, action) => {
//         state.loading = false
//         state.entities = action.payload
//       })
//       .addDefaultCase((state, action) => {})
//   },
// })

// export default choresSlice.reducer
