//Environment Setting productionEnv or stagingEnv  or developmentEnv
var env = "developmentEnv";

//Site settings
var config = {
  apiUrl: "https://ultraflex.com/",
  imgUrl: "production-image-path-here",
  pageSizenum: 30,
  lang : 'EN',
}

//Page Language from localStorage
if (env == "stagingEnv") {
	config.apiUrl = 'staging-api-path-here';
	config.imgUrl = "staging-image-path-here";
} else if (env == "developmentEnv") {
	config.apiUrl = 'http://13.212.174.225/ultraflex-api/bo-api/';
	config.imgUrl = "development-image-path-here";
}

const API_ENDPOINT = config.apiUrl;

$(function() {
  Common.getLanguage();
	Common.translation();
});
