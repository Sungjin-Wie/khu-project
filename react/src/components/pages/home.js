import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { serverList } from "../lib/api";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    margin: 10,
  },
  formControl: {
    width: 80,
  },
  selectEmpty: {},
  search: {
    margin: 10,
  },
}));

const Home = () => {
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();
  const { server, name } = home;
  const css = useStyles();
  const history = useHistory();

  const handleInput = newValue => {
    if (newValue.charAt(newValue.length - 1) === " ") {
      return;
    } else {
      dispatch({
        type: "name",
        payload: newValue,
      });
    }
  };

  const handleClick = e => {
    if (name !== "") {
      history.push(`/searchresult/${server}/${name}`);
    }
  };

  const handleEnterKey = target => {
    if (target.charCode === 13 && name !== "") {
      history.push(`/searchresult/${server}/${name}`);
    }
  };

  return (
    <div className={css.container}>
      <FormControl className={css.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          서버
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={server}
          onChange={e => {
            dispatch({
              type: "server",
              payload: e.target.value,
            });
          }}
          displayEmpty
          className={css.selectEmpty}
        >
          {serverList.map(server => {
            const { eng, kor } = server;
            return (
              <MenuItem value={eng} key={eng}>
                {kor}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Input
        className={css.search}
        value={name}
        onKeyPress={e => handleEnterKey(e)}
        onChange={e => handleInput(e.target.value)}
      />
      <Button
        className={css.search}
        variant="contained"
        color="primary"
        onClick={e => handleClick(e)}
      >
        검색하기
      </Button>
    </div>
  );
};

export default Home;
