import React from "react";
// Styling
import { makeStyles } from '@material-ui/styles'
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight:'100vh',
        backgroundImage:`url(${process.env.PUBLIC_URL + "/assets/office.jpg"})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        marginTop: '-2%',
    },
    colorText: {
        color: '#5AFF3D',
    },
    messageText1: {
        fontFamily:'Nunito',
        marginLeft: '40%',
        paddingTop:'5%',
    },
    messageText2: {
        fontFamily:'Nunito',
        marginLeft: '50%'
    }
}));

// Landing page conents.
export default function () {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <CssBaseline />
            <div>
                <h1 className={classes.messageText1}>Welcome to Kan<span className={classes.colorText}>Schan</span>.</h1>
                <h3 className={classes.messageText2}>The interactive KanBan web appliation.</h3>
            </div>
        </div>
    );
} 