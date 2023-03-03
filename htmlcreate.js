
const htmlbeginning = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>employee tracker</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,200;0,500;1,200&display=swap" rel="stylesheet">
  </head>
    <body>
    <header class="col-12">
`
    
const htmldivider = `
  </header>
  <div>
  <div class="row">
`
    
const htmlend = `
    </div>
    </div>
    </body>
    </html>
`

module.exports.htmlbeginning = htmlbeginning;
module.exports.htmldivider = htmldivider;
module.exports.htmlend = htmlend;