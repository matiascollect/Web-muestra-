/* Contenido médico divulgativo. Fuentes de referencia: OMS, NIDDK (NIH),
   American Gastroenterological Association, American College of Gastroenterology,
   guías europeas (ESGE/EASL/ECCO). Cifras aproximadas. */

const ORGANS = {
  boca: {
    name: 'Boca y faringe',
    icon: '👄',
    func: 'Inicia la digestión: los dientes trituran el alimento y la saliva (con amilasa) empieza a descomponer los almidones. La faringe dirige el bolo hacia el esófago.',
    facts: ['Producimos entre 0,5 y 1,5 L de saliva al día', 'La deglución es voluntaria al inicio y luego refleja'],
  },
  esofago: {
    name: 'Esófago',
    icon: '🫧',
    func: 'Tubo muscular de unos 25 cm que lleva el alimento al estómago mediante ondas de contracción (peristalsis). Un esfínter inferior impide que el ácido suba.',
    facts: ['Mide ~25 cm', 'El bolo lo recorre en 5–10 segundos'],
  },
  estomago: {
    name: 'Estómago',
    icon: '🫙',
    func: 'Almacena y mezcla la comida con jugo gástrico (ácido clorhídrico y pepsina) para formar el quimo, que libera poco a poco hacia el duodeno.',
    facts: ['pH entre 1,5 y 3,5', 'Secreta ~1,5–2 L de jugo gástrico al día'],
  },
  higado: {
    name: 'Hígado',
    icon: '🟤',
    func: 'El órgano interno más grande. Produce bilis para digerir grasas, procesa nutrientes, almacena glucógeno, fabrica proteínas y elimina toxinas y fármacos.',
    facts: ['Pesa ~1,5 kg', 'Puede regenerarse incluso tras perder gran parte de su masa'],
  },
  vesicula: {
    name: 'Vesícula biliar',
    icon: '🟢',
    func: 'Pequeño saco bajo el hígado que almacena y concentra la bilis, y la libera al duodeno cuando comemos, sobre todo alimentos grasos.',
    facts: ['Almacena ~30–50 mL de bilis', 'Se puede vivir sin ella'],
  },
  pancreas: {
    name: 'Páncreas',
    icon: '🟡',
    func: 'Glándula doble: libera enzimas digestivas y bicarbonato al intestino (función exocrina) y hormonas como insulina y glucagón a la sangre (función endocrina).',
    facts: ['Produce ~1,5 L de jugo pancreático al día', 'Mide unos 15 cm'],
  },
  delgado: {
    name: 'Intestino delgado',
    icon: '🌀',
    func: 'Duodeno, yeyuno e íleon. Aquí termina la digestión y se absorbe la mayor parte de los nutrientes gracias a millones de vellosidades.',
    facts: ['Mide ~6–7 m', 'Su superficie de absorción equivale a una pista de bádminton (~30 m²)'],
  },
  colon: {
    name: 'Intestino grueso',
    icon: '🔶',
    func: 'Ciego, colon ascendente, transverso, descendente y sigmoide. Absorbe agua y electrolitos, alberga la microbiota y forma las heces.',
    facts: ['Mide ~1,5 m', 'Alberga billones de bacterias beneficiosas'],
  },
  apendice: {
    name: 'Apéndice',
    icon: '🪱',
    func: 'Pequeña prolongación del ciego con tejido linfoide. Podría actuar como reservorio de microbiota, aunque se vive perfectamente sin él.',
    facts: ['Mide ~5–10 cm'],
  },
  recto: {
    name: 'Recto y ano',
    icon: '🔻',
    func: 'El recto almacena las heces hasta la evacuación; los esfínteres anales (interno involuntario y externo voluntario) controlan la continencia.',
    facts: ['El recto mide ~12–15 cm'],
  },
};

const TYPES = {
  inflamatoria: 'Inflamatoria',
  infecciosa: 'Infecciosa',
  autoinmune: 'Autoinmune',
  funcional: 'Funcional',
  tumoral: 'Tumoral',
  metabolica: 'Metabólica',
  estructural: 'Estructural',
};

const DISEASES = [
  // ---------- ESÓFAGO ----------
  {
    id: 'erge', name: 'Reflujo gastroesofágico (ERGE)', organs: ['esofago'], type: 'inflamatoria',
    summary: 'El contenido ácido del estómago sube al esófago con frecuencia y causa molestias o lesiones.',
    symptoms: ['Ardor detrás del esternón (pirosis)', 'Regurgitación ácida', 'Tos crónica o ronquera', 'Dolor torácico no cardíaco'],
    causes: ['Esfínter esofágico inferior débil', 'Hernia de hiato', 'Obesidad y embarazo', 'Tabaco, alcohol, comidas copiosas o tardías'],
    diagnosis: 'Clínico en la mayoría; prueba con IBP. Endoscopia si hay síntomas de alarma; pHmetría en casos dudosos.',
    treatment: 'Bajar de peso, elevar la cabecera, no cenar tarde. Inhibidores de la bomba de protones (omeprazol, etc.). Cirugía (funduplicatura) en casos seleccionados.',
    fact: 'Entre el 10 y el 20 % de los adultos en países occidentales tiene síntomas de reflujo cada semana.',
  },
  {
    id: 'barrett', name: 'Esófago de Barrett', organs: ['esofago'], type: 'estructural',
    summary: 'El revestimiento del esófago inferior se transforma en un tejido similar al intestinal por el reflujo crónico.',
    symptoms: ['No produce síntomas propios', 'Los del reflujo de larga evolución'],
    causes: ['ERGE crónica', 'Sexo masculino, >50 años', 'Obesidad abdominal y tabaquismo'],
    diagnosis: 'Endoscopia con biopsias que confirman metaplasia intestinal.',
    treatment: 'Control del reflujo con IBP y endoscopias de vigilancia. Si hay displasia, ablación por radiofrecuencia o resección endoscópica.',
    fact: 'Es la principal lesión precursora del adenocarcinoma de esófago, aunque la mayoría de los pacientes nunca desarrolla cáncer.',
  },
  {
    id: 'acalasia', name: 'Acalasia', organs: ['esofago'], type: 'funcional',
    summary: 'El esfínter esofágico inferior no se relaja y el esófago pierde su movimiento, por lo que la comida se estanca.',
    symptoms: ['Dificultad para tragar sólidos y líquidos', 'Regurgitación de comida no digerida', 'Dolor torácico', 'Pérdida de peso'],
    causes: ['Pérdida de neuronas del plexo mientérico (causa desconocida, posible autoinmune)', 'Enfermedad de Chagas (en Latinoamérica)'],
    diagnosis: 'Manometría esofágica de alta resolución; esofagograma con bario y endoscopia.',
    treatment: 'Dilatación neumática, miotomía de Heller laparoscópica o miotomía endoscópica (POEM). Toxina botulínica si no se puede operar.',
    fact: 'Es poco frecuente: afecta a ~1 de cada 100 000 personas al año.',
  },
  {
    id: 'eoe', name: 'Esofagitis eosinofílica', organs: ['esofago'], type: 'autoinmune',
    summary: 'Inflamación crónica de tipo alérgico en la que el esófago se llena de eosinófilos.',
    symptoms: ['Dificultad para tragar', 'Comida que se queda atascada (impactación)', 'Ardor', 'En niños: rechazo del alimento y vómitos'],
    causes: ['Respuesta inmune a alérgenos alimentarios', 'Asociada a asma, rinitis y dermatitis atópica'],
    diagnosis: 'Endoscopia con biopsias: ≥15 eosinófilos por campo de gran aumento.',
    treatment: 'IBP, corticoides tópicos deglutidos (budesonida), dietas de eliminación y fármacos biológicos (dupilumab).',
    fact: 'Es hoy una de las causas más frecuentes de impactación de alimento en adultos jóvenes.',
  },

  // ---------- ESTÓMAGO ----------
  {
    id: 'gastritis', name: 'Gastritis', organs: ['estomago'], type: 'inflamatoria',
    summary: 'Inflamación de la mucosa del estómago, aguda o crónica.',
    symptoms: ['Dolor o ardor en la boca del estómago', 'Náuseas', 'Sensación de llenura', 'Con frecuencia, ninguno'],
    causes: ['Infección por Helicobacter pylori', 'Antiinflamatorios (AINE)', 'Alcohol', 'Autoinmunidad (gastritis atrófica)'],
    diagnosis: 'Prueba de H. pylori (aliento con urea o antígeno en heces) y endoscopia con biopsia.',
    treatment: 'Erradicar H. pylori con antibióticos + IBP, suspender AINE y alcohol, IBP para aliviar.',
    fact: 'Cerca de la mitad de la población mundial está infectada por H. pylori.',
  },
  {
    id: 'ulcera', name: 'Úlcera péptica', organs: ['estomago', 'delgado'], type: 'inflamatoria',
    summary: 'Herida abierta en la pared del estómago o del duodeno.',
    symptoms: ['Dolor quemante en el epigastrio', 'Dolor que mejora o empeora con la comida', 'Heces negras o vómito con sangre (complicación)'],
    causes: ['Helicobacter pylori', 'AINE y aspirina', 'Tabaco'],
    diagnosis: 'Endoscopia digestiva alta y búsqueda de H. pylori.',
    treatment: 'IBP durante semanas y erradicación de H. pylori. Endoscopia o cirugía si sangra o se perfora.',
    fact: 'Warren y Marshall ganaron el Nobel de Medicina 2005 al demostrar que una bacteria, y no el estrés, causa la mayoría de las úlceras.',
  },
  {
    id: 'cancer-gastrico', name: 'Cáncer gástrico', organs: ['estomago'], type: 'tumoral',
    summary: 'Tumor maligno, casi siempre adenocarcinoma, que se origina en la mucosa del estómago.',
    symptoms: ['Saciedad precoz y pérdida de apetito', 'Pérdida de peso', 'Anemia o sangrado', 'Dolor abdominal persistente'],
    causes: ['Infección crónica por H. pylori', 'Dieta rica en sal, ahumados y encurtidos', 'Tabaco', 'Antecedentes familiares'],
    diagnosis: 'Endoscopia con biopsia; TC para estadificar.',
    treatment: 'Resección endoscópica en estadios muy precoces; cirugía (gastrectomía) y quimioterapia perioperatoria.',
    fact: 'Erradicar H. pylori reduce el riesgo de desarrollarlo.',
  },
  {
    id: 'gastroenteritis', name: 'Gastroenteritis aguda', organs: ['estomago', 'delgado'], type: 'infecciosa',
    summary: 'Infección del estómago e intestino que causa diarrea y vómitos durante pocos días.',
    symptoms: ['Diarrea acuosa', 'Vómitos y náuseas', 'Cólicos', 'Fiebre leve'],
    causes: ['Virus (norovirus, rotavirus)', 'Bacterias (Salmonella, Campylobacter, E. coli)', 'Agua o alimentos contaminados'],
    diagnosis: 'Clínico. Coprocultivo si hay sangre, fiebre alta o dura más de 7 días.',
    treatment: 'Rehidratación oral (lo más importante). Antibióticos solo en casos concretos.',
    fact: 'El norovirus es la causa más común de gastroenteritis en el mundo. El lavado de manos con agua y jabón es más eficaz que el gel contra él.',
  },

  // ---------- HÍGADO ----------
  {
    id: 'higado-graso', name: 'Hígado graso (MASLD)', organs: ['higado'], type: 'metabolica',
    summary: 'Acumulación de grasa en el hígado asociada a sobrepeso, diabetes o colesterol alto, sin consumo excesivo de alcohol.',
    symptoms: ['Casi siempre asintomático', 'Cansancio', 'Molestia en el lado derecho del abdomen'],
    causes: ['Obesidad abdominal', 'Diabetes tipo 2 y resistencia a la insulina', 'Colesterol/triglicéridos altos', 'Sedentarismo'],
    diagnosis: 'Ecografía, análisis de sangre, índice FIB-4 y elastografía (FibroScan) para medir la fibrosis.',
    treatment: 'Perder un 7–10 % del peso, ejercicio y dieta mediterránea. En fibrosis avanzada existen fármacos específicos (p. ej., resmetirom).',
    fact: 'Afecta aproximadamente a 1 de cada 3 adultos en el mundo; es la enfermedad hepática más frecuente.',
  },
  {
    id: 'hepatitis', name: 'Hepatitis virales', organs: ['higado'], type: 'infecciosa',
    summary: 'Inflamación del hígado causada por virus (A, B, C, D y E). B y C pueden volverse crónicas.',
    symptoms: ['Cansancio y náuseas', 'Ictericia (piel y ojos amarillos)', 'Orina oscura', 'Muchas veces silenciosa durante años'],
    causes: ['A y E: agua o alimentos contaminados', 'B: sangre, vía sexual y de madre a hijo', 'C: sangre (agujas compartidas, transfusiones antiguas)'],
    diagnosis: 'Serologías y carga viral en sangre; elastografía para valorar daño.',
    treatment: 'A y E suelen curarse solas. B crónica: antivirales que la controlan. C: antivirales de acción directa que la curan en >95 % en 8–12 semanas.',
    fact: 'Existen vacunas muy eficaces contra la hepatitis A y B.',
  },
  {
    id: 'cirrosis', name: 'Cirrosis', organs: ['higado'], type: 'estructural',
    summary: 'Fase avanzada de cicatrización (fibrosis) del hígado que altera su estructura y función.',
    symptoms: ['Líquido en el abdomen (ascitis)', 'Ictericia', 'Sangrado por várices', 'Confusión (encefalopatía)', 'Puede no dar síntomas al inicio'],
    causes: ['Consumo excesivo de alcohol', 'Hepatitis B y C crónicas', 'Hígado graso metabólico'],
    diagnosis: 'Análisis, ecografía, elastografía y, a veces, biopsia.',
    treatment: 'Tratar la causa (dejar el alcohol, antivirales), controlar complicaciones y vigilar cáncer de hígado. Trasplante hepático en fases terminales.',
    fact: 'Detectada a tiempo, la fibrosis puede frenarse e incluso revertir parcialmente.',
  },

  // ---------- VESÍCULA ----------
  {
    id: 'calculos', name: 'Cálculos biliares y colecistitis', organs: ['vesicula'], type: 'estructural',
    summary: 'Piedras (casi siempre de colesterol) en la vesícula; si la obstruyen, se inflama (colecistitis).',
    symptoms: ['Dolor intenso en la parte superior derecha del abdomen tras comidas grasas (cólico biliar)', 'Dolor irradiado a espalda u hombro', 'Fiebre si hay colecistitis', 'La mayoría no da síntomas'],
    causes: ['Sexo femenino y edad >40', 'Obesidad, embarazo', 'Pérdida de peso muy rápida', 'Antecedentes familiares'],
    diagnosis: 'Ecografía abdominal.',
    treatment: 'Sin síntomas: solo vigilancia. Con síntomas: extirpación de la vesícula por laparoscopia (colecistectomía).',
    fact: 'Entre el 10 y el 15 % de los adultos tiene cálculos, pero solo una minoría tendrá síntomas.',
  },

  // ---------- PÁNCREAS ----------
  {
    id: 'pancreatitis', name: 'Pancreatitis aguda', organs: ['pancreas'], type: 'inflamatoria',
    summary: 'Inflamación súbita del páncreas en la que sus propias enzimas lo dañan.',
    symptoms: ['Dolor muy intenso en la parte alta del abdomen que se irradia a la espalda', 'Náuseas y vómitos', 'Fiebre, taquicardia'],
    causes: ['Cálculos biliares (la causa más frecuente)', 'Alcohol', 'Triglicéridos muy altos', 'Algunos fármacos, CPRE'],
    diagnosis: 'Dos de tres: dolor típico, lipasa en sangre >3 veces lo normal, imagen compatible.',
    treatment: 'Hospitalización: líquidos intravenosos, analgesia y nutrición temprana. Tratar la causa (p. ej., quitar la vesícula).',
    fact: 'Alrededor del 80 % de los casos son leves y se resuelven en una semana.',
  },
  {
    id: 'cancer-pancreas', name: 'Cáncer de páncreas', organs: ['pancreas'], type: 'tumoral',
    summary: 'Tumor maligno, sobre todo adenocarcinoma ductal, de diagnóstico habitualmente tardío.',
    symptoms: ['Ictericia sin dolor', 'Pérdida de peso inexplicable', 'Dolor abdominal o en la espalda', 'Diabetes de inicio reciente'],
    causes: ['Tabaco (principal factor modificable)', 'Obesidad y diabetes', 'Pancreatitis crónica', 'Mutaciones hereditarias (BRCA, etc.)'],
    diagnosis: 'TC con protocolo pancreático, ecoendoscopia con biopsia, marcador CA 19-9.',
    treatment: 'Cirugía (p. ej., Whipple) si es resecable, quimioterapia y radioterapia.',
    fact: 'Solo ~1 de cada 5 tumores es operable al diagnóstico; dejar de fumar es la mejor prevención.',
  },

  // ---------- INTESTINO DELGADO ----------
  {
    id: 'celiaca', name: 'Enfermedad celíaca', organs: ['delgado'], type: 'autoinmune',
    summary: 'Enfermedad autoinmune en la que el gluten daña las vellosidades del intestino delgado en personas predispuestas.',
    symptoms: ['Diarrea, distensión, gases', 'Anemia por falta de hierro', 'Cansancio, osteoporosis', 'Muchos casos con síntomas atípicos o ninguno'],
    causes: ['Predisposición genética (HLA-DQ2/DQ8)', 'Consumo de gluten (trigo, cebada, centeno)'],
    diagnosis: 'Anticuerpos antitransglutaminasa IgA (mientras se come gluten) y biopsia duodenal.',
    treatment: 'Dieta estricta sin gluten de por vida: las vellosidades se recuperan.',
    fact: 'Afecta a ~1 % de la población y la mayoría no está diagnosticada.',
  },
  {
    id: 'lactosa', name: 'Intolerancia a la lactosa', organs: ['delgado'], type: 'funcional',
    summary: 'Falta de lactasa, la enzima que digiere el azúcar de la leche; la lactosa fermenta en el colon.',
    symptoms: ['Gases y distensión', 'Diarrea', 'Cólicos 30 min – 2 h después de tomar lácteos'],
    causes: ['Descenso genético de lactasa tras la infancia (lo más común)', 'Daño intestinal (gastroenteritis, celiaquía)'],
    diagnosis: 'Test de hidrógeno en aliento o prueba de retirada de lácteos.',
    treatment: 'Reducir lactosa a la dosis tolerada, lácteos sin lactosa, yogur y quesos curados, suplementos de lactasa.',
    fact: 'Alrededor del 65 % de los adultos del mundo pierde parte de su capacidad de digerir lactosa. No es una alergia.',
  },
  {
    id: 'crohn', name: 'Enfermedad de Crohn', organs: ['delgado', 'colon'], type: 'autoinmune',
    summary: 'Enfermedad inflamatoria intestinal crónica que puede afectar cualquier tramo, de la boca al ano, en parches y con inflamación profunda.',
    symptoms: ['Diarrea crónica', 'Dolor abdominal (a menudo en la parte inferior derecha)', 'Pérdida de peso, fiebre', 'Fístulas y abscesos perianales'],
    causes: ['Interacción entre genética, microbiota y sistema inmune', 'El tabaco la empeora'],
    diagnosis: 'Ileocolonoscopia con biopsias, calprotectina fecal, resonancia magnética intestinal.',
    treatment: 'Corticoides en brotes, inmunomoduladores y fármacos biológicos (anti-TNF, anti-IL-12/23, anti-integrinas). Cirugía en complicaciones.',
    fact: 'Suele diagnosticarse entre los 15 y 35 años.',
  },

  // ---------- INTESTINO GRUESO ----------
  {
    id: 'colitis-ulcerosa', name: 'Colitis ulcerosa', organs: ['colon', 'recto'], type: 'autoinmune',
    summary: 'Enfermedad inflamatoria intestinal crónica que afecta de forma continua la mucosa del colon, empezando siempre por el recto.',
    symptoms: ['Diarrea con sangre y moco', 'Urgencia para defecar', 'Sensación de evacuación incompleta (tenesmo)', 'Dolor tipo cólico'],
    causes: ['Respuesta inmune anómala frente a la microbiota en personas predispuestas'],
    diagnosis: 'Colonoscopia con biopsias; calprotectina fecal.',
    treatment: 'Mesalazina (5-ASA), corticoides en brotes, biológicos e inhibidores de JAK. Colectomía si falla el tratamiento.',
    fact: 'A diferencia del Crohn, solo afecta al colon y la inflamación es superficial y continua.',
  },
  {
    id: 'sii', name: 'Síndrome de intestino irritable', organs: ['colon', 'delgado'], type: 'funcional',
    summary: 'Trastorno de la interacción intestino-cerebro con dolor abdominal y cambios en el ritmo intestinal, sin daño visible.',
    symptoms: ['Dolor abdominal relacionado con la defecación', 'Diarrea, estreñimiento o alternancia', 'Hinchazón y gases'],
    causes: ['Hipersensibilidad visceral', 'Alteraciones de la motilidad y la microbiota', 'Estrés; puede aparecer tras una gastroenteritis'],
    diagnosis: 'Criterios de Roma IV, descartando enfermedades orgánicas.',
    treatment: 'Dieta baja en FODMAP, fibra soluble (psyllium), antiespasmódicos, terapias psicológicas y fármacos según el subtipo.',
    fact: 'Afecta a ~5–10 % de la población; no aumenta el riesgo de cáncer.',
  },
  {
    id: 'diverticulitis', name: 'Diverticulitis', organs: ['colon'], type: 'inflamatoria',
    summary: 'Inflamación de los divertículos, pequeñas bolsas que se forman en la pared del colon.',
    symptoms: ['Dolor en la parte inferior izquierda del abdomen', 'Fiebre', 'Náuseas, cambios en el ritmo intestinal'],
    causes: ['Edad (>60 % de mayores de 60 años tiene divertículos)', 'Dieta pobre en fibra, obesidad, sedentarismo'],
    diagnosis: 'Tomografía (TC) de abdomen.',
    treatment: 'Casos leves: dieta y analgesia, los antibióticos no siempre son necesarios. Complicados (absceso, perforación): hospital, drenaje o cirugía.',
    fact: 'Comer frutos secos y semillas NO aumenta el riesgo, como se creía antes.',
  },
  {
    id: 'cancer-colorrectal', name: 'Cáncer colorrectal', organs: ['colon', 'recto'], type: 'tumoral',
    summary: 'Tumor maligno del colon o del recto que casi siempre se origina a partir de un pólipo benigno durante años.',
    symptoms: ['Sangre en las heces', 'Cambio persistente del ritmo intestinal', 'Anemia y cansancio', 'Pérdida de peso'],
    causes: ['Edad >45–50 años', 'Antecedentes familiares o síndromes hereditarios', 'Carnes procesadas, alcohol, tabaco, obesidad, sedentarismo', 'Enfermedad inflamatoria intestinal'],
    diagnosis: 'Colonoscopia con biopsia. Cribado con test de sangre oculta (FIT) o colonoscopia desde los 45–50 años.',
    treatment: 'Extirpación de pólipos por colonoscopia; cirugía, quimioterapia, radioterapia (recto) y terapias dirigidas.',
    fact: 'Es uno de los cánceres más prevenibles: quitar los pólipos evita que se malignicen.',
  },
  {
    id: 'estrenimiento', name: 'Estreñimiento crónico', organs: ['colon'], type: 'funcional',
    summary: 'Evacuaciones poco frecuentes, difíciles o incompletas durante al menos tres meses.',
    symptoms: ['Menos de 3 deposiciones por semana', 'Heces duras', 'Esfuerzo excesivo', 'Sensación de evacuación incompleta'],
    causes: ['Poca fibra o líquidos', 'Sedentarismo', 'Fármacos (opioides, hierro)', 'Hipotiroidismo, disfunción del suelo pélvico'],
    diagnosis: 'Clínico (criterios de Roma IV). Colonoscopia si hay señales de alarma.',
    treatment: 'Fibra (25–30 g/día), agua, actividad física, laxantes osmóticos (polietilenglicol) y biofeedback si hay disinergia.',
    fact: 'Apoyar los pies en un taburete al defecar endereza el ángulo anorrectal y facilita la evacuación.',
  },

  // ---------- APÉNDICE ----------
  {
    id: 'apendicitis', name: 'Apendicitis', organs: ['apendice'], type: 'inflamatoria',
    summary: 'Inflamación aguda del apéndice, generalmente por obstrucción. Es una urgencia quirúrgica.',
    symptoms: ['Dolor que empieza alrededor del ombligo y se desplaza a la parte inferior derecha', 'Pérdida de apetito', 'Náuseas, fiebre'],
    causes: ['Obstrucción por heces endurecidas (fecalito) o tejido linfoide'],
    diagnosis: 'Exploración física, análisis y ecografía o TC.',
    treatment: 'Apendicectomía (casi siempre laparoscópica). En casos no complicados seleccionados, antibióticos.',
    fact: 'Es la urgencia quirúrgica abdominal más común; es más frecuente entre los 10 y 30 años.',
  },

  // ---------- RECTO / ANO ----------
  {
    id: 'hemorroides', name: 'Hemorroides', organs: ['recto'], type: 'estructural',
    summary: 'Las almohadillas vasculares normales del canal anal se dilatan e inflaman.',
    symptoms: ['Sangre roja brillante al defecar', 'Picor y molestia', 'Bulto que sale (prolapso)', 'Dolor intenso si se trombosan'],
    causes: ['Estreñimiento y esfuerzo al defecar', 'Embarazo', 'Pasar mucho tiempo sentado en el inodoro'],
    diagnosis: 'Exploración proctológica; colonoscopia si hay dudas sobre el origen del sangrado.',
    treatment: 'Fibra, agua, baños de asiento, pomadas. Ligadura con bandas elásticas o cirugía en casos persistentes.',
    fact: 'Todos tenemos hemorroides: solo son un problema cuando dan síntomas.',
  },
  {
    id: 'fisura', name: 'Fisura anal', organs: ['recto'], type: 'estructural',
    summary: 'Pequeño desgarro en el revestimiento del canal anal.',
    symptoms: ['Dolor agudo e intenso al defecar que dura minutos u horas', 'Pequeño sangrado rojo en el papel'],
    causes: ['Heces duras o diarrea', 'Espasmo del esfínter anal interno'],
    diagnosis: 'Inspección visual de la zona anal.',
    treatment: 'Fibra y agua, baños de asiento, pomadas de nitroglicerina o diltiazem, toxina botulínica o esfinterotomía si no cura.',
    fact: 'La mayoría de las fisuras agudas cura en 4–6 semanas con medidas sencillas.',
  },
];

const JOURNEY = [
  { organ: 'boca', title: 'Boca', time: '5–30 segundos', text: 'Los dientes trituran el alimento y la saliva lo humedece. La amilasa salival empieza a romper los almidones. La lengua forma el bolo y lo empuja hacia la faringe.', tip: 'Masticar bien facilita todo lo que viene después.' },
  { organ: 'esofago', title: 'Esófago', time: '5–10 segundos', text: 'Ondas de contracción (peristalsis) empujan el bolo hacia abajo, incluso si estás cabeza abajo. El esfínter inferior se abre para dejarlo pasar y se cierra para que el ácido no suba.', tip: 'Acostarse justo después de comer favorece el reflujo.' },
  { organ: 'estomago', title: 'Estómago', time: '2–5 horas', text: 'El ácido clorhídrico y la pepsina empiezan a digerir las proteínas. El estómago mezcla todo hasta formar el quimo y lo libera de a poco al duodeno.', tip: 'Las comidas grasas tardan más en salir del estómago.' },
  { organ: 'delgado', title: 'Intestino delgado', time: '2–6 horas', text: 'La bilis del hígado y las enzimas del páncreas terminan la digestión. Las vellosidades absorben azúcares, aminoácidos, grasas, vitaminas y minerales hacia la sangre.', tip: 'Aquí se absorbe ~90 % de los nutrientes.' },
  { organ: 'colon', title: 'Intestino grueso', time: '10–59 horas', text: 'Se absorben agua y sales. La microbiota fermenta la fibra y produce ácidos grasos de cadena corta y algunas vitaminas (K, B). Se forman las heces.', tip: 'La fibra es el alimento de tus bacterias buenas.' },
  { organ: 'recto', title: 'Recto y ano', time: 'Hasta la evacuación', text: 'El recto se distiende y envía la señal de ganas de defecar. Los esfínteres permiten elegir el momento adecuado para evacuar.', tip: 'Ignorar las ganas de forma repetida favorece el estreñimiento.' },
];

const ALARMS = [
  { icon: '🩸', title: 'Sangre en heces o heces negras', why: 'Las heces negras y pegajosas (melena) sugieren sangrado alto (úlcera, várices); la sangre roja, sangrado bajo. Puede ser desde hemorroides hasta pólipos o cáncer.' },
  { icon: '🤮', title: 'Vómito con sangre o "posos de café"', why: 'Indica sangrado del tubo digestivo superior. Es una urgencia médica.' },
  { icon: '⚖️', title: 'Pérdida de peso sin explicación', why: 'Perder más del 5 % del peso en 6–12 meses sin proponérselo obliga a descartar malabsorción, enfermedad inflamatoria o tumores.' },
  { icon: '🍞', title: 'Dificultad progresiva para tragar', why: 'La disfagia que empeora (primero sólidos, luego líquidos) puede deberse a una estenosis o a un tumor de esófago.' },
  { icon: '⚡', title: 'Dolor abdominal súbito e intenso', why: 'Puede indicar apendicitis, pancreatitis, perforación u obstrucción. Acude a urgencias.' },
  { icon: '💛', title: 'Piel u ojos amarillos', why: 'La ictericia refleja un problema del hígado o una obstrucción de la vía biliar (cálculos o tumor).' },
  { icon: '🔄', title: 'Cambio persistente del ritmo intestinal', why: 'Sobre todo después de los 45–50 años, si dura más de unas semanas debe valorarse con colonoscopia.' },
  { icon: '🌡️', title: 'Fiebre con dolor abdominal', why: 'Sugiere un proceso infeccioso o inflamatorio como colecistitis, diverticulitis o apendicitis.' },
];

const QUIZ = [
  { q: 'La mayoría de las úlceras de estómago se deben al estrés.', a: false, e: 'Las causas principales son la bacteria Helicobacter pylori y los antiinflamatorios (AINE). El estrés puede empeorar síntomas, pero no es la causa habitual.' },
  { q: 'Una colonoscopia puede prevenir el cáncer colorrectal.', a: true, e: 'Durante la colonoscopia se extirpan pólipos antes de que se transformen en cáncer.' },
  { q: 'La enfermedad celíaca es una alergia al gluten.', a: false, e: 'Es una enfermedad autoinmune: el gluten activa una respuesta inmune que daña las vellosidades del intestino delgado.' },
  { q: 'Se puede tener hígado graso sin beber alcohol.', a: true, e: 'El hígado graso metabólico (MASLD) se asocia a obesidad, diabetes y colesterol alto, y afecta a ~1 de cada 3 adultos.' },
  { q: 'La hepatitis C hoy tiene cura.', a: true, e: 'Los antivirales de acción directa la curan en más del 95 % de los casos en 8–12 semanas.' },
  { q: 'Comer comida picante causa úlceras.', a: false, e: 'El picante puede irritar y empeorar síntomas en algunas personas, pero no provoca úlceras.' },
  { q: 'La intolerancia a la lactosa obliga a eliminar todos los lácteos.', a: false, e: 'La mayoría tolera pequeñas cantidades, yogur y quesos curados. Además existen lácteos sin lactosa y suplementos de lactasa.' },
  { q: 'Todas las personas tienen hemorroides.', a: true, e: 'Son estructuras vasculares normales del canal anal. Solo hablamos de "enfermedad hemorroidal" cuando dan síntomas.' },
];
