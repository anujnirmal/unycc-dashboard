import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import TableComp from '../table/TableComp';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Paper,
    Grid,
    Button
} from '@mui/material';
import { Preview } from '@mui/icons-material';
import './manualentry.css';
import serverLink from '../../serverLink';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const ManualEntry = () => {
    const [page, setPage] = useState("accepted");
    const [query, setQuery] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        organization: "",
        city: "",
        gender: "",
        nationality: ""

    })

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
                    email: preValue.email,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: preValue.nationality
                 }
             )
            )
            
        }

        if (queryId == "lastName") {
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: value,
                    phone_number: preValue.phone_number,
                    email: preValue.email,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: preValue.nationality
                 }
             )
            )
            
        }

        if (queryId == "phoneNumber") {
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: value,
                    email: preValue.email,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: preValue.nationality
                 }
             )
            )
            
        }

        if (queryId == "email") {
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: value,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: preValue.nationality
                 }
             )
            )
            
        }

        if (queryId == "organization") {
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: preValue.email,
                    organization: value,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: preValue.nationality
                 }
             )
            )
            
        }

        if(queryId == "city"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: preValue.email,
                    organization: preValue.organization,
                    city: value,
                    gender: preValue.gender,
                    nationality: preValue.nationality 
                 }
             )
            )
        }
        
        if(queryId == "gender"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: preValue.email,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: value,
                    nationality: preValue.nationality 
                 }
             )
            )

        }

        if(queryId == "nationality"){
            setQuery(preValue => (
                {
                    first_name: preValue.first_name,
                    last_name: preValue.last_name,
                    phone_number: preValue.phone_number,
                    email: preValue.email,
                    organization: preValue.organization,
                    city: preValue.city,
                    gender: preValue.gender,
                    nationality: value 
                 }
             )
            )
        }
    }


    async function handleQuerySubmit(e){
        e.preventDefault();
        const token = window.localStorage.getItem("token").toString(); 
    
        const authAxios = axios.create({
            baseURL: serverLink,
            headers: {
                'x-access-token': token
            }
        })   
   
        const result = await authAxios.post(`/api/admin/manualentry`, query)
        .then((res) => {

            if(res.data.error === 11000) //dublicate key error
            {
                alert("User Already Registered");
            } else {
                console.log("Success")
                alert("Successfully Registered");
                setQuery({
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    email: "",
                    organization: "",
                    city: "",
                    gender: "",
                    nationality: ""
            
                })
            }
        })

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
                    value={query.first_name}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="lastName" 
                    label="Last Name" 
                    variant="outlined"
                    value={query.last_name} 
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="phoneNumber" 
                    label="Phone Number" 
                    variant="outlined" 
                    value={query.phone_number}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="email" 
                    label="Email Id " 
                    variant="outlined" 
                    value={query.email}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="organization" 
                    label="Organization" 
                    variant="outlined" 
                    value={query.organization}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField 
                    id="city" 
                    label="City" 
                    variant="outlined" 
                    value={query.city}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="gender" 
                    label="Gender" 
                    variant="outlined" 
                    value={query.gender}
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField 
                    id="nationality" 
                    label="Nationality" 
                    value={query.nationality}
                    variant="outlined" 
                    fullWidth
                    onChange={handleSearchChange}
                />
            </Grid>
            <Grid item xs={12}>
            <Button 
                variant="outlined"
                onClick={handleQuerySubmit}
            >
                Submit
            </Button>
            </Grid>

            {/* <Grid item xs={12}>
                <Button 
                    variant="outlined"
                    onClick={handleQuerySubmit}
                >Search</Button>
            </Grid> */}
            {/* <Grid item xs={12}>
                <AcceptTable page={page} query={query} appReload={props.reload}/>
            </Grid> */}
        </Grid>
    </Box>
</div>
  )
}

export default ManualEntry