//Common use function declaration
const Common = {
  getMerchantInfo: function (code) {
    var params = {
      code: code,
      lang: config.lang,
    };
    $.ajax({
      url: config.generalApi + "merchant/getByCode",
      dataType: "json",
      type: "POST",
      data: params,
      success: function(data) {
        data = Common.parseObj(data);
        if(data.code == 403 || data.code == 401 ) {
          window.location.replace("/iprestrict.html");
        } else if(data.code == 500) {
          window.location.replace("/maintenance.html");
        } else {
          localStorage.setItem('apiUrl', data.row.api_url);
          localStorage.setItem('imgUrl', data.row.image_url);
          localStorage.setItem('favicon', data.row.favicon);
          localStorage.setItem('logo', data.row.logo);
          Common.getApi();
          Common.checkIP();
          var refreshIntervalId = setInterval(function () {
            if (config.imgUrl != "") {
              Common.setLogo();
              clearInterval(refreshIntervalId);
            }
          }, 100);
        }
      },
      error: function(data) {
        console.log("data error");
      }
    });
  },
  checkIP: function () {
    $.ajax({
      url: config.apiUrl + "whitelistip/check",
      dataType: "json",
      type: "GET",
      success: function(data) {
        if(data.code == 500) {
          window.location.replace("/iprestrict.html");
        }
      },
      error: function(data) {
        console.log("data error");
      }
    });
  },
  setLogo: function () {
    $("#favicon").attr('href', config.imgUrl+localStorage.getItem("favicon"));
    $('#logo').prepend('<img src="'+config.imgUrl+localStorage.getItem("logo")+'" class="img-fluid mx-auto d-block" />');
  },
  readTextFile: function(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  },
  translation: function () {
    var lang = config.lang.toLowerCase();
    Common.readTextFile("translate/"+lang+".json", function(text){
        var data = JSON.parse(text);
        $('.translation').each(function(index,element){
          var element = $(this);
          if( element.is('input') || element.is('textarea')) {
            $(this).attr("placeholder",data[$(this).attr('key')]);
          } else if (element.is('a'))  {
            $(this).attr("title",data[$(this).attr('key')]);
          } else {
            $(this).text(data[$(this).attr('key')]);
          }
        });
    });
  },
  parseObj: function (jsondata) {
    var data = null;
    if(typeof jsondata != "object") {
        data = JSON.parse(jsondata);
    } else {
        data = JSON.stringify(jsondata);
        data = JSON.parse(data);
    }
    return data;
  },
  skipIndex: function (data) {
    if(data.code == 401) {
      alert(data.msg)
      parent.location.href = "login.html#" + localStorage.getItem('merchant');
    }
  },
  getToken: function () {
    return window.localStorage.token == undefined ? "" : window.localStorage.token;
  },
  popSnack: function (cls) {
    var x = document.getElementById("snackbar");
    x.className = "show "+cls;
    setTimeout(function(){
       x.className = x.className.replace("show", "");
     }, 3000);
  },
  addAlert: function (message,code) {
    if ($('#snackbar').length > 0) {
      $('#snackbar').remove();
    }
    var cls = "bg-success";
    if (code == "500" || code == "401")
      cls = "bg-danger";
    var snackbar = '<div id="snackbar">'+message+'</div>';
    $('body').append(snackbar);
    Common.popSnack(cls);
  },
  setLanguage: function (lang) {
      localStorage.setItem('language', lang);
      config.lang = lang;
  },
  getLanguage: function () {
    localStorage.getItem('language') == null ? Common.setLanguage('EN') : false;
  	config.lang = localStorage.getItem('language');
  },
  getApi: function () {
    config.apiUrl = localStorage.getItem('apiUrl');
    config.imgUrl = localStorage.getItem('imgUrl');
  },
};
