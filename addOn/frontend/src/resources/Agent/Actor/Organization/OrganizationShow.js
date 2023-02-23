import React, { useRef } from 'react';
import { TextField, useGetList, useRecordContext } from 'react-admin';
import { Typography, Box, Grid } from '@material-ui/core';
import OrganizationTitle from './OrganizationTitle';
import { MarkdownField } from '@semapps/markdown-components';
import { MainList } from '../../../../common/list';
import Show from "../../../../layout/show/Show";
import { makeStyles } from '@material-ui/core/styles';
import * as Muicon from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import useMediaQuery from '@mui/material/useMediaQuery';


const useStyles = makeStyles(theme => ({
  whiteBox: {
    border: "5px solid " + theme.palette.primary.main,
    paddingLeft: '20px',
    paddingBlock: "20px",
    color: theme.palette.primary.main,
    marginBottom: '40px',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: "40px",
    overflow: "hidden"
  },
  contentRightBox: {
    paddingTop: "40px"
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  rightTitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "25px",
  },
  contactTitle:{
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "20px",
  },
  contactContent: {
    fontSize: "20px",
    color: theme.palette.primary.main,
    paddingBottom: "20px",
  },
  printButton: {
    borderRadius: "10px",
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    fontSize: "1.1em",
    border: "0",
    cursor: "pointer",
    margin: "1em",
    bottom: "25px",
    width: "250px",
    height: "40px",
    fontWeight: "bold"
  },
  heal: {
    color: "#90be48",
    fontSize: "15px",
  },
  markdownText: {
    marginBottom: "40px", 
    color: theme.palette.primary.main, 
    fontSize: "20px"
  }
})); 

const Icon = ({ name, ...rest }) => {
  const IconComponent = Muicon[name];
  return IconComponent ? <IconComponent {...rest} /> : null;
};

const Theme = ({childThemes, parent}) => {
  let selectedTheme = []
  if (!childThemes) return null;
  childThemes.forEach(theme => {
    if (theme["peps:broader"] && theme["peps:broader"] === parent) {
      selectedTheme.push(theme);
    }
  });
  if (selectedTheme.length === 0)
    return (<div><span style={{color: "#ABA093"}}>Non Renseigné</span></div>)
  return (
    selectedTheme.map(theme => 

      <div style={{display: "flex", alignItems: "center"}}>
        {<Icon name={theme["pair:icon"]} style={{color: theme["pair:color"], fontSize: "35px"}}/>} 
        <span style={{color: theme["pair:color"], fontSize: "20px", paddingLeft:"5px"}}>{theme["pair:label"]}</span>
      </div>
    )
  )
}

const SideThemeOrga = () => {
  const classes = useStyles();
  const { data } = useGetList("Theme", { page: 1, perPage: Infinity });
  const record = useRecordContext();
  if (!record) return null;
  const hasTopicStrings = record["pair:hasTopic"];

  let routeTree = [];
  for (const item in data) {
    if (data[item]["peps:broader"] === undefined ) {
      routeTree.push(data[item]);
    }
  }

  let hasTopic = [];
  if (Array.isArray(hasTopicStrings)) {
    hasTopicStrings.forEach(topicString => { 
      const topicStringArray = Object.entries(data).filter(([key, value]) => key === topicString);
      if (Array.isArray(topicStringArray) && Array.isArray(topicStringArray[0])) {
        hasTopic.push(topicStringArray[0][1]);
      }
    });
  }
  
  return (
    <Grid item xs={12} sm={12} md={6} >
      {
        routeTree.map( route => 
          <Box className={classes.whiteBox}>
            <Typography className={classes.boxTitle}>{route["pair:label"] }</Typography>
            <Theme childThemes={hasTopic} parent={route.id}/>
          </Box>
        )
      }
    </Grid>
  )
}

const TextFieldWithTitle = ({title, source, check=false}) => {
  const classes = useStyles();
  const record = useRecordContext();
  if (!record) return null;
  if(!record[source] && !check) return null;

  return (
    <>
      <Box style={{marginBottom: "20px"}}>
        <div className={classes.rightTitle}>{title}</div>
        <TextField source={source} className={classes.contactContent}/>
      </Box>
    </>
  )
}

const MarkdownFieldWithTitle = ({title, source}) => {
  const classes = useStyles();
  const record = useRecordContext();
  if (!record) return null;
  if(!record[source]) return null;

  return (
    <>
      <Box className={classes.markdownText}>
        <div className={classes.rightTitle}>{title}</div>
        <MainList >
          <MarkdownField addLabel={false} source={source} className={classes.contactContent} />
        </MainList>      
      </Box>
    </>
  )
}

const OrganizationShow = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const componentRef = useRef();
  const matches = useMediaQuery('print');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, 
  });

  return (
    <div ref={componentRef} >
      <Show title={<OrganizationTitle />} {...props}>
        <Grid container spacing={5} >
          <SideThemeOrga />
          <Grid item xs={12} sm={12} md={6}>
            <Box className={classes.contentRightBox}>
              <TextFieldWithTitle title="TYPE DE STRUCTURE" source='peps:type'/>
              <TextFieldWithTitle title="COORDONNEES" source='pair:hasLocation.pair:label' check="true"/>
              <MarkdownFieldWithTitle source="pair:description" title="INFORMATIONS" />   
              <TextFieldWithTitle source='peps:skills' title="COMPETENCE" />
              <TextFieldWithTitle source='peps:openHour' title="OUVERTURE" />
              <TextFieldWithTitle source='peps:accommodationCapacity' title="CAPACITE D'ACCUEIL" />
              <TextFieldWithTitle source='peps:homeTrip' title="DEPLACEMENT A DOMICILE" />
              <TextFieldWithTitle source="peps:concernedPublic" title="PUBLIC CONCERNE" />
              <TextFieldWithTitle source='peps:dataSource' title="SOURCE DE DONNEES" />
              <Box >
                {matches ? null : <button onClick={handlePrint} className={classes.printButton}>IMPRIMER</button>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Show>
    </div>
  );
});

export default OrganizationShow;
