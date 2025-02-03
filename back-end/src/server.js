import express from 'express'
import admin from 'firebase-admin';
import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const articleInfo = [
  {name: 'learn-node', upvotes: 0, upvoteIds: [], comments:[]},
  {name: 'learn-react', upvotes: 0, upvoteIds: [], comments:[]},
  {name: 'learn-mongodb', upvotes: 0, upvoteIds: [], comments:[]}
];
const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api/articles/:name', (req, res) => {
  const article = articleInfo.find(a => a.name === req.params.name);
  res.json(article);
});

app.post('/api/articles/:name/upvote', (req, res) => {
  const {uid} = req.user;
  const article = articleInfo.find(a => a.name === req.params.name);
  if (article) {
    const upvoteIds = article.upvoteIds || [];
    if (uid && !upvoteIds.includes(uid)) {
      article.upvoteIds.push(uid);
      article.upvotes = article.upvoteIds.length;
      res.json(article);
    } else {
      res.sendStatus(403);
    }
    
  }
  
});

app.post('/api/articles/:name/comments', (req, res) => {
  const article = articleInfo.find(a => a.name === req.params.name);
  const {postedBy, text} = req.body;
  if (article) {
    article.comments.push({
      postedBy, 
      text
    });

    res.json(article);
  }
})

const PORT = process.env.PORT || 8000;

app.listen(PORT), function() {
  console.log("server is listening on port " + PORT)
}