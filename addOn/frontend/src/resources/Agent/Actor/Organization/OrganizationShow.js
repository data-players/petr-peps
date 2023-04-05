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
import { format } from 'date-fns'

const GroupedFontSize = (fontcounter) => {
  const GrfontSize = 18 + fontcounter;
  return GrfontSize.toString()+"px"
}

const useStyles = makeStyles(theme => ({
  whiteBox: {
    border: "5px solid " + theme.palette.primary.main,
    paddingLeft: "20px",
    paddingBlock: "20px",
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: GroupedFontSize(-2),
    margin: "0px 40px 20px 40px",
    overflow: "hidden",
  },
  contentRightBox: {
    paddingTop: "40px"
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: GroupedFontSize(-2),
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
    fontSize: GroupedFontSize(3),
  },
  contactTitle:{
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: GroupedFontSize(-2),
  },
  contactContent: {
    fontSize: GroupedFontSize(-2),
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
    fontSize: GroupedFontSize(-7),
  },
  markdownText: {
    color: theme.palette.primary.main, 
    fontSize: GroupedFontSize(-2)
  },
  printTitle: {
    color: theme.palette.secondary.main, 
    fontSize: GroupedFontSize(8),
    fontWeight: "bold",
    paddingTop: "10px",
    paddingLeft: "80px"
  },
  sideGrid: {
    padding: "0px"
  },
  updateAt: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: GroupedFontSize(-1),
  },
})); 

const Icon = ({ name, ...rest }) => {
  const IconComponent = Muicon[name];
  return IconComponent ? <IconComponent {...rest} /> : null;
};

const Concept = ({selectedConcepts}) => {
  if (selectedConcepts.length === 0)
    return (<div><span style={{color: "#ABA093", paddingLeft: "2px"}}>Non Renseigné</span></div>)
  return (
    selectedConcepts.map(concept => 
      <div style={{display: "flex", alignItems: "center", paddingLeft:"5px"}}>
        {<Icon name={concept["pair:icon"]} style={{color: concept["pair:color"], fontSize: GroupedFontSize(13)}}/>} 
        <span style={{color: concept["pair:color"], fontSize: GroupedFontSize(-2), paddingLeft:"5px"}}>{concept["pair:label"]}</span>
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

const UpdateComp = ({title}) => {
  const classes = useStyles();
  const record = useRecordContext();
  if (!record || !record["dc:modified"]) {
    return (
      <Box style={{marginBottom: "20px"}}>
        <div className={classes.updateAt}>{title+" : Donnée non disponible"}</div>
      </Box>
    );
  }
  const updatedAt = format(new Date(record["dc:modified"]["@value"]), "dd/MM/yyyy");
  return (
    <Box style={{marginBottom: "20px"}}>
        <div className={classes.updateAt}>{title+" : "+updatedAt}</div>
      </Box>
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
        <Grid container spacing={5} ref={printRef} style={{backgroundColor: "white"}} >
          {isPrinting && <Grid item xs={12} sm={12} md={12} style={{paddingTop: "40px"}} ><PrintTitle /></Grid> }
          <Grid item xs={12} sm={12} md={5} style={isPrinting ? {padding: "10px 0px 0px 8%"} : {padding: "40px 0px 0px 2%"}} >
            <SideConceptOrga source="peps:hasSector" concept="Sector" title="Sécteur Géographique" />
            <SideConceptOrga source="peps:hasProfile" concept="Profile" title="Profil Prioritaire" />
            <SideConceptOrga source="peps:hasLifeStage" concept="Lifestage" title="Étape de la vie" />
            <SideConceptOrga source="peps:hasNeed" concept="Need" title="Besoin" />
            <SideConceptOrga source="peps:hasMobility" concept="Mobility" title="Mobilité" />
            <SideConceptOrga source="peps:hasAccessibility" concept="Accessibility" title="Accessibilité" />
          </Grid>
          <Grid item xs={12} sm={12} md={7} style={{padding: "0px 7% 0px 0px"}} >
            <Box className={classes.contentRightBox}>
              <TextFieldWithTitle title="TYPE DE STRUCTURE" source='peps:type'/>
              <TextFieldWithTitle title="COORDONNÉES" source='pair:hasLocation.pair:label' check="true"/>
              <Box style={{marginBottom: "20px"}}>
                <TextField source="pair:comment" className={classes.contactContent} />
              </Box>
              <MarkdownFieldWithTitle source="pair:description" title="INFORMATIONS" />
              <TextFieldWithTitle source='peps:skills' title="COMPÉTENCES" />
              <TextFieldWithTitle source='peps:openHour' title="OUVERTURE" />
              <TextFieldWithTitle source='peps:accommodationCapacity' title="CAPACITE D'ACCUEIL" />
              <TextFieldWithTitle source="peps:concernedPublic" title="PUBLIC CONCERNÉ" />
              <TextFieldWithTitle source='peps:dataSource' title="SOURCE DE DONNÉES" />
              <UpdateComp title="Dernière modification" />
              {isPrinting ? null : <button onClick={handlePrint} className={classes.printButton} >IMPRIMER</button>}
            </Box>
          </Grid>
        </Grid>
      </Show>
  );
});

export default OrganizationShow;
