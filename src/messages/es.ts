const es = {
  metadata: {
    title:
      "Calculadora de CD - Calculadora gratuita de intereses de certificados de depósito",
    description:
      "Calcula en segundos el interés, el valor total al vencimiento y la rentabilidad anual efectiva de tu certificado de depósito. Sencillo, preciso y compatible con dispositivos móviles.",
    keywords:
      "Calculadora de certificados de depósito, calculadora de intereses de certificados de depósito, calculadora de TAE de certificados de depósito",
    siteName: "Calculadora de CD",
  },
  penalty: {
    title: "Calculadora de penalización por retiro anticipado",
    description:
      "Calcule la penalización estimada y el punto de equilibrio si retira el dinero antes del vencimiento.",
    principalLabel: "Depósito inicial",
    apyLabel: "APY (%)",
    termLabel: "Plazo (meses)",
    heldLabel: "Meses de duración",
    policyLabel: "Política de sanciones",
    policyThree: "3 meses de interés",
    policySix: "6 meses de interés",
    policyStrict: "Pierde todos los intereses devengados",
    policyDays: "días personalizados",
    daysPlaceholder: "Por ejemplo, 90",
    calculateButton: "Recalcular",
    resultsTitle: "Análisis",
    earned: "Intereses ganados",
    penalty: "Pena",
    net: "Interés neto",
    refund: "Importe del reembolso",
    breakeven: "Tasa de interés anual de equilibrio para el plazo restante",
    recommendationHold:
      "Recomendación: Mantenga el certificado de depósito; el interés neto sigue siendo positivo.",
    recommendationMove:
      "Recomendación: Considere el cambio solo si el nuevo TAE supera el punto de equilibrio.",
    error: {
      principalPositive: "Por favor, introduzca una cantidad positiva.",
      apyRange: "Introduzca un TAE válido (0–200%).",
      termPositive: "Por favor, introduzca un número positivo de meses",
      heldRange: "Los meses contratados deben estar entre 0 y el plazo total.",
    },
  },
  penaltyPage: {
    title: "Calculadora de penalización por retiro anticipado de CD",
    description: "Calcule el costo exacto de cancelar su CD antes de tiempo. Compare penalizaciones, intereses netos y tasas de equilibrio para decidir si vale la pena cambiar.",
    keywords: "calculadora penalizacion cd, retiro anticipado cd, penalidad certificado deposito",
    aboutTitle: "Sobre las penalizaciones por retiro anticipado",
    aboutContent: "Retirar fondos de un Certificado de Depósito (CD) antes de la fecha de vencimiento generalmente conlleva una penalización. Esta tarifa se calcula típicamente como una cantidad de meses de interés (por ejemplo, 3 o 6 meses). Nuestra calculadora le ayuda a estimar este costo y determinar si el interés restante justifica mantener el CD frente a cambiar a una opción de mayor rendimiento.",
    howToTitle: "Cómo se calculan las penalizaciones",
    howToContent: "Los bancos a menudo cobran una tarifa basada en el interés simple. Por ejemplo, una penalización de 6 meses de interés significa que pierde el interés que habría ganado en 6 meses. Si no ha ganado suficiente interés aún, la penalización podría afectar su capital inicial.",
    strategiesTitle: "Estrategias para evitar penalizaciones",
    strategiesContent: "1. **Escalera de CD:** Divida su inversión en múltiples plazos para que los fondos venzan regularmente.\n2. **CD sin penalización:** Elija CDs que permitan retiros sin penalización (generalmente con tasas ligeramente más bajas).\n3. **Esperar:** Si el TAE de equilibrio es demasiado alto, puede ser mejor mantener su CD actual.",
  },
  ladder: {
    totalInvestment: "Inversión Total",
    numberOfRungs: "Número de Escalones",
    apyLabel: "APY (%)",
    calculate: "Construir Escalera",
    totalInterest: "Interés Total Ganado",
    totalValue: "Valor Total al Vencimiento",
    annualLiquidity: "Liquidez Anual",
    ladderSchedule: "Calendario de la Escalera",
    maturity: "Vence",
    invested: "Invertido",
  },
  ladderPage: {
    title: "Calculadora de Escalera de CD - Estrategia de Alto Rendimiento",
    description: "Visualice su estrategia de escalera de CD. Calcule el TAE combinado, el interés total y el calendario de liquidez para maximizar los rendimientos manteniendo el efectivo accesible.",
    keywords: "calculadora escalera cd, estrategia escalera cd, certificado deposito escalonado",
    aboutTitle: "¿Qué es una Escalera de CD?",
    aboutContent: "Una escalera de CD es una estrategia de ahorro donde divides una suma de dinero en cantidades iguales y las inviertes en Certificados de Depósito (CD) con diferentes fechas de vencimiento. Este enfoque proporciona un equilibrio entre las tasas de interés más altas de los CD a largo plazo y la liquidez de los CD a corto plazo.",
    howItWorksTitle: "Cómo Funciona",
    howItWorksContent: "En lugar de bloquear todo su dinero en un solo CD de 5 años, podría dividirlo en cinco CD que venzan en 1, 2, 3, 4 y 5 años. A medida que cada CD vence, tiene la opción de usar el efectivo o reinvertirlo en un nuevo CD de 5 años, creando eventualmente una cartera donde un CD vence cada año mientras gana las tasas más altas a largo plazo.",
  },
  howToPage: {
    title: "Cómo Calcular el Interés de un CD: Guía Paso a Paso",
    description: "Aprenda a calcular el interés de un certificado de depósito manualmente, con Excel o usando fórmulas simples. Entienda la capitalización diaria vs. mensual.",
    keywords: "como calcular interes cd, formula interes cd, calcular retorno cd",
    introTitle: "Dominando el Cálculo de Intereses de CD",
    introContent: "Calcular el interés de un CD puede parecer complejo debido al interés compuesto, pero la fórmula es directa una vez que conoce las variables. Ya sea que quiera verificar el estado de cuenta de su banco o proyectar sus ahorros, aquí tiene todo lo que necesita saber.",
    formulaSectionTitle: "La Fórmula del Interés Compuesto",
    formulaExplanation: "La fórmula universal para el interés compuesto es:",
    formulaBox: "A = P(1 + r/n)^(nt)",
    variableP: "**P** = Principal (depósito inicial)",
    variableR: "**r** = Tasa de interés anual (decimal, ej. 0.05 para 5%)",
    variableN: "**n** = Número de veces que se capitaliza el interés por año",
    variableT: "**t** = Tiempo en años",
    exampleSectionTitle: "Ejemplo Real",
    exampleContent: "Supongamos que invierte **$10,000** en un CD a 1 año con **5.00% APY** capitalizable **mensualmente**.",
    step1: "1. Convertir tasa: 5% = 0.05",
    step2: "2. Determinar n: Mensual = 12",
    step3: "3. Sustituir: 10000 * (1 + 0.05/12)^(12*1)",
    step4: "4. Calcular: 10000 * (1.004167)^12 ≈ **$10,511.62**",
    excelSectionTitle: "Usando Excel o Google Sheets",
    excelContent: "Puede calcular el valor futuro de un CD usando la función `VF` (o `FV` en inglés):",
    excelFormula: "=VF(tasa/n, n*años, 0, -principal)",
    excelExample: "=VF(0.05/12, 12*1, 0, -10000)",
  },
  sixMonthPage: {
    title: "Calculadora de CD de 6 Meses",
    description: "Calcule sus ganancias para un Certificado de Depósito de 6 meses. Compare tasas de CD a corto plazo y vea cuánto interés puede ganar.",
    keywords: "calculadora cd 6 meses, tasas cd 6 meses, calculadora cd corto plazo",
    aboutTitle: "Sobre los CD de 6 Meses",
    aboutContent: "Un CD de 6 meses es un excelente vehículo de ahorro a corto plazo. Bloquea su dinero por medio año, ofreciendo típicamente tasas más altas que una cuenta de ahorros regular sin atar su efectivo por mucho tiempo.",
  },
  oneYearPage: {
    title: "Calculadora de CD de 1 Año",
    description: "Estime sus retornos de CD de 1 año. Vea cuánto puede ganar una tasa fija de 12 meses en comparación con una cuenta de ahorros.",
    keywords: "calculadora cd 1 año, calculadora cd 12 meses, tasas cd 1 año",
    aboutTitle: "Sobre los CD de 1 Año",
    aboutContent: "El CD de 1 año (o 12 meses) es uno de los plazos más populares. A menudo ofrece un punto ideal competitivo entre tasas altas y liquidez razonable.",
  },
  locales: {
    en: {
      name: "Inglés",
      short: "EN",
    },
    zh: {
      name: "Chino",
      short: "中文",
    },
    es: {
      name: "Español",
      short: "ES",
    },
  },
  common: {
    siteName: "Calculadora de CD",
    allRightsReserved: "Reservados todos los derechos.",
    privacyPolicy: "política de privacidad",
    termsOfService: "Condiciones del servicio",
    disclaimer: "Descargo de responsabilidad",
    backToHome: "Volver a la página de inicio",
    backToTop: "Volver al inicio",
    professionalUseOnly: "Herramienta informativa únicamente",
    viewFullDisclaimer: "Ver el descargo de responsabilidad completo",
    footer: {
      brandDescription:
        "Calculadora de intereses de certificados de depósito gratuita y precisa con un diseño limpio y optimizado para dispositivos móviles.",
      legalSection: "Legal",
      calculatorsSection: "Calculadoras",
      learnSection: "Aprender",
      home: "Inicio",
      about: "Acerca de / Contacto",
      penaltyCalculator: "Penalización por Retiro",
      ladderCalculator: "Escalera de CD",
      sixMonthCalculator: "Calculadora CD 6 Meses",
      oneYearCalculator: "Calculadora CD 1 Año",
      howToCalculate: "Cómo Calcular Intereses",
    },
  },
  navigation: {
    tools: "Herramientas",
    learn: "Aprender",
    calculators: "Calculadoras",
  },
  header: {
    siteName: "Calculadora de CD",
    subtitle: "Sencillo • Preciso • Rápido",
  },
  footer: {
    brandDescription:
      "Calculadora de intereses de certificados de depósito gratuita y precisa con un diseño limpio y optimizado para dispositivos móviles.",
    legalSection: "Legal",
    resourcesSection: "Recursos",
    home: "Hogar",
    getStarted: "Comienza",
  },
  about: {
    title: "Acerca de / Contacto",
    description: "Quiénes somos, cómo funciona la calculadora y cómo contactarnos.",
    missionTitle: "Misión",
    missionContent:
      "Ofrecer una calculadora de intereses de CD sencilla, precisa y móvil primero, con metodología transparente y privacidad por defecto.",
    methodologyTitle: "Metodología (Resumen)",
    methodologyContent:
      "- Fórmula de capitalización: M = P × (1 + r/m)^(m×t)\n\n- Conversión APR → TAE según la frecuencia de capitalización seleccionada\n\n- Moneda redondeada al céntimo; rendimientos con dos decimales\n\n- Períodos fraccionarios para plazos no enteros\n\n- Calendario derivado período a período; puede diferir ligeramente de los extractos bancarios",
    contactTitle: "Contacto",
    contactContent: "¿Preguntas, comentarios o correcciones? Escribe a nuestro equipo:",
    backToHome: "Volver al inicio",
  },
  calculator: {
    title: "Calculadora de CD",
    description: "Calcule el valor de vencimiento y el interés total.",
    principalLabel: "Depósito inicial",
    principalPlaceholder: "Por ejemplo, 10.000",
    apyLabel: "APY (%)",
    aprLabel: "Tasa nominal (TAE, %)",
    apyPlaceholder: "Por ejemplo, 5.00",
    aprPlaceholder: "Por ejemplo, 5.00",
    termLabel: "Plazo (meses)",
    termPlaceholder: "Por ejemplo, 12",
    compoundingLabel: "Composición",
    compoundingDaily: "A diario",
    compoundingMonthly: "Mensual",
    compoundingQuarterly: "Trimestral",
    compoundingSemi: "Semestralmente",
    compoundingAnnually: "Anualmente",
    rateModeApy: "APY",
    rateModeApr: "Tasa (TAE)",
    calculateButton: "Calcular",
    resetButton: "Reiniciar",
    showSchedule: "Mostrar programación",
    hideSchedule: "Ocultar horario",
    scheduleTitle: "Calendario de acumulación",
    exportCSV: "Exportar CSV",
    afterTaxToggle: "Mostrar estimación después de impuestos",
    taxRateLabel: "Tramo impositivo (%)",
    resultsTitle: "Resultados",
    maturityValue: "Valor de madurez",
    interestEarned: "Interés total",
    afterTaxInterest: "Intereses después de impuestos",
    afterTaxMaturity: "Vencimiento después de impuestos",
    effectiveYield: "Rendimiento anual efectivo",
    copied: "Copiado",
    copyResults: "Copiar resultados",
    inputHelp: "Los valores son estimaciones con fines meramente informativos.",
    error: {
      principalPositive: "Por favor, introduzca una cantidad positiva.",
      apyRange: "Introduzca un TAE válido (0–200%).",
      termPositive: "Por favor, introduzca un número positivo de meses",
    },
  },
  home: {
    title: "Calculadora de CD",
    description:
      "Calcula en segundos el interés y el valor de vencimiento de un certificado de depósito (CD).",
    backToTop: "Volver al inicio",
    aboutTitle: "Acerca de esta calculadora",
    aboutContent:
      "Utilice esta calculadora gratuita de intereses de certificados de depósito para estimar el valor de vencimiento según el capital, la TAE, el plazo y la frecuencia de capitalización. Todos los cálculos se realizan localmente en su navegador.",
    howToUseTitle: "Cómo calcular los intereses de un certificado de depósito",
    howToUseStep1:
      "Ingrese su depósito inicial (capital), TAE, plazo en meses y capitalización (mensual/trimestral/anual).",
    howToUseStep2:
      "Haz clic en Calcular o ajusta los datos para ver los resultados al instante.",
    howToUseStep3:
      "Revisar el valor de vencimiento, el interés total ganado y el rendimiento anual efectivo",
    formulaTitle: "Fórmula y método",
    formulaContent:
      "Utilizamos su TAE y la capitalización para estimar el valor al vencimiento.\n\n- Períodos por año (n): Mensual = 12, Trimestral = 4, Anual = 1\n\n- Tasa periódica (r): r = (1 + TAE)^(1/n) - 1\n\n- Total de períodos: períodos = (meses / 12) * n (puede ser fraccionario)\n\n- Valor al vencimiento: M = P * (1 + r)^(períodos)\n\n- Intereses ganados: I = M - P\n\nRedondeamos las cifras al céntimo más cercano para reflejar mejor los estados de cuenta.\n\n",
    exampleTitle: "Ejemplo práctico",
    exampleContent:
      "Capital inicial P = $10,000; TAE = 5.00%; Plazo = 12 meses; Capitalización = Mensual.\n\n- n = 12; r = (1 + 0.05)^(1/12) - 1 ≈ 0.004074\n\n- períodos = (12 / 12) * 12 = 12\n\n- Vencimiento: M = 10000 * (1 + 0.004074)^12 ≈ $10,511.62\n\n- Interés: I ≈ $511.62\n\nNota: La capitalización diaria generaría un rendimiento ligeramente superior, pero la TAE ya lo refleja.\n\n",
    pitfallsTitle: "Errores comunes",
    pitfallsContent:
      "- TAE vs. APR: La TAE incluye la capitalización y es adecuada para los certificados de depósito.\n\n- Meses/años parciales: Prorrateamos utilizando períodos fraccionarios para una estimación más precisa.\n\n- Capitalización diaria: Los resultados reales pueden variar ligeramente; la TAE normaliza la mayoría de las diferencias.\n\n- Impuestos y penalizaciones: Esta herramienta muestra estimaciones antes de impuestos y excluye las penalizaciones por retiro anticipado.",
    methodologyTitle: "Metodología y notas de cálculo",
    methodologyContent:
      "- Fórmula de capitalización: M = P × (1 + r/m)^(m×t), con la TAE normalizada a la frecuencia.\n\n- APR → TAE: Cuando se selecciona el modo APR, convertimos a TAE usando la frecuencia de capitalización elegida.\n\n- Redondeo: Los importes monetarios se redondean al céntimo más cercano; las tasas se muestran con dos decimales por defecto.\n\n- Períodos fraccionarios: Para plazos no enteros usamos exponentes fraccionarios en la capitalización.\n\n- Calendario: La tabla de devengo se deriva período a período y puede diferir ligeramente de los extractos bancarios.\n\n- Impuestos: Las cifras después de impuestos usan su tasa como estimación simple y no constituyen asesoramiento fiscal.",
    penaltyHowToTitle: "Retiro anticipado: ¿Deberías retirar tu dinero?",
    penaltyHowToContent:
      "1) Calcula tus ganancias hasta el momento y la penalización según la política de tu banco (por ejemplo, 3 o 6 meses de intereses).\n\n2) Calcula el interés neto (ganancias menos penalización) y el monto de tu reembolso.\n\n3) Para el plazo restante, calcula la TAE de equilibrio: si la TAE de un nuevo certificado de depósito supera este valor, podría ser conveniente cambiar de banco. De lo contrario, probablemente obtendrás una mayor rentabilidad manteniendo el depósito actual.\n\nConsejo: Las penalizaciones suelen basarse en los intereses, no en el capital; nuestra calculadora ofrece una aproximación de las políticas típicas.",
    whyUseTitle: "¿Por qué usar esta calculadora de CD?",
    whyUseFree: "Gratis",
    whyUseFreeDesc:
      "Completamente gratis: sin registro ni anuncios necesarios para calcular",
    whyUsePrivate: "Privado",
    whyUsePrivateDesc:
      "Funciona al 100% en tu navegador. No almacenamos tus datos.",
    whyUseFast: "Rápido",
    whyUseFastDesc: "Resultados instantáneos mientras escribes",
    whyUseSimple: "Simple",
    whyUseSimpleDesc: "Interfaz de usuario limpia y optimizada para móviles",
    whyUseMobile: "Compatible con dispositivos móviles",
    whyUseMobileDesc: "Optimizado para pantallas pequeñas y táctiles",
    technicalTitle: "¿Qué se calcula?",
    technicalContent:
      "Estimamos el valor al vencimiento utilizando su TAE y la frecuencia de capitalización. Para los meses con números no enteros, el cálculo prorratea el último período. Los resultados se redondean al céntimo más cercano para mayor claridad.",
    faqTitle: "Calculadora de CD: Preguntas frecuentes",
    faqQ1: "¿Qué es el APY y cómo afecta a mi certificado de depósito?",
    faqA1:
      "La TAE (Tasa Anual Equivalente) incluye la capitalización. Una TAE más alta o una capitalización más frecuente generalmente generan más intereses.",
    faqQ2: "¿Qué tipo de capitalización debo elegir?",
    faqA2:
      'La mayoría de los certificados de depósito generan intereses mensuales. Si tiene dudas, seleccione "Mensual" para obtener una estimación más precisa.',
    faqQ3: "¿Puedo calcular períodos parciales de año?",
    faqA3:
      "Sí. Introduzca los meses (por ejemplo, 7 meses). La calculadora prorratea los intereses para años parciales.",
    faqQ4: "¿Apoya usted las penalizaciones por retirada anticipada?",
    faqA4:
      "No en la versión inicial. Podríamos añadir una calculadora de penalización por retirada anticipada si demuestra ser de gran utilidad.",
    faqQ5: "¿Almacenas alguno de mis datos?",
    faqA5:
      "No. Todos los cálculos se realizan en su navegador y no se envían a nuestros servidores.",
    faqQ6: "¿Esto es asesoramiento financiero?",
    faqA6:
      "No. Los resultados son solo para fines informativos. Consulte a un profesional cualificado para obtener asesoramiento financiero.",
    faqQ7: "¿Aceptan depósitos adicionales o contribuciones mensuales?",
    faqA7:
      "No en la versión inicial. Muchos CD no permiten depósitos adicionales después de abrirlos. Es posible que añadamos opciones para CD adicionales más adelante.",
    faqQ8:
      "¿Cómo afectan los impuestos a la rentabilidad de mis certificados de depósito?",
    faqA8:
      "Esta calculadora muestra estimaciones antes de impuestos. El rendimiento real después de impuestos depende de su situación fiscal. Consulte a un asesor fiscal.",
    faqQ9: "¿Qué ocurre si mi cuenta bancaria capitaliza diariamente?",
    faqA9:
      "La TAE ya tiene en cuenta la capitalización. Seleccionar la opción mensual proporciona una estimación bastante precisa para la mayoría de los certificados de depósito. La capitalización diaria ofrece resultados ligeramente superiores.",
    faqQ10: "¿Puedo exportar o compartir mis resultados?",
    faqA10:
      "Todavía no. Planeamos añadir opciones de copia y exportación si aportan un valor claro sin sobrecargar la interfaz.",
    ctaTitle:
      "¿Listo para calcular los intereses de tu certificado de depósito?",
    ctaDescription:
      "Ingrese su depósito, TAE y plazo para ver el valor de vencimiento.",
    ctaButton: "Calcula ahora",
    placeholderTitle:
      "Próximamente: Interfaz de usuario de la calculadora de CD",
    placeholderDescription:
      "Estamos configurando el motor de cálculo y las entradas adaptadas a dispositivos móviles.",
  },
  privacy: {
    title: "Política de privacidad",
    description:
      "Aprenda cómo gestionamos y protegemos sus datos cuando utiliza la Calculadora de CD.",
    intro:
      "La calculadora de CD se ejecuta localmente en su navegador. No recopilamos ni transmitimos los valores que usted introduce.",
    dataCollectionTitle: "Recopilación de datos",
    dataCollectionContent:
      "No recopilamos, almacenamos, vendemos ni compartimos los valores que usted introduce. Todos los cálculos se realizan localmente en su dispositivo y nunca se envían a nuestros servidores.",
    analyticsTitle: "Analítica",
    analyticsContent:
      "Podemos utilizar análisis que respetan la privacidad para observar el uso agregado (por ejemplo, clics en el botón de la calculadora). Estos análisis nunca contienen identificadores personales ni los valores que usted ingrese. Si lo prefiere, puede usar los controles o extensiones de su navegador para limitar los análisis.",
    cookiesTitle: "Galletas",
    cookiesContent:
      "Utilizamos Google Consent Mode para que las cookies de publicidad y analítica permanezcan denegadas por defecto hasta que usted otorgue su consentimiento.",
    thirdPartiesTitle: "Servicios de terceros",
    thirdPartiesContent:
      "Si se utilizan recursos de terceros (por ejemplo, fuentes, analítica o anuncios), se eligen teniendo en cuenta la privacidad. La colocación de anuncios no interferirá con el uso principal de la calculadora.",
    adsTitle: "Publicidad y Google AdSense",
    adsVendorContent:
      "Los proveedores externos, incluido Google, utilizan cookies para mostrar anuncios en función de las visitas previas del usuario a este u otros sitios web.",
    adsPersonalizedContent:
      "El uso de cookies publicitarias por parte de Google permite a Google y a sus socios mostrar anuncios basados en su visita a nuestros sitios y/o a otros sitios de Internet.",
    adsOptOutIntro:
      "Puede inhabilitar la publicidad personalizada en la Configuración de Anuncios de Google o inhabilitar el uso de cookies para publicidad personalizada de algunos proveedores en aboutads.info.",
    adsOtherVendorsContent:
      "Si no inhabilitamos la publicación de anuncios de terceros, las cookies de otros proveedores o redes publicitarias también pueden utilizarse para mostrar anuncios en este sitio. Enumeraremos dichos proveedores y proporcionaremos enlaces de inhabilitación cuando corresponda.",
    changesTitle: "Actualizaciones de políticas",
    changesContent:
      "Es posible que actualicemos esta política para reflejar cambios en el producto o requisitos legales. Las actualizaciones importantes se comunicarán claramente en esta página.",
    contactTitle: "Contacto",
    contactContent:
      "Si tiene preguntas o solicitudes sobre privacidad, escríbanos a support@mycdcalc.com.",
  },
  consent: {
    title: "Usamos cookies para anuncios y analítica",
    desc:
      "Con su permiso, utilizamos cookies para admitir Google AdSense y analítica básica. Puede revisar los detalles en nuestra Política de privacidad.",
    accept: "Aceptar",
    reject: "Rechazar",
    learnMore: "Más información",
  },
  terms: {
    title: "Condiciones del servicio",
    description:
      "Revise los términos que rigen el uso de la Calculadora de CD.",
    intro:
      "Al utilizar esta calculadora, usted acepta los términos que se describen a continuación.",
    acceptableUseTitle: "Uso aceptable",
    acceptableUseContent:
      "Utilice la calculadora solo para obtener estimaciones informativas. No intente interrumpir el servicio ni presentar los resultados como asesoramiento profesional. Si los anuncios están habilitados, su ubicación cumple con las políticas de Google y no interferirá con el uso principal del servicio.",
    medicalDisclaimerTitle: "Descargo de responsabilidad",
    medicalDisclaimerContent:
      "Esta calculadora no ofrece asesoramiento financiero, de inversión, fiscal ni legal. Verifique los resultados y consulte con profesionales cualificados antes de tomar decisiones.",
    limitationsTitle: "Limitaciones del servicio",
    limitationsContent:
      "La herramienta se proporciona «tal cual» sin garantías de precisión ni disponibilidad. Podemos modificar o interrumpir el servicio sin previo aviso.",
    liabilityTitle: "Limitación de responsabilidad",
    liabilityContent:
      "No nos hacemos responsables de los daños derivados del uso o la imposibilidad de usar esta herramienta. Su uso es bajo su propia responsabilidad.",
    changesTitle: "Cambios en los términos",
    changesContent:
      "Podemos actualizar estas condiciones periódicamente. El uso continuado tras la entrada en vigor de los cambios implica la aceptación de las nuevas condiciones.",
    contactTitle: "Contacto",
    contactContent:
      "¿Preguntas sobre estos términos? Envíe un correo a support@mycdcalc.com.",
  },
  disclaimer: {
    title: "Descargo de responsabilidad",
    description:
      "Comprender cómo interpretar los resultados para la toma de decisiones financieras.",
    intro:
      "Esta calculadora tiene fines meramente informativos. No la utilice como base exclusiva para tomar decisiones financieras.",
    lastUpdatedLabel: "Última actualización:",
    lastUpdatedValue: "7 de noviembre de 2025",
    educationHeading: "Solo para uso informativo",
    educationContent:
      "Esta herramienta y las explicaciones que la acompañan tienen únicamente fines informativos y educativos generales. No deben utilizarse como base exclusiva para tomar decisiones importantes.",
    noAdviceHeading: "Esto no es asesoramiento financiero.",
    noAdviceContent:
      "La información contenida en este sitio web no constituye asesoramiento financiero, de inversión, fiscal ni legal. Consulte con profesionales cualificados antes de tomar cualquier decisión.",
    emergencyHeading: "Riesgos y limitaciones",
    emergencyContent:
      "Los tipos de interés, las penalizaciones y las políticas bancarias varían y pueden cambiar. Los resultados son estimaciones y pueden no coincidir con los cálculos de su entidad.",
    audienceHeading: "Usuarios previstos",
    audienceList1: "Público en general que busca herramientas informativas",
    audienceList2: "Estudiantes y educadores con fines de aprendizaje",
    audienceList3: "Profesionales que lo utilizan como referencia rápida",
    audienceExclusionHeading: "No destinado a",
    audienceExclusionList1:
      "Toma de decisiones críticas sin verificación profesional",
    audienceExclusionList2:
      "Utilizar como sustituto de una evaluación profesional",
    audienceExclusionList3: "Decisiones tomadas sin la debida consulta",
    clinicalJudgmentHeading: "La orientación profesional tiene prioridad.",
    clinicalJudgmentContent:
      "Los resultados de la calculadora complementan, pero no reemplazan, el asesoramiento profesional. Si los resultados contradicen las recomendaciones de su asesor financiero, siga sus indicaciones.",
    accuracyHeading: "Precisión e integridad",
    accuracyContent:
      "Aunque nos esforzamos por lograr la máxima precisión, los datos de entrada y las suposiciones influyen en los resultados. Verifique los cálculos con la información y las políticas vigentes de su banco.",
    liabilityHeading: "Limitación de responsabilidad",
    liabilityContent:
      "En la máxima medida permitida por la ley, los propietarios y colaboradores del sitio se eximen de toda responsabilidad por cualquier pérdida o decisión derivada del uso de este sitio.",
    noRelationshipHeading: "Sin relación profesional",
    noRelationshipContent:
      "El uso de esta herramienta no establece una relación profesional con los propietarios o colaboradores del sitio.",
    thirdPartyHeading: "Referencias de terceros",
    thirdPartyContent:
      "Los enlaces a recursos externos se proporcionan para su comodidad. No respaldamos ni controlamos el contenido de terceros y no nos hacemos responsables de su exactitud.",
    complianceHeading: "Responsabilidad del usuario",
    complianceContent:
      "Los usuarios son responsables de garantizar que el uso que hagan de esta herramienta cumpla con todas las leyes y regulaciones aplicables en su jurisdicción.",
    updatesHeading: "Actualizaciones de políticas",
    updatesContent:
      "Podemos actualizar este aviso legal a medida que evolucionen los estándares o las funciones del sitio. El uso continuado implica la aceptación de la última versión.",
    contactHeading: "Contacto",
    contactContent:
      "Para cualquier pregunta sobre esta exención de responsabilidad, contáctenos.",
  },
} as const;

export default es;
