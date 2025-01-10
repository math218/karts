        const params = new URLSearchParams(window.location.search);
        const mensaje = params.get("mensaje");
        if (mensaje != "nosigma") {
            window.location.href= "index2.html";
        }
