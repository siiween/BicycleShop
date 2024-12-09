import { toast } from 'react-toastify';

export function handleError(error: unknown, message: string): void {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred');
  }
  toast.error(message);
}
