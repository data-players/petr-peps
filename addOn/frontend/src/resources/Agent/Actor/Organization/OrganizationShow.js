import React, { useEffect, useRef, useState } from 'react';
import { TextField, useGetList, useRecordContext } from 'react-admin';
import { Typography, Box, Grid } from '@material-ui/core';
import OrganizationTitle from './OrganizationTitle';
import { MarkdownField } from '@semapps/markdown-components';
import { MainList } from '../../../../common/list';
import Show from "../../../../layout/show/Show";
import { makeStyles } from '@material-ui/core/styles';
import * as Muicon from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

const useStyles = makeStyles(theme => ({
  whiteBox: {
    border: "5px solid " + theme.palette.primary.main,
    paddingLeft: '20px',
    paddingBlock: "20px",
    color: theme.palette.primary.main,
    marginBottom: '40px',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: "40px",
    overflow: "hidden",
  },
  contentRightBox: {
    paddingTop: "40px"
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: theme.palette.primary.main,
    textTransform: "uppercase;"
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  rightTitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "23px",
  },
  contactTitle:{
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "18px",
  },
  contactContent: {
    fontSize: "18px",
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
    fontSize: "13px",
  },
  markdownText: {
    color: theme.palette.primary.main, 
    fontSize: "18px"
  },
  printTitle: {
    color: theme.palette.primary.main, 
    fontSize: "28px",
    fontWeight: "bold",
    paddingTop: "10px",
    paddingLeft: "40px"
  },
  sideGrid: {
    padding: "0px"
  }
})); 

const Icon = ({ name, ...rest }) => {
  const IconComponent = Muicon[name];
  return IconComponent ? <IconComponent {...rest} /> : null;
};

// const Theme = ({childThemes, parent}) => {
//   let selectedTheme = []
//   if (!childThemes) return null;
//   childThemes.forEach(theme => {
//     if (theme["peps:broader"] && theme["peps:broader"] === parent) {
//       selectedTheme.push(theme);
//     }
//   });
//   if (selectedTheme.length === 0)
//     return (<div><span style={{color: "#ABA093"}}>Non Renseigné</span></div>)
//   return (
//     selectedTheme.map(theme => 

//       <div style={{display: "flex", alignItems: "center"}}>
//         {<Icon name={theme["pair:icon"]} style={{color: theme["pair:color"], fontSize: "35px"}}/>} 
//         <span style={{color: theme["pair:color"], fontSize: "20px", paddingLeft:"5px"}}>{theme["pair:label"]}</span>
//       </div>
//     )
//   )
// }

// const SideThemeOrga = () => {
//   const classes = useStyles();
//   const { data } = useGetList("Theme", { page: 1, perPage: Infinity });
//   const record = useRecordContext();
//   if (!record) return null;
//   const hasTopicStrings = record["pair:hasTopic"];

//   let routeTree = [];
//   for (const item in data) {
//     if (data[item]["peps:broader"] === undefined ) {
//       routeTree.push(data[item]);
//     }
//   }

//   let hasTopic = [];
//   if (Array.isArray(hasTopicStrings)) {
//     hasTopicStrings.forEach(topicString => { 
//       const topicStringArray = Object.entries(data).filter(([key, value]) => key === topicString);
//       if (Array.isArray(topicStringArray) && Array.isArray(topicStringArray[0])) {
//         hasTopic.push(topicStringArray[0][1]);
//       }
//     });
//   }
  
//   return (
//     <Grid item xs={12} sm={12} md={6} >
//       {
//         routeTree.map( route => 
//           <Box className={classes.whiteBox}>
//             <Typography className={classes.boxTitle}>{route["pair:label"] }</Typography>
//             <Theme childThemes={hasTopic} parent={route.id}/>
//           </Box>
//         )
//       }
//     </Grid>
//   )
// }

const Concept = ({selectedConcepts}) => {
  if (selectedConcepts.length === 0)
    return (<div><span style={{color: "#ABA093", paddingLeft: "5px"}}>Non Renseigné</span></div>)
  return (
    selectedConcepts.map(concept => 
      <div style={{display: "flex", alignItems: "center", paddingLeft:"5px"}}>
        {<Icon name={concept["pair:icon"]} style={{color: concept["pair:color"], fontSize: "35px"}}/>} 
        <span style={{color: concept["pair:color"], fontSize: "20px", paddingLeft:"5px"}}>{concept["pair:label"]}</span>
      </div>
    )
  )
}

const SideConceptOrga = ({source, concept, title}) => {
  const classes = useStyles();
  const { data } = useGetList(concept, { page: 1, perPage: Infinity });
  const record = useRecordContext();
  if (!record) return null;

  let selectedConcepts = [];
  if (record[source] !== undefined && Array.isArray(record[source])) {
    for (const item in data) {
      record[source].map(e => {
        if (item === e) {
          selectedConcepts.push(data[item]);
        }
      })
    }
  }
  
  return (
    <Box className={classes.whiteBox}>
      <Typography className={classes.boxTitle}>{title}</Typography>
      {/* <Theme childThemes={hasTopic} parent={route.id}/> */}
      <Concept selectedConcepts={selectedConcepts} />
    </Box>
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

const PrintTitle = () => {
  const classes = useStyles();
  const record = useRecordContext();
  if (!record) return null;

 return (
  <div className={classes.printTitle} >{record["pair:label"]}</div>
 )
}

const OrganizationShow = React.forwardRef((props) => {
  const classes = useStyles();
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);
  const promiseResolveRef = useRef(null);

useEffect(() => {
  if (isPrinting && promiseResolveRef.current) {
    promiseResolveRef.current();
  }
}, [isPrinting]);

const printing = useReactToPrint({
  content: () => printRef.current,
  onBeforeGetContent: () => {
    return new Promise((resolve) => {
      promiseResolveRef.current = resolve;
    });
  },
  onAfterPrint: () => {
    promiseResolveRef.current = null;
    setIsPrinting(false);
  }
});

const handlePrint = () => {
  setIsPrinting(true);
  printing()
}

  return (
      <Show title={<OrganizationTitle />} {...props}>
        <Grid container spacing={5} ref={printRef} >
          {isPrinting ? <Grid item xs={12} sm={12} md={12}><PrintTitle/></Grid> : null}
          <Grid item xs={12} sm={12} md={6} style={{padding: "0px", paddingLeft: "1%"}} >
            <SideConceptOrga source="peps:hasSector" concept="Sector" title="Secteur Géographique" />
            <SideConceptOrga source="peps:hasProfile" concept="Profile" title="Profil Prioritaire" />
            <SideConceptOrga source="peps:hasLifeStage" concept="Lifestage" title="Etape de la vie" />
            <SideConceptOrga source="peps:hasNeed" concept="Need" title="Besoin" />
            <SideConceptOrga source="peps:hasAccessibility" concept="Accessibility" title="Accessibilité" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding: "0px 30px 0px 0px"}} >
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
              {isPrinting ? null : <button onClick={handlePrint} className={classes.printButton} >IMPRIMER</button>}
            </Box>
          </Grid>
        </Grid>
      </Show>
  );
});

export default OrganizationShow;
