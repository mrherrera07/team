var $$= Dom7;
 
var app = {
 /*   // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    } */
};
function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  alert('Connection type: ' + states[networkState]);
}

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Team',
  // App id
  id: 'com.team.app',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/home/',
      url: 'views/home.html',
     },
     { path: '/login/',
      url: 'views/login.html',
    },
    { path: '/registro/',
    url: 'views/registro.html',
  },
  { path: '/perfil/',
    url: 'views/perfil.html',
  },
  ],
  // ... other parameters
});
  var mainView = app7.views.create('.view-main');

  //app7.preloader.show('blue');

  // Create full-layout notification
var notificationFull = app7.notification.create({
  icon: '<i class="f7-icons">alarm</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'This is a subtitle',
  text: 'This is a simple notification message',
  
  //closeTimeout: 3000,
});

//notificationFull.open();
function Ingresar(){

var usuario = $$('#usuario').val();
var password = $$('#password').val();
//alert(usuario);
app7.preloader.show();
app7.request(
  {
    url:'http://localhost/team/api/login.php',
    data:{username:usuario,password:password},
    method:'POST',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();
      //alert(data);
      var objson = JSON.parse(data);

      if(objson.data == "AUTENTICADO"){
        localStorage.setItem("team-login","autenticado");

        mainView.router.navigate('/home/',{animate:true});
      }
      else{
        alert("USUARIO Y/O PASSWORD INCORRECTO");
      }
    },
    error:function(error){
      app7.preloader.hide();
    }
    
  }
);

 // app7.preloader.show();

}

function AbrirNotificacion(){
  notificationFull.open();
  app7.preloader.show('blue');
}


  function MuestraMensaje(){
    alert("ehhh funciona");
    console.log("ehh funciona !!");
  }

function showSplashScreen(){
  

  setTimeout(function(){  InitApp();  }, 3000);
  
}

function InitApp(){

  if (localStorage.getItem("team-login")=="autenticado"){
    mainView.router.navigate('/home/',{animate:true});
  }else{
  mainView.router.navigate('/login/',{animate:true});
}
}
function CerrarSesion(){
  //checkConnection();
  localStorage.setItem("team-login","false");
  mainView.router.navigate('/login/',{animate:true});
}

function Registrarse(){
  var nombre = $$('#nombre').val();
  var apellidos = $$('#apellidos').val();
  var telefono = $$('#telefono').val();
  var correo = $$('#correo').val();
  var usuario = $$('#usuarior').val();
var password = $$('#passwordr').val();

//alert(usuario);
app7.preloader.show();
app7.request(
  {
    url:'http://localhost/team/api/users.php', //primer campo es para nombre de variable en API y el segundo el que puse arriba como var
    data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,telefono:telefono,correo:correo},
    method:'POST',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();
      //alert(data);
      var objson = JSON.parse(data);

      if(objson.status_message == "CORRECTO"){
        alert("Gracias por registrarte");
        mainView.router.navigate('/login/',{animate:true});
      }
      else{
        alert("Hubo un problema intentelo de nuevo");
      }
    },
    error:function(error){
      app7.preloader.hide();
    }
    
  }
  );

}