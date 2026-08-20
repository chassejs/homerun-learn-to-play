/* ===================================================================
   Homerun Learn to Play — curriculum-t1.js
   Tier 1 (Rookie) chapters 1–4. Registers onto HRL_CURRICULUM.
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
    /* ch01 — What Baseball Is                                         */
    /* -------------------------------------------------------------- */
    {
      id: 'ch01',
      tier: 'rookie',
      order: 1,
      title: 'What Baseball Is',
      subtitle: 'The object of the game in five minutes',
      minutes: 6,
      objectives: [
        'After this chapter you can say what each team is trying to do.',
        'After this chapter you can explain how a run scores.',
        'After this chapter you can tell when a half-inning ends and why the teams swap.',
        'After this chapter you can name how long a typical youth game is, and how that differs from a nine-inning adult game.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Two teams, one ball',
          body: [
            'Baseball is a game between two teams. One team bats. The other team fields. They take turns.',
            'The batting team is trying to score runs. The fielding team is trying to stop that by making outs. After three outs, the teams swap jobs.',
            'There is no running game clock. Play is counted in innings, not minutes. The team with more runs at the end wins.'
          ]
        },
        {
          type: 'diagram',
          heading: 'A first look at the field',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            title: 'A youth baseball diamond',
            desc: 'A baseball diamond viewed from behind home plate, with home, first, second, and third labelled, plus the mound, infield, outfield, and foul lines.'
          },
          caption: 'The field is a diamond. Home plate is the point closest to you in this view. First, second, and third base sit at the other three corners. The white lines running out from home are the foul lines.'
        },
        {
          type: 'prose',
          heading: 'How a run scores',
          body: [
            'A batter stands at home plate and tries to hit a ball thrown by the pitcher. If the batter puts the ball in play, they become a runner and race toward first base.',
            'A run scores when a runner touches first, then second, then third, then home plate — all four bases, in order. Missing a base means the run is not yet in.',
            'The batting team can have several runners on the bases at once. Each one who completes the loop adds one run to the score.'
          ]
        },
        {
          type: 'steps',
          heading: 'One run, from the bat to home',
          items: [
            {
              title: 'Contact',
              body: 'The batter hits a fair ball and drops the bat. They are now a runner. Their first job is to reach first base.'
            },
            {
              title: 'First base',
              body: 'If they arrive before the fielding team can get the ball to first, they are safe. They may stop there, or keep going if the hit was hard enough.'
            },
            {
              title: 'Second and third',
              body: 'The same idea repeats. The runner advances one base at a time, or more than one on a big hit, always touching each bag.'
            },
            {
              title: 'Home plate',
              body: 'When the runner touches home, a run is on the board. That is the whole object of batting: send people around the diamond and back.'
            }
          ]
        },
        {
          type: 'diagram',
          heading: 'The path around the bases',
          svg: 'basePaths',
          opts: {
            labels: true,
            runners: [
              { from: 'home', to: 'first', style: 'advance', label: '1st' },
              { from: 'first', to: 'second', style: 'advance', label: '2nd' },
              { from: 'second', to: 'third', style: 'advance', label: '3rd' },
              { from: 'third', to: 'home', style: 'advance', label: 'Score' }
            ],
            title: 'One run around the diamond',
            desc: 'A base-path diamond with runner arrows from home to first, first to second, second to third, and third to home.'
          },
          caption: 'A run is a full loop. Home to first to second to third to home. Touch every base. The last touch, at home plate, is the one that counts on the scoreboard.'
        },
        {
          type: 'prose',
          heading: 'Outs, innings, and no clock',
          body: [
            'The fielding team’s job is to record outs. An out is a batter or runner who is retired — tagged, forced at a base, caught on a fly, or struck out. Three outs end that team’s turn at bat.',
            'That turn is called a half-inning. Then the teams swap: the fielders come in to bat, and the batters go out to field. Two half-innings make one full inning.',
            'A professional or adult game is nine innings. Youth games are shorter. There is still no running clock like soccer. An inning lasts until the third out, however long that takes. Many youth leagues add a local time cap so a game does not run all evening — that cap is a league choice, not the core rule of the sport.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'How long a youth game actually is',
          intro: 'Adult baseball is nine innings. Youth baseball is not. Length is set by pathway and division, and local leagues often add a “no new inning after” time cap.',
          columns: ['Pathway', 'Division', 'Scheduled length', 'Local time cap (example)'],
          rows: [
            ['Little League', 'Majors', '6 innings', 'Local; SOLL Minor+ often no new inning after 2 hours'],
            ['Little League', 'Rookie (SOLL local)', 'As scheduled by the league', 'No new inning after 45 minutes'],
            ['Baseball Canada', '11U', '6 innings (weather permitting); 3½ innings with the home team ahead is an official game', 'Provincial and regional associations may add a curfew'],
            ['Adult / full diamond', '18U / Senior / Men’s', '9 innings is the adult standard', 'Not a youth format']
          ]
        },
        {
          type: 'terms',
          items: ['run', 'out', 'inning', 'half-inning', 'home-plate']
        },
        {
          type: 'interactive',
          heading: 'Did that score a run?',
          widget: 'safeOrOut',
          intro: 'Read each play. Decide whether a run went on the board. A run counts only when a runner has touched all four bases, in order, and home plate — and only while that half-inning is still alive.',
          opts: {
            mode: 'run-scored',
            cases: [
              {
                id: 'touch-all-four',
                prompt: 'A batter hits the ball and runs to first, then second, then third, then home, touching each base. Did a run score?',
                answer: 'yes',
                explain: 'A run scores when a runner touches all four bases in order, ending at home plate.'
              },
              {
                id: 'home-run-trot',
                prompt: 'A batter hits the ball over the outfield fence and trots around first, second, third, and home. Did a run score?',
                answer: 'yes',
                explain: 'That is a home run. The batter still has to touch every base, including home. When they do, the run counts.'
              },
              {
                id: 'tagged-at-first',
                prompt: 'The batter hits a ground ball and is tagged out before reaching first. Nobody else is on base. Did a run score?',
                answer: 'no',
                explain: 'The batter never became a safe runner, and nobody else was on the bases. Zero runs.'
              },
              {
                id: 'tagged-before-home',
                prompt: 'A runner is coming from third. The catcher tags them on the baseline. They never touch home plate. Did a run score?',
                answer: 'no',
                explain: 'The runner must touch home. A tag out on the way there is an out, not a run.'
              },
              {
                id: 'left-at-second',
                prompt: 'A runner is standing on second when the batter is thrown out at first. The runner stays at second. Did a run score?',
                answer: 'no',
                explain: 'Being on a base is not a run. The runner still has to get to third and then home. This play added an out, not a run.'
              },
              {
                id: 'from-third-on-a-hit',
                prompt: 'A runner is already on third. The next batter hits a single. The runner from third jogs in and touches home before the defense can tag them. Did a run score?',
                answer: 'yes',
                explain: 'That runner had already touched first, second, and third earlier. Touching home completes the loop. One run.'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'A simple play you can follow on TV',
          body: [
            'The score is 0–0 in the first inning. The first batter hits a ball on the ground and reaches first base. Nobody is out. One runner is on.',
            'The next batter hits a ball into the outfield. The runner from first goes to third. The batter stops at first. Still nobody is out. Two runners are on.',
            'The third batter hits a ball that drops in front of an outfielder. The runner from third jogs home and touches the plate. A run scores. The batting team now leads 1–0, still with nobody out, runners on the bases, and the next batter coming up.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'What to watch from the stands',
          body: [
            'Watch the whole field, not only your child. Count the outs on your fingers. When you hear “two out,” everyone on the batting team should be ready to run on contact.',
            'Notice the swap. After the third out, the fielders jog in and the other team’s batters come out. That is the half-inning flip. It is the heartbeat of the game.',
            'Cheer effort. A runner who hustles to first on a routine grounder is doing the job, even if they are out. Leave the coaching to the coaches. One clear voice on the field is enough.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Two teams take turns batting and fielding.',
            'A run scores when a runner touches first, second, third, and home, in order.',
            'Three outs end a half-inning. Then the teams swap jobs.',
            'A full inning is two half-innings — each team bats once.',
            'Adult games are nine innings. Typical youth games are six, and many leagues add a local time cap.',
            'There is no running game clock. Play is counted in outs and innings. Most runs wins.'
          ]
        }
      ],
      quizIds: ['q0101', 'q0102', 'q0103', 'q0104', 'q0105', 'q0106'],
      prev: null,
      next: 'ch02'
    },

    /* -------------------------------------------------------------- */
    /* ch02 — The Field                                                */
    /* -------------------------------------------------------------- */
    {
      id: 'ch02',
      tier: 'rookie',
      order: 2,
      title: 'The Field',
      subtitle: 'Where everything is and what it is called',
      minutes: 8,
      objectives: [
        'After this chapter you can name home plate, the three bases, the mound, and the foul lines.',
        'After this chapter you can tell fair territory from foul territory.',
        'After this chapter you can point out the infield, outfield, warning track, backstop, and dugouts.',
        'After this chapter you can say that diamond size changes with age and pathway — it is not one size.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The diamond',
          body: [
            'The playing field is built around a square that people call a diamond. Home plate is one corner. First, second, and third base are the other three. The dirt paths between them are the base paths.',
            'Everything inside the two long white lines that run from home past first and past third is the start of fair territory. Everything outside those lines, including the area behind home, is foul territory.',
            'The field also has a raised dirt circle in the middle of the diamond — the pitcher’s mound — and a wide arc of grass beyond the dirt, ending at a fence.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The field, labelled',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            showDimensions: true,
            title: 'A labelled youth diamond',
            desc: 'A baseball diamond with home, first, second, third, the mound, foul lines, infield, and outfield labelled, and base-path and mound distances marked.'
          },
          caption: 'Home is at the bottom of this view. First is to the right, third to the left, second at the top of the dirt. The white lines from home are the foul lines. This drawing uses a Little League Major grid: 60-foot bases and a 46-foot mound.'
        },
        {
          type: 'prose',
          heading: 'Home plate and the four bases',
          body: [
            'Home plate is a five-sided white rubber slab set in the ground. It is where the batter stands, where the catcher crouches, and where a run is finished. A runner must touch it to score.',
            'First, second, and third are square white bags. The runner must touch each one in order. The paths between them are the base paths. Those paths are where force plays and tags happen later in the curriculum.',
            'The four corners together make the infield diamond. That is the heart of every play you will watch.'
          ]
        },
        {
          type: 'prose',
          heading: 'The mound, the rubber, and the boxes',
          body: [
            'The pitcher’s mound is the raised dirt circle in the middle of the diamond. On top of it sits a white rectangle called the rubber. The pitcher starts each pitch in contact with that rubber.',
            'On either side of home plate is a batter’s box — a rectangle in the dirt. A right-handed batter stands in the box on the third-base side. A left-handed batter stands in the box on the first-base side.',
            'Behind the plate is the catcher’s box, where the catcher sets up to receive the pitch. First-base and third-base coaches stand in their own coach’s boxes, just outside the diamond, during their team’s turn at bat.'
          ]
        },
        {
          type: 'prose',
          heading: 'Fair or foul — the first confusing idea',
          body: [
            'Fair territory is the wedge between the two foul lines, from home plate out to the fence. The foul lines themselves count as fair. The foul poles at the ends of those lines also count as fair.',
            'Foul territory is the rest of the park: outside the lines, behind home, toward the dugouts and the backstop. A batted ball over foul ground is a foul ball. A batted ball over fair ground is in play.',
            'This is the idea that trips up new watchers. A ball can start fair and roll foul, or start foul-looking and still be fair if it is over the line. The simple first rule: the white line is fair, and the pole is fair. When you are unsure, watch the umpire’s arms. Both arms out means foul. A point into the diamond means fair.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Fair territory and foul territory',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            labels: true,
            zones: true,
            title: 'Fair and foul shading',
            desc: 'A baseball diamond with fair territory, infield, outfield, and foul territory shaded as teaching zones.'
          },
          caption: 'The inner dirt is the infield. The grass beyond it, still inside the foul lines, is the outfield — all of that is fair. The darker corners outside the foul lines are foul territory. The lines themselves are fair.'
        },
        {
          type: 'terms',
          items: [
            'fair-territory',
            'foul-territory',
            'foul-line',
            'infield',
            'outfield',
            'pitchers-mound',
            'warning-track',
            'backstop',
            'dugout',
            'on-deck-circle',
            'batters-box',
            'catchers-box'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'How big is the diamond?',
          intro: 'Diamond size scales with division, and the two Canadian pathways scale it on different schedules. A player of about 13 can play 70-foot bases in Baseball Canada 13U, or the full 90-foot diamond in Little League Junior. Always set up the field for the pathway and division you are in. Figures below are from the Little League 2025 rulebook (Rules 1.04–1.07) and Baseball Canada championship and 11U reference rules.',
          columns: ['Pathway', 'Division', 'Base paths', 'Pitching distance', 'Mound height'],
          rows: [
            ['Little League', 'Tee Ball / Minor / Major and below', '60 ft (Tee Ball option 50 ft)', '46 ft', '6 in'],
            ['Little League', 'Intermediate (50-70)', '70 ft', '50 ft', '8 in'],
            ['Little League', 'Junior / Senior', '90 ft (Junior option 80 ft)', '60 ft 6 in (Junior option 54 ft)', '10 in'],
            ['Baseball Canada', '11U (guidelines)', '60 ft', '44 ft', '6 in (optional in league play; mandatory for inter-provincial)'],
            ['Baseball Canada', '13U', '70 ft', '48 ft', '6 in, up to 8 in'],
            ['Baseball Canada', '15U Boys / 16U Girls', '80 ft', '54 ft', '8 in, up to 10 in'],
            ['Baseball Canada', '18U / 22U / Men’s', '90 ft', '60 ft 6 in', 'full'],
            ['Baseball Québec', '11U Class B (provincial variant)', '60 ft', '40 ft (not the national 44 ft)', 'as provincial book']
          ]
        },
        {
          type: 'prose',
          heading: 'Infield, outfield, fence, warning track, backstop',
          body: [
            'The infield is the dirt diamond plus the grass inside it. Ground balls, tags, and most throws to the bases happen here. The outfield is the grass beyond the infield dirt, out to the fence. Fly balls and the longest throws happen there.',
            'Just in front of the fence is a strip of dirt or different-coloured turf called the warning track. It tells an outfielder, by feel, that the wall is close. The fence itself ends at two tall foul poles, one in left and one in right. A batted ball that hits a foul pole in the air is a home run.',
            'Behind home plate is the backstop — a fence that stops missed pitches and foul tips from flying into the stands. On a Baseball Canada 11U field the recommended backstop sits 25 to 40 feet behind home.'
          ]
        },
        {
          type: 'prose',
          heading: 'Dugouts, on-deck circles, and coach’s boxes',
          body: [
            'Each team sits in a dugout — a bench area along the foul line. The batting team’s next hitter often waits in an on-deck circle, a marked spot in foul territory, to take a few practice swings.',
            'On-deck is not allowed in Little League Major and below. In those divisions the next batter waits in the dugout, not out on the dirt with a bat. That is a safety rule, not a suggestion.',
            'When a team is batting, two coaches stand in the coach’s boxes — one near first, one near third — to help runners. They stay in those boxes. The rest of the team stays in the dugout.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Label the field',
          widget: 'labelTheField',
          intro: 'Tap each hotspot and match it to the name. These ids are the real parts of the teaching diagram. Work until you can find home, the three bases, the mound, fair and foul, the backstop, and the warning track without looking at the labels.',
          opts: {
            items: [
              { id: 'home', label: 'Home plate' },
              { id: 'first', label: 'First base' },
              { id: 'second', label: 'Second base' },
              { id: 'third', label: 'Third base' },
              { id: 'mound', label: 'Pitcher’s mound' },
              { id: 'infield', label: 'Infield' },
              { id: 'outfield', label: 'Outfield' },
              { id: 'fair-territory', label: 'Fair territory' },
              { id: 'foul-left', label: 'Left-side foul territory' },
              { id: 'foul-right', label: 'Right-side foul territory' },
              { id: 'backstop', label: 'Backstop' },
              { id: 'warning-track', label: 'Warning track' },
              { id: 'dugout-home', label: 'Home dugout' },
              { id: 'foul-pole-left', label: 'Left-field foul pole' }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'A parent’s map from the stands',
          body: [
            'Sit where you can see home plate and the whole diamond. The scoreboard, if there is one, sits beyond the outfield. Dugouts are along the lines, not behind the backstop.',
            'If you are in a Little League Major-and-below game, do not look for an on-deck hitter swinging in foul territory. That player should be in the dugout. If you see a child swinging a bat outside a designated area, say something to a coach.',
            'Diamond size is not decoration. A 13-year-old on 90-foot bases (Little League Junior) is playing a different game from a 13-year-old on 70-foot bases (Baseball Canada 13U). Ask the coach which pathway and division you are in before you worry about “why does this field look small.”'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Home, first, second, and third make the diamond. Runners touch them in that order.',
            'The pitcher works from a mound and a rubber in the middle of the diamond.',
            'Fair territory is the wedge between the foul lines, including the lines and the foul poles. Everything else in the park is foul.',
            'The infield is the dirt diamond. The outfield is the grass beyond it, out to the fence and the warning track.',
            'Dugouts, on-deck circles, and coach’s boxes live in foul territory. On-deck is not permitted in Little League Major and below.',
            'Base paths and mound distance change by division and pathway. Confirm the numbers for the game you are in.'
          ]
        }
      ],
      quizIds: ['q0201', 'q0202', 'q0203', 'q0204', 'q0205', 'q0206', 'q0207'],
      prev: 'ch01',
      next: 'ch03'
    },

    /* -------------------------------------------------------------- */
    /* ch03 — The Nine Positions                                       */
    /* -------------------------------------------------------------- */
    {
      id: 'ch03',
      tier: 'rookie',
      order: 3,
      title: 'The Nine Positions',
      subtitle: 'Who stands where, and why they are numbered',
      minutes: 8,
      objectives: [
        'After this chapter you can name all nine positions and their numbers, 1 through 9.',
        'After this chapter you can point to where each position stands on a typical play.',
        'After this chapter you can explain why 6-4-3 is a double play, and that those numbers are not jersey numbers.',
        'After this chapter you can group the nine into battery, infield, and outfield.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Nine players, nine jobs',
          body: [
            'The fielding team puts nine players on the field. Each one has a name, a place to stand, and a number used when people write the play down.',
            'The numbers are 1 through 9. They are not the numbers on the backs of the jerseys. Jersey numbers are chosen by the player or the club. Position numbers are a shared language for scorekeeping.',
            'Learn the nine as three groups: the battery (pitcher and catcher), the infield (first, second, third, shortstop), and the outfield (left, centre, right).'
          ]
        },
        {
          type: 'diagram',
          heading: 'The 1–9 card',
          svg: 'positionGrid',
          opts: {
            title: 'The nine fielding positions',
            desc: 'A reference card of the nine fielding positions: number, abbreviation, full name, and unit colour for battery, infield, and outfield.'
          },
          caption: 'Read left to right: pitcher (1), catcher (2), first base (3), second base (4), third base (5), shortstop (6), left field (7), centre field (8), right field (9). Battery, infield, and outfield each have their own teaching colour.'
        },
        {
          type: 'prose',
          heading: 'Why the numbers exist',
          body: [
            'Scorekeepers write plays as a chain of position numbers. A ground ball to the shortstop, thrown to second, thrown to first, is written 6-4-3. That is a double play — two outs on one batted ball.',
            'You do not need to keep score yet. You only need the idea: the numbers let one short code describe who touched the ball, in order. That is why coaches and scorekeepers use the same 1 through 9.',
            'If someone says “the 5 is playing in,” they mean the third baseman has moved closer to home. They do not mean the player wearing jersey number 5.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Where they stand',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            positionStyle: 'both',
            labels: true,
            title: 'Standard alignment of the nine',
            desc: 'A baseball diamond with all nine fielders shown at their standard positions, labelled with both number and abbreviation.'
          },
          caption: 'This is standard depth with no runners on. The first baseman stands off the bag, a few steps toward second. Shortstop and second base mirror each other around the bag. Centre field plays deepest. The pitcher and catcher are the battery, in the middle of every pitch.'
        },
        {
          type: 'prose',
          heading: 'The battery — pitcher (1) and catcher (2)',
          body: [
            'The pitcher (1) stands on the mound and throws to the catcher. Every play starts here. The pitcher’s job on a typical play is to throw a strike, then become a fielder — covering first on a ball to the right side, backing up bases, or fielding a comeback grounder.',
            'The catcher (2) is the only fielder who faces the whole field. They receive every pitch, block balls in the dirt, and throw to bases when runners try to advance. They wear the most gear of anyone on the diamond.',
            'Together they are called the battery. They handle the ball on every pitch, whether anyone else moves or not.'
          ]
        },
        {
          type: 'prose',
          heading: 'The infield four — 3, 4, 5, and 6',
          body: [
            'First base (3) stands on the right side of the diamond, a few steps behind the bag when nobody is on. Their distinctive job is to present a big, low target and catch throws that hop in the dirt. On a grounder to the right side they must decide whether to field it or hold the bag.',
            'Second base (4) stands slightly to the first-base side of second, a few steps behind the baseline. They need quick feet and a quick exchange. They are one of the two pivot players on a double play.',
            'Third base (5) is the “hot corner.” Hard-hit balls get there in a hurry. Charging bunts and slow rollers is a big part of the job. The throw from third to first is the longest infield throw.',
            'Shortstop (6) stands slightly to the third-base side of second, a few steps behind the baseline. They typically have the most range and the strongest infield arm. Most double plays start with a 6.'
          ]
        },
        {
          type: 'prose',
          heading: 'The outfield three — 7, 8, and 9',
          body: [
            'Left field (7) covers the grass beyond third base. On a typical play they catch fly balls in their zone, throw to the cutoff, and back up third base on throws from the right side.',
            'Centre field (8) covers the most ground and plays the deepest. They call off the corner outfielders — their voice has priority in the outfield. They also back up second base on infield grounders and stolen-base throws.',
            'Right field (9) covers the grass beyond first base. The throw from right to third is one of the longest on the field. They back up first base on grounders to the left side.'
          ]
        },
        {
          type: 'compare',
          heading: 'Infield vs outfield',
          left: {
            title: 'Infield',
            items: [
              'Stand on the dirt diamond, closer to the batter.',
              'Most plays are ground balls and short throws.',
              'Ready position is lower; the first move is often a charge.',
              'The glove is often at the hip or below. Two-hand “alligator” catches are the youth default.',
              'Time is short. A hard shot to third can be over in a blink.'
            ]
          },
          right: {
            title: 'Outfield',
            items: [
              'Stand on the grass, farther from the batter.',
              'Most plays are fly balls, line drives, and long throws.',
              'Ready position leans to drop-step back; going back is harder to fix than coming in.',
              'Catch above the waist with two hands, fingers up, then crow-hop into the throw.',
              'Every outfielder has a backup job on every play, even balls they do not field.'
            ]
          }
        },
        {
          type: 'terms',
          items: [
            'pitcher',
            'catcher',
            'first-base',
            'second-base',
            'third-base',
            'shortstop',
            'left-field',
            'centre-field',
            'right-field',
            'battery',
            'position-numbers',
            'double-play'
          ]
        },
        {
          type: 'interactive',
          heading: 'Place the nine',
          widget: 'placeThePositions',
          intro: 'Put each position on the diamond. Use the number and the name. When you can place all nine without the card, you are ready to watch a game and know who should be moving.',
          opts: {
            items: [
              { id: 'p', number: 1, name: 'Pitcher', hint: 'Stands on the mound. Starts every pitch. Battery, with the catcher.' },
              { id: 'c', number: 2, name: 'Catcher', hint: 'Crouches behind the plate. Faces the whole field. Wears the most gear.' },
              { id: '1b', number: 3, name: 'First Base', hint: 'Right side of the diamond. Presents a low target and scoops short hops.' },
              { id: '2b', number: 4, name: 'Second Base', hint: 'First-base side of second. A pivot on the double play.' },
              { id: '3b', number: 5, name: 'Third Base', hint: 'The hot corner. Longest infield throw. Charges bunts.' },
              { id: 'ss', number: 6, name: 'Shortstop', hint: 'Third-base side of second. Most range. The “6” in 6-4-3.' },
              { id: 'lf', number: 7, name: 'Left Field', hint: 'Grass beyond third. Backs up third base.' },
              { id: 'cf', number: 8, name: 'Centre Field', hint: 'Deepest outfielder. Calls off the corners. Backs up second.' },
              { id: 'rf', number: 9, name: 'Right Field', hint: 'Grass beyond first. Long throw to third. Backs up first.' }
            ]
          }
        },
        {
          type: 'example',
          heading: 'What 6-4-3 means',
          body: [
            'A runner is on first. The batter hits a ground ball to the shortstop. The shortstop is position 6. They field the ball and throw to the second baseman, position 4, who is covering the bag at second.',
            'The second baseman touches second for the first out, then throws to the first baseman, position 3. If that throw beats the batter, it is a second out. Two outs, one play: 6-4-3.',
            'You will see this written in a scorebook as 6-4-3. You will hear a coach say “turn two.” Same play. The numbers are the names of the jobs, in the order the ball travelled.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Nine fielders: pitcher 1, catcher 2, first 3, second 4, third 5, shortstop 6, left 7, centre 8, right 9.',
            'Those numbers are for writing plays. They are not jersey numbers.',
            'The battery is pitcher and catcher. The infield is 3, 4, 5, and 6. The outfield is 7, 8, and 9.',
            'A 6-4-3 is a double play: shortstop to second to first.',
            'Centre field calls off the other outfielders. Third base is the hot corner. First base scoops the dirt throws.',
            'Standard starting spots change with runners and the hitter. The names and numbers do not.'
          ]
        }
      ],
      quizIds: ['q0301', 'q0302', 'q0303', 'q0304', 'q0305', 'q0306', 'q0307'],
      prev: 'ch02',
      next: 'ch04'
    },

    /* -------------------------------------------------------------- */
    /* ch04 — Gear, Safety & the Homerun Way                           */
    /* -------------------------------------------------------------- */
    {
      id: 'ch04',
      tier: 'rookie',
      order: 4,
      title: 'Gear, Safety & the Homerun Way',
      subtitle: 'What you need, and how we play',
      minutes: 9,
      objectives: [
        'After this chapter you can list the gear a player brings to a first practice, and the extra gear a catcher must wear.',
        'After this chapter you can say why a bat legal in one pathway may be illegal in the other.',
        'After this chapter you can name the humidex bands a coach uses on a hot day, and the concussion rule “when in doubt, sit them out.”',
        'After this chapter you can say Homerun’s three values in order — Effort, Respect, Team — and what ROOTS stands for.',
        'After this chapter you can make a simple safety call: helmets on the bases, no swinging in the dugout, off the field at thunder.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'What you bring',
          body: [
            'A first practice does not need a shopping cart of gear. It needs a glove that fits, a double-earflap batting helmet, a water bottle, and shoes that will grip dirt. A ball cap and athletic support round out the bag for most players.',
            'The club or the league often supplies catcher’s gear and batting helmets. Ask before you buy. Bats are the item most families get wrong, because the legal stamp depends on the pathway and the division — not on what the store shelf says is “youth.”',
            'Label the water bottle. Coaches at the youngest ages keep bottles on the bench and build water breaks into every rotation. Plan on at least one 750 mL bottle for each hour of activity.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Bat standards by pathway',
          intro: 'A bat legal in one pathway can be illegal in the other. Check the stamp on the bat against the division you are actually playing. Baseball Canada youth bats may have a 2¾-inch barrel; Little League youth bats cap the barrel at 2⅝ inches. Both pathways meet at BBCOR in the oldest divisions.',
          columns: ['Pathway', 'Division', 'What is legal'],
          rows: [
            ['Little League', 'Major and below (including Tee Ball)', 'USABat marking required; barrel 2⅝ in max. Tee Ball bats must carry the USA Baseball mark.'],
            ['Little League', 'Intermediate (50/70) and Junior', 'USABat or BBCOR; barrel 2⅝ in max.'],
            ['Little League', 'Senior', 'All bats BBCOR.'],
            ['Baseball Canada', '13U', 'Max barrel 2¾ in; 1.15 BPF or USA Baseball Model; up to −10 drop.'],
            ['Baseball Canada', '15U (Ray Carter Cup) / Women’s / 19U Women', 'Max barrel 2¾ in; 1.15 BPF or USA Baseball Model.'],
            ['Baseball Canada', '16U Girls', 'Up to −5 drop.'],
            ['Baseball Canada', '18U', '−3 BBCOR permitted.'],
            ['Baseball Canada', 'Canada Cup / Men’s / 22U', 'Wood or bamboo only; composite without metal only as specified.']
          ]
        },
        {
          type: 'prose',
          heading: 'Helmets, gloves, catcher’s gear, shoes',
          body: [
            'A double-earflap NOCSAE helmet is required for the batter, for the on-deck hitter where on-deck is allowed, and for every runner on the bases. The helmet stays on until the player is back in the dugout. Taking it off between bases is not a style choice.',
            'Gloves get bigger as you move off the infield. A catcher uses a mitt — rounder and more padded than a fielder’s glove — because they catch pitches all game. First base often uses a mitt as well. Everyone else uses a fielder’s glove sized to the hand, not to last year’s growth spurt.',
            'A catcher does not crouch without the full set: helmet with mask and throat protection, chest protector, shin guards, and a cup for male catchers. That gear is required whenever the catcher is receiving or warming up a pitcher, not only in the game.',
            'Molded cleats are the default at grassroots. Metal cleats are not permitted in Little League Minor, and Baseball Canada 11U prohibits them as well. When in doubt, wear molded.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Heat: read the humidex, not just the temperature',
          svg: 'bar',
          opts: {
            title: 'Humidex action bands for youth sport',
            unit: '',
            max: 50,
            series: [
              { label: 'Below 35', value: 35, note: 'Normal play, with scheduled water breaks' },
              { label: '35–39', value: 39, note: 'More breaks, shade between innings, watch players' },
              { label: '40–45', value: 45, note: 'Shorten, modify, or look at rescheduling' },
              { label: 'Above 45', value: 50, note: 'Suspend outdoor activity' }
            ]
          },
          caption: 'Temperature alone misleads. A humid 32°C day can sit in a more dangerous band than a dry 36°C day. Coaches use the humidex from Environment Canada, not the raw thermometer, to decide how the session runs.'
        },
        {
          type: 'prose',
          heading: 'Heat and water',
          body: [
            'Young players heat up faster than adults and cool down slower. Long pants, a polyester jersey, and a batting helmet make that worse. The coach’s job is to schedule water, not wait for someone to ask.',
            'A practical plan: 400–600 mL of water in the two hours before activity, then 150–250 mL every 15–20 minutes during it, even if nobody feels thirsty. Afterward, drink to thirst. Pale straw-yellow urine is the field check that hydration is all right; dark yellow is not.',
            'Water is enough under an hour. A low-sugar sport drink is reasonable after that, to replace salt lost in sweat. Energy drinks are not for youth athletes. Catchers, who wear the most gear, get extra eyes on a hot day.'
          ]
        },
        {
          type: 'prose',
          heading: 'Concussion — when in doubt, sit them out',
          body: [
            'A concussion is a brain injury. It can come from a ball, a bat, another player, or the ground. It does not require a hit directly to the head, and it does not require blacking out. Most concussions happen with the player still awake.',
            'Coaches do not diagnose. They recognize, remove, and refer. Any suspected concussion means the player comes off immediately. No same-day return, even if they say they feel fine an hour later. A responsible adult stays with them until a parent or a clinician has them.',
            'In Ontario, Rowan’s Law makes this a legal duty for youth sport, not only a club preference: annual awareness reading for coaches, parents, and athletes 13 and older, immediate removal, and a staged return with medical clearance before full-contact practice. Other provinces run similar frameworks. The six return-to-sport stages each take at least 24 hours. Symptoms that come back send the athlete down a stage, not through it.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Return to sport, one stage at a time',
          svg: 'timeline',
          opts: {
            title: 'Concussion return-to-sport stages',
            highlight: 0,
            items: [
              { label: 'Symptom-limited activity', sub: 'No sport', marker: '1' },
              { label: 'Light aerobic', sub: 'Walk / cycle', marker: '2' },
              { label: 'Sport-specific', sub: 'No contact', marker: '3' },
              { label: 'Non-contact drills', sub: 'Light throwing', marker: '4' },
              { label: 'Full-contact practice', sub: 'Medical clearance', marker: '5' },
              { label: 'Return to games', sub: 'Competition', marker: '6' }
            ]
          },
          caption: 'Six stages, at least 24 hours each. Medical clearance is required before stage 5. A parent, a player, or a coach cannot waive that step. If symptoms return, drop back a stage and wait another symptom-free day.'
        },
        {
          type: 'interactive',
          heading: 'Make the safety call',
          widget: 'makeTheCall',
          intro: 'These are real practice and game moments. Pick the action that matches the rule or the duty of care. When two choices both sound kind, take the more conservative one. Youth safety leans that way on purpose.',
          opts: {
            mode: 'safety',
            cases: [
              {
                id: 'helmet-off',
                prompt: 'A runner takes their helmet off between second and third to cool down. What happens?',
                choices: [
                  'Nothing — helmets are only required in the batter’s box.',
                  'Play is stopped and the helmet goes back on. Runners wear a double-earflap helmet the whole time they are on the bases.',
                  'The runner is automatically out under a national rule that names this exact act.'
                ],
                answer: 1,
                explain: 'Double-earflap helmets are required for batters, on-deck (where on-deck is allowed), and base runners. Taking it off on the paths is a safety problem. Put it back on. Do not invent an “automatic out” that the rulebook does not state.'
              },
              {
                id: 'hot-afternoon',
                prompt: 'It is 32°C and humid at a 3 p.m. game. What does the coach do?',
                choices: [
                  'Play as normal. 32°C is not that hot.',
                  'Check the humidex. Increase water breaks, put people in shade between innings, and watch catchers closely. If humidex is 40–45, shorten or reschedule. Above 45, stop.',
                  'Hand out energy drinks and keep going so the game finishes.'
                ],
                answer: 1,
                explain: 'Heat decisions use humidex, not the raw temperature. 32°C and humid often sits in a caution or modify band. Energy drinks are not for youth athletes. Scheduled water and shade are the first tools; suspending play is on the table above humidex 45.'
              },
              {
                id: 'dizzy-after-collision',
                prompt: 'A runner collides with the catcher at the plate and looks dizzy. They want to stay in. What does the coach do?',
                choices: [
                  'Let them take one more at-bat. If they still look off, then sit them.',
                  'Remove them immediately, stay with them, and refer them to a qualified clinician. No same-day return.',
                  'Ask the player to count backwards from ten. If they can, they are cleared.'
                ],
                answer: 1,
                explain: 'When in doubt, sit them out. Recognize, remove, refer. Coaches do not clear concussions on the field. Same-day return is not allowed even if symptoms seem to fade.'
              },
              {
                id: 'dugout-swings',
                prompt: 'A player is taking full practice swings in the dugout while teammates are packing bags. What happens?',
                choices: [
                  'That is fine if they shout “heads up.”',
                  'Bats stay quiet in the dugout. Swinging happens only in a designated area — a cage, a station, or the batter’s box.',
                  'Only metal bats are banned in the dugout. Wood is safe enough.'
                ],
                answer: 1,
                explain: 'A dugout is a crowded bench, not a hitting station. Homerun players do not swing outside a designated area. Wood or metal does not change that.'
              },
              {
                id: 'thunder',
                prompt: 'You hear thunder in the third inning. You have not seen a bolt yet. What happens?',
                choices: [
                  'Keep playing until you see lightning.',
                  'Clear the field at the first thunder. Wait 30 minutes after the last thunder before anyone goes back out. The clock resets if it thunders again.',
                  'Finish the inning, then look at the sky.'
                ],
                answer: 1,
                explain: 'Baseball Ontario (Baseball Canada pathway) shelters at first thunder and resumes 30 minutes after the last thunder. Little League local practice (SOLL) suspends for 30 minutes on lightning or thunder and resets on any recurrence. You do not wait for a visible bolt.'
              },
              {
                id: 'warmup-catcher',
                prompt: 'A pitcher is warming up on the side. A teammate is catching them in a cap and a fielder’s glove, no mask. What happens?',
                choices: [
                  'Allowed — it is only warmup.',
                  'Stop it. Catcher’s gear is required whenever someone is receiving or warming up a pitcher: mask with throat protection, helmet, chest protector, shin guards, and a cup for male catchers.',
                  'A mask alone is enough if they are standing, not crouching.'
                ],
                answer: 1,
                explain: 'Warmup is still receiving a pitcher. Full catcher’s protection applies. A cap and a fielder’s glove are not catcher’s gear.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'Your job from the bench',
          body: [
            'Before the season: every player has a compliant double-earflap helmet; catchers have full gear including a cup; the field uses disengageable bases where the pathway requires them (Little League requires them at all levels); everyone who works with athletes has completed the screening and Safe Sport training their pathway asks for.',
            'On a hot day you own the water breaks. Do not wait for a child to complain. Between every inning at a minimum; every 20 minutes in practice. Catchers get an extra check. If a player looks off — headache, dizziness, “not themselves” — they come off.',
            'Safe Sport is not a poster. Baseball Canada championship staff complete Respect in Sport or CAC Safe Sport training. Little League requires annual background checks on volunteers, and local practice (SOLL) adds a Vulnerable Sector check and a registered adult in the dugout at all times. The Rule of Two is daily practice: no adult alone with a child.'
          ]
        },
        {
          type: 'prose',
          heading: 'The Homerun Way',
          body: [
            'Homerun Baseball Ottawa teaches three values, always in this order: Effort, then Respect, then Team. Effort is what you give today. Respect is how you treat the game and the people in it. Team is bigger than any one at-bat.',
            'Talent is what you have, effort is what you give. That is the club motto. We praise the controllable — hustle to first, a loud “I got it,” a clean dugout — not the gift of a strong arm.',
            'Values are taught through habits, not speeches. Line up for the anthem. Play fair, with everyone in the lineup. Shake hands. Leave the field better than you found it. Hand the effort award to the player who earned it with work, not only with talent.'
          ]
        },
        {
          type: 'steps',
          heading: 'ROOTS — honoring the game',
          items: [
            {
              title: 'Rules',
              body: 'We play the rules as written for this pathway and this division. We do not shop for a loophole in front of children.'
            },
            {
              title: 'Officials',
              body: 'Umpires are part of the game. We speak to them with courtesy. Disagreement, when it is needed, goes through the coach, not a shout from the stand.'
            },
            {
              title: 'Opponents',
              body: 'The other team makes the game possible. We compete hard and we shake hands. Their best play is part of a good game, not an insult.'
            },
            {
              title: 'Teammates',
              body: 'We back each other up on the field and on the bench. An error is a chance to help, not a chance to point.'
            },
            {
              title: 'Self',
              body: 'We control our effort, our voice, and our next play. That is the only self-respect that matters after a strikeout or a win.'
            }
          ]
        },
        {
          type: 'example',
          heading: 'A first-practice bag',
          body: [
            'The night before: charge nothing. Baseball is not a device sport. Pack a glove, a double-earflap helmet if the player has their own, molded cleats or running shoes with grip, a cap, athletic support, and at least 750 mL of water for each hour you expect to be there. Add a snack that sits well in the heat — fruit, a simple bar — not a heavy meal.',
            'Leave the new, unstamped bat at home until a coach has checked the mark against this season’s division. A 2¾-inch 1.15-BPF bat that is legal for Baseball Canada 13U is not USABat-legal for Little League Major.',
            'Arrive able to put the helmet on without help and to find the water bottle without a hunt. That is enough for day one. Catcher’s gear, if they are catching, comes from the club until they have a set that fits.'
          ]
        },
        {
          type: 'terms',
          items: ['batting-helmet', 'catchers-gear', 'concussion', 'humidex', 'roots', 'usabat', 'bbcor']
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'First-practice bag: glove, double-earflap helmet, water, molded cleats, cap, athletic support. Ask before you buy a bat.',
            'Bat stamps differ by pathway. USABat 2⅝ in for Little League youth; 2¾ in and 1.15 BPF or USA Baseball Model for many Baseball Canada youth divisions. BBCOR at the oldest levels of both.',
            'Helmets stay on for batters, on-deck where it is allowed, and all runners. Catchers wear full gear any time they receive a pitcher.',
            'Heat: use humidex. Water on a schedule. Above 45, stop. Catchers get extra monitoring.',
            'Concussion: when in doubt, sit them out. Recognize, remove, refer. No same-day return. Medical clearance before full-contact practice.',
            'Thunder: off the field at the first rumble. Thirty minutes after the last thunder before you go back.',
            'Homerun values, in order: Effort, Respect, Team. Motto: talent is what you have, effort is what you give. Coaches honour the game through ROOTS — Rules, Officials, Opponents, Teammates, Self.'
          ]
        }
      ],
      quizIds: ['q0401', 'q0402', 'q0403', 'q0404', 'q0405', 'q0406', 'q0407'],
      prev: 'ch03',
      next: 'ch05'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
