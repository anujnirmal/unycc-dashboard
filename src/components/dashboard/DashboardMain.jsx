import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TotalApplicant from "../total-applicant/TotalApplicant";
import TableComp from "../table/TableComp";
import serverLink from '../../serverLink';
import axios from 'axios';
import { SettingsBackupRestoreSharp } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const DashboardMain = () => {

    const [dashboardCount, setDashboardCount] = useState({
        "applicationCount": "0",
        "totalEmails": "0",
        "totalAccepted": "0",
        "totalManualEntry": "0",
        "totalRsvp": "0"
    });

    const [page, setPage] = useState("application");
    
    useEffect(() => {
        const token = window.localStorage.getItem("token").toString(); 
        getDashboardData(token);
    })


    const getDashboardData = async (token) => {
        
        const authAxios = axios.create({
            baseURL: serverLink,
            headers: {
                'x-access-token': token
            }
        })   
        try{
            const result = await authAxios.post(`/api/admin/dashboard`);     
            const {
                acceptedCount, 
                appCount, 
                contactCount, 
                manualentry,
                rsvp
            } = result.data;

            setDashboardCount({
                "applicationCount": appCount,
                "totalEmails": contactCount,
                "totalAccepted": acceptedCount,
                "totalManualEntry": manualentry,
                "totalRsvp": rsvp
            })
        }
        catch (err) {
            console.log(err);
        }     
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TotalApplicant totalStats={dashboardCount} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableComp page={page}/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default DashboardMain
