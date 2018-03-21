DROP DATABASE IF EXISTS tienda;
CREATE DATABASE tienda;

\c tienda;

CREATE TABLE Usuarios
(
	ID_Usuario           serial  NOT NULL ,
	Nombre               varchar(45)  NULL ,
	 PRIMARY KEY (ID_Usuario)
);

CREATE TABLE Pedidos
(
	ID_Pedido            serial  NOT NULL ,
	ID_Usuario           integer  NOT NULL ,
	Total                float  NULL ,
	Iva                  float  NULL ,
	Sub_total            float  NULL ,
	 PRIMARY KEY (ID_Pedido),
	 FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

CREATE TABLE Productos
(
	ID_Producto          serial  NOT NULL ,
	Nombre               varchar(45)  NULL ,
	Precio               float  NULL ,
	 PRIMARY KEY (ID_Producto)
);

CREATE TABLE Entradas
(
	ID_Pedido            integer  NOT NULL ,
	ID_Producto          integer  NOT NULL ,
	Cantidad             integer  NULL ,
	Importe              float  NULL ,
	 FOREIGN KEY (ID_Pedido) REFERENCES Pedidos (ID_Pedido),
   FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto)
);

INSERT INTO Productos (Nombre, Precio)
  VALUES ('Papitas', 12.0), ('Dona', 15.0), ('Soda', 10.0);

INSERT INTO Usuarios (Nombre)
  VALUES ('beto');
