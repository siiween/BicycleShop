'use client';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { useRouter } from 'next/navigation';
import React from 'react';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  const router = useRouter();
  return (
    <html>
      <body>
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
          <Text as="h1" size="4xl" className=" font-bold text-red-600">
            An Error Occurred
          </Text>
          <Text size="2xl" className="mt-2 text-gray-700">
            {error.message || 'Something went wrong!'}
          </Text>

          <Button onClick={reset} className="mt-10">
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
