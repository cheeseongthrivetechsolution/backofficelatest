
var dataSet = [
    // ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
    // ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
];

$('#dictionaryTable').dataTable({
    dom: `<'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-10'i><'col-sm-12 col-md-2 dataTables_pager'lp>>`,
    data: dataSet,
    columns: [
        { title: '#' },
        { title: 'Merchant' },
        { title: 'Username' },
        { title: 'Affiliate' },
        { title: 'Full Name' },
        { title: 'Contact No' },
        { title: 'Currency' },
        { title: 'Member Group' },
        { title: 'Status' },
        { title: 'Member' },
        { title: 'Error Count' },
        { title: 'Join Date' },
        { title: 'Referral Source' },
        { title: 'Referral Site' },
        { title: 'Last Login' },
        { title: 'Remark' },
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




