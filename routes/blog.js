const express = require('express');
const router = express.Router();

var Blog = require('../models/Blog');

const controller = require('../controller/controller');

const coreScripts = require('../controller/coreScripts');

router.get('/', async (req, res) => {
    const blog = await Blog.find({}).lean()
    res.render('index',  {
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
    res.redirect('/');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    // const blog = Blog.find({ _id: id }).lean()
    //     .then(data => {
    //         res.send({data})
    //         if(data._id === id){
    //             res.send({
    //                 message : "User was deleted successfully!"
    //             })
    //         }
    //     })
    //     .catch(err =>{
    //         res.status(404).send({
    //             message: "404 not found"
    //         });
    //     });
        const blog = await Blog.find({ _id: id }).lean()
        console.log(blog);
        res.render('single-post',  {
            title: 'single-post',
            active: 'main',
            utils: coreScripts, 
            blog
        })
        
        console.log(req);
        console.log(res);

        //разобраться здесь
        
        // if (res = ) {
        //     res.status(404).send({
        //         message: "404 not found"
        //         });
        // }
  });

// router.get('/id', controller.getById);

// router.post('/', (req, res) => {
//     const id = req.params.id;


    //const id = `607f3096f959ea47243e293d`;

    // Blog.findByIdAndDelete(id)
    //     .then(data => {
    //         if(!data){
    //             res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
    //         }else{
    //             res.send({
    //                 message : "Post was deleted successfully!"
    //             })
    //         }
    //     })
    //     .catch(err =>{
    //         res.status(500).send({
    //             message: "Could not delete post with id=" + id
    //         });
    //     });

    //Blog.findByIdAndDelete(id)

    //await blog.remove();
    //res.redirect('/');
// })


// router.delete('/:id', controller.delete);

module.exports = router;