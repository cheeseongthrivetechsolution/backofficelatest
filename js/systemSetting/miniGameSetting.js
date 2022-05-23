$(function() {
    $('#miniGameTable').dataTable({
        dom: `<'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        language: {
            'paginate': {
                'previous': '<span class="prev-icon"><</span>',
                'next': '<span class="next-icon">></span>'
                
              },
              "lengthMenu": 'Display _MENU_'
            
        },
        data: 
            
                [   {
                    "#": "1",
                    "name": "test3",
                    "prize": "hy1,test",
                    "status": "Active",
                    "amount": "10",
                    "probability": "0.04",
                    "createdTime": "2021-12-29 14:55:51",
                    "modifiedTime": "2022-01-28 14:49:39",
                    "action": "action"},
                    {
                        "#": "1",
                        "name": "test3",
                        "prize": "hy1,test",
                        "status": "Inactive",
                        "amount": "10",
                        "probability": "0.04",
                        "createdTime": "2021-12-29 14:55:51",
                        "modifiedTime": "2022-01-28 14:49:39",
                        "action": "action"}

                

                    
                    
                ]

            
        ,
        "aoColumns": 
        [
            {data: '#'},
            {data: 'name'},
            {data: 'prize'}, 
            {data: 'status'},
            {data: 'amount'},
            {data: 'probability'},
            {data: 'createdTime'},
            {data: 'modifiedTime'},
            {data: 'action'},

            // { data: '',},
            // { data: 'phone' }
        ],

        "columnDefs": [
            {
                "targets": 3,
                orderable: false,
                "render": function(data, type, row, meta){
                    if(row['status'] == 'Inactive'){
                        return '<span class="label label-danger">Inactive</span>';
                    }
                    else{
                        return'<span class="label label-success">Active</span>';
                    }
                    
                   
                }
            },
            {
                "targets": 8,
                orderable: false,
                "render": function(data, type, row, meta){
                    return '<div class="tooltip"><button class="btn btn-sm btn-primary" name="button" data-bs-toggle="modal" data-bs-target="#editUser"  data-id="' + row['#'] +'"  ><span class="fa fa-edit"></span></button><span class="tooltiptext">Edit User</span></div>';
                    
                   
                }
            }
        ]

    });

    // addform
    $("#addRow").click(function () {
        var html = '';
        html += '<div id="inputFormRow" class="inputFormRow">';
        html += '<div class="input-group mb-3">';
        html += '<input type="text" name="prize[]" class="form-control m-input" style="border-color:#b3b3b3;"  autocomplete="off">';
        html += '<div class="input-group-append">';
        html += '<button id="removeRow" type="button" class="btn btn-danger">Remove</span></button>';
        html += '</div>';
        html += '</div>';
  
        $('#newRow').append(html);
      });
  
      // remove row
      $(document).on('click', '#removeRow', function () {
          $(this).closest('#inputFormRow').remove();
      });
  
      $('#addForm').on('hidden.bs.modal', function () {
        $('.inputFormRow').remove();
        $('.add_input').val('');
  
      });
  
      // end addform
});