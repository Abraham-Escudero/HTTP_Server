const http = require('http');
const fs = require(`fs`);

http.createServer((request, response) => {
    const file = request.url == '/' ? 
    './WWW/indext.html' : `./WWW/${request.url}` ;       
    //.url extrae la url de la peticion
if(request.url == '/registro'){
    let data = [];
    request.on("data", value => {
        data.push(value);
    }).on("end", () => {
        let params = Buffer.concat(data).toString();
        response.write(params);
        response.end();
    });
}

    fs.readFile(file, (err, data)  => {     //err si falla, data si isi lo encuentra
        if(err){
            //mandar 404 "No encontre el archivo"
            response.writeHead(404, {"Content-Type":"text/plain"});
            response.write("Not found your father, still at the store looking for milk");
            response.end();       // Envia la respuesta y corta 
        } else{
            const extension = request.url.split('.').pop();  
            // Split divide una cadena en dos partes, y el pop nos entrega lo que este despues
            // de la division
            switch(extension) {
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                break;
                case 'html':
                    response.writeHead(200, {"Content-Type":"text/html"});
                break;
                case 'png':
                    response.writeHead(200, {"Content-Type":"image/png"});
                break;
                case 'jpg':
                    response.writeHead(200, {"Content-Type":"image/jpeg"});
                break;
            }
            response.write(data);       //data contiene el contenido del archivo index
            response.end();       // Envia la respuesta y corta 
        }
    });      
}).listen(4444);

