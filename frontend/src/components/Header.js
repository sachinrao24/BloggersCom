import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {AppBar, Toolbar, Typography, Tab, Tabs, Button, Box} from '@mui/material';
import { authActions } from '../store';
import { useStyles } from './utils';

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
    const [value, setValue] = useState();
  return (
    <AppBar position="sticky" sx={{
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,101,1) 100%, rgba(0,212,255,1) 100%)"
        }}>
        <Toolbar>
            <Typography className={classes.font} variant="h4">BloggersCom</Typography>
            {isLoggedIn &&
            <Box marginLeft={'auto'} marginRight={'auto'}>
                <Tabs textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
                    <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="My blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Post blog"/>
                </Tabs>
            </Box>}
            <Box display='flex' marginLeft='auto'>
                {!isLoggedIn &&
                <>
                <Button
                LinkComponent={Link} to="/auth" 
                variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Login
                </Button>
                <Button
                LinkComponent={Link} to="/auth" 
                variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Sign up
                </Button>
                </>}
               {isLoggedIn &&
                <Button
                onClick={()=>dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Logout
                </Button>
                }
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header