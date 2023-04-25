// import SectionTitle from '@/components/Typography/SectionTitle';
// import { TextInput, TextInputArea } from '@/components/ui-blocks';
// import { SelectOption } from '@/components/ui-blocks/input';
// import Layout from '@/containers/Layout';

// import { Button, Card, CardBody } from '@windmill/react-ui';
// import Link from 'next/link';
// import React, { useState } from 'react';

// const AddProjects = () => {
//   const Options = ['Pending', 'In-Progress', 'Completed'];
//   const ParentProjects = ['pp1', 'pp2', 'pp3'];
//   const [projectDetails, setProjectDetails] = useState({
//     projectName: '',
//     ownerName: '',
//     city: '',
//     blockNo: '',
//     desc: '',
//     area: '',
//     status: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setProjectDetails({
//       ...projectDetails,
//       [name]: value,
//     });
//   };

//   const handleSubmitProjectDetails = () => {
//     console.log(projectDetails);
//   };

//   return (
//     <Layout>
//       <Card className='mx-auto h-full w-full p-2'>
//         <Card className=' mx-auto h-full w-[80%] p-2'>
//           <CardBody>
//             <SectionTitle>Add Project Details</SectionTitle>
//             <form className='mb-5 flex flex-col gap-5'>
//               <div className='flex w-full items-center justify-between gap-5'>
//                 <TextInput
//                   value={projectDetails.projectName}
//                   name='projectName'
//                   handleChange={handleChange}
//                   containerClassName='flex-1 w-1/2'
//                   label='Project Name'
//                 />
//                 <TextInput
//                   value={projectDetails.ownerName}
//                   name='ownerName'
//                   handleChange={handleChange}
//                   containerClassName='flex-1 w-1/2'
//                   label='Projects Owner'
//                 />
//               </div>
//               <div className='flex w-full justify-between gap-5'>
//                 <SelectOption
//                   title='Parent Project'
//                   options={ParentProjects}
//                   onChange={handleChange}
//                   containerClassName='mt-1 w-1/2'
//                   name='parentProject'
//                   // value={projectDetails.projectName}
//                 />
//                 <TextInput
//                   value={projectDetails.city}
//                   name='city'
//                   handleChange={handleChange}
//                   containerClassName='flex-1 w-1/2'
//                   label='City'
//                 />
//               </div>

//               <div className='flex justify-between gap-5'>
//                 <TextInput
//                   value={projectDetails.blockNo}
//                   name='blockNo'
//                   handleChange={handleChange}
//                   containerClassName='flex-1'
//                   label='Block No'
//                 />
//                 <TextInput
//                   value={projectDetails.area}
//                   name='area'
//                   handleChange={handleChange}
//                   containerClassName='flex-1'
//                   label='Area sq/ft'
//                 />
//               </div>

//               <div className='flex justify-between gap-5'>
//                 <TextInputArea
//                   value={projectDetails.desc}
//                   name='desc'
//                   containerClassName='flex-1 '
//                   label='Description'
//                   rows='3'
//                   handleChange={handleChange}
//                 />
//                 <SelectOption
//                   onChange={handleChange}
//                   name='status'
//                   title='Project Status'
//                   options={Options}
//                   // value={projectDetails.status}
//                   containerClassName='mt-1 w-1/2'
//                 />
//               </div>

//               <div className='flex  justify-end gap-5'>
//                 <Button size='regular' onClick={handleSubmitProjectDetails}>
//                   Submit
//                 </Button>
//                 <Button layout='outline'>Cancel</Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </Card>
//     </Layout>
//   );
// };

// export default AddProjects;

export {};
