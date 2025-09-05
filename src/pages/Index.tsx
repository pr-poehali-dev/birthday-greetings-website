import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState<Array<{id: number, left: number, delay: number, wish: string}>>([]);
  const [clickedCards, setClickedCards] = useState<Set<number>>(new Set());
  const [showWish, setShowWish] = useState<{show: boolean, text: string, x: number, y: number}>({show: false, text: '', x: 0, y: 0});

  // Генерация падающих сердечек
  useEffect(() => {
    const generateHeart = () => {
      const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        wish: randomWish
      };
      setHearts(prev => [...prev, newHeart]);
      
      // Удаляем старые сердечки
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 3000);
    };

    const interval = setInterval(generateHeart, 800);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index: number) => {
    setClickedCards(prev => new Set(prev).add(index));
    setTimeout(() => {
      setClickedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 600);
  };
  const photos = [
    {
      src: "img/e8497420-d72e-4443-bc9f-5b392863259f.jpg",
      alt: "Романтичная прогулка вдвоем"
    },
    {
      src: "img/f87234ab-2025-4542-a204-88913efccd78.jpg", 
      alt: "Букет любимых цветов"
    },
    {
      src: "img/d10092ff-3a48-424c-8977-a49a3bae419b.jpg",
      alt: "Воздушные шары в честь праздника"
    }
  ];

  const wishes = [
    "Пусть каждый день приносит тебе радость и вдохновение",
    "Желаю, чтобы все твои мечты сбывались легко и красиво", 
    "Пусть любовь окружает тебя везде и всегда",
    "Счастья тебе безграничного, моя дорогая",
    "Ты самая красивая и удивительная!",
    "Пусть удача следует за тобой по пятам",
    "Твоя улыбка освещает весь мир",
    "С тобой каждый день как праздник",
    "Ты заслуживаешь только самого лучшего",
    "Пусть все твои желания исполнятся"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-cream via-romantic-peach to-romantic-lavender relative overflow-hidden">
      {/* Падающие сердечки */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl text-primary animate-fall cursor-pointer hover:scale-125 transition-transform z-10"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`
          }}
          onClick={(e) => {
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            setShowWish({
              show: true,
              text: heart.wish,
              x: rect.left + rect.width / 2,
              y: rect.top
            });
            // Удаляем сердечко при клике
            setHearts(prev => prev.filter(h => h.id !== heart.id));
            
            setTimeout(() => {
              setShowWish(prev => ({...prev, show: false}));
            }, 3000);
          }}
        >
          💖
        </div>
      ))}

      {/* Всплывающее пожелание */}
      {showWish.show && (
        <div
          className="fixed z-50 pointer-events-none animate-fade-in"
          style={{
            left: `${showWish.x}px`,
            top: `${showWish.y - 100}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-romantic-pink/30 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={16} className="text-primary animate-wiggle" />
              <span className="font-script text-sm text-primary font-medium">Пожелание для тебя</span>
            </div>
            <p className="font-sans text-sm text-foreground/90 leading-relaxed">
              {showWish.text}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white/95 backdrop-blur-sm border-b border-r border-romantic-pink/30 transform rotate-45"></div>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 animate-float">
            <Icon name="Heart" size={64} className="text-primary mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer" />
          </div>
          
          <h1 className="font-script text-6xl md:text-8xl text-primary mb-6 animate-pulse-soft hover:animate-wiggle cursor-default">
            С Днем Рождения!
          </h1>
          
          <div className="font-sans text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            <p className="mb-4 hover:scale-105 transition-transform cursor-default">Моя самая дорогая и любимая,</p>
            <p className="mb-4 hover:scale-105 transition-transform cursor-default">сегодня особенный день — твой день!</p>
            <p className="hover:scale-105 transition-transform cursor-default">Желаю тебе всего самого прекрасного в этом мире ✨</p>
          </div>

          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              // Генерируем взрыв сердечек при клике
              for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                  setHearts(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    left: 45 + Math.random() * 10,
                    delay: i * 0.1
                  }]);
                }, i * 100);
              }
            }}
          >
            Посмотреть наши моменты
            <Icon name="ChevronDown" size={20} className="ml-2 animate-bounce-soft" />
          </Button>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-script text-4xl md:text-5xl text-center text-primary mb-4 hover:animate-wiggle cursor-default">
            Наши прекрасные моменты
          </h2>
          <p className="text-center text-foreground/70 font-sans text-lg mb-12">
            Каждая фотография — это частичка нашего счастья
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 hover:scale-110 bg-white/80 backdrop-blur-sm border-romantic-pink/20 cursor-pointer ${
                  clickedCards.has(index) ? 'animate-bounce-soft scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleCardClick(index)}
              >
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-romantic-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-center font-sans text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                    {photo.alt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-script text-4xl md:text-5xl text-primary mb-12 hover:animate-wiggle cursor-default">
            Мои пожелания для тебя
          </h2>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-romantic-pink/20">
              <Icon name="MousePointer2" size={20} className="text-primary animate-wiggle" />
              <span className="font-sans text-lg text-foreground/80">
                Ловите падающие сердечки, чтобы прочитать пожелания! 💖
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.slice(0, 4).map((wish, index) => (
              <Card 
                key={index}
                className={`p-6 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 hover:scale-105 border-romantic-pink/20 cursor-pointer group opacity-50 hover:opacity-100 ${
                  clickedCards.has(index + 10) ? 'animate-bounce-soft' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(index + 10)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-4">
                    <Icon name="Lock" size={24} className="text-primary/50 group-hover:animate-wiggle" />
                  </div>
                  <p className="font-sans text-lg text-foreground/50 leading-relaxed group-hover:text-foreground/70 transition-colors text-center">
                    Поймайте сердечко, чтобы разблокировать пожелание
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-romantic-pink/20 hover:bg-white/60 transition-all duration-300 group cursor-pointer"
               onClick={() => {
                 // Взрыв сердечек при клике на финальное послание
                 for(let i = 0; i < 10; i++) {
                   setTimeout(() => {
                     setHearts(prev => [...prev, {
                       id: Date.now() + Math.random(),
                       left: 30 + Math.random() * 40,
                       delay: i * 0.05
                     }]);
                   }, i * 50);
                 }
               }}>
            <Icon name="Heart" size={48} className="text-primary mx-auto mb-4 animate-pulse-soft group-hover:animate-bounce-soft" />
            <p className="font-script text-3xl text-primary mb-4 group-hover:animate-wiggle">
              Я люблю тебя!
            </p>
            <p className="font-sans text-lg text-foreground/80 group-hover:text-foreground transition-colors">
              Спасибо за то, что ты есть в моей жизни. 
              Пусть этот год принесет тебе массу счастья и исполнения желаний! 💕
            </p>
          </div>
        </div>
      </section>

      {/* Музыкальный плеер */}
      <div className="fixed bottom-6 left-6 z-30">
        <Card className="p-4 bg-white/90 backdrop-blur-sm border-romantic-pink/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-0 flex items-center gap-3">
            <Button
              size="sm"
              variant={isPlaying ? "default" : "outline"}
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:scale-110 active:scale-95 transition-transform"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} className={isPlaying ? "animate-pulse-soft" : ""} />
            </Button>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-medium text-foreground">
                Romantic Music
              </span>
              <span className="font-sans text-xs text-foreground/60">
                {isPlaying ? "Сейчас играет..." : "Включить музыку"}
              </span>
            </div>
            <Icon name="Music" size={16} className={`text-primary ${isPlaying ? 'animate-bounce-soft' : ''}`} />
          </CardContent>
        </Card>
      </div>

      {/* Подсказка о взаимодействии */}
      <div className="fixed bottom-6 right-6 z-30">
        <Card className="p-3 bg-white/80 backdrop-blur-sm border-romantic-pink/20 hover:bg-white/90 transition-all duration-300 animate-bounce-soft">
          <CardContent className="p-0 flex items-center gap-2">
            <Icon name="Heart" size={16} className="text-primary animate-pulse-soft" />
            <span className="font-sans text-sm text-foreground/70">
              Ловите сердечки! 💖
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;