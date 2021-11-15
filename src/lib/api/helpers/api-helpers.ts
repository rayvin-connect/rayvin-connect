import { AxiosResponse } from "axios";

export const extractErrorMessage = (response: AxiosResponse, defaultErrorMessage = 'A server error has occurred') => {
  if (response && response.status === 429) {
    return `Rate Limit reached: ${response.statusText}`
  } else if (response && response.data) {
    return response.data.error || response.data.message || defaultErrorMessage
  }

  return defaultErrorMessage
}
