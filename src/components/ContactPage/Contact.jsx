import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider,Breadcrumbs,Link } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import ContactList from '../ContactPage/ContactList';
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import {GetQuery,PostQuery,UpdateQuery,DeleteQuery} from '../../../Shared/ReactQuery'  
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function Contact() {

  const YupValidate = yup.object({
    Name: yup.string().required('Enter The Name'),
    Phone: yup.string().required("Enter The phone"),
    Message: yup.string().required("Enter The Message"),

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
  const [ConDelId,setConDelId]=useState("")

  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }
  const onClear = () =>{
    setEditId('')
  }

  const { data:contact ,isLoading, isError}= GetQuery('/contact','contacts')
  // console.log(service?.data)


  const {mutateAsync, isloading: mutateLoading}= PostQuery("/contact","contacts")

  const {mutateAsync:updateMutate} = UpdateQuery(`/contact/${EditId}`,"contacts")

  const AddNewContacts = async (data) => {

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
        setEditId('')
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


  const UpdateContactInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Name", data.Name)
    setValue("Phone", data.Phone)
    setValue("Message", data.Message)
    setEditId(data._id)
    ToggleDailog()

  }


const {mutate:delateMutate}=DeleteQuery(`/contact/${ConDelId}`,"contacts")

const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
  delateMutate(ConDelId)

}

const DeleteContactInfo= async(data)=>{
  DeleteHook.setMessage(data.Name)
  DeleteHook.Toggle();
  setConDelId(data._id)
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
 
  <Typography color="text.primary">Contact us</Typography>
</Breadcrumbs>


 {/* end */}
      <Alert severity="info">Contact us</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Contact List</Typography>

        <IconButton onClick={ToggleDailog}>
        <ControlPointIcon sx={{ color: "#F5671F" }} />
        </IconButton>
      </Box>

      <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" }}} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color:"white"  }}>New Contacts</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewContacts)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="Name" {...register("Name")} variant="outlined" size="small" fullWidth />
                {errors.Name ? (
                    <Typography sx={{ color: "error.main" }}>
                      {errors.Name.message}
                    </Typography>
                  ) : null}

                <TextField label="Phone" variant="outlined" {...register("Phone")} size="small" fullWidth />
                {errors.Phone ? (
                    <Typography sx={{ color: "error.main" }}>
                      {errors.Phone.message}
                    </Typography>
                  ) : null}

                <TextField label="Message" variant="outlined" {...register("Message")} size="small" fullWidth />
                {errors.Message ? (
                    <Typography sx={{ color: "error.main" }}>
                      {errors.Message.message}
                    </Typography>
                  ) : null}


              </Stack>

            </Box>
          </DialogContent>
          <DialogActions>
          <Button onClick={()=>{
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

        </Box>) : <ContactList deleteContacts={DeleteContactInfo} ContactsData={contact?.data} updateContacts={UpdateContactInfo} />}

    </Box>
  </>
}
