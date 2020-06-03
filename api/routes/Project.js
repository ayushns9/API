const express = require('express');
const router = express.Router();
const Project = require('../../models/Project')
const User = require('../../models/User')
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    const {name, desc, nameAssigner} = req.query;
    statusArray = [];
    if(req.query.status){
        status = req.query.status.split(',')
        status.forEach( (item) => {
            statusArray.push(
                {
                    'status': {
                        [Op.eq]: item
                    }
                }
            )
        });
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page-1) * limit;
    const nameCond = name ? { name: {
        [Op.like]: `%${name}%`
    }} : {
        name: {
            [Op.like]: '%%'
        }
    };

    const bodyCond = desc ? { body : {
        [Op.like]: `${desc}$`
    }} : {
        body : {
            [Op.like]: '%%'
        }
    }

    const statusCond = statusArray.length>0 ? statusArray : {
        status : {
            [Op.like]: '%%'
        }
    }

    var condition =
        { 
            name: nameCond.name ,
            body: bodyCond.body ,
            [Op.or]: statusCond,
        };

    await Project.findAll({where : condition,
        include: [
            {model: User, 
            attributes: [],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${nameAssigner?nameAssigner:''}%`,
                        }
                    },
                    {
                        surname: {
                            [Op.like]: `%${nameAssigner?nameAssigner:''}%`,
                        }
                    }
                ],
            },
            
        }
    ] , limit: limit?limit:1000000000, offset:offset?offset:0}).then(
        async projects => {
            result = {
                projects: projects,
            }
            if(page > 1){
                result.prevPage = {
                    limit: limit,
                    page : page - 1,
                }
            }
            const { count } = await Project.findAndCountAll({where : condition,
                include: [
                    {model: User, 
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like]: `%${nameAssigner?nameAssigner:''}%`,
                                }
                            },
                            {
                                surname: {
                                    [Op.like]: `%${nameAssigner?nameAssigner:''}%`,
                                }
                            }
                        ]
                    }
                }
            ]})
            if(page * limit + offset < count){
                result.nextPage = {
                    limit : limit,
                    page : page + 1,
                }
            }
            res.status(201).send(result)
        }
    ) .catch (
        err => res.status(500).send(err)
    )
})

router.post('/', async (req, res) => {
    let {name , body, status} = req.query;
    let assigner = parseInt(req.query.assigner);
    console.log(name, body,status,assigner);

    await Project.create({
        name,
        body, 
        status, 
        assigner
    }).then (
        user => res.status(201).send(user)
    )
    .catch (
        err => res.status(500).send(err)
    )
})

module.exports = router;