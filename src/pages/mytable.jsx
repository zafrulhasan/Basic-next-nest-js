import { Table } from 'antd';
import { useRouter } from 'next/router';

const MyTable = () => {
  const router = useRouter();
  const { firstName, lastName, email } = router.query;

  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  
  const dataSource = [
    {
      key: '1',
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
  ];

  return (
    <div>
      <h1>Submitted Data</h1>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default MyTable;
