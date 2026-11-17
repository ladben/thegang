import './Underline.css';

const Underline = ({ title }) => {
  return (
    <div className='card-header-underline'>
      <div className='underline underline-left'>
        <div className='underline-circle'></div>
        <div className='underline-line'></div>
      </div>
      <p>{title}</p>
      <div className='underline underline-right'>
        <div className='underline-circle'></div>
        <div className='underline-line'></div>
      </div>
    </div>
  );
};

export default Underline;
