// src/Components/Dashboard/ExpenseHistory.jsx
import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ExpenseHistory = ({ expenses, onDelete, onDeleteAll }) => {
  // State to control the visibility of the "Delete All" confirmation modal
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [error, setError] = useState('');

  // Handlers to open and close the modal
  const handleShowDeleteAllModal = () => {
    setShowDeleteAllModal(true);
    setDeleteConfirmationText('');
    setError('');
  };

  const handleCloseDeleteAllModal = () => {
    setShowDeleteAllModal(false);
    setDeleteConfirmationText('');
    setError('');
  };

  // Handler to confirm deletion of all expenses
  const handleConfirmDeleteAll = () => {
    if (deleteConfirmationText !== 'delete') {
      setError('Please type "delete" to confirm.');
      return;
    }
    // Proceed to delete all expenses
    onDeleteAll();
    handleCloseDeleteAllModal();
  };

  return (
    <>
      <Card className="p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Expense History</h5>
          <Button variant="danger" onClick={handleShowDeleteAllModal}>
            <FaTrash className="me-2" />
            Delete All Expenses
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => onDelete(expense._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Delete All Expenses Confirmation Modal */}
      <AnimatePresence>
        {showDeleteAllModal && (
          <Modal
            show={showDeleteAllModal}
            onHide={handleCloseDeleteAllModal}
            centered
            backdrop="static"
            keyboard={false}
            size="md"
            aria-labelledby="delete-all-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Modal.Header closeButton>
                <Modal.Title id="delete-all-modal">Delete All Expenses</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Are you sure you want to delete all your expenses? This action cannot be undone. Please type <strong>delete</strong> in the box below to confirm.
                </p>
                <Form>
                  <Form.Group controlId="formDeleteConfirmation">
                    <Form.Label>Type "delete" to confirm:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Type "delete" here'
                      value={deleteConfirmationText}
                      onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    />
                  </Form.Group>
                  {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteAllModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDeleteAll}>
                  Delete All
                </Button>
              </Modal.Footer>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpenseHistory;
