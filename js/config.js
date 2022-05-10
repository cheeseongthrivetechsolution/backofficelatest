//Environment Setting productionEnv or stagingEnv  or developmentEnv
var env = "developmentEnv";

//Site settings
var config = {
  generalApi: "http://13.212.174.225/fgMain-api/merchantBo/",
  apiUrl: "",
  imgUrl: "",
  pageSizenum: 30,
  lang : '',
}

//Page Language from localStorage
if (env == "stagingEnv") {
  config.generalApi = "http://13.212.174.225/fgMain-api/merchantBo/";
} else if (env == "developmentEnv") {
  config.generalApi = "//flexgaming.api/";
}

$(function() {
  Common.getApi();
  Common.getLanguage();
	Common.translation();
});
