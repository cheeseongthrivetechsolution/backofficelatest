//Department page function declaration
const Department = {
  getDepartmentList : function(){
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    var result;
    $.ajax({
        url: config.apiUrl + "department/getDepartmentList.php",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200) {
              // Department.drawTable(data.row);

               console.log(data.row);
              $("#example tbody").append(function() {


              });
            }
        },
        error: function(data) {
          console.log(data);
        }
    });
  }
}



$(function() {
  var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#daterangepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#daterangepicker').daterangepicker({
      locale: zh_daterangepicker,
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);


  // Department.getDepartmentList();
  $("#addForm").change();
  $("#addBtn").on("click", function(){

    window.parent.$('#addForm').modal('show');
  })
});
