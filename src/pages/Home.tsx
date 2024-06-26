import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LoadingIndicator from '../components/LoadingIndicator';
import thinkingLottie from '../assets/lotties/thinking.lottie';
import productImage from '../assets/images/product.jpg';

function Home() {
  const [userInput, setUserInput] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [scentAdvisorResult, setScentAdvisorResult] = useState('');
  const [inputValidation, setInputValidation] = useState({
    status: true,
    message: ''
  });

  const scentAdvisorBaseUrl = import.meta.env.VITE_SCENT_ADVISOR_BASE_URL;
  const INPUT_WORD_MIN_LENGTH = 7;

  useEffect(() => {
    if (!userInput.length) {
      setInputValidation({
        status: false,
        message: ''
      });
      return;
    }

    const userInputWordsCount = userInput.trim().split(' ').length;
    if (userInputWordsCount < INPUT_WORD_MIN_LENGTH) {
      setInputValidation({
        status: false,
        message: `Berikan minimal ${INPUT_WORD_MIN_LENGTH} kata agar ScentAdvisor dapat memberikan rekomendasi yang sesuai`
      });
    } else {
      setInputValidation({ status: true, message: '' });
    }
  }, [userInput]);

  async function getRecommendation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${scentAdvisorBaseUrl}/predict`, {
        text: userInput
      });
      const prediction = response.data;
      setScentAdvisorResult(
        prediction.replace(/^./, prediction[0].toUpperCase())
      );
      response.data;
    } catch (error) {
      console.log('Error predicting user input:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section
        id="jumbotron"
        className="bg-hero bg-cover bg-no-repeat h-screen flex items-center justify-center"
      >
        <div className="text-white w-3/5 text-center">
          <h2 className="font-philosopher text-6xl mb-10">
            Ceritakan Harimu, Rescentify Rekomendasikan Lilin Untukmu
          </h2>
          <a
            href="#scent-advisor"
            className="bg-primary px-6 py-3 rounded-full text-xl"
          >
            Coba Sekarang
          </a>
        </div>
      </section>

      <section id="scent-advisor" className="p-20 flex flex-col gap-6">
        <h3 className="text-center text-3xl font-bold">
          Bagaimana Perasaanmu?
        </h3>
        <form
          onSubmit={getRecommendation}
          className="mx-24 gap-2 relative"
          noValidate
        >
          <textarea
            className={`w-full pl-4 pr-16 py-2 rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.1)] resize-none focus:ring-0 focus:outline-none ${
              inputValidation.message ? 'border border-red-400' : ''
            }`}
            rows={2}
            placeholder="Saya merasa lelah setiap pulang kerja"
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button
            className={`right-4 bottom-1/3 absolute ${
              !inputValidation.status && 'opacity-50'
            }`}
            disabled={isloading || !inputValidation.status}
          >
            {isloading ? (
              <LoadingIndicator />
            ) : (
              <svg
                height="32"
                viewBox="0 0 48 48"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
                className={`fill-secondary transition-colors duration-300 ${
                  inputValidation.status && 'hover:fill-primary'
                }`}
              >
                <path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
            )}
          </button>

          {!inputValidation.status && (
            <p className="absolute text-red-400">{inputValidation.message}</p>
          )}
        </form>

        <div className="bg-[#F3E7DB] -m-20 -mt-14 p-20 flex flex-col items-center gap-6">
          {!scentAdvisorResult ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <DotLottieReact
                src={thinkingLottie}
                loop
                autoplay
                speed={2}
                className="h-[300px]"
              />
              <p className="text-center max-w-96">
                Ceritakan harimu di atas dan {''}
                <span className="font-bold text-primary">
                  ScentAdvisor AI
                </span>{' '}
                akan{' '}
                <span className="font-bold">
                  memberikan rekomendasi lilin untukmu
                </span>
              </p>
            </div>
          ) : (
            <>
              <div className="">
                <span className="text-xs tracking-widest">HASIL PREDIKSI</span>
                <h3 className="font-bold text-2xl underline underline-offset-4 decoration-2 decoration-primary">
                  {scentAdvisorResult}
                </h3>
              </div>
              <div className="w-3/4 flex justify-center items-center gap-6">
                <div className="relative w-fit flex justify-center">
                  <img
                    src={productImage}
                    alt="Your Candle Recommendation"
                    className="rounded-lg"
                    width={300}
                  />
                  <span className="bg-red-400 text-white px-4 py-1 rounded-full absolute -top-3 text-sm">
                    Rekomendasi Untukmu
                  </span>
                </div>
                <div className="w-1/2">
                  <h3 className="text-3xl text-primary mb-1">
                    Lavender Scented Candle
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Terjual 99+</span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="inline w-5 h-5 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                      <span>4.6 (56 rating)</span>
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <h4 className="font-bold text-2xl inline-block">
                      Rp69.900,00
                    </h4>
                    <div>
                      <span className="bg-red-200 text-red-500 py-1 px-1.5 text-xs rounded-md">
                        30%
                      </span>
                      <span className="line-through text-xs ml-1 opacity-50">
                        Rp100.000,00
                      </span>
                    </div>
                  </div>
                  <hr className="h-[0.5px] my-6 bg-black border-0 opacity-40" />
                  <p className="mb-6">
                    Lilin aromaterapi dengan aroma yang segar dan dapat membawa
                    suasana rileks dalam ruangan.
                  </p>
                  <button className="bg-primary px-5 py-2 rounded-full text-white">
                    <Link to="https://tokopedia.com" target="_blank">
                      Pesan Sekarang
                    </Link>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
