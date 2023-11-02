import { Button, Card } from '@windmill/react-ui';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { TextInput, TextInputArea } from '@/components/ui-blocks';
import Layout from '@/containers/Layout';

import { httpInstance } from '@/constants/httpInstances';

const initialValues = {
  // thumbnailImage:[],
  title: '',
  desc: '',
  url: '',
};

function Festival() {
  const [thumbnailImage, setThumbnailImage] = useState<any>([]);

  const postFestival = async (values) => {
    const { url, title, desc } = values;

    const payload = {
      url: url,
      title: title,
      description: desc,
      // isLatest: false,
      thumbnailImg: 'string',
    };

    try {
      const res = await httpInstance.post('website/festival/create', payload);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      postFestival(values);
    },
  });

  const handleThumbanilImage = (acceptedFiles: any) => {
    setThumbnailImage((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { prevFile: URL.createObjectURL(file) })
      ),
    ]);
  };

  const thumbnailDropzone = useDropzone({
    onDrop: handleThumbanilImage,
    multiple: false,
  });

  return (
    <>
      <Layout>
        <Card className='mx-auto w-full p-2'>
          <div className='mx-auto flex w-1/3 flex-col gap-2 '>
            <div className='h-56 w-full'>
              {thumbnailImage?.length > 0 ? (
                <>
                  {thumbnailImage?.map((file, ind) => {
                    return (
                      <div
                        className='h-full w-full overflow-hidden  rounded-lg border-2 border-gray-300  dark:border-gray-600'
                        key={ind}
                      >
                        <img
                          className='h-full w-full  object-contain'
                          src={file.prevFile}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <label
                  for='dropzone-file'
                  className='dark:hover:bg-bray-800 flex h-full w-full 
                  cursor-pointer flex-col items-center justify-center rounded-lg 
                  border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                >
                  <div
                    {...thumbnailDropzone.getRootProps()}
                    className='flex h-full items-center justify-center text-gray-900   dark:text-gray-400'
                  >
                    <input {...thumbnailDropzone.getInputProps()} />
                    {/* <input /> */}
                    <p>Upload your Festival Image ...</p>
                    {/* {isDragActive ? (
                  ) : (
                    <p className='text-center'>{placeholder}</p>
                  )} */}
                  </div>
                </label>
              )}
            </div>

            <div className='flex flex-col'>
              <TextInput
                type='text'
                name='url'
                label='Youtube URL'
                onChange={formik.handleChange}
                value={formik.values.url}
              />
              {/* {formik.touched.firstName && formik.errors.firstName && (
          <div className='text-red-400'>{formik.errors.firstName}</div>
        )} */}
            </div>
            <div className='flex flex-col'>
              <TextInput
                type='text'
                name='title'
                label='Title'
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {/* {formik.touched.firstName && formik.errors.firstName && (
          <div className='text-red-400'>{formik.errors.firstName}</div>
        )} */}
            </div>

            <TextInputArea
              value={formik.values.desc}
              name='desc'
              containerClassName='flex-1 '
              label='About Festival'
              rows='4'
              handleChange={formik.handleChange}
            />
            {/* {addressError && (
        <div className='text-red-400'>{addressErrorMessage}</div>
      )} */}

            <div className='w-full'>
              <Button
                size='regular'
                className='w-full'
                onClick={() => formik.handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </Layout>
    </>
  );
}

export default Festival;
