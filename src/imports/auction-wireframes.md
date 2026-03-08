Below are simple low-fidelity wireframes (mobile, portrait) for the two journeys. They are intentionally minimal and self-explanatory, focusing on information hierarchy and actions rather than visual design.

Platform assumption: Mobile (Android/iOS standard layout)

1. Buyer Journey (Mr. Buyer – Monitor & Control Auction)
Screen 1 — Auction Dashboard
┌───────────────────────────────┐
│  eAuction                     │
│  ABC IT Hardware Auction     │
│  Status: LIVE                │
│  ⏱ Time Left: 01:12:45       │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Auction Summary               │
│ Suppliers: 3                  │
│ Total Bids: 18                │
│ Best Savings: $128,400        │
│ Best Total Bid: $1,021,600    │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Item Leaderboard              │
│                               │
│ Laptops (100)                 │
│ Best: Supplier Y   $800/unit  │
│                               │
│ Laptop Bags (100)             │
│ Best: Supplier X   $20/unit   │
│                               │
│ Desktops (2000)               │
│ Best: Supplier Z   $520/unit  │
│                               │
│ Warranty (3 yrs)              │
│ Best: Supplier Z   $45/unit   │
│                               │
│ [View Full Ranking →]         │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Live Bid Activity             │
│                               │
│ Supplier Y updated bid        │
│ 2 mins ago                    │
│                               │
│ Supplier Z updated bid        │
│ 5 mins ago                    │
│                               │
│ [View Trend Chart →]          │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Actions                       │
│                               │
│ [Extend Auction]              │
│ [Close Auction]               │
│ [Message Suppliers]           │
│ [Notify Stakeholders]         │
└───────────────────────────────┘
Screen 2 — Supplier Ranking
┌───────────────────────────────┐
│ Supplier Ranking              │
│ ⏱ Time Left: 01:10:32        │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Rank  Supplier   Total Bid    │
│                               │
│ 1     Supplier Z  $1,021,600  │
│ 2     Supplier Y  $1,032,200  │
│ 3     Supplier X  $1,049,900  │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Bid Trend                     │
│  (simple line graph area)     │
│                               │
│   Supplier Z ↓                │
│   Supplier Y ↓                │
│   Supplier X ↓                │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Actions                       │
│                               │
│ [Message Supplier]            │
│ [Extend Time +10 min]         │
│ [Close & Award Auction]       │
└───────────────────────────────┘
2. Supplier Journey (Supplier X – Participate in Auction)
Screen 1 — Auction Participation
┌───────────────────────────────┐
│ ABC IT Hardware Auction       │
│ Status: LIVE                  │
│ ⏱ Time Left: 01:08:10        │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Your Position                 │
│ Rank: #3                      │
│ Your Total Bid: $1,049,900    │
│ Best Bid: $1,021,600          │
│ Gap to Win: $28,300           │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Your Item Bids                │
│                               │
│ Laptops (100)                 │
│ Your: $820                    │
│ Best: $800                    │
│ [Edit]                        │
│                               │
│ Laptop Bags (100)             │
│ Your: $20                     │
│ Best: $20                     │
│ [Edit]                        │
│                               │
│ Desktops (2000)               │
│ Your: $540                    │
│ Best: $520                    │
│ [Edit]                        │
│                               │
│ Warranty (3 yrs)              │
│ Your: $48                     │
│ Best: $45                     │
│ [Edit]                        │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Actions                       │
│                               │
│ [Update All Bids]             │
│ [Message Buyer]               │
│ [View Bid History]            │
└───────────────────────────────┘
Screen 2 — Update Bid
┌───────────────────────────────┐
│ Update Bid                    │
│ Laptops (100 Units)           │
└───────────────────────────────┘

Best Bid: $800/unit
Your Current Bid: $820/unit

┌───────────────────────────────┐
│ Enter New Bid                 │
│ [$ ______ ] per unit          │
└───────────────────────────────┘

Estimated Total:
$ ______

Rank if accepted:
#2

┌───────────────────────────────┐
│ [Submit New Bid]              │
│ [Cancel]                      │
└───────────────────────────────┘

⚠ Alert
"A new best bid was submitted 30 seconds ago"
Why This Design Works (based on evaluation criteria)
Simplicity

Single dashboard view for both buyer and supplier.

Key data visible without navigation.

Usability

Top section = auction status

Middle = decision data

Bottom = actions

Scalability (20+ suppliers)

Buyer ranking screen uses sortable list

Activity feed shows latest updates

Full rankings can scroll

Decision Support

Buyer sees instantly:

Best bid

Savings

Supplier ranks

Bid trends

Time remaining

Supplier sees instantly:

Rank

Gap to winning

Best competitor bid

Editable line items

✅ If you'd like, I can also show a much stronger version of this assignment used by candidates who pass McKinsey / SAP / procurement UX interviews, including:

5–7 screens instead of 2

real-time bidding mechanics

anti-sniping auction extensions

supplier anonymity logic.

yes please

Below is a stronger, interview-level solution that expands the flows to 5–7 screens and smarter auction mechanics. This version improves decision support, scalability (20+ suppliers), and real-time bidding behavior.

Buyer Journey (Mr. Buyer)

Goal: Monitor auction health, compare suppliers, control auction timing, and award winner.

1. Buyer Auction Dashboard
┌──────────────────────────────────┐
│ ABC IT Hardware Auction          │
│ Status: LIVE                     │
│ ⏱ Time Left: 01:05:12           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Auction Overview                 │
│ Suppliers Participating: 3/3     │
│ Total Bids Submitted: 21         │
│ Current Best Total: $1,021,600   │
│ Savings vs Budget: $128,400      │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Leading Supplier                 │
│ #1 Supplier Z                    │
│ Total: $1,021,600                │
│ Last bid: 45 sec ago             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Item Leaders                     │
│ Laptops → Supplier Y $800       │
│ Bags → Supplier X $20           │
│ Desktops → Supplier Z $520      │
│ Warranty → Supplier Z $45       │
│ [View Item Breakdown →]         │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│ Quick Actions                    │
│ [Extend Auction]                 │
│ [Message Suppliers]              │
│ [View Trends]                    │
│ [Close Auction]                  │
└──────────────────────────────────┘
2. Supplier Leaderboard

Helps buyer evaluate competition strength.

┌──────────────────────────────────┐
│ Supplier Ranking                 │
│ ⏱ 01:03:45 Remaining            │
└──────────────────────────────────┘

Rank   Supplier     Total Bid

#1     Supplier Z   $1,021,600
#2     Supplier Y   $1,032,200
#3     Supplier X   $1,049,900

Gap to Leader

Supplier Y   +$10,600
Supplier X   +$28,300

[View Supplier Details]
3. Item-Level Bid Comparison

Critical for procurement decisions.

┌──────────────────────────────────┐
│ Item Bid Comparison              │
└──────────────────────────────────┘

ITEM: Laptops (100)

Supplier X   $820
Supplier Y   $800  ★ Best
Supplier Z   $810

ITEM: Laptop Bags (100)

Supplier X   $20   ★ Best
Supplier Y   $22
Supplier Z   $21

ITEM: Desktops (2000)

Supplier X   $540
Supplier Y   $530
Supplier Z   $520  ★ Best
4. Live Bid Trend

Shows price drop dynamics.

┌──────────────────────────────────┐
│ Bid Trend                        │
└──────────────────────────────────┘

Price ($)
1100 |       X
1050 |     X   Y
1000 |   X   Y   Z
950  |       Y   Z
900  |           Z

Time → → → →

Buyer sees:

price reductions

aggressive suppliers

auction momentum

5. Auction Control Panel
┌──────────────────────────────────┐
│ Auction Controls                 │
└──────────────────────────────────┘

Time Remaining: 00:12:15

Anti-Sniping Rule
If bid submitted <2 min remaining
Auction auto extends by 5 minutes

Actions

[Extend Auction +10 min]

[Pause Auction]

[Close & Select Winner]

[Notify Stakeholders]
Supplier Journey (Supplier X)

Goal: Understand competition, update bids quickly, and win the auction.

1. Supplier Auction Dashboard
┌──────────────────────────────────┐
│ ABC Hardware Auction             │
│ ⏱ Time Left: 01:01:44           │
└──────────────────────────────────┘

Your Rank: #3

Your Total Bid: $1,049,900
Best Bid: $1,021,600

Gap to Win
$28,300

⚠ New bid placed 30 sec ago
2. Item Bidding Screen
┌──────────────────────────────────┐
│ Your Bids                        │
└──────────────────────────────────┘

Laptops (100)

Your: $820
Best: $800
[Edit]

Laptop Bags (100)

Your: $20
Best: $20
[Edit]

Desktops (2000)

Your: $540
Best: $520
[Edit]

Warranty (3 yrs)

Your: $48
Best: $45
[Edit]

[Update All Bids]
3. Quick Rebid Feature

Allows rapid competitive bidding.

┌──────────────────────────────────┐
│ Rebid Suggestion                 │
└──────────────────────────────────┘

You are $28,300 behind leader

Suggested winning bid

$1,019,900

[Match Best]
[Beat Best by 1%]
[Custom Bid]
4. Update Bid Screen
┌──────────────────────────────────┐
│ Update Desktop Bid               │
└──────────────────────────────────┘

Current Best
$520

Your Bid
$540

Enter New Bid

[$ ______ ]

Estimated Rank
#2

[Submit Bid]
5. Bid History
┌──────────────────────────────────┐
│ Bid History                      │
└──────────────────────────────────┘

10:42 AM  $1,049,900  (You)
10:40 AM  $1,035,000  Supplier Y
10:38 AM  $1,021,600  Supplier Z
10:30 AM  $1,060,000  Supplier X
6. Supplier Alerts
⚠ Supplier Z submitted a new bid

⚠ Auction extended by 5 minutes

⚠ You dropped from Rank #2 → #3
Key UX Features That Impress Interviewers
1. Real-Time Alerts

Suppliers must react quickly.

Examples:

Rank changed

New best bid

Auction extension

2. Anti-Sniping Protection

Prevents last-second bid manipulation.

Rule example:

If bid occurs in last 2 minutes
Auction auto-extends 5 minutes

Used by SAP Ariba, Coupa, and Alibaba auctions.

3. Smart Rebid Suggestions

Helps suppliers act quickly without calculation.

Example:

Beat best by 1%

Match best

Lowest profitable bid

4. Supplier Anonymity

Suppliers usually cannot see competitor names.

Example display:

Supplier A
Supplier B
Supplier C

Prevents collusion.

5. Stakeholder Notifications

Buyer can send updates to:

Finance

Procurement team

IT department

Example:

Auction savings reached $120k
If This Were a Real Product (Advanced Features)

You could add:

AI Price Recommendation

Suggest optimal award scenario.

Multi-Scenario Award

Buyer can split contract:

Laptops → Supplier Y
Bags → Supplier X
Desktops → Supplier Z
Supplier Performance Score
Price
Delivery reliability
Quality history