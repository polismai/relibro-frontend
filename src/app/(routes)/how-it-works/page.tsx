export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">¿Cómo funciona ReLibro?</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📚 Comprar un libro</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Explorá el catálogo de libros disponibles por año escolar o palabra clave.</li>
          <li>Cuando encuentres uno que te interese, hacé clic en <strong>“Contactar con el vendedor”</strong>.</li>
          <li>Te mostraremos los datos del vendedor para que puedas comunicarte directamente.</li>
          <li>Coordinan entre ustedes el pago y la entrega. ¡Así de simple!</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📤 Vender un libro</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Publicá un libro desde la sección <strong>“Agregar libro”</strong>.</li>
          <li>Incluí toda la información: título, año escolar, estado, precio y tus datos de contacto.</li>
          <li>Los compradores interesados podrán ver tu publicación y contactarte directamente.</li>
          <li>Coordinás con ellos el pago y la entrega de forma libre y segura.</li>
        </ul>
      </section>

      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-sm text-gray-800">
          <strong>Importante:</strong> ReLibro no interfiere en el pago ni la entrega. Solo facilitamos el contacto entre personas que quieren dar una nueva vida a sus libros.
        </p>
      </section>
    </div>
  );
}