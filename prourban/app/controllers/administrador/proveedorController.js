'use strict';

angular.module('ProUrban')
.controller('proveedorController', ['$scope', '$rootScope', '$location', 'localStorageService', 'ProveedorService',
	function($scope, $rootScope, $location, localStorageService, ProveedorService) {

		$scope.proceso = 1;	// 1: insertar

		$scope.getProveedores = getProveedores;
		$scope.insertarProveedor = insertarProveedor;
		$scope.modificarProveedor = modificarProveedor;
		$scope.eliminarProveedor = eliminarProveedor;
		$scope.buscarProveedor = buscarProveedor;

		function getProveedores() {
			ProveedorService.getProveedores()
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.data = response.datos;
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		//	Insertar Proveedor
		function insertarProveedor() {
			if ($scope.proceso === 1) {
				ProveedorService.insertarProveedor($scope.descripcion, $scope.ruc)
				.then(function(response) {
                      console.log($scope.ardescripcionea);
					// MANEJO DE RESPUESTA
					response = JSON.parse(response.respuesta);

					if (response.codigo === 1) {
						clearForm();
						$scope.getProveedores();
					}

					alert(response.mensaje);
				}, function(err){
					// MANEJO DE ERRORES
				});
			} else if ($scope.proceso === 2) {
				modificarProveedor();
			}
		}
		//modificar Proveedor
		function modificarProveedor() {
			console.log($scope.id);
			ProveedorService.modificarProveedor($scope.id, $scope.descripcion, $scope.ruc)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					clearForm();
					$scope.getProveedores();
					$scope.proceso = 1;	// 1: insertar
				}

				alert(response.mensaje);
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		//eliminar Proveedor
		function eliminarProveedor(id) {
			ProveedorService.eliminarProveedor(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getProveedores();
				}

				alert(response.mensaje);
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		//buscar el Proveedor para luego ser modificado
		function buscarProveedor(id) {
			ProveedorService.buscarProveedor(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					$scope.id = data.id;
					$scope.descripcion = data.descripcion;
					$scope.ruc = data.ruc;
					$scope.proceso = 2;	// 2: editar
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		//	Limpia los inputs de tipo text del formulario
		function clearForm() {
			$('#proveedorForm input[type="text"]').val("");
		}

		$scope.getProveedores();

	}
]);
