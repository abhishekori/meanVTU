/**
 * Created by abhishek on 29/7/17.
 */
var app = angular.module('myApp',[]);
app.controller('mainCtrl', function ($scope,$http) {

    var usn;
    var student=[];
    $scope.marks=[];
    $scope.o_status=true;

        $scope.get= function () {
        usn=$scope.i_usn;

        $http.get("http://localhost:3000/scrape/"+usn).then(function (response) {
            var result=response;
            console.log(response);

            if(result.data.status){
                console.log(result.data.marks);
                $scope.marks=result.data.marks;
                $scope.o_name=result.data.name;
                $scope.o_sem=result.data.sem;
                $scope.o_total=result.data.total_marks;
                $scope.o_final_result=result.data.result;
                $scope.o_status=false;
            }else{
                $scope.o_status_display="Sorry no result present"
                $scope.o_status=true;
            }
        });

    }


});