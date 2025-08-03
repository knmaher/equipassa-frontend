import type { AxiosError } from 'axios'

export function extractErrorMessage(error: unknown, fallback = 'An error occurred'): string {
  if (!error) return fallback

  const axiosError = error as AxiosError<{ message?: string }>
  const axiosMessage = axiosError.response?.data?.message
  if (axiosMessage) return axiosMessage

  if (typeof axiosError.message === 'string' && axiosError.message) {
    return axiosError.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
