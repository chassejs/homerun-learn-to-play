/* ===================================================================
   Homerun Learn to Play — curriculum-t3.js
   Tier 3 (Diamond) chapters 9–12. Registers onto HRL_CURRICULUM.
   ES5-safe. Load after curriculum-data.js in the same process.
   Content sourced from youth-baseball-canada wiki concept pages
   and skill-roadmap syntheses.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var cur = root.HRL_CURRICULUM;

  if (!cur || typeof cur.register !== 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = cur || null;
    }
    return;
  }

  cur.register([

    /* -------------------------------------------------------------- */
    /* ch09 — Hitting Fundamentals                                     */
    /* -------------------------------------------------------------- */
    {
      id: 'ch09',
      tier: 'diamond',
      order: 9,
      title: 'Hitting Fundamentals',
      subtitle: 'Stance to finish, and what to work on first',
      minutes: 12,
      objectives: [
        'After this chapter you can set a balanced stance and a door-knuckle grip, and name the five swing frames in order.',
        'After this chapter you can say why the load and the stride exist, and what the bat path actually is.',
        'After this chapter you can place contact for an inside, middle, and outside pitch.',
        'After this chapter you can run the tee-to-live progression, and name what not to teach yet by age band.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Grip and stance — the parts you can set before the pitch',
          body: [
            'Hold the bat so the door-knocking knuckles — the second-knuckle row of each hand — line up. Grip pressure is about a five out of ten. Hold it like a bird: tight enough that it cannot fly, loose enough that you do not crush it. A death grip tenses the forearms and slows the barrel.',
            'Stand in an athletic ready position. Feet are shoulder-width or a little wider, toes toward the pitcher or slightly open, knees flexed, hips a shade lower than standing height. Weight is even, or a touch on the back leg. The bat sits at about 45 degrees, not flat on the shoulder.',
            'Both eyes face the pitcher. Chin stays close to the front shoulder so you can track the ball with both eyes. Cover the plate from that stance: if you can tap the far edge of the plate with the barrel without drifting, you have enough reach. If you cannot, inch closer. If you are crowding it, inch off.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Five frames: stance, load, stride, contact, finish',
          svg: 'swingSequence',
          opts: {
            showLabels: true,
            highlight: 'contact',
            title: 'The swing sequence',
            desc: 'Five side-by-side frames of a swing: stance, load, stride, contact, and finish, each with a coaching cue.'
          },
          caption: 'Teach the swing as five pictures in order. Stance is athletic, eyes on the pitcher. Load is weight back, hands back. Stride is a small step to the pitcher, staying closed. Contact is short to the ball with a firm front side. Finish is high, still balanced.'
        },
        {
          type: 'prose',
          heading: 'The load, and the stride as a timing move',
          body: [
            'The load is a small move that stores energy. It starts as the pitcher’s arm commits. Hands go back behind the back shoulder. The knob points roughly at the catcher. A little weight shifts onto the back leg. Cue: “hands back as the pitcher throws.” A rubber band stretches first, then snaps.',
            'The stride is a timing move, not a lunge. Two to four inches is enough for most youth hitters. Land the front foot softly, then swing. The foot should be down when the pitch is about halfway to the plate. A no-stride approach — a weight shift with almost no foot move — is valid and often simpler for younger hitters.',
            'The rule that matters: land first, swing second. Lunging is the fault where the front foot and the weight both dump forward before the load is done. Cue: “soft landing — stride early, swing late.”'
          ]
        },
        {
          type: 'prose',
          heading: 'The path is not “level” and it is not a chop',
          body: [
            'The knob leads. Hands stay close to the body on the way to the ball — an inside-out path, not a loop away from the ribs. Cue: “pull the knob to the ball.”',
            'Through the hitting zone the barrel travels on a level to slightly upward path. A pitched ball is coming slightly down. A slight upward attack matches that path and gives the longest window for solid contact. A steep chop creates topspin grounders. An exaggerated uppercut produces pop-ups and swings under the ball.',
            'After contact, the arms extend through the ball. Do not stop at the hit. Finish with the hands high over the lead shoulder, the back heel up, the hips facing the pitcher, and the weight over the front leg. Stay balanced. If you fall through the box, the swing was a lunge dressed up as effort.'
          ]
        },
        {
          type: 'compare',
          heading: 'Two myths, one actual path',
          left: {
            title: 'What people tell kids',
            items: [
              '“Swing level” as if the barrel should saw the ball in half.',
              '“Chop down on it” to beat the uppercut.',
              'One frozen contact point for every pitch.'
            ]
          },
          right: {
            title: 'What to teach instead',
            items: [
              'Knob first, hands close, slight upward through the zone.',
              'A knee-high tee and “hit the bottom half” if the back shoulder is dipping.',
              'Inside: contact in front of the plate. Middle: front corner. Away: let it travel deeper.'
            ]
          }
        },
        {
          type: 'diagram',
          heading: 'Contact point by pitch location',
          svg: 'strikeZone',
          opts: {
            grid: 3,
            zoneRef: 'youth',
            showBatter: 'R',
            showZoneBox: true,
            title: 'Where the barrel meets an inside, middle, and outside pitch',
            desc: 'A Little League strike zone from the catcher’s view, with three in-play marks: inside, middle, and outside, for a right-handed batter.',
            pitches: [
              { x: 0.30, y: 0.44, call: 'in-play', n: '1' },
              { x: 0.50, y: 0.44, call: 'in-play', n: '2' },
              { x: 0.70, y: 0.44, call: 'in-play', n: '3' }
            ]
          },
          caption: 'Catcher’s view, right-handed batter. 1 is inside — contact slightly in front of the plate; the hips have to clear early. 2 is middle — roughly at the front corner. 3 is away — contact deeper, closer to the catcher; the hands stay through the ball longer. Cue for away: “let the outside pitch travel.”'
        },
        {
          type: 'steps',
          heading: 'Tee, then toss, then live — and the tee never retires',
          items: [
            {
              title: 'Tee',
              body: 'The ball is still. The hitter owns the timing. Set the tee top at mid-thigh to belt for the power zone, front edge even with the front of the plate. This is where stance, path, and contact live. It is also where older hitters still go to fix one piece. A player who is not ready for toss work goes back to the tee.'
            },
            {
              title: 'Soft toss',
              body: 'A feeder kneels at a 45-degree angle in front of the front hip and tosses a slow arc to the belt, slightly in front. Timing arrives, velocity does not. Cue: “let the ball reach the hitting zone — do not lunge at it.” Standard front-side soft toss is the 9U+ bridge off the tee.'
            },
            {
              title: 'Side toss',
              body: 'The feeder moves to the side, 45 to 90 degrees off the front hip. The ball arriving from the side keeps the hitter on the inside of the ball and discourages casting. Safety: the feeder stays well off the swing path, behind a screen if you have one. Age gate: 10U+.'
            },
            {
              title: 'Front toss',
              body: 'A coach tosses from in front of the plate, still under control, then progresses toward overhand coach-pitch. Location starts to vary. This is the last station before live. Keep the round short. Fatigued swings teach the wrong swing.'
            },
            {
              title: 'Live',
              body: 'Machine or coach-pitch batting practice, then game pitching. Live asks the hitter to solve timing, location, and (later) pitch type at once. Do not skip here to “make it game-like.” A hitter who cannot hit a tee ball on the outer third is not ready to read a live breaking ball.'
            }
          ]
        },
        {
          type: 'divisionnote',
          heading: 'What to introduce, and what not to teach yet',
          intro: 'Age-appropriateness is the work. Teaching a 7-year-old hip rotation is the most common youth hitting error. Use this table as a gate, not a dare.',
          columns: ['Age band', 'Introduce', 'Not yet'],
          rows: [
            ['5–8U (FUNdamentals)', 'Stance, step to the tee, bat-to-ball contact, swing finish. Cues: “watch the ball,” “stay balanced,” “swing all the way through.” Squash-the-bug is fine as a picture.', 'Hip rotation, weight-transfer lectures, location cues, two-strike approach.'],
            ['8–10U (Learn to Train)', 'Balanced load, bat path, soft-toss timing. Tee contact should become consistent. Cue: “stride toward the pitcher.” Start to catch stepping in the bucket.', 'Two-strike approach, plate discipline, pull versus opposite-field concepts.'],
            ['10–12U', 'Contact-point location (inside / middle / outside), one-hand tee, side toss. Two-strike (choke up about 2 inches, protect the zone) arrives at 11–12U. Opposite-field tee at 11U+.', 'Back toss and two-ball recognition before mechanics are sound. Count-based approach. Pitch-sequencing reads.'],
            ['12–14U (Train to Train)', 'Hip-rotation sequence — hips before hands — on a tee with a pause between load and swing. Back toss (wait). Two-ball recognition.', 'Advanced shift reads, on-deck pitch-mix prep.'],
            ['14U+', 'Count-based approach (2–0 hunt versus 2–2 protect), on-deck pitcher study, full approach: selection plus execution.', 'Nothing on this list is gated. Add work only as the earlier gates are actually met.']
          ]
        },
        {
          type: 'interactive',
          heading: 'Put the swing in order',
          widget: 'swingOrder',
          intro: 'The five frames are shuffled. Put them in the order the body actually moves. Check against the cue under each frame. If you can do this without looking, you can coach the next rep with one sentence, not five.',
          opts: {
            frames: ['frame-stance', 'frame-load', 'frame-stride', 'frame-contact', 'frame-finish'],
            cues: {
              'frame-stance': 'Athletic, eyes on the pitcher',
              'frame-load': 'Weight back, hands back',
              'frame-stride': 'Step to the pitcher, stay closed',
              'frame-contact': 'Short to the ball, firm front side',
              'frame-finish': 'High finish, stay balanced'
            },
            items: [
              { id: 'frame-stance', label: 'Stance', cue: 'Athletic, eyes on the pitcher' },
              { id: 'frame-load', label: 'Load', cue: 'Weight back, hands back' },
              { id: 'frame-stride', label: 'Stride', cue: 'Step to the pitcher, stay closed' },
              { id: 'frame-contact', label: 'Contact', cue: 'Short to the ball, firm front side' },
              { id: 'frame-finish', label: 'Finish', cue: 'High finish, stay balanced' }
            ]
          }
        },
        {
          type: 'example',
          heading: 'A 9U hitting block that does not skip',
          body: [
            'Four stations, 5–7 minutes each, three to five hitters per group: standard tee (belt-high, middle), one location variant (inside or outside), standard soft toss, then a short coach-pitch round. Under age 10, 10–15 quality swings per visit is enough. Over that, 15–20, then rest.',
            'A hitter who lunges at soft toss does not “need live reps to compete.” They go back to the tee until the front foot lands and the swing starts after. The tee is not a punishment. It is the microscope.',
            'Leave hip-rotation language in the bag. At 9U the load is “hands back as the pitcher throws.” That is the whole cue.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'The most common youth hitting mistake',
          body: [
            'Teaching a 7-year-old to rotate the hips is the mistake. At 5–8U the job is contact from a balanced stance. Hip-before-hands is a 12U+ power multiplier, and only after the path is already sound. Layering it early produces frozen kids who think about their belt while a ball is in the air.',
            'The second mistake is stacking cues. One point per round. “Watch the ball.” Next round, “swing all the way through.” Save “stay back,” location, and two-strike for the age that can use them.',
            'A bat that is too heavy makes uppercutting and lunging look like personality. Check the bat against the division stamp and the player’s size before you rewrite the swing.'
          ]
        },
        {
          type: 'terms',
          items: [
            'door-knocking-knuckles',
            'load',
            'stride',
            'bat-path',
            'contact-point',
            'batting-tee',
            'soft-toss',
            'hip-rotation'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Door-knocking knuckles aligned, grip about 5/10, athletic stance, eyes on the pitcher.',
            'Load stores energy: hands back as the pitcher throws. Stride is a timing step. Land the front foot, then swing.',
            'Knob first, hands close, level to slightly upward through the zone. Not a chop. Not a golf swing.',
            'Inside: contact in front. Middle: front corner. Away: let it travel deeper.',
            'Finish high and balanced. Weight over the front leg, back heel up.',
            'Progression: tee → soft toss → side toss → front toss → live. Never skip. The tee does not retire.',
            '5–8U: contact and balance only. Hip rotation waits until 12U+. One cue at a time.'
          ]
        }
      ],
      quizIds: ['q0901', 'q0902', 'q0903', 'q0904', 'q0905', 'q0906', 'q0907', 'q0908'],
      prev: 'ch08',
      next: 'ch10'
    },

    /* -------------------------------------------------------------- */
    /* ch10 — Throwing & Catching                                      */
    /* -------------------------------------------------------------- */
    {
      id: 'ch10',
      tier: 'diamond',
      order: 10,
      title: 'Throwing & Catching',
      subtitle: 'The four-seam grip, the arm path, and arm care',
      minutes: 12,
      objectives: [
        'After this chapter you can show a four-seam grip and the throwing sequence from separation to follow-through.',
        'After this chapter you can catch with two hands, above and below the waist, and watch the ball into the glove.',
        'After this chapter you can run a warm-up throwing progression and name the warning signs that mean stop.',
        'After this chapter you can look up rest after a pitch count, and say what not to teach yet by age.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Four-seam first — across the horseshoe',
          body: [
            'Index and middle fingers sit across the horseshoe seam — the wide part of the U. Thumb is underneath on the leather, opposite the index finger. The ball lives on the fingertips, not in the palm. You should see daylight between leather and palm. Cue: “fingertips — daylight between ball and palm.”',
            'Small hands (often 6–9U) may use a third finger. Move to two fingers as the hand grows. Pressure is the bird again: firm enough to control, loose enough for a wrist snap at release.',
            'Four seams through the air make backspin. The ball flies straighter, carries, and arrives on target. A palm ball is a dead throw: it tumbles, dies, and drops short. Two-seam (fingers along the narrow seams) adds run and sink, and it waits. The roadmap does not introduce two-seam until 13U+, and only after four-seam is automatic.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The throw, with the grip in the first frame',
          svg: 'throwSequence',
          opts: {
            showGrip: true,
            showLabels: true,
            highlight: 'grip',
            title: 'Throwing sequence with four-seam grip',
            desc: 'Five frames of a throw — grip, separation, stride, release, and follow-through — with a four-seam grip inset on the grip frame.'
          },
          caption: 'Grip: four-seam across the horseshoe. Separation: hands break, glove toward the target, throwing hand down, back, and up — “thumb to the thigh.” Stride: long step, glove-side to the target. Release: out front, fingers behind the ball. Follow-through: chest to the glove, throwing hand toward the opposite knee.'
        },
        {
          type: 'prose',
          heading: 'Glove-side lead, then the arm path',
          body: [
            'Point the glove-side shoulder at the target. Feet line up to that target. Eyes stay there. The glove arm extends toward the target as the throwing hand goes back. That front side staying closed is what keeps the throw from spraying. Cue: “stay closed; point your glove at the target.”',
            'The throwing elbow lifts to shoulder height or above. At the top, “show the ball to the sky.” Thumb is down on the way up; fingers are on top at release. Then the hips turn toward the target first, and the arm follows. Cue: “hips first, then hands.” An all-arm throw is both weaker and the injury pattern you are trying not to build.',
            'Release in front of the ear, glove side, fingers behind the ball. Throw through the target, to the receiver’s chest. Then keep going. Follow-through is the arm’s brakes. Stopping the arm at release is how the back of the shoulder gets hurt. Cue: “touch your opposite knee with your throwing hand.”'
          ]
        },
        {
          type: 'compare',
          heading: 'What the throw looks like when it is going wrong',
          left: {
            title: 'The cue that fixes it',
            items: [
              'Elbow up — show the ball to the sky.',
              'Step toward the target before you throw.',
              'Hips first, then hands.',
              'Finish near the opposite knee.'
            ]
          },
          right: {
            title: 'The youth fault',
            items: [
              'Dart-throwing: elbow down, like throwing a dart or a stone skipping. Elbow drop.',
              'Flat-footed: no step, no weight transfer. The arm does all the work.',
              'All-arm: chest opens, hips never fire. Short-arming is the cousin — the arm cuts off at release.',
              'Palm ball: no daylight, no carry.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Catching: two hands, give, watch it in',
          body: [
            'Catch the ball with two hands. Above the waist, fingers point up — a window, not a basket in front of the face. Below the waist, fingers point down. The infielder’s alligator is the same idea on the ground: glove below the ball, bare hand closing on top like a jaw, a few centimetres above the pocket, not a metre away.',
            'Give with the ball. Tight muscles are slow muscles. Cue from the knees drill: “fingers down, palm facing the ball; bring it to centre like catching an egg.” Watch it all the way into the glove. The kneeling-catch cue is the whole skill: “watch the ball all the way into your glove.”',
            'Catcher work is a later, extra layer: receiving stance, blocking, then throwing, in that order. At 10–11U, gear comfort, a low target, and blocking come before any throw-down. Do not start a new catcher on pop times.'
          ]
        },
        {
          type: 'steps',
          heading: 'Warm up the arm, then throw, then stop',
          items: [
            {
              title: 'Dynamic body first',
              body: 'Ten to fifteen minutes before the first competitive throw: jog, high knees, arm circles both ways, shoulder rolls, trunk turns, band pull-aparts if you have bands. Raise temperature. Move the shoulder and the upper back.'
            },
            {
              title: 'Short toss',
              body: 'Three to five minutes at about 20–30 feet. Easy, loose, clean path, full follow-through. Feel, not intent. This is not long toss and it is not a velocity contest.'
            },
            {
              title: 'Step back',
              body: 'Three to five minutes, walking the distance out to what the arm can do smoothly — often 60–90 feet at 10–13U, 90–120 feet at 15U+. Every throw still looks like a throw. If the arm slot drops, you have gone too far.'
            },
            {
              title: 'Then play',
              body: 'Only after the arm feels loose. Long toss (11U+, coach watching) belongs at the end of practice, in measured 10-foot jumps, and it counts as throwing volume. It is not a pre-game warm-up substitute.'
            }
          ]
        },
        {
          type: 'diagram',
          heading: 'Throwing, by age band',
          svg: 'timeline',
          opts: {
            title: 'Throwing development by age',
            highlight: 0,
            items: [
              { label: '5–8U', sub: 'Grip and step', marker: '1' },
              { label: '8–10U', sub: 'Elbow up, finish', marker: '2' },
              { label: '11–12U', sub: 'Hips then hands', marker: '3' },
              { label: '13U+', sub: 'Release point', marker: '4' }
            ]
          },
          caption: 'Start with grip and a step toward the target. Elbow-up and follow-through come next. Hip-leads-shoulder and long toss wait until 11U+. Release-point tweaks and two-seam wait until 13U+.'
        },
        {
          type: 'divisionnote',
          heading: 'Throwing: introduce versus not yet',
          intro: 'The same arm cannot learn everything at once. Distance is earned by accuracy, not by effort.',
          columns: ['Age band', 'Introduce', 'Not yet'],
          rows: [
            ['5–8U', 'Four-seam (or three-finger), overhand release, step toward the target. Begin at 10–15 feet. Freeze-at-the-T if you need a picture of separation.', 'Hip rotation, arm-path lectures, follow-through mechanics as a checklist, long toss, velocity.'],
            ['8–10U', 'Elbow-up cocking (“show the ball to the sky”), follow-through to the opposite knee, step-and-throw footwork. One-knee throwing to isolate the path.', 'Long toss, shuffle throw, skip-step.'],
            ['11–12U', 'Hip-leads-shoulder (dry rotation first), infielder replace-step, outfielder crow-hop, long toss 50–100 feet with a coach.', 'Off-balance throws, two-seam grip.'],
            ['13U+', 'Release point as a choice, skip-step for off-balance, two-seam optional, relay accuracy.', 'Nothing on this list is gated if the earlier path is clean.']
          ]
        },
        {
          type: 'interactive',
          heading: 'Arm-care check: rest, limits, and stop signs',
          widget: 'armCareCheck',
          intro: 'Pitch-count tables are the legal floor. Pain is a stop sign even when the count is low. Use the numbers from Baseball Canada Section 4.4 and Little League Regulation VI — not a guess.',
          opts: {
            cases: [
              {
                id: 'pain-stop',
                age: 11,
                division: 'Any pathway',
                pitches: 12,
                daysRest: 0,
                question: 'An 11-year-old has thrown 12 pitches and reports inner-elbow pain. The count is well under the daily max. What do you do?',
                choices: [
                  'Finish the inning — the count is low',
                  'Switch to changeups and continue',
                  'Remove immediately; no more throwing today',
                  'Ice for five minutes and send them back out'
                ],
                answer: 'Remove immediately; no more throwing today',
                explain: 'Pain during or after throwing is always a signal to stop. Inner-elbow pain is a UCL / medial-apophysis warning. Count does not override pain. Do not pitch through it.',
                source: 'arm-care-and-injury-prevention'
              },
              {
                id: 'bc-11u-20',
                age: 11,
                division: 'Baseball Canada 11U',
                pitches: 20,
                daysRest: 0,
                question: 'A Baseball Canada 11U pitcher threw 20 pitches today. How many full calendar days of rest before they may pitch again?',
                choices: ['0 days', '1 day', '2 days', '3 days', '4 days'],
                answer: '0 days',
                explain: 'Baseball Canada 11U: 1–25 pitches require 0 days of rest. Rest days run from 12:01 am to 11:59 pm.',
                source: 'pitch-count-rules'
              },
              {
                id: 'bc-11u-30',
                age: 11,
                division: 'Baseball Canada 11U',
                pitches: 30,
                daysRest: 1,
                question: 'A Baseball Canada 11U pitcher threw 30 pitches today. How many full calendar days of rest before they may pitch again?',
                choices: ['0 days', '1 day', '2 days', '3 days', '4 days'],
                answer: '1 day',
                explain: 'Baseball Canada 11U rest bands: 1–25 = 0 days, 26–40 = 1 day, 41–55 = 2, 56–65 = 3, 66–75 = 4. Thirty sits in 26–40. Daily max is 75.',
                source: 'pitch-count-rules'
              },
              {
                id: 'bc-11u-50',
                age: 11,
                division: 'Baseball Canada 11U',
                pitches: 50,
                daysRest: 2,
                question: 'A Baseball Canada 11U pitcher threw 50 pitches today. How many full calendar days of rest?',
                choices: ['0 days', '1 day', '2 days', '3 days', '4 days'],
                answer: '2 days',
                explain: '11U: 41–55 pitches require 2 days of rest. Fifty is inside that band.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-10-40',
                age: 10,
                division: 'Little League, league age 10',
                pitches: 40,
                daysRest: 2,
                question: 'A Little League pitcher, league age 10, threw 40 pitches. How many days of rest? (League age 14 and under rest table.)',
                choices: ['0 days', '1 day', '2 days', '3 days', '4 days'],
                answer: '2 days',
                explain: 'Little League, league age 14 and under: 1–20 = 0 days, 21–35 = 1, 36–50 = 2, 51–65 = 3, 66+ = 4. Forty sits in 36–50. Daily max for ages 9–10 is 75.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-12-70',
                age: 12,
                division: 'Little League, league age 12',
                pitches: 70,
                daysRest: 4,
                question: 'A Little League pitcher, league age 12, threw 70 pitches. How many days of rest?',
                choices: ['1 day', '2 days', '3 days', '4 days'],
                answer: '4 days',
                explain: 'League age 14 and under: 66 or more pitches require 4 days of rest. Daily max for ages 11–12 is 85, so 70 is legal for the day and still costs four rest days.',
                source: 'pitch-count-rules'
              },
              {
                id: 'long-toss-not-warmup',
                age: 12,
                division: 'Baseball Canada 11U / 13U practice',
                pitches: 0,
                daysRest: 0,
                question: 'A 12U coach wants to skip short-toss warm-up and “just long-toss to get loose” before a game. Is that the arm-care plan?',
                choices: [
                  'Yes — long toss is the best warm-up',
                  'No — long toss is a training tool at the end of practice, 11U+, and it counts as throwing volume',
                  'Yes, if they stay under 100 feet',
                  'Only on days they will not pitch'
                ],
                answer: 'No — long toss is a training tool at the end of practice, 11U+, and it counts as throwing volume',
                explain: 'Warm-up is dynamic work, then short toss, then a step-back. Long toss is not a warm-up substitute. It is coach-supervised, 11U+, and it counts toward weekly arm load.',
                source: 'arm-care-and-injury-prevention'
              },
              {
                id: 'velocity-drop',
                age: 13,
                division: 'Any',
                pitches: 35,
                daysRest: 0,
                question: 'A pitcher who was locating at the start of the outing suddenly loses velocity and the arm slot drops, with no reported pain. What do you do?',
                choices: [
                  'Leave them in — they did not say it hurt',
                  'Remove them; a sudden velocity drop is a stop signal',
                  'Tell them to throw harder to get the velo back',
                  'Switch them to catcher to keep them in the game'
                ],
                answer: 'Remove them; a sudden velocity drop is a stop signal',
                explain: 'Sudden unexplained velocity drop is listed with medial elbow pain, shoulder pain, numbness, and a dead arm as an immediate removal cue. Youth players under-report pain. Fatigue mechanics are the warning you can see.',
                source: 'arm-care-and-injury-prevention'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: '“My arm is a bit sore” after 18 pitches',
          body: [
            'The pitcher is 11, Baseball Canada 11U, 18 pitches, well inside 1–25 (0 days rest) and the daily max of 75. They say the inside of the elbow is “just tight.”',
            'They come out. Tight and pain are not a debate on the mound. You do not finish the batter to save a rest day. You do not move them to catcher to “keep them in.” Little League would also block catching after 41 pitches; here the count is low, and Pitch Smart still says not to pile catcher and pitcher load on the same arm in the same game.',
            'Next throwing session waits on how the arm feels, not on the table. The table is the minimum. Arm care is the ceiling.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'Pain is a stop signal — say it out loud before the season',
          body: [
            'Write this for parents and players on day one: a player who says the arm hurts comes out. No exceptions. No “one more batter.” No showcasing through tightness. Youth players hide pain to stay in. Ask, every outing: “arm feel okay? any tightness?”',
            'Red flags that end the day: inner-elbow pain, back-of-elbow pain, pain at the front of the shoulder, sudden velocity drop, numbness or tingling in the hand, or the arm “going dead” in warm-up.',
            'Pitch Smart also wants 2–3 months a year with no overhead throwing, and no pitching more than 9 months in 12. Year-round mound work is one of the strongest UCL-injury predictors. The rest table does not see fall ball.'
          ]
        },
        {
          type: 'terms',
          items: [
            'four-seam-grip',
            'two-seam-grip',
            'arm-path',
            'follow-through',
            'short-arming',
            'two-hand-catch',
            'arm-care',
            'growth-plate',
            'pitch-count'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Four-seam: fingers across the horseshoe, thumb under, daylight to the palm. That ball carries straight.',
            'Glove-side shoulder at the target, step to the target, elbow up, fingers on top at release, finish to the opposite knee.',
            'Youth faults: dart-throwing (elbow down), all-arm, short-arming, palm balls, throwing flat-footed.',
            'Catch with two hands. Fingers up above the waist, fingers down below. Give. Watch it in.',
            'Warm up 10–15 minutes: body, short toss, step back. Long toss is practice, 11U+, not a pre-game shortcut.',
            'Pain, numbness, a dead arm, or a sudden velocity drop: stop. Count does not override that.',
            '5–8U: grip and step only. Hips-then-hands and long toss wait until 11U+. Two-seam waits until 13U+.'
          ]
        }
      ],
      quizIds: ['q1001', 'q1002', 'q1003', 'q1004', 'q1005', 'q1006', 'q1007', 'q1008'],
      prev: 'ch09',
      next: 'ch11'
    },

    /* -------------------------------------------------------------- */
    /* ch11 — Playing the Infield                                      */
    /* -------------------------------------------------------------- */
    {
      id: 'ch11',
      tier: 'diamond',
      order: 11,
      title: 'Playing the Infield',
      subtitle: 'Ready position, the triangle, and the exchange',
      minutes: 11,
      objectives: [
        'After this chapter you can get into a ready position and creep with the pitch.',
        'After this chapter you can field through the ball, funnel to the chest, exchange, and throw.',
        'After this chapter you can name pop-up priority and introduce a double-play feed without rushing live speed.',
        'After this chapter you can say which infield skills wait until 11U and which wait until 13U.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Ready before the pitch, then a creep',
          body: [
            'Every infield rep starts in a ready position before the pitcher lets go. Feet a little wider than the shoulders, weight on the balls of the feet, knees bent, glove out in front at about the waist, fingers down and open to the batter. Eyes up, on the contact zone. Flat feet and a high chest are how you start late.',
            'Creep into it. As the pitcher’s front foot lands, take a small weight-transfer step. That tiny move is the difference between a standing start and a first step that is already underway. Cue: “creep with the pitch.”',
            'The ready position does two jobs: it loads the legs for a first step either way, and it shortens the path the glove has to travel to a ground ball.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Where the infield stands',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            positions: true,
            positionStyle: 'both',
            title: 'Standard infield positioning',
            desc: 'A youth diamond with all nine fielders at standard depth, labelled with position number and abbreviation, viewed from behind home plate.'
          },
          caption: 'Standard depth, Little League Major grid. The infield is first (3), second (4), third (5), and shortstop (6), with the pitcher and catcher on the dirt. Chapter 13 covers infield-in, double-play depth, and bunt defence. This chapter is how those four actually field the ball.'
        },
        {
          type: 'prose',
          heading: 'Get in front, drop the hips, build the triangle',
          body: [
            'Get your body in front of the ball. Charge the ones you can. Waiting on a grounder lets the bad hop grow. Cue: “work through the ball.” For a ball to the glove side, most youth fielders should round behind it and take a forehand. A true backhand dive waits until 13U+.',
            'Drop the hips early so the glove is already at or below the ball before the hop. The common fault is a straight back and a last-second reach. Cue: “hands below the ball.”',
            'The fielding triangle is two feet and a glove, with the ball out in front and slightly to the glove side — not between the feet, not on the throwing-hand hip. Alligator the catch: bare hand a few centimetres above the glove, closing like a jaw. That is two hands, and it is how the exchange starts.'
          ]
        },
        {
          type: 'steps',
          heading: 'Field, funnel, exchange, throw',
          items: [
            {
              title: 'Field',
              body: 'Glove on the ground, hips down, ball in the triangle, slightly glove-side. Two hands. Do not field it off to the throwing side and then try to catch up.'
            },
            {
              title: 'Funnel',
              body: 'Bring the ball to the centre of the chest, like catching an egg and carrying it home. Soft hands. The glove and the throwing hand meet there, not at the shoelaces and not out by the ear.'
            },
            {
              title: 'Exchange',
              body: 'The ball moves from glove to throwing hand at the chest. Find four-seam during the transfer. Cue: “confirm your four-seam grip during the transfer — no palm balls.”'
            },
            {
              title: 'Throw',
              body: 'Replace the feet: throwing-side foot takes the place of the glove-side foot as you turn to the target. Then step with the glove-side foot and throw on a line to the chest. Shuffle (jab, crossover, throw) when you have charged or you are close to a bag. Skip-step is the off-balance save — 13U+ as a taught skill.'
            }
          ]
        },
        {
          type: 'prose',
          heading: 'Short hops, backhands, and the first-base stretch',
          body: [
            'A short hop is the ball that bites just in front of the glove. Stay down, fingers down, relaxed. Cue: “tight muscles are slow muscles.” Flipping the glove up is the miss. Teach this on the knees first (Ozzie / kneeling short hops), then on the feet. 8U+.',
            'Backhand: turn, stay low, nose at the ball, back flat. Age gate: 11U+ as a taught skill. Before that, round it and take a forehand whenever the ball lets you.',
            'First base, on a throw: give a low, wide target. Stay on the bag until the throw is in the air, then stretch toward the ball with a foot still on the bag. Scoop the short hop; do not pull the foot early. On a ball to the right side, first decides whether to field and feed the pitcher covering, or to take it themselves. The 3-6-3 and the step-off versus stay-on read wait until 13U+.'
          ]
        },
        {
          type: 'diagram',
          heading: 'A 6-4-3 feed — introduce, do not gun it',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            positionStyle: 'abbr',
            alignment: 'dp-depth',
            runners: ['first'],
            ball: 'ss-hole',
            arrows: [
              { from: 'ss', to: '2b', style: 'throw' },
              { from: '2b', to: '1b', style: 'throw' }
            ],
            title: 'Double-play feed, shortstop to second to first',
            desc: 'A diamond at double-play depth with a runner on first, a ball in the shortstop hole, and throw arrows from shortstop to second and from second to first.'
          },
          caption: '6-4-3: shortstop fields, feeds the second baseman covering, who turns and throws to first. Feed the ball to the chest on the glove side — not at the bag. Walk this through dry at 11–12U. Live speed and contact with a sliding runner wait until 13U+. Chapter 13 covers the depth and who covers.'
        },
        {
          type: 'prose',
          heading: 'Who calls it, and who has priority',
          body: [
            'On a pop-up, call it early and loud: “I got it!” and say it again. The first real call wins. Everyone else gets off and stays ready in case of a drop.',
            'Priority, from the infield page: the catcher calls off everyone on a pop-up behind the plate. Shortstop and second have priority over the corners in the middle of the diamond. Outfielders have priority over infielders on anything they can take on the grass — the outfielder is coming in and sees it better.',
            'Walk the order before you hit live flies. 11U+ for the full priority talk. 8–10U is still “call it and catch it with two hands.”'
          ]
        },
        {
          type: 'interactive',
          heading: 'Place the infield',
          widget: 'placeThePositions',
          intro: 'Only the dirt jobs: pitcher, catcher, and the four infielders. Drop each token on its spot. The outfield waits. Use number and name.',
          opts: {
            mode: 'infield',
            positions: ['p', 'c', '1b', '2b', '3b', 'ss'],
            diagram: {
              svg: 'field',
              opts: {
                preset: 'major-ll',
                positions: true,
                positionStyle: 'abbr',
                labels: true
              }
            },
            items: [
              { id: 'p', number: 1, name: 'Pitcher', hint: 'On the mound. First infielder to the ball on a comebacker. Covers first on a ball to the right side.' },
              { id: 'c', number: 2, name: 'Catcher', hint: 'Behind the plate. Calls off everyone on a pop-up behind home. Priority on those balls.' },
              { id: '1b', number: 3, name: 'First Base', hint: 'Right side of the diamond. Low target, scoops short hops, stretches while a foot stays on the bag.' },
              { id: '2b', number: 4, name: 'Second Base', hint: 'First-base side of second. Pivot on a 6-4-3. Feeds and turns; walk-through before live.' },
              { id: '3b', number: 5, name: 'Third Base', hint: 'The hot corner. Longest infield throw. Charges bunts and slow rollers — that charge is 12U+ as a taught skill.' },
              { id: 'ss', number: 6, name: 'Shortstop', hint: 'Third-base side of second. Most range. The 6 in 6-4-3. First infielder to get shuffle-throw language (11U).' }
            ]
          }
        },
        {
          type: 'divisionnote',
          heading: 'Infield skills by age — including not yet',
          intro: 'Rolled balls before fungoes. One throw direction before the whole diamond. Live double plays are a late skill, not a house-league badge.',
          columns: ['Age band', 'Introduce', 'Not yet'],
          rows: [
            ['8–10U', 'Ready position and creep, fingers-down glove, alligator, charge, throw to first only. Hands-routine on the knees, then a wide base. Short hops, slow and predictable.', 'Backhand as a taught skill, double-play, range-as-identity, fungoes from home, skip-step.'],
            ['10–12U', 'Right-left to field, right-left to throw. Short fungo. Across-the-horn. Pop-up priority. 11–12U: backhand, circle drill, dry double-play walk-through.', 'Live double-play at game speed, slow-roller barehand, skip-step as a programmed skill.'],
            ['12–14U', 'Full fungo, slow-roller charge (barehand option), live DP feeds (5-4-3 and 6-4-3).', 'Nothing on the infield list is still gated if the walk-through was real.'],
            ['13U+', '5-unassisted / 3-6-3 live, skip-step off balance, reading pull versus push before the pitch.', '—']
          ]
        },
        {
          type: 'example',
          heading: 'Turning two at 11U — the walk-through',
          body: [
            'Runner on first. You hit a grounder to the shortstop. At 11U this is a dry 6-4-3: no runner sliding, no stopwatch. Shortstop fields, feeds the second baseman’s glove-side chest. Second baseman straddles or steps across, touches the bag, throws to first.',
            'If the feed is at the bag instead of at the chest, stop and redo. The pivot cannot catch a throw that arrives at their shins and still clear a runner who is not even there yet.',
            'Live speed with a real runner waits. Contact at the bag is a real risk. The skill roadmap is blunt: not yet.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'Do not let them wait on it',
          body: [
            'The house-league infielder who stands up, watches the hop, then reaches is late by design. Teach charge and hips-down before you teach a pretty arm. Rolled balls, then short fungoes, then the real ones.',
            'Two hands on every grounder at 8–10U. One-hand pickups are not a personality. They are a later option on a slow roller at 12U+.',
            'One throw to first until the triangle and the exchange are boring. Across-the-horn is a 10U+ treat, not day one.'
          ]
        },
        {
          type: 'terms',
          items: [
            'ready-position',
            'fielding-triangle',
            'alligator-method',
            'funnel',
            'exchange',
            'short-hop',
            'backhand',
            'double-play-feed',
            'pop-up-priority'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Ready: wide, on the toes, glove out, fingers down. Creep as the pitcher lands.',
            'Get in front. Work through the ball. Hips down early. Hands below the ball.',
            'Triangle: two feet and a glove, ball out front and slightly glove-side. Alligator. Funnel to the chest. Exchange. Four-seam. Replace, step, throw.',
            'Short hops: stay down, fingers down. Backhand is 11U+. Skip-step and live DP are 13U+.',
            'First base: low target, foot on the bag, stretch to the throw, scoop the hop.',
            'Call “I got it!” Catcher owns the area behind the plate. Middle infielders own the middle. Outfielders own the grass.',
            '8–10U: rolled balls to first. Dry DP at 11–12U. Live turning two at 13U+. Chapter 13 is depth and positioning.'
          ]
        }
      ],
      quizIds: ['q1101', 'q1102', 'q1103', 'q1104', 'q1105', 'q1106', 'q1107'],
      prev: 'ch10',
      next: 'ch12'
    },

    /* -------------------------------------------------------------- */
    /* ch12 — The Outfield & Pitching Basics                           */
    /* -------------------------------------------------------------- */
    {
      id: 'ch12',
      tier: 'diamond',
      order: 12,
      title: 'The Outfield & Pitching Basics',
      subtitle: 'Routes, the crow hop, and the delivery',
      minutes: 13,
      objectives: [
        'After this chapter you can drop-step, take a route, catch above the throwing shoulder, and crow-hop to a cutoff.',
        'After this chapter you can name outfield communication and the do-not-let-it-past-you principle.',
        'After this chapter you can walk the pitching delivery from balance to follow-through, and say which pitches belong at which ages.',
        'After this chapter you can apply pitch-count limits and rest by pathway and division.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'First move back, then a route — not a banana',
          body: [
            'An outfielder’s ready position leans to go back. Going back is harder to fix than coming in. Feet shoulder-width, a real forward lean, weight on the toes. A tiny rocker step as the pitcher releases so you are not glued down at contact.',
            'If the ball is at or above your head, the first move is a drop-step: the back foot drops and opens to that side, hips open, then a crossover into a sprint. Do not backpedal. Cue: “first step is always back — you can always come forward, you can never get back.”',
            'Take a route. A looping curve that tours the gap is how extra-base hits happen. Move immediately. Catch the ball while you are still moving, slightly in front of the throwing shoulder, at chest height, so the crow hop is already loaded. Camping under it and waiting kills the throw before it starts.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Outfield routes and the cutoff',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            positions: true,
            positionStyle: 'abbr',
            ball: 'left-center-gap',
            arrows: [
              { from: 'cf', to: 'left-center-gap', style: 'route' },
              { from: 'lf', to: 'left-center-gap', style: 'route' },
              { from: 'cf', to: 'ss', style: 'cut' }
            ],
            title: 'Gap route and a throw to the cutoff',
            desc: 'A youth diamond with nine fielders, a ball in the left-centre gap, route arrows from centre and left field to the ball, and a cutoff arrow from centre field toward the shortstop.'
          },
          caption: 'Ball in the left-centre gap. Both outfielders take a route. Centre field calls off the corner. The throw is a line to the cutoff’s chest (shortstop here), not a rainbow over the infield. Hitting the cutoff is the default. A miss over the cutoff is a gift of extra bases.'
        },
        {
          type: 'steps',
          heading: 'Crow hop: plant, hop, stride, throw',
          items: [
            {
              title: 'Catch to throw',
              body: 'Catch above the throwing shoulder, two hands, fingers up on anything over the waist. Below the waist, a low catch or a basket, depending on the angle. Watch it in.'
            },
            {
              title: 'Plant',
              body: 'The throwing-side foot plants as the catch happens. Four-seam in the glove before the hop. Youth tumbling throws are almost always a two-seam-by-accident.'
            },
            {
              title: 'Hop',
              body: 'A short driving hop onto that throwing-side foot. That is the crow hop. It turns run into throw. Stopping and then throwing leaves the legs out of the throw.'
            },
            {
              title: 'Stride and throw',
              body: 'Glove-side foot strides, hips turn, four-seam, line-drive throw to the cutoff’s chest. Follow through low. At 8–10U, the footwork pattern without a throw is enough. Connect it to a real throw at 11–12U.'
            }
          ]
        },
        {
          type: 'prose',
          heading: 'Call it, hit the cutoff, keep it in front',
          body: [
            '“I got it!” early, loud, more than once. Centre field calls off the corners. That is the rule of the outfield. On the grass-dirt line, the outfielder has priority over the infielder. Wave and call together. Left and right do not have an automatic deferral to each other; the first call wins, and centre still rules the gaps.',
            'Hit the cutoff. Direct to a base only when the throw is honestly short enough. Four-seam, on a line. Backing up is a job on every play: centre backs up second, left backs up third and centre, right backs up first. Sprint there without being asked.',
            'A runner on means do not let the ball get past you. Keep it in front. A single in front of you is a single. A ball that squirts to the fence is extra bases you handed over. Fence play itself is a taught skill at 12–14U, and only after a safety walk-through. Until then, play it off the wall by keeping your body between the ball and the extra base, not by crashing blindly.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Outfield: introduce versus not yet',
          intro: 'Call it before you crow-hop. Crow-hop before you do-or-die. Fence work after a walk-through, never as a first game surprise.',
          columns: ['Age band', 'Introduce', 'Not yet'],
          rows: [
            ['6–9U', 'Loud “I got it,” overhead tracking, first-step reaction. Catch-the-cloud, kneeling catch, directional call-outs.', 'Drop-step technique, crow-hop, priority rules as a hierarchy.'],
            ['9–11U', 'Drop-step (back foot drops first), stationary crow hop (dry then partner), fly-ball communication walk-through.', 'Reverse drop-step, game-situation throws, do-or-die.'],
            ['11–12U', 'Misread recovery, gap communication, crow hop plus relay accuracy.', 'Fence awareness before a safety walk-through, do-or-die.'],
            ['12–14U', 'Fence awareness, sun, do-or-die, tag-up throw, wave-off, full relay.', 'Ball-type recognition before the movement foundation is real.'],
            ['13U+', 'Pre-contact reading, gate accuracy, shade by hitter.', '—']
          ]
        },
        {
          type: 'prose',
          heading: 'Pitching: balance, stride, separate, release',
          body: [
            'Youth pitching is a repeatable, safe throw from a rubber, not a showcase. Command beats velocity. Most youth hitters cannot barrel a well-located fastball. Strike-first means throw strikes with a four-seam and a plan to finish the pitch. Never ask a pitcher under 14 to “throw harder.” Ask for a taller balance, a step to the plate, a longer arm, a real finish. Velocity follows.',
            'Windup: pivot foot on the rubber, free foot in front. Set (stretch): pivot foot parallel to the rubber, glove-side foot in front, a complete stop with the hands together before delivering when runners are on. Teach three things at 8–10U: balance point, stride direction, follow-through. Leave hip timing, arm slot, and release-point science alone.',
            'Cue the chain. “Tall and balanced before you go.” “Step to the plate — your foot points at the catcher.” At 11–13U: “lead with your hip, then let your shoulder follow.” Arm: “loose arm — throw it like it is going to fly off.” Finish: “hand ends up near your opposite pocket.” Flying open, short-arming, rushing, and cutting off the follow-through are the faults that stress the elbow.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The delivery as a throw you already know',
          svg: 'throwSequence',
          opts: {
            showGrip: true,
            showLabels: true,
            highlight: 'stride',
            title: 'Pitching delivery chain',
            desc: 'Five frames of the throw used as a pitching-delivery picture: grip, separation from the balance point, stride to the plate, release, and follow-through, with a four-seam grip inset.'
          },
          caption: 'Same chain as Chapter 10, from the rubber. Grip a four-seam in the glove. Separation is the hands breaking from a tall balance point. Stride goes to the catcher, not toward first. Release is out front, fingers on top. Follow-through decelerates to the opposite hip. The stretch is this chain with a shorter leg lift — do not rush it.'
        },
        {
          type: 'divisionnote',
          heading: 'Pitch types by age (Pitch Smart — not a loophole)',
          intro: 'Neither Baseball Canada nor Little League bans pitch types by rule. Both point at Pitch Smart. Breaking-ball strikeouts at 10U are a growth-plate bill the pitcher pays later.',
          columns: ['Age band', 'Throw these', 'Not yet'],
          rows: [
            ['Under 10 (8U–10U)', 'Four-seam fastball. Two-seam only once four-seam is repeatable. Changeup only if the arm is clearly ready — default is wait.', 'Changeup as a standard second pitch. All breaking balls: curve, slider, splitter.'],
            ['10–12 (11U–12U)', 'Four-seam, two-seam, changeup (fastball arm speed; the grip slows it). Circle or three-finger change for small hands.', 'Curveball, slider, splitter. Pickoff moves as a project. Sidearm as a taught slot.'],
            ['13–14', 'Fastball, changeup. Curveball only with sound arm path and physical maturity — look at the growth spurt, not the birthday.', 'Slider, splitter / forkball, cut fastball before 14U.'],
            ['15U+', 'Fastball, changeup, curveball. Slider only after plates are largely fused, curve is already clean, and volume is not a tournament pile-up.', 'Splitter / forkball as a developmental pitch (discouraged under 18).']
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Pitch counts and required rest',
          intro: 'Confirm which pathway the game is played under. Baseball Canada bands by U-division (Section 4.4). Little League bands by league age (Regulation VI). Rest days are full calendar days, 12:01 am to 11:59 pm. A pitcher who reaches a limit mid-batter may finish that batter.',
          columns: ['Pathway', 'Band', '0-day rest', '4-day rest', 'Daily max'],
          rows: [
            ['Baseball Canada', '11U', '1–25 pitches', '66–75 pitches', '75'],
            ['Baseball Canada', '13U Boys / 14U Girls', '1–30', '76–85', '85'],
            ['Baseball Canada', '15U Boys / 16U Girls', '1–35', '81–95', '95'],
            ['Baseball Canada', '18U / 19U Women', '1–40', '86–105', '105'],
            ['Little League', 'League age 6–8', '1–20 (14-and-under table)', '66+', '50'],
            ['Little League', 'League age 9–10', '1–20', '66+', '75'],
            ['Little League', 'League age 11–12', '1–20', '66+', '85'],
            ['Little League', 'League age 13–16', '1–20 if 14-and-under; 1–30 if 15–16', '66+ (14u) or 76+ (15–16)', '95']
          ]
        },
        {
          type: 'interactive',
          heading: 'Pitching days: max, rest, and crossover',
          widget: 'armCareCheck',
          intro: 'These are pitching decisions, not just throwing. Use the table from the last section. Little League also gates catcher and pitcher on the same day. Baseball Canada Section 4.4 does not.',
          opts: {
            cases: [
              {
                id: 'bc-11u-over-max',
                age: 11,
                division: 'Baseball Canada 11U',
                pitches: 80,
                daysRest: 4,
                question: 'A Baseball Canada 11U pitcher is at 80 pitches in the outing. What is true?',
                choices: [
                  'Legal — 11U max is 85',
                  'Over the daily max of 75; ineligible to pitch the rest of that calendar day',
                  'Legal if they finish the batter',
                  'Legal because Little League 11–12 max is 85'
                ],
                answer: 'Over the daily max of 75; ineligible to pitch the rest of that calendar day',
                explain: 'Baseball Canada 11U daily maximum is 75. Exceeding a limit ends pitching eligibility for the rest of that calendar day. The 85 max is 13U Boys / 14U Girls (BC) or Little League ages 11–12. Finish-the-batter applies when they reach the limit mid-batter, not as a licence to keep going past 75.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-8-max',
                age: 8,
                division: 'Little League, league age 8',
                pitches: 50,
                daysRest: 2,
                question: 'A Little League pitcher, league age 8, has thrown 50 pitches. May they face another batter?',
                choices: [
                  'Yes — 6–8 max is 75',
                  'They have hit the daily maximum of 50; they may finish the current batter only',
                  'They must come out immediately, even mid-batter',
                  'Yes, if they caught earlier'
                ],
                answer: 'They have hit the daily maximum of 50; they may finish the current batter only',
                explain: 'Little League daily max for league age 6–8 is 50. A pitcher who reaches the limit mid-batter may finish that batter, then is done pitching for the day.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-41-no-catch',
                age: 12,
                division: 'Little League Major, league age 12',
                pitches: 41,
                daysRest: 2,
                question: 'A Little League pitcher, league age 12, has thrown 41 pitches. May they catch later the same calendar day?',
                choices: [
                  'Yes',
                  'No — 41 or more pitches ends catching eligibility for the rest of that day',
                  'Yes, if they caught fewer than four innings first',
                  'Yes — Baseball Canada has no crossover, so neither does Little League'
                ],
                answer: 'No — 41 or more pitches ends catching eligibility for the rest of that day',
                explain: 'Little League Regulation VI.a: 41 or more pitches in a day makes a player ineligible to play catcher the rest of that day. Finish-the-batter grace exists if they hit 40 mid-batter. Baseball Canada Section 4.4 has no equivalent crossover rule.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-catch-four-no-pitch',
                age: 11,
                division: 'Little League Major, league age 11',
                pitches: 0,
                daysRest: 0,
                question: 'A Little League player caught four innings (one pitch received in the fourth counts as an inning caught). May they pitch later that calendar day?',
                choices: [
                  'Yes, up to 85 pitches',
                  'No — catching four or more innings ends pitching eligibility for the rest of that day',
                  'Yes, if they stay under 21 pitches',
                  'Only in Baseball Canada'
                ],
                answer: 'No — catching four or more innings ends pitching eligibility for the rest of that day',
                explain: 'Little League catch-to-pitch gate: 4 or more innings caught in a game makes the player ineligible to pitch the rest of that calendar day. Warm-up pitches do not count as innings caught. If they caught 3 innings or fewer, then pitched 21 or more (31 or more for 15- and 16-year-olds), they may not return to catcher.',
                source: 'pitch-count-rules'
              },
              {
                id: 'bc-13u-80-rest',
                age: 13,
                division: 'Baseball Canada 13U Boys',
                pitches: 80,
                daysRest: 4,
                question: 'A Baseball Canada 13U Boys pitcher threw 80 pitches. How many full calendar days of rest?',
                choices: ['2 days', '3 days', '4 days', '0 days — 13U max is 95'],
                answer: '4 days',
                explain: '13U Boys / 14U Girls: 1–30 = 0 days, 31–45 = 1, 46–60 = 2, 61–75 = 3, 76–85 = 4, daily max 85. Eighty sits in 76–85. A Little League league-age 13 pitcher has a daily max of 95 — different pathway, different number.',
                source: 'pitch-count-rules'
              },
              {
                id: 'll-no-three-days',
                age: 12,
                division: 'Little League, league age 12',
                pitches: 18,
                daysRest: 0,
                question: 'A Little League pitcher, league age 12, threw 18 pitches Friday and 15 Saturday (both 0-day-rest counts). May they pitch Sunday?',
                choices: [
                  'Yes — each day was 1–20, so 0 days rest',
                  'No — Little League does not allow pitching on three consecutive days',
                  'Yes, up to 85 more',
                  'Only if they did not catch'
                ],
                answer: 'No — Little League does not allow pitching on three consecutive days',
                explain: 'Little League Regulation VI: no pitching on three consecutive days, even when each outing is in the 0-day-rest band. Baseball Canada allows three consecutive days only if the first two days total at or under 25 (11U), 30 (13U), 35 (15U), 40 (18U), or 45 (22U).',
                source: 'pitch-count-rules'
              },
              {
                id: 'curve-at-10',
                age: 10,
                division: 'House league, either pathway',
                pitches: 0,
                daysRest: 0,
                question: 'A 10U pitcher wants a curveball because it gets swinging strikes in this league. What does Pitch Smart say?',
                choices: [
                  'Teach it — there is no rulebook ban',
                  'Do not teach breaking balls at this age; four-seam (and later a changeup) only',
                  'Slider is safer than a curve at 10U',
                  'One curve per inning is fine'
                ],
                answer: 'Do not teach breaking balls at this age; four-seam (and later a changeup) only',
                explain: 'No pathway bans pitch types by rule. Pitch Smart still says under 10: four-seam (two-seam once that is repeatable); avoid all breaking balls. A curve at 9–14 was tied to a 52% increase in shoulder pain; a slider to an 86% increase in elbow pain. Changeup is the second pitch, and it waits until 10–12U with fastball arm speed.',
                source: 'pitch-types-by-age'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'The 11U pitcher who wants a hook',
          body: [
            'Your 11U house-league ace can throw strikes. Hitters in this league cannot hit a curve. A parent asks you to “add a breaker so we can win the qualifier.”',
            'You do not. The changeup is the second pitch: same arm speed, grip does the work. Curveball is 13–14 with a clean arm path and a body that has actually matured. Slider is 15U+. There is no rulebook to hide behind. There is Pitch Smart, and there is the arm you are borrowing.',
            'If the same pitcher is also catching, Little League would already be counting innings and the 41-pitch gate. Baseball Canada would not. Pitch Smart would still rather they not do both in one day.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'Strikes, not showcase',
          body: [
            'Two coaching errors share a root: chasing outs now. Teaching a 10U curve, and yelling “throw harder” at a 12-year-old, both buy this week with next year’s elbow.',
            'Bullpen pitches count toward the daily limit and the rest window. A 20-pitch practice max at 8–10U is a real cap, not a vibe. Track it.',
            'Centre field runs the outfield with their voice, not their vibes. If they will not call the ball, they are not ready to stand there in a game. Do-or-die and fence crashes are practice skills first, 12U+, after the walk-through.'
          ]
        },
        {
          type: 'terms',
          items: [
            'drop-step',
            'crow-hop',
            'cutoff',
            'centre-field-priority',
            'windup',
            'set-position',
            'balance-point',
            'changeup',
            'curveball',
            'slider',
            'rest-days'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Outfield ready leans back. Drop-step first on anything at or above the head. Route, do not banana. Catch above the throwing shoulder, two hands, fingers up.',
            'Crow hop: plant, hop, stride, four-seam, line to the cutoff’s chest. Centre field calls off the corners. Do not let a ball get past you with a runner on.',
            'Fence awareness is 12U+ after a safety walk-through. Do-or-die is a drilled throw, not a first-game invention.',
            'Pitching at 8–10U: balance, step to the plate, finish. Hip-before-shoulder at 11–13U. Never “throw harder” under 14.',
            'Pitches: four-seam first, changeup second (10–12U), curve 13–14 with a mature arm, slider 15U+. No breaking balls at 10U.',
            'BC 11U max 75, rest from 26 pitches (1 day) up to 66–75 (4 days). LL 6–8 max 50, 9–10 max 75, 11–12 max 85, 13–16 max 95. LL 14-and-under: 66+ is 4 days’ rest.',
            'Little League: 41+ pitches, no catching that day; 4+ innings caught, no pitching that day. Baseball Canada has no crossover rule. Pain still stops the outing on both pathways.'
          ]
        }
      ],
      quizIds: ['q1201', 'q1202', 'q1203', 'q1204', 'q1205', 'q1206', 'q1207', 'q1208'],
      prev: 'ch11',
      next: 'ch13'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
