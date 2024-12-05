// src/Components/Dashboard/AddNewExpense.jsx
import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const AddNewExpense = ({ newExpense, setNewExpense, handleAddExpense }) => {
  const categories = ['Transport', 'Groceries', 'Housing', 'Savings', 'Others'];

  return (
    <Card className="p-4 shadow-sm">
      <h5>Add New Expense</h5>
      <Form onSubmit={handleAddExpense}>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Add Expense
        </Button>
      </Form>
    </Card>
  );
};

export default AddNewExpense;
