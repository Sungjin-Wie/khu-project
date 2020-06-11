import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuction } from "../lib/actions";
import { Input, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "reactstrap";

const useStyles = makeStyles({
  wrapper: { textAlign: "center" },
  searchBar: { display: "inline-block" },
  container: {
    display: "flex",
    margin: 10,
  },
  formControl: {
    width: 80,
  },
  selectEmpty: {},
  searchbutton: {
    marginLeft: 10,
  },
  result: {
    marginTop: 20,
  },
});

const Auction = () => {
  const css = useStyles();
  const auction = useSelector(state => state.auction);
  const dispatch = useDispatch();
  const { data, value, searchFlag, isEmpty, isFetching } = auction;
  const handleEnterKey = target => {
    if (target.charCode === 13) {
      dispatch({ type: "searchFlag" });
    }
  };

  useEffect(() => {
    if (searchFlag) {
      dispatch(fetchAuction(value));
    }
  }, [searchFlag]);

  return (
    <div className={css.wrapper}>
      <div className={css.searchBar}>
        <Input
          value={value}
          onKeyPress={e => handleEnterKey(e)}
          onChange={e =>
            dispatch({
              type: "auctionInput",
              payload: { name: "value", value: e.target.value },
            })
          }
        ></Input>
        <Button
          variant="contained"
          color="primary"
          onClick={e => dispatch({ type: "searchFlag" })}
          className={css.searchbutton}
        >
          검색하기
        </Button>
      </div>
      {isFetching ? (
        <div className={css.loader}>
          <Loader type="ThreeDots" color="#00ccff" height="100" width="100" />
        </div>
      ) : isEmpty ? (
        <div className={css.result}>검색 결과가 없습니다.</div>
      ) : (
        <div className={css.result}>
          <Table>
            <thead>
              <tr>
                <th>이름 </th>
                <th> </th>
                <th>갯수 </th>
                <th>가격 </th>
                <th>개당 가격</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(c => {
                  return (
                    <tr>
                      <th scope="row">{c.itemName} </th>
                      <td>
                        <img
                          src={`https://img-api.neople.co.kr/df/items/${c.itemId}`}
                          alt="X"
                        />
                      </td>
                      <td>{c.count} </td>
                      <td>{c.currentPrice} </td>
                      <td>{c.unitPrice} </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Auction;
