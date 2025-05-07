import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock } from 'lucide-react';

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
  const [isWeddingDay, setIsWeddingDay] = useState(false);
  const [animate, setAnimate] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  const prevTimeLeftRef = useRef<TimeLeft>(timeLeft);

  // Reset animation state after it completes
  useEffect(() => {
    if (Object.values(animate).some(value => value)) {
      const timer = setTimeout(() => {
        setAnimate({
          days: false,
          hours: false,
          minutes: false,
          seconds: false
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };

        // Trigger animation for changed values
        setAnimate({
          days: newTimeLeft.days !== prevTimeLeftRef.current.days,
          hours: newTimeLeft.hours !== prevTimeLeftRef.current.hours,
          minutes: newTimeLeft.minutes !== prevTimeLeftRef.current.minutes,
          seconds: newTimeLeft.seconds !== prevTimeLeftRef.current.seconds
        });

        prevTimeLeftRef.current = newTimeLeft;
        setTimeLeft(newTimeLeft);
        setIsWeddingDay(false);
      } else {
        // Si ya pasó la fecha
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        setIsWeddingDay(true);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (isWeddingDay) {
    return (
      <div className="w-full max-w-lg mx-auto text-center">
        <div className="inline-flex items-center mb-2">
          <Calendar className="mr-2" size={28} stroke="white" />
          <h3 className="font-playfair font-bold text-3xl md:text-4xl text-white">
            ¡Hoy es el gran día!
          </h3>
        </div>
        <p className="text-white/90 text-lg">
          Gracias por ser parte de nuestra celebración
        </p>
      </div>
    );
  }

  const numberStyle = (isAnimating: boolean) => `
    text-3xl md:text-5xl font-playfair text-white
    transition-all duration-500 ease-in-out
    ${isAnimating ? 'animate-pulse scale-150 text-yellow-50 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]' : 'scale-100'}
  `;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Clock className="mr-2" size={24} stroke="white" />
        <h3 className="text-center font-playfair font-medium text-3xl text-white">Faltan</h3>
      </div>
      <div className="flex justify-center space-x-8">
        <div className="text-center">
          <div className={numberStyle(animate.days)}>
            {timeLeft.days}
          </div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Días</div>
        </div>
        <div className="text-center">
          <div className={numberStyle(animate.hours)}>
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Horas</div>
        </div>
        <div className="text-center">
          <div className={numberStyle(animate.minutes)}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Minutos</div>
        </div>
        <div className="text-center">
          <div className={numberStyle(animate.seconds)}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-wide text-white/80 mt-1">Segundos</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
