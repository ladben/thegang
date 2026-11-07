const CardGraphic = ({ type, number }) => {
  const isSpecialist = type === 'specialist';
  const primaryColor = isSpecialist ? '#EF4444' : '#F59E0B';
  const secondaryColor = isSpecialist ? '#7F1D1D' : '#78350F';

  // Specialist SVGs (1-10)
  if (isSpecialist) {
    switch (number) {
      case 1: // Informant
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <circle cx='32' cy='20' r='10' stroke={primaryColor} />
            <path d='M16 52 C16 38, 48 38, 48 52' stroke={primaryColor} />
            <path
              d='M42 22 L56 16 M42 28 L58 30'
              stroke='#F59E0B'
              strokeDasharray='2 2'
            />
            <circle cx='56' cy='16' r='2' fill='#F59E0B' />
          </svg>
        );
      case 2: // Getaway Driver
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <path d='M8 40 L16 22 H48 L56 40 V50 H8 Z' stroke={primaryColor} />
            <circle
              cx='20'
              cy='50'
              r='5'
              fill={secondaryColor}
              stroke={primaryColor}
            />
            <circle
              cx='44'
              cy='50'
              r='5'
              fill={secondaryColor}
              stroke={primaryColor}
            />
            <path d='M22 28 H42' stroke='#F59E0B' strokeWidth='3' />
          </svg>
        );
      case 3: // Investor
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <rect
              x='16'
              y='16'
              width='32'
              height='32'
              rx='4'
              stroke={primaryColor}
            />
            <circle cx='32' cy='32' r='8' stroke='#F59E0B' />
            <path
              d='M32 20 V12 M32 44 V52 M20 32 H12 M44 32 H52'
              stroke='#F59E0B'
            />
            <text
              x='32'
              y='36'
              fontSize='12'
              textAnchor='middle'
              fill='#F59E0B'
              fontWeight='bold'
            >
              $
            </text>
          </svg>
        );
      case 4: // Mastermind
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <path
              d='M32 10 C20 10 12 20 12 32 C12 40 18 46 22 50 V56 H42 V50 C46 46 52 40 52 32 C52 20 44 10 32 10 Z'
              stroke={primaryColor}
            />
            <path d='M26 56 H38 M28 60 H36' stroke={primaryColor} />
            <circle cx='26' cy='28' r='3' fill='#F59E0B' />
            <circle cx='38' cy='28' r='3' fill='#F59E0B' />
            <path d='M24 38 Q32 44 40 38' stroke='#F59E0B' />
          </svg>
        );
      case 5: // Hacker
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <rect
              x='10'
              y='14'
              width='44'
              height='30'
              rx='3'
              stroke={primaryColor}
            />
            <path d='M6 48 H58 L54 44 H10 Z' stroke={primaryColor} />
            <path
              d='M18 24 L26 30 L18 36 M30 36 H40'
              stroke='#F59E0B'
              strokeWidth='2.5'
            />
          </svg>
        );
      case 6: // Coordinator
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <circle
              cx='32'
              cy='32'
              r='22'
              stroke={primaryColor}
              strokeDasharray='4 4'
            />
            <circle cx='32' cy='14' r='5' fill='#F59E0B' />
            <circle cx='48' cy='40' r='5' fill='#F59E0B' />
            <circle cx='16' cy='40' r='5' fill='#F59E0B' />
            <path
              d='M32 19 L43 35 M43 42 L21 42 M19 35 L27 19'
              stroke={primaryColor}
              strokeWidth='1.5'
            />
          </svg>
        );
      case 7: // Jack
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <rect
              x='16'
              y='10'
              width='32'
              height='44'
              rx='4'
              stroke={primaryColor}
              fill='#18181B'
            />
            <text
              x='32'
              y='38'
              fontSize='26'
              textAnchor='middle'
              fill='#F59E0B'
              fontWeight='900'
              fontFamily='serif'
            >
              J
            </text>
            <path d='M20 18 L24 14 M44 46 L40 50' stroke='#F59E0B' />
          </svg>
        );
      case 8: // Math Whiz
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <rect
              x='12'
              y='12'
              width='40'
              height='40'
              rx='6'
              stroke={primaryColor}
            />
            <path d='M20 24 H30 M25 19 V29' stroke='#F59E0B' strokeWidth='2' />
            <path d='M34 24 H44' stroke='#F59E0B' strokeWidth='2' />
            <path d='M20 40 H30 M20 44 H30' stroke='#F59E0B' strokeWidth='2' />
            <path
              d='M36 36 L42 44 M42 36 L36 44'
              stroke='#F59E0B'
              strokeWidth='2'
            />
          </svg>
        );
      case 9: // Con Artist
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <path
              d='M16 20 C16 20 24 10 32 20 C40 30 48 20 48 20'
              stroke={primaryColor}
              strokeWidth='3'
            />
            <path
              d='M16 44 C16 44 24 34 32 44 C40 54 48 44 48 44'
              stroke='#F59E0B'
              strokeWidth='3'
            />
            <circle cx='22' cy='24' r='3' fill='#F59E0B' />
            <circle cx='42' cy='40' r='3' fill={primaryColor} />
          </svg>
        );
      case 10: // Muscle
        return (
          <svg
            className='w-16 h-16 stroke-current'
            viewBox='0 0 64 64'
            fill='none'
            strokeWidth='2'
          >
            <path
              d='M16 36 Q10 24 22 18 Q30 22 34 14 Q44 20 48 30 Q54 40 40 50 Q28 54 16 36 Z'
              stroke={primaryColor}
              fill={secondaryColor}
            />
            <circle cx='34' cy='28' r='4' fill='#F59E0B' />
          </svg>
        );
      default:
        return <Sparkles className='w-16 h-16 text-red-500' />;
    }
  }

  // Challenge SVGs (1-10)
  switch (number) {
    case 1: // Quick Access
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path
            d='M14 34 L30 18 L50 18 L50 46 L30 46 Z'
            stroke={primaryColor}
          />
          <circle cx='24' cy='32' r='3' fill={primaryColor} />
          <path d='M38 26 V38 M44 28 V36' stroke='#EF4444' strokeWidth='2' />
        </svg>
      );
    case 2: // Noise Sensors
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path
            d='M12 32 H20 L26 14 L34 50 L42 24 L48 32 H52'
            stroke={primaryColor}
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle cx='34' cy='50' r='3' fill='#EF4444' />
        </svg>
      );
    case 3: // Motion Detector
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <circle cx='32' cy='44' r='6' fill={primaryColor} />
          <path
            d='M18 30 A 20 20 0 0 1 46 30'
            stroke={primaryColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          <path
            d='M10 20 A 30 30 0 0 1 54 20'
            stroke='#EF4444'
            strokeWidth='2'
            strokeDasharray='3 3'
          />
        </svg>
      );
    case 4: // Retina Scan
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path
            d='M8 32 C16 18 48 18 56 32 C48 46 16 46 8 32 Z'
            stroke={primaryColor}
          />
          <circle cx='32' cy='32' r='10' stroke={primaryColor} fill='#18181B' />
          <circle cx='32' cy='32' r='4' fill='#EF4444' />
          <path
            d='M20 14 V20 M44 14 V20 M20 50 V44 M44 50 V44'
            stroke={primaryColor}
          />
        </svg>
      );
    case 5: // Hasty Getaway
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path
            d='M10 40 H44 M6 24 H34 M14 56 H50'
            stroke={primaryColor}
            strokeWidth='3'
            strokeLinecap='round'
          />
          <path
            d='M40 18 L54 32 L40 46'
            stroke='#EF4444'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 6: // Ventilation Shaft
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <rect
            x='12'
            y='12'
            width='40'
            height='40'
            rx='4'
            stroke={primaryColor}
          />
          <path
            d='M12 24 H52 M12 36 H52 M24 12 V52 M36 12 V52'
            stroke={primaryColor}
          />
          <circle cx='32' cy='32' r='6' fill='#EF4444' />
        </svg>
      );
    case 7: // Laser Tripwires
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <line
            x1='8'
            y1='16'
            x2='56'
            y2='48'
            stroke='#EF4444'
            strokeWidth='3'
          />
          <line
            x1='8'
            y1='48'
            x2='56'
            y2='16'
            stroke='#EF4444'
            strokeWidth='3'
          />
          <line
            x1='8'
            y1='32'
            x2='56'
            y2='32'
            stroke={primaryColor}
            strokeWidth='2'
            strokeDasharray='4 2'
          />
          <circle cx='8' cy='16' r='3' fill={primaryColor} />
          <circle cx='56' cy='48' r='3' fill={primaryColor} />
        </svg>
      );
    case 8: // Blackout
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path
            d='M26 10 L16 34 H32 L22 54 L48 26 H32 L40 10 Z'
            stroke={primaryColor}
            fill={secondaryColor}
          />
          <line
            x1='10'
            y1='10'
            x2='54'
            y2='54'
            stroke='#EF4444'
            strokeWidth='4'
          />
        </svg>
      );
    case 9: // Fingerprint Scan
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path d='M32 14 A 18 18 0 0 0 16 32 V46' stroke={primaryColor} />
          <path d='M32 22 A 10 10 0 0 0 24 32 V48' stroke={primaryColor} />
          <path
            d='M32 30 A 2 2 0 0 0 30 32 V44'
            stroke='#EF4444'
            strokeWidth='3'
          />
          <path d='M40 26 A 14 14 0 0 1 48 38 V48' stroke={primaryColor} />
        </svg>
      );
    case 10: // Security Cameras
      return (
        <svg
          className='w-16 h-16 stroke-current'
          viewBox='0 0 64 64'
          fill='none'
          strokeWidth='2'
        >
          <path d='M16 16 H36 L48 28 V40 H16 Z' stroke={primaryColor} />
          <circle cx='28' cy='28' r='6' stroke='#EF4444' strokeWidth='2' />
          <path d='M48 28 L58 20 V44 L48 36' stroke={primaryColor} />
          <circle cx='52' cy='18' r='2' fill='#EF4444' />
        </svg>
      );
    default:
      return <ShieldAlert className='w-16 h-16 text-amber-500' />;
  }
};

export default CardGraphic;
