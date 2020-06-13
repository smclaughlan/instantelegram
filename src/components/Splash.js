import React from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RegisterForm from "./RegisterForm";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    marginTop: 100,
    justifySelf: "right",
  },
  bottom: {
    width: "100%",
    marginTop: 100,
    marginBottom: 0,
  },
  img: {
    marginLeft: 400,
    marginRight: 100,
    marginTop: 100,
    display: "block",
    width: 500,
    height: 500,
  },
  image: {
    justifyContent: "space-around",
    margin: "0 auto",
    maxWidth: 1000,
  },
});

export default function Splash() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <div className={classes.image}>
            <container>
              <img
                className={classes.img}
                src={"images/splash2.jpg"}
                style={{
                  margin: "20 auto",
                  borderRadius: "5px",
                  maxWidth: "950px",
                }}
              />
            </container>
          </div>
          {/* <Paper className={classes.topLogo}>
            <Container>
              <img
                alt={"Instantelegram logo"}
                src={"images/splash2.jpg"}
                style={{
                  margin: "20 auto",
                  borderRadius: "5px",
                  maxWidth: "950px",
                }}
              ></img>
            </Container>
          </Paper> */}
        </Grid>
        <Grid item xs={12} sm container className={classes.form}>
          <RegisterForm />
        </Grid>
      </Grid>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottom}
      >
        <BottomNavigationAction
          label="About"
          href="https://github.com/smclaughlan/instantelegram"
          target="_blank"
        />

        <BottomNavigationAction
          label="Sean McLaughlan"
          href="https://github.com/smclaughlan"
          target="_blank"
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Riki Kaneshiro"
          href="https://github.com/arkaneshiro"
          target="_blank"
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Monia Techini"
          href="https://github.com/moniatec"
          target="_blank"
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Seamus Le"
          href="https://github.com/lullofthesea"
          target="_blank"
        ></BottomNavigationAction>
      </BottomNavigation>
    </>
  );
}
