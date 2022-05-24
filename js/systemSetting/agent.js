$(function () {
    $('#agentTable').dataTable({
        // "processing": true,
        // "serverSide": true,
        // "ajax":{
        //     url :"response.php",
        //     type: "post",
        //     error: function(){
        //         $(".users-error").html("");
        //         $("#users").append('<tbody class="users-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
        //         $("#users_processing").css("display","none");

        //     }
        // },
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
            [
                {
                    "#": "1234",
                    "loginName": "Khai",
                    "fullName": "Khai Lub",
                    "userType": "afshan@afshan.com",
                    "createdTime": "2754",
                    
                    
                }

            ]
        ,
        "aoColumns": [
            {data: '#'},
            {data: 'loginName'},
            {data: 'fullName'},
            {data: 'userType'},
            {data: 'createdTime'},
            {data: 'ACTION'},

            // { data: '',},
            // { data: 'phone' }
        ],

        "columnDefs": [
            {
                "targets": 5,
                orderable: false,
                "render": function(data, type, row, meta){
                    return '<div class="tooltip"><button class="btn btn-sm btn-primary" name="button" data-bs-toggle="modal" data-bs-target="#editUser"  data-id="' + row['#'] +'"  ><span class="fa fa-edit"></span></button><span class="tooltiptext">Edit User</span></div>';
                   
                }
            }
        ]

    });
    // clear button
    $('#clear').click(function(){
        $('#role_select ').val(' ');
    })
});