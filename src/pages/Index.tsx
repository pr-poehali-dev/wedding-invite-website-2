import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  const weddingDate = new Date('2026-08-07T16:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-8">
            {[
              { id: 'home', label: 'Главная', icon: 'Heart' },
              { id: 'schedule', label: 'Программа', icon: 'Calendar' },
              { id: 'location', label: 'Место', icon: 'MapPin' },
              { id: 'gallery', label: 'Галерея', icon: 'Images' },
              { id: 'dresscode', label: 'Дресс-код', icon: 'Shirt' },
              { id: 'rsvp', label: 'RSVP', icon: 'Mail' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-rose-100 text-rose-600'
                    : 'hover:bg-purple-50 text-gray-600'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-4xl animate-fade-in">
          <div className="mb-8">
            <Icon name="HeartHandshake" size={64} className="mx-auto text-rose-400 mb-4" />
          </div>
          <h1 className="font-cormorant text-6xl md:text-8xl font-bold text-gray-800 mb-4">
            Лев & Яна
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-12">
            Приглашаем вас разделить с нами радость нашего торжества
          </p>
          <div className="text-xl text-rose-600 mb-8">
            7 августа 2026 · 16:00
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { value: timeLeft.days, label: 'дней' },
              { value: timeLeft.hours, label: 'часов' },
              { value: timeLeft.minutes, label: 'минут' },
              { value: timeLeft.seconds, label: 'секунд' }
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-white/60 backdrop-blur-sm border-rose-200 hover-scale">
                <div className="text-4xl font-bold text-rose-500 mb-2">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-white/60 backdrop-blur-sm border-purple-200 max-w-2xl mx-auto">
            <Icon name="Gift" size={32} className="mx-auto text-purple-400 mb-4" />
            <h3 className="font-cormorant text-2xl font-bold text-gray-800 mb-2">
              Список желаний
            </h3>
            <p className="text-gray-600">
              Ваше присутствие — лучший подарок! Но если вы хотите порадовать нас,
              мы будем благодарны за помощь в создании нашего семейного гнёздышка.
            </p>
          </Card>
        </div>
      </section>

      <section id="schedule" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center text-gray-800 mb-16">
            Программа торжества
          </h2>
          
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-pink-300"></div>
            
            {[
              { time: '13:45', title: 'ЗАГС', desc: 'Официальная церемония бракосочетания', icon: 'Heart' },
              { time: '16:00', title: 'Начало банкета', desc: 'Встреча гостей, фуршет и фотосессия', icon: 'Sparkles' },
              { time: '17:00', title: 'Праздничный ужин', desc: 'Первый танец и торжественный ужин', icon: 'Utensils' },
              { time: '19:00', title: 'Развлечения', desc: 'Конкурсы, танцы и веселье', icon: 'Music' },
              { time: '21:00', title: 'Торт', desc: 'Торжественное разрезание свадебного торта', icon: 'Cake' },
              { time: '23:00', title: 'Завершение', desc: 'Конец торжества', icon: 'Clock' }
            ].map((event, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                  <Card className="p-6 bg-white/70 backdrop-blur-sm border-rose-200 hover-scale">
                    <div className="text-rose-500 font-bold text-xl mb-2">{event.time}</div>
                    <h3 className="font-cormorant text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.desc}</p>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-rose-200 to-purple-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Icon name={event.icon} size={24} className="text-rose-600" />
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center text-gray-800 mb-16">
            Место проведения
          </h2>
          
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-purple-200 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Icon name="MapPin" size={32} className="text-purple-500 flex-shrink-0" />
              <div>
                <h3 className="font-cormorant text-3xl font-bold text-gray-800 mb-2">
                  Отель Гранд Холл
                </h3>
                <p className="text-gray-600 text-lg">
                  г. Екатеринбург
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-rose-100 rounded-lg p-8 mb-6">
              <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Map" size={64} className="mx-auto text-purple-400 mb-4" />
                  <p className="text-gray-600">Интерактивная карта</p>
                  <p className="text-sm text-gray-500">Яндекс.Карты или Google Maps</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Icon name="Car" size={24} className="text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">На автомобиле</h4>
                  <p className="text-sm text-gray-600">
                    Бесплатная парковка для гостей на территории отеля.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Icon name="Bus" size={24} className="text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Общественный транспорт</h4>
                  <p className="text-sm text-gray-600">
                    Удобное расположение в центре города
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-rose-100 to-purple-100 border-rose-200">
            <div className="flex items-center gap-3">
              <Icon name="Info" size={24} className="text-rose-600" />
              <p className="text-gray-700">
                <strong>Важно:</strong> Пожалуйста, подтвердите своё присутствие до 1 августа 2026
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section id="gallery" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center text-gray-800 mb-16">
            Наша история
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Первая встреча', desc: 'Весна 2023', gradient: 'from-rose-200 to-pink-200' },
              { title: 'Первое свидание', desc: 'Май 2023', gradient: 'from-purple-200 to-indigo-200' },
              { title: 'Помолвка', desc: 'Декабрь 2025', gradient: 'from-orange-200 to-rose-200' },
              { title: 'Наши путешествия', desc: '12 городов', gradient: 'from-pink-200 to-purple-200' },
              { title: 'Совместные мечты', desc: 'Бесконечность', gradient: 'from-indigo-200 to-purple-200' },
              { title: 'Наша свадьба', desc: '7 августа 2026', gradient: 'from-rose-200 to-orange-200' }
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-white/60 backdrop-blur-sm border-rose-200 hover-scale overflow-hidden group">
                <div className={`aspect-square bg-gradient-to-br ${item.gradient} rounded-lg mb-4 flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon name="Heart" size={48} className="text-white/80" />
                </div>
                <h3 className="font-cormorant text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-purple-100 to-rose-100 border-purple-200 text-center">
            <Icon name="Quote" size={32} className="mx-auto text-purple-400 mb-4" />
            <p className="font-cormorant text-2xl text-gray-800 italic mb-2">
              "Любовь — это когда два сердца бьются в унисон"
            </p>
            <p className="text-gray-600">Лев & Яна</p>
          </Card>
        </div>
      </section>

      <section id="dresscode" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center text-gray-800 mb-16">
            Дресс-код
          </h2>
          
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-purple-200 mb-8">
            <div className="text-center mb-8">
              <Icon name="Sparkles" size={48} className="mx-auto text-purple-400 mb-4" />
              <h3 className="font-cormorant text-3xl font-bold text-gray-800 mb-2">
                Элегантный вечерний
              </h3>
              <p className="text-gray-600 text-lg">
                Предпочтительная цветовая гамма: пастельные оттенки розового, лавандового, персикового
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="User" size={24} className="text-rose-500" />
                  <h4 className="font-bold text-xl text-gray-800">Для дам</h4>
                </div>
                <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-rose-500 flex-shrink-0 mt-1" />
                      <span>Вечерние платья или костюмы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-rose-500 flex-shrink-0 mt-1" />
                      <span>Лёгкие ткани: шифон, шёлк, кружево</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-rose-500 flex-shrink-0 mt-1" />
                      <span>Туфли на удобном каблуке</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="User" size={24} className="text-purple-500" />
                  <h4 className="font-bold text-xl text-gray-800">Для джентльменов</h4>
                </div>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-purple-500 flex-shrink-0 mt-1" />
                      <span>Костюм светлых оттенков</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-purple-500 flex-shrink-0 mt-1" />
                      <span>Рубашка (можно без галстука)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={18} className="text-purple-500 flex-shrink-0 mt-1" />
                      <span>Классические туфли</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-16 h-16 rounded-full bg-rose-200 border-2 border-rose-300 hover-scale"></div>
              <div className="w-16 h-16 rounded-full bg-pink-200 border-2 border-pink-300 hover-scale"></div>
              <div className="w-16 h-16 rounded-full bg-purple-200 border-2 border-purple-300 hover-scale"></div>
              <div className="w-16 h-16 rounded-full bg-indigo-200 border-2 border-indigo-300 hover-scale"></div>
              <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-200 hover-scale"></div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <Icon name="Sun" size={24} className="text-orange-500 flex-shrink-0" />
              <p className="text-gray-700">
                <strong>Совет:</strong> Мероприятие будет проходить на открытом воздухе.
                Захватите лёгкую накидку на случай прохладной погоды!
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section id="rsvp" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center text-gray-800 mb-8">
            Подтверждение присутствия
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Пожалуйста, сообщите нам о своём решении до 1 августа 2026
          </p>

          <Card className="p-8 bg-white/70 backdrop-blur-sm border-purple-200">
            {rsvpSubmitted ? (
              <div className="text-center py-12 animate-scale-in">
                <Icon name="CheckCircle" size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="font-cormorant text-3xl font-bold text-gray-800 mb-2">
                  Спасибо!
                </h3>
                <p className="text-gray-600">
                  Ваш ответ получен. Ждём вас на нашем празднике!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя и фамилия
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Планируете присутствовать?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('yes')}
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        rsvpAttending === 'yes'
                          ? 'border-rose-400 bg-rose-50 text-rose-700'
                          : 'border-gray-200 hover:border-rose-200'
                      }`}
                    >
                      <Icon name="Check" size={20} className="inline mr-2" />
                      Да, буду
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('no')}
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        rsvpAttending === 'no'
                          ? 'border-purple-400 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <Icon name="X" size={20} className="inline mr-2" />
                      Не смогу
                    </button>
                  </div>
                </div>

                {rsvpAttending === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Количество гостей
                    </label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    >
                      <option value="1">1 человек</option>
                      <option value="2">2 человека</option>
                      <option value="3">3 человека</option>
                      <option value="4">4 человека</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-4 rounded-lg font-semibold hover:from-rose-500 hover:to-purple-500 transition-all hover-scale flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={20} />
                  Отправить ответ
                </button>
              </form>
            )}
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Если у вас возникли вопросы, свяжитесь с нами
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-rose-100 via-purple-100 to-pink-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Icon name="Heart" size={48} className="mx-auto text-rose-400 mb-4" />
          <p className="font-cormorant text-2xl text-gray-700 mb-2">
            С любовью, Лев и Яна
          </p>
          <p className="text-gray-600">
            Ждём вас на нашем празднике!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;