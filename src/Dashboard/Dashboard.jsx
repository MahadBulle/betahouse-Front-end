import { Box,Stack,IconButton,Typography } from "@mui/material"
import Sidebar from "./SideBar"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
// import Clients from "../components/ClientPage/Clients";
import Gallery from "../components/GalleryPage/Gallery";
import { Outlet } from "react-router-dom";
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

<Box sx={{backgroundColor:"#03342E",color:"white",display:"flex",justifyContent:{
    xs:"space-between",
    md:"end"
}}} p={2}>
    
<IconButton sx={{p:0,display:{
    xs:"block",
    md:"none"
}}} onClick={()=>ToggleDrawer()}>
    <MenuIcon sx={{color:"white"}}/>
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