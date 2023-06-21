import Drawers from '../Drawers'
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ParamaterDrawer from '../ParamaterDrawer';
const useStyles = makeStyles((theme) => ({
  textfield: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "30px",
  },
  container: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-evenly",
  },
  progressBarContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  },
  progressBar: {
    width: "100%",
  },
  textfield: {
    textAlign: "center",
  },
}));
const drawerWidth = 240;
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
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme();
function DashBoardContent() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true);
  const [apiData, setApiData] = useState([]);
  const classes = useStyles();
  const [sliderValueArray, setSliderValueArray] = useState([]);
  const [cardStatsData, setCardStatsData] = useState([]);
  const [index, setIndex] = useState(apiData.length - 1);
  const [statsData, setStatsData] = useState([]);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [monthValue, setMonthValue] = useState("");
  const [monthIndex, setMonthIndex] = useState(0);
  const [incentive, setIncentive] = useState(1000);

  // fetching api data
  useEffect(() => {
    setStatsData(JSON.parse(localStorage.getItem("cardStatsData")));
    setIndex(Number(localStorage.getItem("UserloginKey")));
    axios.get("http://localhost:8000/api/products").then((res) => {
      setApiData(res.data);
    });
    setCardStatsData(JSON.parse(localStorage.getItem("cardStatsData")));
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      setSliderValueArray(apiData[index]?.stats[0]?.sliderValueArray);
    }
  }, [apiData, index]);

  let a = 0;
  useEffect(() => {
    for (let j = 0; j < apiData[index]?.stats.length; j++) {
      for (let i = 0; i < sliderValueArray.length; i++) {
        a = a + sliderValueArray[i].value;
      }
    }
    let b = 0;
    for (let i = 0; i < statsData.length; i++) {
      b = b + Number(statsData[i].statsMaxValue);
    }
    const d = Math.round((a / b) * 100);
    setProgressBarValue(d);
  }, [apiData]);

  function handleChange(e) {
    setMonthValue(e.target.value);
  }
  useEffect(() => {
    for (let i = 0; i < apiData[index]?.stats.length; i++) {
      if (apiData[index]?.stats[i].month == monthValue) {
        setMonthIndex(i);
        break;
      }
    }
  }, [monthValue]);
  console.log(apiData[index]?.email, "mail")
  React.useEffect(() => {
    if (progressBarValue > 300) {
      setIncentive(incentive * 2);
    }
    if (progressBarValue > 600) {
      setIncentive(incentive * 3);
    }
    if (progressBarValue > 900) {
      setIncentive(incentive * 4);
    }
    if (progressBarValue > 1000) {
      setIncentive(incentive * 5);
    }
    if (progressBarValue > 1200) {
      setIncentive(incentive * 6);
    }
  }, [progressBarValue]);

  function handleBack() {
    navigate("/app/signin")
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <h3>{apiData[index]?.email} (</h3>
            <h3>{apiData[index]?.role})</h3>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton>
                <h5>Filter Month Data</h5>
              </ListItemButton>
              <ListItemButton>
                <DashboardIcon />

                {/* filter dropdown  */}
                <FormControl sx={{ ml: 4, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    label="monthValue"
                    onChange={handleChange}
                    value={monthValue}
                    displayEmpty
                    inputProps={{ "aria-label": "label" }}
                  >
                    {apiData[index]?.stats.map((item, index) => (
                      <MenuItem key={index} value={item.month}>
                        {item.month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItemButton>
              <ListItemButton>
                <Drawers apiData={apiData} index={index} />

              </ListItemButton>
              <ListItemButton>

                <ParamaterDrawer apiData={apiData} index={index} />
              </ListItemButton>
            </React.Fragment>
          </List>
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
          <Toolbar />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <h2 className={classes.title}>
                  Month Performance: {monthValue}
                </h2>
                <Paper
                  className={classes.paper}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {apiData[index]?.stats[monthIndex]?.sliderValueArray.map(
                    (result, index) => (
                      <div key={result.type}>
                        <div className={classes.progressBarContainer}>
                          <SemiCircleProgressBar
                            className={classes.progressBar}
                            percentage={
                              (Number((result.value /
                                cardStatsData[index]?.statsMaxValue) *
                                100).toFixed(1))
                            }
                            showPercentValue
                          />
                        </div>
                        <Typography className={classes.textfield}>
                          {result.type}
                        </Typography>
                      </div>
                    )
                  )}
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <h2 className={classes.title}>
                  Score:{incentive}
                </h2>
                <Paper className={classes.paper}>
                  <Stack spacing={2}>
                    <Alert severity="info">
                      Total Calculated Incentive Rs: {incentive}
                    </Alert>
                  </Stack>
                </Paper>
              </Grid>

              {/* Recent Orders */}

              <Grid item xs={12}>
                <br />
                <br />
                <br />
                <h2 className={classes.title}>Overall Score</h2>
                <Paper className={classes.paper}>
                  <br />
                  <br />
                  <progress
                    min="0"
                    max={1200}
                    value={progressBarValue}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <h5>Maximum Score: 1200</h5>
                  <h5>Your Score: {progressBarValue || 0}</h5>
                  <br />
                </Paper>
              </Grid>
            </Grid>
          </Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default function Dashboard() {
  return <DashBoardContent />;
}