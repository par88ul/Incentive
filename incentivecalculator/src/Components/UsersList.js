import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const StyledTable = styled(Table)`
  width: 97%;
  margin: 80px 0 0 50px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #161a46e8;
    color: #ffffff;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 12px;
  }
`;
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchuser();
  }, []);

  function fetchuser() {
    axios.get("http://localhost:8000/api/products").then(function (response) {
      setUsers(response.data);
    });
  }

  function handleDelete(index) {
    axios
      .delete(`http://localhost:8000/api/products/${users[index]._id}`)
      .then((res) => {
        fetchuser();
      });
  }
  const navigate = useNavigate();

  function handleclick(index) {
    localStorage.setItem("index", users[index]._id);
    navigate(`/admin/addstats/${users[index]._id}`);
  }

  return (
    <StyledTable>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableHead>
          <THead>
            <TableCell>CreatedBy</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Last UpdatedBy</TableCell>
            <TableCell>Password</TableCell>
            <TableCell> Users Permissions</TableCell>
            <TableCell>Role</TableCell>
            <TableCell> Parameter Permissions</TableCell>
            <TableCell>ADD/DELETE</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user, index) => {
            return (
              <TRow key={user._id}>
                <TableCell>{user.createdBy}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.lastUpdatedBy}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user?.savedPermission[0]?.Create && "C-"}{user?.savedPermission[0]?.Read && 'R- '}{user?.savedPermission[0]?.Update && 'U-'}{user?.savedPermission[0]?.Delete && 'D'}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user?.savedPermission[1]?.Create && "C-"}{user?.savedPermission[1]?.Read && 'R- '}{user?.savedPermission[1]?.Update && 'U-'}{user?.savedPermission[1]?.Delete && 'D'}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginBottom: 10 }}
                    onClick={() => handleclick(index)}
                  >
                    stats
                  </Button>

                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TRow>
            );
          })}
        </TableBody>
      </Paper>
    </StyledTable>
  );
};
export default AllUsers;
