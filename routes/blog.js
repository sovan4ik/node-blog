const express = require('express');
const router = express.Router();

var Blog = require('../models/Blog');

const controller = require('../controller/controller');

const coreScripts = require('../controller/coreScripts');

router.get('/', async (req, res) => {
    const blog = await Blog.find({}).lean()
    res.render('index', {
        title: 'Home page',
        active: 'main',
        utils: coreScripts,
        blog
    })
})


router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create new post',
        active: 'create'
    })
})
router.get('/custom', (req, res) => {
    res.render('custom', {
        title: 'custom page test',
        active: 'custom'
    })
})

router.post('/create', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        date: new Date()
    })
    await blog.save();

    res.redirect('/create');
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const post = await Blog.findById(id)
        if (post !== null) {
            res.render('single-post',  {
                title: post.title,
                active: 'main',
                utils: coreScripts, 
                post: post
            });        
        } else {
            res.render('404', {
                title: 'Error 404',
                active: ''
            });
        }
    } else {
        res.render('404', {
            title: 'Error 404',
            active: ''
        });
        }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.redirect('/');
})


module.exports = router;