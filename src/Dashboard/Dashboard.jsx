import { Box,Stack,IconButton,Typography,Button  } from "@mui/material"
import Sidebar from "./SideBar"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
// import Clients from "../components/ClientPage/Clients";
import Gallery from "../components/GalleryPage/Gallery";
import { Outlet } from "react-router-dom";
import { shadows } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useUserContext } from "../ContextApi/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
export default function Dashboard(){
const [draweOpen,setDrawer]=useState(false)
const {email,LogOut} = useUserContext()

// const [DialOpen, setDial] = useState(false);
// const Toggle = () => {
//     setDial(!DialOpen)
// }

// const handleCheck = ()=>{
// <Box>
//     <Dialog
//     open={DialOpen}
//     onClose={Toggle}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//     sx={{
//         backdropFilter: "blur(5px) sepia(5%)",
//     }} PaperProps={{ sx: { borderRadius: "20px" } }}
// >
//     <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }} id="alert-dialog-title">
//         {/* Type : {" "}{houseDatta?.Type}  {" || "} Status: {"  "} {houseDatta?.Status} */}
//         <h1>checkgareen</h1>
//     </DialogTitle>
//     <DialogContent>
//         <DialogContentText id="alert-dialog-description">

//             <h1>do you want to log out</h1>

//         </DialogContentText>
//     </DialogContent>
//     <DialogActions>

//         <Button sx={{ color: "primary.dark" }} onClick={Toggle}>Close</Button>

//     </DialogActions>
// </Dialog>

// </Box>

// }
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
<Stack spacing={2} direction={'row'}>
<AccountCircleIcon sx={{marginTop:"1px",}}/>
<Typography >  User : {email}</Typography>
<IconButton sx={{p:0}} onClick={LogOut}>
    <LogoutIcon sx={{color:"primary.dark"}}/>
</IconButton>
</Stack>
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