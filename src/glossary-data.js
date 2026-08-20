/* ===================================================================
   Homerun Learn to Play — glossary-data.js
   Glossary of baseball terms used across the 24 chapters.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_GLOSSARY) and via Node require() for tests.
   Definitions follow the introducing chapter's teaching level.
   Division splits are sourced from youth-baseball-canada wiki pages.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function cloneList(list) {
    var out = [];
    var i;
    for (i = 0; i < list.length; i++) out.push(list[i]);
    return out;
  }

  function trimStr(s) {
    return String(s == null ? '' : s).replace(/^\s+|\s+$/g, '');
  }

  function haystackOf(entry) {
    var s;
    var i;
    if (!entry) return '';
    s = String(entry.term || '') + ' ' + String(entry.short || '') + ' ' +
      String(entry.definition || '');
    if (isArray(entry.aliases)) {
      for (i = 0; i < entry.aliases.length; i++) {
        s += ' ' + String(entry.aliases[i] || '');
      }
    }
    return s.toLowerCase();
  }

  function firstLetter(term) {
    var ch = String(term || '').charAt(0).toUpperCase();
    if (ch >= 'A' && ch <= 'Z') return ch;
    return '#';
  }

  function compareTerm(a, b) {
    var at = a && a.term ? String(a.term).toLowerCase() : '';
    var bt = b && b.term ? String(b.term).toLowerCase() : '';
    if (at < bt) return -1;
    if (at > bt) return 1;
    return 0;
  }

  var TERMS = [

    /* -------------------------------------------------------------- */
    /* ch01 — What Baseball Is                                         */
    /* -------------------------------------------------------------- */
    {
      slug: 'run',
      term: 'Run',
      aliases: ['score', 'runs'],
      short: 'One point, scored by touching all four bases in order.',
      definition: 'A run is how baseball keeps score. A batter becomes a runner and must touch first, then second, then third, then home plate — all four bases, in order — for the run to count. Missing a base means the run is not yet in. The team with more runs at the end of the game wins.',
      chapter: 'ch01',
      related: ['home-plate', 'out', 'inning']
    },
    {
      slug: 'out',
      term: 'Out',
      aliases: ['retired', 'putout'],
      short: 'A batter or runner who is retired. Three outs end a turn at bat.',
      definition: 'An out is a batter or runner who is retired — tagged, forced at a base, caught on a fly, or struck out. The fielding team is trying to record outs. Three outs end that team’s turn at bat, and the sides swap jobs.',
      chapter: 'ch01',
      related: ['inning', 'half-inning', 'run']
    },
    {
      slug: 'inning',
      term: 'Inning',
      aliases: ['innings'],
      short: 'One full turn for each team: visitors bat, then home bats.',
      definition: 'An inning is two half-innings. The visiting team bats first (the top); the home team bats second (the bottom). There is no running clock like soccer — an inning lasts until the third out, however long that takes. Adult baseball is nine innings; youth games are shorter, and local leagues often add a time cap on top.',
      chapter: 'ch01',
      related: ['half-inning', 'out', 'extra-innings']
    },
    {
      slug: 'half-inning',
      term: 'Half-inning',
      aliases: ['half inning', 'top of the inning', 'bottom of the inning'],
      short: 'One team’s turn at bat, ending when the third out is recorded.',
      definition: 'A half-inning is one team’s turn at bat. After three outs, the teams swap: the fielders come in to bat, and the batters go out to field. Two half-innings make one full inning. The visitors bat in the top; home bats in the bottom.',
      chapter: 'ch01',
      related: ['inning', 'out', 'run']
    },
    {
      slug: 'home-plate',
      term: 'Home plate',
      aliases: ['plate', 'home', 'the dish'],
      short: 'The five-sided base the batter hits from, and the last base a runner must touch.',
      definition: 'Home plate is the five-sided white rubber at the point of the diamond. The batter stands beside it to hit. A run scores only when a runner touches it after first, second, and third, in order. It is 17 inches wide, and that width is the left-to-right span of the strike zone.',
      chapter: 'ch01',
      related: ['run', 'strike-zone', 'batters-box']
    },

    /* -------------------------------------------------------------- */
    /* ch02 — The Field                                                */
    /* -------------------------------------------------------------- */
    {
      slug: 'fair-territory',
      term: 'Fair territory',
      aliases: ['fair ball', 'in play', 'fair ground'],
      short: 'The playing area between the foul lines, including the lines themselves.',
      definition: 'Fair territory is the field between the two foul lines, from home plate out to the fence, including the foul lines themselves. A batted ball that settles or is touched in fair territory is in play. The infield dirt, the outfield grass, and the bases all sit in fair territory.',
      chapter: 'ch02',
      related: ['foul-territory', 'foul-line', 'infield'],
      diagram: {
        svg: 'field',
        opts: {
          preset: 'major-ll',
          labels: true,
          title: 'Fair territory on a youth diamond',
          desc: 'A baseball diamond viewed from behind home plate, with fair territory between the foul lines labelled.'
        }
      }
    },
    {
      slug: 'foul-territory',
      term: 'Foul territory',
      aliases: ['foul ground', 'foul ball territory'],
      short: 'The area outside the foul lines, including the dugouts and backstop.',
      definition: 'Foul territory is everything outside the two foul lines. A batted ball that settles or is first touched there is a foul ball. The dugouts, the backstop, and most of the coaches’ boxes sit in foul territory. Fielders may still catch a fly in foul territory for an out.',
      chapter: 'ch02',
      related: ['fair-territory', 'foul-line', 'foul-ball']
    },
    {
      slug: 'foul-line',
      term: 'Foul line',
      aliases: ['foul lines', 'baseline', 'fair line'],
      short: 'The white line from home through first or third; the line itself is fair.',
      definition: 'The two foul lines run from home plate through first and through third, all the way to the fence. A ball that hits the line is fair. The lines are part of fair territory, not a no-man’s-land. The poles at the fence are the same idea: a ball that hits the foul pole is a home run.',
      chapter: 'ch02',
      related: ['fair-territory', 'foul-territory', 'first-base']
    },
    {
      slug: 'infield',
      term: 'Infield',
      aliases: ['diamond', 'the dirt'],
      short: 'The dirt diamond and the grass inside it, around the four bases.',
      definition: 'The infield is the square of dirt and the grass inside it, around home, first, second, and third. Four infielders play here — first base, second base, third base, and shortstop — plus the pitcher and catcher. Diamond size scales with division: Little League Major is 60-foot bases; Baseball Canada 13U is 70; the adult diamond is 90.',
      chapter: 'ch02',
      related: ['outfield', 'pitchers-mound', 'home-plate']
    },
    {
      slug: 'outfield',
      term: 'Outfield',
      aliases: ['the grass', 'outfield grass'],
      short: 'The grass beyond the infield, from the dirt out to the fence.',
      definition: 'The outfield is the grass beyond the infield dirt, running out to the fence. Three outfielders play here: left field, centre field, and right field. A warning track of dirt or crushed stone sits in front of the fence so a fielder can feel the wall coming without looking up.',
      chapter: 'ch02',
      related: ['infield', 'warning-track', 'centre-field']
    },
    {
      slug: 'pitchers-mound',
      term: "Pitcher's mound",
      aliases: ['mound', 'rubber', 'pitching rubber'],
      short: 'The raised dirt circle the pitcher throws from, with a rubber on top.',
      definition: 'The pitcher throws from a raised dirt circle in the middle of the infield. A rectangular rubber is set on top; the pitcher must start in contact with it. Mound distance scales with division: Little League Major is 46 feet, Little League Intermediate is 50, and the full diamond is 60 feet 6 inches.',
      chapter: 'ch02',
      related: ['pitcher', 'infield', 'set-position']
    },
    {
      slug: 'warning-track',
      term: 'Warning track',
      aliases: ['track', 'warning path'],
      short: 'A strip of dirt in front of the fence that tells an outfielder the wall is close.',
      definition: 'The warning track is a band of dirt or crushed stone just inside the outfield fence. An outfielder running back on a fly ball feels the surface change underfoot and knows the wall is close, without taking their eyes off the ball. It is a safety feature, not a separate rule of play.',
      chapter: 'ch02',
      related: ['outfield', 'backstop', 'centre-field']
    },
    {
      slug: 'backstop',
      term: 'Backstop',
      aliases: ['screen', 'catcher screen'],
      short: 'The fence or screen behind home plate that stops missed pitches.',
      definition: 'The backstop is the fence or screen behind home plate. It stops pitches the catcher misses, and it keeps foul balls from flying into the stands. On a wild pitch or passed ball, the ball often caroms off the backstop — that extra bounce is time for a runner to advance.',
      chapter: 'ch02',
      related: ['home-plate', 'catcher', 'dugout']
    },
    {
      slug: 'dugout',
      term: 'Dugout',
      aliases: ['bench', 'the bench'],
      short: 'The sheltered bench where the batting team and substitutes sit.',
      definition: 'Each team has a dugout — a sheltered bench along the foul line. The batting team sits there between at-bats; substitutes wait there too. Bats stay quiet in the dugout. Swinging happens only in a designated area: a cage, a station, or the batter’s box.',
      chapter: 'ch02',
      related: ['on-deck-circle', 'batters-box', 'on-deck']
    },
    {
      slug: 'on-deck-circle',
      term: 'On-deck circle',
      aliases: ['on deck circle', 'next batter circle'],
      short: 'The marked circle where the next batter warms up.',
      definition: 'The on-deck circle is a marked disc in foul territory where the next batter waits and takes practice swings. Little League Major and below do not use an on-deck position — the next batter stays in the dugout. Where on-deck is allowed, a double-earflap helmet is required.',
      chapter: 'ch02',
      related: ['on-deck', 'batters-box', 'dugout']
    },
    {
      slug: 'batters-box',
      term: "Batter's box",
      aliases: ['batters box', 'the box'],
      short: 'The rectangle beside home plate the batter must stand in to hit.',
      definition: 'There are two batter’s boxes, one on each side of home plate. A right-handed batter uses the box on the third-base side; a left-handed batter uses the first-base side. The batter must have both feet in the box as the pitcher starts the motion. Stepping out without time granted can cost a strike.',
      chapter: 'ch02',
      related: ['home-plate', 'catchers-box', 'strike-zone']
    },
    {
      slug: 'catchers-box',
      term: "Catcher's box",
      aliases: ['catchers box'],
      short: 'The rectangle behind the plate where the catcher sets up to receive.',
      definition: 'The catcher’s box is the rectangle in the dirt behind home plate. The catcher starts each pitch in that box, in a squat, to receive the ball. Once the pitch is on the way they may move, but they begin there so the umpire can see the zone and the batter has a clear swing.',
      chapter: 'ch02',
      related: ['catcher', 'batters-box', 'home-plate']
    },

    /* -------------------------------------------------------------- */
    /* ch03 — The Nine Positions                                       */
    /* -------------------------------------------------------------- */
    {
      slug: 'pitcher',
      term: 'Pitcher',
      aliases: ['P', 'hurler', 'the 1'],
      short: 'Position 1. Throws the ball to the batter from the mound.',
      definition: 'The pitcher stands on the mound and throws to the catcher, trying to get the batter out. Together with the catcher they are the battery. In the scorebook the pitcher is number 1. Youth pitch counts and rest days cap how much they may throw; those grids differ by pathway and age.',
      chapter: 'ch03',
      related: ['catcher', 'battery', 'pitch-count']
    },
    {
      slug: 'catcher',
      term: 'Catcher',
      aliases: ['C', 'the 2'],
      short: 'Position 2. Crouches behind the plate to receive every pitch.',
      definition: 'The catcher crouches behind home plate, receives every pitch, and is the only fielder who faces the whole diamond. They call pitches, throw to bases, and block balls in the dirt. In the scorebook they are number 2. Full catcher’s gear is required any time they receive a pitcher, including warmup.',
      chapter: 'ch03',
      related: ['pitcher', 'battery', 'catchers-gear']
    },
    {
      slug: 'first-base',
      term: 'First base',
      aliases: ['1B', 'first', 'the 3', 'first baseman'],
      short: 'Position 3. Holds the bag the batter must reach, and fields the right side.',
      definition: 'The first baseman plays on the right side of the infield and covers first base. Almost every ground ball ends with a throw there, so they catch a lot of balls in the dirt. In the scorebook they are number 3. A batter-runner may overrun first on a grounder and return without being tagged, if they turn into foul territory.',
      chapter: 'ch03',
      related: ['second-base', 'overrun', 'force-out']
    },
    {
      slug: 'second-base',
      term: 'Second base',
      aliases: ['2B', 'second', 'the 4', 'second baseman', 'keystone'],
      short: 'Position 4. Covers the bag at second and the right side of the middle.',
      definition: 'The second baseman plays between first and second, a few steps behind the baseline. With the shortstop they cover second base on steals and turn double plays. In the scorebook they are number 4. On a steal of second, one of the middle infielders covers; the other backs up.',
      chapter: 'ch03',
      related: ['shortstop', 'double-play', 'first-base']
    },
    {
      slug: 'third-base',
      term: 'Third base',
      aliases: ['3B', 'third', 'the 5', 'third baseman', 'hot corner'],
      short: 'Position 5. The hot corner: hard-hit balls and bunts down the left line.',
      definition: 'The third baseman plays on the left side of the infield, several steps inside the line. Hard-hit balls get there quickly, which is why coaches call it the hot corner. They also charge bunts. In the scorebook they are number 5. A 5-3 is a ground out, third to first.',
      chapter: 'ch03',
      related: ['shortstop', 'first-base', 'bunt-defense']
    },
    {
      slug: 'shortstop',
      term: 'Shortstop',
      aliases: ['SS', 'short', 'the 6'],
      short: 'Position 6. The left-side middle infielder, between second and third.',
      definition: 'The shortstop plays between second and third, a few steps behind the baseline. They take more ground balls than anyone else in the infield and start many double plays. In the scorebook they are number 6. A 6-4-3 is a shortstop-to-second-to-first double play.',
      chapter: 'ch03',
      related: ['second-base', 'double-play', 'third-base']
    },
    {
      slug: 'left-field',
      term: 'Left field',
      aliases: ['LF', 'left', 'the 7', 'left fielder'],
      short: 'Position 7. The outfielder on the third-base side of the grass.',
      definition: 'The left fielder plays in the outfield on the third-base side. Right-handed pull hitters send a lot of balls there. In the scorebook they are number 7. A fly out to left is F7. They back up third on throws and back up the shortstop on balls in the hole.',
      chapter: 'ch03',
      related: ['centre-field', 'right-field', 'outfield']
    },
    {
      slug: 'centre-field',
      term: 'Centre field',
      aliases: ['center field', 'CF', 'centre', 'center', 'the 8', 'centre fielder'],
      short: 'Position 8. The outfielder in the middle, with priority on most flies.',
      definition: 'The centre fielder plays the middle of the outfield and covers the most ground. On a fly ball that two outfielders can both reach, centre field has priority. In the scorebook they are number 8. A fly out to centre is F8. Canadian spelling is centre; you will also see the American center on imported gear and box scores.',
      chapter: 'ch03',
      related: ['left-field', 'right-field', 'centre-field-priority']
    },
    {
      slug: 'right-field',
      term: 'Right field',
      aliases: ['RF', 'right', 'the 9', 'right fielder'],
      short: 'Position 9. The outfielder on the first-base side of the grass.',
      definition: 'The right fielder plays in the outfield on the first-base side. They have the longest throw to third, so a strong, accurate arm matters. In the scorebook they are number 9. A fly out to right is F9. They back up first on throws from the infield.',
      chapter: 'ch03',
      related: ['centre-field', 'left-field', 'outfield']
    },
    {
      slug: 'battery',
      term: 'Battery',
      aliases: ['pitcher and catcher', 'the battery'],
      short: 'The pitcher and catcher together, working as one unit.',
      definition: 'The battery is the pitcher and the catcher as a pair. They share signs, location, and the plan for each hitter. Every other fielder is either an infielder or an outfielder; these two are their own unit. A pitching change is a battery change even if the catcher stays.',
      chapter: 'ch03',
      related: ['pitcher', 'catcher', 'position-numbers']
    },
    {
      slug: 'position-numbers',
      term: 'Position numbers',
      aliases: ['scoring numbers', '1 through 9', 'fielding numbers'],
      short: 'The 1–9 scoring numbers that travel with the position, not the person.',
      definition: 'The nine fielding positions are numbered so a play can be written as a sentence: pitcher 1, catcher 2, first 3, second 4, third 5, shortstop 6, left 7, centre 8, right 9. Those are scoring numbers, not uniform numbers. A 6-4-3 is shortstop to second to first. The numbers travel with the position on that play, not with the player who usually stands there.',
      chapter: 'ch03',
      related: ['battery', 'double-play', 'scorebook'],
      diagram: {
        svg: 'positionGrid',
        opts: {
          title: 'The nine fielding positions',
          desc: 'A reference card of the nine fielding positions: scoring number, abbreviation, full name, and unit colour.'
        }
      }
    },
    {
      slug: 'double-play',
      term: 'Double play',
      aliases: ['DP', 'twin killing', '6-4-3', 'turning two'],
      short: 'Two outs recorded on the same continuous play.',
      definition: 'A double play is two outs on one continuous play, most often a ground ball with a runner on first: the defence touches second, then throws to first. The classic 6-4-3 is shortstop to second to first. The force at second must be completed before the batter-runner reaches first. With two already out, a double play ends the inning on the first of those two outs.',
      chapter: 'ch03',
      related: ['force-out', 'double-play-feed', 'double-play-depth']
    },

    /* -------------------------------------------------------------- */
    /* ch04 — Gear, Safety & the Homerun Way                           */
    /* -------------------------------------------------------------- */
    {
      slug: 'batting-helmet',
      term: 'Batting helmet',
      aliases: ['helmet', 'double-earflap helmet', 'NOCSAE helmet'],
      short: 'A double-earflap helmet, required for batters, on-deck, and all runners.',
      definition: 'A batting helmet in youth baseball is a double-earflap NOCSAE helmet. Batters, on-deck hitters (where on-deck is allowed), and every base runner must wear one. Taking it off on the paths is a safety problem, not a fashion choice. Put it back on; stay in it until the dugout.',
      chapter: 'ch04',
      related: ['catchers-gear', 'concussion', 'on-deck']
    },
    {
      slug: 'catchers-gear',
      term: "Catcher's gear",
      aliases: ['catchers gear', 'the tools of ignorance', 'full gear'],
      short: 'Mask, helmet, chest protector, shin guards, and a cup — any time you receive a pitcher.',
      definition: 'Catcher’s gear is the full set: a mask with throat protection, a helmet, a chest protector, shin guards, and a protective cup for male catchers. It is required whenever someone is receiving or warming up a pitcher, not only in the game squat. A cap and a fielder’s glove are not catcher’s gear.',
      chapter: 'ch04',
      related: ['catcher', 'batting-helmet', 'concussion']
    },
    {
      slug: 'concussion',
      term: 'Concussion',
      aliases: ['brain injury', "Rowan's Law"],
      short: 'A brain injury. Recognize, remove, refer. No same-day return.',
      definition: 'A concussion is a brain injury from a hit to the head or a blow that jerks the head. It does not require blacking out. Coaches do not diagnose: they recognize, remove, and refer. Any suspected concussion means the player comes off immediately, with no same-day return even if they say they feel fine. In Ontario, Rowan’s Law makes annual awareness reading, immediate removal, and a staged return with medical clearance a legal duty for youth sport.',
      chapter: 'ch04',
      related: ['batting-helmet', 'catchers-gear', 'humidex']
    },
    {
      slug: 'humidex',
      term: 'Humidex',
      aliases: ['heat index', 'humidity index'],
      short: 'Canada’s heat-humidity index. Coaches use it, not the raw thermometer.',
      definition: 'Humidex combines temperature and humidity into one number Environment Canada publishes. Youth sport guidance: below 35, normal play with scheduled water; 35–39, more breaks and shade; 40–45, shorten or reschedule; above 45, suspend outdoor activity. A humid 32 °C day can sit in a more dangerous band than a dry 36 °C day. Catchers in full gear get extra eyes.',
      chapter: 'ch04',
      related: ['concussion', 'catchers-gear', 'roots']
    },
    {
      slug: 'roots',
      term: 'ROOTS',
      aliases: ['honouring the game', 'honoring the game', 'the Homerun Way'],
      short: 'Rules, Officials, Opponents, Teammates, Self — how Homerun honours the game.',
      definition: 'ROOTS is Homerun Baseball Ottawa’s way of honouring the game: Rules, Officials, Opponents, Teammates, and Self. We play the rules as written for this pathway and division. Umpires are part of the game; disagreement goes through the coach. We compete hard and shake hands. We back each other up. We control our effort, our voice, and our next play. Effort, then Respect, then Team — always in that order.',
      chapter: 'ch04',
      related: ['protest', 'judgment-call', 'coach-interference']
    },
    {
      slug: 'usabat',
      term: 'USABat',
      aliases: ['USA Baseball bat', 'USA stamp', 'USABat standard'],
      short: 'The youth bat stamp Little League requires at Major and below (2⅝-inch barrel).',
      definition: 'USABat is the USA Baseball youth bat standard, in force since 2018. Little League Major and below require the USABat mark and a 2⅝-inch barrel maximum. Intermediate and Junior may use USABat or BBCOR; Senior is all BBCOR. A 2¾-inch 1.15-BPF bat that is legal for Baseball Canada 13U is not USABat-legal for Little League Major. Confirm the stamp for the pathway you are in tonight.',
      chapter: 'ch04',
      related: ['bbcor', 'batting-helmet', 'roots']
    },
    {
      slug: 'bbcor',
      term: 'BBCOR',
      aliases: ['BBCOR bat', 'minus-3', 'college bat'],
      short: 'The −3 metal/composite standard both pathways use at the oldest youth levels.',
      definition: 'BBCOR (Batted Ball Coefficient of Restitution) is the performance stamp on −3 metal and composite bats used at the oldest youth levels. Little League Senior requires BBCOR. Baseball Canada permits BBCOR at 18U; Canada Cup, Men’s, and 22U are wood or bamboo only. Youth barrel and drop rules below those ages are not BBCOR — they are USABat (Little League) or 1.15 BPF / USA Baseball Model (many Baseball Canada youth divisions).',
      chapter: 'ch04',
      related: ['usabat', 'batting-helmet', 'roots']
    },

    /* -------------------------------------------------------------- */
    /* ch05 — Balls, Strikes & the Count                               */
    /* -------------------------------------------------------------- */
    {
      slug: 'strike-zone',
      term: 'Strike zone',
      aliases: ['the zone', 'zone', 'the box'],
      short: 'The space over the plate where a pitch is a strike, even if the batter does not swing.',
      definition: 'The strike zone is the space over home plate, 17 inches wide, in the batter’s natural stance. Little League: armpits to the top of the knees. Baseball Canada (OBR): midpoint of the shoulders and the top of the pants (the letters) down to the bottom of the kneecap. A pitch that catches any edge of that box is a strike. The Little League zone is nominally higher at the top; a pitch at the letters is often a ball under OBR and may be a strike under Little League.',
      chapter: 'ch05',
      related: ['called-strike', 'ball', 'count'],
      diagram: {
        svg: 'strikeZone',
        opts: {
          zoneRef: 'youth',
          grid: 3,
          showBatter: 'R',
          title: 'Little League strike zone (catcher’s view)',
          desc: 'Little League strike zone from the catcher’s view: the space over home plate between the batter’s armpits and the top of the knees, divided into nine cells.'
        }
      }
    },
    {
      slug: 'called-strike',
      term: 'Called strike',
      aliases: ['looking', 'taken strike', 'called'],
      short: 'A strike the batter did not swing at, because the pitch was in the zone.',
      definition: 'A called strike is a pitch in the strike zone that the batter does not offer at. The umpire calls it. Three strikes, called or swinging, is a strikeout. A called third strike is written as a backwards-K in the scorebook. Taking a pitch in the zone is not a walk; it is a strike.',
      chapter: 'ch05',
      related: ['swinging-strike', 'strike-zone', 'called-strikeout']
    },
    {
      slug: 'swinging-strike',
      term: 'Swinging strike',
      aliases: ['swing and miss', 'whiff', 'offer'],
      short: 'A strike because the batter swung and missed, wherever the pitch was.',
      definition: 'A swinging strike is any pitch the batter offers at and misses. Location does not matter: a swing at a ball in the dirt is still a strike. A foul ball with fewer than two strikes is also a strike. The third swinging strike, if the catcher holds it, is a strikeout.',
      chapter: 'ch05',
      related: ['called-strike', 'foul-ball', 'strikeout']
    },
    {
      slug: 'foul-ball',
      term: 'Foul ball',
      aliases: ['foul', 'foul tip'],
      short: 'A batted ball that settles or is first touched in foul territory.',
      definition: 'A foul ball is a batted ball that settles or is first touched in foul territory. With fewer than two strikes it counts as a strike. With two strikes it does not add a third — the at-bat continues, except a caught foul tip on strike three is an out. A fly ball caught in foul territory is an out, and runners must tag up.',
      chapter: 'ch05',
      related: ['foul-territory', 'strikeout', 'swinging-strike']
    },
    {
      slug: 'ball',
      term: 'Ball',
      aliases: ['ball four', 'wide'],
      short: 'A pitch outside the zone that the batter does not swing at. Four balls is a walk.',
      definition: 'A ball is a pitch that misses the strike zone and that the batter does not swing at. Four balls is a walk: the batter is awarded first base. The umpire is judging location, not whether the pitch looked hittable. A 3–0 count is three balls and no strikes; the next ball is a walk.',
      chapter: 'ch05',
      related: ['walk', 'strike-zone', 'count']
    },
    {
      slug: 'count',
      term: 'Count',
      aliases: ['the count', 'ball-strike count', '0-0'],
      short: 'The current balls and strikes on this batter, balls first, then strikes.',
      definition: 'The count is how many balls and strikes this batter has right now. Balls are said first: 2–1 means two balls and one strike. There are twelve possible counts (0–0 through 3–2). Four balls is a walk; three strikes is a strikeout. The count changes what both sides should try to do with the next pitch.',
      chapter: 'ch05',
      related: ['ball', 'walk', 'count-leverage'],
      diagram: {
        svg: 'countMatrix',
        opts: {
          title: 'The twelve counts',
          desc: 'A grid of the twelve ball-strike counts, balls 0–3 across and strikes 0–2 down, with walk and strikeout as terminals.'
        }
      }
    },
    {
      slug: 'walk',
      term: 'Walk',
      aliases: ['base on balls', 'BB', 'free pass'],
      short: 'The batter is awarded first after four balls.',
      definition: 'A walk (base on balls, BB) awards first base to the batter after four pitches outside the zone that were not swung at. The ball is live: runners already on base advance only if they are forced, or if they choose to go at their own risk. A walk is not a hit. It does not count as an at-bat, but it does count as a plate appearance.',
      chapter: 'ch05',
      related: ['ball', 'hit-by-pitch', 'intentional-walk']
    },
    {
      slug: 'strikeout',
      term: 'Strikeout',
      aliases: ['K', 'punched out', 'struck out'],
      short: 'The batter is out after three strikes, swinging or looking.',
      definition: 'A strikeout is three strikes before four balls. The third strike can be swinging or called. If the catcher holds strike three, the batter is out. If they do not, the dropped-third-strike rule may let the batter run — but that rule is off in Little League Rookie and Minor, and in Baseball Canada 11U. A swinging strikeout is K; a called third strike is a backwards-K.',
      chapter: 'ch05',
      related: ['called-strikeout', 'dropped-third-strike', 'swinging-strike']
    },
    {
      slug: 'hit-by-pitch',
      term: 'Hit by pitch',
      aliases: ['HBP', 'HP', 'plunked', 'hit batsman'],
      short: 'A pitch that hits the batter. They are awarded first, unless they swung.',
      definition: 'If a pitch hits the batter, they are awarded first base, and the ball is dead. The award is not given if the batter swung, or if they made no attempt to avoid a pitch in the zone. Runners advance only if forced. A hit-by-pitch is not a walk and not a hit. It counts as a plate appearance, not an at-bat.',
      chapter: 'ch05',
      related: ['walk', 'ball', 'plate-appearance']
    },

    /* -------------------------------------------------------------- */
    /* ch06 — Hits, Outs & How Runners Move                            */
    /* -------------------------------------------------------------- */
    {
      slug: 'single',
      term: 'Single',
      aliases: ['1B', 'base hit', 'one-bagger'],
      short: 'A hit that lets the batter stop safely at first base.',
      definition: 'A single is a batted ball in fair territory that lets the batter reach first without an error or a fielder’s choice. It is written 1B. The batter may try for more if the ball gets through, but the hit itself is one base. A walk is not a single.',
      chapter: 'ch06',
      related: ['double', 'fielders-choice', 'error']
    },
    {
      slug: 'double',
      term: 'Double',
      aliases: ['2B', 'two-bagger', 'two-base hit'],
      short: 'A hit that lets the batter stop safely at second base.',
      definition: 'A double is a hit on which the batter reaches second safely, without an error or a fielder’s choice. It is written 2B. Ground-rule doubles — a fair ball that bounces over the fence — award two bases by rule. A runner already on first will usually score, or at least reach third, on a double.',
      chapter: 'ch06',
      related: ['single', 'triple', 'no-doubles']
    },
    {
      slug: 'triple',
      term: 'Triple',
      aliases: ['3B', 'three-bagger', 'three-base hit'],
      short: 'A hit that lets the batter stop safely at third base.',
      definition: 'A triple is a hit on which the batter reaches third safely. It is the rarest hit, because the batter has to run all the way to third before the defence can get the ball in. Most triples are balls in the gap or down the line that the outfielder cannot cut off.',
      chapter: 'ch06',
      related: ['double', 'home-run', 'single']
    },
    {
      slug: 'home-run',
      term: 'Home run',
      aliases: ['HR', 'homer', 'dinger', 'four-bagger'],
      short: 'A hit that lets the batter (and any runners) score, usually over the fence.',
      definition: 'A home run is a hit that lets the batter circle all four bases and score. Most home runs leave the field in fair territory on the fly. An inside-the-park home run stays in play and is run out. Every runner already on base scores ahead of the batter. The batter must still touch every base.',
      chapter: 'ch06',
      related: ['run', 'triple', 'sacrifice-fly']
    },
    {
      slug: 'error',
      term: 'Error',
      aliases: ['E', 'boot', 'misplay'],
      short: 'A play the defence should have made with ordinary effort, but did not.',
      definition: 'An error is a scorer’s judgment that a fielder misplayed a ball that should have been handled with ordinary effort — a dropped fly, a wild throw, a boot of a routine grounder. The batter is not credited with a hit. Errors change batting average (the at-bat still happened, no hit) and can turn a run unearned for the pitcher. Ordinary effort is the test, not a perfect play.',
      chapter: 'ch06',
      related: ['ordinary-effort', 'fielders-choice', 'unearned-run']
    },
    {
      slug: 'fielders-choice',
      term: "Fielder's choice",
      aliases: ['FC', 'fielders choice'],
      short: 'The batter reaches because the defence chose to play a different runner.',
      definition: 'Fielder’s choice is when the defence, on a batted ball, chooses to try for a preceding runner instead of the batter, and the batter reaches as a result. It is not a hit. The scorebook writes FC, often with the play that was attempted (FC 6-4). The at-bat counts; the hit does not.',
      chapter: 'ch06',
      related: ['force-out', 'error', 'single']
    },
    {
      slug: 'dropped-third-strike',
      term: 'Dropped third strike',
      aliases: ['dropped 3rd strike', 'D3K', 'uncaught third strike'],
      short: 'When strike three is not caught, the batter may run — in some divisions.',
      definition: 'On an uncaught third strike the batter becomes a batter-runner if first is empty, or if there are two outs. They must be tagged or thrown out at first. If first is occupied with fewer than two outs, the batter is simply out — the rule exists so a catcher cannot drop strike three on purpose to start a double play. Little League Rookie and Minor, and Baseball Canada 11U, do not use this rule: the batter is out on strike three whether or not the catcher holds it. Little League Major and Baseball Canada 13U championships do.',
      chapter: 'ch06',
      related: ['uncaught-third-strike', 'strikeout', 'infield-fly']
    },
    {
      slug: 'groundout',
      term: 'Groundout',
      aliases: ['ground out', 'ground ball out', '5-3', '6-3'],
      short: 'The batter is out on a ground ball, usually thrown to first.',
      definition: 'A groundout is a batted ball on the ground that the defence turns into an out, most often by throwing to first. The scorebook writes the fielders who handled it: 5-3 is third to first, 6-3 is shortstop to first. The batter may still reach on an error or a fielder’s choice; those are not groundouts in the hit column.',
      chapter: 'ch06',
      related: ['flyout', 'force-out', 'fielders-choice']
    },
    {
      slug: 'flyout',
      term: 'Flyout',
      aliases: ['fly out', 'fly ball out', 'F8', 'caught'],
      short: 'The batter is out when a fair or foul fly ball is caught before it hits the ground.',
      definition: 'A flyout is a ball caught in the air, fair or foul, before it touches the ground. The batter is out. Runners must tag up before they advance. The scorebook writes F plus the position: F8 is a fly out to centre. A line-out and a pop-out are the same rule with a different trajectory.',
      chapter: 'ch06',
      related: ['line-out', 'pop-out', 'tag-up']
    },
    {
      slug: 'line-out',
      term: 'Line-out',
      aliases: ['line out', 'lined out', 'line drive out'],
      short: 'The batter is out on a hard line drive caught in the air.',
      definition: 'A line-out is a line drive caught before it hits the ground. The rule is the same as any caught fly: the batter is out, and runners must tag up. Line drives get to fielders fast, so runners who break on contact are often doubled off. The teaching cue with a runner on first is hold until the ball hits grass.',
      chapter: 'ch06',
      related: ['flyout', 'pop-out', 'tag-up']
    },
    {
      slug: 'pop-out',
      term: 'Pop-out',
      aliases: ['pop out', 'pop-up', 'infield fly'],
      short: 'The batter is out on a high, weakly hit fly, usually over the infield.',
      definition: 'A pop-out is a high, weakly hit fly ball caught for an out, most often by an infielder. If the infield-fly conditions are also met, the batter is out even if the ball is dropped. Otherwise it is an ordinary catch. Outfielders coming in, and infielders going back, need a priority rule so they do not collide.',
      chapter: 'ch06',
      related: ['flyout', 'infield-fly', 'pop-up-priority']
    },
    {
      slug: 'force-out',
      term: 'Force out',
      aliases: ['force play', 'forceout', 'force', 'touch the bag'],
      short: 'An out made by touching the base a runner must reach.',
      definition: 'A force out happens when a runner has to go to the next base because the batter became a runner behind them, and a fielder with the ball touches that next base before the runner arrives. The bag is enough; you do not have to tag the runner. A force exists at first on every fair ball. It exists at other bases only when every base behind that runner is occupied.',
      chapter: 'ch06',
      related: ['tag-out', 'force-play', 'fielders-choice'],
      diagram: {
        svg: 'basePaths',
        opts: {
          shade: 'force',
          labels: true,
          title: 'Force out: touch the bag',
          desc: 'A base-path diamond with force shading on each bag: the defence records the out by touching the base the runner is forced to.'
        }
      }
    },
    {
      slug: 'tag-out',
      term: 'Tag out',
      aliases: ['tag', 'tag play', 'tagged'],
      short: 'An out made by touching the runner with the ball, when they are not forced.',
      definition: 'A tag out is recorded by touching the runner with the ball, or with the glove holding the ball, while the runner is off a base and not forced. The bag is not enough. If there is no force, the defence must tag. A runner who overruns first and turns toward second becomes taggable; veering foul keeps them safe to return.',
      chapter: 'ch06',
      related: ['force-out', 'caught-stealing', 'overrun'],
      diagram: {
        svg: 'basePaths',
        opts: {
          shade: 'tag',
          labels: true,
          title: 'Tag out: tag the runner',
          desc: 'A base-path diamond with tag shading around each bag: the defence must touch the runner, not only the base.'
        }
      }
    },
    {
      slug: 'caught-stealing',
      term: 'Caught stealing',
      aliases: ['CS', 'thrown out stealing', 'nailed'],
      short: 'A runner is tagged out while trying to steal a base.',
      definition: 'Caught stealing is a runner tagged out on an attempted steal. The catcher usually throws to the base; the infielder tags. It is written CS. Whether a runner may lead off before the steal depends on the division: Little League Major and below, and Baseball Canada 11U low tier, hold until the pitch reaches the batter. Intermediate and up, and Baseball Canada 13U championships, use full leadoffs.',
      chapter: 'ch06',
      related: ['tag-out', 'primary-lead', 'delayed-steal']
    },

    /* -------------------------------------------------------------- */
    /* ch07 — Baserunning                                              */
    /* -------------------------------------------------------------- */
    {
      slug: 'running-lane',
      term: 'Running lane',
      aliases: ['three-foot lane', '45-foot lane', 'the lane'],
      short: 'The last half of the path to first; stay in it, or you may be out for interference.',
      definition: 'The running lane is the three-foot-wide path in foul territory for the last half of the way from home to first. The batter-runner must stay in it unless they are avoiding a fielder who is fielding the ball. Running inside the line and interfering with the throw to first is interference: the batter-runner is out.',
      chapter: 'ch07',
      related: ['interference', 'overrun', 'first-base']
    },
    {
      slug: 'tag-up',
      term: 'Tag up',
      aliases: ['tagging up', 'retouch', 'sacrifice fly start'],
      short: 'Retouch the base after a catch, then advance. Leave on first contact.',
      definition: 'On a caught fly, a runner who wants the next base must retouch their current base after the catch, then go. The runner may leave on the fielder’s first touch, not after the catch is squeezed. If they leave early and the defence appeals, they are out. With two outs, run on contact — a catch is the third out anyway. The tag-up rule itself is the same in both pathways; leadoff rules do not change it.',
      chapter: 'ch07',
      related: ['sacrifice-fly', 'flyout', 'appeal']
    },
    {
      slug: 'slide',
      term: 'Slide',
      aliases: ['sliding', 'feet-first slide', 'go in hard'],
      short: 'Drop to the ground to reach a base, evade a tag, or avoid a collision.',
      definition: 'A slide is lowering the body to the ground while running, to reach a base, evade a tag, or comply with collision rules at the plate. Teach feet-first, commit 6–8 feet before the bag, hands up. There is no rule that you must slide on every play, but you must slide or go around a fielder waiting with the ball — never crash. Helmet stays on until the dugout.',
      chapter: 'ch07',
      related: ['pop-up-slide', 'head-first-slide', 'overrun']
    },
    {
      slug: 'pop-up-slide',
      term: 'Pop-up slide',
      aliases: ['pop up slide', 'stand-up slide'],
      short: 'A feet-first slide that lets the runner stand immediately and keep going.',
      definition: 'A pop-up slide is a feet-first slide into the bag that uses the base as a brake, so the runner can stand in one motion and continue if the throw gets away. It is the default slide once a player can do a basic feet-first. Hands stay up, off the ground, so fingers are not under a tag or a cleat.',
      chapter: 'ch07',
      related: ['slide', 'head-first-slide', 'overrun']
    },
    {
      slug: 'head-first-slide',
      term: 'Head-first slide',
      aliases: ['head first', 'dive', 'diving slide'],
      short: 'Hands-first dive into a base. Illegal advancing in Little League; a bad idea in youth BC.',
      definition: 'A head-first slide is a dive into the bag with the hands leading. Little League prohibits it while advancing: the runner is out. Diving back to a base on a pickoff is allowed. Baseball Canada / OBR has no blanket ban, but youth coaches strongly discourage head-first advancing under about 14 because of finger, wrist, and collarbone injury. Teach feet-first. Dive back only.',
      chapter: 'ch07',
      related: ['slide', 'pop-up-slide', 'pickoff']
    },
    {
      slug: 'overrun',
      term: 'Overrun',
      aliases: ['run through', 'overrun first', 'turn'],
      short: 'Run through first on a grounder, then veer foul. You cannot overrun the other bases.',
      definition: 'On a ground ball to first, the batter-runner may run through the bag and return without being tagged, as long as they do not turn toward second and make a move to advance. Veer foul after the touch. Turning into fair territory toward second makes them taggable. You do not get this protection at second, third, or home — overrun those and you can be tagged out.',
      chapter: 'ch07',
      related: ['first-base', 'tag-out', 'running-lane']
    },

    /* -------------------------------------------------------------- */
    /* ch08 — How a Game Is Played and Won                             */
    /* -------------------------------------------------------------- */
    {
      slug: 'batting-order',
      term: 'Batting order',
      aliases: ['lineup', 'the card', 'batting list'],
      short: 'The fixed list of who hits when. It wraps. It does not reshuffle after a hit.',
      definition: 'Before the game the manager hands the umpire a batting order: a fixed list of who hits when. After the last name, it wraps to the top. Substitutes in a traditional nine-hitter order take that slot and bat there. Batting out of order is an appeal play. The card is the law of who is up, not the coach’s mood in the fourth inning.',
      chapter: 'ch08',
      related: ['continuous-batting-order', 'extra-hitter', 'batting-out-of-order']
    },
    {
      slug: 'continuous-batting-order',
      term: 'Continuous batting order',
      aliases: ['CBO', 'everybody bats', 'continuous order'],
      short: 'Everyone present bats, in a fixed order that wraps. A Little League option.',
      definition: 'A continuous batting order lists every player present. Everyone bats; the order still wraps. It is a Little League option, and the usual house-league habit. The batting part of mandatory play is then automatic, and the running part is waived. Baseball Canada championships use a conventional nine-hitter order with an optional extra hitter instead. Defence still has a substitution rule; the next batter is always the next name.',
      chapter: 'ch08',
      related: ['batting-order', 'mandatory-play', 'extra-hitter']
    },
    {
      slug: 'extra-hitter',
      term: 'Extra hitter',
      aliases: ['EH', 'tenth batter', 'extra batter'],
      short: 'A tenth batter on a Baseball Canada card, declared before first pitch.',
      definition: 'An extra hitter (EH) is a tenth athlete in the batting order who does not play a defensive position, used so one more player gets at-bats. Baseball Canada championships allow it as an option, declared when the lineup is submitted — it cannot be added later, and the other team need not match it. Little League does not use an EH; it uses a traditional nine or a continuous order instead.',
      chapter: 'ch08',
      related: ['continuous-batting-order', 'batting-order', 'mandatory-play']
    },
    {
      slug: 'mandatory-play',
      term: 'Mandatory play',
      aliases: ['minimum play', 'participation rule', 'must play'],
      short: 'Little League’s guarantee: six defensive outs and one at-bat, in regular season.',
      definition: 'Little League Regulation IV.i requires every player present at the start of a regular-season game to play at least six defensive outs and bat at least once. With 15–20 on the roster and 15 or more present, that may drop to three outs and one at-bat. It does not apply in tournament play, when a continuous batting order is used, or in Senior. Baseball Canada championships have no per-game minimum; 11U guidelines ask for equity starts and about six of twelve defensive innings across two games.',
      chapter: 'ch08',
      related: ['substitution', 're-entry', 'continuous-batting-order']
    },
    {
      slug: 'mercy-rule',
      term: 'Mercy rule',
      aliases: ['run-ahead rule', 'run rule', 'mercy', 'slaughter rule'],
      short: 'The game ends early when one team leads by a set number of runs after enough innings.',
      definition: 'A mercy (run-ahead) rule ends a lopsided game once a lead is large enough after a stated inning. Both pathways use 15- and 10-run rules, at different innings. Little League: 15 after 3 (4 at Intermediate/Junior/Senior), 10 after a regulation game, plus an 8-run rule in regular season only. Baseball Canada championships: 15 after 4, 10 after 5. Little League Minor adds a 5-run-per-inning cap; Baseball Canada 11U uses a 5-run half-inning cap with no cap in the last inning. Local Ottawa (NCOBA) uses still different innings. Confirm tonight’s book.',
      chapter: 'ch08',
      related: ['extra-innings', 'inning', 'line-score']
    },
    {
      slug: 'line-score',
      term: 'Line score',
      aliases: ['linescore', 'R-H-E', 'the board'],
      short: 'The inning-by-inning runs, plus totals for runs, hits, and errors.',
      definition: 'A line score is the compact scoreboard: runs scored in each inning, then R (runs), H (hits), and E (errors) for each team. Runs decide the winner. Hits are singles, doubles, triples, and home runs — not walks, not errors. Home already ahead after the top of the last inning does not bat. Chapter 21 turns this board into a full scorebook.',
      chapter: 'ch08',
      related: ['box-score', 'run', 'error']
    },
    {
      slug: 'extra-innings',
      term: 'Extra innings',
      aliases: ['extras', 'free baseball', 'extra inning'],
      short: 'Play continues past the scheduled length when the score is still tied.',
      definition: 'If the score is tied after the scheduled length, the game goes on. Little League Majors: after six innings (seven at Intermediate, Junior, Senior) until one side leads at the end of a completed inning, or home scores the winning run — a walk-off. A called game that is still tied is a tie in Little League. Local time caps complicate this: NCOBA at 13U and below yields the “no new inning after two hours” rule if the game is tied. Do not assume a 1–1 game at the time limit is over until someone has checked the local book.',
      chapter: 'ch08',
      related: ['inning', 'mercy-rule', 'line-score']
    },
    {
      slug: 'substitution',
      term: 'Substitution',
      aliases: ['pinch hitter', 'pinch runner', 'defensive sub'],
      short: 'Replacing a player on the card. Re-entry rules depend on the pathway.',
      definition: 'A substitution replaces one player with another on the batting card and on defence. In a traditional order the substitute bats in that slot. A pitcher removed from the mound generally may not return as pitcher — Little League Intermediate, Junior, and Senior allow one return per game; Baseball Canada championships do not. How, and whether, a starter may re-enter on defence is a pathway rule, not a coach preference.',
      chapter: 'ch08',
      related: ['re-entry', 'mandatory-play', 'courtesy-runner']
    },

    /* -------------------------------------------------------------- */
    /* ch09 — Hitting Fundamentals                                     */
    /* -------------------------------------------------------------- */
    {
      slug: 'door-knocking-knuckles',
      term: 'Door-knocking knuckles',
      aliases: ['door knocking knuckles', 'aligned knuckles', 'grip knuckles'],
      short: 'Line up the knocking knuckles of both hands on the bat for a simple, loose grip.',
      definition: 'Door-knocking knuckles are the middle knuckles you would use to knock on a door. Lined up on the bat, they keep the grip simple and the wrists free. Grip pressure is about 5 out of 10 — firm enough to control the bat, loose enough to whip it. The goal is a connected swing, not a death grip.',
      chapter: 'ch09',
      related: ['bat-path', 'choke-up', 'load']
    },
    {
      slug: 'load',
      term: 'Load',
      aliases: ['loading', 'hands back', 'coil'],
      short: 'The gathering move: weight and hands go back as the pitcher throws.',
      definition: 'The load stores energy before the swing. As the pitcher delivers, the hands and the weight go back — a small coil, not a sway. It is the second of the five swing frames: stance, load, stride, contact, finish. A load that is too big makes the hitter late; a load that never happens makes the swing all arms.',
      chapter: 'ch09',
      related: ['stride', 'hip-rotation', 'bat-path'],
      diagram: {
        svg: 'swingSequence',
        opts: {
          title: 'Stance, load, stride, contact, finish',
          desc: 'A five-frame swing strip: athletic stance, load, stride, contact, and finish.'
        }
      }
    },
    {
      slug: 'stride',
      term: 'Stride',
      aliases: ['timing step', 'stride foot', 'front foot'],
      short: 'A small timing step toward the pitcher. Land, then swing.',
      definition: 'The stride is a short timing step toward the pitcher, not a lunge. Land the front foot, then swing. Landing closed — toes not flying open — keeps the hips from spinning early. The stride exists to match the pitcher’s timing. A stride that is too long pulls the head off the ball.',
      chapter: 'ch09',
      related: ['load', 'contact-point', 'hip-rotation']
    },
    {
      slug: 'bat-path',
      term: 'Bat path',
      aliases: ['swing path', 'barrel path', 'knob first'],
      short: 'Knob first, hands close, level to slightly upward through the zone.',
      definition: 'Bat path is the route the barrel takes to the ball. The teaching is knob first, hands close to the body, then a path that is level to slightly upward through the zone. Not a chop. Not a golf swing. A short path to contact beats a long, pretty one that arrives late.',
      chapter: 'ch09',
      related: ['contact-point', 'load', 'door-knocking-knuckles']
    },
    {
      slug: 'contact-point',
      term: 'Contact point',
      aliases: ['contact', 'point of contact', 'where you hit it'],
      short: 'Where the barrel meets the ball: in front on inside, deeper on away.',
      definition: 'Contact point is where the barrel meets the ball relative to the body. Inside pitch: contact out in front. Middle: near the front corner of the plate. Away: let it travel deeper, off the back foot. Matching contact to location is how a hitter uses the whole field instead of rolling over everything to the pull side.',
      chapter: 'ch09',
      related: ['bat-path', 'stride', 'two-strike-approach']
    },
    {
      slug: 'batting-tee',
      term: 'Batting tee',
      aliases: ['tee', 'the tee', 'tee work'],
      short: 'A stand that holds a still ball so the hitter can groove path and contact.',
      definition: 'A batting tee holds a ball at a chosen height so the hitter can repeat path and contact without tracking a moving pitch. It is the first station in the tee-to-live progression: tee, then soft toss, then front toss, then live. Height and location on the tee should match the pitch you are training, not a single “middle-middle” forever.',
      chapter: 'ch09',
      related: ['soft-toss', 'contact-point', 'bat-path']
    },
    {
      slug: 'soft-toss',
      term: 'Soft toss',
      aliases: ['soft-toss', 'side toss', 'underhand toss'],
      short: 'A short underhand feed from the side, the next step after the tee.',
      definition: 'Soft toss is a short underhand feed, usually from the side, so the hitter tracks a moving ball without a full live pitch. It sits between tee work and front toss in the progression. The tosser aims for a consistent slot; the hitter works path and contact, not a home-run swing at a floating ball.',
      chapter: 'ch09',
      related: ['batting-tee', 'contact-point', 'load']
    },
    {
      slug: 'hip-rotation',
      term: 'Hip rotation',
      aliases: ['hips', 'turning the hips', 'hip drive'],
      short: 'The hips fire after the front foot lands, adding power without spinning the head.',
      definition: 'Hip rotation is the drive of the back hip through the ball after the front foot lands. The sequence is land, then turn — not spin first. Early hips pull the head and the barrel off the pitch. The hands stay close; the body rotates around a firm front side. Power comes from that order, not from a bigger arm swing.',
      chapter: 'ch09',
      related: ['stride', 'load', 'bat-path']
    },

    /* -------------------------------------------------------------- */
    /* ch10 — Throwing & Catching                                      */
    /* -------------------------------------------------------------- */
    {
      slug: 'four-seam-grip',
      term: 'Four-seam grip',
      aliases: ['four seam', '4-seam', 'across the horseshoe'],
      short: 'Fingers across the horseshoe so the ball carries straight.',
      definition: 'The four-seam grip puts the index and middle fingers across the wide horseshoe of the stitches, thumb underneath, with daylight to the palm. That orientation makes the ball carry true — the throw you want on almost every infield and outfield feed. Find it on the exchange, not on the way to the target.',
      chapter: 'ch10',
      related: ['two-seam-grip', 'exchange', 'arm-path'],
      diagram: {
        svg: 'throwSequence',
        opts: {
          showGrip: true,
          title: 'Throwing sequence with four-seam grip',
          desc: 'A five-frame throw strip with a four-seam grip inset on the grip frame.'
        }
      }
    },
    {
      slug: 'two-seam-grip',
      term: 'Two-seam grip',
      aliases: ['two seam', '2-seam', 'sinker grip'],
      short: 'Fingers along the narrow seams so the ball runs or sinks.',
      definition: 'The two-seam grip places the fingers along the narrow seams rather than across the horseshoe. Thrown as a fastball it can run or sink. It is a pitch grip, not the default throwing grip for fielders. Infielders and outfielders still want four-seam on almost every feed, because they need the ball to carry straight.',
      chapter: 'ch10',
      related: ['four-seam-grip', 'changeup', 'arm-path']
    },
    {
      slug: 'arm-path',
      term: 'Arm path',
      aliases: ['arm circle', 'down back up', 'throwing path'],
      short: 'Hands break, then the arm goes down, back, and up — not a dart throw.',
      definition: 'Arm path is the route the throwing arm takes after the hands break: down, back, and up, so the elbow is above the shoulder at release and the fingers are on top of the ball. Youth faults include dart-throwing with the elbow down, all-arm with no legs, and short-arming. Glove-side shoulder points at the target; the step goes there too.',
      chapter: 'ch10',
      related: ['follow-through', 'short-arming', 'four-seam-grip']
    },
    {
      slug: 'follow-through',
      term: 'Follow-through',
      aliases: ['finish', 'deceleration', 'chest to glove'],
      short: 'The arm finishes to the opposite hip so the throw can decelerate safely.',
      definition: 'Follow-through is the deceleration after release: chest to the glove side, throwing hand continuing to the opposite knee or hip. Cutting it off dumps stress on the elbow and the shoulder. A full finish is arm care, not decoration. The same idea applies to the swing: a high, balanced finish is the last of the five frames.',
      chapter: 'ch10',
      related: ['arm-path', 'arm-care', 'short-arming']
    },
    {
      slug: 'short-arming',
      term: 'Short-arming',
      aliases: ['short arm', 'crowded arm', 'no arm path'],
      short: 'A cramped throw that skips the down-back-up path. A common youth fault.',
      definition: 'Short-arming is throwing with a cramped, rushed arm that never gets down, back, and up. The ball comes out late and off-line, and the stress sits in the elbow. It often shows up when a player hurries a catch-and-throw. The fix is a full path even on a short feed: exchange, four-seam, replace the feet, then throw.',
      chapter: 'ch10',
      related: ['arm-path', 'exchange', 'follow-through']
    },
    {
      slug: 'two-hand-catch',
      term: 'Two-hand catch',
      aliases: ['two hands', 'two-handed catch', 'fingers up'],
      short: 'Catch with two hands, fingers up above the waist, so the exchange is already started.',
      definition: 'A two-hand catch uses the glove and the throwing hand together. Above the waist, fingers up; below, fingers down. Two hands secure the ball and start the exchange toward a four-seam grip. One-handed stabs are for balls you cannot otherwise reach — not for the routine play.',
      chapter: 'ch10',
      related: ['exchange', 'funnel', 'ready-position']
    },
    {
      slug: 'arm-care',
      term: 'Arm care',
      aliases: ['arm programme', 'prehab', 'throwing warmup'],
      short: 'The warmup, workload, and rest habits that protect a growing throwing arm.',
      definition: 'Arm care is the practical ceiling on top of pitch-count rules: a dynamic warmup, a short-toss to long-toss build, and rest when the arm is tired even if the count still has room. Overuse, not one play, is the usual youth injury. Structured arm care cuts injury rates roughly in half versus no programme. Fatigue cues override the card.',
      chapter: 'ch10',
      related: ['growth-plate', 'pitch-count', 'rest-days']
    },
    {
      slug: 'growth-plate',
      term: 'Growth plate',
      aliases: ['epiphysis', 'apophysis', "Little Leaguer's elbow"],
      short: 'The still-open cartilage near the ends of a child’s bones, weaker than adult bone.',
      definition: 'Growth plates are cartilaginous discs near the ends of long bones. They are weaker than the surrounding bone and take the stress of throwing. They typically remain open into the mid-teens; the medial elbow is often last to fuse, around 15–16 in boys. Little Leaguer’s elbow and Little Leaguer’s shoulder are overuse injuries at those plates. That is why pitch counts, rest days, and delayed breaking balls exist.',
      chapter: 'ch10',
      related: ['arm-care', 'curveball', 'pitch-count']
    },
    {
      slug: 'pitch-count',
      term: 'Pitch count',
      aliases: ['pitch limit', 'daily maximum', 'pitches thrown'],
      short: 'How many pitches a player has thrown today, against an age-banded limit and rest grid.',
      definition: 'A pitch count is the running total of pitches thrown, including fouls and balls in play. Both pathways cap the day and mandate rest. Baseball Canada bands by U-division (11U max 75, 13U 85, 15U 95, 18U 105). Little League bands by league age (6–8 max 50, 9–10 75, 11–12 85, 13–16 95) and adds catcher–pitcher crossover gates that Baseball Canada’s Section 4.4 does not. A designated recorder tracks the count; exceeding a limit ends pitching for the calendar day. Finish-the-batter is the usual exception.',
      chapter: 'ch10',
      related: ['rest-days', 'arm-care', 'mound-visit']
    },

    /* -------------------------------------------------------------- */
    /* ch11 — Infield Play                                             */
    /* -------------------------------------------------------------- */
    {
      slug: 'ready-position',
      term: 'Ready position',
      aliases: ['ready', 'athletic stance', 'pre-pitch'],
      short: 'Wide, on the toes, glove out, fingers down. Creep as the pitcher lands.',
      definition: 'The infield ready position is a wide base, weight on the toes, glove out in front, fingers down. As the pitcher lands, the infielder takes a small creep toward the plate so they are moving when the ball is hit. Standing still, heels down, glove on a knee, is how routine grounders get through.',
      chapter: 'ch11',
      related: ['fielding-triangle', 'funnel', 'alligator-method']
    },
    {
      slug: 'fielding-triangle',
      term: 'Fielding triangle',
      aliases: ['triangle', 'two feet and a glove', 'wide base'],
      short: 'Two feet and a glove: the ball is out front and slightly glove-side.',
      definition: 'The fielding triangle is two feet and a glove, with the ball received out in front of the body and slightly to the glove side. Hips go down early; hands stay below the ball. Working through the ball beats sitting back and letting it play you. From that triangle the fielder can alligator, funnel, and exchange.',
      chapter: 'ch11',
      related: ['alligator-method', 'ready-position', 'funnel']
    },
    {
      slug: 'alligator-method',
      term: 'Alligator method',
      aliases: ['alligator', 'alligators', 'trap the ball'],
      short: 'Glove below, throwing hand on top, like an alligator’s jaws on the ground ball.',
      definition: 'The alligator method is a teaching picture for a ground ball: the glove is the bottom jaw, the throwing hand is the top jaw, and they close on the ball. It keeps the throwing hand near the catch so the exchange is already started. It is a youth cue, not a finished professional technique — older infielders will funnel more than they chomp.',
      chapter: 'ch11',
      related: ['funnel', 'fielding-triangle', 'exchange']
    },
    {
      slug: 'funnel',
      term: 'Funnel',
      aliases: ['funnel to the chest', 'bring it in'],
      short: 'Bring the ball from the glove up and in to the chest to start the throw.',
      definition: 'Funneling is bringing a caught ground ball from out in front up and in to the centre of the chest, so the exchange to a four-seam grip happens close to the body. Watching the ball into the glove and then riding it out to the side is how throws get late and wide. Funnel, exchange, replace the feet, throw.',
      chapter: 'ch11',
      related: ['exchange', 'alligator-method', 'four-seam-grip']
    },
    {
      slug: 'exchange',
      term: 'Exchange',
      aliases: ['transfer', 'glove to hand', 'catch and throw'],
      short: 'The transfer from glove to throwing hand, finding a four-seam grip.',
      definition: 'The exchange is taking the ball from the glove into the throwing hand and finding a four-seam grip. A clean exchange is the difference between an on-time throw and a rushed short-arm. Two-hand catches make it easier. On a double-play feed the exchange is even shorter: catch, turn, throw, without extra steps.',
      chapter: 'ch11',
      related: ['funnel', 'four-seam-grip', 'double-play-feed']
    },
    {
      slug: 'short-hop',
      term: 'Short hop',
      aliases: ['short-hop', 'in-between hop', 'pick it'],
      short: 'A hop that arrives at the ankles. Attack it; do not wait for it to eat you.',
      definition: 'A short hop is a ground ball that bounces again just in front of the fielder, arriving at the ankles or shins. The play is to attack it — move through it and catch it as it comes up — not to freeze and hope. Waiting on a short hop is how the ball eats you. Hands below the ball, feet moving, eyes on the hop.',
      chapter: 'ch11',
      related: ['fielding-triangle', 'backhand', 'ready-position']
    },
    {
      slug: 'backhand',
      term: 'Backhand',
      aliases: ['backhand play', 'glove-side backhand'],
      short: 'A play to the glove side with the glove backhanded, thumb down.',
      definition: 'A backhand is a ground ball to the glove-hand side that the fielder cannot get in front of. The glove turns thumb-down, the body stays low, and the fielder works through the ball rather than reaching and falling. After the catch they replace the feet and throw. It is a last-resort play, not the first choice — getting in front is still the rule.',
      chapter: 'ch11',
      related: ['short-hop', 'fielding-triangle', 'ready-position']
    },
    {
      slug: 'double-play-feed',
      term: 'Double-play feed',
      aliases: ['DP feed', 'feed to second', 'pivot feed'],
      short: 'The under-control throw that starts a double play at the bag.',
      definition: 'A double-play feed is the throw from the fielder who fielded the ball to the middle infielder covering second. It should be chest-high, on time, and catchable — not a laser the pivot cannot handle. The pivot then exchanges and throws to first. A bad feed is how a double play becomes one out, or none.',
      chapter: 'ch11',
      related: ['double-play', 'exchange', 'double-play-depth']
    },
    {
      slug: 'pop-up-priority',
      term: 'Pop-up priority',
      aliases: ['priority', 'I got it', 'communication on flies'],
      short: 'Who takes a pop-up when two fielders can both catch it. Call it loud.',
      definition: 'Pop-up priority is the agreed order of who catches a fly when more than one fielder can get there. Infielders coming in yield to outfielders coming in; centre field has priority among outfielders; the pitcher gets out of the way. The call is loud and early: “I got it.” Two people saying nothing is how collisions and dropped balls happen.',
      chapter: 'ch11',
      related: ['centre-field-priority', 'pop-out', 'infield-fly']
    },

    /* -------------------------------------------------------------- */
    /* ch12 — Outfield Play & Pitching Delivery                        */
    /* -------------------------------------------------------------- */
    {
      slug: 'drop-step',
      term: 'Drop-step',
      aliases: ['drop step', 'first step back', 'open the hip'],
      short: 'The first step back on a ball at or above the head: open, then go.',
      definition: 'A drop-step is the outfielder’s first move on a ball hit at or above head height: one foot drops back, the hip opens, and the player turns to run rather than backpedaling. Backpedaling is how balls get over your head. The ready position in the outfield already leans slightly back so that first step is available.',
      chapter: 'ch12',
      related: ['crow-hop', 'centre-field-priority', 'ready-position']
    },
    {
      slug: 'crow-hop',
      term: 'Crow-hop',
      aliases: ['crow hop', 'crowhop', 'momentum throw'],
      short: 'A skip that gathers the body toward the target before a long throw.',
      definition: 'A crow-hop is a small skip after the catch that gathers the body toward the target so the throw has legs, not only arm. Catch above the throwing shoulder when you can, two hands, then crow-hop and throw through the cutoff. A standing, all-arm throw from the outfield is how balls sail and how arms get sore.',
      chapter: 'ch12',
      related: ['cutoff', 'drop-step', 'follow-through']
    },
    {
      slug: 'cutoff',
      term: 'Cutoff',
      aliases: ['cut-off', 'cut', 'cutoff man'],
      short: 'An infielder in line with a long throw, who can catch it or let it go through.',
      definition: 'A cutoff is an infielder aligned between the outfielder and the target base on a long throw. They may catch (“cut”) a ball that is offline or too late, and redirect it, or let a true throw go through. The catcher or the coach of the play calls “cut two,” “cut home,” or “let it go.” The cutoff is a base job in the ball–base–backup system, not a spectator.',
      chapter: 'ch12',
      related: ['relay', 'double-relay', 'crow-hop']
    },
    {
      slug: 'centre-field-priority',
      term: 'Centre-field priority',
      aliases: ['center field priority', 'CF has it', 'outfield priority'],
      short: 'On a fly two outfielders can reach, centre field takes it.',
      definition: 'Centre-field priority means the centre fielder has first claim on a fly ball that they and a corner outfielder can both catch. They see the whole field, they cover the most ground, and a collision in the gap is worse than a slightly longer run. The corner outfielder peels off when they hear “I got it.” Infielders coming out also yield to the outfielder coming in.',
      chapter: 'ch12',
      related: ['pop-up-priority', 'centre-field', 'drop-step']
    },
    {
      slug: 'windup',
      term: 'Windup',
      aliases: ['wind-up', 'full windup', 'from the windup'],
      short: 'The full delivery with no one on, starting facing the batter.',
      definition: 'The windup is the pitcher’s full delivery, usually with the bases empty: facing the batter, a rocker step, a turn, and a throw. Once any natural movement toward the plate starts, the pitcher must deliver or step off with the pivot foot. With runners on, most pitchers use the set instead, because the windup is slower to the plate. Failing to stop, or mixing windup and set with runners on, can be a balk in divisions that enforce balks.',
      chapter: 'ch12',
      related: ['set-position', 'balance-point', 'balk']
    },
    {
      slug: 'set-position',
      term: 'Set position',
      aliases: ['the set', 'the stretch', 'from the stretch'],
      short: 'The stretch delivery with runners on: come set, stop, then throw.',
      definition: 'The set (stretch) is the delivery with runners on. The pivot foot is on the rubber, the free foot in front, hands together. The pitcher must come to a full, discernible stop before delivering. From the set they may throw to a base (stepping toward it), step off, or pitch. No stop, a fake to first while on the rubber, or a fake to third on the rubber is a balk — in Little League Major and up, and in Baseball Canada 13U championships. Little League Minor and below do not enforce balks.',
      chapter: 'ch12',
      related: ['windup', 'slide-step', 'balk']
    },
    {
      slug: 'balance-point',
      term: 'Balance point',
      aliases: ['gather', 'leg lift', 'the gather'],
      short: 'The gathered top of the leg lift, before the pitcher goes to the plate.',
      definition: 'The balance point is the top of the delivery, when the lead leg is lifted and the body is gathered over the back leg. From there the pitcher goes to the plate, or, from the set, they have already chosen to pitch. Rushing through it, or collapsing the back leg, is how command disappears. It is a teaching landmark, not a pause you hold for a photograph.',
      chapter: 'ch12',
      related: ['windup', 'set-position', 'follow-through']
    },
    {
      slug: 'changeup',
      term: 'Changeup',
      aliases: ['change', 'change-up', 'off-speed'],
      short: 'A slower pitch thrown with a fastball arm, the safest youth off-speed pitch.',
      definition: 'A changeup is an off-speed pitch thrown with fastball arm speed so the hitter’s timing is early. It uses no extra forearm torque, which is why Pitch Smart recommends it as the first second pitch, around 10–12. Under 10, stay with fastballs. Neither pathway bans pitch types by rule; the guidance is injury science, not a loophole. Command of a changeup in the zone beats a pretty breaking ball that is a ball.',
      chapter: 'ch12',
      related: ['curveball', 'slider', 'pitching-backwards']
    },
    {
      slug: 'curveball',
      term: 'Curveball',
      aliases: ['curve', 'hook', 'breaking ball'],
      short: 'A breaking pitch. Introduce with care around 13–14; avoid earlier.',
      definition: 'A curveball is a breaking pitch that uses forearm and wrist action to create downward bite. A youth study associated it with a 52% increase in shoulder pain. Pitch Smart: avoid until about 13–14, when growth plates are maturing, and only after a fastball and changeup are trustworthy. Neither Baseball Canada nor Little League bans it by rule. The AAOS recommends waiting until skeletal maturity. Do not teach it because a 12-year-old can spin one in the bullpen.',
      chapter: 'ch12',
      related: ['slider', 'changeup', 'growth-plate']
    },
    {
      slug: 'slider',
      term: 'Slider',
      aliases: ['slide piece', 'slurve'],
      short: 'A late, harder break. Avoid until about 15, after growth plates have largely fused.',
      definition: 'A slider is a harder breaking ball with later, more lateral bite than a curve. The same youth study associated it with an 86% increase in elbow pain. Pitch Smart: introduce after 15, when growth plates have largely fused, and only with a fastball, changeup, and (usually) a curve already in place. Splitters and forkballs are generally discouraged for youth. Velocity with a poorly gripped slider is how elbows get hurt.',
      chapter: 'ch12',
      related: ['curveball', 'changeup', 'growth-plate']
    },
    {
      slug: 'rest-days',
      term: 'Rest days',
      aliases: ['mandatory rest', 'pitcher rest', 'days of rest'],
      short: 'Calendar days a pitcher must sit after an outing, set by how many they threw.',
      definition: 'Rest days are mandatory calendar days off after a pitching outing, tied to that day’s pitch count. Little League age 14 and under: 1–20 pitches = 0 days, 21–35 = 1, 36–50 = 2, 51–65 = 3, 66+ = 4. Baseball Canada uses different bands by U-division (for example 13U reaches four days’ rest at 76–85). Rest runs 12:01 a.m. to 11:59 p.m.; a Tuesday outing that needs four days is not available Friday. Neither pathway lets you pitch three consecutive days. Track the grid that applies to tonight’s game.',
      chapter: 'ch12',
      related: ['pitch-count', 'arm-care', 'mound-visit']
    },

    /* -------------------------------------------------------------- */
    /* ch13 — Defensive Positioning                                    */
    /* -------------------------------------------------------------- */
    {
      slug: 'standard-alignment',
      term: 'Standard alignment',
      aliases: ['regular depth', 'straight up', 'default alignment'],
      short: 'The default: infield at regular depth, outfield at normal, no one on.',
      definition: 'Standard alignment is where the seven non-battery fielders stand with no runners and an unknown hitter: infield a few steps behind the baseline, first off the bag, outfield at normal depth. It assumes you want the out at first on a ground ball and you can live with a runner taking an extra base on a single. Every other alignment is a choice to buy something and give something up. MLB’s shift restrictions do not apply in Baseball Canada or Little League.',
      chapter: 'ch13',
      related: ['infield-in', 'double-play-depth', 'no-doubles'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'standard',
          positionStyle: 'both',
          labels: true,
          title: 'Standard alignment',
          desc: 'A diamond with all nine fielders at standard depth.'
        }
      }
    },
    {
      slug: 'infield-in',
      term: 'Infield in',
      aliases: ['infield up', 'corners in and middle in', 'cut the run'],
      short: 'All four infielders on the grass, to cut a run at the plate.',
      definition: 'Infield in walks the four infielders onto the infield grass so a ground ball can be thrown home in time. You buy a chance at the runner at the plate. You give up range: balls that were outs at regular depth now get through. Use it when the run matters — late, close, runner on third, fewer than two outs — not as a default because the dugout is loud.',
      chapter: 'ch13',
      related: ['standard-alignment', 'corners-in', 'no-doubles'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'infield-in',
          positionStyle: 'both',
          title: 'Infield in',
          desc: 'A diamond with the infield walked in onto the grass to cut a run at the plate.'
        }
      }
    },
    {
      slug: 'double-play-depth',
      term: 'Double-play depth',
      aliases: ['DP depth', 'double play depth', 'middle in'],
      short: 'Middle infielders a step in and toward the bag, to turn two.',
      definition: 'Double-play depth shades the shortstop and second baseman a step closer to second and a step in, so the feed and the pivot are shorter. You buy a better chance to turn two with a runner on first and fewer than two outs. You give up some range in the holes. First and third stay at regular depth unless the bunt is also on.',
      chapter: 'ch13',
      related: ['double-play', 'standard-alignment', 'infield-in'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'dp-depth',
          positionStyle: 'both',
          title: 'Double-play depth',
          desc: 'A diamond with the middle infielders a step in and toward the bag.'
        }
      }
    },
    {
      slug: 'no-doubles',
      term: 'No doubles',
      aliases: ['no-doubles defence', 'prevent extra bases', 'outfield back'],
      short: 'Outfielders deeper, infielders guarding lines, to keep extra-base hits off the board.',
      definition: 'No-doubles is a late-and-ahead alignment: outfielders take a step or two back, and the corners shade toward the lines, so a ball in the gap or down the line is more likely a single. You buy a reduced chance of an extra-base hit. You give up some singles in front of the outfielders. It is a lead-protection look, not a first-inning look.',
      chapter: 'ch13',
      related: ['of-deep', 'standard-alignment', 'infield-in'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'no-doubles',
          positionStyle: 'both',
          title: 'No doubles',
          desc: 'A diamond with outfielders deeper and corners toward the lines to prevent extra-base hits.'
        }
      }
    },
    {
      slug: 'bunt-defense',
      term: 'Bunt defence',
      aliases: ['bunt defense', 'bunt coverage', 'rotation'],
      short: 'Corners charge; middle infielders cover bags. Used when a bunt is likely.',
      definition: 'Basic bunt defence with a runner on first: the first and third basemen charge, the second baseman covers first, the shortstop covers second, and the pitcher takes the middle of the diamond. You buy a play on a sacrifice. You give up the infield hit if the batter swings away — which is why a slash is the counter. Wheel is the rotation with a runner on second.',
      chapter: 'ch13',
      related: ['corners-in', 'wheel-play', 'sacrifice-bunt'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'bunt-defense',
          positionStyle: 'both',
          title: 'Bunt defence',
          desc: 'A diamond with the corners charged and the middle infielders covering bags.'
        }
      }
    },
    {
      slug: 'corners-in',
      term: 'Corners in',
      aliases: ['corners up', 'first and third in'],
      short: 'Only first and third walk in, often as a bunt look or a half-infield-in.',
      definition: 'Corners in walks the first and third basemen onto the grass while the middle infield stays at regular or double-play depth. It is a bunt look, or a compromise when you want a play at the plate on a ball to the corners without giving up the holes. You buy reaction time on a bunt or a slow roller. You give up the hard shot past a charging corner.',
      chapter: 'ch13',
      related: ['bunt-defense', 'infield-in', 'standard-alignment'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'corners-in',
          positionStyle: 'both',
          title: 'Corners in',
          desc: 'A diamond with first and third walked in and the middle infield at regular depth.'
        }
      }
    },
    {
      slug: 'of-shallow',
      term: 'Outfield shallow',
      aliases: ['of shallow', 'infield-outfield', 'outfield in'],
      short: 'Outfielders walk in to catch a short fly or throw home on a single.',
      definition: 'Outfield shallow walks the three outfielders in, to catch a ball that would otherwise drop in front of them or to throw home on a single. You buy the short fly and a stronger throw to the plate. You give up the ball over their heads. Use it with a runner on third and a weak hitter, or when one run ends the game, not as a habit.',
      chapter: 'ch13',
      related: ['of-deep', 'infield-in', 'standard-alignment'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'of-shallow',
          positionStyle: 'both',
          title: 'Outfield shallow',
          desc: 'A diamond with the outfielders walked in toward the infield.'
        }
      }
    },
    {
      slug: 'of-deep',
      term: 'Outfield deep',
      aliases: ['of deep', 'outfield back', 'no-doubles outfield'],
      short: 'Outfielders a step or two back, to keep extra-base hits in front of them.',
      definition: 'Outfield deep takes the three outfielders a step or two back so gap shots and balls to the wall stay in front of them. It is the outfield half of no-doubles. You buy extra-base prevention. You give up some dropping singles. Pair it with a lead late; do not play deep in the first inning of a 0–0 game against a contact hitter.',
      chapter: 'ch13',
      related: ['of-shallow', 'no-doubles', 'standard-alignment'],
      diagram: {
        svg: 'field',
        opts: {
          positions: true,
          alignment: 'of-deep',
          positionStyle: 'both',
          title: 'Outfield deep',
          desc: 'A diamond with the outfielders a step deeper toward the fence.'
        }
      }
    },

    /* -------------------------------------------------------------- */
    /* ch14 — Cutoffs, Relays & the Nine Jobs                          */
    /* -------------------------------------------------------------- */
    {
      slug: 'relay',
      term: 'Relay',
      aliases: ['relay man', 'relay throw', 'double cut'],
      short: 'An infielder who turns a long outfield throw into two shorter throws.',
      definition: 'A relay is an infielder used as an intermediary on a long throw: the outfielder throws to the relay, who turns and throws to the target. Two shorter throws beat one long, dying one. The relay also lets the catcher redirect the play. On balls to the wall, a double relay puts two infielders out there.',
      chapter: 'ch14',
      related: ['cutoff', 'double-relay', 'trailer']
    },
    {
      slug: 'trailer',
      term: 'Trailer',
      aliases: ['trail', 'trail man', 'second relay'],
      short: 'The second infielder behind the relay, in case the first throw is offline.',
      definition: 'The trailer is the infielder who lines up behind the relay on a long throw, usually a ball to the wall. If the first relay is missed or the throw is offline, the trailer is there. If the relay is clean, the trailer is the backup. Nobody stands and watches a ball in the gap.',
      chapter: 'ch14',
      related: ['double-relay', 'relay', 'backup']
    },
    {
      slug: 'backup',
      term: 'Backup',
      aliases: ['backing up', 'overthrow backup'],
      short: 'The job behind a throw or a teammate, so one miss does not become extra bases.',
      definition: 'Backup is the third of the three jobs on every batted ball: someone fields the ball, someone covers a base (or the cutoff), and someone is behind the throw or the fielder. An overthrow with nobody behind it is a gift extra base. Pitchers back up home and third on many throws from the outfield. Corner outfielders back up infield throws down the line.',
      chapter: 'ch14',
      related: ['ball-base-backup', 'trailer', 'cutoff']
    },
    {
      slug: 'ball-base-backup',
      term: 'Ball, base, backup',
      aliases: ['three jobs', 'BBB', 'nine jobs'],
      short: 'On every batted ball: one fields, some cover bases, the rest back someone up.',
      definition: 'Ball, base, backup is the organising rule of team defence. The player fielding the batted ball has the ball. Players covering bags or occupying the cutoff have a base job. Everyone else is a backup. All nine have a job. Standing still is not one of the three. The cutoff is a base job in this system.',
      chapter: 'ch14',
      related: ['backup', 'cutoff', 'relay']
    },
    {
      slug: 'double-relay',
      term: 'Double relay',
      aliases: ['double cut', 'two-man relay', 'gap relay'],
      short: 'Two infielders go out on a ball to the wall: a relay and a trailer.',
      definition: 'A double relay sends two infielders into the outfield on a ball that will be a long throw — typically to the wall or into a gap. The first is the relay; the second is the trailer. The remaining infielders cover bags. One infielder cannot cover 250 feet of throw by themselves without a backup plan.',
      chapter: 'ch14',
      related: ['relay', 'trailer', 'cutoff']
    },

    /* -------------------------------------------------------------- */
    /* ch15 — Leads, Steals & First-and-Third                          */
    /* -------------------------------------------------------------- */
    {
      slug: 'primary-lead',
      term: 'Primary lead',
      aliases: ['lead', 'leadoff', 'first lead'],
      short: 'The walking lead off the bag before the pitcher commits, where leadoffs are legal.',
      definition: 'A primary lead is two or three shuffles off the base before the pitcher commits to the plate, far enough to steal or dive back. It requires a leadoff rule. Little League Major and below (Rule 7.13) and Baseball Canada 11U low tier: no leadoff — timed break as the pitch reaches the batter. Intermediate, Junior, Senior, and Baseball Canada 13U championships: full OBR leads. Teach the legal jump for the game you are in.',
      chapter: 'ch15',
      related: ['secondary-lead', 'pickoff', 'delayed-steal']
    },
    {
      slug: 'secondary-lead',
      term: 'Secondary lead',
      aliases: ['secondary', 'walking lead', 'shuffle steps'],
      short: 'Two walking steps with the pitch, after the pitcher is committed to home.',
      definition: 'A secondary lead is two walking steps toward the next base as the pitcher delivers, so the runner is moving when the ball gets there. It happens after a primary lead, and only where leadoffs are legal. On a ground ball the runner is already going; on a line drive they must freeze. Diving back on a pickoff is from the primary, not the secondary.',
      chapter: 'ch15',
      related: ['primary-lead', 'delayed-steal', 'pickoff']
    },
    {
      slug: 'delayed-steal',
      term: 'Delayed steal',
      aliases: ['delay steal', 'delayed', 'late steal'],
      short: 'A steal that breaks after the catcher starts to throw the ball back to the pitcher.',
      definition: 'A delayed steal breaks after the catcher’s attention leaves the runner — often as they throw back to the pitcher — rather than on the pitcher’s first move. It needs a leadoff. At Little League Major and below the no-leadoff rule and the ban on catcher fake throws reshape the whole first-and-third menu; the delayed steal is largely off the table. Where leads are legal, it is a timing play, not a footrace.',
      chapter: 'ch15',
      related: ['primary-lead', 'first-and-third', 'caught-stealing']
    },
    {
      slug: 'first-and-third',
      term: 'First and third',
      aliases: ['1st and 3rd', 'first-and-third situation', 'runners at the corners'],
      short: 'Runners on first and third at once — the most layered youth situation.',
      definition: 'First-and-third is runners on first and third together. Both sides have a menu of plays, and that menu changes with the leadoff rule. Little League Major and below: runners hold until the pitch; the catcher may not fake a throw (that fake-to-third, throw-to-second is illegal). Baseball Canada 13U+ (OBR): full leads, double steals, and legal fakes once the pitcher has stepped off. Know which book you are in before you call a play.',
      chapter: 'ch15',
      related: ['delayed-steal', 'balk', 'primary-lead']
    },
    {
      slug: 'balk',
      term: 'Balk',
      aliases: ['illegal pitch', 'baulk'],
      short: 'An illegal motion by the pitcher with a runner on. All runners move up one.',
      definition: 'A balk is an illegal pitching motion with at least one runner on: no stop from the set, starting and stopping, faking to first on the rubber, faking to third on the rubber, not stepping toward the base on a pickoff, a quick pitch. Penalty: all runners advance one base; the batter’s count is unchanged; the ball is dead. Little League Rookie and Minor do not enforce balks; Major and up do. Baseball Canada championships (13U+) do. Confirm 11U house league with the provincial association.',
      chapter: 'ch15',
      related: ['set-position', 'pickoff', 'slide-step']
    },
    {
      slug: 'coach-interference',
      term: 'Coach interference',
      aliases: ['coach assist', 'physical assist', 'base coach interference'],
      short: 'A coach who physically helps a runner. That runner is out.',
      definition: 'Coach interference is a base coach physically assisting a runner — grabbing them, pushing them back onto a bag, or stopping them with a hand. The runner is out. Voice is legal; hands on the player are not. Stay in the coach’s box. Injured-player help is the exception. At Little League Minor and below, adults typically coach both bases; at Majors a rostered player may coach a base. Confirm who is eligible before you put a child in the box.',
      chapter: 'ch15',
      related: ['interference', 'obstruction', 'roots']
    },

    /* -------------------------------------------------------------- */
    /* ch16 — Bunting & Bunt Defence                                   */
    /* -------------------------------------------------------------- */
    {
      slug: 'sacrifice-bunt',
      term: 'Sacrifice bunt',
      aliases: ['sac bunt', 'SH', 'SAC', 'give it up'],
      short: 'A bunt that gives away the out to move a runner up.',
      definition: 'A sacrifice bunt is an intentional out that advances a runner. Square, pinch the barrel with the top hand, bat at the top of the zone, bunt only strikes. It is worth the out late, close, nobody out, with a weaker bat up and a better one on deck. It is not worth it down three, with two outs, or with your best hitter up. At Little League Major and below the no-leadoff rule makes the sacrifice harder, because the runner cannot break until contact.',
      chapter: 'ch16',
      related: ['drag-bunt', 'push-bunt', 'bunt-defense']
    },
    {
      slug: 'drag-bunt',
      term: 'Drag bunt',
      aliases: ['drag', 'bunt for a hit'],
      short: 'A bunt for a hit, usually from the left side, as the batter is already moving.',
      definition: 'A drag bunt is a bunt for a hit, not a sacrifice. The batter, often a left-handed hitter, is already moving toward first as they deaden the ball down the line. The out is not being given away; the batter is trying to reach. Corners who charge every time make this easier. It is a read of the third or first baseman, not a give-yourself-up play.',
      chapter: 'ch16',
      related: ['push-bunt', 'sacrifice-bunt', 'slash-bunt']
    },
    {
      slug: 'push-bunt',
      term: 'Push bunt',
      aliases: ['push', 'push toward second'],
      short: 'A bunt pushed past the pitcher toward second, into the hole the corners left.',
      definition: 'A push bunt is directed past the pitcher toward the second-base side, into the space the charging first baseman left. It is still a bunt — soft, placed — not a slash. Right-handed hitters use it when first is crashing and the second baseman is covering first. Location, not power, is the whole skill.',
      chapter: 'ch16',
      related: ['drag-bunt', 'sacrifice-bunt', 'slash-bunt']
    },
    {
      slug: 'safety-squeeze',
      term: 'Safety squeeze',
      aliases: ['safety squeeze play', 'safe squeeze'],
      short: 'Runner on third breaks on contact; the batter bunts. Safer than the suicide.',
      definition: 'A safety squeeze is a bunt with a runner on third who breaks for home only after they see the ball down. If the batter misses or pops it up, the runner can stay. It needs a leadoff to be a real play. At Little League Major and below the runner cannot leave until the pitch arrives, so the squeeze timing advantage is largely gone. Use it with a runner who reads the ball, not a runner who guesses.',
      chapter: 'ch16',
      related: ['suicide-squeeze', 'sacrifice-bunt', 'tag-up']
    },
    {
      slug: 'suicide-squeeze',
      term: 'Suicide squeeze',
      aliases: ['suicide squeeze play', 'squeeze', 'squeeze play'],
      short: 'Runner on third breaks on the pitcher’s motion; the batter must bunt the ball down.',
      definition: 'A suicide squeeze sends the runner from third on the pitcher’s motion, before contact. The batter must put the ball on the ground. A miss or a pop-up is a rundown or a double play. It is a high-reward, high-cost play, and it is essentially unexecutable at Little League Major and below because the runner cannot leave until the pitch reaches the batter. Call it only where leads are legal and the bunter can handle a strike.',
      chapter: 'ch16',
      related: ['safety-squeeze', 'sacrifice-bunt', 'first-and-third']
    },
    {
      slug: 'slash-bunt',
      term: 'Slash bunt',
      aliases: ['slash', 'show-bunt swing', 'butcher boy'],
      short: 'Show bunt, pull the bat back, then take a compact swing into the hole.',
      definition: 'A slash (sometimes called butcher boy) shows bunt so the corners charge, then pulls the bat back and takes a short swing through the hole they just left. It is a swing, not a bunt, once the bat comes back. The batter has to be able to pull the bat back in time; a late slash is a popup. It is the counter to aggressive bunt defence.',
      chapter: 'ch16',
      related: ['sacrifice-bunt', 'bunt-defense', 'drag-bunt']
    },
    {
      slug: 'wheel-play',
      term: 'Wheel play',
      aliases: ['wheel', 'wheel defence', 'bunt with runner on second'],
      short: 'Bunt defence with a runner on second: short and third attack, second covers third.',
      definition: 'The wheel is bunt defence with a runner on second. The third baseman and shortstop attack the bunt; the second baseman rotates to cover third; first takes first; the pitcher covers the middle. You buy a play on the lead runner. You give up the right side if the batter slashes. It is a rotation, not a yell of “everybody in.”',
      chapter: 'ch16',
      related: ['bunt-defense', 'corners-in', 'sacrifice-bunt']
    },

    /* -------------------------------------------------------------- */
    /* ch17 — The Tricky Rules                                         */
    /* -------------------------------------------------------------- */
    {
      slug: 'infield-fly',
      term: 'Infield fly',
      aliases: ['infield fly rule', 'IFF', 'infield fly if fair'],
      short: 'A catchable fair fly with a force at two bases, fewer than two out. Batter is out.',
      definition: 'An infield fly is declared when four conditions are all true: a fair fly (not a line drive, not a bunt); catchable by an infielder with ordinary effort; runners on first and second or bases loaded; fewer than two outs. The batter is out whether or not the ball is caught, so the force is off. Runners may tag and go at their own risk. The ball stays live. Little League Rookie and Minor do not use the rule; Major and up do. Baseball Canada championships (13U+) do. Confirm 11U house league locally.',
      chapter: 'ch17',
      related: ['ordinary-effort', 'force-play', 'pop-out']
    },
    {
      slug: 'ordinary-effort',
      term: 'Ordinary effort',
      aliases: ['routine play', 'should have had it'],
      short: 'What a fielder at that level should handle. The test for infield fly and for errors.',
      definition: 'Ordinary effort is the standard for two different calls. For infield fly, it is whether an infielder could catch the fly with ordinary effort — geography does not matter; an outfielder running in can still trigger it. For scoring, it is whether a play should have been made: if yes and it was not, it is an error, not a hit. Youth ordinary effort is not major-league ordinary effort. The scorer, not the groan from the stand, decides.',
      chapter: 'ch17',
      related: ['infield-fly', 'error', 'unearned-run']
    },
    {
      slug: 'uncaught-third-strike',
      term: 'Uncaught third strike',
      aliases: ['third strike not caught', 'U3K'],
      short: 'The official name for the dropped-third-strike rule: strike three was not secured.',
      definition: 'Uncaught third strike is the rulebook name for dropped third strike. The catcher did not securely catch strike three before it touched the ground or a non-body surface. A foul tip caught cleanly is a catch, and strike three then is an out. A ball that glances off the chest protector or hits the dirt is uncaught. The batter’s right to run, and the divisions where the rule is off, are the same as for dropped third strike.',
      chapter: 'ch17',
      related: ['dropped-third-strike', 'strikeout', 'infield-fly']
    },
    {
      slug: 'force-play',
      term: 'Force play',
      aliases: ['force situation', 'the force is on'],
      short: 'A runner must go because the batter became a runner behind them.',
      definition: 'A force play exists when a runner has to advance because the batter became a runner and every base behind them is occupied. The defence records the out by touching that next base with the ball. An infield fly removes the force because the batter is already out. A following out can also remove a force (the “neighbour’s house” idea). If there is no force, it is a tag play.',
      chapter: 'ch17',
      related: ['force-out', 'infield-fly', 'tag-out']
    },
    {
      slug: 'interference',
      term: 'Interference',
      aliases: ['offensive interference', 'INT', 'impeding the defence'],
      short: 'The offence impedes a fielder making a play. Usually the batter or runner is out.',
      definition: 'Interference is the offence impeding the defence. Fielders making a play on a batted ball have the right of way. A runner hit by an untouched batted ball is generally out; a batter who gets in the catcher’s throw is out; a coach who grabs a runner is out. The ball is typically dead, and other runners return. Do not confuse it with obstruction, which is the defence impeding a runner.',
      chapter: 'ch17',
      related: ['obstruction', 'coach-interference', 'running-lane']
    },
    {
      slug: 'obstruction',
      term: 'Obstruction',
      aliases: ['OBS', 'blocking the runner', 'impeding the runner'],
      short: 'A fielder without the ball impedes a runner. The umpire awards bases.',
      definition: 'Obstruction is a fielder who is not in possession of the ball, and not in the act of fielding a batted ball, impeding a runner. Runners have the right to the path. Type 1 is obstruction with a play being made on that runner; Type 2 is without an immediate play. The umpire awards the base or bases the runner would have reached. A catcher without the ball who blocks the plate is the classic picture.',
      chapter: 'ch17',
      related: ['type-1-obstruction', 'type-2-obstruction', 'interference']
    },
    {
      slug: 'type-1-obstruction',
      term: 'Type 1 obstruction',
      aliases: ['type 1', '6.01(h)(1)', 'obstruction with a play on'],
      short: 'Obstruction while a play is being made on that runner. Award at least the next base.',
      definition: 'Type 1 obstruction (OBR 6.01(h)(1)) is a fielder impeding a runner while a play is being made on that runner. The umpire calls “Obstruction,” play continues, and at the end of the play the runner is awarded at least the base they would have reached — often the base they were going to. Example: a catcher without the ball blocks the plate and tags the runner; the run scores on the award.',
      chapter: 'ch17',
      related: ['type-2-obstruction', 'obstruction', 'interference']
    },
    {
      slug: 'type-2-obstruction',
      term: 'Type 2 obstruction',
      aliases: ['type 2', '6.01(h)(2)', 'obstruction no play on'],
      short: 'Obstruction with no play on that runner. Ball stays live; bases awarded later.',
      definition: 'Type 2 obstruction (OBR 6.01(h)(2)) is a fielder impeding a runner when no play is being made on that runner at the time. The ball stays live. The umpire calls it, waits until the play ends, then awards the obstructed runner (and others as needed) the bases they would have reached. A shortstop who stands on the bag without the ball as a runner rounds second is a common youth example.',
      chapter: 'ch17',
      related: ['type-1-obstruction', 'obstruction', 'missed-base']
    },

    /* -------------------------------------------------------------- */
    /* ch18 — Pitching Approach                                        */
    /* -------------------------------------------------------------- */
    {
      slug: 'sequencing',
      term: 'Sequencing',
      aliases: ['pitch sequence', 'pitch mix', 'setting up'],
      short: 'The order of pitches: change eye level, change speeds, with a plan.',
      definition: 'Sequencing is the order of pitches to a batter, not a random mix. The two levers are eye level and speed. Conventional sequencing establishes the fastball, then uses it to make the changeup look slower. Command of both sides of the plate beats velocity at youth levels. A sequence only works if today’s changeup is a strike.',
      chapter: 'ch18',
      related: ['pitching-backwards', 'changeup', 'hitters-count']
    },
    {
      slug: 'pitching-backwards',
      term: 'Pitching backwards',
      aliases: ['backwards', 'changeup first', 'off-speed early'],
      short: 'Throwing the changeup early, before the hitter is looking for it.',
      definition: 'Pitching backwards means leading with the off-speed pitch, often a changeup, in a count where the hitter expects a fastball — 0–0, 1–0, even 2–0 if the changeup is a strike today. Conventional sequencing does the opposite. It only works if the pitcher can throw that changeup for a strike. A backwards plan with a ball in the dirt is just a hitter’s count.',
      chapter: 'ch18',
      related: ['sequencing', 'changeup', 'pitchers-count']
    },
    {
      slug: 'pitchers-count',
      term: "Pitcher's count",
      aliases: ['pitchers count', 'ahead in the count', '0-2'],
      short: 'The pitcher is ahead: 0–1, 0–2, or 1–2. Expand the zone; the hitter must protect.',
      definition: 'A pitcher’s count is 0–1, 0–2, or 1–2: more strikes than balls, and the hitter has to guard against a strikeout. The pitcher can bounce a changeup or nibble off the edge. The hitter shortens up. Getting to these counts is the point of sequencing. They are the red cells on a leverage-shaded count matrix.',
      chapter: 'ch18',
      related: ['hitters-count', 'count-leverage', 'two-strike-approach'],
      diagram: {
        svg: 'countMatrix',
        opts: {
          shade: 'leverage',
          title: "Pitcher's and hitter's counts",
          desc: 'The twelve counts with hitter leverage and pitcher leverage shaded.'
        }
      }
    },
    {
      slug: 'hitters-count',
      term: "Hitter's count",
      aliases: ['hitters count', 'behind in the count', '2-0', '3-1'],
      short: 'The hitter is ahead: 1–0, 2–0, 3–0, 2–1, or 3–1. Hunt a zone and a pitch.',
      definition: 'A hitter’s count is 1–0, 2–0, 3–0, 2–1, or 3–1: the pitcher has to come closer to the zone. The hitter hunts a pitch and a location, usually a fastball they can drive. 3–0 is a take unless the coach has given a green light. These are the green cells on a leverage-shaded count matrix.',
      chapter: 'ch18',
      related: ['pitchers-count', 'green-light', 'count-leverage']
    },
    {
      slug: 'slide-step',
      term: 'Slide step',
      aliases: ['slide-step', 'quick to the plate', 'no leg lift'],
      short: 'A shorter set delivery, to the plate quicker, used to hold runners.',
      definition: 'A slide step is a stretch delivery with little or no leg lift, so the ball gets to the catcher faster and the runner has less time to steal. You buy hold time. You give up some stuff and some command. It is a tool with a runner on, not a default for every pitch. A slide step that becomes a balk (no stop, or a rush that never sets) is not a hold — it is a free base.',
      chapter: 'ch18',
      related: ['set-position', 'pickoff', 'balk']
    },
    {
      slug: 'pickoff',
      term: 'Pickoff',
      aliases: ['pick', 'pick-off', 'throw over'],
      short: 'A throw to a base to catch a runner off it, or to keep them close.',
      definition: 'A pickoff is a throw from the pitcher (or sometimes the catcher) to a base to catch a runner off it, or to shorten their lead. From the set, the pitcher must step toward that base. Step off first, then fake, is legal. Fake to first on the rubber is a balk. Pickoffs only exist where leadoffs exist; at Little League Major and below there is nothing to pick.',
      chapter: 'ch18',
      related: ['balk', 'set-position', 'primary-lead']
    },
    {
      slug: 'mound-visit',
      term: 'Mound visit',
      aliases: ['trip to the mound', 'mound trip', 'visit'],
      short: 'A coach, catcher, or infielder going to the pitcher. Too many, and the pitcher comes out.',
      definition: 'A mound visit is a defensive conference at the mound. Baseball Canada / OBR: one trip per inning to the same pitcher; a second in the same inning, or a second to the same batter, removes the pitcher. Little League Major and above also cap visits at two per game (a third removes the pitcher); Minor allows two per inning. Indirect visits count: talking to the catcher who then goes to the mound is a trip. Injury evaluations may be excused. A visit is not a pitch-count timeout.',
      chapter: 'ch18',
      related: ['shake-off', 'pitch-count', 'substitution']
    },
    {
      slug: 'shake-off',
      term: 'Shake-off',
      aliases: ['shake', 'shaking', 'no, not that pitch'],
      short: 'The pitcher rejects the catcher’s sign and asks for another.',
      definition: 'A shake-off is the pitcher saying no to the catcher’s pitch sign, usually with a shake of the head, so the catcher cycles to the next option. Teach pitchers to shake quickly; teach catchers to cycle without stalling the game. With a runner on second, signs move to a sequence or an indicator so the runner cannot relay the pitch. Shaking every pitch is not sequencing — it is indecision.',
      chapter: 'ch18',
      related: ['sequencing', 'indicator-system', 'mound-visit']
    },

    /* -------------------------------------------------------------- */
    /* ch19 — Hitting Approach                                         */
    /* -------------------------------------------------------------- */
    {
      slug: 'plate-discipline',
      term: 'Plate discipline',
      aliases: ['zone discipline', 'taking pitches', 'not chasing'],
      short: 'Swinging at strikes you can handle, and taking the rest.',
      definition: 'Plate discipline is the skill of swinging at pitches you can drive and taking the ones you cannot. Approach is decided before the pitch; the 0.4 seconds after release are for recognition, not for inventing a plan. A walk is a successful plate appearance. Chasing balls is how pitcher counts get to two strikes.',
      chapter: 'ch19',
      related: ['chase-rate', 'count-leverage', 'two-strike-approach']
    },
    {
      slug: 'count-leverage',
      term: 'Count leverage',
      aliases: ['leverage', 'count advantage', 'who is ahead'],
      short: 'Which side the count favours, and what that does to the next swing or pitch.',
      definition: 'Count leverage is the advantage sitting in the current balls and strikes. Hitter’s counts let you hunt a zone. Pitcher’s counts make you protect. Neutral counts (0–0, 1–1, 2–2, 3–2) are still a plan, not a guess. Reading leverage before the pitch is how an approach survives a twelve-year-old in a tight at-bat.',
      chapter: 'ch19',
      related: ['hitters-count', 'pitchers-count', 'plate-discipline'],
      diagram: {
        svg: 'countMatrix',
        opts: {
          shade: 'leverage',
          title: 'Count leverage',
          desc: 'The twelve counts with hitter and pitcher leverage shaded, plus walk and strikeout terminals.'
        }
      }
    },
    {
      slug: 'two-strike-approach',
      term: 'Two-strike approach',
      aliases: ['two strikes', 'protect', 'shorten up'],
      short: 'With two strikes: choke up, widen the zone a little, put the ball in play.',
      definition: 'A two-strike approach is what the hitter does at 0–2, 1–2, or 2–2: choke up, shorten the swing, and protect a slightly wider zone so a borderline strike is not a looking strikeout. The job is to put the ball in play or foul it off, not to hunt a perfect pitch. A green-light 3–0 swing is the opposite idea; two strikes are not 3–0.',
      chapter: 'ch19',
      related: ['choke-up', 'pitchers-count', 'chase-rate']
    },
    {
      slug: 'choke-up',
      term: 'Choke up',
      aliases: ['choke-up', 'hands up the bat', 'shorten the bat'],
      short: 'Slide the hands up the handle for more control, especially with two strikes.',
      definition: 'Choking up is moving both hands a little up the handle so the bat is shorter and quicker. Control goes up; raw power goes down. It is the default two-strike adjustment, and a good idea for a player whose bat is a bit long for them. Little League permits thumb protectors; choke-knobs and choke-up assists that are not the player’s own hands are a different, often illegal, aid. Confirm the equipment rule for the division.',
      chapter: 'ch19',
      related: ['two-strike-approach', 'door-knocking-knuckles', 'bat-path']
    },
    {
      slug: 'chase-rate',
      term: 'Chase rate',
      aliases: ['chasing', 'O-swing', 'swings at balls'],
      short: 'How often a hitter swings at pitches outside the zone.',
      definition: 'Chase rate is the share of pitches outside the zone that the hitter still offers at. High chase is how pitcher counts become strikeouts, and how good fastballs look even better. Plate discipline is the skill of driving that number down without taking called strikes down the middle. In a small youth sample it is a habit to watch, not a published statistic.',
      chapter: 'ch19',
      related: ['plate-discipline', 'two-strike-approach', 'strike-zone']
    },
    {
      slug: 'sacrifice-fly',
      term: 'Sacrifice fly',
      aliases: ['sac fly', 'SF', 'fly out, run scores'],
      short: 'A fly out that scores a runner from third. An RBI, not an at-bat.',
      definition: 'A sacrifice fly is a fly ball (fair, and in most books a foul fly as well) caught with fewer than two outs that scores a runner from third who tags up. The batter is credited with an RBI and is not charged with an at-bat; it is a plate appearance. The runner must tag up on first contact. A fly out that does not score a run is just a fly out.',
      chapter: 'ch19',
      related: ['tag-up', 'rbi', 'plate-appearance']
    },
    {
      slug: 'green-light',
      term: 'Green light',
      aliases: ['green-lit', '3-0 swing', 'hit away'],
      short: 'Permission to swing in a take count, most often 3–0, or to steal on your own.',
      definition: 'A green light is the coach’s permission to swing when the default is a take — almost always 3–0 — or to steal without a sign. Without it, 3–0 is a take. With it, the hitter still hunts a pitch they can drive, not any strike. On the bases, a green-light runner is trusted to read the pitcher. It is a specific release, not a personality trait.',
      chapter: 'ch19',
      related: ['hitters-count', 'on-deck', 'plate-discipline']
    },
    {
      slug: 'on-deck',
      term: 'On deck',
      aliases: ['on-deck hitter', 'next batter', 'in the hole'],
      short: 'The next batter, warming up and reading the at-bat in front of them.',
      definition: 'On deck is the next batter. They watch the count, the pitcher, and the runners so they step in with a plan. Where an on-deck circle is allowed they take swings there, in a helmet. Little League Major and below keep the next batter in the dugout — no on-deck position. “In the hole” is the batter after that. The on-deck hitter does not coach the current hitter from the circle.',
      chapter: 'ch19',
      related: ['on-deck-circle', 'green-light', 'count-leverage']
    },

    /* -------------------------------------------------------------- */
    /* ch20 — Managing the Game                                        */
    /* -------------------------------------------------------------- */
    {
      slug: 're-entry',
      term: 'Re-entry',
      aliases: ['reenter', 're-enter', 'starter back in'],
      short: 'A replaced starter coming back into the game, where the pathway allows it.',
      definition: 'Re-entry is a starter returning after being substituted. Little League allows starters to re-enter in the same batting slot, with pitcher-return limits by division (Intermediate/Junior/Senior: once per game as pitcher). Baseball Canada championships follow OBR substitution more tightly. Baseball Canada 11U guidelines allow free offensive re-entry and defensive re-entry at any position except pitcher once that player has pitched. A pitcher removed from the mound generally does not return to pitch.',
      chapter: 'ch20',
      related: ['substitution', 'mandatory-play', 'courtesy-runner']
    },
    {
      slug: 'indicator-system',
      term: 'Indicator system',
      aliases: ['indicator', 'indicator then live', 'sign system'],
      short: 'A decoy sequence: the touch after a chosen indicator is the real sign.',
      definition: 'An indicator system is how competitive teams hide signs. The coach (or catcher) mixes decoy touches; one agreed touch is the indicator, and the next touch is live. Everything else is junk. Change the indicator when it is stolen. At 11–12U a simpler one-touch-is-live system is enough. A six-sign sequence that a twelve-year-old cannot decode in a tight count is not sophisticated. It is broken.',
      chapter: 'ch20',
      related: ['wipe-off', 'shake-off', 'green-light']
    },
    {
      slug: 'wipe-off',
      term: 'Wipe-off',
      aliases: ['wipe', 'wipe off', 'cancel the sign'],
      short: 'A sign that cancels the previous call so the coach can re-sign.',
      definition: 'A wipe-off cancels whatever live sign was just given — often a brush of the forearm — so the coach can start the sequence again. Without a wipe, a missed indicator becomes a bunt nobody wanted. Teach it as part of the system, not as an emergency mime. When the other team has the signs, wipe, change the indicator, and keep playing.',
      chapter: 'ch20',
      related: ['indicator-system', 'green-light', 'roots']
    },
    {
      slug: 'protest',
      term: 'Protest',
      aliases: ['protested game', 'rule protest'],
      short: 'A challenge of a rule’s application, not a judgment call. Before the next pitch.',
      definition: 'A protest is a claim that the umpire applied a rule incorrectly. Judgment calls — balls and strikes, safe and out, fair and foul — are not protestable. The protest must be lodged with the umpire before the next pitch or play. Baseball Canada championships require a $100 deposit with the protest. Only the manager talks to the umpire. Contact with an umpire is an automatic ejection. ROOTS still applies while you disagree.',
      chapter: 'ch20',
      related: ['judgment-call', 'appeal', 'roots']
    },
    {
      slug: 'intentional-walk',
      term: 'Intentional walk',
      aliases: ['IBB', 'intentional base on balls', 'put him on'],
      short: 'Walking a batter on purpose. In youth baseball it is still four pitches.',
      definition: 'An intentional walk puts a batter on first on purpose, usually to pitch to the next hitter or to set up a force. In current youth Baseball Canada and Little League play it is still four pitches, not the MLB automatic wave. The catcher steps aside and the pitcher throws four balls. Use it when the on-deck hitter is a better matchup, not as a way to avoid pitching to a child you are afraid of.',
      chapter: 'ch20',
      related: ['walk', 'infield-in', 'green-light']
    },

    /* -------------------------------------------------------------- */
    /* ch21 — Reading the Game                                         */
    /* -------------------------------------------------------------- */
    {
      slug: 'scorebook',
      term: 'Scorebook',
      aliases: ['scorecard', 'scoresheet', 'the book'],
      short: 'The written account of every batter, runner, and scorer decision.',
      definition: 'A scorebook is a diamond per at-bat, with the play written in scoring numbers. Draw the line around the diamond as the batter-runner advances; a filled diamond is a run. Count sits in the corner. Pitch count sits on the pitcher’s line. The book is a language: 6-4-3, F8, K, backwards-K, BB, E5, FC, SF. Use the same words every time. The scorer, not the cheer, decides hit versus error.',
      chapter: 'ch21',
      related: ['box-score', 'position-numbers', 'rbi']
    },
    {
      slug: 'box-score',
      term: 'Box score',
      aliases: ['boxscore', 'the box', 'line'],
      short: 'The ledger of the game: each batter’s and pitcher’s line, plus the totals.',
      definition: 'A box score is the ledger. Each hitter’s line shows at-bats, runs, hits, RBI, and often walks and strikeouts. Each pitcher’s line shows innings, hits, runs, earned runs, walks, and strikeouts. The line score is the weather of the game — inning by inning. The box is who did what. Neither is a scouting report by itself.',
      chapter: 'ch21',
      related: ['line-score', 'scorebook', 'earned-run']
    },
    {
      slug: 'earned-run',
      term: 'Earned run',
      aliases: ['ER', 'earned'],
      short: 'A run charged to the pitcher that did not score because of an error.',
      definition: 'An earned run is a run that scored without the help of an error or passed ball, reconstructing the inning as if ordinary effort had been made. Earned runs are the numerator of ERA. An error that prolongs an inning can make later runs unearned, even if they score on clean hits. The scorer applies ordinary effort, then reconstructs. The groan from the stand does not.',
      chapter: 'ch21',
      related: ['unearned-run', 'era', 'ordinary-effort']
    },
    {
      slug: 'unearned-run',
      term: 'Unearned run',
      aliases: ['UER', 'unearned'],
      short: 'A run that scored only because of an error or passed ball.',
      definition: 'An unearned run is a run that would not have scored if ordinary effort had been made. It still counts on the scoreboard. It does not count in ERA. Reconstruct the inning: if the error was the third out that should have been, every run after that is unearned. A fielder’s choice is not an error; those runs can still be earned.',
      chapter: 'ch21',
      related: ['earned-run', 'error', 'era']
    },
    {
      slug: 'rbi',
      term: 'RBI',
      aliases: ['runs batted in', 'ribby', 'driven in'],
      short: 'A run credited to the batter who drove it in, with a few listed exceptions.',
      definition: 'An RBI is credited to the batter whose action drove in a run: a hit, a fly out, a ground out with fewer than two outs, a walk or hit-by-pitch with the bases loaded. Do not credit RBI on a double play, or when the run scores on an error the batter did not force. The scorer decides. A sacrifice fly is an RBI without an at-bat.',
      chapter: 'ch21',
      related: ['sacrifice-fly', 'run', 'scorebook']
    },
    {
      slug: 'unassisted',
      term: 'Unassisted',
      aliases: ['U3', 'unassisted putout', 'U'],
      short: 'A putout with no throw: the fielder who fielded it also recorded the out.',
      definition: 'An unassisted putout is one fielder doing the whole out: fielding a grounder and stepping on the bag, or catching a line drive. U3 is the first baseman fielding it and touching first. A 3-1 is not unassisted — the pitcher covered. Write U plus the position. It is a scoring note, not a style point.',
      chapter: 'ch21',
      related: ['position-numbers', 'force-out', 'scorebook']
    },
    {
      slug: 'called-strikeout',
      term: 'Called strikeout',
      aliases: ['backwards K', 'looking strikeout', 'punched out looking'],
      short: 'Strike three looking. Written as a backwards-K. The batter did not offer.',
      definition: 'A called strikeout is a third strike the batter did not swing at. The scorebook writes a backwards-K (ꓘ) to distinguish it from a swinging K. It is the difference between a hitter who offered and a hitter who took. Two-strike approach exists to make this outcome rarer. The pitch still has to be in the zone; taking a ball four is a walk, not a backwards-K.',
      chapter: 'ch21',
      related: ['strikeout', 'called-strike', 'two-strike-approach']
    },

    /* -------------------------------------------------------------- */
    /* ch22 — Analytics Foundations                                    */
    /* -------------------------------------------------------------- */
    {
      slug: 'batting-average',
      term: 'Batting average',
      aliases: ['AVG', 'BA', 'average'],
      short: 'Hits divided by at-bats. Hides walks. Treats a single like a home run.',
      definition: 'Batting average is hits divided by at-bats. The question it answers: when this batter was charged with an official at-bat, how often did they get a hit? It hides walks, hit-by-pitches, and sacrifices — those are not at-bats — and it treats a single and a home run as equal. A .300 average in a few dozen at-bats is a story, not a skill. You want hundreds of at-bats before you talk as if you know.',
      chapter: 'ch22',
      related: ['on-base-percentage', 'at-bat', 'sample-size']
    },
    {
      slug: 'on-base-percentage',
      term: 'On-base percentage',
      aliases: ['OBP', 'on base percentage', 'on-base'],
      short: 'How often the batter avoided making an out. The most important simple offensive number.',
      definition: 'On-base percentage is hits, walks, and hit-by-pitches over plate appearances (with sacrifice flies in the denominator). The question: how often did this batter not make an out? Outs are the clock, so this is the single most important simple offensive number. It hides the difference between a walk and a home run. A .320 OBP is roughly league-average in many professional contexts; treat that as a labelled illustration, not this year’s table.',
      chapter: 'ch22',
      related: ['batting-average', 'ops', 'plate-appearance']
    },
    {
      slug: 'slugging-percentage',
      term: 'Slugging percentage',
      aliases: ['SLG', 'slugging'],
      short: 'Total bases per at-bat. Weights extra bases; hides walks.',
      definition: 'Slugging percentage is total bases per at-bat, with a single worth one, a double two, a triple three, and a home run four. The question: how much extra-base value did this batter produce when they did not walk? It hides walks. Its weights are a convenience, not a theory: a double is not worth exactly two singles in run value.',
      chapter: 'ch22',
      related: ['ops', 'batting-average', 'woba']
    },
    {
      slug: 'ops',
      term: 'OPS',
      aliases: ['on-base plus slugging', 'OBP plus SLG'],
      short: 'OBP plus SLG. A convenient, unprincipled sum of two different scales.',
      definition: 'OPS is on-base percentage plus slugging percentage. It is a rough, convenient mix of reaching base and hitting for extra bases. The two numbers were not built to be added — they live on different scales — so OPS is useful as a quick look and not as a worldview. wOBA exists because this sum is not principled.',
      chapter: 'ch22',
      related: ['on-base-percentage', 'slugging-percentage', 'woba']
    },
    {
      slug: 'babip',
      term: 'BABIP',
      aliases: ['batting average on balls in play', 'balls in play'],
      short: 'Hits on balls in play, not homers. A luck and sample-size flag, not a skill rank.',
      definition: 'BABIP is batting average on balls in play: hits other than home runs, divided by at-bats minus strikeouts minus home runs, plus sacrifice flies in some formulas. League BABIP sits near .300 in professional baseball; large gaps from that line in a small sample are usually weather. It is a flag that a batting average may not last, not a ranking of who hits it harder. Youth samples almost never settle.',
      chapter: 'ch22',
      related: ['batting-average', 'sample-size', 'woba']
    },
    {
      slug: 'woba',
      term: 'wOBA',
      aliases: ['weighted on-base average', 'weighted OBA'],
      short: 'A weighted offensive rate by run value. The weights change every season.',
      definition: 'wOBA (weighted on-base average) assigns each offensive event a run value and scales the total to look like an on-base percentage. A home run is worth more than a walk; a walk is worth more than nothing. That is the correction OPS was trying to make. The weights change every season and are not a fact to memorise from a curriculum. The shape of the statistic is what travels.',
      chapter: 'ch22',
      related: ['wrc-plus', 'ops', 'on-base-percentage']
    },
    {
      slug: 'wrc-plus',
      term: 'wRC+',
      aliases: ['weighted runs created plus', 'wRC plus', 'wrc+'],
      short: 'Park- and league-adjusted offence, with 100 as average. 120 is 20 percent above.',
      definition: 'wRC+ (weighted runs created plus) takes offensive run value, adjusts for park and league, and centres the scale so 100 is average. 120 means 20 percent above league average; 80 means 20 percent below. It is the offensive number that lets you compare a hitter in a tiny park to a hitter in a huge one. It still needs a sample. It is not a youth-baseball leaderboard you should be running on thirty at-bats.',
      chapter: 'ch22',
      related: ['woba', 'war', 'sample-size']
    },
    {
      slug: 'era',
      term: 'ERA',
      aliases: ['earned run average', 'earned-run average'],
      short: 'Earned runs per nine innings. Hides defence, sequencing, and the scorer.',
      definition: 'ERA is earned runs times nine, divided by innings pitched. The question: how many earned runs does this pitcher allow per nine innings? It hides the defence behind them, the luck of sequencing (clustered hits versus spread-out hits), and the scorer’s error calls. A 4.00 ERA is a labelled illustration of “fine,” not this year’s league table. FIP exists because ERA cannot see those things.',
      chapter: 'ch22',
      related: ['fip', 'earned-run', 'whip']
    },
    {
      slug: 'fip',
      term: 'FIP',
      aliases: ['fielding independent pitching', 'FIP constant'],
      short: 'A pitching rate built from strikeouts, walks, hit-by-pitches, and home runs.',
      definition: 'FIP (fielding independent pitching) estimates the run value of the things a pitcher most controls: strikeouts, walks, hit-by-pitches, and home runs, scaled to look like ERA. It exists to look through defence and sequencing. It hides everything else — quality of contact, managing the running game, working around trouble. A FIP much lower than ERA in a small sample is a flag, not a verdict.',
      chapter: 'ch22',
      related: ['era', 'whip', 'war']
    },
    {
      slug: 'whip',
      term: 'WHIP',
      aliases: ['walks and hits per inning', 'baserunners per inning'],
      short: 'Walks plus hits, divided by innings. Baserunners via hit or walk per inning.',
      definition: 'WHIP is walks plus hits, divided by innings pitched. The question: how many baserunners via hit or walk does this pitcher allow per inning? It ignores how those runners scored, and it treats a walk like a single. It is a traffic number, not a run number. Use it next to ERA and FIP, not instead of them.',
      chapter: 'ch22',
      related: ['era', 'fip', 'walk']
    },
    {
      slug: 'war',
      term: 'WAR',
      aliases: ['wins above replacement', 'fWAR', 'bWAR', 'Wins Above Replacement'],
      short: 'Wins versus a freely available replacement. Versions disagree; small gaps are noise.',
      definition: 'WAR (wins above replacement) estimates how many wins a player added versus a freely available replacement — a bench player or a typical call-up. Position, defence, offence, and (for pitchers) run prevention all go in. Different sites compute it differently (fWAR, bWAR). Small differences are noise. A 2-WAR season and a 2.4-WAR season are not a ranking you should argue about. Youth baseball almost never has the sample or the defensive data to make WAR mean anything.',
      chapter: 'ch22',
      related: ['wrc-plus', 'sample-size', 'fip']
    },
    {
      slug: 'sample-size',
      term: 'Sample size',
      aliases: ['sample', 'n', 'too small a sample'],
      short: 'How much data you have. Thirty at-bats at .400 is weather, not a skill.',
      definition: 'Sample size is how many events sit under a number. Batting average needs hundreds of at-bats before it stabilises; defence needs years; a weekend tryout is not a sample. Thirty at-bats at .400 is weather. Youth baseball almost never gets to the sample these metrics were built for. Watch the player, progress the skill, and do not let a small number impersonate a scouting report.',
      chapter: 'ch22',
      related: ['babip', 'batting-average', 'tryout']
    },
    {
      slug: 'plate-appearance',
      term: 'Plate appearance',
      aliases: ['PA', 'times up', 'trip to the plate'],
      short: 'Every completed turn at the plate, including walks, hit-by-pitches, and sacrifices.',
      definition: 'A plate appearance is any completed turn at the plate: a hit, an out, a walk, a hit-by-pitch, a sacrifice, an obstruction award. It is the denominator of on-base percentage. It is not the same as an at-bat. If you want to know how often a batter avoided an out, count plate appearances. If you want hits per official at-bat, count at-bats.',
      chapter: 'ch22',
      related: ['at-bat', 'on-base-percentage', 'sacrifice-fly']
    },
    {
      slug: 'at-bat',
      term: 'At-bat',
      aliases: ['AB', 'official at-bat', 'time at bat'],
      short: 'A plate appearance that is not a walk, hit-by-pitch, sacrifice, or certain awards.',
      definition: 'An at-bat is the official-at-bat subset of plate appearances: hits, outs, and reaching on an error or fielder’s choice. Walks, hit-by-pitches, sacrifice bunts, sacrifice flies, and catcher’s interference are plate appearances that are not at-bats. Batting average is hits per at-bat, which is why a patient hitter can have a modest average and a strong on-base percentage.',
      chapter: 'ch22',
      related: ['plate-appearance', 'batting-average', 'walk']
    },

    /* -------------------------------------------------------------- */
    /* ch23 — Scouting & Player Development                            */
    /* -------------------------------------------------------------- */
    {
      slug: 'five-tools',
      term: 'Five tools',
      aliases: ['tools', 'toolsy', 'hit power run field throw'],
      short: 'Hit, power, run, field, throw — the scouting checklist for a position player.',
      definition: 'Position players are scouted on five tools: hit (contact and on-base skill against good pitching), power (extra-base impact), run (straight-line speed as it plays on the bases), field (range, hands, instincts), and throw (arm strength and accuracy). Pitchers are graded on different axes: the fastball, secondaries, command, and delivery / durability. Tools are observed skills, not last Tuesday’s box score. A 14-year-old who went 4-for-4 against 11U pitching has not demonstrated a hit tool.',
      chapter: 'ch23',
      related: ['twenty-eighty-scale', 'present-grade', 'projection']
    },
    {
      slug: 'twenty-eighty-scale',
      term: 'Twenty-eighty scale',
      aliases: ['20-80', '20–80', 'scouting scale', '80 scale'],
      short: 'The scouting dial from 20 to 80. 50 is major-league average. Grades come in fives.',
      definition: 'The 20–80 scale is how scouts grade tools. 50 is major-league average — not “average 13-year-old.” Each 10 points is one standard deviation: 60 is plus, 70 plus-plus, 80 the handful in a generation; 40, 30, and 20 sit below. Grades are usually given in fives (45, 50, 55). 50 is not a compliment at a youth tryout. It is a professional reference point almost no 12-year-old should be expected to sit on today.',
      chapter: 'ch23',
      related: ['present-grade', 'future-grade', 'five-tools'],
      diagram: {
        svg: 'scaleGauge',
        opts: {
          value: 50,
          compare: 60,
          label: '50 present · 60 future (illustrative)',
          title: '20–80 scouting scale — 50 is major-league average',
          desc: 'The 20 to 80 scouting scale as a horizontal dial, with 50 marked as MLB average, a present marker at 50, and a future marker at 60.'
        }
      }
    },
    {
      slug: 'present-grade',
      term: 'Present grade',
      aliases: ['present', 'current grade', 'now grade'],
      short: 'What the tool is today, against the professional 20–80 scale.',
      definition: 'A present grade is what the tool is right now, measured on the professional 20–80 scale. A 45 present hit tool means the player does not currently hit like a major-leaguer. That is almost always true of a 14-year-old, and it is not an insult. Collapsing present and future into one number is how organisations mis-rank their own lists.',
      chapter: 'ch23',
      related: ['future-grade', 'twenty-eighty-scale', 'projection']
    },
    {
      slug: 'future-grade',
      term: 'Future grade',
      aliases: ['future', 'FV', 'projected grade'],
      short: 'What the scout thinks the tool can be when the body and the innings have done their work.',
      definition: 'A future grade is the scout’s projection of a tool at maturity, usually a major-league projection, not “next summer.” A 45 present / 60 future hit tool is a player who might hit plus if the projection lands. A 60 / 60 is a player whose tool already is plus. Future grades miss. Plan the path as if the future has to be earned.',
      chapter: 'ch23',
      related: ['present-grade', 'projection', 'twenty-eighty-scale']
    },
    {
      slug: 'spin-rate',
      term: 'Spin rate',
      aliases: ['rpm', 'spin', 'revolutions per minute'],
      short: 'How fast the ball is spinning, in RPM. Context for movement, not a personality.',
      definition: 'Spin rate is how many times per minute the ball rotates after release. Higher four-seam spin, with the right axis, can make a fastball “rise” (it drops less than gravity alone). Curveball spin is a different axis. Raw spin without axis and velocity is a trivia number. Youth radar guns that spit one RPM figure are not a scouting department.',
      chapter: 'ch23',
      related: ['induced-vertical-break', 'extension', 'five-tools']
    },
    {
      slug: 'induced-vertical-break',
      term: 'Induced vertical break',
      aliases: ['IVB', 'ride', 'vertical break'],
      short: 'How much the pitch moves up or down relative to gravity-only flight.',
      definition: 'Induced vertical break is the extra up or down a pitch shows compared with a gravity-only path. A four-seam with ride has positive IVB — it stays up. A curve with depth has negative IVB. It is a description of movement, not a moral quality of the pitcher. Velocity without break, and break without command, are both incomplete.',
      chapter: 'ch23',
      related: ['spin-rate', 'extension', 'changeup']
    },
    {
      slug: 'extension',
      term: 'Extension',
      aliases: ['release extension', 'release point', 'stride extension'],
      short: 'How far down the mound the pitcher is when the ball leaves the hand.',
      definition: 'Extension is the distance from the rubber toward home at release. More extension means the ball travels a shorter remaining distance to the plate, so the same velocity plays as “perceived” firmer. It is one reason two pitchers at 82 mph do not look the same. Chasing extension by leaping, and losing command, is a bad trade. Measure it when you have the camera; do not invent it from a vibe.',
      chapter: 'ch23',
      related: ['spin-rate', 'induced-vertical-break', 'balance-point']
    },
    {
      slug: 'projection',
      term: 'Projection',
      aliases: ['projectability', 'upside', 'what they might become'],
      short: 'The reasoned guess about what a young player can become, not what they are today.',
      definition: 'Projection is the gap between present and future: frame, athleticism, and a rate of improvement that makes a better tool possible. A 14-year-old’s current results against younger pitching are a weak projection signal. Body, instruction, and innings against better pitching are stronger ones. Projection is a risk statement. Future grades miss. Do not confuse a growth spurt with a hit tool.',
      chapter: 'ch23',
      related: ['future-grade', 'relative-age-effect', 'ltad']
    },
    {
      slug: 'ltad',
      term: 'LTAD',
      aliases: ['long-term athlete development', 'Sport for Life', 'LTAD model'],
      short: 'Baseball Canada’s stage model from Active Start through Active for Life.',
      definition: 'Long-Term Athlete Development is Baseball Canada’s framework, adapted from Sport for Life, for what to train at each stage of a player’s life: Active Start, FUNdamentals, Learn to Train, Train to Train, Train to Compete, Train to Win, and Active for Life. It is a coaching model, not a playing rule. Little League’s Tee Ball → Minor → Major → Intermediate → Junior → Senior ladder reflects compatible developmental logic even though it is not branded LTAD. Early single-sport specialisation is what the early stages advise against.',
      chapter: 'ch23',
      related: ['early-specialization', 'relative-age-effect', 'tryout']
    },
    {
      slug: 'relative-age-effect',
      term: 'Relative age effect',
      aliases: ['RAE', 'birth-month bias', 'age-group cutoff'],
      short: 'Older-in-the-year players get selected more, because they are bigger right now.',
      definition: 'The relative age effect is the well-documented bias that players born early in the selection year are over-represented on competitive teams. They are older, often bigger, and look more “ready” at 11 than a teammate born ten months later. Cutoff dates create the effect; scouts and tryout boards have to watch for it. A late-birthday 12-year-old with tools is not behind — they are younger. Projection has to see that.',
      chapter: 'ch23',
      related: ['projection', 'tryout', 'early-specialization']
    },
    {
      slug: 'early-specialization',
      term: 'Early specialisation',
      aliases: ['early specialization', 'single-sport', 'year-round baseball'],
      short: 'Playing only baseball, year-round, too young. LTAD and Pitch Smart advise against it.',
      definition: 'Early specialisation is concentrating on one sport, often year-round, before the body and the athlete are ready. Baseball Canada’s FUNdamentals and Learn to Train stages, and Pitch Smart arm-care guidance, both push the other way: multi-sport, rest from throwing, and no extra breaking balls in the winter. Year-round baseball is a workload choice, not a badge. The injury and burnout costs show up later, which is why they are easy to ignore at 10.',
      chapter: 'ch23',
      related: ['ltad', 'arm-care', 'growth-plate']
    },
    {
      slug: 'tryout',
      term: 'Tryout',
      aliases: ['evaluation', 'ID camp', 'selection'],
      short: 'A placement event. At house league it balances teams; at rep it selects them.',
      definition: 'A tryout is a structured evaluation. Little League house league uses evaluation to balance teams under Regulation IV — an eligible registered player is placed, not cut. Rep and Baseball Canada select teams use tryouts to choose a roster, with provincial associations setting the process. A fair youth tryout measures tools and habits on a written rubric, mitigates relative-age bias, and tells families how decisions were made. One weekend of results is not a 20–80 present grade.',
      chapter: 'ch23',
      related: ['relative-age-effect', 'five-tools', 'sample-size']
    },

    /* -------------------------------------------------------------- */
    /* ch24 — Edge Cases & Appeals                                     */
    /* -------------------------------------------------------------- */
    {
      slug: 'appeal',
      term: 'Appeal',
      aliases: ['appeal play', 'appealing', 'missed base appeal'],
      short: 'A live-ball claim that a runner missed a base or left early on a tag-up.',
      definition: 'An appeal is the defence asking the umpire to call a runner out for missing a base or leaving early on a catch. The ball must be live; a fielder with the ball touches the missed base (or the runner) and makes it clear they are appealing. The umpire does not volunteer the call. Batting out of order is also an appeal, made to the umpire before the next pitch. Judgment is not appealed this way; it is not protestable either.',
      chapter: 'ch24',
      related: ['missed-base', 'tag-up', 'batting-out-of-order']
    },
    {
      slug: 'batting-out-of-order',
      term: 'Batting out of order',
      aliases: ['wrong batter', 'out of turn', 'batting out of turn'],
      short: 'The wrong name on the card came up. The defence must appeal before the next pitch.',
      definition: 'Batting out of order is when a batter other than the one due on the card completes a plate appearance. It is an appeal play. If the defence appeals before the next pitch, the proper batter is out, any advance is undone, and the next proper batter is up. If they do not appeal in time, the improper batter becomes proper and the order continues from there. The card, not memory, is the evidence.',
      chapter: 'ch24',
      related: ['batting-order', 'appeal', 'protest']
    },
    {
      slug: 'rundown',
      term: 'Rundown',
      aliases: ['pickle', 'run-down', 'caught in between'],
      short: 'A runner trapped between bases. The defence wants one throw and a tag.',
      definition: 'A rundown is a runner caught between two bases. The efficient version is one throw and a tag: run the trapped runner toward a base at full speed, throw once, tag. Extra throws are extra chances to miss, drop, or let another runner advance. Get out of the baseline after you throw. The offence’s job is to stay in the rundown long enough for a teammate to move up, without being tagged.',
      chapter: 'ch24',
      related: ['pickoff', 'tag-out', 'obstruction']
    },
    {
      slug: 'courtesy-runner',
      term: 'Courtesy runner',
      aliases: ['CR', 'runner for the pitcher', 'runner for the catcher'],
      short: 'A runner for the pitcher or catcher of record. Not a substitution; local option.',
      definition: 'A courtesy runner runs for the pitcher or catcher of record so they can gear up, without counting as a substitution. Little League makes it a local-league option, regular season, with two outs: a player not currently in the batting order (or, with a continuous order, the player who made the last out). A player may courtesy-run only once per game under a traditional order. Baseball Canada championship play follows OBR and does not include a general courtesy-runner rule. Confirm the local option before you send someone.',
      chapter: 'ch24',
      related: ['substitution', 're-entry', 'mandatory-play']
    },
    {
      slug: 'ground-rules',
      term: 'Ground rules',
      aliases: ['park rules', 'local ground rules', 'field rules'],
      short: 'This park’s extra rules: what is a dead ball, a double, or out of play here.',
      definition: 'Ground rules are the park-specific extras on top of the book: a ball stuck in the tarp, a hop over that particular fence, a dead-ball area by the shed. The umpire states them at the plate meeting. They do not override the rulebook; they apply it to this field. A protest about a ground rule still has to be a rule-application claim, lodged before the next pitch, not a complaint that you did not like the bounce.',
      chapter: 'ch24',
      related: ['protest', 'double', 'judgment-call']
    },
    {
      slug: 'judgment-call',
      term: 'Judgment call',
      aliases: ['judgement call', 'umpire judgment', 'balls and strikes'],
      short: 'An umpire’s judgment — safe or out, ball or strike, fair or foul. Not protestable.',
      definition: 'A judgment call is the umpire’s decision on what they saw: ball or strike, safe or out, fair or foul, catch or no catch. It is not protestable. You may not argue balls and strikes. Rule application — which rule was used, and whether it was the right one — may be protested, before the next pitch, by the manager. ROOTS still applies. Officials are part of the game.',
      chapter: 'ch24',
      related: ['protest', 'appeal', 'roots']
    },
    {
      slug: 'missed-base',
      term: 'Missed base',
      aliases: ['missed the bag', 'failed to touch', 'skipped a base'],
      short: 'A runner did not touch a base. They are not out until the defence appeals.',
      definition: 'A missed base is a runner failing to touch a required base while advancing or returning. The run or the extra base is not yet legal. The defence must appeal — live ball, touch the missed base with the ball, make the appeal clear — or the miss stands. The umpire does not call it on their own. Teach runners to hit every bag, especially home on a walk-off, and teach fielders to watch the feet.',
      chapter: 'ch24',
      related: ['appeal', 'tag-up', 'run']
    }
  ];

  var api = {
    terms: TERMS,

    bySlug: function (slug) {
      var i;
      if (slug == null) return null;
      slug = String(slug);
      for (i = 0; i < TERMS.length; i++) {
        if (TERMS[i] && TERMS[i].slug === slug) return TERMS[i];
      }
      return null;
    },

    all: function () {
      var list = cloneList(TERMS);
      list.sort(compareTerm);
      return list;
    },

    search: function (query) {
      var q = trimStr(query).toLowerCase();
      var out = [];
      var i;
      var entry;
      if (!q) return api.all();
      for (i = 0; i < TERMS.length; i++) {
        entry = TERMS[i];
        if (haystackOf(entry).indexOf(q) !== -1) out.push(entry);
      }
      out.sort(compareTerm);
      return out;
    },

    byLetter: function () {
      var groups = {};
      var out = {};
      var i;
      var letter;
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var list = api.all();
      for (i = 0; i < list.length; i++) {
        letter = firstLetter(list[i] && list[i].term);
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(list[i]);
      }
      for (i = 0; i < letters.length; i++) {
        letter = letters.charAt(i);
        if (groups[letter]) out[letter] = groups[letter];
      }
      if (groups['#']) out['#'] = groups['#'];
      return out;
    }
  };

  root.HRL_GLOSSARY = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_GLOSSARY;
  }
}).call(typeof window !== 'undefined' ? window : this);
