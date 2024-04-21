import { Button } from '@windmill/react-ui';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import PdfViewer from '@/components/Projects/pdfViewer';
import UploadPlaceholder from '@/components/Projects/uploadPlaceholder';

const UploadProjectImages = ({ setPlanImages, planImages }) => {
  const handleDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles, 'FILES');
    setPlanImages((prevFiles: any) => [
      ...prevFiles,
      ...acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  };

  const acceptedFileTypes = '.pdf';

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleDrop,
    accept: { 'application/pdf': ['.pdf'] },
  });

  const handleClearImages = () => {
    setPlanImages([]);
  };

  const handleRemove = (name: string) => {
    const remainingImages = planImages.filter((file) => {
      return file.name !== name;
    });
    setPlanImages(remainingImages);
  };

  return (
    <>
      {planImages?.length > 0 ? (
        <div className='auto  flex w-full flex-col flex-wrap items-center justify-start gap-2  rounded-lg  border-2 border-gray-300 px-2 py-5  dark:border-gray-600'>
          {planImages?.map((file, ind) => {
            return (
              <>
                <PdfViewer
                  key={ind}
                  name={file?.name}
                  url={file?.preview}
                  handleRemove={() => handleRemove(file?.name)}
                />
              </>
            );
          })}
        </div>
      ) : (
        <UploadPlaceholder
          acceptType='PDF'
          rootProps={getRootProps}
          inputProps={getInputProps}
        />
      )}

      <div className='mt-3 flex w-full justify-end gap-2'>
        <Button
          size='regular'
          onClick={() => handleClearImages()}
          layout='link'
        >
          Clear Images
        </Button>
        {/* <Button
          size='regular'
          {...getRootProps()}
          onClick={handleAddImagesClick}
        >
          Add Images
        </Button>
        <input {...getInputProps()} className='hidden' /> */}
      </div>
    </>
  );
};

export default UploadProjectImages;
