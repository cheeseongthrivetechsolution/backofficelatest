const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "index.html",
    "/index": "index.html",
    "/department": "pages/department/index.html",
    "/dashboard": "pages/dashboard/index.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path == '/' || path == '/index.html')
      return;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-content").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
