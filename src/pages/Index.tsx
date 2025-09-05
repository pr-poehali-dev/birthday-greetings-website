import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
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
    "Счастья тебе безграничного, моя дорогая"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-cream via-romantic-peach to-romantic-lavender">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 animate-float">
            <Icon name="Heart" size={64} className="text-primary mx-auto mb-4" />
          </div>
          
          <h1 className="font-script text-6xl md:text-8xl text-primary mb-6 animate-pulse-soft">
            С Днем Рождения!
          </h1>
          
          <div className="font-sans text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            <p className="mb-4">Моя самая дорогая и любимая,</p>
            <p className="mb-4">сегодня особенный день — твой день!</p>
            <p>Желаю тебе всего самого прекрасного в этом мире ✨</p>
          </div>

          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Посмотреть наши моменты
            <Icon name="ChevronDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-script text-4xl md:text-5xl text-center text-primary mb-4">
            Наши прекрасные моменты
          </h2>
          <p className="text-center text-foreground/70 font-sans text-lg mb-12">
            Каждая фотография — это частичка нашего счастья
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-romantic-pink/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center font-sans text-sm text-foreground/70">
                    {photo.alt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-script text-4xl md:text-5xl text-primary mb-12">
            Мои пожелания для тебя
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.map((wish, index) => (
              <Card 
                key={index}
                className="p-6 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 border-romantic-pink/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-4">
                    <Icon name="Sparkles" size={24} className="text-primary" />
                  </div>
                  <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                    {wish}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-romantic-pink/20">
            <Icon name="Heart" size={48} className="text-primary mx-auto mb-4 animate-pulse-soft" />
            <p className="font-script text-3xl text-primary mb-4">
              Я люблю тебя!
            </p>
            <p className="font-sans text-lg text-foreground/80">
              Спасибо за то, что ты есть в моей жизни. 
              Пусть этот год принесет тебе массу счастья и исполнения желаний! 💕
            </p>
          </div>
        </div>
      </section>

      {/* Background Music Note */}
      <div className="fixed bottom-6 right-6">
        <Card className="p-3 bg-white/80 backdrop-blur-sm border-romantic-pink/20">
          <CardContent className="p-0 flex items-center gap-2">
            <Icon name="Music" size={16} className="text-primary animate-pulse-soft" />
            <span className="font-sans text-sm text-foreground/70">
              Включите музыку ♪
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;