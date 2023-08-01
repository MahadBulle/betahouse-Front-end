import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function AboutList({AboutData, update}) {

  console.log(AboutData)

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'Description',
          headerName: 'Description',
          width: 150,
          editable: true,
        },
        {
          field: 'ShortDescription',
          headerName: 'ShortDescription',
          width: 150,
          editable: true,
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
      
              return <Box>
      
                <IconButton onClick={() => update(params.row)}>
      
                  <ModeEditIcon sx={{ color: "primary.main" }} />
                </IconButton>

      
              </Box>
            }
          },
      ];

      
console.log(AboutData)
      const rows= AboutData ? AboutData : null

  return (
   <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid

          rows={rows}
          columns={columns}

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
