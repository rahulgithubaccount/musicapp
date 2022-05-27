import React, { useState, } from 'react';
import axios from "axios";
import { Grid, Container, TextField, Button } from '@mui/material/';
import { useNavigate } from "react-router-dom";
import SongsTable from "./SongsTable";


function Tables() {

  const marginTop = { marginTop: 15 }


  const navigate = useNavigate();

  const [inputs, setInputs] = useState({

    songName: "",
    singerName: "",
   

  })

  const { songName, singerName, } = inputs

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/postsong", {

      songName: songName,
      singerName: singerName,
   


    }, {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem("auth-token"))
      }
    }


    )
    window.location.reload(true);


  }

 

  



  return (
    <div>

      <Container fixed>


     

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item lg={6}>
              <TextField
                fullWidth
                label='Song Name'
                placeholder="Enter your Song Name"
                style={marginTop}
                required={true}
                type="text"
                onChange={handleChange}
                name="songName"
                value={inputs.songName}
              />

            </Grid>
            <Grid item lg={6}>
              <TextField
                fullWidth
                label='Singer Name'
                placeholder="Enter your Singer Name"
                style={marginTop}
                required={true}
                type="text"
                onChange={handleChange}
                name="singerName"
                value={inputs.singerName}
              />
            </Grid>

          


            <Button type='submit' variant='contained' color='primary' style={{ margin: "34px auto" }}>Submit</Button>
          </Grid>
        </form>





        <SongsTable />
      </Container>
    </div>
  )
}

export default Tables