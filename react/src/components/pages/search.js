import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { CharacterImage } from "../lib/api";
import { useParams, useHistory } from "react-router-dom";
import { fetchSearch } from "../lib/actions";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  wrapper: {},
  card: {
    marginTop: 60,
    marginLeft: 80,
    marginRight: 30,
    marginBottom: 10,
    width: 280,
    textAlign: "center",
    float: "left",
    display: "inline-block",
    cursor: "pointer",
  },
  image: {
    display: "inline-block",
    marginLeft: -73,
    marginTop: -90,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pageNationWrapper: {
    margin: 20,
  },
  characterName: {
    fontSize: 20,
  },
  loader: {
    width: "100%",
    height: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Search = () => {
  const search = useSelector(state => state.search);
  const { data, page, pageSize, isFetching } = search;
  const dispatch = useDispatch();
  const { server, name } = useParams();
  const css = useStyles();
  const history = useHistory();

  const pageNationChange = (event, value) => {
    dispatch({
      type: "search",
      payload: {
        name: "page",
        value: value,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchSearch(server, name));
  }, []);

  const handleClick = c => {
    history.push(`/df/info/${c.serverId}/${c.characterId}`);
  };

  return (
    <div className={css.wrapper}>
      {isFetching ? (
        <div className={css.loader}>
          <Loader type="ThreeDots" color="#00ccff" height="100" width="100" />
        </div>
      ) : (
        data
          .map(c => {
            return (
              <Card
                onClick={() => handleClick(c)}
                className={css.card}
                variant="outlined"
                key={c.characterId}
              >
                <CardContent className={css.image}>
                  {CharacterImage(c.serverId, c.characterId)}
                </CardContent>
                <CardContent className={css.characterName}>
                  {c.characterName}
                </CardContent>
                <CardContent>{c.jobGrowName}</CardContent>
              </Card>
            );
          })
          .slice((page - 1) * pageSize, page * pageSize) || null
      )}
      <div className={css.pageNationWrapper}>
        <Grid container justify="center">
          <Pagination
            count={Math.ceil(data.length / pageSize)}
            page={page}
            onChange={pageNationChange}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            size="large"
          />
        </Grid>
      </div>
    </div>
  );
};

export default Search;
