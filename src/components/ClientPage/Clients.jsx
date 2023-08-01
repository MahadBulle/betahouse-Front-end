import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider,Breadcrumbs,Link } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
// import ClientsList from '../ClientPage/ClientsList';
import ClientsList from '../ClientPage/ClientsList';
// import { AddClient, getAllClient, UpdateClient, DeleteClient } from "./apiCrud";
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import {getAll,AddData,Update,DeleteData} from '../../../Shared/apiCRUD'

export default function Clients() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  const [EditId, setEditId] = useState('')
  const queryclient = useQueryClient();
  const [CliDelId,setCliDelId]=useState("")

  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }

  const { data: client, isLoading, isError } = useQuery({
    queryKey: ['client'],
    queryFn: async (data) => await getAll('/ourclient',data),
    onError: () => {
      toast.error("sorry xogta lama keenin")
    },
    onSuccess: () => {
      toast.success("Haa xogta waa lakeeney")
    }

  })
  console.log(client?.data)

  const { mutate, isLoading: mutateLoading } = useMutation({
    mutationFn: async (data) => await AddData('/ourclient',data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['client'] })
      toast.success("the data has successfully been added Onsucess")
      ToggleDailog()
    },
    onError: () => {
      toast.error("sorry Xog lama xareynin")
    },

  })

  // const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
  //   mutationFn: async (EditId, data) => await UpdateClient(EditId, data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['client'] })
  //     toast.success("data has been updated succesfully")
  //     ToggleDailog()
  //     // setEditId('')

  //   },
  //   onError: () => {
  //     toast.error("Sorry data has'nt been updated")
  //   }

  // })




  // const AddNewClient = async (data) => {

  //   if (EditId !== '') {

  //     try {
  //       // await UpdateClient(EditId, data)
  //       updateMutate(data)
  //       // console.log("Data has been Updated")
  //       // ToggleDailog()
  //       reset()
  //     } catch (err) {
  //       console.log("error ayaa jira ", err)

  //     }
  //   }
  //   else {
  //     try {
  //       // await AddClient(data)
  //       mutate(data)
  //       ToggleDailog()
  //       reset()
  //     } catch (err) {
  //       console.log("error ayaa jira ", err)

  //     }

  //   }



  // }
  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: async (data) => {

      return await Update(`/ourclient/${EditId}`, data)

    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['client'] })
      toast.success("data has been updated")
      ToggleDailog()
    },

    onError: (e) => {
      

      toast.error("Sorry Update ma dhicin")
      console.log(e)
    }
  })
  const AddNewClient = async (data) => {

    if (EditId !== '') {

      try {
        // console.log(data)
        //   update section
        updateMutate(data)
        // console.log("Data has been Updated")

        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }
    }
    else {
      try {
        mutate(data)
        // await AddClient(data)

        ToggleDailog()
        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }

    }



  }


  const UpdateClientInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("ClientName", data.ClientName)
    setValue("Logo", data.Logo)
    setEditId(data._id)
    ToggleDailog()

  }


//  delete mutate

// const {mutate:deleteMutate} = useMutation({
//   mutationFn:(id)=>DeleteClient(id),
//   onSuccess:()=>{
//       toast.success("Client has  been deleted")
//       deletehook.Toggle()
//       queryClient.invalidateQueries({queryKey:['client']})
//   },
//   onError:()=>{
//       toast.error("Sorry client not deleted")
//       deletehook.Toggle()
     
//   }


// })
// const deletehook = useDeleteHook()

// const deleteCheck = ()=>{

//   // alert("deleted")
//   deleteMutate (cldeleteid)
//   console.log("aaaaaa",cldeleteid)
 
// }
// // cal delete fucntion
// const deleteClientInfo = async (data)=>{
//  deletehook.setMessage(data.ClientName)
//   deletehook.Toggle()
//  setcldeleteid(data._id)


//   // console.log("Xogta la rabo in la delete gareyo",data._id   )

// }

const {mutate:delateMutate}=useMutation({
  mutationFn:(id)=>DeleteData(`ourclient/${id}`),
  onSuccess:()=>{
      toast.success('Client has been deleted')
      DeleteHook.Toggle()
      queryclient.invalidateQueries({queryKey:['client']})
  },
  onError:(err)=>{
      toast.error(err.message)
  }


})
const DeleteHook=useDeleteHook()

const DeleteCheck=()=>{
  delateMutate(CliDelId)

}

const DeleteClientInfo= async(data)=>{
  DeleteHook.setMessage(data.ClientName)
  DeleteHook.Toggle();
  setCliDelId(data._id)

}

  return <>
    <Box p={4}>
    <ConfirmDelete open={DeleteHook.open} toggle={DeleteHook.Toggle} message={DeleteHook.message} confirm={DeleteCheck} />

 {/* breadcrumbs */}

 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard
  </Link>
 
  <Typography color="text.primary">Client</Typography>
</Breadcrumbs>


 {/* end */}
      <Alert severity="info">Our Clients</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Clients List</Typography>

        <IconButton onClick={ToggleDailog}>
          <AddHomeWorkIcon sx={{ color: "#F5671F" }} />
        </IconButton>
      </Box>

      <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Client</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewClient)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="Client Name" {...register("ClientName")} variant="outlined" size="small" fullWidth />

                <TextField label="Client logo" variant="outlined" {...register("Logo")} size="small" fullWidth />


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
      {/* {isLoading ? "Loading..." : "Done"} */}
      {/* {isLoading? "Loading..." : <ClientsList deleteClient={deleteClientInfo} ClientsData={client?.data} update={UpdateClientInfo} />} */}
      {/* {isError ? "error ayaa jiro !": isLoading? "Loading..." : <ClientsList deleteClient={deleteClientInfo} ClientsData={client?.data} update={UpdateClientInfo} />} */}
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

        </Box>) : <ClientsList deleteOurClient={DeleteClientInfo} ClientsData={client?.data} updateOurclient={UpdateClientInfo} />}

    </Box>
  </>
}
