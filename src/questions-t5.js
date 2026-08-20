/* ===================================================================
   Homerun Learn to Play — questions-t5.js
   Tier 5 (Elite) question bank for chapters 17–20.
   Registers onto HRL_QUESTIONS. ES5-safe. Load after questions-data.js.
   Content sourced from youth-baseball-canada wiki concept pages,
   matching curriculum-t5.js.
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
    /* ch17 — The Tricky Rules                                         */
    /* quizIds: q1701–q1708                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1701',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'An infield fly is declared only when all four of these are true at the same time. Which list is complete and correct?',
      choices: [
        'Any pop-up an infielder can catch, with at least one runner on, any number of outs',
        'A fair fly or line drive, ordinary effort, bases loaded only, and exactly one out',
        'A fair fly (not a line drive, not a bunt); an infielder could catch it with ordinary effort; runners on first and second or bases loaded; fewer than two outs',
        'The ball must land on the infield dirt, first base must be occupied, and there must be two outs'
      ],
      answer: 2,
      explain: 'One missing condition means there is no infield fly. Geography of the catch does not decide it — ordinary effort by an infielder does. A lone runner on first is not enough, because the occupancy condition needs a force on at least two bases.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1702',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Little League Major (rule in effect). Runners on first and second, one out. The batter hits a high fair pop-up the shortstop can catch with ordinary effort. The umpire calls “Infield Fly.” The shortstop drops the ball. What is the ruling?',
      choices: [
        'The batter is still running. The drop keeps the force on, so the defence can turn two.',
        'The batter is out on the call, catch or drop. Runners are not forced and may advance at their own risk. The ball is live.',
        'The play is dead the moment the umpire speaks. Everyone holds.',
        'Runners are forced to advance because the ball was not caught.'
      ],
      answer: 1,
      explain: 'The batter is out the instant the declaration is made, so the force vanishes. That is why the rule exists: a deliberate drop cannot become a double play on forced runners. The ball is not dead — the most common wrong sentence from a dugout. Runners may go at their own risk and can be tagged.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1703',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 7,
      type: 'mc',
      prompt: 'Where is the infield-fly rule actually on?',
      choices: [
        'SOLL Rookie and Minor: off. SOLL Major and up: on. Baseball Canada championships 13U+: on. Confirm 11U house league with the provincial association.',
        'Every youth game, as soon as someone can catch a pop-up',
        'Off in Little League Major, because those hitters are still learning to catch',
        'On in SOLL Rookie so the umpire can teach the call early'
      ],
      answer: 0,
      explain: 'The rule is turned off on purpose where ordinary effort and a loud umpire call are the wrong complexity. SOLL: no through Minor, yes from Major. BC championships 13U+: yes, OBR. 11U house league is not confirmed as universal — verify locally before you argue the call.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1704',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'On an uncaught third strike, when does the batter become a batter-runner?',
      choices: [
        'Always. Strike three in the dirt is never an out until first is tagged.',
        'Only with the bases empty and two outs.',
        'Never in Little League Major; the rule waits for high school.',
        'When strike three is not caught AND either first is unoccupied (any outs) or there are two outs (even if first is occupied). First occupied with fewer than two outs: the batter is out and may not run.'
      ],
      answer: 3,
      explain: 'Two triggers, and either one is enough once the catcher misses strike three: first open, or two outs. The first-occupied, fewer-than-two-outs exception is the sibling of the infield fly — it removes a cheap double play on a deliberate drop. The rule is off in SOLL Rookie/Minor and in BC 11U.',
      source: 'dropped-third-strike'
    },
    {
      id: 'q1705',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Little League Major. Runner on first, one out, two strikes. The catcher drops strike three. The batter takes off for first. Ruling?',
      choices: [
        'Live ball. The defence can get the batter at first and the runner at second.',
        'The batter is out. First is occupied and there are fewer than two outs, so the batter may not run, catch or drop.',
        'Infield fly. Same protective idea, so the same call.',
        'The batter must run; leaving the dirt circle is abandoning the base path only with two outs.'
      ],
      answer: 1,
      explain: 'When first is occupied and there are fewer than two outs, uncaught strike three is simply an out. The batter cannot run. That exception exists so a catcher cannot drop strike three on purpose and turn two. Infield fly is a fair-fly rule, not a third-strike rule. Run-first applies when the batter is actually eligible to run.',
      source: 'dropped-third-strike'
    },
    {
      id: 'q1706',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'scoring',
      difficulty: 7,
      type: 'mc',
      prompt: 'Little League Major. Runner on third only. From the set, the pitcher brings the hands together and goes to the plate with no discernible stop. The umpire calls balk. What happens to the run and the count?',
      choices: [
        'The runner stays. A balk is only a warning until 13U, and the pitch is a ball.',
        'The batter is awarded first, so the runner holds unless forced.',
        'The runner scores. Every runner advances one base; the batter\'s count does not move; the ball is dead.',
        'The runner is out for leaving early on the flinch.'
      ],
      answer: 2,
      explain: 'Penalty is one base for every runner, not a ball on the batter and not an award of first. A runner on third therefore scores. The lazy stop from the set is the most common youth balk. It is not enforced in SOLL Rookie or Minor; it is enforced in LL Major and in BC championships 13U+.',
      source: 'balk-rules'
    },
    {
      id: 'q1707',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'What is the difference between interference and obstruction?',
      choices: [
        'They are two names for the same collision. The umpire picks whichever sounds louder.',
        'Interference is always a dead ball that awards the runner a base; obstruction always retires the runner.',
        'Obstruction is the offence hindering a fielder; interference is the defence blocking a base without the ball.',
        'Interference is the offence (batter, runner, or coach) hindering a fielder making a play. Obstruction is a fielder without the ball, and not fielding a batted ball, impeding a runner.'
      ],
      answer: 3,
      explain: 'Who impeded whom decides the call. Fielders making a play on a batted ball have the right of way — contact then is interference on the runner, not obstruction on the fielder. Typical interference: interferer out, ball dead, other runners return. Obstruction does not automatically kill the ball; Type 1 awards at least the base the runner would have reached.',
      source: 'interference-and-obstruction'
    },
    {
      id: 'q1708',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Runner trying to score. The catcher, without the ball and not fielding a batted ball, stands in the baseline and blocks the plate. The throw arrives late; the catcher tags the runner, who never touches home. Ruling?',
      choices: [
        'Out. The catcher tagged them. Blocking the plate is legal once a throw is in the air.',
        'Type 1 obstruction. A play is being made on the obstructed runner. Award home. The run scores.',
        'Interference on the runner for running into a fielder.',
        'Type 2 obstruction. No immediate play, so the ball stays live and the runner is out on the tag.'
      ],
      answer: 1,
      explain: 'A fielder without the ball, and not in the act of fielding a batted ball, impeded the runner. That is obstruction, not interference. Type 1, because a play is being made on that runner. The umpire awards at least the base the runner would have reached — here, home. Fielders who are actually fielding have the right of way; this catcher was not.',
      source: 'interference-and-obstruction'
    },
    {
      id: 'q1709',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Bases loaded, one out, infield fly in effect. The batter lines a ball at the pitcher. The pitcher gloves it at letters height on a line, then drops it. Infield fly?',
      choices: [
        'Yes. Bases loaded, fewer than two outs, an infielder could catch it.',
        'Yes if the umpire judges ordinary effort, which a pitcher stabbing a liner is.',
        'No. An infield fly must be a fly ball — not a line drive, and not a bunt.',
        'Yes, but only if the ball would have landed on the infield dirt.'
      ],
      answer: 2,
      explain: 'Condition one is a fair fly ball, and the definition excludes a line drive and a bunt. Occupancy and outs are satisfied. The batted-ball type is not. This is a live ball and a possible double play, not an infield fly. Ordinary effort cannot rescue the wrong kind of batted ball.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1710',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Runners on first and second, one out. Pop-up near the right-field line. The umpire calls “Infield Fly, if Fair.” The ball lands in foul territory and stays foul. What is it?',
      choices: [
        'Foul ball. The infield-fly call is void. Treat it as any other foul.',
        'Infield fly. The batter is out. Foul or fair no longer matters once the words are out.',
        'Dead ball, runners advance one base because the umpire spoke.',
        'Live ball, batter running, force still on at third and second.'
      ],
      answer: 0,
      explain: 'Near a line the call is “Infield Fly, if Fair.” If the ball lands foul, the call is void and the play is a foul ball. The batter is not out on the infield fly. A foul is not a third strike, so a two-strike count holds.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1711',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: '13U championship (dropped-third-strike rule on). Bases loaded, two outs, two strikes. Strike three gets away from the catcher to the backstop. Does the batter run?',
      choices: [
        'No. First is occupied, so the batter is out on strikes.',
        'No. With two outs the infield fly covers this instead.',
        'No in Baseball Canada; only Little League Major lets the batter run with first occupied.',
        'Yes. Two outs lets the batter run whether or not first is occupied. Every base is forced, including first. A wild throw can score the run from third.'
      ],
      answer: 3,
      explain: 'The second trigger is two outs, regardless of whether first is occupied. People remember “first occupied, batter cannot run” and forget the two-out half. Bases loaded and two outs is the live-ball version of this rule. It is on in LL Major+ and BC 13U championships; it is off at 11U and in SOLL Rookie/Minor.',
      source: 'dropped-third-strike'
    },
    {
      id: 'q1712',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'positions',
      difficulty: 5,
      type: 'hotspot',
      prompt: 'Classic infield-fly picture: runners on first and second, fewer than two outs, a fair pop-up over the middle. Tap the infielder whose ordinary-effort chance decides the call. An outfielder charging in does not decide it.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'full',
          labels: true,
          positions: true,
          positionStyle: 'abbr',
          runners: ['first', 'second'],
          title: 'Infield fly: tap the ordinary-effort infielder',
          desc: 'A full diamond with runners on first and second. Tap the shortstop. Ordinary effort by an infielder, not outfield geography, decides infield fly.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['ss'],
      explain: 'Ordinary effort is an infielder test, not a dirt-vs-grass test. Shortstop is the ordinary-effort catch on a pop-up over the middle. Left field running in can still be standing under the ball; if an infielder could have caught it with ordinary effort, the rule can still fire.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1713',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'baserunning',
      difficulty: 6,
      type: 'order',
      prompt: 'An infield fly is declared. Put the runners\' jobs in the order they should think them.',
      items: [
        'Listen for “Infield Fly” (or “Infield Fly, if Fair” near a line)',
        'Hold — you are not forced; the batter is already out',
        'If the ball is caught, tag up before you advance',
        'If the ball is dropped, go at your own risk; you can still be tagged'
      ],
      explain: 'The two myths are “you have to stay” and “you have to go.” Neither is the rule. Listen, then hold while the ball is in the air, then tag up on a catch or go at your own risk on a drop. The play is not dead.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1714',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'fielding',
      difficulty: 10,
      type: 'mc',
      prompt: 'Runners on first and second, one out. A fair pop-up drifts into short left. The left fielder is charging in. The shortstop could have caught it with ordinary effort. Can this be an infield fly?',
      choices: [
        'No. The fielder who actually catches it has to be an infielder standing on the dirt.',
        'Yes. An outfielder running in can still trigger the rule if an infielder could have caught it with ordinary effort. Geography of the catch does not decide it.',
        'No. Once an outfielder calls it, the occupancy conditions no longer matter.',
        'Yes, but only with the bases loaded. First and second is not enough if an outfielder is involved.'
      ],
      answer: 1,
      explain: '“The fielder has to be in the infield” is false. What matters is whether an infielder could reasonably make the play, not who ends up under it. First and second already satisfies occupancy; bases loaded is the other occupancy, not a requirement that the outfield stay out of the play.',
      source: 'infield-fly-rule'
    },
    {
      id: 'q1715',
      chapter: 'ch17',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'Pitcher in contact with the rubber, runner on first. Which feint is legal?',
      choices: [
        'A feint to first. You may fake there as long as you do not throw.',
        'A feint to third, then a throw to first — the old third-to-first move.',
        'A feint to second, with a legal step toward second. Second is the base you may fake to from the rubber.',
        'Starting the pitching motion and stopping, because the runner was bluffing a steal.'
      ],
      answer: 2,
      explain: 'From the rubber you may not fake to first and you may not fake to third. A feint to second with a legal step is legal. The safest youth pickoff is still to step off with the pivot foot first; once off the rubber the pitcher is a fielder and balks on the subsequent motion go away.',
      source: 'balk-rules'
    },

    /* -------------------------------------------------------------- */
    /* ch18 — Pitching Strategy                                        */
    /* quizIds: q1801–q1807                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1801',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'pitching',
      difficulty: 8,
      type: 'mc',
      prompt: 'Below college, which two levers actually move youth and high-school at-bats?',
      choices: [
        'Maximum velocity, and a curveball you cannot yet command',
        'Changing the hitter\'s eye level, and changing speeds. Command of both sides of the plate beats stuff.',
        'Pitching only to the arm side, and nibbling at the corners on pitch one',
        'Strikeout rate, and throwing a changeup over the middle on 3–1'
      ],
      answer: 1,
      explain: 'Inner half then outer half is a location lever. Fastball then changeup is a speed lever. Elevated fastball then low changeup is both. A pitcher who can throw both sides at a controlled velocity is harder to hit than one who throws hard over the middle. Nibbling on pitch one is how walks start.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1802',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'What is pitching backwards, and when is it legal to use?',
      choices: [
        'Throwing the changeup early — 0–0 or 0–1 — before the hitter has a reason to look for it. Legal if that pitcher can throw it for a strike today; not a licence to start with a breaking ball you cannot command.',
        'Waiting for a “secondary-pitch count” before you ever show the changeup.',
        'Throwing a curveball or changeup on 3–0 as the default, because the hitter is sitting fastball.',
        'Abandoning the fastball once you have a two-strike count, every time.'
      ],
      answer: 0,
      explain: 'Conventional sequencing establishes the fastball first, then uses it. Pitching backwards flips the first move. It is underused, and it is not a licence to throw a pitch you cannot throw for a strike. Never call a curve or change on 3–0 unless command of it is near-perfect today.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1803',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'pitching',
      difficulty: 7,
      type: 'mc',
      prompt: 'At 0–0, what is this chapter\'s default?',
      choices: [
        'Nibble at the corners. Strike one is for later.',
        'Start with the curve, because nobody expects it.',
        'Attack the zone with a fastball. A first-pitch strike opens every other option; a first-pitch ball hands the count to the hitter.',
        'Always take the first pitch from the mound — the hitter is taking, so you should too.'
      ],
      answer: 2,
      explain: 'First-pitch strike rate is the most useful youth pitching number you can track. At 10–12U it is the only strategic concept that earns its place. A first-pitch changeup is pitching backwards — legal if this pitcher can throw it for a strike today, not if they cannot.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1804',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'pitching',
      difficulty: 9,
      type: 'mc',
      prompt: 'Count 3–1. The pitcher\'s changeup has been a ball three times today. What do you call?',
      choices: [
        'The changeup over the middle. The hitter is sitting fastball, so off-speed will fool them.',
        'A curve in the dirt. 3–1 is a waste-pitch count.',
        'Whatever the pitcher shakes to. Agreement matters more than a strike.',
        'The pitch this pitcher can most reliably throw for a strike, in a location that does the least damage if it is barrelled — usually a fastball, low and away or in, never belt-middle. A ball here is a walk.'
      ],
      answer: 3,
      explain: '3–1 is a must-strike count. A changeup you cannot throw for a strike is a walk. A changeup over the middle on 3–1 is among the most hittable pitches in the sport, because the hitter is sitting fastball. Avoid belt-high middle regardless of type.',
      source: 'catcher-game-calling'
    },
    {
      id: 'q1805',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'At 1–2 you still own the at-bat. What is the error this chapter names?',
      choices: [
        'Throwing a changeup off the lower edge — that pitch has no value at youth level.',
        'Missing the zone four times in a row and walking the count back to 3–2. Commit to the put-away or commit to the waste. Do not drift.',
        'Throwing an elevated fastball to a hitter who has been looking down.',
        'Using a waste pitch against a hitter who has been chasing.'
      ],
      answer: 1,
      explain: 'Two useful plans: a changeup off the lower edge (highest expected value at youth level, because the hitter is geared to velocity), or an elevated fastball when they have been looking down. A waste pitch is for a chaser. The error is nibbling your way back into a walk.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1806',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'Mound-visit limits, same pitcher. Which row is correct?',
      choices: [
        'All three books: two visits per inning, no per-game cap, third visit of the inning removes them.',
        'Baseball Canada / OBR and Little League Major are identical, including a two-visit game cap.',
        'OBR / Baseball Canada: one visit per inning, second removes, no per-game cap. Little League Major: also a two-visit game cap (third removes). Little League Minor: two per inning, three per game.',
        'Little League Minor is stricter than Major: one visit per inning and one per game.'
      ],
      answer: 2,
      explain: 'Two clocks, independent of pitch-count removal. A timeout to speak to any defender, including the catcher, is a visit to the pitcher in Little League (8.06(c)). An injury evaluation announced to the umpire may be excused. A catcher who can settle a pitcher between pitches without a trip saves the coach\'s allocation.',
      source: 'pitching-rules-and-mound-visits'
    },
    {
      id: 'q1807',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'pitching',
      difficulty: 9,
      type: 'mc',
      prompt: 'Holding runners where leadoffs are legal. Which package is both effective and legal?',
      choices: [
        'Mix a one-second hold with a three-second hold. Slide-step for a runner who is going, not as a lifestyle. Step directly toward the bag. No fake to first or third from the rubber. Step off if you want to be safe.',
        'Live in the slide step every pitch so the catcher always has a throw-down window.',
        'Fake to first from the rubber; it is the standard youth pickoff.',
        'Hold exactly two seconds every time so the runner “knows you are watching.”'
      ],
      answer: 0,
      explain: 'Runners time a pattern; they do not time a random pause. The slide step usually costs velocity — use it for the thief. A spin without a step, a fake to first, and a fake to third are balks. The three ways youth pitchers balk themselves are the lazy stop, the drift-step toward home on a pickoff, and a flinch without stepping off.',
      source: 'holding-runners-and-pickoffs'
    },
    {
      id: 'q1808',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Cleanup hitter, 3–1. Your pitcher\'s changeup has been a ball three times today. The curve is not a strike this inning. What do you throw?',
      choices: [
        'Changeup, middle. They will be out in front of a fastball look.',
        'Fastball, preferably low and away or in. 3–1 is a must-strike count. Do not hang the pitch you cannot throw for a strike, and do not float one over the middle.',
        'Curve in the dirt. A walk is worse than a swinging strikeout.',
        'Whatever they missed last at-bat, even if it has been a ball all day.'
      ],
      answer: 1,
      explain: 'Call the pitch this pitcher can actually throw for a strike today. A ball is a walk. A hanging changeup on 3–1 is a gift because the hitter is sitting fastball. Low and away wants a ground ball; up and in is for a hitter who has been late. Belt-middle is off the menu.',
      source: 'catcher-game-calling'
    },
    {
      id: 'q1809',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'scouting',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Right-handed hitter who was late on fastballs last at-bat (weak foul tips behind the plate). Count 0–2. What is the high-percentage plan?',
      choices: [
        'Automatic waste breaking ball in the dirt. Two strikes means expand, always.',
        'Changeup every pitch. Late on the heater means they cannot hit anything.',
        'Abandon the fastball and start an at-bat\'s worth of curves.',
        'Stay with the fastball, perhaps elevated. If they are behind the heater, the heater is still the put-away. A chase changeup is second-best, not required.'
      ],
      answer: 3,
      explain: 'Foul tips behind the plate mean their timing is behind. Keep throwing fastballs. Do not automatically go to a waste breaking ball in the dirt. The listed read is: late on fastballs, stay with the fastball.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1810',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'scouting',
      difficulty: 9,
      type: 'mc',
      prompt: 'A hitter fouls three consecutive fastballs, all hard, all straight back. Count 2–2. What did you just learn, and what do you do?',
      choices: [
        'They are late. Keep throwing the same inner-half fastball.',
        'They are out in front. Go even softer, same location.',
        'Timing is on the fastball. Change type, or change location a lot. A changeup after established fastballs is the classic speed change.',
        'Foul straight back means they cannot catch up. Waste a fastball in the dirt.'
      ],
      answer: 2,
      explain: 'Foul straight back: timing is correct; they just missed. Either change the pitch type or change the location dramatically. Another inner-half fastball is the sequence they have already seen. Foul to the pull side means they are out in front; foul the other way means they are late — those are different reads.',
      source: 'catcher-game-calling'
    },
    {
      id: 'q1811',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'analytics',
      difficulty: 5,
      type: 'hotspot',
      prompt: 'Tap 3–1 — the must-strike count this chapter pairs with 0–0 (attack) and 1–2 (put away or expand). Throw the pitch you can actually throw for a strike.',
      diagram: {
        svg: 'countMatrix',
        opts: {
          shade: 'leverage',
          hotspots: ['count-0-0', 'count-0-2', 'count-1-2', 'count-2-0', 'count-3-0', 'count-3-1'],
          title: 'Tap the 3–1 must-strike count',
          desc: 'A grid of the twelve ball-strike counts with leverage shading. Tap three balls and one strike.'
        }
      },
      targets: ['count-3-1'],
      explain: 'Counts are written balls first. 3–1 is a hitter\'s count and a must-strike pitch: a ball is a walk. 0–0 is the attack count; 1–2 is put-away or expand. 3–0 is coach-managed from the box and still not a licence to hang a changeup.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1812',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'pitching',
      difficulty: 8,
      type: 'mc',
      prompt: 'What is a slide step for, and what does it cost?',
      choices: [
        'It is the default delivery with anyone on base, because it never costs anything.',
        'A shorter or missing leg lift that shortens the catcher\'s throw-down window. It usually costs velocity. Use it for a runner who is going. Do not live in it.',
        'The only legal way to pick off at first. Without it, every throw is a balk.',
        'A full stop from the set. Skipping it is how you avoid the balk.'
      ],
      answer: 1,
      explain: 'The primary hold tool is unpredictable time between the set and the delivery, not a permanent slide step. Mechanics and arm health want a normal set-position delivery on most pitches. The full stop is a balk requirement, not a slide-step substitute.',
      source: 'holding-runners-and-pickoffs'
    },
    {
      id: 'q1813',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 7,
      type: 'mc',
      prompt: 'Why is pitching to contact the structural preference at these ages?',
      choices: [
        'Strikeouts are a vice. You should never try to miss a bat.',
        'Walks are more valuable than ground balls, so nibble until they chase.',
        'Six strikeouts on 38 pitches always leave more innings in the arm than six ground-ball outs on 18.',
        'Pitch-count rules cap an outing. Six ground-ball outs on 18 pitches leave more innings in the arm than six strikeouts on 38. Strikeouts are not a vice; burning the count to get them is.'
      ],
      answer: 3,
      explain: 'Command beats stuff, and the clock is the pitch-count table. Weak contact on a first-pitch strike is how you keep an arm for the fourth inning. The correction to nibbling is to attack the zone, not to hunt punchouts at any count cost.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q1814',
      chapter: 'ch18',
      tier: 'elite',
      topic: 'rules',
      difficulty: 7,
      type: 'tf',
      prompt: 'Pickoff throws are a core Little League Major game skill, because those runners take walking leads off first.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Little League Minor and Major forbid leaving the base until the pitch reaches the batter, so pickoffs are largely irrelevant there. They become real in Little League Intermediate, Junior, and Senior, and in Baseball Canada championships from 13U. Spend Minor/Major time on the set and a full stop so the balk is already a habit when the rule turns on.',
      source: 'holding-runners-and-pickoffs'
    },

    /* -------------------------------------------------------------- */
    /* ch19 — Hitting Approach                                         */
    /* quizIds: q1901–q1907                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1901',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 8,
      type: 'mc',
      prompt: 'When is approach decided, and what is the 0.4 seconds after release for?',
      choices: [
        'Approach is decided before the pitch. The window after release is for recognition, not for a committee meeting about which zone to hunt.',
        'Approach is invented during the ball\'s flight. Mechanics are decided in the on-deck circle.',
        'You have about four seconds after release. Use them to check with the third-base coach.',
        'Plate discipline means taking pitch one every time so you can “see the release.”'
      ],
      answer: 0,
      explain: 'You cannot hold a meeting in four-tenths of a second. Which zone, which pitch, swing or take on a borderline — that plan has to be in place in the box. A hitter with average mechanics and a plan will beat a pretty swing with no plan, over a season.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1902',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'How does this chapter sort counts, and what is the job in each?',
      choices: [
        'Every count is even. Hunt the same inner-half fastball until two strikes, then bunt.',
        'Hitter\'s counts (2–0, 3–1, and in this map 1–0, 2–1, 3–0): hunt a pitch in a zone. Pitcher\'s counts (0–1, 0–2, 1–2): shorten up and protect. 3–0 is coach-managed: default take unless you get a green light.',
        'Pitcher\'s counts are 3–1 and 2–0, because the pitcher must throw a strike so you should take.',
        '0–0 is a take count. Two-strike counts are hunt counts.'
      ],
      answer: 1,
      explain: 'On a hitter\'s count the pitcher has to throw a strike and is very likely to throw a fastball in a hittable place. On a pitcher\'s count they can throw a secondary pitch that is technically a ball, and you still have to protect. 3–0 is a walk if you take a ball; swinging without a green light is how you give that free base away.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1903',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 8,
      type: 'mc',
      prompt: 'Count 2–0. Fastball, belt-high, over the middle of the plate. The dugout says “good eye” when you take it. Were they right?',
      choices: [
        'Yes. 2–0 is a walk count. Patience is taking until 3–0.',
        'No. This is a hitter\'s count and a hittable fastball in the zone you should be hunting. Taking it is passivity dressed up as discipline.',
        'Yes, because plate discipline means taking pitches.',
        'Only if the coach has you in bunt mode.'
      ],
      answer: 1,
      explain: 'Discipline is identifying hittable versus not. It is not taking pitches. A 2–0 fastball over the middle is one of the most hittable pitches in baseball. The correction is not “swing more.” It is “decide before the pitch which zone you will swing in, and do it.”',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1904',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 8,
      type: 'mc',
      prompt: 'Count 3–0. No green-light sign from the coach. Fastball, belt-high, inner half. What do you do?',
      choices: [
        'Swing. It is the most hittable pitch you will see, and 3–0 is a hunt count like 2–0.',
        'Bunt toward first to avoid a double play.',
        'Protect as if it were two strikes, because a walk is “passive.”',
        'Take. At most youth levels 3–0 is coach-managed: default take unless you are given the green light. A ball is a walk.'
      ],
      answer: 3,
      explain: '3–0 is not 2–0. Default take, unless the coach gives a green light. A swing that misses becomes 3–1, which is still a hitter\'s count but no longer a free base if the next one is off the plate. The green light is a decision, not a hitter freelance.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1905',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 8,
      type: 'mc',
      prompt: 'With two strikes, what actually changes?',
      choices: [
        'Nothing. Hunt the same inner-half fastball and take anything else.',
        'The goal changes from hunting a preferred pitch in a preferred zone to protecting the plate. Choke up one to two inches, widen to anything close, shorten the stride and the load, still swing hard. Dirt and over the head remain takes.',
        'Swing at everything, including the dirt and the pitch over your head.',
        'A worse, tentative wave so you “just put it in play.”'
      ],
      answer: 1,
      explain: 'Different goal, not a worse swing. The failure mode is passivity: a tentative wave produces rollers and pop-ups. “If it is close, protect.” A foul on a tough two-strike pitch is a win — make them throw another one. Introduce the choke-up at 10–11U; the full no-stride option lives at 13U with pitch-type recognition.',
      source: 'two-strike-approach'
    },
    {
      id: 'q1906',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'Tied, runner on second, nobody out. What is the job?',
      choices: [
        'Hunt a pull homer. One swing should end it.',
        'Take three borderline pitches into a punchout so you “see more.”',
        'Move them. Sacrifice if the 2–3–4 follow and you can put it down; hit-and-run where leadoffs are legal; or swing away if this is your best hitter or the pitcher is wild. Do not bunt when you are down three or more.',
        'Bunt no matter the score, including when you are down four, because the inning\'s first out should always be given away.'
      ],
      answer: 2,
      explain: 'The job is to get that runner to third so a fly ball or a grounder to the right side can score them. The inning\'s first out should buy a base. Do not bunt when you are down three or more — the out is too expensive when you need a crooked number. Rolling over to third while still hunting a pull homer is how this inning dies.',
      source: 'offensive-strategy'
    },
    {
      id: 'q1907',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'Runner on third, one out, 1–1. A fastball you can lift, belt to letters, over the plate. Infield is playing back. What is the job?',
      choices: [
        'Swing, controlled, and put it in the air. A sacrifice fly scores the run. You are not hunting a homer.',
        'Take. Work a walk. A walk scores the runner from third.',
        'Bunt. With one out a bunt scores from third on contact every time, and the infield being back does not matter.',
        'Two-strike choke-up even though it is 1–1, and swing at whatever shows.'
      ],
      answer: 0,
      explain: 'Runner on third, fewer than two outs: productive out. A fly ball to medium-deep outfield scores the run. A walk leaves the runner at third. A bunt with one out is not the default here — the infield is back, and a fly ball does the job without giving up the out as a design.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1908',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Count 0–2. Curveball or changeup starts at the knees and dives into the dirt. What do you do?',
      choices: [
        'Swing. Two strikes means swing at everything.',
        'Call time and choke up after it passes.',
        'Two-strike bunt, because contact is the only goal.',
        'Take. Protect the close pitch, not the one in the dirt. Expanding the zone is not chasing.'
      ],
      answer: 3,
      explain: 'Two-strike protection covers pitches close to the zone. In the dirt is still a take. Over your head is still a take. Over-correcting “protect the plate” into swinging at everything is the listed two-strike fault. Close — yes. Short swing, still swing hard.',
      source: 'two-strike-approach'
    },
    {
      id: 'q1909',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'analytics',
      difficulty: 7,
      type: 'mc',
      prompt: 'What is chase rate doing in a youth lineup, and how should a walk be treated?',
      choices: [
        'Chase rate is a badge of aggression. Walks are polite refusals, not skill.',
        'Swinging at pitches outside the zone is the biggest youth predictor of weak contact. A walk is a single for the purpose of reaching. Celebrate it like a hit.',
        'Teach this umpire\'s mood, not the rulebook zone, so you never take a close strike.',
        'Chase rate only matters at 15U+. Before that, swing at whatever might be called.'
      ],
      answer: 1,
      explain: 'A pitch off the outer corner at the ankles produces pull-side grounders and weak pop-ups even with a pretty swing. Teach the rulebook zone — belt to knees, over the plate — not this umpire\'s mood. Players who take borderline balls work deeper counts, see more fastballs, and walk more.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1910',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Infield in, runner on third, fewer than two outs. What does the batter try to do?',
      choices: [
        'Pull a grounder to third. The drawn-in third baseman is the hole.',
        'Take until a walk. A walk scores the runner from third with the infield in.',
        'Put it in play, favour the right side, get it in the air if you can. A grounder to third with traffic is a double-play look. You are scoring the run, not hunting a three-run shot.',
        'Bunt toward third, because infield-in means the third baseman cannot field a bunt.'
      ],
      answer: 2,
      explain: 'A ground ball can still score with the infield in, but a grounder to third with traffic is how innings die. Right side, in the air if you can. Hitting behind the runner (a hard ball to the right side) is the geometry you want. Two outs: everyone runs on contact — that is a team rule, not a read.',
      source: 'offensive-strategy'
    },
    {
      id: 'q1911',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 4,
      type: 'order',
      prompt: 'On deck is the plan meeting. Put that work in the order this chapter teaches.',
      items: [
        'Know the count you will walk into, the outs, and who is on',
        'Watch one sequence: fastball first? Changeup in the dirt on 0–2?',
        'Decide the zone you will hunt if you get a hitter\'s count',
        'Decide that two strikes will mean choke up, then step in already decided'
      ],
      explain: 'The 0.4 seconds after release are not for inventing a plan. On deck is where the plan is built. Step in knowing the count, the outs, and the zone you will swing in.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1912',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 9,
      type: 'mc',
      prompt: 'Count 1–2. Fastball at the top of the knees, over the outer third — close enough that an umpire may ring you up. What do you do?',
      choices: [
        'Take. Make the umpire call it. You only swing at belt-high.',
        'Bunt with two strikes because contact is the only goal.',
        'Two-strike green light to pull for extra bases; this is still a hunt count.',
        'Protect. Two strikes, it is close, choke up and put it in play. Short swing, still swing hard.'
      ],
      answer: 3,
      explain: 'This is the two-strike expand: if it is close, protect. A take here is how you get punched out on the corner. Controlled aggression — not a bunt unless it was signed, and not a tentative wave. A foul is a win.',
      source: 'two-strike-approach'
    },
    {
      id: 'q1913',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Down four in the last inning, 3–1, fastball just off the outer edge. What do you do?',
      choices: [
        'Swing. You need extra bases, not a walk.',
        'Take. Down by three or more in the late innings, work for baserunners. A walk and a single build a rally better than one big swing at a ball.',
        'Take only if the coach bunts you.',
        'Two-strike choke-up and expand, even though it is 3–1.'
      ],
      answer: 1,
      explain: 'When you are down three-plus late, the approach is patient: force the pitcher to throw strikes, build runners. A borderline ball on 3–1 is a walk. Chasing it for a hero swing is how rallies stall. That is also why you do not bunt when you are down three or more — the out is too expensive.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q1914',
      chapter: 'ch19',
      tier: 'elite',
      topic: 'hitting',
      difficulty: 8,
      type: 'mc',
      prompt: 'Count 1–1. Breaking ball starts off the outer edge. It may or may not come back. What do you do?',
      choices: [
        'Swing. If it comes back it is a strike, and 1–1 is even so you should be aggressive.',
        'Two-strike choke-up even though it is 1–1.',
        'Take. If it starts off the plate, let it go. That pitch is designed for weak contact or a chase. Even counts are aggressive on fastballs in the zone, disciplined on breaking balls off it.',
        'Hunt it as your 2–0 pitch. Starting off the plate is still your zone.'
      ],
      answer: 2,
      explain: 'A breaking ball that starts out of the zone is a pitcher\'s pitch. The fact that it might come back over is irrelevant; a ball that starts low and outside and breaks down-and-away is nearly impossible to drive. “If it starts off the plate, let it go.” Do not expand the zone to “be productive.” Win the count first.',
      source: 'hitting-approach-and-plate-discipline'
    },

    /* -------------------------------------------------------------- */
    /* ch20 — Managing the Game                                        */
    /* quizIds: q2001–q2008                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q2001',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'In a nine-hitter order, what is the first spot actually for?',
      choices: [
        'Your fastest runner, even if they cannot reach.',
        'Your highest on-base skill, speed optional. Two is the table-setter who can bunt and hit-and-run. Three through five are the RBI stretch. Six is the best of the rest so the order turns over.',
        'Your biggest power bat, because leadoff homers swing games.',
        'Whoever has not had mandatory play yet, even if that buries your on-base skill in the nine-hole all season.'
      ],
      answer: 1,
      explain: 'First is on-base, not “your fastest.” In a youth league with a continuous order or mandatory play, that card is a preference, not a right — participation outranks optimization — but you still put on-base at the top. You do not bury a ten-year-old in the nine-hole all season so the lineup “looks like a real lineup.”',
      source: 'lineup-construction'
    },
    {
      id: 'q2002',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'Little League regular season, traditional batting order. What is mandatory play (Regulation IV.i)?',
      choices: [
        'Every rostered player present at the start must play at least six defensive outs and bat at least once. With 15–20 on the roster and 15 or more present, it may drop to three outs and one at-bat. Off in tournament play, continuous order, and Senior.',
        'One at-bat is enough. Defensive outs are a guideline.',
        'It applies in tournament play exactly as in the regular season.',
        'Baseball Canada championships use the same 6 + 1 rule, copied from Little League.'
      ],
      answer: 0,
      explain: 'Penalties climb from a written warning to a one-game suspension to a season suspension, and the player must finish the unmet requirement next game. Design the first three innings so the minimum is already met, then manage. Continuous order satisfies the batting half automatically.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q2003',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'Baseball Canada championships: lineup card, Extra Hitter, and minimum play. Which is correct?',
      choices: [
        'No card needed. Add an Extra Hitter in the fourth if you get behind. Every player is guaranteed six outs.',
        'Both teams must use an Extra Hitter. There is no penalty for a late card.',
        'Written card at least 30 minutes before game time (number left of the name, position right), penalty for late. A team may declare an Extra Hitter (ten in the order) on that card; it is not required of both teams and cannot be added after submission. No Little League-style per-game minimum.',
        'The Extra Hitter can return as pitcher after being removed from the mound.'
      ],
      answer: 2,
      explain: 'Championship baseball is OBR substitution, not Regulation IV.i. A pitcher removed from the mound may not return. The Extra Hitter is a participation tool you either declared on the card or you did not. 11U is a different book — do not import championship assumptions into a house-league 11U game.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q2004',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'mc',
      prompt: 'Baseball Canada 11U. Your starter threw 40 pitches and came out. Next inning you want them at shortstop. Legal?',
      choices: [
        'No. Once you pitch you are done for the day on defence.',
        'Only if the other team also used an Extra Hitter.',
        'No, because championship OBR forbids all re-entry after a pitching appearance.',
        'Yes. 11U allows defensive re-entry at any position except pitcher once the player has pitched. They cannot return to the mound. They can play shortstop.'
      ],
      answer: 3,
      explain: 'BC 11U (not championship OBR): defensive re-entry at any position except pitcher once that player has pitched, and free offensive re-entry with no automatic out. Playing equity: start on defence at least one game of two, with about six of twelve defensive innings across two games recommended. Know which book the game is using before you wave them out to short.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q2005',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 7,
      type: 'mc',
      prompt: 'A sign system a twelve-year-old cannot decode under pressure is not sophisticated. What does this chapter actually run?',
      choices: [
        'Eight-to-ten: full indicator, live sign, wipe-off, and defensive shifts.',
        'Eleven-to-twelve: indicator, then live, plus fakes you change every pitch.',
        'Match the age. Eight-to-ten: say “bunt” out loud. Eleven-to-twelve: one live touch, no indicator (cap is bunt, ear is steal). Thirteen: indicator, live sign, wipe-off. Fourteen and up: fakes, location, and you change the indicator between tournament games.',
        'Keep the same belt-then-ear steal all weekend even after they start taking it. Changing it is a sign of panic.'
      ],
      answer: 2,
      explain: 'Complexity is not sophistication. The competitive indicator is a sequence of touches; one touch is the indicator (say, the belt); the next is live; a forearm brush wipes. Same rhythm on every sequence — a hitch on the real sign is how the third-base coach tells on themselves. When you know they are stolen, change the indicator that inning.',
      source: 'sign-systems-and-communication'
    },
    {
      id: 'q2006',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'Who may formally address an umpire, and what is protestable?',
      choices: [
        'Anyone on the staff, and any disagreement including balls and strikes.',
        'Players may go; assistants may not. Safe/out is the classic protest.',
        'Only the designated manager. Judgment calls — balls and strikes, safe or out, fair or foul, catch or trap, home-run calls — cannot be protested. “Was the rule applied correctly?” is protestable. “Did the umpire see it correctly?” is not.',
        'Only the designated manager, and they may protest balls and strikes if they stay polite.'
      ],
      answer: 2,
      explain: 'An assistant who walks out to argue can be ejected. Protestable examples: wrong number of bases on interference, wrong base on a ground rule, a pitcher used past a pitch-count limit, batting out of order once properly appealed. A balk\'s occurrence is judgment; the interpretation of what the rule requires may be protestable — do not hang a game on that distinction without the book in your hand.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2007',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'mc',
      prompt: 'You believe a rule was misapplied in a Baseball Canada championship. How do you protest?',
      choices: [
        'Say you are protesting before the next pitch, play, or attempted play, with a $100 cash deposit. Upheld returns it; dismissed keeps it. A protest after play has resumed is void.',
        'Argue in the parking lot. The 24-hour parent rule is the protest window.',
        'File by email that night. Cash is optional if the protest is obviously right.',
        'Show the umpire video on a phone. Safe/out becomes protestable with video.'
      ],
      answer: 0,
      explain: 'Stop immediately. Do not allow the next pitch. Inform the umpire you are lodging a protest, and have the cash ready — protests without a deposit are not heard. Carry the $100 at tournaments. Phones do not change the book, and judgment is still not protestable.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2008',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 8,
      type: 'mc',
      prompt: 'When do you bring the infield in?',
      choices: [
        'Whenever a runner reaches first. Range does not matter.',
        'When you can give the run, or when you need two. Play at the plate is then a bonus.',
        'Every inning of a blowout, so the extra outs look sharp.',
        'Runner on third, fewer than two outs, close and late — the run matters. You give up range to have a play at the plate. Pitch up in the zone; a grounder is the ball that scores even with four people on the grass.'
      ],
      answer: 3,
      explain: 'Infield in is a one-run, late-and-close look, not a default. Before you make the glamorous outfield substitution, confirm the player coming off has their six outs and their at-bat. Coverages still have names after the sub.',
      source: 'game-management'
    },
    {
      id: 'q2009',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 9,
      type: 'scenario',
      prompt: 'Little League Major, regular season, traditional order. One-run game, sixth inning. You want to bring your best outfielder in for a player who has four defensive outs and one at-bat. Legal?',
      choices: [
        'Yes. The at-bat is the part that matters, and they have it.',
        'No. Regulation IV.i requires six defensive outs and one at-bat. Four outs is short. Make the sub only after those two more outs, or you have a protest and a penalty on the manager.',
        'Yes if the continuous-order exception is read generously.',
        'Yes in the sixth, because mandatory play turns off in the last inning.'
      ],
      answer: 1,
      explain: 'Mandatory play is six defensive outs and one at-bat for every player present at the start, in regular-season traditional order. Four outs fails the defensive half. Continuous order and tournament play waive some of this; this game is neither. Get the minimum in by design in the first three innings so the sixth is free.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q2010',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Baseball Canada 15U championship. You already visited this pitcher once this inning. The next hitter is their cleanup. You want to go out again, same pitcher, same inning, same batter. What happens?',
      choices: [
        'Allowed. OBR has no per-game cap, so innings can take two visits.',
        'Allowed if you announce it as an injury check after you arrive.',
        'The second trip to the same pitcher in the same inning removes the pitcher. You also may not make a second visit while the same batter is still up. If you go, they are coming out.',
        'Allowed if you only speak to the catcher on the grass, because that is not a visit.'
      ],
      answer: 2,
      explain: 'OBR 5.10(l): one trip per inning to that pitcher; the second is automatic removal. A second visit while the same batter is at bat is also prohibited; a pinch-hitter would allow a second visit, and the pitcher must then come out. Injury evals are excused only if you tell the umpire that is the purpose before the visit. Talking to a catcher who then goes to the mound before a pitch is still a trip.',
      source: 'pitching-rules-and-mound-visits'
    },
    {
      id: 'q2011',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 8,
      type: 'scenario',
      prompt: 'The plate umpire calls a strike on the outer edge. Your assistant coach walks toward the plate to tell the umpire it was a ball. What should happen?',
      choices: [
        'Stop the assistant. Only the manager may address the umpire, and balls and strikes are judgment — not protestable. An assistant who goes out to dispute a call may be ejected.',
        'Good. Anyone on the staff may question balls and strikes if they stay polite.',
        'File a protest with the $100 deposit. Location of the zone is a rule application.',
        'Let the assistant go, then pile on so the umpire “knows the bench is united.”'
      ],
      answer: 0,
      explain: 'Two independent failures: only the manager talks, and judgment calls cannot be protested in either pathway. The assistant is in ejection territory. The manager\'s job is to get their own coach back in the box, not to pile on. Players copy the adult in the third-base box.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2012',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'strategy',
      difficulty: 7,
      type: 'mc',
      prompt: 'First base open, tying run on third, two outs. You want the cleanup hitter walked. Can you just send them?',
      choices: [
        'Yes. Youth baseball copied the automatic intentional walk.',
        'Yes if the catcher tells the umpire before the first pitch.',
        'Yes in Little League Major; no in Baseball Canada.',
        'No. Both pathways still require four pitches outside the zone. There is no automatic intentional walk at these levels. Loading the bases is a real cost — a force everywhere and a grand-slam look.'
      ],
      answer: 3,
      explain: 'The intentional walk in both pathways is four thrown balls. Use it rarely: dominant hitter, first open, a force or double play to set up. If you are only pitching around, 3–0 and 3–1 means the hitter should take. Do not load them lightly.',
      source: 'game-management'
    },
    {
      id: 'q2013',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'A league-age 9 pitcher is rostered on an 11U team. The 11U daily max in this pathway is 75. A coach says “they are on the 11U team, so 75 is fine, and the older kids throw 85.” What is the rule?',
      choices: [
        'Team division sets the cap. 11U means the 11U number.',
        'Pitch-count limits follow the pitcher\'s actual age or league age, not the team\'s label. Apply the more conservative limit. A 9-year-old does not get an 11U or 10U bump because the roster says 11U.',
        'Only Little League ages the pitcher; Baseball Canada uses the team U-division for everyone on the card.',
        'Practice-bullpen pitches never count, so the game-day bump is legal.'
      ],
      answer: 1,
      explain: 'Both pathways: the pitcher\'s age or league age, not the team name. Baseball Canada: if actual age sits on a lower grid, use the lower number. Little League Regulation VI: league-age 9 daily maximum is 75, even on a Minor or Major roster. Tracking the wrong grid is a rules violation and an arm-care failure. One shared pitch log with name, actual age, date, and total is the staff\'s job.',
      source: 'managing-multi-age-teams'
    },
    {
      id: 'q2014',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'safety',
      difficulty: 7,
      type: 'mc',
      prompt: 'A twelve-year-old misses a steal sign in a tight count. You want to make an example. What does this chapter require?',
      choices: [
        'Yell from third so the whole park hears. Shame is how signs get learned.',
        'Sit them and lecture at full volume between innings so the bench “gets the message.”',
        'No humiliation, no intimidation, no public shaming of a player for a missed sign. Safe Sport is the floor. If a twelve-year-old cannot decode the system under pressure, the system is too complex.',
        'Eject your own player. Missed signs are unsportsmanlike conduct.'
      ],
      answer: 2,
      explain: 'ROOTS is Rules, Officials, Opponents, Teammates, Self. Officials are the O coaches skip; teammates include the kid who missed the sign. Players copy the adult in the third-base box. A sarcastic show is a permission slip. The next pitch is the job.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2015',
      chapter: 'ch20',
      tier: 'elite',
      topic: 'field',
      difficulty: 4,
      type: 'hotspot',
      prompt: 'One-run lead, runner on third, fewer than two outs: infield in. Tap the base this defence is playing to.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'full',
          labels: true,
          positions: true,
          positionStyle: 'abbr',
          alignment: 'infield-in',
          runners: ['third'],
          title: 'Infield in: tap the play at the plate',
          desc: 'A full diamond with the infield in and a runner on third. Tap home — the base this defence is playing to.',
          hotspots: ['home', 'first', 'second', 'third', 'mound']
        }
      },
      targets: ['home'],
      explain: 'You give up range to have a play at the plate. Home is the base that matters on this look. Do not bring them in when you can give the run, or when you need two. Pitch up in the zone; a grounder is the ball that scores even with four people on the grass.',
      source: 'game-management'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
