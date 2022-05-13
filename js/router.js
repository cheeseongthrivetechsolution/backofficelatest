const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

var routes = {
    404 : "pages/404.html",
    "/department" : "pages/systemSetting/department.html",
    "/dashboard" : "pages/dashboard/index.html",
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
    Common.translation();
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
