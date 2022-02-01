import * as React from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import { visuallyHidden } from '@mui/utils';
import ApplicationPopup from '../applicationPopup/ApplicationPopup';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

let rows = [];

// const rows = [
//   createData('Salmon Bhoi', 305, "salmong@gmail.com", 67),
//   createData('Ram Mohan', 452, "rammohan@gmail.com", 51),
//   createData('Nitin Ghagare', 262, "nitinghagare@gmail.com", 24),
//   createData('Kabir Upreti', 159, "kabirUpreti@gmail.com", 24),
//   createData('Samyak Chakrabarty', 356, "samyak@xbillionlabs.com", 49),
//   createData('Gaurav Jain', 408, "gaurav@xbillionskillslab.com", 87),
//   createData('Soumya Singh', 237, "soumyasingh@gmail.com", 37),
//   createData('Nadeem', 375, "nadeem@xbillionskillslab.com", 94),
//   createData('Janhavi Banka', 518, "janhavi@xbillionskillslab.com", 65),
//   createData('Anchal Yadav', 392, "anchal@xbillionskillslba.com", 98),
//   createData('Vishal Shendi', 318, "vishalshendi@gmail.com", 81),
//   createData('Anuj Nirmal', 360, "anuj@worldceo.com", 9,),
//   createData('Kiyara', 437,"kiyaramybabu@gmail.com", 63),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Ages',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Accept/Reject',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            //sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, totalAppCount } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Applications
        </Typography>
     

        <Typography
          sx={{ 
            flex: '0 1 10%',  
            textAlign: 'right',
            paddingRight: '6px'
        }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
           Total : {totalAppCount}
        </Typography>
      
       

      {numSelected > 0 && (
        <Tooltip title="Accept">
          <IconButton>
            <CheckIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable( props ) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalAppCount, settotalAppCount] = React.useState();
  const [applicationDataAll, setApplicationDataAll] = React.useState();
  const [compReload, setCompReload] = React.useState();
  const [appReload, setAppReload] = React.useState(props.appReload);
  
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([navigate]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  let navigate = useNavigate();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  React.useEffect(() => {
    const token = window.localStorage.getItem("token").toString(); 
    getApplicationData(token);
},[navigate, compReload, appReload])


const getApplicationData = async (token) => {
    console.log(props.page)
    const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            'x-access-token': token
        }
    })   
    try{
      const currPage = props.page;
      if(currPage == "accepted"){
          const result = await authAxios.post(`/api/admin/accepted`)
          .then((value) =>{
            rows = [];
              settotalAppCount(value.data.totalCount)
              setApplicationDataAll(value.data.applications);
              
              for (var i = 0; i < value.data.applications.length; i++){
                rows.push(
                  createData(
                    value.data.applications[i].first_name,
                    value.data.applications[i].age,
                    value.data.applications[i].email, 
                    value.data.applications[i].gender,
                  ),
                )
              }

              setCompReload(uuidv4());
          })
      }

      if(currPage == "application"){
        const result = await authAxios.post(`/api/admin/application`)
        .then((value) =>{
            settotalAppCount(value.data.totalCount)
            setApplicationDataAll(value.data.applications);
            
            rows = [];
            for (var i = 0; i < value.data.applications.length; i++){
              rows.push(
                createData(
                  value.data.applications[i].first_name,
                  value.data.applications[i].age,
                  value.data.applications[i].email, 
                  value.data.applications[i].gender,
                ),
              )
            }
        })
      }
        

    }
    catch (err) {
        console.log(err);
    }     
}

  function removeAcceptedArray(curId) {
    setCompReload(uuidv4());
  }



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} totalAppCount={totalAppCount} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">
                        {/* <Button 
                         
                          onClick={() => {
                            setAppPopup(true)
                          }}
                        >
                          View
                        </Button> */}

                        <ApplicationPopup 
                          curId={index} 
                          info={row}
                          appData={applicationDataAll}
                          reSort={removeAcceptedArray}
                        />

                        {/* <Button 
                          variant="contained"
                          sx={{
                            margin: '0px 8px'
                          }}
                        >
                          <CheckIcon/>
                        </Button>
                        <Button variant="contained" color="error">
                          <CloseIcon /> 
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
  );
}
