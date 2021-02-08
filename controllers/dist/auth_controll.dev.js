"use strict";

var express = require('express');

var mysql = require("mysql");

var jwt = require('jsonwebtoken');

var bcrypt = require("bcryptjs");

var app = express();
var datab = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'vipul123',
    database: 'database'
});

exports.login = function _callee2(req, res) {
    var _req$body, email, password;

    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    console.log(req.body); // login from login.hbss
                    // res.send("login succesfull");

                    _context2.prev = 1;
                    _req$body = req.body, email = _req$body.email, password = _req$body.password;

                    if (!(!email || !password)) {
                        _context2.next = 5;
                        break;
                    }

                    return _context2.abrupt("return", res.status(400).render('login', {
                        message: '  Please provide email and password'
                    }));

                case 5:
                    // database here
                    datab.query('SELECT * FROM users WHERE email = ?', [email], function _callee(error, results) {
                        var id;
                        return regeneratorRuntime.async(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.t0 = !results;

                                        if (_context.t0) {
                                            _context.next = 5;
                                            break;
                                        }

                                        _context.next = 4;
                                        return regeneratorRuntime.awrap(bcrypt.compare(password, results[0].password));

                                    case 4:
                                        _context.t0 = !_context.sent;

                                    case 5:
                                        if (!_context.t0) {
                                            _context.next = 9;
                                            break;
                                        }

                                        res.status(401).render('login', {
                                            message: '  email or password is incorrect'
                                        });
                                        _context.next = 11;
                                        break;

                                    case 9:
                                        id = results[0].id;
                                        res.status(200).redirect('/dashboard');

                                    case 11:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        });
                    });
                    _context2.next = 11;
                    break;

                case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2["catch"](1);
                    console.log(_context2.t0);

                case 11:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, null, [
        [1, 8]
    ]);
};

exports.register = function(req, res) {
    console.log(req.body); //register from register.hbs body
    //var from register

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var passwordconfirm = req.body.passwordconfirm; // restructure the above
    // const { name, email, password, passwordconfirm} = req.body;

    datab.query('SELECT email FROM users WHERE email= ?', [email], function _callee3(error, results) {
        var hash;
        return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (error) {
                            console.log(error);
                        }

                        if (!(results.length > 0)) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt("return", res.render('register', {
                            message: '  that email is already is use'
                        }));

                    case 5:
                        if (!(password !== passwordconfirm)) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt("return", res.render('register', {
                            message: '  password does not match' // can send meassage to html

                        }));

                    case 7:
                        _context3.next = 9;
                        return regeneratorRuntime.awrap(bcrypt.hash(password, 8));

                    case 9:
                        hash = _context3.sent;
                        console.log("hashed passwor 8 times : " + hash); // res.send("testing");

                        datab.query('INSERT INTO users SET ?', {
                            name: name,
                            email: email,
                            password: hash
                        }, function(error, results) {
                            if (error) {
                                console.log(error);
                            } else {
                                return res.render('register', {
                                    message: '  USER registerd'
                                });
                            }
                        });

                    case 12:
                    case "end":
                        return _context3.stop();
                }
            }
        });
    }); // res.send("form submitted of Registration");
};

exports.addpatient = function(req, res) {
    console.log(req.body);
    var _req$body2 = req.body,
        firstname = _req$body2.firstname,
        lastname = _req$body2.lastname,
        desc = _req$body2.desc,
        dateofbirth = _req$body2.dateofbirth,
        sex = _req$body2.sex,
        cndn = _req$body2.cndn;
    var sql = "INSERT INTO addpatient SET ?";
    datab.query(sql, {
        fname: firstname,
        lname: lastname,
        disease: desc,
        date: dateofbirth,
        sex: sex,
        cndn: cndn
    }, function _callee4(error, results) {
        var sql1;
        return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!error) {
                            _context4.next = 4;
                            break;
                        }

                        return _context4.abrupt("return", error);

                    case 4:
                        if (!(cndn.localeCompare("Serious") === 0)) {
                            _context4.next = 9;
                            break;
                        }

                        sql1 = "UPDATE addpatient SET EMERGENCY='YES' where cndn = 'Serious' ";
                        datab.query(sql1, function(error, results) {
                            if (error) {
                                return error;
                            } else {
                                return res.render('addpatient', {
                                    message: "  Patient is Serious added to emergency"
                                });
                            }
                        });
                        _context4.next = 10;
                        break;

                    case 9:
                        return _context4.abrupt("return", res.render('addpatient', {
                            message: "  Patient is Normal admitted to hospital"
                        }));

                    case 10:
                    case "end":
                        return _context4.stop();
                }
            }
        });
    });
};

exports.dashboard = function(req, res) {
    console.log(req.body);
};

exports.adddoctor = function _callee5(req, res) {
    var selemp, _req$body3, fname, lname, deg, spe, expr, descr;

    return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    console.log(req.body);
                    selemp = req.body.selemp;
                    _req$body3 = req.body, fname = _req$body3.fname, lname = _req$body3.lname, deg = _req$body3.deg, spe = _req$body3.spe, expr = _req$body3.expr, descr = _req$body3.descr;

                    if (!(selemp.localeCompare("Doctor") == 0 || selemp.localeCompare("doctor") == 0)) {
                        _context5.next = 7;
                        break;
                    }

                    datab.query('INSERT INTO adddoctor SET ?', {
                        fname: fname,
                        lname: lname,
                        degree: deg,
                        spe: spe,
                        expr: expr,
                        descr: descr
                    }, function(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.render('adddoctor', {
                                message: '  DOCTOR ADDED'
                            });
                        }
                    });
                    _context5.next = 16;
                    break;

                case 7:
                    if (!(selemp.localeCompare("Nurse") == 0 || selemp.localeCompare("nurse") == 0)) {
                        _context5.next = 11;
                        break;
                    }

                    datab.query('INSERT INTO addnurse SET ?', {
                        fname: fname,
                        lname: lname,
                        degree: deg,
                        spe: spe,
                        expr: expr,
                        descr: descr
                    }, function(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.render('adddoctor', {
                                message: '  NURSE ADDED'
                            });
                        }
                    });
                    _context5.next = 16;
                    break;

                case 11:
                    if (!(selemp.localeCompare("Staff") == 0 || selemp.localeCompare("staff") == 0)) {
                        _context5.next = 15;
                        break;
                    }

                    datab.query('INSERT INTO addstaff SET ?', {
                        fname: fname,
                        lname: lname,
                        degree: deg,
                        spe: spe,
                        expr: expr,
                        descr: descr
                    }, function(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            return res.render('adddoctor', {
                                message: '  STAFF ADDED'
                            });
                        }
                    });
                    _context5.next = 16;
                    break;

                case 15:
                    return _context5.abrupt("return", res.render('adddoctor', {
                        message: '  Incorrect Employee Value'
                    }));

                case 16:
                case "end":
                    return _context5.stop();
            }
        }
    });
};

exports.complain = function(req, res) {
    console.log(req.body);
    var _req$body4 = req.body,
        cname = _req$body4.cname,
        type = _req$body4.type,
        desc = _req$body4.desc;
    datab.query("INSERT INTO complain SET ?", {
        name: cname,
        type: type,
        description: desc
    }, function(error, results) {
        if (error) {
            console.log(error);
        } else {
            return res.render('complain', {
                message: '  Complain Registered'
            });
        }
    });
};

exports.deletepage = function(req, res) {
    console.log(req.body);
    var _req$body5 = req.body,
        iduser = _req$body5.iduser,
        iddoct = _req$body5.iddoct,
        idpat = _req$body5.idpat,
        idnur = _req$body5.idnur,
        idsta = _req$body5.idsta;

    if (iduser) {
        var sql = "DELETE FROM USERS WHERE email = ? ";
        datab.query(sql, iduser, function(error, results) {
            if (error) {
                return error;
            } else {
                return res.render("deletepage", {
                    data1: "User with email " + iduser + " deleted Successfully!"
                });
            }
        });
    } else {
        if (iddoct) {
            var sql = "DELETE FROM adddoctor WHERE id = ? ";
            datab.query(sql, iddoct, function(error, results) {
                if (error) {
                    return error;
                } else {
                    return res.render("deletepage", {
                        data2: "Doctor with id " + iddoct + " deleted Successfully!"
                    });
                }
            });
        } else {
            if (idpat) {
                var sql = "DELETE FROM addpatient WHERE id = ? ";
                datab.query(sql, idpat, function(error, results) {
                    if (error) {
                        return error;
                    } else {
                        return res.render("deletepage", {
                            data3: "Patient with id " + idpat + " deleted Successfully!"
                        });
                    }
                });
            } else {
                if (idnur) {
                    var sql = "DELETE FROM addnurse WHERE id = ? ";
                    datab.query(sql, idnur, function(error, results) {
                        if (error) {
                            return error;
                        } else {
                            return res.render("deletepage", {
                                data4: "Nurse with id " + idnur + " deleted Successfully!"
                            });
                        }
                    });
                } else {
                    var sql = "DELETE FROM addstaff WHERE id = ? ";
                    datab.query(sql, idsta, function(error, results) {
                        if (error) {
                            return error;
                        } else {
                            return res.render("deletepage", {
                                data5: "Staff with id " + idsta + " deleted Successfully!"
                            });
                        }
                    });
                }
            }
        }
    }
};

exports.salary = function(req, res) {
    console.log(req.body);
    var _req$body6 = req.body,
        iddoct = _req$body6.iddoct,
        idnur = _req$body6.idnur,
        idsta = _req$body6.idsta; // TRIGGER

    if (iddoct) {
        var sql = "";
        datab.query(sql, iddoct, function(error, results, fields) {
            if (error) {
                return error;
            } else {
                return res.send(results);
            }
        });
    }
};