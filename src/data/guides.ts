export interface GuideBlock {
  id: string;
  badge: string;
  category: string;
  title: string;
  subtitle?: string;
  intro: string;
  solutionTitle: string;
  solutionText: string;
  errorTitle?: string;
  errorText?: string;
  warningAlert?: string;
  maintenanceTitle?: string;
  maintenanceText?: string;
  typesInfo?: {
    name: string;
    desc: string;
    suitability: string;
  }[];
}

export const GUIDE_BLOCKS: GuideBlock[] = [
  {
    id: "hormigas",
    badge: "🐜 El terror del jardín",
    category: "Hormigas Negras",
    title: "¿Te comieron el rosal en una noche? Cómo liquidar a las hormigas podadoras.",
    intro: "Te levantás a la mañana y ese limonero o rosal que venía bárbaro ahora son puros palos pelados. Las hormigas negras no perdonan. Y tirarle agua hirviendo a la hormiguera o veneno en polvo por arriba no sirve de nada, porque la reina está a dos metros bajo tierra.",
    solutionTitle: "La solución definitiva: El Cebo Granulado",
    solutionText: "El cebo (tipo Mirex o Glacoxan) es la posta. La hormiga se lleva el granito a la cueva pensando que es comida, el veneno gasifica adentro del nido y liquida a la colonia entera de raíz.",
    errorTitle: "⚠️ El error que cometemos todos: ¡No toques el cebo con la mano!",
    errorText: "Las hormigas tienen un olfato tremendo. Si tocás el veneno, le dejás olor a humano y pasan por al lado sin llevarlo. Cortá la puntita del sachet y tirá los granitos directo en el piso, a unos 10 o 15 centímetros del 'caminito' que arman (no se lo tires encima porque se asustan y cambian de ruta)."
  },
  {
    id: "cucarachas",
    badge: "🪳 Las indeseables de la cocina",
    category: "Cucarachas",
    title: "Cucarachas en la alacena: El truco de la jeringa que no falla.",
    intro: "Apagás la luz de la cocina, volvés a entrar a los 10 minutos y ves cómo corren por la mesada. Tirar aerosol al aire es tirar plata, porque solo matás a las que ves. Las otras cien están escondidas atrás del motor de la heladera o adentro de los enchufes.",
    solutionTitle: "La Jeringa en Gel:",
    solutionText: "Es el arma más letal y limpia para interiores. No mancha, no tiene olor y no es tóxico para los perros o gatos si lo ponés bien.",
    errorTitle: "Dónde aplicarlo:",
    errorText: "Poné gotitas del tamaño de una lenteja en lugares estratégicos:\n\n• En las bisagras de las puertas de la alacena.\n• Atrás del motor de la heladera y el microondas (buscan el calor).\n• Adentro del mueble de la bacha (buscan la humedad).\n\nComen el gel, vuelven al nido y se arma un efecto dominó que te limpia la cocina en un par de días."
  },
  {
    id: "pulverizadores",
    badge: "💦 La Herramienta Clave",
    category: "Pulverizadores",
    title: "Dejá de renegar con el rociador del limpiavidrios: Guía de Pulverizadores.",
    intro: "Si vas a fumigar el patio contra mosquitos y garrapatas, o tenés que tirarle fungicida a los tomates, no podés estar dándole al gatillo de un rociador de a medio litro. Te acalambrás la mano y no cubrís nada. Necesitás presión continua.",
    solutionTitle: "Los tipos de pulverizador recomendados:",
    solutionText: "Dependiendo de la escala de tu parque o balcón, necesitás una herramienta que rinda de verdad sin desgastarte físicamente.",
    typesInfo: [
      {
        name: "Para el patio chico o balcones (1.5 a 2 Litros)",
        desc: "Los pulverizadores de 'presión previa'. Le das bomba con la manija de arriba, inflás el bidoncito y después solo apretás el gatillo. Te tiran una bruma fina constante espectacular.",
        suitability: "Ideal para macetas, tomates y plantas de interior o balcones chicos."
      },
      {
        name: "Para el fondo grande o parques (Mochilas de 12 a 20 Litros)",
        desc: "Son un viaje de ida. Te la colgás en la espalda, vas dándole a la palanca con una mano y con la lanza en la otra fumigás el pasto en 10 minutos sin agacharte.",
        suitability: "Ideal para fumigar césped contra mosquitos, garrapatas o maleza extendida."
      }
    ],
    maintenanceTitle: "💡 Tip de mantenimiento:",
    maintenanceText: "Cuando termines de usarlo, enjuagalo bien y tirá un poco de agua limpia por la lanza. Si le dejás el veneno adentro, los orrings de goma se resecan, se cuartean y la máquina pierde presión."
  },
  {
    id: "guerra-yuyos",
    badge: "🌿 La guerra contra los yuyos",
    category: "Maleza",
    title: "Cómo matar la maleza sin quemar el pasto (Selectivo vs. Total).",
    intro: "Tener el pasto lleno de trébol, diente de león o yuyo sapo te arruina el jardín. El problema es que si vas y comprás cualquier veneno, corrés el riesgo de hacer un desierto. Tenés que saber la diferencia:",
    solutionTitle: "Comparativa de Herbicidas:",
    solutionText: "Entender qué tirar te va a ahorrar el disgusto de secar tu Grama Bahiana o Bermuda por error.",
    typesInfo: [
      {
        name: "1. Herbicida TOTAL (Ej: Glifosato)",
        desc: "Esto mata todo lo que sea verde. Se usa para limpiar veredas, pedregullo, o si querés matar todo el pasto viejo para sembrar de cero. No lo tires en tu césped porque te lo fulmina.",
        suitability: "Exclusivo para accesos, veredas de cemento y áreas inertes de pedregullo."
      },
      {
        name: "2. Herbicida SELECTIVO (Para hojas anchas)",
        desc: "Este es el que necesitás para salvar tu jardín. Está preparado para matar solamente la maleza de 'hoja ancha' (el trébol, el yuyo sapo, la oreja de ratón) y no le hace absolutamente nada al pasto común (Grama Bahiana, Tifway, Bermuda). \n\nSe diluye en agua (leé la etiqueta porque lleva muy poquitos centímetros cúbicos por litro), lo metés en tu pulverizador y rociás las manchas de yuyos a la tardecita cuando ya no pega el sol fuerte.",
        suitability: "Ideal para aplicar sobre césped directamente sin afectarlo."
      }
    ],
    warningAlert: "⚠️ Asegúrate de usar guantes y protección ocular al manipular el producto."
  },
  {
    id: "caracoles",
    badge: "🦪 Devoradores nocturnos",
    category: "Caracoles y Babosas",
    title: "El ataque silencioso: Cómo frenar a los caracoles y babosas antes de que destruyan tus plantas.",
    intro: "Te vas a dormir con las plantas impecables y a la mañana siguiente aparecen llenas de agujeros enormes y un rastro brillante de baba. Los caracoles y las babosas atacan de noche o en días de mucha humedad, y si los dejás, te liquidan los brotes tiernos en horas.",
    solutionTitle: "La solución: Cebos en micropellets",
    solutionText: "Los insecticidas comunes en aerosol no les hacen nada porque tienen una capa protectora de mucosa. Necesitás un molusquicida específico (como el clásico Babosil Cebo Pellets). Estos granitos tienen un atrayente que los imanta: los bichos los comen, se deshidratan rápidamente y mueren.",
    maintenanceTitle: "💡 Tip de aplicación profesional:",
    maintenanceText: "No los tires al voleo por todo el pasto. Armá pequeños montoncitos de una cucharada en las zonas más oscuras, húmedas y con hojarasca del jardín, que es donde se esconden de día. Si tenés mascotas, una buena idea es poner los pellets adentro de una tapita de botella de plástico dada vuelta o abajo de una teja para que los perros no los alcancen pero los caracoles sí."
  },
  {
    id: "cochinillas",
    badge: "🛡️ El escudo invisible",
    category: "Cochinillas",
    title: "¿Qué es un insecticida SISTÉMICO y por qué es el único que mata a la cochinilla?",
    intro: "La cochinilla (ya sea la blanca algodonosa o la que parece una \"caparazón\" pegada a las ramas) es una de las plagas más difíciles de erradicar. ¿Por qué? Porque tienen un escudo de cera que repele cualquier veneno que les tires por afuera. Si les tirás un aerosol común, el líquido resbala y el bicho sigue succionando la savia de tu planta como si nada.",
    solutionTitle: "¿Cómo funciona el Insecticida Sistémico?",
    solutionText: "Acá es donde entra la magia de la ciencia aplicada al jardín. Un producto sistémico (como el Glacoxan D-Sist o el Mamboretá D) funciona al revés:\n\n• Lo diluís en agua y lo aplicás pulverizando las hojas o regando la tierra.\n• La planta absorbe el veneno a través de sus raíces o poros, y lo distribuye por todo su interior mediante la savia.\n• La planta se vuelve \"tóxica\" únicamente para los insectos que la muerden o le chupan la savia. Cuando la cochinilla clava su pico para alimentarse, absorbe el producto y muere desde adentro.",
    warningAlert: "⚠️ Regla de oro (El Período de Carencia): Los sistémicos son espectaculares para plantas ornamentales, flores y árboles jóvenes. Pero si los vas a usar en tu huerta o frutales (tomates, limoneros, etc.), tenés que respetar a rajatabla el 'período de carencia' que figura en el envase. Esto es el tiempo que tenés que esperar desde que pusiste el producto hasta que podés cosechar y comer el fruto de forma segura (suele ser entre 15 y 20 días)."
  }
];
