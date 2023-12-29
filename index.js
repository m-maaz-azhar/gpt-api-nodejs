import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

const openai = new OpenAI({
    apiKey: ''
});

app.post('/answer-gpt', async (req, res) => {

    const { question } = req.body;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: question }],
        model: "gpt-3.5-turbo",
    });

    if (chatCompletion?.choices[0]?.message?.content) {
        res.send(chatCompletion.choices[0].message.content);
    } else {
        res.send("Sorry, I don't know that.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at Port ${port}`);
});