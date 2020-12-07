import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


// core components
import GridItem from "components/dashboard/Grid/GridItem.js";
import Card from "components/dashboard/Card/Card.js";
import CardBody from "components/dashboard/Card/CardBody.js";
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ModifyIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
 
  cardPerson: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

export default function GridPerson({name,lastname,age,image,typeIdent,ident,gender}) {
  const classes = useStyles();

 
  return (
  <div >
    <GridItem  >
      <Card className={classes.cardPerson} xs={12} sm={12} md={12} style={{margin:"10px 0px 0px 0px"}} > 
        <img
          style={{ height: "200px", width: "200px"}} alt={image}
          src={image} />            
        <CardContent >
          <Typography>
            {name} 
          </Typography>
          <Typography >
            {lastname}
          </Typography>
          <Typography >
            {typeIdent} {ident} 
          </Typography>
          <Typography >
            {age} {gender}
          </Typography>
          <Typography >
            Comisaría 1
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
            Resumen
          </Typography>
          <Typography>
            <div>
              Lorem ipsum dolor sit amet,<br></br> consectetur adipisicing elit. 
            </div>
          </Typography>
        </CardContent>
        <CardContent >   
          <IconButton>
            <SearchIcon /> Detalles
          </IconButton>
          <IconButton >
            <ModifyIcon /> Modificar
          </IconButton>
          <IconButton >
            <AssignmentIcon /> Novedades
          </IconButton>
        </CardContent>
      </Card>
    </GridItem>
  </div>
  )}