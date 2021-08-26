import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import COnfetti from "./Confetti.jsx";
import "./Score.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledButton = withStyles({
  root: {
    borderRadius: 15,
    fontWeight: 600,
    transition: "transform 0.6s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  label: {
    textTransform: "capitalize",
    fontFamily: `'Nunito', sans-serif`,
    fontSize: 17,
    "&:hover": {
      color: "black",
    },
  },
})(Button);

export default function Score(props) {
  const history = useHistory();
  const location = useLocation();

  const [nan, setnan] = useState(false);
  const category = parseInt(sessionStorage.getItem("category"));
  useEffect(() => {
    if (isNaN(category)) {
      setnan(true);
    }
  }, []);
  const classes = useStyles();

  const goBack = () => {
    history.goBack();
  };
  if (!location.state) {
    return <Redirect to="/" />;
  }
  return (
    <div className="parent">
      <COnfetti />
      <p className="score">
        {`You Scored ${sessionStorage.getItem(
          "correct"
        )}/${sessionStorage.getItem("amount")}`}
      </p>
      <div className={classes.root}>
        <StyledButton variant="contained" color="secondary" onClick={goBack}>
          answer questions from same category
        </StyledButton>
        <StyledButton href="/" variant="contained" color="secondary">
          choose different category
        </StyledButton>
      </div>
    </div>
  );
}
