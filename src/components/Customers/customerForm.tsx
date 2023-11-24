import { Button } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import UploadDocuments from '@/components/Booking/uploadDocuments';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required '),
  lastName: Yup.string().required('Last Name is required '),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Mobile number')
    .required('Customer Mobile Number is required'),
  // aadharNo: Yup.string()
  //   .matches(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/, 'Invalid Aadhaar number')
  //   .required('Aadhar Card number is required '),
  email: Yup.string().email('Invalid email address'),
});

type formProps = {
  firstName: string;
  lastName: string;
  phone: string;
  aadharNo: string;
  email: string;
};

const addInitialValues: formProps = {
  firstName: '',
  lastName: '',
  phone: '',
  aadharNo: '',
  email: '',
};

type editValueProps = {
  editInitialValues?: any;
  editId?: string;
};

type Tpayload = {
  firstName: string;
  lastName: string;
  aadharNo: string;
  email: string;
  phone: string;
  aadharImages: any;
  panImages: any;
  customerImage: any;
};

function CustomerForm({ editInitialValues, editId }: editValueProps) {
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const routes = useRouter();
  const [isformikError, setIsFromikError] = useState<number>();
  const [showUploadDoc, setShowUploadDoc] = useState(false);
  const [loader, setLoader] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [passPhoto, setPassPhoto] = useState<any>([]);
  const [thirdPassphoto, setThirdPassphoto] = useState<any>([]);
  const [secondPassPhoto, setSecondPassPhoto] = useState<any>([]);

  const [frontAadharCard, setFrontAadharCard] = useState<any>([]);
  const [backAadharCard, setBackAadharCard] = useState<any>([]);
  const [panCard, setPanCard] = useState<any>([]);

  /* Add Customer  */
  const addCustomers = async (details: formProps) => {
    setLoader(true);

    const { aadharNo, email, firstName, lastName, phone } = details;

    const payload: Tpayload = {
      firstName: firstName,
      lastName: lastName,
      aadharNo: aadharNo,
      email: email,
      phone: phone,
      aadharImages: frontAadharCard,
      panImages: panCard,
      customerImage: passPhoto,
      // customerImage: secondPassPhoto,
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]: any) => {
      if (
        key !== 'aadharImages' &&
        key !== 'panImages' &&
        key !== 'customerImage'
      ) {
        formData.append(key, value);
      }
    });

    for (let i = 0; i < frontAadharCard.length; i++) {
      formData.append('aadharImages', frontAadharCard[i]);
    }
    for (let i = 0; i < backAadharCard.length; i++) {
      formData.append('aadharImages', backAadharCard[i]);
    }
    for (let i = 0; i < panCard.length; i++) {
      formData.append('panImages', panCard[i]);
    }
    for (let i = 0; i < passPhoto.length; i++) {
      formData.append('customerImage', passPhoto[i]);
    }
    for (let i = 0; i < secondPassPhoto.length; i++) {
      formData.append('customerImage', secondPassPhoto[i]);
    }
    for (let i = 0; i < thirdPassphoto.length; i++) {
      formData.append('customerImage', thirdPassphoto[i]);
    }

    try {
      const res = await httpInstance.post(`/customer/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log({ res });
      // const isNotify = res.data.isNotify;
      // const successMessage = isNotify
      //   ? res?.data?.message
      //   : 'Customer added successfully';
      // toast.success(successMessage);
      // setLoader(false);
      // setTimeout(() => {
      //   routes.push('/admin/customers');
      // }, 1000);
      // setIsDataSubmitted(true);
    } catch (err) {
      // toast.error('Something went wrong');
      // setLoader(false);
      // setTimeout(() => {
      //   routes.push('/admin/customers');
      // }, 1000);
      console.log(err, 'error');
    }

    // await axios({
    //   method: 'post',
    //   url: `${API_ENDPOINT.END_POINT}/customer/create`,
    //   data: details,
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((res) => {
    //     toast.success('Customer added successfully');
    //     setLoader(false);
    //     setTimeout(() => {
    //       routes.push('/admin/customers');
    //     }, 1000);
    //     setIsDataSubmitted(true);
    //   })
    //   .catch((err) => {
    //     toast.error('Something went wrong');
    //   });
  };

  /* Update Customer */
  const updateCustomers = async (details: formProps) => {
    setLoader(true);

    try {
      const res = await httpInstance.put(`/customer/update/${editId}`, details);

      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Customer added successfully';
      toast.success(successMessage);
      setLoader(false);
      setTimeout(() => {
        routes.push('/admin/customers');
      }, 1000);
      setIsDataSubmitted(true);
    } catch (err) {
      routes.push('/admin/customers');
      setLoader(false);
      toast.error('Something went wrong');
    }
  };

  const formValues = editId ? editInitialValues : addInitialValues;

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: formProps, { setSubmitting, resetForm }) => {
      if (isformikError === 0) {
        setShowUploadDoc(true);
        setEnableSubmit(true);
      }

      if (enableSubmit && showUploadDoc) {
        // editId ? updateCustomers(values) : addCustomers(values);
        console.log(values);
        addCustomers(values);
      }

      // if (isDataSubmitted) {
      //   resetForm();
      // }

      // setSubmitting(true);
    },
  });

  const handleGoBack = () => {
    setShowUploadDoc(false);
  };

  // const handleDocumentSubmit = () => {
  //   console.log({
  //     passPhoto,
  //     secondPassPhoto,
  //     thirdPassphoto,
  //     frontAadharCard,
  //     backAadharCard,
  //     panCard,
  //   });
  // };

  useEffect(() => {
    const errors = formik.errors;
    const errorLength = Object.keys(errors).length;
    console.log(errorLength);
    setIsFromikError(errorLength);
  }, [formik.handleSubmit]);

  return (
    <>
      {!showUploadDoc ? (
        <div className='mx-auto flex w-1/3 flex-col gap-2'>
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='firstName'
              label='FirstName'
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className='text-red-400'>{formik.errors.firstName}</div>
            )}
          </div>
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='lastName'
              label='LastName'
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className='text-red-400'>{formik.errors.lastName}</div>
            )}
          </div>
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='phone'
              label='Mobile No'
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className='text-red-400'>{formik.errors.phone}</div>
            )}
          </div>
          <div className='flex flex-col'>
            <TextInput
              type='text'
              name='aadharNo'
              label='Aadhar No'
              onChange={formik.handleChange}
              value={formik.values.aadharNo}
            />
            {formik.touched.aadharNo && formik.errors.aadharNo && (
              <div className='text-red-400'>{formik.errors.aadharNo}</div>
            )}
          </div>

          <div className='flex flex-col'>
            <TextInput
              type='email'
              name='email'
              label='Email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-400'>{formik.errors.email}</div>
            )}
          </div>

          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Proceed
          </Button>

          {/* <Button
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {editId ? 'Update' : 'Submit'}
          {loader && <ClipLoader size={20} color='white' />}
        </Button>
        {editId ? (
          <Button
            layout='outline'
            onClick={() => routes.push('/admin/customers')}
          >
            Cancel
          </Button>
        ) : null} */}
        </div>
      ) : (
        <UploadDocuments
          passPhoto={passPhoto}
          setPassphoto={setPassPhoto}
          secondPassphoto={secondPassPhoto}
          setSecondPassphoto={setSecondPassPhoto}
          thirdPassphoto={thirdPassphoto}
          setThirdPassphoto={setThirdPassphoto}
          frontAadharCard={frontAadharCard}
          setFrontAadharCard={setFrontAadharCard}
          backAadharCard={backAadharCard}
          setBackAadharCard={setBackAadharCard}
          panCard={panCard}
          setPanCard={setPanCard}
          handleDocumentSubmit={() => formik.handleSubmit()}
          // setDocuments={setDocuments}
          handleGoBack={handleGoBack}
        />
      )}

      <SvmProjectToast />
    </>
  );
}

export default CustomerForm;
