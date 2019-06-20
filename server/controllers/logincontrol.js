var mongoose = require('mongoose');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
var express = require('express');

app = express()

const loginControl = (req, res) => {
    console.log(req.body);
    Users.findOne({ emailID: req.body.emailID }, (err, data) => {
        if (err) {
            console.log('Database error');
            return res.send({
                message : "Database error."
            })
        }
        console.log(data);
        if (data) {
            if (req.body.password === data.password) {
                const payload = { load :'this is our payload'}
                var token = jwt.sign(payload, 'bravoyoufoundthesecret',{
                    expiresIn : '2h'
                });
                console.log(token)
                console.log('login success')
                return res.send({
                    message: 'Login success',
                    success: true,
                    token: token,
                    _id : data._id,
                    name : data.name
                })
            } else {
                return res.send({
                    message: 'Wrong password Login failed.',
                    success: false
                })
            }
        } else {
            console.log('Email ID not present , Signup first');
            return res.send({
                message: 'Email ID not present in database, Signup first.',
                success: false
            })
        }
    })

}


module.exports = loginControl;