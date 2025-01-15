'use client';

import styles from './page.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from './GlobalRedux/Features/counter/counterSlice';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Container,
} from '@mantine/core';

import { useState } from 'react';
import { editDocument, deleteDocument } from '../GlobalRedux/Features/firebaseSlice';
import type { AppDispatch, RootState } from '../GlobalRedux/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.firebase);

  // State for handling edit and delete operations
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  // Handling edit operation
  const handleEdit = () => {
    if (!editId || !name || !description || !parentId) {
      alert('Please fill in all fields for editing.');
      return;
    }
    dispatch(editDocument({ id: editId, name, description, parentId }));
  };

  // Handling delete operation
  const handleDelete = () => {
    if (!deleteId) {
      alert('Please provide an ID to delete.');
      return;
    }
    dispatch(deleteDocument(deleteId));
  };

  // Mantine form setup
  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      description: '',
      parentId: '',
    },

    validate: {
      id: (value) => (value ? null : 'ID is required'),
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      description: (value) =>
        value.trim().length > 0 ? null : 'Description is required',
      parentId: (value) => (value !== '' ? null : 'Parent ID is required'),
    },
  });

  const handleSubmit = (values: { id: string; name: string; description: string; parentId: string }) => {
    console.log('Form submitted with values:', values);
  };

  return (
    <main style={{ padding: '20px' }}>
      {/* Edit Document Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Edit Document</h2>
        <input
          type="text"
          placeholder="Enter ID"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <input
          type="text"
          placeholder="Enter Parent ID"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button
          onClick={handleEdit}
          style={{ padding: '10px', background: '#0070f3', color: 'white' }}
        >
          Edit
        </button>
      </section>

      {/* Delete Document Section */}
      <section>
        <h2>Delete Document</h2>
        <input
          type="text"
          placeholder="Enter ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button
          onClick={handleDelete}
          style={{ padding: '10px', background: '#d32f2f', color: 'white' }}
        >
          Delete
        </button>
      </section>

      {/* Status and Error Messages */}
      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Mantine Form Section */}
      <Container className="mx-auto max-w-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Model Form</h1>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="space-y-4 bg-white p-6 shadow-md rounded-lg"
        >
          <NumberInput
            label="ID"
            placeholder="Enter ID"
            {...form.getInputProps('id')}
            className="w-full"
          />

          <TextInput
            label="Name"
            placeholder="Enter name"
            {...form.getInputProps('name')}
            className="w-full"
          />

          <Textarea
            label="Description"
            placeholder="Enter description"
            {...form.getInputProps('description')}
            className="w-full"
          />

          <NumberInput
            label="Parent ID"
            placeholder="Enter Parent ID"
            {...form.getInputProps('parentId')}
            className="w-full"
          />

          <Group position="right">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Container>
    </main>
  );
}
