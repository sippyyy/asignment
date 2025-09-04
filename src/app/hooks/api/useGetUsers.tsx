import { useQuery } from '@tanstack/react-query'
import { withAuthInterceptor } from '../../config/interceptors'
import { apiUrls } from '../../config/api'

const authFetch = withAuthInterceptor()

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await authFetch(apiUrls.getAllUsers())
      return response.json()
    }
  })
}
