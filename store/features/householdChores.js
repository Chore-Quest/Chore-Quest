import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  filter: 'IS_COMPLETE',
  criteria: 1,
  loading: false,
}

// *** THUNKS *** //

//FETCH ALL CHORES FOR HOUSEHOLD
export const fetchAllChores = createAsyncThunk(
  //action type string
  'chores/fetchAllChores',
  //callback function
  async () => {
    const user = supabase.auth.user()
    try {
      //get the householdID
      let { data } = await supabase
        .from('profiles')
        .select(`household_id`)
        .eq('id', user.id)
        .single()
      const householdId = data.household_id
      let { data: chores, error } = await supabase
        .from('chores')
        .select(`*, profiles(*)`)
        .eq('household_id', householdId)
      return chores
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

//ADDS A CHORE FOR THE USER'S HOSUEHOLD
export const createChore = createAsyncThunk(
  'chores/addChore',
  async (chore, thunkAPI) => {
    try {
      let { name, notes, household_id, item } = chore
      //add the chore to the database
      await supabase
        .from('chores') // Select the Table
        .insert([
          {
            name,
            notes,
            household_id,
            item,
            // xp,
            // isComplete,
          },
        ])
      alert('A Chore has been added!')
      //dispatch fetchALlChores to update the store from db
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      alert('Unable to add Chore')
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
      thunkAPI.dispatch(fetchAllChores())
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

// ***Slice Creator*** //
const choresSlice = createSlice({
  name: 'allClanChores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChores.fulfilled, (store, action) => {
        store.loading = false
        store.entities = action.payload
      })
      .addDefaultCase((store, action) => {})
  },
})

export default choresSlice.reducer

export const getAllClanChores = (store) => store.entities
export const getFilter = (store) => store.filter
export const getCriteria = (store) => store.criteria

//creates a memoized selector based on the filter input
export const getFilteredChores = createSelector(
  [getAllClanChores, getFilter, getCriteria],
  (allClanChores, filter, criteria) => {
    console.log(allClanChores, 'this is all clan chores')
    console.log(filter, 'this is filter')
    console.log(criteria, 'this is criteria')
    switch (filter) {
      case 'IS_COMPLETE':
        return allClanChores.filter((chore) => chore.isComplete == criteria)
      case 'PROFILE_ID':
        return allClanChores.filter((chore) => {
          if (chore.profiles[0]) {
            chore.profiles.filter((profile) => profile.id === criteria)
          }
        })
      default:
        return allClanChores
    }
  }
)
