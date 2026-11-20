# CMO review: PRD v0.2 (Espresso Finder Japan)

## Verdict

v0.2 is a data-curation plan with a growth section attached. It has no target audience for acquisition, no reason for anyone to come back, and no metric that could ever show it failing.

## Top 3 killer objections

**1. The name, the positioning and the channels point to three different audiences.**
The name is "Espresso Finder Japan". The positioning says *"coffee made in front of you, not poured from a bottle"* and claims it *"Speaks to cafe hoppers and dates as well as espresso regulars."* The channels are *"r/JapanLife or r/Tokyo, a foreign-resident Facebook group, a university international-student group"*. All three are English-speaking expat groups. Meanwhile §2 names the behaviour in Japanese (カフェ巡り), and the largest pool of coffee people in Japan is Japanese residents. The PRD never says which language the site is in. Dates are an odd fit too: people choose a date cafe largely on atmosphere, and §3 explicitly excludes people who choose on "interior". And *"keep the working name for now; consider a name built around a promise later"* means the station pages (F7) will build links and search rankings under a name you plan to drop. Pick the audience, the language and the name now. Station pages are the one thing in this plan that compounds, and a rename resets them.

**2. There is no retention loop, and the product runs out of content for its core user.**
§3 says *"The cafe hopper is the one with a recurring need to discover."* Then the product launches with *"about 30 cafes"* and promises to *"grow slowly"*. A weekend hopper uses up 30 cafes in a season. Every return mechanic is pushed out: *"saved list / favorites · optional email or LINE 'new cafes near you'"* are all under *Later*. That leaves no account, no list, no notification and no feed. Nothing brings a user back except remembering the URL. The espresso regular has the opposite problem: once they find their one reliable shot nearby, they never need the product again. Neither user segment has a habit loop.

**3. The growth metrics cannot fail, so they will not tell you anything.**
- *"External weekly visitors: Grows month over month."* This has no baseline and no absolute number, so going from 4 visitors to 5 counts as success.
- *"No external traffic for 3 consecutive months"* will never trigger, because a single crawler-adjacent visit or a stray Reddit click resets the clock.
- *"exclude … the founder's circle (tracked by tagged links)"* only works if friends always use the tagged link. They will forward the bare URL, and cookie-less analytics cannot tell them apart from strangers.
- *"Directions clicks per external visit ≥ 30%"* is a conversion target set before any traffic exists. Station-page search visitors who bounce will also drag it down for reasons that have nothing to do with value.
- There is **no retention metric at all**. For a product built on a *"recurring need"*, that is the most important number, and it is missing.

## Other issues

- **Cafe self-reports have no distribution.** The target is *"≥ 5 cafes in the first 3 months"*, but §11 removes the only way to reach owners: *"Not in v1: QR stickers or ready-made posts for cafes."* How does an owner find F6?
- **There is no word-of-mouth mechanism.** Nothing is designed to be shared: no shareable hop list and no "this cafe is Visited" badge for owners to post. Cafe hoppers live on Instagram, and §7 rules out reusing others' photos while §1 dismisses "pretty interiors". That gives up the main sharing currency without offering a replacement.
- **The plan ignores the real competition for attention.** That competition is not Google's filters. It is saved Google Maps lists, Instagram coffee accounts and the hopper's own notes, which §2 itself names as the current workaround (*"keep a personal list"*). The PRD never explains why someone would switch from those.
- **The community launch happens once.** It says *"post in three communities"* in M2, which is three posts in total. *"Useful content rather than a bare link"* is never defined: no format, no cadence, no owner.
- **Recruiting from the launch channels contaminates the launch.** Interviews are recruited in r/JapanLife, and the M0 list goes to *"one community"*. You will burn the launch audience on research before the product exists.
- **Stop condition 1 cannot be judged.** *"Google Maps or Tabelog adds an equivalent coffee-base filter"*: who decides what counts as "equivalent"?
- **The M0 list has no success threshold.** The hand-made list is the real MVP, but it is treated as *"a signal, not a verdict"*. Define what the signal has to be.

## A concrete go-to-market fix

1. **Choose one launch audience and language in M0.** Either Japanese-speaking residents who do カフェ巡り (X, Instagram and Threads in Japanese) or English-speaking residents and visitors (Reddit and Facebook). Do not split 30 cafes across both.
2. **Rename before F7 ships**, using the promise in §11 (for example, a name built around "made here" or "pulled here"). Buy the domain once.
3. **Go dense rather than wide.** Put the 30 cafes across 3–4 adjacent stations, so that each station page has 8 or more entries and is worth ranking.
4. **Set a weekly content cadence** in place of a one-off launch. One post a week in the chosen channel, in the form "N cafes near X where the iced coffee is actually brewed on site", each linking to its station page. Each post is also a dataset update.
5. **Build a minimal return loop without sign-up.** Offer a shareable hop list stored in the URL, plus a public "new cafes this month" X account or RSS feed.
6. **Bring a cheap owner loop forward into v1.** Give every Visited cafe a badge and a link it can post. The owner's followers become your distribution, and the badge drives F6.
7. **Give the metrics absolute numbers.**
   - External weekly visitors: at least 100 by month 3 and at least 300 by month 6.
   - Returning visitors: share of visits from PWA installs or repeat station-page sessions.
   - Shares per post.
   - Stop rule: under 50 external weekly visitors for 8 consecutive weeks after the cadence starts.
