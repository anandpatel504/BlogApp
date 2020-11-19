const express = require('express');
const router = express.Router();
const BlogService = require('../services/blogs');
const Services = new BlogService();

const { authenticateToken } = require('../auth/strategies/jwt');

// create blog
router.post('/createBlog', authenticateToken, async(req, res) => {
    await Services.createBlog(req.body).then((data) => {
        console.log(data, "data");
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
});

// update blog
router.put('/updateBlog/:id', authenticateToken, async(req, res) => {
    const blogId = req.params.id;
    await Services.updateById(blogId, req.body).then((data) => {
        if (data > 0) {
            res.send({"success": `blog Id ${blogId} updated`});
        } else {
            res.send({"sorry": `blog Id ${blogId} not found!`});
        }
    }).catch((err) => {
        res.send(err);
    })
})

// delete blog
router.delete('/deleteBlog/:id', authenticateToken, async(req, res) => {
    const blogId = req.params.id;
    await Services.deleteById(blogId).then((data) => {
        if (data > 0) {
            res.send({"success": `blog Id ${blogId} deleted`});
        } else {
            res.send({"sorry": `blog Id ${blogId} not found!`});
        }
    })
})

// get all blogs
router.get('/getAll', authenticateToken, async(req, res) => {
    console.log(req.decode.id, "blog table");
    await Services.findAll().then((data) => {
        res.send(data);
    }).catch ((err) => {
        res.send(err);
    })
})

// get blog by id
router.get('/getBlog/:id', authenticateToken, async(req, res) => {
    const blogId = req.params.id;
    await Services.findById(blogId).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = router;