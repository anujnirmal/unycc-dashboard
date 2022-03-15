import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableComp from '../table/TableComp';
import TextField from '@mui/material/TextField';
import AcceptTable from "./AcceptTable";
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Paper,
    Grid,
    Button
} from '@mui/material';
import { Preview } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Accepted = (props) => {
    const [page, setPage] = useState("accepted");
    const [query, setQuery] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
    })
    // const [randomId, setRandomId] = useState(props.reload);


    function handleSearchChange(e) {
        const queryId = e.target.id;
        const value = e.target.value;


        console.log(query);   
        if (queryId == "firstName") {
            setQuery(preValue => (
                {
                    first_name: value,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: preValue.email
                 }
             )
            )
            
        }

        if(queryId == "lastName"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: value,
                    phone_number: preValue.phone_number,
                    email: preValue.email
                 }
             )
            )
        }
        
        if(queryId == "phoneNumber"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: value,
                    email: preValue.email
                 }
             )
            )

        }

        if(queryId == "email"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: value
                 }
             )
            )
        }
    }


    function handleQuerySubmit(){
        
    }


  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>

                <Grid item xs={3}>
                    <TextField 
                        id="firstName" 
                        label="First Name" 
                        variant="outlined" 
                        fullWidth
                        onChange={handleSearchChange}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField 
                        id="lastName" 
                        label="Last Name" 
                        variant="outlined" 
                        fullWidth
                        onChange={handleSearchChange}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField 
                        id="phoneNumber" 
                        label="Phone Number" 
                        variant="outlined" 
                        fullWidth
                        onChange={handleSearchChange}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField 
                        id="email" 
                        label="Email Id " 
                        variant="outlined" 
                        fullWidth
                        onChange={handleSearchChange}
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <Button 
                        variant="outlined"
                        onClick={handleQuerySubmit}
                    >Search</Button>
                </Grid> */}
                <Grid item xs={12}>
                    <AcceptTable page={page} query={query} appReload={props.reload}/>
                </Grid>
            </Grid>
        </Box>
    </div>
)};

export default Accepted;
