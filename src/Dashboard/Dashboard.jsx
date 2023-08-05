import { Box,Stack,IconButton,Typography } from "@mui/material"
import Sidebar from "./SideBar"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
// import Clients from "../components/ClientPage/Clients";
import Gallery from "../components/GalleryPage/Gallery";
import { Outlet } from "react-router-dom";
import { shadows } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
export default function Dashboard(){
const [draweOpen,setDrawer]=useState(false)

const ToggleDrawer = ()=>{
setDrawer(!draweOpen)
}
    return <>
      <Box>

<Stack direction={'row'}>

<Sidebar DrawerOpen={draweOpen} DrawerClose={ToggleDrawer}/>
{/* content box */}
<Box sx={{width:"100%"}}>
{/* top header */}

<Box sx={{bgcolor:"primary.main",boxShadow: 3,color:"white",display:"flex",justifyContent:{
    xs:"space-between",
    md:"end"
}}} p={2}>
    
<IconButton sx={{p:0,display:{
    xs:"block",
    md:"none"
}}} onClick={()=>ToggleDrawer()}>
    <MenuIcon sx={{color:"primary.dark"}}/>
</IconButton>

<Typography > <AccountCircleIcon sx={{marginTop:"1px",}}/> User : Buulle@gmail.com</Typography>
</Box>

{/* top header end */}

{/* content pages */}
{/* <Clients/> */}
{/* <Gallery/> */}

{/* end content */}

<Outlet/>
 
</Box>
</Stack>
      </Box>

    </>
}