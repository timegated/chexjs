import useSWR from 'swr';

const fetcher = (...args: [any]) => fetch(...args).then((res: any) => res.json());

export const useModels = () => {
  const {data, error, isLoading} = useSWR('https://chatnode-api.com/engines', fetcher);

  return {
    data,
    error,
    isLoading
  }
}