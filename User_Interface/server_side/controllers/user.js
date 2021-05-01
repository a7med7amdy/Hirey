const db = require('../models')
const { QueryTypes } = require('sequelize');

const FrontEndURL = "http://localhost:3000"

exports.Login = async function(req, res){
    const Data = req.body;
    const [results, metadata] = await db.sequelize.query(
        "Select UserName,Pass,UserRole,Approved From users Where UserName = ?",
        {
            replacements: [Data.username],
            type: QueryTypes.SELECT
        });
    console.log(results);
    if(typeof results !== 'undefined' && results)   //username existed
    {
        if(results.Pass === Data.password)
        {
            if(results.Approved === 'Y')
                res.send("Success-" + results.UserRole);
            else 
                res.send("This Account is not Approved yet.");
            return;
        }
        res.send("Incorrect Password");
        return;
    }
    res.send("User Name doesn't exist");
}


exports.SignUp = async function(req, res){

    const Data = req.body;
    const [results, metadata] = await db.sequelize.query(
            "Select UserName From users Where UserName = ?",
            {
                replacements: [Data.username],
                type: QueryTypes.SELECT
            });
    if(typeof results !== 'undefined' && results)   //username existed
    {
        res.send("Error");
        return;
    }
    return db.sequelize.query(
        "insert into users(UserName, Pass, FName, LName, BirthDate, Gender, City, UserAddress, Email, UserRole, Approved) \
        Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        {
            replacements: [Data.username,
                           Data.password,
                           Data.Fname, 
                           Data.Lname, 
                           new Date(Data.BirthDate),
                           Data.Gender, 
                           Data.City, 
                           Data.Address, 
                           Data.Email, 
                           Data.Role, 
                           'N'],
            type: QueryTypes.INSERT
        }
	).then(result => {
        res.send("Success");
    });
}

exports.fetchNonAdminUsers = async function(req, res){
    const [results, metadata] = await db.sequelize.query(
        "Select UserName,Approved From users Where not UserRole = 'A'"
        );
    res.send(results);
}

exports.DeleteUser = async function(req, res){
    try {
        return db.sequelize.query(
        "Delete from users where UserName = ?",
        {
            replacements: [req.params.username],
            type: QueryTypes.DELETE
        }
        ).then(result => {
            res.send("Success");
        });
    }catch(error){
        console.log("failed to delete");
        res.status(500).send("Failed");
    }
}

exports.ApproveUser = async function(req, res){
    const [results, metadata] = await db.sequelize.query(
        "Update users Set Approved = ? where UserName = ?",
        {
            replacements: ['Y', req.params.username],
            type: QueryTypes.UPDATE
        }
        );
    if(metadata)
        res.send("Success");
    else 
        res.send("Failed");
}