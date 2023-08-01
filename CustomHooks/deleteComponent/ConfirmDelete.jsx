import { QuestionMarkOutlined } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'

export default function ConfirmDelete({message,open,toggle,confirm}) {
  return (
    <>
    <Box>
    <Dialog open={open} onClose={toggle}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <Box  >
        <DialogContent>
        <Box sx={{width:"400px",display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}} mt={2} >



<Stack  spacing={2} direction={'column'}>
<QuestionMarkOutlined sx={{fontSize:"40px",bgcolor:'primary.main',color:'white',borderRadius:'100%',p:2,alignSelf:'center' , textAlign:'center'} }/>



<Typography variant='h6' >Ma hubtaa inaa Tirto </Typography>

<Typography >{message}</Typography>
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Cancel</Button>
          <Button variant="contained" onClick={confirm}  sx={{bgcolor:"primary.main"}}   size="small">

    Yes
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>


    </Box>
    </>
  )
}
