'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDocument, deleteDocument } from "../GlobalRedux/Features/firebaseSlice";
import type { AppDispatch, RootState } from "../GlobalRedux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.firebase);

  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const handleEdit = () => {
    if (!editId || !name || !description || !parentId) {
      alert("Please fill in all fields for editing.");
      return;
    }
    dispatch(editDocument({ id: editId, name, description, parentId }));
  };

  const handleDelete = () => {
    if (!deleteId) {
      alert("Please provide an ID to delete.");
      return;
    }
    dispatch(deleteDocument(deleteId));
  };

  return (
    <main style={{ padding: "20px" }}>
      <section style={{ marginBottom: "20px" }}>
        <h2>Edit Document</h2>
        <input
          type="text"
          placeholder="Enter ID"
          value={editId}
          onChange={(e) => setEditId(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <input
          type="text"
          placeholder="Enter Parent ID"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <button onClick={handleEdit} style={{ padding: "10px", background: "#0070f3", color: "white" }}>
          Edit
        </button>
      </section>

      <section>
        <h2>Delete Document</h2>
        <input
          type="text"
          placeholder="Enter ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <button onClick={handleDelete} style={{ padding: "10px", background: "#d32f2f", color: "white" }}>
          Delete
        </button>
      </section>

      {status === "loading" && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
