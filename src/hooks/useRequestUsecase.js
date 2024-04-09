import useSWR from "swr";

export default function useRequestUsecaseUser(page, usecase, userId) {
  const { data, mutate, error } = useSWR(
    `/request/all-by-user-usecase?page=${page}${
      usecase === "all" ? "" : `&usecase=${usecase}`
    }&userId=${userId}`
  );
  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === "No token provided.") ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === "No user found!";

  return {
    loading,
    loggedOut,
    data,
    mutate,
  };
}
