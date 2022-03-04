var config = {
    user: "sa",
    password: "123456",
    server: "localhost",
    database: 'bilal erp',
    port: 1433,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};
// const config = {
//     server: 'localhost',
//     database: 'bilal_erp',
//     authentication: { type: 'default', options: { userName: 'sa', password: 'login++@' } },
//     options: { enableArithAbort: false, encrypt: false }
// }
exports.login = function (req, res) {

    res.render('index', { data: '' });
};


exports.login2 = function (request, response) {
    const sql = require('mssql')

    var username = request.body.user_name;
    var password = request.body.password;
    console.log(username)
    var connection = new sql.connect(config, function (err) {
        if (err) console.log(err)
        var req = new sql.Request(connection);
        if (username && password) {

            console.log("SELECT fu.id,fu.username,fu.fname,fu.lname,fu.password,fu.cnic,fu.email,ca.company_id FROM [bilal erp].[dbo].[fms_users] as fu inner join [bilal erp].[dbo].[user_company_assign] as ca on fu.id=ca.user_id where username='" + username + "' and password = '" + password + "'");
            req.query("SELECT fu.id,fu.username,fu.fname,fu.lname,fu.password,fu.cnic,fu.email,ca.company_id FROM [bilal erp].[dbo].[fms_users] as fu inner join [bilal erp].[dbo].[user_company_assign] as ca on fu.id=ca.user_id where username='" + username + "' and password = '" + password + "'", function (err, recordset) {
                //console.log(recordset["recordsets"][0][0]["id"]);
                if (recordset["recordsets"][0].length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.password = password;
                    request.session.userId = recordset["recordsets"][0][0]["id"];
                    request.session.company_id = recordset["recordsets"][0][0]["company_id"];
                    console.log("aaayaay " + request.session.userId);
                    console.log("aaayaay company " + request.session.company_id);
                    response.redirect('/dash');
                } else {
                    response.render('index', { data: "Incorrect Username Or Password" });
                }
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });
};

exports.report = function (req, res) {
    userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query('SELECT  distinct(COUNT(reg_number))  as total_vehicle FROM [asif].[dbo].[fms_vehicle]', function (err, recordset) {
                if (err) console.log(err)


                request.query("SELECT COunt(*) as total_bolan FROM [asif].[dbo].[fms_vehicle] Where make = 'Bolan'", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT count(*) as pick fROM [asif].[dbo].[vehicle_all] where make='Bolan' and type_name  like  '%Pick and Drop'", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT count(*) as pana FROM [asif].[dbo].[vehicle_all] where make = 'Panorama'", function (err, recordset4) {
                            if (err) console.log(err)

                            request.query("SELECT round(avg(km_per_ltr_gps),0) as 'average',month(as_on) as 'month1' FROM      view_fuel_km_per_ltr_gps WHERE     YEAR(as_on) = '2020' GROUP BY  MONTH(as_on) order by month1 asc", function (err, recordset5) {
                                if (err) console.log(err)
                                //console.log(recordset5["recordsets"][0])

                                request.query("SELECT  count(*) as t_vehicle,count(*)*100/(SELECT  count(*) FROM [asif].[dbo].[hcm_employee]) as total FROM [asif].[dbo].[fms_emp_vehicle_allocation]", function (err, recordset6) {
                                    if (err) console.log(err)
                                    //console.log(recordset6["recordsets"][0])

                                    request.query("SELECT round(avg(km_per_ltr_gps),0) as 'average',month(as_on) as 'month1' FROM      view_fuel_km_per_ltr_gps WHERE     YEAR(as_on) = '2020' GROUP BY  MONTH(as_on) order by month1 asc", function (err, recordset7) {
                                        if (err) console.log(err)
                                        //console.log(recordset7["recordsets"][0])
                                        request.query("SELECT  count(*)as t_vehicle,count(*)*100/(SELECT  count(*)+100 FROM [asif].[dbo].[hcm_employee]) as total FROM [asif].[dbo].[hcm_employee]", function (err, recordset8) {
                                            if (err) console.log(err)
                                            //console.log(recordset8["recordsets"][0])
                                            request.query("SELECT distinct(company_name),count(vehicle_id) as total FROM [view_fuel_card_allocation] group by company_name", function (err, recordset9) {
                                                if (err) console.log(err)
                                                //console.log(recordset9["recordsets"][0])
                                                request.query("SELECT    round(avg([Total_Fuel]),0) as 'average',month(as_on) as 'month1' FROM      [view_fuel_costs] WHERE     YEAR(as_on) = YEAR(GETDATE())-1 GROUP BY  MONTH(as_on) order by month1 asc", function (err, recordset10) {
                                                    if (err) console.log(err)
                                                    //console.log(recordset10["recordsets"][0])
                                                    request.query("SELECT  [vehicles],[util] FROM [asif].[dbo].[view_cap_util]", function (err, recordset11) {
                                                        if (err) console.log(err)

                                                        request.query("SELECT [qty],[make]FROM [asif].[dbo].[vehicle_make_count]", function (err, recordset12) {
                                                            if (err) console.log(err)

                                                            request.query("select * from fms_vehicle as fv inner join fms_region as fr on fr.id = fv.r_state_id inner join fms_area1_ on fr.id = fms_area1_.id  inner join fms_fuel_type on fms_fuel_type.id = fv.fuel_type_id", function (err, recordset13) {
                                                                if (err) console.log(err)

                                                                request.query("SELECT TOP (1000) [type_name],[vehicles],[type_id]FROM [asif].[dbo].[view_type_dist] order by vehicles desc", function (err, recordset14) {
                                                                    if (err) console.log(err)
                                                                    request.query("SELECT  distinct(region_name), avg(utilization_mor) as avg FROM [asif].[dbo].[vehicle_all] group by region_name", function (err, recordset15) {
                                                                        if (err) console.log(err)
                                                                        console.log(recordset15["recordsets"][0])

                                                                        res.render('report', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0], data4: recordset4["recordsets"][0], data5: recordset5["recordsets"][0], data6: recordset6["recordsets"][0], data7: recordset7["recordsets"][0], data8: recordset8["recordsets"][0], data9: recordset9["recordsets"][0], data10: recordset10["recordsets"][0], data11: recordset11["recordsets"][0], data12: recordset12["recordsets"][0], data13: recordset13["recordsets"][0], data14: recordset14["recordsets"][0], data15: recordset15["recordsets"][0] });
                                                                    });

                                                                });

                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });

                        });
                    });
                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};


exports.dash = function (req, res) {

    userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId != null) {
        res.render('dash');
    }
    else {
        res.redirect("/login");
    }

};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/login");
    })
};


exports.manage_roles = function (req, res) {

    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();
            console.log("hamza ")
            request.query('SELECT * FROM [bilal erp].[dbo].[fms_users] ', function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[f_roles]", function (err, recordset2) {
                    if (err) console.log(err)
                    // res.render('role', { data1: recordset["recordsets"][0],data2: recordset2["recordsets"][0] });
                    request.query("SELECT * FROM  [bilal erp].[dbo].[f_roles_assign] inner join  [bilal erp].[dbo].fms_users on  [bilal erp].[dbo].[f_roles_assign].[user_id] = [fms_users].id  inner join   [bilal erp].[dbo].[f_roles] as f_ass on f_ass.id =  [bilal erp].[dbo].[f_roles_assign].role_id", function (err, recordset3) {
                        if (err) console.log(err)

                        res.render('role', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0] });
                    });
                });
            });
        });
    }
    else {
        res.redirect("/login");
    }
};
exports.createRole = function (req, res) {
    // name=' + rolName+'&action='+actionS+'&main_dash='+mainDashboard+'&vehicle='+vehicleS+'&fuelCard='+cardS+'&gps='+gpsS+'&report='+reportS+'&users='+userS+'&update_vehi='+updateD
    var name = req.query.name;
    var action = req.query.action;
    var sql = require("mssql");

    // console.log(name + action);

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();
        console.log("INSERT INTO [dbo].[f_roles]([r_name],[r_action])VALUES ('" + name + "','" + action + "')");

        // request.query("INSERT INTO [dbo].[f_roles]([r_name],[r_action],[r_main_dash],[r_vehicle],[r_gps],[r_report],[r_update_vehi],[r_fuel_card],[r_users])VALUES ('"+name+"' ,'"+action+"','"+main_dash+"','"+vehicle+"','"+gps+"','"+report+"','"+update_vehi+"','"+fuelCard+"','"+users+"')", function (err, recordset) {
        request.query("INSERT INTO [dbo].[f_roles]([r_name],[r_action])VALUES ('" + name + "','" + action + "')", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response

            console.log("Submitted.....");

            console.log("[{status:'ok'}]");
            res.json(JSON.parse('{"status":"ok"}'));


        });




    });

};

exports.assign_role = function (req, res) {
    // name=' + rolName+'&action='+actionS+'&main_dash='+mainDashboard+'&vehicle='+vehicleS+'&fuelCard='+cardS+'&gps='+gpsS+'&report='+reportS+'&users='+userS+'&update_vehi='+updateD
    var role_id = req.query.role_id;
    var user_id = req.query.user_id;

    var sql = require("mssql");



    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();
        console.log("INSERT INTO [dbo].[f_roles_assign]([role_id],[user_id])VALUES ('" + role_id + "' ,'" + user_id + "')");

        request.query("INSERT INTO [dbo].[f_roles_assign]([role_id],[user_id])VALUES ('" + role_id + "' ,'" + user_id + "')", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response

            console.log("Submitted.....");

            console.log("[{status:'ok'}]");
            res.json(JSON.parse('{"status":"ok"}'));


        });




    });

};


exports.userlist2 = function (req, res, next) {
    var userId = req.session.userId;
    var userName = req.session.username;
    console.log("ss=> " + userId);
    const sql = require('mssql');

    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();
        console.log(sql);
        console.log("session data  ==> SELECT * FROM [bilal erp].[dbo].[f_roles_assign] inner join [bilal erp].dbo.fms_users on [bilal erp].[dbo].[f_roles_assign].[user_id] = fms_users.id  inner join [bilal erp].[dbo].[f_roles] as f_ass on f_ass.id = [bilal erp].[dbo].[f_roles_assign].role_id where user_id='" + userId + "'")
        // request.query("SELECT * FROM [asif].[dbo].[fms_users] Where id = '"+userId+"'", function (err, recordset) {
        request.query("SELECT * FROM [bilal erp].[dbo].[f_roles_assign] inner join [bilal erp].dbo.fms_users on [bilal erp].[dbo].[f_roles_assign].[user_id] = fms_users.id  inner join [bilal erp].[dbo].[f_roles] as f_ass on f_ass.id = [bilal erp].[dbo].[f_roles_assign].role_id where user_id='" + userId + "'", function (err, recordset) {
            if (err) console.log(err)
            //
            // console.log("ayaa "+ recordset["recordsets"][0][0]["r_gps"])
            // send records as a response
            console.log(recordset["recordsets"][0][0]);
            res.send(recordset);


        });
    });

};

exports.add_product = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset3) {
                        if (err) console.log(err)

                        res.render('add_product', { userData: recordset["recordsets"][0], w_house: recordset2["recordsets"][0], company: recordset3["recordsets"][0] });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.warehouse = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[w_house]", function (err, recordset) {
                if (err) console.log(err)
                res.render('warehouse', { userData: recordset["recordsets"][0] });


            });
        });
    }
    else {
        res.redirect("/login");
    }
};
exports.t_oil = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT ol.id,ol.oil_name,ol.invoice,ol.brand_name,ol.qunatity,ol.valid_date,ol.company_id,va.varii FROM [bilal erp].[dbo].[oil] as ol inner join [bilal erp].[dbo].[varitions] va on ol.m_unit=va.id where ol.company_id='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('t_oil', { userData: recordset["recordsets"][0] });


            });
        });
    }
    else {
        res.redirect("/login");
    }
};
exports.warehouse_oil = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT oa.id,oa.quantity,oa.company_id,oa.issued_date,wh.name,vr.varii FROM [bilal erp].[dbo].[oil_assign] as oa inner join [bilal erp].[dbo].[w_house] as wh on oa.warehouse_id=wh.id inner join [bilal erp].[dbo].[varitions] as vr on oa.m_unit=vr.id where company_id='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('warehouse_oil', { userData: recordset["recordsets"][0] });


            });
        });
    }
    else {
        res.redirect("/login");
    }
};
exports.create_house = function (req, res) {



    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var name = post.name;


                var request = new sql.Request();
                // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
                request.query("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')", function (err, recordset) {
                    if (err) console.log(err)
                    res.redirect('/warehouse');


                });
            }
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.category = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset) {
                if (err) console.log(err)
                res.render('category', { userData: recordset["recordsets"][0] });


            });
        });
    }
    else {
        res.redirect("/login");
    }
};

exports.create_category = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        var alert = require("alert")
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var name = post.c_name;


                var request = new sql.Request();
                // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
                request.query("INSERT INTO [dbo].[categories]([c_name]) VALUES ('" + name + "')", function (err, recordset) {
                    if (err) console.log(err);

                    // alert("Inserted")

                    res.redirect('/category');


                });
            }
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.tdelete8 = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var id = req.id;


            var request = new sql.Request();
            // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
            request.query("DELETE FROM [dbo].[categories] WHERE id= " + id + "", function (err, recordset) {
                if (err) alert(err)

                res.redirect('/category');


            });

        });
    }
    else {
        res.redirect("/login");
    }

};

exports.addproduct = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var invoice = req.query.invoice;
            var p_name1 = req.query.p_name1;
            var p_code = req.query.p_code;
            var category = req.query.category;
            var sub_category = req.query.sub_category;
            var company = req.session.company_id;
            var WareHouse = req.query.WareHouse;
            var retail = req.query.retail;
            // var order = req.query.order1;
            var m_unit = req.query.m_unit;
            var date = req.query.basicFlatpickr;
            var discription = req.query.discription;
            var quati = req.query.quantity;
            var create_date = req.query.create_date;
            // var image = post.image;
            var product = req.query.product;
            var selects = req.query.selects;
            var p_name = req.query.p_name;
            // var name = post.name;



            var arr = JSON.parse(p_name);
            var pro = JSON.parse(product);
            var slo = JSON.parse(selects);
            console.log(arr.length);

            for (var i = 0; i < arr.length; i++) {

                console.log(arr[i]);
                console.log(pro[i]);
                console.log(slo[i]);


            }


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[history_products](invoice_no,product_name,product_code,category,sub_category,wareHouse,retail_price,assign_time,quantity,company) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + date + "','" + quati + "','" + company + "')")
            request.query("INSERT INTO [dbo].[history_products](invoice_no,product_name,product_code,category,sub_category,wareHouse,retail_price,assign_time,quantity,company) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + date + "','" + quati + "','" + company + "')", function (err, recordset2) {
                if (err) console.log(err);


                console.log("INSERT INTO dbo.add_products(invoice_no,product_name, product_code, category, sub_category, wareHouse, retail_price, measurement_unit, valid_date, discription,quantity,company_id) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + quati + "','" + company + "')SELECT SCOPE_IDENTITY() as id")
                request.query("INSERT INTO dbo.add_products(invoice_no,product_name, product_code, category, sub_category, wareHouse, retail_price, measurement_unit, valid_date, discription,quantity,company_id) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + quati + "','" + company + "')SELECT SCOPE_IDENTITY() as id", function (err, recordset) {
                    if (err) console.log(err);
                    console.log(recordset["recordsets"][0][0]["id"]);
                    var p_ids = recordset["recordsets"][0][0]["id"];

                    for (var i = 0; i < arr.length; i++) {
                        var namep = arr[i];
                        var prop = pro[i];
                        var slopp = slo[i];
                        console.log("INSERT INTO [bilal erp]..sub_product( product_name, product_no, status,main_product_id,wearhouse_id,company_id) VALUES  ('" + namep + "','" + prop + "','" + slopp + "','" + p_ids + "','" + WareHouse + "','" + company + "')");
                        request.query("INSERT INTO [bilal erp]..sub_product( product_name, product_no, status,main_product_id,wearhouse_id,company_id) VALUES  ('" + namep + "','" + prop + "','" + slopp + "','" + p_ids + "','" + WareHouse + "','" + company + "')", function (err, recordset2) {
                            if (err) console.log(err);

                        });

                    }
                    res.redirect('/add_product')

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }


};

exports.add_oil = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[varitions]", function (err, recordset2) {
                    if (err) console.log(err)

                    res.render('add_oil', { userData: recordset["recordsets"][0], m_unit: recordset2["recordsets"][0] });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};


exports.addoil = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var invoice = post.invoice;
                var p_name = post.p_name;
                var p_code = post.p_code;
                var category = post.category;
                var sub_category = post.sub_category;
                var retail = post.retail;
                var m_unit = post.m_unit;
                var date = post.basicFlatpickr;
                var discription = post.discription;
                var quati = post.quantity;


                var request = new sql.Request();
                console.log("INSERT INTO [dbo].[oil]([oil_name], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date], [discription],[invoice],[company_id]) VALUES('" + p_name + "','" + p_code + "','" + category + "','" + sub_category + "','" + quati + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + invoice + "','" + company_id + "')")
                request.query("INSERT INTO [dbo].[oil]([oil_name], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date], [discription],[invoice],[company_id]) VALUES('" + p_name + "','" + p_code + "','" + category + "','" + sub_category + "','" + quati + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + invoice + "','" + company_id + "')", function (err, recordset) {
                    if (err) console.log(err)
                    console.log("INSERT INTO [dbo].[oil_history]([company_id],[oil_name], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date],[invoice]) VALUES('" + company_id + "','" + p_name + "','" + p_code + "','" + category + "','" + sub_category + "','" + quati + "','" + retail + "','" + m_unit + "','" + date + "','" + invoice + "')");
                    request.query("INSERT INTO [dbo].[oil_history]([company_id],[oil_name], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date],[invoice]) VALUES('" + company_id + "','" + p_name + "','" + p_code + "','" + category + "','" + sub_category + "','" + quati + "','" + retail + "','" + m_unit + "','" + date + "','" + invoice + "')", function (err, recordset) {
                        if (err) console.log(err)
                        res.redirect('/add_oil');


                    });


                });
            }
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.vehicle_reg = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();
            request.query("SELECT * FROM vehicle_reg", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('vehicle_reg', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.create_vehicle_reg = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var v_type = post.v_type;
                var v_no = post.v_no;
                var e_no = post.e_no;
                var c_no = post.c_no;
                var odo = post.odo_c;
                var v_name = post.v_name;
                var status = post.status;

                //   var sql = "INSERT INTO bilal_erp..vehicl_reg(v_type,v_no,e_no,c_no,v_name, status) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "')";
                //     console.log("INSERT INTO bilal_erp..vehicle_reg(v_type,v_no,e_no,c_no,v_name, status) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "')")
                var sql = require("mssql");


                sql.connect(config, function (err) {

                    if (err) console.log(err);


                    var request = new sql.Request();
                    console.log("INSERT INTO [dbo].[vehicle_reg]([v_type],[v_no],[e_no],[c_no],[v_name],[status],[odometer]) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "','" + odo + "')");
                    request.query("INSERT INTO [dbo].[vehicle_reg]([v_type],[v_no],[e_no],[c_no],[v_name],[status],[odometer]) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "','" + odo + "')", function (err, recordset) {
                        if (err) console.log(err)
                        message = "Data Save Succesfully!";
                        res.redirect('/vehicle_reg');
                    });
                });

            }
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.tdelete = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var id = req.id;


            var request = new sql.Request();
            // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
            request.query("DELETE FROM [dbo].[vehicle_reg] WHERE id= " + id + "", function (err, recordset) {
                if (err) alert(err)

                res.redirect('/vehicle_reg');


            });

        });
    }
    else {
        res.redirect("/login");
    }

};

exports.edit_vehicle = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM vehicle_reg WHERE id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('edit_vehicle', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};



exports.update_vehicle = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var id = req.id;
                var post = req.body;
                var v_type = post.v_type;
                var v_no = post.v_no;
                var e_no = post.e_no;
                var c_no = post.c_no;
                var v_name = post.v_name;
                var status = post.status;

                //   var sql = "INSERT INTO bilal_erp..vehicl_reg(v_type,v_no,e_no,c_no,v_name, status) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "')";
                //     console.log("INSERT INTO bilal_erp..vehicle_reg(v_type,v_no,e_no,c_no,v_name, status) VALUES ('" + v_type + "','" + v_no + "','" + e_no + "','" + c_no + "','" + v_name + "','" + status + "')")
                var sql = require("mssql");


                sql.connect(config, function (err) {

                    if (err) console.log(err);


                    var request = new sql.Request();
                    console.log("UPDATE [dbo].[vehicle_reg] SET [v_type] = '" + v_type + "',[v_no]='" + v_no + "',[e_no]='" + e_no + "',[c_no]='" + c_no + "',[v_name]='" + v_name + "',[status]='" + status + "' WHERE id= " + id + "");
                    request.query("UPDATE [dbo].[vehicle_reg] SET [v_type] = '" + v_type + "',[v_no]='" + v_no + "',[e_no]='" + e_no + "',[c_no]='" + c_no + "',[v_name]='" + v_name + "',[status]='" + status + "' WHERE id= " + id + "", function (err, recordset) {
                        if (err) console.log(err)
                        message = "Data Save Succesfully!";
                        res.redirect('/vehicle_reg');
                    });
                });

            }
        });
    }
    else {
        res.redirect("/login");
    }



};


exports.oilAssign = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[oil]", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT * FROM [bilal erp].[dbo].[varitions]", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset4) {
                            if (err) console.log(err)
                            console.log(recordset4["recordsets"][0]);
                            res.render('oilAssign', { userData: recordset["recordsets"][0], w_house: recordset2["recordsets"][0], m_unit: recordset3["recordsets"][0], company: recordset4["recordsets"][0] });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.checkquan = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil] WHERE id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil] WHERE id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                // console.log(recordset)
                console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};



exports.oilissued = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var company = req.session.company_id;
            var warehouse = req.query.warehouse;
            var category = req.query.category;
            var m_unit1 = req.query.m_unit1;
            var main_id = req.query.main_id;
            var quantity = req.query.quantity;
            var issued_date = req.query.issued_date;
            var mainoil = req.query.mainoil;

            final = mainoil - quantity;

            console.log("Main Oil " + mainoil);
            console.log("assign " + quantity);
            console.log("final " + final);


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[history_oil_warehouse]([company_id],[warehouse_id], [oil_id], [quantity],[m_unit],[issued_date]) VALUES (" + company + "," + warehouse + "," + category + ",'" + quantity + "'," + m_unit1 + ",'" + issued_date + "')")
            request.query("INSERT INTO [dbo].[history_oil_warehouse]([company_id],[warehouse_id], [oil_id], [quantity],[m_unit],[issued_date]) VALUES (" + company + "," + warehouse + "," + category + ",'" + quantity + "'," + m_unit1 + ",'" + issued_date + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log("INSERT INTO [dbo].[oil_assign]([company_id],[warehouse_id], [oil_id], [quantity],[m_unit],[issued_date]) VALUES (" + company + "," + warehouse + "," + category + ",'" + quantity + "'," + m_unit1 + ",'" + issued_date + "')")
                request.query("INSERT INTO [dbo].[oil_assign]([company_id],[warehouse_id], [oil_id], [quantity],[m_unit],[issued_date]) VALUES (" + company + "," + warehouse + "," + category + ",'" + quantity + "'," + m_unit1 + ",'" + issued_date + "')", function (err, recordset1) {
                    if (err) console.log(err)
                    console.log("UPDATE [dbo].[oil] SET [qunatity]=" + final + " WHERE id = " + main_id + "");
                    request.query("UPDATE [dbo].[oil] SET [qunatity]=" + final + " WHERE id = " + main_id + "", function (err, recordset2) {
                        if (err) console.log(err)
                        console.log("Updated .....");



                    });


                });
            });
            res.redirect('/oilAssign');
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.oil_issue = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[oil]", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset4) {
                            if (err) console.log(err)

                            res.render('oil_issue', { userData: recordset["recordsets"][0], w_house: recordset2["recordsets"][0], vehicle_reg: recordset3["recordsets"][0], company: recordset4["recordsets"][0] });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

// exports.checkquan = function (req, res) {
//     userId = req.session.userId;


//     // connect to your database


//     if (userId != null) {
//         var sql = require("mssql");


//         sql.connect(config, function (err) {

//             if (err) console.log(err);
//             var id = req.query.id;


//             var request = new sql.Request();
//             console.log("SELECT * FROM [bilal erp].[dbo].[oil_assign] INNER JOIN [bilal erp].[dbo].[w_house] ON oil_assign.warehouse_id = w_house.id WHERE warehouse_id=" + id + "")
//             request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign] INNER JOIN [bilal erp].[dbo].[w_house] ON oil_assign.warehouse_id = w_house.id WHERE warehouse_id=" + id + "", function (err, recordset) {
//                 if (err) console.log(err)
//                 // console.log(recordset)
//                 console.log(recordset["recordsets"][0][0]["id"]);
//                 res.json(recordset["recordsets"][0][0]);
//             });
//         });
//     }
//     else {
//         res.redirect("/login");
//     }



// };



exports.oil_toVehicle = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil_assign] INNER JOIN [bilal erp]..w_house ON oil_assign.warehouse_id = w_house.id WHERE warehouse_id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign] INNER JOIN [bilal erp]..w_house ON oil_assign.warehouse_id = w_house.id WHERE warehouse_id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};



exports.oil_to_vehi = function (req, res) {
    userId = req.session.userId;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var post = req.query;
            var WareHouse_o = post.WareHouse_o;
            var v_no_o = post.v_no_o;
            var oil_type_o = post.oil_type_o;
            var Quatities = post.Quatities;
            var company_id = req.session.company_id;;
            var work_hr_o = post.work_hr_o;
            var change_hr_o = post.change_hr_o;
            var expect_hr_o = post.expect_hr_o;
            var current_odo_o = post.current_odo_o;
            var next_odo_o = post.next_odo_o;
            var issue_date_o = post.issue_date_o;
            var expect_date_o = post.expect_date_o;
            var remark_o = post.remark_o;

            var main_id = post.main_id;
            var total = post.total;

            var final = total - Quatities;

            console.log(main_id);
            console.log(total);
            console.log(final); 


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[oil_assign_tovehicle]([vehicle_no],[brand_name],[quantity],[company_id],[warehouse],[issue_date],[remarks],[change_hr],[expect_hr],[working_hr],[expect_date],[current_odo],[next_odo]) VALUES ('" + v_no_o + "','" + oil_type_o + "','" + Quatities + "','" + company_id + "','" + WareHouse_o + "','" + issue_date_o + "','" + remark_o + "','" + change_hr_o + "','" + expect_hr_o + "','" + work_hr_o + "','" + expect_date_o + "','" + current_odo_o + "','" + next_odo_o + "')")
            request.query("INSERT INTO [dbo].[oil_assign_tovehicle]([vehicle_no],[brand_name],[quantity],[company_id],[warehouse],[issue_date],[remarks],[change_hr],[expect_hr],[working_hr],[expect_date],[current_odo],[next_odo]) VALUES ('" + v_no_o + "','" + oil_type_o + "','" + Quatities + "','" + company_id + "','" + WareHouse_o + "','" + issue_date_o + "','" + remark_o + "','" + change_hr_o + "','" + expect_hr_o + "','" + work_hr_o + "','" + expect_date_o + "','" + current_odo_o + "','" + next_odo_o + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log("UPDATE [dbo].[oil_assign] SET [qunatity]=" + final + " WHERE warehouse_id = " + main_id + "");
                request.query("UPDATE [dbo].[oil_assign] SET [quantity]=" + final + " WHERE warehouse_id = " + main_id + "", function (err, recordset1) {

                    if (err) console.log(err)



                });


            });
            res.redirect('/oil_issue')


        });
    }
    else {
        res.redirect("/login");
    }

};

exports.tyre_issue_table = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM tyre_issue", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('tyre_issue_table', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.tyre_issue = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[sub_product]", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_products", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset4) {
                            if (err) console.log(err)

                            res.render('tyre_issue', { w_house: recordset["recordsets"][0], p_no: recordset2["recordsets"][0], brand: recordset3["recordsets"][0], vehicle_reg: recordset4["recordsets"][0] });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};



exports.check_tyre_quan = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[add_products] WHERE id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[add_products] WHERE id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                // console.log(recordset)
                console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.t_num = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[sub_product] WHERE main_product_id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[sub_product] WHERE main_product_id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};




exports.create_tyre_issue = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var post = req.query;
            var i_date = post.i_date;
            var v_no = post.v_no;
            var v_type = post.v_type;
            var qty = post.Quatities;
            var remark = post.remark;
            var t_num = post.t_num;
            var t_brand = post.t_brand;
            var WareHouse = post.WareHouse;
            var c_odo = post.c_odo;
            var n_odo = post.n_odo;
            var expect_date = post.expect_date;


            var main_id = post.main_id;
            var total = post.total;

            var final = total - qty;

            console.log(main_id);
            console.log(total);
            console.log(final);


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[tyre_issue]([i_date], [v_no], [v_type], [qty], [warehouse_id], [remark], [t_num], [t_brand], [current_odo], [next_odo], [expect_date]) VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "','" + c_odo + "','" + n_odo + "','" + expect_date + "')")
            request.query("INSERT INTO [dbo].[tyre_issue]([i_date], [v_no], [v_type], [qty], [warehouse_id], [remark], [t_num], [t_brand], [current_odo], [next_odo], [expect_date]) VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "','" + c_odo + "','" + n_odo + "','" + expect_date + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log("UPDATE [dbo].[add_products] SET [quantity]=" + final + " WHERE id = " + main_id + "");
                request.query("UPDATE [dbo].[add_products] SET [quantity]=" + final + " WHERE id = " + main_id + "", function (err, recordset1) {
                    if (err) console.log(err)
                    res.redirect("/oil_issue");
                    console.log(recordset1["rowsAffected"][0]);
                    if (recordset1["rowsAffected"][0] == 1) {
                        console.log("samad")

                    }



                });


            });
            res.redirect('/tyre_issue')
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.users = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM [bilal erp].[dbo].[fms_users]", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('users', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.add_users = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        var alert = require("alert")
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var name = post.name;
                var email = post.email;
                var fname = post.fname;
                var lname = post.lname;
                var cnic = post.cnic;
                var password = post.password;


                var request = new sql.Request();
                // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
                request.query("INSERT INTO [dbo].[fms_users]([username],[fname],[lname],[password],[cnic],[email])VALUES ('" + name + "','" + fname + "','" + lname + "','" + password + "','" + cnic + "','" + email + "')", function (err, recordset) {
                    if (err) console.log(err);

                    // alert("Inserted")

                    res.redirect('/users');


                });
            }
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.dashboard = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;

            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign_tovehicle] where vehicle_no =" + id + "", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)


                request.query("SELECT * FROM [bilal erp].[dbo].[tyre_issue] where v_no=" + id + "", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg] where id=" + id + "", function (err, recordset4) {
                        if (err) console.log(err)
                        var carName = recordset4["recordsets"][0][0]['v_no'];
                        console.log("Vehi "+carName)

                        request.query("SELECT TOP(1) * FROM [bilal erp].[dbo].[fms_fvehicles] where vehnum='"+carName+"' order by id desc", function (err, recordset5) {
                            if (err) console.log(err)
                           
                            console.log(recordset5)
    
                            request.query("SELECT TOP(1) * FROM [bilal erp].[dbo].[fms_fvehicles] where vehnum='"+carName+"' order by id asc", function (err, recordset6) {
                                if (err) console.log(err)
                               
                                console.log(recordset5)
        
                                res.render('dashboard', { oil_iss: recordset["recordsets"][0], tyre_iss: recordset2["recordsets"][0], data1: recordset4["recordsets"][0], data2: recordset5["recordsets"][0] , data3: recordset6["recordsets"][0]});
        
        
                            });
    
    
                        });


                    });



                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.oil_report = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_report]", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('oil_report', { userData: recordset["recordset"] });
            });

        });
    }
    else {
        res.redirect("/login");
    }



};

exports.oil_warehouse = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var from = req.query.from;
            var to = req.query.to;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil_report] where issued_date>='" + from + "' and issued_date<='" + to + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_report] where issued_date>='" + from + "' and issued_date<='" + to + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.oil_purchase = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_purchase]", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('oil_purchase', { userData: recordset["recordset"] });
            });

        });
    }
    else {
        res.redirect("/login");
    }



};

exports.oil_purchase_get = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var from = req.query.from;
            var to = req.query.to;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil_purchase] where valid_date>='" + from + "' and valid_date<='" + to + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_purchase] where valid_date>='" + from + "' and valid_date<='" + to + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.oil_vehicle_rep = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign_tovehicle] as av inner join [bilal erp].[dbo].[vehicle_reg] as vg on av.vehicle_no = vg.id", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('oil_vehicle_rep', { userData: recordset["recordset"] });
            });

        });
    }
    else {
        res.redirect("/login");
    }



};

exports.oil_purchase_get = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var from = req.query.from;
            var to = req.query.to;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil_assign_tovehicle] as av inner join [bilal erp].[dbo].[vehicle_reg] as vg on av.vehicle_no = vg.id where  av.issue_date>='" + from + "' and av.issue_date<='" + to + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign_tovehicle] as av inner join [bilal erp].[dbo].[vehicle_reg] as vg on av.vehicle_no = vg.id where av.issue_date>='" + from + "' and av.issue_date<='" + to + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.create_company = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                request.query("SELECT * FROM [bilal erp].[dbo].[w_house]", function (err, recordset1) {
                    if (err) console.log(err)
                    console.log(recordset1)
                    request.query("SELECT * FROM [bilal erp].[dbo].[wearhouse_to_company]", function (err, recordset2) {
                        if (err) console.log(err)
                        console.log(recordset2)
                        res.render('create_company', { userData: recordset["recordset"], w_house: recordset1["recordset"], assign_data: recordset2["recordset"] });
                    });
                });
            });

        });
    }
    else {
        res.redirect("/login");
    }



};
exports.add_company = function (req, res) {



    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var name = post.com_name;
                var email = post.com_email;
                var address = post.address;
                var phone = post.phone;


                var request = new sql.Request();
                // console.log("INSERT INTO [dbo].[w_house]([name]) VALUES ('" + name + "')")
                request.query("INSERT INTO [dbo].[company]([company_name],[email],[address],[phone_no])VALUES ('" + name + "','" + email + "','" + address + "','" + phone + "')", function (err, recordset) {
                    if (err) console.log(err)


                });
                res.redirect('/create_company');
            }
        });
    }
    else {
        res.redirect("/login");
    }

};
exports.wearhouseAssign_company = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            var company_id = req.query.company_id;
            var wearhouse_id = req.query.wearhouse_id;



            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[wearhouse_company]([company_id],[wearhouse_id],[user_id]) VALUES ('" + company_id + "','" + wearhouse_id + "','" + userId + "')")
            request.query("INSERT INTO [dbo].[wearhouse_company]([company_id],[wearhouse_id],[user_id]) VALUES ('" + company_id + "','" + wearhouse_id + "','" + userId + "')", function (err, recordset) {
                if (err) console.log(err)


            });
            res.redirect('/create_company');

        });
    }
    else {
        res.redirect("/login");
    }

};
exports.comp_wearhouse = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;

            console.log("Samad" + id);
            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[wearhouse_to_company] where id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[wearhouse_to_company] where id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                if (recordset === "undefined") {
                    res.json("")
                }
                else {
                    res.json(recordset["recordsets"][0]);
                }
                // console.log(recordset["recordsets"][0][0]["id"]);

            });
        });
    }
    else {
        res.redirect("/login");
    }



};
exports.other_product = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset3) {
                        if (err) console.log(err)

                        res.render('other_product', { userData: recordset["recordsets"][0], w_house: recordset2["recordsets"][0], company: recordset3["recordsets"][0] });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.otherproduct = function (req, res) {

    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var invoice = req.query.invoice;
            var p_name1 = req.query.p_name1;
            var p_code = req.query.p_code;
            var category = req.query.category;
            var sub_category = req.query.sub_category;
            var company = req.session.company_id;
            var WareHouse = req.query.WareHouse;
            var retail = req.query.retail;
            // var order = req.query.order1;
            var m_unit = req.query.m_unit;
            var date = req.query.basicFlatpickr;
            var discription = req.query.discription;
            var quati = req.query.quantity;
            var create_date = req.query.create_date;
            // var image = post.image;
            var product = req.query.product;
            var selects = req.query.selects;
            var p_name = req.query.p_name;
            // var name = post.name;



            var arr = JSON.parse(p_name);
            var pro = JSON.parse(product);
            var slo = JSON.parse(selects);
            console.log(arr.length);

            for (var i = 0; i < arr.length; i++) {

                console.log(arr[i]);
                console.log(pro[i]);
                console.log(slo[i]);


            }


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[history_other_product](invoice_no,product_name,product_code,category,sub_category,wareHouse,retail_price,assign_time,quantity,company) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + date + "','" + quati + "','" + company + "')")
            request.query("INSERT INTO [dbo].[history_other_product](invoice_no,product_name,product_code,category,sub_category,wareHouse,retail_price,assign_time,quantity,company) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + date + "','" + quati + "','" + company + "')", function (err, recordset2) {
                if (err) console.log(err);


                console.log("INSERT INTO dbo.add_other_product( invoice_no,product_name, product_code, category, sub_category, wareHouse, retail_price, measurement_unit, valid_date, discription,quantity,company_id) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + quati + "','" + company + "')SELECT SCOPE_IDENTITY() as id")
                request.query("INSERT INTO dbo.add_other_product( invoice_no,product_name, product_code, category, sub_category, wareHouse, retail_price, measurement_unit, valid_date, discription,quantity,company_id) VALUES  ('" + invoice + "','" + p_name1 + "','" + p_code + "','" + category + "','" + sub_category + "','" + WareHouse + "','" + retail + "','" + m_unit + "','" + date + "','" + discription + "','" + quati + "','" + company + "')SELECT SCOPE_IDENTITY() as id", function (err, recordset) {
                    if (err) console.log(err);
                    console.log(recordset["recordsets"][0][0]["id"]);
                    var p_ids = recordset["recordsets"][0][0]["id"];

                    for (var i = 0; i < arr.length; i++) {
                        var namep = arr[i];
                        var prop = pro[i];
                        var slopp = slo[i];
                        console.log("INSERT INTO [bilal erp]..other_sub_product( invoice,product_name, product_no, status,main_product_id,wearhouse_id,company_id) VALUES  ('" + invoice + "','" + namep + "','" + prop + "','" + slopp + "','" + p_ids + "','" + WareHouse + "','" + company + "')");
                        request.query("INSERT INTO [bilal erp]..other_sub_product( invoice,product_name, product_no, status,main_product_id,wearhouse_id,company_id) VALUES  ('" + invoice + "','" + namep + "','" + prop + "','" + slopp + "','" + p_ids + "','" + WareHouse + "','" + company + "')", function (err, recordset2) {
                            if (err) console.log(err);

                        });

                    }
                    res.redirect('/other_product')

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }


};
exports.other_product_issue = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM tyre_issue", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('other_product_issue', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};
exports.other_product_issuence = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;



    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[sub_product]", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_other_product", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset4) {
                            if (err) console.log(err)

                            request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset5) {
                                if (err) console.log(err)

                                request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset6) {
                                    if (err) console.log(err)

                                    res.render('other_product_issuence', { w_house: recordset["recordsets"][0], p_no: recordset2["recordsets"][0], brand: recordset3["recordsets"][0], vehicle_reg: recordset4["recordsets"][0], company: recordset5["recordsets"][0], category: recordset6["recordsets"][0] });

                                });

                            });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};

exports.pro_other = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[other_sub_product] WHERE main_product_id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[other_sub_product] WHERE main_product_id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.check_other_quan = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[add_other_product] WHERE id='" + id + "'")
            request.query("SELECT * FROM [bilal erp].[dbo].[add_other_product] WHERE id='" + id + "'", function (err, recordset) {
                if (err) console.log(err)
                // console.log(recordset)
                console.log(recordset["recordsets"][0][0]["id"]);
                res.json(recordset["recordsets"][0][0]);
            });
        });
    }
    else {
        res.redirect("/login");
    }



};
exports.product_other_issue = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var post = req.query;
            var i_date = post.i_date;
            var v_no = post.v_no;
            var v_type = post.v_type;
            var qty = post.Quatities;
            var remark = post.remark;
            var t_num = post.t_num;
            var t_brand = post.t_brand;
            var WareHouse = post.WareHouse;
            var company = req.session.company_id;



            var main_id = post.main_id;
            var total = post.total;

            var final = total - qty;

            console.log(main_id);
            console.log(total);
            console.log(final);


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[product_other_issue]([i_date],[v_no],[v_type],[qty],[company_id],[warehouse_id],[remark],[t_num],[t_brand])VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + company + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "')")
            request.query("INSERT INTO [dbo].[product_other_issue]([i_date],[v_no],[v_type],[qty],[company_id],[warehouse_id],[remark],[t_num],[t_brand])VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + company + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log("UPDATE [dbo].[add_other_product] SET [quantity]=" + final + " WHERE id = " + main_id + "");
                request.query("UPDATE [dbo].[add_other_product] SET [quantity]=" + final + " WHERE id = " + main_id + "", function (err, recordset1) {
                    if (err) console.log(err)
                    // res.redirect("/other_product_issuence");
                    // console.log(recordset1["rowsAffected"][0]);
                    // if (recordset1["rowsAffected"][0] == 1) {
                    //     console.log("samad")

                    // }



                });


            });
            res.redirect('/other_product_issuence');
        });
    }
    else {
        res.redirect("/login");
    }

};
exports.warehouseTowarehouse = function (req, res) {
    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.id;


            var request = new sql.Request();
            request.query("SELECT * FROM tyre_issue", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('warehouseTowarehouse', { userData: recordset["recordset"] });
            });
        });
    }
    else {
        res.redirect("/login");
    }



};

exports.stock_transfer = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[sub_product]", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_other_product", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset4) {
                            if (err) console.log(err)

                            request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset5) {
                                if (err) console.log(err)

                                request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset6) {
                                    if (err) console.log(err)

                                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_products", function (err, recordset7) {
                                        if (err) console.log(err)


                                        res.render('stock_transfer', { w_house: recordset["recordsets"][0], p_no: recordset2["recordsets"][0], brand: recordset3["recordsets"][0], vehicle_reg: recordset4["recordsets"][0], company: recordset5["recordsets"][0], category: recordset6["recordsets"][0], brand2: recordset7["recordsets"][0] });

                                    });
                                });

                            });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

};
exports.oil_transfer = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var warehouse_id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT * FROM [bilal erp].[dbo].[oil_assign] where company_id = " + company_id + " and warehouse_id=" + warehouse_id + "")
            request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign] where company_id = " + company_id + " and warehouse_id=" + warehouse_id + "", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                // console.log(recordset["recordsets"][0][0]["id"]);
                if (typeof recordset === 'undefined') {
                    res.json("");
                }
                else {
                    res.json(recordset["recordsets"][0]);
                }
            });
        });
    }
    else {
        res.redirect("/login");
    }



};
exports.oil_tranfer_warehouse = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var post = req.query;
            var company_id = post.company_id;
            var wareHouse_id = post.wareHouse_id;
            var t_warehouse = post.t_warehouse;
            var tranfer_Quatities = post.tranfer_Quatities;
            var i_date = post.i_date;




            var main_id = post.main_id;
            var total = post.total;

            var final = total - qty;

            console.log(main_id);
            console.log(total);
            console.log(final);


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[product_other_issue]([i_date],[v_no],[v_type],[qty],[company_id],[warehouse_id],[remark],[t_num],[t_brand])VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + company + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "')")
            request.query("INSERT INTO [dbo].[product_other_issue]([i_date],[v_no],[v_type],[qty],[company_id],[warehouse_id],[remark],[t_num],[t_brand])VALUES ('" + i_date + "','" + v_no + "','" + v_type + "','" + qty + "','" + company + "','" + WareHouse + "','" + remark + "','" + t_num + "','" + t_brand + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log("UPDATE [dbo].[add_other_product] SET [quantity]=" + final + " WHERE id = " + main_id + "");
                request.query("UPDATE [dbo].[add_other_product] SET [quantity]=" + final + " WHERE id = " + main_id + "", function (err, recordset1) {
                    if (err) console.log(err)
                    // res.redirect("/other_product_issuence");
                    // console.log(recordset1["rowsAffected"][0]);
                    // if (recordset1["rowsAffected"][0] == 1) {
                    //     console.log("samad")

                    // }



                });


            });
            res.redirect('/stock_transfer');
        });
    }
    else {
        res.redirect("/login");
    }

};
exports.stock_transfer_oil = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);
            var post = req.query;
            var f_com = req.session.company_id;
            var f_war = post.f_ware;
            var f_prod = post.f_prod;
            var f_qty = post.f_qty;
            var t_com = post.t_com;
            var t_ware = post.t_ware;
            var tdate = post.tdate;
            console.log("trNFEWR" + t_ware);
            console.log("trNFEWR" + tdate);

            var total = post.total;
            var main_id = post.main_id;

            var final = total - f_qty;

            console.log(main_id);
            console.log(total);
            console.log(final);

            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[stock_transfer_oil]([f_com_id],[f_ware_id],[f_product],[f_quantity],[t_com_id],[t_ware_id],[t_date],[status]) VALUES('" + f_com + "','" + f_war + "','" + f_prod + "','" + f_qty + "','" + t_com + "','" + t_ware + "','" + tdate + "','0')")
            request.query("INSERT INTO [dbo].[stock_transfer_oil]([f_com_id],[f_ware_id],[f_product],[f_quantity],[t_com_id],[t_ware_id],[t_date],[status]) VALUES('" + f_com + "','" + f_war + "','" + f_prod + "','" + f_qty + "','" + t_com + "','" + t_ware + "','" + tdate + "','0')", function (err, recordset) {
                if (err) console.log(err)
                // console.log("UPDATE [dbo].[oil_assign] SET [qunatity]=" + final + " WHERE warehouse_id = " + main_id + "");
                // request.query("UPDATE [dbo].[oil_assign] SET [quantity]=" + final + " WHERE warehouse_id = " + main_id + "", function (err, recordset1) {

                //     if (err) console.log(err)

                // });


            });

        });
        res.redirect('/stock_transfer');
    }
    else {
        res.redirect("/login");
    }

};

exports.stock_transfer_tyre = function (req, res) {
    userId = req.session.userId;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);
            var post = req.query;
            var f_com = post.f_com;
            var f_war = post.f_ware;
            var f_prod = post.f_prod;
            var f_brand = post.f_brand;
            var f_sub = post.t_num;
            var t_com = post.t_com;
            var t_ware = post.t_ware;
            var tdate = post.tdate;
            console.log("trNFEWR" + t_ware);
            console.log("trNFEWR" + tdate);
            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[stock_transfer_tyre]([f_com],[f_ware],[f_product],[f_brand],[f_sub],[t_com],[t_ware],[t_date]) VALUES('" + f_com + "','" + f_war + "','" + f_prod + "','" + f_brand + "','" + f_sub + "','" + t_com + "','" + t_ware + "','" + tdate + "')")
            request.query("INSERT INTO [dbo].[stock_transfer_tyre]([f_com],[f_ware],[f_product],[f_brand],[f_sub],[t_com],[t_ware],[t_date]) VALUES('" + f_com + "','" + f_war + "','" + f_prod + "','" + f_brand + "','" + f_sub + "','" + t_com + "','" + t_ware + "','" + tdate + "')", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset);
            });

        });
        res.redirect('/stock_transfer');
    }
    else {
        res.redirect("/login");
    }

};

exports.userAssign_company = function (req, res) {

    userId = req.session.userId;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();
            console.log("hamza ")
            request.query('SELECT * FROM [bilal erp].[dbo].[fms_users] ', function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[f_roles]", function (err, recordset2) {
                    if (err) console.log(err)
                    // res.render('role', { data1: recordset["recordsets"][0],data2: recordset2["recordsets"][0] });
                    request.query("SELECT fm.id,fm.username ,cp.id, cp.company_name FROM [bilal erp].[dbo].[user_company_assign] as ca inner join [bilal erp].[dbo].[fms_users] as fm on ca.user_id = fm.id inner join [bilal erp].[dbo].[company] as cp on ca.company_id = cp.id", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM  [bilal erp].[dbo].[company]", function (err, recordset4) {
                            if (err) console.log(err)

                            res.render('userAssign_company', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0], company: recordset4["recordsets"][0] });
                        });
                    });
                });
            });
        });
    }
    else {
        res.redirect("/login");
    }
};
exports.assign_company = function (req, res) {

    var user_id = req.query.user_id;
    var company_id = req.query.company_id;

    var sql = require("mssql");



    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();
        console.log("INSERT INTO [dbo].[user_company_assign]([user_id],[company_id])VALUES ('" + user_id + "' ,'" + company_id + "')");

        request.query("INSERT INTO [dbo].[user_company_assign]([user_id],[company_id])VALUES ('" + user_id + "' ,'" + company_id + "')", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response

            console.log("Submitted.....");

            console.log("[{status:'ok'}]");
            res.json(JSON.parse('{"status":"ok"}'));


        });




    });

};

exports.oil_vehicle_table = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT * FROM [bilal erp].[dbo].[issue_oil_vehicle] where company_id='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                res.render('oil_vehicle_table', { userData: recordset["recordsets"][0] });


            });
        });
    }
    else {
        res.redirect("/login");
    }
};

exports.master_form = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[sub_product]", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_other_product", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset4) {
                            if (err) console.log(err)

                            request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset5) {
                                if (err) console.log(err)

                                request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset6) {
                                    if (err) console.log(err)

                                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_products", function (err, recordset7) {
                                        if (err) console.log(err)


                                        request.query("SELECT * FROM [bilal erp].[dbo].[varitions]", function (err, recordset8) {
                                            if (err) console.log(err)


                                            res.render('master_form', { w_house: recordset["recordsets"][0], p_no: recordset2["recordsets"][0], brand: recordset3["recordsets"][0], vehicle_reg: recordset4["recordsets"][0], company: recordset5["recordsets"][0], category: recordset6["recordsets"][0], brand2: recordset7["recordsets"][0], varii: recordset8["recordsets"][0] });

                                        });

                                    });
                                });

                            });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

}
exports.oil_issue_warehouse = function (req, res) {



    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);

            if (req.method == "POST") {
                var post = req.body;
                var invoice = post.invoice;
                var WareHouse = post.WareHouse;
                var brand_name = post.sub_category;
                var quantity = post.quantity;
                var m_unit = post.m_unit;
                var date = post.basicFlatpickr;
                var discription = post.discription;


                var request = new sql.Request();
                console.log("INSERT INTO [dbo].[oil_assign]([company_id],[warehouse_id],[invoice_no],[brand_name],[quantity],[m_unit],[issued_date],[discription])VALUES ('" + company_id + "','" + WareHouse + "','" + invoice + "','" + brand_name + "','" + quantity + "','" + m_unit + "','" + date + "','" + discription + "')")
                request.query("INSERT INTO [dbo].[oil_assign]([company_id],[warehouse_id],[invoice_no],[brand_name],[quantity],[m_unit],[issued_date],[discription])VALUES ('" + company_id + "','" + WareHouse + "','" + invoice + "','" + brand_name + "','" + quantity + "','" + m_unit + "','" + date + "','" + discription + "')", function (err, recordset) {
                    if (err) console.log(err)
                    console.log("INSERT INTO [dbo].[history_oil_warehouse]([company_id],[warehouse_id],[invoice_no],[brand_name],[quantity],[m_unit],[issued_date],[discription])VALUES ('" + company_id + "','" + WareHouse + "','" + invoice + "','" + brand_name + "','" + quantity + "','" + m_unit + "','" + date + "','" + discription + "')")
                    request.query("INSERT INTO [dbo].[history_oil_warehouse]([company_id],[warehouse_id],[invoice_no],[brand_name],[quantity],[m_unit],[issued_date],[discription])VALUES ('" + company_id + "','" + WareHouse + "','" + invoice + "','" + brand_name + "','" + quantity + "','" + m_unit + "','" + date + "','" + discription + "')", function (err, recordset) {
                        if (err) console.log(err)


                    });

                });
                res.redirect('/master_form');
            }
        });
    }
    else {
        res.redirect("/login");
    }

};



exports.tyre_warehouse = function (req, res) {

    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var invoice = req.query.invoice;
            var WareHouse = req.query.WareHouse;
            var p_name = req.query.p_name;
            var p_code = req.query.p_code;
            var category = req.query.category;
            var brand_name = req.query.brand_name;
            var isue_date = req.query.isue_date;
            var discription = req.query.discription;
            var product = req.query.product;
            var pro_name = req.query.pro_name;

            var arr = JSON.parse(pro_name);
            var pro = JSON.parse(product);
            console.log(arr.length);

            for (var i = 0; i < arr.length; i++) {

                console.log(arr[i]);
                console.log(pro[i]);


            }


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[history_products]([invoice_no],[product_name],[product_code],[category],[sub_category],[company],[wareHouse],[assign_time],[discription]) VALUES  ('" + invoice + "','" + p_name + "','" + p_code + "','" + category + "','" + brand_name + "','" + company_id + "','" + WareHouse + "','" + isue_date + "','" + discription + "')")
            request.query("INSERT INTO [dbo].[history_products]([invoice_no],[product_name],[product_code],[category],[sub_category],[company],[wareHouse],[assign_time],[discription]) VALUES  ('" + invoice + "','" + p_name + "','" + p_code + "','" + category + "','" + brand_name + "','" + company_id + "','" + WareHouse + "','" + isue_date + "','" + discription + "')", function (err, recordset2) {
                if (err) console.log(err);


                console.log("INSERT INTO [dbo].[add_products]([invoice_no],[product_name],[product_code],[category],[sub_category],[company_id],[wareHouse],[valid_date],[discription]) VALUES  ('" + invoice + "','" + p_name + "','" + p_code + "','" + category + "','" + brand_name + "','" + company_id + "','" + WareHouse + "','" + isue_date + "','" + discription + "')SELECT SCOPE_IDENTITY() as id")
                request.query("INSERT INTO [dbo].[add_products]([invoice_no],[product_name],[product_code],[category],[sub_category],[company_id],[wareHouse],[valid_date],[discription]) VALUES  ('" + invoice + "','" + p_name + "','" + p_code + "','" + category + "','" + brand_name + "','" + company_id + "','" + WareHouse + "','" + isue_date + "','" + discription + "')SELECT SCOPE_IDENTITY() as id", function (err, recordset) {
                    if (err) console.log(err);
                    console.log(recordset["recordsets"][0][0]["id"]);
                    var p_ids = recordset["recordsets"][0][0]["id"];

                    for (var i = 0; i < arr.length; i++) {
                        var namep = arr[i];
                        var prop = pro[i];
                        console.log("INSERT INTO [bilal erp]..sub_product( product_name,product_no,main_product_id,wearhouse_id,company_id) VALUES  ('" + namep + "','" + prop + "','" + p_ids + "','" + WareHouse + "','" + company_id + "')");
                        request.query("INSERT INTO [bilal erp]..sub_product( product_name,product_no,main_product_id,wearhouse_id,company_id) VALUES  ('" + namep + "','" + prop + "','" + p_ids + "','" + WareHouse + "','" + company_id + "')", function (err, recordset2) {
                            if (err) console.log(err);

                        });

                    }

                });
            });
            res.redirect('/master_form')
        });
    }
    else {
        res.redirect("/login");
    }


};

exports.others_product_warehouse = function (req, res) {

    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var invoices = req.query.invoices;
            var WareHouses = req.query.WareHouses;
            var invoice_date = req.query.invoice_date;
            var invoice_price = req.query.invoice_price;
            var discriptions = req.query.discriptions;

            var items = req.query.items;
            var quantities = req.query.quantities;

            var arr = JSON.parse(quantities);
            var pro = JSON.parse(items);
            console.log(arr.length);

            for (var i = 0; i < arr.length; i++) {

                console.log(arr[i]);
                console.log(pro[i]);


            }


            var request = new sql.Request();
            console.log("INSERT INTO [dbo].[history_other_product]([invoice_no],[company],[wareHouse],[invoice_date],[invoice_price],[discriptions]) VALUES  ('" + invoices + "','" + company_id + "','" + WareHouses + "','" + invoice_date + "','" + invoice_price + "','" + discriptions + "')")
            request.query("INSERT INTO [dbo].[history_other_product]([invoice_no],[company],[wareHouse],[invoice_date],[invoice_price],[discriptions]) VALUES  ('" + invoices + "','" + company_id + "','" + WareHouses + "','" + invoice_date + "','" + invoice_price + "','" + discriptions + "')", function (err, recordset2) {
                if (err) console.log(err);


                console.log("INSERT INTO [dbo].[add_other_product]([invoice_no],[company_id],[wareHouse],[discription],[invoice_date],[invoice_price]) VALUES  ('" + invoices + "','" + company_id + "','" + WareHouses + "','" + discriptions + "','" + invoice_date + "','" + invoice_price + "')SELECT SCOPE_IDENTITY() as id")
                request.query("INSERT INTO [dbo].[add_other_product]([invoice_no],[company_id],[wareHouse],[discription],[invoice_date],[invoice_price]) VALUES  ('" + invoices + "','" + company_id + "','" + WareHouses + "','" + discriptions + "','" + invoice_date + "','" + invoice_price + "')SELECT SCOPE_IDENTITY() as id", function (err, recordset) {
                    if (err) console.log(err);
                    console.log(recordset["recordsets"][0][0]["id"]);
                    var p_ids = recordset["recordsets"][0][0]["id"];

                    for (var i = 0; i < arr.length; i++) {
                        var o_quan = arr[i];
                        var o_items = pro[i];
                        console.log("INSERT INTO [dbo].[other_sub_product]([invoice],[product_name],[main_product_id],[wearhouse_id],[company_id],[quantity]) VALUES  ('" + invoices + "','" + o_items + "','" + p_ids + "','" + WareHouses + "','" + company_id + "','" + o_quan + "')");
                        request.query("INSERT INTO [dbo].[other_sub_product]([invoice],[product_name],[main_product_id],[wearhouse_id],[company_id],[quantity]) VALUES  ('" + invoices + "','" + o_items + "','" + p_ids + "','" + WareHouses + "','" + company_id + "','" + o_quan + "')", function (err, recordset2) {
                            if (err) console.log(err);

                        });

                    }

                });
            });
            res.redirect('/master_form')
        });
    }
    else {
        res.redirect("/login");
    }


};

exports.stock_in = function (req, res) {

    userId = req.session.userId;
    company_id = req.session.company_id;


    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();
            console.log("hamza ")

            console.log("SELECT st.id,st.f_quantity,st.f_product,st.t_date,st.status,cp.company_name,wh.name FROM [bilal erp].[dbo].[stock_transfer_oil] as st inner join [bilal erp].[dbo].[company] as cp on st.f_com_id = cp.id inner join [bilal erp].[dbo].[w_house] as wh on st.f_ware_id = wh.id where t_com_id = '" + company_id + "' and status = '0' ")
            request.query("SELECT st.id,st.f_quantity,st.f_product,st.t_date,st.status,cp.company_name,wh.name FROM [bilal erp].[dbo].[stock_transfer_oil] as st inner join [bilal erp].[dbo].[company] as cp on st.f_com_id = cp.id inner join [bilal erp].[dbo].[w_house] as wh on st.f_ware_id = wh.id where t_com_id = '" + company_id + "' and status = '0' ", function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset["recordsets"][0])
                res.render('stock_in', { data3: recordset["recordsets"][0] });
            });
        });

    }
    else {
        res.redirect("/login");
    }
};
exports.update_status = function (req, res) {

    userId = req.session.userId;
    company_id = req.session.company_id;
    // connect to your database


    if (userId != null) {
        var sql = require("mssql");
        sql.connect(config, function (err) {

            if (err) console.log(err);


            var id = req.id


            var request = new sql.Request();

            console.log("SELECT * FROM [bilal erp].[dbo].[stock_transfer_oil] where id=" + id + "");
            request.query("SELECT * FROM [bilal erp].[dbo].[stock_transfer_oil] where id=" + id + "", function (err, recordset) {
                if (err) console.log(err);
                console.log(recordset["recordsets"][0][0]["id"]);
                var update_status = recordset["recordsets"][0][0]["id"];
                var trans_company = recordset["recordsets"][0][0]["f_com_id"];
                var trans_warehouse = recordset["recordsets"][0][0]["f_ware_id"];
                var trans_quantity = recordset["recordsets"][0][0]["f_quantity"];
                var recive_company = recordset["recordsets"][0][0]["t_com_id"];
                var recive_warehouse = recordset["recordsets"][0][0]["t_com_id"];
                console.log(recordset["recordsets"][0])


                request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign] where company_id=" + trans_company + " and warehouse_id=" + trans_warehouse + "", function (err, recordset2) {
                    if (err) console.log(err);

                    console.log(recordset2["recordsets"][0])

                    // var total_sender_id = recordset2["recordsets"][0][0]['id'];
                    var total_sender_quantity = recordset2["recordsets"][0][0]['quantity'];
                    var sender_remaining = total_sender_quantity - trans_quantity;
                    console.log("Hamza " + sender_remaining);
                    console.log("SELECT * FROM [bilal erp].[dbo].[oil_assign] where company_id=" + recive_company + " and warehouse_id=" + recive_warehouse + "")
                    request.query("SELECT * FROM [bilal erp].[dbo].[oil_assign] where company_id=" + recive_company + " and warehouse_id=" + recive_warehouse + "", function (err, recordset3) {
                        if (err) console.log(err);

                        console.log(recordset3["recordsets"][0])

                        // var recive_id = recordset3["recordsets"][0][0]['id'];
                        var recive_quantity = recordset3["recordsets"][0][0]['quantity'];
                        var total_recive_oil_quantity = Number(recive_quantity) + Number(trans_quantity);

                        console.log(total_recive_oil_quantity)

                        request.query("UPDATE [dbo].[oil_assign] SET [quantity] = '" + total_recive_oil_quantity + "' WHERE company_id=" + recive_company + " and warehouse_id=" + recive_warehouse + "", function (err, recordset4) {
                            if (err) console.log(err);

                            console.log("UPDATE [dbo].[oil_assign] SET [quantity] = '" + sender_remaining + "' WHERE company_id=" + trans_company + " and warehouse_id=" + trans_warehouse + "")
                            request.query("UPDATE [dbo].[oil_assign] SET [quantity] = '" + sender_remaining + "' WHERE company_id=" + trans_company + " and warehouse_id=" + trans_warehouse + "", function (err, recordset5) {
                                if (err) console.log(err);
                                request.query("UPDATE [dbo].[stock_transfer_oil] SET [status] = '1' where id=" + update_status + "", function (err, recordset6) {
                                    if (err) console.log(err);
                                });
                            });

                        });


                    });


                });



            });
            res.redirect('/stock_in')
        });
    }
    else {
        res.redirect("/login");
    }


};

exports.master_issuence_form = function (req, res) {
    userId = req.session.userId;
    company_id = req.session.company_id;

    // connect to your database


    if (userId != null) {
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);


            var request = new sql.Request();

            request.query("SELECT wh.id,wh.name FROM [bilal erp].[dbo].[wearhouse_company] as ca inner join [bilal erp].[dbo].[w_house] as wh on ca.wearhouse_id=wh.id where ca.company_id ='" + company_id + "'", function (err, recordset) {
                if (err) console.log(err)

                request.query("SELECT * FROM [bilal erp].[dbo].[sub_product]", function (err, recordset2) {
                    if (err) console.log(err)

                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_other_product", function (err, recordset3) {
                        if (err) console.log(err)

                        request.query("SELECT * FROM [bilal erp].[dbo].[vehicle_reg]", function (err, recordset4) {
                            if (err) console.log(err)

                            request.query("SELECT * FROM [bilal erp].[dbo].[company]", function (err, recordset5) {
                                if (err) console.log(err)

                                request.query("SELECT * FROM [bilal erp].[dbo].[categories]", function (err, recordset6) {
                                    if (err) console.log(err)

                                    request.query("SELECT DISTINCT sub_category,id FROM [bilal erp]..add_products", function (err, recordset7) {
                                        if (err) console.log(err)


                                        request.query("SELECT * FROM [bilal erp].[dbo].[varitions]", function (err, recordset8) {
                                            if (err) console.log(err)


                                            res.render('master_issuence_form', { w_house: recordset["recordsets"][0], p_no: recordset2["recordsets"][0], brand: recordset3["recordsets"][0], vehicle_reg: recordset4["recordsets"][0], company: recordset5["recordsets"][0], category: recordset6["recordsets"][0], brand2: recordset7["recordsets"][0], varii: recordset8["recordsets"][0] });

                                        });

                                    });
                                });

                            });

                        });

                    });

                });
            });
        });
    }
    else {
        res.redirect("/login");
    }

}

exports.calculate_hour = function (req, res) {
    
        var sql = require("mssql");


        sql.connect(config, function (err) {

            if (err) console.log(err);
            var id = req.query.id;


            var request = new sql.Request();
            console.log("SELECT vr.id as v_id,vr.v_type,vr.v_no,do.date,do.total_run FROM [bilal erp].[dbo].[vehicle_reg] as vr inner join [bilal erp].[dbo].[daily_odo] as do on vr.[v_no]=do.veh_id where vr.id=" + id + "")
            request.query("SELECT vr.id as v_id,vr.v_type,vr.v_no,do.date,do.total_run FROM [bilal erp].[dbo].[vehicle_reg] as vr inner join [bilal erp].[dbo].[daily_odo] as do on vr.[v_no]=do.veh_id where vr.id=" + id + "", function (err, recordset) {
                if (err) console.log(err)
                // console.log(recordset)
                console.log(recordset["recordsets"][0][0]);
                res.send(recordset["recordsets"][0]);
            });
        });
    



};