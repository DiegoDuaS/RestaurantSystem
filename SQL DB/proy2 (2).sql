-- TABLAS
-- Tabla Area
CREATE TABLE IF NOT EXISTS Area (
    id_area INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fumador BOOLEAN NOT NULL,
    movible BOOLEAN NOT NULL
);

-- Tabla Mesa
CREATE TABLE IF NOT EXISTS Mesa (
    id_mesa INT PRIMARY KEY,
    capacidad INT NOT NULL, -- máximo de 14 personas
    area INT NOT NULL,
	ocupado BOOLEAN NOT NULL,
    FOREIGN KEY (area) REFERENCES Area(id_area)
);

-- Tabla Empleado
CREATE TABLE IF NOT EXISTS Empleado (
    id_empleado INT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
    trabajo VARCHAR(25) NOT NULL, -- mesero, chef, host
    area INT NOT NULL,
    contraseña VARCHAR(50) NOT NULL, -- encriptada
    FOREIGN KEY (area) REFERENCES Area(id_area)
);

-- Tabla Pedido
CREATE TABLE IF NOT EXISTS Pedido (
    id_pedido INT PRIMARY KEY,
    mesa INT NOT NULL,
    total DOUBLE PRECISION NOT NULL,
    propina DOUBLE PRECISION NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    empleado INT NOT NULL, -- solamente meseros
    estado BOOLEAN NOT NULL,
    FOREIGN KEY (mesa) REFERENCES Mesa(id_mesa),
    FOREIGN KEY (empleado) REFERENCES Empleado(id_empleado)
);

-- Tabla Comida
CREATE TABLE IF NOT EXISTS Comida (
    id_comida INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(75) NOT NULL,
    precio DOUBLE PRECISION NOT NULL
);

-- Tabla Bebida
CREATE TABLE IF NOT EXISTS Bebida (
    id_bebida INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(75) NOT NULL,
    precio DOUBLE PRECISION NOT NULL
);

-- Tabla Recuento
CREATE TABLE IF NOT EXISTS Recuento (
    pedido INT NOT NULL,
    bebida INT,
    comida INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (pedido) REFERENCES Pedido(id_pedido),
    FOREIGN KEY (bebida) REFERENCES Bebida(id_bebida),
    FOREIGN KEY (comida) REFERENCES Comida(id_comida)
);

-- Tabla Cliente
CREATE TABLE IF NOT EXISTS Cliente (
	id_cliente INT PRIMARY KEY,
    nit INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL
);

-- Tabla Factura
CREATE TABLE IF NOT EXISTS Factura (
    id_factura INT PRIMARY KEY,
    cliente INT NOT NULL,
    pedido INT NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (pedido) REFERENCES Pedido(id_pedido)
);

-- Tabla Forma de pago
CREATE TABLE IF NOT EXISTS Forma_de_pago (
    fraccion DOUBLE PRECISION NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    factura INT NOT NULL,
    FOREIGN KEY (factura) REFERENCES Factura(id_factura)
);

-- Tabla Encuesta
CREATE TABLE IF NOT EXISTS Encuesta (
    id_encuesta INT PRIMARY KEY,
    cliente INT NOT NULL,
    empleado INT NOT NULL, -- solamente meseros
    amabilidad INT NOT NULL, -- entre 1 y 5
    exactitud INT NOT NULL, -- entre 1 y 5
	fecha DATE NOT NULL,
    FOREIGN KEY (cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (empleado) REFERENCES Empleado(id_empleado)
);

-- Tabla Queja
CREATE TABLE IF NOT EXISTS Queja (
    id_queja INT PRIMARY KEY,
    cliente INT NOT NULL,
    empleado INT,
    comida INT,
    bebida INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT NOT NULL,
    clasificacion INT NOT NULL, -- entre 1 y 5
    FOREIGN KEY (cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (empleado) REFERENCES Empleado(id_empleado),
	FOREIGN KEY (bebida) REFERENCES Bebida(id_bebida),
    FOREIGN KEY (comida) REFERENCES Comida(id_comida)
);

-- Tabla Bebidas_bar
CREATE TABLE IF NOT EXISTS Bebidas_bar (
    bebida INT NOT NULL,
	cantidad INT NOT NULL,
	pedido INT NOT NULL,
	hora TIME NOT NULL,
    estado BOOLEAN NOT NULL, -- True PREPARADO
    FOREIGN KEY (bebida) REFERENCES Bebida(id_bebida),
	FOREIGN KEY (pedido) REFERENCES Pedido(id_pedido)
);

-- Tabla Comida_cocina
CREATE TABLE IF NOT EXISTS Comida_cocina (
    comida INT NOT NULL,
	cantidad INT NOT NULL,
	pedido INT NOT NULL,
	hora TIME NOT NULL,
    estado BOOLEAN NOT NULL,
    FOREIGN KEY (comida) REFERENCES Comida(id_comida),
	FOREIGN KEY (pedido) REFERENCES Pedido(id_pedido)
);

ALTER TABLE comida_cocina
ADD id_preparacion SERIAL;

ALTER TABLE bebidas_bar
ADD id_preparacion SERIAL;

-- FUNCIONES & TRIGGERS
-- Comprobar Restricción
CREATE OR REPLACE FUNCTION empleado_mesero(empleado_id INTEGER) 
RETURNS BOOLEAN AS $$
DECLARE
    es_mesero BOOLEAN;
BEGIN
    SELECT trabajo = 'mesero' INTO es_mesero
    FROM Empleado
    WHERE id_empleado = empleado_id;

    RETURN es_mesero;
END;
$$ LANGUAGE plpgsql;

-- Guardar información en listado Cocina/Bar
CREATE OR REPLACE FUNCTION agregar_a_listado()
RETURNS TRIGGER AS $$
BEGIN
    -- Si hay bebida, insertar en Bebidas_bar
    IF NEW.bebida IS NOT NULL THEN
        INSERT INTO Bebidas_bar (bebida, cantidad, pedido, hora, estado)
        VALUES (NEW.bebida, NEW.cantidad, NEW.pedido, CURRENT_TIMESTAMP, false);
    -- Si no hay bebida pero hay comida, insertar en Comida_cocina
    ELSIF NEW.comida IS NOT NULL THEN
        INSERT INTO Comida_cocina (comida, cantidad, pedido, hora, estado)
        VALUES (NEW.comida, NEW.cantidad, NEW.pedido, CURRENT_TIMESTAMP, false);
    END IF;
    
    -- Retornar NEW para continuar con la operación de inserción en Recuento
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agregar_a_listado
AFTER INSERT ON Recuento
FOR EACH ROW
EXECUTE FUNCTION agregar_a_listado();

--id's empleado
CREATE OR REPLACE FUNCTION AddID()
RETURNS TRIGGER AS $$
DECLARE
    actualData int;
BEGIN
    SELECT COUNT(*) INTO actualData FROM empleado;

    NEW.id_empleado = actualData + 1;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER col1_value
BEFORE INSERT ON empleado
FOR EACH ROW
EXECUTE FUNCTION AddID();

-- añadir a total
CREATE OR REPLACE FUNCTION sumar_total()
RETURNS TRIGGER AS $$
DECLARE
    precio INT;
BEGIN
    -- Si hay bebida
    IF NEW.bebida IS NOT NULL THEN
        SELECT b.precio INTO precio FROM bebida b WHERE b.id_bebida = NEW.bebida LIMIT 1;
        precio := precio * NEW.cantidad;
    -- Si no hay bebida pero hay comida
    ELSIF NEW.comida IS NOT NULL THEN
        SELECT c.precio INTO precio FROM comida c WHERE c.id_comida = NEW.comida LIMIT 1;
        precio := precio * NEW.cantidad;
    END IF;

    -- Actualizar el total
    UPDATE pedido SET total = total + precio WHERE id_pedido = NEW.pedido;
	UPDATE pedido SET propina = total*0.10 WHERE id_pedido = NEW.pedido;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sumar_a_total
AFTER INSERT ON Recuento
FOR EACH ROW
EXECUTE FUNCTION sumar_total();

-- Luego de marcado como listo, eliminar
CREATE OR REPLACE FUNCTION eliminar_comida()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM comida_cocina WHERE id_preparacion = NEW.id_preparacion AND hora = NEW.hora;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER eliminar_preparacion
AFTER UPDATE ON comida_cocina
FOR EACH ROW
WHEN (NEW.estado = true)
EXECUTE FUNCTION eliminar_comida();

CREATE OR REPLACE FUNCTION eliminar_bebida()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM bebidas_bar WHERE id_preparacion = NEW.id_preparacion AND hora = NEW.hora;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER eliminar_preparacion
AFTER UPDATE ON bebidas_bar
FOR EACH ROW
WHEN (NEW.estado = true)
EXECUTE FUNCTION eliminar_bebida();

-- SET DEFAULT VALUES
CREATE OR REPLACE FUNCTION AddID_Mesa()
RETURNS TRIGGER AS $$
DECLARE
    actualData int;
BEGIN
    SELECT COUNT(*) INTO actualData FROM mesa;

    NEW.id_mesa = actualData + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_id_mesa_trigger
BEFORE INSERT ON mesa
FOR EACH ROW
EXECUTE FUNCTION AddID_Mesa();

CREATE OR REPLACE FUNCTION AddID_Pedido()
RETURNS TRIGGER AS $$
DECLARE
    actualData int;
BEGIN
    SELECT COUNT(*) INTO actualData FROM pedido;

    NEW.id_pedido = actualData + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_id_pedido_trigger
BEFORE INSERT ON pedido
FOR EACH ROW
EXECUTE FUNCTION AddID_Pedido();

CREATE OR REPLACE FUNCTION set_pedido_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Asigna la fecha actual a la columna fecha
    NEW.fecha := CURRENT_DATE;
    
    -- Asigna la hora actual a la columna hora
    NEW.hora := CURRENT_TIME;
    
    -- Asigna el valor cero a la columna total
    NEW.total := 0;
	
	NEW.estado := true;
    
    -- Retorna el nuevo registro con los valores modificados
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_pedido_defaults_trigger
BEFORE INSERT ON Pedido
FOR EACH ROW
EXECUTE FUNCTION set_pedido_defaults();

CREATE OR REPLACE FUNCTION set_encuesta_defaults()
RETURNS TRIGGER AS $$
DECLARE
	actualData INT;
BEGIN
	SELECT COUNT(*) INTO actualData FROM encuesta;
    NEW.fecha := CURRENT_DATE;
    NEW.id_encuesta := actualData + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER defaults_trigger
BEFORE INSERT ON encuesta
FOR EACH ROW
EXECUTE FUNCTION set_encuesta_defaults();

CREATE OR REPLACE FUNCTION set_queja_defaults()
RETURNS TRIGGER AS $$
DECLARE
	actualData INT;
BEGIN
	SELECT COUNT(*) INTO actualData FROM queja;
    NEW.fecha := CURRENT_DATE;
	
	NEW.hora := CURRENT_TIME;
    
    NEW.id_queja := actualData + 1;
	
    -- Retorna el nuevo registro con los valores modificados
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER defaults_trigger
BEFORE INSERT ON queja
FOR EACH ROW
EXECUTE FUNCTION set_queja_defaults();

CREATE OR REPLACE FUNCTION set_factura_defaults()
RETURNS TRIGGER AS $$
DECLARE
	actualData INT;
BEGIN
	SELECT COUNT(*) INTO actualData FROM factura;
    NEW.fecha := CURRENT_DATE;
	NEW.hora := CURRENT_TIME;
    NEW.id_factura := actualData + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER defaults_trigger
BEFORE INSERT ON factura
FOR EACH ROW
EXECUTE FUNCTION set_factura_defaults();


CREATE OR REPLACE FUNCTION bebida_a_recuento(idbebida INT, idpedido INT)
RETURNS void AS $$
DECLARE
    id INT;
	precio INT;
BEGIN
    -- Verifica si existe un registro para bebida y pedido
    SELECT COUNT(*) INTO id FROM recuento WHERE bebida = idbebida AND pedido = idpedido;
    
    IF id = 0 THEN
        -- Inserta un nuevo registro si no existe
        INSERT INTO recuento (pedido, bebida, comida, cantidad)
        VALUES (idpedido, idbebida, null, 1);
    ELSE
        -- Actualiza la cantidad si ya existe un registro
        UPDATE recuento SET cantidad = cantidad + 1
        WHERE bebida = idbebida AND pedido = idpedido;
		
		-- Actualizar total en pedido
        SELECT b.precio INTO precio FROM bebida b WHERE id_bebida = idbebida;
        UPDATE pedido SET total = total + precio WHERE id_pedido = idpedido;
        UPDATE pedido SET propina = total*0.10 WHERE id_pedido = idpedido;
    END IF;

    RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION comida_a_recuento(idcomida INT, idpedido INT)
RETURNS void AS $$
DECLARE
    id INT;
	precio INT;
BEGIN
    -- Verifica si existe un registro para bebida y pedido
    SELECT COUNT(*) INTO id FROM recuento WHERE comida = idcomida AND pedido = idpedido;
    
    IF id = 0 THEN
        -- Inserta un nuevo registro si no existe
        INSERT INTO recuento (pedido, bebida, comida, cantidad)
        VALUES (idpedido, null, idcomida, 1);
    ELSE
        -- Actualiza la cantidad si ya existe un registro
        UPDATE recuento SET cantidad = cantidad + 1
        WHERE comida = idcomida AND pedido = idpedido;
		
		-- Actualizar total en pedido
        SELECT c.precio INTO precio FROM comida c WHERE id_comida = idcomida;
        UPDATE pedido SET total = total + precio WHERE id_pedido = idpedido;
        UPDATE pedido SET propina = total*0.10 WHERE id_pedido = idpedido;
    END IF;

    RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION existe_cliente(_nit INT, _nombre VARCHAR, _direccion VARCHAR)
RETURNS SETOF cliente AS $$
DECLARE
    actualData INT;
	id int := 0;
BEGIN
    SELECT COUNT(*) INTO actualData FROM cliente;
	-- Verifica si existe este cliente
    SELECT COUNT(*) INTO id FROM cliente WHERE nit = _nit;
    
    IF id = 0 THEN
        -- Inserta como nuevo cliente si no existe
        INSERT INTO cliente (id_cliente, nit, nombre, direccion)
        VALUES (actualData + 1, _nit, _nombre, _direccion);
    END IF;
    RETURN QUERY SELECT * FROM cliente WHERE nit = _nit;
END;
$$ LANGUAGE plpgsql;

-- RESTRICCIONES
ALTER TABLE Pedido
ADD CONSTRAINT chk_empleado 
CHECK (empleado_mesero(empleado));

ALTER TABLE Encuesta
ADD CONSTRAINT chk_empleado_encuesta 
CHECK (empleado_mesero(empleado));

ALTER TABLE Encuesta
ADD CONSTRAINT chk_amabilidad
CHECK (amabilidad BETWEEN 1 AND 5);

ALTER TABLE Encuesta
ADD CONSTRAINT chk_exactitud
CHECK (exactitud BETWEEN 1 AND 5);

ALTER TABLE Queja
ADD CONSTRAINT chk_clasificacion
CHECK (clasificacion BETWEEN 1 AND 5);

ALTER TABLE Mesa
ADD CONSTRAINT chk_capcidad
CHECK (capacidad BETWEEN 1 AND 14);

ALTER TABLE Empleado
ADD CONSTRAINT chk_trabajos
CHECK (trabajo IN ('mesero', 'chef', 'host'));

ALTER TABLE Pedido
ALTER COLUMN hora TYPE TIME(0);

ALTER TABLE Factura
ALTER COLUMN hora TYPE TIME(0);

ALTER TABLE Queja
ALTER COLUMN hora TYPE TIME(0);

ALTER TABLE Recuento
ADD CONSTRAINT chk_bebida_o_comida
CHECK (
    (comida IS NOT NULL AND bebida IS NULL) OR
    (bebida IS NOT NULL AND comida IS NULL)
);

-- REQUISITOS ESTADÍSTICAS
-- Reporte de los platos más pedidos por los clientes en un rango de fechas solicitadas al usuario.
CREATE OR REPLACE FUNCTION platos_mas_pedidos(fecha_incial DATE, fecha_final DATE)
RETURNS TABLE(comida VARCHAR, bebida VARCHAR, solicitados BIGINT) AS $$
BEGIN
    RETURN QUERY 
	SELECT 
		c.nombre As Comida, 
		b.nombre As Bebida, 
		SUM(r.cantidad) As solicitados
	FROM 
		recuento r 
		JOIN pedido p ON r.pedido = p.id_pedido
		LEFT JOIN comida c ON r.comida = c.id_comida 
		LEFT JOIN bebida b ON r.bebida = b.id_bebida
	WHERE 
		p.fecha BETWEEN fecha_incial AND fecha_final
	GROUP BY 
		c.nombre, b.nombre
	ORDER BY 
		3 DESC;
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM platos_mas_pedidos('2024-04-12', '2024-04-13');

-- Horario en el que se ingresan más pedidos entre un rango de fechas solicitadas al usuario.
CREATE OR REPLACE FUNCTION horarios_pedidos(fecha_incial DATE, fecha_final DATE)
RETURNS TABLE(hora INTERVAL, pedidos BIGINT) AS $$
BEGIN
    RETURN QUERY 
	SELECT 
		DATE_TRUNC('hour', p.hora) AS hora_general,
		COUNT(*) AS PedidosRealizados
	FROM pedido p
	WHERE fecha BETWEEN fecha_incial AND fecha_final
	GROUP BY hora_general
	ORDER BY 2 DESC; 
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM horarios_pedidos('2024-04-12', '2024-04-13');

--Promedio de tiempo en que se tardan los clientes en comer, agrupando la cantidad de personas comiendo, por ejemplo: 
--2 personas: 1 hora 10 minutos, 3 personas: 1 hora 15 minutos, etc. entre un rango de fechas solicitadas al usuario.
CREATE OR REPLACE FUNCTION promedio_comidas(fecha_incial DATE, fecha_final DATE)
RETURNS TABLE(personas INTEGER, promedio INTERVAL) AS $$
BEGIN
    RETURN QUERY 
	SELECT 
		m.capacidad AS PersonasComiendo,
		AVG(f.hora - p.hora) AS PromTiempo
	FROM pedido p 
		JOIN mesa m ON p.mesa = m.id_mesa
		JOIN factura f ON p.id_pedido = f.pedido
	WHERE 
		p.fecha BETWEEN fecha_incial AND fecha_final
	GROUP BY 
		m.capacidad
	ORDER BY 
		2 DESC;
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM promedio_comidas('2024-04-12', '2024-04-13');

-- Reporte de las quejas agrupadas por persona para un rango de fechas solicitadas al usuario.
CREATE OR REPLACE FUNCTION quejas_empleados(fecha_incial DATE, fecha_final DATE)
RETURNS TABLE (
    id_queja INT,
    cliente VARCHAR,
    comida VARCHAR,
    bebida VARCHAR,
    empleado VARCHAR,
    trabajo VARCHAR,
    fecha DATE,
    hora TIME,
    motivo TEXT,
    clasificacion INTEGER
) AS $$
BEGIN
    RETURN QUERY 
	SELECT 
		q.id_queja, c.nombre AS cliente,
		k.nombre AS comida, b.nombre AS bebida,
		e.nombre AS empleado, e.trabajo AS trabajo,
		q.fecha, q.hora, q.motivo, q.clasificacion
	FROM queja q 
		JOIN cliente c ON q.cliente = c.id_cliente
		LEFT JOIN comida k ON q.comida = k.id_comida
		LEFT JOIN bebida b ON q.bebida = b.id_bebida
		JOIN empleado e ON q.empleado = e.id_empleado
	WHERE q.fecha BETWEEN fecha_incial AND fecha_final
	ORDER BY 5; 
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM quejas_empleados('2024-04-12', '2024-04-13');

-- Reporte de las quejas agrupadas por plato para un rango de fechas solicitadas al usuario.
CREATE OR REPLACE FUNCTION quejas_platos(fecha_incial DATE, fecha_final DATE)
RETURNS TABLE (
    id_queja INT,
    cliente VARCHAR,
    comida VARCHAR,
    bebida VARCHAR,
    empleado VARCHAR,
    trabajo VARCHAR,
    fecha DATE,
    hora TIME,
    motivo TEXT,
    clasificacion INTEGER
) AS $$
BEGIN
    RETURN QUERY 
	SELECT 
		q.id_queja, c.nombre AS cliente,
		k.nombre AS comida, b.nombre AS bebida,
		e.nombre AS empleado, e.trabajo AS trabajo,
		q.fecha, q.hora, q.motivo, q.clasificacion
	FROM queja q 
		JOIN cliente c ON q.cliente = c.id_cliente
		LEFT JOIN comida k ON q.comida = k.id_comida
		LEFT JOIN bebida b ON q.bebida = b.id_bebida
		LEFT JOIN empleado e ON q.empleado = e.id_empleado
	WHERE q.fecha BETWEEN fecha_incial AND fecha_final
	ORDER BY 3,4; 
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM quejas_platos('2024-04-12', '2024-04-13');

-- Reporte de eficiencia de meseros mostrando los resultados de las encuestas, agrupado por personas 
-- y por mes para los últimos 6 meses.
CREATE OR REPLACE FUNCTION eficiencia_meseros()
RETURNS TABLE(
	mesero VARCHAR,
	mes TEXT,
	amabilidad NUMERIC,
	exactitud NUMERIC) AS $$
DECLARE
	hoy DATE := CURRENT_DATE; -- Fecha actual
    seis_meses DATE := CURRENT_DATE - INTERVAL '6 months'; -- Seis meses antes de hoy
BEGIN
    RETURN QUERY 
	SELECT
		t.nombre AS mesero,
		TO_CHAR(e.fecha, 'Mon') AS mes,
		ROUND(AVG(e.amabilidad), 2), ROUND(AVG(e.exactitud), 2)
	FROM encuesta e
		JOIN cliente c ON e.cliente = c.id_cliente
		JOIN empleado t ON e.empleado = t.id_empleado
	WHERE e.fecha BETWEEN seis_meses AND hoy -- ÚLTIMOS SEIS MESES
	GROUP BY 1, 2
	ORDER BY 1; 
END;
$$ LANGUAGE plpgsql;
-- SELECT * FROM eficiencia_meseros();

-- INSERTS
-- Tabla Area
INSERT INTO Area (id_area, nombre, fumador, movible)
VALUES 
(1, 'Terraza', TRUE, TRUE),
(2, 'Salón', FALSE, TRUE),
(3, 'Comedor Privado', FALSE, FALSE);

-- Tabla Mesa
INSERT INTO Mesa (id_mesa, capacidad, area, ocupado)
VALUES
-- Mesas para el área 1
(1, 4, 1, FALSE),
(2, 6, 1, FALSE),
(3, 8, 1, FALSE),
(4, 10, 1, FALSE),

-- Mesas para el área 2
(5, 4, 2, FALSE),
(6, 6, 2, FALSE),
(7, 8, 2, FALSE),
(8, 12, 2, FALSE),

-- Mesas para el área 3
(9, 4, 3, FALSE),
(10, 6, 3, FALSE),
(11, 8, 3, FALSE),
(12, 10, 3, FALSE);

-- Tabla Empleado
INSERT INTO Empleado (id_empleado, nombre, trabajo, area, contraseña)
VALUES
(1, 'Juan Pérez', 'mesero', 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Laura Gómez', 'chef', 2, '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 'Carlos Ruiz', 'host', 3, '81dc9bdb52d04dc20036dbd8313ed055'),
(4, 'Ana Morales', 'mesero', 2, '81dc9bdb52d04dc20036dbd8313ed055'),
(5, 'José Rodríguez', 'mesero', 3, '81dc9bdb52d04dc20036dbd8313ed055');

-- Tabla Pedido
INSERT INTO Pedido (id_pedido, mesa, total, propina, fecha, hora, empleado, estado)
VALUES
(1, 1, 120.50, 12.05, '2024-04-12', '12:00:00', 1, FALSE),
(2, 2, 80.00, 8.00, '2024-04-12', '13:00:00', 4, FALSE),
(3, 3, 60.00, 6.00, '2024-04-12', '14:00:00', 1, FALSE),
(4, 4, 200.00, 20.00, '2024-04-12', '14:30:00', 5, FALSE),
(5, 5, 160.00, 16.00, '2024-04-12', '15:00:00', 5, FALSE);

-- Tabla Comida
INSERT INTO Comida (id_comida, nombre, descripcion, precio)
VALUES
(1, 'Hamburguesa', 'Hamburguesa clásica', 12.50),
(2, 'Ensalada César', 'Ensalada de lechuga, pollo y parmesano', 9.00),
(3, 'Pizza', 'Pizza de pepperoni', 15.00),
(4, 'Pasta Alfredo', 'Pasta con salsa de queso', 13.50),
(5, 'Sopa de Tomate', 'Sopa cremosa de tomate', 7.00);

-- Tabla Bebida
INSERT INTO Bebida (id_bebida, nombre, descripcion, precio)
VALUES
(1, 'Coca-Cola', 'Refresco de cola', 2.50),
(2, 'Jugo de Naranja', 'Jugo natural de naranja', 3.00),
(3, 'Cerveza', 'Cerveza artesanal', 5.00),
(4, 'Té Helado', 'Té negro con hielo y limón', 2.75),
(5, 'Agua Mineral', 'Agua con gas', 2.00);

-- Tabla Recuento
INSERT INTO Recuento (pedido, bebida, comida, cantidad)
VALUES
(1, 1, NULL, 2),
(2, 3, NULL, 1),
(3, NULL, 2, 1),
(4, NULL, 4, 1),
(5, 5, NULL, 3);

-- Tabla Cliente
INSERT INTO Cliente (id_cliente, nit, nombre, direccion)
VALUES
(1, 123456789, 'María Jiménez', 'Calle 10 #5-20'),
(2, 987654321, 'Pedro Ramírez', 'Av. Principal #45-30'),
(3, 555444333, 'Ana García', 'Carrera 15 #23-50'),
(4, 666777888, 'Carlos Gutiérrez', 'Plaza Central #12-5'),
(5, 111222333, 'Sofía López', 'Calle 9 #3-10');

-- Tabla Factura
INSERT INTO Factura (id_factura, cliente, pedido, hora, fecha)
VALUES
(1, 1, 1, '13:30:00', '2024-04-12'),
(2, 2, 2, '14:00:00', '2024-04-12'),
(3, 3, 3, '14:30:00', '2024-04-12'),
(4, 4, 4, '15:00:00', '2024-04-12'),
(5, 5, 5, '15:30:00', '2024-04-12');

-- Tabla Forma de pago
INSERT INTO Forma_de_pago (fraccion, tipo, factura)
VALUES
(0.6, 'Efectivo', 1),
(0.4, 'Tarjeta', 1),
(1.0, 'Efectivo', 2),
(1.0, 'Tarjeta', 3),
(0.5, 'Tarjeta', 4),
(0.5, 'Efectivo', 4),
(1.0, 'Efectivo', 5);

-- Tabla Encuesta
INSERT INTO Encuesta (id_encuesta, cliente, empleado, amabilidad, exactitud, fecha)
VALUES
(1, 1, 1, 5, 4, '2024-04-12'),
(2, 2, 4, 4, 4, '2024-04-12'),
(3, 3, 1, 3, 4, '2024-04-12'),
(4, 4, 5, 5, 5, '2024-04-12'),
(5, 5, 5, 4, 4, '2024-04-12');

-- Tabla Queja
INSERT INTO Queja (id_queja, cliente, empleado, comida, bebida, fecha, hora, motivo, clasificacion)
VALUES
(1, 1, NULL, 2, NULL, '2024-04-12', '13:00:00', 'La ensalada estaba demasiado salada', 2),
(2, 2, NULL, NULL, 3, '2024-04-12', '13:30:00', 'La cerveza estaba caliente', 1),
(3, 3, NULL, NULL, NULL, '2024-04-12', '14:00:00', 'No se entregó el pedido completo', 3),
(4, 4, NULL, 4, NULL, '2024-04-12', '14:30:00', 'La pasta no estaba al dente', 2),
(5, 5, 5, NULL, 2, '2024-04-12', '15:00:00', 'El jugo de naranja estaba agrio', 2);

-- Tabla Bebidas_bar
INSERT INTO Bebidas_bar (id_preparacion, bebida, cantidad, pedido, hora, estado)
VALUES
(1, 1, 2, 1, '12:30:00', FALSE),
(2, 3, 1, 2, '13:15:00', FALSE),
(3, 5, 3, 3, '13:45:00', FALSE),
(4, 4, 2, 4, '14:00:00', FALSE),
(5, 2, 1, 5, '14:30:00', FALSE);

-- Tabla Comida_cocina
INSERT INTO Comida_cocina (id_preparacion, comida, cantidad, pedido, hora, estado)
VALUES
(1, 2, 1, 1, '12:45:00', FALSE),
(2, 3, 1, 2, '13:00:00', FALSE),
(3, 1, 1, 3, '13:15:00', FALSE),
(4, 4, 1, 4, '13:30:00', FALSE),
(5, 5, 1, 5, '13:45:00', FALSE);
