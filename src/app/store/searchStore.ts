import { create } from 'zustand'

interface SearchStore {
  searchQuery: string
  setSearchQuery: (query: string) => void
  clearSearchQuery: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  clearSearchQuery: () => set({ searchQuery: '' })
}))
