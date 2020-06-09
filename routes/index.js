var express = require("express");
var router = express.Router();
var cors = require("cors");
const fetch = require("node-fetch");
const Bluebird = require("bluebird");
fetch.Promise = Bluebird;

const apiKey = "7KyujUEOMpBOTIELdNlMypTX0d0D6wdb";
const _url = "https://api.neople.co.kr/";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/search", cors(), (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let url = _url;
  let name = encodeURIComponent(req.query.name);
  url += `df/servers/${req.query.server}/characters?characterName=${name}&wordType=full&limit=200&apikey=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(body => res.send(body));
});

router.get("/info", cors(), (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let serverId = encodeURIComponent(req.query.server);
  let characterId = encodeURIComponent(req.query.id);
  let stat =
    _url +
    `df/servers/${serverId}/characters/${characterId}/status?apikey=${apiKey}`;
  let equip =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/equipment?apikey=${apiKey}`;
  let avatar =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/avatar?apikey=${apiKey}`;
  let creature =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/creature?apikey=${apiKey}`;
  let flag =
    _url +
    `df/servers/${serverId}/characters/${characterId}/equip/flag?apikey=${apiKey}`;
  let urls = [stat, equip, avatar, creature, flag];
  var promises = urls.map(url => fetch(url).then(response => response.json()));
  Promise.all(promises)
    .then(response =>
      Object.assign(
        {},
        response[0],
        response[1],
        response[2],
        response[3],
        response[4]
      )
    )
    .then(data => res.send(data));
});

router.get("/auction", cors(), (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let url = _url;
  let name = encodeURIComponent(req.query.name);
  console.log(name);
  url += `df/auction?itemName=${name}&sort=unitPrice:asc&limit=20&wordType=full&apikey=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(body => res.send(body));
});

module.exports = router;
