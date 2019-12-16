var fs = require('fs');
var parse = require('csv-parse');

var inputFile='Sacramentorealestatetransactions.csv';
console.log("Processing Countries file");

var parser = parse({delimiter: ';'}, function (err, data) {
    // when all countries are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    data.forEach(function(line) {
      // create country object out of parsed fields
      var country = { "street" : line[0]
                    , "city" : line[1]
                    , "zip" : line[2]
                    , "state" : line[4]
                    , "beds" : line[5]
                    };
     console.log(JSON.stringify(country));
    });
});


// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);

var nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhi27netam@gmail.com',
    pass: '***********'
  }
});

var mailOptions = {
   from: 'abhi27netm@gmail.com',
   to: 'abhi27netam@gmail.com, abhimanyu.netam27@gmail.com',
   subject: 'Sending Email using Node.js',
   html: '<h1>Welcome</h1><p>My first Node.js Script</p>' ,
   attachments: [{
       filename: 'Sacramentorealestatetransactions.csv',
       path: 'F:/Aptos Task/Sacramentorealestatetransactions.csv'
       
   }]
}

mail.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});
