import { Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ServicesList({ServicesData,updateOurservices,deleteOurservices}){

console.log(ServicesData,'cluesff')

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'Title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
      field: 'Icon',
      headerName: 'Icon',
      width: 150,
      editable: true,
    },
    {
      field: 'Decribtion',
      headerName: 'Decribtion',
      width: 150,
      editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {

        return <Box>

          <IconButton onClick={() => updateOurservices(params.row)}>

            <ModeEditIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => deleteOurservices(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

        </Box>
      }
    },





  ];



  const rows = ServicesData ? ServicesData : null

console.log("rowww",rows)
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid

          rows={rows}
          columns={columns}
          sx={{boxShadow: 1}}

          // material ui datagrid ma support gareenaayo by default _id 
          //  si aan u xalino taas waxaan default row id  datagrid id to _id u badalno
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}

          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

