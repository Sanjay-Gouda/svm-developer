import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import Stepper from 'react-stepper-horizontal';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { TDetailValues } from '@/components/Projects/projectDetailType';
import AddProjectForm from '@/components/TestProjects/addProjectForm';
import { TCreateProject } from '@/components/TestProjects/types';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  // parentProject: Yup.string().required('Parent Project is required'),
  // status: Yup.string().required('status is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  area: Yup.number().required('Area must be in number'),
  emiAmt: Yup.number().required('Amount must be in number'),
  downPayment: Yup.number().required(' Amount must be in number'),
  totalAmt: Yup.number().required('Amount must be in number'),
  // projectStatus: Yup.string().required('Project Status is required'),
  pincode: Yup.string().required('Pincode is required'),
  // state: Yup.string().required('state is required'),
  // dist: Yup.string().required('district is required'),
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
  downPayment: undefined,
  totalAmt: undefined,
  emiAmt: undefined,
  location: '',
};

// interface payloadProps {
//   address1: string | undefined;
//   area: number | undefined | string;
//   name: string;
//   description?: string | undefined;
//   ownerName: string;
//   pincode: number | undefined;
//   status: string;
//   unit: string;
//   address2?: string | undefined;
//   parentId?: string;
//   siteImages?: string[];
//   planningImages?: string[];
//   logo?: string[];
//   location?: string;
//   emiAmt: number;
//   downPayment: number;
//   totalAmt: number;
// }

// type TCreateProject = {
//   name: string;
//   description?: string | undefined;
//   parentId?: string | undefined;
//   ownerName: string;
//   area?: number | string;
//   unit: string;
//   status: string;
//   address1?: string;
//   address2?: string;
//   pincode?: number;
//   emiAmt: number;
//   downPayment: number;
//   totalAmt: number;
//   location: string;
// };

type editProps = {
  editInitialValues?: any;
  editId?: string;
  handleNextStep?: () => void;
  setProjectFormValues?: (value: TCreateProject) => void;
};

const TestProjects = ({
  editId,
  editInitialValues,
  handleNextStep,
  setProjectFormValues,
}: editProps) => {
  const router = useRouter();
  const [planningImages, setPlanningImages] = useState<any>([]);
  const [siteImages, setSiteImages] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  const [projectLogo, setProjectLogo] = useState<any>([]);

  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isformikError, setIsFromikError] = useState<number>();
  const routes = useRouter();

  const addProject = async (values: TCreateProject) => {
    setLoader(true);
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
      downPayment,
      totalAmt,
      emiAmt,
    } = values;

    const payLoads: TCreateProject = {
      address1: address1,
      area: area,
      name: name,
      description: description,
      ownerName: ownerName,
      pincode: pincode,
      status: status,
      unit: unit,
      address2: address2,
      location: 'location',
      downPayment: downPayment,
      emiAmt: emiAmt,
      totalAmt: totalAmt,
    };

    // const formData = new FormData();

    // Object.entries(payLoads).forEach(([key, value]: any) => {
    //   if (key !== 'planningImages' && key !== 'logo') {
    //     formData.append(key, value);
    //   }
    // });

    // for (let i = 0; i < planningImages.length; i++) {
    //   formData.append('planningImages', planningImages[i]);
    // }
    // for (let i = 0; i < projectLogo.length; i++) {
    //   formData.append('logo', projectLogo[i]);
    // }

    try {
      // console.log(formData);
      const res = await httpInstance.post(`project/create`, payLoads);
      setProjectFormValues(res.data?.result);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Project Created successfully';
      toast.success(successMessage);
      setLoader(false);

      handleNextStep();
      // setTimeout(() => {
      //   routes.push('/admin/projects');
      // }, 1000);

      console.log(res);
    } catch (error) {
      console.log(error, 'Error project');
      toast.error('Something went wrong');

      console.log(error);
    }
  };

  const updateProjectDetials = async (values: TDetailValues) => {
    setLoader(true);
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
      downPayment,
      totalAmt,
      emiAmt,
    } = values;

    console.log(values, 'project update');

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
      location: 'location',
      downPayment: +downPayment,
      emiAmt: +emiAmt,
      totalAmt: +totalAmt,
    };

    try {
      // console.log(formData);
      const res = await httpInstance.put(`project/update/${editId}`, payload);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Project updated successfully';
      toast.success(successMessage);

      setLoader(false);
      // setTimeout(() => {
      //   routes.push('/admin/projects');
      // }, 1000);

      console.log(res);
    } catch (error) {
      toast.error('Something went wrong');

      console.log(error);
    }
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TCreateProject) => {
      console.log(values, 'Values');
      // setProjectFormValues(values);
      // addProject(values);
      editId ? updateProjectDetials(values) : addProject(values);

      // setCounter((counter) => counter + 1);
      // if (isformikError === 0) {
      //   setShowImageUpload(true);
      //   setEnableSubmit(true);
      // }

      // if (enableSubmit && showImageUpload) {
      //   // addProject(values);

      //   editId ? updateProjectDetials(values) : addProject(values);
      // }
    },
  });

  useEffect(() => {
    const errors = formik.errors;
    const errorLength = Object.keys(errors).length;
    // console.log(errorLength);
    setIsFromikError(errorLength);
  }, [formik.handleSubmit]);

  const [pincodeQuery, setPincodeQuery] = useState<string>();

  const handlePinCodeApi = async (e) => {
    const query = e.target.value;
    if (query.length < 6) {
      formik.setFieldValue('state', '');
      formik.setFieldValue('dist', '');
    }
    setPincodeQuery(query);
    formik.setFieldValue('pincode', query);
  };

  useEffect(() => {
    setPincodeQuery(editInitialValues?.pincode);
  }, [editId]);

  useEffect(() => {
    if (pincodeQuery?.length === 6) {
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
    }
  }, [pincodeQuery, editId]);

  /* set Logo if editId exist */

  return (
    <>
      {/* <div className='flex items-center justify-center'>
        <Stepper />
      </div>
      {!showImageUpload ? (
        
      ) : (
      )} */}
      {/* <ProjectImages
        isEditActive={editId}
        loader={loader}
        projectLogo={projectLogo}
        setProjectLogo={setProjectLogo}
        planImages={planningImages}
        handleGoBack={() => setShowImageUpload(false)}
        handleSubmit={() => formik.handleSubmit()}
        setPlanImages={setPlanningImages}
        setProjectDevelopementImages={setSiteImages}
        projectDevelopementImages={siteImages}
      /> */}

      <AddProjectForm
        // handleProceed={() => setShowImageUpload(true)}
        handleProceed={() => formik.handleSubmit()}
        handleName={formik.handleChange}
        nameValue={formik.values.name}
        nameError={formik.touched.name && formik.errors.name ? true : false}
        nameErrorMessage={formik.errors.name}
        emiAmt={formik.values.emiAmt}
        handleEmi={formik.handleChange}
        downPayment={formik.values.downPayment}
        handleDownPayment={formik.handleChange}
        downPaymentError={
          formik.touched.downPayment && formik.errors.downPayment ? true : false
        }
        downPaymentErrorMessage={formik.errors.downPayment}
        totalAmt={formik.values.totalAmt}
        handleTotalAmount={formik.handleChange}
        totalAmtError={
          formik.touched.totalAmt && formik.errors.totalAmt ? true : false
        }
        totalAmtErrorMessage={formik.errors.totalAmt}
        emiAmtError={
          formik.touched.emiAmt && formik.errors.emiAmt ? true : false
        }
        emiErrorMessage={formik.errors.emiAmt}
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
      <SvmProjectToast />
    </>
  );
};

export default TestProjects;
