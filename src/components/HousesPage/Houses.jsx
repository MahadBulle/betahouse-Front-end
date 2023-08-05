import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider, Breadcrumbs, Link, MenuItem } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from "react";
import HousesList from '../HousesPage/HousesList';
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import { useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import { GetQuery, PostQuery, UpdateQuery, DeleteQuery } from '../../../Shared/ReactQuery'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { string } from "yup";
import { AddData } from "../../../Shared/apiCRUD";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';




export default function Houses() {

  const YupValidate = yup.object({
    Type: yup.string().required('Enter The HouseType'),
    Area: yup.string().required("Enter The Area"),
    Address: yup.string().required("Enter The Address"),
    Age: yup.string().required("Enter The Age"),
    Rent: yup.string().required("Enter The Rent"),
    Rooms: yup.string().required("Enter The Rooms"),
    Toilets: yup.string().required("Enter The Toilets"),
    MasterRoom: yup.string().required("Enter The Master room"),
    Parking: yup.string().required("Enter The Parking"),
    Image: yup.string().required("Enter The Image"),
    Deposit: yup.string().required("Enter The Deposit"),
    Status: yup.string().required("Enter The Status"),
    Description: yup.string().required("Enter The Description"),


  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(YupValidate) })

  const [EditId, setEditId] = useState('')
  const queryclient = useQueryClient();
  const [HouDelId, setHouDelId] = useState("")

  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }
  const onClear = () => {
    setEditId('')
  }

  //  const [ status, setstatus] = useState('')
  //  console.log("status",status)
  //  const handleBedel=  (event)=>{
  // setstatus(event.target.value === "Available" ? Available : Unavailable)
  //  }


  const { data: house, isLoading, isError } = GetQuery('/houses', 'house')
  // console.log(service?.data)


  const { mutateAsync, isloading: mutateLoading } = PostQuery("/houses", "house")

  const { mutateAsync: updateMutate } = UpdateQuery(`/houses/${EditId}`, "house")

  const AddNewHouse = async (data) => {

    if (EditId !== '') {

      try {
        // console.log(data)
        //   update section
        updateMutate(data).then(() => {
          toast.success("data has been updated successfully")
        })
        // console.log("Data has been Updated")
        ToggleDailog()
        reset()
        setEditId('')
      } catch (err) {
        console.log("error ayaa jira ", err)

      }
    }
    else {
      try {
        mutateAsync(data).then(() => {
          toast.success("data has been inserted successfully")

        })
        // const postData = await AddData("/houses",data)
        // console.log(postData,"dataa")
        // console.log("data has been inserted successfully")
        // await AddClient(data)

        ToggleDailog()
        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }

    }



  }


  const UpdateHouseInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Type", data.Type)
    setValue("Area", data.Area)
    setValue("Address", data.Address)
    setValue("Age", data.Age)
    setValue("Rent", data.Rent)
    setValue("Rooms", data.Rooms)
    setValue("Toilets", data.Toilets)
    setValue("MasterRoom", data.MasterRoom)
    setValue("Parking", data.Parking)
    setValue("Image", data.Image)
    setValue("Deposit", data.Deposit)
    setValue("Status", data.Status)
    setValue("Description", data.Description)
    setEditId(data._id)
    ToggleDailog()

  }


  const { mutate: delateMutate } = DeleteQuery(`/houses/${HouDelId}`, "house")

  const DeleteHook = useDeleteHook()

  const DeleteCheck = () => {
    delateMutate(HouDelId)

  }

  const DeleteHouseInfo = async (data) => {
    DeleteHook.setMessage(data.Type)
    DeleteHook.Toggle();
    setHouDelId(data._id)
    reset()


  }

  return <>
    <Box p={4}>
      <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />

      {/* breadcrumbs */}

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>

        <Typography color="text.primary">Houses</Typography>
      </Breadcrumbs>


      {/* end */}
      <Alert severity="info">Houses</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Houses List</Typography>

        <IconButton onClick={ToggleDailog}>
          <ControlPointIcon sx={{ color: "#F5671F" }} />
        </IconButton>
      </Box>

      <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New House</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewHouse)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>


                <Stack spacing={2} direction={'row'}>
                  <Stack direction={'column'}>
                    <TextField label="Type" {...register("Type")} variant="outlined" size="small" fullWidth />
                    {errors.Type ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Type.message}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Stack direction={'column'}>
                    <TextField label="Area" variant="outlined" {...register("Area")} size="small" fullWidth />
                    {errors.Area ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Area.message}
                      </Typography>
                    ) : null}
                  </Stack>

                </Stack>

                <TextField label="Address" variant="outlined" {...register("Address")} size="small" fullWidth />
                {errors.Address ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Address.message}
                  </Typography>
                ) : null}

                <Stack spacing={2} direction={'row'}>
                  <Stack direction={'column'}>
                    <TextField label="Age" variant="outlined" {...register("Age")} size="small" fullWidth />
                    {errors.Age ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Age.message}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Stack direction={'column'}>
                    <TextField label="Rent" variant="outlined" {...register("Rent")} size="small" fullWidth />
                    {errors.Rent ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Rent.message}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>


                <Stack spacing={2} direction={'row'}>
                  <Stack direction={'column'}>
                    <TextField label="Rooms" variant="outlined" {...register("Rooms")} size="small" fullWidth />
                    {errors.Rooms ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Rooms.message}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Stack direction={'column'}>
                    <TextField label="Toilets" variant="outlined" {...register("Toilets")} size="small" fullWidth />
                    {errors.Toilets ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Toilets.message}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Stack direction={'column'}>
                    <TextField label="MasterRoom" variant="outlined" {...register("MasterRoom")} size="small" fullWidth />
                    {errors.MasterRoom ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.MasterRoom.message}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                <TextField label="Parking" variant="outlined" {...register("Parking")} size="small" fullWidth />
                {errors.Parking ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Parking.message}
                  </Typography>
                ) : null}

                <Stack spacing={2} direction={'row'}>
                  <Stack direction={'column'}>
                    <TextField label="Image" variant="outlined" {...register("Image")} size="small" fullWidth />
                    {errors.Image ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Image.message}
                      </Typography>
                    ) : null}
                  </Stack>
                  <Stack direction={'column'}>
                    <TextField label="Deposit" variant="outlined" {...register("Deposit")} size="small" fullWidth />
                    {errors.Deposit ? (
                      <Typography sx={{ color: "error.main" }}>
                        {errors.Deposit.message}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                <TextField label="Status" variant="outlined" {...register("Status")} size="small" fullWidth />
                {errors.Status ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Status.message}
                  </Typography>
                ) : null}

                {/* <TextField label='Select status' select value={status} onChange={handleBedel} size="small" {...register("Status")} fullWidth>
              <MenuItem value={Available}>Available</MenuItem>
              <MenuItem value={Unavailable} >Unavailable</MenuItem>
             </TextField> */}
                {/* 
             <TextField label='Select status' value={stat} onChange={e=>setStat(e.target.value)} select SelectProps={{native:true}} size="small" {...register("Status")}  fullWidth>
             
              {statInfo.map(stat=>{
                <option value={stat} key= {stat}>{statInfo}
                
                </option>
              })}

             </TextField> */}

                <TextField label="Description" variant="outlined" {...register("Description")} size="small" fullWidth />
                {errors.Description ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.Description.message}
                  </Typography>
                ) : null}


              </Stack>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              ToggleDailog();
              reset();
              onClear();
            }}>Cancel</Button>
            <Button variant="contained" disabled={mutateLoading} sx={{ bgcolor: "primary.main" }} type="submit" size="small">

              {EditId !== '' ? "Update" : "Submit"}
            </Button>

          </DialogActions>
        </Box>
      </Dialog>

      <Divider />

      {isError ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: "center", p: 10 }}>


          <Box>
            <ErrorOutlineOutlined sx={{ fontSize: "58px" }} />
            <Typography > No Data fetched !</Typography>
          </Box>


        </Box>) : isLoading ? (<Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: "center", p: 10 }}>

          <Box>

            <CircularProgress sx={{ fontSize: "58px" }} />
            <Typography >Loading...</Typography>
          </Box>

        </Box>) : <HousesList deleteHouse={DeleteHouseInfo} HousesData={house?.data} updateHouse={UpdateHouseInfo} />}

    </Box>
  </>
}
