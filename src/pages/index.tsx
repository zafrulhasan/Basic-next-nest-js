// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [entities, setEntities] = useState([]);

//   const newStudent = {
//     name : "name",
//     age : 25,
//     grade: "A",
//   };

//   useEffect(() => {
//     axios.post('http://localhost:3001/student/', newStudent)
//       .then(response => {
//         console.log(response.data);
        
//         setEntities(response.data)
//       }
//       )
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//     {entities ? (
//       <div>
//         <h1>{entities.name}</h1>
//         <p>{entities.id}</p>
//         <p>{entities.grade}</p>
        
//       </div>
//     ) : (
//       <p>Loading...</p>
//     )}
//   </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { log } from 'console';

const StudentForm = ({ studentId }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (studentId) {
      // If there's a studentId, we are in edit mode
      setIsEdit(true);
      // Fetch the student data
      axios.get(`http://localhost:3001/student/${studentId}`)
        .then(response => {
          form.setFieldsValue(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [studentId, form]);

  const onFinish = (values) => {
    console.log(values);
    
    if (isEdit) {
      // Update existing student
      axios.put(`http://localhost:3001/student/${studentId}`, values)
        .then(response => {
          console.log('Student updated:', response.data);
        })
        .catch(error => console.error('Error updating student:', error));
    } else {
      // Create new student
      axios.delete('http://localhost:3001/student/1',)
        .then(response => {
          console.log('Student created:', response.data);
        })
        .catch(error => console.error('Error creating student:', error));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[{ required: true, message: 'Please input the age!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Grade"
        name="grade"
        rules={[{ required: true, message: 'Please input the grade!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'Update Student' : 'Create Student'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentForm;

