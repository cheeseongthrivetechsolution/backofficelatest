//Environment Setting productionEnv or stagingEnv  or developmentEnv
var env = "developmentEnv";

//Site settings
var config = {
  generalApi: "http://13.212.174.225/fgMain-api/merchantBo/",
  apiUrl: "",
  imgUrl: "",
  pageSize: 25,
  pageLength: [10, 25,50,100],
  lang : '',
}

//Page Language from localStorage
if (env == "stagingEnv") {
  config.generalApi = "http://13.212.174.225/fgMain-api/merchantBo/";
} else if (env == "developmentEnv") {
  config.generalApi = "//flexgaming.api/";
}




$(function() {
  Common.getLanguage();
  Common.translation();
  if (window.location.hash.substr(1)=="" && localStorage.getItem("merchant") != null)
    Common.getMerchantInfo(localStorage.getItem("merchant"));
});
