# BicycleShop
 
IDEAS: 
- Have separated table for stock and price to manage diferent regions, country options or even save old prices. But to keep it simple we will manage that in a single table.
- Pagination in categories, parts, products or options to handle large data sets
- Filters by stock, name...

zustand: we are gonna use zustand because our configurator is not that complex and is gonna help us but I think is a best option to use redux because is easier to scale

en las opciones obtener ademas de su precio base el precio relativo a cada producto (con su aumento)

paginas de errores cuando entramos a rutas que no son correctas

añadir mas informacion sobre los productos como numero de serie...

deberiamos de una vez terminada la configuracion de un producto validarla la idea es que tenga una opcion seleccionada de cada parte y que de esa opcion quede stock y no entre en conflicto, ademas de eso deberiamos de conseguir el precio final y un desglose de que cuesta cada cosa

pueden haber conflictos en las dependencias de precios ya que si hay una misma opcion que depende de otras dos ya seleccionadas, que precio cogemos? supongo que la mas cara arbitrariamente?


tener en cuenta y no dejar configurar productos que esten vacios (esto significa productos donde hay partes sin opciones disponibles o directamente no hay partes ya que esto confundiria al usuario), asi como tampoco dejar configurar productos inactivos.


quiza mejor usar react query para las llamadas que tienen que ser de parte del cliente?


endpoint donde obtenga la info de una sola categoria para el listado de productos


imagenes de producto

modificar el card para admin de productos


modularizar y crear atomos de todo lo que se pueda


manejar cargas y tiempos de espera para que sea mas user friendly


falla cuando borramos una part con productos ligados


si eliminas una opcion o parte y luego vuelves al cofigurador teniendo en el store una configuracion hecha con esa opcion da error porque no la encuentra en la bbdd


he creado dependet price como una combinacion de dos opciones pero quiza es mejor una combinacion de dos o mas opciones como forbidden combinations y cuando calculemos el precio busquemos subconjuntos. Tendreiamos una opcion que es la que le cambia el precio y las demas que son las que le aplicaria eso


el stock se maneja en la base de datos normal sin hacer nada especial pero en un caso real y con tiempo se haria lo que llamamos reserva temporal, que te evita vender más de la cuenta ya que si no podrian 40 personas tener en el carrito un producto donde solo hay 10 unidades. Eso se hace durante un tiempo, despues se les elimina. Nosotro usamos indexDB para manejar el carrito pero en una situacion real le daria un efoque mas hacia el backend donde guardariamos por usuario un carrito y si es un guest user creariamos una key la cual se guardaria en su localstorage y con eso podriamos saber que es el y recuperar sus productos. Ademas todo iria encolado para evitar que dos personas a la vez hagan checkout del mismo producto o añadan al carrito la misma unidad. En este caso de uso no lo hacemos por tema de tiempo


quiza mejor usar reactquery cuando son llamadas en el cliente para evitar hacer la llamada todo el rato, por ejemplo cuando abrimos el carrito? aunque por otra parte es bueno si tenemos un sistema agresivo de cambios de precios.

Checkear de nuevo las configuraciones en el checkout por si nos hemos quedado sin stock o algo?


al usar zustand para la configuracion se acuerda de la ultima configuracion que hicimos por lo que si entramos de nuevo a ese producto nos deja donde estabamos, si entramos a otro se reinicia. buena idea llevar varias config al mismo tiempo?


Si usaramos carrito en el back podriamos guardas las configuraciones para poder rehacerlas mas tarde, como hacen las webs de coches