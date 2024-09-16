
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletelist, Fetchingdata, updatelist } from "../reduxcomponents/action";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const TodoList = ({ onEdit, topRef, onCancel }) => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadTodos = async () => {
      await dispatch(Fetchingdata());
      setLoading(false); 
    };
    loadTodos();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletelist(id));
    toast.success("Successfully deleted todo");
    onCancel();
  };

  const handleEdit = (todo) => {
    onEdit(todo);
    toast.success("Successfully edited todo");
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    topRef.current.focus();
  };

  const handleCheckboxChange = (id, completed, todo) => {
    dispatch(updatelist({ id, completed: !completed, todo }));
    toast.success("Successfully updated todo");
    onCancel();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="todo-list-container">
      <Paper sx={{ width: '100%', marginTop: '10px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <CircularProgress />
            </div>
          ) : todos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              No todos available
            </div>
          ) : (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Completed</TableCell>
                  <TableCell align="center">Task</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((todo) => (
                  <TableRow key={todo.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="center">
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleCheckboxChange(todo.id, todo.completed, todo.todo)}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                      {todo.todo}
                    </TableCell>
                    <TableCell align="center">
                      {!todo.completed && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(todo)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={todos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default TodoList;
