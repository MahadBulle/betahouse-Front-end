import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import AboutList from "./AboutList";
import { AddAbout, getAllAbout, UpdateAbout } from "./ApiCrudsabout";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AboutSchema = yup.object({
  Description: yup.string().required('Enter the description'),
  ShortDescription: yup.string().required("Enter the short description")

});

export const About = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }

  const [About, setAbout] = useState([])
  const [abid, setabid] = useState('')
  const [ time, setTime]= useState(new Date())

  useEffect(() => {
    const allAbout = async () => {

      const { data } = await getAllAbout()

      console.log('Xogta', data)

      setAbout(data)
    }

    allAbout()


  }, [time])




  const AddNewAbout = async (data) => {
    if (abid !== '') {

      try {
        await UpdateAbout(abid, data)
        console.log("Data has been Updated successfully")
        ToggleDailog()
        reset()
        setTime(new Date())
        toast.success(data.message);
      } catch (err) {
        console.log("error ayaa jira ", err)
        toast.error(data.message);

      }
    }
    else {
      try {
        await AddAbout(data)
        console.log("Data has been saved successfully")
        ToggleDailog()
        reset()
        setTime(new Date())
        toast.success(data.message);
      } catch (err) {
        console.log("error ayaa jira ", err)
        toast.error(data.message);

      }

    }

  }


  const UpdateAboutInfo = async (data)=>{
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("Description", data.Description)
    setValue("ShortDescription", data.ShortDescription)
    setabid(data._id)
    ToggleDailog()
    
    }

  return <>
    <Box p={4}>

      <Alert severity="info">About Us</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">List About</Typography>

        <IconButton onClick={ToggleDailog}>
          <AddHomeWorkIcon sx={{ color: "green" }} />
        </IconButton>
      </Box>

      <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Image</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewAbout)}>
          <DialogContent>
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="Description" {...register("Description")} variant="outlined" size="small" fullWidth 
                
                />

                <TextField label="ShortDescription" variant="outlined" {...register("ShortDescription")} size="small" fullWidth />


              </Stack>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={ToggleDailog}>Cancel</Button>
            <Button variant="contained" type="submit" size="small">Submit</Button>

          </DialogActions>

        </Box>
        <ToastContainer></ToastContainer>
      </Dialog>

      <Divider />
      {About ? <AboutList AboutData={About} update={UpdateAboutInfo} /> : null}

    </Box>
  </>
}
export default About