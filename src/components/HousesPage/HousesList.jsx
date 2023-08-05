import { Box, IconButton, Chip, Typography, Divider, Stack, Avatar, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HousesList({ HousesData, updateHouse, deleteHouse }) {
    // console.log(HousesData,'cluesff')
    const [DialOpen, setDial] = useState(false);
    const [houseDatta, sethouseDatta] = useState(false);
    const Toggle = () => {
        setDial(!DialOpen)
    }

    const seemore = (data) => {

        sethouseDatta(data)
        console.log("datadag", data)
        Toggle();

    }
    {/* <Grid item xs= {12} sm={8} md={6} lg={4}> */ }

    const columns = [
        // { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'ImagePreveiw',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => {
                // return  <Avatar  alt="Remy Sharp" src="https://images.unsplash.com/photo-1629257818193-5ebab761d887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2VzJTIwaW4lMjB0aGUlMjBmb3Jlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60" />
                return <Link to={'images'}></Link>

            }
        },
        {
            field: 'Type',
            headerName: 'HouseType',
            width: 150,
            editable: true,
            renderCell: (params) => {
                return <Box>{params.row.Type} {" "}
                    <Chip label="See More" size="small" variant="outlined" onClick={() => seemore(params.row)} />

                </Box>
            }
        },
        {
            field: 'Address',
            headerName: 'Address',
            width: 150,
            editable: true,
        },
        {
            field: 'Rent',
            headerName: 'Rent',
            width: 150,
            editable: true,
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            editable: true,
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => {

                return <Box>

                    <IconButton onClick={() => updateHouse(params.row)}>

                        <ModeEditIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                    <IconButton onClick={() => deleteHouse(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

                </Box>
            }
        },
        {
            field: 'ImagePreveiw',
            headerName: 'images',
            width: 100,
            renderCell: (params) => {
                return <Link to={`/dashboard/images/${params.row._id}/${params.row.Type}`}>

                    <Chip label="Image Folder" size="small" variant="outlined" />

                </Link>

            }
        }







    ];



    const rows = HousesData ? HousesData : null

    // </Grid>

    // console.log("rowww", rows)
    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                {/* <Dialog> */}
                <Dialog
                    open={DialOpen}
                    onClose={Toggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backdropFilter: "blur(5px) sepia(5%)",
                    }} PaperProps={{ sx: { borderRadius: "20px" } }}
                >
                    <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }} id="alert-dialog-title">
                        Type : {" "}{houseDatta?.Type}  {" || "} Status: {"  "} {houseDatta?.Status}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <Box sx={{ p: 2, width: 500 }}>
                                <Stack direction={'column'} spacing={2}>
                                    <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Address: </Typography>
                                        <Box>
                                            {houseDatta?.Address}
                                        </Box>

                                    </Box>
                                    <Divider />
                                    <Stack direction={'row'} gap={2}>

                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Age: </Typography>
                                            <Box>
                                                {houseDatta?.Age}
                                            </Box>

                                        </Box>
                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Area: </Typography>
                                            <Box>
                                                {houseDatta?.Area}
                                            </Box>

                                        </Box>
                                    </Stack>
                                    <Divider />
                                    <Stack direction={'row'} gap={2}>
                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Rooms: </Typography>
                                            <Box>
                                                {houseDatta?.Rooms}
                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Master Room: </Typography>
                                            <Box>
                                                {houseDatta?.MasterRoom}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />

                                    <Stack direction={'row'} gap={2}>
                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Toilets: </Typography>
                                            <Box>
                                                {houseDatta?.Toilets}
                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Parking: </Typography>
                                            <Box>
                                                {houseDatta?.Parking}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />
                                    <Stack direction={'row'} gap={2}>
                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Rent: </Typography>
                                            <Box>
                                                {houseDatta?.Rent}
                                            </Box>

                                        </Box>

                                        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Deposit: </Typography>
                                            <Box>
                                                {houseDatta?.Deposit}
                                            </Box>

                                        </Box>


                                    </Stack>
                                    <Divider />
                                    <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}><Typography variant="h6">Description: </Typography>
                                        <Box>
                                            {houseDatta?.Description}
                                        </Box>

                                    </Box>

                                </Stack>
                            </Box>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button sx={{ color: "primary.dark" }} onClick={Toggle}>Close</Button>

                    </DialogActions>
                </Dialog>
                {/* <Dialog end> */}

                <DataGrid
                    sx={{ boxShadow: 1 }}

                    rows={rows}
                    columns={columns}

                    // material ui datagrid ma support gareenaayo by default _id 
                    //  si aan u xalino taas waxaan default row id  datagrid id to _id u badalno
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}

                    disableRowSelectionOnClick
                />
            </Box>
        </>
    )
}

