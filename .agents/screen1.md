Screen 1. Article Top (Above the Fold)
MOST IMPORTANT SCREEN.
Must show
• Header with:
◦ OFFPLAN logo
◦ Hamburger menu
◦ Search icon
◦ Top navigation icons (Market, Areas, Developers, Guides, Compare)
• Article title
• Article metadata (publish date, read time, area tag)
• BLUF section
• Key Metrics card
• Embedded YouTube video thumbnail
• AI entry field
• Suggested prompts
• Continue Reading CTA
From the mockup
• Article tag chip reads "AREA GUIDE" in champagne gold above the title.
• Title example: "Why Invest in Dubai South in 2026" — uses a hard line break between
"in" and "Dubai" for editorial rhythm.
• Metadata row shows three items separated by middots: date ("12 May 2026"), read time
("8 min read"), and area tag ("Dubai South").
• BLUF is a single paragraph of ~3 sentences, no heading label visible above it — "BLUF"
appears as a small uppercase label.
• Key Metrics card contains exactly 4 tiles in a single row: Rental Yield (6.5%), Entry Price
(AED 1.2M), Handover (2026–2030), Investor Fit (Long-term).
• Each metric tile has a small champagne icon, a value, and a one-line label.
• Card header reads "KEY METRICS" with a "Last verified: 10 May 2026" timestamp on
the right — this is a trust signal and must be visible.
• Video thumbnail shows a play button overlay and a duration badge in the bottom-right
(e.g. "7:45").
• Below the video sits a one-line caption ("Why Dubai South is the Next Growth Hub").
• AI entry field is a pill-shaped input with placeholder "Ask anything about Dubai South..."
and a send-arrow affordance on the right.
• Suggested prompts render as 4 small chips arranged in a 2×2 grid below the AI input.
• "Continue Reading" appears as a full-width text CTA with a downward chevron, not a
filled button.
Developer focus
• Above-the-fold hierarchy
• Mobile viewport optimization

• Scroll behavior
• Video loading performance (lazy-load iframe, no CLS)
• Early AI visibility (input must be reachable without scrolling on a 375×667 viewport)
• Touch spacing and readability (minimum 44px touch targets)
This screen defines
The entire product identity.
Definition of done
Acceptance criteria
On a 375×667 viewport, the header, title, BLUF, Key Metrics card, and video thumbnail
render within the first viewport. The AI input becomes interactive without requiring a scroll
on a 390×844 viewport. The video iframe lazy-loads and produces zero cumulative layout
shift. LCP under 2.5s and TTI under 3.5s on a mid-range Android device on a