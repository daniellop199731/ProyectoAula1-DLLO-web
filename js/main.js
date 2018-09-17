function mostrar() {
  document.getElementById('oculto').style.display = 'block';
}

var app = new function() {
  var usuarioActual = ''
  var totalApagar = 0
  /*
  class usuario{
      constructor(cedula, contraseña, nombre){
          this.cedula = cedula
          this.contraseña = contraseña
          this.nombre = nombre
          this.saldo = 0
      }
  }

  class producto {
      constructor(usuarioProducto, codigo, nombre, precio, stock) {
          this.usuarioProducto = usuarioProducto
          this.codigo = codigo
          this.nombre = nombre
          this.precio = precio
          this.stock = 1
      }
  }

  class carritoCompras{
      constructor(usuario){
          this.usuario = usuario
          this.productosCarrito = []
          this.total = 0
      }
  }
  */

  //Arreglo donde se almacenaran los usuarios registrados
  var usuarios = [{
      nombre: "Daniel",
      correo: "daniel@",
      contraseña: "a",
      productos: [],
      saldo: 0
    },
    {
      nombre: "Pepe",
      correo: "pepe@",
      contraseña: "b",
      productos: [],
      saldo: 0
    },
    {
      nombre: "Santiago",
      correo: "dw@",
      contraseña: "c",
      productos: [],
      saldo: 0
    }
  ]

  //Arreglo donde se almacenaran los productos registrados por un usuario
  var productos = [
    {
      nombre:"Galletas",
      precio:1500,
      vendedor:"dw@",
      stock: 50
    },
    {
      nombre: "camisa scouts",
      precio: 5000,
      vendedor: "dw@",
      stock: 24
    },
    {
      nombre: "camisa pioneros",
      precio: 5000,
      vendedor: "dw@",
      stock: 24
    },
    {
      nombre: "camisa rovers",
      precio: 5000,
      vendedor: "dw@",
      stock: 24
    }
  ]
  //Arreglo que almacena los carritos de compras de los usuarios registrados
  var carritos = []

  /*
  Carga inicial de la pagina
  */

  console.log(usuarios)
  //Se escoden los subtitulos de los campos deregistro y actualizacion
   document.getElementById('nombreU').style.display = 'none'
   document.getElementById('correoU').style.display = 'none'
   document.getElementById('contraseñaU').style.display = 'none'
   document.getElementById('contraseñaCU').style.display = 'none'
   document.getElementById('saldoU').style.display = 'none'

  //Al cargar la pagina, se esconte el input de 'Confirme su  contraseña'
  document.getElementById('txtContraseñaP').style.display = 'none'

  //Al cargar la pagina, se esconte el input de 'Registrar'
  document.getElementById('btnRegistrar').style.display = 'none'

  //Al cargar la pagina, se esconte el input de 'Ingrese su nombre'
  document.getElementById('txtNombre').style.display = 'none'

  //Al cargar la pagina, se esconde el input de 'Actualizar'
  document.getElementById('btnActualizar').style.display = 'none'

  //Al cargar la pagina, se esconde el input de 'Recargue su saldo'
  document.getElementById('txtSaldo').style.display = 'none'

  document.getElementById('contenedorProductos').innerHTML = ''
  document.getElementById('contenedorCarrito').innerHTML = ''

  //////////////////////////////////////////
  /// MÉTODOS !!!!!!!!
  //////////////////////////////////////////


  //Metodo que habitila los campos para registrar un nuevo usuario
  registrarse = function() {
    //Se hace que aparezca el input 'Ingrese su nombre'
    document.getElementById('txtNombre').style.display = 'inline'

    //Se hace que aparezca el input de 'Confirme su  contraseña'
    document.getElementById('txtContraseñaP').style.display = 'inline'

    //Se hace que aparezca el input de 'Registrar'
    document.getElementById('btnRegistrar').style.display = 'inline'

    //Se esconde el input de 'Iniciar sesion'
    document.getElementById('btnIniciarSesion').style.display = 'none'

    //Se esconde el input de 'Registrarse'
    document.getElementById('btnRegistrarse').style.display = 'none'

  }

  //Metodo que registra un nuevo usuario
  registrarUsuario = function() {
    //Se optiene los datos, del usuario que se va a registrar
    var nombre = document.getElementById('txtNombre').value
    var correo = document.getElementById('txtCorreo').value
    var contraseña = document.getElementById('txtContraseña').value
    var contraseñaPlus = document.getElementById('txtContraseñaP').value

    //Se valida que los campos no esten vacios
    if (nombre != '' && correo != '' && contraseña != '' && contraseñaPlus != '') {
      if (contraseña == contraseñaPlus) {

        try {
          addUsuario(nombre, correo, contraseña)
          alert('AVISO!!!\nUsuario registrado con exito :D')

          // <<<<<<<<<<<<<<<<<<<<<<< seccion grafica >>>>>>>>>>>>>>>>>>>>>>>>
          //Se escode el input 'Ingrese su nombre'
          document.getElementById('txtNombre').style.display = 'none'

          //Se esconde el input de 'Confirme su  contraseña'
          document.getElementById('txtContraseñaP').style.display = 'none'

          //Se esconde el input de 'Registrar'
          document.getElementById('btnRegistrar').style.display = 'none'

          //Se hace que aparezca el input de 'Iniciar sesion'
          document.getElementById('btnIniciarSesion').style.display = 'inline'

          //Se hace que aparezca el input de 'Registrarse'
          document.getElementById('btnRegistrarse').style.display = 'inline'

          //Se borra el valor de cada una de las siguientes vistas
          document.getElementById('txtNombre').value = ''
          document.getElementById('txtCorreo').value = ''
          document.getElementById('txtContraseña').value = ''
          document.getElementById('txtContraseñaP').value = ''
          // <<<<<<<<<<<<<<<<<<<<<<< fin de la seccion grafica >>>>>>>>>>>>>>>>>>>>>>>>

          cargarUsuarios()

        } catch {
          alert('ADVERTENCIA!!!\nAlgo salio mal con el registro del usuario')
        }

      } else {
        alert('ADVERTENCIA!!!\nLas contraseñas no coinciden')
        document.getElementById('txtContraseña').value = ''
        document.getElementById('txtContraseñaP').value = ''
      }
    } else {
      alert('ADVERTENCIA!!\nHay campos que estan vacios !!')
    }
  }

  //Metodo que permite a un usuario iniciar sesion con su correo y contraseña
  iniciarSesion = function() {

    console.log('Iniciando sesion ...')
    document.getElementById('infoUsuarioProductos').style.display = 'inline'
    var correo = document.getElementById('txtCorreo').value
    var contraseña = document.getElementById('txtContraseña').value
    var sesion = buscarUsuario(correo)

    if (sesion != null) {
      if (sesion.contraseña == contraseña) {

        usuarioActual = sesion.correo
        saldoActual = sesion.saldo
        alert('AVISO!!!\nSesion de : ' + usuarioActual + ' iniciada')
        document.getElementById('correoSesion').value = sesion.correo
        console.log('... Sesion iniciada como ' + usuarioActual)
        document.getElementById('infoUsuarioProductos').innerHTML = ""
        console.log('Usuario actual: ', usuarioActual)
        document.getElementById('infoUsuarioProductos').innerHTML = "<h4><b>Sesión iniciada como: " + usuarioActual + "</b></h4> <input class='btn btn-primary' onclick='cerrarSesion()' type='button' value='Cerrar sesion'>"
        document.getElementById('txtCorreo').value = ''
        document.getElementById('txtContraseña').value = ''
        cargarUsuarios()
        cargarProductos()
        cargarCarrito()
      } else {
        console.log('... Cancelado')
        alert('ADVERTENCIA!!!\nContraseña incorrecta')
        document.getElementById('txtContraseña').value = ''
      }

    } else {
      console.log('... Cancelado')
      alert('ADVERTENCIA!!!\nUsuario no encontrado :(')
    }

  }

  //Metodo que permite cerrar la sesion actual de un usuario
  //Volver a valores iniciales de la pagina
  cerrarSesion = function() {
    //Se escode el input 'Ingrese su nombre'
    document.getElementById('txtNombre').style.display = 'none'

    //Se esconde el input de 'Confirme su  contraseña'
    document.getElementById('txtContraseñaP').style.display = 'none'

    //Se esconde el input de 'Registrar'
    document.getElementById('btnRegistrar').style.display = 'none'

    //Se hace que aparezca el input de 'Iniciar sesion'
    document.getElementById('btnIniciarSesion').style.display = 'inline'

    //Se hace que aparezca el input de 'Registrarse'
    document.getElementById('btnRegistrarse').style.display = 'inline'

    document.getElementById('txtSaldo').style.display = 'none'

    //Se borra el valor de cada una de las siguientes vistas
    document.getElementById('txtNombre').value = ''
    document.getElementById('txtCorreo').value = ''
    document.getElementById('txtContraseña').value = ''
    document.getElementById('txtContraseñaP').value = ''
    document.getElementById('infoUsuarioProductos').innerHTML = ''
    document.getElementById('txtNombreProducto').value = ''
    document.getElementById('txtPrecioProducto').value = ''
    document.getElementById('txtStockProducto').value = ''
    document.getElementById('contenedorUsuarios').innerHTML = ''
    document.getElementById('contenedorProductos').innerHTML = ''
    document.getElementById('contenedorCarrito').innerHTML = ''
    usuarioActual = ''
    document.getElementById('correoSesion').value = ''
    document.getElementById('nombreU').style.display = 'none'
    document.getElementById('correoU').style.display = 'none'
    document.getElementById('contraseñaU').style.display = 'none'
    document.getElementById('contraseñaCU').style.display = 'none'
    document.getElementById('saldoU').style.display = 'none'
    document.getElementById('btnActualizar').style.display = 'none'

    document.getElementById('conte').style.height = '50px'
    document.getElementById('parrafo-uno').style.height = '350px'
    document.getElementById('parrafo-dos').style.height = '350px'
    cargarProductos()
    cargarUsuarios()
  }

  //Metodo que añade un usuario a la lista de usuarios
  addUsuario = function(nombre, correo, contraseña) {
    var nuevoUsuario = {
                        nombre: nombre,
                        correo: correo,
                        contraseña: contraseña,
                        productos: [],
                        saldo: 0
                       }
    usuarios.push(nuevoUsuario)
  }

  //Metodo que elimina un usuario de la lista de usuarios
  deleteUsuario = function(posicion) {
    usuarios.splice(posicion, 1)
    usuarioActual = ''
    document.getElementById('infoUsuarioProductos').innerHTML = ''
    
    cargarUsuarios()
    cargarProductos()
  }

  //Metodo que habilita los campos para la edicion de las propiedades de un usuario
  editUsuario = function(posicion) {

    //Se modifican los tamaños del contenedor del formulario donde se modifican los usuarios
    document.getElementById('conte').style.height = '200px'
    document.getElementById('parrafo-uno').style.height = '550px'
    document.getElementById('parrafo-dos').style.height = '550px'

    //Se habilitan los subtitulos guia para la edicion de usuarios
    document.getElementById('nombreU').style.display = 'inline'
    document.getElementById('correoU').style.display = 'inline'
    document.getElementById('contraseñaU').style.display = 'inline'
    document.getElementById('contraseñaCU').style.display = 'inline'
    document.getElementById('saldoU').style.display = 'inline'

    //Se hace que aparezca el input 'Ingrese su nombre'
    document.getElementById('txtNombre').style.display = 'inline'
    //Se optiene el nombre actual del usuario que inicio sesion
    document.getElementById('txtNombre').value = usuarios[posicion].nombre

    //Se obtiene el correo actual del usuario que inicio sesion
    document.getElementById('txtCorreo').value = usuarios[posicion].correo

    //Se obtiene la contraseña actual del usuario que inicio sesion
    document.getElementById('txtContraseña').value = usuarios[posicion].contraseña

    //Se hace que aparezca el input de 'Confirme su  contraseña'
    document.getElementById('txtContraseñaP').style.display = 'inline'

    //Se obtiene la confirmacion de contraseña actual del usuario que inicio sesion
    document.getElementById('txtContraseñaP').value = usuarios[posicion].contraseña

    //Se hace que aparezca el input de 'Actualizar'
    document.getElementById('btnActualizar').style.display = 'inline'

    //Se hace que aparezca el input de 'Recargue su saldo'
    document.getElementById('txtSaldo').style.display = 'inline'

    //Se obtiene el saldo actual del usuario que inicio sesion
    document.getElementById('txtSaldo').value = usuarios[posicion].saldo

    //Se esconde el boton 'Iniciar sesion'
    document.getElementById('btnIniciarSesion').style.display = 'none'

    //Se esconde el boton 'Registrarse'
    document.getElementById('btnRegistrarse').style.display = 'none'

    //document.getElementsByClassName('subtitulo').style.display = 'inline'
    
  }

  //Metodo que actualiza las propiedades de un usuario que ha iniciado sesion
  updateUsuario = function() {
    var nombreUsuario = document.getElementById('txtNombre').value
    var correoUsuario = document.getElementById('txtCorreo').value
    var contraseñaUsuario = document.getElementById('txtContraseña').value
    var saldoUsuario = document.getElementById('txtSaldo').value
    //console.log(nombreUsuario, ' ' , correoUsuario, ' ', contraseñaUsuario )
    if (document.getElementById('txtContraseñaP').value == contraseñaUsuario) {
      var usuarioActualizar = buscarUsuario(correoUsuario)
      usuarioActualizar.nombre = nombreUsuario
      usuarioActualizar.correo = correoUsuario
      usuarioActualizar.contraseña = contraseñaUsuario
      usuarioActualizar.saldo = saldoUsuario

      usuarios.splice(posicionUsuario(correoUsuario), 1, usuarioActualizar)
      console.log(usuarios)

      //Se restablecen los tamaños del contenedor del formulario donde se modifican los usuarios
      document.getElementById('conte').style.height = '50px'
      document.getElementById('parrafo-uno').style.height = '350px'
      document.getElementById('parrafo-dos').style.height = '350px'

      //Se esconden los subtitulos guia que ayudan a la edicion de las propiedadesde los usuarios
      document.getElementById('nombreU').style.display = 'none'
      document.getElementById('correoU').style.display = 'none'
      document.getElementById('contraseñaU').style.display = 'none'
      document.getElementById('contraseñaCU').style.display = 'none'
      document.getElementById('saldoU').style.display = 'none'

      //Se esconden y se limpian los campos para la actualizacion de usuarios
      document.getElementById('txtNombre').style.display = 'none'
      document.getElementById('txtNombre').value = ''
      document.getElementById('txtContraseñaP').style.display = 'none'
      document.getElementById('txtContraseñaP').value = ''
      document.getElementById('txtSaldo').style.display = 'none'
      document.getElementById('txtSaldo').value = ''
      document.getElementById('btnActualizar').style.display = 'none'

      //Se restablecen los botenes de inicio de sescion y de registrarse
      document.getElementById('btnIniciarSesion').style.display = 'inline'
      document.getElementById('btnRegistrarse').style.display = 'inline'

      document.getElementById('txtCorreo').value = ''
      document.getElementById('txtContraseña').value = ''

      //Se actualiza la informacion de las tablas
      cargarUsuarios()
      cargarProductos()
      cargarCarrito()
    } else {
      alert('ADVERTENCIA!!!\nLas contraseñas no coinciden')
    }
  }

  //Se busca un usuario por correo electronico para conocer todos sus atributos
  buscarUsuario = function(correo) {
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo == correo) {
        return usuarios[i]
      }
    }
    return null
  }

  //Metodo que ayuda a encontrar la posicion de un usuario dentro de la lista de usuarios
  posicionUsuario = function(correo) {
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo == correo) {
        return i
      }
    }
    return null
  }

  //Metodo que carga la lista de los usuarios registrados en una tabla
  cargarUsuarios = function() {
    console.log('Cargando usuarios registrados...')
    console.log('Usuario actual: ', usuarioActual)
    var data = ''
    for (var i = 0; i < usuarios.length; i++) {
      if (document.getElementById('correoSesion').value == usuarios[i].correo) {
        data += '<tr>'
        data += "<td>" + usuarios[i].nombre + "</td>"
        data += "<td>" + usuarios[i].correo + "</td>"
        data += "<td><input type='button' class='btn btn-primary' onclick='editUsuario(" + i + ")' value='Editar'></input>"+" "+"<input class='btn btn-primary' type='button' onclick='deleteUsuario(" + i + ")' value='Eliminar'></input></td>"
        data += '<td>'
      } else {
        data += '<tr>'
        data += "<td>" + usuarios[i].nombre + "</td>"
        data += "<td>" + usuarios[i].correo + "</td>"
        data += '<td>'
      }
    }
    document.getElementById('contenedorUsuarios').innerHTML = data
  }

  registrarProducto = function() {
    console.log(document.getElementById('correoSesion').value, ' registra un nuevo producto')
    var nombreProducto = document.getElementById('txtNombreProducto').value
    var precioProducto = document.getElementById('txtPrecioProducto').value
    var stockProducto = document.getElementById('txtStockProducto').value
    var vendedorProducto = usuarioActual

    if (vendedorProducto != '') {
      if (nombreProducto != '' && precioProducto != '' && stockProducto != '') {
        addProducto(nombreProducto, precioProducto, vendedorProducto, stockProducto)
        document.getElementById('txtNombreProducto').value = ''
        document.getElementById('txtPrecioProducto').value = ''
        document.getElementById('txtStockProducto').value = ''
        alert('AVISO!!!\nProducto registrado con exito')
        cargarProductos()
      } else {
        alert('ADVERTENCIA!!!\nHay campos vacios')
      }
    } else {
      alert('ADVERTENCIA!!!\nNo hay sesion iniciada')
    }
  }

  addProducto = function(nombre, precio, vendedor, stock) {
    var nuevoProducto = {
                        nombre: nombre,
                        precio: precio,
                        vendedor: vendedor,
                        stock: stock
                        }
    productos.push(nuevoProducto)
  }

  editProducto = function(posicion) {
    document.getElementById('contActualizarProducto').innerHTML = "<input value='Actualizar' type='button' onclick='updateProducto(" + posicion + ")'>"
    document.getElementById('btnRegistrarProducto').style.display = 'none'
    document.getElementById('txtNombreProducto').value = productos[posicion].nombre
    document.getElementById('txtPrecioProducto').value = productos[posicion].precio
    document.getElementById('txtStockProducto').value = productos[posicion].stock
  }

  updateProducto = function(posicion) {
    var nombreProducto = document.getElementById('txtNombreProducto').value
    document.getElementById('txtNombreProducto').value = ''
    var precioProducto = document.getElementById('txtPrecioProducto').value
    document.getElementById('txtPrecioProducto').value = ''
    var stockProducto = document.getElementById('txtStockProducto').value
    document.getElementById('txtStockProducto').value = ''
    if (nombreProducto != '' && precioProducto != '' && stockProducto != '') {
      var productoActualizar = productos[posicion]
      productoActualizar.nombre = nombreProducto
      productoActualizar.precio = precioProducto
      productoActualizar.stock = stockProducto

      productos.splice(posicion, 1, productoActualizar)
      cargarProductos()
    } else {
      alert('ADVERTENCIA!!!\nHay campos vacios')
    }
  }

  deleteProducto = function(posicion) {
    productos.splice(posicion, 1)
    cargarProductos()
  }

  cargarProductos = function() {
    console.log('Cargando productos...')
    console.log('Usuario actual: ', usuarioActual)
    var data = ''
    for (var i = 0; i < productos.length; i++) {
      if(usuarioActual != ''){
        if (usuarioActual == productos[i].vendedor) {
          data += '<tr>'
          data += "<td>" + productos[i].nombre + "</td>"
          data += "<td>" + productos[i].precio + "</td>"
          data += "<td>" + productos[i].vendedor + "</td>"
          data += "<td>" + productos[i].stock + "</td>"
          data += "<td><input type='button' class='btn btn-primary' onclick='editProducto(" + i + ")' value='Editar'></input>" +" "+"<input class='btn btn-primary' type='button' onclick='deleteProducto(" + i + ")' value='Eliminar'></input></td>"
          data += '<td>'
        } else {
          data += '<tr>'
          data += "<td>" + productos[i].nombre + "</td>"
          data += "<td>" + productos[i].precio + "</td>"
          data += "<td>" + productos[i].vendedor + "</td>"
          data += "<td>" + productos[i].stock + "</td>"
          data += "<td><input type='button' class='btn btn-primary' onclick='añadirAlCarrito(" + i + ")' value='Añadir al carrito'></input></td>"
          data += '<td>'
        }
      }else{
        data += '<tr>'
        data += "<td>" + productos[i].nombre + "</td>"
        data += "<td>" + productos[i].precio + "</td>"
        data += "<td>" + productos[i].vendedor + "</td>"
        data += "<td>" + productos[i].stock + "</td>"
        //data += "<td><button onclick='añadirAlCarrito(" + i + ")'>Añadir al carrito</Button></td>"
        data += '<td>'
      }
    }
    document.getElementById('contenedorProductos').innerHTML = data
  }

  buscarProducto = function(nombre, vendedor) {
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].nombre == nombre && productos[i].vendedor == vendedor) {
        console.log('Se encontro el producto !!!')
        return i
      }
    }
    return null
  }

  //add del carrito de compras
  añadirAlCarrito = function(posicion) {
    var sesion = buscarUsuario(document.getElementById('correoSesion').value)
    var producto = productos[posicion]
    console.log('Añadir: ', producto)
    if (producto.stock > 0) {
      sesion.productos.push(producto)
      cargarCarrito(document.getElementById('correoSesion').value)
      producto.stock--
        productos.splice(posicion, 1, producto)
      cargarProductos()
    } else {
      alert('ADVERTENCIA!!!\nNo hay mas existencias para este producto')
    }
  }

  removerDelCarrito = function(posicion) {
    var sesion = buscarUsuario(document.getElementById('correoSesion').value)
    var carrito = sesion.productos
    var producto = carrito[posicion]
    sesion.productos.splice(posicion, 1)
    console.log('Remover: ', producto)
    var nombre = producto.nombre
    var vendedor = producto.vendedor
    var i = buscarProducto(nombre, vendedor)
    productos[i].stock++
    productos.splice(i, 1, productos[i])
    cargarCarrito()
    cargarProductos()
  }

  cargarCarrito = function() {
    var sesion = buscarUsuario(document.getElementById('correoSesion').value)
    var carrito = sesion.productos
    var saldo = buscarUsuario(document.getElementById('correoSesion').value).saldo
    console.log('Cargando carrito de : ', document.getElementById('correoSesion').value)
    data = ''
    var total = 0
    for (var i = 0; i < carrito.length; i++) {
      total += parseInt(carrito[i].precio)
      data += '<tr>'
      data += "<td>" + carrito[i].nombre + "</td>"
      data += "<td>" + carrito[i].precio + "</td>"
      data += "<td><input type='button' class='btn btn-primary' onclick='removerDelCarrito(" + i + ")' value='Remover del carrito'></input></td>"
      data += '<tr>'
    }
    //
    data += '<tr>'
    data += '<td>TOTAL = </td>'
    if (carrito.length > 0) {
      data += "<td>" + total + "</td>"
      data += "<td><input type='button' class='btn btn-primary' onclick='comprar()' value='Comprar'></input></td>"
    }
    data += '<tr>'
    data += '<tr>'
    data += "<td>Saldo = </td>"
    data += "<td>" + saldo + "</td>"
    totalApagar = total
    document.getElementById('contenedorCarrito').innerHTML = data
  }

  comprar = function() {
    var sesion = buscarUsuario((document.getElementById('correoSesion').value))
    if (sesion.saldo >= totalApagar) {
      alert("COMPRA EFECTUADA!!!\nAVISO!!!\nEl total a pagar de " + totalApagar +" se descontara de su saldo actual")
      sesion.saldo -= totalApagar
      usuarios.splice(posicionUsuario(document.getElementById('correoSesion')), 1, sesion)
      sesion.productos.splice(0, sesion.productos.length)
      cargarCarrito()
    }else{
      alert('ADVERTENCIA!!!\nSaldo insuficiente')
    }
    
  }

  cargarProductos()
  cargarUsuarios()
}
