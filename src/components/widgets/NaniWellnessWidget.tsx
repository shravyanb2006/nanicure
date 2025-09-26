import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Volume2 } from "lucide-react";

const wellnessCategories = [
  { id: 'stress', label: 'Stress & Anxiety', icon: '🧘' },
  { id: 'sleep', label: 'Sleep Issues', icon: '😴' },
  { id: 'confidence', label: 'Low Confidence', icon: '💪' },
  { id: 'anger', label: 'Anger Management', icon: '😌' },
  { id: 'loneliness', label: 'Loneliness', icon: '🤗' },
  { id: 'breathing', label: 'Breathing Exercises', icon: '🫁' },
  { id: 'womens-health', label: "Women's Health", icon: '🌺' },
  { id: 'stamina', label: 'Build Stamina', icon: '⚡' },
];

export function NaniWellnessWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const getWellnessAdvice = (category: string): string => {
    const advice_map: Record<string, string> = {
      'stress': `**Beta, stress kam karne ka Nani ka nuskha! 🧘**

**Immediate Relief:**
• **Deep breathing** - 4 counts in, hold 4, breathe out 6 counts
• **Tulsi tea** with honey - very calming
• **Head massage** with coconut oil before sleep

**Daily Practice:**
• **Morning meditation** - just 5 minutes daily
• **Gratitude journal** - write 3 good things daily
• **Light walk** in fresh air for 15 minutes
• **Early sleep** by 10 PM, early rise by 6 AM

**Nani's Special:**
• **Ashwagandha** with warm milk at night
• **Brahmi leaves** chew 2-3 fresh ones daily
• **Music therapy** - listen to soft classical music

**Remember Beta:** Stress is temporary, your strength is permanent! 🧡`,

      'sleep': `**Good sleep ke liye Nani ke proven tips! 😴**

**Before Bed Routine:**
• **Warm milk** with pinch of nutmeg and cardamom
• **Feet massage** with sesame oil
• **No phone** 1 hour before sleep

**Natural Sleep Aids:**
• **Chamomile tea** or **fennel seed water**
• **Lavender oil** few drops on pillow
• **Cool, dark room** with fresh air

**Nani's Sleep Powder:**
• Mix **poppy seeds + almonds + dates**
• Make powder, take 1 tsp with milk
• Works like magic for deep sleep!

**Sleep Position:**
• Sleep on **left side** for better digestion
• Use **comfortable pillow** - not too high
• Keep **consistent sleep time** daily

*Sweet dreams beta! Sound sleep = happy morning! 🌙*`,

      'confidence': `**Beta, confidence badhane ka Nani ka formula! 💪**

**Daily Power Habits:**
• **Morning affirmations** - "Main strong hun, main kar sakti hun"
• **Good posture** - chest out, shoulders back
• **Eye contact** practice in mirror daily

**Nani's Confidence Boosters:**
• **Small achievements** celebrate karo daily
• **Help others** - makes you feel valuable
• **Learn new things** - keeps mind sharp
• **Dress well** - feel good, look good!

**Ayurvedic Support:**
• **Brahmi juice** 1 tsp daily for mental clarity
• **Almonds soaked overnight** - brain food
• **Saffron milk** twice weekly for glow

**Body Language:**
• **Smile more** - releases happy hormones
• **Speak slowly** and clearly
• **Stand tall** like a confident queen

*You are precious beta! Believe in yourself! ✨*`,

      'anger': `**Anger control karne ka Nani ka peaceful way! 😌**

**Instant Cooling:**
• **Count to 10** slowly while deep breathing
• **Cold water** drink immediately
• **Step away** from situation for 5 minutes

**Nani's Cool-Down Remedies:**
• **Rose water** - drink or sprinkle on face
• **Mint leaves** chew fresh ones
• **Coconut water** - very cooling for body
• **Cucumber juice** with black salt

**Long-term Peace:**
• **Yoga** - especially child's pose
• **Meditation** 10 minutes daily
• **Forgiveness practice** - let go of grudges
• **Gratitude** - focus on good things

**Ayurvedic Herbs:**
• **Shankhpushpi** with water for mental peace
• **Jatamansi** powder with honey at night
• **Cool foods** - avoid too much spicy/oily

*Shanti se raho beta, anger temporary hai! 🙏*`,

      'loneliness': `**Loneliness door karne ke Nani ke warm tips! 🤗**

**Connect with Yourself:**
• **Self-care routine** - treat yourself kindly
• **Hobbies** - painting, reading, cooking
• **Nature time** - plants, birds, fresh air
• **Journal writing** - express your feelings

**Connect with Others:**
• **Video call** family/friends regularly
• **Help neighbors** - creates community
• **Join groups** - hobby clubs, yoga classes
• **Volunteer** - serving others heals heart

**Nani's Heart Healers:**
• **Music** - sing your favorite songs
• **Cooking** - make favorite dishes
• **Pets** - even plants can be companions
• **Prayer/meditation** - never truly alone

**Daily Practices:**
• **Morning gratitude** - appreciate what you have
• **Evening reflection** - acknowledge good moments
• **Reach out** - call someone daily

*Beta, you are loved! Nani is always with you! 💛*`,

      'breathing': `**Pranayam - Nani ke breathing exercises! 🫁**

**Basic Breathing (Anulom-Vilom):**
• Sit comfortably, spine straight
• **Right thumb** close right nostril
• **Breathe in** left nostril for 4 counts
• **Close both** nostrils, hold for 2 counts  
• **Release right** nostril, breathe out 4 counts
• Repeat 10 times, switch sides

**Cooling Breath (Sheetali):**
• **Curl tongue**, breathe in slowly
• **Close mouth**, hold briefly
• **Breathe out** through nose
• Perfect for anger, heat, stress

**Energizing Breath (Bhastrika):**
• **Deep, fast breathing** 10 times
• **Hold breath** for comfort
• **Slow exhale** through nose
• Increases energy and focus

**Evening Calm (4-7-8 Breathing):**
• **Breathe in** for 4 counts
• **Hold** for 7 counts  
• **Exhale** for 8 counts
• Perfect for sleep preparation

*Pranayam is life, beta! Practice daily! 🧘‍♀️*`,

      'womens-health': `**Women's health ke liye Nani ka special care! 🌺**

**Monthly Cycle Support:**
• **Saunf water** (fennel) - drink daily
• **Jaggery with ginger** - reduces cramps
• **Warm sesame oil massage** on lower abdomen
• **Iron-rich foods** - spinach, dates, pomegranate

**Hormonal Balance:**
• **Fenugreek seeds** soaked overnight, drink water
• **Turmeric milk** with black pepper
• **Regular exercise** - walking, yoga
• **Stress management** - very important!

**Skin & Hair Care:**
• **Rose water** toner daily
• **Coconut oil** massage twice weekly
• **Amla juice** for hair growth
• **Neem paste** for skin problems

**Energy & Vitality:**
• **Shatavari powder** with milk
• **Almonds + dates** daily morning
• **Moringa leaves** powder in water
• **Regular sleep** 7-8 hours essential

**Monthly Detox:**
• **Jeera-dhaniya water** first thing morning
• **Green vegetables** increase intake
• **Warm water** with lemon and honey

*Beta, take care of yourself first! You matter! 💖*`,

      'stamina': `**Stamina badhane ka Nani ka natural way! ⚡**

**Power Foods Daily:**
• **Almonds + dates** - 5 each morning
• **Banana with honey** - pre-workout energy
• **Beetroot juice** - increases oxygen
• **Pomegranate** - blood purifier

**Herbal Power Boosters:**
• **Ashwagandha** with milk before bed
• **Giloy juice** empty stomach
• **Amla juice** with honey daily
• **Ginger-honey tea** for circulation

**Exercise Routine:**
• **Surya Namaskar** - 5 rounds daily
• **Brisk walking** 30 minutes
• **Stair climbing** instead of lift
• **Deep breathing** exercises

**Lifestyle Changes:**
• **Early to bed** - by 10 PM
• **Early to rise** - by 6 AM  
• **Proper hydration** - 8-10 glasses water
• **Avoid junk food** - stick to home cooking

**Weekly Treats:**
• **Dry fruits laddu** homemade
• **Coconut water** with black pepper
• **Sesame seeds** with jaggery

*Slow and steady wins, beta! Build gradually! 🏃‍♀️*`
    };

    return advice_map[category] || '';
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const wellnessAdvice = getWellnessAdvice(categoryId);
    setAdvice(wellnessAdvice);
  };

  const speakAdvice = () => {
    if ('speechSynthesis' in window && advice) {
      const utterance = new SpeechSynthesisUtterance(advice.replace(/\*/g, '').replace(/•/g, ''));
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const renderAdvice = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={index} className="mb-2">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? <strong key={partIndex} className="text-primary">{part}</strong> : part
            )}
          </div>
        );
      }
      return <div key={index} className={line.startsWith('•') ? 'ml-4 mb-1 text-sm' : 'mb-1'}>{line}</div>;
    });
  };

  return (
    <Card className="widget-card h-96">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Nani Wellness
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Mental & physical wellness with grandmother's wisdom
        </p>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        {!selectedCategory ? (
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Choose an area where you need Nani's guidance:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {wellnessCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="p-2 h-auto text-left justify-start hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="text-xs">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-xs">
                {wellnessCategories.find(c => c.id === selectedCategory)?.label}
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => speakAdvice()} disabled={isPlaying}>
                  <Volume2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory('')}>
                  ← Back
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto text-sm">
              {renderAdvice(advice)}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}