const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.use(express.static("public"))
//app.use(express.static(__dirname+"/public"))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))



app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})



app.use('/articles', articleRouter)

app.listen(5000)
const db = mongoose.connection; db.on('error', console.error.bind(console, 'connection error:')); db.once('open', () => console.log('Database connected'));