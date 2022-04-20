import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";

// This component is just a div that sits undereath the navbar in user board section.
// It's used to contain a button which in turn caters for the side bar drawer.

const useStyles = makeStyles(()=> ({
    AppBar: {
        background: 'linear-gradient(45deg, #0DCAF0 30%, #0DCAF0 90%)',
    },
    title: {
        flexGrow: 1,
    },
    btn: {
        background: 'linear-gradient(to right, white, white)',
    }
}));

// SetOpenSideMenu state passed from Navigation.js.
export default function TopBar({ setOpenSideMenu }) {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.AppBar} elevation={0}>
                <Toolbar>
                    <h1 className={classes.title}> </h1>
                    <Button className={classes.btn} onClick={()=>setOpenSideMenu(true)}>
                        Change Background
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}