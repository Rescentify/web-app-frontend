import { useEffect, useState } from 'react';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LoadingIndicator from '../components/LoadingIndicator';
import thinkingLottie from '../assets/lotties/thinking.lottie';
import ProductDetail from '../components/ProductDetail';

function Home() {
  const [userInput, setUserInput] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [scentAdvisorResult, setScentAdvisorResult] = useState({
    prediction: '',
    variant: ''
  });
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

      const variantRecommendation =
        prediction === 'anxiety' || prediction === 'relax'
          ? 'rose'
          : prediction === 'insomnia' || prediction === 'stress'
          ? 'lavender'
          : 'jasmine';

      setScentAdvisorResult({
        prediction: prediction.replace(/^./, prediction[0].toUpperCase()),
        variant: variantRecommendation
      });
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
          {!scentAdvisorResult.prediction ? (
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
                  {scentAdvisorResult.prediction}
                </h3>
              </div>
              <ProductDetail variant={scentAdvisorResult.variant} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
