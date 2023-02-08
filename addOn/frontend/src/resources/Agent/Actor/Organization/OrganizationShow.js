import React, { useRef } from 'react';
import { TextField, UrlField, useGetList, useRecordContext } from 'react-admin';
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
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: "40px",
    overflow: "hidden"
  },
  contentBox: {
    color: theme.palette.primary.main,
    marginBottom: '30px',
    fontSize: '20px',
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
    marginTop: "40px",
  },
  contactTitle:{
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "40px",
  },
  contactContent: {
    fontSize: "20px", 
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
}));

const Icon = ({ name, ...rest }) => {
  const IconComponent = Muicon[name];
  return IconComponent ? <IconComponent {...rest} /> : null;
};

const Theme = ({childThemes, parent}) => {
  let selectedTheme = []
  if (!childThemes) return null;
  childThemes.forEach(theme => {
    if (theme["pair:broader"] && theme["pair:broader"].includes(parent)) {
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

  let hasTopic = [];
  if (Array.isArray(hasTopicStrings)) {
    hasTopicStrings.forEach(topicString => { 
      const topicStringArray = Object.entries(data).filter(([key, value]) => key === topicString);
      if (Array.isArray(topicStringArray)) {
        hasTopic.push(topicStringArray[0][1]);
      }
    });
  }
  
  return (
    <Grid item xs={12} sm={12} md={6} >
      <Box className={classes.whiteBox}>
        <Typography className={classes.boxTitle}>BESOIN</Typography>
        <Theme childThemes={hasTopic} parent="besoin"/>
      </Box>
      <Box className={classes.whiteBox}>
        <Typography className={classes.boxTitle}>ACCESSIBILITE</Typography>
        <Theme childThemes={hasTopic} parent="accessibilite"/>
      </Box>
      <Box className={classes.whiteBox}>
        <Typography className={classes.boxTitle}>PROFIL PRIORITAIRE</Typography>
        <Theme childThemes={hasTopic} parent="profil-prioritaire"/>
      </Box>
      <Box className={classes.whiteBox}>
        <Typography className={classes.boxTitle}>SECTEUR GEOGRAPHIQUE</Typography>
        <Theme childThemes={hasTopic} parent="territoire"/>
      </Box>
      <Box className={classes.whiteBox}>
        <Typography className={classes.boxTitle}>ETAPE DE VIE</Typography>
        <Theme childThemes={hasTopic} parent="etape-de-la-vie"/>
      </Box>
    </Grid>
  )
}

const OrganizationShow = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, 
  });

  return (
    <div ref={componentRef} >
      <Show title={<OrganizationTitle />} {...props}>
        <Grid container spacing={5} >
          <SideThemeOrga />
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.rightTitle}>STRUCTURE MERE</div>
            <TextField className={classes.contentBox} source="pair:comment" />
            <Box className={classes.contentBox}>
              <div className={classes.rightTitle}>INFORMATIONS</div>
              <MainList >
                <MarkdownField addLabel={false} source="pair:description" />
              </MainList>
              <div className={classes.contactTitle}>OUVERTURE</div>
              <TextField source='pair:openingHour'className={classes.contactContent}/>
              <div className={classes.contactTitle}>SITE INTERNET</div>
              <UrlField source="pair:homePage" className={classes.contactContent}/>
              <div className={classes.contactTitle}>ADDRESSE</div>
              <TextField source='pair:hasLocation.pair:label'className={classes.contactContent}/>
            </Box>
            <Box>
              <button onClick={handlePrint} className={classes.printButton}>IMPRIMER</button>
            </Box>
          </Grid>
        </Grid>
      </Show>
    </div>
  );
});

export default OrganizationShow;
