/* ===================================================================
   Homerun Learn to Play — curriculum-t2.js
   Tier 2 (Sandlot) chapters 5–8. Registers onto HRL_CURRICULUM.
   ES5-safe. Load after curriculum-data.js in the same process.
   Content sourced from youth-baseball-canada wiki concept pages.
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
    /* ch05 — Balls, Strikes & the Count                               */
    /* -------------------------------------------------------------- */
    {
      id: 'ch05',
      tier: 'sandlot',
      order: 5,
      title: 'Balls, Strikes & the Count',
      subtitle: 'The pitch-by-pitch heart of the game',
      minutes: 10,
      objectives: [
        'After this chapter you can say where the strike zone sits, and that a human umpire judges it as the ball crosses the plate.',
        'After this chapter you can tell a called strike from a swinging strike from a foul ball, including why a foul cannot be strike three unless it is a bunt.',
        'After this chapter you can read a count balls-first and name what four balls and three strikes do.',
        'After this chapter you can say what each of the twelve counts means for the hitter and the pitcher.',
        'After this chapter you can explain a walk and a hit by pitch.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Every pitch is a call',
          body: [
            'You already know that three outs end a half-inning and that a run is a loop of the bases. This chapter is what happens on the pitches in between. Almost every play starts with one throw from the pitcher to the catcher, and an umpire calling it a ball or a strike.',
            'The strike zone is the space over home plate where a pitch is a strike if the batter does not swing. Home plate is 17 inches wide. A pitch that catches any part of that width is legally over the plate. The top and bottom of the zone follow the batter’s body, in the stance that batter actually uses to swing — not the tallest they can stand.',
            'The call is made as the ball crosses the plate, not as it leaves the hand and not as it hits the glove. A human being makes that call. Balls and strikes are judgment. They cannot be protested. The call stands.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The strike zone, catcher’s view',
          svg: 'strikeZone',
          opts: {
            zoneRef: 'youth',
            grid: 3,
            showZoneBox: true,
            showBatter: 'R',
            pitches: [
              { x: 0.50, y: 0.44, call: 'called-strike', n: 1 },
              { x: 0.28, y: 0.26, call: 'called-strike', n: 2 },
              { x: 0.72, y: 0.64, call: 'called-strike', n: 3 },
              { x: 0.50, y: 0.08, call: 'ball', n: 4 },
              { x: 0.08, y: 0.44, call: 'ball', n: 5 }
            ],
            title: 'Little League strike zone (catcher’s view)',
            desc: 'A strike-zone diagram from the catcher’s view, Little League bounds from armpits to the top of the knees, with a right-handed batter silhouette and five sample pitches plotted.'
          },
          caption: 'You are the catcher. The box is the zone over the 17-inch plate. Numbered dots: 1 is a middle strike, 2 is high inside, 3 is low away, 4 is high (a ball), 5 is inside (a ball). Little League’s upper bound is the armpits; Baseball Canada’s is lower, around the letters.'
        },
        {
          type: 'divisionnote',
          heading: 'Where the top and bottom sit',
          intro: 'Both pathways judge the zone over the plate in the batter’s natural stance. The upper bound is the real split. The lower bound is nearly the same — at or just above the knees. Youth volunteer umpires also tend to call a wider horizontal zone at 8–10U. Adjust. Do not argue.',
          columns: ['Pathway', 'Lower bound', 'Upper bound', 'Cue'],
          rows: [
            ['Little League', 'Top of the knees', 'Batter’s armpits', 'Armpit to knee, over the plate'],
            ['Baseball Canada (OBR)', 'Bottom of the kneecap', 'Midpoint of shoulders and top of the pants (the letters)', 'Belly button to knee, over the plate']
          ]
        },
        {
          type: 'prose',
          heading: 'Three ways a pitch becomes a strike',
          body: [
            'A called strike is a pitch the batter does not swing at, that the umpire judges in the zone as it crosses the plate. A swinging strike is a pitch the batter offers at and misses — in the zone or not. If the batter swings, location no longer matters.',
            'A foul ball is a batted ball that lands or is touched in foul territory. With fewer than two strikes, a foul is a strike. With two strikes, a foul is not strike three. The at-bat continues. That is why you hear “still two” after a long foul.',
            'The exception is a bunt. A foul bunt on the third strike is an out. The ball is dead. That is why coaches tell two-strike bunters to pull the bat back on a pitch they cannot put fair.',
            'A pitch that bounces and then goes through the zone is a ball, not a called strike. If the batter swings at that bouncing pitch and misses, it is a swinging strike. The bounce does not become a called third strike.'
          ]
        },
        {
          type: 'prose',
          heading: 'Balls, walks, and hit by pitch',
          body: [
            'A ball is a pitch that is not in the strike zone and is not swung at. Four balls and the batter is awarded first base. That is a walk, also written BB for base on balls. The ball stays live on an ordinary walk: other runners may advance if they choose, and they must advance if they are forced.',
            'A hit by pitch — HBP — is different. If a pitch touches the batter, and the batter was not swinging, the batter is awarded first. Two limits: if the pitch was in the strike zone, it is a strike, not an award; and the batter is expected to try to get out of the way. If they make no attempt to avoid a pitch off the zone, the umpire may call a ball instead of an award. The ball is dead either way until the next pitch.',
            'Three strikes is a strikeout. The batter is out. (There is a dropped-third-strike exception in some divisions — Chapter 6 introduces it, and Chapter 17 goes deep. In many first-season games the batter is simply out on strike three.)'
          ]
        },
        {
          type: 'diagram',
          heading: 'The twelve counts',
          svg: 'countMatrix',
          opts: {
            shade: 'leverage',
            highlight: '3-2',
            title: 'Balls across, strikes down',
            desc: 'A grid of the twelve ball-strike counts, balls 0–3 across and strikes 0–2 down, with walk and strikeout as terminals, shaded into hitter’s counts, pitcher’s counts, and neutral, with 3–2 highlighted.'
          },
          caption: 'Say the count balls first: “two and one,” never “one and two” unless you mean one ball and two strikes. Green cells lean to the hitter (1–0, 2–0, 3–0, 2–1, 3–1). Red cells lean to the pitcher (0–1, 0–2, 1–2). White cells are even or a fight. Four balls leave the grid to the right — a walk. Three strikes leave it at the bottom — a strikeout. 3–2 is the full count, highlighted here.'
        },
        {
          type: 'prose',
          heading: 'What each count is asking',
          body: [
            '0–0 is the start. Nobody has won anything yet. A first-pitch strike puts the pitcher in front. A first-pitch ball puts the hitter in front.',
            'Hitter’s counts: 1–0, 2–0, 3–0, 2–1, 3–1. The pitcher needs to throw a strike or the walk gets closer. At 2–0 and 3–1 the hitter can look for a fastball in a favourite spot. At 3–0 most youth coaches take — let the pitch go — unless they give a green light. A ball on 3–0 is a walk; a swing risks 3–1.',
            'Pitcher’s counts: 0–1, 0–2, 1–2. The hitter has to protect the plate. Two-strike hitting means a slightly bigger zone, a shorter swing, and contact over a big cut. 0–2 is the deepest hole in an at-bat.',
            'Even and battle counts: 1–1, 2–2, and the full count 3–2. Neither side has given the at-bat away. 3–2 is live for everyone: a strike ends it, a ball is a walk, a foul keeps it at 3–2, and a ball in play ends the at-bat the ordinary way. Runners, when they are allowed to go, often run on a 3–2 pitch with two outs.'
          ]
        },
        {
          type: 'terms',
          items: [
            'strike-zone',
            'called-strike',
            'swinging-strike',
            'foul-ball',
            'ball',
            'count',
            'walk',
            'strikeout',
            'hit-by-pitch'
          ]
        },
        {
          type: 'interactive',
          heading: 'Call the pitch',
          widget: 'strikeZoneTrainer',
          intro: 'Each pitch is a dot on the catcher’s view. Call ball or strike. The zone is the box over the plate. A pitch that catches any edge of the box is a strike. A pitch entirely outside it is a ball. You are not guessing swing or take — only location.',
          opts: {
            mode: 'ball-strike',
            cases: [
              {
                id: 'mid-mid',
                x: 0.50,
                y: 0.44,
                call: 'strike',
                explain: 'Middle of the zone, over the plate. Called strike if the batter takes it.'
              },
              {
                id: 'high-in',
                x: 0.30,
                y: 0.26,
                call: 'strike',
                explain: 'High inside for a right-handed batter, still inside the box. In Little League this is under the armpits. Strike.'
              },
              {
                id: 'low-away',
                x: 0.70,
                y: 0.64,
                call: 'strike',
                explain: 'Low away, catching the outer edge near the knees. The edge of the plate counts. Strike.'
              },
              {
                id: 'high-ball',
                x: 0.50,
                y: 0.08,
                call: 'ball',
                explain: 'Above the zone. Even in Little League, this is over the armpits. Ball.'
              },
              {
                id: 'low-ball',
                x: 0.50,
                y: 0.86,
                call: 'ball',
                explain: 'Below the knees. A bounce or a pitch in the dirt is a ball if the batter does not swing.'
              },
              {
                id: 'inside-ball',
                x: 0.08,
                y: 0.44,
                call: 'ball',
                explain: 'Entirely inside, off the plate. Ball. If it hit the batter here, it would be a hit-by-pitch, not a strike.'
              },
              {
                id: 'away-ball',
                x: 0.92,
                y: 0.44,
                call: 'ball',
                explain: 'Entirely off the outside edge. Ball. Close is not in — the whole ball is past the plate.'
              },
              {
                id: 'edge-in',
                x: 0.23,
                y: 0.44,
                call: 'strike',
                explain: 'This one catches the inside edge of the 17-inch plate. Any part of the ball over any part of the plate is a strike.'
              },
              {
                id: 'just-off-away',
                x: 0.84,
                y: 0.44,
                call: 'ball',
                explain: 'Just off the outer edge. Youth umpires sometimes call this a strike. The rulebook call is a ball. Learn the real zone, then adjust to the umpire in the game.'
              },
              {
                id: 'letters',
                x: 0.50,
                y: 0.22,
                call: 'strike',
                explain: 'High in the Little League box (armpits down). Under Baseball Canada / OBR this same pitch at the letters is often a ball. Know which book you are playing.'
              },
              {
                id: 'low-in-corner',
                x: 0.28,
                y: 0.66,
                call: 'strike',
                explain: 'The knees, inner half. This is valuable real estate for a pitcher. Strike.'
              },
              {
                id: 'bounce',
                x: 0.48,
                y: 0.96,
                call: 'ball',
                explain: 'In the dirt. A pitch that touches the ground and then comes through the zone is still a ball if the batter does not swing.'
              }
            ]
          }
        },
        {
          type: 'interactive',
          heading: 'Build the count',
          widget: 'countBuilder',
          intro: 'Walk one at-bat. Each pitch changes the count. Watch what a foul does with two strikes — it does not end the at-bat. Balls first, then strikes.',
          opts: {
            steps: [
              {
                pitch: 'ball',
                result: '1-0',
                note: 'First pitch misses. Count is 1–0, balls first. The hitter is a step ahead.'
              },
              {
                pitch: 'called-strike',
                result: '1-1',
                note: 'Taken in the zone. 1–1. Even. The at-bat is still anyone’s.'
              },
              {
                pitch: 'foul',
                result: '1-2',
                note: 'Foul with fewer than two strikes is a strike. 1–2. Now it is a pitcher’s count.'
              },
              {
                pitch: 'foul',
                result: '1-2',
                note: 'Foul with two strikes is not strike three. The count stays 1–2. The at-bat continues. (A foul bunt here would have been an out.)'
              },
              {
                pitch: 'ball',
                result: '2-2',
                note: 'Misses. 2–2. A battle count. Neither side has given it away.'
              },
              {
                pitch: 'ball',
                result: '3-2',
                note: 'Full count. 3–2. A strike ends it, a ball is a walk, a foul keeps it at 3–2.'
              },
              {
                pitch: 'swinging-strike',
                result: 'K',
                note: 'Swing and miss. Strike three. Strikeout. The at-bat is over. Three strikes, not four.'
              }
            ],
            cases: [
              {
                pitch: 'ball',
                result: '1-0',
                note: 'First pitch misses. Count is 1–0, balls first. The hitter is a step ahead.'
              },
              {
                pitch: 'called-strike',
                result: '1-1',
                note: 'Taken in the zone. 1–1. Even. The at-bat is still anyone’s.'
              },
              {
                pitch: 'foul',
                result: '1-2',
                note: 'Foul with fewer than two strikes is a strike. 1–2. Now it is a pitcher’s count.'
              },
              {
                pitch: 'foul',
                result: '1-2',
                note: 'Foul with two strikes is not strike three. The count stays 1–2. The at-bat continues. (A foul bunt here would have been an out.)'
              },
              {
                pitch: 'ball',
                result: '2-2',
                note: 'Misses. 2–2. A battle count. Neither side has given it away.'
              },
              {
                pitch: 'ball',
                result: '3-2',
                note: 'Full count. 3–2. A strike ends it, a ball is a walk, a foul keeps it at 3–2.'
              },
              {
                pitch: 'swinging-strike',
                result: 'K',
                note: 'Swing and miss. Strike three. Strikeout. The at-bat is over. Three strikes, not four.'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'One at-bat, said out loud',
          body: [
            'The umpire is behind the catcher. First pitch, belt-high over the plate. The batter takes it. Called strike. Count: 0–1.',
            'Second pitch is in the dirt. The batter does not swing. Ball. Count: 1–1. Third pitch, the batter fouls it back. Strike two. Count: 1–2.',
            'Fourth pitch, another foul. Still 1–2 — a foul cannot be the third strike. Fifth pitch misses outside. 2–2. Sixth pitch hits the batter in the ribs, off the plate; the batter was not swinging and turned away. Hit by pitch. The batter takes first. No swing, no ball four, no strike three. The at-bat ended with an award.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'Balls and strikes are not a debate',
          body: [
            'You may ask, between batters, how an umpire is seeing the zone. You may not argue the last pitch. Both Baseball Canada and Little League treat ball-strike arguments as ejectable. The zone you teach in practice is the rulebook zone. The zone you live with on Saturday is the one that umpire has.',
            'At 8–10U expect a wider plate and a jumpy top. Reward pitchers who throw strikes anyway. Do not turn a first-season hitter into a watcher who takes called third strikes. See it, swing at hittable. Count-based take-or-hunt waits until 11–12U.',
            'Say the count out loud, balls first, before every pitch. “Two and one.” The dugout, the batter, and the runners should all hear the same two numbers.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'The strike zone is the space over the 17-inch plate, from the knees up to the armpits (Little League) or the letters (Baseball Canada / OBR), in the batter’s natural stance.',
            'The umpire judges the pitch as it crosses the plate. Balls and strikes are judgment and cannot be protested.',
            'A called strike is taken in the zone. A swinging strike is a miss. A foul is a strike unless there are already two — except a foul bunt on strike three, which is an out.',
            'Four balls is a walk. Three strikes is a strikeout. A pitch that hits the batter (not swung at, not in the zone) is a hit by pitch: first base, dead ball.',
            'Say the count balls first. There are twelve live counts, from 0–0 to 3–2. 3–2 is the full count.',
            'Hitter’s counts lean 1–0, 2–0, 3–0, 2–1, 3–1. Pitcher’s counts lean 0–1, 0–2, 1–2. A bounce through the zone is a ball if the batter does not swing.'
          ]
        }
      ],
      quizIds: ['q0501', 'q0502', 'q0503', 'q0504', 'q0505', 'q0506', 'q0507', 'q0508'],
      prev: 'ch04',
      next: 'ch06'
    },

    /* -------------------------------------------------------------- */
    /* ch06 — Getting On, Getting Out                                  */
    /* -------------------------------------------------------------- */
    {
      id: 'ch06',
      tier: 'sandlot',
      order: 6,
      title: 'Getting On, Getting Out',
      subtitle: 'Every way a turn at bat can end',
      minutes: 9,
      objectives: [
        'After this chapter you can name the common ways a batter reaches base, including a hit, a walk, a hit by pitch, an error, and a fielder’s choice.',
        'After this chapter you can name the common ways a batter or runner is out.',
        'After this chapter you can tell a force out from a tag out, and say which bases are forced in a given situation.',
        'After this chapter you can say what a dropped third strike is, and that the rule does not apply in every division.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The at-bat has to end',
          body: [
            'Every turn at the plate ends with the batter on base, or out, or awarded a base. Hits are only one of those endings. A walk from Chapter 5 is another. So is a strikeout. This chapter is the rest of the list — the ways a batter becomes a runner, and the ways the defence records an out.',
            'Learn two families. Ways to reach. Ways to be out. Then learn the one idea that unlocks most defence: force versus tag. Chapter 7 uses that idea every time a runner decides whether to go or stay.'
          ]
        },
        {
          type: 'prose',
          heading: 'Ways to reach',
          body: [
            'A hit is a fair ball the batter reaches on, without an error or a fielder’s choice. A single is first. A double is second. A triple is third. A home run is all four, usually over the fence, still with every base touched.',
            'A walk is four balls. A hit by pitch is first base on a pitch that hits the batter. An error is a play the defence should have made; the batter is on anyway. A fielder’s choice is the defence getting a different runner instead of the batter — the batter reaches, but it is not scored as a hit.',
            'There is one more, in some divisions only: the dropped third strike. If the catcher does not catch strike three, the batter may run to first when first base is empty, or when there are already two outs. If first is occupied and there are fewer than two outs, the batter is out even if the catcher drops it. That last bit stops the catcher from dropping the ball on purpose to start a double play. Chapter 17 goes deep. Here you only need: it exists, and it is not on in every league you will play.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Hits, outs, and one error',
          svg: 'sprayChart',
          opts: {
            showZones: true,
            title: 'How a batted ball can end',
            desc: 'A field outline with batted balls plotted: a single, double, triple, and home run as hits, a groundout, flyout, and pop out as outs, and one error.',
            points: [
              { x: 0.62, y: 0.32, type: 'ground', outcome: 'hit', label: '1B' },
              { x: 0.74, y: 0.58, type: 'line', outcome: 'hit', label: '2B' },
              { x: 0.28, y: 0.72, type: 'fly', outcome: 'hit', label: '3B' },
              { x: 0.50, y: 0.96, type: 'fly', outcome: 'hit', label: 'HR' },
              { x: 0.42, y: 0.28, type: 'ground', outcome: 'out', label: '6-3' },
              { x: 0.50, y: 0.62, type: 'fly', outcome: 'out', label: 'F8' },
              { x: 0.58, y: 0.16, type: 'pop', outcome: 'out', label: 'P4' },
              { x: 0.68, y: 0.30, type: 'ground', outcome: 'error', label: 'E4' }
            ]
          },
          caption: 'Filled marks are hits: single on the infield grass, double in the gap, triple down the line, home run over the fence. Hollow marks are outs: 6-3 groundout, fly to centre, pop to second. E4 is a ball the second baseman should have handled — the batter is on, but it is not a hit.'
        },
        {
          type: 'prose',
          heading: 'Ways to be out',
          body: [
            'A strikeout is three strikes. A groundout is a fair ball on the ground, thrown to a base in time. A flyout is a fair ball caught in the air in the outfield. A line out is a hard, low ball caught in the air. A pop out is a high, short ball caught in the air, usually on the infield.',
            'A force out is the defence touching a base the runner must go to, with the ball, before the runner arrives. A tag out is the defence touching the runner with the ball (or the glove holding the ball) while the runner is off the bag. Caught stealing is a tag out on a runner who was trying to take a base without a batted ball.',
            'Those last three — force, tag, caught stealing — are the same skill on defence: know whether you have to tag the body or only the bag.'
          ]
        },
        {
          type: 'compare',
          heading: 'Force out vs tag out',
          left: {
            title: 'Force out',
            items: [
              'The runner has lost the right to stay. The batter became a runner, so everyone behind them on the bases must move up.',
              'The batter-runner is always forced to first on a fair ball.',
              'A runner on first is forced to second when the batter puts the ball in play. First and second force second and third. Bases loaded forces every base, including home.',
              'The defence only has to touch the bag, with the ball held securely, before the runner gets there.',
              'If the force is removed — for example the batter is out at first first — the remaining runner must now be tagged.'
            ]
          },
          right: {
            title: 'Tag out',
            items: [
              'The runner is not forced. They may stay on the bag they already have.',
              'A runner on second with first empty is not forced. A runner stealing is not forced. A runner tagging up is not forced.',
              'The defence must tag the runner — ball in hand or in the glove, touching the body — while the runner is off the base.',
              'Touching the bag is not enough. The empty bag does not get you the out.',
              'Caught stealing is this play. So is a rundown. So is a runner who rounded first and turned toward second.'
            ]
          }
        },
        {
          type: 'diagram',
          heading: 'A force at second',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            positions: true,
            positionStyle: 'abbr',
            runners: ['first'],
            ball: 'ss-hole',
            arrows: [
              { from: 'ss', to: 'second', style: 'force' }
            ],
            covering: { second: '4' },
            roles: { ss: 'ball', '2b': 'base' },
            title: 'Runner on first, ground ball to shortstop',
            desc: 'A youth diamond with a runner on first, the ball in the shortstop hole, and a force throw from shortstop to second, where the second baseman is covering the bag.'
          },
          caption: 'Runner on first. Ground ball to shortstop. The batter is forced to first, so the runner on first is forced to second. Shortstop throws to the bag at second. The second baseman only has to touch the bag with the ball. That is a force. If they then throw to first in time, it is a double play — 6-4-3 from Chapter 3.'
        },
        {
          type: 'example',
          heading: 'The force that disappears',
          body: [
            'Runner on first, nobody out. Ground ball to the first baseman. The first baseman steps on first. The batter is out. That force is done.',
            'The runner who was on first is now halfway to second. They are no longer forced. First base is open again. To get that runner, the defence must tag them. Stepping on second without tagging the body is not an out.',
            'This is the play that fools first-season infielders. Out number one was easy. Out number two is a tag. Remember: the force lives only while the batter is still a runner who has not been put out.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Dropped third strike — when it is even on',
          intro: 'On an uncaught third strike the batter may run to first only if first is empty, or if there are two outs. That rule is switched off in the youngest divisions so a dropped pitch is just a strikeout. Check the division you are in. Chapter 17 returns to the full play.',
          columns: ['Pathway', 'Division', 'Dropped third strike?'],
          rows: [
            ['Little League (SOLL local)', 'Rookie', 'No — batter is out on strike three'],
            ['Little League (SOLL local)', 'Minor', 'No — batter may not run to first'],
            ['Little League', 'Major', 'Yes in the national book; a local league may opt to keep the Minor rule in the regular season. SOLL spring has kept it off; summer all-star Majors has it on'],
            ['Little League', 'Junior / Senior', 'Yes'],
            ['Baseball Canada', '11U (guidelines)', 'No — batter is automatically retired; the ball stays live for other runners'],
            ['Baseball Canada', '13U+ championships', 'Yes — full OBR: empty first, or two outs']
          ]
        },
        {
          type: 'terms',
          items: [
            'single',
            'double',
            'triple',
            'home-run',
            'error',
            'fielders-choice',
            'dropped-third-strike',
            'groundout',
            'flyout',
            'line-out',
            'pop-out',
            'force-out',
            'tag-out',
            'caught-stealing'
          ]
        },
        {
          type: 'interactive',
          heading: 'Safe or out?',
          widget: 'safeOrOut',
          intro: 'Each card is one play. Decide safe or out. Ask one question first: is this runner forced? If yes, the bag is enough. If no, the defence needs a tag.',
          opts: {
            mode: 'safe-out',
            cases: [
              {
                id: 'force-first',
                prompt: 'Nobody on. Ground ball to shortstop. The throw to first arrives before the batter. The first baseman steps on the bag with the ball. Safe or out?',
                text: 'Nobody on. Ground ball to shortstop. The throw to first arrives before the batter. The first baseman steps on the bag with the ball. Safe or out?',
                answer: 'out',
                explain: 'The batter-runner is always forced to first. Touching the bag with the ball is a force out.'
              },
              {
                id: 'force-second',
                prompt: 'Runner on first. Ground ball to shortstop. Shortstop throws to second. The second baseman steps on the bag before the runner from first arrives. Safe or out at second?',
                text: 'Runner on first. Ground ball to shortstop. Shortstop throws to second. The second baseman steps on the bag before the runner from first arrives. Safe or out at second?',
                answer: 'out',
                explain: 'The batter became a runner, so the runner on first is forced to second. The bag is enough. Force out.'
              },
              {
                id: 'no-force-third',
                prompt: 'Runner on second, first base empty. Ground ball to third. The third baseman steps on third before the runner gets there, but never tags the runner. Safe or out?',
                text: 'Runner on second, first base empty. Ground ball to third. The third baseman steps on third before the runner gets there, but never tags the runner. Safe or out?',
                answer: 'safe',
                explain: 'First is empty, so the runner on second is not forced. Touching the bag does nothing. The defence had to tag the body.'
              },
              {
                id: 'tag-steal',
                prompt: 'Runner on first tries to steal second. The catcher throws. The second baseman tags the runner off the bag. Safe or out?',
                text: 'Runner on first tries to steal second. The catcher throws. The second baseman tags the runner off the bag. Safe or out?',
                answer: 'out',
                explain: 'No batted ball, so nobody is forced. This is a tag out — caught stealing.'
              },
              {
                id: 'fly-caught',
                prompt: 'Batter hits a fly ball to centre. The centre fielder catches it in the air. Safe or out?',
                text: 'Batter hits a fly ball to centre. The centre fielder catches it in the air. Safe or out?',
                answer: 'out',
                explain: 'A caught fly is an out. The batter is out whether anyone else is on base or not. Runners must tag up if they want to advance.'
              },
              {
                id: 'overrun-turn',
                prompt: 'Batter beats the throw to first and runs through the bag, then turns toward second and takes a step. The first baseman tags them before they get back. Safe or out?',
                text: 'Batter beats the throw to first and runs through the bag, then turns toward second and takes a step. The first baseman tags them before they get back. Safe or out?',
                answer: 'out',
                explain: 'Running through first is allowed if you veer foul. Turning toward second is a move to advance. Now they can be tagged off the bag.'
              },
              {
                id: 'force-removed',
                prompt: 'Runner on first. Ground ball to first. The first baseman steps on first (batter out), then throws to second. The shortstop steps on second but does not tag the runner, who is still coming. Safe or out at second?',
                text: 'Runner on first. Ground ball to first. The first baseman steps on first (batter out), then throws to second. The shortstop steps on second but does not tag the runner, who is still coming. Safe or out at second?',
                answer: 'safe',
                explain: 'The out at first removed the force. The runner going to second now has to be tagged. The bag alone is not enough.'
              },
              {
                id: 'bases-loaded-home',
                prompt: 'Bases loaded. Ground ball to the pitcher. Pitcher throws home. The catcher steps on the plate with the ball before the runner from third arrives. Safe or out at home?',
                text: 'Bases loaded. Ground ball to the pitcher. Pitcher throws home. The catcher steps on the plate with the ball before the runner from third arrives. Safe or out at home?',
                answer: 'out',
                explain: 'Bases loaded means every base is forced, including home. The catcher only has to touch the plate. That is a force, not a tag.'
              },
              {
                id: 'line-caught-hold',
                prompt: 'Runner on first, one out. Line drive to the shortstop, caught. The runner had frozen on first and is standing on the bag. Safe or out on the runner?',
                text: 'Runner on first, one out. Line drive to the shortstop, caught. The runner had frozen on first and is standing on the bag. Safe or out on the runner?',
                answer: 'safe',
                explain: 'The batter is out on the catch. The runner who stayed on the bag is safe. If they had broken for second, they could be doubled off first with a throw.'
              },
              {
                id: 'tag-home',
                prompt: 'Runner on third, first empty, one out. Ground ball to the catcher. The runner breaks for home. The catcher tags them on the line, off the plate. Safe or out?',
                text: 'Runner on third, first empty, one out. Ground ball to the catcher. The runner breaks for home. The catcher tags them on the line, off the plate. Safe or out?',
                answer: 'out',
                explain: 'First is empty, so the runner on third is not forced. Home is a tag play. The catcher tagged the body. Out.'
              }
            ]
          }
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Ways to reach: single, double, triple, home run, walk, hit by pitch, error, fielder’s choice — and, in some divisions, dropped third strike.',
            'Ways to be out: strikeout, groundout, flyout, line out, pop out, force out, tag out, caught stealing.',
            'A force exists when the batter becomes a runner and the base behind a runner is occupied. The defence touches the bag.',
            'If there is no force, the defence must tag the runner. The bag is not enough.',
            'The batter is always forced to first on a fair ball. Bases loaded forces every base, including home.',
            'A dropped third strike lets the batter run only when first is empty or there are two outs — and only in divisions where the rule is on. It is off in SOLL Rookie/Minor and Baseball Canada 11U.'
          ]
        }
      ],
      quizIds: ['q0601', 'q0602', 'q0603', 'q0604', 'q0605', 'q0606', 'q0607'],
      prev: 'ch05',
      next: 'ch07'
    },

    /* -------------------------------------------------------------- */
    /* ch07 — Running the Bases                                        */
    /* -------------------------------------------------------------- */
    {
      id: 'ch07',
      tier: 'sandlot',
      order: 7,
      title: 'Running the Bases',
      subtitle: 'When to go, when to stay, how to slide',
      minutes: 10,
      objectives: [
        'After this chapter you can say why a batter-runner may run through first, and why they must veer into foul territory.',
        'After this chapter you can name the running lane and say when a runner is forced to the next base.',
        'After this chapter you can tag up on a caught fly ball and freeze-and-read on a line drive.',
        'After this chapter you can name the default youth slide (feet-first), and why head-first into a base you are advancing to is the wrong habit.',
        'After this chapter you can say when to look at which base coach, and that the helmet stays on.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'First base is a special bag',
          body: [
            'On a ground ball, the batter-runner’s job is to beat the throw to first. Run through the bag at full speed. Touch the front edge. Then veer into foul territory and slow down. That overrun is legal only at first, and only if you do not make a move toward second.',
            'Turn toward second and you have become a runner trying to advance. The defence may tag you. Turn into foul ground and they may not. That is why coaches shout “right, right, right” as you cross the bag — they want you peeling off into foul territory.',
            'You do not run through second. You do not run through third. You do not run through home. Those bags you stop on, or slide into. First is the exception because the only job on a routine grounder is to beat a force throw, then get out of the way.'
          ]
        },
        {
          type: 'prose',
          heading: 'The running lane',
          body: [
            'The last half of the way from home to first, a lane is marked in foul territory — the three-foot lane, on the right of the foul line as you run. Both feet should be in that lane, or on its lines, while the defence is throwing to first.',
            'Leave the lane and interfere with the throw, and you can be called out. You may leave the lane to avoid a fielder who is fielding the batted ball. You may not leave it to make the first baseman’s catch harder.',
            'Fielders have a matching job: if they do not have the ball and are not fielding it, they get out of the runner’s path. Standing in the lane without the ball is obstruction. Runners avoid fielders who are fielding. Fielders yield when they are not.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Who is forced',
          svg: 'basePaths',
          opts: {
            labels: true,
            shade: 'force',
            outs: 0,
            runners: [
              { from: 'home', to: 'first', style: 'force', label: 'Batter' },
              { from: 'first', to: 'second', style: 'force', label: 'R1' }
            ],
            title: 'Force with a runner on first',
            desc: 'A base-path diamond with force-out bases shaded, and runner arrows from home to first and first to second.'
          },
          caption: 'Runner on first, ball put in play. The batter is forced to first. That forces the runner on first to second. The defence may touch either bag for an out. Add a runner on second, and third becomes forced too. Bases loaded forces home. Empty first, and nobody ahead of the batter is forced.'
        },
        {
          type: 'prose',
          heading: 'How a runner becomes forced',
          body: [
            'A force is not a feeling. It is a rule. The moment the batter becomes a runner, every runner occupying a base with no empty base behind them loses the right to stay. They must go.',
            'That is why first is always a force for the batter on a fair ball. That is why a runner on first is forced when the ball is put in play. That is why a runner on second is forced only if first is also occupied. Take the batter away — fly out, or the batter out at first — and the force on the other runners disappears. Chapter 6 showed that disappearing force. On the bases you live it: if you are not forced, you may stay; if you are, you must go.',
            'With two outs, the read is simpler. Everyone goes on contact. The inning is one out from over. Hesitation helps no one. The cue: “two outs, you’re running on anything.”'
          ]
        },
        {
          type: 'diagram',
          heading: 'Tagging up from third',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            positions: true,
            positionStyle: 'abbr',
            runners: ['third'],
            ball: 'left-center-gap',
            arrows: [
              { from: 'third', to: 'home', style: 'tag-up' }
            ],
            title: 'Sacrifice fly: tag up and go',
            desc: 'A youth diamond with a runner on third, a fly ball in the left-centre gap, and a tag-up arrow from third to home.'
          },
          caption: 'One out, runner on third, fly ball to the outfield. Freeze, then get back to the bag. Leave on the fielder’s first touch, not on the clean catch. The third-base coach will send or hold. A deep fly beyond the infield grass is the most common way to score without a hit.'
        },
        {
          type: 'prose',
          heading: 'Freeze and read',
          body: [
            'The ball leaves the bat as a ground ball, a line drive, or a fly ball. Those three reads decide whether you go, wait, or get back.',
            'Ground ball: run. Through first if you are the batter. To the next base if you are forced. On contact with two outs, everyone runs. Line drive: freeze. A line drive caught with a runner already moving is a double play. Hold until the ball hits the ground. Soft and high? Read. Hard and low? Hold.',
            'Fly ball: freeze and read. If it will be caught, return to the bag and tag up. You may leave on first contact with the glove, even if the fielder bobbles it. From third, tag on almost any outfield fly caught beyond the infield grass. From second, tag on deep flies to centre or left. From first, most shallow flies mean stay. If the ball will clearly drop, you do not need to tag — just run. If you are unsure, hold partway, then commit.'
          ]
        },
        {
          type: 'prose',
          heading: 'When to look at the coach',
          body: [
            'You cannot see the whole outfield while you run. That is what base coaches are for. Two of them: one at first, one at third, in the coach’s boxes. They may wave, shout, and point. They may not touch you. Grabbing a runner to stop them is coach interference — the runner is out.',
            'The first-base coach owns the decision at first: round or hold, and “go” on a wild pitch. Once you pass first and commit to second, the third-base coach owns the rest. Windmill arm means go. Both arms out means hold. A point at the bag means get back. A downward slide signal means a close play is coming — get down.',
            'At 8–12, look at third before you advance from second. Do not make that read alone yet. The coach has the better sightline. One voice. If the dugout and the coach disagree, the coach in the box wins during live play.'
          ]
        },
        {
          type: 'prose',
          heading: 'Sliding: feet first, hands up',
          body: [
            'The default slide in youth baseball is feet-first. Start the slide 6 to 8 feet before the bag. Tuck one leg under so the body makes a J. The other leg reaches the front of the bag. Contact the ground on the outside of the thigh, not the knee. Hands up, thumbs up — off the dirt. Hands down is how fingers break.',
            'A pop-up slide is the same shape, then you use the bag to stand and maybe go again if the fielder bobbles. A hook slide — angling past the bag and reaching back — waits until the basic slide is automatic.',
            'Head-first into a base you are advancing toward is the wrong habit here. Hands and collarbones meet a tag and a cleat. Diving back to a bag on a pickoff is a different play, and it is allowed. Advancing head-first is what the rules and the safety guidance are about. Helmet stays on the whole time you are on the bases. It comes off in the dugout, not between second and third.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Head-first slides, by pathway',
          intro: 'Feet-first is the teaching default everywhere. The rulebook split is about whether a head-first advance is an automatic out.',
          columns: ['Pathway', 'Head-first while advancing', 'Diving back to a bag'],
          rows: [
            ['Little League (all levels)', 'Prohibited. Runner is out (Rule 7.08, as applied locally including SOLL).', 'Allowed — returning to a base, for example on a pickoff, is the exception'],
            ['Baseball Canada / OBR', 'No blanket prohibition in the Official Baseball Rules. Baseball Canada and most youth leagues strongly discourage it under about age 14. Confirm any provincial extra.', 'Allowed, and often the right technique']
          ]
        },
        {
          type: 'terms',
          items: [
            'running-lane',
            'tag-up',
            'slide',
            'pop-up-slide',
            'head-first-slide',
            'overrun'
          ]
        },
        {
          type: 'interactive',
          heading: 'Where does each runner end up?',
          widget: 'runnerAdvance',
          intro: 'Read the situation. Predict the extra base, the hold, or the out. Think force, then the ball off the bat, then the coach.',
          opts: {
            cases: [
              {
                id: 'through-first',
                text: 'Nobody on, nobody out. Ground ball to shortstop. The throw to first is late. The batter runs through the bag and veers foul.',
                prompt: 'Nobody on, nobody out. Ground ball to shortstop. The throw to first is late. The batter runs through the bag and veers foul.',
                start: { first: false, second: false, third: false },
                hit: 'ground-to-ss-late-throw',
                correct: { batter: 'first', first: null, second: null, third: null },
                explain: 'The batter beat a force throw to first and overran legally into foul ground. They stay at first. No one else was on.'
              },
              {
                id: 'force-dp-broken',
                text: 'Runner on first, nobody out. Ground ball to shortstop. Shortstop throws to second in time (runner from first is out), and the throw to first is late.',
                prompt: 'Runner on first, nobody out. Ground ball to shortstop. Shortstop throws to second in time (runner from first is out), and the throw to first is late.',
                start: { first: true, second: false, third: false },
                hit: 'ground-to-ss',
                correct: { batter: 'first', first: 'out', second: null, third: null },
                explain: 'Force at second for the runner who was on first. The batter beats the relay and is at first. One out, runner on first.'
              },
              {
                id: 'sac-fly',
                text: 'Runner on third, one out. Deep fly to centre is caught. The runner tagged up on first contact and the coach sent them.',
                prompt: 'Runner on third, one out. Deep fly to centre is caught. The runner tagged up on first contact and the coach sent them.',
                start: { first: false, second: false, third: true },
                hit: 'fly-caught-cf',
                correct: { batter: 'out', first: null, second: null, third: 'home' },
                explain: 'Batter is out on the catch. The runner left third after first touch and scored. That is a sacrifice fly. Two outs, run in, bases empty.'
              },
              {
                id: 'line-drive-hold',
                text: 'Runner on first, one out. Line drive at the shortstop is caught. The runner froze on first.',
                prompt: 'Runner on first, one out. Line drive at the shortstop is caught. The runner froze on first.',
                start: { first: true, second: false, third: false },
                hit: 'line-caught-ss',
                correct: { batter: 'out', first: 'first', second: null, third: null },
                explain: 'Hard and low: hold. The batter is out. The runner who stayed on the bag is still at first. Two outs. If they had broken, they would be doubled off.'
              },
              {
                id: 'two-out-contact',
                text: 'Runner on second, two outs. Ground ball to third. Everyone goes on contact. The throw goes to first and the batter is out.',
                prompt: 'Runner on second, two outs. Ground ball to third. Everyone goes on contact. The throw goes to first and the batter is out.',
                start: { first: false, second: true, third: false },
                hit: 'ground-to-3b',
                correct: { batter: 'out', first: null, second: null, third: null },
                explain: 'Two outs, run on anything. The third out at first ends the inning before the runner from second can score. Third-out on the batter-runner at first means no run. Everyone off the bases.'
              },
              {
                id: 'first-to-third',
                text: 'Runner on first, nobody out. Single into right field. The first-base coach rounds the batter; the third-base coach waves the runner from first all the way to third. The throw goes to second, late.',
                prompt: 'Runner on first, nobody out. Single into right field. The first-base coach rounds the batter; the third-base coach waves the runner from first all the way to third. The throw goes to second, late.',
                start: { first: true, second: false, third: false },
                hit: 'single-rf',
                correct: { batter: 'first', first: 'third', second: null, third: null },
                explain: 'A single to right is the extra-base read from first. The lead runner takes third. The batter holds at first. First and third, nobody out.'
              },
              {
                id: 'shallow-fly-stay',
                text: 'Runner on third, one out. Pop fly on the infield is caught by the first baseman. The runner started back to the bag and stayed.',
                prompt: 'Runner on third, one out. Pop fly on the infield is caught by the first baseman. The runner started back to the bag and stayed.',
                start: { first: false, second: false, third: true },
                hit: 'pop-caught-1b',
                correct: { batter: 'out', first: null, second: null, third: 'third' },
                explain: 'Shallow infield fly: do not tag and go. The throw to home is too short. Batter out, runner still at third, two outs.'
              },
              {
                id: 'not-forced-hold',
                text: 'Runner on second, first empty, nobody out. Ground ball to shortstop. The runner holds second. The throw retires the batter at first.',
                prompt: 'Runner on second, first empty, nobody out. Ground ball to shortstop. The runner holds second. The throw retires the batter at first.',
                start: { first: false, second: true, third: false },
                hit: 'ground-to-ss',
                correct: { batter: 'out', first: null, second: 'second', third: null },
                explain: 'First is empty, so the runner on second is not forced. Holding is legal. One out, runner still at second. Going would have been a tag play at third.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'From the box',
          body: [
            'Commit early on a send or a hold. “Go” then “back” puts a child in a rundown. Read the outfielder’s momentum, not only the contact: a right fielder coming in is a hold; a ball in the gap with the fielder’s back to the infield is a send.',
            'Stay in the coach’s box. Do not grab a runner. Injured-player help is the exception. At Little League Minor and below, adults typically coach both bases; at Majors, a rostered player may coach a base. Confirm who is eligible before you put a child in the box.',
            'First-base coach: round or hold, and shout on a passed ball — the batter-runner often cannot see it. Third-base coach: every decision past first. The dugout does not override the box during the play. Debrief sends after the inning, not in the baseline.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Run through first on a grounder, then veer foul. Turning toward second makes you taggable. You do not run through any other base.',
            'The last half of the way to first, stay in the three-foot running lane unless you are avoiding a fielder who is fielding the ball.',
            'A force means you must go. No force means you may stay. Two outs: everyone goes on contact.',
            'Fly ball: freeze and read. Tag up from third on a catch beyond the infield grass. Line drive: hold until it hits the ground.',
            'Look at the first-base coach at first, the third-base coach after that. Windmill is go. Arms out is hold. Coaches may not touch you.',
            'Slide feet-first, hands up. Head-first advancing is an out in Little League and a bad idea in youth Baseball Canada. Helmet stays on until the dugout.'
          ]
        }
      ],
      quizIds: ['q0701', 'q0702', 'q0703', 'q0704', 'q0705', 'q0706', 'q0707'],
      prev: 'ch06',
      next: 'ch08'
    },

    /* -------------------------------------------------------------- */
    /* ch08 — How a Game Is Played and Won                             */
    /* -------------------------------------------------------------- */
    {
      id: 'ch08',
      tier: 'sandlot',
      order: 8,
      title: 'How a Game Is Played and Won',
      subtitle: 'Innings, the batting order, and the scoreboard',
      minutes: 9,
      objectives: [
        'After this chapter you can describe a half-inning and say why the visiting team bats first.',
        'After this chapter you can explain that the batting order is fixed, that it wraps around, and that most youth leagues get everyone a turn.',
        'After this chapter you can name how long a typical game is in your pathway, and what a mercy or run-ahead rule does.',
        'After this chapter you can say whether the home team bats when already ahead after the top of the last inning.',
        'After this chapter you can read a simple line score: runs, hits, and errors.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The visiting team bats first',
          body: [
            'A game is a stack of innings. Each inning has two halves. The visiting team bats in the top. The home team takes the field. After three outs, they swap: home bats in the bottom, visitors field. That is one full inning.',
            'The home team fields first on purpose. If they already lead after the top of the last scheduled inning, they do not need their last turn at bat. The umpire can end it there. If they trail or the game is tied, they still bat. If they take the lead in that last half, the game ends as soon as the winning run is in — they do not keep batting for extra runs.',
            'There is still no running clock in the sport itself. Youth leagues add local time caps so a school-night game ends. Those caps are real, and they differ by division. Know yours before first pitch.'
          ]
        },
        {
          type: 'diagram',
          heading: 'One inning, from top to bottom',
          svg: 'timeline',
          opts: {
            title: 'The half-inning flip',
            highlight: 0,
            items: [
              { label: 'Top: visitors bat', sub: 'Home fields', marker: '1' },
              { label: 'Three outs', sub: 'Side retired', marker: '2' },
              { label: 'Teams swap', sub: 'Home comes in', marker: '3' },
              { label: 'Bottom: home bats', sub: 'Visitors field', marker: '4' },
              { label: 'Three outs', sub: 'Inning over', marker: '5' }
            ]
          },
          caption: 'Every inning is this flip, twice. The number of innings in the game is a division rule, not a feeling. If home already leads after step 2 of the last inning, steps 3–5 do not happen.'
        },
        {
          type: 'prose',
          heading: 'The batting order',
          body: [
            'Before the game the manager hands the umpire a batting order: a fixed list of who hits when. That list does not reshuffle because someone just got a hit. The next batter is whoever is next on the card. After the last name, it wraps to the top. The ninth hitter is followed by the first, not by a new list.',
            'In a traditional nine-hitter order, substitutes replace someone in that slot and bat in that same place. In a continuous batting order — a Little League option, and the usual house-league habit — every player present is on the list. Everyone bats. The order still wraps. You do not skip a child who is playing right field.',
            'Most youth leagues you will watch are trying to get everyone a turn. That is a rule in Little League regular season (mandatory play) and a local fair-play habit in many house leagues. Baseball Canada championships use a conventional order, with an optional extra hitter so a tenth athlete bats. The idea is the same: the card is the law of who is up, not the coach’s mood in the fourth inning.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'How long the game is, and when it ends early',
          intro: 'Adult baseball is nine innings. Youth baseball is shorter, and a big lead can end it before the last inning. Local time caps sit on top of these numbers. Homerun’s Ottawa leagues live in both pathways — confirm the book for tonight’s game.',
          columns: ['Pathway', 'Division', 'Scheduled length', 'Mercy / run cap'],
          rows: [
            ['Little League', 'Majors (national)', '6 innings; home may skip the bottom if already ahead', '15 runs after 3 inn. (2½ if home ahead); 10 after 4 (3½ home); 8 after 5 (4½ home), regular season only — no 8-run rule in tournament'],
            ['Little League', 'Intermediate / Junior / Senior', '7 innings', '15 after 4 (3½ home); 10 after 5 (4½ home); 8 after 6 (5½ home), regular season only'],
            ['Little League (SOLL local)', 'Rookie / Minor', '6 innings; no new inning after 45 min (Rookie) or 2 hours (Minor+)', 'Minor: 5-run per inning in the national book; SOLL 4 runs/inning in May, 5 in June. Mercy also listed locally as 10 after 4'],
            ['Baseball Canada', '11U (guidelines)', '6 innings (weather permitting); 3½ with home ahead is official', '5-run cap per half-inning; no cap in the final inning'],
            ['Baseball Canada', 'Championships (13U+ national)', 'Mercy math credits 7 innings', '15 runs after 4 (3½ home); 10 after 5 (4½ home)'],
            ['Baseball Canada (NCOBA, Ottawa)', '13U and below', '7 innings; no new inning after 2 hours unless tied', 'Curfew-capped; at 8U/9U a 2-hour curfew plus a 10-run lead can end it'],
            ['Baseball Canada (NCOBA, Ottawa)', '14U–22U / Women', '9 innings; 2½-hour curfew', '15 after 5 (4½ home); 10 after 7 (6½ home) — different innings than the national championship grid']
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Who has to play, and how you substitute',
          intro: 'The batting order and the substitution rules are how youth baseball tries (or does not try) to guarantee a turn. A pathway that uses a continuous order does not need the same paperwork as a pathway that uses nine hitters and a minimum-play rule.',
          columns: ['Pathway', 'Batting list', 'Minimum play', 'Re-entry notes'],
          rows: [
            ['Little League regular season', 'Traditional 9, or continuous (all present players bat)', 'Traditional: every player present at the start must play 6 defensive outs and bat at least once. With 15–20 on the roster and 15+ present, that may drop to 3 outs and 1 at-bat. Does not apply in tournament play, when continuous order is used, or in Senior', 'Pitcher removed from the mound cannot return as pitcher (except Intermediate/Junior/Senior, once per game)'],
            ['Little League continuous order', 'Everyone present, fixed order, wraps', 'The batting guarantee is automatic. The running part of mandatory play is waived', 'Still a substitution rule on defence; the next batter is always the next name'],
            ['Baseball Canada championships', 'Conventional 9, plus optional Extra Hitter (10th batter) declared on the card; lineup in 30 minutes before first pitch', 'No per-game minimum at the national championship level', 'Standard OBR substitution; a pitcher removed may not return to pitch'],
            ['Baseball Canada 11U (guidelines)', 'More open than championships; free offensive re-entry (insert/remove on arrival/departure, no automatic out)', 'A player present should start on defence at least one game out of two; about 6 of 12 defensive innings across two games is the equity example', 'Defensive re-entry at any position except pitcher, once that player has pitched']
          ]
        },
        {
          type: 'prose',
          heading: 'Extra innings, ties, and when home does not bat',
          body: [
            'If the score is tied after the scheduled length, the game goes on. Little League: after six innings in Majors (seven in Intermediate, Junior, Senior), keep playing until the visitor has more runs at the end of a completed inning, or the home team scores the winning run in an uncompleted one. That last case is the walk-off: the winning run reaches home, and you stop.',
            'A called game that is still tied is a tie. Little League names it that way. Local time caps complicate this. NCOBA (Ottawa, Baseball Canada pathway) keeps playing a tie past the curfew unless the park or the lights stop you; at 13U and below the “no new inning after two hours” rule itself yields if the game is tied. Do not assume a 1–1 game at the time limit is over until someone has checked the local book.',
            'One more finish you will see every week: home already leads after the top of the last inning. They do not bat. The visitors had their chance. That is not unsporting. That is the visitor-bats-first convention doing its job.'
          ]
        },
        {
          type: 'diagram',
          heading: 'A first look at the line score',
          svg: 'bar',
          opts: {
            title: 'Line score: R, H, and E',
            unit: '',
            max: 12,
            series: [
              { label: 'Visitors R', value: 4, note: 'Runs — how the game is won' },
              { label: 'Home R', value: 6, note: 'Home wins 6–4' },
              { label: 'Visitors H', value: 8, note: 'Hits — balls in play that became hits' },
              { label: 'Home H', value: 10, note: 'More hits than runs is normal' },
              { label: 'Visitors E', value: 2, note: 'Errors — chances the defence missed' },
              { label: 'Home E', value: 1, note: 'Fewer errors, not always fewer runs' }
            ]
          },
          caption: 'R is runs: the only number that decides the winner. H is hits: singles, doubles, triples, home runs — not walks, not errors. E is errors: plays the defence should have made. Home 6, visitors 4, even if the visitors sprinkled more walks. Chapter 21 turns this into a full scorebook. For now, read those three letters on the board.'
        },
        {
          type: 'example',
          heading: 'Reading the board after five',
          body: [
            'The scoreboard shows visitors 3, home 3 after five complete innings. Hits are 7 and 6. Errors are 1 and 2. It is a tie. Runs are even. Hits are not the same thing as runs — the visitors had one more hit and still did not lead.',
            'If this is Little League Majors, there is one more scheduled inning. Top of the sixth: visitors bat. If they score twice and you retire them, home still bats unless a 10-run rule has already ended it (it has not: the lead would be two, not ten). Bottom of the sixth, home needs two to tie and three to win. If home scores the third run with the bases loaded on a walk, the game ends when that runner from third touches home and the batter touches first — they do not keep hitting.',
            'If instead home already led 5–3 after the top of the sixth, home would stay in the dugout. Game over. Most runs, not most hits, not fewest errors.'
          ]
        },
        {
          type: 'terms',
          items: [
            'batting-order',
            'continuous-batting-order',
            'extra-hitter',
            'mandatory-play',
            'mercy-rule',
            'line-score',
            'extra-innings',
            'substitution'
          ]
        },
        {
          type: 'interactive',
          heading: 'Does this game keep going?',
          widget: 'makeTheCall',
          intro: 'Game-flow calls. Pick the ruling. The visitor-bats-first convention, the last-inning skip, mercy thresholds, and the batting order wrapping around are the whole trick.',
          opts: {
            mode: 'game-flow',
            cases: [
              {
                id: 'home-leads-last',
                prompt: 'Little League Majors. Home leads 4–2 after the top of the sixth. Do they bat in the bottom of the sixth?',
                situation: 'Little League Majors. Home leads 4–2 after the top of the sixth. Do they bat in the bottom of the sixth?',
                choices: [
                  'Yes. Every inning must have two halves.',
                  'No. The home team needs none of its last half if it already leads.',
                  'Only if the visitors ask to keep playing.'
                ],
                answer: 1,
                explain: 'A regulation Majors game is six innings, shortened when home already leads after the top of the sixth. They do not bat. The visitors had their sixth-inning turn.',
                rule: 'LL 4.10(a)',
                division: 'Little League Majors (national); Intermediate/Junior/Senior skip the bottom of the seventh the same way'
              },
              {
                id: 'tie-after-six',
                prompt: 'Little League Majors. The score is 3–3 after six complete innings. What happens?',
                situation: 'Little League Majors. The score is 3–3 after six complete innings. What happens?',
                choices: [
                  'It is a tie. Everyone goes home.',
                  'Extra innings. Play until the visitor leads after a completed inning, or home scores the winning run in an uncompleted one.',
                  'Home is awarded the win because they bat last.'
                ],
                answer: 1,
                explain: 'A tie after six (seven at Intermediate/Junior/Senior) extends the game. Home does not win by batting last. They have to actually score more.',
                rule: 'LL 4.10(b)',
                division: 'Little League Majors; add one inning at Intermediate/Junior/Senior'
              },
              {
                id: 'visitor-leads-last',
                prompt: 'Visitors lead 5–4 going to the bottom of the last scheduled inning. Does home bat?',
                situation: 'Visitors lead 5–4 going to the bottom of the last scheduled inning. Does home bat?',
                choices: [
                  'No. Last inning means the game is over.',
                  'Yes. Home still has its turn, and can tie or win.',
                  'Only the first three hitters bat, then you stop.'
                ],
                answer: 1,
                explain: 'Home only skips the last half when already ahead. Trailing or tied, they bat. A walk-off ends it when the winning run is in; they do not keep batting for style points.',
                rule: 'LL 4.10(a)–(b)',
                division: 'Both pathways; the last scheduled inning is 6, 7, or 9 depending on division'
              },
              {
                id: 'mercy-fifteen',
                prompt: 'Little League Majors, regular season. After 2½ innings the home team leads 16–1. What happens?',
                situation: 'Little League Majors, regular season. After 2½ innings the home team leads 16–1. What happens?',
                choices: [
                  'Keep playing. Mercy is only after six innings.',
                  'The losing manager concedes. The 15-run rule applies after 3 innings, or 2½ if home is ahead.',
                  'It becomes a 5-run-per-inning cap from here on.'
                ],
                answer: 1,
                explain: 'National Little League: 15 runs after 3 innings (2½ if home ahead). Home is ahead by 15 after 2½, so the game ends. The 5-run-per-inning cap is a Minor-division (and some local) rule, not this play.',
                rule: 'LL 4.10(e) / Tournament Rule 12',
                division: 'Little League Majors; Intermediate/Junior/Senior wait until 4 innings (3½ home)'
              },
              {
                id: 'order-wraps',
                prompt: 'Continuous batting order, 11 players present. The 11th hitter just made the third out of the inning. Who leads off the next inning?',
                situation: 'Continuous batting order, 11 players present. The 11th hitter just made the third out of the inning. Who leads off the next inning?',
                choices: [
                  'The leadoff hitter — every inning starts over at the top.',
                  'The first hitter in the order, because 11 wraps to 1.',
                  'Whoever the coach likes in this matchup.'
                ],
                answer: 1,
                explain: 'The order is fixed and it wraps. After the last name (here, 11) comes the first name. The next inning does not reset to the top unless the last out happened to be the last name — which, here, it was, so the first hitter is up. The coach does not pick.',
                rule: 'LL Rule 4.04 / continuous batting order',
                division: 'Little League continuous order; a traditional 9-hitter card wraps 9 to 1 the same way'
              },
              {
                id: 'must-play',
                prompt: 'Little League Majors, regular season, traditional nine-hitter order. It is the fifth inning and one rostered player who started the game has not yet batted or played defence. What is the coach’s problem?',
                situation: 'Little League Majors, regular season, traditional nine-hitter order. It is the fifth inning and one rostered player who started the game has not yet batted or played defence. What is the coach’s problem?',
                choices: [
                  'None. Bench players are optional in Majors.',
                  'Mandatory play: that player still needs 6 defensive outs and 1 at-bat. Get them in before a mercy or the sixth inning ends the game.',
                  'The player is automatically inserted as Extra Hitter.'
                ],
                answer: 1,
                explain: 'Regulation IV.i guarantees 6 defensive outs and 1 at-bat in regular-season traditional order. Extra Hitter is a Baseball Canada championship option, not a Little League auto-insert. Plan the rotation before the game, not in the fifth.',
                rule: 'LL Regulation IV.i',
                division: 'Little League regular season, traditional order; waived for continuous order, tournament, and Senior'
              }
            ]
          }
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Visitors bat in the top of each inning; home bats in the bottom. Home fields first. If home already leads after the top of the last inning, they do not bat.',
            'The batting order is fixed and wraps. Most youth leagues get everyone a turn — continuous order, mandatory play, or an extra hitter, depending on the pathway.',
            'Little League Majors is six innings; Intermediate/Junior/Senior are seven. Baseball Canada 11U is six. Ottawa NCOBA 14U+ is nine, with a curfew.',
            'Mercy (run-ahead) ends a blowout early. The inning it kicks in is different in Little League, Baseball Canada championships, and NCOBA. Per-inning caps exist at some younger levels.',
            'Tied after the scheduled length: extra innings, unless a local curfew or a called game says otherwise. Do not invent a runner-on-second rule that your book does not have.',
            'Line score: R is runs (the winner), H is hits, E is errors. Chapter 21 turns those letters into a scorebook.'
          ]
        }
      ],
      quizIds: ['q0801', 'q0802', 'q0803', 'q0804', 'q0805', 'q0806', 'q0807'],
      prev: 'ch07',
      next: 'ch09'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
