
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControlLabel, FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Paper, Box, Checkbox } from '@mui/material';

const Container = styled(FormGroup)`
    width: 60%;
    margin: 5% 0 0 20%;
    & > div{
        margin-top: 20px
    }
`;


export default function CreateUsers() {
  const [createdBy, setCreatedBy] = useState("ADMIN")
  const [email, setEmail] = useState("")
  const [lastUpdatedBy, setLastUpdatedBy] = useState("ADMIN")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [permission, setPermission] = useState(
    {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    }
  )
  const [parameterPermission, setParameterPermission] = useState(
    {
      create: false,
      read: false,
      update: false,
      delete: false,
    }
  )
  const [stats, setstats] = useState([])
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/products', {
        createdBy: createdBy,
        email: email,
        lastUpdatedBy: lastUpdatedBy,
        password: password,
        role: role,
        permission: permission,
        parameterPermission: parameterPermission,
        stats: stats
      });
    }
    catch (error) {
      console.error(error)
    }
    navigate('/admin/userlist')
  };

  const handlePermissionChange = (e) => {
    setPermission((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  }
  const handleParameterPermissionChange = (e) => {
    setParameterPermission((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  }

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 4,
          width: 680,
          height: 580,
        },
      }}
    >

      <Paper elevation={3} >

        <Container>
          <Typography variant="h4" style={{ textAlign: 'center' }}>Add User</Typography>

          <FormControl>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input value={email}
              onChange={(e) => setEmail(e.target.value)} name='email' id="my-input" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input onChange={(e) => setPassword(e.target.value)} name='phone' value={password} id="my-input" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='role'
              value={role}
              label="Age"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={'TL'}>TL</MenuItem>
              <MenuItem value={'T-SDE'}>T-SDE</MenuItem>
              <MenuItem value={'A-SDE'}>A-SDE</MenuItem>
              <MenuItem value={'BD'}>BD</MenuItem>
            </Select>
          </FormControl>
          <Box >
            <Typography> Users Permissions</Typography>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permission.Create}
                  onChange={handlePermissionChange}
                  name="Create"
                />
              }
              label="Create"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permission.Read}
                  onChange={handlePermissionChange}
                  name="Read"
                />
              }
              label="Read"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permission.Update}
                  onChange={handlePermissionChange}
                  name="Update"
                />
              }
              label="Update"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permission.Delete}
                  onChange={handlePermissionChange}
                  name="Delete"
                />
              }
              label="Delete"
            />
          </Box>
          <Box >
            <Typography> Parameter Permissions</Typography>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={parameterPermission.create}
                  onChange={handleParameterPermissionChange}
                  name="create"
                />
              }
              label="create"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={parameterPermission.read}
                  onChange={handleParameterPermissionChange}
                  name="read"
                />
              }
              label="read"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={parameterPermission.update}
                  onChange={handleParameterPermissionChange}
                  name="update"
                />
              }
              label="update"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={parameterPermission.delete}
                  onChange={handleParameterPermissionChange}
                  name="delete"
                />
              }
              label="delete"
            />
          </Box>
          <FormControl >
            <Button variant="contained" color="primary" onClick={handleSubmit}>Add User</Button>
          </FormControl>
        </Container>
      </Paper>
    </Box>
  )
}