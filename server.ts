import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  
  const PORT = 3000;

  // Initialize Gemini client lazily
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route for Virtual Agronomist AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Falta el mensaje del usuario" });
      }

      const systemInstruction = `Actuás como un Ingeniero Agrónomo argentino, experto en asesoramiento técnico de jardinería hogareña y control de plagas para el sitio SolucionesHobbista. Tu tono debe ser el de un profesional de campo, amable, muy claro, campero pero con autoridad científica, usando terminología local argentina (tanza, yuyos, pasto, manguera, soplete, mandarse una macana, ir al toque, la posta). Tu objetivo es diagnosticar el problema del usuario basándote en los síntomas de sus plantas o casa. Siempre debés estructurar tu respuesta en: 
1) Diagnóstico a lo criollo: Explica de qué plaga se trata con un tono bien local argentino.
2) Explicación técnica fácil de por qué pasa: Por qué ocurre y cómo se comporta.
3) Tratamiento recomendado: Qué producto exacto se necesita, con recomendación campera, y añade de forma natural un enlace de redirección directa de Mercado Libre utilizando EXCLUSIVAMENTE los siguientes links reales (no inventes otros):
   - Cebo Granulado Mirex: https://meli.la/1mkF4F6 (para Hormigas Cortadoras)
   - Insuflador de polvo profesional: https://meli.la/27GZgvQ (para Hormigas de pozo/mineras)
   - Polvo Insecticida: https://meli.la/2SQNXBR (para aplicar con el insuflador)
   - Insecticida Sistémico Glacoxan D-Sist: https://meli.la/1qVsSGS (para Cochinillas, Pulgones)
   - Babosil Cebo Pellets: https://meli.la/1qzRDpk (para Caracoles y Babosas)
   - Herbicida Total (Glifosato): https://meli.la/1ERBf32 (para limpiar veredas/tierra arrasada)
   - Herbicida Selectivo (Hoja ancha): https://meli.la/1ZMezBK (para trébol/yuyos en césped)
   - Gel Mata Cucarachas: https://meli.la/2QkR5eG (para Cucarachas de cocina u hogar)
   - Pulverizador Manual 2L: https://meli.la/2uVe6hR (para balcón/patio de superficie reducida)
   - Mochila de Pulverización: https://meli.la/1Van19i (para parques o fondos de gran tamaño)

Ejemplo: "La posta letal son los [Cebos en micropellets de Babosil](https://meli.la/1qzRDpk)".
4) Un "Tip del Agrónomo" para evitar errores de aplicación específicos.

Nunca uses términos neutros como 'recortadora', 'maleza de hoja ancha' sin aclarar que es el yuyo sapo/trébol, ni 'fumigadora de espalda' (decí mochila de pulverización). Tratame de 'vos'.`;

      // If AI Client is available, let's call Gemini
      if (ai) {
        // Format history for Gemini chat if present, or just pass as a prompt
        const promptContents: any[] = [];
        
        if (history && Array.isArray(history)) {
          history.forEach(turn => {
            promptContents.push({ 
              role: turn.role === "assistant" ? "model" : "user", 
              parts: [{ text: turn.text }] 
            });
          });
        }
        
        // Add the current message
        promptContents.push({ role: "user", parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: promptContents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          }
        });

        return res.json({ text: response.text });
      } else {
        // Safe and highly personalized Argentine response generator for when GEMINI_API_KEY is not set
        const textLower = message.toLowerCase();
        let responseText = "";

        if (textLower.includes("hormiga") || textLower.includes("horman") || (textLower.includes("hoja") && textLower.includes("cort"))) {
          responseText = `### 1) Diagnóstico a lo criollo
¡Es la famosa **Hormiga Negra Podadora**, chamigo! Te descuidás un segundo a la tarde y a la mañana siguiente te dejó el limonero pelado, que parece un poste de luz.

### 2) Explicación técnica fácil de por qué pasa
Estos bichos no se comen la hoja, sino que la cortan de noche y se la llevan al hormiguero subterráneo para alimentar a un hongo del que sobreviven. Si le tirás aerosol común al caminito, no sirve porque no llegás a la reina que está oculta abajo de todo.

### 3) Tratamiento recomendado
La posta absoluta es usar **Cebo Granulado Mirex**. La hormiga lo confunde con alimento, se lo lleva a la cueva y desinfecta la colonia entera de raíz. 
Acá te dejo el link para conseguirlo al toque: [Ver Cebo Granulado Mirex en Mercado Libre](https://meli.la/1mkF4F6)

Si lo que tenés en el patio son hormigas mineras que hacen **montañitas de tierra suelta** en el pasto, te recomiendo usar un **Insuflador de polvo profesional**: [Ver Insuflador de Polvo Profesional en Mercado Libre](https://meli.la/27GZgvQ) y aplicarle el polvo específico: [Ver Polvo Insecticida en Mercado Libre](https://meli.la/2SQNXBR).

### 4) Tip del Agrónomo
⚠️ **¡Atención!** Jamás toques el cebo con los dedos porque le dejás olor a humano y las hormigas le pasan por al lado de largo. Cortá la punta del sachet y tiralos directo de ahí a unos 10-15cm del caminito.`;
        } else if (textLower.includes("cochinilla") || textLower.includes("pulgon") || textLower.includes("pulgón") || textLower.includes("pegaj") || textLower.includes("algod")) {
          responseText = `### 1) Diagnóstico a lo criollo
Tenés **Cochinilla** o de rastro un **Pulgón** molesto, hermano. Ese pegote blanco algodonoso o con forma de caparazón pegado a las ramas es la melaza que van cagando mientras succionan. 

### 2) Explicación técnica fácil de por qué pasa
Estos bichitos tienen como un caparazón rígido o un escudo de cera protectora algodonosa. Si les tirás veneno común por fuera, les resbala por el escudo y no les hacés ni cosquillas mientras te secan la planta.

### 3) Tratamiento recomendado
Necesitás ir al hueso con un **Insecticida Sistémico** (como el *Glacoxan D-Sist*). Lo echás riego o pulverizado, la planta lo chupa por dentro, y cuando la cochinilla clava el pico para alimentarse de la savia, ¡pumba! Se muere desde adentro.
Conseguilo directo acá: [Ver Insecticida Sistémico Glacoxan D-Sist en Mercado Libre](https://meli.la/1qVsSGS)

### 4) Tip del Agrónomo
⚠️ **Regla de oro:** Si lo metés en cítricos o verduras de tu huerta, respetá el *"Período de Carencia"* de 20 días. O sea, esperá 20 días antes de recolectar para que el veneno se limpie de la fruta y comas seguro.`;
        } else if (textLower.includes("caracol") || textLower.includes("babosa") || textLower.includes("baba") || textLower.includes("agujero")) {
          responseText = `### 1) Diagnóstico a lo criollo
Ahí tenés el ataque silencioso de los **Caracoles y Babosas**, che. Esos agujeros gigantescos en los plantines de lechuga o flores, acompañados de un caminito de baba brillante, son la firma de estos maleantes nocturnos.

### 2) Explicación técnica fácil de por qué pasa
La babosa y el caracol operan de noche o cuando hay mucha humedad (como los días de lluvia seguida). Olvidate del insecticida pulverizado; su mucosa corporal neutraliza los venenos comunes de contacto. 

### 3) Tratamiento recomendado
La posta letal son los **Cebos en micropellets de metaldehído (tipo Babosil)**. Ese olor los imanta, lo comen, se deshidratan rápido y quedan secos ahí mismo.
Echale un vistazo acá: [Comprar Babosil Cebo Pellets en Mercado Libre](https://meli.la/1qzRDpk)

### 4) Tip del Agrónomo
⚠️ **Tip de aplicación profesional:** No los tires al voleo por todo el pasto que se lavan con el rocío. Armá montoncitos en tapitas de botella dadas vuelta o abajo de tejas en los rincones húmedos. Así tus mascotas no los chupan y los caracoles caen igual.`;
        } else if (textLower.includes("cucaracha") || textLower.includes("cuca") || textLower.includes("gel")) {
          responseText = `### 1) Diagnóstico a lo criollo
¡Esas son las indeseables **Cucarachas domésticas**, chamigo! Te descuidás de noche, prendés la luz de la cocina y las ves correr para todos lados. Son bichos duros de pelar que anidan en las grietas calientes de los motores de electrodomésticos o abajo de las mesadas.

### 2) Explicación técnica fácil de por qué pasa
Pulverizar insecticidas comunes en aerosol no sirve de mucho porque solo matás a las que andan dando vueltas, pero el nido principal sigue intacto y reproduciéndose a lo pavote. Además, arriesgás contaminar los utensilios de cocina o comida.

### 3) Tratamiento recomendado
La posta absoluta es usar un **Gel Mata Cucarachas profesional**. Viene en una jeringa aplicadora súper fácil. Ponés microgotas cerca del nido, ellas lo comen encantadas como alimento, vuelven a la cueva, se mueren y por canibalismo se desinfecta la colonia entera de raíz.
Conseguilo al toque acá: [Ver Gel Mata Cucarachas en Mercado Libre](https://meli.la/2QkR5eG)

### 4) Tip del Agrónomo
⚠️ **Tip clave para no meter la pata:** No apliques insecticidas tradicionales (aerosol o líquido) cerca de las gotitas de gel. El olor fuerte del insecticida repele a las cucarachas, por lo que van a evitar ir a comer el gel y no vas a poder eliminar el nido de raíz.`;
        } else if (textLower.includes("yuyo") || textLower.includes("maleza") || textLower.includes("pasto") || textLower.includes("vereda") || textLower.includes("trebol") || textLower.includes("trébol") || textLower.includes("césped") || textLower.includes("cesped")) {
          if (textLower.includes("vereda") || textLower.includes("patio") || textLower.includes("limpiar") || textLower.includes("tierra")) {
            responseText = `### 1) Diagnóstico a lo criollo
Querés limpiar de malezas rebeldes una **vereda, pedregullo o entrada de auto** para que quede tierra arrasada.

### 2) Explicación técnica fácil de por qué pasa
Los yuyos oportunistas crecen en cualquier grieta y se expanden rápido con la humedad. Ahí no te sirve andar arrancando a mano porque las raíces quedan metidas entre si o en el cemento.

### 3) Tratamiento recomendado
Necesitás **Herbicida TOTAL (Glifosato)**. Ojo: esto actúa por absorción foliar, mata todo lo verde que toca. No lo tires en el parque porque te hace un desierto.
Conseguilo acá: [Comprar Herbicida Total Glifosato en Mercado Libre](https://meli.la/1ERBf32)

### 4) Tip del Agrónomo
⚠️ **Cuidado:** Aplicalo un día soleado, sin viento, para que el producto no se vuele y te queme las plantas buenas que tenés cerca de la vereda.`;
          } else {
            responseText = `### 1) Diagnóstico a lo criollo
Tenés la típica invasión de **trébol, diente de león o yuyo sapo** colonizando tu césped Bermuda o Grama Bahiana.

### 2) Explicación técnica fácil de por qué pasa
Si le mandás cualquier herbicida común, vas a quemar tu propio césped útil junto con el yuyo. Las malezas de hoja ancha se alimentan de forma diferente al pasto.

### 3) Tratamiento recomendado
La salvación es el **Herbicida SELECTIVO (para hoja ancha)**. Actúa directamente eliminando el trébol y yuyo sapo de raíz, pero al pasto común no le hace cosquillas. 
Compralo directo para pulverizar: [Comprar Herbicida Selectivo Hoja Ancha en Mercado Libre](https://meli.la/1ZMezBK)

### 4) Tip del Agrónomo
⚠️ **Tip del profesional:** Mezclalo con agua según la etiqueta a la tardecita. Si pulverizás con sol fuerte de mediodía, el calor evapora el agua muy rápido y te puede manchar el pasto temporariamente por concentración.`;
          }
        } else if (textLower.includes("aplic") || textLower.includes("pulve") || textLower.includes("rocia") || textLower.includes("fumig") || textLower.includes("herramienta") || textLower.includes("mochila")) {
          responseText = `### 1) Diagnóstico a lo criollo
Estás buscando la **herramienta justa para pulverizar** sin dejarte la vida apretando el gatillo de un botellón limpiavidrios viejo.

### 2) Explicación técnica fácil de por qué pasa
Para que el veneno o preventivo rinda, tiene que cubrir la hoja como una niebla fina y uniforme, sin gotear. Por eso los pulverizadores a presión previa acumulan aire comprimido adentro del tanque para darte caudal constante.

### 3) Tratamiento recomendado
* Si tenés un jardín o balcón chico: con un **pulverizador manual de presión previa de 1.5 a 2 litros** estás bárbaro. [Comprar Pulverizador Manual 2L en Mercado Libre](https://meli.la/2uVe6hR)
* Si tenés un parque mediano/grande: mandate de una por una **mochila de pulverización de 12 a 16 litros** que te salva la espalda. [Comprar Mochila de Pulverización en Mercado Libre](https://meli.la/1Van19i)

### 4) Tip del Agrónomo
⚠️ **Mantenimiento sagrado:** Cuando termines de fumigar, enjuagá bien la máquina dándole presión solo con agua limpia. Si le dejás veneno estancado adentro, los o-rings de goma se resecan y la máquina pierde presión para siempre.`;
        } else {
          responseText = `### 1) Diagnóstico a lo criollo
¡Hola chamigo! Soy el **Ingeniero Agrónomo de SolucionesHobbista** y estoy de guardia para darte una mano campera con tus plantas o el jardín.

### 2) Explicación técnica fácil de por qué pasa
Veo tu consulta sobre tu problema verde. En el jardín cada bicho tiene su maña y cada planta su defensa. Por eso es vital diagnosticar bien antes de mandar cualquier soplete.

### 3) Tratamiento recomendado
Decime un poco más: ¿Tenés problemas con **hormigas negras o coloradas**, **cucarachas o insectos de cocina**, **cochinillas o pulgones pegajosos**, **caracoles nocturnos**, o invadieron los **yuyos y tréboles** en el pasto? Contame qué síntomas ves así te tiro la posta exacta.
Si andás buscando herramientas, mirá esto: [Ver Pulverizadores y Mochilas en Mercado Libre](https://meli.la/2uVe6hR)

### 4) Tip del Agrónomo
💡 **Tip de campo:** Siempre que andes manipulando agroquímicos domésticos, ponete un par de guantes descartables y hacelo a favor del viento para que la bruma no te vuelva a la cara. ¡Primero la salud!`;
        }

        const decoratedText = `${responseText}\n\n*(Asistente Agrónomo Virtual de Guardia - Tono Camperizado)*`;
        return res.json({ text: decoratedText });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Mandamos una macana en el servidor: " + err.message });
    }
  });

  // Serve static assets or use Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
