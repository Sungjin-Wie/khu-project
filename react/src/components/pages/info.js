import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchInfo } from "../lib/actions";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
} from "reactstrap";
import classnames from "classnames";

const API_KEY = "7KyujUEOMpBOTIELdNlMypTX0d0D6wdb";

const useStyles = makeStyles({
  loader: {
    width: "100%",
    height: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Info = () => {
  const info = useSelector(state => state.info);
  const [tab, setTab] = useState("1");
  const toggle = num => {
    setTab(num);
  };
  const { data, isFetching } = info;
  const dispatch = useDispatch();
  const { server, id } = useParams();
  const css = useStyles();

  useEffect(() => {
    if (data.characterId !== id) {
      dispatch(fetchInfo(server, id));
    }
  }, []);

  return (
    <div style={{ margin: "auto" }}>
      {isFetching ? (
        <div className={css.loader}>
          <Loader type="ThreeDots" color="#00ccff" height="100" width="100" />
        </div>
      ) : (
        <div>
          <br />
          <Row>
            <Col sm="4">
              <Card style={{ width: "100%" }}>
                <CardHeader>{data.characterName}</CardHeader>
                <CardBody>
                  <CardImg
                    top
                    style={{ width: "100%", height: "100%" }}
                    src={`https://img-api.neople.co.kr/df/servers/cain/characters/${id}?zoom=3&${API_KEY}`}
                    alt="not loaded!"
                  />
                  <CardTitle>Level : {data.level}</CardTitle>
                  <CardText>
                    직업 :
                    {data.jobGrowName === "자각2"
                      ? `${data.jobName}(${data.jobGrowName})`
                      : data.jobGrowName}
                  </CardText>
                  <Button color="info">
                    <Link to="/df" className="text-white">
                      돌아가기
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col sm="8">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: tab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    스탯
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: tab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    장비
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: tab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    아바타
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={tab}>
                <TabPane tabId="1">
                  <Table>
                    <thead>
                      <tr>
                        <th>스탯</th>
                        <th>수치</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.status &&
                        data.status.map(c => {
                          return (
                            <tr key={c.name}>
                              <th scope="row">{c.name}</th>
                              <td>{c.value}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="2">
                  <Table>
                    <thead>
                      <tr>
                        <th>종류</th>
                        <th> </th>
                        <th>이름</th>
                        <th>마법부여</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.equipment &&
                        data.equipment.map(c => {
                          return (
                            <tr>
                              <th scope="row">
                                {c.itemType === "무기"
                                  ? "무기"
                                  : `${
                                      c.itemTypeDetail.indexOf("천") !== -1 ||
                                      c.itemTypeDetail.indexOf("가죽") !== -1 ||
                                      c.itemTypeDetail.indexOf("경갑") !== -1 ||
                                      c.itemTypeDetail.indexOf("중갑") !== -1 ||
                                      c.itemTypeDetail.indexOf("판금") !== -1
                                        ? c.itemTypeDetail.indexOf("천") !== -1
                                          ? c.itemTypeDetail.substring(2)
                                          : c.itemTypeDetail.substring(3)
                                        : c.itemTypeDetail
                                    }`}
                              </th>
                              <td>
                                <img
                                  alt="not loaded!"
                                  src={`https://img-api.neople.co.kr/df/items/${c.itemId}?${API_KEY}`}
                                />
                              </td>
                              <td>
                                {c.reinforce === 0 ? " " : `+${c.reinforce} `}
                                {c.itemName}
                                {c.amplificationName != null
                                  ? ` (${c.amplificationName})`
                                  : ""}
                                {`${
                                  c.itemType === "무기"
                                    ? c.refine === 0
                                      ? " "
                                      : ` (+${c.refine}재련)`
                                    : " "
                                }`}
                              </td>
                              <td>
                                {c.enchant.status &&
                                  c.enchant.status.map(d => {
                                    if (d == null) return;
                                    else
                                      return (
                                        <p key={d.name}>
                                          {d.name}+{d.value}
                                        </p>
                                      );
                                  })}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="3">
                  <Table>
                    <thead>
                      <tr>
                        <th>종류</th>
                        <th> </th>
                        <th>이름</th>
                        <th>엠블렘</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.avatar &&
                        data.avatar.map(c => {
                          return (
                            <tr>
                              <th scope="row">
                                {c.slotName.substring(
                                  0,
                                  c.slotName.indexOf(" ")
                                )}
                              </th>
                              <td>
                                <img
                                  alt="not loaded!"
                                  src={`https://img-api.neople.co.kr/df/items/${c.itemId}?${API_KEY}`}
                                />
                              </td>
                              <td>{c.itemName}</td>
                              <td>
                                {c.emblems.map(d => {
                                  return <p>{d.itemName}</p>;
                                })}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Info;
