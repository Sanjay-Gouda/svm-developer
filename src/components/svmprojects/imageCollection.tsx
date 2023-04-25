import { getFileSizeFormat } from '@/utils/fileSize';
import React, { useEffect, useState } from 'react';
import { BsFillImageFill, BsTrashFill } from 'react-icons/bs';

function ImageCollection({ Imagefiles }: any) {
  const [filteredImages, setFilteredImages] = useState<any>([]);

  let ID = 1000;
  const FileArray = [...Imagefiles].map((file, ind) => {
    const { name, size } = file;

    const fileobj = { name, size, imageId: ID };
    ID++;

    return fileobj;
    // return { imageId, name, size };
  });

  console.log(FileArray, 'Array');

  const removeFile = (id: number) => {
    const remainingImageFiles = FileArray.filter((files) => {
      return files.imageId !== id;
    });

    // console.log(remainingImageFiles);
    setFilteredImages(remainingImageFiles);
    // return remainingImageFiles;
  };

  useEffect(() => {
    console.log(filteredImages);
  }, [removeFile]);

  return (
    <>
      <section className='mt-3 flex max-h-[60vh] w-full flex-col gap-2 overflow-y-auto'>
        {FileArray.map((files) => {
          console.log(files);
          return (
            <div className='flex w-full items-center gap-5 rounded-sm border border-gray-200 p-2'>
              <div>
                <BsFillImageFill size={22} className='fill-purple-600' />
              </div>

              <div className='text-sm'>
                <h5 className='font-medium text-gray-900 dark:text-gray-300'>
                  {files?.name}
                </h5>
                <p className='text-gray-900 dark:text-gray-300'>
                  {getFileSizeFormat(files?.size)}
                </p>
              </div>
              {/* onClick={() => removeFile(file.tempId)}  */}
              <button
                className='ml-auto'
                onClick={() => removeFile(files.imageId)}
              >
                <BsTrashFill size={16} className='fill-red-600' />
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ImageCollection;
