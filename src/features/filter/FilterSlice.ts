import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SortBy {
  field: 'price-asc' | 'price-desc' | null; // 'popularity-asc' | 'rating-asc'
}

// Define the initial state for the filter slice
interface FilterState {
  searchTerm: string;
  category: string | null;
  priceRange: [number, number];
  sortBy: string | null;
  size: string[] | null;
  loading: boolean;
}

const initialState: FilterState = {
  searchTerm: '',
  category: null, // null means no specific category selected
  priceRange: [0, 1000], // default price range
  sortBy: null, // no sorting by default
  size: [],
  loading: false,
};


// Create the slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<string | null >) {
      state.sortBy = action.payload;
    },
    setFilterSize(state, action: PayloadAction<string[] | null>) {
      state.size = action.payload;
    },
    resetFilters(state) {
      state.searchTerm = '';
      state.category = null;
      state.priceRange = [0, 1000];
      state.sortBy = null;
      state.size = [];
    },
  },
});

// Export actions
export const { setSearchTerm, setCategory, setPriceRange, setSortBy, resetFilters, setFilterSize } = filterSlice.actions;

// Export the reducer
export default filterSlice.reducer;
