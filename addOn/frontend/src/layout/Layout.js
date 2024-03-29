import React, { useMemo } from 'react';
import { Layout as RaLayout } from 'react-admin';
import { makeStyles } from '@mui/styles';
import AppBar from './AppBar';
import TreeMenu from './TreeMenu/TreeMenu';

const isIframe = window !== window.top;

const useStyles = makeStyles(theme => ({
  appFrame: {
    marginTop: isIframe ? 0 : 56,
    [theme.breakpoints.up('sm')]: {
      '& #main-content': {
        paddingTop: 8,
        paddingLeft: 5,
      }
    },
  }
}));

const Layout = ({ appBar, menu, userMenu, children, labelNbLines, ...otherProps }) => {
  const classes = useStyles();

  const LayoutTreeMenu = useMemo(() => props => <TreeMenu {...props} labelNbLines={labelNbLines} />, [labelNbLines]);
  return (
    <RaLayout
      {...otherProps}
      classes={{ appFrame: classes.appFrame } }
      appBar={appBar}
      menu={menu ? menu : LayoutTreeMenu} 
    >
      {children}
    </RaLayout>
  );
};

Layout.defaultProps = {
  appBar: AppBar
};

export default Layout;
