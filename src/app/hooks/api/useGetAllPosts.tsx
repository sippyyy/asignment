import { useQuery } from '@tanstack/react-query'
import { apiUrls } from '../../config/api'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const useGetAllPosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(apiUrls.getAllPosts())
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    }
  })
}