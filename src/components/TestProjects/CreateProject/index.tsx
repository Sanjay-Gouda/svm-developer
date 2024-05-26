import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
// import Stepper from 'react-stepper-horizontal';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { TDetailValues } from '@/components/Projects/projectDetailType';
import AddProjectForm from '@/components/TestProjects/CreateProject/addProjectForm';
import { TCreateProject } from '@/components/TestProjects/types';
import { SvmProjectToast } from '@/components/Toast/Toast';

import { API_ENDPOINT } from '@/const/APIRoutes';
import { httpInstance } from '@/constants/httpInstances';
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  ownerName: Yup.string().required('Owner Name is required'),
  area: Yup.number().required('Area must be in number'),
  pincode: Yup.string().required('Pincode is required'),
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
  status: 'ACTIVE',
  address1: undefined,
  location: '',
};

type editProps = {
  editInitialValues?: any;
  editId?: string;
  handleNextStep?: () => void;
  handleTabChange?: () => void;
  setProjectFormValues?: (value: TCreateProject) => void;
};

const TestProjects = ({
  editId,
  editInitialValues,
  handleNextStep,
  setProjectFormValues,
  handleTabChange,
}: editProps) => {
  const [loader, setLoader] = useState(false);

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
    };

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
    } catch (error) {
      setLoader(false);

      toast.error(error?.response?.data?.message || 'Something went wrong');
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
      location: 'location',
    };

    try {
      // console.log(formData);
      const res = await httpInstance.put(`project/update/${editId}`, payload);
      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Project updated successfully';
      toast.success(successMessage);
      handleTabChange();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const formInitialValue = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formInitialValue,
    validationSchema,
    onSubmit: (values: TCreateProject) => {
      // console.log(values, 'Update Values');
      editId ? updateProjectDetials(values) : addProject(values);
    },
  });

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

  return (
    <>
      <AddProjectForm
        editId={editId}
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
        loader={loader}
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
