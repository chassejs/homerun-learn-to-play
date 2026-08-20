/* ===================================================================
   Homerun Learn to Play — questions-t2.js
   Tier 2 (Sandlot) question bank: chapters 5–8.
   Registers onto HRL_QUESTIONS.
   ES5-safe (var, function, string concatenation). Load after
   questions-data.js in the same process.
   Content sourced from youth-baseball-canada wiki concept pages.
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
    /* ch05 — Balls, Strikes & the Count                            */
    /* quizIds: q0501–q0508                                         */
    /* ------------------------------------------------------------ */

    {
      id: 'q0501',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'Where is the strike zone?',
      choices: [
        'The whole space from the dirt to the top of the batter\'s helmet',
        'The space over the 17-inch plate, from the knees up to the armpits (Little League) or the letters (Baseball Canada), in the batter\'s natural stance',
        'Wherever the catcher\'s glove is when the pitch is caught',
        'A painted box on the ground in front of home plate'
      ],
      answer: 1,
      explain: 'The zone is a volume over the plate, not a picture on the ground and not the catcher\'s glove. Its height follows that batter\'s real stance — Little League goes armpit to knee; Baseball Canada / OBR sits lower at the top, around the letters.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0502',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'When does the umpire decide ball or strike?',
      choices: [
        'As the ball leaves the pitcher\'s hand',
        'When the catcher holds the glove still',
        'As the ball crosses the plate',
        'After looking at where the ball ends up in the dirt'
      ],
      answer: 2,
      explain: 'The call is made as the ball crosses the plate, not at release and not in the glove. A pitch can look good leaving the hand and still miss, or look wide and still catch a corner. Framing can nudge a close call, but the rulebook moment is the plate.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0503',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'hitting',
      difficulty: 3,
      type: 'mc',
      prompt: 'The count is 1-2. The batter fouls the next pitch back (not a bunt). What is the count now?',
      choices: [
        'Still 1-2. A foul is not strike three.',
        '1-3. The batter is out on strike three.',
        '2-2. A foul with two strikes is a ball.',
        '0-0. A foul restarts the at-bat.'
      ],
      answer: 0,
      explain: 'With two strikes, an ordinary foul is not strike three. The at-bat continues, which is why you hear "still two." People treat every foul like a strike because with fewer than two strikes it is one — that rule stops at strike two, except for a foul bunt.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0504',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'hitting',
      difficulty: 2,
      type: 'mc',
      prompt: 'How do you say a count of two balls and one strike?',
      choices: [
        '"One and two"',
        '"Two strikes"',
        '"Full count"',
        '"Two and one"'
      ],
      answer: 3,
      explain: 'Say the count balls first, then strikes: "two and one." "One and two" is a different count — one ball and two strikes, a pitcher\'s count. The full count is 3-2.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0505',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'What do four balls and three strikes do?',
      choices: [
        'Four balls is a strikeout; three strikes is a walk',
        'Four balls is a walk (batter to first); three strikes is a strikeout',
        'Both send the batter to first',
        'Four balls is a do-over; three strikes is a warning'
      ],
      answer: 1,
      explain: 'Four balls awards first base — a walk, also written BB. Three strikes is a strikeout — the batter is out. Mixing the two numbers is the usual first-season mix-up.',
      source: ''
    },
    {
      id: 'q0506',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 2,
      type: 'tf',
      prompt: 'A coach can protest a ball or strike call and have the next umpire overrule it.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Balls and strikes are judgment. They cannot be protested. You may ask, between batters, how the umpire is seeing the zone; you may not argue the last pitch. Both Baseball Canada and Little League treat ball-strike arguments as ejectable.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0507',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'pitching',
      difficulty: 4,
      type: 'mc',
      prompt: 'Which of these is a pitcher\'s count — the hitter has to protect the plate?',
      choices: [
        '3-0',
        '2-0',
        '0-2',
        '3-1'
      ],
      answer: 2,
      explain: '0-2 is the deepest hole in an at-bat: no balls, two strikes. The pitcher can nibble; the hitter has to protect. 2-0, 3-0, and 3-1 are hitter\'s counts — the pitcher needs a strike or the walk gets closer.',
      source: 'pitching-approach-and-strategy'
    },
    {
      id: 'q0508',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'mc',
      prompt: 'A pitch is off the plate and hits the batter, who was not swinging and tried to get out of the way. What is the ruling?',
      choices: [
        'Hit by pitch: the batter is awarded first, and the ball is dead',
        'Ball. The batter stays in the box and the count adds one ball',
        'Strike. Anything that hits the batter is a strike',
        'The batter is out for being hit'
      ],
      answer: 0,
      explain: 'A pitch that hits the batter, off the zone, with no swing, is a hit by pitch: first base, dead ball. Two limits people miss: if the pitch was in the zone it is a strike, and if the batter makes no attempt to avoid a pitch off the zone the umpire may call a ball instead of an award.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0509',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'hotspot',
      prompt: 'Tap the full count — three balls and two strikes.',
      diagram: {
        svg: 'countMatrix',
        opts: {
          shade: 'leverage',
          hotspots: ['count-0-0', 'count-0-2', 'count-3-0', 'count-1-1', 'count-2-1', 'count-3-2'],
          title: 'Tap the full count',
          desc: 'A grid of the twelve ball-strike counts. Tap the cell that is three balls and two strikes.'
        }
      },
      targets: ['count-3-2'],
      explain: 'Counts are written balls first. 3-2 is the full count: one more ball is a walk, one more strike is a strikeout, a foul keeps it at 3-2. 0-2 is a pitcher\'s count and 3-0 is a hitter\'s count — they are not the same cell.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0510',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'hitting',
      difficulty: 4,
      type: 'mc',
      prompt: 'Most youth coaches, on a 3-0 count, want the hitter to:',
      choices: [
        'Bunt no matter where the pitch is',
        'Swing at anything close, because a walk is a wasted chance',
        'Take a huge cut — 3-0 is a green light by default',
        'Take the pitch (let it go) unless the coach gives a green light'
      ],
      answer: 3,
      explain: 'A ball on 3-0 is a walk. A swing risks 3-1. At youth levels the default is take unless you get the green light. Treating 3-0 like a free hack is a coach\'s call, not an automatic.',
      source: 'hitting-approach-and-plate-discipline'
    },
    {
      id: 'q0511',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'When is a foul ball an out?',
      choices: [
        'Any foul with two strikes',
        'A foul bunt on the third strike. Ordinary fouls with two strikes are not outs.',
        'Any foul that lands behind the catcher',
        'Never. A foul can only add a strike with fewer than two strikes.'
      ],
      answer: 1,
      explain: 'Ordinary fouls cannot be strike three — the at-bat continues. The exception is a bunt: a foul bunt with two strikes is an out, and the ball is dead. That is why coaches tell two-strike bunters to pull the bat back on a pitch they cannot put fair.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0512',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'pitching',
      difficulty: 4,
      type: 'mc',
      prompt: 'A pitch bounces in the dirt and then comes through the strike zone. The batter does not swing. What is the call?',
      choices: [
        'Called strike — it crossed the zone',
        'Hit by pitch if it bounced near the batter',
        'Ball. A bounce through the zone is not a called strike.',
        'Dead ball, no pitch'
      ],
      answer: 2,
      explain: 'A pitch that touches the ground and then goes through the zone is a ball if the batter does not swing. If the batter swings and misses, it is a swinging strike — location no longer matters once there is a swing — but it cannot be a called third strike off a bounce.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0513',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'tf',
      prompt: 'Little League\'s strike zone is nominally higher at the top (armpits) than Baseball Canada\'s (the letters).',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'Both pathways judge the zone over the plate in the batter\'s natural stance. Little League\'s upper bound is the armpits; Baseball Canada / OBR uses the midpoint of the shoulders and the top of the pants — the letters. A pitch at the letters is often a strike in Little League and a ball under OBR.',
      source: 'strike-zone-and-ball-strike-calls'
    },
    {
      id: 'q0514',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'hitting',
      difficulty: 3,
      type: 'mc',
      prompt: 'With two strikes, what should a youth hitter change?',
      choices: [
        'A slightly bigger zone, a shorter swing, and contact over a big cut',
        'A bigger, longer swing to try for a home run before strike three',
        'Automatic take — never swing with two strikes',
        'Wait to see where the catcher sets up, then guess'
      ],
      answer: 0,
      explain: 'Two-strike hitting means protect the plate: expand a little, shorten the swing, put the ball in play. A huge cut is how you go down on a pitch you could have fouled off. Taking everything is how you take a called third strike.',
      source: 'two-strike-approach'
    },
    {
      id: 'q0515',
      chapter: 'ch05',
      tier: 'sandlot',
      topic: 'pitching',
      difficulty: 3,
      type: 'mc',
      prompt: 'Home plate is 17 inches wide. A pitch that catches only the black on the outer edge is:',
      choices: [
        'A ball, because most of the ball was off the plate',
        'A ball in Little League and a strike in Baseball Canada',
        'Only a strike if the catcher frames it',
        'A strike. Any part of the ball over any part of the plate is legally over the plate.'
      ],
      answer: 3,
      explain: 'The zone covers the entire 17-inch plate. A pitch that nicks either edge is a strike on that dimension. The tempting thought is that "most of the ball" has to be over the plate; the rule is any part over any part.',
      source: 'strike-zone-and-ball-strike-calls'
    },

    /* ------------------------------------------------------------ */
    /* ch06 — Getting On, Getting Out                               */
    /* quizIds: q0601–q0607                                         */
    /* ------------------------------------------------------------ */

    {
      id: 'q0601',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 2,
      type: 'mc',
      prompt: 'Which of these is a way the batter reaches base that is NOT scored as a hit?',
      choices: [
        'A single through the infield',
        'A triple down the line',
        'A walk, a hit by pitch, an error, or a fielder\'s choice',
        'A home run over the fence'
      ],
      answer: 2,
      explain: 'A hit is a fair ball the batter reaches on without an error or a fielder\'s choice. Walks, hit-by-pitch, errors, and fielder\'s choice put you on, but they are not hits. That is why a line score can show more times on base than hits.',
      source: ''
    },
    {
      id: 'q0602',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'What is the difference between a force out and a tag out?',
      choices: [
        'A force out is only at home; a tag out is only at first',
        'On a force, the defence only has to touch the bag with the ball; on a tag, they must touch the runner while the runner is off the bag',
        'A force out needs a tag on the body; a tag out only needs the bag',
        'They are two names for the same play'
      ],
      answer: 1,
      explain: 'A force exists when the runner has lost the right to stay — the defence touches the bag. If the runner is not forced, touching the bag does nothing; the defence must tag the body. Mixing those two up is the most common first-season defensive mistake.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0603',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 2,
      type: 'mc',
      prompt: 'On a fair ball, the batter-runner:',
      choices: [
        'Is always forced to first',
        'Is forced to first only if first base is empty',
        'May stay in the box and wait',
        'Is forced to first only with two outs'
      ],
      answer: 0,
      explain: 'The batter becomes a runner on a fair ball, and first is the base they must take. The defence can always retire the batter by touching first with the ball before the batter arrives. That force is what then forces everyone behind them.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0604',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 3,
      type: 'mc',
      prompt: 'Bases loaded, ground ball to the pitcher, throw home. The catcher steps on the plate with the ball before the runner from third arrives, and never tags the runner. Ruling at home?',
      choices: [
        'Safe. Home is always a tag play.',
        'Safe. The catcher had to tag the runner and the plate.',
        'Out, but only if there are already two outs.',
        'Out. Bases loaded forces every base, including home. The plate is enough.'
      ],
      answer: 3,
      explain: 'Bases loaded means every runner has lost the right to stay, so home is a force. The catcher only has to touch the plate with the ball. The tempting idea is "you always have to tag at home" — that is true when first is empty and the runner on third is choosing to go.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0605',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'mc',
      prompt: 'When may a batter run to first on a dropped third strike (in a division where the rule is on)?',
      choices: [
        'Always — any uncaught strike three',
        'When first base is empty, or when there are already two outs',
        'Only with the bases loaded',
        'Never. Strike three is always an out.'
      ],
      answer: 1,
      explain: 'The batter may run only if first is empty, or if there are two outs. If first is occupied with fewer than two outs, the batter is out even if the catcher drops it — that stops the catcher from dropping the ball on purpose to start a double play. The rule is also off in many first-season divisions.',
      source: 'dropped-third-strike'
    },
    {
      id: 'q0606',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 4,
      type: 'mc',
      prompt: 'The batter hits a ground ball. The shortstop steps on second for a force out on the runner from first, and the batter reaches first. How is the batter\'s reaching first scored?',
      choices: [
        'A single',
        'An error on the shortstop',
        'A fielder\'s choice — the defence got a different runner',
        'A walk'
      ],
      answer: 2,
      explain: 'A fielder\'s choice is the defence retiring a different runner instead of the batter. The batter is on, but it is not a hit. Scoring it as a single is the usual mix-up, because the batter did end up at first.',
      source: ''
    },
    {
      id: 'q0607',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 5,
      type: 'mc',
      prompt: 'Runner on first, nobody out. Ground ball to first. The first baseman steps on first (batter out), then throws to second. The shortstop steps on second but does not tag the runner, who is still coming. Ruling at second?',
      choices: [
        'Safe. The out at first removed the force, so the runner going to second has to be tagged.',
        'Out. Once a runner leaves first they are always forced to second.',
        'Out. Any throw to second is a force.',
        'Safe only if there are two outs.'
      ],
      answer: 0,
      explain: 'A force lives only while the batter is still a runner who has not been put out. Out at first opens first again. The leftover runner is now a tag play. Stepping on second without a tag is the play that fools first-season infielders.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0608',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 3,
      type: 'mc',
      prompt: 'A runner on first tries to steal second. The catcher throws, and the second baseman tags the runner off the bag. What kind of out is this?',
      choices: [
        'A force out — first was occupied',
        'A flyout',
        'A fielder\'s choice',
        'A tag out (caught stealing). Nobody is forced on a steal.'
      ],
      answer: 3,
      explain: 'There is no batted ball, so nobody is forced. The defence must tag the body. That out is caught stealing. Occupied first does not create a force by itself — the batter has to become a runner.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0609',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 3,
      type: 'hotspot',
      prompt: 'Runner on first. Ground ball. That runner is forced. Tap the bag the defence can touch for that force (not the batter\'s bag).',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'abbr',
          runners: ['first'],
          hotspots: ['home', 'first', 'second', 'third'],
          title: 'Tap the forced bag',
          desc: 'A youth diamond with a runner on first. Tap the base that runner is forced to on a ground ball.'
        }
      },
      targets: ['second'],
      explain: 'The batter is forced to first, which forces the runner on first to second. Touching second with the ball is the force on that runner. Touching first would retire the batter instead. Home and third are not forced with only first occupied.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0610',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 3,
      type: 'mc',
      prompt: 'A ground ball is misplayed by the second baseman. The batter reaches first. The official scorer judges the defence should have made the play. What is that?',
      choices: [
        'An error. The batter is on, but it is not a hit.',
        'A single, because the batter is on first',
        'A fielder\'s choice',
        'A walk'
      ],
      answer: 0,
      explain: 'An error is a play the defence should have made. The batter is awarded the base they reached, but it does not count as a hit. Parents often cheer it like a single; the scorebook does not.',
      source: ''
    },
    {
      id: 'q0611',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'fielding',
      difficulty: 3,
      type: 'tf',
      prompt: 'A fly ball caught in the air is an out, whether anyone else is on base or not.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'A catch is an out on the batter. Runners must tag up if they want to advance after the catch. People sometimes think a catch with nobody on is "just a fly" and not an out — it is still an out.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q0612',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'mc',
      prompt: 'In which of these settings is the dropped-third-strike rule OFF — the batter is simply out on strike three?',
      choices: [
        'Little League Junior',
        'Baseball Canada 13U championships',
        'SOLL Rookie and Minor, and Baseball Canada 11U',
        'Little League Senior'
      ],
      answer: 2,
      explain: 'The rule is switched off in the youngest divisions so a dropped pitch is just a strikeout. SOLL Rookie and Minor, and Baseball Canada 11U, retire the batter automatically. It is on in Little League Junior and Senior and in Baseball Canada 13U+ championships.',
      source: 'dropped-third-strike'
    },
    {
      id: 'q0613',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'fielding',
      difficulty: 2,
      type: 'mc',
      prompt: 'What is the difference between a flyout, a line out, and a pop out?',
      choices: [
        'They are scored the same and mean the same flight of the ball',
        'A flyout is on the ground; a line out is a walk',
        'A pop out is always an error',
        'A flyout is a fair ball caught in the air in the outfield; a line out is a hard, low ball caught in the air; a pop out is a high, short ball caught in the air, usually on the infield'
      ],
      answer: 3,
      explain: 'All three are caught balls in the air — the batter is out. The names describe the flight: high and deep (fly), hard and low (line), high and short (pop). The defence still has to catch them; a pop that drops can become a hit or an error.',
      source: ''
    },
    {
      id: 'q0614',
      chapter: 'ch06',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 4,
      type: 'scenario',
      prompt: 'Runner on second, first base empty. Ground ball to third. The third baseman steps on third before the runner gets there, but never tags the runner. Safe or out at third?',
      choices: [
        'Out. Any runner going to a bag is forced.',
        'Safe. First is empty, so the runner on second is not forced. The bag is not enough.',
        'Out, because third base is always a force.',
        'Safe only if there are two outs.'
      ],
      answer: 1,
      explain: 'A force needs the base behind the runner occupied. First is empty, so the runner on second may stay. Touching third without a tag does nothing. The defence had to tag the body.',
      source: 'baserunning-fundamentals'
    },

    /* ------------------------------------------------------------ */
    /* ch07 — Running the Bases                                     */
    /* quizIds: q0701–q0707                                         */
    /* ------------------------------------------------------------ */

    {
      id: 'q0701',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 2,
      type: 'mc',
      prompt: 'After beating a throw to first on a grounder, the batter-runner should:',
      choices: [
        'Run through the bag at full speed, then veer into foul territory',
        'Stop on the bag and stay there, like second or third',
        'Turn toward second every time, in case of an overthrow',
        'Slide into first, feet first'
      ],
      answer: 0,
      explain: 'First is the exception: run through, touch the front edge, peel into foul ground. Turning toward second is a move to advance — now you can be tagged. You do not run through second, third, or home.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0702',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'The three-foot running lane is:',
      choices: [
        'A lane in fair territory the batter must use the whole way to first',
        'Only for the catcher',
        'The last half of the way from home to first, marked in foul territory. Both feet should be in it (or on its lines) while the defence throws to first.',
        'A suggestion, never enforced'
      ],
      answer: 2,
      explain: 'Leave the lane and interfere with the throw, and you can be called out. You may leave it to avoid a fielder who is fielding the batted ball; you may not leave it to make the first baseman\'s catch harder. Fielders who do not have the ball must yield the path.',
      source: 'interference-and-obstruction'
    },
    {
      id: 'q0703',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 2,
      type: 'mc',
      prompt: 'With two outs, what is the default for every runner when the ball is put in play?',
      choices: [
        'Freeze and wait for the coach',
        'Everyone goes on contact. The inning is one out from over.',
        'Only forced runners go',
        'Tag up, even on a ground ball'
      ],
      answer: 1,
      explain: 'Two outs, you are running on anything. Hesitation helps no one — the inning ends on the next out anyway. Tagging up is a fewer-than-two-outs fly-ball read, not the two-out default.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0704',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 4,
      type: 'mc',
      prompt: 'On a caught fly ball, when may a runner leave the bag to tag up?',
      choices: [
        'When the umpire yells "catch"',
        'After the fielder has fully secured the ball in the glove',
        'When the ball leaves the bat',
        'On the fielder\'s first touch, even if the fielder bobbles it'
      ],
      answer: 3,
      explain: 'The runner may leave on first contact with the glove, not on the clean catch. If the fielder bobbles and then drops it, the runner who left on first touch is free to advance. Leaving with the crack of the bat is how you get doubled off.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q0705',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 4,
      type: 'mc',
      prompt: 'Runner on first, one out. Hard, low line drive at the shortstop. What should the runner do?',
      choices: [
        'Break for second on contact, like a ground ball',
        'Tag up as if it were a fly to the outfield',
        'Freeze. Hold until the ball hits the ground.',
        'Steal third'
      ],
      answer: 2,
      explain: 'A line drive caught with a runner already moving is a double play. Cue: hard and low, hold. Soft and high, read. Ground balls you run; line drives you freeze.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q0706',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'safety',
      difficulty: 3,
      type: 'mc',
      prompt: 'The default youth slide is:',
      choices: [
        'Head-first, hands reaching for the bag',
        'Feet-first, J-shape, hands up and thumbs up off the dirt',
        'A head-first dive only at home',
        'Staying on your feet and crashing the fielder'
      ],
      answer: 1,
      explain: 'Feet-first is the teaching default. Hands down is how fingers break. Head-first while advancing exposes hands and collarbones to a tag and a cleat. Slide or go around — never crash.',
      source: 'sliding'
    },
    {
      id: 'q0707',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'In Little League, a runner who slides head-first while advancing to the next base is:',
      choices: [
        'Out. Head-first advancing is prohibited at all Little League levels. Diving back to a bag (for example on a pickoff) is the exception.',
        'Safe, as long as they beat the tag',
        'Awarded an extra base for hustle',
        'Out in Baseball Canada and legal in Little League'
      ],
      answer: 0,
      explain: 'Little League Rule 7.08 (as applied locally, including SOLL) calls the runner out for a head-first advance. Diving back is allowed. Baseball Canada / OBR has no blanket prohibition, but youth leagues strongly discourage the same habit. Do not reverse the two pathways.',
      source: 'sliding'
    },
    {
      id: 'q0708',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 3,
      type: 'order',
      prompt: 'Put the fly-ball read in order, from first action to last.',
      items: [
        'Freeze when the ball is in the air',
        'Read whether it will be caught or dropped',
        'If it will be caught, get back to the bag',
        'Leave on the fielder\'s first touch'
      ],
      explain: 'Freeze, then read. If it will drop, you just run — no tag needed. If it will be caught, retouch and go on first contact. Breaking first and reading later is how you get doubled off.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q0709',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'strategy',
      difficulty: 3,
      type: 'mc',
      prompt: 'What does a windmill arm from the third-base coach mean?',
      choices: [
        'Get back to the bag',
        'Slide',
        'Hold',
        'Go — full send to the next base (or home)'
      ],
      answer: 3,
      explain: 'Windmill is go. Both arms out is hold. A point at the bag means get back. A downward slide signal means a close play is coming — get down. Mixing windmill and hold mid-stride is how a child ends up in a rundown.',
      source: 'base-coaching-duties'
    },
    {
      id: 'q0710',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'tf',
      prompt: 'A base coach may grab a runner\'s arm during live play to stop them from advancing.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'Coaches may wave, shout, and point. They may not touch you. Grabbing a runner is coach interference — the runner is out. The exception is helping an injured player.',
      source: 'base-coaching-duties'
    },
    {
      id: 'q0711',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'safety',
      difficulty: 2,
      type: 'tf',
      prompt: 'The helmet stays on the whole time you are on the bases. It comes off in the dugout, not between second and third.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'Helmet on until you are back in the dugout. Taking it off between bases is a safety habit to kill before it starts — a thrown ball or a collision does not wait.',
      source: 'sliding'
    },
    {
      id: 'q0712',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 4,
      type: 'mc',
      prompt: 'One out, runner on third, fly ball caught in the outfield beyond the infield grass. What is the usual read?',
      choices: [
        'Tag up and go (the third-base coach will send or hold). This is the most common way to score without a hit.',
        'Stay at third. You can never leave on a catch.',
        'Leave when the ball is pitched',
        'Run on contact, even if it will be caught'
      ],
      answer: 0,
      explain: 'From third, tag on almost any outfield fly caught beyond the infield grass. Shallow infield pops are a stay — the throw home is too short. Do not leave with the pitch; retouch, then go on first touch.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q0713',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'baserunning',
      difficulty: 3,
      type: 'mc',
      prompt: 'Runner on second, first empty, nobody out. Ground ball to shortstop. Is the runner on second forced to third?',
      choices: [
        'Yes. Every ground ball forces every runner.',
        'Yes, but only with two outs.',
        'No. First is empty, so they may stay. Going is a tag play.',
        'No, because second base is never a force.'
      ],
      answer: 2,
      explain: 'A runner is forced only when every base behind them is occupied. Empty first means the runner on second can hold. With two outs you still go on contact — that is a separate habit, not a force.',
      source: 'baserunning-fundamentals'
    },
    {
      id: 'q0714',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'safety',
      difficulty: 4,
      type: 'mc',
      prompt: 'When should a runner start a feet-first slide?',
      choices: [
        'After they reach the bag, as a celebration',
        'About 6 to 8 feet before the bag, so the lead foot meets the front of it',
        'Halfway down the baseline, to slow down early',
        'Only at home, never at second or third'
      ],
      answer: 1,
      explain: 'Start 6 to 8 feet before the bag. Too late and you over-run or stop on your knees. Hands up, thumbs up, contact on the outside of the thigh — not the kneecap. Slide at any close play, not only at home.',
      source: 'sliding'
    },
    {
      id: 'q0715',
      chapter: 'ch07',
      tier: 'sandlot',
      topic: 'strategy',
      difficulty: 3,
      type: 'mc',
      prompt: 'Once a runner has passed first and committed to second, who owns the send-or-hold decision?',
      choices: [
        'The on-deck batter',
        'The first-base coach, all the way around',
        'The dugout, shouting over the coach',
        'The third-base coach. The first-base coach owns only the decision at first.'
      ],
      answer: 3,
      explain: 'First-base coach: round or hold at first, and "go" on a wild pitch. After that, the third-base coach has the better sightline. If the dugout and the box disagree during live play, the coach in the box wins.',
      source: 'base-coaching-duties'
    },

    /* ------------------------------------------------------------ */
    /* ch08 — How a Game Is Played and Won                          */
    /* quizIds: q0801–q0807                                         */
    /* ------------------------------------------------------------ */

    {
      id: 'q0801',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'Who bats in the top of each inning, and who fields first?',
      choices: [
        'Home bats first; visitors field first',
        'Visitors bat in the top (home fields first). Home bats in the bottom.',
        'The team that won the last game chooses',
        'Both teams bat at the same time'
      ],
      answer: 1,
      explain: 'The visiting team bats first on purpose. Home takes the field, then bats in the bottom. That is why a home lead after the top of the last inning can end the game without home batting again.',
      source: ''
    },
    {
      id: 'q0802',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'Little League Majors. Home leads 4-2 after the top of the sixth. Do they bat in the bottom of the sixth?',
      choices: [
        'Yes. Every inning must have two halves.',
        'Only if the visitors ask to keep playing.',
        'No. If home already leads after the top of the last scheduled inning, they do not need that last turn.',
        'Yes, but they only get one batter.'
      ],
      answer: 2,
      explain: 'A regulation Majors game is six innings, shortened when home already leads after the top of the sixth. The visitors had their sixth-inning turn. This is the visitor-bats-first convention doing its job, not unsporting.',
      source: 'mercy-run-rules'
    },
    {
      id: 'q0803',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 2,
      type: 'mc',
      prompt: 'In a continuous batting order with 11 players, the 11th hitter just made the third out. Who leads off the next inning?',
      choices: [
        'The first hitter in the order — after the last name, it wraps to the top.',
        'The 11th hitter again, as a bonus at-bat',
        'Whoever the coach likes in this matchup',
        'The leadoff hitter only if they got a hit last time'
      ],
      answer: 0,
      explain: 'The order is fixed and it wraps. After the last name comes the first. The next inning does not reset to the top unless the last out happened to be the last name — which, here, it was. The coach does not pick.',
      source: 'lineup-construction'
    },
    {
      id: 'q0804',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 3,
      type: 'mc',
      prompt: 'How long is a scheduled Little League Majors game (national book)?',
      choices: [
        'Nine innings, like the majors on TV',
        'Four innings, then mercy',
        'Until a time clock hits 90 minutes',
        'Six innings (home may skip the bottom of the sixth if already ahead)'
      ],
      answer: 3,
      explain: 'Adult baseball is nine innings. Little League Majors is six; Intermediate, Junior, and Senior are seven; Baseball Canada 11U is six. Local time caps sit on top of those numbers — they do not replace them.',
      source: 'age-divisions'
    },
    {
      id: 'q0805',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 2,
      type: 'mc',
      prompt: 'On a line score, which number decides who won?',
      choices: [
        'Hits (H). Most hits wins.',
        'Runs (R). Most runs wins. Hits and errors are the other two letters.',
        'Errors (E). Fewest errors wins.',
        'The sum of hits and errors'
      ],
      answer: 1,
      explain: 'R is runs — the only number that decides the winner. H is hits (singles, doubles, triples, home runs — not walks, not errors). E is errors. A team can have fewer hits and still win.',
      source: ''
    },
    {
      id: 'q0806',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'A continuous batting order means:',
      choices: [
        'The coach rewrites the order every inning',
        'Only nine players bat, and the rest sit',
        'Every player present is on the list, in a fixed order that wraps. Everyone bats.',
        'The pitcher bats twice'
      ],
      answer: 2,
      explain: 'Continuous order is a Little League option and the usual house-league habit: everyone present bats. You do not skip the child who is playing right field. A traditional nine-hitter card is the other legal shape; Baseball Canada championships use that, plus an optional extra hitter.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q0807',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'mc',
      prompt: 'Little League Majors. The score is 3-3 after six complete innings. What happens?',
      choices: [
        'Extra innings, until the visitor leads after a completed inning or home scores the winning run',
        'It is a tie. Everyone goes home.',
        'Home is awarded the win because they bat last.',
        'The teams replay from the first inning.'
      ],
      answer: 0,
      explain: 'A tie after six (seven at Intermediate, Junior, and Senior) extends the game. Home does not win by batting last; they have to actually score more. Local time caps can complicate this — check the book before you assume a 1-1 game is over.',
      source: 'mercy-run-rules'
    },
    {
      id: 'q0808',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'Little League Majors, regular season. After 2 1/2 innings the home team leads 16-1. What happens?',
      choices: [
        'Keep playing. Mercy is only after six innings.',
        'It becomes a 5-run-per-inning cap from here on.',
        'The umpire adds extra innings to let the visitors catch up.',
        'The game ends. The 15-run rule applies after 3 innings, or 2 1/2 if home is ahead.'
      ],
      answer: 3,
      explain: 'National Little League: 15 runs after 3 innings (2 1/2 if home ahead). Home is ahead by 15 after 2 1/2, so it ends. The 5-run-per-inning cap is a Minor-division (and some local) rule, not this play. Baseball Canada championships wait longer: 15 after 4 (3 1/2 home).',
      source: 'mercy-run-rules'
    },
    {
      id: 'q0809',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 4,
      type: 'mc',
      prompt: 'Home trails in the bottom of the last inning, then scores the run that puts them ahead. What happens next?',
      choices: [
        'They keep batting to pad the score',
        'The game ends as soon as the winning run is in. That is a walk-off.',
        'They finish the full inning no matter what',
        'The visitors get one more turn'
      ],
      answer: 1,
      explain: 'If home takes the lead in that last half, you stop when the winning run reaches home. They do not keep batting for extra runs. If they were already ahead after the top, they would not have batted at all.',
      source: ''
    },
    {
      id: 'q0810',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 5,
      type: 'mc',
      prompt: 'Little League Majors, regular season, traditional nine-hitter order. What does mandatory play require for each rostered player present at the start?',
      choices: [
        'Nothing. Bench players are optional in Majors.',
        'One pitch as pitcher',
        'At least 6 defensive outs and 1 at-bat (with a possible drop to 3 outs and 1 at-bat on a 15-20 player roster with 15+ present)',
        'Automatic insertion as Extra Hitter'
      ],
      answer: 2,
      explain: 'Regulation IV.i is the participation guarantee. Extra Hitter is a Baseball Canada championship option, not a Little League auto-insert. The running part of mandatory play is waived when a continuous order is used, and the rule does not apply in tournament play or Senior.',
      source: 'mandatory-play-and-substitution'
    },
    {
      id: 'q0811',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 3,
      type: 'tf',
      prompt: 'Walks and errors count as hits (H) on the line score.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'H is hits: singles, doubles, triples, home runs. A walk is a walk. An error puts the batter on without a hit. Mixing those three is how a parent reads the board and cannot understand the score.',
      source: ''
    },
    {
      id: 'q0812',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'scoring',
      difficulty: 4,
      type: 'mc',
      prompt: 'Baseball Canada 11U (guidelines). How long is the game, and what caps a half-inning?',
      choices: [
        'Six innings, with a 5-run cap per half-inning (no cap in the final inning)',
        'Nine innings, no caps',
        'Four innings, 15-run mercy only',
        'Until every player has two at-bats'
      ],
      answer: 0,
      explain: '11U is six innings; 3 1/2 with home ahead is official. The 5-run cap keeps a half-inning from turning into a pile-on, and it lifts in the last inning so a trailing team can still come back. Championship 13U+ uses a different mercy grid, not this cap.',
      source: 'grassroots-divisions'
    },
    {
      id: 'q0813',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'scenario',
      prompt: 'Visitors lead 5-4 going to the bottom of the last scheduled inning. Does home bat?',
      choices: [
        'No. Last inning means the game is over.',
        'Only the first three hitters bat, then you stop.',
        'No, because visitors already have more hits.',
        'Yes. Home only skips the last half when already ahead. Trailing or tied, they bat.'
      ],
      answer: 3,
      explain: 'Home skips the last half only when already ahead. Trailing 5-4, they still have their turn and can tie or win. A walk-off ends it when the winning run is in; they do not keep batting for style points.',
      source: ''
    },
    {
      id: 'q0814',
      chapter: 'ch08',
      tier: 'sandlot',
      topic: 'rules',
      difficulty: 3,
      type: 'mc',
      prompt: 'In Baseball Canada championship play, how does a team get a tenth athlete into the batting order?',
      choices: [
        'Continuous batting order, like Little League house league',
        'Mandatory play automatically inserts them',
        'They bat in a leftover slot whenever someone is walked',
        'Declare an Extra Hitter (EH) on the lineup card — a tenth batter, not required of both teams'
      ],
      answer: 3,
      explain: 'Championships use a conventional nine-hitter order plus an optional Extra Hitter declared when the card is submitted. That is not the same thing as Little League\'s continuous order, and it is not a minimum-play insert. There is no per-game mandatory-play guarantee at that championship level.',
      source: 'lineup-construction'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
