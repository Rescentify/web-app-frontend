import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-hero bg-cover bg-no-repeat h-screen flex items-center justify-center">
      <div className="text-white w-3/5 text-center">
        <h2 className="font-philosopher text-6xl mb-10">
          Ceritakan Harimu, Rescentify Rekomendasikan Lilin Untukmu
        </h2>
        <Link to="#" className="bg-primary px-6 py-3 rounded-full text-xl">
          Coba Sekarang
        </Link>
      </div>
    </div>
  );
}

export default Home;
