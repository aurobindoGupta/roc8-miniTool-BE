const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGptRes(data) {
  console.log(data.data);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are am IT tech interviewer taking a Javascript Interview, please check these questions and their answers, score them out of 10,like Score: 5/10 and provide the currect deatailed answer",
        },
        { role: "user", content: data.data },
      ],
    });
    //console.log("yoyoy", completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (err) {
    (err) => console.error("chatgpt response", err);
  }
}
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.post("/", async (req, res) => {
  const data = req.body;
  const chatGptRes = await getChatGptRes(data);
  console.log(chatGptRes);
  res.status(201).json(chatGptRes);
});

app.listen(3001, () => {
  console.log("SERVER RUNNING-->");
});
