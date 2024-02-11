import dynamic from 'next/dynamic';

const PDF = dynamic(() => import('@/components/PDF/bookinfPDF'), {
  ssr: false,
});

const DummyPDF = () => {
  return (
    <>
      <PDF />
    </>
  );
};

export default DummyPDF;
