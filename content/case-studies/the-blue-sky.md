## The Challenge

The Blue Sky, a beachwear brand, came to Technostripe convinced their ad targeting was broken. The numbers looked brutal — spend climbing, reported sales barely moving, and a strong seasonal push that seemed to be failing right when it mattered most. The instinct was to overhaul the creative and targeting from scratch. The real issue turned out to be somewhere nobody was looking: the data itself.

Where things stood before:

- CPC around $1.30, reasonable for the category
- CTR at 1.4%, actually healthy — a sign the creative was working better than the account's reported results suggested
- Reported CAC showing $70, against an average order value of $50, which looked catastrophic
- Reported ROAS sitting at 1.1x, barely above break-even and trending toward a full pause on spend
- Frequency holding at a healthy 2.4 — no fatigue signal, which didn't match a "targeting is broken" story

## The Solution

The first move wasn't touching the campaigns — it was auditing the tracking setup underneath them. We found the Shopify store's conversion pixel had been firing inconsistently after a theme update months earlier, silently under-reporting a meaningful share of purchases, especially on mobile Safari where privacy restrictions already made tracking harder. The ad account wasn't failing to convert customers — it was failing to see the customers it was converting. We rebuilt the tracking setup with server-side conversion tracking layered on top of the pixel, so purchases stopped disappearing from the data regardless of browser or device.

With accurate data finally in hand, we could see the real story: performance was genuinely strong, and the account had actually been under-scaled out of fear based on numbers that were never true. We increased budget on the proven audiences and layered in a dedicated push around the seasonal peak, timed against real inventory levels this time instead of guesswork.

While reviewing the seasonal traffic surge, we also caught a Shopify-side issue: popular sizes were going out of stock without the site clearly signaling it until checkout, leading to frustrated last-minute drop-offs during the highest-traffic weeks. We added real-time stock indicators on product and collection pages so customers knew availability before committing time to the funnel.

## The Outcome

Where things landed:

- CPC held steady at $1.15
- CTR improved to 2.0% with confident, better-funded creative testing
- True CAC (once tracking was fixed) came in at $19
- True ROAS reached 6.4x
- Frequency stayed healthy under 2.6 since the account was never actually fatigued to begin with

## The Takeaway

The brand didn't need better ads. They needed to actually see what the ads were already doing — and once they could, scaling stopped being a risk and started being obvious. Sometimes the biggest performance unlock isn't in the campaign at all; it's in whether you can trust the numbers you're making decisions from.