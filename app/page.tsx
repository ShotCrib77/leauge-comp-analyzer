import Badges from "./components/Badges";
import Footer from "./components/Footer";
import TeamChampions from "./components/TeamChampions";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#070b12]">
      
      {/* Hex background */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2 L36 11 L36 29 L20 38 L4 29 L4 11 Z' fill='none' stroke='%23c89b3c' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "40px 40px"
      }} />
 
      <div className="relative w-full max-w-lg px-6 my-16 lg:my-0">

        <div className="text-center mb-4 my-16">
          <h1
            className="text-5xl md:text-6xl font-bold tracking-wide text-[#c89b3c]"
            style={{
              fontFamily: "'Georgia', serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)",
            }}
          >
            TeamLOL
          </h1>
          <h2
            className="mt-2 text-xl tracking-widest uppercase text-[#e8e0d0]"
            style={{
              textShadow: "0 1px 4px #000, 0 1px 4px #000"
            }}
          >
            Team strengths and weaknesses
          </h2>
        </div>
      </div>
      <TeamChampions />
      
      <Footer />
    </div>
  );
}