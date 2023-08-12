import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider, Breadcrumbs, Link } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import UsersList from '../UsersPage/UsersList';
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmDelete from "../../../CustomHooks/deleteComponent/ConfirmDelete";
import { useDeleteHook } from "../../../CustomHooks/deleteComponent/deleteHooks";
import { GetQuery, PostQuery, UpdateQuery, DeleteQuery } from '../../../Shared/ReactQuery'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function Users() {

  const YupValidate = yup.object({
    username: yup.string().required('Enter The username'),
    email: yup.string().required("Enter The email"),
    password: yup.string().required("Enter The password"),
    status: yup.string().required("Enter The status"),
    role: yup.string().required("Enter The user Role"),

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
  const [UserDelId, setUserDelId] = useState("")

  const [dailogOpen, setDailog] = useState(false)
  const ToggleDailog = () => {
    setDailog(!dailogOpen)
  }
  const onClear = () => {
    setEditId('')
  }

  const { data: user, isLoading, isError } = GetQuery('/users', 'users')
  // console.log(service?.data)


  const { mutateAsync, isloading: mutateLoading } = PostQuery("/users", "users")

  const { mutateAsync: updateMutate } = UpdateQuery(`/users/${EditId}`, "users")

  const AddNewUser = async (data) => {

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
        // await AddClient(data)

        ToggleDailog()
        reset()
      } catch (err) {
        console.log("error ayaa jira ", err)

      }

    }



  }


  const UpdateUserInfo = async (data) => {
    // console.log("xogta la rabbo in la update gareeyo",data)
    setValue("username", data.username)
    setValue("email", data.email)
    setValue("password", data.password)
    setValue("status", data.status)
    setValue("role", data.role)
    setEditId(data._id)
    ToggleDailog()

  }


  const { mutate: delateMutate } = DeleteQuery(`/users/${UserDelId}`, "users")

  const DeleteHook = useDeleteHook()

  const DeleteCheck = () => {
    delateMutate(UserDelId)

  }

  const DeleteUserInfo = async (data) => {
    DeleteHook.setMessage(data.username)
    DeleteHook.Toggle();
    setUserDelId(data._id)
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

        <Typography color="text.primary">Users</Typography>
      </Breadcrumbs>


      {/* end */}
      <Alert severity="info">Users</Alert>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
        <Typography variant="h6">Users List</Typography>

        <IconButton onClick={ToggleDailog}>
          <ControlPointIcon sx={{ color: "#F5671F" }} />
        </IconButton>
      </Box>

      <Dialog sx={{
        backdropFilter: "blur(5px) sepia(5%)",
      }} PaperProps={{ sx: { borderRadius: "20px" } }} open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>New User</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewUser)}>
          <DialogContent >
            <Box sx={{ width: "400px" }} mt={2}>



              <Stack spacing={2} direction={'column'}>



                <TextField label="username" {...register("username")} variant="outlined" size="small" fullWidth />
                {errors.username ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </Typography>
                ) : null}

                <TextField label="email" variant="outlined" {...register("email")} size="small" fullWidth />
                {errors.email ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </Typography>
                ) : null}

                <TextField label="password" variant="outlined" {...register("password")} size="small" fullWidth />
                {errors.password ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </Typography>
                ) : null}

<TextField label="status" variant="outlined" {...register("status")} size="small" fullWidth />
                {errors.status ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.status.message}
                  </Typography>
                ) : null}

<TextField label="role" variant="outlined" {...register("role")} size="small" fullWidth />
                {errors.role ? (
                  <Typography sx={{ color: "error.main" }}>
                    {errors.role.message}
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

        </Box>) : <UsersList deleteUser={DeleteUserInfo} UsersData={user?.data} updateUser={UpdateUserInfo} />}

    </Box>
  </>
}
