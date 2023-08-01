import { Box, Stack, IconButton, Typography, Alert, TextField, Button, Divider } from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import GalleryList from "./GalleryList";
import { AddGallery, getAllGallery } from "./ApiCrud";
import { useForm } from "react-hook-form";
export const Gallery = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [dailogOpen, setDailog] = useState(false)
    const ToggleDailog = () => {
        setDailog(!dailogOpen)
    }

    const [Gallery, setGallery] = useState([])

    useEffect(() => {
        const allGallery = async () => {

            const { data } = await getAllGallery()

            console.log('Xogta', data)

            setGallery(data)
        }

        allGallery()


    }, [])


    const AddNewGallery = async (data) => {
        try {
            await AddGallery(data)
            console.log("Data has been saved")
            ToggleDailog()
        } catch (err) {
            console.log("Error Ocured ", err)

        }
    }
    return <>
        <Box p={4}>

            <Alert severity="info">Our Gallery</Alert>
            <Box sx={{ display: "flex", justifyContent: "space-between" }} my={4}>
                <Typography variant="h6">List Gallery</Typography>

                <IconButton onClick={ToggleDailog}>
                    <AddHomeWorkIcon sx={{ color: "green" }} />
                </IconButton>
            </Box>

            <Dialog open={dailogOpen} onClose={ToggleDailog}>
                <DialogTitle>New Image</DialogTitle>
                <Box component={"form"} onSubmit={handleSubmit(AddNewGallery)}>
                    <DialogContent>
                        <Box sx={{ width: "400px" }} mt={2}>



                            <Stack spacing={2} direction={'column'}>



                                <TextField label="ImageTitle" {...register("ImageTitle")} variant="outlined" size="small" fullWidth />

                                <TextField label="Image" variant="outlined" {...register("Image")} size="small" fullWidth />


                            </Stack>

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ToggleDailog}>Cancel</Button>
                        <Button variant="contained" type="submit" size="small">Submit</Button>

                    </DialogActions>

                </Box>
            </Dialog>

            <Divider />
            {Gallery ? <GalleryList GalleryData={Gallery} /> : null}

        </Box>
    </>
}
export default Gallery