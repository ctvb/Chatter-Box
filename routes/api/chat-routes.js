const router = require('express').Router();
const { Chat } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const chatData = await Chat.findAll();
            res.status(200).json(chatData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const chatData = await Chat.findByPk(req.params.id);

            res.status(200).json(chatData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         const chatData = await Chat.update({
//             include: [{model: Chat, through:Chat}]
//         });

//         req.session.save(() => {
//             req.session.user_id = chatData.id;
//             req.session.logged_in = true;

//             res.status(200).json(chatData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;