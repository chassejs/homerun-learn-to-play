/* ===================================================================
   Homerun Learn to Play — questions-t4.js
   Tier 4 (Select) question bank for chapters 13–16.
   Registers onto HRL_QUESTIONS. ES5-safe. Load after questions-data.js.
   Content sourced from youth-baseball-canada wiki concept pages
   and skill-roadmap syntheses, matching curriculum-t4.js.
   Organising idea: on every batted ball, all nine have a job.
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
    /* ch13 — Defensive Positioning                                    */
    /* quizIds: q1301–q1308                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1301',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 4,
      type: 'mc',
      prompt: 'Standard alignment is the default. What does it assume?',
      choices: [
        'A runner in scoring position you must cut off at the plate',
        'A bunt you can see coming, so the corners are already charging',
        'Nothing special: no must-cut run at home, no bunt, no double-play chance worth crowding, and a hitter whose spray is unknown',
        'A late-game lead you are protecting by conceding the single'
      ],
      answer: 2,
      explain: 'Standard is balanced range against an unknown hitter with nothing special on. Infield-in, bunt defence, and no-doubles are specialised looks you have not earned until the runners, the count, the score, or the hitter give you a reason to move.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1302',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 6,
      type: 'mc',
      prompt: 'When should the infield play in — all four on the grass, ready to throw home?',
      choices: [
        'Whenever a runner is on third, including the second inning when you lead by six',
        'When the run at home is the game: tie, late, or the run that ends it',
        'With two outs and a runner on second, so that runner cannot score on a grounder',
        'On every hitter\'s count, because a ground ball is more likely'
      ],
      answer: 1,
      explain: 'Infield-in buys a play at the plate and sells range: grounders that were outs at regular depth find grass. Use it when that run actually matters. A runner on third is not enough by itself, and with two outs the runner on second scores on almost any hit anyway.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1303',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 7,
      type: 'scenario',
      prompt: 'Fifth inning, one-run game. Runner on second, two outs. The dugout yells "infield in!" so the runner cannot score on a grounder. What should you do?',
      choices: [
        'Bring all four infielders onto the grass and take the play at the plate',
        'Play double-play depth — short and second come in, corners stay',
        'Bring the outfield shallow to take away the single',
        'Stay at regular depth, or a step back, and take the out. The runner scores on a hit either way.'
      ],
      answer: 3,
      explain: 'That shout is a reaction to the runner, not a read of the outs. With two outs the runner on second scores on almost any base hit whether you are in or back. Playing in turns a routine grounder into a hit and still does not keep the run off the board.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1304',
      chapter: 'ch13',
      tier: 'select',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'Runner on first, fewer than two outs, no bunt read. You call double-play depth. Who shortens the most?',
      choices: [
        'Short and second come in and in toward the bag so they can field and feed second before the runner arrives. Corners move less.',
        'All four infielders move 3–5 steps onto the grass, the same as infield-in',
        'The corners crash as the pitcher delivers; short and second stay at regular depth',
        'The outfield comes in so a single cannot score the runner from first'
      ],
      answer: 0,
      explain: 'Double-play depth is the in-between: close enough to turn two, not as close as infield-in. You buy the turn and give up some range to the lines. Infield-in is a different look with a different job — the plate.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1305',
      chapter: 'ch13',
      tier: 'select',
      topic: 'positions',
      difficulty: 6,
      type: 'hotspot',
      prompt: 'Using the common batter-tendency rule (not a mouth sign), a right-handed batter is up. The runner at first is stealing. Who covers second? Tap that fielder.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          runners: ['first'],
          batter: 'R',
          title: 'Steal coverage — right-handed batter',
          desc: 'A youth diamond with a runner on first and a right-handed batter. Tap the fielder who covers second on the steal.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['ss'],
      explain: 'Right-handed batter: short covers second so second can hold the hole on the pull side. Left-handed batter: the jobs flip. Decide before the pitch — a mouth sign or a catcher signal is fine — do not decide while the throw is in the air.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1306',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 5,
      type: 'mc',
      prompt: 'No-doubles is a late-game, protect-the-lead look. What do you concede, and what do you take away?',
      choices: [
        'You concede the extra-base hit so you can take away the single',
        'You bring the infield in so a grounder cannot score the tying run',
        'You concede the single on purpose. Outfielders go deep and toward the lines; corners pinch. You take away the extra-base hit that ties or wins.',
        'You put five infielders on the grass and leave two outfielders'
      ],
      answer: 2,
      explain: 'A single does not beat you in this look; a double or a ball in the gap does. You will give up a base hit you might have caught at standard depth. That is the bill, and you pay it on purpose when one extra base beats you.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1307',
      chapter: 'ch13',
      tier: 'select',
      topic: 'positions',
      difficulty: 7,
      type: 'mc',
      prompt: 'On a steal, short and second must decide before the pitch who covers second. What is the common batter-tendency rule?',
      choices: [
        'Second always covers, because short has the stronger arm and should hold the hole',
        'Right-handed batter: short covers (second holds the hole). Left-handed batter: second covers (short holds the hole).',
        'The pitcher covers second; the middle infielders crash toward the plate',
        'Whoever is closer when the catcher throws — it is a race after the ball leaves the hand'
      ],
      answer: 1,
      explain: 'The covering infielder holds the bag; the other holds the hole on the pull side of that batter. Some teams use a mouth sign changed each pitch. Pick one system and run it. Coverage still matters at Little League Major, even though Rule 7.13 means there is no leadoff.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1308',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 5,
      type: 'mc',
      prompt: 'From about 12U on, what is the pre-pitch defensive checklist?',
      choices: [
        'Pitch type, then weather, then how loud the dugout is',
        'Only the hitter\'s spray chart — nothing else moves you',
        'Only the score. Ignore outs and runners until the last inning',
        'Outs, runners, count, score and inning, hitter'
      ],
      answer: 3,
      explain: 'Those five questions decide whether you stay at standard or move. Signal the alignment from the dugout at first. The goal by 14U is that the infield is already moving before you open your mouth.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1309',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 7,
      type: 'scenario',
      prompt: 'Last inning, you lead by one. Nobody on. The hitter is the opponent\'s power bat in a small park. What alignment?',
      choices: [
        'No-doubles: outfielders deep and to the lines, corners pinch. A single does not beat you; a double does.',
        'Infield in, in case they bunt for a hit with nobody on',
        'Outfield shallow so nothing falls in front',
        'Standard, because nobody is on and standard is always right with the bases empty'
      ],
      answer: 0,
      explain: 'Empty bases tempt you to stay standard. The game state is the reason to move: one extra-base hit ties or wins, and this bat in this park can hit one. Concede the single on purpose. Shallow is the opposite look — it is how balls go over your head.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1310',
      chapter: 'ch13',
      tier: 'select',
      topic: 'rules',
      difficulty: 8,
      type: 'mc',
      prompt: 'MLB requires two infielders on each side of second. What is true in Baseball Canada and Little League?',
      choices: [
        'The same restriction applies. Three infielders on the pull side is illegal',
        'The restriction applies only at 18U national championships',
        'Neither pathway has adopted it. You may put any number of infielders on either side of second. That is a licence, not an order: shift only with a real pull tendency, and never at the cost of a covered second base.',
        'Shifts are mandatory against any pull hitter from 10U up'
      ],
      answer: 2,
      explain: 'Youth baseball does not punish a legal shift. It does punish a shift that leaves second uncovered, or a shift on a hunch. At 10U–12U, spray is mostly noise; stay standard unless you have evidence.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1311',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 6,
      type: 'mc',
      prompt: 'How should the count move the defence?',
      choices: [
        'It should not. Count is a hitting idea, not a defensive one',
        'It is a step, not a new defence. Hitter\'s count (2-0, 3-1): a step toward pull. Pitcher\'s count (0-2, 1-2): a step toward opposite field, outfield a shade shallower.',
        'On any 3-1 count, bring the infield in',
        'On any 0-2 count, play no-doubles'
      ],
      answer: 1,
      explain: 'A fastball is more likely in a hitter\'s count, so pull is more likely — one step, not a migration. In a pitcher\'s count you get weaker contact and more chase, so opposite field and a slightly shallower outfield. Do not rebuild the defence because the count changed.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1312',
      chapter: 'ch13',
      tier: 'select',
      topic: 'positions',
      difficulty: 6,
      type: 'mc',
      prompt: 'Basic bunt defence, runner on first. Who charges, and who covers first and second?',
      choices: [
        'Short and second charge; the corners cover first and third',
        'Everyone charges the ball; the catcher covers first',
        'Short covers third; second covers second; first stays at the bag no matter what',
        'Corners charge. Second covers first. Short covers second. The pitcher takes anything in the middle. First call of "I got it!" owns the ball.'
      ],
      answer: 3,
      explain: 'The most common youth fault is first leaving the bag with nobody covering. Assign coverage before the pitch. Short covering third is a different rotation, used when the runner is already on second and you will not give up third — not the basic look with a runner on first.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1313',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 7,
      type: 'tf',
      prompt: 'With two outs and a runner on second, the infield should play in so that runner cannot score on a ground ball.',
      choices: ['True', 'False'],
      answer: 1,
      explain: 'With two outs the runner scores on almost any base hit regardless of your depth. Infield-in here gives away hits to prevent a run you cannot prevent. Play regular or a step back and get the out so the inning ends.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1314',
      chapter: 'ch13',
      tier: 'select',
      topic: 'strategy',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Sixth inning, you lead by one. Runner on third, one out. The hitter is a slap-contact type who almost never drives a ball past the outfielders. The dugout wants the infield in. What do you do?',
      choices: [
        'Bring the outfield in and take away the sacrifice fly. Against this bat the grounder through the infield is less likely than a medium fly.',
        'Bring the infield in. A runner on third with fewer than two outs always means infield-in.',
        'Play no-doubles: outfielders deep and to the lines',
        'Stay standard and ignore the runner'
      ],
      answer: 0,
      explain: 'Infield-in is the obvious shout. Against this bat it gives up a hit you did not need to give up. Outfield shallow takes away the sac fly and the bloop; the risk you are accepting is the ball over the head, which this hitter almost never hits.',
      source: 'defensive-positioning'
    },
    {
      id: 'q1315',
      chapter: 'ch13',
      tier: 'select',
      topic: 'scouting',
      difficulty: 9,
      type: 'mc',
      prompt: 'When do you start shading for a real pull tendency, and what do you refuse to give up?',
      choices: [
        'At 10U, copy the MLB shift: three infielders on the pull side, second uncovered if that is where the hole is',
        'On every right-handed batter, because most kids pull',
        'Hitter tendency is a 13U+ tool, and only with evidence. Pull-side right-handed bat: short a step toward second, third a step toward the line, outfield a step toward left-centre. Never leave second uncovered. At 10U–12U, spray is noise; stay standard.',
        'Shade only the outfield; infielders never move off standard'
      ],
      answer: 2,
      explain: 'A step is not a migration. Do not shift on a hunch, and do not spend a covered second base or a cutoff man to chase a spray chart that is not there yet. Younger spray patterns are too noisy to build a defence on.',
      source: 'defensive-positioning'
    },

    /* -------------------------------------------------------------- */
    /* ch14 — Cutoffs, Relays & Backups                                */
    /* quizIds: q1401–q1408                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1401',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'On every batted ball, all nine have a job. What are the three jobs?',
      choices: [
        'Pitch, catch, and hit',
        'Ball (field the batted ball), base (cover a bag or occupy the cutoff/relay), and backup. Nobody stands still.',
        'Infield, outfield, and battery',
        'Force, tag, and appeal'
      ],
      answer: 1,
      explain: 'One player goes to the ball. Others cover bases — including the cutoff and relay spots, which count as base jobs in this system. Everyone else backs someone up. The big inning in youth baseball is almost never one great swing; it is a hit, then a throw with no cutoff, then a ball at the backstop.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1402',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 7,
      type: 'mc',
      prompt: 'Two different jobs get called "cut" in a dugout. How do cutoff and relay actually differ?',
      choices: [
        'Cutoff: the infielder who lines up between the outfielder and the target on a single — typically first or third, and first is the cut on throws home from centre or right. Relay: the middle infielder who goes out onto the grass on an extra-base hit — short to left or left-centre, second to right.',
        'They are the same job with two names. Whoever is nearest the outfielder takes it.',
        'The pitcher is always the cutoff; the catcher is always the relay',
        'Centre field is the cutoff on every throw; infielders only cover bags'
      ],
      answer: 0,
      explain: 'A cutoff is a base job on a single: you are covering a designated intercept, not fielding the batted ball. A relay is the extra-base version, well out on the grass, because one throw across 60–90 metres loses line and accuracy. Two shorter throws beat one long one.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1403',
      chapter: 'ch14',
      tier: 'select',
      topic: 'positions',
      difficulty: 6,
      type: 'hotspot',
      prompt: 'Runner on third. Single to centre. The play is at the plate. Who is the cutoff? Tap that fielder.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          runners: ['third'],
          ball: 'shallow-center',
          title: 'Throw home — tap the cutoff',
          desc: 'A youth diamond with a runner on third and a single to shallow centre. Tap the fielder who is the cutoff on the throw home.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['1b'],
      explain: 'First lines up in a straight line from centre to home, about two-thirds of the way to the outfielder, arms up. Second covers first because first has left; short covers second; third stays at third; the pitcher backs up home; the catcher calls cut or let it go.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1404',
      chapter: 'ch14',
      tier: 'select',
      topic: 'positions',
      difficulty: 8,
      type: 'mc',
      prompt: 'Extra-base hit to right, runner on first, throw to third. Who is the relay, who covers second, and who trails?',
      choices: [
        'Short is the relay in shallow left; second covers second; third trails',
        'First is the relay; second covers first; short trails',
        'Centre is the relay; right just backs up the fence',
        'Second is the relay in shallow right-centre, pre-turned to third. Short covers second. First trails the relay as backup in case the outfielder\'s throw is off-line. Pitcher backs up third.'
      ],
      answer: 3,
      explain: 'Ball to right or right-centre: second goes out. Ball to left or left-centre: short goes out. The trailer is not a second cutoff — first is behind the relay so a skipped throw still has a body. Left, the far outfielder, backs up second.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1405',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 6,
      type: 'order',
      prompt: 'Put the cutoff or relay setup in order, from first body movement to the catch.',
      items: [
        'Get in a straight line between the outfielder and the target',
        'Stand about two-thirds of the way to the outfielder — close enough to catch a line, not a lob',
        'Raise both arms and call "Hit me!"',
        'Receive already turned to the throwing side so the catch is the throw'
      ],
      explain: 'Too close to the bag and the outfielder has to arc it. Off the line and the outfielder throws around you and loses velocity. Squaring up, catching, then spinning adds a beat. The outfielder throws at the glove, on a line, four-seam.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1406',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'The catcher directs the throw. What does silence mean, and who is allowed to freelance a cut?',
      choices: [
        'Silence means cut everything; the cutoff always holds the ball',
        'Silence means throw to first; the pitcher may cut if they feel like it',
        'Silence means let it go to the base the outfielder is throwing to. If you hear nothing, do not freelance a cut.',
        'Silence means the play is dead; run the ball in to the mound'
      ],
      answer: 2,
      explain: 'The catcher sees the whole field and calls "Cut two," "Cut three," "Cut four" (or "Cut home"), or "Let it go." Cutting a throw that was going to get the runner is as costly as letting an offline throw sail. The failure mode is the relay man holding the ball because nobody spoke.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1407',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 5,
      type: 'mc',
      prompt: 'Where does the pitcher go on throws from the outfield to third or home?',
      choices: [
        'Next to the catcher, so they can call the cutoff together',
        'Behind the base the throw is going to — third or home — backing it up. Not next to the catcher.',
        'To first, because the pitcher always covers first',
        'To the mound to get out of the way'
      ],
      answer: 1,
      explain: 'Backups are not optional. The pitcher stands behind the throw-target, not beside it. Right field backs up first on every infield throw across the diamond. Centre backs up second on infield grounders and steal throws. Left backs up third. Outfielders also back each other: near one to the ball, next one behind the fielder, far one behind the throw-target base.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1408',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 7,
      type: 'scenario',
      prompt: 'Single to left, runner going first to third. Shortstop jogs toward second instead of lining up between left field and third. Left field throws through. The ball skips, third lunges, and it goes to the fence. The batter takes second and the runner scores. What was the missed job?',
      choices: [
        'The outfielder needed a stronger arm; cutoffs are only for weak throwers',
        'The pitcher should have covered first',
        'Centre field should have taken the throw at second',
        'Short should have been the cutoff in line, arms up, ready to cut and hold the batter at first if the play at third was gone. Catcher needed a voice. Pitcher needed to be behind third.'
      ],
      answer: 3,
      explain: 'The missed job was not the throw. It was the body in line. A missed cutoff turns one extra base into two or three — that is the big inning. The fix is the cutoff, the catcher\'s voice, and the pitcher behind the bag, not a better arm.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1409',
      chapter: 'ch14',
      tier: 'select',
      topic: 'positions',
      difficulty: 8,
      type: 'mc',
      prompt: 'On a ball in the right-field gap, who is the trailer, and what is that job?',
      choices: [
        'First trails the relay — backup, not a second cutoff — in case the outfielder\'s throw is off-line',
        'Third trails, because every extra-base hit is a play at third',
        'The pitcher trails the relay from the mound',
        'Short trails; second stays at second no matter where the ball is'
      ],
      answer: 0,
      explain: 'The trailer is the extra body behind the relay, usually first on a ball in the right-field gap. You are not a second cutoff standing in the same line ahead of the relay. You are the backup if that first throw skips.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1410',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 6,
      type: 'mc',
      prompt: 'Single to left, throw to second. Who is the cutoff, and who covers the bag?',
      choices: [
        'Second is the cutoff; short covers second',
        'First is the cutoff; third covers second',
        'Short is the cutoff, in a straight line from left field to second, arms up. Second covers the bag.',
        'Left field throws through to second with nobody in line; cutoffs are only for throws home'
      ],
      answer: 2,
      explain: 'On a single to left, short is the cutoff to second or third. Second covers second. Pitcher backs up the throw target. Centre backs up left. Right, the far outfielder, backs up second. Catcher covers home and will call cut or let it go.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1411',
      chapter: 'ch14',
      tier: 'select',
      topic: 'positions',
      difficulty: 7,
      type: 'hotspot',
      prompt: 'Extra-base hit to right. Runner on first. The throw is going to third. Who is the relay? Tap that fielder.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          runners: ['first'],
          ball: 'right-center-gap',
          title: 'Gap to right — tap the relay',
          desc: 'A youth diamond with a runner on first and a ball in the right-centre gap. Tap the fielder who is the relay on the throw to third.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['2b'],
      explain: 'Second goes out onto the grass in shallow right-centre, in line to third, pre-turned. Short covers second. Third covers third. First trails the relay. Pitcher backs up third. Centre backs up right. Left, the far outfielder, backs up second.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1412',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 9,
      type: 'mc',
      prompt: 'The ball is so deep that one relay cannot cover it. What do you do?',
      choices: [
        'Have the outfielder one-hop it to the plate anyway; two throws are always slower',
        'Double-relay: both middle infielders in line, the farther one to the nearer one, then home (or the target base)',
        'Let the nearest infielder camp at the bag and hope the throw carries',
        'Call time and walk the ball in'
      ],
      answer: 1,
      explain: 'A throw across a full outfield loses line and accuracy. Two shorter throws beat one long one; three beat two when the ball is at the fence. The farther middle infielder is still a base job — a designated intercept — not a spectator. Teach this at 13U+, after the single-relay is automatic.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1413',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 7,
      type: 'mc',
      prompt: 'How should a right-handed relay from centre to third receive the ball?',
      choices: [
        'Square up to the outfielder, catch, then spin toward third',
        'Catch on both knees so the throw cannot skip',
        'Backpedal toward third while the ball is in the air',
        'Catch already opened toward third so the catch becomes the throw. Do not square up, catch, then spin.'
      ],
      answer: 3,
      explain: 'Receive pre-turned to the throwing side. Squaring up and then turning adds a beat, and that beat is the extra base. The same idea as a double-play pivot: the body is already going where the next throw is going.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1414',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 4,
      type: 'scenario',
      prompt: 'Ground ball wide of first. The first baseman is pulled off the bag. Nobody on, zero outs. Who does what?',
      choices: [
        'First fields (ball). Pitcher covers first (base). That is a 3-1. Second covers second; third covers third. Catcher, with nobody on, backs up the play at first. Right field gets behind first.',
        'Second fields everything on the right side; first stays glued to the bag',
        'Catcher sprints to first; pitcher backs up home',
        'Short covers first; first chases the ball into right field and throws from there'
      ],
      answer: 0,
      explain: 'When first is the ball, someone else must be the base. The pitcher is that someone. With nobody on, the catcher trails the batter-runner and backs up first rather than staying at home. Right field is the outfield backup at first on every infield throw across the diamond.',
      source: 'cutoffs-and-relays'
    },
    {
      id: 'q1415',
      chapter: 'ch14',
      tier: 'select',
      topic: 'fielding',
      difficulty: 6,
      type: 'mc',
      prompt: 'On infield throws across the diamond, which outfielder backs up first, and what do the other two do on a grounder to short with nobody on?',
      choices: [
        'Left backs up first; centre and right stay put',
        'Centre backs up first; left and right crash toward the infield',
        'Right field backs up first. Centre backs up second. Left backs up third.',
        'No outfielder backs up an infield throw; backups are only for extra-base hits'
      ],
      answer: 2,
      explain: 'Outfielders back each other and the throw-target bases, not just fly balls. Right is behind first on the 6-3. Centre is behind second. Left is behind third. If you only back up on extra-base hits, the overthrow on a routine grounder becomes two extra bases.',
      source: 'outfield-play'
    },

    /* -------------------------------------------------------------- */
    /* ch15 — Baserunning IQ                                           */
    /* quizIds: q1501–q1508                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1501',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 5,
      type: 'mc',
      prompt: 'What is a primary lead, and what is a secondary lead?',
      choices: [
        'Primary is a sprint on contact; secondary is a walk to the next bag after a foul',
        'Primary is a leadoff of 10–12 steps; secondary is diving back',
        'Primary: 2–3 shuffle steps off the bag before the pitcher commits, close enough to dive back. Secondary: two more walking steps as the pitcher delivers, finishing athletic, ready to break on a ball in the dirt.',
        'They are the same thing. "Secondary" is just the coach\'s word for a longer primary'
      ],
      answer: 2,
      explain: 'Do not cross the feet on the primary. The secondary is what turns a steal from a flat-footed jump into a first step you already own. That pair exists only where leadoffs are legal. At Little League Major and below, the runner\'s heel stays on the bag until the pitch arrives.',
      source: 'base-stealing-and-leadoffs'
    },
    {
      id: 'q1502',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 6,
      type: 'mc',
      prompt: 'Little League Major (Rule 7.13). May the runner take a primary lead?',
      choices: [
        'Yes. Little League Major uses full OBR leadoffs',
        'No. The runner holds the base until the pitch reaches the batter. The skill is a timed break: coil on the back foot, contact with the bag, explode when the ball arrives.',
        'Yes, but only with two outs',
        'No leadoff, and also no steal of any kind — the runner cannot leave even after the pitch arrives'
      ],
      answer: 1,
      explain: 'Stealing is still legal as a timed break when the pitch reaches the batter. What is gone is the walking lead. The same no-leadoff mechanic applies at Baseball Canada 11U low tier. Intermediate / Junior / Senior and BC championship 13U+ (and 11U-A where OBR applies) use full leads.',
      source: 'base-stealing-and-leadoffs'
    },
    {
      id: 'q1503',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 6,
      type: 'mc',
      prompt: 'What does "steal on the pitcher, not the catcher" mean for a right-hander from the set?',
      choices: [
        'If the free (front) foot lifts and steps toward home, it is a pitch — go. If it steps toward first, it is a pickoff — get back.',
        'You wait to see how strong the catcher\'s arm looks, then decide',
        'You always go on first movement, even if that movement is to first',
        'You only steal when you dislike the catcher'
      ],
      answer: 0,
      explain: 'You are reading commitment, not guessing. A pitcher who comes set and delivers on the same count every time is giving you the jump; varying the hold takes it back. A slide-step shortens the catcher\'s window but costs the pitcher velocity. You steal when the delivery is slow.',
      source: 'base-stealing-and-leadoffs'
    },
    {
      id: 'q1504',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 7,
      type: 'scenario',
      prompt: 'Right-hander in contact with the rubber, runner at first, one out. He fakes a throw to first without throwing, then looks to the plate. What is the call, and what does the runner do?',
      choices: [
        'Legal pickoff move. Hold the bag.',
        'Steal second immediately — a fake means he cannot throw',
        'Dead ball, runner returns to first. No penalty.',
        'Balk. A feint to first while in contact with the rubber is illegal. All runners advance one base. You do not have to steal it.'
      ],
      answer: 3,
      explain: 'Do not steal through a move you have not identified. If it is a balk, you advance anyway. The legal version is: pivot foot steps back off the rubber first, then a fake is allowed, because the pitcher is now an infielder.',
      source: 'balk-rules'
    },
    {
      id: 'q1505',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 5,
      type: 'order',
      prompt: 'Put the fly-ball read in order, from first action to the tag-up leave.',
      items: [
        'Freeze when the ball is in the air',
        'Read whether it will be caught or dropped',
        'If it will be caught, get back and tag; if it will drop, go',
        'Leave on the fielder\'s first contact of the glove, not a secure catch'
      ],
      explain: 'Breaking on contact, seeing a catch, and failing to retouch is the rally-killer. If you cannot tell, hold partway. If the fielder bobbles after first touch, you are already legal to go.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q1506',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 7,
      type: 'mc',
      prompt: 'When may a runner leave the bag on a tag-up?',
      choices: [
        'Only after the umpire signals a catch',
        'On the fielder\'s first contact of the glove, even if the fielder bobbles after that',
        'Only after the fielder has secured the ball in the throwing hand',
        'As soon as the ball is in the air, because a fly is always a catch'
      ],
      answer: 1,
      explain: 'First touch, not a secure catch. That distinction is the same in both pathways. From third, any fly beyond the infield grass is a possible tag; when in doubt at third, go — being caught between third and home is worse than a bang-bang play at the plate.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q1507',
      chapter: 'ch15',
      tier: 'select',
      topic: 'strategy',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Baseball Canada 13U. Runners on first and third, one out. The trail runner breaks for second on the pitch. What is the offence trying to create, and what can the defence do?',
      choices: [
        'A double play. The defence should throw to first.',
        'A steal of home by the trail runner. The defence should ignore second.',
        'If the catcher throws through, the lead runner reads the ball leaving the hand and goes home. If the catcher holds, you have second and third and no run. Defence may hold, throw through (cover assigned before the pitch), or cut the throw.',
        'Both runners must freeze until the ball is hit. First-and-third is not a steal situation.'
      ],
      answer: 2,
      explain: 'That trade is the whole play. Hold the ball when the run at home ties or wins. Throw through only if the covering infielder is ready to return home. At Little League Major the live play is the same steal-and-read; designed delayed steals are mostly gone because there is no secondary lead until the pitch arrives.',
      source: 'first-and-third-situations'
    },
    {
      id: 'q1508',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 4,
      type: 'mc',
      prompt: 'You are rounding third. What do the third-base coach\'s signals mean?',
      choices: [
        'Windmill is go. Both arms out is hold. Point at the bag is get back. Flat hand down is slide.',
        'Windmill is hold. A clap means slide.',
        'Any wave means steal home on the next pitch',
        'The coach may grab your arm to stop you; that is the "hold" signal'
      ],
      answer: 0,
      explain: 'Pick the coach up before the ball is caught, not as you hit the dirt. On a tag from third, do not watch the outfielder — the coach has that read. Your job is first contact, then a straight line home. "Go" then "back" puts you in the rundown.',
      source: 'base-coaching-duties'
    },
    {
      id: 'q1509',
      chapter: 'ch15',
      tier: 'select',
      topic: 'pitching',
      difficulty: 8,
      type: 'mc',
      prompt: 'Left-hander from the set, runner at first. How do you read the free foot?',
      choices: [
        'A left-hander can never pick to first, so always go',
        'If the free foot moves at all, it is a balk',
        'Treat every lift as a pickoff and never steal on a left-hander',
        'If the free foot crosses the 45-degree line toward the plate, the pitcher is committed to pitch — go. If the step is clearly to first, hold.'
      ],
      answer: 3,
      explain: 'A left-hander is harder than a right-hander because the first move can look like either. Past that 45-degree line, failing to deliver would be a balk, so you treat it as a pitch. A legal step toward first is still a pickoff. You are reading commitment.',
      source: 'base-stealing-and-leadoffs'
    },
    {
      id: 'q1510',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 7,
      type: 'mc',
      prompt: 'Right-hander, runner at first. Pivot foot steps back off the rubber. Then he fakes a throw to first. Legal or balk?',
      choices: [
        'Balk. Any fake to first is always a balk',
        'Legal. Once the pitcher disengages, he is an infielder. A fake to first is allowed. Get back.',
        'Legal only with two outs',
        'Balk, because he did not throw to a base'
      ],
      answer: 1,
      explain: 'Stepping back off the rubber first is how pitchers avoid a balk. Teach this before a snap-throw from the rubber. The illegal version is the same fake while still in contact with the rubber.',
      source: 'balk-rules'
    },
    {
      id: 'q1511',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 7,
      type: 'tf',
      prompt: 'A pitcher in contact with the rubber fakes a throw to third (the old third-to-first move). That is a balk, and all runners advance.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'A fake to third while in contact with the rubber has been a balk since 2013. The third-to-first move is dead. If the pitcher steps off first, then a bluff toward third is legal because he is an infielder.',
      source: 'balk-rules'
    },
    {
      id: 'q1512',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 6,
      type: 'scenario',
      prompt: 'Runner on first, one out. Hard line drive at the second baseman. The runner breaks on contact. What should have happened, and what is the cue?',
      choices: [
        'Break on every ball in play; two outs and one out are the same read',
        'Go hard. A liner at an infielder always drops',
        'Hold until the ball hits the grass. Hard and low: hold. The first-base coach\'s job is "back, back," loud, before the runner\'s third stride. Freeze is not passive.',
        'Tag up at first as if it were a fly ball to the outfield'
      ],
      answer: 2,
      explain: 'A runner who breaks on a liner and sees the catch cannot get back — 4-3, inning over. Soft and high, you can read and go. Two outs change everything: run on contact, because if the batter is out the inning is over anyway.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q1513',
      chapter: 'ch15',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 5,
      type: 'mc',
      prompt: 'Two outs. The ball is put in play. What do the runners do?',
      choices: [
        'Freeze and tag. Two outs means every fly is a catch',
        'Run on contact. If the batter is out the inning is over anyway; if it falls, every runner needed the extra step.',
        'Hold at third; only the batter-runner goes',
        'Wait for the coach to clap before taking a step'
      ],
      answer: 1,
      explain: 'Two outs flips the fly-ball and liner reads. There is nothing to gain by hesitating: if the batter is out the inning is over; if the ball falls, every runner needed the extra step. Drill "two outs, running on contact" until it is automatic.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q1514',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 9,
      type: 'mc',
      prompt: 'Little League Major. First and third. The catcher wants to pump toward third to freeze the lead runner, then throw to second. Legal?',
      choices: [
        'Yes. That is the standard OBR look-back',
        'Yes if the pitcher asked for it',
        'Legal only with two outs',
        'No. In Little League the catcher may not fake a throw; if the motion starts, the ball must go. The LL-legal look-back is catcher to pitcher, pitcher bluffs to third.'
      ],
      answer: 3,
      explain: 'This is the single most important first-and-third rule difference in Little League. A catcher fake is illegal. Baseball Canada / OBR has no such catcher restriction, and a pitcher who has disengaged may fake toward third. Do not import an OBR play into a Major game.',
      source: 'first-and-third-situations'
    },
    {
      id: 'q1515',
      chapter: 'ch15',
      tier: 'select',
      topic: 'rules',
      difficulty: 6,
      type: 'mc',
      prompt: 'A base coach grabs a runner\'s arm during live play to stop them from going home. What is the ruling?',
      choices: [
        'Coach interference. The runner is out. Coaches may wave, shout, and point; they may not touch a runner during live play, except an injured runner.',
        'Legal. That is how you hold a runner',
        'A warning only, unless it happens twice',
        'The runner is awarded home for being assisted'
      ],
      answer: 0,
      explain: 'This rule catches coaches off guard because it looks helpful. Protocol on signals: first-base coach owns the decision at first; once you commit past first, third-base coach owns the rest of the diamond. Do not take a windmill from first and a stop from third at the same time.',
      source: 'base-coaching-duties'
    },

    /* -------------------------------------------------------------- */
    /* ch16 — Bunting & Small Ball                                     */
    /* quizIds: q1601–q1608                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q1601',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 4,
      type: 'mc',
      prompt: 'What is a bunt, as a skill?',
      choices: [
        'A short swing. Chop down on the ball so it dribbles',
        'You offer the bat and let the ball die. The cue is "catch the ball with the bat." Give with the arms. Do not push.',
        'A full swing that you stop halfway',
        'Any ball that rolls in front of the plate, even on a checked swing you did not mean'
      ],
      answer: 1,
      explain: 'An upward barrel pops the ball up. Pushing at it bounces it to a charging fielder. Square-around is the teaching method at 9–10U; pivot (front foot only) is the 11–12U option for a player who can still take a pitch.',
      source: 'bunting'
    },
    {
      id: 'q1602',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 5,
      type: 'order',
      prompt: 'Put the sacrifice bunt in order, from the first body move to running.',
      items: [
        'Pivot or square so you face the pitcher, set before the ball is halfway',
        'Top hand pinches at the label; barrel level at the top of the zone',
        'If it is above the bat, pull back; if it is a strike, give with the arms',
        'Angle the barrel to the line you want, drop the bat, and run'
      ],
      explain: 'Bat level at the top of the zone means anything above the bat is a ball — do not chase it. You have already agreed to be out if the defence fields it clean. The bunt is successful if the runner moves.',
      source: 'bunting'
    },
    {
      id: 'q1603',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'How does the pinching grip work, and where is the bat?',
      choices: [
        'Bottom hand slides to the barrel; bat stands vertical like a foul pole',
        'Fingers wrap around the barrel so you can push the ball',
        'Top hand slides to the label. Thumb and index press from behind and below, fingers bent, not wrapped around the barrel. Bat is level at the top of the zone.',
        'Both hands stay at the knob; the barrel droops so low pitches are easier'
      ],
      answer: 2,
      explain: 'Fingers wrapped around the barrel get hit. A drooping barrel pops the ball up. Level at the top of the zone is also a take sign: if it is above the bat, it is a ball.',
      source: 'bunting'
    },
    {
      id: 'q1604',
      chapter: 'ch16',
      tier: 'select',
      topic: 'rules',
      difficulty: 6,
      type: 'mc',
      prompt: 'The bunt is on. The count goes 1-2. Why do you usually take the bunt off?',
      choices: [
        'A foul bunt with two strikes is a strikeout. Two-strike bunts are a deliberate decision, not a leftover sign.',
        'Bunting with two strikes is illegal in both pathways',
        'The runner is no longer allowed to advance',
        'Two-strike bunts always go fair, so you should keep it on'
      ],
      answer: 0,
      explain: 'Bunt only strikes even before two strikes — a ball is a ball; take it. Keep a two-strike bunt on only for a specialist you trust, and say so out loud so the batter is not guessing.',
      source: 'bunting'
    },
    {
      id: 'q1605',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 7,
      type: 'mc',
      prompt: 'Match the bunt to its job.',
      choices: [
        'Sacrifice bunts for a hit; drag gives the out; squeeze is a slash',
        'Drag is only from the right side; push always goes down the third-base line',
        'Suicide squeeze breaks after contact; safety squeeze breaks on the pitcher\'s motion',
        'Sacrifice: give the out, take the base. Drag: bunt for a hit, especially from the left side. Push: past the pitcher toward second. Safety squeeze: runner breaks after seeing contact. Suicide: runner breaks on the motion; you must bunt. Slash: show bunt, pull back, compact swing into the hole the corners left.'
      ],
      answer: 3,
      explain: 'Five bunts, five jobs. Mixing them up is how a suicide gets called when you meant safety, or a slash gets taken as a full swing. At Little League Major the runner cannot leave until the pitch arrives, so the squeeze timing advantage is gone.',
      source: 'bunting'
    },
    {
      id: 'q1606',
      chapter: 'ch16',
      tier: 'select',
      topic: 'strategy',
      difficulty: 7,
      type: 'scenario',
      prompt: 'Last inning, tie game. Runner on first, zero outs. Eight-hole hitter at the plate; your three-hole is on deck. What is the call?',
      choices: [
        'Swing away. Never give up an out, even with a weaker bat and one run being the game.',
        'Sacrifice. Move the runner; let the three-hole drive him in. You are buying second base with an out you can afford.',
        'Suicide squeeze. The runner at first should break for home.',
        'Take until 3-0, then swing no matter where the pitch is'
      ],
      answer: 1,
      explain: 'This is the textbook sacrifice: one run is the game, zero outs, a weaker bat, a better bat on deck. A suicide from first is the wrong play. At Little League Major, discount this trade — the runner has no jump, and the lead-runner out at second is live.',
      source: 'offensive-strategy'
    },
    {
      id: 'q1607',
      chapter: 'ch16',
      tier: 'select',
      topic: 'positions',
      difficulty: 6,
      type: 'mc',
      prompt: 'Basic bunt defence with a runner on first. Who covers first, who covers second, and who talks?',
      choices: [
        'First stays; short covers first; second charges',
        'Catcher covers first; pitcher covers second; nobody talks',
        'Corners charge. Second covers first. Short covers second. Pitcher takes the middle and calls "first!" or "second!" First call of "I got it!" owns the ball.',
        'All four infielders charge; the outfielders cover the bags'
      ],
      answer: 2,
      explain: 'The fault that scores runs is first charging with nobody covering the bag. Assign it before the pitch, every bunt-likely count. Centre backs up second, which is the bag that can get lonely if short has to move.',
      source: 'defensive-strategy'
    },
    {
      id: 'q1608',
      chapter: 'ch16',
      tier: 'select',
      topic: 'positions',
      difficulty: 8,
      type: 'mc',
      prompt: 'Runner on second, zero outs, bunt is on. You call wheel. Who covers third, and what is everyone else doing?',
      choices: [
        'Second wheels to third. Short and third attack the bunt on the third-base line. First covers first. Centre must back up second — the wheel leaves it open.',
        'Third stays. Charging is only for first.',
        'The catcher sprints to third. Everyone else charges the ball.',
        'Short stays at second; second stays at second. Third fields and throws to first only.'
      ],
      answer: 0,
      explain: 'The job is to stop the lead runner at third. If the play at third is there, take it; if not, throw to first. Introduce the wheel at 13U+. At 11–12U, run basic coverage only.',
      source: 'defensive-strategy'
    },
    {
      id: 'q1609',
      chapter: 'ch16',
      tier: 'select',
      topic: 'strategy',
      difficulty: 6,
      type: 'scenario',
      prompt: 'Fourth inning, you trail 5-1. Runner on first, zero outs. Your three-hole hitter is up. Someone wants a sacrifice. What do you do?',
      choices: [
        'Sacrifice. Always bunt with a runner on first and zero outs.',
        'Safety squeeze from first. The runner can score on contact.',
        'Issue a take sign and hope for a walk, then bunt the next hitter no matter who it is.',
        'Swing away. You need more than one run; do not hand them an out with a dangerous bat.'
      ],
      answer: 3,
      explain: 'Do not bunt when you are down by three or more. The sacrifice out is too costly when you need a crooked number. A strong hitter swinging is the higher-percentage path. The sign is not a personality; it is math you can explain in one sentence.',
      source: 'offensive-strategy'
    },
    {
      id: 'q1610',
      chapter: 'ch16',
      tier: 'select',
      topic: 'baserunning',
      difficulty: 7,
      type: 'mc',
      prompt: 'Baseball Canada 13U. Runner on third, one out, late, you need one run. Leadoffs are legal. Your batter can bunt. Which squeeze do you install first?',
      choices: [
        'Suicide first. The runner breaks on first movement every time, even if the batter is still learning.',
        'Safety squeeze. The runner breaks after seeing contact and can retreat if the batter misses. Suicide waits until the batter can bunt anything near the zone and the runner will not leave on a ball.',
        'Do not squeeze at 13U. Wait for a fly ball, always.',
        'Squeeze from third is illegal wherever leadoffs are legal'
      ],
      answer: 1,
      explain: 'A missed suicide at 11U is a play you taught too early, not a player who failed you. At Little League Major the runner cannot leave until the pitch arrives, so the squeeze timing advantage is gone — do not install it there.',
      source: 'bunting'
    },
    {
      id: 'q1611',
      chapter: 'ch16',
      tier: 'select',
      topic: 'strategy',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Little League Major. Runner on first, zero outs, one-run game. Coach wants a sacrifice. What is the honest read?',
      choices: [
        'Bunt. The sacrifice works the same in every division because bunts are legal.',
        'Squeeze. The runner at first can leave when the pitcher starts.',
        'Be slow to bunt. Rule 7.13 means the runner cannot break until contact, so the defence throws out the lead runner more easily. Put the ball in play or wait for a walk.',
        'Bunt toward the crashing third baseman so they have to make a play on the run, every time'
      ],
      answer: 2,
      explain: 'Bunting is legal. The no-leadoff rule is what changes the value of the out, not a ban on the play. A sacrifice that is a fair trade with a walking lead is a poor trade without one: the fielder has a shorter throw and the runner has no jump.',
      source: 'bunting'
    },
    {
      id: 'q1612',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 7,
      type: 'mc',
      prompt: 'Corners are crashing every bunt show. Runner on first, zero outs. Your batter can handle the bat. What is the offensive answer?',
      choices: [
        'Slash: show bunt until they commit, pull the bat back, take a compact swing into the hole they left — or take the pitch if it is not hittable.',
        'Keep sacrificing. Crashers will still field a good bunt, so never change the play.',
        'Bunt toward the crashing third baseman as hard as you can',
        'Full swing from a squared-up stance, every pitch'
      ],
      answer: 0,
      explain: 'Slash is why a defence that crashes every time gets burned. It is a 13U+ read, and it is not a full swing. If the pitch is unhittable, take it. Corners who are in have to read swing versus bunt, not guess.',
      source: 'bunting'
    },
    {
      id: 'q1613',
      chapter: 'ch16',
      tier: 'select',
      topic: 'strategy',
      difficulty: 6,
      type: 'tf',
      prompt: 'At higher levels the sacrifice is used less than it used to be, even though it is still legal.',
      choices: ['True', 'False'],
      answer: 0,
      explain: 'Pitchers throw harder, infielders field bunts, and hitters do more damage on the swing. Giving up an out often costs more future runs than it creates, except in that late, close, zero-out window with a weaker bat and a better bat on deck.',
      source: 'offensive-strategy'
    },
    {
      id: 'q1614',
      chapter: 'ch16',
      tier: 'select',
      topic: 'hitting',
      difficulty: 5,
      type: 'mc',
      prompt: 'How does bunt instruction progress by age?',
      choices: [
        'Teach suicide squeeze at 9U so it is automatic by 12U',
        'Start with slash, then add square-around later',
        'Teach drag first; sacrifice is only for 15U',
        '9–10U: square-around only, bat level, pinch, "catch the ball with the bat," no placement yet. 11–12U: add pivot, then directional bunting, then drag. 13U+: safety squeeze first, suicide second, and only where leadoffs are legal.'
      ],
      answer: 3,
      explain: 'Tee-bunt first — odd feeling, honest grip. A fair, slowly rolling ball is the whole goal at 9–10U. Do not install squeeze or slash there. Count awareness belongs at 11–12U: take the bunt off at two strikes unless you say otherwise out loud.',
      source: 'bunting'
    },
    {
      id: 'q1615',
      chapter: 'ch16',
      tier: 'select',
      topic: 'strategy',
      difficulty: 9,
      type: 'mc',
      prompt: 'Why is a sacrifice often a poor trade at 15U select AND at Little League Major, for two different reasons?',
      choices: [
        'Bunting is illegal in both. The umpire will call the batter out for offering.',
        'At 15U, defences field bunts and hitters do more damage swinging, so the out often costs more than it buys. At LL Major, Rule 7.13 gives the runner no jump, so the lead-runner out is easier even though the bunt is legal.',
        'Because you never bunt with zero outs in any division',
        'Because bunts always pop up at both levels, so technique is impossible'
      ],
      answer: 1,
      explain: 'Same play, two different bills. Higher levels bunt less because the next swing is more likely to do damage than it used to be. LL Major bunts less (or should) because the runner cannot break until contact. Youth baseball still manufactures runs with the bunt where walks, errors, and wild pitches are common — but even then, a hard ground ball through a weak infield can beat a textbook sacrifice.',
      source: 'offensive-strategy'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
