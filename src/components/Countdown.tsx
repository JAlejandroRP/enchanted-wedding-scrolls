
import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  weddingDate: Date;
}

const Countdown = ({ weddingDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Si ya pasó la fecha
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-center font-playfair font-medium text-xl mb-4 text-white">Faltan</h3>
      <div className="flex justify-center space-x-8">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-playfair text-white">{timeLeft.days}</div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Días</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-playfair text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Horas</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-playfair text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Minutos</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-playfair text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Segundos</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
