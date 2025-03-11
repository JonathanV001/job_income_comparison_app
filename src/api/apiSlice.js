import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

const citiesAdapter =createEntityAdapter()

const initialState = citiesAdapter.getInitialState()

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => '/cities',
            transformResponse: responseData => {
                return citiesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'City', id: "LIST" },
                ...result.ids.map(id => ({ type: 'City', id }))
            ]
        })
    })
})

// returns the query result object
export const selectCitiesResult = apiSlice.endpoints.getCities.select()

// Creates memoized selector
const selectCitiesData = createSelector(
    selectCitiesResult,
    citiesResult => citiesResult.data // normalized state object with ids & entities
)

export const {
    useGetCitiesQuery
} = apiSlice

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCities,
    selectById: selectCityById,
    selectIds: selectCityIds
    // Pass in a selector that returns the posts slice of state
} = citiesAdapter.getSelectors(state => selectCitiesData(state) ?? initialState)