import React from 'react';
import { BsFillImageFill, BsTrashFill } from 'react-icons/bs';

import { getFileSizeFormat } from '@/utils/fileSize';

function ImageCollection({ ImageFile }: any) {
  return (
    <>
      <section className='mt-3 flex max-h-[60vh] w-full flex-col gap-2 overflow-y-auto'>
        {ImageFile?.map((file: any, ind: number) => {
          return (
            <div
              className='flex w-full items-center gap-5 rounded-sm border border-gray-200 p-2 '
              key={ind}
            >
              <div>
                <BsFillImageFill size={22} className='fill-purple-600' />
              </div>

              <div className='text-sm'>
                <h5 className='font-medium text-gray-900 dark:text-gray-300'>
                  {file?.name}
                </h5>
                <p className='text-gray-900 dark:text-gray-300'>
                  {getFileSizeFormat(file?.size)}
                </p>
              </div>
              {/* onClick={() => removeFile(file.tempId)}  */}
              <button
                className='ml-auto'
                // onClick={() => removeFile(files.imageId)}
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
