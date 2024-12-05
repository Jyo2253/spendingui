// src/Components/Dashboard/ExpenseOverview.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const ExpenseOverview = ({ chartData }) => {
  return (
    <Card className="p-4 shadow-sm">
      <h5>Expense Overview</h5>
      <Pie data={chartData} />
    </Card>
  );
};

export default ExpenseOverview;
