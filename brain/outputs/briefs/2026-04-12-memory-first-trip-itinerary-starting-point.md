# Memory-First Trip And Itinerary Starting Point

Date: 2026-04-12
Project: Vacky
Status: reusable brief, not canonical wiki

## Purpose

Summarize the memory-first idea as a practical next-step direction for Vacky, with emphasis on strengthening trip and itinerary creation rather than expanding into broad travel-platform features.

## Core Idea

Vacky can evolve from a planning-first MVP into a memory-first travel graph.

The first useful slice is:

> Register a completed trip.

This should stay single-player and manual at first. The goal is not booking, marketplace breadth, or generic AI planning. The goal is to help users capture where they went, what they did, what mattered, and what that history says about future travel preferences.

## Starting Product Focus

Use trip and itinerary creation as the main foundation:

- make trip creation strong enough to represent both planned and completed trips
- make itinerary creation good at capturing day-by-day places
- treat maps, globe, and trip history as memory surfaces, not only planning views
- capture structured signals that can later become user-specific travel intelligence

Minimum useful completed-trip data:

- title
- date range
- cities and countries
- day-by-day places visited
- optional notes per day or place
- optional photos or cover image
- simple rating or sentiment
- travel-style tags
- favorite, avoid, would-return, and would-skip signals

## Why This Direction Fits

Vacky already has the early building blocks:

- trips
- scheduled itinerary locations
- date-grouped day views
- Google Places-backed location selection
- maps
- globe
- cover image upload

These can support memory capture without introducing a separate marketplace, booking system, or route-optimization engine.

## Later-Scope Ideas

Keep these out of the first slice:

- booking, payments, and inventory
- public reviews
- route optimization and transport planning
- reservation or email import
- collaboration and sharing
- full offline mode
- AI plan generation before useful personal memory data exists

## Recommended Next Step

Define a small product plan for completed-trip registration that reuses the existing trip and itinerary model where possible.

The plan should answer:

- whether completed trips are a new mode, status, or separate flow
- which fields are required at trip creation versus itinerary editing
- how memory signals attach to trips, days, or locations
- how existing map and globe views should reflect completed-trip data
- what must change before AI can use the user's own travel history as retrieval context

## Wiki Promotion Note

Do not promote this as accepted direction until the product choice is explicit.

If accepted, promote a short rationale into `wiki/features/current-surface.md` and add a decision record under `wiki/decisions/` for the memory-first direction.
