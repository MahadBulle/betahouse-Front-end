import { TextField, Stack, Box, Button, Alert, Divider,Chip } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function ImagesFolder() {
    const { id, Type } = useParams()

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1654602596161-a988ab636da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYXV0aWZ1bCUyMGhvdXNlcyUyMGluJTIwdGhlJTIwZm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            title: 'Bed',
            author: 'swabdesign',
        },
        {
            img: 'https://images.unsplash.com/photo-1662639612766-01a774228e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXRpZnVsJTIwaG91c2VzJTIwaW4lMjB0aGUlMjBmb3Jlc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            title: 'Books',
            author: 'Pavel Nekoranec',
        },
        {
            img: 'https://plus.unsplash.com/premium_photo-1663045246303-9f60f7a62567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlYXV0aWZ1bCUyMGhvdXNlcyUyMGluJTIwdGhlJTIwZm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            title: 'Sink',
            author: 'Charles Deluvio',
        },
        {
            img: 'https://images.unsplash.com/photo-1662667856989-e74560676977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJlYXV0aWZ1bCUyMGhvdXNlcyUyMGluJTIwdGhlJTIwZm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            title: 'Mahad',
            author: 'Charles Deluvio',
        },


    ];

    return (
        <>
            <Box sx={{p:2}}>
            <Divider sx={{height:20}} />
                <Alert saverity="info">
                    Type :  {Type} {"   "}  Ref ID : {"   "} {id}
                </Alert>
                <Divider sx={{height:20}} />

                <Stack direction={'row'} spacing={2}>
                    <TextField type='file' size='small' variant='outlined' label='Select Image' fullWidth />
                    <Button variant='contained' size='small'>Upload</Button>
                </Stack>
                <Divider />
                
                <Box>
                <Divider sx={{height:20}} />
                    <Grid container spacing={2}>

                    {itemData.map((item, index) => {

                        return <Grid item xs= {12} sm={12} md={6} lg={4}> 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                key={index}
                                sx={{ height: 140 }}
                                image={item.img}
                                title="green iguana"
                            />
                            <CardContent>
                                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                                <Typography variant="body2" color="text.secondary">
                                    {item.title}
                
                                </Typography>
                                <Chip label="See More" size="small" variant="outlined"  />
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Delete</Button>
        
                            </CardActions>
                        </Card>
                        </Grid>

                    })}
                    </Grid>

                    
{/* <Grid item xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid> */}

                </Box>
                


            </Box>
            <Divider />

        </>
    )
}
