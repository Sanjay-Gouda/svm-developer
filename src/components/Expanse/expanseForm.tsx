import { Button, Label } from '@windmill/react-ui';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useProjectDetails } from '@/hooks/useProjectDetails';

import ComboBox from '@/components/ComboBox/comboBox';
import MiscellaneouForm from '@/components/Expanse/miscellaneouForm';
import { SvmProjectToast } from '@/components/Toast/Toast';
import { TextInput } from '@/components/ui-blocks';

import { httpInstance } from '@/constants/httpInstances';

type miscProps = {
  id?: number;
  expenseName: string | undefined;
  cost: number | undefined;
}[];

type miscexpenseProps = {
  expenseName: string;
  cost: undefined | number;
}[];

type projectProps = {
  id: string;
  projectName: string;
};

type payloadProps = {
  brokrage: string;
  landDevelopment: string;
  landPurchase: string;
  landVisit: string;
  miscExpense: miscexpenseProps;
  nonAgriculture: string;
  planningLayout: string;
  projectName: projectProps;
};

const initialValues = {
  projectName: '',
  landPurchase: '',
  nonAgriculture: '',
  brokrage: '',
  planningLayout: '',
  landVisit: '',
  landDevelopment: '',
};

type editPorps = {
  EditInitialValues?: any;
  miscExpenseList?: any;
  editId?: string;
};

const ExpanseForm = ({
  EditInitialValues,
  miscExpenseList,
  editId,
}: editPorps) => {
  const route = useRouter();
  const [loader, setLoader] = useState(false);
  const [showExapnseForm, setShowExapnseForm] = useState(true);
  const [miscForm, setMiscForm] = useState<miscProps>([
    {
      id: Math.floor(Math.random() * 1000),
      expenseName: '',
      cost: 0,
    },
  ]);

  useEffect(() => {
    setMiscForm(
      miscExpenseList?.map((exp) => ({
        id: Math.floor(Math.random() * 1000),
        expenseName: exp.expenseName,
        cost: exp.cost,
      }))
    );
    setShowExapnseForm(false);
  }, [miscExpenseList]);

  const projectList = useProjectDetails();
  const [query, setQuery] = useState('');
  const hadnleSearchQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const afterLeave = () => {
    setQuery('');
  };

  const filterProjects =
    query === ''
      ? projectList
      : projectList.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleAddFields = () => {
    setMiscForm([
      ...miscForm,
      {
        id: Math.floor(Math.random() * 1000),
        expenseName: '',
        cost: 0,
      },
    ]);
  };

  const handleRemoveFields = (id: number) => {
    const remainedForm = miscForm.filter((box) => {
      return box.id !== id;
    });
    setMiscForm(remainedForm);
    if (remainedForm.length === 0) {
      setShowExapnseForm(!showExapnseForm);
    }
  };

  const handleChange = (e: any, ind: number) => {
    const { name, value } = e.target;
    const miscFormData: any = [...miscForm];

    if (miscFormData) miscFormData[ind][name] = value;

    setMiscForm(miscFormData);
  };

  const addExpnases = async (values: payloadProps) => {
    setLoader(true);
    const {
      brokrage,
      landDevelopment,
      landPurchase,
      landVisit,
      miscExpense,
      nonAgriculture,
      planningLayout,
      projectName,
    } = values;

    const { id } = projectName;

    const payload = {
      landPurchase: +landPurchase,
      nonAgricultural: +nonAgriculture,
      planningAndLayout: +planningLayout,
      landDevelopment: +landDevelopment,
      brokerage: +brokrage,
      landVisitCharge: +landVisit,
      projectId: id,
      miscExpense: miscExpense,
    };

    try {
      const res = await httpInstance.post(`expense/create/`, payload);

      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Expense list added successfully';

      toast.success(successMessage);
      setLoader(false);
      setTimeout(() => {
        route.push('/admin/expanses');
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setLoader(false);
      setTimeout(() => {
        route.push('/admin/expanses');
      }, 1000);
    }
  };

  const updateExpenses = async (values: payloadProps) => {
    setLoader(true);
    const {
      brokrage,
      landDevelopment,
      landPurchase,
      landVisit,
      miscExpense,
      nonAgriculture,
      planningLayout,
      projectName,
    } = values;

    const { id } = projectName;

    const payload = {
      landPurchase: +landPurchase,
      nonAgricultural: +nonAgriculture,
      planningAndLayout: +planningLayout,
      landDevelopment: +landDevelopment,
      brokerage: +brokrage,
      landVisitCharge: +landVisit,
      projectId: id,
      miscExpense: miscExpense,
    };

    try {
      const res = await httpInstance.put(`expense/update/${editId}`, payload);

      const isNotify = res.data.isNotify;
      const successMessage = isNotify
        ? res?.data?.message
        : 'Expense List updated successfully';

      toast.success(successMessage);
      setLoader(false);
      setTimeout(() => {
        route.push('/admin/expanses');
      }, 1000);
    } catch (err) {
      setLoader(false);
      toast.error('Something Went Wrong');
    }
  };

  const formikInitialvalues = editId ? EditInitialValues : initialValues;

  const formik = useFormik({
    initialValues: formikInitialvalues,
    onSubmit: (values) => {
      const miscExpense = miscForm?.map(({ expenseName, cost }) => ({
        expenseName,
        cost: cost ? +cost : 0,
      }));

      const miscFormvalues = {
        ...values,
        miscExpense,
      };

      editId ? updateExpenses(miscFormvalues) : addExpnases(miscFormvalues);
    },
  });

  return (
    <div className='mx-auto flex w-1/3 flex-col gap-2'>
      <div>
        <Label>Project Name</Label>
        <ComboBox
          placeholder='Project Name'
          data={filterProjects}
          query={query}
          afterLeave={afterLeave}
          handleSearchQuery={hadnleSearchQuery}
          selected={formik.values.projectName}
          setSelected={(project: any) => {
            formik.setFieldValue('projectName', project);
          }}
        />
      </div>

      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landPurchase'
          label='Land Purchase'
          placeholder='cost '
          onChange={formik.handleChange}
          value={formik.values.landPurchase}
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='nonAgriculture'
          label='Non-Agriculture'
          placeholder=' cost '
          onChange={formik.handleChange}
          value={formik.values.nonAgriculture}
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='brokrage'
          label='Brokrage'
          placeholder='cost '
          onChange={formik.handleChange}
          value={formik.values.brokrage}
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='planningLayout'
          label='Planning & Layout'
          placeholder='cost '
          onChange={formik.handleChange}
          value={formik.values.planningLayout}
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landVisit'
          label='Land Visit'
          placeholder='cost '
          onChange={formik.handleChange}
          value={formik.values.landVisit}
        />
      </div>
      <div className='flex flex-col'>
        <TextInput
          type='text'
          name='landDevelopment'
          label='Land Developement'
          onChange={formik.handleChange}
          value={formik.values.landDevelopment}
          placeholder='cost '
        />
      </div>

      <div className='flex flex-col gap-2'>
        {showExapnseForm ? (
          <>
            <Button
              className='my-1'
              layout='outline'
              onClick={() => {
                setShowExapnseForm(false);
              }}
            >
              Add Miscellaneous Exapnse
            </Button>
          </>
        ) : (
          <>
            {miscForm?.map((box, ind) => {
              return (
                <MiscellaneouForm
                  index={ind}
                  key={box.id}
                  expanse={box.expenseName}
                  cost={box.cost}
                  handleHideForm={() => {
                    setShowExapnseForm(true);
                    // setMiscForm([{ expenseName: '', cost: undefined }]);
                  }}
                  handleChange={(e) => {
                    handleChange(e, ind);
                  }}
                  handleAddFields={handleAddFields}
                  handleRemoveFields={() => {
                    handleRemoveFields(box.id);
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      <Button className='' onClick={() => formik.handleSubmit()}>
        {editId ? 'Update' : 'Submit'}
        {loader && <ClipLoader size={20} className='ml-1' color='white' />}
      </Button>
      {editId ? (
        <Button layout='outline' onClick={() => route.push('/admin/expanses')}>
          Cancel
        </Button>
      ) : null}
      <SvmProjectToast />
    </div>
  );
};

export default ExpanseForm;
