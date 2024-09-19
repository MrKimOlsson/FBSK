import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditMemberForm = ({ member, setEditingMember, setMembers, setAdmins }) => {
  const [updatedMember, setUpdatedMember] = useState({
    firstname: member.firstname || '',
    lastname: member.lastname || '',
    email: member.email || '',
    payed: member.payed || false,
    admin: member.admin || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = (name === 'payed' || name === 'admin') ? (value === 'true') : value;
    setUpdatedMember(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const memberRef = doc(db, 'users', member.id);

      const updatedData = {
        ...updatedMember,
        payed: updatedMember.payed,
        admin: updatedMember.admin
      };

      await updateDoc(memberRef, updatedData);

      setMembers(prevMembers =>
        prevMembers.map(m =>
          m.id === member.id ? { ...m, ...updatedData } : m
        )
      );

      setAdmins(prevAdmins =>
        prevAdmins.map(a =>
          a.id === member.id ? { ...a, ...updatedData } : a
        )
      );

      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member: ', error.message);
      alert('Error updating member. Please check the console for details.');
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-member-form">
      <h2>Redigera Member: {updatedMember.firstname} {updatedMember.lastname}</h2>

      <label>
        Förnamn:
        <input
          type="text"
          name="firstname"
          value={updatedMember.firstname}
          onChange={handleChange}
          required
          autoComplete="given-name"
        />
      </label>

      <label>
        Efternamn:
        <input
          type="text"
          name="lastname"
          value={updatedMember.lastname}
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
      </label>

      <label>
        Epost:
        <input
          type="email"
          name="email"
          value={updatedMember.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </label>

      <label>
        Medlemsavgift:
        <select
          name="payed"
          value={updatedMember.payed ? 'true' : 'false'}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <label>
        Administratör:
        <select
          name="admin"
          value={updatedMember.admin ? 'true' : 'false'}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditMemberForm;
