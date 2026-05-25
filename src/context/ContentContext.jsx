import { createContext, useContext, useState, useEffect } from 'react'

const ContentContext = createContext(null)

export const DEFAULT_CONTENT = {
  landing: {
    heroPretitle:  'Moda Argentina',
    heroTitle:     'Tu estilo,\ntu identidad',
    heroSubtitle:  'Ropa, accesorios y calzado seleccionados para que te veas increíble todos los días. Tendencias que llegan directo a tu puerta.',
    heroImage:     '/hero.jpeg',
    aboutTitle:    'Más que moda, una actitud',
    aboutText1:    'MiTienda nació de una idea simple: hacer que la moda de calidad sea accesible para todos. Seleccionamos cada pieza con cuidado para que encuentres exactamente lo que buscás.',
    aboutText2:    'Trabajamos con marcas y diseñadores locales para ofrecerte productos únicos que combinan estilo, calidad y precio justo.',
    statClientes:  '+1000',
    statArtesanos: '20+',
    statAnios:     '2',
    features: [
      { icon: '👗', title: 'Moda actualizada', desc: 'Nuevas colecciones cada temporada con las últimas tendencias del mercado.' },
      { icon: '🚚', title: 'Envíos a todo el país', desc: 'Despachamos en 24-48 horas hábiles. Seguimiento en tiempo real.' },
      { icon: '✅', title: 'Calidad garantizada', desc: 'Cada producto pasa por un control de calidad antes de llegar a tus manos.' },
      { icon: '💚', title: 'Devolución sin preguntas', desc: 'Si no estás conforme, te devolvemos el dinero en 15 días.' },
    ],
    testimonials: [
      { name: 'Valentina R.', city: 'Buenos Aires', text: 'La calidad de la ropa es increíble y llegó en tiempo récord. Ya hice tres compras y siempre quedo feliz.' },
      { name: 'Camila G.', city: 'Córdoba', text: 'Los accesorios son hermosos y el precio es imbatible. Totalmente recomendado para regalar.' },
      { name: 'Sofía M.', city: 'Rosario', text: 'El calzado es exactamente como en las fotos, muy cómodo y de excelente calidad. ¡Vuelvo siempre!' },
    ],
  },
  nosotros: {
    heroImage:    '/nosotros.jpeg',
    heroTitle:    'Una historia de moda y pasión',
    heroSubtitle: 'Somos un equipo apasionado por la moda que cree que vestirse bien no debería ser un lujo.',
    storyTitle:   '¿Cómo empezó todo?',
    storyText1:   'Todo comenzó con una pregunta simple: ¿por qué es tan difícil encontrar ropa de calidad a un precio accesible? Nuestra fundadora decidió que era hora de cambiar eso y en 2023 abrió MiTienda.',
    storyText2:   'Lo que empezó como un emprendimiento familiar rápidamente creció gracias a la confianza de nuestros clientes. Hoy trabajamos con más de 20 marcas y diseñadores locales para ofrecerte lo mejor de la moda argentina.',
    storyText3:   'Nuestra misión es simple: que cada persona encuentre su estilo sin tener que sacrificar calidad ni presupuesto. Porque la moda es para todos.',
    timeline: [
      { year: '2023', event: 'Primer lanzamiento online con 50 productos seleccionados a mano.' },
      { year: '2023', event: 'Superamos los 200 clientes en los primeros 6 meses.' },
      { year: '2024', event: 'Sumamos calzado y bolsos a nuestro catálogo.' },
      { year: '2025', event: 'Más de 1000 clientes satisfechos en todo el país.' },
    ],
    team: [
      { name: 'Laura García', role: 'Fundadora & Directora creativa', emoji: '👩‍💼' },
      { name: 'Martín López', role: 'Compras & Proveedores', emoji: '🧑‍💻' },
      { name: 'Ana Torres', role: 'Atención al cliente', emoji: '👩‍🎨' },
    ],
    values: [
      { icon: '✨', title: 'Estilo', desc: 'Seleccionamos cada pieza pensando en la moda actual y atemporal.' },
      { icon: '🤝', title: 'Confianza', desc: 'Relaciones transparentes con clientes y proveedores.' },
      { icon: '♻️', title: 'Responsabilidad', desc: 'Priorizamos marcas con procesos de producción sustentables.' },
      { icon: '💬', title: 'Cercanía', desc: 'Atención personalizada para que tu experiencia de compra sea perfecta.' },
    ],
  },
  contacto: {
    email:    'hola@mitienda.com.ar',
    whatsapp: '5491100000000',
    ciudad:   'Buenos Aires, Argentina',
    horario:  'Lunes a viernes de 9 a 18 hs',
    instagram: 'https://www.instagram.com/',
    tiktok:    'https://www.tiktok.com/',
    faq: [
      { q: '¿Cuánto tarda el envío?', a: 'Enviamos en 24-48 hs hábiles. Una vez despachado, el tiempo de entrega depende de la provincia.' },
      { q: '¿Cómo sé qué talle elegir?', a: 'Cada producto tiene una guía de talles con medidas exactas. Si tenés dudas, escribinos por WhatsApp.' },
      { q: '¿Hacen envíos al exterior?', a: 'Por ahora solo enviamos dentro de Argentina. ¡Estamos trabajando para ampliar pronto!' },
      { q: '¿Puedo devolver un producto?', a: 'Sí. Tenés 15 días desde la recepción para solicitar un cambio o devolución sin ningún costo adicional.' },
    ],
  },
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [loaded, setLoaded]   = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/content?key=landing').then(r => r.json()),
      fetch('/api/content?key=nosotros').then(r => r.json()),
      fetch('/api/content?key=contacto').then(r => r.json()),
    ]).then(([landing, nosotros, contacto]) => {
      setContent({
        landing:  { ...DEFAULT_CONTENT.landing,  ...(Object.keys(landing).length  > 1 ? landing  : {}) },
        nosotros: { ...DEFAULT_CONTENT.nosotros, ...(Object.keys(nosotros).length > 1 ? nosotros : {}) },
        contacto: { ...DEFAULT_CONTENT.contacto, ...(Object.keys(contacto).length > 1 ? contacto : {}) },
      })
    }).catch(() => {}).finally(() => setLoaded(true))
  }, [])

  const saveContent = async (key, data) => {
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, ...data }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `Error ${res.status} al guardar`)
    }
    setContent(prev => ({ ...prev, [key]: { ...prev[key], ...data } }))
  }

  return (
    <ContentContext.Provider value={{ content, saveContent, loaded }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() { return useContext(ContentContext) }
