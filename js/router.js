const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404 : { path: "pages/404.html",
            js: ""},
    "/department" : { path: "pages/department/index.html",
                      js: "import/department/index.html"},
    "/dashboard" : { path: "pages/dashboard/index.html",
                      js: "import/dashboard/index.html"},
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
    const route = routes[path]['path'] || routes[404]['path'];
    const jsroute = routes[path]['js'] || routes[404]['js'];
    const html = await fetch(route).then((data) => data.text());
    const js = await fetch(jsroute).then((data) => data.text());
    setInnerHtml(document.querySelector('#main-content'), html);
    //import js
    $('*[class^="jsimport"]').each(function(index){
      $(this).remove();
    });
    var jsfile = js.replace(/(\r\n|\n|\r)/gm, "").split(",");
    $(jsfile).each(function(index,src){
      var script = document.createElement( "script" );
      script.setAttribute("class", "js_"+ path.substr(1));
      script.src = src;
      document.getElementsByTagName( "body" )[0].appendChild(script);
    });
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
