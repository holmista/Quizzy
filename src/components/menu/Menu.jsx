import React, { useRef } from "react";
import { useHistory } from "react-router";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./menu.css";
import Home from "../bubble/bubble";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  underline: {
    "&:after": {
      borderColor: "#f12632",
    },
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    fontWeight: 100,
    "&:hover": {
      backgroundColor: "#f12632",
    },
  },
}))(MenuItem);

export default function Menu() {
  const history = useHistory();
  console.log(history);
  React.useEffect(() => fetchCategories(), []);
  const fetchCategories = async () => {
    const data = await axios.get("https://opentdb.com/api_category.php");
    const categoriesData = data.data.trivia_categories;
    setCategoriesData(categoriesData);
  };
  const classes = useStyles();
  const [categoriesData, setCategoriesData] = React.useState([]);
  const [Difficulty, setDifficulty] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (Difficulty !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    if (category !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleCategoryClose = () => {
    setOpenCategories(false);
  };

  const handleCategoryOpen = () => {
    setOpenCategories(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="parent">
      <div className="dropdowns">
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              {category ? "" : "category"}
            </InputLabel>
            <Select
              className={classes.underline}
              id="categories"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openCategories}
              onClose={handleCategoryClose}
              onOpen={handleCategoryOpen}
              value={category}
              onChange={handleCategoryChange}
            >
              {categoriesData.map(({ name, id }) => (
                <StyledMenuItem
                  className={classes.MenuItem}
                  key={id}
                  value={`${id}`}
                >
                  {name}
                </StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              {Difficulty ? "" : "difficulty"}
            </InputLabel>
            <Select
              className={classes.underline}
              id="difficulty"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={Difficulty}
              onChange={handleChange}
            >
              <StyledMenuItem value="easy">Easy</StyledMenuItem>
              <StyledMenuItem value="medium">Medium</StyledMenuItem>
              <StyledMenuItem value="hard">Hard</StyledMenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="bubble">
        <Home />
        {/* <button className="bubblebutton">start quiz</button> */}
        <button
          disabled={buttonDisabled}
          className="bubblebutton"
          onClick={() => history.push(`${category}/${Difficulty}`)}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
