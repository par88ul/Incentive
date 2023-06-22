import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, Modal } from '@mui/material';
import { Paper } from '@mui/material';
import { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    styled,
    TextField
} from "@mui/material";
const StyledTable = styled(Table)`
  width: 99%;
  margin: 10px 0 0 90px;
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
export default function ParamaterDrawer({ apiData, index }) {

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


    const [permissions, setPermissions] = useState();
    const [statsData, setStatsData] = React.useState([]);
    const [statsIndex, setStatsIndex] = React.useState(-1);
    const [statsTypeValue, setStatsTypeValue] = React.useState();
    const [statsMaxValue, setStatsMaxValue] = React.useState();
    const [isUpdate, setIsUpdate] = React.useState(true)
    const [modal, setModal] = React.useState(false);
    function handleOpen() {
        setModal(true);
    }
    const handleClose = () => setModal(false);
    function handleSaveData() {
        setStatsData((prev) => [
            ...prev,
            {
                statsTypeValue,
                statsMaxValue,
                createdBy: apiData[index]?.email,
                updatedBy: apiData[index]?.email,
            },
        ]);

        const newStat = {
            statsTypeValue,
            statsMaxValue,
            createdBy: apiData[index]?.email,
            updatedBy: apiData[index]?.email,
        }

        const newStatsAdded = [...statsData, newStat]
        localStorage.setItem('cardStatsData', JSON.stringify(newStatsAdded))
        handleClose();
        setStatsMaxValue("")
        setStatsTypeValue("")
    }


    const getStatData = () => {
        setStatsData(JSON.parse(localStorage.getItem("cardStatsData")))
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
            createdBy: apiData[index]?.email,
            updatedBy: apiData[index]?.email,
        };
        statsCopy.splice(statsIndex, 1, stat)
        localStorage.setItem("cardStatsData", JSON.stringify(statsCopy))
        setIsUpdate(false)
        setStatsMaxValue("")
        setStatsTypeValue("")
        handleClose()
        getStatData()
    };
    useEffect(() => {
        setPermissions(apiData[index]?.savedPermission[1])
    }, [apiData])
    return (
        <div>
            {permissions?.Create ?
                <Button variant="contained" color="secondary"
                    style={{ marginRight: 10 }}
                    onClick={handleOpen}
                >
                    Create Parameter
                </Button> : <Button disabled> Create Parameter</Button>}
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
                    <Button className='button' style={{ width: "300px" }} variant="contained" color="primary" 
                    onClick={!isUpdate ? handleSaveData : handleStatsUpdate} >
                        save
                    </Button>
                </Box>
            </Modal>
            <br /><br />
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <h2>Parameter</h2></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <StyledTable>
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
                                    {statsData.map((user, index) => (
                                        <TRow key={user.id}>
                                            <TableCell>{user.statsTypeValue}</TableCell>
                                            <TableCell>{user.statsMaxValue}</TableCell>
                                            <TableCell>{user.createdBy}</TableCell>
                                            <TableCell>{user.updatedBy}</TableCell>
                                            <TableCell>
                                                {permissions?.Update ? <Button
                                                    color="primary"
                                                    variant="contained"
                                                    style={{ marginRight: 10 }}
                                                    onClick={() => {
                                                        handleOpen()
                                                        setStatsTypeValue(user.statsTypeValue)
                                                        setStatsMaxValue(user.statsMaxValue)
                                                        setStatsIndex(index)
                                                        setIsUpdate(true)
                                                    }
                                                    }
                                                >
                                                    Edit Stats
                                                </Button> : <Button disabled> Edit Stats</Button>}
                                                {permissions?.Delete ? <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={() => handleParamDelete(index)}
                                                >
                                                    Delete User
                                                </Button> : <Button disabled>Delete User</Button>}
                                            </TableCell>
                                        </TRow>
                                    ))}
                                </TableBody>
                            </Paper>
                        </StyledTable>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}