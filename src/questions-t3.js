/* ===================================================================
   Homerun Learn to Play — questions-t3.js
   Tier 3 (Diamond) question bank for chapters 9–12.
   Registers onto HRL_QUESTIONS. ES5-safe. Load after questions-data.js.
   Content sourced from youth-baseball-canada wiki concept pages
   and skill-roadmap syntheses, matching curriculum-t3.js.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var Q = root.HRL_QUESTIONS;

  if (!Q || typeof Q.register !== 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Q || null;
    }
    return;
  }

  Q.register([

    /* -------------------------------------------------------------- */
    /* ch09 — Hitting Fundamentals                                     */
    /* -------------------------------------------------------------- */
    {
      id: 'q0901',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 3,
      type: 'mc',
      prompt: 'How should a hitter grip the bat before the pitch?',
      choices: [
        'Line up the first-knuckle row of each hand and squeeze as hard as possible',
        'Line up the door-knocking knuckles (the second-knuckle row) and keep grip pressure about 5 out of 10',
        'Stack the thumbs along the handle so the bat cannot twist',
        'Hold the bat in the palms with the top hand covering the knob'
      ],
      answer: 1,
      explain: 'Door-knocking knuckles aligned keep the barrel on a clean path. A death grip tenses the forearms and slows the barrel; hold it like a bird — tight enough that it cannot fly, loose enough that you do not crush it.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0902',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 4,
      type: 'order',
      prompt: 'Put the five swing frames in the order the body actually moves.',
      items: ['Stance', 'Load', 'Stride', 'Contact', 'Finish'],
      explain: 'Teach the swing as five pictures: athletic stance with eyes on the pitcher; load (weight and hands back); stride (small step, stay closed); contact (short to the ball, firm front side); finish high and still balanced.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0903',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'What is the load, and when does it start?',
      choices: [
        'A long lunge toward the pitcher as the ball leaves the hand',
        'The hip-rotation lecture you give a 7-year-old before every swing',
        'A small energy-storing move — hands back, a little weight to the back leg — that starts as the pitcher\'s arm commits',
        'Choking up two inches and expanding the zone with two strikes'
      ],
      answer: 2,
      explain: 'The load stretches the swing like a rubber band: hands go back behind the back shoulder and the knob points roughly at the catcher as the pitcher throws. It is not a lunge and it is not a two-strike adjustment.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0904',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 4,
      type: 'mc',
      prompt: 'Which statement about the stride is correct for youth hitters?',
      choices: [
        'The front foot and the weight should dump forward together so the hitter can "get into" the pitch',
        'The stride is a timing move of about two to four inches; land the front foot softly, then swing',
        'Every hitter must stride at least a full shoe-length or they will have no power',
        'A no-stride approach is a fault and should be coached out immediately'
      ],
      answer: 1,
      explain: 'Land first, swing second. Two to four inches is enough; a no-stride weight shift is valid and often simpler for younger hitters. Lunging — front foot and weight dumping forward before the load is done — is the fault.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0905',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'Through the hitting zone, what is the actual bat path?',
      choices: [
        'A steep chop, so the hitter "beats the uppercut"',
        'A golf-style uppercut that lifts every pitch into the air',
        'A perfectly level saw that cuts the ball in half on every pitch',
        'Knob first, hands close to the body, level to slightly upward through the zone'
      ],
      answer: 3,
      explain: 'A pitched ball is coming slightly down, so a slight upward attack matches that path and gives the longest window for solid contact. "Swing level" as a saw and "chop down on it" are the two myths; an exaggerated uppercut produces pop-ups.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0906',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 6,
      type: 'mc',
      prompt: 'Where should a right-handed hitter meet an inside pitch, a middle pitch, and an outside pitch?',
      choices: [
        'One frozen contact point at the middle of the plate for every pitch',
        'Inside: let it travel deep. Middle: off the back hip. Away: out in front so the hips clear early',
        'All three off the back foot so the hitter "stays back"',
        'Inside: slightly in front of the plate. Middle: roughly at the front corner. Away: deeper, closer to the catcher'
      ],
      answer: 3,
      explain: 'Contact point moves with location. Inside, the hips have to clear early and the barrel meets the ball in front. Away, the cue is "let the outside pitch travel" so the hands stay through it longer. One frozen contact point is the myth.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0907',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 4,
      type: 'mc',
      prompt: 'What is the hitting-practice progression, and when does the tee retire?',
      choices: [
        'Start live so it is "game-like," then use the tee only as punishment',
        'Soft toss first, then the tee, then live — skip side toss because it is unsafe',
        'Tee, then soft toss, then side toss, then front toss, then live. The tee never retires',
        'Machine BP from day one; tee work is only for 5–8U'
      ],
      answer: 2,
      explain: 'Never skip. A hitter who cannot hit a tee ball on the outer third is not ready to read a live breaking ball. Older hitters still use the tee to isolate one piece; a player who is not ready for toss work goes back to it. Side toss is the 10U+ station, not a skip.',
      source: 'tee-and-soft-toss-progressions'
    },
    {
      id: 'q0908',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 6,
      type: 'mc',
      prompt: 'A 7-year-old in 5–8U (FUNdamentals) is making contact from a balanced stance. What should you not teach yet?',
      choices: [
        'Hip rotation and weight-transfer lectures',
        'Watch the ball and stay balanced',
        'Swing all the way through',
        'A squash-the-bug picture for the back foot'
      ],
      answer: 0,
      explain: 'Teaching a 7-year-old to rotate the hips is the most common youth hitting error. At 5–8U the job is contact from a balanced stance; hip-before-hands is a 12U+ power multiplier after the path is already sound. Squash-the-bug is a fine picture at this age, not a biomechanics lecture.',
      source: 'skill-roadmap-hitting'
    },
    {
      id: 'q0909',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 3,
      type: 'tf',
      prompt: 'A no-stride approach — a weight shift with almost no foot move — is invalid for youth hitters and should be coached out.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Both a small stride and a no-stride approach are valid. No-stride often simplifies timing for younger hitters. The rule that matters is land (or plant) first, then swing — not a mandatory lunge.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0910',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'A hitter\'s front foot and weight dump forward before the load is done, and the swing starts late. What is the fault, and what is the cue?',
      choices: [
        'Casting — cue "see the ball hit the bat"',
        'Stepping in the bucket — cue "chop down on it"',
        'Uppercutting — cue "throw harder through the zone"',
        'Lunging — cue "soft landing: stride early, swing late"'
      ],
      answer: 3,
      explain: 'Lunging is early weight onto the front side. The fix is a soft landing so the front foot is down when the pitch is about halfway there, then the swing. Casting is hands looping away from the body; stepping in the bucket is the front foot opening away from the plate.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0911',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'strategy',
      difficulty: 7,
      type: 'mc',
      prompt: 'At 8–10U (Learn to Train), tee contact is becoming consistent and you have started soft toss. Which skill is still "not yet"?',
      choices: [
        'A balanced load and "stride toward the pitcher"',
        'Catching a hitter who is stepping in the bucket',
        'Two-strike approach, plate discipline, and pull versus opposite-field concepts',
        'Bat path on the tee'
      ],
      answer: 2,
      explain: 'The 8–10U hitting roadmap introduces load, path, and soft-toss timing. Two-strike (choke up about two inches, protect the zone) arrives at 11–12U; plate discipline and pull/oppo concepts wait with it. Do not stack count-based approach on a 9-year-old who is still learning to land the front foot.',
      source: 'skill-roadmap-hitting'
    },
    {
      id: 'q0912',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'For standard front-side soft toss, where does the feeder work, and what is the age gate for side toss?',
      choices: [
        'Kneel at about a 45-degree angle in front of the front hip and toss a slow arc to the belt, slightly in front. Side toss is 10U+.',
        'Stand behind the catcher and throw overhand so it is "game-like." Side toss is 6U.',
        'Kneel directly in the swing path so the hitter can "see it out of the hand." Side toss is the same station.',
        'Feed from the outfield grass. Side toss waits until 14U.'
      ],
      answer: 0,
      explain: 'Standard soft toss is the 9U+ bridge off the tee: slow arc to the belt, slightly in front, feeder off the swing path. Side toss (45 to 90 degrees off the front hip) keeps the hitter on the inside of the ball and is gated at 10U+; put a screen in front of the feeder if you have one.',
      source: 'tee-and-soft-toss-progressions'
    },
    {
      id: 'q0913',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 6,
      type: 'scenario',
      prompt: '9U practice. Four stations. A hitter who looked fine on the belt-high tee is now lunging at every soft-toss ball, front foot and chest spilling toward the feeder. A parent says they "need live reps to compete this weekend." What do you do?',
      choices: [
        'Send them back to the tee until the front foot lands and the swing starts after. The tee is the microscope, not a punishment.',
        'Skip to coach-pitch so the timing "gets real."',
        'Add hip-rotation language so they can "drive the hips through the lunge."',
        'Leave them at soft toss and stack three cues at once: stay back, see it, and rotate.'
      ],
      answer: 0,
      explain: 'A hitter who lunges at toss is not ready for live. Under 10, 10–15 quality swings per visit is enough; the load cue at 9U is "hands back as the pitcher throws," and hip-rotation language stays in the bag. One cue per round.',
      source: 'skill-roadmap-hitting'
    },
    {
      id: 'q0914',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 4,
      type: 'mc',
      prompt: 'What does a complete finish look like?',
      choices: [
        'Stop the barrel at contact so you "feel the ball on the bat"',
        'Fall through the box toward first — that means you "sold out"',
        'Hands high over the lead shoulder, back heel up, hips facing the pitcher, weight over the front leg, still balanced',
        'Both heels planted, bat wrapped around the neck, eyes already on first base'
      ],
      answer: 2,
      explain: 'After contact the arms extend through the ball. The finish is high and balanced: weight over the front leg, back heel up, hips to the pitcher. Falling through the box is a lunge dressed up as effort.',
      source: 'hitting-mechanics'
    },
    {
      id: 'q0915',
      chapter: 'ch09',
      tier: 'diamond',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'A 10U hitter uppercuts and lunges on the tee. Before you rewrite the swing, what should you check?',
      choices: [
        'Whether they have been taught a two-strike choke-up yet',
        'Whether the bat is too heavy for their size and division stamp',
        'Whether they can already read a live breaking ball',
        'Whether their back toss and two-ball recognition are in place'
      ],
      answer: 1,
      explain: 'A bat that is too heavy makes uppercutting and lunging look like personality. Match the bat to the division stamp and the player\'s size first. Back toss, two-ball recognition, and two-strike work are later gates — they will not fix a brick in the hands.',
      source: 'hitting-mechanics'
    },

    /* -------------------------------------------------------------- */
    /* ch10 — Throwing & Catching                                      */
    /* -------------------------------------------------------------- */
    {
      id: 'q1001',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 3,
      type: 'mc',
      prompt: 'Where do the index and middle fingers sit on a four-seam grip?',
      choices: [
        'Along the two narrow seams that run close together',
        'Deep in the palm with no daylight showing',
        'Across the horseshoe seam — the wide part of the U — with the thumb underneath on the leather',
        'Split wide like a forkball, one finger on each side of the ball'
      ],
      answer: 2,
      explain: 'Four-seam means fingers across the horseshoe, thumb opposite the index finger, ball on the fingertips. That orientation puts four seams through the air, so the ball carries straight. Fingers along the narrow seams is a two-seam, which waits.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1002',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 4,
      type: 'mc',
      prompt: 'How do you know the ball is on the fingertips instead of in the palm?',
      choices: [
        'You can see daylight between the leather and the palm',
        'The ball is buried so it cannot slip',
        'Only the ring finger touches leather',
        'The thumb sits on top of the horseshoe'
      ],
      answer: 0,
      explain: 'Cue: "fingertips — daylight between ball and palm." A palm ball is a dead throw: it tumbles, dies, and drops short. Small hands (often 6–9U) may add a third finger; move to two fingers as the hand grows.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1003',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 4,
      type: 'order',
      prompt: 'Put the throwing sequence in order from the first frame to the last.',
      items: ['Grip', 'Separation', 'Stride', 'Release', 'Follow-through'],
      explain: 'Grip a four-seam. Separation: hands break, glove at the target, throwing hand down, back, and up ("thumb to the thigh"). Stride toward the target. Release out front, fingers behind the ball. Follow-through to the opposite knee — that finish is the arm\'s brakes.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1004',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 5,
      type: 'mc',
      prompt: 'A youth thrower\'s elbow stays down, like skipping a stone. What is the fault, and what is the first cue?',
      choices: [
        'Palm ball — "bury it deeper"',
        'Dart-throwing (elbow drop) — "elbow up; show the ball to the sky"',
        'Short-arming — "stop at release so you do not get hurt"',
        'All-arm — "open the chest before the hips"'
      ],
      answer: 1,
      explain: 'Dart-throwing is elbow down through cocking. Lift the elbow to shoulder height or above and show the ball to the sky. Stopping the arm at release is how the back of the shoulder gets hurt, not how you prevent it.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1005',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 4,
      type: 'mc',
      prompt: 'How should a youth player catch a thrown ball above the waist versus below the waist?',
      choices: [
        'One-handed basket in front of the face for both',
        'Fingers down above the waist so the palm faces the sky',
        'Catcher\'s mitt only; fielders wait for a bounce',
        'Two hands. Above the waist, fingers point up (a window). Below the waist, fingers point down.'
      ],
      answer: 3,
      explain: 'Two hands, and watch the ball all the way in. A window above the waist beats a basket in front of the face. Below the waist, fingers down, give with the ball — "bring it to centre like catching an egg." The infielder\'s alligator is the same idea on the ground.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1006',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 6,
      type: 'scenario',
      prompt: 'Baseball Canada 11U. Your pitcher has thrown 18 pitches (inside 1–25, so 0 days of rest on the table, well under the daily max of 75). They say the inside of the elbow is "just tight." What do you do?',
      choices: [
        'Finish the batter to save a rest day — the count is low',
        'Ice for five minutes and send them back out',
        'Remove them immediately. No more throwing today. Do not move them to catcher to "keep them in."',
        'Switch them to changeups so the arm "loosens without stress"'
      ],
      answer: 2,
      explain: 'Pain or tightness during or after throwing is always a stop sign. Inner-elbow pain is a UCL / medial-apophysis warning. Count does not override pain. Pitch Smart still does not want pitcher and catcher load piled on the same arm in the same game, even when Baseball Canada has no crossover rule.',
      source: 'arm-care-and-injury-prevention'
    },
    {
      id: 'q1007',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 5,
      type: 'mc',
      prompt: 'A 12U coach wants to skip short-toss and "just long-toss to get loose" before a game. What is the arm-care plan?',
      choices: [
        'Yes — long toss is the best pre-game warm-up at any age',
        'No. Warm-up is dynamic body work, then short toss, then a step-back. Long toss is a coach-supervised training tool at the end of practice, 11U+, and it counts as throwing volume.',
        'Yes if they stay under 100 feet',
        'Yes on days they will not pitch'
      ],
      answer: 1,
      explain: 'Ten to fifteen minutes before the first competitive throw: raise temperature, then easy short toss at 20–30 feet, then walk the distance out only as far as the arm stays smooth. Long toss is not a warm-up substitute. If the arm slot drops on the step-back, you have gone too far.',
      source: 'arm-care-and-injury-prevention'
    },
    {
      id: 'q1008',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 6,
      type: 'mc',
      prompt: 'For everyday positional throwing (not a taught pitching mix), when does the throwing roadmap introduce a two-seam grip?',
      choices: [
        'Not until 13U+, and only after four-seam is automatic',
        'At 5–8U, so they can "make it move" on the infield',
        'At 8–10U, during one-knee throwing',
        'Whenever the thrower wants run and sink, even at Rally Cap'
      ],
      answer: 0,
      explain: 'Four-seam is the universal starting grip. Two-seam (fingers along the narrow seams) adds run and sink and is harder to control. The throwing roadmap waits until 13U+; 11–12U is still "not yet" for two-seam and for off-balance throws.',
      source: 'skill-roadmap-throwing'
    },
    {
      id: 'q1009',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 7,
      type: 'mc',
      prompt: 'A Baseball Canada 11U pitcher threw 30 pitches today. How many full calendar days of rest before they may pitch again? (Rest days run 12:01 am to 11:59 pm.)',
      choices: ['0 days', '1 day', '2 days', '3 days'],
      answer: 1,
      explain: 'Baseball Canada 11U rest bands: 1–25 = 0 days, 26–40 = 1 day, 41–55 = 2, 56–65 = 3, 66–75 = 4. Thirty sits in 26–40. Daily max is 75. The table is the legal floor; pain still overrides it.',
      source: 'pitch-count-rules'
    },
    {
      id: 'q1010',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 5,
      type: 'mc',
      prompt: 'Why does the follow-through cue say "touch your opposite knee with your throwing hand"?',
      choices: [
        'So the thrower can field a comebacker from one knee',
        'So the chest opens before the hips fire',
        'So the thrower stops the arm at release and "saves the shoulder"',
        'Follow-through is the arm\'s brakes. Cutting the arm off at release stresses the back of the shoulder.'
      ],
      answer: 3,
      explain: 'Deceleration is not optional aesthetics. Short-arming — the arm cutting off at release — is a youth injury pattern. Finish to the opposite knee (or hip) so the posterior shoulder can brake the arm through a full arc.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1011',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 3,
      type: 'tf',
      prompt: 'Youth players should catch with two hands and watch the ball all the way into the glove.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'Two hands is the default. Tight muscles are slow muscles: give with the ball. The kneeling-catch cue is the whole skill — watch it in. One-hand pickups are a later option, not a personality at 8–10U.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1012',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 7,
      type: 'scenario',
      prompt: 'A 13-year-old who was locating suddenly loses velocity and the arm slot drops. They did not say it hurt. The count is 35. What do you do?',
      choices: [
        'Leave them in — they did not report pain',
        'Remove them. A sudden unexplained velocity drop is a stop signal even without a complaint.',
        'Tell them to throw harder to get the velo back',
        'Move them to catcher so they can "stay in the game" on a different throw'
      ],
      answer: 1,
      explain: 'Sudden velocity drop sits with medial elbow pain, shoulder pain, numbness, and a dead arm as an immediate removal cue. Youth players under-report pain; fatigue mechanics are the warning you can see. Catcher throws are still overhead volume on the same arm.',
      source: 'arm-care-and-injury-prevention'
    },
    {
      id: 'q1013',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 5,
      type: 'mc',
      prompt: 'Power in the throw is supposed to travel in which order?',
      choices: [
        'Arm first, then chest, then feet',
        'Wrist snap first so the fingers "get on top"',
        'Hips turn toward the target first, then the arm follows',
        'Glove-side shoulder flies open first so the throwing arm can catch up'
      ],
      answer: 2,
      explain: 'Cue: "hips first, then hands." An all-arm throw is both weaker and the injury pattern you are trying not to build. Stay closed: glove-side shoulder at the target until the hips fire. This hip-leads-shoulder language is an 11U+ throwing skill, not a 5–8U lecture.',
      source: 'throwing-mechanics'
    },
    {
      id: 'q1014',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 4,
      type: 'mc',
      prompt: 'Besides daily pitch-count rest, what off-season rule does Pitch Smart want for overhead throwing?',
      choices: [
        'At least 2–3 months a year with no overhead throwing, and no pitching more than 9 months in 12',
        'Throw through the winter so the arm "never gets cold"',
        'Pitch year-round if each outing stays under the daily max',
        'Skip rest days in fall ball because fall ball "does not count"'
      ],
      answer: 0,
      explain: 'Year-round mound work is one of the strongest UCL-injury predictors. The rest table does not see fall ball, winter training, or showcase weekends. The legal count is the floor; arm care is the ceiling.',
      source: 'arm-care-and-injury-prevention'
    },
    {
      id: 'q1015',
      chapter: 'ch10',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 5,
      type: 'mc',
      prompt: 'At 5–8U, what throwing skills belong in the session, and what stays in the bag?',
      choices: [
        'Long toss and velocity contests, because distance builds confidence',
        'Hip rotation, arm-path lectures, and a follow-through checklist',
        'Shuffle throw and skip-step so they can throw off-balance like infielders',
        'Four-seam (or three-finger), overhand release, and a step toward the target from about 10–15 feet. Not hip rotation, not long toss, not velocity.'
      ],
      answer: 3,
      explain: 'The same arm cannot learn everything at once. Distance is earned by accuracy, not effort. Elbow-up and finish to the opposite knee come at 8–10U; hip-leads-shoulder and long toss wait until 11U+.',
      source: 'skill-roadmap-throwing'
    },

    /* -------------------------------------------------------------- */
    /* ch11 — Playing the Infield                                      */
    /* -------------------------------------------------------------- */
    {
      id: 'q1101',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 3,
      type: 'mc',
      prompt: 'What does an infielder\'s ready position look like before the pitch?',
      choices: [
        'Heels down, chest high, glove on the hip so it "stays out of the way"',
        'Feet a little wider than the shoulders, weight on the balls of the feet, knees bent, glove out in front at about the waist, fingers down and open to the batter',
        'Standing upright with the glove touching the ground between the feet',
        'Feet together, glove behind the back, eyes on the runner'
      ],
      answer: 1,
      explain: 'Ready loads the legs for a first step either way and shortens the glove\'s path to a ground ball. Flat feet and a high chest are how you start late.',
      source: 'infield-play'
    },
    {
      id: 'q1102',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 4,
      type: 'mc',
      prompt: 'When does the "creep" happen, and why?',
      choices: [
        'After contact, as a recovery step if you started flat-footed',
        'Only on bunts, as a charge from a standing start',
        'As the pitcher\'s front foot lands: a small weight-transfer step so the first step is already underway',
        'During the throw, replacing the glove-side foot'
      ],
      answer: 2,
      explain: 'Creep with the pitch. That tiny move is the difference between a standing start and a first step that is already underway. The replace-step is later, after the field and funnel, when you throw.',
      source: 'infield-play'
    },
    {
      id: 'q1103',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'Where is the fielding triangle, and where is the ball?',
      choices: [
        'Two feet and a glove, with the ball out in front and slightly to the glove side — not between the feet, not on the throwing-hand hip',
        'Both heels and the throwing-hand hip, ball fielded off to the throwing side',
        'A straight back and a last-second reach at the shoelaces',
        'Glove at the ear, ball fielded on the backhand as the default at 8U'
      ],
      answer: 0,
      explain: 'Glove on the ground, hips down early, hands below the ball. Fielding it off the throwing-hand hip makes the exchange a chase. Drop the hips so the glove is already at or below the hop; a straight back and a last-second reach is the common miss.',
      source: 'infield-play'
    },
    {
      id: 'q1104',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 4,
      type: 'order',
      prompt: 'Put the infield play in order after the ball is hit at you.',
      items: ['Field', 'Funnel', 'Exchange', 'Throw'],
      explain: 'Field in the triangle with two hands. Funnel the ball to the centre of the chest like catching an egg. Exchange: four-seam in the transfer, no palm balls. Then replace the feet, step, and throw on a line to the chest.',
      source: 'infield-play'
    },
    {
      id: 'q1105',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'On a pop-up, who has priority?',
      choices: [
        'The nearest infielder always has priority, including on the grass',
        'Corner infielders have priority over shortstop and second in the middle of the diamond',
        'The first baseman calls off the catcher behind the plate',
        'Call "I got it!" early and loud. Catcher owns pop-ups behind the plate. Shortstop and second own the middle over the corners. Outfielders own anything they can take on the grass.'
      ],
      answer: 3,
      explain: 'The first real call wins; everyone else gets off and stays ready in case of a drop. The outfielder is coming in and sees it better, so they call off infielders on the grass. Walk the order before you hit live flies; the full priority talk is 11U+. At 8–10U it is still "call it and catch it with two hands."',
      source: 'infield-play'
    },
    {
      id: 'q1106',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'positions',
      difficulty: 4,
      type: 'hotspot',
      prompt: 'On a 6-4-3 double-play walk-through, who fields the grounder and feeds the pivot? Tap that position.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          title: 'Tap the shortstop',
          desc: 'A youth diamond with infielders labelled. Tap the shortstop — the 6 in a 6-4-3.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss']
        }
      },
      targets: ['ss'],
      explain: '6 is the shortstop, 4 is the second baseman, 3 is first. Shortstop fields and feeds the second baseman\'s glove-side chest; second touches the bag and throws to first. Walk this through dry at 11–12U. Live speed with a sliding runner waits until 13U+.',
      source: 'infield-play'
    },
    {
      id: 'q1107',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 6,
      type: 'mc',
      prompt: 'When should you teach a live, game-speed double play with a real runner sliding into the bag?',
      choices: [
        'At 8–10U, as a house-league badge',
        'Not until 13U+. At 11–12U, walk the 6-4-3 and 5-4-3 through dry, with no sliding runner and no stopwatch.',
        'The first week of 10U, so they "have it for tryouts"',
        'Whenever the shortstop has the strongest arm, regardless of age'
      ],
      answer: 1,
      explain: 'Contact at the bag is a real risk. The skill roadmap is blunt: live DP at game speed is not yet at 10–12U. Dry walk-through at 11–12U teaches the feed to the chest. If the feed arrives at the shins, stop and redo — the pivot cannot catch that and still clear a runner.',
      source: 'skill-roadmap-fielding-infield'
    },
    {
      id: 'q1108',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'What is the alligator catch on a grounder?',
      choices: [
        'A one-hand stab off the throwing-hand hip',
        'The bare hand waving a metre above the glove "to protect the face"',
        'Bare hand a few centimetres above the glove, closing like a jaw once the ball is in the pocket',
        'A backhand dive as the default at 8U'
      ],
      answer: 2,
      explain: 'Two hands. The jaw is centimetres, not a metre — too high leaves the bare hand out of play. Alligator is how the exchange starts. One-hand pickups are a later option on a slow roller at 12U+, not an 8–10U personality.',
      source: 'infield-play'
    },
    {
      id: 'q1109',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 6,
      type: 'mc',
      prompt: 'A grounder is to a 9U right-handed shortstop\'s glove side. What should you teach, and what waits?',
      choices: [
        'Round behind it and take a forehand whenever the ball lets you. A taught backhand waits until 11U+; a true backhand dive waits until 13U+.',
        'Dive backhand on every glove-side ball at 8U so range becomes identity',
        'Wait on the ball so the hop "dies"',
        'Barehand the short hop; skip-step is the 8U save'
      ],
      answer: 0,
      explain: 'Most youth fielders should round behind a glove-side ball and take a forehand. Backhand as a taught skill is 11U+: turn, stay low, nose at the ball. Skip-step and live dives are 13U+. Waiting lets the bad hop grow — charge the ones you can.',
      source: 'skill-roadmap-fielding-infield'
    },
    {
      id: 'q1110',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 6,
      type: 'scenario',
      prompt: '11U. Runner on first. You are walking through a dry 6-4-3 — no slider, no clock. The shortstop fields it cleanly and throws the feed at the second baseman\'s shins, right at the bag. What do you do?',
      choices: [
        'Praise the arm and go live so the pivot "learns under pressure"',
        'Have the second baseman start the play instead; shortstops do not feed',
        'Stop and redo. Feed the glove-side chest, not the bag. A pivot cannot catch a shin-high throw and still clear a runner who is not even there yet.',
        'Skip the feed and have shortstop throw through to first — turning two is 8U'
      ],
      answer: 2,
      explain: 'The feed is the skill at 11U. Chest, glove side. Live speed with a real runner waits until 13U+ because contact at the bag is a real risk. Do not gun a walk-through.',
      source: 'skill-roadmap-fielding-infield'
    },
    {
      id: 'q1111',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 4,
      type: 'mc',
      prompt: 'On a throw to first, what should the first baseman do?',
      choices: [
        'Leave the bag early and run at the throw so they "meet it"',
        'Present a high target at the letters and pull the foot as the ball leaves the infielder\'s hand',
        'Camp on the throwing-hand side of the bag and wait for a hop without stretching',
        'Give a low, wide target. Stay on the bag until the throw is in the air, then stretch toward the ball with a foot still on the bag. Scoop the short hop.'
      ],
      answer: 3,
      explain: 'Low target, foot on the bag, stretch to the throw, scoop the hop. Pulling the foot early turns a close play into an error. The 3-6-3 and the step-off versus stay-on read wait until 13U+.',
      source: 'infield-play'
    },
    {
      id: 'q1112',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 7,
      type: 'mc',
      prompt: 'The skip-step (a short hop to get the feet under you before throwing off-balance) is a taught infield skill at which age?',
      choices: [
        '8–10U, on day one with rolled balls',
        '13U+ as a programmed skill. Before that, throw to first from a replace-step or a shuffle when you have charged.',
        '5–8U, because Rally Cap infielders are always off-balance',
        '10U, replacing the alligator'
      ],
      answer: 1,
      explain: 'Shuffle (jab, crossover, throw) is for a charged ball or a play close to a bag and shows up in 11U infielder language. Skip-step as a taught off-balance save waits until 13U+. 8–10U is rolled balls, alligator, and throw to first only.',
      source: 'skill-roadmap-fielding-infield'
    },
    {
      id: 'q1113',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'positions',
      difficulty: 3,
      type: 'mc',
      prompt: 'What are the position numbers for first, second, third, and shortstop?',
      choices: [
        '3, 4, 5, and 6',
        '1, 2, 3, and 4',
        '4, 5, 6, and 7',
        '2, 3, 4, and 5'
      ],
      answer: 0,
      explain: 'Pitcher is 1, catcher is 2, first is 3, second is 4, third is 5, shortstop is 6. That is why a shortstop-to-second-to-first double play is scored 6-4-3. Left, centre, and right are 7, 8, and 9.',
      source: 'infield-play'
    },
    {
      id: 'q1114',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'A house-league infielder stands up, watches the hop, then reaches. What do you teach first?',
      choices: [
        'A prettier arm slot on the throw to first',
        'Range-as-identity and fungoes from home on day one',
        'Live double plays so they "have to hurry"',
        'Charge the ones you can, hips down early, hands below the ball. Rolled balls, then short fungoes, then the real ones.'
      ],
      answer: 3,
      explain: 'Waiting on a grounder lets the bad hop grow. Teach charge and hips-down before you teach a pretty arm. Cue: "work through the ball." Two hands on every grounder at 8–10U. One throw to first until the triangle and the exchange are boring.',
      source: 'infield-play'
    },
    {
      id: 'q1115',
      chapter: 'ch11',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'At 8–10U, which infield throw belongs in the plan, and which treat waits?',
      choices: [
        'Across-the-horn on day one, then live DP feeds',
        'Skip-step off-balance to third, then to first',
        'Throw to first only until the triangle and the exchange are boring. Across-the-horn is a 10U+ treat, not day one.',
        'Catcher pop-times from a new catcher, then 3-6-3 live'
      ],
      answer: 2,
      explain: 'Rolled balls before fungoes. One throw direction before the whole diamond. Across-the-horn waits until 10–12U; live turning two waits until 13U+. New catchers at 10–11U need gear comfort, a low target, and blocking before any throw-down.',
      source: 'skill-roadmap-fielding-infield'
    },

    /* -------------------------------------------------------------- */
    /* ch12 — The Outfield & Pitching Basics                           */
    /* -------------------------------------------------------------- */
    {
      id: 'q1201',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 4,
      type: 'mc',
      prompt: 'A fly ball is at or above an outfielder\'s head. What is the first move?',
      choices: [
        'Backpedal so you can keep your eyes on the infield',
        'Break in two steps — you can always recover if it carries',
        'A drop-step: the back foot drops and opens to that side, hips open, then a crossover into a sprint. Do not backpedal.',
        'Camp under it and wait, then banana through the gap'
      ],
      answer: 2,
      explain: 'Going back is harder to fix than coming in. Cue: "first step is always back — you can always come forward, you can never get back." The ready position already leans to go back, with a tiny rocker step as the pitcher releases.',
      source: 'outfield-play'
    },
    {
      id: 'q1202',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'What is the crow hop, in order?',
      choices: [
        'Plant the throwing-side foot as you catch, hop onto that foot, stride with the glove-side foot, four-seam line throw to the cutoff\'s chest',
        'Stop, square up, then throw from a standstill so the legs "stay out of it"',
        'Catch below the waist with fingers up, skip the hop, rainbow the throw over the infield',
        'Plant the glove-side foot first, spin away from the target, then throw'
      ],
      answer: 0,
      explain: 'Catch above the throwing shoulder, two hands, so the hop is already loaded. The crow hop turns run into throw. Stopping and then throwing leaves the legs out. At 8–10U, the footwork pattern without a throw is enough; connect it to a real throw at 11–12U.',
      source: 'outfield-play'
    },
    {
      id: 'q1203',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'positions',
      difficulty: 3,
      type: 'hotspot',
      prompt: 'A fly ball is in the left-centre gap. Who calls off the corner outfielder? Tap that position.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          title: 'Tap centre field',
          desc: 'A youth diamond with outfielders labelled. Tap the centre fielder, who calls off the corners.',
          hotspots: ['lf', 'cf', 'rf', 'ss', '2b', '3b']
        }
      },
      targets: ['cf'],
      explain: 'Centre field calls off the corners. That is the rule of the outfield. Left and right do not automatically defer to each other — the first call wins — and centre still rules the gaps. On the grass-dirt line, the outfielder has priority over the infielder.',
      source: 'outfield-play'
    },
    {
      id: 'q1204',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'strategy',
      difficulty: 5,
      type: 'mc',
      prompt: 'Where should an outfield throw go on most extra-base chances?',
      choices: [
        'A high rainbow over the infield so it "has a chance at the lead runner"',
        'A four-seam line to the cutoff\'s chest. Hit the cutoff unless the throw is honestly short enough to take a base directly.',
        'A two-seam one-hopper to the backstop so the catcher can tag',
        'Wherever the outfielder feels like throwing; communication is optional'
      ],
      answer: 1,
      explain: 'Hitting the cutoff is the default. A miss over the cutoff is a gift of extra bases. Four-seam, on a line. Youth tumbling throws are almost always a two-seam-by-accident — confirm four-seam in the glove before the hop.',
      source: 'outfield-play'
    },
    {
      id: 'q1205',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 4,
      type: 'mc',
      prompt: 'At 8–10U, which three pitching ideas do you teach, and what do you leave alone?',
      choices: [
        'Hip timing, arm slot, and release-point science; leave balance for 14U',
        'Velocity first, then a curve, then balance',
        'Pickoff moves, sidearm as a taught slot, and a slider',
        'Balance point, stride direction (foot points at the catcher), and follow-through. Leave hip timing, arm slot, and release-point science alone.'
      ],
      answer: 3,
      explain: 'Youth pitching is a repeatable, safe throw from a rubber, not a showcase. Command beats velocity. Cue: "tall and balanced before you go," "step to the plate," "hand ends up near your opposite pocket." Hip-before-shoulder arrives at 11–13U.',
      source: 'pitching-mechanics'
    },
    {
      id: 'q1206',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 6,
      type: 'mc',
      prompt: 'A 10U pitcher wants a curveball because it gets swinging strikes in this league. What does Pitch Smart say?',
      choices: [
        'Teach it — neither Baseball Canada nor Little League bans pitch types by rule, so it is fair game',
        'Do not teach breaking balls at this age. Four-seam first; changeup is the second pitch later, and only with fastball arm speed.',
        'A slider is safer than a curve at 10U',
        'One curve per inning is fine if the daily count is low'
      ],
      answer: 1,
      explain: 'No pathway bans pitch types by rule. Pitch Smart still says under 10: four-seam (two-seam only once that is repeatable); avoid all breaking balls. A curve at 9–14 was tied to a 52% increase in shoulder pain; a slider to an 86% increase in elbow pain. Short-term strikeouts are a growth-plate bill.',
      source: 'pitch-types-by-age'
    },
    {
      id: 'q1207',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'A Baseball Canada 11U pitcher is at 80 pitches in the outing. What is true?',
      choices: [
        'Legal — 11U max is 85',
        'Legal if they finish the batter they have not started yet',
        'Over the daily max of 75; ineligible to pitch the rest of that calendar day',
        'Legal because Little League ages 11–12 max is 85, and the pathways share one table'
      ],
      answer: 2,
      explain: 'Baseball Canada 11U daily maximum is 75. Exceeding a limit ends pitching eligibility for the rest of that calendar day. The 85 max is 13U Boys / 14U Girls (BC) or Little League ages 11–12. Finish-the-batter applies when they reach the limit mid-batter, not as a licence to keep going past 75.',
      source: 'pitch-count-rules'
    },
    {
      id: 'q1208',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'rules',
      difficulty: 7,
      type: 'mc',
      prompt: 'A Little League pitcher, league age 12, has thrown 41 pitches. May they catch later the same calendar day?',
      choices: [
        'No. 41 or more pitches ends catching eligibility for the rest of that day.',
        'Yes — Baseball Canada has no crossover, so neither does Little League',
        'Yes, if they caught fewer than four innings first',
        'Yes, always'
      ],
      answer: 0,
      explain: 'Little League Regulation VI.a: 41 or more pitches in a day makes a player ineligible to play catcher the rest of that day. Finish-the-batter grace exists if they hit 40 mid-batter. Baseball Canada Section 4.4 has no equivalent crossover rule — that difference is the point, not a reason to ignore Little League.',
      source: 'pitch-count-rules'
    },
    {
      id: 'q1209',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'safety',
      difficulty: 6,
      type: 'scenario',
      prompt: 'Your 11U house-league ace can throw strikes. Hitters in this league cannot hit a curve. A parent asks you to "add a breaker so we can win the qualifier." What do you do?',
      choices: [
        'Add a slider — it is "just a fastball that moves"',
        'Add a 12-to-6 curve at 20% of pitches so the growth plates "get used to it"',
        'Teach a splitter because small hands already spread on a four-seam',
        'Do not. The second pitch is a changeup: same arm speed, the grip does the work. Curveball is 13–14 with a clean arm path and a body that has actually matured. Slider is 15U+.'
      ],
      answer: 3,
      explain: 'There is no rulebook to hide behind. There is Pitch Smart, and there is the arm you are borrowing. Changeup uses a fastball arm action; "slow the arm down" is the wrong cue. Look at the growth spurt, not the birthday, before any curve.',
      source: 'pitch-types-by-age'
    },
    {
      id: 'q1210',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'baserunning',
      difficulty: 4,
      type: 'mc',
      prompt: 'There is a runner on. A single is hit in front of the left fielder. What is the outfield principle that keeps that runner from taking extra bases you handed over?',
      choices: [
        'Crash the fence blindly so the runner "knows you are aggressive"',
        'Keep the ball in front of you. A single in front of you is a single. A ball that squirts to the fence is extra bases.',
        'Banana around it and throw to the backstop',
        'Let it bounce off the wall first; fence play is an 8U skill'
      ],
      answer: 1,
      explain: 'Do not let the ball get past you with a runner on. Fence awareness itself is a taught skill at 12–14U, and only after a safety walk-through. Until then, play it off the wall by keeping your body between the ball and the extra base.',
      source: 'outfield-play'
    },
    {
      id: 'q1211',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 5,
      type: 'mc',
      prompt: 'When you introduce a changeup (10–12U), what makes it slower than the fastball?',
      choices: [
        'Taking something off the arm so the hitter sees a different slot',
        'Pronating like a curve so it "tumbles"',
        'Fastball arm speed; the grip does the work (circle or three-finger for small hands)',
        'A spike-curve grip with the first knuckle buried in the leather'
      ],
      answer: 2,
      explain: 'Teaching a pitcher to slow the arm down for a changeup creates mechanical inconsistency and a readable slot. Throw it as hard as the fastball. Circle change is common; three-finger change suits small hands. Curve, slider, and splitter are still not yet at 11–12U.',
      source: 'pitch-types-by-age'
    },
    {
      id: 'q1212',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'rules',
      difficulty: 6,
      type: 'mc',
      prompt: 'A Little League player caught four innings (one pitch received in the fourth counts as an inning caught). May they pitch later that calendar day?',
      choices: [
        'No. Catching four or more innings ends pitching eligibility for the rest of that day.',
        'Yes, up to 85 pitches',
        'Yes, if they stay under 21 pitches',
        'Yes — this gate exists only in Baseball Canada'
      ],
      answer: 0,
      explain: 'Little League catch-to-pitch gate: 4 or more innings caught makes the player ineligible to pitch the rest of that calendar day. Warm-up pitches do not count as innings caught. If they caught 3 innings or fewer, then pitched 21 or more, they may not return to catcher. Baseball Canada Section 4.4 has no crossover rule.',
      source: 'pitch-count-rules'
    },
    {
      id: 'q1213',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'fielding',
      difficulty: 6,
      type: 'mc',
      prompt: 'When do you introduce fence awareness and a do-or-die throw?',
      choices: [
        'At 6–9U, the first time a ball goes to the wall in a game',
        'At 9–11U, before drop-step and crow-hop exist',
        'At 11–12U, as the first outfield skill, before communication',
        '12–14U, and only after a safety walk-through at practice. Do-or-die is a drilled throw, not a first-game invention.'
      ],
      answer: 3,
      explain: 'Call it before you crow-hop. Crow-hop before you do-or-die. Fence work after a walk-through, never as a first-game surprise. The 11–12U outfield roadmap still lists fence awareness and do-or-die as not yet.',
      source: 'skill-roadmap-fielding-outfield'
    },
    {
      id: 'q1214',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'pitching',
      difficulty: 3,
      type: 'mc',
      prompt: 'A 12-year-old is overthrowing. What do you ask for instead of "throw harder"?',
      choices: [
        'A shorter arm and a stopped follow-through',
        'A taller balance, a step to the plate, a longer arm, a real finish. Velocity follows. Never ask a pitcher under 14 to throw harder.',
        'A curveball so they can "pitch instead of throw"',
        'Year-round showcasing so college coaches can see the velo'
      ],
      answer: 1,
      explain: 'Two coaching errors share a root: chasing outs now. Teaching a 10U curve, and yelling "throw harder" at a 12-year-old, both buy this week with next year\'s elbow. Flying open, short-arming, rushing, and cutting off the follow-through are the faults that stress the elbow.',
      source: 'pitching-mechanics'
    },
    {
      id: 'q1215',
      chapter: 'ch12',
      tier: 'diamond',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'A Little League pitcher, league age 12, threw 18 pitches Friday and 15 Saturday (both 0-day-rest counts). May they pitch Sunday?',
      choices: [
        'Yes — each day was 1–20, so 0 days rest, and three days in a row is fine',
        'Yes, up to 85 more, if they did not catch',
        'No. Little League does not allow pitching on three consecutive days, even when each outing is in the 0-day-rest band.',
        'Only if the first two days total 25 or fewer, as in Baseball Canada 11U'
      ],
      answer: 2,
      explain: 'Little League Regulation VI: no pitching on three consecutive days. Baseball Canada allows three consecutive days only if the first two days total at or under 25 (11U), 30 (13U), 35 (15U), 40 (18U), or 45 (22U). Confirm which pathway the game is played under before you use either table.',
      source: 'pitch-count-rules'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
