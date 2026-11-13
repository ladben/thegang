import './GradientBorder.css';

const GradientBorder = ({
  colorVariant,
  coverColor,
  borderWidth = 1,
  borderRadius,
  children,
}) => {
  const DEFAULT_GRADIENT = 'var(--gradient-linear-default)';

  const gradientDictionary = {
    linearDark: 'var(--gradient-linear-dark)',
    linearGolden: 'var(--gradient-linear-golden)',
    linearGoldenO80: 'var(--gradient-linear-golden-o80)',
  };

  const gradientBorderStyle = {
    '--gb-gradient-bg': gradientDictionary[colorVariant] || DEFAULT_GRADIENT,
    '--gb-border-radius': `${borderRadius || 0}px`,
    '--gb-border-width': `${borderWidth || 0}px`,
  };

  const gradientCoverStyle = {
    '--gb-cover-color': coverColor || '#00000000',
    '--gb-cover-border-radius': borderRadius
      ? `${borderRadius - borderWidth}px`
      : '0px',
  };

  console.log(gradientCoverStyle);
  return (
    <div className='gradient-border' style={gradientBorderStyle}>
      <div className='gradient-border-cover' style={gradientCoverStyle}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
