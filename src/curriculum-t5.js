/* ===================================================================
   Homerun Learn to Play — curriculum-t5.js
   Tier 5 (Elite) chapters 17–20. Registers onto HRL_CURRICULUM.
   ES5-safe. Load after curriculum-data.js in the same process.
   Content sourced from youth-baseball-canada wiki concept pages.
   This is the rules-accuracy tier: every rule traces to a named page.
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
    /* ch17 — The Tricky Rules                                         */
    /* -------------------------------------------------------------- */
    {
      id: 'ch17',
      tier: 'elite',
      order: 17,
      title: 'The Tricky Rules',
      subtitle: 'Infield fly, dropped third strike, balks, interference',
      minutes: 14,
      objectives: [
        'After this chapter you can list all four infield-fly trigger conditions and state what the call does to the batter and to the runners.',
        'After this chapter you can say when a batter may run on an uncaught third strike, and the first-base-occupied, fewer-than-two-outs exception.',
        'After this chapter you can name the common balk actions, the penalty, and which youth divisions do not enforce balks.',
        'After this chapter you can distinguish interference from obstruction and name the typical remedy for each.',
        'After this chapter you can say which of these rules apply in Little League Rookie/Minor versus Major, and in Baseball Canada 11U versus 13U championships.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Four rules that decide games',
          body: [
            'These four rules start arguments because each one looks like something else. An infield fly looks like a pop-up that should be caught. A dropped third strike looks like a strikeout. A balk looks like a pitcher doing pitcher things. Interference and obstruction look like a collision.',
            'Each rule is a list of conditions, not a vibe. If any required condition is missing, the rule does not fire. If all of them are present, it fires even when the play feels unfair to the side that wanted a different result.',
            'Read the conditions as conditions. Then read what the rule does not cover. The misconceptions are as important as the rules, because that is where protests come from.'
          ]
        },
        {
          type: 'prose',
          heading: 'Infield fly — all four, together',
          body: [
            'An infield fly is declared when all four of the following are true at the same time. One missing condition means there is no infield fly.',
            'One: it is a fair fly ball — not a line drive, not a bunt. Two: an infielder could catch the ball with ordinary effort. The ball need not land in the infield; geography of the catch does not decide it. Three: runners are on first and second, or the bases are loaded — a force is in effect on at least two bases. Four: there are fewer than two outs.',
            'When those four are met, the umpire calls “Infield Fly” immediately, or “Infield Fly, if Fair” for a ball near a foul line. The batter is out the instant the declaration is made, whether or not the fielder catches the ball.',
            'The rule exists to stop a deliberate drop into a double play or triple play on forced runners. Once the batter is out, the force is gone. Dropping it on purpose after the call creates chaos and buys nothing.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The infield-fly picture',
          svg: 'field',
          opts: {
            preset: 'full',
            labels: true,
            positions: true,
            positionStyle: 'both',
            runners: ['first', 'second'],
            batter: 'R',
            ball: 'up-the-middle',
            title: 'Infield fly: first and second, fewer than two outs',
            desc: 'A full diamond with runners on first and second, a right-handed batter, and a pop-up over the middle of the infield — the classic infield-fly picture.'
          },
          caption: 'Runners on first and second, fewer than two outs, a fair fly an infielder can catch with ordinary effort. All four conditions. The batter is out on the call. The runners are not forced.'
        },
        {
          type: 'prose',
          heading: 'What the call does — and does not do',
          body: [
            'Runners are not forced to advance. Because the batter is already out, the force on the bases is removed. Runners may advance at their own risk. If the ball is caught, they must tag up before advancing, exactly as on any other caught fly. If it is dropped, the ball remains live and they may try to go. They can be tagged out.',
            'The play is not dead. That is the most common wrong sentence you will hear from a dugout. The batter is out; the ball is in play.',
            'If the umpire called “Infield Fly, if Fair” and the ball lands foul, the call is void — it is a foul ball. A runner who is on base when an infield fly is declared and is then hit by that ball is not out; the ball remains live.',
            'Two other misconceptions. An outfielder running in can still trigger the rule if an infielder could have caught it with ordinary effort. And it applies with the bases loaded, not only with runners on first and second.'
          ]
        },
        {
          type: 'prose',
          heading: 'Dropped third strike — when the batter may run',
          body: [
            'On an uncaught third strike the batter becomes a batter-runner, and the ball stays live, when both of the following are true. The catcher does not catch strike three — the ball touches the ground, bounces off the gear, or is not cleanly secured. And either first base is unoccupied at the time of the pitch, regardless of outs, or there are two outs, regardless of whether first is occupied.',
            'The defence must then put the batter-runner out by tagging them before they reach first, or by throwing to first and completing the force before they arrive. The catcher has no duty to choose one play; they may tag, throw, or play elsewhere.',
            'If first is occupied and there are fewer than two outs, strike three is simply an out whether or not the catcher catches it. The batter cannot run. That exception exists so a catcher cannot drop strike three on purpose and turn an easy double play — the same protective logic as the infield fly.',
            'A foul tip that goes sharply and directly to the catcher’s hand and is legally caught is a strike, and on strike three the batter is out. A dropped pitch that is not strike three is not this rule. If the batter does not attempt to run and leaves the dirt circle around home, they may be declared out for abandoning the base path even when the rule would otherwise let them run. Run first; sort it out later.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Uncaught third strike, first base open',
          svg: 'field',
          opts: {
            preset: 'full',
            labels: true,
            positions: true,
            positionStyle: 'abbr',
            batter: 'R',
            ball: 'in-front-of-plate',
            arrows: [
              { from: 'c', to: 'first', style: 'throw' }
            ],
            covering: { first: '1b' },
            title: 'Dropped third strike with first unoccupied',
            desc: 'A full diamond with a right-handed batter, no runner on first, the ball on the dirt in front of the plate, and a throw from the catcher to first.'
          },
          caption: 'First is empty, so the uncaught third strike makes the batter a batter-runner. The catcher tags them or throws to first. If first had been occupied with fewer than two outs, this throw would be theatre — the batter would already be out.'
        },
        {
          type: 'prose',
          heading: 'Balks — what they protect, what they cost',
          body: [
            'A balk is an illegal motion by the pitcher with at least one runner on base. Its purpose is to stop the pitcher from manufacturing deception out of the rubber. Without runners, these acts are not balks.',
            'The common youth balks: starting the pitching motion and stopping; failing to step directly toward the base on a pickoff (including the banned third-to-first move); a quick pitch before the batter is reasonably set; failing to come to a full, discernible stop from the set; disengaging the rubber from the windup by stepping back with the free foot first instead of the pivot foot; faking a throw to an unoccupied base with intent to deceive; dropping the ball while in contact with the rubber if it is ruled intentional or rolls toward a base.',
            'From the set, a feint to first while in contact with the rubber is a balk. A feint to third is a balk. A feint to second, with a legal step, is legal. The safest youth pickoff is to step off with the pivot foot first; once off the rubber the pitcher is a fielder.',
            'Penalty: all runners advance one base. The batter’s count is unaffected. The umpire calls “Balk,” points, and the ball is dead. If the pitcher still delivers and the batter puts it in play, or if the pitch otherwise lets every runner advance at least one base, the manager may elect the result of the play instead of the balk. That option is rare in youth ball. If a balk happens during a pitch that still crosses the foul line, Baseball Canada championships charge that pitch to the pitch count.'
          ]
        },
        {
          type: 'compare',
          heading: 'Interference or obstruction?',
          left: {
            title: 'Interference — offence impedes defence',
            items: [
              'An offensive player (batter, batter-runner, runner), a coach, or in some cases a spectator hinders a fielder making a play.',
              'Fielders making a play on a batted ball have the right of way — even if the ball was already deflected by another fielder.',
              'A runner hit by an untouched batted ball is generally out, ball dead, batter-runner awarded first — with exceptions if an infielder has already deflected it, or if no other infielder still has a play.',
              'Willful interference can retire both the runner and the batter-runner. A coach who physically assists a runner has interfered; that runner is out.',
              'Typical remedy: the interferer is out, the ball is dead, other runners return to the bases they occupied at the time of the pitch.'
            ]
          },
          right: {
            title: 'Obstruction — defence impedes a runner',
            items: [
              'A fielder who is not in possession of the ball and is not in the act of fielding a batted ball impedes a runner’s progress.',
              'Type 1: a play is being made on the obstructed runner. The umpire calls it, the play continues, then awards at least the base the runner would have reached — often home when a catcher without the ball blocks the plate.',
              'Type 2: no immediate play on that runner. The ball stays live. The award is made when the play ends.',
              'Obstruction does not automatically kill the ball. That is the key distinction from most interference calls.',
              'A fielder in the act of fielding has the right of way. Contact then is interference on the runner, not obstruction on the fielder.'
            ]
          }
        },
        {
          type: 'terms',
          items: [
            'infield-fly',
            'ordinary-effort',
            'dropped-third-strike',
            'uncaught-third-strike',
            'balk',
            'set-position',
            'interference',
            'obstruction',
            'type-1-obstruction',
            'type-2-obstruction',
            'force-play',
            'tag-up'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Which of these rules actually apply',
          intro: 'Infield fly, dropped third strike, and balks are turned off in the lowest youth divisions on purpose. Interference and obstruction definitions follow OBR in both pathways; the scenarios that need them (uncaught third strike, infield fly) simply do not arise where those rules are off. Confirm the book for the game you are in before you argue the call.',
          columns: ['Rule', 'Little League (SOLL local)', 'Baseball Canada'],
          rows: [
            [
              'Infield fly',
              'Rookie (all tiers): No. Minor: No. Major: Yes. Junior / Senior: Yes.',
              'Championships (13U and up): Yes, OBR. 11U house league: not confirmed as universal — verify with the provincial association. Rally Cap: not a strikeout/pop-up game in the same sense.'
            ],
            [
              'Dropped third strike',
              'Rookie: No — batter is out on the third strike. Minor: No — batter-runner may not attempt first. Major: Yes. Junior / Senior: Yes.',
              '11U: No — batter is automatically retired even if strike three is uncaught; the ball stays live for other runners. Championships (13U and up): Yes, full OBR. Rally Cap: moot (tee / coach-pitch, no strikeouts).'
            ],
            [
              'Balks',
              'Rookie: No. Minor: No. Major: Yes. Junior / Senior: Yes.',
              'Championships (13U and up): Yes, OBR. 11U house league / sub-championship: provincial associations may suspend enforcement — confirm locally.'
            ],
            [
              'Interference / obstruction',
              'OBR definitions. No SOLL local rewrite. Some triggering plays (dropped-third-strike interference) do not arise below Major.',
              'OBR definitions via the BC rule interpretations. No substantive pathway split on the core rules at comparable competitive levels.'
            ]
          ]
        },
        {
          type: 'interactive',
          heading: 'Make the call',
          widget: 'makeTheCall',
          intro: 'Each play is a conditions test. Read who is on, how many are out, and what the ball did. Pick the ruling. The explanation cites the condition that decided it, not a feeling about the play.',
          opts: {
            mode: 'rules',
            cases: [
              {
                id: 'iff-first-and-second',
                situation: 'Little League Major (rule in effect). Runners on first and second, one out. The batter hits a high fair pop-up that the shortstop can catch with ordinary effort. The umpire calls “Infield Fly.” The shortstop drops the ball. What is the ruling?',
                prompt: 'Little League Major (rule in effect). Runners on first and second, one out. The batter hits a high fair pop-up that the shortstop can catch with ordinary effort. The umpire calls “Infield Fly.” The shortstop drops the ball. What is the ruling?',
                choices: [
                  'The batter is still running; the drop keeps the force on, so the defence can turn two.',
                  'The batter is out on the call, whether or not the ball is caught. Runners are not forced and may advance at their own risk. The ball is live.',
                  'The play is dead the moment the umpire speaks. Everyone holds.'
                ],
                answer: 1,
                explain: 'All four infield-fly conditions are met: fair fly, ordinary effort by an infielder, first and second, fewer than two outs. The batter is out the instant the declaration is made, catch or drop. The force is removed. Runners may go at their own risk. The ball is not dead.',
                rule: 'Infield fly — OBR 5.09(a)(5)',
                division: 'Applies in LL Major and above, and in BC championships 13U+. Does not apply in SOLL Rookie or Minor.'
              },
              {
                id: 'iff-only-first',
                situation: '13U championship. Runner on first only, nobody out. The batter hits a high fair pop-up that the third baseman can catch with ordinary effort. Infield fly?',
                prompt: '13U championship. Runner on first only, nobody out. The batter hits a high fair pop-up that the third baseman can catch with ordinary effort. Infield fly?',
                choices: [
                  'Yes. Any ordinary-effort infield pop with a force at first is an infield fly.',
                  'No. Condition three fails: you need runners on first and second, or the bases loaded. First only is not enough.',
                  'Yes, but only if the third baseman is standing on the dirt.'
                ],
                answer: 1,
                explain: 'All four conditions must be true together. Condition three requires a force on at least two bases — first and second, or bases loaded. A lone runner on first does not get there. Ordinary effort and a fair fly are not enough by themselves.',
                rule: 'Infield fly — four trigger conditions',
                division: 'BC championships 13U+: the rule is on, and it still does not fire here, because the occupancy condition fails.'
              },
              {
                id: 'iff-line-drive',
                situation: 'Bases loaded, one out, rule in effect. The batter lines a ball at the pitcher. The pitcher gloves it at letters height on a line, then drops it. Infield fly?',
                prompt: 'Bases loaded, one out, rule in effect. The batter lines a ball at the pitcher. The pitcher gloves it at letters height on a line, then drops it. Infield fly?',
                choices: [
                  'Yes. Bases loaded, fewer than two outs, an infielder could catch it.',
                  'No. An infield fly must be a fly ball — not a line drive, and not a bunt.',
                  'Yes if the umpire judges ordinary effort, which a pitcher stabbing a liner is.'
                ],
                answer: 1,
                explain: 'Condition one is a fair fly ball, and the definition excludes a line drive and a bunt. Occupancy and outs are satisfied. The batted-ball type is not. This is a live ball and a possible double play, not an infield fly.',
                rule: 'Infield fly — “fair fly ball (not a line drive, not a bunt)”',
                division: 'Same exclusion wherever the rule is in effect.'
              },
              {
                id: 'iff-if-fair-foul',
                situation: 'Runners on first and second, one out. Pop-up near the right-field line. The umpire calls “Infield Fly, if Fair.” The ball lands in foul territory and stays foul. What is it?',
                prompt: 'Runners on first and second, one out. Pop-up near the right-field line. The umpire calls “Infield Fly, if Fair.” The ball lands in foul territory and stays foul. What is it?',
                choices: [
                  'Infield fly. The batter is out. Foul or fair no longer matters once the words are out.',
                  'Foul ball. The infield-fly call is void. Strike on the batter unless it was already strike two, in which case the count holds (a foul is not a third strike).',
                  'Dead ball, runners advance one base because the umpire spoke.'
                ],
                answer: 1,
                explain: 'Near a line the call is “Infield Fly, if Fair.” If the ball lands foul, the call is void and the play is a foul ball. The batter is not out on the infield fly. Treat it as any other foul.',
                rule: 'Infield fly — “if Fair” near the lines',
                division: 'Wherever infield fly is in effect.'
              },
              {
                id: 'dts-first-open',
                situation: 'LL Major. Nobody on, one out, 1–2 count. The third strike hits the dirt and the catcher does not secure it. The batter starts for first. What must the defence do?',
                prompt: 'LL Major. Nobody on, one out, 1–2 count. The third strike hits the dirt and the catcher does not secure it. The batter starts for first. What must the defence do?',
                choices: [
                  'Nothing. Strike three is always an out once it hits the dirt.',
                  'The batter is a batter-runner. Tag them before first, or throw to first and beat them there. The ball is live.',
                  'The umpire kills it and the batter is out for leaving the box.'
                ],
                answer: 1,
                explain: 'The catcher did not catch strike three, and first is unoccupied — that is enough, regardless of outs. The batter becomes a batter-runner. Tag or force at first. The ball stays live.',
                rule: 'Dropped third strike — OBR 5.05(a)(2)',
                division: 'In effect LL Major and above, and BC 13U championships. Not in SOLL Rookie/Minor, and not in BC 11U.'
              },
              {
                id: 'dts-first-occupied-one-out',
                situation: 'Runner on first, one out, two strikes. The catcher drops strike three. The batter takes off for first. Ruling?',
                prompt: 'Runner on first, one out, two strikes. The catcher drops strike three. The batter takes off for first. Ruling?',
                choices: [
                  'Live ball. The defence can get the batter at first and the runner at second.',
                  'The batter is out. First is occupied and there are fewer than two outs, so the batter may not run, catch or drop. That exception exists so the catcher cannot manufacture a double play.',
                  'Infield fly. Same protective idea, so the same call.'
                ],
                answer: 1,
                explain: 'When first is occupied and there are fewer than two outs, uncaught strike three is simply an out. The batter cannot run. The exception is the sibling of the infield fly: it removes the cheap double play on a deliberate drop.',
                rule: 'Dropped third strike — first occupied, fewer than two outs',
                division: 'Wherever the rule is in effect, this exception is in effect with it. In divisions where the rule is off, the batter is out on strike three in every occupancy.'
              },
              {
                id: 'dts-two-outs-loaded',
                situation: 'Bases loaded, two outs, two strikes. Strike three gets away from the catcher to the backstop. Does the batter run?',
                prompt: 'Bases loaded, two outs, two strikes. Strike three gets away from the catcher to the backstop. Does the batter run?',
                choices: [
                  'No. First is occupied, so the batter is out on strikes.',
                  'Yes. Two outs lets the batter run whether or not first is occupied. Every base is forced, including first. If the catcher throws wildly, the runner from third may score.',
                  'No. With two outs the infield fly covers this instead.'
                ],
                answer: 1,
                explain: 'The second trigger is two outs, regardless of whether first is occupied. Bases loaded and two outs is the live-ball version of this rule. The catcher must tag the batter or throw to a base; a ball to the backstop can score the run from third.',
                rule: 'Dropped third strike — two outs, first occupied still runs',
                division: 'LL Major+ / BC 13U+. Not 11U, not SOLL Rookie/Minor.'
              },
              {
                id: 'balk-no-stop',
                situation: 'LL Major. Runner on first. From the set, the pitcher brings the hands together and goes to the plate with no discernible stop. The umpire calls balk. What happens?',
                prompt: 'LL Major. Runner on first. From the set, the pitcher brings the hands together and goes to the plate with no discernible stop. The umpire calls balk. What happens?',
                choices: [
                  'Ball on the batter. Runner stays. The stop is a courtesy, not a rule.',
                  'All runners advance one base. The batter’s count is unchanged. The ball is dead.',
                  'The runner at first is out for leaving early on the flinch.'
                ],
                answer: 1,
                explain: 'Failing to come to a full, discernible stop from the set with a runner on is a balk. Penalty: every runner gets one base; the count does not move. Play is dead. This is the most common youth balk — the lazy stop.',
                rule: 'Balk — OBR 6.02(a), illegal stop at the set',
                division: 'Enforced LL Major and above, and BC championships 13U+. Not called in SOLL Rookie or Minor.'
              },
              {
                id: 'interference-runner-hit',
                situation: 'Runner on second, nobody out. Ground ball up the middle, untouched by any infielder, strikes the runner between second and third. The shortstop still had a play on the ball. Ruling?',
                prompt: 'Runner on second, nobody out. Ground ball up the middle, untouched by any infielder, strikes the runner between second and third. The shortstop still had a play on the ball. Ruling?',
                choices: [
                  'Live ball. The runner could not be expected to dodge it.',
                  'Runner is out. Ball is dead. Batter-runner is awarded first. A runner hit by an untouched batted ball is out when another infielder still has a reasonable chance to make a play.',
                  'Obstruction on the shortstop for being in the runner’s path.'
                ],
                answer: 1,
                explain: 'Interference, not obstruction. A runner hit by a batted ball is generally out, ball dead, batter-runner to first. If the ball has already been deflected by an infielder, the runner is not out. If it passed untouched and no other infielder had a play, the ball would stay live. Here another infielder still had a play, so the runner is out.',
                rule: 'Runner interference — OBR 5.06(c)(6) / 6.01(a)(11)',
                division: 'OBR in both pathways. No SOLL local rewrite.'
              },
              {
                id: 'obstruction-plate',
                situation: 'Runner trying to score. The catcher, without the ball and not fielding a batted ball, stands in the baseline and blocks the plate. The throw arrives late; the catcher tags the runner, who never touches home. Ruling?',
                prompt: 'Runner trying to score. The catcher, without the ball and not fielding a batted ball, stands in the baseline and blocks the plate. The throw arrives late; the catcher tags the runner, who never touches home. Ruling?',
                choices: [
                  'Out. The catcher tagged them. Blocking the plate is legal once a throw is in the air.',
                  'Type 1 obstruction. A play is being made on the obstructed runner. Award home. The run scores.',
                  'Interference on the runner for running into a fielder.'
                ],
                answer: 1,
                explain: 'Obstruction: a fielder without the ball, and not in the act of fielding a batted ball, impeded the runner. Type 1, because a play is being made on that runner. The umpire awards at least the base the runner would have reached — here, home. Fielders who are fielding a batted ball have the right of way; this catcher was not.',
                rule: 'Obstruction Type 1 — OBR 6.01(h)(1)',
                division: 'OBR in both pathways. Catcher may not block the plate without the ball (collision rule 6.01(i) at competitive levels).'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'Why the infield fly exists',
          body: [
            'Bases loaded, nobody out. A lazy pop-up over the pitcher. If the pitcher can drop it on purpose, every runner is forced: touch home, or third, or second, and throw to first, and you have two or three outs from a ball that should have been one.',
            'The infield fly takes that play away. The umpire speaks, the batter is out, the force vanishes. A drop now is just a live ball with tag plays. The defence cannot convert ordinary effort into a massacre of forced runners.',
            'That is also why the rule is off in Rookie and Minor. Those divisions are still learning to catch a pop-up. A protective rule that depends on “ordinary effort” and a loud umpire call is the wrong complexity for that field.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Infield fly needs all four: fair fly (not a liner, not a bunt); ordinary effort by an infielder; first-and-second or bases loaded; fewer than two outs.',
            'On an infield fly the batter is out on the call, catch or drop. Runners are not forced. The ball is live. Near the lines: “Infield Fly, if Fair.” Foul means the call is void.',
            'Dropped third strike: batter runs if the catcher misses strike three and (first is open, or there are two outs). First occupied with fewer than two outs — batter is out, cannot run.',
            'Balk (runners on): illegal deception from the rubber. Penalty is one base for every runner; count unchanged; ball dead. Not enforced in SOLL Rookie/Minor.',
            'Interference is the offence hindering a fielder. Obstruction is the defence impeding a runner without the ball and not fielding a batted ball. Different people, different remedies.',
            'SOLL: infield fly, dropped third strike, and balks are off through Minor and on from Major. BC: dropped third strike is off at 11U; all three are on at 13U championships. Confirm 11U infield fly and balks locally.'
          ]
        }
      ],
      quizIds: ['q1701', 'q1702', 'q1703', 'q1704', 'q1705', 'q1706', 'q1707', 'q1708'],
      prev: 'ch16',
      next: 'ch18'
    },

    /* -------------------------------------------------------------- */
    /* ch18 — Pitching Strategy                                        */
    /* -------------------------------------------------------------- */
    {
      id: 'ch18',
      tier: 'elite',
      order: 18,
      title: 'Pitching Strategy',
      subtitle: 'Sequencing, holding runners, and calling a game',
      minutes: 13,
      objectives: [
        'After this chapter you can explain conventional sequencing versus pitching backwards, and name the two levers that matter most at youth and high-school level: eye level and speed.',
        'After this chapter you can say what a pitcher is trying to do at 0–0, at 1–2, and at 3–1.',
        'After this chapter you can describe the catcher’s job in calling a game, including when to go to the mound and how to read a hitter.',
        'After this chapter you can hold a runner legally: vary the look and the hold, use a slide step with a reason, and name the pickoff balks.',
        'After this chapter you can state mound-visit limits under Baseball Canada / OBR and under Little League Major and Minor, including the automatic-removal triggers.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Command first, then a plan',
          body: [
            'Mechanics get the ball to the plate. Approach decides whether it arrives in a place and at a speed that gives the hitter a poor chance to do damage. Below college, command beats stuff. A pitcher who can throw both sides of the plate at a controlled velocity is harder to hit than one who throws hard over the middle.',
            'The two levers that actually move youth and high-school at-bats are changing the hitter’s eye level and changing speeds. Inner half then outer half is a location lever. Fastball then changeup is a speed lever. Elevated fastball then low changeup is both.',
            'Pitching to contact is the structural preference at these ages. Pitch-count rules cap an outing. Six ground-ball outs on 18 pitches leave more innings in the arm than six strikeouts on 38. Strikeouts are not a vice. Burning the count to get them is.'
          ]
        },
        {
          type: 'prose',
          heading: 'Conventional sequencing, and pitching backwards',
          body: [
            'Sequencing is the use of an earlier pitch to set up a later one. Conventional youth sequencing establishes the fastball first. A fastball sets the hitter’s timing; a changeup at the same arm speed then arrives late. An inside fastball makes the hitter protect in; the next fastball away catches them leaning. An elevated fastball sends the eyes up; a low-and-away changeup then drops out of that sight line.',
            'The simplest version needs no second pitch: two fastballs, inner half then outer half. Same pitch, different location. At 10–12U that is the whole plan, with the changeup used to change timing rather than as a plotted sequence.',
            'Pitching backwards flips the first move. Instead of waiting for a “secondary-pitch count,” the catcher calls a changeup on 0–0 or 0–1, before the hitter has a reason to look for it. That is legal, useful, and underused. It is not a licence to throw a breaking ball you cannot command. If the changeup is not a strike today, you do not start an at-bat with it.',
            'Never call a curveball or changeup on 3–0 unless the pitcher has near-perfect command of it. A walk is a worse outcome than a well-located fastball over the plate — the fastball might still make an out. A changeup over the middle on 3–1 is among the most hittable pitches in the sport.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Who owns the count',
          svg: 'countMatrix',
          opts: {
            shade: 'leverage',
            title: 'Hitter’s counts and pitcher’s counts',
            desc: 'A grid of the twelve ball-strike counts with hitter’s-count cells and pitcher’s-count cells shaded for leverage.'
          },
          caption: 'Green cells are hitter’s counts in this diagram’s leverage map; red cells are pitcher’s counts; white is even. The pitching page treats 0–0 as a pitcher’s pitch to attack. 1–2 is a put-away or expand count. 3–1 is a must-strike count — throw the pitch you can actually throw for a strike.'
        },
        {
          type: 'prose',
          heading: 'Three counts to own: 0–0, 1–2, 3–1',
          body: [
            'At 0–0, attack the zone with a fastball. A first-pitch strike moves the at-bat into 0–1 and opens every other option. A first-pitch ball hands the count to the hitter. First-pitch strike rate is the most useful youth pitching number you can track. Nibbling at the corners on pitch one is how walks start.',
            'At 1–2 you still own the at-bat. Two useful plans: a changeup off the lower edge (highest expected value at youth level, because the hitter is geared to velocity), or an elevated fastball when they have been looking down. A waste pitch — breaking ball in the dirt, fastball high and away — is for a hitter who has been chasing. The error is missing the zone four times in a row and walking the count back to 3–2. Commit to the put-away or commit to the waste. Do not drift.',
            'At 3–1 the pitcher must throw a strike. Call the pitch this pitcher can most reliably throw for a strike, in the location that does the least damage if it is barrelled: low and away for a ground ball, up and in if they have been late. Avoid belt-high middle. If the changeup has been a ball three times today, it is not the 3–1 pitch.'
          ]
        },
        {
          type: 'diagram',
          heading: 'A three-pitch sequence, numbered',
          svg: 'strikeZone',
          opts: {
            grid: 3,
            zoneRef: 'adult',
            showBatter: 'R',
            pitches: [
              { n: 1, x: 0.32, y: 0.38, call: 'called-strike' },
              { n: 2, x: 0.70, y: 0.42, call: 'foul' },
              { n: 3, x: 0.68, y: 0.66, call: 'swinging-strike' }
            ],
            title: 'Inner fastball, outer fastball, low-away changeup',
            desc: 'Catcher’s view of a three-pitch sequence: pitch 1 a called strike on the inner half, pitch 2 a foul on the outer half, pitch 3 a swinging strike on a low-away changeup.'
          },
          caption: 'Pitch 1, inner-half fastball, sets the hands. Pitch 2, outer-half fastball, catches the adjustment. Pitch 3, low-away changeup, changes speed and eye level. That is both levers in three pitches.'
        },
        {
          type: 'prose',
          heading: 'The catcher calling the game',
          body: [
            'Game calling is the catcher’s job of picking type and location on every pitch. It is introduced at 13U, not dumped on a twelve-year-old opening day. Below that, the coach calls, or the battery works from two or three options. The catcher cannot call a game until they know which pitches this pitcher can throw for strikes today, they understand the count, and they have looked at the hitter.',
            'Reads: a hitter deep in the box struggles away; a hitter crowding the plate is vulnerable in. An open stance often struggles inside. A closed stance can be a pull hitter who can be worked away. Foul straight back means timing is on — change type or change location a lot. Foul to the pull side means they are out in front — elevate or go in. Foul the other way means they are late — stay with the pitch.',
            'The catcher’s sign is a request. The pitcher may shake. They must agree before the ball is thrown; uncommitted pitches are the ones that miss or sit middle. If the pitcher shakes everything, go to the mound. Ask what is working. Do not keep cycling in silence.',
            'Go to the mound after back-to-back walks, when the plan is unclear, or after an error when the pitcher is spinning. Say one thing. Leave. Both rulebooks limit those visits. A catcher who can settle a pitcher between pitches without a trip saves the coach’s allocation.'
          ]
        },
        {
          type: 'prose',
          heading: 'Holding runners — and staying legal',
          body: [
            'Holding runners only matters where leadoffs are legal. Little League Minor and Major forbid leaving the base until the pitch reaches the batter, so pickoffs are largely irrelevant there. They become real in Little League Intermediate, Junior, and Senior, and in Baseball Canada championships from 13U. Confirm 11U locally.',
            'The primary tool is unpredictable time between the set and the delivery. Mix a one-second hold with a three-second hold. Runners time a pattern; they do not time a random pause. The slide step — a shorter or missing leg lift — shortens the catcher’s throw-down window and usually costs velocity. Use it for a runner who is going. Do not live in it.',
            'Pickoff to first: step directly toward first with the free foot, then throw. A spin without a step is a balk. You may not fake to first from the rubber. You may not fake to third. You may fake to second with a legal step. Left-handers face first and can hesitate, but if the free foot crosses the line toward the plate they are committed to pitch.',
            'The safest move, and the one to teach first, is the step-off: pivot foot back off the rubber, then throw or look. Off the rubber, balks on the subsequent motion go away. Link this to the balk list in the previous chapter. The lazy stop, the drift-step toward home on a pickoff, and a flinch without stepping off are the three ways youth pitchers balk themselves.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Mound visits and pitching-change rules',
          intro: 'A trip is charged when a manager or coach crosses the foul line; it ends when they leave the 18-foot dirt around the rubber. Talking to the catcher or an infielder who then goes to the mound before a pitch is also a trip. An injury evaluation, announced to the umpire, may be excused. Mound-visit removal is independent of pitch-count removal — both clocks run at once.',
          columns: ['Limit', 'Baseball Canada / OBR', 'Little League Major and above', 'Little League Minor'],
          rows: [
            ['Per inning, same pitcher', '1 visit', '1 visit', '2 visits'],
            ['Per game, same pitcher', 'No cap; the inning count resets', '2 visits', '3 visits'],
            ['Removal trigger, inning', '2nd visit to that pitcher in that inning', '2nd visit in that inning', '3rd visit in that inning'],
            ['Removal trigger, game', 'None (no per-game cap)', '3rd visit in the game', '4th visit in the game'],
            ['Same batter', 'No second visit while that batter is still up; a pinch-hitter allows a second visit, and the pitcher must then come out', 'Follow Rule 8.06; a timeout to speak to any defensive player, including the catcher, is a visit', 'Same 8.06 charging rule; higher numerical caps'],
            ['Pitching change only', 'A visit that becomes a removal still counts as the trip that caused it', 'If the manager comes out solely to change pitchers and removes the pitcher before speaking to any defender, no visit is charged (A.R. 1)', 'Same A.R. 1']
          ]
        },
        {
          type: 'interactive',
          heading: 'Build the sequence',
          widget: 'sequencePitches',
          intro: 'You get a hitter and a count. Build a three-pitch sequence from the pitches on offer. More than one good sequence exists. The grade is whether you changed eye level and changed speeds, and whether you threw a strike you can actually throw in that count — not whether you matched one ideal line.',
          opts: {
            cases: [
              {
                id: 'crowd-the-plate-00',
                hitter: 'Right-handed hitter who crowds the plate. No scouting note. Count 0–0.',
                count: '0-0',
                pitches: [
                  { type: 'fastball', location: 'inner-half', x: 0.32, y: 0.38, call: 'called-strike' },
                  { type: 'fastball', location: 'outer-half', x: 0.70, y: 0.42, call: 'foul' },
                  { type: 'fastball', location: 'elevated', x: 0.50, y: 0.12, call: 'ball' },
                  { type: 'changeup', location: 'low-away', x: 0.68, y: 0.66, call: 'swinging-strike' }
                ],
                ideal: [
                  { type: 'fastball', location: 'inner-half' },
                  { type: 'fastball', location: 'outer-half' },
                  { type: 'changeup', location: 'low-away' }
                ],
                explain: 'Crowding the plate is an inner-half vulnerability. Start with strike one in, then outer half to catch the adjustment, then change speed and eye level with a low-away changeup. A first-pitch changeup here is pitching backwards — legal if this pitcher can throw it for a strike today, not if they cannot.'
              },
              {
                id: 'late-on-fastball-02',
                hitter: 'Right-handed hitter who was late on fastballs last at-bat (weak foul tips behind the plate). Count 0–2.',
                count: '0-2',
                pitches: [
                  { type: 'fastball', location: 'elevated', x: 0.52, y: 0.14, call: 'swinging-strike' },
                  { type: 'fastball', location: 'outer-half', x: 0.72, y: 0.40, call: 'called-strike' },
                  { type: 'changeup', location: 'low-away', x: 0.70, y: 0.78, call: 'ball' },
                  { type: 'curveball', location: 'dirt', x: 0.60, y: 0.88, call: 'ball' }
                ],
                ideal: [
                  { type: 'fastball', location: 'elevated' },
                  { type: 'fastball', location: 'outer-half' },
                  { type: 'fastball', location: 'elevated' }
                ],
                explain: 'Late on the fastball means stay with the fastball, perhaps elevated. Do not automatically go to a waste breaking ball in the dirt. If they are behind the heater, the heater is still the put-away. A chase changeup is a second-best option, not the required one.'
              },
              {
                id: 'chases-away-12',
                hitter: 'Hitter who has chased pitches low and away twice this game. Count 1–2.',
                count: '1-2',
                pitches: [
                  { type: 'fastball', location: 'inner-half', x: 0.30, y: 0.36, call: 'foul' },
                  { type: 'changeup', location: 'low-away', x: 0.74, y: 0.70, call: 'swinging-strike' },
                  { type: 'fastball', location: 'elevated', x: 0.48, y: 0.10, call: 'ball' },
                  { type: 'fastball', location: 'middle', x: 0.50, y: 0.40, call: 'in-play' }
                ],
                ideal: [
                  { type: 'changeup', location: 'low-away' },
                  { type: 'fastball', location: 'elevated' },
                  { type: 'changeup', location: 'low-away' }
                ],
                explain: 'Do not abandon a weakness. They chase low and away — return there. A changeup off the lower edge on 1–2 is the high-value youth put-away. Mixing an elevated fastball changes eye level if they start laying off the low one.'
              },
              {
                id: 'must-strike-31',
                hitter: 'Cleanup hitter, 3–1. Your pitcher’s changeup has been a ball three times today. Curveball is not a strike this inning.',
                count: '3-1',
                pitches: [
                  { type: 'fastball', location: 'low-away', x: 0.68, y: 0.58, call: 'called-strike' },
                  { type: 'fastball', location: 'inner-half', x: 0.34, y: 0.36, call: 'in-play' },
                  { type: 'changeup', location: 'middle', x: 0.50, y: 0.42, call: 'in-play' },
                  { type: 'curveball', location: 'dirt', x: 0.62, y: 0.86, call: 'ball' }
                ],
                ideal: [
                  { type: 'fastball', location: 'low-away' },
                  { type: 'fastball', location: 'inner-half' },
                  { type: 'fastball', location: 'low-away' }
                ],
                explain: '3–1 is a must-strike count. Do not call the changeup you cannot throw for a strike; a ball is a walk. Do not hang a changeup over the middle — the hitter is sitting fastball. Throw the fastball, preferably low and away or in, never belt-middle.'
              },
              {
                id: 'open-stance-01',
                hitter: 'Open stance (front foot angled away from the plate). Count 0–1 after a first-pitch fastball strike on the outer half.',
                count: '0-1',
                pitches: [
                  { type: 'fastball', location: 'inner-half', x: 0.30, y: 0.36, call: 'swinging-strike' },
                  { type: 'fastball', location: 'outer-half', x: 0.72, y: 0.44, call: 'called-strike' },
                  { type: 'changeup', location: 'low-away', x: 0.70, y: 0.68, call: 'ball' },
                  { type: 'fastball', location: 'elevated', x: 0.48, y: 0.12, call: 'ball' }
                ],
                ideal: [
                  { type: 'fastball', location: 'inner-half' },
                  { type: 'changeup', location: 'low-away' },
                  { type: 'fastball', location: 'inner-half' }
                ],
                explain: 'An open stance often struggles on the inner half. You already showed them away on pitch one. Come inside. That is Option B after a first-pitch strike — attack again in a different location — and it matches the stance read.'
              },
              {
                id: 'timing-on-fastball',
                hitter: 'Has fouled off three consecutive fastballs, all hard, all straight back. Count 2–2.',
                count: '2-2',
                pitches: [
                  { type: 'changeup', location: 'low-away', x: 0.70, y: 0.66, call: 'swinging-strike' },
                  { type: 'fastball', location: 'elevated', x: 0.50, y: 0.12, call: 'foul' },
                  { type: 'fastball', location: 'inner-half', x: 0.32, y: 0.34, call: 'foul' },
                  { type: 'curveball', location: 'outer-half', x: 0.72, y: 0.50, call: 'called-strike' }
                ],
                ideal: [
                  { type: 'changeup', location: 'low-away' },
                  { type: 'fastball', location: 'elevated' },
                  { type: 'changeup', location: 'low-away' }
                ],
                explain: 'Three hard fouls on fastballs means their timing is on the fastball. Change type, or change location dramatically. A changeup after established fastballs is the classic speed change. Another inner-half fastball is the sequence they have already seen.'
              },
              {
                id: 'eyes-up-then-down',
                hitter: '15U. Balanced stance, no clear hole. Count 0–0. Pitcher has a usable changeup today.',
                count: '0-0',
                pitches: [
                  { type: 'fastball', location: 'elevated', x: 0.50, y: 0.14, call: 'called-strike' },
                  { type: 'changeup', location: 'low-away', x: 0.70, y: 0.68, call: 'swinging-strike' },
                  { type: 'fastball', location: 'inner-half', x: 0.32, y: 0.38, call: 'foul' },
                  { type: 'fastball', location: 'outer-half', x: 0.70, y: 0.40, call: 'ball' }
                ],
                ideal: [
                  { type: 'fastball', location: 'elevated' },
                  { type: 'fastball', location: 'inner-half' },
                  { type: 'changeup', location: 'low-away' }
                ],
                explain: 'Elevated fastball sets the eyes up; low-away changeup then drops out of that sight line. That pairing is the high-percentage 14U+ strikeout combination because it changes both eye level and speed. Starting 0–0 with the elevated strike still attacks the zone.'
              },
              {
                id: 'backwards-early-change',
                hitter: 'Fastball-dominant hitter who swings at the first pitch every time. Count 0–0. Pitcher has a changeup they can throw for a strike.',
                count: '0-0',
                pitches: [
                  { type: 'changeup', location: 'low-away', x: 0.68, y: 0.64, call: 'swinging-strike' },
                  { type: 'fastball', location: 'inner-half', x: 0.32, y: 0.36, call: 'called-strike' },
                  { type: 'fastball', location: 'elevated', x: 0.50, y: 0.12, call: 'foul' },
                  { type: 'fastball', location: 'middle', x: 0.50, y: 0.40, call: 'in-play' }
                ],
                ideal: [
                  { type: 'changeup', location: 'low-away' },
                  { type: 'fastball', location: 'inner-half' },
                  { type: 'fastball', location: 'elevated' }
                ],
                explain: 'This is pitching backwards with a reason: they swing at pitch one, so the first pitch should be hard to hit, not a middle fastball. A changeup early, before they expect it, is the catcher’s own correction against “abandoning the changeup.” Then change location and eye level with the fastball.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'Do not over-manage a young pitcher',
          body: [
            'At 10–12U the only strategic concept that earns its place is strike one. Full count management, full sequencing, and full game-calling are developmentally the wrong load. The coach or the pitcher picks pitches; the catcher receives, blocks, and throws. A precocious catcher can be given fastball-or-changeup with coach approval. That is the exception.',
            'Visits are for one cue: “You’re rushing — breathe, work from the stretch.” Not a film session. Not frustration. The umpire is timing you. A pitcher who has just walked two needs a simpler plan, not a new repertoire. Late in an outing, command goes first — stay with fastball and changeup.',
            'Do not teach pickoff throws as a game skill in Little League Minor or Major. Leadoffs are illegal there. Spend the time on the set position and a full stop so the balk is already a habit when the rule turns on. Varying the hold is more valuable than the throw even after leadoffs begin.'
          ]
        },
        {
          type: 'terms',
          items: [
            'sequencing',
            'pitching-backwards',
            'changeup',
            'pitchers-count',
            'hitters-count',
            'set-position',
            'slide-step',
            'pickoff',
            'mound-visit',
            'shake-off'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'The two levers: change eye level, change speeds. Command of both sides beats velocity at this level.',
            'Conventional sequencing establishes the fastball, then uses it. Pitching backwards throws the changeup early, before the hitter is looking for it — only if it is a strike today.',
            '0–0: strike one, usually a fastball. 1–2: put away or expand, do not drift into a walk. 3–1: throw the pitch you can throw for a strike; do not float a changeup over the middle.',
            'Catchers call at 13U and up. Read stance, swing, and the last at-bat. Shake-offs must end in agreement. Visit the mound on purpose, not by habit.',
            'Hold runners by mixing the pause. Slide-step for the thief. Step toward the bag. No fake to first or third from the rubber. Step off if you want to be safe.',
            'OBR / BC: one coach visit per inning to that pitcher; the second removes them. Little League Major: also a two-visit game cap (third removes). Little League Minor: two per inning, three per game. Independent of pitch counts.'
          ]
        }
      ],
      quizIds: ['q1801', 'q1802', 'q1803', 'q1804', 'q1805', 'q1806', 'q1807'],
      prev: 'ch17',
      next: 'ch19'
    },

    /* -------------------------------------------------------------- */
    /* ch19 — Hitting Approach                                         */
    /* -------------------------------------------------------------- */
    {
      id: 'ch19',
      tier: 'elite',
      order: 19,
      title: 'Hitting Approach',
      subtitle: 'Counts, zones, and the two-strike swing',
      minutes: 12,
      objectives: [
        'After this chapter you can say what you are hunting before the pitch, and why that decision is not made during the ball’s flight.',
        'After this chapter you can sort counts into hitter’s, pitcher’s, and even, and name the job in each.',
        'After this chapter you can distinguish plate discipline from passivity — taking a hittable strike is not patience.',
        'After this chapter you can describe the two-strike adjustments (choke up, widen the zone, shorten the swing) as a change of goal, not a worse swing.',
        'After this chapter you can name the job in three situations: runner on second with nobody out, infield-in, and runner on third with fewer than two outs.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The decision is before the pitch',
          body: [
            'Approach is what the batter decides before the ball leaves the hand. Mechanics are what the body does during the swing. A hitter with average mechanics and a plan will beat a hitter with a pretty swing and no plan, over a season, because the first one is swinging at the right pitch in the right count.',
            'You have about four-tenths of a second after release. That window is for recognition, not for a committee meeting. The plan — which zone, which pitch, swing or take on a borderline — has to be in place in the box.',
            'Plate discipline is swinging at strikes and taking balls. It is not taking pitches. A first-pitch fastball in the middle that you watch for a strike is a missed swing, not virtue. Discipline is the ability to tell hittable from not. Passivity is standing there hoping for a walk.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Count leverage from the box',
          svg: 'countMatrix',
          opts: {
            shade: 'leverage',
            highlight: '2-0',
            title: 'What the count tells the hitter',
            desc: 'The twelve counts with hitter and pitcher leverage shaded, and 2–0 highlighted as a hitter’s count.'
          },
          caption: 'On a hitter’s count (2–0, 3–1, and in this map 1–0, 2–1, 3–0) you hunt a pitch in a zone. On a pitcher’s count (0–1, 0–2, 1–2) you shorten up and protect. 3–0 is coach-managed: default take unless you get a green light.'
        },
        {
          type: 'prose',
          heading: 'Hunt a zone. Do not react to everything.',
          body: [
            'On a hitter’s count the pitcher has to throw a strike and is very likely to throw a fastball in a hittable place. Pick a zone — inner half, belt-high middle, wherever you do damage — and be ready to swing. A 2–0 fastball over the middle is one of the most hittable pitches in baseball. Attack it.',
            'On a pitcher’s count they can throw a secondary pitch that is technically a ball, and you still have to protect. Shorten the swing. Prioritise contact over pull power. Stay alive. That is the door into the two-strike chapter below.',
            'On even counts (1–0, 1–1, 2–1) be aggressive on fastballs in the zone and disciplined on breaking balls off it. Do not expand the zone to “be productive.” Win the count first.',
            'Teach the rulebook zone — belt to knees, over the plate — not this umpire’s mood. A hitter who swings at whatever might be called will chase a foot outside. Chase rate is the biggest youth predictor of weak contact. A walk is a single for the purpose of reaching. Celebrate it like a hit, not like a polite refusal.'
          ]
        },
        {
          type: 'compare',
          heading: 'The same 2–0 at-bat, twice',
          left: {
            title: 'Handled as a hitter’s count',
            items: [
              'Plan in the on-deck circle: “2–0, I am looking inner-half fastball. Changeup away I take.”',
              '2–0 fastball, belt-high, over the inner half — swing. That is the pitch you hunted.',
              'If instead you get a changeup starting off the plate, you take. That is discipline: you identified it as not your pitch.',
              'You either did damage on your pitch or you moved the count to 3–0 / 3–1 with the same plan still on.',
              'The goal was a specific ball in a specific zone. You did not congratulate yourself for taking a strike down the middle.'
            ]
          },
          right: {
            title: 'Handled as passivity, then panic',
            items: [
              'No plan. “See the ball, maybe swing.” 2–0 fastball, belt-high, middle-in — taken, called strike. The dugout says “good eye.” It was not.',
              'Now 2–1. You expand. You swing at a changeup that started off the plate and roll over.',
              'Or you take another strike, fall to 2–2, and the at-bat you owned is now a two-strike fight you gave away.',
              'Taking a hittable 2–0 strike is not patience. It is a missed fastball in a count that exists to give you that fastball.',
              'The correction is not “swing more.” It is “decide before the pitch which zone you will swing in, and do it.”'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Two strikes — a different goal, not a worse swing',
          body: [
            'With two strikes the goal changes from hunting a preferred pitch in a preferred zone to protecting the plate: contact on anything in or near the zone that might be called a strike. That is a deliberate change of mission. It is not a weaker version of the same swing.',
            'Three adjustments. The mental zone expands slightly — knees, letters, back-door breaking balls become threats to protect, not pitches to take. Choke up one to two inches: shorter lever, faster barrel, more control, a little less power, more fouls and more contact. Reduce or drop the stride and shrink the load so you are not committed early to off-speed.',
            'The failure mode is passivity. A tentative wave produces rollers and pop-ups. The cue is controlled aggression: short swing, still swing hard. “If it’s close, protect.” In the dirt — no. Over your head — no. Close — yes. A foul on a tough two-strike pitch is a win. Make them throw another one.',
            'This is a reflex by 12U. Introduce the choke-up at 10–11U. The full no-stride option lives at 13U with pitch-type recognition. Before 11U, the message is simpler: two strikes means swing at anything close, and know the count before every pitch.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The zone you hunt, then the zone you protect',
          svg: 'strikeZone',
          opts: {
            grid: 3,
            zoneRef: 'youth',
            showBatter: 'R',
            pitches: [
              { n: 1, x: 0.38, y: 0.36, call: 'in-play' },
              { n: 2, x: 0.42, y: 0.40, call: 'called-strike' },
              { n: 3, x: 0.36, y: 0.44, call: 'foul' },
              { n: 4, x: 0.22, y: 0.28, call: 'called-strike' },
              { n: 5, x: 0.78, y: 0.62, call: 'foul' },
              { n: 6, x: 0.50, y: 0.16, call: 'swinging-strike' }
            ],
            title: 'Hunt zone (1–3) versus two-strike expand (4–6)',
            desc: 'Catcher’s view with pitches 1–3 clustered on the inner half as a hunt zone, and pitches 4–6 on the edges and top of the zone as a two-strike expand.'
          },
          caption: 'Pitches 1–3 are a 2–0 hunt: inner half, belt. Pitches 4–6 are two-strike protection: just off the inside edge, low and away-but-close, up at the armpits. The dirt and a ball over the head still get a take. The zone widened. The swing did not get shy.'
        },
        {
          type: 'prose',
          heading: 'Situational hitting, and the on-deck work',
          body: [
            'Runner on second, nobody out, close game: the job is to move them. Sacrifice bunt if the 2–3–4 hitters follow and you can put it down. Hit-and-run where leadoffs are legal. Or swing away if this batter is the best one you have or the pitcher is wild. Do not bunt when you are down three or more — the out is too expensive when you need a crooked number.',
            'Infield in, runner on third: a ground ball can still score, but a grounder to third with traffic is a double-play look. Put it in play, favour the right side, get it in the air if you can. A sacrifice fly — runner on third, fewer than two outs — is a controlled swing on a hittable pitch to medium-deep outfield. You are not hunting a three-run shot. You are scoring the run.',
            'Hitting behind the runner (first and third, or a runner on first you want to move): a hard ball to the right side is the geometry you want. A grounder to the shortstop or third is how innings die. Two outs: everyone runs on contact. That is a team rule, not a read.',
            'On deck is the plan meeting. Know the count you will walk into, the outs, who is on, and what this pitcher has thrown you. Watch one sequence: fastball first? Changeup in the dirt on 0–2? Decide the zone you will hunt if you get a hitter’s count, and decide that two strikes will mean choke up. Step in already decided.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Swing or take',
          widget: 'makeTheCall',
          intro: 'Each pitch comes with a count and a location. Decide swing or take. The right answer is the approach, not a guess at this umpire’s zone. Taking a hittable strike on a hitter’s count is a miss. Swinging at a ball in the dirt with two strikes is also a miss.',
          opts: {
            mode: 'approach',
            cases: [
              {
                id: 'hunt-20-middle',
                situation: 'Count 2–0. Fastball, belt-high, over the middle of the plate. What do you do?',
                prompt: 'Count 2–0. Fastball, belt-high, over the middle of the plate. What do you do?',
                choices: [
                  'Take. 2–0 is a walk count. Patience.',
                  'Swing. This is a hitter’s count and a hittable fastball in the zone you should be hunting.',
                  'Bunt. 2–0 is the bunt count.'
                ],
                answer: 1,
                explain: '2–0 is a hitter’s count. The pitcher has to throw a strike and is likely to throw a fastball in a hittable zone. A belt-high middle fastball is the pitch. Taking it is passivity dressed up as discipline.'
              },
              {
                id: 'two-strike-dirt',
                situation: 'Count 0–2. Curveball or changeup starts at the knees and dives into the dirt. What do you do?',
                prompt: 'Count 0–2. Curveball or changeup starts at the knees and dives into the dirt. What do you do?',
                choices: [
                  'Swing. Two strikes means swing at everything.',
                  'Take. Protect the close pitch, not the one in the dirt. Expanding the zone is not chasing.',
                  'Call time and choke up after it passes.'
                ],
                answer: 1,
                explain: 'Two-strike protection covers pitches close to the zone. In the dirt is still a take. Over-correcting “protect the plate” into swinging at everything is the listed two-strike fault.'
              },
              {
                id: 'green-light-30',
                situation: 'Count 3–0. No green-light sign from the coach. Fastball, belt-high, inner half. What do you do?',
                prompt: 'Count 3–0. No green-light sign from the coach. Fastball, belt-high, inner half. What do you do?',
                choices: [
                  'Swing. It is the most hittable pitch you will see.',
                  'Take. At most youth levels 3–0 is coach-managed: default take unless you are given the green light. A ball is a walk.',
                  'Bunt toward first to avoid a double play.'
                ],
                answer: 1,
                explain: '3–0 is coach-managed. Default take, unless the coach gives a green light. A ball is a walk. A swing that misses becomes 3–1, which is still a hitter’s count but no longer a free base if the next one is off the plate.'
              },
              {
                id: 'first-pitch-strike-not-discipline',
                situation: 'Leadoff, 0–0. Fastball, belt-high, inner half — the pitch you said in the on-deck circle you wanted. What do you do?',
                prompt: 'Leadoff, 0–0. Fastball, belt-high, inner half — the pitch you said in the on-deck circle you wanted. What do you do?',
                choices: [
                  'Take. Always take pitch one to see the release.',
                  'Swing. You hunted this pitch. Taking it for a strike is not discipline.',
                  'Take until you have a hitter’s count, then hunt.'
                ],
                answer: 1,
                explain: 'Taking the first pitch is valid only when it is intentional. A first-pitch fastball in the middle of your zone that you watch for a strike is a missed opportunity. Hitters who damage 0–0 and 1–0 counts stay out of pitcher’s counts.'
              },
              {
                id: 'sac-fly-count',
                situation: 'Runner on third, one out, 1–1. A fastball you can lift, belt to letters, over the plate. Infield is playing back. What is the job?',
                prompt: 'Runner on third, one out, 1–1. A fastball you can lift, belt to letters, over the plate. Infield is playing back. What is the job?',
                choices: [
                  'Take. Work a walk. A walk does not score the runner from third.',
                  'Swing, controlled, and put it in the air. A sacrifice fly scores the run. You are not hunting a homer.',
                  'Bunt. With one out a bunt scores from third on contact every time.'
                ],
                answer: 1,
                explain: 'Runner on third, fewer than two outs: productive out. A fly ball to medium-deep outfield scores the run. A walk leaves the runner at third. A bunt with one out is not the default here — the infield is back, and a fly ball does the job without giving up the out as a design.'
              },
              {
                id: 'breaking-ball-starts-off',
                situation: 'Count 1–1. Breaking ball starts off the outer edge. It may or may not come back. What do you do?',
                prompt: 'Count 1–1. Breaking ball starts off the outer edge. It may or may not come back. What do you do?',
                choices: [
                  'Swing. If it comes back it is a strike, and 1–1 is even so you should be aggressive.',
                  'Take. If it starts off the plate, let it go. That pitch is designed for weak contact or a chase.',
                  'Two-strike choke-up even though it is 1–1.'
                ],
                answer: 1,
                explain: 'A breaking ball that starts out of the zone is a pitcher’s pitch. Even counts are aggressive on fastballs in the zone, disciplined on breaking balls off it. “If it starts off the plate, let it go.”'
              },
              {
                id: 'two-strike-borderline-knees',
                situation: 'Count 1–2. Fastball at the top of the knees, over the outer third — close enough that an umpire may ring you up. What do you do?',
                prompt: 'Count 1–2. Fastball at the top of the knees, over the outer third — close enough that an umpire may ring you up. What do you do?',
                choices: [
                  'Take. Make the umpire call it. You only swing at belt-high.',
                  'Protect. Two strikes, it is close, choke up and put it in play. Short swing, still swing hard.',
                  'Bunt with two strikes because contact is the only goal.'
                ],
                answer: 1,
                explain: 'This is the two-strike expand: if it is close, protect. A take here is how you get punched out on the corner. Controlled aggression — not a bunt unless it was signed.'
              },
              {
                id: 'down-four-late',
                situation: 'Down four in the last inning, 3–1, fastball just off the outer edge. What do you do?',
                prompt: 'Down four in the last inning, 3–1, fastball just off the outer edge. What do you do?',
                choices: [
                  'Swing. You need extra bases, not a walk.',
                  'Take. Down by three or more in the late innings, work for baserunners. A walk and a single build a rally better than one big swing at a ball.',
                  'Take only if the coach bunts you.'
                ],
                answer: 1,
                explain: 'When you are down three-plus late, the approach is patient: force the pitcher to throw strikes, build runners. A borderline ball on 3–1 is a walk. Chasing it for a hero swing is how rallies stall.'
              }
            ]
          }
        },
        {
          type: 'example',
          heading: 'Runner on second, nobody out',
          body: [
            'Tied, fifth inning, runner on second, nobody out. The job is to get that runner to third so a fly ball or a grounder to the right side can score them.',
            'If the batter can bunt, and the next hitters are your 2–3–4, a sacrifice is on the table. If leadoffs are legal and this batter can swing at anything close, a hit-and-run punches a hole as the middle infielder covers. If this is your best hitter or the pitcher is throwing batting practice, you let them hit.',
            'What you do not do: take three borderline pitches into a punchout, or roll over to third on a pull-side grounder because you were still hunting a pull homer. The inning’s first out should buy a base.'
          ]
        },
        {
          type: 'terms',
          items: [
            'plate-discipline',
            'count-leverage',
            'hitters-count',
            'pitchers-count',
            'two-strike-approach',
            'choke-up',
            'chase-rate',
            'sacrifice-fly',
            'green-light',
            'on-deck'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Approach is decided before the pitch. The 0.4 seconds after release are for recognition, not for inventing a plan.',
            'Hitter’s counts: hunt a zone and a pitch, usually a fastball. Pitcher’s counts: shorten up and protect. 3–0 is a take unless you are green-lit.',
            'Discipline is identifying hittable versus not. Taking a belt-high 2–0 fastball is not patience.',
            'Two strikes: choke up, widen to anything close, shorten the stride and the load, swing hard at the close pitch. Different goal, not a worse swing. Dirt and over the head are still takes.',
            'Runner on second, nobody out: move them. Infield in: put it in play, right side, in the air if you can. Runner on third, fewer than two outs: a fly ball scores. Two outs: run on contact.',
            'On deck is where the plan is built. Step in knowing the count, the outs, and the zone you will swing in.'
          ]
        }
      ],
      quizIds: ['q1901', 'q1902', 'q1903', 'q1904', 'q1905', 'q1906', 'q1907'],
      prev: 'ch18',
      next: 'ch20'
    },

    /* -------------------------------------------------------------- */
    /* ch20 — Managing the Game                                        */
    /* -------------------------------------------------------------- */
    {
      id: 'ch20',
      tier: 'elite',
      order: 20,
      title: 'Managing the Game',
      subtitle: 'Lineups, substitutions, signs, and umpires',
      minutes: 13,
      objectives: [
        'After this chapter you can say what each spot in a batting order is for, and how that changes when everyone bats and mandatory play applies.',
        'After this chapter you can state Little League mandatory play (6 defensive outs and 1 at-bat) and Baseball Canada championship substitution, including the Extra Hitter and the 11U playing-equity rule.',
        'After this chapter you can describe a simple indicator sign system that a twelve-year-old can run under pressure, and when to change it.',
        'After this chapter you can say who may address an umpire, what is protestable, and what gets a coach ejected.',
        'After this chapter you can make four in-game calls: a pitching change against visit and pitch-count clocks, when to bring the infield in, an intentional walk, and how to manage a blowout without breaking participation rules.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'What each spot is actually for',
          body: [
            'The batting order has a tactics layer and a rules layer. Tactics are shared. The rules are not — Little League and Baseball Canada hand you different cards, and youth leagues add “everyone bats.”',
            'In a nine-hitter order the jobs are: first, highest on-base skill you have, speed optional; second, a patient hitter who can bunt and hit-and-run, protecting the leadoff; third through fifth, the most consistent contact and power, the RBI stretch; sixth through ninth, everyone else, with the best of that group in the six-hole so the order turns over. Alternate left and right where you can.',
            'In a youth league with a continuous order or mandatory play, that card is a preference, not a right. Participation and position variety outrank optimization at developmental ages. You still put on-base at the top. You do not bury a ten-year-old in the nine-hole all season so the lineup “looks like a real lineup.” The Extra Hitter (Baseball Canada) and the continuous order (Little League) exist so you can get more people to the plate without inventing a loophole.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Nine spots, nine jobs',
          svg: 'timeline',
          opts: {
            highlight: 0,
            title: 'Batting-order jobs, first to ninth',
            desc: 'A horizontal timeline of the nine batting-order spots and the job each one is for.',
            items: [
              { label: '1 On-base', sub: 'Highest OBP', marker: '1' },
              { label: '2 Table-set', sub: 'Bunt / H&R', marker: '2' },
              { label: '3 RBI', sub: 'Best contact', marker: '3' },
              { label: '4 Power', sub: 'Cleanup', marker: '4' },
              { label: '5 Drive', sub: 'Protect 4', marker: '5' },
              { label: '6 Turn over', sub: 'Best of rest', marker: '6' },
              { label: '7 Depth', sub: 'Next bat', marker: '7' },
              { label: '8 Depth', sub: 'Next bat', marker: '8' },
              { label: '9 Depth', sub: 'Then 1 again', marker: '9' }
            ]
          },
          caption: 'First is on-base, not “your fastest.” Two protects the table. Three to five drive in runs. Six is the best of the rest so the nine-hole does not strand the top. In a continuous youth order these jobs still describe the first nine names — the tenth through twelfth still hit, and still have to play.'
        },
        {
          type: 'prose',
          heading: 'Substitutions, re-entry, and the protest magnet',
          body: [
            'Little League Regulation IV.i: every rostered player present at the start must play at least six defensive outs and bat at least once. Penalties climb from a written warning to a one-game suspension to a season suspension, and the player must finish the unmet requirement next game. With 15–20 on the roster and 15 or more present, it may drop to three defensive outs and one at-bat. It does not apply in tournament play, when the continuous batting order is used, or in Senior League.',
            'A Little League pitcher once removed from the mound cannot return as pitcher, except Intermediate 50-70, Junior, and Senior, once per game. Plan the arm before you walk out.',
            'Baseball Canada championships: standard OBR substitution. Lineup and substitutes to the official scorer at least 30 minutes before game time — uniform number left of the name, position right — with a penalty for being late. A team may declare an Extra Hitter (ten in the order) on that card; it is not required of both teams and cannot be added after submission. There is no Little League-style per-game minimum at championship level. A pitcher removed from the mound may not return.',
            'Baseball Canada 11U is different, and this is where protests hide. A player present must start on the defensive lineup at least one game out of two, with equitable innings recommended (about six of twelve defensive innings across two games). Offensive re-entry is free — insert or remove on arrival or departure, no automatic out. Defensive re-entry is allowed at any position except pitcher once that player has pitched.'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'Mandatory play and substitution by pathway',
          intro: 'These are the real numbers. A protest over playing time is almost always a coach who built the lineup after first pitch instead of before it. Design the first three innings so the minimum is already met, then manage.',
          columns: ['Item', 'Little League', 'Baseball Canada championships', 'Baseball Canada 11U'],
          rows: [
            [
              'Minimum play',
              '6 defensive outs + 1 at-bat (regular season, traditional order). 3 outs + 1 at-bat if 15–20 roster and 15+ present. Off in tournament, continuous order, and Senior.',
              'No per-game minimum at championship level.',
              'Playing equity: start on defence at least one game of two; about 6 of 12 defensive innings across two games recommended.'
            ],
            [
              'Batting order',
              'Traditional (9 + substitutes) or continuous (every present player bats in a fixed order). Continuous satisfies the batting half of mandatory play.',
              'Conventional 9, or 10 with Extra Hitter declared on the card. EH not required of both teams.',
              'More permissive offensive insertion/removal; no automatic out for a departing batter.'
            ],
            [
              'Re-entry',
              'OBR-based, plus pitcher-return limits by division: once removed, no return as pitcher except Intermediate/Junior/Senior once per game.',
              'Standard OBR. Pitcher removed from the mound may not return. Starter re-entry only as OBR permits.',
              'Defensive re-entry at any position except pitcher once the player has pitched. Free offensive re-entry.'
            ],
            [
              'Card submission',
              'Less formal at house level; still submit a lineup.',
              'Written card ≥30 minutes before game time; penalty for late.',
              'Follow the provincial 11U book; championship 30-minute rule is not the 11U default.'
            ]
          ]
        },
        {
          type: 'prose',
          heading: 'Signs simple enough for a twelve-year-old',
          body: [
            'A sign system that a player cannot decode under pressure is not sophisticated. It is a baserunning error waiting for an inning. Match the system to the age. Eight-to-ten: no signs. The coach says “bunt” out loud. Eleven-to-twelve: one live touch, no indicator — cap is bunt, ear is steal, everything else is noise. Thirteen: indicator, live sign, wipe-off. Fourteen and up: fakes, location, defensive shifts, and you change the indicator between tournament games because people scouting you will steal a static system.',
            'The competitive indicator: a sequence of touches (cap, ear, chin, belt, sleeve, nose). One touch is the indicator — say, the belt. The next touch is live. A forearm brush wipes. Same rhythm on every sequence; a hitch on the real sign is how the third-base coach tells on themselves. Batter and runners acknowledge (helmet, clap, nod) or you repeat.',
            'Catcher to pitcher starts as 1-fastball, 2-changeup, 3-curve if you have one. With a runner at second you switch to a count system or an indicator (the sign after 5, or always the second sign). Little League Minors throwing fastball only still flash signs so the habit exists before the pitch mix does.',
            'When you know they are stolen — runner at second relaying, a coach calling your bunt from the other box — you change the indicator that inning, or you go to the mound and set a new one. Do not keep running the same belt-then-ear steal while they take it.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Late-inning glove for a one-run lead',
          svg: 'field',
          opts: {
            preset: 'full',
            labels: true,
            positions: true,
            positionStyle: 'both',
            alignment: 'infield-in',
            runners: ['third'],
            covering: { home: 'c', first: '1b', second: 'ss', third: '3b' },
            title: 'Infield in, coverages tagged, one-run lead',
            desc: 'A full diamond with the infield in, a runner on third, and covering callouts at home, first, second, and third for a late-inning defensive substitution.'
          },
          caption: 'One-run lead, runner on third, fewer than two outs: infield in, play at the plate. Before you make the glamorous outfield substitution, confirm the player coming off has their six outs and their at-bat. Coverages still have names after the sub: catcher at home, first baseman at first, shortstop at second on this steal look, third at third.'
        },
        {
          type: 'prose',
          heading: 'Who may talk to an umpire, and about what',
          body: [
            'Only the designated manager may formally address an umpire. An assistant who walks out to argue can be ejected. Players do not go. Judgment calls — balls and strikes, safe or out, fair or foul, catch or trap, home-run calls — cannot be protested in either pathway. The test: “Was the rule applied correctly?” is protestable. “Did the umpire see it correctly?” is not.',
            'Protestable examples: wrong number of bases on interference, wrong base on a ground rule, a pitcher used past a pitch-count limit, batting out of order once properly appealed. A balk’s occurrence is judgment; the interpretation of what the rule requires may be protestable. That distinction is thin — do not hang a game on it without the book in your hand.',
            'How: request time, normal voice, ask a question (“What is the rule on that play?”), accept the answer, go back to the dugout. If you believe a rule was misapplied, say you are protesting before the next pitch, play, or attempted play. Baseball Canada championships require a $100 cash deposit; upheld returns it, dismissed keeps it. A protest after play has resumed is void. Carry the cash at tournaments.',
            'Ejection: continuing after the umpire has ruled, personal remarks or competence shots, physical contact (automatic, and it can become a suspension), kicking dirt, throwing gear, aggressive gestures, leaving the dugout without permission on a live ball. An ejected manager leaves immediately. In a short tournament that can be the rest of the weekend.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Manage the game',
          widget: 'makeTheCall',
          intro: 'These are the calls that become protests: a sub you should not have made, a visit too many, a player who has not had their outs, an argument you should not have started. Pick the legal, ROOTS-shaped action.',
          opts: {
            mode: 'management',
            cases: [
              {
                id: 'mandatory-play-sub',
                situation: 'Little League Major, regular season, traditional order. One-run game, sixth inning. You want to bring your best outfielder in for a player who has four defensive outs and one at-bat. Legal?',
                prompt: 'Little League Major, regular season, traditional order. One-run game, sixth inning. You want to bring your best outfielder in for a player who has four defensive outs and one at-bat. Legal?',
                choices: [
                  'Yes. The at-bat is the part that matters, and they have it.',
                  'No. Regulation IV.i requires six defensive outs and one at-bat. Four outs is short. Make the sub only after those two more outs, or you have a protest and a penalty on the manager.',
                  'Yes if the continuous-order exception is read generously.'
                ],
                answer: 1,
                explain: 'Mandatory play is six defensive outs and one at-bat for every player present at the start, in regular-season traditional order. Four outs fails the defensive half. Continuous order and tournament play waive some of this; this game is neither. Get the minimum in by design in the first three innings so the sixth is free.'
              },
              {
                id: 'mound-visit-second-obr',
                situation: 'Baseball Canada 15U championship. You already visited this pitcher once this inning. The next hitter is their cleanup. You want to go out again, same pitcher, same inning, same batter. What happens?',
                prompt: 'Baseball Canada 15U championship. You already visited this pitcher once this inning. The next hitter is their cleanup. You want to go out again, same pitcher, same inning, same batter. What happens?',
                choices: [
                  'Allowed. OBR has no per-game cap, so innings can take two visits.',
                  'The second trip to the same pitcher in the same inning removes the pitcher. You also may not make a second visit while the same batter is still up. If you go, they are coming out.',
                  'Allowed if you announce it as an injury check after you arrive.'
                ],
                answer: 1,
                explain: 'OBR 5.10(l): one trip per inning to that pitcher; the second is automatic removal. A second visit while the same batter is at bat is also prohibited; a pinch-hitter would allow a second visit, and the pitcher must then come out. Injury evals are excused only if you tell the umpire that is the purpose. OBR has no per-game cap — the inning rule is enough to end this visit.'
              },
              {
                id: 'll-major-third-visit-game',
                situation: 'Little League Major. You have visited this pitcher twice already in the game, in two different innings. You have not visited them this inning. You want a third visit of the game. Result?',
                prompt: 'Little League Major. You have visited this pitcher twice already in the game, in two different innings. You have not visited them this inning. You want a third visit of the game. Result?',
                choices: [
                  'Fine. The inning cap is what matters, and this inning is still at zero.',
                  'The third visit in any game requires removal. Little League Major tracks both clocks: one per inning (second removes) and two per game (third removes).',
                  'Fine if you only speak to the catcher, because that is not a visit to the pitcher.'
                ],
                answer: 1,
                explain: 'LL Rule 8.06, Major and above: one visit per inning, two per game. The third visit of the game removes the pitcher even if it is the first visit of this inning. A timeout to speak to any defender, including the catcher, is a visit to the pitcher (8.06(c)).'
              },
              {
                id: 'assistant-argues-strike',
                situation: 'The plate umpire calls a strike on the outer edge. Your assistant coach walks toward the plate to tell the umpire it was a ball. What should happen?',
                prompt: 'The plate umpire calls a strike on the outer edge. Your assistant coach walks toward the plate to tell the umpire it was a ball. What should happen?',
                choices: [
                  'Good. Anyone on the staff may question balls and strikes if they stay polite.',
                  'Stop the assistant. Only the manager may address the umpire, and balls and strikes are judgment — not protestable. An assistant who goes out to dispute a call may be ejected.',
                  'File a protest with the $100 deposit. Location of the zone is a rule application.'
                ],
                answer: 1,
                explain: 'Two independent failures: only the manager talks, and judgment calls (balls and strikes) cannot be protested in either pathway. The assistant is in ejection territory. The manager’s job is to get their own coach back in the box, not to pile on.'
              },
              {
                id: 'protest-safe-out',
                situation: 'A runner is called out at second. You are sure they were safe. Do you protest?',
                prompt: 'A runner is called out at second. You are sure they were safe. Do you protest?',
                choices: [
                  'Yes. Safe/out is the classic protest.',
                  'No. Safe/out is a judgment call and is not protestable. Ask for time only if you think the rule was applied wrong (wrong base awarded, force/tag mix-up). Then protest before the next pitch, with the BC $100 deposit at championships.',
                  'Yes if you have video on a phone.'
                ],
                answer: 1,
                explain: 'The practical test: “Did the umpire see it correctly?” is not protestable. “Was the rule applied correctly?” is. Safe/out is seeing it. Wrong number of bases on interference, pitch-count overrun, batting out of order — those are rules. Phones do not change the book.'
              },
              {
                id: 'bc11u-reentry',
                situation: 'Baseball Canada 11U. Your starter threw 40 pitches and came out. Next inning you want them at shortstop. Legal?',
                prompt: 'Baseball Canada 11U. Your starter threw 40 pitches and came out. Next inning you want them at shortstop. Legal?',
                choices: [
                  'No. Once you pitch you are done for the day on defence.',
                  'Yes. 11U allows defensive re-entry at any position except pitcher once the player has pitched. They cannot return to the mound. They can play shortstop.',
                  'Only if the other team also used an Extra Hitter.'
                ],
                answer: 1,
                explain: 'BC 11U (not championship OBR): defensive re-entry at any position except pitcher once that player has pitched. Championship baseball does not give you that. Know which book the game is using before you wave them out to short.'
              },
              {
                id: 'intentional-walk-four-pitches',
                situation: 'First base open, tying run on third, two outs. You want the cleanup hitter walked. Can you just send them?',
                prompt: 'First base open, tying run on third, two outs. You want the cleanup hitter walked. Can you just send them?',
                choices: [
                  'Yes. Youth baseball copied the automatic intentional walk.',
                  'No. Both pathways still require four pitches outside the zone. There is no automatic intentional walk at these levels. Do not load the bases lightly — you are creating a force everywhere and a grand-slam look.',
                  'Yes if the catcher tells the umpire before the first pitch.'
                ],
                answer: 1,
                explain: 'The intentional walk in both pathways is four thrown balls. No automatic walk. Use it rarely: dominant hitter, first open, a force or double-play to set up. Loading them is a real cost. If you are only pitching around, 3–0 and 3–1 means the hitter should take.'
              },
              {
                id: 'multi-age-pitch-count',
                situation: 'A league-age 9 pitcher is rostered on an 11U team. The 11U daily max in this pathway is 75. A coach says “they’re on the 11U team, so 75 is fine, and the older kids throw 85.” What is the rule?',
                prompt: 'A league-age 9 pitcher is rostered on an 11U team. The 11U daily max in this pathway is 75. A coach says “they’re on the 11U team, so 75 is fine, and the older kids throw 85.” What is the rule?',
                choices: [
                  'Team division sets the cap. 11U means the 11U number.',
                  'Pitch-count limits follow the pitcher’s actual age or league age, not the team’s label. Apply the more conservative limit. A 9-year-old does not get an 11U or 10U bump because the roster says 11U.',
                  'Only Little League ages the pitcher; Baseball Canada uses the team U-division for everyone on the card.'
                ],
                answer: 1,
                explain: 'Both pathways: the pitcher’s age or league age, not the team name. Baseball Canada: if actual age sits on a lower grid, use the lower number. Little League Regulation VI: league-age 9 daily maximum is 75, even on a Minor or Major roster. Tracking the wrong grid is a rules violation and an arm-care failure.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'ROOTS, applied to the people in blue',
          body: [
            'ROOTS is Rules, Officials, Opponents, Teammates, Self. Officials are the O that coaches most often skip. They are part of the game, not the other team. Honoring the Game means you treat them that way when the call hurts.',
            'Players copy the adult in the third-base box. A sarcastic “blue” from you is a permission slip. A calm “time,” a real question, an accepted answer, and “thanks for umpiring” after a tight one is the lesson. That is also the better tactical move: a team that is still playing the next pitch beats a team that is performing outrage.',
            'Safe Sport is the floor: no humiliation, no intimidation, no public shaming of a player for a missed sign. The 24-hour rule is for parents; it is also a useful self-rule after a balk you disagreed with. The protest window is before the next pitch, not in the parking lot.'
          ]
        },
        {
          type: 'prose',
          heading: 'Four decisions, and the multi-age dugout',
          body: [
            'Pitching change: track visits and pitches as two clocks. Warm the next arm before the daily max, not during the at-bat that hits it. A second OBR visit in the inning is the change, whether you wanted it or not. Rest days run from the day of the game; “Friday feels like enough after Tuesday” is how you protest yourself.',
            'Infield in: runner on third, fewer than two outs, close and late — the run matters. You give up range to have a play at the plate. Do not bring them in when you can give the run, or when you need two. Pitch up in the zone; a grounder is the ball that scores even with four people on the grass.',
            'Blowouts, both ways. If you are winning big, get remaining mandatory-play outs in before a mercy rule ends it. Stop stealing. Stop expanding the zone for extra-base theatre. If you are losing big, the same participation clock is still running — bench players need their at-bats before the game is called. Per-inning run caps (SOLL Minor: 5, locally 4 in May) can end a half-inning while the side is still batting; sub with that in mind.',
            'Multi-age rosters are normal. Pitch counts still follow the child’s age, not the team’s U-number. Do not run a smaller ten-year-old into full-velocity live BP against a mature thirteen-year-old. Older players teach at stations; younger players are not “development pieces” who skip mandatory play. One shared pitch log with name, actual age, date, and total is the staff’s job.'
          ]
        },
        {
          type: 'terms',
          items: [
            'continuous-batting-order',
            'extra-hitter',
            'mandatory-play',
            're-entry',
            'indicator-system',
            'wipe-off',
            'protest',
            'roots',
            'intentional-walk',
            'infield-in'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Order jobs: 1 on-base, 2 table-setter, 3–5 RBI, 6 the best of the rest. Youth leagues with everyone batting still use those jobs; they do not excuse skipping participation.',
            'Little League regular season, traditional order: 6 defensive outs + 1 at-bat. Continuous order and tournament play change that. Baseball Canada championships: no minimum, 30-minute card, optional EH. 11U: equity starts and free offensive re-entry; no return to pitcher once removed.',
            'Signs must survive a twelve-year-old in a tight count. Indicator then live. Wipe-off. Change them when they are stolen.',
            'Only the manager talks to the umpire. Judgment is not protestable. Rule application is, before the next pitch, with $100 at BC championships. Contact with an umpire is an automatic ejection.',
            'Infield in when the run matters. Intentional walk is still four pitches. Blowouts: finish mandatory play before mercy, and stop manufacturing runs for the scoreboard.',
            'Officials are ROOTS. They are part of the game. The next pitch is the job.'
          ]
        }
      ],
      quizIds: ['q2001', 'q2002', 'q2003', 'q2004', 'q2005', 'q2006', 'q2007', 'q2008'],
      prev: 'ch19',
      next: 'ch21'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
