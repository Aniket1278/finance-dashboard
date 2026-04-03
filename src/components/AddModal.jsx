import { useState, useEffect } from "react";

export default function AddModal({ onClose, onSave, editData }) {
  const [form, setForm] = useState({
    date: "",
    desc: "",
    category: "Food",
    type: "expense",
    amount: ""
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.date || !form.desc || !form.amount) {
      alert("Fill all fields");
      return;
    }

    onSave({
      ...form,
      amount: Number(form.amount),
      id: editData ? form.id : Date.now()
    });

    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>{editData ? "Edit" : "Add"} Transaction</h3>

        <input type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} />
        <input type="text" value={form.desc} onChange={e => handleChange("desc", e.target.value)} />

        <select value={form.category} onChange={e => handleChange("category", e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Utility</option>
          <option>Salary</option>
          <option>Other</option>
        </select>

        <select value={form.type} onChange={e => handleChange("type", e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input type="number" value={form.amount} onChange={e => handleChange("amount", e.target.value)} />

        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}