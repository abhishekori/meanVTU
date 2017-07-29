'use strict';
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
app.get("/scrape/:usn",function(req,res){
    console.log(req.params['usn']);
    var usn=req.params['usn'];
    var url="http://results.vtu.ac.in/results17/result_page.php?usn="+usn;
    var result=[];
    var student={};
    request(url, function (error, response, html) {
        if(!error){
            var $ = cheerio.load(html);

            if($('script').length==2){
                var td =$('td');
                student['status']=true;
                student['name']=td[3].children[0].next.data;
                student['usn']=usn;
                student['sem']=$('div')[17].children[0].children[0].data;
                var subject={};


                for(var i=4;i<40;i=i+6){
                    ////var a =td[i].children[0].data
                    //console.log(td[i].children[0].data);
                    //console.log(td[i+1].children[0].data);
                    //console.log(td[i+2].children[0].data);
                    //console.log(td[i+3].children[0].data);
                    //console.log(td[i+4].children[0].data);
                    //console.log(td[i+5].children[0].data);
                    //console.log("\n\n")


                        subject['code']=td[i].children[0].data;
                        subject['subject']=td[(i+1)].children[0].data;
                        subject['internal']=td[(i+2)].children[0].data;
                        subject['external']=td[(i+3)].children[0].data;
                        subject['total']=td[(i+4)].children[0].data;
                        subject['result']=td[(i+5)].children[0].data;
                        result.push(subject);
                        subject={};
                }
                console.log(td[41].children[0].children[0].data)

                student['marks']=result;
                var len=(td[41].children[0].children[0].data).length;
                student['total_marks']=(td[41].children[0].children[0].data).substring(2,len);
                len =(td[43].children[0].children[0].data).length;
                student['result']=(td[43].children[0].children[0].data).substring(2,len);

            }else{
                student['status']=false;
            }
            console.log(student)

        }
        res.json(student)
    });

});


app.listen(3000, function () {

    console.log("running")
});