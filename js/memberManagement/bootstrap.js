function operateFormatter(value, row, index) {
  return [
    '<a class="like" href="javascript:void(0)" title="Like">',
    '<i class="fa fa-heart"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.operateEvents = {
  'click .like': function (e, value, row, index) {
    alert('You click like action, row: ' + row.name)
  },
  'click .remove': function (e, value, row, index) {
    $('#table').bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    })
  }
}

function totalTextFormatter(data) {
  return 'Total'
}

function totalNameFormatter(data) {
  return data.length
}

function totalPriceFormatter(data) {
  var field = this.field
  return '$' + data.map(function (row) {
    return +row[field].substring(1)
  }).reduce(function (sum, i) {
    return sum + i
  }, 0)
}

function initTable() {
  $('#table').bootstrapTable('destroy').bootstrapTable({
    queryParams: function (p){
      p.test = "test";
      return p;
    },
    locale: config.lang,
    columns: [
      [{
        title: 'ID',
        field: 'id',
        rowspan: 2,
        align: 'center',
        valign: 'middle',
        sortable: true,
        footerFormatter: totalTextFormatter
      }, {
        title: 'Item Detail',
        colspan: 3,
        align: 'center'
      }],
      [{
        field: 'name',
        title: '<span class="translation" key="item_name"></span>',
        sortable: true,
        footerFormatter: totalNameFormatter,
        align: 'center'
      }, {
        field: 'price',
        title: 'Item Price',
        sortable: true,
        align: 'center',
        footerFormatter: totalPriceFormatter
      }, {
        field: 'operate',
        title: 'Item Operate',
        align: 'center',
        clickToSelect: false,
        events: window.operateEvents,
        formatter: operateFormatter
      }]
    ]
  })
  Common.translation();
}
function cb(start, end) {
    $('#daterangepicker span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
    console.log(start.format('YYYY-MM-DD'))
}
$(function() {
   initTable()

  var start = moment().subtract(29, 'days');
    var end = moment();

    const zh_daterangepicker = {
        "format": "YYYY-MM-DD",
        "separator": " - ",
        "applyLabel": "使用",
        "cancelLabel": "取消",
        "fromLabel": "从",
        "toLabel": "A=至",
        "customRangeLabel": "定制范围",
        "daysOfWeek": [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六"
        ],
        "monthNames": [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        "firstDay": 1,
    };
    $('#daterangepicker').daterangepicker({
      locale : zh_daterangepicker,
        startDate: start,
        endDate: end,
        showCustomRangeLabel: true,
        ranges: {
           '今天': [moment(), moment()],
           '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           '过去7天': [moment().subtract(6, 'days'), moment()],
           '过去30天': [moment().subtract(29, 'days'), moment()],
           '本月': [moment().startOf('month'), moment().endOf('month')],
           '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
})
