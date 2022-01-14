import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TotalApplicant from "../total-applicant/TotalApplicant";
import TableComp from "../table/TableComp";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DashboardMain = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TotalApplicant />
                    </Grid>
                    <Grid item xs={12}>
                        <TableComp />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default DashboardMain
