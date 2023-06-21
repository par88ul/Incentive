import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  styled,
  Paper
} from "@mui/material";

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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddUserStats() {

  const { id } = useParams()
  const [month, setMonth] = useState("2023-01");
  const [sliderVal, setSliderVal] = useState({});
  const [employeeStats, setEmployeeStats] = useState({});
  const [statsLocalstorgeData, setStatsLocalstorgeData] = useState([]);
  const [indexdata, setindexdata] = useState({});
  const indexes = localStorage.getItem("index");
  const [open, setOpen] = React.useState(false);
  const [apiData, setApiData] = useState("");
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('emailOfEditer')) || '');
  const note = statsLocalstorgeData?.find((item) => item.id === id)
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(employeeStats));
  }, [employeeStats]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function HandleSubmit() {
    setSliderVal('')
    setMonth("")
    const sliderValueArray = statsLocalstorgeData.map((val) => ({
      type: val.statsTypeValue,
      value: sliderVal[val.statsTypeValue] || 0,
    }));
    const newStat = {
      month,
      sliderValueArray,
    };

    const updatedIndexData = {
      ...indexdata,
      lastUpdatedBy: notes,
      stats: [...indexdata.stats, newStat],
      ...indexdata,
      lastUpdatedBy: notes,

    };

    const existingDataIndex = updatedIndexData.stats.findIndex(
      (stat) => stat.month === month
    )

    if (existingDataIndex !== -1) {
      updatedIndexData.stats[existingDataIndex] = newStat
    } else {
      updatedIndexData.stats.push(newStat)
    }
    axios
      .put(`http://localhost:8000/api/products/${indexes}`, updatedIndexData)
      .then((res) => {
        setApiData(res.data);
      });
    setOpen(true);
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setApiData(res.data);
    });
    axios.get(`http://localhost:8000/api/products/${indexes}`).then((res) => {
      setindexdata(res.data);
    });
    const g = JSON.parse(localStorage.getItem("cardStatsData"));
    setStatsLocalstorgeData(g);
  }, []);

  const [old, setOld] = useState()

  const getOld = () => {
    axios.get(`http://localhost:8000/api/products/${indexes}`).then((res) => {
      setOld(res.data.stats);
      console.log("------> old stats", res.data.stats)
    });
  }
  useEffect(() => {
    getOld()
  }, [old])

  return (
    <>
      <Box
        width={300}
        sx={{
          margin: "0 auto",
          marginTop: "110px",
          width: "90%",
          borderRadius: "1px",
          padding: "30px",
          boxShadow: "20px 20px 50px grey",
        }}
      >
        <h2>{indexdata.email}</h2>
        <h4>{indexdata.role}</h4>
        <div style={{ margin: "0 auto", textAlign: "center", marginTop: "40px" }}>
          <h2>Select Month</h2>
          <input
            type="month"
            style={{ width: "200px", height: "30px" }}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div
          className="Container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {statsLocalstorgeData?.map((val) => (
            <Card
              key={val.statsTypeValue}
              sx={{
                maxWidth: 350,
                m: 4,
                boxShadow: "20px 20px 50px grey",
              }}
            >
              <CardMedia
                component="img"
                height="70"
                style={{ backgroundColor: "#756595" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                  {val.statsTypeValue}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ width: 290 }}>
                  <Typography gutterBottom>
                    Score Value: {sliderVal[val.statsTypeValue] || 0}
                  </Typography>
                  <Slider
                    min={0}
                    max={Number(val.statsMaxValue)}
                    value={sliderVal[val.statsTypeValue] || 0}
                    onChange={(e) =>
                      setSliderVal((prevSliderVal) => ({
                        ...prevSliderVal,
                        [val.statsTypeValue]: e.target.value,
                      }))
                    }
                    style={{ marginLeft: 5 }}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </CardActions>
            </Card>
          ))}
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            onClick={HandleSubmit}
            style={{
              backgroundColor: "#756595",
              width: "20%",
              fontSize: "14px",
            }}
          >
            Submit
          </Button>
        </div>
        <br />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={900} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              You submitted {month} Data
            </Alert>
          </Snackbar>
        </Stack>

        {old?.map((user, index) => (
          <StyledTable>
            <h2> {user.month}</h2>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableHead>
                <THead>
                  <TableCell>Parameter Type</TableCell>
                  <TableCell> Max Value</TableCell>
                </THead>
              </TableHead>
              <TableBody>
              {user.sliderValueArray.map((item)=>(
                <TRow>
                  <TableCell>
                    {item?.type}
                  </TableCell>
                  <TableCell>
                    {item?.value}
                  </TableCell>
                </TRow>
              ))}

              </TableBody>
            </Paper>
          </StyledTable>

        ))}
      </Box>

    </>
  );
}
