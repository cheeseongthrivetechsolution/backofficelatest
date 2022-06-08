//Index page function declaration
const Index = {
  getIndexInfo: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: config.apiUrl + "user/getIndexInfo",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              $(".profileImage").attr('src', data.row.avatar);
              $(".profileName").text(data.row.name);
              $(".departmentName").text(data.row.department);
              $(".roleName").text(data.row.role);
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
  },
  logout: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: config.apiUrl + "user/logout",
        type: "GET",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            if(data.code == 200 || data.code == 401) {
              window.location.replace("login.html#" + localStorage.getItem('merchant'));
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log("data error");
        }
    });
  },
  speaker: function () {
    var params = {
      lang: config.lang,
      token: Common.getToken()
    };
    $.ajax({
        url: config.apiUrl + "user/soundSwitch",
        type: "PUT",
        data: params,
        success: function(data) {
            data = Common.parseObj(data);
            Common.skipIndex(data);
            if (data.code == 200){
              if ($(".speakerOnOff i").hasClass("fa-volume-up")) {
                $(".speakerOnOff i").removeClass("fa-volume-up");
                $(".speakerOnOff i").addClass("fa-volume-mute");
                $('.speakerOnOff:checkbox').prop("checked", false);
              } else {
                $(".speakerOnOff i").addClass("fa-volume-up");
                $(".speakerOnOff i").removeClass("fa-volume-mute");
                $('.speakerOnOff:checkbox').prop("checked", true);
              }
            } else {
              Message.addAlert(data.msg,data.code);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
  },
  loadIframe: function (url) {
    var $iframe = $('#contentIframe');
    if ($iframe.length) {
        $iframe.attr('src',url);
        return false;
    }
    return true;
  },
};

function changeLanguageImg(){
  if (config.lang == "ZH") {
    $("#dropdownMenuButton img").attr("src", "assets/img/home/015-china.svg");
  } else {
    $("#dropdownMenuButton img").attr("src", "assets/img/home/226-united-states.svg");
  }
}


$(function() {
  changeLanguageImg();
  //Get basic info for index page
  var refreshIntervalId = setInterval(function () {
    if (config.apiUrl != "") {
      Index.getIndexInfo();
      clearInterval(refreshIntervalId);
    }
  }, 100);

  //Define actions
  $( "#logout" ).click(function() {
    Index.logout();
  });
  $(".translator").on("click", function() {
    Common.setLanguage($(this).attr("data-lang"));
    changeLanguageImg();
    if($('#bootstrapTable').length){
      initTable();
    } else {
      Common.translation();
    }
  });
});
