const express = require('express');
const router = express.Router();

var Blog = require('../models/Blog');

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

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const post = await Blog.findById(id)
        if (post !== null) {
            res.render('edit-post',  {
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
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await Blog.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Cannot delete post with id: ${id}. Maybe id is wrong :/`})
        }else{
            // res.send({ message: "Post was deleted successfully!" })
            res.redirect('/');
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete post with id: " + id + err
        });
    });
} else {
    res.status(404).send({
        message: `Error, ${id} not found`
    })
}
})


router.put('/edit/:id', async (req, res, next) => {
    console.log('1', req.body);
    const id = req.params.id;
    await Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "not found"})
        }else {
            // res.send({ message: "updated"})
            res.redirect('/' + id)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "error" + err
        })
    })
})

module.exports = router;