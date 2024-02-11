import dynamic from 'next/dynamic';

const PDF = dynamic(() => import('@/components/PDF/receiptPDF'), {
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
