import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { supabase } from '../../client'

const initialState = {
  entities: [],
  // filter: 'PROFILE_ID',
  // filterCriteria: '7a11347c-61ab-46d2-a80b-b307370a251e',
  filterType: 'UNASSIGNED',
  filterCriteria: null,
  // filter: 'IS_COMPLETE',
  // filterCriteria: false,
  loading: true,
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
export const getFilter = (store) => store.filterType
export const getCriteria = (store) => store.filterCriteria

//creates a memoized selector based on the filter input
export const getFilteredChores = createSelector(
  [getAllClanChores, getFilter, getCriteria],
  (allClanChores, filterType, filterCriteria) => {
    console.log(allClanChores, 'this is all clan chores')
    console.log(filterType, 'this is filterType')
    console.log(filterCriteria, 'this is filterCriteria')
    switch (filterType) {
      case 'IS_COMPLETE':
        return allClanChores.filter(
          (chore) => chore.isComplete == filterCriteria
        )
      case 'PROFILE_ID': {
        const hasProfileId = (profile) => profile.id === filterCriteria
        return allClanChores.filter((chore) =>
          chore.profiles.some(hasProfileId)
        )
      }
      case 'UNASSIGNED':
        return allClanChores.filter((chore) => chore.profiles.length === 0)
      default:
        return allClanChores
    }
  }
)
