/* ===================================================================
   Homerun Learn to Play — questions-t1.js
   Tier 1 (Rookie) questions for chapters 1–4. Registers onto
   HRL_QUESTIONS. ES5-safe. Load after questions-data.js.
   Content sourced from youth-baseball-canada wiki concept pages
   and the Homerun values framework.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;
  var qs = root.HRL_QUESTIONS;

  if (!qs || typeof qs.register !== 'function') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = qs || null;
    }
    return;
  }

  qs.register([

    /* ------------------------------------------------------------ */
    /* ch01 — What Baseball Is                                       */
    /* ------------------------------------------------------------ */
    {
      id: 'q0101',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'mc',
      prompt: 'What is the batting team trying to do?',
      choices: [
        'Hold the ball for as many minutes as possible, like a clock sport',
        'Send the pitcher to the bench by swinging three times',
        'Score runs by sending runners around the bases and back to home plate',
        'Keep all nine fielders from touching the ball'
      ],
      answer: 2,
      explain: 'Baseball is not a clock sport. The batting team scores by completing the loop of the bases. The fielding team tries to stop that by making outs.',
      source: ''
    },
    {
      id: 'q0102',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'scoring',
      difficulty: 1,
      type: 'mc',
      prompt: 'When does a run score?',
      choices: [
        'When a runner touches first, then second, then third, then home plate, in that order',
        'When the batter makes contact, even if they are thrown out at first',
        'When a runner reaches second base, because that is halfway',
        'When the batting team has more players on the bases than the fielding team'
      ],
      answer: 0,
      explain: 'A run is a full loop. Making contact, or standing on a base, is not yet a run. Missing a base means the run is not in.',
      source: ''
    },
    {
      id: 'q0103',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'mc',
      prompt: 'How many outs end a team’s turn at bat?',
      choices: [
        'Two — one for each team',
        'Three',
        'Four — one for each base',
        'Nine — one for each fielder'
      ],
      answer: 1,
      explain: 'Three outs end a half-inning. Then the teams swap jobs. A play that records two outs is useful, but it does not end the inning by itself.',
      source: ''
    },
    {
      id: 'q0104',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'tf',
      prompt: 'Baseball uses a running game clock, like soccer. When the clock hits zero, the inning is over.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'There is no running clock. An inning lasts until the third out, however long that takes. Play is counted in outs and innings, not minutes.',
      source: ''
    },
    {
      id: 'q0105',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'mc',
      prompt: 'After the third out of a half-inning, what happens?',
      choices: [
        'The batting team keeps batting until they score',
        'The game ends if anyone has scored',
        'The same team fields again so the pitcher can rest',
        'The teams swap jobs: the fielders come in to bat, and the batters go out to field'
      ],
      answer: 3,
      explain: 'That swap is the heartbeat of the game. Two half-innings — each team batting once — make one full inning.',
      source: ''
    },
    {
      id: 'q0106',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'How long is a typical youth baseball game, compared with an adult game?',
      choices: [
        'Adult games are nine innings. Typical youth games are six, and many leagues add a local time cap.',
        'Youth and adult games are both always nine innings, with no exceptions.',
        'Youth games are nine innings; adult games stop at six.',
        'Both are played to a running clock, usually 90 minutes, with innings only as a backup.'
      ],
      answer: 0,
      explain: 'Nine innings is the adult standard. Little League Majors and Baseball Canada 11U are scheduled as six-inning games. Local leagues often add a “no new inning after” time cap so a youth game does not run all evening.',
      source: 'grassroots-divisions'
    },
    {
      id: 'q0107',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'baserunning',
      difficulty: 1,
      type: 'order',
      prompt: 'Put the path of one run in order, starting after the batter puts a fair ball in play.',
      items: [
        'Touch first base',
        'Touch second base',
        'Touch third base',
        'Touch home plate'
      ],
      explain: 'A run is a full loop in order: first, then second, then third, then home. The last touch, at home plate, is the one that counts on the scoreboard.',
      source: ''
    },
    {
      id: 'q0108',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'scoring',
      difficulty: 2,
      type: 'mc',
      prompt: 'A runner is coming from third. The catcher tags them on the baseline. They never touch home plate. Did a run score?',
      choices: [
        'Yes — leaving third is enough, because they had already done most of the loop',
        'Yes — any time a runner is tagged, the batting team is awarded a run',
        'No — the runner must touch home. A tag out on the way there is an out, not a run',
        'It depends on whether the batter also reached first'
      ],
      answer: 2,
      explain: 'The runner must touch home. Having already touched first, second, and third is not a run until home is touched while that half-inning is still alive.',
      source: ''
    },
    {
      id: 'q0109',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'scoring',
      difficulty: 1,
      type: 'mc',
      prompt: 'A runner is standing on second when the batter is thrown out at first. The runner stays at second. Did a run score?',
      choices: [
        'Yes — occupying a base puts a run on the board',
        'No — being on a base is not a run. The runner still has to get to third and then home',
        'Yes — the out at first is cancelled because someone was already on base',
        'No — but the runner on second is also out automatically'
      ],
      answer: 1,
      explain: 'Bases are rest stops, not scores. This play added an out, not a run. The runner still has to complete the loop.',
      source: ''
    },
    {
      id: 'q0110',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'What makes one full inning?',
      choices: [
        'Three outs, and then the game moves to the next number on the scoreboard',
        'Nine pitches, one for each fielder',
        'One team batting until they score',
        'Two half-innings — each team bats once'
      ],
      answer: 3,
      explain: 'Three outs end a half-inning. Both teams must bat for the inning to be complete. The number on a scoreboard inning column is that full inning, not a single team’s turn.',
      source: ''
    },
    {
      id: 'q0111',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'scoring',
      difficulty: 2,
      type: 'mc',
      prompt: 'A batter hits the ball over the outfield fence and trots around the bases. When does the run count?',
      choices: [
        'When they touch every base, including home plate',
        'The moment the ball clears the fence — touching the bases is only a celebration',
        'When they touch first and then skip to home, because the fence already scored it',
        'When the umpire waves, even if they miss second base'
      ],
      answer: 0,
      explain: 'That is a home run, but it is still a run only when the batter-runner touches all four bases in order. Missing a base means the run is not yet in.',
      source: ''
    },
    {
      id: 'q0112',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 2,
      type: 'tf',
      prompt: 'Many youth leagues add a local time cap, such as “no new inning after 45 minutes.” That cap is a league choice, not the core rule of baseball.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'The sport itself has no running clock. Time caps exist so a youth game does not run all evening, and they vary by league. SOLL Rookie often uses 45 minutes; SOLL Minor+ often uses two hours.',
      source: 'grassroots-divisions'
    },
    {
      id: 'q0113',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'hitting',
      difficulty: 1,
      type: 'mc',
      prompt: 'A batter hits a fair ball. What are they now, and what is their first job?',
      choices: [
        'They stay a batter until they reach second, then they become a runner',
        'They wait at home plate for a coach to tell them whether to run',
        'They drop the bat, become a runner, and race toward first base',
        'They jog to the dugout so the next batter can hit'
      ],
      answer: 2,
      explain: 'Contact turns the batter into a runner. Drop the bat — do not carry it — and go. Reaching first before the defense can retire them is the first job.',
      source: ''
    },
    {
      id: 'q0114',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'hitting',
      difficulty: 1,
      type: 'mc',
      prompt: 'Where does the batter stand to hit?',
      choices: [
        'On the pitcher’s mound, so they are closer to the ball',
        'On first base, facing home',
        'In a dugout until the pitch is already on the way',
        'At home plate, trying to hit a ball thrown by the pitcher'
      ],
      answer: 3,
      explain: 'Every at-bat starts at home plate. The pitcher throws, the batter tries to put the ball in play, and a run later finishes at that same plate.',
      source: ''
    },
    {
      id: 'q0115',
      chapter: 'ch01',
      tier: 'rookie',
      topic: 'scoring',
      difficulty: 1,
      type: 'mc',
      prompt: 'How is a baseball game decided?',
      choices: [
        'The team that records more innings in less time wins',
        'The team with more runs at the end wins',
        'The team that makes the first out of the last inning wins',
        'The team that occupies more bases at the same time wins'
      ],
      answer: 1,
      explain: 'Most runs wins. There is no clock to beat. Outs end turns; runs decide the game.',
      source: ''
    },

    /* ------------------------------------------------------------ */
    /* ch02 — The Field                                              */
    /* ------------------------------------------------------------ */
    {
      id: 'q0201',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 1,
      type: 'mc',
      prompt: 'Which four points make the infield diamond?',
      choices: [
        'The mound, the backstop, the warning track, and the fence',
        'Home plate, first base, second base, and third base',
        'Left field, centre field, right field, and the catcher',
        'The two dugouts, the on-deck circle, and the rubber'
      ],
      answer: 1,
      explain: 'Home is one corner. First, second, and third are the other three. Runners touch them in that order. The mound sits in the middle; it is not a corner of the diamond.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0202',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 2,
      type: 'mc',
      prompt: 'What counts as fair territory?',
      choices: [
        'Only the dirt infield. The grass is always foul.',
        'Everything inside the fences, including the stands and the dugouts',
        'The wedge between the foul lines, but the white lines themselves are foul',
        'The wedge between the foul lines, including the lines and the foul poles'
      ],
      answer: 3,
      explain: 'The white line is fair, and the pole is fair. Dugouts, the backstop, and the area behind home sit in foul territory. When you are unsure, watch the umpire’s arms: both out means foul; a point into the diamond means fair.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0203',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'pitching',
      difficulty: 1,
      type: 'mc',
      prompt: 'Where does the pitcher start each pitch?',
      choices: [
        'In contact with the rubber — the white rectangle on top of the mound',
        'On home plate, so the throw is shorter',
        'In the on-deck circle, then they walk in after the batter is ready',
        'Anywhere in fair territory, as long as they throw toward the catcher'
      ],
      answer: 0,
      explain: 'The mound is the raised dirt circle in the middle of the diamond. The rubber is the white rectangle on top of it. The pitcher must start the pitch in contact with that rubber.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0204',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 1,
      type: 'mc',
      prompt: 'What is the infield, and what is the outfield?',
      choices: [
        'The infield is anywhere a coach is standing; the outfield is the stands',
        'The infield is foul territory; the outfield is fair territory',
        'The infield is the dirt diamond plus the grass inside it; the outfield is the grass beyond that dirt, out to the fence',
        'The infield is first and third only; second base belongs to the outfield'
      ],
      answer: 2,
      explain: 'Ground balls, tags, and most throws to the bases happen on the infield. Fly balls and the longest throws happen in the outfield. Both are fair as long as they sit inside the foul lines.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0205',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 2,
      type: 'mc',
      prompt: 'What is the warning track for?',
      choices: [
        'It warns runners that they are about to be tagged',
        'It is a strip of dirt or different-coloured turf just in front of the fence, so an outfielder can feel that the wall is close',
        'It is the path the pitcher walks to the mound',
        'It marks the start of foul territory'
      ],
      answer: 1,
      explain: 'The warning track is a feel cue, not a rule line. It sits just in front of the outfield fence. It does not change fair or foul, and it is not a message to base runners.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0206',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 2,
      type: 'mc',
      prompt: 'Is every baseball diamond the same size?',
      choices: [
        'Yes — every official field uses 90-foot bases and a 60-foot-6-inch mound',
        'Yes — youth fields are always 50 feet, and adult fields are always 90',
        'No — the home team chooses any distance they like before first pitch',
        'No — base paths and mound distance change by pathway and division'
      ],
      answer: 3,
      explain: 'Diamond size scales with age, and the two Canadian pathways scale it on different schedules. Always confirm the pathway and division before you set up a field or worry that “this field looks small.”',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0207',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'In Little League Major and below, where does the next batter wait?',
      choices: [
        'In the dugout. On-deck swinging in foul territory is not permitted at those levels.',
        'In an on-deck circle in foul territory, taking full practice swings',
        'Behind the pitcher, so they can see the pitch',
        'On first base, so they can start running before they hit'
      ],
      answer: 0,
      explain: 'On-deck is a marked circle in foul territory at older levels, but Little League does not permit the on-deck position in Major and below. That is a safety rule, not a suggestion. The next batter waits in the dugout.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0208',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 1,
      type: 'hotspot',
      prompt: 'This diamond is viewed from behind home plate. Tap home plate.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: false,
          title: 'Tap home plate',
          desc: 'A youth baseball diamond viewed from behind home. Tap the home-plate corner.',
          hotspots: ['home', 'first', 'second', 'third', 'mound']
        }
      },
      targets: ['home'],
      explain: 'Home is the five-sided plate at the bottom of this view — the corner closest to you. First is to the right, third to the left, second at the top of the dirt. A run finishes when a runner touches this plate.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0209',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'A batted ball hits the left-field foul pole in the air. What is it?',
      choices: [
        'Foul, because it hit a pole with “foul” in the name',
        'A dead ball, replayed as a no-pitch',
        'Fair — and a home run. The foul poles count as fair.',
        'Fair only if it then bounces back into the infield'
      ],
      answer: 2,
      explain: 'The name “foul pole” trips people up. The poles sit on the ends of the foul lines, and the lines and poles are fair. A ball that hits a foul pole in the air is a home run.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0210',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'hitting',
      difficulty: 1,
      type: 'mc',
      prompt: 'Where does a right-handed batter stand?',
      choices: [
        'In the batter’s box on the first-base side of home plate',
        'In the batter’s box on the third-base side of home plate',
        'On the rubber, next to the pitcher',
        'In the catcher’s box, then they step forward to swing'
      ],
      answer: 1,
      explain: 'Home plate has a box on each side. A right-handed batter uses the box on the third-base side. A left-handed batter uses the box on the first-base side. The catcher’s box is behind the plate, not a hitting stance.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0211',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 2,
      type: 'tf',
      prompt: 'The white foul lines are foul territory. A ball that lands on the line is a foul ball.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'The opposite is true. The foul lines themselves count as fair. When you are unsure on a ball near the line, watch the umpire: both arms out means foul; a point into the diamond means fair.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0212',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 1,
      type: 'mc',
      prompt: 'What is the backstop?',
      choices: [
        'The fence behind home plate that stops missed pitches and foul tips from flying into the stands',
        'The warning track in centre field',
        'The bench the batting team sits on',
        'The rubber the pitcher stands on'
      ],
      answer: 0,
      explain: 'The backstop protects people behind the plate. On a Baseball Canada 11U field it is recommended 25 to 40 feet behind home. It sits in foul territory, not in the outfield.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0213',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 1,
      type: 'mc',
      prompt: 'Where do the teams sit during a game?',
      choices: [
        'Behind the outfield fence, so they can see the whole diamond',
        'In the catcher’s box, taking turns',
        'On the bases they last occupied',
        'In dugouts — bench areas along the foul lines'
      ],
      answer: 3,
      explain: 'Each team has a dugout in foul territory, along a foul line. Coaches who are helping runners stand in the coach’s boxes near first and third. The rest of the batting team stays in the dugout.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0214',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 2,
      type: 'mc',
      prompt: 'On a Little League Major field, how far is it from home to first?',
      choices: [
        '90 feet — the adult distance, used at every level',
        '44 feet — the same as the Baseball Canada 11U mound',
        '60 feet (Tee Ball may use a 50-foot option)',
        '70 feet — the only youth distance in Canada'
      ],
      answer: 2,
      explain: 'Little League Tee Ball, Minor, and Major use 60-foot base paths (with a 50-foot Tee Ball option) and a 46-foot mound. Baseball Canada 11U also uses 60-foot bases, but its pitching distance is 44 feet, not 46. Do not mix the two grids.',
      source: 'field-dimensions-by-division'
    },
    {
      id: 'q0215',
      chapter: 'ch02',
      tier: 'rookie',
      topic: 'field',
      difficulty: 4,
      type: 'mc',
      prompt: 'About how big is the diamond for a 13-year-old, and why can that number change?',
      choices: [
        'Always 60 feet in both pathways, because 13-year-olds are still in youth ball',
        'Little League Junior uses 90-foot bases (with an 80-foot option). Baseball Canada 13U uses 70-foot bases. Pathway and division, not birthday alone, set the size.',
        'Always 90 feet in both pathways from age 12 on',
        'Baseball Canada 13U uses 90 feet; Little League Junior uses 50 feet'
      ],
      answer: 1,
      explain: 'The pathways scale the diamond on different schedules. A 13-year-old on 90-foot Little League Junior bases is playing a different game from a 13-year-old on 70-foot Baseball Canada 13U bases. Ask which pathway and division you are in before you judge the field.',
      source: 'field-dimensions-by-division'
    },

    /* ------------------------------------------------------------ */
    /* ch03 — The Nine Positions                                     */
    /* ------------------------------------------------------------ */
    {
      id: 'q0301',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 1,
      type: 'mc',
      prompt: 'What number is the pitcher in scorekeeping, and is that the number on their jersey?',
      choices: [
        'The pitcher is 9, and it is also their jersey number',
        'The pitcher is 2, because they throw with two hands',
        'The pitcher is 1. Position numbers are a shared scorekeeping language; they are not jersey numbers.',
        'The pitcher has no number. Only infielders are numbered.'
      ],
      answer: 2,
      explain: 'The nine jobs are numbered 1 through 9 for writing plays, not for the back of the shirt. Jersey numbers are chosen by the player or the club. Pitcher is 1 because every play starts there.',
      source: 'defensive-positioning'
    },
    {
      id: 'q0302',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'mc',
      prompt: 'A coach says “the 5 is playing in.” What do they mean?',
      choices: [
        'The third baseman has moved closer to home. “The 5” is the position, not the jersey.',
        'The player wearing jersey number 5 should come sit down',
        'Five outs have been recorded',
        'The pitcher should throw five warm-up pitches'
      ],
      answer: 0,
      explain: 'Position numbers are not uniform numbers. Third base is 5, the hot corner. “Playing in” means they have walked closer to the plate, usually to cut off a run or a bunt.',
      source: 'defensive-positioning'
    },
    {
      id: 'q0303',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 3,
      type: 'mc',
      prompt: 'A scorebook says 6-4-3. What happened?',
      choices: [
        'Jersey numbers 6, 4, and 3 each made an out, one after another, in three separate plays',
        'The catcher threw to second, then to first',
        'The left fielder, centre fielder, and right fielder each touched the ball',
        'The shortstop fielded the ball, threw to the second baseman at second, who threw to first — a double play'
      ],
      answer: 3,
      explain: 'Scorekeepers write the chain of position numbers, in the order the ball travelled. 6 is shortstop, 4 is second base, 3 is first base. Two outs on one batted ball is a double play. These are jobs, not jersey numbers.',
      source: 'infield-play'
    },
    {
      id: 'q0304',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 1,
      type: 'mc',
      prompt: 'Who makes up the battery?',
      choices: [
        'The four infielders',
        'The pitcher and the catcher',
        'The three outfielders',
        'Whoever is holding the ball at the moment'
      ],
      answer: 1,
      explain: 'Pitcher (1) and catcher (2) handle the ball on every pitch, whether anyone else moves or not. Together they are the battery. The infield is 3, 4, 5, and 6. The outfield is 7, 8, and 9.',
      source: 'catching'
    },
    {
      id: 'q0305',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'mc',
      prompt: 'Why is third base called the hot corner?',
      choices: [
        'Because the sun sets over third in afternoon games',
        'Because it is the closest base to the dugout heater',
        'Hard-hit balls get there in a hurry, and the throw from third to first is the longest infield throw',
        'Because the third baseman is also the pitcher'
      ],
      answer: 2,
      explain: 'Third base is position 5. Reaction time is short, charging bunts is part of the job, and the throw across the diamond to first is the long one. First base, by contrast, is known for scooping throws out of the dirt.',
      source: 'infield-play'
    },
    {
      id: 'q0306',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'mc',
      prompt: 'Who has priority when two outfielders go after the same fly ball?',
      choices: [
        'Centre field. Their voice calls off the corner outfielders.',
        'Left field, because that is position 7, the first outfield number',
        'Right field, because the throw to third is the longest',
        'The outfielder who started closer to second base'
      ],
      answer: 0,
      explain: 'Centre field (8) covers the most ground, plays the deepest, and calls off left and right. The corners still have backup jobs, but on a shared fly the centre fielder’s call wins.',
      source: 'outfield-play'
    },
    {
      id: 'q0307',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 1,
      type: 'mc',
      prompt: 'Which three numbers are the outfield?',
      choices: [
        '1, 2, and 3',
        '7, 8, and 9 — left, centre, and right',
        '3, 4, 5, and 6',
        '4, 5, and 6'
      ],
      answer: 1,
      explain: 'Left field is 7, centre is 8, right is 9. The battery is 1 and 2. The infield is 3 (first), 4 (second), 5 (third), and 6 (shortstop).',
      source: 'defensive-positioning'
    },
    {
      id: 'q0308',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'hotspot',
      prompt: 'Tap the shortstop — position 6 — on this diagram.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          positions: true,
          positionStyle: 'abbr',
          labels: false,
          title: 'Tap the shortstop',
          desc: 'A youth baseball diamond with the nine fielders at standard depth. Tap shortstop.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['ss'],
      explain: 'Shortstop stands slightly to the third-base side of second, a few steps behind the baseline. They typically have the most range and the strongest infield arm. Most double plays start with a 6.',
      source: 'defensive-positioning'
    },
    {
      id: 'q0309',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'fielding',
      difficulty: 2,
      type: 'mc',
      prompt: 'What is the distinctive job of the first baseman?',
      choices: [
        'Call off every other fielder, including centre field',
        'Start every pitch from the rubber',
        'Play the deepest of any fielder, on the grass beyond second',
        'Present a big, low target and catch throws that hop in the dirt'
      ],
      answer: 3,
      explain: 'First base is position 3. They stand on the right side of the diamond, a few steps off the bag when nobody is on. Scooping short hops is the skill that defines the position. On a grounder to the right side they must also decide whether to field it or hold the bag.',
      source: 'infield-play'
    },
    {
      id: 'q0310',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 1,
      type: 'mc',
      prompt: 'Which fielder faces the whole field, receives every pitch, and wears the most gear?',
      choices: [
        'The pitcher',
        'The shortstop',
        'The catcher',
        'The centre fielder'
      ],
      answer: 2,
      explain: 'The catcher (2) crouches behind the plate. They are the only fielder looking out at everyone else. They block balls in the dirt and throw to bases when runners try to advance.',
      source: 'catching'
    },
    {
      id: 'q0311',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 1,
      type: 'mc',
      prompt: 'Left field is which number, and where do they stand?',
      choices: [
        '7 — the grass beyond third base',
        '9 — the grass beyond first base',
        '4 — a few steps toward first from second base',
        '5 — the hot corner on the dirt'
      ],
      answer: 0,
      explain: 'Outfield numbers run left to right from the catcher’s view: left 7, centre 8, right 9. Left field backs up third on throws from the right side. Right field (9) is the one beyond first.',
      source: 'outfield-play'
    },
    {
      id: 'q0312',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'tf',
      prompt: 'Position numbers 1 through 9 are the numbers sewn on the backs of the jerseys.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Jersey numbers are chosen by the player or the club. Position numbers are a shared language for scorekeeping. A 6-4-3 double play names jobs, not shirts.',
      source: 'defensive-positioning'
    },
    {
      id: 'q0313',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'fielding',
      difficulty: 2,
      type: 'mc',
      prompt: 'On a grounder to the left side of the infield, who should be moving to back up first base?',
      choices: [
        'Left field, because they play nearest third',
        'Right field — they back up first on grounders to the left side',
        'Centre field only — the corners never back up bases',
        'The batter, standing in the box'
      ],
      answer: 1,
      explain: 'Every outfielder has a backup job on every play, even balls they do not field. Right field backs up first. Centre field backs up second. Left field backs up third.',
      source: 'outfield-play'
    },
    {
      id: 'q0314',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'fielding',
      difficulty: 2,
      type: 'mc',
      prompt: 'How is infield work different from outfield work on a typical play?',
      choices: [
        'Infielders only catch fly balls; outfielders only field grounders',
        'Infielders stand in foul territory; outfielders stand in fair territory',
        'There is no difference. All nine use the same ready position and the same throw.',
        'Infielders are closer, field more ground balls, and get lower. Outfielders play the grass, catch more flies, and must be ready to drop-step back.'
      ],
      answer: 3,
      explain: 'Time is short on the dirt — a hard shot to third can be over in a blink — so the first move is often a charge. In the outfield, going back is harder to fix than coming in, so the ready position leans to a drop-step.',
      source: 'infield-play'
    },
    {
      id: 'q0315',
      chapter: 'ch03',
      tier: 'rookie',
      topic: 'positions',
      difficulty: 2,
      type: 'order',
      prompt: 'A runner is on first. The batter hits a ground ball to the shortstop, and the defense turns a 6-4-3 double play. Put the touches in order.',
      items: [
        'The shortstop (6) fields the ball',
        'The second baseman (4) touches second for the first out',
        'The first baseman (3) receives the throw for the second out'
      ],
      explain: '6-4-3 is the chain of jobs, in the order the ball travelled. You will hear a coach say “turn two.” Same play. The numbers are not the runners and not the jerseys.',
      source: 'infield-play'
    },

    /* ------------------------------------------------------------ */
    /* ch04 — Gear, Safety & the Homerun Way                         */
    /* ------------------------------------------------------------ */
    {
      id: 'q0401',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 1,
      type: 'mc',
      prompt: 'What belongs in a first-practice bag?',
      choices: [
        'A 2¾-inch bat off the store shelf, metal cleats, and an energy drink',
        'A glove that fits, a double-earflap batting helmet, water, shoes that grip dirt, a cap, and athletic support',
        'Catcher’s gear for every player, because everyone crouches at some point',
        'Only a bat. The league supplies gloves, helmets, and water at the gate.'
      ],
      answer: 1,
      explain: 'Day one does not need a shopping cart. Ask before you buy a bat — the legal stamp depends on pathway and division. The club often supplies catcher’s gear and extra helmets. Plan on at least 750 mL of water for each hour of activity.',
      source: 'equipment-safety-rules'
    },
    {
      id: 'q0402',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'Why can a bat that is legal for one team be illegal for another team in the same city?',
      choices: [
        'Umpires pick a favourite brand each season',
        'Heavier bats are always illegal for anyone under 16',
        'Every Canadian youth bat is legal everywhere if it was sold as “youth”',
        'Legal bats follow pathway and division, not the store label. A 2¾-inch 1.15-BPF bat that is legal for Baseball Canada 13U is not USABat-legal for Little League Major.'
      ],
      answer: 3,
      explain: 'Little League youth bats need the USABat mark and cap the barrel at 2⅝ inches. Many Baseball Canada youth divisions allow a 2¾-inch barrel with a 1.15 BPF or USA Baseball Model stamp. Both pathways meet at BBCOR in the oldest divisions. Check the stamp against the division you are actually playing.',
      source: 'bat-standards'
    },
    {
      id: 'q0403',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 1,
      type: 'scenario',
      prompt: 'A runner takes their helmet off between second and third to cool down. What is the right call?',
      choices: [
        'Play is stopped and the helmet goes back on. Runners wear a double-earflap helmet the whole time they are on the bases.',
        'Nothing. Helmets are required only in the batter’s box.',
        'The runner is automatically out under a national rule that names this exact act.',
        'They may carry the helmet in their hand if they shout “heads up.”'
      ],
      answer: 0,
      explain: 'A double-earflap NOCSAE helmet is required for the batter, for the on-deck hitter where on-deck is allowed, and for every runner. Taking it off on the paths is a safety problem. Put it back on. Do not invent an “automatic out” the rulebook does not state.',
      source: 'equipment-safety-rules'
    },
    {
      id: 'q0404',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'How should a coach read a hot day — and what happens above humidex 45?',
      choices: [
        'Use the thermometer only. If it reads under 40°C, play as normal.',
        'Hand out energy drinks and finish the game no matter the reading',
        'Use the humidex, not the raw temperature. Above 45, suspend outdoor activity.',
        'Heat rules apply only to catchers. Everyone else plays through.'
      ],
      answer: 2,
      explain: 'Temperature alone misleads. A humid 32°C day can sit in a more dangerous band than a dry 36°C day. Below 35: normal play with scheduled water. 35–39: more breaks and shade. 40–45: shorten, modify, or look at rescheduling. Above 45: stop. Catchers get extra eyes because they wear the most gear.',
      source: 'heat-and-hydration'
    },
    {
      id: 'q0405',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 1,
      type: 'mc',
      prompt: 'A runner collides at the plate and looks dizzy. They want to stay in. What does the coach do?',
      choices: [
        'Let them take one more at-bat. If they still look off, then sit them.',
        'Remove them immediately, stay with them, and refer them to a qualified clinician. No same-day return.',
        'Ask them to count backwards from ten. If they can, they are cleared to play.',
        'Wait to see whether they blacked out. If they stayed awake, it is not a concussion.'
      ],
      answer: 1,
      explain: 'When in doubt, sit them out. Coaches recognize, remove, and refer — they do not diagnose and they do not clear. Most concussions happen with the player still awake, and a hit to the body that jerks the head is enough. Same-day return is not allowed even if they say they feel fine an hour later.',
      source: 'concussion-protocol'
    },
    {
      id: 'q0406',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'mc',
      prompt: 'Homerun Baseball Ottawa teaches three values. What are they, in order?',
      choices: [
        'Team, then Talent, then Trophies',
        'Respect, then Team, then Effort',
        'Effort, then Respect, then Team',
        'Winning, then Effort, then Fun'
      ],
      answer: 2,
      explain: 'Effort is what you give today. Respect is how you treat the game and the people in it. Team is bigger than any one at-bat. Talent is what you have; effort is what you give — that is the club motto, and it is why Effort comes first.',
      source: 'values-based-coaching-framework'
    },
    {
      id: 'q0407',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 2,
      type: 'order',
      prompt: 'ROOTS is how Homerun honors the game. Put the five letters’ words in order.',
      items: [
        'Rules',
        'Officials',
        'Opponents',
        'Teammates',
        'Self'
      ],
      explain: 'Rules as written, officials spoken to with courtesy, opponents who make the game possible, teammates you back up, and a self that controls effort and the next play. Disagreement with an umpire goes through the coach, not a shout from the stand.',
      source: 'values-based-coaching-framework'
    },
    {
      id: 'q0408',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 1,
      type: 'mc',
      prompt: 'A pitcher is warming up on the side. A teammate is catching them in a cap and a fielder’s glove, no mask. What happens?',
      choices: [
        'Stop it. Full catcher’s protection is required whenever someone is receiving or warming up a pitcher.',
        'Allowed — it is only warmup, not a game',
        'A mask alone is enough if they are standing, not crouching',
        'Allowed if a coach is watching from the dugout'
      ],
      answer: 0,
      explain: 'Warmup is still receiving a pitcher. The full set is helmet with mask and throat protection, chest protector, shin guards, and a cup for male catchers. A cap and a fielder’s glove are not catcher’s gear.',
      source: 'equipment-safety-rules'
    },
    {
      id: 'q0409',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'You hear thunder in the third inning. You have not seen a bolt yet. What happens?',
      choices: [
        'Keep playing until you see lightning',
        'Finish the inning, then look at the sky',
        'Move only the catcher inside, because they wear metal buckles',
        'Clear the field at the first thunder. Wait 30 minutes after the last thunder before anyone goes back out. The clock resets if it thunders again.'
      ],
      answer: 3,
      explain: 'You do not wait for a visible bolt. Baseball Ontario (Baseball Canada pathway) shelters at first thunder and resumes 30 minutes after the last thunder. Little League local practice (SOLL) suspends for 30 minutes on lightning or thunder and resets on any recurrence.',
      source: 'equipment-safety-rules'
    },
    {
      id: 'q0410',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'What is the youth barrel-and-stamp split between Little League and Baseball Canada?',
      choices: [
        'Both pathways require wood bats only, from Tee Ball up',
        'Little League Major and below: USABat, barrel 2⅝ inches max. Baseball Canada 13U: barrel 2¾ inches max, 1.15 BPF or USA Baseball Model.',
        'Little League allows 2¾ inches; Baseball Canada caps at 2⅝ inches',
        'There is no stamp rule until 18U, when both require BBCOR'
      ],
      answer: 1,
      explain: 'A 2¾-inch 1.15-BPF bat legal for Baseball Canada 13U is not USABat-compliant for Little League Major. Intermediate and Junior Little League allow USABat or BBCOR (still 2⅝). Senior Little League and Baseball Canada 18U converge on BBCOR.',
      source: 'bat-standards'
    },
    {
      id: 'q0411',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 1,
      type: 'tf',
      prompt: 'Energy drinks are a good heat-day substitute for water in youth baseball.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Energy drinks are not for youth athletes. Water is enough under an hour. A low-sugar sport drink is reasonable after that, to replace salt lost in sweat. Coaches schedule water; they do not wait for someone to ask.',
      source: 'heat-and-hydration'
    },
    {
      id: 'q0412',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'Which footwear is the grassroots default, and where are metal cleats banned?',
      choices: [
        'Metal cleats at every level, because they grip better',
        'Bare feet on dirt, cleats only on grass',
        'Molded cleats are the default. Metal cleats are not permitted in Little League Minor, and Baseball Canada 11U prohibits them as well.',
        'Any shoe is fine, including smooth-soled dress shoes, as long as they are tied'
      ],
      answer: 2,
      explain: 'When in doubt, wear molded. Metal is a division rule, not a fashion choice. Shoes still need to grip dirt — running shoes with grip are acceptable for a first practice if cleats are not ready.',
      source: 'equipment-safety-rules'
    },
    {
      id: 'q0413',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'After a suspected concussion, when may a player return to full-contact practice?',
      choices: [
        'After a staged return, with medical clearance before stage 5. A parent, a player, or a coach cannot waive that step.',
        'The same afternoon, if they say they feel fine',
        'After sitting one inning, which counts as rest',
        'As soon as they can count backwards from ten'
      ],
      answer: 0,
      explain: 'Six return-to-sport stages each take at least 24 hours. Symptoms that come back send the athlete down a stage, not through it. Medical clearance is required before full-contact practice (stage 5). In Ontario, Rowan’s Law makes immediate removal and this staged return a legal duty for youth sport.',
      source: 'concussion-protocol'
    },
    {
      id: 'q0414',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'rules',
      difficulty: 1,
      type: 'mc',
      prompt: 'What is the Homerun motto?',
      choices: [
        'Swing hard in case you make contact',
        'Winning is the only teaching tool',
        'Talent is what you give, effort is what you have',
        'Talent is what you have, effort is what you give'
      ],
      answer: 3,
      explain: 'We praise the controllable — hustle to first, a loud “I got it,” a clean dugout — not the gift of a strong arm. Values are taught through habits: line up, play fair, shake hands, leave the field better than you found it.',
      source: 'values-based-coaching-framework'
    },
    {
      id: 'q0415',
      chapter: 'ch04',
      tier: 'rookie',
      topic: 'safety',
      difficulty: 2,
      type: 'mc',
      prompt: 'How should water be handled at a youth practice or game?',
      choices: [
        'Wait until a player asks. Thirst is the only reliable signal.',
        'Schedule it. About 400–600 mL in the two hours before activity, then 150–250 mL every 15–20 minutes during it, even if nobody feels thirsty. Pack at least 750 mL for each hour you expect to be there.',
        'One shared bottle for the team, kept in the coach’s bag until the last inning',
        'Sport drink only. Plain water does not hydrate in a uniform.'
      ],
      answer: 1,
      explain: 'Young players heat up faster than adults and cool down slower. Coaches own the breaks — between every inning at a minimum, every 20 minutes in practice. Pale straw-yellow urine is a field check that hydration is all right; dark yellow is not.',
      source: 'heat-and-hydration'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
