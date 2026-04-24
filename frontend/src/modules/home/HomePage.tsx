import logo from "../../assets/logo.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <section className="px-8 md:px-16 py-20 max-w-6xl mx-auto relative">

        {/* LOGO PEQUEÑO ESQUINADO */}
        <img
          src={logo}
          alt="Otero's Food"
          className="object-contain absolute top-4 right-4"
          style={{
            width: "60px",
            height: "auto",
          }}
        />

        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-5xl font-bold text-[#7f1d1d] leading-tight">
          Otero’s Food
        </h1>

      </section>
    </div>
  );
}
