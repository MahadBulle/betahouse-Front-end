import { Box, Stack, Typography, Drawer } from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import CollectionsIcon from '@mui/icons-material/Collections';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from "react";
import { Link } from "react-router-dom";

// import StarBorder from '@mui/icons-material/StarBorder';



export default function Sidebar({ DrawerOpen, DrawerClose }) {

  const [selectedMenu, setMenu] = useState('')

  return <>

    <Drawer
      open={DrawerOpen}
      onClose={DrawerClose}
    >
      <Box sx={{ width: "300px", backgroundColor: "#F5671F" }}>


        <Box sx={{ p: 4, borderBottom: 2, borderColor: "#eee" }}>

          <Stack direction={'row'} spacing={1}>
            <Box>
              <AddHomeWorkIcon sx={{ color: "white", height: 30, fontSize: 50 }} />

            </Box>

            <Box><Typography variant="h6" sx={{ color: "white" }} > BetaHouse</Typography></Box>
          </Stack>
        </Box>




        {/* Menu list */}


        <Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"

          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <Link to={'home'} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={[selectedMenu === 'Home' && {
                  bgcolor: "primary.main", color: "white", ":hover": {
                    bgcolor: "primary.dark"
                  }
                }]}
                onClick={() => {
                  setMenu('Home')
                  DrawerClose();

                }}>
                <ListItemIcon>
                  <HomeIcon sx={[selectedMenu === 'Home' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>

            </Link>

            <ListItemButton >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Houses" />

            </ListItemButton>
            {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse> */}

            <Link to={'contact'} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={[selectedMenu === 'contact' && {
                  bgcolor: "primary.main", color: "white", ":hover": {
                    bgcolor: "primary.dark"
                  }
                }]}
                onClick={() => {
                  setMenu('contact')
                  DrawerClose();

                }}>
                <ListItemIcon>
                  <ContactsIcon sx={[selectedMenu === 'contact' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItemButton>

            </Link>

            <Link to={'about'} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={[selectedMenu === 'about' && {
                  bgcolor: "primary.main", color: "white", ":hover": {
                    bgcolor: "primary.dark"
                  }
                }]}
                onClick={() => {
                  setMenu('about')
                  DrawerClose();

                }}>
                <ListItemIcon>
                  <InfoIcon sx={[selectedMenu === 'about' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="About us" />
              </ListItemButton>

            </Link>

            <Link to={'services'} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={[selectedMenu === 'services' && {
                  bgcolor: "primary.main", color: "white", ":hover": {
                    bgcolor: "primary.dark"
                  }
                }]}
                onClick={() => {
                  setMenu('services')
                  DrawerClose();

                }}>
                <ListItemIcon>
                  <MiscellaneousServicesIcon sx={[selectedMenu === 'services' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="Services" />
              </ListItemButton>

            </Link>

            <Link to={'client'} style={{ textDecoration: "none" }} >
              <ListItemButton sx={[selectedMenu === 'client' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
                onClick={() => {
                  setMenu('client')
                  DrawerClose();


                }}>
                <ListItemIcon>

                  <BusinessIcon sx={[selectedMenu === 'client' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="Clients" />

              </ListItemButton>
            </Link>

            <Link to={'gallery'} style={{ textDecoration: "none" }}>
              <ListItemButton sx={[selectedMenu === 'gallery' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
                onClick={() => {
                  setMenu('gallery')
                  DrawerClose();


                }}>
                <ListItemIcon>

                  <BusinessIcon sx={[selectedMenu === 'gallery' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="Gallery" />

              </ListItemButton>
            </Link>

            <Link to={'users'} style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={[selectedMenu === 'users' && {
                  bgcolor: "primary.main", color: "white", ":hover": {
                    bgcolor: "primary.dark"
                  }
                }]}
                onClick={() => {
                  setMenu('users')
                  DrawerClose();

                }}>
                <ListItemIcon>
                  <AccountCircleIcon sx={[selectedMenu === 'users' && { color: "white" }]} />
                </ListItemIcon>
                <ListItemText primary="users" />
              </ListItemButton>

            </Link>

          </List>
        </Box>
      </Box>
    </Drawer>
    {/* big screen menu */}
    <Box sx={{
      width: "300px", height: "100vh", display: {
        xs: "none",

        md: "block"
      }, borderRight: 2, borderColor: "#eee"
    }}>


      <Box sx={{ p: 4 }}>

        <Stack direction={'row'} spacing={1}>
          <Box>
            <AddHomeWorkIcon sx={{ color: "green", height: 30, fontSize: 50 }} />

          </Box>

          <Box><Typography variant="h6" > BetaHouse</Typography></Box>
        </Stack>
      </Box>




      {/* Menu list */}


      <Box>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"

        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <Link to={'home'} style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={[selectedMenu === 'Home' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
              onClick={() => {
                setMenu('Home')

              }}>
              <ListItemIcon>
                <HomeIcon sx={[selectedMenu === 'Home' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

          </Link>

          <ListItemButton >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Houses" />

          </ListItemButton>
          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse> */}

          <Link to={'contact'} style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={[selectedMenu === 'contact' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
              onClick={() => {
                setMenu('contact')

              }}>
              <ListItemIcon>
                <ContactsIcon sx={[selectedMenu === 'contact' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>

          </Link>

          <Link to={'about'} style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={[selectedMenu === 'about' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
              onClick={() => {
                setMenu('about')

              }}>
              <ListItemIcon>
                <InfoIcon sx={[selectedMenu === 'about' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="About us" />
            </ListItemButton>

          </Link>

          <Link to={'services'} style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={[selectedMenu === 'services' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
              onClick={() => {
                setMenu('services')

              }}>
              <ListItemIcon>
                <MiscellaneousServicesIcon sx={[selectedMenu === 'services' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItemButton>

          </Link>

          <Link to={'client'} style={{ textDecoration: "none" }} >
            <ListItemButton sx={[selectedMenu === 'client' && {
              bgcolor: "primary.main", color: "white", ":hover": {
                bgcolor: "primary.dark"
              }
            }]}
              onClick={() => {
                setMenu('client')


              }}>
              <ListItemIcon>

                <BusinessIcon sx={[selectedMenu === 'client' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="Clients" />

            </ListItemButton>
          </Link>

          <Link to={'gallery'} style={{ textDecoration: "none" }}>
            <ListItemButton sx={[selectedMenu === 'gallery' && {
              bgcolor: "primary.main", color: "white", ":hover": {
                bgcolor: "primary.dark"
              }
            }]}
              onClick={() => {
                setMenu('gallery')


              }}>
              <ListItemIcon>

                <BusinessIcon sx={[selectedMenu === 'gallery' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="Gallery" />

            </ListItemButton>
          </Link>

          <Link to={'users'} style={{ textDecoration: "none" }}>
            <ListItemButton
              sx={[selectedMenu === 'users' && {
                bgcolor: "primary.main", color: "white", ":hover": {
                  bgcolor: "primary.dark"
                }
              }]}
              onClick={() => {
                setMenu('users')

              }}>
              <ListItemIcon>
                <AccountCircleIcon sx={[selectedMenu === 'users' && { color: "white" }]} />
              </ListItemIcon>
              <ListItemText primary="users" />
            </ListItemButton>

          </Link>

        </List>
      </Box>
    </Box>
  </>
}