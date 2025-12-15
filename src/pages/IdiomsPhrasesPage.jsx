import { MessageSquare, Puzzle, Eye } from 'lucide-react';
import { useState } from 'react';

const IdiomsPhrasesPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const idioms = [
            {
                idiom: "Break the ice",
                meaning: "To initiate a conversation in a social setting",
                example: "He told a joke to break the ice at the meeting.",
                category: "Social"
            },
            {
                idiom: "Bite the bullet",
                meaning: "To endure a painful or difficult situation bravely",
                example: "I had to bite the bullet and tell him the truth.",
                category: "Courage"
            },
            {
                idiom: "Hit the nail on the head",
                meaning: "To describe exactly what is causing a situation or problem",
                example: "Your analysis really hit the nail on the head.",
                category: "Accuracy"
            },
            {
                idiom: "Piece of cake",
                meaning: "Something very easy to do",
                example: "The exam was a piece of cake for her.",
                category: "Difficulty"
            },
            {
                idiom: "Once in a blue moon",
                meaning: "Something that happens very rarely",
                example: "I visit my hometown once in a blue moon.",
                category: "Frequency"
            },
            {
                idiom: "Under the weather",
                meaning: "Feeling ill or unwell",
                example: "She stayed home because she was under the weather.",
                category: "Health"
            },
            {
                idiom: "Spill the beans",
                meaning: "To reveal a secret",
                example: "He spilled the beans about the surprise party.",
                category: "Secrets"
            },
            {
                idiom: "Cost an arm and a leg",
                meaning: "To be very expensive",
                example: "That new phone cost an arm and a leg.",
                category: "Money"
            },
            {
                idiom: "The ball is in your court",
                meaning: "It is your turn to take action",
                example: "I’ve done my part, now the ball is in your court.",
                category: "Responsibility"
            },
            {
                idiom: "Burn the midnight oil",
                meaning: "To work late into the night",
                example: "She burned the midnight oil to finish the project.",
                category: "Work"
            },
            {
                idiom: "Let the cat out of the bag",
                meaning: "To reveal a secret accidentally",
                example: "He let the cat out of the bag about the promotion.",
                category: "Secrets"
            },
            {
                idiom: "On the same page",
                meaning: "To agree or have the same understanding",
                example: "Let’s make sure we’re on the same page.",
                category: "Agreement"
            },
            {
                idiom: "Pull someone’s leg",
                meaning: "To joke or tease someone",
                example: "I was just pulling your leg.",
                category: "Humor"
            },
            {
                idiom: "Back to the drawing board",
                meaning: "To start again after a failure",
                example: "The plan failed, so it’s back to the drawing board.",
                category: "Problem Solving"
            },
            {
                idiom: "A blessing in disguise",
                meaning: "Something good that comes from a bad situation",
                example: "Losing that job was a blessing in disguise.",
                category: "Life"
            },
            {
                idiom: "Beat around the bush",
                meaning: "To avoid getting to the point",
                example: "Stop beating around the bush and tell me the truth.",
                category: "Communication"
            },
            {
                idiom: "Call it a day",
                meaning: "To stop working for the day",
                example: "Let’s call it a day and continue tomorrow.",
                category: "Work"
            },
            {
                idiom: "Cut corners",
                meaning: "To do something cheaply or poorly",
                example: "They cut corners to save money.",
                category: "Quality"
            },
            {
                idiom: "In hot water",
                meaning: "In trouble",
                example: "He’s in hot water for missing the deadline.",
                category: "Trouble"
            },
            {
                idiom: "Jump on the bandwagon",
                meaning: "To join something because it is popular",
                example: "Many people jumped on the bandwagon.",
                category: "Trends"
            },
            {
                idiom: "Kill two birds with one stone",
                meaning: "To accomplish two tasks with one action",
                example: "I killed two birds with one stone by shopping on the way home.",
                category: "Efficiency"
            },
            {
                idiom: "Miss the boat",
                meaning: "To miss an opportunity",
                example: "He missed the boat by not applying earlier.",
                category: "Opportunity"
            },
            {
                idiom: "On thin ice",
                meaning: "In a risky or dangerous situation",
                example: "You’re on thin ice with the boss.",
                category: "Risk"
            },
            {
                idiom: "Out of the blue",
                meaning: "Suddenly and unexpectedly",
                example: "She called me out of the blue.",
                category: "Surprise"
            },
            {
                idiom: "Raise the bar",
                meaning: "To set a higher standard",
                example: "The new policy raised the bar.",
                category: "Standards"
            },
            {
                idiom: "Speak of the devil",
                meaning: "The person you were talking about appears",
                example: "Speak of the devil, here he comes!",
                category: "Coincidence"
            },
            {
                idiom: "Take it with a grain of salt",
                meaning: "To not take something too seriously",
                example: "Take his advice with a grain of salt.",
                category: "Judgment"
            },
            {
                idiom: "Throw in the towel",
                meaning: "To give up",
                example: "He threw in the towel after many attempts.",
                category: "Persistence"
            },
            {
                idiom: "Up in the air",
                meaning: "Not decided yet",
                example: "Our vacation plans are still up in the air.",
                category: "Uncertainty"
            },
            {
                idiom: "Walk on eggshells",
                meaning: "To act very carefully",
                example: "I’m walking on eggshells around her.",
                category: "Behavior"
            },
            {
                idiom: "At the drop of a hat",
                meaning: "Immediately and without hesitation",
                example: "She would help you at the drop of a hat.",
                category: "Speed"
            },
            {
                idiom: "Bark up the wrong tree",
                meaning: "To make a wrong assumption",
                example: "You’re barking up the wrong tree if you think I broke it.",
                category: "Mistakes"
            },
            {
                idiom: "Bend over backwards",
                meaning: "To make a great effort to help",
                example: "He bent over backwards to support his team.",
                category: "Effort"
            },
            {
                idiom: "By the skin of your teeth",
                meaning: "To barely succeed",
                example: "She passed the exam by the skin of her teeth.",
                category: "Luck"
            },
            {
                idiom: "Catch someone red-handed",
                meaning: "To catch someone in the act of doing something wrong",
                example: "They caught him red-handed stealing.",
                category: "Crime"
            },
            {
                idiom: "Cold feet",
                meaning: "Nervousness before doing something important",
                example: "He got cold feet before the wedding.",
                category: "Fear"
            },
            {
                idiom: "Cry over spilled milk",
                meaning: "To worry about things that cannot be changed",
                example: "There’s no use crying over spilled milk.",
                category: "Regret"
            },
            {
                idiom: "Devil’s advocate",
                meaning: "Someone who argues the opposite side",
                example: "I’ll play devil’s advocate for a moment.",
                category: "Debate"
            },
            {
                idiom: "Every cloud has a silver lining",
                meaning: "There is something good in every bad situation",
                example: "Losing the job helped him find a better one.",
                category: "Optimism"
            },
            {
                idiom: "Get out of hand",
                meaning: "To become uncontrollable",
                example: "The situation got out of hand quickly.",
                category: "Control"
            },
            {
                idiom: "Go the extra mile",
                meaning: "To put in extra effort",
                example: "She always goes the extra mile for clients.",
                category: "Dedication"
            },
            {
                idiom: "Hit the sack",
                meaning: "To go to sleep",
                example: "I’m exhausted, I’m going to hit the sack.",
                category: "Sleep"
            },
            {
                idiom: "In the long run",
                meaning: "Over a long period of time",
                example: "It will be worth it in the long run.",
                category: "Time"
            },
            {
                idiom: "Keep an eye on",
                meaning: "To watch carefully",
                example: "Please keep an eye on my bag.",
                category: "Attention"
            },
            {
                idiom: "Know the ropes",
                meaning: "To understand how things work",
                example: "She knows the ropes at her new job.",
                category: "Experience"
            },
            {
                idiom: "Leave no stone unturned",
                meaning: "To search thoroughly",
                example: "They left no stone unturned in the investigation.",
                category: "Effort"
            },
            {
                idiom: "Make ends meet",
                meaning: "To manage financially",
                example: "It’s hard to make ends meet these days.",
                category: "Money"
            },
            {
                idiom: "No pain, no gain",
                meaning: "Effort is required for success",
                example: "Training is tough, but no pain, no gain.",
                category: "Motivation"
            },
            {
                idiom: "Off the hook",
                meaning: "Free from blame or responsibility",
                example: "He’s off the hook this time.",
                category: "Responsibility"
            },
            {
                idiom: "On cloud nine",
                meaning: "Extremely happy",
                example: "She’s been on cloud nine since the news.",
                category: "Happiness"
            },
            {
                idiom: "Play it safe",
                meaning: "To avoid taking risks",
                example: "He decided to play it safe.",
                category: "Risk"
            },
            {
                idiom: "Rule of thumb",
                meaning: "A general guideline",
                example: "As a rule of thumb, save 10% of your income.",
                category: "Guidelines"
            },
            {
                idiom: "See eye to eye",
                meaning: "To agree with someone",
                example: "They don’t see eye to eye on politics.",
                category: "Agreement"
            },
            {
                idiom: "Sit on the fence",
                meaning: "To avoid making a decision",
                example: "He’s sitting on the fence about the offer.",
                category: "Decision"
            },
            {
                idiom: "Steal the show",
                meaning: "To attract the most attention",
                example: "Her performance stole the show.",
                category: "Performance"
            },
            {
                idiom: "Take the bull by the horns",
                meaning: "To face a challenge directly",
                example: "She took the bull by the horns.",
                category: "Courage"
            },
            {
                idiom: "The tip of the iceberg",
                meaning: "A small visible part of a bigger problem",
                example: "This issue is just the tip of the iceberg.",
                category: "Problems"
            },
            {
                idiom: "Through thick and thin",
                meaning: "In good times and bad",
                example: "They stayed friends through thick and thin.",
                category: "Loyalty"
            },
            {
                idiom: "Time flies",
                meaning: "Time passes quickly",
                example: "Time flies when you’re having fun.",
                category: "Time"
            },
            {
                idiom: "Worth its weight in gold",
                meaning: "Very valuable",
                example: "Good advice is worth its weight in gold.",
                category: "Value"
            }
        ]
    ;

    const nextIdiom = () => {
        if (currentIndex < idioms.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setRevealed(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <MessageSquare className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 text-white">Idioms & Phrases</h1>
                <p className="text-gray-300">Learn common English idioms and their meanings</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-300">Idiom {currentIndex + 1} of {idioms.length}</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
            {idioms[currentIndex].category}
          </span>
                </div>

                <div className="text-center mb-8">
                    <h3 className="text-4xl font-bold text-yellow-300 mb-6">
                        "{idioms[currentIndex].idiom}"
                    </h3>

                    {!revealed ? (
                        <button
                            onClick={() => setRevealed(true)}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <Eye className="h-5 w-5" />
                            Reveal Meaning
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-2">Meaning</h4>
                                <p className="text-2xl text-white">{idioms[currentIndex].meaning}</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-2">Example</h4>
                                <p className="text-xl text-white italic">"{idioms[currentIndex].example}"</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                        disabled={currentIndex === 0}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        onClick={nextIdiom}
                        disabled={currentIndex === idioms.length - 1}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                        Next Idiom
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <Puzzle className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Why Learn Idioms?</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Makes you sound more like a native speaker
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Enhances comprehension of English media
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Adds color and expressiveness to your language
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <MessageSquare className="h-8 w-8 text-green-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Practice Tips</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Learn one idiom daily and use it in conversation
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Note idioms you hear in movies or books
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Practice with native speakers or language partners
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IdiomsPhrasesPage;