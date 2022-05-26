import React,{useState,useEffect} from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




  
export default function SongsTable() {

    useEffect(()=>{

        getdata();
        },[])
        
        const [songs,setsongs]= useState([])
        
        const getdata = async ()=>{
            const response = await axios.get('http://localhost:8000/getallsong',{
              headers:{
                'auth-token': JSON.parse(localStorage.getItem("auth-token"))
              }
            })
        setsongs(response.data.songs)
        
        console.log(response.data.songs)
        }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.no</StyledTableCell>
            <StyledTableCell align="center">Song Name</StyledTableCell>
            <StyledTableCell align="center">Singer Name</StyledTableCell>
          
          
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((item,i) => (
            <StyledTableRow key={item.i}>
                <StyledTableCell component="th"   scope="row">
                {i+1}
              </StyledTableCell>

              <StyledTableCell component="th"  align="center" scope="row">
                {item.songName}
              </StyledTableCell>
              <StyledTableCell component="th" align="center" scope="row">
                {item.singerName}
              </StyledTableCell>
        
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
