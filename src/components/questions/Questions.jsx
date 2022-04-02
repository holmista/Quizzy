import { useEffect } from "react";
import Question from "../question/Question";
import axios from "axios";
import _ from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import {
  useRouteMatch as useMatch,
  useHistory,
  Link,
  useLocation,
} from "react-router-dom";
import { useReducer } from "react";
import { reducer } from "../../utils/reducer";
import Loading from "../loading/loading";
import("./Questions.css");

const initialState = {
  loading: true,
  data: null,
  error: null,
  na: false,
};

const StyledButton = withStyles({
  root: {
    width: 135,
  },
  label: {
    textTransform: "capitalize",
    fontFamily: `'Nunito', sans-serif`,
    fontSize: 17,
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Questions() {
  const { pathname } = useLocation();
  const match = useMatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  sessionStorage.setItem("correct", 0);
  const category = match.params.category;
  const difficulty = match.params.difficulty;

  useEffect(() => fetchData(), []);

  const fetchData = async () => {
    let res = await axios.get(
      `https://opentdb.com/api_count.php?category=${category}`
    );
    let diffAmount = `total_${difficulty}_question_count`;
    let questionAmount = res.data.category_question_count[diffAmount];
    let Res = await axios.get(
      `https://opentdb.com/api.php?amount=${questionAmount}&category=${category}&difficulty=${difficulty}`
    );
    let multipleQAData = Res.data.results.filter(
      ({ type }) => type === "multiple"
    );
    let QuestionsToFetch = multipleQAData.length;
    if (QuestionsToFetch > 10) {
      QuestionsToFetch = 10;
    }

    if (sessionStorage.getItem("token")) {
      dispatch({ type: "fetchDataStart" });
      let token = sessionStorage.getItem("token");
      let url = `https://opentdb.com/api.php?amount=${QuestionsToFetch}&category=${category}&type=multiple&difficulty=${difficulty}&encode=url3986&token=${token}`;
      const res = await axios.get(url);
      if (res.data.response_code === 4) {
        let url = `https://opentdb.com/api.php?amount=${QuestionsToFetch}&category=${category}&type=multiple&difficulty=${difficulty}&encode=url3986`;
        let token = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        sessionStorage.setItem("token", token.data.token);
        const res = await axios.get(url);
        const data = res.data.results;
        let multipleQuestionsData = data.filter(
          ({ type }) => type == "multiple"
        );
        let amount = multipleQuestionsData.length;
        sessionStorage.setItem("amount", amount);
        dispatch({
          type: "fetchDataSuccess",
          data: multipleQuestionsData,
        });
        return;
      }
      const data = res.data.results;
      let multipleQuestionsData = data.filter(({ type }) => type == "multiple");
      let amount = multipleQuestionsData.length;
      sessionStorage.setItem("amount", amount);
      dispatch({
        type: "fetchDataSuccess",
        data: multipleQuestionsData,
      });
    } else {
      dispatch({ type: "fetchDataStart" });

      let url = `https://opentdb.com/api.php?amount=${QuestionsToFetch}&category=${category}&type=multiple&difficulty=${difficulty}&encode=url3986`;
      let token = await axios.get(
        "https://opentdb.com/api_token.php?command=request"
      );
      sessionStorage.setItem("token", token.data.token);
      const res = await axios.get(url);
      const data = res.data.results;
      let multipleQuestionsData = data.filter(({ type }) => type == "multiple");
      let amount = multipleQuestionsData.length;
      sessionStorage.setItem("amount", amount);
      dispatch({
        type: "fetchDataSuccess",
        data: multipleQuestionsData,
      });
    }
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="parent1">
      {state.data.map(({ question, correct_answer, incorrect_answers }) => {
        let Dquestion = decodeURIComponent(question);
        let Dcorrect_answer = decodeURIComponent(correct_answer);
        let answers = [{ answer: Dcorrect_answer, correct: 4 }];
        for (let i of incorrect_answers) {
          answers.push({
            answer: decodeURIComponent(i),
            correct: incorrect_answers.indexOf(i),
          });
        }
        let shuffled_answers = _.shuffle(answers);
        return (
          <Question
            key={question}
            body={Dquestion}
            answers={shuffled_answers}
          />
        );
      })}
      <section className="section">
        <div className={classes.root}>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/score",
              state: { from: pathname }, // or any property you like to add
            }}
          >
            <StyledButton
              variant="contained"
              color="secondary"
              className="marginBottom"
            >
              Reveal Score
            </StyledButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
