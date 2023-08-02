import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { TDetailValues } from '@/components/Projects/projectDetailType';
import ProjectImages from '@/components/Projects/projectImages';
import AddProjectForm from '@/components/TestProjects/addProjectForm';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  // parentProject: Yup.string().required('Parent Project is required'),
  // status: Yup.string().required('status is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  area: Yup.number().required('Area must be in number'),
  // projectStatus: Yup.string().required('Project Status is required'),
  pincode: Yup.string().required('Pincode is required'),
  state: Yup.string().required('state is required'),
  dist: Yup.string().required('district is required'),
  address1: Yup.string().required('address is required'),
});

const addInitialValues: TDetailValues = {
  name: '',
  ownerName: '',
  parentProject: 'none',
  area: undefined,
  pincode: undefined,
  unit: 'meter',
  state: '',
  dist: '',
  description: '',
  status: 'upcomming',
  address1: undefined,
};

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
}

type editProps = {
  editInitialValues?: any;
  editId?: string;
};

const TestProjects = ({ editId, editInitialValues }: editProps) => {
  const router = useRouter();
  const [planningImages, setPlanningImages] = useState<any>([]);
  const [siteImages, setSiteImages] = useState<any>([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isformikError, setIsFromikError] = useState<number>();

  const [enableSubmit, setEnableSubmit] = useState(false);
  const addProject = async (values: TDetailValues) => {
    const {
      address1,
      address2,
      area,
      description,
      name,
      ownerName,
      pincode,
      status,
      unit,
    } = values;

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
    };

    try {
      const res = await httpInstance.post(`project/create`, payLoads);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjectDetials = async (values: TDetailValues) => {
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
    } = values;

    const payload = {
      address1: address1,
      area: area,
      name: name,
      description: description,
      ownerName: ownerName,
      pincode: pincode,
      status: status,
      unit: unit,
      address2: address2,
    };

    await axios({
      method: 'put',
      url: `${API_ENDPOINT.END_POINT}project/update/${editId}`,
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        toast.success('Data updated successfully');
        setTimeout(() => {
          router.push('/admin/projects');
        }, 1000);
      })
      .catch((err) => {
        toast.error('Something went wrong');
      });
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TDetailValues) => {
      // setCounter((counter) => counter + 1);

      if (isformikError === 0) {
        setShowImageUpload(true);
        setEnableSubmit(true);
      }

      if (enableSubmit) {
        editId ? updateProjectDetials(values) : addProject(values);
      }

      // console.log(values);
      // isSubmit ? console.log(values) : setShowImageUpload(true);
    },
  });

  useEffect(() => {
    const errors = formik.errors;
    const errorLength = Object.keys(errors).length;
    // console.log(errorLength);
    setIsFromikError(errorLength);
  }, [formik.handleSubmit]);

  const [pincodeQuery, setPincodeQuery] = useState();

  const handlePinCodeApi = async (e) => {
    const query = e.target.value;
    setPincodeQuery(query);

    formik.setFieldValue('pincode', query);
  };

  useEffect(() => {
    setPincodeQuery(editInitialValues?.pincode);
  }, [editId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await axios({
        method: 'get',
        url: `${API_ENDPOINT.END_POINT}/appConfig/pincode?zip=${pincodeQuery}`,
      })
        .then((res) => {
          // console.log(res);
          if (pincodeQuery) {
            formik.setFieldValue('state', res?.data?.result[0].State);
            formik.setFieldValue('dist', res?.data?.result[0].District);
          } else {
            formik.setFieldValue('state', '');
            formik.setFieldValue('dist', '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [pincodeQuery]);

  return (
    <>
      {!showImageUpload ? (
        <AddProjectForm
          handleProceed={formik.handleSubmit}
          // handleProceed={handleProceed}
          handleName={formik.handleChange}
          nameValue={formik.values.name}
          nameError={formik.touched.name && formik.errors.name ? true : false}
          nameErrorMessage={formik.errors.name}
          // nameErrorMessage={fieldError?.name}
          ownerNameValue={formik.values.ownerName}
          handleOwnerName={formik.handleChange}
          ownerNameError={
            formik.touched.ownerName && formik.errors.ownerName ? true : false
          }
          ownerNameErrorMessage={formik.errors.ownerName}
          areaValue={formik.values.area}
          handleArea={formik.handleChange}
          areaError={formik.touched.area && formik.errors.area ? true : false}
          areaErrorMessgage={formik.errors.area}
          handleParentProject={formik.handleChange}
          handleStatus={formik.handleChange}
          pincodeValue={formik.values.pincode}
          handlePincode={handlePinCodeApi}
          pincodeError={
            formik.touched.pincode && formik.errors.pincode ? true : false
          }
          pincodeErrorMessage={formik.errors.pincode}
          distValue={formik.values.dist}
          handleDist={formik.handleChange}
          handleState={formik.handleChange}
          stateValue={formik.values.state}
          addressValue={formik.values.address1}
          handleAddress={formik.handleChange}
          addressError={
            formik.touched.address1 && formik.errors.address1 ? true : false
          }
          addressErrorMessage={formik.errors.address1}
          secondaryAddressValue={formik.values.address2}
          handleSecondaryAddress={formik.handleChange}
          descValue={formik.values.description}
          handleDesc={formik.handleChange}
        />
      ) : (
        <ProjectImages
          planImages={planningImages}
          handleGoBack={() => setShowImageUpload(false)}
          handleSubmit={formik.handleSubmit}
          setPlanImages={setPlanningImages}
          setProjectDevelopementImages={setSiteImages}
          projectDevelopementImages={siteImages}
        />
      )}
    </>
  );
};

export default TestProjects;