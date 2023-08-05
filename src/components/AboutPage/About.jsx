import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider, Breadcrumbs, Link } from "@mui/material"
// import "./About.css"
import { GetQuery, PostQuery } from '../../../Shared/ReactQuery'
import { AddData, getAll, Update } from "../../../Shared/apiCRUD";
import { toast } from 'react-toastify';


export default function About() {
  const [Desc, setDesc] = useState('');
  const [Descyer, setDescyer] = useState('');

  // const { data ,isLoading, isError}= GetQuery('/about','about')
  // console.log("informa",data?.data)
  // const {mutateAsync, isloading: mutateLoading}= PostQuery("/about","about")
  // useEffect(()=>{
  //   setDesc(data[0]?.Description)
  //   setDescyer(data[0]?.ShortDescription)

  // },[data])

  useEffect(() => {

    const aboutHel = async () => {

      const { data } = await getAll('about')
      console.log(data)
      setDesc(data[0]?.Description)
      setDescyer(data[0]?.ShortDescription)

    }
    aboutHel()

  }, [])

  const { mutateAsync } = PostQuery("/about", "about")

  const UpdateAbout = async () => {
    const data = {
      Description: Desc,
      ShortDescription: Descyer
    }
    mutateAsync(data).then(() => { toast.success("data has been updated") })

    // const data = {
    //   Description: Desc,
    //   ShortDescription: Descyer
    // }
    // AddData(data).then(()=>{console.log("data has been updated")})
    // toast.success('this data has been updated successfully')
  }
  return (
    <div>

      {/* breadcrumbs */}

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Dashboard
        </Link>

        <Typography color="text.primary">About us</Typography>
      </Breadcrumbs>


      {/* end */}
      <Box sx={{ p: 4 }}>
        <Button variant='contained' type='submit' sx={{ bgcolor: "primary.main", color: "white", marginTop: "5px", width: "100%" }} onClick={() => UpdateAbout()}>
          update
        </Button>
      </Box>
      <Box sx={{ p: 4 }}>
        <ReactQuill style={{ height: 100 }} theme="snow" value={Desc} onChange={(v) => {
          setDesc(v);
        }} placeholder={"Decription :"} />;
      </Box>

      <Box sx={{ p: 4 }}>
        <ReactQuill style={{ height: 100 }} theme="snow" value={Descyer} onChange={(v) => {
          setDescyer(v);
        }} placeholder={"Short Description :"} />;
      </Box>
      {/* <About {about?.data} /> */}

    </div>
  )
}
