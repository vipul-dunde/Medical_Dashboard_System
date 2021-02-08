const express = require('express');
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const app = express();

const datab = mysql.createConnection(
    {
        host : "#hostname-localhost",
        user: 'root',
        password : '#yourpassword',
        database:'#yourdatabsename'
    }
);

exports.login = async function(req, res){
    console.log(req.body);
    // login from login.hbss
    // res.send("login succesfull");
    try{
        const { email, password } = req.body;

        if(!email || !password)//false email
        {
            return res.status(400).render('login', {
                message : '  Please provide email and password'
            })
        }
// database here
        datab.query('SELECT * FROM users WHERE email = ?', [email], async (error, results)=>{
            if(!results || !(await bcrypt.compare(password, results[0].password)))
            {
              res.status(401).render('login',{
                  message: '  email or password is incorrect'

              })  
            }else{
                const id = results[0].id;
               res.status(200).redirect('/dashboard');
            }
        })
    }
    catch(error){
        console.log(error);
    }


}


exports.register = function(req, res){
    console.log(req.body);
    //register from register.hbs body
    //var from register
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordconfirm = req.body.passwordconfirm;

    // restructure the above
    // const { name, email, password, passwordconfirm} = req.body;
    
    datab.query('SELECT email FROM users WHERE email= ?', [email], async ( error,results)=>
        {
            if(error){
                console.log(error);
            }
    
            if(results.length>0)
            {
                // result are stored in array 
                return res.render('register', {
                      message: '  that email is already is use'
                })
            }else
            {
                if(password !== passwordconfirm )
                {
                        return res.render('register', {
                            message: '  password does not match'
                            // can send meassage to html
                                                    });
                }
            }
            
            let  hash = await bcrypt.hash(password, 8);
            console.log("hashed passwor 8 times : "+hash);
            // res.send("testing");
            

            datab.query('INSERT INTO users SET ?', {name: name , email: email, password: hash},
            function(error, results){
                    if(error){
                        console.log(error);
                    }else{
                        return res.render('register', {
                            message: '  USER registerd'
                        })
                    }
            })

        });
  

    // res.send("form submitted of Registration");
};



exports.addpatient = function(req, res){
    console.log(req.body);
    const { firstname, lastname, desc, dateofbirth, sex, cndn } = req.body;
    var sql = "INSERT INTO addpatient SET ?";
    datab.query(sql,{fname:firstname, lname:lastname, disease:desc, date:dateofbirth, sex:sex, cndn:cndn},
        async function(error, results){
            if(error){
                return error
            }else
            {
                if(cndn.localeCompare("Serious")===0){
                    var sql1 = "UPDATE addpatient SET EMERGENCY='YES' where cndn = 'Serious' ";
                    datab.query(sql1,function(error, results) {
                        if(error)
                        {return error}
                        else{
                            return res.render('addpatient',{
                                message: "  Patient is Serious added to emergency"
                            })
                        }
                    })
                }else
                {
                    return res.render('addpatient', {
                        message: "  Patient is Normal admitted to hospital"
                    })
                }
            }
        });
};

exports.dashboard = function(req, res){
    console.log(req.body);

};

exports.adddoctor = async function(req, res){

    console.log(req.body);
    const selemp = req.body.selemp;
    const { fname, lname, deg, spe, expr , descr} = req.body;


    if(selemp.localeCompare("Doctor")==0 || selemp.localeCompare("doctor")==0){

        datab.query('INSERT INTO adddoctor SET ?', {fname: fname , lname: lname, degree: deg, spe:spe , expr:expr, descr:descr},
            function(error, results){
                if(error){
                    console.log(error);
                }else{
                    return res.render('adddoctor', {
                        message: '  DOCTOR ADDED'
                    })
                }
            });
    }else{
        if(selemp.localeCompare("Nurse")==0 || selemp.localeCompare("nurse")==0){

            datab.query('INSERT INTO addnurse SET ?', {fname: fname , lname: lname, degree: deg, spe:spe , expr:expr, descr:descr},
                function(error, results){
                    if(error){
                        console.log(error);
                    }else{

                        return res.render('adddoctor', {

                            message: '  NURSE ADDED'
                        })
                    }
                });
        }else{ if(selemp.localeCompare("Staff")==0 || selemp.localeCompare("staff")==0){
            datab.query('INSERT INTO addstaff SET ?', {fname: fname , lname: lname, degree: deg, spe:spe , expr:expr, descr:descr},
                function(error, results){
                    if(error){
                        console.log(error);
                    }else{
                        return res.render('adddoctor', {
                            message: '  STAFF ADDED'
                        })
                    }
                });
        }else{
            return res.render('adddoctor', {
                message: '  Incorrect Employee Value'
            })
        }


        }
    }

};

exports.complain = function(req, res){
        console.log(req.body);
        const { cname, type, desc } = req.body;
        datab.query("INSERT INTO complain SET ?",{name:cname, type:type, description:desc},
        function(error, results){
            if(error){
                console.log(error); 
            }else{
                return res.render('complain', {
                    message: '  Complain Registered'
                })
            }
    })
};


exports.deletepage =function(req,res){


    console.log(req.body);
    const {iduser, iddoct, idpat, idnur, idsta} = req.body;

    if(iduser){
        var sql = "DELETE FROM USERS WHERE email = ? ";

        datab.query(sql,iduser, function(error, results){
            if(error){
                return error
            }else{
                return res.render("deletepage", {
                    data1: "User with email "+iduser+" deleted Successfully!"
                });
            }
    })
    }else{
        if(iddoct){
            var sql = "DELETE FROM adddoctor WHERE id = ? ";

            datab.query(sql,iddoct, function(error, results){
                if(error){
                    return error
                }else{
                    return res.render("deletepage", {
                        data2: "Doctor with id "+iddoct+" deleted Successfully!"
                    });
                }
        })
        }else{
            if(idpat){
                var sql = "DELETE FROM addpatient WHERE id = ? ";

                datab.query(sql,idpat, function(error, results){
                    if(error){
                        return error
                    }else{
                        return res.render("deletepage", {
                            data3: "Patient with id "+idpat+" deleted Successfully!"
                        });
                    }
            })
            }else{
                if(idnur){
                    var sql = "DELETE FROM addnurse WHERE id = ? ";

                    datab.query(sql,idnur, function(error, results){
                        if(error){
                            return error
                        }else{
                            return res.render("deletepage", {
                                data4: "Nurse with id "+idnur+" deleted Successfully!"
                            });
                        }
                })
                }else{
                    var sql = "DELETE FROM addstaff WHERE id = ? ";

                    datab.query(sql,idsta, function(error, results){
                        if(error){
                            return error
                        }else{
                            return res.render("deletepage", {
                                data5:  "Staff with id "+idsta+" deleted Successfully!"
                            });
                        }
                })
                }
            }
        }
    }
};


exports.salary = function(req, res){
    console.log(req.body);

    const {iddoct, idnur, idsta} = req.body;
// TRIGGER
   
    if(iddoct){
        var sql = "";
        datab.query(sql, iddoct, function(error, results, fields){
            if(error){
                return error
            }else{
                    return res.send(results)
            }
        })

    }




}

