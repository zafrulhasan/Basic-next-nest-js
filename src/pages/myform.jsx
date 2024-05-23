import { Form, Input, Button, Table, Space, Modal, Card, Row, Col } from 'antd';
import { useState } from 'react';

const MyPage = () => {
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onFinish = (values) => {
    if (isEditing) {
      const updatedTableData = [...tableData];
      updatedTableData[editIndex] = values;
      setTableData(updatedTableData);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTableData((prev) => [...prev, values]);
    }
    form.resetFields();
  };

  const handleEdit = (record, index) => {
    setIsEditing(true);
    setEditIndex(index);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    const newData = tableData.filter((item) => item !== recordToDelete);
    setTableData(newData);
    setDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setRecordToDelete(null);
    setDeleteModalVisible(false);
  };

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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record, index)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col span={12} >
          <Card
            title="Register"
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <Form name="basic" onFinish={onFinish} form={form}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {isEditing ? 'Update' : 'Submit'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div>
              <h1>Submitted Data</h1>
              <Table columns={columns} dataSource={tableData} />
            </div>
          </Card>
        </Col>
        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={confirmDelete}
          onCancel={cancelDelete}
        >
          <p>Are you sure you want to delete this record?</p>
        </Modal>
      </Row>
    </div>
  );
};

export default MyPage;
