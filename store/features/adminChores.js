import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  loading: false,
}

// *** THUNKS *** //

//ADMIN FETCH ALL CHORES FOR HOUSEHOLD
export const fetchAllChores = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async (thunkAPI) => {
    const user = supabase.auth.user()
    try {
      let { data: houseHoldId } = await supabase
        .from('profiles')
        .select(`household_id`)
        .eq('id', user.id)
        .single()

      let { data: chores } = await supabase
        .from('responsibility')
        .select(
          `chore_id, chores (
          *
        ), profiles ( * )`
        )
        .eq('household_id', houseHoldId.household_id)

      return chores
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

export const addChore = createAsyncThunk(
  'chores/addChore',
  async (chore, thunkAPI) => {
    try {
      let { name, notes } = chore
      //add the chore to the database
      await supabase
        .from('chores') // Select the Table
        .insert([
          {
            name,
            notes,
            // xp,
            // isComplete,
          },
        ])
      //dispatch fetchALlChores to update the state from db
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

export const deleteChore = createAsyncThunk(
  'chores/deleteChore',
  async (choreId, thunkAPI) => {
    try {
      //delete the chore
      await supabase.from('chores').delete().eq('id', choreId)
      //dispatch fetchALlChores to update the state from db
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// ***Slice Creator*** //
const choresSlice = createSlice({
  name: 'allChores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChores.fulfilled, (state, action) => {
        state.loading = false
        state.entities = action.payload
      })
      .addDefaultCase((state, action) => {})
  },
})

export default choresSlice.reducer
