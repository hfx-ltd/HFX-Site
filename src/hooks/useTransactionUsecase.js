import useSWR from 'swr';

export default function useTransactionUsecase(type) {
  const { data, mutate, error } = useSWR(`/transaction/all-by-user/${type}`);

  // console.log('response', error);
  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === 'No token provided.') ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === 'No user found!' ||
    data?.accountStatus === 'frozen';

  return {
    loading,
    loggedOut,
    data,
    mutate,
  };
}
