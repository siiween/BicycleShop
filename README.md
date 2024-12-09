# BicycleShop
 
IDEAS: 
- Have separated table for stock and price to manage diferent regions, country options or even save old prices. But to keep it simple we will manage that in a single table.
- Pagination in categories, parts, products or options to handle large data sets
- Filters by stock, name...

zustand: we are gonna use zustand because our configurator is not that complex and is gonna help us but I think is a best option to use redux because is easier to scale

añadir mas informacion sobre los productos como numero de serie como id o minimo clave ajena...

pueden haber conflictos en las dependencias de precios ya que si hay una misma opcion que depende de otras dos ya seleccionadas, que precio cogemos? supongo que la mas cara arbitrariamente?

quiza mejor usar react query para las llamadas que tienen que ser de parte del cliente, para cachear todo?

imagenes de producto

manejar cargas y tiempos de espera para que sea mas user friendly


si eliminas una opcion o parte y luego vuelves al cofigurador teniendo en el store una configuracion hecha con esa opcion da error porque no la encuentra en la bbdd


he creado dependet price como una combinacion de dos opciones pero quiza es mejor una combinacion de dos o mas opciones como forbidden combinations y cuando calculemos el precio busquemos subconjuntos. Tendreiamos una opcion que es la que le cambia el precio y las demas que son las que le aplicaria eso


el stock se maneja en la base de datos normal sin hacer nada especial pero en un caso real y con tiempo se haria lo que llamamos reserva temporal, que te evita vender más de la cuenta ya que si no podrian 40 personas tener en el carrito un producto donde solo hay 10 unidades. Eso se hace durante un tiempo, despues se les elimina. Nosotro usamos indexDB para manejar el carrito pero en una situacion real le daria un efoque mas hacia el backend donde guardariamos por usuario un carrito y si es un guest user creariamos una key la cual se guardaria en su localstorage y con eso podriamos saber que es el y recuperar sus productos. Ademas todo iria encolado para evitar que dos personas a la vez hagan checkout del mismo producto o añadan al carrito la misma unidad. En este caso de uso no lo hacemos por tema de tiempo


quiza mejor usar reactquery cuando son llamadas en el cliente para evitar hacer la llamada todo el rato, por ejemplo cuando abrimos el carrito? aunque por otra parte es bueno si tenemos un sistema agresivo de cambios de precios.

Checkear de nuevo las configuraciones en el checkout por si nos hemos quedado sin stock o algo?


al usar zustand para la configuracion se acuerda de la ultima configuracion que hicimos por lo que si entramos de nuevo a ese producto nos deja donde estabamos, si entramos a otro se reinicia. buena idea llevar varias config al mismo tiempo?


Si usaramos carrito en el back podriamos guardas las configuraciones para poder rehacerlas mas tarde, como hacen las webs de coches

Mejorar las validaciones de formularios en el frontend 

en el docker no usamos build y start ya que daria error al hacer buuld porque espera que la api este activa en el puerto 3030 pero aun no lo esta. Por eso usamos server de dev para el docker


con este sistema de carritos hay problemas de sincronizacion de stock si hay muchas compras

mejorar sistema de errores en el front


la idea era tener imagenes por opcion, parte, producto... pero la deseche y oslo lo hice por producto

cambiar url de imagenes

