export default function Advantages() {
  const ventajas = [
    {
      icon: "♻️",
      title: "Cuidás el planeta",
      description:
        "Reducís la tala de árboles y el desperdicio de papel al reutilizar libros.",
    },
    {
      icon: "💸",
      title: "Ahorrás dinero",
      description:
        "Hasta un 70% más baratos que los libros nuevos, y en excelente estado.",
    },
    {
      icon: "📚",
      title: "Amplia variedad",
      description:
        "Encontrá desde textos escolares hasta novelas, todos en un solo lugar.",
    },
    {
      icon: "🤝",
      title: "Comunidad lectora",
      description:
        "Le das una nueva vida a los libros y ayudás a que lleguen a otros lectores.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Ventajas de comprar en ReLibro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ventajas.map((v, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4 text-center">{v.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {v.title}
              </h3>
              <p className="text-gray-600 text-center">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}