# Competitor Feature Canon: Memory-First Vacky Direction

Date: 2026-04-11
Status: raw reference artifact, not yet promoted to wiki

## Purpose

This artifact summarizes the travel apps and platforms reviewed in the 2026-04-11 market investigation session.

The product lens changed during the session:

- Vacky should not start as another booking-first travel app.
- The stronger wedge is memory-first travel software.
- The first core idea is to let users register completed trips.
- Those completed trips should become a personal travel knowledge source.
- Later, AI can use that knowledge source to plan future trips from the user's own history, preferences, constraints, favorite places, disliked patterns, travel style, and memories.

This document is raw source material for later linting into `brain/outputs/brainstorms/` or promotion into `brain/wiki/` if the direction becomes durable.

## Ranking And Scope Assumptions

"Biggest" is vague. In this artifact, the top global platforms use Similarweb's March 2026 worldwide Travel and Tourism website ranking as the primary ordering signal. Similarweb lists the top five as Booking.com, Trip.com, Airbnb, Agoda, and Tripadvisor. AppTweak's 2025 travel/navigation app download report is used as supporting evidence, especially for Airbnb and Booking.com, but its category includes rideshare and map utilities that are not similar enough to Vacky.

This artifact excludes generic navigation and ride-hailing apps from the main competitor matrix even when they are larger by downloads. Google Maps, Uber, Waze, Bolt, Grab, and airline apps matter as adjacent travel tools, but they do not directly match Vacky's current product shape or the proposed memory-first direction.

Sources reviewed:

- [Similarweb Travel and Tourism ranking, March 2026](https://www.similarweb.com/top-websites/travel-and-tourism/)
- [AppTweak most downloaded Travel and Navigation apps in 2025](https://www.apptweak.com/en/reports/most-downloaded-travel-apps)
- [Booking.com app listing](https://play.google.com/store/apps/details?id=com.booking)
- [Trip.com app listing](https://play.google.com/store/apps/details?id=ctrip.english)
- [Airbnb app listing](https://apps.apple.com/us/app/airbnb/id401626263)
- [The Verge on Airbnb's 2025 app redesign](https://www.theverge.com/news/666191/airbnb-new-app-services-experiences)
- [Agoda app listing](https://play.google.com/store/apps/details?id=com.agoda.mobile.consumer)
- [Tripadvisor app](https://www.tripadvisor.com/app)
- [Expedia app listing](https://apps.apple.com/us/app/expedia-hotels-flights-car/id427916203)
- [Hopper app listing](https://apps.apple.com/us/app/hopper-flights-hotels-cars/id904052407)
- [Roadtrippers features](https://roadtrippers.com/about/features/)
- [Wanderlog](https://wanderlog.com/)
- [TripIt app listing](https://apps.apple.com/us/app/tripit-travel-planner/id311035142)
- [Despegar investor overview](https://investor.despegar.com/overview/)
- [CVC app listing](https://play.google.com/store/apps/details?id=br.com.cvc.app)
- [Turismocity](https://www.turismocity.com/)
- [GetYourGuide app listing](https://apps.apple.com/us/app/getyourguide-travel-tickets/id705079381)
- [Omio app](https://www.omio.com/apps)
- [Polarsteps](https://www.polarsteps.com/)
- [Traveloka LinkedIn profile](https://www.linkedin.com/company/traveloka)
- [MakeMyTrip app listing](https://play.google.com/store/apps/details?id=com.makemytrip)
- [Klook app listing](https://apps.apple.com/us/app/klook-travel-hotels-leisure/id961850126)
- [Travelstart app listing](https://play.google.com/store/apps/details?id=za.co.travelstart.flapp)
- [Wakanow app listing](https://apps.apple.com/ng/app/wakanow-flights-hotels-cars/id1467891138)
- [Hotels.ng app listing](https://play.google.com/store/apps/details?id=ng.hotels.app)
- [Rome2Rio app](https://www.rome2rio.com/about/rome2rio-app)
- [WikiCamps Australia](https://www.wikicamps.com.au/)
- [CamperMate](https://campermate.com/en/appmenu/about)

## Current Vacky Lens From Brain

Relevant current-state facts from the Vacky brain:

- Vacky is currently an authenticated personal trip planner.
- Existing product surface includes trip creation, trip list/detail, date-grouped itinerary planning, Google Places autocomplete, maps, a globe, UploadThing cover images, and theme settings.
- Vacky does not currently have collaboration, bookings, budgeting, sharing, route optimization, offline support, reservation import, or a post-trip memory/journal model.
- Vacky's current itinerary data is represented through trip locations, not a separate itinerary model.
- The current globe and map surfaces already suggest a visual travel-memory direction, but the app is still framed as planning-first.

## Common Feature Pattern Across Competitors

Most competitors are booking-first or logistics-first. Their common features are not Vacky's best wedge.

| Common Feature | Competitors Where It Is Common | Meaning For Vacky |
|---|---|---|
| Accommodation booking | Booking.com, Trip.com, Agoda, Airbnb, Expedia, Despegar, CVC, Traveloka, MakeMyTrip, Travelstart, Wakanow, Hotels.ng | Do not copy first. Requires inventory, trust, payments, support, and scale. |
| Flight booking or comparison | Booking.com, Trip.com, Expedia, Hopper, Despegar, CVC, Turismocity, Traveloka, MakeMyTrip, Travelstart, Wakanow | Avoid as initial wedge. Price comparison is a mature, expensive market. |
| Activities, attractions, tours, tickets | Tripadvisor, Expedia, GetYourGuide, Klook, Traveloka, MakeMyTrip, Airbnb, Trip.com | Useful later as itinerary enrichment, not the first product identity. |
| Reviews and ratings | Tripadvisor, Booking.com, Agoda, Airbnb, Google-adjacent flows, WikiCamps, CamperMate | Vacky should not compete with public review graphs early. Private personal ratings are more aligned. |
| Booking management and trip hub | Booking.com, Trip.com, Expedia, Airbnb, Agoda, Traveloka, MakeMyTrip | Vacky can build a non-booking trip hub from user-entered past trips first. |
| Maps and place discovery | Tripadvisor, Roadtrippers, Rome2Rio, WikiCamps, CamperMate, Polarsteps, Vacky today | Strong fit. Vacky can use maps as memory structure, not only planning UI. |
| Route or transport planning | Roadtrippers, Rome2Rio, Omio, WikiCamps, CamperMate | Useful later. Should not block the first memory-registration version. |
| Collaboration or sharing | Roadtrippers, Wanderlog, Polarsteps, Tripadvisor saves/trips, Expedia group features | Later feature. Memory capture can start single-player. |
| Offline access | TripIt, Polarsteps, Omio tickets, GetYourGuide/Klook vouchers, WikiCamps, CamperMate | Important for travel, but not necessary for first past-trip registration. |
| AI trip planning or assistant | Tripadvisor, Expedia group signals, Airbnb direction, Despegar SOFIA, MakeMyTrip, Roadtrippers Autopilot | Vacky should make AI later depend on personal memories, not generic destination content alone. |
| Travel journal and memory artifact | Polarsteps, WikiCamps partly, CamperMate partly, Vacky opportunity | This is comparatively under-served by booking-first giants. |

## Canonical Competitor Feature Matrix

Distinctive means distinctive for positioning, not guaranteed exclusive globally.

| Segment | Region | App | Shared/Common Features | Distinctive Or Unique Features | Memory-First Relevance For Vacky |
|---|---|---|---|---|---|
| Top 5 global | Global | Booking.com | Hotels, flights, cars, taxis, attractions, booking management, deals, loyalty | Massive accommodation supply, mature Genius loyalty, reservation-centered trip management | Shows the booking-first trap. Vacky should not compete on inventory. Could learn from simple saved trip/reservation organization. |
| Top 5 global | Global | Trip.com | Flights, hotels, trains, cars, attractions, packages, app deals | Strong all-in-one Asia/global OTA with train coverage and international trip logistics | Useful benchmark for integrated trip hub, but too transactional for Vacky's first wedge. |
| Top 5 global | Global | Airbnb | Homes, experiences, services, host messaging, Trips tab, personalized recommendations | Strong emotional travel brand; 2025 app expansion into services and reimagined experiences | Closest booking giant to memory/emotion. Threat if Airbnb turns trips into a personal history and AI assistant. |
| Top 5 global | Global | Agoda | Hotels, homes, flights, app deals, reviews, map search, booking details | Strong Asia accommodation marketplace and price/deal mechanics | Low direct memory relevance. Reinforces that Vacky should avoid accommodation marketplace scope. |
| Top 5 global | Global | Tripadvisor | Reviews, restaurants, hotels, things to do, saves, trips, AI trip builder, forums/community | Huge public review corpus plus itinerary/recommendation surface | Strongest direct threat for AI planning from public knowledge. Vacky can differentiate with private personal knowledge. |
| Additional direct comparator | Global/US | Wanderlog | Itinerary builder, map, reservations, collaboration, budgets, guides | Planning-first app with collaborative itinerary, expense tracking, checklists, route/map organization | Important direct comparator. Vacky should study it, but start from completed trips and memories instead of future-trip planning tools. |
| Additional direct comparator | Global/US | TripIt | Itinerary organization, email import, calendar sync, alerts, maps, offline access | Reservation-import automation from confirmation emails | Shows a powerful low-friction input pattern. Vacky could later import past confirmations, but first should support manual completed-trip entry. |
| North America | North America/global | Expedia | Flights, hotels, cars, packages, activities, rewards, itinerary updates, notifications | Large OTA ecosystem with trip management and rewards | Booking hub benchmark only. Not a memory-first model. |
| North America | North America/global | Hopper | Flights, hotels, homes, cars, price prediction, price watch, fintech-style flexibility products | Price prediction and future fare confidence | Vacky should not start with price optimization. Could later infer budget preferences from past trips. |
| North America | North America/global | Roadtrippers | Route planning, stops, maps, itineraries, trip stats, collaboration, RV/camping support | Road-trip-first map planning and AI Autopilot | Strong map-planning competitor. Vacky can avoid direct conflict by making past-trip memory graph the starting point. |
| South America | Latin America | Despegar / Decolar | Flights, hotels, packages, cars, activities, financing, travel assistance | Latin America scale, alternative payments, financing, AI assistant SOFIA, regional brands | Strong local commerce moat. Vacky should use LatAm familiarity for memory capture, not booking competition. |
| South America | Brazil | CVC | Packages, flights, hotels, tickets, car rental, offers, booking details | Strong Brazilian agency/travel-package heritage with app layer | Less direct threat unless Vacky moves into packages. Good reminder that assisted travel still matters in LatAm. |
| South America | Latin America | Turismocity | Flight/hotel/package comparison, flexible-date deals, price alerts | Deal-discovery and fare comparison focus | Not a memory competitor. Could inspire later "where could I go based on my past style and budget" AI. |
| Europe | Europe/global | GetYourGuide | Tours, attractions, tickets, activities, offline vouchers, cancellation | Deep bookable in-destination experience inventory | Useful later as activity-enrichment reference. Vacky should not require bookable activities to register memories. |
| Europe | Europe/global | Omio | Trains, buses, flights, ferries, route comparison, mobile tickets | Multimodal European transport booking and ticket wallet | Transport logistics benchmark. Later AI could use memory graph to suggest transport preferences. |
| Europe | Europe/global | Polarsteps | Trip tracking, route map, photos, journals, sharing, stats, printed travel books | Strong post-trip memory artifact and visual route journal | Most aligned with Vacky's memory-first direction. Major benchmark for completed-trip storytelling. |
| Asia | Southeast Asia | Traveloka | Flights, hotels, activities, transfers, car rental, payments, lifestyle services | Southeast Asia all-in-one travel/lifestyle superapp with claimed 140M+ downloads and 40M+ monthly active users | Regional superapp benchmark. Vacky should avoid breadth and instead build personal travel memory depth. |
| Asia | India | MakeMyTrip | Flights, hotels, trains/buses, holidays, cabs, packages, offers | Strong India travel brand, local modes, AI/multilingual assistant direction | Shows regional AI travel assistant pressure. Vacky's future AI should be memory-grounded. |
| Asia | Asia Pacific/global | Klook | Activities, tickets, hotels, car rental, transport, rewards, offline vouchers | Strong experiences marketplace and activity voucher flow | Later integration/enrichment inspiration. Not the first wedge. |
| Africa | Africa/South Africa | Travelstart | Flights, hotels, car hire, travel deals, booking management, flight status | Regional OTA with Africa-focused distribution | Booking/logistics comparator. Weak memory relevance. |
| Africa | Nigeria/Africa | Wakanow | Flights, hotels, cars, packages, visa support, airport transfer, local travel services | Service-heavy regional travel support with visa and transfer assistance | Reminds Vacky that local travel trust/support can matter, but is not first-scope for memory registration. |
| Africa | Nigeria | Hotels.ng | Hotel search/booking, nearby hotels, filters, reservation management | Local hotel inventory depth in Nigeria | Narrow accommodation competitor. Low direct memory relevance. |
| Oceania | Australia/global | Rome2Rio | Door-to-door route search, multimodal transport, global coverage, app route planning | Strong "how do I get there?" answer engine | Later AI planning could use this type of transport intelligence, but Vacky should not hand-roll it early. |
| Oceania | Australia | WikiCamps Australia | Campsites, reviews/photos, filters, offline mode, trip planner, mapped itinerary, fuel estimate, bookings | Community-powered camping database with visited/wishlist/collections and offline utility | Very relevant niche example: remembers places visited and liked. Strong signal for memory + practical trip graph. |
| Oceania | Australia/New Zealand | CamperMate | Road-trip map, campsites, attractions, amenities, offline maps, deals/booking | Practical on-the-road companion for AU/NZ road trips | Shows value of local memory plus utility. Vacky can start simpler with past-trip places and notes. |

## Unique Feature Inventory

This table extracts the useful non-generic ideas from the competitor set.

| Feature Idea | Seen In | Why It Matters | Fit For Vacky Now |
|---|---|---|---|
| Past trip route and places become a visual story | Polarsteps, WikiCamps, CamperMate | Closest to the memory-first thesis | High. This should influence the first completed-trip flow. |
| Printable or durable travel artifact | Polarsteps | Turns memories into an object, not just data | Later. Not MVP, but useful direction. |
| Visited/wishlist/liked place collections | WikiCamps, Tripadvisor, Google-adjacent behavior | Creates reusable preference data | High. Vacky can store visited, favorite, avoid, and want-to-return signals. |
| Reservation import from email | TripIt | Reduces input friction | Later. Useful after manual completed-trip entry proves the data model. |
| Collaborative planning | Wanderlog, Roadtrippers, Expedia group features | Useful for future trips with companions | Later. Past-trip registration can start single-player. |
| Budget and expense tracking | Wanderlog, WikiCamps fuel estimates | Turns trips into cost memory | Medium. Could be optional in past-trip entry but should not block MVP. |
| Route-based discovery | Roadtrippers, Rome2Rio, WikiCamps, CamperMate | Makes map planning feel active | Later. Memory-first can begin with mapped completed locations. |
| AI plan generation | Tripadvisor, Roadtrippers, Despegar, MakeMyTrip, Airbnb direction | Market is moving to conversational planning | Later. Vacky's AI advantage should come from user-owned memories. |
| Experience marketplace | Klook, GetYourGuide, Airbnb, Tripadvisor | Activity inventory can enrich itineraries | Not now. Avoid marketplace scope. |
| Local payments and financing | Despegar, Traveloka, MakeMyTrip, CVC | Regional conversion moat | Not now. Wrong initial problem. |
| Offline travel utility | Polarsteps, WikiCamps, CamperMate, Omio, TripIt | Travel apps are used in low-connectivity contexts | Later. Useful once Vacky is used during trips, not only after trips. |
| Personal travel statistics | Polarsteps | Makes memories rewarding and easy to revisit | High. Good lightweight differentiator for completed trips. |
| Personal preference extraction | Not strongly owned by reviewed apps | Converts memories into future planning intelligence | Very high. This is the core Vacky opportunity. |

## Vacky Opportunity: Memory-First Travel Graph

The reviewed market is crowded around booking, transport, deals, reviews, and generic AI planning. The less crowded opportunity is a personal travel memory graph.

Vacky can start with completed-trip registration:

- where the user went
- when they went
- who they traveled with
- places visited each day
- photos or cover memories
- notes and journal entries
- favorite places
- disliked places or patterns
- travel pace
- travel style
- budget level or actual spend if available
- transport used
- accommodation type
- food, nature, nightlife, culture, shopping, rest, family, work, or adventure tags
- whether the user would return
- what they would do differently

The AI planning thesis:

- Future AI should not only ask "where do you want to go?"
- It should use the user's prior trips as retrieval context.
- It should be able to say, in effect: "You liked walkable neighborhoods, 3 to 4 hour museum days, late dinners, and avoiding long transfers on your Buenos Aires and Rome trips. Here is a plan for Lisbon that matches that pattern."
- The first product step is therefore not AI generation. It is high-quality memory capture.

## Proposed First Product Scope From This Research

Build or plan around one primary capability:

"Register a completed trip."

Minimum useful data:

- trip title
- date range
- countries/cities
- day-by-day places visited
- optional notes per place or day
- optional photos or cover image
- simple ratings or sentiment
- tags for travel style
- "would return" and "would skip" signals

Non-goals for the first version:

- booking
- payments
- inventory
- public reviews
- AI plan generation
- route optimization
- collaboration
- travel marketplace integrations
- automatic email import
- full offline mode

## Product Questions To Resolve Later

- Is Vacky a private travel memory vault, a planner, or both?
- Does completed-trip entry happen as one guided flow, a day-by-day journal, or a map-first add-place flow?
- Should memories be structured first, freeform first, or both?
- Should AI-readiness be visible to the user early, or remain an internal design principle until the AI planner exists?
- How much friction will users tolerate when reconstructing old trips?
- Should photos be central, optional, or postponed?
- Should the first memory artifact be a map, a timeline, a globe entry, or a journal page?
- Should Vacky support "I have been here" without requiring exact dates?

## Suggested Promotion Path

If this direction is accepted:

1. Promote a concise version into `brain/outputs/brainstorms/`.
2. Add a product-rationale note to `brain/wiki/features/current-surface.md` only after the product direction is confirmed.
3. Consider a decision note under `brain/wiki/decisions/` for "memory-first before booking-first" once the tradeoff is explicit.
4. Keep this raw reference as the source-backed competitor matrix.
