
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filtración</title>
   <!-- <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" /> -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

   <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">  -->

    <style>
        .form-container {
            width: 600px;
        }
    </style>

<body>
    <div class="container-fluid d-flex justify-content-center align-items-center vh-100 <!--bg-warning--> "> <!--CENTRAR, ALINEAR Y PONER COLOR AMARILLO A LA PAGINA-->
        <div class="text-center"> <!--texto centrado--> 
            <h1 class="my-5">FILCOPOR</h1>
            <div id="urlShortenerForm" id="reportarUrl" class="form-container">
                <div class="form-floating mb-3">
                <h3 class="my-5">¡Página Bloqueada!</h3>

                    <?php
                       function current_url()
                            {
                                $url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
                                $validURL = str_replace("&","&amp;",$url);
                                return $validURL;
                            }echo "El sitio << ".current_url()." >> ha sido filtrado";

// echo "-------------------";

// if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
// Append the host(domain name, ip) to the URL.
// $url = $_SERVER['HTTP_HOST'];
// Append the requested resource location to the URL.
// $url = $_SERVER['REQUEST_URI'];
// echo $url;


                    ?>

                  
                </div>
                <form action="guardar.php" method="POST">
                <button type="hidde" name='url' value="<?php echo current_url() ?>"  class="btn btn-primary">  Reportar como no pornográfico</button>
                        </form>            
            </div>
            <!--<div id="shortUrlResult"></div>-->
        </div>
    </div>

   
    <script>
        document.getElementById("reportarUrl").addEventListener("submit", function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);

            fetch("http://localhost/filcopor/api.php", {
                    // fetch("https://guskit.com/shortUrls/api.php", {
                    method: "POST",
                    body: JSON.stringify(Object.fromEntries(formData)),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
              
        });


    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>

</html>