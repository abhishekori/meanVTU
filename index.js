'use strict';
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();


var url="http://results.vtu.ac.in/results/result_page.php?usn=1ds13me010";

request(url, function (error, response, html) {
    if(!error){
        var $ = cheerio.load(html);
        //var resHtml =$.html();
        //var td = $('td');
        //var v1 = td[6].next;
        var student={};
        student['name']=$('td')[3].children[0].next.data;
        student['sem']=$('div')[17].children[0].next.data;
        var result=[];
        var subject={};

        for(var i=0;i<7;i++){


            subject['code']=$('td')[4].children[0].data;
            subject['subject']=$('td')[5].children[0].data;
            subject['internal']=$('td')[6].children[0].data;
            subject['external']=$('td')[7].children[0].data;
            subject['total']=$('td')[8].children[0].data;
            subject['result']=$('td')[9].children[0].data;
            result.push(subject)
            console.log(result)

        }

    }
});
//app.get("/scrape",function(req,res){
//
//
//
//});

//app.listen(3000, function () {
//
//    console.log("running")
//});