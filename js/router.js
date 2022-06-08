const route = (event) => {
    if($(".fixed-plugin").hasClass("show"))
      $(".fixed-plugin").removeClass("show")
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

var routes = {
    404 : "pages/404.html",
    "/department" : "pages/systemSetting/department.html",
    "/dashboard" : "pages/dashboard/index.html",
    "/systemMessage" : "pages/systemSetting/systemMessage.html",
    "/agent" : "pages/systemSetting/agent.html",
    "/soundSettings" : "pages/systemSetting/soundSettings.html",
    "/miniGameSetting" : "pages/systemSetting/miniGameSetting.html",
    "/bootstrap" : "pages/memberManagement/bootstrap.html",
    "/memberInfo" : "pages/memberManagement/memberInfo.html",
    "/memberEdit" : "pages/memberManagement/memberEdit.html",
    "/memberGroupList" : "pages/memberManagement/memberGroupList.html",
    "/memberTrace" : "pages/memberManagement/memberTrace.html",
    "/dictionary" : "pages/systemSetting/dictionary.html",
    "/menu" : "pages/systemSetting/menu.html",
    "/profile" : "pages/profile.html",

};

function setInnerHtml(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path == '/')
      return;
    const route = routes[path]|| routes[404];
    const html = await fetch(route).then((data) => data.text());
    setInnerHtml(document.querySelector('#main-content'), html);
    document.getElementById("main-content").scrollIntoView();
    Common.translation();
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
