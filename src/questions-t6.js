/* ===================================================================
   Homerun Learn to Play — questions-t6.js
   Tier 6 (Pro Mind) question bank for chapters 21–24.
   Registers onto HRL_QUESTIONS. ES5-safe. Load after questions-data.js.
   Content sourced from youth-baseball-canada wiki concept pages
   and the chapter prose in curriculum-t6.js.
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
    /* ch21 — Reading the Game                                         */
    /* quizIds: q2101–q2108                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q2101',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'The regular shortstop and the second baseman swap for one pitch. The player now standing at shortstop fields a grounder and starts a double play through second to first. How is the play written?',
      choices: [
        '4-6-3, because you write each player\'s usual position, not where they stood',
        'DP with no numbers, because a swap makes the book unreliable',
        '6-4-3. Scoring numbers travel with the position on that play, not with the person.',
        '4-4-3, because both middle infielders become 4 when they swap'
      ],
      answer: 2,
      explain: 'Pitcher 1 through right field 9 are scoring numbers, not uniform numbers, and they travel with the spot. Whoever is standing at shortstop on that play is 6. Writing the usual lineup instead of the play is how a 6-4-3 becomes a private code.',
      source: ''
    },
    {
      id: 'q2102',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'order',
      prompt: 'Runner on first, fewer than two outs. Ground ball to the shortstop, throw to the second baseman covering for the force, relay to first in time. Put the scoring numbers in the order they are written.',
      items: [
        '6 (shortstop fields)',
        '4 (second baseman forces at second)',
        '3 (first baseman retires the batter-runner)'
      ],
      explain: 'Write the fielders who handled the ball, in order, joined by hyphens. 6-4-3 already tells the double-play story; the DP label is optional. 4-6-3 is the other pivot, started by the second baseman.',
      source: ''
    },
    {
      id: 'q2103',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'How do you distinguish a swinging strikeout from a called third strike in the book?',
      choices: [
        'K is looking; a backwards-K is swinging',
        'K is swinging; a backwards-K (ꓘ) is a called third strike. Write the distinction.',
        'Both are K. The book does not care whether the batter offered.',
        'A backwards-K is a dropped third strike; K is a catcher-caught strikeout'
      ],
      answer: 1,
      explain: 'K is a hitter who offered. ꓘ (some books write Kc) is a hitter who took. The catcher holding a swinging strike in the dirt is still a K, not a dropped-third-strike notation, because the batter is simply out. Mixing the two symbols hides the difference between a chase and a take.',
      source: ''
    },
    {
      id: 'q2104',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 8,
      type: 'mc',
      prompt: 'Nobody on. Line drive at the first baseman, who catches it in the air with no throw. How is that scored?',
      choices: [
        'U3 — unassisted putout by the first baseman',
        'Umpire interference on the first-base line',
        'E3, because a line drive at first should always be a hit',
        'SH, because the first baseman handled it alone'
      ],
      answer: 0,
      explain: 'U3 means the 3 handled the putout with no throw — a catch, or fielding a hopper and stepping on the bag. A bare 3 appears in some books; U3 makes the unassisted part explicit. It is not an umpire ruling and it is not a sacrifice.',
      source: ''
    },
    {
      id: 'q2105',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'Nobody on. A one-hop smash down the third-base line. The third baseman gets leather on it; the ball caroms into foul territory; the batter reaches standing. Ordinary effort would not convert this cleanly most of the time. How is it scored?',
      choices: [
        'E5, because any ball a fielder touches is an error if the batter reaches',
        'FC, because the fielder had a play',
        'U3, because nobody else touched the ball',
        '1B. Getting leather on a smash is not ordinary-effort conversion.'
      ],
      answer: 3,
      explain: 'Ordinary effort means a play that infielder, at that level, is expected to handle cleanly most of the time — not “a professional would have caught it,” and not “leather touched it.” The smash is a hit. The same neighbourhood as a through-the-legs hopper is why people argue; the test, not the zip code, decides.',
      source: ''
    },
    {
      id: 'q2106',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Runner on first, one out. Ground ball to the shortstop. The shortstop throws to the second baseman covering for the force; that runner is out. The batter-runner reaches first because the throw went to second rather than to first. Score the play, and say what happens to the batter\'s line.',
      choices: [
        '1B. The batter reached, so it is a hit.',
        'FC 6-4. Charge an at-bat and no hit. The defence chose the preceding runner.',
        'E6. The shortstop should have gone to first.',
        '6-4-3. The book assumes the relay to first is always completed.'
      ],
      answer: 1,
      explain: 'Fielder\'s choice is the play where a fielder, with a chance to retire the batter-runner, instead tries to retire a preceding runner, and the batter-runner reaches. Classic 6-4. Reaching is not the same as a hit. The tempting 1B is exactly the misread the scorer is there to stop.',
      source: ''
    },
    {
      id: 'q2107',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 9,
      type: 'mc',
      prompt: 'A runner scores during an at-bat. When do you still not credit RBI to that batter?',
      choices: [
        'Never. If a run scores, the batter gets the RBI.',
        'Only when the run scores on a wild pitch; everything else is an RBI.',
        'On a double play, or when the run scores on an error the batter did not force. The scorer decides, not the crowd.',
        'On a sacrifice fly, because the batter made an out'
      ],
      answer: 2,
      explain: 'Credit RBI on a hit, a fly out, a ground out with fewer than two outs, or a walk with the bases loaded. Do not credit RBI on a double play, or when the run scores on an error the batter did not force. A sacrifice fly is an RBI by design; withholding it is the common mix-up.',
      source: ''
    },
    {
      id: 'q2108',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'A pitching line shows 5.2 IP. What does that mean?',
      choices: [
        'Five and two-tenths innings, because baseball uses decimal innings',
        'Five innings and twenty pitches',
        'Five innings and two hits',
        'Five innings and two outs. IP counts outs, not tenths of an inning.'
      ],
      answer: 3,
      explain: 'Each out is one-third of an inning, written as .1 or .2. 5.2 is five full innings plus two outs, not 5.2 in the decimal sense and not a pitch count. ERA on a game line is usually the season figure; the day\'s story sits in that IP, H, R, ER, BB, SO.',
      source: ''
    },
    {
      id: 'q2109',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 7,
      type: 'mc',
      prompt: 'What does F8 in the scorebook mean?',
      choices: [
        'Fly out to centre field. Centre is scoring number 8.',
        'Fly out to the shortstop, because 8 is a common uniform number there',
        'Eight pitches, then a fly out',
        'A passed ball charged to the catcher'
      ],
      answer: 0,
      explain: 'Left 7, centre 8, right 9. F plus the position is a fly out; a bare 8 is used in some books, but F8 is unambiguous when you are learning the language. Uniform numbers never enter the play string.',
      source: ''
    },
    {
      id: 'q2110',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'positions',
      difficulty: 10,
      type: 'hotspot',
      prompt: 'The shortstop and second baseman have swapped for this pitch. A grounder is fielded by the player now standing at shortstop. That player is 6 in the book. Tap the position you write as 6.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          title: 'Tap scoring number 6',
          desc: 'A diamond with the nine fielders labelled. Tap shortstop — scoring number 6 travels with the position, even if the usual second baseman is standing there.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf']
        }
      },
      targets: ['ss'],
      explain: '6 is whoever is at shortstop on that play. Tapping second base (4) is the usual-lineup trap. A 6-4-3 still starts at shortstop even when the bodies have swapped.',
      source: ''
    },
    {
      id: 'q2111',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Nobody on. A routine hopper straight at the third baseman. The fielder charges, the ball goes through the legs, and the batter reaches. A third baseman at this level is expected to handle that ball with ordinary effort. The runner later scores. What happens to the numbers?',
      choices: [
        'Hit and earned run. Leather was involved, so it cannot be an error.',
        'Hit, but the run is unearned, because the pitcher did not want it.',
        'E5, no hit, at-bat still counts. The run is unearned unless it would have scored anyway. ERA does not take the run; batting average does not take a hit.',
        'E5, but batting average still takes a hit because the batter reached'
      ],
      answer: 2,
      explain: 'Ordinary effort was available, so this is E5, not a hit. The at-bat still counts against the hitter. If that runner later scores, the run is unearned unless it would have scored on the play anyway. The scorer\'s judgment moved both ERA and batting average. That is why the call is not decoration.',
      source: ''
    },
    {
      id: 'q2112',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'Where does a 2-1 count live, and how is that different from pitch count?',
      choices: [
        'Both live on the pitcher\'s line. They are the same tally.',
        'The 2-1 lives in a corner of that batter\'s box. Pitch count is a running tally on the pitcher\'s line, pitch by pitch, including fouls and balls in play.',
        'Pitch count lives in the batter\'s box; the 2-1 is announced and never written.',
        'Neither is written. The umpire tracks both.'
      ],
      answer: 1,
      explain: 'The at-bat count answers “where is this hitter right now?” Pitch count answers “how much work has this pitcher done?” Confusing them is how a 3-2 in the box gets treated as 32 pitches. Write the play in the box while the fielders are still walking the ball in.',
      source: ''
    },
    {
      id: 'q2113',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'Seven-inning line score: visitors 0 0 2 0 1 0 0 — 3 7 1; home 0 1 0 0 0 0 1 — 2 6 2. What can you actually reconstruct?',
      choices: [
        'Every at-bat, because a line score is a full play-by-play',
        'That home won, because they scored in the last inning',
        'That the visitors\' three runs were all earned',
        'When the runs landed, who had more contact, who gave extra outs, and that the last inning was a fight, not a formality. You cannot reconstruct every at-bat.'
      ],
      answer: 3,
      explain: 'The line score is the weather of the game: visitors two in the third and one in the fifth, seven hits, one error; home one in the second and one in the seventh, six hits, two errors, lost by a run. Home had a chance and did not tie it. The extra error is a place to look for an unearned run. It is not a scouting report and it is not a play-by-play.',
      source: ''
    },
    {
      id: 'q2114',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'In a batting line, which completed turns are not official at-bats (AB)?',
      choices: [
        'A walk, a hit-by-pitch, a sacrifice, or catcher\'s interference',
        'A strikeout, because the batter did not put the ball in play',
        'A fielder\'s choice, because there was no hit',
        'An error, because the batter should not have reached'
      ],
      answer: 0,
      explain: 'AB is official times the hitter completed a turn that was not a walk, hit-by-pitch, sacrifice, or catcher\'s interference. Strikeouts, fielder\'s choices, and reaching on an error all count as at-bats. That is why a walk never helps batting average and why an error still charges an AB with no hit.',
      source: ''
    },
    {
      id: 'q2115',
      chapter: 'ch21',
      tier: 'promind',
      topic: 'scoring',
      difficulty: 10,
      type: 'mc',
      prompt: 'Team batting-line hits do not match the hits in the opposing pitching line. Where do you start?',
      choices: [
        'Ignore it. Box scores are decorative.',
        'With a scorer\'s decision — hit versus error versus fielder\'s choice — that one side wrote differently. Team totals at the bottom should add.',
        'Assume the pitching line is always right and erase a hit from a batter.',
        'Assume AVG in the box is the game average, not the season figure coming in'
      ],
      answer: 1,
      explain: 'If the hits in the batting lines do not match the hits in the pitching line against, someone missed a scorer\'s decision. Start there. AVG in a box is usually the season figure coming in, not the game — read the header — but that mismatch is a different error than hits that do not add.',
      source: ''
    },

    /* -------------------------------------------------------------- */
    /* ch22 — Analytics Foundations                                    */
    /* quizIds: q2201–q2208                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q2201',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What question does batting average actually answer, and what does it hide?',
      choices: [
        'How often the batter avoided making an out, including walks',
        'How hard the ball was hit',
        'How many runs the batter created relative to park and league',
        'When charged with an official at-bat, how often they got a hit. It hides walks, hit-by-pitches, and sacrifices, and it treats a single and a home run as equal.'
      ],
      answer: 3,
      explain: 'AVG is hits divided by at-bats. Walks never enter, so a patient hitter looks worse than they are. A single and a home run count the same, so extra-base value is invisible. OBP and slugging exist because those two holes are real. A few dozen at-bats at a loud average are a story, not a skill.',
      source: ''
    },
    {
      id: 'q2202',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'Why is on-base percentage the most important simple offensive number?',
      choices: [
        'It asks how often the batter avoided making an out. Outs are the clock. A walk and a home run still count the same, so extra-base value is not in it.',
        'It already weights extra bases fairly, so you do not need slugging.',
        'It is the official league statistic that replaces WAR.',
        'It ignores walks, so it rewards only balls in play.'
      ],
      answer: 0,
      explain: 'OBP is hits, walks, and hit-by-pitches over plate appearances (sacrifice flies in the denominator). Not making an out is the job. The limitation the next rungs climb is that a walk and a home run look identical. Do not memorize a league-average OBP from a curriculum; the shape of the question is what travels.',
      source: ''
    },
    {
      id: 'q2203',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 9,
      type: 'mc',
      prompt: 'Illustrative lines only: Avery .310 AVG / .330 OBP; Blake .255 AVG / .385 OBP. Who ranks where, and which ranking answers the more useful question?',
      choices: [
        'Avery is the better offensive player on every ladder, because batting average is the truth of a hitter.',
        'Blake is worse, because fewer hits always means fewer runs.',
        'Avery ranks higher by AVG; Blake ranks higher by OBP. OBP answers the more useful question: who hands the defence fewer outs. AVG would have you take Avery.',
        'The two lines are the same player measured two ways, so the ranking cannot change.'
      ],
      answer: 2,
      explain: 'Avery\'s average is louder because almost no walks enter it. Blake avoids making an out more often. In most lineups you want Blake at the top. That swap is the whole lesson of the first four rungs: the number you pick is a question, and AVG is not always the useful one.',
      source: ''
    },
    {
      id: 'q2204',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What does slugging percentage answer, and why are its weights not a theory of run value?',
      choices: [
        'It includes walks, so it is complete offence.',
        'Total bases per at-bat, with a single worth one, a double two, a triple three, a home run four. It hides walks. A double is not worth exactly two singles in run value; the 1-2-3-4 weights are a convenience.',
        'It is park-adjusted by construction.',
        'It is the luck flag for balls in play.'
      ],
      answer: 1,
      explain: 'SLG asks how much extra-base value the batter produced when they did not walk. Walks are invisible. Treating a double as exactly two singles is a bookkeeping convenience, which is why OPS is a rough mix and wOBA exists to put real run weights on each outcome.',
      source: ''
    },
    {
      id: 'q2205',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What is OPS, honestly?',
      choices: [
        'The theoretically correct way to add getting on and extra-base hitting',
        'A plus-stat with 100 as average',
        'Official league WAR',
        'OBP plus SLG — a convenient mix of two numbers built on different scales. Useful as a quick mix. Not principled. wOBA is the attempt at proper weights.'
      ],
      answer: 3,
      explain: 'OPS is OBP + SLG. Those two were not built to be added. It remains a useful caption. It is not a theory of offence, not an index with 100 as average, and not WAR. The lure is treating the sum as the top of the ladder.',
      source: ''
    },
    {
      id: 'q2206',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 8,
      type: 'mc',
      prompt: 'How should you use BABIP?',
      choices: [
        'As a luck and sample-size flag: of balls put in play, how often they fell for hits. A month of BABIP is mostly weather. Do not pay for it as a skill ranking.',
        'As the best measure of how hard a hitter hits the ball',
        'As a substitute for batting average in a 30-at-bat sample',
        'As a defensive metric for outfielders'
      ],
      answer: 0,
      explain: 'True-talent BABIP differences exist — speed, spray, how hard the ball is hit — but a sudden spike or crash is a reason to wait, not a reason to rewrite the scouting report. Hard contact is one ingredient, not the question BABIP answers. Exit velocity and extra-base rate are better hardness questions, and even those need a sample.',
      source: ''
    },
    {
      id: 'q2207',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What does ERA hide that makes FIP exist?',
      choices: [
        'Nothing. Earned runs are fully the pitcher\'s.',
        'Only strikeouts, which is why strikeout rate is a synonym for ERA.',
        'Walks, which is why WHIP is just ERA under another name.',
        'Unearned runs (a scorer\'s hit-versus-error opinion), the defence behind the pitcher, sequencing, and luck on balls in play. A pitcher can pitch well into a high-BABIP month and look broken on ERA.'
      ],
      answer: 3,
      explain: 'ERA is earned runs per nine. Chapter 21\'s ordinary-effort call sits inside it: an error withholds the earned run. Defence, sequencing, and balls in play sit inside it too. FIP exists because ERA is not a control statement. Treating ERA as “what the pitcher fully controlled” is the misreading.',
      source: ''
    },
    {
      id: 'q2208',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'FIP is much better than ERA this month. What is that, and what is it not?',
      choices: [
        'A promise that next month\'s ERA will match FIP',
        'Proof the pitcher controls every ball in play',
        'A flag that defence, sequencing, or luck on balls in play may be doing the pitcher dirt. FIP asks what run prevention would look like from strikeouts, walks, hit-by-pitches, and home runs. It is not actual runs, and it is not a promise.',
        'A reason to ignore walks'
      ],
      answer: 2,
      explain: 'FIP hides balls in play, sequencing, and actual runs allowed. A FIP–ERA gap is a question to ask, not a forecast to bank. Actual runs live in R and in ERA. Counting only what the pitcher most controls is the point; pretending FIP counted the runs is the trap.',
      source: ''
    },
    {
      id: 'q2209',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What does wOBA answer, and what should you not do with last season\'s coefficients?',
      choices: [
        'Properly weighted offensive value of plate appearances, scaled near the on-base scale. Park and league are still in it until a plus version. The weights are re-fit every season; do not memorise them as law.',
        'It is last year\'s league-average OBP, which you should memorise from a textbook.',
        'It is defence plus pitching, combined.',
        'It counts only home runs and strikeouts.'
      ],
      answer: 0,
      explain: 'wOBA weights each plate-appearance outcome by its run value. That is the attempt at the theory OPS is not. The coefficients change. Memorising a current league-average or last year\'s weights is exactly the category error this chapter refuses.',
      source: ''
    },
    {
      id: 'q2210',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 7,
      type: 'scenario',
      prompt: 'A 12U showcase profile lists a .400 average in 30 at-bats as proof of a hit tool. What is that number actually?',
      choices: [
        'True talent. Thirty at-bats is plenty to know.',
        'Weather. The interval around that number is enormous. One week of bleeders or lined-out hard contact will move it a hundred points. Publishing it as a skill is a category error.',
        'Proof of a true .400 hitter you can project from, because batting average becomes skill in a handful of official at-bats.',
        'Proof the player should specialize in baseball immediately.'
      ],
      answer: 1,
      explain: 'Thirty plate appearances at .400 tells you almost nothing. One youth season is still a small sample. Offensive rates in a full adult season start to be about the player. Almost no youth-baseball sample ever gets there. Watch the skill; do not let a hot week impersonate a scouting report.',
      source: 'age-appropriate-skill-progression'
    },
    {
      id: 'q2211',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'A batter posts a wRC+ of 100. What does that mean?',
      choices: [
        'They rank 100th in the league.',
        'They created 100 runs on the season.',
        '100 is average by construction. 120 means about 20 percent above average. It is an index, not a leaderboard position, and it still hides defence.',
        'They are 100 percent likely to be a big-leaguer.'
      ],
      answer: 2,
      explain: 'wRC+ takes weighted offensive value, adjusts for park and league, and indexes it so 100 is average. The lure is reading 100 as a ranking of 100 players. It still needs a large sample, still hides defence, and depending on the implementation may only partly include baserunning.',
      source: ''
    },
    {
      id: 'q2212',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'What does WHIP answer, and what does it hide?',
      choices: [
        'How many baserunners via hit or walk this pitcher allowed per inning. It hides extra-base damage, how those runners scored, and (in the usual form) hit-by-pitches.',
        'Earned runs per nine innings.',
        'How hard opposing hitters hit the ball.',
        'Wins above a freely available replacement.'
      ],
      answer: 0,
      explain: 'WHIP is walks plus hits per inning. A parade of singles and walks looks the same as a parade of doubles if you only count bodies. Hit-by-pitches usually sit outside it. ERA, FIP, and extra-base rates answer the questions WHIP leaves on the table.',
      source: ''
    },
    {
      id: 'q2213',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'Two versions of WAR differ by 1.0 win on the same player. Two players differ by 0.5 win in the same version. How should you read that?',
      choices: [
        'Fire the 0.5-win player. The third decimal is a ranking.',
        'WAR is an official league statistic, so the versions must agree.',
        'Treat fWAR, bWAR, and WARP as interchangeable captions for the same fact.',
        'A 1.0-win gap between versions is a difference in method (defence, replacement level, park). A 0.5-win gap between players is, in most seasons, noise. Do not hire, fire, or rank a roster on the third decimal.'
      ],
      answer: 3,
      explain: 'FanGraphs, Baseball-Reference, and Baseball Prospectus do not use the same defensive inputs, replacement level, or park treatment. That disagreement is the honest state of the art, not a scandal. WAR is a framework versus a freely available replacement, not an official league number, and small gaps are method plus luck.',
      source: ''
    },
    {
      id: 'q2214',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'analytics',
      difficulty: 10,
      type: 'mc',
      prompt: 'Why does youth baseball not live on this statistical ladder?',
      choices: [
        'Because youth stats are more accurate than adult stats, so you can skip watching.',
        'Because WAR is required for 11U All-Star selection.',
        'Almost no youth sample reaches the size where offensive rates settle, and defensive metrics often need multiple adult seasons. Evaluate skill progression. Do not let a small number impersonate a scouting report.',
        'Because a .400 average in 30 at-bats is already a skill you should pay for.'
      ],
      answer: 2,
      explain: 'The knowledge base\'s development framework is built on skill progression rather than results: tee to soft toss to live, with named skills at each age band. Defensive metrics are the most contested family on the ladder even in adult samples. Pretending a youth box score is settled analysis is the failure mode.',
      source: 'age-appropriate-skill-progression'
    },
    {
      id: 'q2215',
      chapter: 'ch22',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'A well-built number and a look each have a failure mode. If you have to choose how to evaluate a youth player, what does this chapter tell you to choose?',
      choices: [
        'A published WAR and nothing else',
        'The look plus a skill checklist. Watch the player, write down the tools, come back in six months. The sample will not carry a WAR and will barely carry an on-base percentage.',
        'Last Tuesday\'s box score, because results never lie',
        'The familiar surname and the last at-bat, taken in conversation before anyone writes a score'
      ],
      answer: 1,
      explain: 'The number without the look is a spreadsheet cosplaying as a scout. The look without the number chases the last at-bat, the familiar surname, and the early-maturing 12-year-old. Independent scores on a sheet, taken before the conversation, keep the look honest. For a youth player, the sample will not carry the ladder.',
      source: 'player-evaluation-and-tryouts'
    },

    /* -------------------------------------------------------------- */
    /* ch23 — Scouting & Player Development                            */
    /* quizIds: q2301–q2308                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q2301',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'What are the five tools for a position player, and what is the hit tool actually?',
      choices: [
        'Speed, height, weight, GPA, and a radar-gun reading',
        'Fastball, slider, changeup, curve, and cutter',
        'Hit, power, run, field, and throw. Hit is barrel control and swing decisions against good pitching — not just a pretty swing in batting practice, and not last Tuesday\'s box score.',
        'Batting average, home runs, stolen bases, errors, and innings'
      ],
      answer: 2,
      explain: 'Tools are observed skills. A 14-year-old who went 4-for-4 against 11U pitching has demonstrated a result in a sample that cannot carry the word “hit tool.” Power is extra-base impact, run is how speed plays on the bases, field is range, hands, and instincts, throw is arm strength and accuracy.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2302',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'Pitchers are not graded on the five position-player tools. What are the usual equivalents?',
      choices: [
        'Fastball (the primary pitch as a weapon), secondary pitches (breaking ball and changeup as a set), command (strikes to the intended spot, not merely strikes), and delivery / durability.',
        'The same five tools as position players, because pitching is hitting in reverse.',
        'Velocity only. Everything else is coaching.',
        'ERA, FIP, WHIP, and WAR, used as the four pitching tools.'
      ],
      answer: 0,
      explain: 'A pitcher with a plus fastball and nothing else is a different prospect from a pitcher with average stuff and plus command. Command is location to the intended spot; throwing strikes in a vacuum is a lower bar. Stats from Chapter 22 are not tools.',
      source: ''
    },
    {
      id: 'q2303',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'On the 20-80 scouting scale, what is 50?',
      choices: [
        'Average for this age group at a youth tryout',
        'A compliment you announce to the player in the cage',
        'The 50th percentile of all humans',
        'Major-league average — not “average person” and not “average 13-year-old.” Almost no 12-year-old should be expected to sit on 50 today.'
      ],
      answer: 3,
      explain: '50 is a professional reference point. 60 is plus (one standard deviation above), 70 plus-plus, 80 the handful of tools in a generation. Using 50 as a youth-tryout compliment is how a child takes a big-league average as a statement about their Tuesday in May.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2304',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 9,
      type: 'mc',
      prompt: 'How is the 20-80 scale spaced, and how do scouts usually grade?',
      choices: [
        'Each point is one win above replacement.',
        'Each 10 points is one standard deviation. Grades usually come in fives (45, 50, 55). A 45 is fringe-average; a 55 is a tick above average.',
        'Each 10 points is ten percent of a roster.',
        '80 is twice 40, so the scale is linear in batting average.'
      ],
      answer: 1,
      explain: '20 is three standard deviations below major-league average; 80 is three above. Grading in fives keeps 45 and 55 available as real distinctions. Collapsing the scale into “good / bad” or into batting-average points throws those distinctions away.',
      source: ''
    },
    {
      id: 'q2305',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'What is the difference between a 45 present / 60 future hit tool and a 60 present / 60 future hit tool?',
      choices: [
        'There is no difference. Scouts collapse present and future into one number.',
        '45/60 is already plus. 60/60 is a project who needs a longer runway.',
        '45/60 is a projection play: below average today, plus possible if growth lands. 60/60 is already plus and is not being bought for growth. Those two players need different plans.',
        '45/60 means the player is 45 percent likely to become a 60.'
      ],
      answer: 2,
      explain: 'Present is what the tool is today against the professional scale. Future is what it can be when the body, the instruction, and the innings have done their work — usually a major-league projection, not “next summer.” Collapsing the two numbers is how organisations mis-rank their own lists. Future grades miss; plan as if the future has to be earned.',
      source: ''
    },
    {
      id: 'q2306',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'pitching',
      difficulty: 10,
      type: 'mc',
      prompt: 'Why is velocity a poor single predictor of who will pitch in the big leagues?',
      choices: [
        'The highest radar reading in a bullpen is the best predictor of a professional future.',
        'Velocity is the command tool; location is a bonus.',
        'A 14-year-old\'s velocity projection is settled after one gun reading.',
        'It is the easiest number in the sport to put on a gun. Plenty of hard throwers cannot command it, land a second pitch, or hold it into the fifth. Plenty of average-velocity pitchers miss bats with shape, command, and sequencing.'
      ],
      answer: 3,
      explain: 'State the number. State the sample. Do not write a professional future on a single bullpen. A youth radar reading is poorer still: bodies change, arms fill in, and a 14-year-old\'s velocity projection is one of the most contested claims in amateur evaluation.',
      source: ''
    },
    {
      id: 'q2307',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'pitching',
      difficulty: 8,
      type: 'mc',
      prompt: 'Spin rate, induced vertical break, and extension each measure one thing. Which matching is right?',
      choices: [
        'Spin rate is how fast the ball is rotating (rpm), not “good” by itself. Induced vertical break is vertical movement relative to a spinless ball. Extension is how far in front of the rubber the pitcher releases — perceived velocity, not a second radar reading.',
        'Spin rate is velocity. Induced vertical break is command. Extension is innings durability.',
        'All three are other words for velocity.',
        'Induced vertical break is how far the catcher has to reach. Extension is the pitcher\'s arm length.'
      ],
      answer: 0,
      explain: 'Spin is a description of rotation; what it does depends on spin axis, velocity, and what the hitter sees. A fastball with more induced vertical break plays “up.” More extension means the ball travels less distance to the plate from the hitter\'s perspective. None of them is a synonym for the gun.',
      source: ''
    },
    {
      id: 'q2308',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'Why is a 14-year-old\'s current results a weak projection signal?',
      choices: [
        'A 4-for-4 against 11U pitching demonstrates a plus hit tool on the 20-80 scale.',
        'Frame, athleticism, and rate of improvement matter more than the showcase line. An early-maturing 12-year-old who dominates evaluation metrics may be measuring puberty, not baseball skill.',
        'Showcase batting average is the projection, because results never lie.',
        'If they dominate now, the future grade is automatically 80.'
      ],
      answer: 1,
      explain: 'Physical-maturity bias is named in the knowledge base. Independent scoring and a note on relative maturity are the mitigation, not a vibe. Present grades on teenagers still have to survive better pitching. Plus today against 14U is not plus on a 20-80 scale unless you meant the professional scale and were careful.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2309',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'At a tryout, a physically early 12-year-old dominates exit velocity and home-to-first. What belongs on the sheet besides the loud numbers?',
      choices: [
        'Nothing. The bigger 12-year-old is always the better prospect.',
        'A note that maturity is irrelevant if the box score is loud.',
        'Relative maturity. A late developer with excellent mechanics at 11U may pass that peer by 14U. Recency and familiarity belong on the sheet too: the last player of the day, and “I know this kid,” are not scores.',
        'A cut of the smaller players, to keep the roster competitive.'
      ],
      answer: 2,
      explain: 'Physical-maturity bias is the trap. Recency inflates the last player unless you review the whole session. Familiarity reproduces itself if the group talks before independent scores are down. Note it; do not hide it; do not pretend the radar gun already did the thinking.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2310',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'What is the relative-age effect, and what should you do with it?',
      choices: [
        'Late-birthday athletes should be discarded so the roster stays “on age.”',
        'Early-birthday athletes should be discarded because they had an unfair head start.',
        'Relative age is a myth in baseball.',
        'Players born earlier in the eligibility year are overrepresented at select levels. Look twice at the late-birthday athlete whose mechanics are ahead of their body. Do not discard the early-birthday athlete.'
      ],
      answer: 3,
      explain: 'Relative age is the sibling of physical-maturity bias: more time to grow and more time on the field, not a moral failing. It is a known pattern in youth sport. It is a reason to look twice, not a reason to run a birthday draft.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2311',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'safety',
      difficulty: 7,
      type: 'mc',
      prompt: 'What does the LTAD evidence base say about single-sport specialization before about 12-13U?',
      choices: [
        'Advise against it at FUNdamentals and Learn to Train. It is associated with higher overuse injury and higher dropout by 15. Pitch Smart, endorsed by Baseball Canada, wants consecutive months away from baseball-specific work each year.',
        'Specialize immediately so college scouts see commitment.',
        'Specialize at 8U if the player is “serious.”',
        'Multi-sport is only for athletes who are not good enough at baseball.'
      ],
      answer: 0,
      explain: 'Baseball Canada\'s LTAD and the Coaching Association of Canada advise against single-sport specialization at those stages. Year-round showcasing and a 10U curveball share a root: buying this week with next year\'s arm and next year\'s love of the game.',
      source: 'ltad-model'
    },
    {
      id: 'q2312',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Forty kids at a tryout. Two coaches start swapping overall impressions in the first hour, and one of them is scoring his own child. What is the fair process?',
      choices: [
        'Score throwing, fielding, hitting, running, and baseball IQ independently, on the same scale, before anyone talks. Recuse the parent-coach from scoring their child. Minimum two evaluators. Equal conditions for every player.',
        'Let the loudest coach rank the room. Independent sheets are bureaucracy.',
        'Score your own child first so the number is honest, then compare notes out loud before writing anything down.',
        'Rank from last week\'s games and skip the tryout if you already know the kids.'
      ],
      answer: 0,
      explain: 'Group conversation before independent scores is how familiarity bias reproduces itself. Recuse a coach from scoring their own child; an independent sheet stands, and the coach reviews it after. Rotate who throws BP. Large discrepancies trigger a second look. Talk to the player afterwards, honest and specific, without apologizing for a fair process.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2313',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'What is a youth evaluation for, and where do the pathways disagree on mechanism?',
      choices: [
        'Little League house tryouts exist to cut eligible registered players who “didn\'t try out well.”',
        'Baseball Canada championships invent a national cut rule that the book does not state.',
        'Little League house evaluation balances teams (Regulation IV); an eligible registered player must be placed. All-Star / representative is a selection. Baseball Canada grassroots is local policy for placement and safety, not a national tryout code. The purpose is development and safety, not a roster at the expense of the players you did not pick.',
        'All pathways use the same 20-80 grades, announced to the players at the cage.'
      ],
      answer: 2,
      explain: 'The pathways disagree on mechanism. They agree on the principle. Evaluation places a player; it does not create a lower caste who then miss mandatory play. Once they are on a team, the playing-time rules still apply. Know which pathway you are standing in before you talk about “the next level.”',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2314',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'You use the 20-80 scale internally. What do you say to a 12-year-old in the cage?',
      choices: [
        'Announce the number so they know where they stand.',
        'Let other parents overhear the future grade; transparency requires it.',
        '“You\'re a 40 arm” — kids need honest labels.',
        'Keep 20-80 internal. Youth language is categories and next skills: “Your ground-ball reads are improving; the next skill is the backhand at game speed.” Kids remember the number, not your present/future caveat.'
      ],
      answer: 3,
      explain: 'The harm is not that the scale is wrong. The harm is that a child takes a professional-average reference point as a statement about their worth on a Tuesday in May. Peers remember it faster than the player does. If you use the scale, keep it internal.',
      source: 'player-evaluation-and-tryouts'
    },
    {
      id: 'q2315',
      chapter: 'ch23',
      tier: 'promind',
      topic: 'scouting',
      difficulty: 10,
      type: 'mc',
      prompt: 'A late-maturing 13-year-old is in a 13U (Train to Train) division. How should you match the work?',
      choices: [
        'Always match work to the birthday on the division list. The division name is the stage.',
        'Match the work to the stage, not only the birthday. That player may still be Learn to Train even if the division says Train to Train.',
        'Train to Win is the default for house-league 11U.',
        'Active Start includes breaking balls and full defensive shifts.'
      ],
      answer: 1,
      explain: 'Baseball Canada\'s LTAD: Active Start (0-6, Tee Ball / Rally Cap), FUNdamentals (6-9), Learn to Train (8-12), Train to Train (12-16), Train to Compete (16-23). Little League\'s Tee Ball to Senior ladder is not branded LTAD, but the developmental logic is compatible. A Canadian player may play Little League in the spring and Baseball Canada club in the summer — know which pathway you are in.',
      source: 'ltad-model'
    },

    /* -------------------------------------------------------------- */
    /* ch24 — The Rulebook’s Edges                                     */
    /* quizIds: q2401–q2408                                            */
    /* -------------------------------------------------------------- */
    {
      id: 'q2401',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Runner from first rounds second on a single to right, misses the bag, ends at third. The defence wants the out at second. The next pitch has not been thrown. What is the ruling?',
      choices: [
        'The runner is automatically out. The umpire should have called it without being asked.',
        'Appeal. Live ball: tag the runner or tag second while making the appeal clear. Dead ball: call time and appeal verbally at second. If the defence pitches, the appeal is lost.',
        'The offence must self-report the miss or the run, once the runner scores, will not count.',
        'The miss is legalized as soon as the runner reaches third, because the force is off.'
      ],
      answer: 1,
      explain: 'Missing a base is an appeal play. The umpire may have seen it and will still wait. Live-ball appeal is a tag of the runner or of the missed base with the appeal stated; dead-ball appeal is time plus a verbal appeal at the base. There is no delayed gift and no duty on the offence to confess.',
      source: ''
    },
    {
      id: 'q2402',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Runner on third leaves the bag before the outfielder\'s first touch of a fly ball that is caught. The runner scores. The defence does not appeal. The pitcher throws to the next batter. Does the run count?',
      choices: [
        'No. The run comes off the board automatically. Leaving early is not an appeal play.',
        'No. The umpire must call the runner out without an appeal once they notice the early leave.',
        'Yes. The runner may leave on the fielder\'s first touch, not on the catch being secured, but leave-early is still an appeal. The right to appeal was lost when a pitch was made to the next batter.',
        'Yes only if the catcher dropped the throw home. Otherwise the run is held pending a league review.'
      ],
      answer: 2,
      explain: 'First touch is the timing, not the catch being secured. Leave-early is still an appeal, not an automatic out. Once a pitch is made to the next batter — or the defence makes a non-appeal play, or leaves the field after the inning — the appeal is gone and the run stays. Appeal before you go back to pitching.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q2403',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Batting order is Avery, Blake, Casey, Drew. Avery is due. Blake bats, doubles, and the runner who was on first scores. The defence appeals before the next pitch. What happens?',
      choices: [
        'Avery (the proper batter) is out. Blake is removed from second. The run driven by the improper at-bat is nullified. Next batter is Blake. Casey does not skip to the plate.',
        'Blake is out, the double stands as a dead-ball out, and the run counts because it happened before the appeal.',
        'The at-bat is legal because Blake is in the lineup. You can only appeal if a player not in the lineup batted.',
        'Both Blake and Avery are out, and the next batter is Drew.'
      ],
      answer: 0,
      explain: 'The proper batter — Avery, who failed to bat in turn — is out. Advances caused by that at-bat (the double, the run it drove in) come off. Independent advances during the at-bat (a stolen base, a balk, a wild pitch) would stay. Next is the name after the proper batter who was just called out: Blake. OBR 6.03(b). Batting out of order is a rule application, and it is protestable if it is misapplied.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2404',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Same order: Avery, Blake, Casey, Drew. Blake batted in Avery\'s spot and doubled. The pitcher throws a pitch to Casey before anyone appeals. What is legal now?',
      choices: [
        'Avery is still out if the defence appeals now. The next pitch does not legalize an improper batter.',
        'Both Blake and Avery are out, and Casey\'s at-bat is wiped.',
        'Casey\'s pitch is ignored and you rewind to Avery.',
        'Blake\'s double is legalized. The run counts. You cannot go back. After Casey\'s turn, the next proper batter is Drew — the name after the batter whose at-bat was just legalized. Avery does not get a make-up.'
      ],
      answer: 3,
      explain: 'A pitch to the next batter legalizes the improper batter. That is the whole difference between appealing in time and appealing late: in time, you get the proper batter out and you unwind the at-bat; late, the improper batter becomes the proper batter and the order continues from there.',
      source: ''
    },
    {
      id: 'q2405',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'fielding',
      difficulty: 9,
      type: 'mc',
      prompt: 'What is the efficient rundown, including the default direction?',
      choices: [
        'Jog, pump-fake five times, and give the runner the next base if it breaks down.',
        'Run at the runner at full speed and make them commit. Chase them back toward the base they came from. The ideal is one throw and a tag. Three throws is a coaching failure.',
        'Always run them toward the next base so the tag is closer to a run.',
        'The catcher should stand in the lane without the ball to cut the rundown short.'
      ],
      answer: 1,
      explain: 'Caught between second and third, run them toward second; between first and second, toward first. If the rundown breaks down, you have not given them the next base for free. One or two fakes can hold a runner; more than that and they start reacting to the fake instead of the ball. Follow the throw and become the new cover. Assign someone to the far base — trailing runners advance while everyone stares.',
      source: 'rundowns-and-pickoffs'
    },
    {
      id: 'q2406',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Rundown between third and home. The catcher, without the ball, stands in the baseline. The runner has to stop. The third baseman then tags the runner. A play is being made on that runner. Ruling?',
      choices: [
        'The runner is out. Fielders may block without the ball during a rundown.',
        'Interference on the runner for running into a fielder.',
        'Obstruction, Type 1. The catcher had neither the ball nor a batted ball to field. Award the runner at least the base they would have reached — here, home. The tag does not stand.',
        'Dead ball immediately; runner is sent back to third.'
      ],
      answer: 2,
      explain: 'Who impeded whom is the whole analysis. A fielder without the ball and not fielding a batted ball who impedes a runner has obstructed. In a rundown a play is being made on that runner, so this is Type 1 (OBR 6.01(h)(1)). “Make him commit” does not include standing in the lane empty-handed. That is the obstruction risk the rundown page warns about.',
      source: 'interference-and-obstruction'
    },
    {
      id: 'q2407',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 8,
      type: 'scenario',
      prompt: 'Batter-runner rounds first on a single to the outfield. The first baseman, without the ball and not fielding, is in the running lane and slows the runner. No play is being made on that runner at the time. The ball is still in the outfield. Ruling?',
      choices: [
        'Type 2 obstruction. The ball stays live. The umpire calls obstruction and, at the end of the play, awards the bases the runner would have reached. Type 2 does not kill the play.',
        'Immediate dead ball. Award second at once.',
        'Nothing. The runner must go around any fielder near a base.',
        'Type 1, because every obstruction is Type 1.'
      ],
      answer: 0,
      explain: 'No play being made on that runner: Type 2, OBR 6.01(h)(2). The award waits until the play ends. A fielder who is actually fielding a batted ball still has priority — contact then is interference on the runner, not obstruction on the fielder. That swap is the most common confusion on this rule.',
      source: 'interference-and-obstruction'
    },
    {
      id: 'q2408',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'Little League regular season; the local league has adopted the courtesy-runner option. Two outs. The catcher of record is on first. The coach wants a courtesy runner. What is true?',
      choices: [
        'Anyone on the bench may run, as often as they like, in any pathway.',
        'Courtesy runners are illegal in all youth baseball.',
        'The Little League option travels automatically into a Baseball Canada championship game.',
        'Yes, if the local option is on: a player not currently in the batting order (traditional order: not more than once per game; continuous order: the player who made the last out), for the pitcher and/or catcher of record, with two outs. Baseball Canada championship play has no general OBR courtesy-runner mechanism.'
      ],
      answer: 3,
      explain: 'Little League Rule 3.04 / 7.14b is a local-league option, regular season. Baseball Canada championship play follows OBR, which does not provide a general courtesy runner. Do not carry the Little League option into a championship game that is not playing under it. Confirm the local adoption before you send someone.',
      source: 'courtesy-runner-rules'
    },
    {
      id: 'q2409',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'order',
      prompt: 'Live ball. A runner missed second and is now on third. Put the defence\'s appeal in the order you actually do it.',
      items: [
        'Keep the ball live',
        'Tag the runner, or tag second',
        'Make the appeal clear (verbally is the clean way)',
        'Finish before the next pitch, a non-appeal play, or leaving the field'
      ],
      explain: 'The book waits for you to ask. Dead-ball is a different sequence: call time, then appeal verbally at the missed base. Either way, the right to appeal dies on the next pitch, on a play or attempted play that is not the appeal, or when the defence has left the field after the inning.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q2410',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'Plate meeting. The home coach wants a ground rule that any ball rolling under the outfield fence is a home run, and also that the infield fly is waived today because the infield is wet. What can a ground rule do?',
      choices: [
        'Both are legal ground rules if both coaches and the umpires agree.',
        'The under-fence award can be agreed as a local peculiarity (commonly two bases out of play, not a home-run rewrite). The infield fly cannot be waived. Ground rules supplement the playing rules; they do not replace them.',
        'Ground rules can override anything in the book if the umpires sign off.',
        'Ground rules can make a judgment call protestable by local agreement.'
      ],
      answer: 1,
      explain: 'Ground rules cover this field today: a ball under that fence, the dead-ball area beyond that gate. They cannot waive infield fly, obstruction, or balks, and they cannot make a judgment call protestable. A later misapplication of an agreed ground-rule award — the wrong number of bases — is a rule question, and it is protestable. Wet grass is not a licence to edit the book.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2411',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'scenario',
      prompt: 'Two beefs after the same play. The coach believes a called third strike was a ball. The coach also believes the umpire awarded only one base on a Type 1 obstruction that should have been at least the next base, and possibly home. What is protestable?',
      choices: [
        'Protest both. Any disagreement with an umpire is a protest if you file in time.',
        'Nothing is protestable. Live with every call, including a misapplied rule.',
        'The strike is a judgment call and is not protestable. The number of bases awarded on obstruction is a rule application and is protestable if you believe the rule was misapplied. Inform the umpire before the next pitch; Baseball Canada championships require a $100 cash deposit.',
        'Only the strike is protestable, because balls and strikes are the most important calls.'
      ],
      answer: 2,
      explain: 'The test: “Was the rule applied correctly?” is protestable. “Did the umpire see it correctly?” is not. Balls and strikes, safe/out, fair/foul, catch versus trap are judgment, final, under both pathways. Only the head coach. Before the next pitch, play, or attempted play. A valid protest without the Baseball Canada championship deposit is not heard. Carry the $100.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2412',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'fielding',
      difficulty: 7,
      type: 'hotspot',
      prompt: 'Rundown between first and second. The first baseman has the ball and is running to make the runner commit. Who backs up first so a wild throw does not give the next base away? Tap that position.',
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          positions: true,
          positionStyle: 'both',
          runners: ['first'],
          title: 'Tap who backs up first',
          desc: 'A full diamond with a runner off first. The first baseman has the ball. Tap the pitcher — the backup at first in a first-and-second rundown.',
          hotspots: ['p', 'c', '1b', '2b', '3b', 'ss']
        }
      },
      targets: ['p'],
      explain: 'Between first and second: first baseman and second baseman as the chasers, shortstop covering second, pitcher backing up first. Tapping the shortstop is the cover at second, which is a different job. Follow the throw; do not invent a third throw; someone still has to look at third and home.',
      source: 'rundowns-and-pickoffs'
    },
    {
      id: 'q2413',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'Who may formally address the umpire to question a ruling, and what happens if someone else comes out to argue?',
      choices: [
        'Only the designated manager or head coach. Assistants and players who come out to argue can be ejected.',
        'Anyone on the roster may protest a strike.',
        'Parents in the stands file the $100 deposit while the play is live.',
        'The assistant pitching coach argues balls and strikes; the head coach stays in the dugout.'
      ],
      answer: 0,
      explain: 'Request time, ask a question, accept the answer, and if you are protesting, say so before the next pitch. Physical contact with an umpire is an automatic ejection. How coaches handle the call teaches players more than a post-game talk about respect. Calm, then the formal door if the rule was misapplied.',
      source: 'coach-umpire-interaction'
    },
    {
      id: 'q2414',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'rules',
      difficulty: 10,
      type: 'mc',
      prompt: 'The right to appeal is lost when which of these happens?',
      choices: [
        'Only when the game ends.',
        'Only if the umpire did not see the miss.',
        'When the runner asks for time.',
        'When the next pitch is made, or the defence makes a play or attempted play that is not the appeal, or the inning ends and the defensive team has left the field.'
      ],
      answer: 3,
      explain: 'If the runner left early, scored, and you throw a pitch to the next batter, the run stays. Seeing the miss is not the same as converting it. The umpire waits. There is no delayed gift. Appeal before you go back to work.',
      source: 'tagging-up-and-reads'
    },
    {
      id: 'q2415',
      chapter: 'ch24',
      tier: 'promind',
      topic: 'strategy',
      difficulty: 10,
      type: 'mc',
      prompt: 'In a rundown, what does “make him commit” allow, and what does it not allow?',
      choices: [
        'Standing in the baseline empty-handed is part of making the runner commit.',
        'Run at the runner at full speed so they pick a direction. One or two fakes can hold them. Standing in the lane without the ball is obstruction, even in a rundown, even if everyone meant well.',
        'Three-throw rundowns are the badge of a well-coached team.',
        'Trailing runners are frozen by rule during a rundown, so you can ignore the far base.'
      ],
      answer: 1,
      explain: 'Jogging and pump-faking lets the runner reverse and extends the play. The fielder with the ball runs until a throw is necessary; the covering fielder calls “Now!”; the throw is chest-high on the glove side; the tag is a sweep. Trailing runners advance while everyone stares — assign the far base. Empty-handed in the lane is Type 1 when a play is being made on that runner, which in a rundown it usually is.',
      source: 'rundowns-and-pickoffs'
    }

  ]);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
