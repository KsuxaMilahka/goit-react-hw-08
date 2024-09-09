import { filtersSlice } from '../filters/slice';

export const { changeFilter } = filtersSlice.actions;
export const selectNameFilter = state => state.filters.name;
