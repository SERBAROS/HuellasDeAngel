import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/huellas/Person/GridItem.js";
import GridContainer from "components/huellas/Person/GridContainer.js";
import Button from "components/huellas/Person/Button.js";
import Card from "components/huellas/Person/Card.js";
import CardHeader from "components/huellas/Person/CardHeader.js";
import CardAvatar from "components/huellas/Person/CardAvatar.js";
import CardBody from "components/huellas/Person/CardBody.js";
import CardFooter from "components/huellas/Person/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import UploadImage from "components/huellas/Person/UploadImage";
import UploadFile from "components/huellas/Person/UploadFile";
import imgProfile from "./../../assets/img/profile.png"
import {HTTP_CONSTANTS} from './../../config/http-constants'
import {requestHttp,requestHttpFile} from './../../config/http-server'
import path from 'path'

const useStyles = makeStyles(() => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  input: {
    display: 'none'
},
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  textField: {
    width: 'auto',
    FullWidth: false,
  },
  root: {
    flexGrow: 10,
    height: 100,
  },
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
  itemAdd:{
    margin:'20px 0px 20px 0px'
  }
}));

export default function UserProfile() {
  const classes = useStyles();
  
  useEffect(() => {
    getListFromSites()
    return () => {}
  }, [])

  const [name, setName] =useState('')
  const [lastName1, setLastName1] =useState('')
  const [lastName2, setLastName2] =useState('')
  const [birthday, setBirthday] =useState('')
  const [age, setAge] =useState('')
  const [gender, setGender] =useState('')
  //const [imageURL, setImageURL] =useState('')
  const [file, setFile] =useState()
  const [typeIdent, setTypeIdent] =useState('')
  const [ident, setIdent] =useState('')
  const [fromSite, setFromSite] =useState('')
  const [fromSiteList, setFromSiteList] =useState([])
  const [image, setImage] =useState(imgProfile)

  const sendImage = async (inName,imageURL) =>{
    try {
    
    const data = new FormData()
    data.append("_id",inName)
    data.append("file",file)
    /*console.log(file)
    axios.post('http://localhost:5000/upload',data)
    .then(res =>console.log(res))
    .catch(err=>console.log(err))*/
      const endpoint = HTTP_CONSTANTS.uploadUP
      await requestHttpFile('post',endpoint, data)
     // console.log(response)
     await updatePersonImageURL(inName,imageURL)
    } catch (err) {
      console.log(err)
    }

  }

  const changeIMG = (fileImage,urlImg) =>{
    setImage(urlImg)
    setFile(fileImage)
  }

  const addPersonHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      lastName1,
      lastName2,
      birthday,
      age,
      gender,
      typeIdent,
      ident,
      fromSite
    }
    addPersonRequest(data)    
  }
  
  const redirectHome = () => {
    window.location.href = '/admin/login'
  }

  const updatePersonImageURL = async (id,imageURL) => {
    try {
      const endpoint = HTTP_CONSTANTS.persons+id
      
      const data = {
        imageURL
      }
      console.log("data:",data)
      const response = await requestHttp('put',endpoint,data )
      console.log(response)
      
    } catch (err) {
      console.log(err)
    }
  }

  const addPersonRequest = async (data) => {
    try {
      console.log(data)
      const endpoint = HTTP_CONSTANTS.persons
      const response = await requestHttp('post',endpoint, data)
      console.log(response)
      if (response.status === 201) {
        console.log("file img: ",file)
        const ext = HTTP_CONSTANTS.urlUp + HTTP_CONSTANTS.imageUp + response.response._id + path.extname(file.name)
        console.log(ext)
       // setImageURL(ext)
       await sendImage(response.response._id,ext)
       
        redirectHome()
      } else {
        console.log(response)
      }
      
    } catch (err) {
      console.log(err)
      
    }
  }

  const getListFromSites = async () =>{
    try {

      const endpoint = HTTP_CONSTANTS.fromSites
      const response = await requestHttp('get',endpoint)
      if (response.status === 200) {
        
        setFromSiteList (response.response)
      } 
    }
    catch (err) {
    console.log(err)
    } 
  }

  return (
    <div>       
      <Card profile>
        <CardAvatar profile>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <img src={image} alt="..." />
          </a>
        </CardAvatar>
        <UploadImage onChange={changeIMG} />
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Datos Básicos</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Nombre"
                        id="name"
                        value ={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="1er. Apellido"
                        id="lastname1"
                        value ={lastName1}
                        onChange={(e) => setLastName1(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="2do. Apellido"
                       id="lastname2"
                        value ={lastName2}
                       onChange={(e) => setLastName2(e.target.value)}
                       fullWidth
                       margin="normal"
                    />
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={4} >
                      <TextField
                        label="No. Identificacion"
                        id="ident"
                        value ={ident}
                        onChange={(e) => setIdent(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={{textAlign: 'left'}}>
                      <TextField
                        label="Fecha de nacimiento"
                        id="birthday"                    
                        type="date"
                        className={classes.textField}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        value ={birthday}
                        onChange={(e) => (setBirthday(e.target.value))}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="Edad"
                      id="age"
                      fullWidth
                      margin="normal"
                      value ={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    </GridItem>
                    </GridContainer>
                    <GridContainer style={{textAlign: 'left',marginTop:'16px'}}>
                  <GridItem xs={12} sm={12} md={4} >
                    <InputLabel shrink htmlFor="tipoIdentificacion">
                      Tipo Identificacion
                    </InputLabel>
                    <NativeSelect
                      value={typeIdent}
                      onChange={(e) => setTypeIdent(e.target.value)}
                      fullWidth                     
                      inputProps={{
                        name: 'tipoIdentificacion',
                        id: 'tipoIdentificacion',
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value={'RC'}>Registro Civil</option>
                      <option value={'TI'}>Tarjeta Identidad</option>
                      <option value={'CC'}>Cedula Ciudadania</option>
                      <option value={'PA'}>Pasaporte</option>
                    </NativeSelect>
                      
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>                
                    <InputLabel shrink htmlFor="gender">
                      Sexo
                    </InputLabel>
                    <NativeSelect
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      fullWidth
                      margin="normal"
                      inputProps={{
                        name: 'gender',
                        id: 'gender',
                      }}
                    >
                      <option value="">Elegir..</option>
                      <option value={'MAS'}>Masculino</option>
                      <option value={'FEM'}>Femenino</option>
                    </NativeSelect>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>                  
                    <InputLabel shrink >
                      Lugar Origen
                    </InputLabel>
                    <NativeSelect
                      value={fromSite}
                      onChange={(e) => setFromSite(e.target.value)}
                      margin="normal"
                      fullWidth
                      inputProps={{
                        name: 'fromSite',
                        id: 'fromSite',
                      }}
                    >
                       <option value="">Elegir..</option>
                      {
                        fromSiteList.map((item,key)=> 
                        <option value={item._id} key={key}>{item.name}</option>
                        )
                      }
                    </NativeSelect>
                  </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Documentos</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer >                
                    <GridItem xs={12} sm={12} md={12}>
                      <h6>Adjuntar formato de ingreso</h6><UploadFile/>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <h6>Adjuntar evaluación médica</h6><UploadFile/>
                    </GridItem>
               </GridContainer>
               </CardBody>
               </Card> 
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={addPersonHandler}>Actualizar</Button>
        </CardFooter>
      </Card>   
    </div>
  );
}
