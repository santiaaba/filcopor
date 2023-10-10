import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Register3(props) {
  const { enablebutton, user, setUser } = props;
  const [checked, setChecked] = React.useState(false);
 

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Grid
      container
      padding={2}
      marginLeft={18}
      direction="row"
      
      alignItems="stretch"
    >
      <Grid item xs={6} sx={{ backgroundColor: "white" }}>
        <Typography variant="body2" gutterBotto>
          <TextField
            sx={{ width: "700px" }}
            multiline
            rows={20}
            InputProps={{readOnly: true}}
            defaultValue='
            CONTRATO DE SERVICIO SAAS (SOFTWARE COMO UN SERVICIO) 
            -----------------------------------------------------------------------------------------------

            Empresa que presta el servicio SaaS: FilCoPor Sociedad de Hecho, con domicilio
            en Av. 7 N° 776, La Plata (CP 1900), Buenos Aires, Argentina en
            adelante FilCoPor. El usuario del servicio o servicios, en adelante
            "CLIENTE", acepta las condiciones detalladas en el presente
            contrato. El uso de este/os servicio/s conlleva la aceptación plena
            de las condiciones del presente contrato. CONDICIONES GENERALES 

            1.El servicio 
            
            1.1. FilCoPor es un servicio de filtrado de contenido
            pornográfico mediante DNS recursivo. FilCoPor no ofrece servicio de
            DNS autoritativo. Se ofrecen como mínimo dos DNS recursivos a ser
            configurados por el CLIENTE en sus dispositivos. FilCoPor no se hace
            responsable por una mala configuración por parte del CLIENTE en sus
            dispositivos o pérdida de configuraciones. 
            
            1.2. FilCoPor no permite
            utilizar el servicio de DNS ya configurado hasta que el cliente
            autentique con sus credenciales. De esta forma FilCoPor reconoce la
            IP pública del cliente y permitirá a dicha IP la utilización del DNS
            recursivo. Caso contrario toda resolución de DNS retornará la la IP
            de un portal cautivo en el cual el cliente deberá autenticar. 
            
            1.3. FilCoPor admite utilizar el servicio en una LAN la cual obtiene
            acceso a Internet mediante NAT. Permitiendo a toda la LAN usar el
            servicio de FilCoPor con una sola cuenta de usuario. 
            
            1.4. FilCopor no admite más de 30 consultas de DNS por segundo provenientes 
            de la misma IP pública. 
            
            1.5. FilCoPor puede ser utilizado desde Internet
            desde cualquier IP pública siempre y cuando pueda alcanzar a las IP
            de los DNS del servicio. FilCoPor no se hace responsable por
            problemas de ruteo, políticas de seguridad, restricciones de acceso
            y cualquier otra configuración propia de una empresa, región o país
            dueño de la ip pública desde la cual se desee acceder a los DNS de
            FilCoPor. 
            
            1.6. FilCoPor no permite usar la misma cuenta de usuario
            desde más de una IP pública. El intento de dicha acción ocasiona que
            solo una IP pueda navegar por Internet mientras que la otra obtendrá
            el portal de login. 
            
            1.7. Sobre el contenido filtrado. Se considera
            sitio a ser filtrado aquel que contenga imágenes, videos o texto
            sobre sexo explícito, desnudos totales o parciales que se considere
            de caracter pornográfico, juguetes sexuales y páginas de chat e
            historias de sexo. No será considerado contenido pornográfico y por
            lo tanto no será filtrado aquel contenido de desnudos totales o
            parciales con fines educativos,científicos o artísticos. No será
            filtrado tampoco imágenes o videos sobre lencería, modelaje,
            violencia o drogas. 
            
            1.8. El CLIENTE acepta que FilCoPor puede
            generar falsos positivos y falsos negativos. Un falso positivo se da
            cuando FilCoPor considera un sitio pornográfico cuando no lo es e
            impide su acceso. Un Falso Negativo se da cuando FilCoPor no filtra
            un sitio pornográfico que sí lo es. El CLIENTE en ambos casos puede
            reportar el sitio a FilCoPor para que tome acciones. 
            
            1.9. FilCoPor se reserva el derecho de determinar cuál contenido 
            debe ser filtrado y cuál no. Pudiendo el CLIENTE reportar sobre Falsos 
            positivos y Falsos negativos a la espera de que un Administrador determine si
            dichos sitios reportados deben comenzar a considerarse entre los
            filtrados o no. 
            
            1.10. FilCoPor no filtra contenido accedido
            directamente por IP aún cuando contengan contenido pornográfico.
            FilCoPor no filtra correos, sitios de phishing, sitios con archivos
            con malware. 
            
            2. Política de protección de datos FilCoPor, siguiendo
            la normativa vigente de protección de Datos de Carácter Personal
            (Ley reguladora de la privacidad de datos, Ley Nº 25.326), informa:
            
            
            2.1. Que los datos de navegación recogidos de los dominios se
            incluyen en ficheros automatizados de uso interno, cuyo responsable
            y titular es FilCoPor, con el fin de poder prestar los servicios
            contratados por el CLIENTE, o en caso contrario, poder facilitarle
            cualquier información que éste requiera de una forma personalizada.
            
            2.2. FilCoPor garantiza la confidencialidad de todos los datos
            recogidos desde sus dominios/subdominios anteriormente relacionados,
            adoptando las medidas técnicas que sean necesarias para garantizar
            la seguridad e integridad de las mismas. 
            
            2.3. FilCoPor se compromete a no vender, ceder o transferir los datos 
            recogidos bajo ningún concepto. No obstante FilCoPor revelará a las autoridades públicas
            competentes los Datos Personales o cualquier otra información que
            sea requerida de conformidad a las disposiciones legales y
            reglamentarias aplicables en cada caso. 
            
            2.4. FilCoPor asegura que protegerá la confidencialidad del 
            correo electrónico intercambiando con el CLIENTE.
            
            2.5. El CLIENTE tiene reconocidos sus derechos, y
            podrán ejercitar sus derechos de acceso, cancelación, rectificación
            y oposición en cualquier momento, solicitándolo a FilCoPor por
            correo electrónico en la dirección info@filcopor.com. 
            
            2.6. El CLIENTE garantiza y responde, en cualquier caso, de la veracidad,
            exactitud, vigencia y autenticidad de los datos facilitados (proceso
            de suscripción, etc.), y se compromete a mantenerlas debidamente
            actualizadas. 
            
            2.7. El CLIENTE autoriza de forma inequívoca a
            FilCoPor el tratamiento informático de los datos facilitados bajo
            las condiciones descritas en este documento y exclusivamente para
            poder facilitar y facturar de forma correcta los servicios
            contratados. 
            
            2.8. El CLIENTE se compromete a cumplir las
            obligaciones derivadas de las Leyes de Protección de Datos o
            cualquier otra que sean aplicables a cada momento. El CLIENTE es
            responsable de comunicar y hacer cumplir la ley vigente de
            protección de datos de carácter personal. 
            
            3. Soporte técnico o consultas 
            
            3.1. FilCoPor ofrecerá soporte técnico o
            administrativo/comercial mediante la línea telefónica o correo
            electrónico brindados al cliente. 
            
            3.2. El tiempo de respuesta es de
            menos de 6 horas en casos de incidencias y soporte técnico o
            funcional. En el cómputo de tiempo no se considerarán los sábados,
            domingos y festivos oficiales de Argentina y sus distintas Regiones
            o Autonomías. 
            
            3.3. El servicio se prestará dentro del horario
            laboral de FilCoPor: de lunes a viernes de 9:00h. a 20:00h (huso
            horario GMT-3). 
            
            3.4. Los servicios de mantenimiento, actualizaciones
            y resolución de errores en los servidores del CLIENTE se realizarán
            de forma remota desde las oficinas de FilCoPor. Estos servicios no
            incluyen desplazamientos a las instalaciones del CLIENTE. El CLIENTE
            ha de proporcionar los datos de conexión remotos (nombre o IP del
            servidor, puertos, usuarios, contraseñas) y tener el servidor y
            router encendidos y bien configurados. 
            
            4. Precios, facturación y pagos del servicio prestado 
            
            4.1. FilCoPor informará al CLIENTE, en
            el propio proceso de suscripción, del precio del servicio o
            servicios contratados. 
            
            4.2. El pago de los servicios prestados es de
            carácter mensual. El proceso de facturación es como sigue: el día
            del alta se emitirá una factura correspondiente a la parte
            proporcional de los días restantes del mes sobre la cuota del
            servicio seleccionado. El resto de facturaciones se realizarán en
            los 5 primeros días del mes en curso durante el periodo de
            suscripción. El pago podrá efectuarse por MercadoPago o tarjeta de
            crédito/debito. 
            
            4.3. El precio del servicio podrá ser modificado por
            parte de FilCoPor avisando con 30 días de antelación a través de los
            medios que considere necesarios, incluido Internet. En el caso de
            que haya una modificación de tarifas por parte de FilCoPor, una vez
            notificado este cambio, si el CLIENTE no rechaza la variación
            solicitando la baja del servicio, se entenderá que acepta las nuevas
            tarifas. 
            
            4.4. En caso de devolución, retraso o impago de recibo de 5
            días posterior a la fecha de facturación de cada mes, FilCoPor
            suspenderá el servicio, avisando previamente al CLIENTE, hasta la
            confirmación del pago debido. En caso de devolución del recibo se
            cargará al CLIENTE con un monto extra informado al día en el sitio
            de FilCoPor + IVA adicionales por coste de comisiones bancarias.
           
            4.5. Después de reiterados retrasos o impagos, FilCoPor se reserva
            el derecho a solicitar al CLIENTE una fianza, con importe igual a la
            cuota que esté pagando. 
            
            4.6. Si diera el caso de tener que cancelar
            un servicio por impago, FilCoPor no será responsable de los
            perjuicios que eso le pueda ocasionar al CLIENTE, o a los clientes
            del CLIENTE. 
            
            5. Plazo de contrato y baja del servicio 5.0 Este
            contrato de servicio no posee una fecha de expiración. La relación
            contractual entre FilCoPor y el CLIENTE comienza en el momento que
            el CLIENTE acepta éste contrato. 
            
            5.1 No existe obligación de
            permanencia por parte del CLIENTE o FilCoPor por un período de
            tiempo establecido pudiendo ambas partes rescindir el contrato en
            cualquier momento como se detalla en los siguientes puntos. 
            
            5.2. El CLIENTE podrá anular el contrato solicitando con 5 días de
            antelación al inicio del nuevo período de cargo de la suscripción
            mediante correo electrónico a info@filcopor.com o a través de los
            canales que se especifican en la web relacionada con el producto
            suscrito. Una vez pasada esta fecha, FilCoPor podrá reclamar el pago
            del mes completo. 
            
            5.3. La baja se efectuará en un día laborable (de
            lunes a viernes) y será efectiva antes de las 24 horas transcurridas
            desde la solicitud. El servicio completo de baja sólo lo activará un
            miembro de FilCoPor. 
            
            5.4 La baja del CLIENTE conlleva la eliminación
            de la Base de Datos del mismo a partir de las 48 horas posteriores a
            la confirmación de la baja. El CLIENTE tiene el derecho de solicitar
            copia de su base de datos en este tiempo, FilCoPor enviará al
            CLIENTE un fichero de copia de base datos. 
            
            5.5. En caso de interceptar cualquier conducta o actividad ilegal, FilCoPor se
            reserva el derecho a denegar o cesar los servicios contratados sin
            previo aviso. 
            
            5.6. En el hipotético caso que FilCoPor cancelara el
            servicio prestado sin que el CLIENTE haya infringido alguna de las
            condiciones aquí descritas, le sería devuelto el importe
            correspondiente a la parte proporcional del período no consumido.
            
            5.7. FilCoPor se reserva el derecho de rescindir el contrato con el
            CLIENTE en cualquier momento devolviéndole al mismo el importe
            correspondiente a la parte proporcional del período no consumido.
            5.8. En cualquier caso FilCoPor no será responsable de las
            consecuencias que puedan derivarse de la interrupción del servicio.
            
            6. Garantías del servicio prestado 6.1. FilCoPor se responsabilizará
            del correcto funcionamiento del producto contratado, resolviendo a
            la mayor brevedad posible cualquier incidencia derivada del mal
            funcionamiento del mismo. FilCoPor no se hace responsable del mal
            funcionamiento del servicio debido a problemas asociados a terceros
            como ser Proveedor de Internet del CLIENTE. 
            
            6.2. El CLIENTE deberá comunicar la incidencia por correo electrónico a la dirección
            informatica@filcopor.com o a través de los canales que se
            especifican en la web relacionada con el producto suscrito. 
            
            6.3. En caso de que las incidencias puedan derivar de un mal uso por parte
            del CLIENTE, FilCoPor se reserva el derecho a facturar al CLIENTE
            estos gastos. 
            
            6.4. FilCoPor no se hace responsable de la adecuación
            de los servicios que ofrece a las necesidades del CLIENTE. Su
            inadecuación no podrá ser causa de resolución del contrato ni de
            impago de las cuotas. 
            
            6.5. El CLIENTE deberá poner todos los medios
            disponibles a su alcance para evitar el uso y acceso de otros
            clientes, terceras personas no autorizadas, no contemplados en el
            contrato, o hacer un uso indebido del producto contratado. 6.6.
            FilCoPor efectúa copias de seguridad de las bases de datos de los
            CLIENTES con las que se pueda restablecer el servicio en caso de
            incidencia técnica grave. Así mismo, FilCoPor no se responsabiliza
            de las posibles pérdidas de datos o errores en el servicio prestado.
            
            6.7. El CLIENTE deberá velar por el secreto de las palabras
            (contraseñas) de acceso al servicio, modificándose si tiene la menor
            sospecha de que terceras personas las conocen. 
            
            7. Responsabilidades
            
            7.1. FilCoPor no será responsable de pérdidas de beneficios y daños
            como consecuencia del uso, funcionamiento o rendimiento del
            servicio, siendo responsable únicamente de los actos realizados que
            sean necesarios para el cumplimiento de sus obligaciones de acuerdo
            con este contrato. 
            
            7.2. FilCoPor no será responsable del
            incumplimiento de sus obligaciones definidas en el presente
            contrato, si la realización de estas obligaciones ha sido impedida,
            interferida o retrasada razonablemente por circunstancias que
            escapen al control de FilCoPor. Estos eventos serán, por ejemplo y
            entre otros, los actos de fuerza mayor, actos fortuitos, huelgas,
            motines, cierres patronales, actos de guerra, epidemias, actos o
            reglamentaciones oficiales, incendios, fallos de comunicaciones,
            fallos de suministro eléctrico, rayos, terremotos, inundaciones,
            catástrofes y otros eventos. 
            
            7.3. El CLIENTE se obliga a no subarrendar el servicio contratado a otros 
            clientes o terceras personas. 
            
            8. Modificaciones 
            
            8.1. Las condiciones de este contrato
            podrán ser modificadas por parte de FilCoPor, notificándolo por los
            medios que considere necesarios, con 30 días de antelación. Si
            durante este periodo de tiempo no se rechaza expresamente la
            variación de las condiciones por parte del CLIENTE se entenderá que
            aceptan las modificaciones de las condiciones del contrato. 
            
            9.Resolución de conflictos. Jurisdicción 
            
            9.1. Todas las divergencia que surjan entre LAS PARTES (CLIENTE y FilCoPor) 
            que tengan origen y/o fundamento en la interpretación, aplicación, ejecución y/o
            incumplimiento de las condiciones que, de común acuerdo,
            establecieron en las cláusulas de este Contrato, y que no pudieran
            ser resueltas directamente entre ellas, serán juzgadas conforme el
            derecho argentino y sometidas a la jurisdicción de los Tribunales
            Ordinarios con asiento en la Ciudad de La Plata, renunciando las
            Partes a cualquier otro fuero o jurisdicción que pudiera corresponder.
            '
          />
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event)=> {setChecked(event.target.checked); enablebutton(!event.target.checked)}} />}
            label="He leido y acepto los términos y condiciones del contrato"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default Register3;
