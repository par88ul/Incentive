import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Modal } from '@mui/material';
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminUser from './AdminUser';
const StyledTable = styled(Table)`
  width: 99%;
  margin: 10px 0 0 10px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 25px;
    background: #161a46e8;
    color: #ffffff;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 22px;
  }
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function TemporaryDrawer({ apiData, index }) {

  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  useEffect(() => {
    fetchuser();
  }, []);

  function fetchuser() {
    axios.get("http://localhost:8000/api/products").then(function (response) {
      setUsers(response.data);
    });
  }
  useEffect(() => {
    setPermissions(apiData[index]?.permission)
  }, [apiData])
  function handleDelete(index) {
    axios
      .delete(`http://localhost:8000/api/products/${index}`)
      .then((res) => {
        fetchuser();
      });
  }
  function handleStat(index) {
    localStorage.setItem("index", index);
    navigate(`/admin/addstats/${index}`);
  }
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    localStorage.setItem('emailOfEditer', JSON.stringify(apiData[index]?.email||[]))
  }, [apiData])
  return (
    <div>

      <br />
      {permissions?.Create ?
        <Box>
          <Button color="success"
            variant="contained" onClick={handleOpen}>Create User</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AdminUser apiData={apiData} index={index} />
            </Box>
          </Modal>
        </Box> : <Button disabled>Create User</Button>}
      <br />
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <h2>Data</h2></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <StyledTable>
              <TableHead>
                <THead>

                  <TableCell>Email</TableCell>
                  <TableCell>CreatedBy</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>UpdatedBy</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>ADD/DELETE</TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {users.filter((user) => user.email !== apiData[index]?.email).map((user) => (
                  <TRow key={user._id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdBy}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.lastUpdatedBy}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {permissions?.Update ? <Button
                        color="primary"
                        variant="contained"
                        style={{ marginRight: 10 }}
                        onClick={() => handleStat(user._id)}
                      >
                        Edit Stats
                      </Button> : <Button disabled> Edit Stats</Button>}
                      {permissions?.Delete ? <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete User
                      </Button> : <Button disabled>Delete User</Button>}
                    </TableCell>
                  </TRow>
                ))}
              </TableBody>
            </StyledTable>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}