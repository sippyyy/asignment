import { useQuery } from '@tanstack/react-query';
import { withAuthInterceptor } from '../../config/interceptors';
import { apiUrls } from '../../config/api';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const authFetch = withAuthInterceptor();

export const useGetPost = (id: number = 1) => {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await authFetch(apiUrls.getPostById(id))
      return response.json()
    },
    enabled: !!id,
  })
}
