/* eslint-disable @next/next/no-img-element */
// import { GithubIcon, TwitterIcon } from '../icons';
import { Button, Input, Label } from '@windmill/react-ui';
import Link from 'next/link';
import React from 'react';
export default function loginPage() {
  return (
    <div className='flex min-h-screen items-center bg-gray-50 p-6 dark:bg-gray-900'>
      <div className='mx-auto h-full max-w-4xl flex-1 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='h-full w-full object-cover dark:hidden'
              src='/assets/img/login-office.jpeg'
              alt='Office'
            />
            <img
              aria-hidden='true'
              className='hidden h-full w-full object-cover dark:block'
              src='assets/img/login-office-dark.jpeg'
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <div className='w-full'>
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  css={{}}
                  className='mt-1'
                  type='email'
                  placeholder='john@doe.com'
                />
              </Label>

              <Label className='mt-4'>
                <span>Password</span>
                <Input
                  css={{}}
                  className='mt-1'
                  type='password'
                  placeholder='***************'
                />
              </Label>

              <Link href='/app'>
                <Button className='mt-4' block>
                  Log in
                </Button>
              </Link>

              <hr className='my-8' />

              <Button block layout='outline'>
                {/* <GithubIcon className='mr-2 h-4 w-4' aria-hidden='true' /> */}
                Github
              </Button>
              <Button className='mt-4' block layout='outline'>
                {/* <TwitterIcon className='mr-2 h-4 w-4' aria-hidden='true' /> */}
                Twitter
              </Button>

              <p className='mt-4'>
                <Link
                  href='/forgot-password'
                  className='text-sm font-medium text-purple-600 hover:underline dark:text-purple-400'
                >
                  Forgot your password?
                </Link>
              </p>
              <p className='mt-1'>
                <Link
                  href='/create-account'
                  className='text-sm font-medium text-purple-600 hover:underline dark:text-purple-400'
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
