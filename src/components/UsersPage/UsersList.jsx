import { Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function UsersList({ UsersData, updateUser, deleteUser }) {

  console.log(UsersData, 'cluesff')

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'username',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'status',
      width: 150,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'role',
      width: 150,
      editable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {

        return <Box>

          <IconButton onClick={() => updateUser(params.row)}>

            <ModeEditIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => deleteUser(params.row)}><DeleteIcon sx={{ color: "error.main" }} /></IconButton>

        </Box>
      }
    },





  ];



  const rows = UsersData ? UsersData : null

  // console.log("rowww", rows)
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          sx={{ boxShadow: 1 }}

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

