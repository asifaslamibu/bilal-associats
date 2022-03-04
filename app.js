const express = require('express')
, routes = require('./routes')
, user = require('./routes/user');

const app = express();
const session = require('express-session');
const http = require('https').Server(app);

let bodyParser = require("body-parser");
const { dirname } = require('path');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.param('id', function(req, res, next, name) {
    req.id = name;
    next();
  });

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100*3600000 }
  }))
  
 
  

  app.get('/', routes.index);//call for main index page
  // app.get('/signup', user.signup);//call for signup page
  // app.post('/signup', user.signup);//call for signup post 
  app.get('/login', routes.index);//call for login page
  app.post('/login', user.login2);//call for login post
  // app.get('/home/logout', user.logout);//call for logout
  app.post("/myaction", function(request, response) {
    console.log("Gender is:", request.body.gender);
    response.sendStatus(200)
});
// app.get('/login', user.login);//call for login post


app.get('/report',user.report);// to render Create Station
app.get('/dash',user.dash);// to render Create Station
app.get('/dashboard/:id', user.dashboard);
app.get('/logout', user.logout);//call for logout
app.get('/manage_roles', user.manage_roles);
app.get('/createRole', user.createRole);
app.get('/assign_role', user.assign_role);
app.get('/nav',user.userlist2);
app.get('/add_product', user.add_product);
app.get('/warehouse', user.warehouse);
app.post('/create_house', user.create_house);
app.get('/category', user.category);
app.post('/create_category', user.create_category);
app.get('/tdelete8/:id', user.tdelete8);
app.get('/addproduct', user.addproduct);
app.get('/t_oil', user.t_oil);
app.get('/oil_vehicle_table', user.oil_vehicle_table);
app.get('/warehouse_oil', user.warehouse_oil);
app.get('/add_oil', user.add_oil);
app.post('/add_oil', user.addoil);
app.get('/vehicle_reg', user.vehicle_reg);
app.post('/create_vehicle_reg', user.create_vehicle_reg);
app.get('/tdelete/:id', user.tdelete);
app.get('/edit_vehicle/:id', user.edit_vehicle);
app.post('/update_vehicle/:id', user.update_vehicle);
app.get('/oilAssign', user.oilAssign);
app.get('/checkquan', user.checkquan);
app.get('/oilissued', user.oilissued);
app.get('/oil_issue', user.oil_issue);
app.get('/oil_toVehicle', user.oil_toVehicle);
app.get('/oil_to_vehi', user.oil_to_vehi);
app.get('/tyre_issue_table', user.tyre_issue_table);
app.get('/tyre_issue', user.tyre_issue);
app.get('/check_tyre_quan', user.check_tyre_quan);
app.get('/t_num', user.t_num);
app.get('/create_tyre_issue', user.create_tyre_issue);
app.get('/users', user.users);
app.post('/add_users', user.add_users);
app.get('/oil_report', user.oil_report);
app.get('/oil_warehouse', user.oil_warehouse);
app.get('/oil_purchase', user.oil_purchase);
app.get('/oil_purchase_get', user.oil_purchase_get);
app.get('/oil_vehicle_rep', user.oil_vehicle_rep);
// app.get('/oil_vehicle_report', user.oil_vehicle_report);
app.get('/create_company', user.create_company);
app.get('/wearhouseAssign_company', user.wearhouseAssign_company);
app.post('/add_company', user.add_company);
app.get('/comp_wearhouse', user.comp_wearhouse);
app.get('/other_product', user.other_product);
app.get('/otherproduct', user.otherproduct);
app.get('/other_product_issue', user.other_product_issue);
app.get('/other_product_issuence', user.other_product_issuence);
app.get('/pro_other', user.pro_other);
app.get('/check_other_quan', user.check_other_quan);
app.get('/product_other_issue', user.product_other_issue);
app.get('/warehouseTowarehouse', user.warehouseTowarehouse);
app.get('/stock_transfer', user.stock_transfer);
app.get('/oil_transfer', user.oil_transfer);
app.get('/oil_tranfer_warehouse', user.oil_tranfer_warehouse);
app.get('/st_tr_oil', user.stock_transfer_oil);
app.get('/st_tr_tyre', user.stock_transfer_tyre);
app.get('/userAssign_company', user.userAssign_company);
app.get('/assign_company', user.assign_company);
app.get('/master_form', user.master_form);
app.post('/oil_issue_warehouse', user.oil_issue_warehouse);
app.get('/tyre_warehouse', user.tyre_warehouse);
app.get('/others_product_warehouse', user.others_product_warehouse);
app.get('/stock_in', user.stock_in);
app.get('/update_status/:id', user.update_status);
app.get('/master_issuence_form', user.master_issuence_form);
app.get('/calculate_hour', user.calculate_hour);














app.listen(3003, function() {
    console.log('listening on 3003')
})