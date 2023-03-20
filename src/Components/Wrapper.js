import Nav from './Nav';
import Weather from './Weather';

const Wrapper = () => {
  return (
    <div className='h-screen bg-sky-400 py-5'>
        <div className='wrapper-width mx-auto'>
          <Nav />
          <Weather /> 
        </div>
    </div>
  );
}

export default Wrapper;