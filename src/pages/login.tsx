/* eslint-disable @next/next/no-img-element */
// import { GithubIcon, TwitterIcon } from '../icons';
import { Button, Input, Label } from '@windmill/react-ui';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';

import { API_ENDPOINT } from '@/const/APIRoutes';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
  const [loader, setLoader] = useState(false);
  const routes = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  const LoginUser = async (values) => {
    setLoader(true);
    await axios({
      method: 'post',
      url: `${API_ENDPOINT.END_POINT}/auth/login`,
      data: values,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        // console.log(res.cookie, 'loginRes');
        const loginToken = res.data.result.accessToken;
        setLoader(false);

        setCookie('token', loginToken, { path: '/' });
        if (cookies) {
          routes.push('/admin');
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      LoginUser(values);
    },
  });

  return (
    <div className='flex min-h-screen items-center bg-gray-50 p-6 dark:bg-gray-900'>
      <div className='mx-auto h-full max-w-4xl flex-1 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='h-full w-full object-cover dark:hidden'
              src='https://windmill-dashboard-react.vercel.app/static/media/login-office-dark.cb4a995f.jpeg'
              alt='Office'
            />
            <img
              aria-hidden='true'
              className='hidden h-full w-full object-cover dark:block'
              src='https://windmill-dashboard-react.vercel.app/static/media/login-office-dark.cb4a995f.jpeg'
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
                  name='email'
                  placeholder='john@doe.com'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Label>

              <Label className='mt-4'>
                <span>Password</span>
                <Input
                  css={{}}
                  className='mt-1'
                  type='password'
                  name='password'
                  onChange={formik.handleChange}
                  placeholder='***************'
                  value={formik.values.password}
                />
              </Label>

              <Button
                className='mt-4'
                block
                onClick={() => formik.handleSubmit()}
              >
                Log in
                {loader && <ClipLoader size={20} color='white' />}
              </Button>
              {/* <Link href='/admin'>
              </Link> */}

              <hr className='my-8' />

              {/* <Button block layout='outline'>
                Github
              </Button>
              <Button className='mt-4' block layout='outline'>
                Twitter
              </Button> */}

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
