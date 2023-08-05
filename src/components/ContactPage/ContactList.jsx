import { Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ContactList({ContactsData,updateContacts,deleteContacts}){

console.log(ContactsData,'cluesff')

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      width: 150,
      editable: true,
    },
    {
      field: 'Message',
      headerName: 'Message',
      width: 150,
      editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {

        return <Box>

          <IconButton onClick={() => updateContacts(params.row)}>

            <ModeEditIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => deleteContacts(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

        </Box>
      }
    },





  ];



  const rows = ContactsData ? ContactsData : null

console.log("rowww",rows)
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
        sx={{boxShadow: 1}}

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

