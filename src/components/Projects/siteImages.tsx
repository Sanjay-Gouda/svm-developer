import { Button } from '@windmill/react-ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

import ImageCollection from '@/components/Projects/imageCollection';
import { TDetailValues } from '@/components/Projects/projectDetailType';
import UploadImage from '@/components/Projects/uploadImage';
import { SvmProjectToast } from '@/components/Toast/Toast';

import {
  clearSiteImage,
  setSiteImages,
} from '@/store/projectSlices/projectDetail';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { ProjectFormTypes } from '@/pages/admin/realEstateProjects/projectForm/add';

type formProps = {
  onComplete: (type: ProjectFormTypes) => void;
};

interface SiteImage {
  name: string;
  size: number;
  imageId: number;
}
interface RooteState {
  projectInfo: {
    siteImages: SiteImage;
  };
}

interface payloadProps {
  address1: string | undefined;
  area: number | undefined | string;
  name: string;
  description?: string | undefined;
  ownerName: string;
  pincode: number | undefined;
  status: string;
  unit: string;
  address2?: string | undefined;
  parentId?: string;
  siteImages?: string[];
  planningImages?: string[];

  // name: string
  // description?: string
  // parentId?: string
  // ownerName: string
  // area: number
  // unit: string
  // status: ProjectStatus
  // address1: string
  // address2?: string
  // pincode: string
  // planningImages: string[]
}

const SiteImages = ({ onComplete }: formProps) => {
  const [siteImageFiles, setSiteImageFiles] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);
  const onAddImages: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const projectImages = e.target.files;
    const files = projectImages?.length;
    setSiteImageFiles(projectImages);

    dispatch(setSiteImages(projectImages));
  };

  const ImageFile = useSelector<RooteState>(
    (state) => state.projectInfo.siteImages
  );

  const projectDetails: any = useSelector<any>((state) => state.projectInfo);

  const {
    name,
    area,
    address1,
    address2,
    unit,
    status,
    pincode,
    description,
    ownerName,
    planningImageFormData,
    siteImageFromData,
  }: TDetailValues = projectDetails;

  const payLoads: payloadProps = {
    address1: address1,
    area: area,
    name: name,
    description: description,
    ownerName: ownerName,
    pincode: pincode,
    status: status,
    unit: unit,
    address2: address2,
    // siteImages: siteImageFromData,
    // planningImages: planningImageFormData,
  };

  const addProjectDetails = async () => {
    const formdata = new FormData();

    Object.entries(payLoads).forEach(([key, value]) => {
      formdata.append(key, value);
      return null;
    });

    await axios({
      method: 'post',
      url: `${API_ENDPOINT.END_POINT}/project/create`,
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res, 'res');
      })
      .catch((err) => {
        console.log(err, 'got err');
      });
  };

  const handleSubmit = () => {
    addProjectDetails();
    router.push('/admin/projects');
  };

  const handleClearImages = () => {
    dispatch(clearSiteImage());
  };

  return (
    <>
      <input
        id='file-upload'
        name='file-upload'
        type='file'
        className='sr-only'
        ref={fileRef}
        onInput={onAddImages}
        multiple
        accept='image/png, image/gif, image/jpeg, image/jpg'
      />

      <div className='flex justify-between gap-2'>
        <label className='block text-lg font-medium leading-6 text-gray-900 dark:text-gray-300'>
          Project Images
        </label>
        <div className='flex gap-2'>
          <Button
            size='regular'
            onClick={() => handleClearImages()}
            layout='link'
          >
            Clear Images
          </Button>
          <Button size='regular' onClick={() => fileRef.current?.click()}>
            Add Images
          </Button>
        </div>
      </div>

      {ImageFile?.length === 0 ? (
        <UploadImage id='file-upload' />
      ) : (
        <ImageCollection ImageFile={ImageFile} />
      )}

      <div className='mt-3 flex items-center justify-between'>
        <Button
          size='regular'
          onClick={() => onComplete('image')}
          layout='link'
          className='mr-auto'
        >
          Go Back
        </Button>
        <Button
          size='regular'
          onClick={() => handleSubmit()}
          className='col-span-2 ml-auto'
        >
          Submit
        </Button>
      </div>

      <SvmProjectToast />
    </>
  );
};

export default SiteImages;
