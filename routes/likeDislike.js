const express = require('express');
const router = express.Router();
const LikeDislikeService = require('../services/likeDislike');
const Services = new LikeDislikeService();

const { authenticateToken } = require('../auth/strategies/jwt');

// for like
router.put('/like', authenticateToken, async(req, res) => {
    const userId = req.decode.id;
    const like = req.body.like;
    const userData = {
        "user_id": userId,
        "like": like,
    }
    await Services.createLike(userData).then((data) => {
        res.send({"success": "Thanks for like"});
    }).catch ((err) => {
        res.send(err);
    })
})

// for dislike
router.put('/dislike', authenticateToken, async(req, res) => {
    const userId = req.decode.id;
    const dislike = req.body.dislike;
    const userData = {
        "user_id": userId,
        "dislike": dislike,
    }
    await Services.createDislike(userData).then((data) => {
        res.send({"success": "blog is dislike, hope you will like it soon."});
    }).catch ((err) => {
        res.send(err);
    })
})

// get likes
router.get('/likes', authenticateToken, async(req, res) => {
    await Services.findAllLikes().then((data) => {
        console.log(data, "route data");
        res.send(data);
    });
})

// get dislikes
router.get('/dislikes', authenticateToken, async(req, res) => {
    await Services.findAllDislikes().then((data) => {
        console.log(data, "route data");
        res.send(data);
    });
})

module.exports = router;