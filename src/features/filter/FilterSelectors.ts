import { RootState } from '../../app/store';

export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;
export const selectCategory = (state: RootState) => state.filter.category;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectSize = (state: RootState) => state.filter.size;
export const selectLoading = (state: RootState) => state.filter.loading;
