import { Link } from 'react-router-dom';
import lavenderProductImage from '../assets/images/products/lavender.jpg';
import roseProductImage from '../assets/images/products/rose.jpg';
import jasmineProductImage from '../assets/images/products/jasmine.jpg';

interface ProductDetailProps {
  variant: string;
}

const productDetails = {
  lavender: {
    title: 'Lavender Scented Candle',
    description:
      'Lilin aromaterapi yang dapat menciptakan suasana tenang untuk meredakan insomnia',
    image: lavenderProductImage
  },
  rose: {
    title: 'Rose Scented Candle',
    description:
      'Lilin dengan aroma klasik yang dapat memberikan ketenangan dalam suasana hati yang cemas',
    image: roseProductImage
  },
  jasmine: {
    title: 'Jasmine Scented Candle',
    description:
      'Lilin dengan aroma segar yang dapat meningkatkan mood dan memberikan efek relaksasi',
    image: jasmineProductImage
  }
};

function ProductDetail({ variant }: ProductDetailProps) {
  const product = productDetails[variant as keyof typeof productDetails];

  return !product ? (
    <div>Not found</div>
  ) : (
    <div className="w-3/4 flex justify-center items-center gap-6">
      <div className="relative w-fit flex justify-center">
        <img
          src={product.image}
          alt="Your Candle Recommendation"
          className="rounded-lg"
          width={300}
        />
        <span className="bg-red-400 text-white px-4 py-1 rounded-full absolute -top-3 text-sm">
          Rekomendasi Untukmu
        </span>
      </div>
      <div className="w-1/2">
        <h3 className="text-3xl text-primary mb-1">{product.title}</h3>
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
          <h4 className="font-bold text-2xl inline-block">Rp69.900,00</h4>
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
        <p className="mb-6">{product.description}</p>
        <button className="bg-primary px-5 py-2 rounded-full text-white">
          <Link to="https://tokopedia.com" target="_blank">
            Pesan Sekarang
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
