import { AxiosError, AxiosResponse } from 'axios';
import { AppError } from '../middlewares/error';

export function mapAxiosError(
  error: unknown,
  throwAppError = false
): AxiosResponse<any, any> | null {
  let response = null;
  let message = 'An unknown error occurred!';

  // Handle axios error
  if (error instanceof AxiosError) {
    // The request was made and the server responded with error
    if (error.response != null) {
      message = `Axios Error: The server responded with an error code ${error.response.status}!`;
      response = error.response;
      console.error(message, error.response.data);
    }
    // The request was made but no response was received
    else if (error.request != null) {
      message = 'Axios Error: The server did not respond!';
      console.error(message, { request: error.request });
    }
    // Something bad happened
    else {
      message = 'Axios Error: An unknown error occurred!';
      console.error(message);
    }
  }

  if (throwAppError) {
    throw new AppError(500, message);
  }

  return response;
}
