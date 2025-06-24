const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongodb")
const carParkingCollection= require("./mongodb1")
const carParkingCollectioncar= require("./mongodb4")
const carpoolRequestCollection= require("./mongodb2")
const carpoolAddinCollection = require("./mongodb3")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.static('images'))
app.use(express.static('templates'))




const bodyParser = require('body-parser');



// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))
app.use(express.static(__dirname + '/images'));

// hbs.registerPartials(partialPath)

const {engine} = require('express-handlebars')
app.engine('.hbs',engine({
    extname:'.hbs',
    defaultLayout:false,
    layoutsDir:'templates'
}))

app.set('view engine','hbs')

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('entrypage')
})

app.get('/entrypage', (req, res) => {
    res.render('entrypage')
})
app.get('/aboutN', (req, res) => {
    res.render('aboutN')
})
app.get('/contactN', (req, res) => {
    res.render('contactN')
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/adminlogin', (req, res) => {
    res.render('adminlogin')
})


app.post('/adminlogin', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ uid: req.body.uid })

        if (check.password === req.body.password) {
            res.status(201).render("adminhome", {
                username: req.body.uid
            })
        }

        else {
            res.send("incorrect password")
        }

    } 
    catch (e) {

        res.send("wrong details")
        res.send("error is: " + e)
    }

    const username=req.body.uid;

    app.get('/adminhome', async (req, res) => {
        res.status(201).render("adminhome", {
            username: username
        }) 
    })

    app.get('/adminfindAspot', async (req, res) => {
        const checks = await carParkingCollection.find({}).lean();
        res.status(201).render("adminfindAspot", {
            username: username,checks:checks
        }) 
    })

    app.get('/adminfindAspotcar', async (req, res) => {
        const checks = await carParkingCollectioncar.find({}).lean();
        res.status(201).render("adminfindAspotcar", {
            username: username,checks:checks
        }) 
    })

    app.get('/admincontactDriver', (req, res) => {
        res.status(201).render("admincontactDriver", {
            username: username
        }) 
    })

    app.get('/adminprofile', async (req, res) => {
        try {
            console.log(username);
            const checks3 = await LogInCollection.findOne({ uid: "admin" })
            const checks4 = await carParkingCollection.find({}).lean();
            const checks5 = await carParkingCollectioncar.find({}).lean();
            res.status(201).render("adminprofile", { username: username, checks3:checks3,checks4:checks4,checks5:checks5});
        } catch (e) {
            res.status(500).send("Error: " + e);
        }
    })

    app.get('/adminabout', (req, res) => {
        res.status(201).render("adminabout", {
            username: username
        }) 
    })

    app.get('/admincontact', (req, res) => {
        res.status(201).render("admincontact", {
            username: username
        }) 
    })


})

    
    






app.post('/signup', async (req, res) => {
   
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        uid: req.body.uid, 
        reg:req.body.reg,
        phone: req.body.phone,
        branch: req.body.branch,
        gradyear: req.body.gradyear, 
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ uid: req.body.uid })

    try {
        if (checking) {
           
            res.send("User details already exist")
        } else {
           
            await LogInCollection.create([data])
        }
    } catch (err) {
        
        res.send("Error: " + err)
    }
   
    res.status(201).render("login")
})


app.post('/login', async (req, res) => {
    const username=req.body.uid;

    try {
        const check = await LogInCollection.findOne({ uid: req.body.uid })
     

        if (check.password === req.body.password) {
                res.status(201).render("home", {
                    username: req.body.uid
                })
        }
        

        else {
            res.send("incorrect password")
        }

    } 
    catch (e) {

        res.send("wrong details")
        res.send("error is: " + e)
    }



    app.get('/home', async (req, res) => {
        res.status(201).render("home", {
            username: username
        }) 
    })

    app.get('/findAspot', async (req, res) => {
        const checks = await carParkingCollection.find({}).lean();
        console.log("username: "+ username);
        res.status(201).render("findAspot", {
            username: username,checks:checks
        }) 
    })
    app.get('/findAspotCar', async (req, res) => {
        const checks = await carParkingCollectioncar.find({}).lean();
        res.status(201).render("findAspotCar", {
            username: username,checks:checks
        }) 
    })
    app.get('/contactDriver', (req, res) => {
        res.status(201).render("contactDriver", {
            username: username
        }) 
    })


    app.get('/profile', async (req, res) => {
        try {
            console.log(username);
            const checks3 = await LogInCollection.find({ uid:username }).lean();
            const checks4 = await carParkingCollection.find({ user:username }).lean();
            const checks5 = await carParkingCollectioncar.find({ user:username }).lean();
            res.status(201).render("profile", { username: username, checks3:checks3[0],checks4:checks4,checks5:checks5});
        } catch (e) {
            res.status(500).send("Error: " + e);
        }
    })

    app.get('/carpool', async (req, res) => {
        try {
            
            const checks3 = await carpoolAddinCollection.find({ useruseruser:username }).lean();
            console.log(checks3.lastname);
            const checks4 = await carpoolRequestCollection.find({ user:username }).lean();
            const checks = await carpoolRequestCollection.find({}).lean();
            const checks2 = await carpoolAddinCollection.find({}).lean();
            res.status(201).render("carpool", { username: username, checks:checks,checks2:checks2,checks3:checks3,checks4:checks4 });
        } catch (e) {
            res.status(500).send("Error: " + e);
        }
    })

    app.get('/about', (req, res) => {
        res.status(201).render("about", {
            username: username
        }) 
    })

    app.get('/contact', (req, res) => {
        res.status(201).render("contact", {
            username: username
        }) 
    })
    
})

app.delete('/deleteRow/:id', async (req, res) => {
    try {
        const result = await carpoolAddinCollection.deleteOne({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/deleteRow1/:id', async (req, res) => {
    try {
        const result = await carpoolRequestCollection.deleteOne({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/deleteRow2/:id', async (req, res) => {
    try {
        const result = await carParkingCollection.deleteOne({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/deleteRow3/:id', async (req, res) => {
    try {
        const result = await carParkingCollectioncar.deleteOne({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/admincontactDriver', async (req, res) => {
    try {

      
        const checks = await LogInCollection.findOne({ $or: [{ reg: req.body.val }, { uid: req.body.val }] });

        if (checks) {
            const { firstname, lastname, branch, gradyear, phone } = checks;

            res.status(201).render("admincontactDriver", {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                branch: branch,
                gradyear: gradyear,
            });

        } else {
            res.send("Driver not found");
        }
    } catch (e) {
        res.send("Wrong details. Error: " + e);
    }
});



app.post('/contactDriver', async (req, res) => {
    try {

      
        const checks = await LogInCollection.findOne({ $or: [{ reg: req.body.val }, { uid: req.body.val }] });

        if (checks) {
            const { firstname, lastname, branch, gradyear, phone } = checks;

            res.status(201).render("contactDriver", {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                branch: branch,
                gradyear: gradyear,
            });

        } else {
            res.send("Driver not found");
        }
    } catch (e) {
        res.send("Wrong details. Error: " + e);
    }
});

app.post('/contactDriver2', async (req, res) => {
    try {

      const username=req.body.usera;
        const checks = await LogInCollection.findOne({ $or: [{ reg: req.body.val }, { uid: req.body.val }] });

        if (checks) {
            const { firstname, lastname, branch, gradyear, phone } = checks;

            res.status(201).render("contactDriver", {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                branch: branch,
                gradyear: gradyear,
                username:username
            });

        } else {
            res.send("Driver not found");
        }
    } catch (e) {
        res.send("Wrong details. Error: " + e);
    }
});



app.post('/adminscooterspotBook', async (req, res) => {
    
    const data = {
        spot:req.body.spot,
        user:req.body.user1
    }

    await carParkingCollectioncar.create([data])
    res.send("jhgjg");
})


app.post('/adminscooterspot', async (req, res) => {
    
    const reg=req.body.reg;
    const spot=req.body.spot;
    const details = await LogInCollection.findOne({  reg: reg  });
    const checks = await carParkingCollection.find({}).lean();
 
    console.log("here" + details); console.log("here: " + spot);
    
    const data = {
        spot:spot,
        user:details.uid
    }

    await carParkingCollection.create([data])
    res.redirect('/adminfindAspot');
      

})

app.post('/admincarspot', async (req, res) => {
    
    const reg=req.body.reg;
    const spot=req.body.spot;
    const details = await LogInCollection.findOne({  reg: reg  });
    const checks = await carParkingCollectioncar.find({}).lean();
 
    console.log("herehkhjdjsfh: " + details); console.log("here: " + spot);
    
    const data = {
        spot:spot,
        user:details.uid
    }

    await carParkingCollectioncar.create([data])
    res.redirect('/adminfindAspotcar');
      

})

app.post('/findAspotcarcar', async (req, res) => {


   
    const data = {
        spot:req.body.spot,
        user:req.body.user
    }

    await carParkingCollectioncar.create([data])
    res.redirect('/findAspotCar');
       
})


app.post('/findAspotcar', async (req, res) => {


   
    const data = {
        spot:req.body.spot,
        user:req.body.user
    }

    await carParkingCollection.create([data])
    res.redirect('/findAspot');
       
})

app.post('/carpoolRequest', async (req, res) => {
   
    const data = {
        user:req.body.user,
        stop:req.body.stop,
        time:req.body.time
    }

    await carpoolRequestCollection.create([data])
    res.redirect('/carpool');

       
})

app.post('/contactD', async (req, res) => {
    const username=req.body.usera;
    const val=req.body.uid;
    res.status(201).render("contactDriver2", { username: username, val:val });
});


app.post('/carpoolAddin', async (req, res) => {

        
        const data = {
            useruseruser:req.body.useruseruser,
            availability:req.body.availability,
            destinationStart:req.body.destinationStart,
            timing:req.body.timing,
            specificStops:req.body.specificStops
        }
    
        await carpoolAddinCollection.create([data])
        res.redirect('/carpool');

      
})




app.listen(port, () => {
    console.log('port connected');
})