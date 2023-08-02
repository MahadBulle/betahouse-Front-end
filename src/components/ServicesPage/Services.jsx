import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider,Breadcrumbs,Link } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import ServicesList from '../ServicesPage/ServicesList';
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import {GetQuery,PostQuery,UpdateQuery,DeleteQuery} from '../../../Shared/ReactQuery'  



export default function Services() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const [EditId, setEditId] = useState('')
  const queryclient = useQueryClient();
  const [SerDelId,setSerDelId]=useState("")

  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }

  const { data:service ,isLoading, isError}= GetQuery('/services','service')
  // console.log(service?.data)


  const {mutateAsync, isloading: mutateLoading}= PostQuery("/services","service")

  const {mutateAsync:updateMutate} = UpdateQuery(`/services/${EditId}`,"service")

  const AddNewService = async (data) => {

    if (EditId !== '') {

      try {
        // console.log(data)
        //   update section
        updateMutate(data).then(()=>{
          toast.success("data has been updated successfully")
        })
        // console.log("Data has been Updated")
        ToggleDailog()

        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }
    }
    else {
      try {
        mutateAsync(data).then(()=>{
          toast.success("data has been inserted successfully")

        })
        // await AddClient(data)

        ToggleDailog()
        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }

    }



  }


  const UpdateServiceInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Title", data.Title)
    setValue("Icon", data.Icon)
    setValue("Decribtion", data.Decribtion)
    setEditId(data._id)
    ToggleDailog()

  }


const {mutate:delateMutate}=DeleteQuery(`/services/${SerDelId}`,"service")

const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
  delateMutate(SerDelId)

}

const DeleteServiceInfo= async(data)=>{
  DeleteHook.setMessage(data.Title)
  DeleteHook.Toggle();
  setSerDelId(data._id)
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
 
  <Typography color="text.primary">Services</Typography>
</Breadcrumbs>


 {/* end */}
      <Alert severity="info">Our Services</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Services List</Typography>

        <IconButton onClick={ToggleDailog}>
          <AddHomeWorkIcon sx={{ color: "#F5671F" }} />
        </IconButton>
      </Box>

      <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Services</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewService)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="Title" {...register("Title")} variant="outlined" size="small" fullWidth />

                <TextField label="Icon" variant="outlined" {...register("Icon")} size="small" fullWidth />

                <TextField label="Descriprion" variant="outlined" {...register("Decribtion")} size="small" fullWidth />


              </Stack>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={ToggleDailog}>Cancel</Button>
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

        </Box>) : <ServicesList deleteOurservices={DeleteServiceInfo} ServicesData={service?.data} updateOurservices={UpdateServiceInfo} />}

    </Box>
  </>
}
