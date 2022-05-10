//Department page function declaration
const Department = {
  getDepartmentList : function(){
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    var result;
    $.ajax({
        url: API_ENDPOINT + "department/getDepartmentList.php",
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
  $('#example').DataTable({
    responsive: false,

    // DOM Layout settings
    dom: `<'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

    lengthMenu: [5, 10, 25, 50],

    pageLength: 50,

    language: {
      'lengthMenu': 'Display _MENU_',
    },

    // Order settings
    order: [
      [6, 'desc']
    ],
    // order: [[5, 'asc']],

    columnDefs: [],

    "footerCallback": function (row, data, start, end, display) {
      var totalAmount = 0;
      for (var i = 0; i < data.length; i++) {
        totalAmount += parseFloat(data[i][2]);
      }
      totalAmount = totalAmount.toFixed(2);

      var api = this.api();
      $(api.column(2).footer()).html(totalAmount);
    },

    // "drawCallback": function (settings) {
    //   table.wrap("<div class='table-responsive'></div>");
    // },
    "initComplete": function () {
      $("#kt_datatable").css('display', 'table');
      $("#loading2").fadeOut();
    }
  });

  
  Department.getDepartmentList();
  $("#addForm").change();
  $("#addBtn").on("click", function(){

    window.parent.$('#addForm').modal('show');
  })
});
