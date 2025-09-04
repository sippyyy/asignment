import { useQuery } from '@tanstack/react-query';
import { withAuthInterceptor } from '../../config/interceptors';
import { apiUrls } from '../../config/api';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const authFetch = withAuthInterceptor();

export const useGetPostComments = (postId: number) => {
  return useQuery({
    queryKey: ['postComments', postId],
    queryFn: async () => {
      const response = await authFetch(apiUrls.getPostComments(postId))
      return response.json()
    },
    enabled: !!postId,
  })
}
