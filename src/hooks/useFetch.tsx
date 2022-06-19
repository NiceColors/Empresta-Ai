import axios, { AxiosRequestConfig } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'

const api = axios.create({ baseURL: '' })

export function useFetch<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api
      .get(url, config)
      .then((response: { data: SetStateAction<T | null> }) => {
        setData(response.data)
        setError(null)
      })
      .catch((error: SetStateAction<Error | null>) => setError(error))
      .finally(() => setIsFetching(false))
  }, [])

  return { data, error, isFetching }
}
