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


  const [image,setImage]= useState(null)

const ImageChange= (e)=>{
  setImage(e.target.files[0])
  console.log(e.terget.files[0])
} 


  const { songName, singerName, } = inputs

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {

const formdata = new FormData();

formdata.append("songName",songName);
formdata.append("singerName",singerName);
formdata.append("image",image);

    e.preventDefault();
    await axios.post("http://localhost:8000/postsong", formdata

    , {
      headers: {
        'auth-token': JSON.parse(localStorage.getItem("auth-token"))
      }
    }


    )
   
  }

 

  



  return (
    <div>

      <Container fixed>


     

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 5 }}>
        

            <Grid item lg={6}>
              <TextField
                fullWidth
            
                
                style={marginTop}
                required={true}
                type="file"
                onChange={ImageChange}
                name="image"
               
              />
            </Grid>
            <Grid item lg={6}>

            <Button type='submit' variant='contained' color='primary' style={{ margin: "23px auto" }}>Submit</Button>
            </Grid>
          </Grid>
        </form>





        <SongsTable />
      </Container>
    </div>
  )
}

export default Tables