const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    const title = req.query.name;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page-1) * limit;

    var condition = title ? 
        { 
            [Op.or]: [
                {
                    'name': { 
                        [Op.like]: `%${title}%` 
                    }
                },
                {
                    'surname': {
                        [Op.like]: `%${title}%` 
                    }
                }
            ]
        } : 
        null;
    try{
        await User.findAll({where : condition, limit: limit?limit:10000000, offset:offset?offset:0}).then(
            async users => {
                result = {
                    users: users,
                }
                if(page > 1){
                    result.prevPage = {
                        limit: limit,
                        page : page - 1,
                    }
                }
                const { count } = await User.findAndCountAll({where: condition})
                if(page * limit + offset < count){
                    result.nextPage = {
                        limit : limit,
                        page : page + 1,
                    }
                }
                res.status(201).send(result)
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post('/', async (req, res) => {
    let {name , email, surname} = req.query;
    let errors = [];
    if(!name){
        errors.push({ error: 'Name cannot be empty' })
    }
    if(!email){
        errors.push({ error: 'Email cannot be empty' })
    }
    await User.create({
        name,
        email, 
        surname
    }).then (
        user => res.status(201).send(user)
    )
    .catch (
        err => res.status(500).send(err)
    )
})

module.exports = router;