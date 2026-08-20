/* ===================================================================
   Homerun Learn to Play — curriculum-t6.js
   Tier 6 (Pro Mind) chapters 21–24. Registers onto HRL_CURRICULUM.
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
    /* ch21 — Reading the Game                                         */
    /* -------------------------------------------------------------- */
    {
      id: 'ch21',
      tier: 'promind',
      order: 21,
      title: 'Reading the Game',
      subtitle: 'Scorekeeping, the box score, and what a scorer decides',
      minutes: 14,
      objectives: [
        'After this chapter you can write the standard notation for common plays, including 6-4-3, 5-3, F8, K versus backwards-K, and U3.',
        'After this chapter you can keep a scorebook diamond, place the count, and track runs and RBI.',
        'After this chapter you can apply the ordinary-effort standard to a hit-versus-error decision and say why that call changes a pitcher’s ERA and a hitter’s average.',
        'After this chapter you can read a box score column by column and reconstruct the story of a game from the line score.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The numbers that write the play',
          body: [
            'The nine fielding positions are numbered so a play can be written as a sentence. Pitcher 1, catcher 2, first base 3, second base 4, third base 5, shortstop 6, left field 7, centre field 8, right field 9. Those are scoring numbers, not uniform numbers. A 6-4-3 is a shortstop-to-second-to-first double play. A player wearing 6 on their back might be the first baseman.',
            'The numbers travel with the position, not the person. If the shortstop and the second baseman swap for a pitch, the fielder now standing at shortstop is 6 on that play. Write what happened on the field, not who usually stands there.',
            'Once you can read the numbers, a scorebook stops being a private code. It is a compressed account of every batter, every runner, and every decision the official scorer made about what to call the play.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Position numbers, left to right',
          svg: 'positionGrid',
          opts: {
            title: 'Scoring numbers 1 through 9',
            desc: 'A reference card of the nine fielding positions with scoring number, abbreviation, and full name: pitcher 1, catcher 2, first base 3, second base 4, third base 5, shortstop 6, left field 7, centre field 8, right field 9.'
          },
          caption: 'Scoring numbers run pitcher (1) through right field (9). A 6-4-3 is shortstop to second to first. F8 is a fly out to centre. U3 is an unassisted putout by the first baseman.'
        },
        {
          type: 'prose',
          heading: 'The notation for every common play',
          body: [
            'Putouts name the fielders who handled the ball, in order, joined by hyphens. 5-3 is a ground out, third to first. 4-6-3 is a double play started by the second baseman. U3 is unassisted: the first baseman fielded it and stepped on the bag, or caught a line drive, with no throw. Fly outs take F plus the position: F8, F7, F9. Some books write 8 for the same centre-field fly; F8 is unambiguous.',
            'Strikeouts split. K is a swinging strikeout. A backwards-K (ꓘ) is a called third strike. Write the distinction; it is the difference between a hitter who offered and a hitter who took. A walk is BB. Hit by pitch is HP or HBP. A wild pitch is WP; a passed ball is PB; a balk is BK.',
            'Hits are 1B, 2B, 3B, HR. Sacrifice flies are SF; sacrifice bunts are SH or SAC. Stolen bases are SB; caught stealing is CS. Errors take E plus the position: E5 is an error on the third baseman. Fielder’s choice is FC, often with the play that was attempted (FC 6-4). The book is a language. Use the same words every time.'
          ]
        },
        {
          type: 'steps',
          heading: 'Keeping a scorebook',
          items: [
            {
              title: 'One diamond per at-bat',
              body: 'Each batter’s box in the book has a small diamond. Draw the line to first on a single, around to second on a double, and so on. A filled diamond is a run scored. The convention is the same whether you use a printed book or a scoresheet app: the diamond is the at-bat, not the inning.'
            },
            {
              title: 'Runs and RBI',
              body: 'When a runner scores, fill that runner’s diamond and mark R in the batter’s line if you track it there. Credit RBI to the batter who drove the run in — a hit, a fly out, a ground out with fewer than two outs, a walk with the bases loaded. Do not credit RBI on a double play or when the run scores on an error the batter did not force. The scorer, not the cheer from the stand, decides.'
            },
            {
              title: 'Count and pitch count',
              body: 'Balls and strikes for the current at-bat live in a corner of that batter’s box — a small 2-1 or 3-2. Pitch count is a separate running tally on the pitcher’s line, pitch by pitch, including fouls and balls in play. Do not confuse the at-bat count with the pitcher’s pitch count. They answer different questions.'
            },
            {
              title: 'The defensive numbering in the box',
              body: 'When the at-bat ends, write the play in the box: 6-4-3, F8, K, E5, FC 6-4. If you wait until the inning is over, you will invent. Write it while the fielders are still walking the ball in.'
            }
          ]
        },
        {
          type: 'compare',
          heading: 'Same hop, two rulings',
          left: {
            title: 'Scored a hit',
            items: [
              'A one-hop smash down the third-base line. The third baseman gets leather on it; the ball caroms into foul territory; the batter reaches first.',
              'Ordinary effort does not mean “a professional would have caught it.” It means a play that infielder, at that level, is expected to handle cleanly most of the time.',
              'This is a hit. The pitcher is charged with a baserunner and, if the run later scores as an earned run, with that earned run. The hitter’s average goes up.'
            ]
          },
          right: {
            title: 'Scored an error',
            items: [
              'A routine hopper at the third baseman. The fielder charges, the ball goes through the legs, the batter reaches first.',
              'Ordinary effort was there to be made. The scorer rules E5. The batter is not credited with a hit. The at-bat still counts.',
              'If that runner later scores, the run is unearned unless it would have scored anyway. The pitcher’s ERA does not take the run. The hitter’s average does not take the hit. The scorer’s judgment moved both numbers.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Fielder’s choice, and why the scorer’s call is not decoration',
          body: [
            'Fielder’s choice is the play where a fielder, with a chance to retire the batter-runner, instead tries to retire a preceding runner, and the batter-runner reaches. Classic: runner on first, ground ball to shortstop, throw to second for the force, batter beats the relay to first. That is FC 6-4, not a hit. The batter is charged with an at-bat and no hit.',
            'Hit versus error versus fielder’s choice is the official scorer’s judgment. The rule of thumb is ordinary effort: would a fielder at this level, making a routine play, be expected to convert it? A diving stop that a player gets a glove on and cannot control is a hit. A ball that should have been caught with two hands at the chest is an error.',
            'The call is not cosmetic. A hit raises batting average and, if the run scores, can raise earned runs against the pitcher. An error withholds the hit and, in most cases, withholds the earned run. ERA and batting average both move on a scorer’s opinion of one hop. That is why serious people argue about it, and why you should know what you are looking at when you read a box.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Score the play',
          widget: 'scoreThePlay',
          intro: 'Read the play. Produce the scorekeeping notation. Use the position numbers, E, FC, K, ꓘ, F, U, and hyphens. Two of these are hit-versus-error judgment calls; one is a fielder’s choice. Ordinary effort is the test, not highlight-reel difficulty.',
          opts: {
            cases: [
              {
                id: 'dp-643',
                description: 'Runner on first, fewer than two outs. Ground ball to the shortstop. Shortstop throws to the second baseman covering the bag for the force; the second baseman throws to first in time to retire the batter-runner. Double play.',
                answer: '6-4-3',
                accept: ['6-4-3', '643', '6-4-3 DP', 'DP 6-4-3', 'DP6-4-3'],
                explain: '6 is the shortstop, 4 is the second baseman, 3 is the first baseman. Write the fielders who handled the ball, in order. The double-play label is optional; 6-4-3 already tells the story.'
              },
              {
                id: 'go-53',
                description: 'Nobody on. Ground ball to the third baseman, who fields it cleanly and throws to first in time.',
                answer: '5-3',
                accept: ['5-3', '53'],
                explain: 'Third base is 5, first base is 3. A routine ground out is the two numbers and a hyphen.'
              },
              {
                id: 'fly-f8',
                description: 'Fly ball to centre field. The centre fielder camps under it and catches it.',
                answer: 'F8',
                accept: ['F8', 'F-8', '8', 'FO8', 'FO 8'],
                explain: 'Centre field is 8. F8 is a fly out to centre. A bare 8 is used in some books; F8 is clearer when you are learning the language.'
              },
              {
                id: 'k-swinging',
                description: 'Two strikes. The batter swings through a pitch in the dirt. The catcher holds it. The batter is out.',
                answer: 'K',
                accept: ['K', 'SO', 'Ks'],
                explain: 'K is a swinging strikeout. Save the backwards-K for a called third strike. The catcher holding the ball is why the batter is simply out, not running on a dropped third strike.'
              },
              {
                id: 'backwards-k',
                description: 'Two strikes. The batter takes a pitch on the outside corner. The umpire rings them up. The batter never offered.',
                answer: 'ꓘ',
                accept: ['ꓘ', 'Kc', 'CK', '-K', 'K-looking', 'backward K', 'backwards K'],
                explain: 'A called third strike is a backwards-K (ꓘ). Some books write Kc. The distinction is the point: this hitter was called out looking, not swinging.'
              },
              {
                id: 'u3',
                description: 'Nobody on. Line drive at the first baseman, who catches it in the air without a throw.',
                answer: 'U3',
                accept: ['U3', '3U', '3'],
                explain: 'U3 is an unassisted putout by the first baseman. The 3 handled it alone. A bare 3 appears in some books; U3 makes the unassisted part explicit.'
              },
              {
                id: 'error-e5',
                description: 'Nobody on. A routine hopper straight at the third baseman. The fielder charges, the ball goes through the legs, and the batter reaches first. A third baseman at this level is expected to handle that ball with ordinary effort.',
                answer: 'E5',
                accept: ['E5', 'E-5', 'E 5'],
                explain: 'This is an error on the third baseman, E5. Ordinary effort was available. The batter is not credited with a hit. If that runner later scores, the run is unearned unless it would have scored on the play anyway.'
              },
              {
                id: 'hit-not-error',
                description: 'Nobody on. A one-hop smash down the third-base line. The third baseman gets a glove on it; the ball caroms into foul territory; the batter reaches first standing. This is not a play that infielder is expected to convert cleanly most of the time.',
                answer: '1B',
                accept: ['1B', 'H', 'S', 'single', '1b'],
                explain: 'This is a hit, not an error. Getting leather on a smash is not ordinary-effort conversion. The hitter’s average takes the single; the pitcher is charged with a baserunner. Same neighbourhood as the E5 hopper; different ruling, because ordinary effort is the test.'
              },
              {
                id: 'fc-64',
                description: 'Runner on first, one out. Ground ball to the shortstop. The shortstop throws to the second baseman covering for the force at second; the runner from first is out. The batter-runner reaches first as the throw goes to second rather than to first.',
                answer: 'FC 6-4',
                accept: ['FC 6-4', 'FC6-4', 'FC-6-4', '6-4 FC', '6-4FC', 'FC64', '6-4'],
                explain: 'Fielder’s choice, 6-4. The defence chose the preceding runner. The batter reached because of that choice, not because the ball was a hit. Charge the batter with an at-bat and no hit.'
              },
              {
                id: 'fly-f9',
                description: 'Fly ball to right field. The right fielder settles and catches it.',
                answer: 'F9',
                accept: ['F9', 'F-9', '9', 'FO9', 'FO 9'],
                explain: 'Right field is 9. F9 is a fly out to right, the mirror of F8 in centre and F7 in left.'
              }
            ]
          }
        },
        {
          type: 'diagram',
          heading: 'One game, as a spray chart',
          svg: 'sprayChart',
          opts: {
            title: 'Batted-ball profile from a completed game (illustrative)',
            desc: 'A field outline with illustrative batted balls plotted by type and outcome, including one error at third base, several outs, and extra-base contact to left.',
            showZones: true,
            points: [
              { x: 0.38, y: 0.22, type: 'ground', outcome: 'out' },
              { x: 0.22, y: 0.28, type: 'ground', outcome: 'error', label: 'E5' },
              { x: 0.78, y: 0.48, type: 'line', outcome: 'hit' },
              { x: 0.50, y: 0.72, type: 'fly', outcome: 'out' },
              { x: 0.68, y: 0.16, type: 'pop', outcome: 'out' },
              { x: 0.22, y: 0.62, type: 'fly', outcome: 'hit', label: '2B' },
              { x: 0.62, y: 0.24, type: 'ground', outcome: 'out' },
              { x: 0.50, y: 0.42, type: 'line', outcome: 'out' },
              { x: 0.80, y: 0.30, type: 'ground', outcome: 'hit' },
              { x: 0.32, y: 0.55, type: 'fly', outcome: 'out' }
            ]
          },
          caption: 'A box score tells you that a team had seven hits and one error. A spray chart of the same game tells you where the contact went, which outs were air versus ground, and that the error was a ball through the third baseman. The box is the ledger. The spray is the shape of the contact. Both are readings of one game, not a scouting report on a player.'
        },
        {
          type: 'prose',
          heading: 'The box score, column by column',
          body: [
            'A batting line is a row of abbreviations. AB is at-bats: official times the hitter completed a turn that was not a walk, hit-by-pitch, sacrifice, or catcher’s interference. R is runs scored. H is hits. RBI is runs batted in. BB is walks. SO is strikeouts. Extra-base columns, when they appear, split the hits: 2B, 3B, HR. SB is stolen bases. AVG in a box is usually the season figure coming in, not the game — read the header.',
            'A pitching line answers a different set of questions. IP is innings pitched, in outs: 5.2 is five innings and two outs, not five and two-tenths. H, R, ER (earned runs), BB, SO, and sometimes HR. ERA on a game line is usually the season figure. The game’s own story sits in IP, H, R, ER, BB, SO for that day.',
            'Team totals at the bottom should add. If the hits in the batting lines do not match the hits in the pitching line against, someone missed a scorer’s decision. Start there when a box looks wrong.'
          ]
        },
        {
          type: 'example',
          heading: 'Reading a line score',
          body: [
            'The line score is the innings across the top, runs in each inning, then the R / H / E totals. Suppose visitors 0 0 2 0 1 0 0 — 3 7 1, and home 0 1 0 0 0 0 1 — 2 6 2, in a seven-inning youth game.',
            'Visitors scored two in the third and one in the fifth, seven hits, one error. Home scored one in the second and one in the seventh, six hits, two errors, and lost by a run. The game was low-scoring. Home had a chance in the last inning and did not tie it. The extra error on the home side is a place to look if you want to know whether an unearned run sat inside the visitors’ three.',
            'You cannot reconstruct every at-bat from a line score. You can reconstruct the weather of the game: when the runs landed, who had more contact, who gave extra outs, and whether the last inning was a formality or a fight. Combined with the box, that is enough to talk about the game as if you had been there.'
          ]
        },
        {
          type: 'terms',
          items: [
            'position-numbers',
            'scorebook',
            'box-score',
            'line-score',
            'ordinary-effort',
            'error',
            'fielders-choice',
            'earned-run',
            'unearned-run',
            'rbi',
            'unassisted',
            'called-strikeout'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Scoring numbers: 1 pitcher, 2 catcher, 3 first, 4 second, 5 third, 6 shortstop, 7 left, 8 centre, 9 right. They travel with the position on that play.',
            'Write the fielders who handled the ball, in order: 6-4-3, 5-3, F8, U3. K is swinging; ꓘ is looking.',
            'One diamond per at-bat. Count in the corner. Pitch count on the pitcher’s line. Runs and RBI are scorer decisions, not crowd decisions.',
            'Hit versus error uses ordinary effort. The same hop can move a hitter’s average and a pitcher’s ERA in opposite directions.',
            'Fielder’s choice is not a hit. The defence chose a preceding runner; the batter reached because of that choice.',
            'The box score is the ledger. The line score is the weather of the game. A spray chart is the shape of the contact. None of them is a scouting report by itself.'
          ]
        }
      ],
      quizIds: ['q2101', 'q2102', 'q2103', 'q2104', 'q2105', 'q2106', 'q2107', 'q2108'],
      prev: 'ch20',
      next: 'ch22'
    },

    /* -------------------------------------------------------------- */
    /* ch22 — Analytics Foundations                                    */
    /* -------------------------------------------------------------- */
    {
      id: 'ch22',
      tier: 'promind',
      order: 22,
      title: 'Analytics Foundations',
      subtitle: 'What each number answers, and what it hides',
      minutes: 16,
      objectives: [
        'After this chapter you can state the question each of AVG, OBP, SLG, OPS, BABIP, wOBA, wRC+, ERA, FIP, WHIP, and WAR is answering.',
        'After this chapter you can name what each of those numbers hides, and what kind of sample it needs before it means anything.',
        'After this chapter you can rank two hitters differently by AVG than by OBP and say which ranking answers the more useful question.',
        'After this chapter you can explain why almost no youth-baseball sample is large enough for these metrics, and why skill progression is the better evaluation frame.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Climb the ladder',
          body: [
            'Every offensive statistic exists because the one before it left something out. Batting average cannot see a walk. On-base percentage cannot tell a walk from a home run. Slugging weights extra bases, but the weights are a convenience, not a theory. OPS adds two numbers that were not built to be added. Each step is an answer to a limitation. None of them is the truth of a player.',
            'Read every number as a question, then ask what it hides, then ask how much of a sample you need before the answer is anything but weather. A figure presented without those three is not analysis. It is a caption.',
            'The figures in this chapter are labelled illustrations. League-average on-base percentage, wOBA weights, park factors, and WAR coefficients change every season and are not a fact you should memorise from a curriculum. The shape and the purpose of the statistic are what travel.'
          ]
        },
        {
          type: 'prose',
          heading: 'AVG, OBP, SLG, OPS',
          body: [
            'Batting average (AVG) is hits divided by at-bats. The question it answers: when this batter was charged with an official at-bat, how often did they get a hit? It hides walks, hit-by-pitches, and sacrifices entirely — those are not at-bats. It also treats a single and a home run as equal. A .300 average in a few dozen at-bats is a story, not a skill. You want hundreds of at-bats before you talk as if you know.',
            'On-base percentage (OBP) is how often the batter avoids making an out: hits, walks, and hit-by-pitches over plate appearances (with sacrifice flies in the denominator). The question: how often did this batter not make an out? That is the single most important simple offensive number, because outs are the clock. It hides the difference between a walk and a home run. A .320 on-base percentage is roughly league-average in many professional contexts; treat that as a labelled illustration, not this year’s table.',
            'Slugging percentage (SLG) is total bases per at-bat, with a single worth one, a double two, a triple three, and a home run four. The question: how much extra-base value did this batter produce when they did not walk? It hides walks. Its weights are arbitrary: a double is not worth exactly two singles in run value. OPS is OBP plus SLG — a rough, convenient sum of two things measured on different scales. Useful as a quick mix. Not principled. Do not build a worldview on it.'
          ]
        },
        {
          type: 'compare',
          heading: 'Two hitters, two rankings',
          left: {
            title: 'Avery — the average looks louder',
            items: [
              'Illustrative line: .310 AVG, .330 OBP, .420 SLG. Plenty of hits. Almost no walks.',
              'Ranked by batting average, Avery is the better hitter of the two. Ranked by on-base percentage, Avery is not.',
              'What AVG is answering here: this batter, when they swing and put the ball in play or strike out, gets a lot of hits. What it is hiding: Avery makes an out more often than Blake, because Blake’s walks never enter the average.'
            ]
          },
          right: {
            title: 'Blake — the out-avoider',
            items: [
              'Illustrative line: .255 AVG, .385 OBP, .400 SLG. Fewer hits. A real walk rate.',
              'Ranked by on-base percentage, Blake is the better offensive player of the two. Ranked by batting average, Blake looks ordinary.',
              'OBP is answering the more useful question: how often does this batter avoid handing the defence an out? In most lineups, Blake is the one you want at the top. AVG would have you take Avery. That is the limitation the ladder was built to climb.'
            ]
          }
        },
        {
          type: 'diagram',
          heading: 'What different stats say about the same two players',
          svg: 'bar',
          opts: {
            title: 'Avery vs Blake (illustrative; AVG and OBP × 1000)',
            desc: 'A horizontal bar chart of illustrative batting average and on-base percentage for two fictional players, showing that the player with the higher average has the lower on-base percentage.',
            max: 400,
            series: [
              { label: 'Avery AVG', value: 310, note: 'Looks louder by batting average' },
              { label: 'Blake AVG', value: 255, note: 'Fewer hits' },
              { label: 'Avery OBP', value: 330, note: 'Almost no walk rate' },
              { label: 'Blake OBP', value: 385, note: 'Avoids making an out' }
            ]
          },
          caption: 'Illustrative only — not real players and not this year’s league table. Avery wins the average. Blake wins the on-base percentage. If your question is “who makes fewer outs?”, Blake is the answer and AVG pointed at the wrong person. That is the whole lesson of the first four rungs.'
        },
        {
          type: 'prose',
          heading: 'BABIP, wOBA, wRC+',
          body: [
            'BABIP is batting average on balls in play: hits other than home runs, over at-bats that were not strikeouts or home runs (sacrifice flies included in the usual form). The question: of the balls this batter put into the field of play, how often did they fall for hits? Its main use is as a luck and sample-size flag, not as a skill you should pay for. True talent BABIP differences exist — speed, spray, how hard the ball is hit — but a month of BABIP is mostly weather. A sudden spike or crash in BABIP is a reason to wait, not a reason to rewrite the scouting report.',
            'wOBA (weighted on-base average) weights each plate-appearance outcome by its run value, then scales the number so it sits near the on-base scale. The question: what was the properly weighted offensive value of this player’s plate appearances? It hides park and league context until you step to the plus version, and the weights themselves are re-fit every season. Do not memorise last year’s coefficients as law. They are not in this book because they should not be.',
            'wRC+ (weighted runs created plus) takes that offensive value, adjusts for park and league, and indexes it so 100 is average. 120 means about 20 percent above average; 80 means about 20 percent below. The question: how many runs did this batter create relative to league and park? It hides defence. It hides, depending on the exact implementation, some of baserunning. It still needs a large sample. It is the cleanest single offensive index most people will meet. It is not a player.'
          ]
        },
        {
          type: 'prose',
          heading: 'ERA, FIP, WHIP, WAR',
          body: [
            'ERA is earned runs per nine innings. The question: how many earned runs did this pitcher allow per nine? It hides unearned runs — which means it hides the official scorer’s hit-versus-error opinions from Chapter 21. It hides the defence behind the pitcher, sequencing, and luck on balls in play. A pitcher can pitch well into a .350 BABIP month and look broken on ERA.',
            'FIP (fielding independent pitching) exists because of that. It asks: what would this pitcher’s run prevention look like if we counted only strikeouts, walks, hit-by-pitches, and home runs — the outcomes a pitcher most controls? It hides balls in play, sequencing, and actual runs allowed. A FIP that is much better than ERA is a flag that the defence, the sequencing, or the luck may be doing the pitcher dirt. It is not a promise of next month’s ERA. WHIP is walks plus hits per inning. The question: how many baserunners via hit or walk did this pitcher allow per inning? It hides extra-base damage, how those runners scored, and (in the usual form) hit-by-pitches.',
            'WAR (wins above replacement) is trying to be one number for all contributions — offence, defence, baserunning, position, playing time — versus a freely available replacement player, the sort of player you can call up or sign off the street. Versions disagree. FanGraphs, Baseball-Reference, and Baseball Prospectus do not use the same defensive inputs, the same replacement level, or the same park treatment. That disagreement is not a scandal. It is the honest state of the art. A 1.0-win gap between two versions is a difference in method. A 0.5-win gap between two players is, in most seasons, noise. Do not hire, fire, or rank a roster on the third decimal of WAR.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Sample size is the honest part',
          svg: 'timeline',
          opts: {
            title: 'When a number starts to mean something (schematic)',
            desc: 'A horizontal timeline of sample-size checkpoints from a handful of plate appearances through multiple seasons, showing that batting average in a tiny sample is weather and that defensive metrics need years.',
            highlight: 0,
            items: [
              { label: '30 plate appearances', sub: 'A .400 average is weather', marker: '30' },
              { label: 'One youth season', sub: 'Still too small for skill', marker: 'Yth' },
              { label: 'A full adult season', sub: 'Offence starts to settle', marker: '1' },
              { label: 'Several seasons', sub: 'Defence and WAR gaps can be real', marker: '3+' }
            ]
          },
          caption: 'Schematic, not a published threshold. Thirty at-bats at .400 tells you almost nothing: a handful of hits is a hot week. One youth season is still a small sample. Offensive rates in a full adult season start to be about the player. Defensive metrics and the defensive half of WAR often need multiple seasons before a difference is more than method plus luck. Almost no youth-baseball sample ever reaches the third mark.'
        },
        {
          type: 'interactive',
          heading: 'Match the question, then read what it hides',
          widget: 'statMatch',
          intro: 'Match each statistic to the question it actually answers. The traps are the common misreadings — BABIP as a skill, OPS as a theory, a two-week average as a true talent. After a correct match, read the hide line. That line is the point of the exercise.',
          opts: {
            pairs: [
              {
                stat: 'AVG',
                question: 'When this batter was charged with an at-bat, how often did they get a hit?',
                hides: 'Walks, hit-by-pitches, and sacrifices never enter. A single and a home run count the same. A few dozen at-bats are weather.'
              },
              {
                stat: 'OBP',
                question: 'How often did this batter avoid making an out?',
                hides: 'A walk and a home run count the same. Out-avoiding is the question; extra-base value is not.'
              },
              {
                stat: 'SLG',
                question: 'How many total bases did this batter produce per at-bat?',
                hides: 'Walks are invisible. The 1-2-3-4 weights are a convenience: a double is not worth exactly two singles in run value.'
              },
              {
                stat: 'OPS',
                question: 'What is a convenient one-number mix of getting on and hitting for extra bases?',
                hides: 'OBP and SLG are on different scales. Adding them is useful and not principled. Do not treat the sum as a theory of offence.'
              },
              {
                stat: 'BABIP',
                question: 'Of balls put in play, how often did they fall for hits?',
                hides: 'In a small sample this is mostly luck and sequencing, not a skill you should pay for. Use it as a flag, not a ranking.'
              },
              {
                stat: 'wOBA',
                question: 'What was the properly weighted offensive value of this player’s plate appearances?',
                hides: 'Park and league context are still in the number until you go to a plus version. The weights are re-fit every season; do not memorise them.'
              },
              {
                stat: 'wRC+',
                question: 'How many runs did this batter create relative to league and park, with 100 as average?',
                hides: 'Defence is not in it. Baserunning may be only partly in it. A large sample is still required. 100 is average, not a ranking of 100 players.'
              },
              {
                stat: 'ERA',
                question: 'How many earned runs did this pitcher allow per nine innings?',
                hides: 'Unearned runs (a scorer’s opinion), the defence behind the pitcher, sequencing, and luck on balls in play.'
              },
              {
                stat: 'FIP',
                question: 'What would this pitcher’s run prevention look like using only strikeouts, walks, hit-by-pitches, and home runs?',
                hides: 'Balls in play, sequencing, and actual runs allowed. A FIP–ERA gap is a flag, not a promise.'
              },
              {
                stat: 'WHIP',
                question: 'How many baserunners via hit or walk did this pitcher allow per inning?',
                hides: 'Extra-base damage, how those runners scored, and (in the usual form) hit-by-pitches.'
              },
              {
                stat: 'WAR',
                question: 'How many wins was this player worth compared with a freely available replacement?',
                hides: 'Versions disagree on defence, replacement level, and park. Gaps of a few tenths of a win are noise. It is a framework, not an official league statistic.'
              },
              {
                stat: 'Defensive metrics (UZR / DRS and kin)',
                question: 'How many runs did this defender save relative to average, after the usual positional adjustments?',
                hides: 'The inputs are noisy, the methods disagree, and even adult samples often need multiple seasons. Youth innings never get there. This is the most contested family on the ladder.'
              }
            ],
            traps: [
              {
                question: 'How hard does this hitter hit the ball?',
                lure: 'BABIP',
                explain: 'BABIP is hits on balls in play. Hard contact is one ingredient of true-talent BABIP, but a month of BABIP is mostly luck. Exit velocity and extra-base rate are better hardness questions — and even those need a sample.'
              },
              {
                question: 'What is the theoretically correct way to add getting on and extra-base hitting?',
                lure: 'OPS',
                explain: 'OPS is a convenience. OBP and SLG are on different scales. wOBA is the attempt at proper weights. OPS remains useful as a quick mix; it is not a theory.'
              },
              {
                question: 'This hitter is a true .400 hitter after 30 at-bats. Which number proved it?',
                lure: 'AVG',
                explain: 'Thirty at-bats at .400 is a hot week. Batting average does not become a skill estimate in a handful of official at-bats. Wait. Then wait more.'
              },
              {
                question: 'Which official league statistic adds up every contribution into one agreed number?',
                lure: 'WAR',
                explain: 'WAR is not an official league statistic, and the versions do not agree. Treating fWAR, bWAR, and WARP as interchangeable is the misreading. Small differences are method plus noise.'
              },
              {
                question: 'What did this pitcher fully control last month?',
                lure: 'ERA',
                explain: 'ERA is earned runs allowed, which includes defence, sequencing, scorer decisions on errors, and luck on balls in play. FIP exists because ERA is not a control statement.'
              },
              {
                question: 'How many runs did this pitcher actually allow, counting only what they control?',
                lure: 'FIP',
                explain: 'FIP does not count actual runs. It estimates what run prevention would look like from strikeouts, walks, hit-by-pitches, and home runs. Actual runs live in R and in ERA.'
              },
              {
                question: 'Which is the most complete simple offensive number, the one that already includes walks and extra bases fairly?',
                lure: 'AVG',
                explain: 'AVG includes neither walks nor extra-base weights. OBP includes walks and still hides extra bases. wOBA is the attempt to weight outcomes fairly. AVG is the bottom of the ladder, not the top.'
              },
              {
                question: 'A wRC+ of 100 means this batter ranks in the top 100. True under which stat?',
                lure: 'wRC+',
                explain: '100 is average, by construction. 120 is about 20 percent above average. It is an index, not a leaderboard position.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'None of this replaces watching a player',
          body: [
            'A well-built number is a question you can ask the same way every time. It is not a substitute for standing on the line and seeing whether the swing decisions are real, whether the defender’s first step is late, whether the pitcher can throw the changeup for a strike when behind. The number without the look is a spreadsheet cosplaying as a scout.',
            'The look without the number has its own failure mode: the last at-bat, the familiar surname, the early-maturing 12-year-old who is dominating peers who have not hit their growth spurt. Independent scores on a sheet, taken before the conversation, are how you keep the look honest. That is evaluation, not analytics-as-identity.',
            'If you have to choose, for a youth player, choose the look plus a skill checklist. The sample will not carry a WAR. It will barely carry an on-base percentage. Watch the player. Write down the tools. Come back in six months and watch again.'
          ]
        },
        {
          type: 'prose',
          heading: 'Why youth baseball does not live here',
          body: [
            'A .400 average in 30 at-bats means very little. The interval around that number is enormous. One week of lined-out hard contact, or one week of infield bleeders, will move it by a hundred points. Publishing it on a showcase profile as if it were a skill is a category error.',
            'Defensive metrics need multiple seasons of adult playing time before a difference is more than method plus luck. Analysts contest the methods openly: different inputs, different positional adjustments, different ideas of what “average” even is with a glove. That contest is healthy. Pretending the number is settled is not.',
            'Almost no youth-baseball sample is large enough for any of this — which is exactly why the knowledge base’s development framework is built on skill progression rather than results. The hitting roadmap runs tee to soft toss to live, with named skills at each age band and a list of what not to teach yet. Evaluate the skill. The box score will still be there when the sample grows up.'
          ]
        },
        {
          type: 'terms',
          items: [
            'batting-average',
            'on-base-percentage',
            'slugging-percentage',
            'ops',
            'babip',
            'woba',
            'wrc-plus',
            'era',
            'fip',
            'whip',
            'war',
            'sample-size',
            'plate-appearance',
            'at-bat'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Every stat answers a question. AVG: hits per at-bat. OBP: how often the batter avoided an out — the most important simple offensive number. SLG: total bases per at-bat, with arbitrary weights. OPS: a convenient, unprincipled sum.',
            'BABIP is a luck and sample-size flag, not a skill ranking. wOBA weights outcomes properly; the weights change every season. wRC+ is park- and league-adjusted offence with 100 as average.',
            'ERA is earned runs per nine and hides defence, sequencing, and the scorer. FIP exists to look at strikeouts, walks, hit-by-pitches, and home runs. WHIP is baserunners via hit or walk per inning.',
            'WAR is wins versus a freely available replacement. Versions disagree. Small differences are noise.',
            'Thirty at-bats at .400 is weather. Defence needs years. Youth samples almost never get there. Watch the player; progress the skill; do not let a small number impersonate a scouting report.'
          ]
        }
      ],
      quizIds: ['q2201', 'q2202', 'q2203', 'q2204', 'q2205', 'q2206', 'q2207', 'q2208'],
      prev: 'ch21',
      next: 'ch23'
    },

    /* -------------------------------------------------------------- */
    /* ch23 — Scouting & Player Development                            */
    /* -------------------------------------------------------------- */
    {
      id: 'ch23',
      tier: 'promind',
      order: 23,
      title: 'Scouting & Player Development',
      subtitle: 'The five tools, the 20–80 scale, and projection',
      minutes: 16,
      objectives: [
        'After this chapter you can name the five tools for position players and the pitcher equivalents.',
        'After this chapter you can place a tool on the 20–80 scale, stating that 50 is major-league average and each 10 points is one standard deviation, and distinguish present from future grades.',
        'After this chapter you can say what velocity, spin rate, induced vertical break, and extension actually measure, and why velocity alone is a poor predictor.',
        'After this chapter you can explain why a 14-year-old’s current results are a weak projection signal, and what a fair youth tryout should actually measure.',
        'After this chapter you can map a player onto the LTAD stages and the Canadian pathway from grassroots through to higher levels.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'The five tools, and the pitcher equivalents',
          body: [
            'Position players are scouted on five tools: hit, power, run, field, and throw. Hit is the ability to make contact and produce batting average / on-base skill against good pitching — barrel control, swing decisions, not just a pretty swing in batting practice. Power is extra-base impact, including over-the-fence power. Run is straight-line speed and how it plays on the bases. Field is range, hands, and instincts at the position. Throw is arm strength and accuracy.',
            'Pitchers are not graded on those five. The usual equivalents are the fastball (the primary pitch as a weapon), the secondary pitches (breaking ball and changeup as a set), command (strikes to the intended spot, not merely strikes), and delivery / durability (whether the operation will hold innings, and whether the body can take a starter’s load). A pitcher with a plus fastball and nothing else is a different prospect from a pitcher with average stuff and plus command.',
            'Tools are observed skills, not last Tuesday’s box score. A 14-year-old who went 4-for-4 against 11U pitching has not demonstrated a hit tool. They have demonstrated a result in a sample that cannot carry the word.'
          ]
        },
        {
          type: 'diagram',
          heading: 'The 20–80 scale',
          svg: 'scaleGauge',
          opts: {
            title: '20–80 scouting scale — 50 is major-league average',
            desc: 'The 20 to 80 scouting scale as a horizontal dial, with 50 marked as MLB average, a filled marker at 50 present, and an open compare marker at 60 future.',
            value: 50,
            compare: 60,
            label: '50 present · 60 future (illustrative)'
          },
          caption: '50 is major-league average, not “average person” and not “average 13-year-old.” Each 10 points is one standard deviation. Grades are usually given in fives (45, 50, 55). The filled marker is present; the open marker is a future grade on the same tool. A 50/60 and a 60/60 are not the same player.'
        },
        {
          type: 'prose',
          heading: 'Present, future, and what the numbers actually mean',
          body: [
            'The scale runs 20 to 80. 50 is major-league average. 60 is one standard deviation above that average (plus). 70 is two above (plus-plus). 80 is three above — the handful of tools in a generation. Below: 40 is one standard deviation below, 30 is two, 20 is three. Scouts grade in five-point steps. A 45 is fringe-average; a 55 is a tick above average. 50 is not a compliment at a youth tryout. It is a professional reference point that almost no 12-year-old should be expected to sit on today.',
            'Every tool gets a present grade and a future grade. Present is what the tool is, today, against the professional scale. Future is what the scout thinks the tool can be when the body, the instruction, and the innings have done their work — usually a major-league projection, not “next summer.” A 45 present / 60 future hit tool is a player who does not hit like a big-leaguer now and might hit plus if the projection lands. A 60 present / 60 future is a player whose hit tool already is plus and is not being bought for growth.',
            'Those two players require different plans. The first needs development time, a position that will still have value if the hit tool only gets to 50, and an honest conversation about risk. The second needs innings against better pitching, not a winter of being told they are a project. Collapsing present and future into one number is how organisations mis-rank their own lists.'
          ]
        },
        {
          type: 'compare',
          heading: 'Same tool, two futures',
          left: {
            title: '45 present / 60 future',
            items: [
              'What you see today is below major-league average. What you are buying is growth: frame, athleticism, and a rate of improvement that makes plus possible.',
              'This player can look ordinary, even behind, against older or early-maturing peers. That is not the same thing as a 45 future.',
              'The risk is real. Future grades miss. A 60 future that lands at 50 is a useful big-leaguer or a near-miss, not a star. Plan the path as if the future has to be earned.'
            ]
          },
          right: {
            title: '60 present / 60 future',
            items: [
              'What you see today already is plus. The future grade says the scout does not expect more growth on this tool — or does not need it.',
              'This player is not a “projection play.” They need better competition, not a longer runway to become themselves.',
              'The risk is different: a 60 that was inflated by weak competition or by a body that matured early. Present grades on teenagers still have to survive better pitching. Plus today against 14U is not plus on a 20–80 scale unless you meant the professional scale and were careful.'
            ]
          }
        },
        {
          type: 'prose',
          heading: 'Pitch metrics: what each one measures',
          body: [
            'Velocity is the speed of the pitch, usually at release or just after. It is the easiest number in the sport to put on a radar gun and the poorest single predictor of who will pitch in the big leagues. Plenty of hard throwers cannot command it, cannot land a second pitch, or cannot hold the velocity into the fifth inning. Plenty of average-velocity pitchers miss bats with shape, command, and sequencing.',
            'Spin rate is how fast the ball is rotating, in revolutions per minute. It is not “good” by itself. Spin is a description of the rotation; what it does to the pitch depends on spin axis, velocity, and what the hitter sees. Induced vertical break is how much the pitch moves in the vertical plane relative to a spinless ball that is only dropping with gravity. A fastball with more induced vertical break plays “up”; a breaking ball’s vertical break is a different conversation. Extension is how far in front of the rubber the pitcher releases the ball. More extension means the ball travels less distance to the plate from the hitter’s perspective — perceived velocity, not a second radar reading.',
            'Velocity without the rest is a poor predictor. A youth radar reading is a poorer one still: bodies change, arms fill in, and a 14-year-old’s velocity projection is one of the most contested claims in amateur evaluation. State the number. State the sample. Do not write a professional future on a single bullpen.'
          ]
        },
        {
          type: 'diagram',
          heading: 'LTAD stages, mapped to the Canadian pathway',
          svg: 'timeline',
          opts: {
            title: 'Long-Term Athlete Development — Baseball Canada stages',
            desc: 'A horizontal timeline of Baseball Canada LTAD stages from Active Start through Train to Compete, with approximate ages and the matching youth pathway.',
            highlight: 2,
            items: [
              { label: 'Active Start', sub: 'Ages 0–6 · Tee Ball / Rally Cap', marker: '1' },
              { label: 'FUNdamentals', sub: 'Ages 6–9 · Rally Cap / coach-pitch', marker: '2' },
              { label: 'Learn to Train', sub: 'Ages 8–12 · 11U / LL Major', marker: '3' },
              { label: 'Train to Train', sub: 'Ages 12–16 · 13U–15U', marker: '4' },
              { label: 'Train to Compete', sub: 'Ages 16–23 · 18U / Canada Cup', marker: '5' }
            ]
          },
          caption: 'Baseball Canada’s LTAD follows the seven-stage Sport for Life structure; stages 6 (Train to Win) and 7 (Active for Life) sit outside most youth programmes. Little League’s Tee Ball → Minor → Major → Intermediate → Junior → Senior ladder is not branded LTAD, but the developmental logic is compatible. Match the work to the stage, not only to the birthday. A late-maturing 13-year-old may still be Learn to Train even if the division says Train to Train.'
        },
        {
          type: 'prose',
          heading: 'Projection, not last week’s results',
          body: [
            'The central scouting problem is that a 14-year-old’s current results are a weak signal. Frame, athleticism, and rate of improvement matter more than the showcase line. A physically early 12-year-old who dominates evaluation metrics may be measuring puberty, not baseball skill. The knowledge base names this as physical-maturity bias; independent scoring and a note on relative maturity are the mitigation, not a vibe.',
            'Relative age effect is the sibling of that bias: players born earlier in the eligibility year are overrepresented at select levels because they have had more time to grow and more time on the field. It is a known pattern in youth sport. It is not a reason to discard an early-birthday athlete, and it is a reason to look twice at the late-birthday athlete whose mechanics are ahead of their body. Early specialization before about 12–13U is associated with higher overuse injury and higher dropout by 15. Baseball Canada’s LTAD and the Coaching Association of Canada advise against single-sport specialization at the FUNdamentals and Learn to Train stages. Pitch Smart, endorsed by Baseball Canada, wants consecutive months away from baseball-specific work each year.',
            'Canadian pathways run in parallel. Grassroots: Rally Cap and Tee Ball, then coach-pitch / Minor, then 11U / Major. Competitive: 13U, 15U, 18U, Canada Cup on the Baseball Canada side; Intermediate, Junior, Senior on the Little League side. A player may play Little League in the spring and Baseball Canada club in the summer, under different rules in the same year. Coaches credential differently too: Baseball Canada is NCCP (Initiation → Trained → Certified → Competition-Development) with division staffing minimums; Little League is league-approved volunteers with background checks. Know which pathway you are standing in before you talk about “the next level.”'
          ]
        },
        {
          type: 'divisionnote',
          heading: 'What evaluation is for, by pathway',
          intro: 'The purpose of a youth evaluation is placement for development and safety, not building a roster at the expense of the players you did not pick. The pathways disagree on mechanism. They agree on that principle.',
          columns: ['Pathway', 'Purpose', 'Who decides', 'What it cannot do'],
          rows: [
            ['Little League house', 'Balance teams across the league (Regulation IV). A registered eligible player must be placed.', 'Local draft or other board-approved selection. League president and board retain authority on disputes.', 'Exclude an eligible registered player because they “didn’t try out well.”'],
            ['Little League All-Star / representative', 'Select a representative team.', 'Manager and coaches, with approval from the league president and board.', 'Ignore eligibility and board authority. Performance at tryout is not a substitute for eligibility.'],
            ['Baseball Canada grassroots / community', 'Local association policy. Placement and safety, not a national tryout code.', 'Local association. NCCP principles: objective, documented, athlete-centred criteria.', 'Invent a national “cut” rule that the championship book does not state.'],
            ['Baseball Canada rep / select', 'Provincial member associations govern tryout process. Criteria vary by association.', 'Club / association, under provincial rules. NCCP encourages objective, transparent criteria.', 'Treat last week’s results as a projection, or skip documenting the criteria.']
          ]
        },
        {
          type: 'steps',
          heading: 'A fair youth tryout',
          items: [
            {
              title: 'Score five categories independently',
              body: 'Throwing (arm strength and accuracy), fielding (ground balls and fly balls), hitting (mechanics and contact quality), running speed (home-to-first, right-handed batter as the usual split), and baseball IQ (situational awareness and coachability). Same scale for every evaluator. Record before you talk. Group conversation before independent scores is how familiarity bias reproduces itself.'
            },
            {
              title: 'Equal conditions, more than one pair of eyes',
              body: 'Every player faces the same number of ground balls and the same kind of batting-practice look. Rotate who throws BP so no one is saved for the slow arm. Minimum two evaluators. Large discrepancies trigger a second look. Recuse a coach from scoring their own child; an independent evaluator’s sheet stands, and the coach reviews it after.'
            },
            {
              title: 'Name the biases on the sheet',
              body: 'Recency: the last player of the day gets grade inflation unless you review the whole session. Familiarity: “I know this kid” is not a score. Physical maturity: note it. A late developer with excellent mechanics at 11U may pass the early-maturing peer by 14U. Relative age is part of that note, not a secret.'
            },
            {
              title: 'Talk to the player afterwards',
              body: 'Direct conversation, not a form email. Honest and specific: what is strong, what is the next skill, what the off-season work is. Do not apologize for a fair process. Evaluation places a player; it does not create a lower caste who then miss mandatory play. Once they are on a team, the playing-time rules still apply.'
            }
          ]
        },
        {
          type: 'interactive',
          heading: 'Grade the tool',
          widget: 'gradeTheTool',
          intro: 'Read the description. Place the tool on the 20–80 scale. 50 is major-league average, not average for this age group. Each 10 points is one standard deviation. You are within the tolerance if you are close; the explain line is what separates a 50 from a 60 on that tool.',
          opts: {
            cases: [
              {
                tool: 'Hit (present)',
                description: 'Makes consistent contact against average professional velocity, sprays to all fields, takes a walk when the pitcher nibble. Occasional empty swings against plus velocity. Not a plus hit tool; not a below-average one either. This is what “major-league average contact skill” looks like on a good day.',
                grade: 50,
                tolerance: 5,
                explain: '50 is major-league average. Consistent contact and all-fields spray against average velocity, with some empty swings against plus pitching, is the 50 hit tool. 60 would miss bats less often against good pitching and produce a clearly plus on-base/average skill. 40 would not hold average velocity.'
              },
              {
                tool: 'Power (present)',
                description: 'Regular extra-base impact. Drives mistakes out to the pull side in games, not only in batting practice. Not yet all-fields over-the-fence power; the opposite-field fly ball is a warning-track out more often than a homer.',
                grade: 60,
                tolerance: 5,
                explain: '60 is plus — one standard deviation above major-league average. Game-power to the pull side that is real, with opposite-field power still to come, is a 60 rather than a 70. 70 is plus-plus, all-fields impact. 50 is average extra-base value without the regular over-the-fence threat.'
              },
              {
                tool: 'Run (present)',
                description: 'Turns in plus-plus home-to-first times. First-to-third is a threat on almost any single in front of an outfielder. Not a stolen-base specialist’s first step only — the straight-line speed plays in both directions.',
                grade: 70,
                tolerance: 5,
                explain: '70 is two standard deviations above major-league average. Plus-plus straight-line speed that plays first-to-third as well as home-to-first is a 70 run tool. 80 is the handful of true burners in a generation. 60 is plus and still a weapon; it is not this description.'
              },
              {
                tool: 'Field (present)',
                description: 'Limited range. Stiff first step. Can handle what is hit at them with reliable hands, but the ball in the hole is a single. This is a defender you hide, or you live with at first base, not a defender you feature in the middle of the diamond.',
                grade: 40,
                tolerance: 5,
                explain: '40 is one standard deviation below major-league average. Reliable hands with no range is below-average defence, not fringe. 45 would be fringe-average — playable in a spot. 50 would hold a position without being hidden. 30 would be a true defensive liability on routine plays.'
              },
              {
                tool: 'Throw (present)',
                description: 'Fringe-average arm strength. Accurate enough for the left side of the infield if the feet are right. The throw to first from deep third arrives, but it is not a weapon, and it will not play in right field against a runner who can run.',
                grade: 45,
                tolerance: 5,
                explain: '45 is fringe-average. The ball arrives; it does not finish plays by itself. 50 would be a major-league average arm at the position. 40 would start to knock the player off the left side. Accuracy without strength still has to be graded on the tool, not as a separate kindness.'
              },
              {
                tool: 'Fastball (present)',
                description: 'Sits above big-league average velocity with ordinary life. Hitters see it. It is not a wipeout pitch; it is a pitch you can pitch off if the secondaries and the command are real. Ordinary induced vertical break; nothing that makes the radar reading play a grade higher.',
                grade: 55,
                tolerance: 5,
                explain: '55 is a tick above major-league average. Above-average velocity with ordinary shape is 55, not 60. 60 would be plus velocity or plus life (the pitch plays above the gun). 50 would be average velocity without a reason to write it up. Velocity alone does not make it 70.'
              },
              {
                tool: 'Command (present)',
                description: 'Misses spots by feet, not inches. Can throw strikes in a vacuum; cannot throw the intended strike when it matters. A walk rate that would not play in professional innings. The stuff, on a radar, is not the problem.',
                grade: 30,
                tolerance: 5,
                explain: '30 is two standard deviations below major-league average. Strikes to the intended spot are the command tool; strikes in general are a lower bar. Missing by feet is well below average, not fringe. 40 would be below average but usable. 50 would locate enough to pitch. Stuff does not rescue a 30 command grade.'
              },
              {
                tool: 'Hit (future)',
                description: 'Sixteen years old. Present contact is below average against good pitching — empty swings, pull-side only. Swing decisions and barrel rate have jumped roughly two grades in a year. The frame will take more strength. You are not grading what the tool is today. You are grading what it can be if that rate of improvement holds.',
                grade: 55,
                tolerance: 5,
                explain: 'Future grades are still on the 20–80 professional scale. A below-average present hit tool with two grades of recent growth and a body that will take strength projects to a tick above average (55), not to plus (60), unless you are willing to own more risk. 50 future would be “gets to average.” 60 future would be buying plus, which this description does not earn yet. Present and future are different numbers on purpose.'
              }
            ]
          }
        },
        {
          type: 'coachnote',
          heading: 'Do not grade them in front of them',
          body: [
            'A 20–80 number is adult shorthand for a professional reference point. It is not a gift you announce to a 12-year-old in the cage, and it is not a verdict you let other parents overhear. Kids remember the number. They do not remember your caveat about present versus future. Peers remember it faster.',
            'Youth evaluation language is categories and next skills: throwing, fielding, hitting, running, baseball IQ, scored independently, talked through afterwards with something to work on. “Your ground-ball reads are improving; the next skill is the backhand at game speed” is information. “You’re a 40 arm” is a label that will follow them into the car.',
            'If you use the scale internally, keep it internal. The harm is not that the scale is wrong. The harm is that a child takes a professional-average reference point as a statement about their worth on a Tuesday in May.'
          ]
        },
        {
          type: 'terms',
          items: [
            'five-tools',
            'twenty-eighty-scale',
            'present-grade',
            'future-grade',
            'spin-rate',
            'induced-vertical-break',
            'extension',
            'projection',
            'ltad',
            'relative-age-effect',
            'early-specialization',
            'tryout'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Five tools for position players: hit, power, run, field, throw. Pitcher equivalents: fastball, secondaries, command, delivery/durability.',
            '20–80: 50 is major-league average; each 10 points is one standard deviation; grades come in fives. Present and future are different numbers. A 45/60 is a projection play; a 60/60 is not.',
            'Velocity, spin rate, induced vertical break, and extension each measure one thing. Velocity alone is a poor predictor. A youth velocity projection is contested on purpose.',
            'A 14-year-old’s results are a weak signal. Frame, athleticism, rate of improvement, relative age, and maturity belong on the sheet. Early specialization before 12–13U works against the LTAD evidence base.',
            'Canadian pathways run in parallel (Baseball Canada U-divisions and Little League). Evaluation places players for development and safety. Score independently, equal conditions, recuse conflicts, talk to the player afterwards. Do not announce a 20–80 grade in front of them.'
          ]
        }
      ],
      quizIds: ['q2301', 'q2302', 'q2303', 'q2304', 'q2305', 'q2306', 'q2307', 'q2308'],
      prev: 'ch22',
      next: 'ch24'
    },

    /* -------------------------------------------------------------- */
    /* ch24 — The Rulebook’s Edges                                     */
    /* -------------------------------------------------------------- */
    {
      id: 'ch24',
      tier: 'promind',
      order: 24,
      title: 'The Rulebook’s Edges',
      subtitle: 'Appeals, batting out of order, and the rest',
      minutes: 15,
      objectives: [
        'After this chapter you can describe how an appeal is made and when the right to appeal is lost.',
        'After this chapter you can work a batting-out-of-order play: who is out, what happens to the runners, and the difference between appealing before and after the next pitch.',
        'After this chapter you can assign rundown responsibilities, apply the make-him-commit principle, and name the two obstruction types and their remedies.',
        'After this chapter you can state where courtesy runners are allowed, what ground rules may and may not override, and what is protestable versus a judgment call.'
      ],
      sections: [
        {
          type: 'prose',
          heading: 'Appeal plays',
          body: [
            'Some outs are not the umpire’s to call until the defence asks. Missing a base, leaving early on a tag-up, and batting out of order are appeal plays. The umpire may have seen the miss. They still wait. The defence has to appeal, and it has to appeal in time.',
            'Live ball: tag the runner, or tag the missed base, and make the appeal clear — verbally is the clean way. Dead ball: call time, then appeal verbally at the relevant base. On a tag-up, the runner may leave on the fielder’s first touch, not on the catch being secured; leave-early is still an appeal, not an automatic out. The knowledge base is explicit on first touch. The appeal is how you convert the leave-early into an out.',
            'The right to appeal is lost when the next pitch is made, or when the defence makes a play or attempted play that is not the appeal, or when the inning ends and the defensive team has left the field. If the runner left early, scored, and you throw a pitch to the next batter, the run stays. There is no delayed gift. Appeal before you go back to work.'
          ]
        },
        {
          type: 'example',
          heading: 'Batting out of order, worked all the way through',
          body: [
            'Batting order: 1 Avery, 2 Blake, 3 Casey, 4 Drew. Avery is due. Blake bats instead. Blake doubles. The runner who was already on first scores on the double.',
            'If the defence appeals before the next pitch, or before any play or attempted play: Avery — the proper batter — is out for failing to bat in turn. Blake is removed from second. The run that scored because of the improper batter’s double comes off. Advances that happened independently of that at-bat (a stolen base while Blake was up, a balk, a wild pitch) stay. Next batter is Blake, the name after the proper batter who was just called out. Casey does not skip to the plate. OBR 6.03(b); batting out of order is a rule application, and it is protestable if it is misapplied.',
            'If instead the pitcher throws a pitch to Casey before anyone appeals, Blake’s double is legalized. The run counts. You cannot go back. The next proper batter after Casey completes that turn is Drew — the name after the batter whose at-bat was just legalized. The skipped Avery does not get a make-up at-bat. That is the whole difference between appealing in time and appealing after the next pitch: in time, you get the proper batter out and you unwind the at-bat; late, the improper batter becomes the proper batter and the order continues from there.'
          ]
        },
        {
          type: 'prose',
          heading: 'Rundowns',
          body: [
            'A rundown is a runner caught between two bases. The efficient version ends with one throw and a tag. Every extra throw is another chance at a wild throw, a drop, or a trailing runner moving up. Three-throw rundowns are a coaching failure, not a badge of effort. Run at the runner at full speed and make them commit. Jogging and pump-faking lets them reverse and extends the play. One or two fakes can hold a runner; more than that and they start reacting to the fake instead of the ball.',
            'Default direction: chase the runner back toward the base they came from. Caught between second and third, run them toward second. Between first and second, toward first. If the rundown breaks down, you have not given them the next base for free. The fielder with the ball runs until a throw is necessary; the covering fielder calls “Now!”; the throw is chest-high on the glove side; the tag is a sweep, not a stab. The thrower follows the throw and becomes the new cover at the target base. That loop is the play.',
            'Responsibilities, typical: between first and second — first baseman and second baseman as the chasers, shortstop covering second, pitcher backing up first. Between third and home — third baseman and catcher as the chasers, pitcher backing up home, shortstop or second baseman covering third. Assign someone to the far base you are not using. Trailing runners advance while everyone stares at the rundown. Obstruction risk is real: a fielder without the ball in the runner’s path is obstruction, even in a rundown, even if everyone “meant well.”'
          ]
        },
        {
          type: 'diagram',
          heading: 'Rundown between first and second',
          svg: 'field',
          opts: {
            preset: 'full',
            positions: true,
            positionStyle: 'both',
            runners: ['first'],
            ball: 'up-the-middle',
            roles: {
              '1b': 'ball',
              '2b': 'base',
              ss: 'base',
              p: 'backup',
              c: 'backup'
            },
            arrows: [
              { from: '1b', to: 'second', style: 'run' },
              { from: 'ss', to: 'second', style: 'cut' },
              { from: 'p', to: 'first', style: 'route' }
            ],
            covering: { second: 'ss', first: 'p' },
            title: 'Rundown responsibilities, first and second',
            desc: 'A full diamond with the nine fielders, a runner off first, the first baseman with the ball, the shortstop covering second, and the pitcher backing up first.'
          },
          caption: 'Runner caught between first and second. First baseman has the ball and runs to make the runner commit — preferably back toward first. Shortstop covers second. Pitcher backs up first. Second baseman is in the play as a chaser/cover. Follow the throw; do not invent a third throw. Someone still has to look at third and home.'
        },
        {
          type: 'prose',
          heading: 'Obstruction: two types, two remedies',
          body: [
            'Obstruction is a fielder who does not have the ball and is not in the act of fielding a batted ball impeding a runner. Interference is the other direction: the offence impedes a fielder. The knowledge base is blunt about the mix-up. Who impeded whom is the whole analysis. Fielders have the right of way to field a batted ball. Runners have the right to the base path against a fielder who is not making a play.',
            'Type 1, OBR 6.01(h)(1): a play is being made on the obstructed runner at the time, or immediately after. Umpire calls “Obstruction.” The play continues. At the end, the runner is awarded at least the base they would have reached without the obstruction — and possibly more. Example: catcher without the ball blocks the plate; runner is tagged out; Type 1; award home; the run scores.',
            'Type 2, OBR 6.01(h)(2): no play is being made on that runner at the time. The ball stays live. The umpire calls obstruction and waits until the play ends, then awards the bases that runner (and others as needed) would have reached. Type 2 does not kill the play. A fielder in the act of fielding a batted ball still has priority: contact then is interference on the runner, not obstruction on the fielder. That swap is the most common confusion on this rule. In a rundown, get out of the lane when you do not have the ball. Standing in the path without the ball is Type 1 if a play is being made on that runner, which in a rundown it usually is.'
          ]
        },
        {
          type: 'diagram',
          heading: 'Appeal at second: the missed bag',
          svg: 'basePaths',
          opts: {
            title: 'Missed second — appeal before the next pitch',
            desc: 'A base-path diamond with a runner route from first through second toward third, labelled as having missed second, and one out showing, used to teach a missed-base appeal.',
            labels: true,
            outs: 1,
            runners: [
              { from: 'first', to: 'second', style: 'advance', label: 'missed 2B' },
              { from: 'second', to: 'third', style: 'advance', label: 'now on 3B' }
            ]
          },
          caption: 'The runner is on third and missed second. That is not an automatic out. Live-ball: tag the runner or tag second and appeal the miss. Dead-ball: time, then appeal at second. If you throw a pitch, the miss is legalized. The book waits for you to ask.'
        },
        {
          type: 'divisionnote',
          heading: 'Courtesy runners',
          intro: 'A courtesy runner runs for the pitcher and/or catcher of record so those players can get ready, without counting as a substitution. The pathways actually diverge here. Confirm the local adoption before you send someone.',
          columns: ['Pathway', 'Who may run', 'When', 'Restrictions'],
          rows: [
            ['Little League (local option, regular season)', 'A player not currently in the batting order, for the pitcher and/or catcher of record', 'Two outs', 'Traditional order: a player may not courtesy-run more than once per game. Continuous batting order: the courtesy runner must be the player who made the last out. 2026 clarifications cover interaction with mandatory play and running for both pitcher and catcher.'],
            ['Baseball Canada championship play', 'No general courtesy-runner mechanism in OBR', 'Not a standard championship rule', 'Courtesy or special runners, where used, are a competition- or league-level option. Do not assume the Little League option travels to a Baseball Canada championship game.']
          ]
        },
        {
          type: 'prose',
          heading: 'Ground rules and protests',
          body: [
            'Ground rules are agreed at the plate meeting. They cover this field today: a ball that goes under that fence, the dead-ball area beyond that gate, the two-base award if the ball is lost in that hedge. They can specify the award on a local peculiarity. They cannot override the playing rules. You cannot waive the infield fly because the grass is wet. You cannot make a judgment call protestable by local agreement. You cannot rewrite obstruction. If a ground-rule award is then applied incorrectly — the wrong number of bases — that misapplication is a rule question, and it is protestable.',
            'Protests cover rule interpretation: was the rule applied correctly? They do not cover judgment: did the umpire see it correctly? Balls and strikes, safe or out, fair or foul, catch versus trap, home-run determinations — judgment, final, not protestable under either pathway. Incorrect number of bases on interference or obstruction, a pitcher used beyond a pitch-count limit, batting out of order misapplied — those are rule applications. The practical test from the knowledge base: “Was the rule applied correctly?” is protestable. “Did the umpire see it correctly?” is not.',
            'Only the designated manager or head coach addresses the umpire. Assistants and players who come out to argue can be ejected. Request time, ask a question, accept the answer, and if you are protesting, say so before the next pitch, play, or attempted play. Baseball Canada championships: $100 cash deposit, committee of three chaired by the Technical Officer, deposit returned if you win and forfeited if you lose, play resumes from the point of suspension if the protest is upheld, no further appeal. Little League has its own protest procedure in the playing rules; judgment calls are explicitly non-protestable there too. Carry the deposit to a championship game. A valid protest without the deposit is not heard.'
          ]
        },
        {
          type: 'interactive',
          heading: 'Make the call',
          widget: 'makeTheCall',
          intro: 'These are the once-a-season plays. Read the situation, pick the ruling, and read which rule decided it. Judgment and rule application are not the same door.',
          opts: {
            mode: 'rules',
            cases: [
              {
                id: 'missed-base-appeal',
                situation: 'Runner from first rounds second on a single to right, misses the bag, ends at third. The defence wants the out at second. The next pitch has not been thrown.',
                prompt: 'Runner from first rounds second on a single to right, misses the bag, ends at third. The defence wants the out at second. The next pitch has not been thrown.',
                choices: [
                  'The runner is automatically out. The umpire should have called it without being asked.',
                  'Appeal. Live ball: tag the runner or tag second while making the appeal clear. Dead ball: call time and appeal verbally at second. If the defence pitches, the appeal is lost.',
                  'The offence must self-report the miss or the run, once the runner scores, will not count.'
                ],
                answer: 1,
                explain: 'Missing a base is an appeal play. The umpire may have seen it and will still wait. Live-ball appeal is a tag of the runner or of the missed base with the appeal stated; dead-ball appeal is time plus a verbal appeal at the base. The right to appeal dies on the next pitch, or on a play or attempted play that is not the appeal, or when the defence has left the field after the inning.',
                rule: 'OBR 5.09(c) / Little League 7.10 — appeal of a missed base'
              },
              {
                id: 'leave-early-tag-up',
                situation: 'Runner on third leaves the bag before the outfielder’s first touch of a fly ball that is caught. The runner scores. The defence does not appeal. The pitcher throws to the next batter.',
                prompt: 'Runner on third leaves the bag before the outfielder’s first touch of a fly ball that is caught. The runner scores. The defence does not appeal. The pitcher throws to the next batter.',
                choices: [
                  'The run comes off the board automatically. Leaving early is not an appeal play.',
                  'The run counts. Leaving early on a tag-up is an appeal. The right to appeal was lost when a pitch was made to the next batter.',
                  'The umpire must call the runner out without an appeal once they notice the early leave.'
                ],
                answer: 1,
                explain: 'The runner may leave on the fielder’s first touch, not on the catch being secured. Leave-early is still an appeal, not an automatic out. Once a pitch is made to the next batter, the appeal is gone and the run stays. Appeal before you go back to pitching.',
                rule: 'OBR 5.09(c) and 5.06(b)(5) / Little League 7.10; first-touch timing as in tagging-up-and-reads'
              },
              {
                id: 'boo-before-pitch',
                situation: 'Batting order is Avery, Blake, Casey, Drew. Avery is due. Blake bats, doubles, and the runner who was on first scores. The defence appeals before the next pitch.',
                prompt: 'Batting order is Avery, Blake, Casey, Drew. Avery is due. Blake bats, doubles, and the runner who was on first scores. The defence appeals before the next pitch.',
                choices: [
                  'Blake is out, the double stands as a dead-ball out, and the run counts because it happened before the appeal.',
                  'Avery (the proper batter) is out. Blake is removed from second. The run driven by the improper at-bat is nullified. Next batter is Blake.',
                  'The at-bat is legal because Blake is in the lineup. You can only appeal if a player not in the lineup batted.'
                ],
                answer: 1,
                explain: 'The proper batter — Avery, who failed to bat in turn — is out. The improper batter is removed. Advances caused by that at-bat (the double, the run it drove in) are nullified. Independent advances during the at-bat would stay. Next batter is the name after the proper batter who was called out: Blake. Casey does not come up.',
                rule: 'OBR 6.03(b) batting out of order, appeal before the next pitch'
              },
              {
                id: 'boo-after-pitch',
                situation: 'Same order: Avery, Blake, Casey, Drew. Blake batted in Avery’s spot and doubled. The pitcher throws a pitch to Casey before anyone appeals.',
                prompt: 'Same order: Avery, Blake, Casey, Drew. Blake batted in Avery’s spot and doubled. The pitcher throws a pitch to Casey before anyone appeals.',
                choices: [
                  'Avery is still out if the defence appeals now. The next pitch does not legalize an improper batter.',
                  'Blake’s double is legalized. The run counts. You cannot go back. After Casey’s turn, the next proper batter is Drew.',
                  'Both Blake and Avery are out, and Casey’s at-bat is wiped.'
                ],
                answer: 1,
                explain: 'A pitch to the next batter legalizes the improper batter. Blake’s double stands. The skipped Avery does not get a make-up. The order continues from the batter who was legalized: Casey is now properly up; after Casey, Drew. Appealing after the next pitch does not unwind what was just legalized.',
                rule: 'OBR 6.03(b)(3)–(5) — improper batter legalized by a pitch to the next batter'
              },
              {
                id: 'rundown-obstruction',
                situation: 'Rundown between third and home. The catcher, without the ball, stands in the baseline. The runner has to stop. The third baseman then tags the runner. A play is being made on that runner.',
                prompt: 'Rundown between third and home. The catcher, without the ball, stands in the baseline. The runner has to stop. The third baseman then tags the runner. A play is being made on that runner.',
                choices: [
                  'The runner is out. Fielders may block without the ball during a rundown.',
                  'Obstruction, Type 1. The catcher had neither the ball nor a batted ball to field. Award the runner at least the base they would have reached — here, home. The tag does not stand.',
                  'Interference on the runner for running into a fielder.'
                ],
                answer: 1,
                explain: 'A fielder without the ball and not fielding a batted ball who impedes a runner has obstructed. In a rundown a play is being made on that runner, so this is Type 1 (6.01(h)(1)). Call obstruction, award at least the base they would have reached. The rundown “make him commit” principle does not include standing in the lane empty-handed. That is the obstruction risk the rundown page warns about.',
                rule: 'OBR 6.01(h)(1) Type 1 obstruction; rundowns-and-pickoffs (obstruction risk)'
              },
              {
                id: 'type1-plate',
                situation: 'Runner on third, hit to the outfield, play at the plate. The catcher without the ball blocks the plate. The runner is tagged out after having to go around the catcher.',
                prompt: 'Runner on third, hit to the outfield, play at the plate. The catcher without the ball blocks the plate. The runner is tagged out after having to go around the catcher.',
                choices: [
                  'The out stands. The catcher is entitled to the plate on any play at home.',
                  'Type 1 obstruction. A play is being made on the obstructed runner. Award at least home. The run scores.',
                  'Dead ball immediately; runner is sent back to third.'
                ],
                answer: 1,
                explain: 'Catcher without the ball blocking the plate, play being made on that runner: Type 1, OBR 6.01(h)(1). The umpire calls obstruction; when the play is over the runner is awarded at least the base they would have reached — home. Collision / blocking rules at the plate (6.01(i) at competitive levels) sit on the same principle: you do not get to close the path without the ball.',
                rule: 'OBR 6.01(h)(1); plate-blocking principle in interference-and-obstruction'
              },
              {
                id: 'type2-first',
                situation: 'Batter-runner rounds first on a single to the outfield. The first baseman, without the ball and not fielding, is in the running lane and slows the runner. No play is being made on that runner at the time. The ball is still in the outfield.',
                prompt: 'Batter-runner rounds first on a single to the outfield. The first baseman, without the ball and not fielding, is in the running lane and slows the runner. No play is being made on that runner at the time. The ball is still in the outfield.',
                choices: [
                  'Immediate dead ball. Award second at once.',
                  'Type 2 obstruction. The ball stays live. The umpire calls obstruction and, at the end of the play, awards the bases the runner would have reached.',
                  'Nothing. The runner must go around any fielder near a base.'
                ],
                answer: 1,
                explain: 'No play being made on that runner at the time: Type 2, OBR 6.01(h)(2). The ball remains live. The award waits until the play ends. Type 2 does not kill the play the way people want it to. A fielder who is actually fielding a batted ball still has priority — that would be interference the other way.',
                rule: 'OBR 6.01(h)(2) Type 2 obstruction'
              },
              {
                id: 'courtesy-runner-ll',
                situation: 'Little League regular season; the local league has adopted the courtesy-runner option. Two outs. The catcher of record is on first. The coach wants a courtesy runner so the catcher can gear up.',
                prompt: 'Little League regular season; the local league has adopted the courtesy-runner option. Two outs. The catcher of record is on first. The coach wants a courtesy runner so the catcher can gear up.',
                choices: [
                  'Anyone on the bench may run, as often as they like, in any pathway.',
                  'Yes, if the local option is on: a player not currently in the batting order (traditional order: not more than once per game; continuous order: the player who made the last out), for the pitcher and/or catcher of record, with two outs. Baseball Canada championship play has no general OBR courtesy-runner mechanism.',
                  'Courtesy runners are illegal in all youth baseball.'
                ],
                answer: 1,
                explain: 'Little League Rule 3.04 / 7.14b makes this a local-league option, regular season, pitcher and/or catcher of record, two outs, with the once-per-game or last-out restrictions depending on batting-order type. Baseball Canada championship play follows OBR, which does not provide a general courtesy runner. Do not carry the Little League option into a championship game that is not playing under it.',
                rule: 'Little League 3.04 / 7.14b; Baseball Canada championships follow OBR',
                division: 'Little League regular season (local option) vs Baseball Canada championship play'
              },
              {
                id: 'ground-rules-limit',
                situation: 'Plate meeting. The home coach wants a ground rule that any ball rolling under the outfield fence is a home run, and also that the infield fly rule is waived today because the infield is wet.',
                prompt: 'Plate meeting. The home coach wants a ground rule that any ball rolling under the outfield fence is a home run, and also that the infield fly rule is waived today because the infield is wet.',
                choices: [
                  'Both are legal ground rules if both coaches and the umpires agree.',
                  'The under-fence award can be agreed as a local ground rule (the usual award on a ball under the fence is not a home run rewrite — it is an out-of-play award, commonly two bases). The infield fly rule cannot be waived by ground rule. Ground rules supplement the playing rules; they do not replace them.',
                  'Ground rules can override anything in the book if the umpires sign off.'
                ],
                answer: 1,
                explain: 'Ground rules handle this field’s peculiarities: out-of-play areas, a ball under a fence, a dead-ball area. They cannot waive infield fly, obstruction, balks, or any other playing rule, and they cannot make a judgment call protestable. A later misapplication of an agreed ground-rule award (the wrong number of bases) is a rule question and is protestable. The wet grass is not a licence to edit the book.',
                rule: 'Ground rules supplement, and do not replace, the playing rules; wrong ground-rule award is protestable (coach-umpire-interaction)'
              },
              {
                id: 'protest-judgment-vs-rule',
                situation: 'Two beefs after the same play. The coach believes a called third strike was a ball. The coach also believes the umpire awarded only one base on a Type 1 obstruction that should have been at least the next base, and possibly home.',
                prompt: 'Two beefs after the same play. The coach believes a called third strike was a ball. The coach also believes the umpire awarded only one base on a Type 1 obstruction that should have been at least the next base, and possibly home.',
                choices: [
                  'Protest both. Any disagreement with an umpire is a protest if you file in time.',
                  'The strike is a judgment call and is not protestable. The number of bases awarded on obstruction is a rule application and is protestable if you believe the rule was misapplied. Inform the umpire before the next pitch; Baseball Canada championships require a $100 cash deposit.',
                  'Nothing is protestable. Live with every call, including a misapplied rule.'
                ],
                answer: 1,
                explain: 'Judgment — balls and strikes, safe/out, fair/foul, catch versus trap — is final under both pathways. Rule application — how many bases the obstruction rule awards — is protestable. Only the head coach. Before the next pitch, play, or attempted play. Baseball Canada championships: $100 deposit, committee chaired by the Technical Officer, ruling final. Little League has its own protest procedure; judgment is non-protestable there too. The test: was the rule applied correctly, or did the umpire see it correctly? Only the first is a protest.',
                rule: 'Judgment vs rule application; Baseball Canada championships protest procedure ($100, before next pitch); LL playing-rules protest procedure',
                division: 'Both pathways: judgment not protestable. BC championships: $100 deposit and three-person committee. LL: procedure in the playing rules; deposit/committee not confirmed in the ingested sources.'
              }
            ]
          }
        },
        {
          type: 'terms',
          items: [
            'appeal',
            'batting-out-of-order',
            'rundown',
            'obstruction',
            'type-1-obstruction',
            'type-2-obstruction',
            'courtesy-runner',
            'ground-rules',
            'protest',
            'judgment-call',
            'tag-up',
            'missed-base'
          ]
        },
        {
          type: 'prose',
          heading: 'What to do next',
          body: [
            'That is the curriculum. Twenty-four chapters, from the object of the game to the once-a-season appeal. The Baseball IQ test is the next honest look at whether this stuck — not a grade, a map of what is still thin. The review deck is how you keep the language, the numbers, and the edge-case rulings from fading between seasons.',
            'Then go back to where this started in Chapter 4. Homerun Baseball Ottawa’s values, in order: Effort, Respect, Team. Talent is what you have, effort is what you give. ROOTS still holds: Rules, Officials, Opponents, Teammates, Self. The 20–80 scale and the box score do not outrank those. They sit on top of them, or they are just numbers.'
          ]
        },
        {
          type: 'keypoints',
          heading: 'Take this with you',
          items: [
            'Appeals (missed base, leave-early tag-up, batting out of order) must be made by the defence. Live-ball: tag the runner or the base. Dead-ball: time, then verbal. Lost on the next pitch, on a non-appeal play, or when the defence has left the field.',
            'Batting out of order: the proper batter is out if you appeal in time; unwind the at-bat; next is the name after the proper batter. After a pitch to the next batter, the improper at-bat is legalized and you cannot go back.',
            'Rundowns: make the runner commit, chase them back toward where they came from, one throw and a tag, follow your throw, cover the far base. Three throws is a failure. Empty-handed in the lane is obstruction.',
            'Type 1 obstruction: play being made on that runner; award at least the base they would have reached. Type 2: no play on that runner; ball stays live; award at the end of the play.',
            'Courtesy runner: Little League local option, pitcher/catcher, two outs, with order-type restrictions. Not standard in Baseball Canada championship OBR play.',
            'Ground rules supplement the book; they do not rewrite it. Protests are rule application, not judgment. Head coach only, before the next pitch. Baseball Canada championships: $100 deposit.',
            'Next: the Baseball IQ test, the review deck, and the Homerun values you started with — Effort, Respect, Team.'
          ]
        }
      ],
      quizIds: ['q2401', 'q2402', 'q2403', 'q2404', 'q2405', 'q2406', 'q2407', 'q2408'],
      prev: 'ch23',
      next: null
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
