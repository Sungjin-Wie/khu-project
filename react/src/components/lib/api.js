import React from "react";
import axios from "axios";
export const key = "http://khu-project.herokuapp.com/";

export let api;

if (process.env.NODE_ENV === "production") {
  api = axios.create({ baseURL: key });
} else {
  api = axios.create({ baseURL: "http://localhost:3000/" });
}

export const searchUrl = (server, name) => {
  return `search?server=${server}&name=${name}`;
};

export const infoUrl = (server, id) => {
  return `info?server=${server}&id=${id}`;
};

export const auctionUrl = name => {
  return `auction?name=${name}`;
};

export const CharacterImage = (server, character) => (
  <img
    src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${character}?zoom=2`}
    alt=""
  />
);

export const serverList = [
  { eng: "all", kor: "전체" },
  { eng: "cain", kor: "카인" },
  { eng: "diregie", kor: "디레지에" },
  { eng: "siroco", kor: "시로코" },
  { eng: "prey", kor: "프레이" },
  { eng: "casillas", kor: "카시야스" },
  { eng: "hilder", kor: "힐더" },
  { eng: "anton", kor: "안톤" },
  { eng: "bakal", kor: "바칼" },
];

export default key;
