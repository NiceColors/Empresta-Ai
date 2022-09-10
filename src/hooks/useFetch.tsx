import axios, { AxiosRequestConfig } from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import { api } from '../services/apiClient'

const defaultData = {
  data: [] as IUserProps[],
  page: 1,
  total: 1,
  nextPage: null,
  limit: 8,
}

function useFetch<T = unknown>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<any | null>(defaultData)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const getData = async () => {
    api
      .get(url, config)
      .then((response: { data: SetStateAction<T | null> }) => {
        setData(response.data)
        setError(null)
      })
      .catch((error: SetStateAction<Error | null>) => setError(error))
      .finally(() => {
        setTimeout(() => setIsFetching(false), 250)
      })
  }

  useEffect(() => {
    getData()
    const timer = setInterval(getData, 30000)
    return () => clearInterval(timer)

  }, [config?.params.page])

  return { data, error, isFetching }
}

export { useFetch }