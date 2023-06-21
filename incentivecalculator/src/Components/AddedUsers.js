import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { v4 as uuid } from 'uuid'
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Modal } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { UserList } from ".";
import Paper from '@mui/material/Paper';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;
const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 1000,
      [theme.breakpoints.up("sm")]: {
        width: 200,
      },
    }),
  },
}));

const StyledTable = styled(Table)`
  width: 80%;
  margin: 80px 0 0 50px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    width:20%;
    background: #161a46e8;
    color: #ffffff;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 19px;
  }
`;
const mdTheme = createTheme();
function DashboardContent() {
  const [modal, setModal] = React.useState(false);
  const handleClose = () => setModal(false);
  const [statsData, setStatsData] = React.useState([]);
  const [statsIndex, setStatsIndex] = React.useState(-1);
  const [statsTypeValue, setStatsTypeValue] = React.useState();
  const [statsMaxValue, setStatsMaxValue] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false)
  function handleOpen() {
    setModal(true);
  }

  function handleSaveData() {
    setStatsData((prev) => [
      ...prev,
      {
        id: uuid(),
        statsTypeValue,
        statsMaxValue,
        createdBy: "Admin",
        updatedBy: "Admin",
      },
    ]);

    const newStat = {
      id: uuid(),
      statsTypeValue,
      statsMaxValue,
      createdBy: "Admin",
      updatedBy: "Admin",
    }

    const newStatsAdded = [...statsData, newStat]
    localStorage.setItem('cardStatsData', JSON.stringify(newStatsAdded))


    handleClose();
    setStatsMaxValue("")
    setStatsTypeValue("")
  }

  const navigate = useNavigate();
  function Logout() {
    navigate("/")
  }

  const getStatData = () => {
    const statsData = JSON.parse(localStorage.getItem("cardStatsData"))
    if(statsData){
      setStatsData(statsData)
    }else{
      setStatsData([])
    }
  }

  React.useEffect(() => {
    getStatData()
  }, [])

  const handleParamDelete = (index) => {
    const copyStats = statsData
    copyStats.splice(index, 1);
    localStorage.setItem("cardStatsData", JSON.stringify(copyStats));
    getStatData()

  };
  const handleStatsUpdate = () => {
    const statsCopy = statsData;
    const stat = {
      statsTypeValue,
      statsMaxValue,
      createdBy: "Admin",
      updatedBy: "Admin",
    };
    statsCopy.splice(statsIndex, 1, stat)
    localStorage.setItem("cardStatsData", JSON.stringify(statsCopy))
    handleClose()
    getStatData()

  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: "36px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <LogoutIcon onClick={Logout} />
          </Toolbar>

        </AppBar>
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/*  */}


          <Toolbar>
            <i class="fa-solid fa-user"></i>
            <Tabs style={{ color: 'black', margin: '0 auto' }} to="/admin/createuser" exact>Add User</Tabs>
          </Toolbar>
          <Button variant="contained" color="success"
            style={{ marginRight: 10, fontSize: 15, fontWeight: 200 }}
            onClick={handleOpen}
          >
            Add Parameter
          </Button>
          <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                style={{ width: "300px", margin: "5px" }}
                type="text"
                label="stat type"
                onChange={(e) => { setStatsTypeValue(e.target.value) }}
                value={statsTypeValue}
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "300px", margin: "5px" }}
                type="number"
                inputProps={{ min: 0, max: 500 }}
                label="Max range"
                value={statsMaxValue}
                onChange={(e) => { setStatsMaxValue(e.target.value) }}
                variant="outlined"
              />
              <br />
              <br />
              <Button className='button' style={{ width: "300px" }} variant="contained" color="primary" onClick={!isUpdate ? handleSaveData : handleStatsUpdate} >
                save
              </Button>
            </Box>
          </Modal>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >

          <UserList />
          <StyledTable>
            <h2>  Parameter Table</h2>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableHead>
                <THead>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell> Max Value</TableCell>
                  <TableCell>CreatedBy</TableCell>
                  <TableCell>Last UpdatedBy</TableCell>
                  <TableCell>ADD/DELETE</TableCell>
                </THead>
              </TableHead>
              <TableBody>
                {statsData && statsData.map((user, index) => (
                  <TRow key={user._id}>
                    <TableCell>{user.statsTypeValue}</TableCell>
                    <TableCell>{user.statsMaxValue}</TableCell>
                    <TableCell>{user.createdBy}</TableCell>
                    <TableCell>{user.updatedBy}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handleOpen()
                          setStatsTypeValue(user.statsTypeValue)
                          setStatsMaxValue(user.statsMaxValue)
                          setStatsIndex(index)
                          setIsUpdate(true)
                        }
                        }
                      >
                        Update
                      </Button>

                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => handleParamDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TRow>
                ))}
              </TableBody>
            </Paper>
          </StyledTable>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function AddedUsers() {
  return <DashboardContent />;
}
