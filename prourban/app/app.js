'use strict';

angular.module('ProUrban', [
    'ngRoute',
    'ngAnimate',
    'LocalStorageModule',
    'angularSoap'
]);

angular.module('ProUrban')
.constant('AppConfig',{
	//apiUrl: "https://servertest.modoux.com/vista/servidor_web.php?wsdl"
	apiUrl: "http://localhost:8080/prourban-ws/view/server.php?wsdl"
});