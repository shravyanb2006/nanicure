import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Volume2 } from "lucide-react";

const fitnessCategories = [
  { id: 'yoga', label: 'Yoga Asanas', icon: '🧘‍♀️' },
  { id: 'fat-loss', label: 'Fat Loss', icon: '🔥' },
  { id: 'posture', label: 'Better Posture', icon: '📏' },
  { id: 'strength', label: 'Build Strength', icon: '💪' },
  { id: 'flexibility', label: 'Flexibility', icon: '🤸‍♀️' },
  { id: 'morning-routine', label: 'Morning Routine', icon: '🌅' },
  { id: 'cardio', label: 'Heart Health', icon: '❤️' },
  { id: 'balance', label: 'Balance & Focus', icon: '⚖️' },
];

export function NaniFitnessWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [exercises, setExercises] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const getFitnessGuide = (category: string): string => {
    const exercise_map: Record<string, string> = {
      'yoga': `**Nani ke favorite Yoga Asanas! 🧘‍♀️**

**Morning Energizers:**
• **Surya Namaskar** (Sun Salutation)
  - 5 rounds to start, build to 12
  - Best done facing east at sunrise
  - Complete body workout in one sequence

• **Tadasana** (Mountain Pose)
  - Stand tall, feet together, arms by sides
  - Hold 30 seconds, breathe deeply
  - Improves posture and balance

• **Vrikshasana** (Tree Pose)
  - Balance on one foot, other on inner thigh
  - Hands in prayer position
  - Hold 15-30 seconds each side

**Digestion & Flexibility:**
• **Balasana** (Child's Pose)
  - Kneel, sit back on heels, arms forward
  - Rest forehead on ground
  - Perfect for stress relief

• **Bhujangasana** (Cobra Pose)
  - Lie face down, lift chest using arms
  - Strengthens back, opens chest
  - Hold 15-30 seconds

• **Paschimottanasana** (Forward Bend)
  - Sit legs extended, reach for toes
  - Improves digestion and flexibility
  - Hold 30 seconds, breathe deeply

*Start slow beta, consistency matters more than perfection! 🙏*`,

      'fat-loss': `**Fat loss ke liye Nani ka natural plan! 🔥**

**Daily Movement Plan:**
• **Morning Walk** - 30 minutes brisk pace
  - Empty stomach for best results
  - Add arm swings and deep breathing
  - Gradually increase speed

• **Stairs Climbing** - 10 minutes daily
  - Use stairs instead of lifts
  - 2 steps at a time for extra burn
  - Great for leg strength

• **Spot Exercises** (3 sets each):
  - **Squats** - 10-15 reps
  - **Push-ups** (wall/knee) - 5-10 reps  
  - **Plank** - 15-30 seconds
  - **Jumping jacks** - 20 reps

**Nani's Kitchen Cardio:**
• **Dancing** while cooking - 15 minutes
• **Cleaning** with extra energy
• **Gardening** - squatting, bending
• **Playing with kids** - best workout!

**Fat Burning Foods:**
• **Green tea** with lemon - 3 cups daily
• **Jeera water** first thing morning
• **Triphala** at night with warm water
• **Coconut oil** for cooking - burns belly fat

**Weekly Challenge:**
• **Day 1-2:** Walking + Light stretches
• **Day 3-4:** Add spot exercises
• **Day 5-6:** Increase intensity
• **Day 7:** Rest or gentle yoga

*Slow and steady beta! Small changes = big results! 🌟*`,

      'posture': `**Perfect posture ke liye Nani ke exercises! 📏**

**Wall Angel Exercise:**
• **Stand** against wall, back flat
• **Arms** in W shape against wall
• **Slide up and down** 10 times
• **Do 3 sets** twice daily

**Neck & Shoulder Relief:**
• **Neck rolls** - 5 each direction
• **Shoulder blade squeezes** - 10 reps
• **Cat-cow stretches** on hands and knees
• **Door frame chest stretch** - 30 seconds

**Core Strengthening:**
• **Dead bug** exercise - lie down, opposite arm/leg
• **Bird dog** - on hands/knees, extend opposite limbs
• **Modified plank** - start with 15 seconds
• **Pelvic tilts** - lying down or standing

**Daily Habits:**
• **Pillow** support for lower back when sitting
• **Screen** at eye level, no neck bending
• **Frequent breaks** - stand every 30 minutes
• **Sleep posture** - pillow between knees

**Yoga Poses for Posture:**
• **Bhujangasana** (Cobra) - strengthens back
• **Gomukhasana** (Cow face) - opens shoulders  
• **Marjaryasana** (Cat-cow) - spinal flexibility
• **Setu Bandhasana** (Bridge) - hip flexors

**Nani's Reminder Tips:**
• Set phone **reminder** every hour
• **Imagine** string pulling head up
• **Breathe deeply** - opens chest naturally
• **Mirror check** - correct yourself kindly

*Good posture = confidence + health! Practice daily beta! 💃*`,

      'strength': `**Strength building ka Nani ka safe method! 💪**

**Bodyweight Strength Training:**
• **Squats** - Start 5, build to 20
  - Keep knees behind toes
  - Go as low as comfortable
  - Use chair for support initially

• **Wall Push-ups** - Start 5, build to 15
  - Stand arm's length from wall
  - Push against wall, lean in/out
  - Progress to incline, then floor

• **Modified Lunges** - 5 each leg
  - Hold chair for balance
  - Step forward, lower back knee
  - Alternate legs, build endurance

**Functional Strength:**
• **Carrying groceries** - use both arms equally
• **Lifting things** - squat down, straight back
• **Climbing stairs** - use leg muscles, not just momentum
• **Garden work** - digging, weeding builds strength

**Resistance with Household Items:**
• **Water bottles** as weights - start 500ml
• **Towel stretches** - pull and resist
• **Rice bags** for lifting exercises
• **Resistance band** - cheap and effective

**Progressive Plan:**
• **Week 1-2:** Learn form, light reps
• **Week 3-4:** Add 2-3 more reps
• **Week 5-6:** Increase difficulty/weight
• **Week 7-8:** Add new exercises

**Recovery & Nutrition:**
• **Protein** - dal, paneer, eggs, almonds
• **Rest days** - alternate muscle groups
• **Stretching** after each session
• **Sleep** - 7-8 hours for muscle recovery

*Beta, muscles grow during rest! Don't overdo it! 🏋️‍♀️*`,

      'flexibility': `**Flexibility badhane ke Nani ke gentle stretches! 🤸‍♀️**

**Morning Flexibility Routine:**
• **Neck stretches** - side to side, up/down
• **Shoulder rolls** - forward and backward
• **Arm circles** - small to big
• **Gentle spinal twist** - sitting or standing

**Hip Opening Sequence:**
• **Butterfly pose** - soles together, gently press knees
• **Hip circles** - standing, hands on hips
• **Pigeon prep** - one leg forward, lean into stretch
• **Figure-4 stretch** - ankle on opposite knee

**Leg Flexibility:**
• **Calf stretch** - against wall or step
• **Hamstring stretch** - leg on chair, reach forward
• **Quad stretch** - hold ankle behind you
• **IT band stretch** - cross legs, lean sideways

**Back & Spine Mobility:**
• **Cat-cow stretches** - on hands and knees
• **Child's pose** - knees wide, arms forward
• **Spinal twist** - sitting, rotate gently
• **Knee to chest** - lying down, hug knees

**Evening Wind-down Stretches:**
• **Legs up the wall** - 5-10 minutes
• **Gentle neck release** - ear to shoulder
• **Seated forward fold** - reach for toes gently
• **Happy baby pose** - lying down, hold feet

**Daily Habits:**
• **Stretch while watching TV** - gentle movements
• **Morning bed stretches** - before getting up
• **Work breaks** - neck and shoulder releases
• **Walking** with arm swings and leg kicks

*Never force stretches beta! Gentle and consistent wins! 🌸*`,

      'morning-routine': `**Perfect morning routine for healthy day! 🌅**

**Wake Up Sequence (5-6 AM):**
• **Gentle stretching** in bed - 2 minutes
• **Warm water** with lemon and honey
• **Gratitude** - think 3 things you're thankful for
• **Fresh air** - open windows, deep breaths

**Energy Activation (15 minutes):**
• **Surya Namaskar** - 3-5 rounds
• **Pranayam** - Anulom Vilom 5 minutes
• **Spot jogging** or **walking** - 5 minutes
• **Cold face wash** - activates circulation

**Strength Building (10 minutes):**
• **Squats** - 10 reps
• **Wall push-ups** - 8 reps  
• **Standing marches** - 20 steps
• **Arm circles** - 10 each direction

**Mindfulness (5 minutes):**
• **Meditation** or quiet sitting
• **Positive affirmations** - "I am strong, healthy, happy"
• **Day planning** - 3 main goals
• **Smile practice** - releases endorphins

**Breakfast Prep Movement:**
• **Dance** while making tea/coffee
• **Calf raises** while waiting for food
• **Gentle stretches** during cooking
• **Deep breathing** while eating

**Weekly Variation:**
• **Monday/Wednesday/Friday** - Strength focus
• **Tuesday/Thursday** - Flexibility focus  
• **Saturday** - Longer walk or yoga
• **Sunday** - Gentle movements, rest day

*Morning routine sets tone for whole day beta! Start tomorrow! ☀️*`,

      'cardio': `**Heart health ke liye Nani ka cardio plan! ❤️**

**Low Impact Cardio (Beginners):**
• **Brisk walking** - 20-30 minutes daily
  - Swing arms naturally
  - Breathe through nose when possible
  - Gradually increase pace

• **Stair climbing** - 5-10 minutes
  - One step at a time initially
  - Use railing for support
  - Rest when needed

• **Dancing** - 15-20 minutes
  - Put on favorite music
  - Move freely, have fun
  - Great for coordination too

**Moderate Intensity:**
• **Marching in place** - 10 minutes
  - Lift knees higher for challenge
  - Add arm movements
  - Perfect for rainy days

• **Chair exercises** - 15 minutes
  - Seated leg lifts
  - Arm pumps while walking
  - Stand-sit repetitions

• **Garden cardio** - 20-30 minutes
  - Digging, raking, weeding
  - Continuous movement
  - Fresh air bonus!

**Heart Rate Monitoring:**
• **Talk test** - should be able to have conversation
• **Breathe comfortably** - not gasping
• **Listen to body** - stop if dizzy/chest pain
• **Start slow** - build gradually

**Daily Integration:**
• **Take stairs** instead of elevator
• **Park farther** and walk
• **Play with grandchildren** actively
• **House cleaning** with energy

**Heart Healthy Habits:**
• **Deep breathing** exercises daily
• **Laugh often** - best cardio for heart!
• **Stay hydrated** - 8-10 glasses water
• **Manage stress** - meditation, music

*Happy heart = long life beta! Move with joy! 💖*`,

      'balance': `**Balance aur focus improve karne ke exercises! ⚖️**

**Basic Balance Training:**
• **Single leg stand** - 15-30 seconds each
  - Hold chair/wall for support initially
  - Progress to eyes closed
  - Do while brushing teeth

• **Heel-to-toe walking** - 10 steps
  - Walk in straight line
  - One foot directly in front of other
  - Arms out for balance

• **Tree pose** (Vrikshasana)
  - Stand on one leg, other foot on inner thigh
  - Hands in prayer position
  - Focus on fixed point ahead

**Dynamic Balance Challenges:**
• **Step-ups** on sturdy step - 10 each leg
• **Side leg lifts** - 10 each side
• **Backward walking** - slowly and carefully
• **Figure-8 walking** - creates coordination

**Mind-Body Balance:**
• **Tai Chi movements** - slow, flowing
• **Yoga poses** with holds
• **Meditation while standing** - 2-3 minutes
• **Breathing while balancing** - don't hold breath

**Focus Enhancement:**
• **Gaze training** - fix eyes on one point
• **Counting backwards** while balancing
• **Alphabet recitation** during exercises
• **Color identification** in room while on one foot

**Safety Measures:**
• **Always have support** nearby initially
• **Clear floor area** of obstacles
• **Wear non-slip shoes** or barefoot
• **Practice near wall** or sturdy furniture

**Daily Practice:**
• **Morning balance check** - 30 seconds each leg
• **Kitchen balance** - one leg while cooking
• **TV time balance** - commercial break exercises
• **Evening wind-down** - gentle balance poses

*Balance prevents falls beta! Practice little but daily! 🎯*`
    };

    return exercise_map[category] || '';
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const fitnessGuide = getFitnessGuide(categoryId);
    setExercises(fitnessGuide);
  };

  const speakExercises = () => {
    if ('speechSynthesis' in window && exercises) {
      const utterance = new SpeechSynthesisUtterance(exercises.replace(/\*/g, '').replace(/•/g, ''));
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const renderExercises = (text: string) => {
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
          <Dumbbell className="h-5 w-5 text-primary" />
          Nani Fitness & Yoga
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Home-friendly exercises and yoga for all fitness levels
        </p>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        {!selectedCategory ? (
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              Choose your fitness goal for personalized guidance:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {fitnessCategories.map((category) => (
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
                {fitnessCategories.find(c => c.id === selectedCategory)?.label}
              </Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => speakExercises()} disabled={isPlaying}>
                  <Volume2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory('')}>
                  ← Back
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto text-sm">
              {renderExercises(exercises)}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}