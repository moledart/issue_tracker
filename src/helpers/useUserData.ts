import { useQuery } from '@tanstack/react-query';

export function useUserData(userId: string) {
  if (!userId) return null;
  const userData = useQuery(['users', userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userData;
}
