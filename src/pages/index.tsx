import { Card, CardBody, Input, Label } from '@windmill/react-ui';

export default function HomePage() {
  return (
    <>
      <Card>
        <CardBody className='flex items-center'>
          <div>
            <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
              Hello world
            </p>
            <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
              Testing
            </p>
          </div>
        </CardBody>
      </Card>
      <Label>
        <span>Name</span>
        <Input css={{}} className='mt-1' placeholder='Jane Doe' />
      </Label>
    </>
  );
}
