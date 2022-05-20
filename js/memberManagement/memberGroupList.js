
var dataSet = [
    // ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
    // ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
];

$('#memberGroupListTable').dataTable({
    dom: `<'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-10'i><'col-sm-12 col-md-2 dataTables_pager'lp>>`,
    data: dataSet,
    columns: [
        { title: '#' },
        { title: 'Group Name' },
        { title: 'Group Remark' },
        { title: 'Level' },
        { title: 'Created Time' },
        { title: 'Min Per Withdraw' },
        { title: 'Max Per Withdraw' },
        { title: 'Daily Withdrawal Count' },
        { title: 'Daily Max Withdraw' },
        { title: 'Default' },
        { title: 'Status' },
        { title: 'Action' }
    ],
    "language": {
        "lengthMenu": 'Display _MENU_',
          "paginate": {
            "previous": '<span class="prev-icon"><span class="fa fa-chevron-left"></span></span>',
            "next": '<span class="next-icon"><span class="fa fa-chevron-right"></span></span>'
          }
      }
});


