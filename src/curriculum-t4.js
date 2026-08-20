/* ===================================================================
   Homerun Learn to Play — curriculum-t4.js
   Tier 4 (Select) chapters 13–16. Registers onto HRL_CURRICULUM.
   ES5-safe. Load after curriculum-data.js in the same process.
   Content sourced from youth-baseball-canada wiki concept pages.
   Organising idea: on every batted ball, all nine have a job —
   field the ball, cover a base, or back someone up. Nobody stands still.
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
    /* ch13 — Defensive Positioning                                    */
    /* -------------------------------------------------------------- */
    {
      id: 'ch13',
      tier: 'select',
      order: 13,
      title: 'Defensive Positioning',
      subtitle: 'Where to stand before the pitch, and why',
      minutes: 11,
      objectives: [
        'After this chapter you can name the default alignment and the assumption it makes.',
        'After this chapter you can choose infield-in, double-play depth, bunt defence, or no-doubles from the score, the inning, and the runners.',
        'After this chapter you can say what each of those alignments buys and what it gives up.',
        'After this chapter you can explain who covers second on a steal and how the middle infielders decide.',
        'After this chapter you can adjust a step for hitter tendency and for the count.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Standard is the default — and it assumes nothing special',
          body: [
            'Before the pitch, seven fielders (everyone but the battery) take a starting spot. Standard alignment is the default: regular infield depth, medium outfield depth, no one hugging a line, no one on the grass. It assumes no runner in scoring position that you must cut off at the plate, no bunt, no double-play chance worth crowding, and a hitter whose spray is unknown.',
            'First plays several steps behind the bag, near the line, unless a runner is on first and you are holding. Second and short sit a few steps behind the baseline, mirrored around the bag. Third is several steps inside the line, behind the baseline. Centre field plays deepest and shades a step to the pull side of a right-handed batter.',
            'Neither Baseball Canada nor Little League has adopted the MLB shift restriction. You may put any number of infielders on either side of second. That is a licence, not an order: shift only when you have a real pull tendency, and never at the cost of a covered second base or a cutoff man.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Standard alignment',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            labels: true,
            title: 'Standard defensive alignment',
            desc: 'A baseball diamond with all nine fielders at standard depth: infield a few steps behind the baseline, outfield at medium depth.'
          },
          caption: 'Standard. Balanced range. This is where you start every half-inning until the runners, the count, the score, or the hitter give you a reason to move.'
        },
        {
          type: 'prose',
          heading: 'Infield in, and double-play depth',
          body: [
            'Infield in is for one job: cut a ground ball and throw home before the runner on third scores. All four infielders move 3–5 steps onto the grass. You buy a play at the plate. You pay for it with holes — grounders that were outs at regular depth now find grass. Reserve it for a run that actually matters: tie game, late, or the run that ends it. Do not play in because a runner is on third in the second inning and you are up six. That run is not the game.',
            'With two outs and a runner on second, the runner scores on almost any base hit regardless of your depth. Play regular or a step back and take the out. Infield-in with two outs is a common wrong shout from a dugout that is reacting to the runner instead of the outs.',
            'Double-play depth is the in-between. Runner on first, fewer than two outs: short and second shorten so they can field and feed second before the runner arrives. Corners move less. You buy the turn. You give up some range to the lines. If the hitter is a dead pull and you also need the double play, shade — but keep the pivot covered.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Infield in',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'infield-in',
            runners: ['third'],
            labels: true,
            title: 'Infield in — runner on third',
            desc: 'A baseball diamond with all four infielders moved onto the infield grass, a runner on third, set to cut a ground ball and throw home.'
          },
          caption: 'Infield in. The four infielders are on the grass. The play is at the plate. Every hole behind them just got bigger. Use it when that run is the game.'
        },
        {
          type: 'diagram',
          heading: 'Double-play depth',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'dp-depth',
            runners: ['first'],
            labels: true,
            title: 'Double-play depth — runner on first',
            desc: 'A baseball diamond with the shortstop and second baseman shortened toward second for a double-play feed, runner on first.'
          },
          caption: 'Double-play depth. Short and second have come in and in toward the bag. Close enough to turn two; not as close as infield-in. Range to the line is the bill.'
        },
        {
          type: 'prose',
          heading: 'Corners in, no-doubles, and outfield depth',
          body: [
            'Corners in (and full bunt defence) is for a bunt you can see coming: runner on first, zero outs, tight score, a hitter who can lay one down. First and third charge as the pitcher delivers. Second covers first. Short covers second. The pitcher takes anything in the middle. The first call of “I got it!” decides who fields. The most common youth fault is first leaving the bag with nobody covering.',
            'No-doubles is a late-game, protect-the-lead look. Outfielders go deep and toward the lines. Corners pinch the lines. You concede the single. You take away the extra-base hit that ties or wins. Use it when one extra base beats you and a single does not.',
            'Outfield shallow takes away the sacrifice fly and the bloop with a runner on third and fewer than two outs, or against a weak contact bat. The risk is the ball over the head. Outfield deep is for known power, a small park, or a game state where a single is acceptable and a ball in the gap is not. Centre still plays deepest. Shade to pull as a step, not a migration.'
          ]
        },
        {
          type: 'diagram',
          heading: 'No-doubles',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'no-doubles',
            labels: true,
            title: 'No-doubles — deep and to the lines',
            desc: 'A baseball diamond with outfielders deep and toward the foul lines and corner infielders pinching the lines, conceding the single to prevent the extra-base hit.'
          },
          caption: 'No-doubles. Outfielders are deep and to the lines. Corners pinch. A single falls. A double should not. This is a lead you are protecting, not a rally you are starting.'
        },
        {
          type: 'compare',
          heading: 'What each alignment buys — and what it pays for',
          left: {
            title: 'What you gain',
            items: [
              'Standard — balanced range against an unknown hitter with nothing special on.',
              'Infield in — a real play at the plate on a ground ball with a runner on third.',
              'Double-play depth — time to field, feed second, and turn two with a runner on first.',
              'Corners in / bunt defence — a charged ball and a covered first and second.',
              'No-doubles — the extra-base hit taken away; the single conceded on purpose.',
              'Outfield shallow — the sac fly and the bloop; outfield deep — the ball in the gap.'
            ]
          },
          right: {
            title: 'What you give up',
            items: [
              'Standard — nothing specialised. A bunt, a double-play ball, or a sac fly is played from the wrong depth.',
              'Infield in — holes. Grounders that were outs at regular depth become hits, and some of those still score the run.',
              'Double-play depth — range to the lines. A pulled ball down the line is more likely a single.',
              'Bunt defence — the slash. Corners crash; the gap they leave is the play if they guess wrong.',
              'No-doubles — singles. You will give up a base hit you might have caught at standard depth.',
              'Shallow outfield — the ball over the head. Deep outfield — the single in front and a weaker throw home.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Who covers second, the hitter, and the count',
          body: [
            'On a steal, short and second must decide before the pitch who covers second. The common rule: right-handed batter, short covers (second holds the hole); left-handed batter, second covers (short holds the hole). Some teams use a mouth sign — open mouth second covers, closed mouth short covers — changed each pitch. The catcher can also signal it. Pick one system and run it. Do not decide while the ball is in the air.',
            'At Little League Major and below, Rule 7.13 means there is no leadoff, so the steal is a timed break as the pitch arrives. Coverage still matters. The habit is the point. At Baseball Canada championship levels and Little League Intermediate and up, leadoffs are live and the covering infielder must be moving on the first sign of a break.',
            'Hitter tendency is a 13U+ tool. Pull-side right-handed bat: short a step toward second, third a step toward the line, outfield a step toward left-centre. Opposite-field right-handed bat: second toward first, centre toward right-centre. Do not shift on a hunch. At 10U–12U, spray is noise; stay standard.',
            'Count is a step, not a new defence. Hitter’s count (2-0, 3-1): fastball is more likely, pull is more likely — a step toward pull. Pitcher’s count (0-2, 1-2): weaker contact and more chase — a step toward opposite field, outfield a shade shallower. The pre-pitch checklist, from about 12U on: outs, runners, count, score and inning, hitter. By 14U the players run it without a shout from the dugout.'
          ]
        },
        {
          type: 'terms',
          items: [
            'standard-alignment',
            'infield-in',
            'double-play-depth',
            'no-doubles',
            'bunt-defense',
            'corners-in',
            'of-shallow',
            'of-deep'
          ]
        },
        {
          type: 'interactive',
          heading: 'Spot the alignment',
          widget: 'spotTheAlignment',
          intro: 'Read the game state. Pick the alignment that matches the score, the inning, the outs, and the runners — not the alignment that sounds the most aggressive. Some of these are traps: the obvious shout from the dugout is the wrong one.',
          opts: {
            cases: [
              {
                id: 'empty-unknown',
                situation: 'First inning, 0–0. Nobody on. Unknown hitter. Zero outs.',
                options: ['standard', 'infield-in', 'dp-depth', 'no-doubles'],
                answer: 'standard',
                preview: true,
                explain: 'Nothing special is on. Standard is the default. Infield-in and no-doubles are specialised looks you have not earned yet.'
              },
              {
                id: 'r3-tie-last',
                situation: 'Last inning, tie game. Runner on third, one out. Average hitter.',
                options: ['standard', 'infield-in', 'dp-depth', 'of-deep'],
                answer: 'infield-in',
                preview: true,
                explain: 'The run at home is the game. Bring the infield in and take the play at the plate. You are buying that throw with range.'
              },
              {
                id: 'r3-up-big-early',
                situation: 'Second inning, you lead 7–1. Runner on third, one out. The dugout is yelling “infield in!”',
                options: ['infield-in', 'standard', 'no-doubles', 'corners-in'],
                answer: 'standard',
                preview: true,
                explain: 'The obvious call is infield-in. It is wrong. You can afford this run. Play regular depth and take the out. Infield-in here turns a grounder into a hit and still may not get the runner.'
              },
              {
                id: 'r1-zero-outs',
                situation: 'Third inning, one-run game. Runner on first, zero outs. Contact hitter, not a bunter.',
                options: ['standard', 'dp-depth', 'infield-in', 'bunt-defense'],
                answer: 'dp-depth',
                preview: true,
                explain: 'Runner on first, fewer than two outs, no bunt read. Shorten short and second for the turn. Infield-in is too far in; bunt defence is a guess you have not been given.'
              },
              {
                id: 'r2-two-outs',
                situation: 'Fifth inning, one-run game. Runner on second, two outs. Coach wants the infield in so the runner cannot score on a grounder.',
                options: ['infield-in', 'standard', 'dp-depth', 'of-shallow'],
                answer: 'standard',
                preview: true,
                explain: 'The obvious call is infield-in. It is wrong. With two outs the runner on second scores on almost any hit anyway. Play regular or a step back and get the out. Do not give away hits to prevent a run you cannot prevent.'
              },
              {
                id: 'protect-lead-power',
                situation: 'Last inning, you lead by one. Nobody on. The hitter is the opponent’s power bat in a small park.',
                options: ['standard', 'no-doubles', 'infield-in', 'of-shallow'],
                answer: 'no-doubles',
                preview: true,
                explain: 'A single does not beat you. A double or a ball in the gap does. Deep and to the lines. Concede the single on purpose.'
              },
              {
                id: 'bunt-likely',
                situation: 'Late, one-run game. Runner on first, zero outs. Eight-hole hitter who has already shown bunt twice this game.',
                options: ['dp-depth', 'bunt-defense', 'standard', 'infield-in'],
                answer: 'bunt-defense',
                preview: true,
                explain: 'The double-play look is the default with a runner on first and zero outs. Here the bunt is the real play. Corners charge, second covers first, short covers second. Call it before the pitch.'
              },
              {
                id: 'slap-r3-sac-fly',
                situation: 'Sixth inning, you lead by one. Runner on third, one out. The hitter is a slap-contact type who almost never drives a ball past the outfielders. The dugout wants the infield in.',
                options: ['infield-in', 'of-shallow', 'no-doubles', 'standard'],
                answer: 'of-shallow',
                preview: true,
                explain: 'Infield-in is the obvious shout. Against this bat the grounder through the infield is less likely than a medium fly. Bring the outfield in and take away the sac fly. Infield-in here gives up a hit you did not need to give up.'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'The shout that is wrong',
          body: [
            'Two outs, runner on second, one-run game, fifth inning. Someone in the dugout yells “infield in!” The infield jogs onto the grass.',
            'That shout is a reaction to the runner, not a read of the outs. With two outs the runner scores on a single whether you are in or back. Playing in turns a routine grounder into a hit and still does not keep the run off the board. Stay at regular depth. Get the out. The inning ends.'
          ]
        },
        {
          type: 'coachnote',
          heading: 'Install the pre-pitch checklist',
          body: [
            'From about 12U, cue the same five questions before every pitch until the players ask them without you: outs, runners, count, score and inning, hitter. Signal the alignment from the dugout or the third-base box at first. The goal by 14U is that the infield is already moving before you open your mouth.',
            'Walk through infield-in, double-play depth, and bunt defence in slow motion on a Monday. Do not introduce a first-and-third scheme and a five-man infield in the same week. One new look at a time. Youth baseball does not punish a legal shift. It does punish a shift that leaves second uncovered.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Standard alignment is the default. Move off it for a reason you can name: runners, outs, score, inning, or a real hitter tendency.',
            'Infield in buys a play at the plate and sells range. Use it when that run is the game, not whenever a runner is on third.',
            'Double-play depth shortens short and second. You buy the turn and give up the line.',
            'No-doubles: outfielders deep and to the lines. Concede the single. Take away the extra-base hit.',
            'Bunt defence: corners charge, second covers first, short covers second. Assign coverage before the pitch.',
            'Who covers second on a steal is a pre-pitch decision — batter-tendency rule or a mouth sign — not a race after the ball leaves the catcher’s hand.',
            'MLB’s shift restriction is not in Baseball Canada or Little League. Shift with evidence. Never leave the cutoff or second uncovered.',
            'Pre-pitch checklist: outs, runners, count, score and inning, hitter.'
          ]
        }
      ],
      quizIds: ['q1301', 'q1302', 'q1303', 'q1304', 'q1305', 'q1306', 'q1307', 'q1308'],
      prev: 'ch12',
      next: 'ch14'
    },

    /* -------------------------------------------------------------- */
    /* ch14 — Cutoffs, Relays & Backups                                */
    /* -------------------------------------------------------------- */
    {
      id: 'ch14',
      tier: 'select',
      order: 14,
      title: 'Cutoffs, Relays & Backups',
      subtitle: 'Ball, base, backup — nobody stands still',
      minutes: 14,
      objectives: [
        'After this chapter you can assign ball, base, or backup to all nine players on a given batted ball.',
        'After this chapter you can name the cutoff or relay by hit location — left, centre, right — and the first baseman’s job on a throw home.',
        'After this chapter you can set a cutoff in a straight line, two-thirds of the way to the outfielder, arms up.',
        'After this chapter you can name the backup jobs: pitcher at third and home, right field at first, outfielders behind each other.',
        'After this chapter you can say what happens when a cutoff is missed, and why the target position — not the outfielder — calls the throw.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Three jobs. Nine players. No spectators.',
          body: [
            'On every batted ball, all nine have a job. One player goes to the ball. Other players cover bases — including the cutoff and relay spots, which are designated intercepts on the throwing line. Everyone else backs someone up. Nobody stands still.',
            'That three-job language is how this chapter scores defence. Ball: the fielder of the batted ball. Base: covering a bag or occupying the cutoff/relay. Backup: behind a throw or behind a teammate. A cutoff is a base job in this system. You are covering a spot. You are not the player who first fields the ball.',
            'The big inning in youth baseball is almost never one great swing. It is a hit, then a throw with no cutoff, then a ball at the backstop, then two extra bases. The relay exists because a throw across 60–90 metres loses line and accuracy. Two shorter throws beat one long one. The cutoff exists so the catcher — the only fielder who sees the whole field — can redirect or kill a throw that is late or offline.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Ground ball to short — nobody on',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            ball: 'ss-hole',
            roles: {
              p: 'backup',
              c: 'backup',
              '1b': 'base',
              '2b': 'base',
              '3b': 'base',
              ss: 'ball',
              lf: 'backup',
              cf: 'backup',
              rf: 'backup'
            },
            covering: { first: '1b', second: '2b', third: '3b' },
            arrows: [{ from: 'ss', to: 'first', style: 'throw' }],
            title: 'Ball, base, backup on a grounder to short',
            desc: 'A baseball diamond with a ground ball in the shortstop hole. Shortstop is marked ball, first second and third are covering bases, pitcher catcher and the outfield are backing up, with a throw arrow from short to first.'
          },
          caption: 'Short fields. First, second, and third cover bags. With nobody on, the catcher trails the batter-runner and backs up the throw to first — that is why catcher is backup here, not home. Pitcher moves toward the first-base line. Right field backs up first. Centre backs up second. Left backs up third.'
        },
        {
          type: 'prose',
          heading: 'Who is the cut, who is the relay, who is the trailer',
          body: [
            'Two different jobs get called “cut” in a dugout. Separate them. The cutoff is the infielder who lines up between the outfielder and the target on a single — typically first or third, and first is the cut on throws home from centre or right. The relay is the middle infielder who goes out onto the grass on an extra-base hit — short on a ball to left or left-centre, second on a ball to right or right-centre. The trailer is the extra body behind the relay, usually first on a ball in the right-field gap, in case the first throw is off-line.',
            'Single to left, throw to second or third: short is the cutoff, in line from left field to the target; second covers second. Single to centre, throw to second: short or second is the cut by side; the other covers second. Single to right: second is the cut; short covers second. Extra-base to left, runner scoring from second: short is the primary relay in shallow left, in line to home; second covers second; third is the trail if a second runner is going to third. Extra-base to right, throw to third: second is the relay in shallow right-centre; short covers second; third stays at third; first trails the relay.',
            'Throws home on a single with a runner on third: first is the cutoff, in a straight line from the outfielder to the plate. Second covers first (first has left). Short covers second. Third stays at third. The pitcher backs up home. The catcher stands in front of the plate, sees the whole field, and calls the throw.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Single to left — cutoff to second',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            ball: 'down-the-line-left',
            roles: {
              p: 'backup',
              c: 'base',
              '1b': 'base',
              '2b': 'base',
              '3b': 'base',
              ss: 'base',
              lf: 'ball',
              cf: 'backup',
              rf: 'backup'
            },
            covering: { first: '1b', second: '2b', third: '3b', home: 'c' },
            arrows: [
              { from: 'lf', to: 'ss', style: 'throw' },
              { from: 'ss', to: 'second', style: 'cut' }
            ],
            title: 'Single to left — short is the cutoff',
            desc: 'A baseball diamond with a ball down the left-field line. Left field is marked ball, shortstop is the cutoff in line to second, second covers the bag, with throw arrows from left field to short and from short to second.'
          },
          caption: 'Left field has the ball. Short is the cutoff — a base job — in a straight line to second, arms up, “Hit me!” Second covers the bag. Pitcher backs up the throw target (second). Centre backs up left. Right, the far outfielder, backs up second. Catcher covers home and will call cut or let it go.'
        },
        {
          type: 'diagram',
          heading: 'Single to centre — first is the cut to home',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            ball: 'shallow-center',
            runners: ['third'],
            roles: {
              p: 'backup',
              c: 'base',
              '1b': 'base',
              '2b': 'base',
              '3b': 'base',
              ss: 'base',
              lf: 'backup',
              cf: 'ball',
              rf: 'backup'
            },
            covering: { first: '2b', second: 'ss', third: '3b', home: 'c' },
            arrows: [
              { from: 'cf', to: '1b', style: 'throw' },
              { from: '1b', to: 'home', style: 'cut' }
            ],
            title: 'Throw home — first is the cutoff',
            desc: 'A baseball diamond with a runner on third and a single to shallow centre. Centre field is marked ball, first base is the cutoff in line to home, second covers first, pitcher backs up home.'
          },
          caption: 'Runner on third, single to centre, play at the plate. First is the cutoff, in line from centre to home. Second covers first. Short covers second. Third stays at third. Pitcher is behind the catcher, backing up home. Left and right back up centre. Catcher calls “cut four” or “let it go.”'
        },
        {
          type: 'diagram',
          heading: 'Extra-base hit to right — relay and trailer',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            ball: 'right-center-gap',
            runners: ['first'],
            roles: {
              p: 'backup',
              c: 'base',
              '1b': 'backup',
              '2b': 'base',
              '3b': 'base',
              ss: 'base',
              lf: 'backup',
              cf: 'backup',
              rf: 'ball'
            },
            covering: { second: 'ss', third: '3b', home: 'c' },
            arrows: [
              { from: 'rf', to: '2b', style: 'throw' },
              { from: '2b', to: 'third', style: 'cut' }
            ],
            title: 'Gap to right — second relays, first trails',
            desc: 'A baseball diamond with a runner on first and a ball in the right-centre gap. Right field is marked ball, second base is the relay, first base trails the relay as backup, shortstop covers second, throw arrows from right field to second to third.'
          },
          caption: 'Extra-base hit to right, runner on first, throw to third. Second is the relay, well out on the grass, pre-turned to third. Short covers second. Third covers third. First trails the relay — backup, not a second cutoff — in case the outfielder’s throw is off-line. Pitcher backs up third. Centre backs up right. Left, the far outfielder, backs up second.'
        },
        {
          type: 'prose',
          heading: 'Line, arms up, and the catcher’s voice',
          body: [
            'The cutoff or relay stands in a straight line between the outfielder and the target, about two-thirds of the way to the outfielder — close enough to catch a line, not a lob. Too close to the bag and the outfielder has to arc it. Off the line and the outfielder throws around you and loses velocity. Both arms go up. Call “Hit me!” The outfielder throws at the glove, on a line, four-seam.',
            'Receive pre-turned to the throwing side. Do not square up, catch, then spin. A right-handed relay from centre to third catches already opened toward third so the catch becomes the throw. If the ball is so deep that one relay cannot cover it, double-relay: both middle infielders in line, the farther one to the nearer one, then home.',
            'The catcher directs. As the ball leaves the outfielder: “Cut two,” “Cut three,” “Cut four” (or “Cut home”), or “Let it go.” Silence means let it go to the base the outfielder is throwing to. If you hear nothing, do not freelance a cut. Cutting a throw that was going to get the runner is as costly as letting an offline throw sail.',
            'Backups are not optional. Pitcher backs up third and home on throws from the outfield — the base the throw is going to, standing behind it, not next to the catcher. Right field backs up first on every infield throw across the diamond. Centre backs up second on infield grounders and steal throws. Left backs up third. Outfielders back each other: the near one goes to the ball, the next one gets behind the fielder, the far one gets behind the throw-target base. When a cutoff is missed, the throw that was a single extra base becomes two, sometimes three. That is the big inning. The fix is the body that should have been in line, not a better arm.'
          ]
        },
        {
          type: 'example',
          heading: 'The cut that was not there',
          body: [
            'Single to left, runner going first to third. Shortstop jogs toward second instead of lining up between left field and third. Left field throws through. The ball skips, third lunges, and it goes to the fence. The batter takes second. The runner scores.',
            'The missed job was not the throw. It was the cutoff. Short should have been in line, arms up, ready to cut and hold the batter at first if the play at third was gone. Catcher should have had a voice. Pitcher should have been behind third. Three jobs, all empty, one ball at the fence.'
          ]
        },
        {
          type: 'terms',
          items: [
            'cutoff',
            'relay',
            'trailer',
            'backup',
            'ball-base-backup',
            'double-relay'
          ]
        },
        {
          type: 'interactive',
          heading: 'Assign the nine',
          widget: 'assignTheNine',
          intro: 'Every batted ball, nine jobs. Ball = the player fielding the batted ball. Base = covering a bag or occupying the cutoff/relay. Backup = behind a throw or a teammate. The cutoff is a base job in this system. Work from the situation — hit type, location, runners, outs — then assign all nine.',
          opts: {
            cases: [
              {
                id: 'gb-ss-empty',
                situation: {
                  hitType: 'ground',
                  location: 'shortstop',
                  runners: [],
                  outs: 0
                },
                prompt: 'Ground ball to shortstop. Nobody on. Zero outs.',
                correct: {
                  p: 'backup',
                  c: 'backup',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'ball',
                  lf: 'backup',
                  cf: 'backup',
                  rf: 'backup'
                },
                rationale: 'SS fields and throws to first. 1B/2B/3B cover bags. With nobody on, the catcher trails the batter-runner and backs up first. Pitcher toward the first-base line; RF backs first; CF second; LF third.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'ss-hole',
                    title: 'Ground ball to short — nobody on'
                  }
                }
              },
              {
                id: 'gb-ss-r1-dp',
                situation: {
                  hitType: 'ground',
                  location: 'shortstop',
                  runners: ['first'],
                  outs: 0
                },
                prompt: 'Ground ball to shortstop. Runner on first. Zero outs. You are turning two.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'ball',
                  lf: 'backup',
                  cf: 'backup',
                  rf: 'backup'
                },
                rationale: 'SS fields and feeds second. 2B is the pivot (base). 1B takes the throw at first. Catcher now covers home — there is a runner. Pitcher and RF back up first; CF backs second; LF backs third.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'dp-depth',
                    ball: 'ss-hole',
                    runners: ['first'],
                    title: 'Ground ball to short — runner on first'
                  }
                }
              },
              {
                id: 'gb-1b-pitcher-covers',
                situation: {
                  hitType: 'ground',
                  location: 'first base (wide)',
                  runners: [],
                  outs: 0
                },
                prompt: 'Ground ball wide of first. The first baseman is pulled off the bag. Nobody on. Zero outs.',
                correct: {
                  p: 'base',
                  c: 'backup',
                  '1b': 'ball',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'backup',
                  lf: 'backup',
                  cf: 'backup',
                  rf: 'backup'
                },
                rationale: 'Classic 3-1. 1B fields. Pitcher covers first (base). 2B covers second; 3B covers third. Short backs up second. Catcher, with nobody on, backs up the play at first. RF gets behind first.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'down-the-line-right',
                    title: 'Ground ball wide of first — pitcher covers'
                  }
                }
              },
              {
                id: 'gb-3b-r3-infield-in',
                situation: {
                  hitType: 'ground',
                  location: 'third base',
                  runners: ['third'],
                  outs: 0
                },
                prompt: 'Infield in. Ground ball to third. Runner on third. Zero outs. Look him back; throw home if he breaks.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'backup',
                  '3b': 'ball',
                  ss: 'base',
                  lf: 'backup',
                  cf: 'backup',
                  rf: 'backup'
                },
                rationale: '3B fields. Catcher is the play at home (base). 1B covers first; SS covers second. Pitcher backs up home. 2B is not the force at second — backs up first. LF is behind third / the throw lane; CF behind second; RF behind first.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'infield-in',
                    ball: 'down-the-line-left',
                    runners: ['third'],
                    title: 'Infield in — grounder to third, runner on third'
                  }
                }
              },
              {
                id: 'single-lf-empty',
                situation: {
                  hitType: 'single',
                  location: 'left field',
                  runners: [],
                  outs: 0
                },
                prompt: 'Single to left field. Nobody on. Zero outs. Throw goes to second.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'base',
                  lf: 'ball',
                  cf: 'backup',
                  rf: 'backup'
                },
                rationale: 'LF fields. SS is the cutoff (base) in line to second. 2B covers second; 1B first; 3B third; catcher home and directs. Pitcher backs up second. CF backs up LF. RF, the far outfielder, backs up second.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'down-the-line-left',
                    title: 'Single to left — nobody on'
                  }
                }
              },
              {
                id: 'single-cf-r3-home',
                situation: {
                  hitType: 'single',
                  location: 'centre field',
                  runners: ['third'],
                  outs: 1
                },
                prompt: 'Single to centre. Runner on third. One out. The play is at the plate.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'base',
                  lf: 'backup',
                  cf: 'ball',
                  rf: 'backup'
                },
                rationale: 'CF fields. 1B is the cutoff to home (base). 2B covers first because first has left; SS covers second; 3B stays at third; catcher covers home and calls cut or let it go. Pitcher backs up home. LF and RF back up centre.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'shallow-center',
                    runners: ['third'],
                    title: 'Single to centre — runner on third, throw home'
                  }
                }
              },
              {
                id: 'xbh-rf-r1',
                situation: {
                  hitType: 'extra-base',
                  location: 'right field',
                  runners: ['first'],
                  outs: 0
                },
                prompt: 'Extra-base hit to right. Runner on first. Zero outs. Throw is to third.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'backup',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'base',
                  lf: 'backup',
                  cf: 'backup',
                  rf: 'ball'
                },
                rationale: 'RF fields. 2B is the relay (base) in shallow right-centre, in line to third. SS covers second; 3B covers third; catcher home. 1B trails the relay (backup). Pitcher backs up third. CF backs up RF. LF, the far outfielder, backs up second.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'right-center-gap',
                    runners: ['first'],
                    title: 'Extra-base hit to right — relay to third'
                  }
                }
              },
              {
                id: 'line-cf-r1',
                situation: {
                  hitType: 'line',
                  location: 'centre field',
                  runners: ['first'],
                  outs: 0
                },
                prompt: 'Line drive to centre, caught. Runner on first. Zero outs. The play is a possible double-off at first.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'base',
                  lf: 'backup',
                  cf: 'ball',
                  rf: 'backup'
                },
                rationale: 'CF catches it. 2B is the cutoff (base) on a throw back to first; 1B covers first for the double-off; SS covers second; 3B third; catcher home. Pitcher backs up first. LF and RF back up centre. Freeze on the liner is the runner’s job; this is the defence if he did not.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'shallow-center',
                    runners: ['first'],
                    title: 'Line drive to centre — caught, runner on first'
                  }
                }
              },
              {
                id: 'gap-lc-r2',
                situation: {
                  hitType: 'extra-base',
                  location: 'left-centre gap',
                  runners: ['second'],
                  outs: 0
                },
                prompt: 'Ball in the left-centre gap. Runner on second. Zero outs. The lead runner is scoring; the relay is toward home.',
                correct: {
                  p: 'backup',
                  c: 'base',
                  '1b': 'base',
                  '2b': 'base',
                  '3b': 'base',
                  ss: 'base',
                  lf: 'backup',
                  cf: 'ball',
                  rf: 'backup'
                },
                rationale: 'CF fields in the gap. SS is the primary relay (base) in shallow left, in line to home. 2B covers second; 1B first; 3B third (trail to third if a second runner comes); catcher home and directs. Pitcher backs up home. LF backs up CF. RF, the far outfielder, backs up second.',
                diagram: {
                  svg: 'field',
                  opts: {
                    positions: true,
                    alignment: 'standard',
                    ball: 'left-center-gap',
                    runners: ['second'],
                    title: 'Gap to left-centre — runner on second, relay home'
                  }
                }
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'Install one scenario, then add the map',
          body: [
            'At 10–12U, teach one relay: single to centre, runner going to third. Walk it. Outfielder at the fence, relay in the grass, arms up, catcher with a voice. Do not introduce right-field and left-field looks in the same practice.',
            'At 13U+, add left and right, the double relay, and the first-baseman cut to home. Run it with a live catcher making the call. The failure mode is the relay man holding the ball because nobody spoke. Teach the catcher to talk before you teach a fancier alignment.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'On every batted ball: one player to the ball, others cover bases (including cutoff and relay), the rest back someone up. Nobody stands still.',
            'Cutoff (single, in line to the target) is usually first or third; first is the cut on throws home from centre or right. Relay (extra-base, out on the grass) is short to left/centre, second to right.',
            'Trailer: first behind the relay on a ball in the right-field gap.',
            'Set up in a straight line, about two-thirds of the way to the outfielder, arms up, pre-turned. “Hit me.”',
            'The catcher — or the fielder covering the target — calls cut two / cut three / cut home / let it go. Silence means let it go.',
            'Pitcher backs up third and home. Right field backs up first on infield throws. Outfielders back each other and the throw-target base.',
            'A missed cutoff turns one extra base into two or three. That is the big inning. The body in line is the fix, not a stronger arm.',
            'In the three-job widget, cutoff and relay count as base. You are covering a designated intercept, not fielding the batted ball.'
          ]
        }
      ],
      quizIds: ['q1401', 'q1402', 'q1403', 'q1404', 'q1405', 'q1406', 'q1407', 'q1408'],
      prev: 'ch13',
      next: 'ch15'
    },

    /* -------------------------------------------------------------- */
    /* ch15 — Baserunning IQ                                           */
    /* -------------------------------------------------------------- */
    {
      id: 'ch15',
      tier: 'select',
      order: 15,
      title: 'Baserunning IQ',
      subtitle: 'Leads, reads, steals, and first-and-third',
      minutes: 12,
      objectives: [
        'After this chapter you can tell a primary lead from a secondary lead, and which divisions allow either.',
        'After this chapter you can read a pitcher’s move as pitch, pickoff, or balk, and say what “steal on the pitcher” means.',
        'After this chapter you can freeze on a line drive, tag up on first contact, and change the read from first, second, and third.',
        'After this chapter you can describe first-and-third from both sides, including the Little League catcher fake-throw ban.',
        'After this chapter you can say when to pick up the base coach and what the windmill, the stop, and the slide signal mean.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Primary and secondary — only where leadoffs are legal',
          body: [
            'A primary lead is 2–3 shuffle steps off the bag before the pitcher commits, weight on the balls of the feet, close enough to dive back, far enough to pressure. Do not cross the feet. A secondary lead is two more walking steps as the pitcher delivers, finishing athletic, ready to break on a ball in the dirt. The secondary is what turns a steal from a flat-footed jump into a first step you already own.',
            'That pair exists only where leadoffs are legal: Baseball Canada championship play (13U and up, and 11U-A where OBR applies), and Little League Intermediate (50-70), Junior, and Senior. At Little League Major and below — Rule 7.13 — and at Baseball Canada 11U low tier, the runner holds the base until the pitch reaches the batter. There is no primary and no secondary. The skill is a timed break: coil on the back foot, contact with the bag, explode when the ball arrives.',
            'Getting back: cross-step with the back foot, dive or lunge to the back corner. Watch the pitcher’s lead foot (right-handers) or first movement (left-handers). A pickoff is a timing disruption first and an out second.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Leadoffs and stealing by division',
          intro: 'This is the most visible rule split in Canadian youth baseball. Teach the jump that is legal in the game you are in. Re-teach when a player changes pathway.',
          columns: ['Pathway / division', 'Leadoff', 'Steal', 'What the runner actually does'],
          rows: [
            ['Little League Tee Ball / Minor / Major (Rule 7.13)', 'No', 'Only as a timed break when the pitch reaches the batter', 'Hold the bag. Coil. Go on arrival, not on first move.'],
            ['Little League Intermediate (50-70) / Junior / Senior', 'Yes (OBR)', 'Yes', 'Primary, secondary, pickoff reads, steal on the pitcher.'],
            ['Baseball Canada 11U low tier', 'No (parallels 7.13)', 'No steal off a lead; hold until the pitch reaches the batter', 'Same timed-break skill as LL Major. Confirm the local 11U document.'],
            ['Baseball Canada 11U-A / 13U+ championship (OBR)', 'Yes', 'Yes, any time the ball is live', 'Full leads. Delayed steal and first-and-third menu are live.']
          ]
        },
        {
          type: 'diagram',
          heading: 'Primary and secondary off first',
          svg: 'basePaths',
          opts: {
            labels: true,
            leads: [
              { base: 'first', type: 'primary' },
              { base: 'first', type: 'secondary' }
            ],
            title: 'Leads off first — primary, then secondary',
            desc: 'A base-path diamond with a primary lead and a longer secondary lead marked off first base toward second.'
          },
          caption: 'Primary is the walking lead before the pitcher commits. Secondary adds two steps with the delivery. Both are illegal at Little League Major and below. There, the runner’s heel stays on the bag until the pitch arrives.'
        },
        {
          type: 'prose',
          heading: 'Steal on the pitcher, not the catcher',
          body: [
            'A stolen base is won or lost on the pitcher’s first move, not on the catcher’s arm. If the free foot of a right-hander goes toward home, it is a pitch — go. If it steps toward first, it is a pickoff — get back. A left-hander is harder: if the free foot crosses the 45-degree line toward the plate, the pitcher is committed to pitch. If the step is clearly to first, hold. You are reading commitment, not guessing.',
            'That is what “stealing on the pitcher” means. Time the hold. A pitcher who comes set and delivers on the same count every time is giving you the jump. Varying the hold — one second, then three — is how a pitcher takes it back. A slide-step shortens the catcher’s window; it also costs the pitcher velocity. You steal when the delivery is slow, not when you dislike the catcher.',
            'A delayed steal is a different read. After the pitch, take an exaggerated secondary and wait. If the catcher throws lazily back to the pitcher, or looks away, you break. It works when the defence is relaxed. It is an OBR/Baseball Canada tool. At Little League Major and below you cannot start that secondary until the pitch has arrived, so the delayed steal as a designed play is mostly gone.',
            'Balk reads matter because a balk is a free base. Fake to first while in contact with the rubber: balk. Fake to third (the old third-to-first move): balk since 2013. No complete stop from the stretch: balk. No step toward first on a pickoff: balk. Stepping back off the rubber first makes the pitcher an infielder — a fake to first after that is legal. Do not steal through a move you have not identified. If it is a balk, you advance anyway.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Pitcher’s move: go, hold, or balk',
          widget: 'stealRead',
          intro: 'You are a runner at first unless the case says otherwise. Read the move. Go means it is a pitch and you are stealing. Hold means pickoff or a legal disengage — get back. Balk means the move itself is illegal; you advance one base.',
          opts: {
            cases: [
              {
                id: 'rhp-to-home',
                description: 'Right-hander from the set, runner at first, one out, 1–1 count. Free (front) foot lifts and steps toward home plate.',
                move: 'rhp-home',
                answer: 'go',
                explain: 'Free foot toward home is a pitch. That is the steal jump. You are stealing on the pitcher.'
              },
              {
                id: 'rhp-to-first',
                description: 'Right-hander from the set, runner at first. Free foot lifts and steps clearly toward first. The move is continuous.',
                move: 'rhp-pickoff-first',
                answer: 'hold',
                explain: 'A legal step toward first is a pickoff. Cross-step back. Do not break for second on a move to the bag.'
              },
              {
                id: 'rhp-fake-first-on-rubber',
                description: 'Right-hander in contact with the rubber, runner at first. He fakes a throw to first without throwing, then looks to the plate.',
                move: 'rhp-fake-first-on-rubber',
                answer: 'balk',
                explain: 'A feint to first while in contact with the rubber is a balk. You advance. You do not have to steal it.'
              },
              {
                id: 'step-off-then-fake',
                description: 'Right-hander, runner at first. Pivot foot steps back off the rubber. Then he fakes a throw to first.',
                move: 'step-off-fake-first',
                answer: 'hold',
                explain: 'Once the pitcher disengages, he is an infielder. A fake to first is legal. Get back. This is the safe way pitchers avoid a balk.'
              },
              {
                id: 'lhp-crosses-45',
                description: 'Left-hander from the set, runner at first. Free foot lifts and crosses the 45-degree line toward the plate.',
                move: 'lhp-crosses-45',
                answer: 'go',
                explain: 'Past that line the left-hander is committed to pitch. Failing to deliver would be a balk. You treat it as a pitch and go.'
              },
              {
                id: 'lhp-step-first',
                description: 'Left-hander from the set, runner at first. Free foot lifts and steps clearly toward first, then he throws to the bag.',
                move: 'lhp-step-first',
                answer: 'hold',
                explain: 'A legal step toward first is a pickoff, even from a left-hander. The deception is the pause, not a licence to run through the move.'
              },
              {
                id: 'fake-to-third',
                description: 'Right-hander in contact with the rubber, runner at first and third. He fakes a throw to third, then spins to first (the old third-to-first move).',
                move: 'fake-to-third',
                answer: 'balk',
                explain: 'A fake to third while in contact with the rubber is a balk (2013 change). The third-to-first move is dead. Both runners advance.'
              },
              {
                id: 'no-stop',
                description: 'Right-hander from the stretch, runner at first. Hands come together and he delivers in one motion — no complete stop.',
                move: 'no-stop',
                answer: 'balk',
                explain: 'Failure to come set is a balk. All runners advance one base. Do not guess a steal on a move you have not identified; this one is already illegal.'
              }
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Reads off the bat — freeze, then go or tag',
          body: [
            'On a fly ball, freeze first. Then read depth. If it will be caught, get back and tag. If it will drop, go. If you cannot tell, hold partway. Breaking on contact, seeing a catch, and failing to retouch is the rally-killer. The tag-up itself is first contact of the glove, not a secure catch. If the fielder bobbles after first touch, you are already legal to go.',
            'From third: any fly beyond the infield grass is a possible tag. Deep fly — almost always go; pick up the third-base coach. Medium — you and the coach read arm and depth together. Shallow infield fly — stay. When in doubt at third, go. Being caught between third and home is worse than a bang-bang play at the plate.',
            'From second: deep fly to left-centre or centre, fielder’s back to the infield — go. Deep fly to right, throw across the diamond — often go. Shallow fly to right, throw in a line to third — hold. From first: unless the fly is very deep and the fielder is running away, hold. A shallow fly from first is a double play if you go early.',
            'Line drive with a runner on first and fewer than two outs: hold until the ball hits the grass. Hard and low — hold. Soft and high — read and go. The cue is “back, back” from the coach. Two outs, everything changes: run on contact. If the batter is out the inning is over anyway; if it falls, every runner needed the extra step.'
          ]
        },
        {
          type: 'diagram',
          heading: 'First-and-third — the trail runner’s steal',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'standard',
            runners: ['first', 'third'],
            covering: { second: 'ss', home: 'c' },
            arrows: [
              { from: 'c', to: 'ss', style: 'throw' },
              { from: 'third', to: 'home', style: 'steal' }
            ],
            batter: 'R',
            title: 'First and third — throw through, lead runner reads',
            desc: 'A baseball diamond with runners on first and third. A throw arrow from the catcher toward shortstop covering second, and a steal arrow from third toward home.'
          },
          caption: 'The trail runner breaks for second. If the catcher throws through, the lead runner reads the ball leaving the hand and goes home. If the catcher holds, you have second and third and no run. That trade is the whole play. Pre-decide who covers second before the pitch.'
        },
        {
          type: 'compare',
          heading: 'First-and-third: what the offence wants, what the defence can do',
          left: {
            title: 'Offence is trying to create',
            items: [
              'Straight steal of second — trail runner goes on the pitch; lead runner reads the catcher’s throw and scores if it leaves the hand.',
              'Double steal — both break together. Works against a slow release. Needs a sign both runners acknowledge.',
              'Delayed steal — exaggerated secondary after the pitch draws a throw; lead runner reads it. OBR/BC tool; largely gone at LL Major and below.',
              'Steal of home — high-risk, slow windup, alert lead runner. Rare and earned.',
              'Hold — wait for a wild pitch, passed ball, or a hit. Correct when the defence is disciplined or the run is too expensive to gamble.',
              'At LL Major and below: the live play is steal second on the pitch and read the throw. Wild pitch and passed ball do more scoring than designed delays.'
            ]
          },
          right: {
            title: 'Defence’s options',
            items: [
              'Hold the ball — concede second, keep the run off the board. Right when that run ties or wins.',
              'Throw through to second — pre-assigned cover (short or second). Fielder must be ready to return home if the lead runner breaks.',
              'Cut the throw — middle infielder intercepts early and looks the lead runner back, or throws home. Needs a pre-pitch signal.',
              'Pitcher steps off, fakes toward third, throws to first — legal in OBR if the pitcher has disengaged. Effective when the trail runner is leaning.',
              'Pitch-out — standing catcher, better throwing lane, used when you expect the double steal.',
              'Little League: the catcher may not fake a throw. If the motion starts, the ball must go. The LL-legal look-back is catcher to pitcher, pitcher bluffs to third. Fake-to-third from the catcher is illegal.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'When to pick up the coach',
          body: [
            'Two base coaches, one at first, one at third, in the box. They may wave, shout, and point. They may not touch you during live play — that is coach interference and you are out. The exception is an injured runner.',
            'First-base coach owns the decision at first: round or hold, go on a passed ball, two-base award on an overthrow. Once you commit past first, third-base coach has the rest of the diamond. Do not take a windmill from first and a stop from third at the same time — protocol is third owns it once you are on your way to second.',
            'Signals at third: windmill is go, both arms out is hold, point at the bag is get back, flat hand down is slide. The coach should commit early. “Go” then “back” puts you in the rundown. You pick the coach up before the ball is caught, not as you hit the dirt. On a tag from third, do not watch the outfielder — the coach has that read. Your job is first contact, then a straight line home.'
          ]
        },
        {
          type: 'example',
          heading: 'The liner that ends the inning',
          body: [
            'Runner on first, one out. Hard line drive at the second baseman. The runner breaks on contact, sees the catch, and cannot get back. 4-3 double play. Inning over.',
            'The read was available in the first step. Hard and low: hold. The first-base coach’s job on that ball is “back, back,” loud, before the runner’s third stride. Freeze is not passive. It is the skill that keeps a rally alive.'
          ]
        },
        {
          type: 'terms',
          items: [
            'primary-lead',
            'secondary-lead',
            'delayed-steal',
            'tag-up',
            'first-and-third',
            'balk',
            'coach-interference'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Primary lead: 2–3 shuffles before the pitcher commits. Secondary: two walking steps with the delivery. Both require a leadoff rule.',
            'Little League Major and below (Rule 7.13) and BC 11U low tier: no leadoff. Timed break as the pitch reaches the batter. Intermediate / Junior / Senior and BC 13U+: full OBR leads.',
            'Steal on the pitcher, not the catcher. Right-hander: free foot to home is a pitch. Left-hander: across the 45-degree line is a pitch.',
            'Fake to first on the rubber is a balk. Fake to third on the rubber is a balk. No stop from the stretch is a balk. Step off first, then fake, is legal.',
            'Fly ball: freeze, then tag or go. Tag on first contact. Line drive with a runner on first: hold until it hits grass. Two outs: run on contact.',
            'First-and-third: offence wants the catcher to throw; defence may hold, throw through, or cut. LL catchers may not fake a throw.',
            'Pick up the third-base coach early. Windmill go, arms out hold, point get back, flat hand slide. Coaches do not touch runners.'
          ]
        }
      ],
      quizIds: ['q1501', 'q1502', 'q1503', 'q1504', 'q1505', 'q1506', 'q1507', 'q1508'],
      prev: 'ch14',
      next: 'ch16'
    },

    /* -------------------------------------------------------------- */
    /* ch16 — Bunting & Small Ball                                     */
    /* -------------------------------------------------------------- */
    {
      id: 'ch16',
      tier: 'select',
      order: 16,
      title: 'Bunting & Small Ball',
      subtitle: 'Moving the runner, and when it is worth an out',
      minutes: 11,
      objectives: [
        'After this chapter you can describe square versus pivot, the pinching grip, bat level, and why you bunt only strikes.',
        'After this chapter you can name sacrifice, drag, push, safety squeeze, suicide squeeze, and slash by intent.',
        'After this chapter you can assign bunt defence — who charges, who covers — and describe the wheel play.',
        'After this chapter you can decide whether a sacrifice is worth the out given score, inning, outs, and the hitter on deck.',
        'After this chapter you can say why higher levels bunt less, and where the no-leadoff rule makes a sacrifice a poor trade.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Catch the ball with the bat',
          body: [
            'A bunt is not a short swing. You offer the bat and let the ball die. Square-around: as the pitcher starts, both feet pivot so you face the mound. Pivot: only the front foot opens; the back foot stays, so you can still pull back on a ball. Square is the teaching method at 9–10U. Pivot is the 11–12U option for a player who can still take a pitch.',
            'Top hand slides to the label. Pinch: thumb and index press from behind and below, fingers bent, not wrapped around the barrel. Bat is level at the top of the zone. Anything above the bat is a ball — do not chase it. Anything at or below can be bunted. An upward barrel pops the ball up. Give with the arms. Do not push. The cue is “catch the ball with the bat.”',
            'Bunt only strikes. A ball is a ball; take it. Two-strike bunts are a decision, not a default: a foul with two strikes is a strikeout. Angle the barrel to the line you want. A right-hander’s sacrifice down the third-base line makes third charge and lengthens the throw to first.'
          ]
        },
        {
          type: 'steps',
          heading: 'Sacrifice bunt, in order',
          items: [
            {
              title: 'Pivot or square',
              body: 'Square both feet to the pitcher, or pivot the front foot only. Be set before the ball is halfway.'
            },
            {
              title: 'Pinch and level',
              body: 'Top hand to the label, fingers behind the bat. Barrel at the top of the zone, parallel to the ground.'
            },
            {
              title: 'See strike, then give',
              body: 'If it is above the bat, pull back. If it is a strike, absorb. The ball should roll, not bounce.'
            },
            {
              title: 'Angle, then run',
              body: 'Barrel toward the line you want. Drop the bat. Get down the line. You have already agreed to be out if the defence fields it clean.'
            }
          ]
        },
        {
          type: 'prose',
          heading: 'Five bunts, five jobs',
          body: [
            'Sacrifice: give the out, take the base. Runner on first, zero outs, close game, a hitter behind you who can drive the run in. The bunt is successful if the runner moves, even if you are out. Do not bunt when you are down three or more — the out is too expensive when you need a crooked number.',
            'Drag: bunt for a hit. Show it late. Left-handed drag is the dangerous one — you are already moving toward first. Aim down the first-base line if first is holding, or push toward the second-base hole. Right-handed drag steps the front foot toward first as the pitch is released.',
            'Push: past the pitcher, toward second. You are not killing it on the third-base line; you are beating a charging third or a pitcher who is crashing and leaving the right side open. Useful with a runner on first and the corners in.',
            'Squeeze: runner on third, leadoffs legal. Safety squeeze: the runner breaks after seeing contact, and can retreat if you miss. Suicide squeeze: the runner breaks on the pitcher’s motion; you must bunt. Miss it and the runner is out at the plate. At Little League Major and below the runner cannot leave until the pitch arrives, so the squeeze timing advantage is gone.',
            'Slash (fake-bunt, swing): show sacrifice until the corners crash, pull the bat back, take a compact swing into the hole they left. Not a full swing. If the pitch is unhittable, take it. This is a 13U+ read, and it is why a defence that crashes every time gets burned.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Bunt defence — runner on first',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'bunt-defense',
            ball: 'in-front-of-plate',
            runners: ['first'],
            roles: {
              p: 'backup',
              c: 'base',
              '1b': 'backup',
              '2b': 'base',
              '3b': 'ball',
              ss: 'base',
              lf: 'backup',
              cf: 'backup',
              rf: 'backup'
            },
            covering: { first: '2b', second: 'ss', home: 'c' },
            arrows: [{ from: '3b', to: 'first', style: 'throw' }],
            title: 'Basic bunt defence — corners charge',
            desc: 'A baseball diamond in bunt-defence alignment with a runner on first and a bunt in front of the plate. Third is fielding, second covers first, short covers second, catcher covers home.'
          },
          caption: 'Basic coverage, runner on first. Corners charge. In this picture third fields the bunt (ball). Second covers first. Short covers second. Catcher covers home and can call the base. Pitcher is responsible for the middle; if third has it, the pitcher is a backup / traffic cop. Centre backs up second, which is the bag that can get lonely. First call of “I got it!” owns the ball.'
        },
        {
          type: 'diagram',
          heading: 'Wheel play — runner on second',
          svg: 'field',
          opts: {
            preset: 'major-ll',
            positions: true,
            alignment: 'bunt-defense',
            ball: 'in-front-of-plate',
            runners: ['second'],
            roles: {
              p: 'backup',
              c: 'base',
              '1b': 'base',
              '2b': 'base',
              '3b': 'ball',
              ss: 'backup',
              lf: 'backup',
              cf: 'backup',
              rf: 'backup'
            },
            covering: { third: '2b', first: '1b', home: 'c' },
            arrows: [{ from: '3b', to: 'third', style: 'throw' }],
            title: 'Wheel — second covers third',
            desc: 'A baseball diamond in bunt-defence alignment with a runner on second. Shortstop has charged toward the third-base line, second covers third, first covers first, third fields the bunt.'
          },
          caption: 'Wheel, runner on second, the job is to stop the lead runner at third. Short charges toward the third-base line with third. Second wheels over to cover third. First stays to cover first. If the play at third is there, take it; if not, throw to first. Introduce the wheel at 13U+. At 11–12U, run basic coverage only.'
        },
        {
          type: 'prose',
          heading: 'Who charges, who covers, who talks',
          body: [
            'Most common look with a runner on first: pitcher and third charge; first may hold the runner or charge by plan; second covers first; short covers second. The pitcher, who sees the whole field, calls “first!” or “second!” The fault that scores runs is first charging with nobody covering the bag. Assign it before the pitch, every bunt-likely count.',
            'Wheel is the rotation when the runner is on second and you will not give up third. Short and third attack the third-base line; second covers third; first covers first. Centre must back up second — the wheel leaves it open. One fielder takes the ball. Everyone else covers a base. Call it out.',
            'Slash is the offensive answer to a defence that crashes on every show of bunt. If your corners are in, they have to read swing versus bunt, not guess. A fake that pulls them in and a ball through the hole they left is the cost of over-committing.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Small ball — make the call',
          widget: 'makeTheCall',
          intro: 'Score, inning, outs, and the hitter on deck decide whether an out is a trade or a gift. Pick the call. Some of these are legal and still wrong.',
          opts: {
            mode: 'small-ball',
            cases: [
              {
                id: 'sac-late-eight-hole',
                situation: 'Last inning, tie game. Runner on first, zero outs. Eight-hole hitter at the plate; your three-hole is on deck.',
                prompt: 'Last inning, tie game. Runner on first, zero outs. Eight-hole hitter at the plate; your three-hole is on deck.',
                choices: [
                  'Swing away. Never give up an out.',
                  'Sacrifice. Move the runner; let the three-hole drive him in.',
                  'Suicide squeeze. The runner at first should break for home.'
                ],
                answer: 1,
                explain: 'This is the textbook sacrifice: one run is the game, zero outs, a weaker bat, a better bat on deck. You are buying second base with an out you can afford.'
              },
              {
                id: 'down-four-three-hole',
                situation: 'Fourth inning, you trail 5–1. Runner on first, zero outs. Your three-hole hitter is up.',
                prompt: 'Fourth inning, you trail 5–1. Runner on first, zero outs. Your three-hole hitter is up.',
                choices: [
                  'Sacrifice. Always bunt with a runner on first and zero outs.',
                  'Swing away. You need more than one run; do not hand them an out with a dangerous bat.',
                  'Issue a take sign and hope for a walk, then bunt the next hitter no matter who it is.'
                ],
                answer: 1,
                explain: 'Do not bunt when you are down by three or more. The sacrifice out is too costly when you need a big inning. A strong hitter swinging is the higher-percentage path to a crooked number.'
              },
              {
                id: 'two-strikes',
                situation: 'Runner on first, zero outs, close game. The bunt is on. The count goes 1–2.',
                prompt: 'Runner on first, zero outs, close game. The bunt is on. The count goes 1–2.',
                choices: [
                  'Keep the bunt on. A foul is just another strike you already have.',
                  'Take the bunt off. A foul bunt with two strikes is a strikeout.',
                  'Switch to a suicide squeeze so contact is guaranteed.'
                ],
                answer: 1,
                explain: 'A bunt fouled off with two strikes is a strikeout. Two-strike bunts are a deliberate decision, not a leftover sign. Take it off unless you have a specialist you trust.'
              },
              {
                id: 'll-major-no-lead',
                situation: 'Little League Major. Runner on first, zero outs, one-run game. Coach wants a sacrifice.',
                prompt: 'Little League Major. Runner on first, zero outs, one-run game. Coach wants a sacrifice.',
                choices: [
                  'Bunt. The sacrifice works the same in every division.',
                  'Be slow to bunt. Rule 7.13 means the runner cannot break until contact, so the defence throws out the lead runner more easily. Put the ball in play or wait for a walk.',
                  'Squeeze. The runner at first can leave when the pitcher starts.'
                ],
                answer: 1,
                explain: 'At LL Major and below the runner holds until the pitch reaches the batter. A sacrifice that is a fair trade with a walking lead is a poor trade without one. The fielder has a shorter throw; the runner has no jump.',
                rule: 'LL Rule 7.13',
                division: 'Little League Major and below'
              },
              {
                id: 'safety-or-suicide',
                situation: 'Baseball Canada 13U. Runner on third, one out, late, you need one run. Leadoffs are legal. Your batter can bunt.',
                prompt: 'Baseball Canada 13U. Runner on third, one out, late, you need one run. Leadoffs are legal. Your batter can bunt.',
                choices: [
                  'Suicide squeeze as the first option. The runner breaks on first movement every time.',
                  'Safety squeeze. Runner breaks after seeing contact, and can retreat if the batter misses.',
                  'Do not squeeze at 13U. Wait for a fly ball.'
                ],
                answer: 1,
                explain: 'Introduce the safety squeeze first. Suicide is a 13U+ weapon once the batter can bunt anything near the zone and the runner will not leave on a ball. Safety lets you miss without giving up the runner.',
                division: 'Baseball Canada 13U+ (OBR leadoffs)'
              },
              {
                id: 'slash-corners-in',
                situation: 'Corners are crashing every bunt show. Runner on first, zero outs. Your batter can handle the bat.',
                prompt: 'Corners are crashing every bunt show. Runner on first, zero outs. Your batter can handle the bat.',
                choices: [
                  'Keep sacrificing. Crashers will still field a good bunt.',
                  'Show bunt, pull back, slash a compact swing into the hole they left — or take the pitch if it is not hittable.',
                  'Bunt toward the crashing third baseman so they have to make a play on the run.'
                ],
                answer: 1,
                explain: 'The slash is the answer to a defence that sells out. Hold the show until they commit, then a compact swing — not a full one — into the gap. If the pitch is unhittable, take it.'
              },
              {
                id: 'wheel-who-covers-third',
                situation: 'Runner on second, zero outs, bunt is on. You call wheel. Who covers third?',
                prompt: 'Runner on second, zero outs, bunt is on. You call wheel. Who covers third?',
                choices: [
                  'The third baseman stays. Charging is only for first.',
                  'The second baseman wheels to third. Short and third attack the bunt on the third-base line. First covers first.',
                  'The catcher sprints to third. Everyone else charges the ball.'
                ],
                answer: 1,
                explain: 'Wheel: SS charges toward the third-base line, 3B charges the bunt, 2B covers third, 1B covers first. The job is to stop the lead runner. Centre must back up second — the wheel leaves it open.'
              },
              {
                id: 'higher-level-empty',
                situation: '15U select, first inning, 0–0, nobody on, your three-hole hitter is up. Someone wants a drag bunt to “set the tone.”',
                prompt: '15U select, first inning, 0–0, nobody on, your three-hole hitter is up. Someone wants a drag bunt to “set the tone.”',
                choices: [
                  'Drag. Small ball always puts pressure on.',
                  'Let the three-hole hit. At this level a sacrifice or a novelty bunt with your best bat, nobody on, early, gives away a chance at extra bases for a play the defence will field.',
                  'Slash regardless of the defence. It is always free.'
                ],
                answer: 1,
                explain: 'Higher levels bunt less because defences field bunts, hitters do more damage swinging, and an out early in a scoreless inning is a poor trade. Drag is a weapon for a fast lefty against a pulled-in corner, not a tone-setter for your best bat with the bases empty.'
              }
            ]
          }
        },
        {
          type: 'compare',
          heading: 'Same inning, two calls — last inning, tie, runner on first, zero outs, eight-hole up, three-hole on deck',
          left: {
            title: 'Sacrifice',
            items: [
              'You need one run. Zero outs. The eight-hole is not your RBI bat.',
              'A fair bunt moves the runner. Even a misplayed bunt often does.',
              'The three-hole now hits with a runner in scoring position and still nobody out — or one out and a chance at a fly ball.',
              'You have agreed to make an out. That is the whole trade. It is worth it here.',
              'At LL Major, discount this trade: the runner has no jump, and the lead-runner out at second is live.'
            ]
          },
          right: {
            title: 'Swing away',
            items: [
              'If this eight-hole can drive a ball, an extra-base hit scores the run without the out.',
              'A strikeout or a double-play ball is the failure mode of swinging; a pop-up bunt is the failure mode of bunting.',
              'If the next hitter is not actually better, you spent an out to give the same quality of at-bat to someone else.',
              'Down three, early, or with your best hitter at the plate, this column wins. That is not this situation.',
              'At 14U+ the league-wide trend is this column more often — because the next swing is more likely to do damage than it used to be.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'When an out is worth it — and why the bunt is rarer now',
          body: [
            'The sacrifice is a trade: one out for one base. It is worth it when one run is the game (late, close), when you have zero outs, and when the hitter at the plate is worse at driving a run in than the hitter on deck. It is not worth it when you need multiple runs, when there are already two outs, or when the bat at the plate is the reason you scored all week.',
            'At higher levels the sacrifice is used less than it used to be. Pitchers throw harder, infielders field bunts, and hitters do more damage on the swing. Giving up an out often costs more future runs than it creates, except in that late, close, zero-out window. Youth baseball still manufactures runs with the bunt because walks, errors, and wild pitches are common — but even then, a hard ground ball through a weak infield can beat a textbook sacrifice.',
            'Two outs, run on contact, no bunt. Bases loaded, one out: avoid the double play; a push toward the right side can score a run without a 5-4-3. Down by three or more: put the ball in the air or on a line. The sign is not a personality. It is math you can explain in one sentence.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'When the sacrifice actually works',
          intro: 'Bunting is legal in both pathways above Tee Ball. The no-leadoff rule is what changes the value of the out, not a ban on the play.',
          columns: ['Division / level', 'Leadoffs', 'Sacrifice as a tactic'],
          rows: [
            ['LL Tee Ball / Minor / Major', 'No', 'Legal, but a poor trade: the runner cannot break until contact, so the lead-runner out is easier.'],
            ['LL Intermediate / Junior / Senior', 'Yes (OBR)', 'Full. Walking lead makes the sacrifice a real trade.'],
            ['Baseball Canada 11U low tier', 'No', 'Same limit as LL Major. Confirm the local 11U reference rules.'],
            ['Baseball Canada championship 13U+', 'Yes (OBR)', 'Full, including safety and suicide squeeze. Still do not bunt when you need a big inning.']
          ]
        },
        {
          type: 'coachnote',
          heading: 'Teaching the bunt to younger players',
          body: [
            'Start at 9–10U with square-around only. Bat level at the top of the zone, pinching grip, “catch the ball with the bat.” Tee-bunt first — odd feeling, honest grip. Do not teach placement yet. A fair, slowly rolling ball is the whole goal. Do not install squeeze. Do not install slash.',
            'At 11–12U add pivot, then directional bunting, then drag for the fast ones. Situational reps: runner on first, one out, live pitcher. Count awareness: take the bunt off at two strikes unless you say otherwise out loud. At 13U+, safety squeeze first, suicide second, and only where leadoffs are legal. A missed suicide at 11U is a play you taught too early, not a player who failed you.'
          ]
        },
        {
          type: 'terms',
          items: [
            'sacrifice-bunt',
            'drag-bunt',
            'push-bunt',
            'safety-squeeze',
            'suicide-squeeze',
            'slash-bunt',
            'wheel-play'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Square or pivot; top hand pinches behind the barrel; bat level at the top of the zone; catch the ball with the bat; bunt only strikes.',
            'Sacrifice gives the out for the base. Drag bunts for a hit, especially from the left side. Push goes past the pitcher toward second. Safety squeeze breaks on contact; suicide breaks on the motion.',
            'Slash: show bunt, pull back, compact swing into the hole the corners just left.',
            'Basic bunt defence, runner on first: corners charge, second covers first, short covers second, pitcher takes the middle. Wheel, runner on second: short and third attack, second covers third.',
            'A sacrifice is worth the out late, close, zero outs, weaker bat, better bat on deck. It is not worth it down three, with two outs, or with your best hitter up.',
            'Higher levels bunt less: better defence, more damage per swing, an out that often costs more than it buys.',
            'Little League Major and below: legal to bunt, poor to sacrifice, because Rule 7.13 gives the runner no jump. Squeeze is unexecutable there.',
            'A foul bunt with two strikes is a strikeout. Take the sign off.'
          ]
        }
      ],
      quizIds: ['q1601', 'q1602', 'q1603', 'q1604', 'q1605', 'q1606', 'q1607', 'q1608'],
      prev: 'ch15',
      next: 'ch17'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
