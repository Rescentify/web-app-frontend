import logo from '../assets/images/logo-landscape.png';

interface ComingSoonProps {
  pageContent: string;
}

function ComingSoon({ pageContent }: ComingSoonProps) {
  return (
    <div className="bg-gradient-to-tr from-primary to-secondary h-screen flex flex-col justify-center items-center gap-10 text-white">
      <h1 className="text-xl text-center">
        {pageContent} Content Are{' '}
        <span className="block font-philosopher text-6xl">COMING SOON</span>
      </h1>
      <img src={logo} width={120} />
    </div>
  );
}

export default ComingSoon;
