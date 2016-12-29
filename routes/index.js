var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path')
var util = require('util');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getFileList(){

    var testFolder = global.appRoot+'/public/source';
    var fileslist = []
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            fileslist.push(file);
        });

        var xmls = {};
        var i = 0;
        for(file in fileslist){
            var file_path = testFolder+'/'+fileslist[file];
            var content = fs.readFileSync(file_path,'utf-8');

            if(path.extname(fileslist[file])=='.xml'){
                i++;
                var base = path.basename(fileslist[file]);
                parts = base.split(".");
                base = parts[0];
                pics = [];
                for(pic in fileslist){
                    if (fileslist[pic].indexOf(base) !== -1 && path.extname(fileslist[pic])!=='.xml'){
                        pics.push(fileslist[pic]);
                    }
                };
                xmls[i] = {xml: fileslist[file], content: content, pic: pics};
            };

        };

        global.file_list = xmls;

    });

};

getFileList();


router.get('/get_file_list', function(req, res, next) {
  res.send(global.file_list);
});


router.get('/move/:act/:id', function(req, res, next) {
moveFile(global.file_list[req.params.id]['xml'],req.params.act)


 for(p in global.file_list[req.params.id]['pic']){
    moveFile(global.file_list[req.params.id]['pic'][p],req.params.act)
 };

  res.send(global.file_list[req.params.id]);
});


function moveFile(name,act){

    if(act=='y'){
        var dest = global.appRoot+'/public/yes/';
    } else {
        var dest = global.appRoot+'/public/no/';
    };

    var souce = global.appRoot+'/public/source/'+name;
    var dest = dest+name;
    var is = fs.createReadStream(souce)
    var os = fs.createWriteStream(dest);

        util.pump(is, os, function() {
            fs.unlinkSync(souce);
        });

};

module.exports = router;
