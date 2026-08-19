import React from 'react';
import {Toolbar, SaveButton} from 'react-admin';
import { makeStyles } from '@mui/styles';
import { DeleteButtonWithPermissions } from "@semapps/auth-provider";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});



const ToolBarCustom = ({deleteable,...props}) => {
    return(
    <Toolbar {...props} classes={useStyles()} >
        <SaveButton />
        {deleteable &&
          <DeleteButtonWithPermissions />
        }

    </Toolbar>
)};

export default ToolBarCustom;
