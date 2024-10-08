const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

const port = 4008;

const axios = require("axios");

const WALLET_ADDRESS = "0x40b38765696e3d5d8d9d834d8aad4bb6e418e489";

app.use(cors());

var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/transact", jsonParser, async (req, res) => {
  const input = req.body?.input;

  console.log(req.body);

  if (!input || input === "") {
    res.send("input is required");
  }

  //swap 1 eth for usdc

  const inputArr = input.split(" ");

  const fromChain = "ETH";
  const fromToken = inputArr[2];
  const toChain = "ETH";
  const toToken = inputArr[4];
  const fromAmount = Math.pow(Number(inputArr[1]) * 10, 18);
  const fromAddress = WALLET_ADDRESS;

  const lifiRes = await getQuote(
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    fromAddress
  );

  res.send(lifiRes);
});
const getQuote = async (
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress
) => {
  const result = await axios.get("https://li.quest/v1/quote", {
    params: {
      fromChain,
      toChain,
      fromToken,
      toToken,
      fromAmount: fromAmount,
      fromAddress,
    },
  });
  return result.data;
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
