export const LOCATION_PRICE_SENTIMENTS = [
  'FREE',
  'CHEAP',
  'MID_RANGE',
  'EXPENSIVE',
] as const;

export type LocationPriceSentiment = (typeof LOCATION_PRICE_SENTIMENTS)[number];

export const LOCATION_PLACE_CATEGORIES = [
  'TRANSPORTATION',
  'ACCOMMODATION',
  'FOOD',
  'LANDSCAPE',
  'LANDMARK',
  'SHOPPING',
  'ENTERTAINMENT',
  'GENERIC',
] as const;

export type LocationPlaceCategory = (typeof LOCATION_PLACE_CATEGORIES)[number];

export const LOCATION_PLACE_ICON_KEYS = [
  'airport',
  'rail',
  'subway',
  'bus',
  'ferry',
  'lodging',
  'campsite',
  'restaurant',
  'cafe',
  'bar',
  'bakery',
  'fastFood',
  'park',
  'beach',
  'mountain',
  'skiing',
  'museum',
  'monument',
  'attraction',
  'shop',
  'grocery',
  'cinema',
  'gaming',
  'theatre',
  'marker',
] as const;

export type LocationPlaceIconKey = (typeof LOCATION_PLACE_ICON_KEYS)[number];

export const PRICE_SENTIMENT_OPTIONS: {
  value: LocationPriceSentiment;
  label: string;
}[] = [
  { value: 'FREE', label: 'Free' },
  { value: 'CHEAP', label: 'Cheap' },
  { value: 'MID_RANGE', label: 'Mid-Range' },
  { value: 'EXPENSIVE', label: 'Expensive' },
];

export const PLACE_CATEGORY_LABELS: Record<LocationPlaceCategory, string> = {
  TRANSPORTATION: 'Transportation',
  ACCOMMODATION: 'Accommodation',
  FOOD: 'Food',
  LANDSCAPE: 'Landscape',
  LANDMARK: 'Landmark',
  SHOPPING: 'Shopping',
  ENTERTAINMENT: 'Entertainment',
  GENERIC: 'Place',
};

export const PLACE_CATEGORY_NOTES_PLACEHOLDERS: Record<
  LocationPlaceCategory,
  string
> = {
  TRANSPORTATION: 'Add terminal details, transfer notes, or timing reminders.',
  ACCOMMODATION: 'Add check-in details, confirmation notes, or room reminders.',
  FOOD: 'Add dishes to try, reservation notes, or dietary reminders.',
  LANDSCAPE: 'Add trail, weather, gear, or best-view timing notes.',
  LANDMARK: 'Add tickets, opening hours, guide notes, or must-see details.',
  SHOPPING: 'Add stores, market stalls, souvenirs, or budget notes.',
  ENTERTAINMENT: 'Add showtimes, tickets, dress code, or queue tips.',
  GENERIC: 'Add anything you want to remember for this stop.',
};

const PLACE_CATEGORY_TYPE_MAP: Record<
  LocationPlaceCategory,
  readonly string[]
> = {
  TRANSPORTATION: [
    'airport',
    'bus_stop',
    'electric_vehicle_charging_station',
    'heliport',
    'international_airport',
    'train_station',
    'bus_station',
    'ferry_terminal',
    'park_and_ride',
    'subway_station',
    'taxi_stand',
    'transit_depot',
    'transit_station',
    'light_rail_station',
    'truck_stop',
  ],
  ACCOMMODATION: [
    'bed_and_breakfast',
    'budget_japanese_inn',
    'campground',
    'camping_cabin',
    'cottage',
    'extended_stay_hotel',
    'farmstay',
    'guest_house',
    'hostel',
    'hotel',
    'inn',
    'japanese_inn',
    'lodging',
    'mobile_home_park',
    'motel',
    'private_guest_room',
    'resort_hotel',
    'rv_park',
  ],
  FOOD: [
    'acai_shop',
    'afghani_restaurant',
    'african_restaurant',
    'american_restaurant',
    'asian_restaurant',
    'bagel_shop',
    'bakery',
    'bar',
    'bar_and_grill',
    'barbecue_restaurant',
    'brazilian_restaurant',
    'breakfast_restaurant',
    'brunch_restaurant',
    'buffet_restaurant',
    'cafe',
    'cafeteria',
    'candy_store',
    'cat_cafe',
    'chinese_restaurant',
    'chocolate_factory',
    'chocolate_shop',
    'coffee_shop',
    'confectionery',
    'deli',
    'dessert_restaurant',
    'dessert_shop',
    'diner',
    'dog_cafe',
    'donut_shop',
    'fast_food_restaurant',
    'fine_dining_restaurant',
    'food',
    'food_court',
    'french_restaurant',
    'greek_restaurant',
    'hamburger_restaurant',
    'ice_cream_shop',
    'indian_restaurant',
    'indonesian_restaurant',
    'italian_restaurant',
    'japanese_restaurant',
    'juice_shop',
    'korean_restaurant',
    'lebanese_restaurant',
    'meal_delivery',
    'meal_takeaway',
    'mediterranean_restaurant',
    'mexican_restaurant',
    'middle_eastern_restaurant',
    'pizza_restaurant',
    'pub',
    'ramen_restaurant',
    'restaurant',
    'sandwich_shop',
    'seafood_restaurant',
    'spanish_restaurant',
    'steak_house',
    'sushi_restaurant',
    'tea_house',
    'thai_restaurant',
    'turkish_restaurant',
    'vegan_restaurant',
    'vegetarian_restaurant',
    'vietnamese_restaurant',
    'wine_bar',
  ],
  LANDSCAPE: [
    'beach',
    'botanical_garden',
    'campground',
    'city_park',
    'cycling_park',
    'dog_park',
    'garden',
    'hiking_area',
    'national_park',
    'natural_feature',
    'park',
    'picnic_ground',
    'ski_resort',
    'state_park',
    'wildlife_park',
    'wildlife_refuge',
  ],
  LANDMARK: [
    'art_gallery',
    'art_museum',
    'castle',
    'church',
    'fountain',
    'hindu_temple',
    'historical_landmark',
    'historical_place',
    'history_museum',
    'landmark',
    'locality',
    'monument',
    'mosque',
    'museum',
    'neighborhood',
    'place_of_worship',
    'tourist_attraction',
    'cultural_landmark',
    'point_of_interest',
    'synagogue',
    'town_square',
  ],
  SHOPPING: [
    'asian_grocery_store',
    'auto_parts_store',
    'bicycle_store',
    'book_store',
    'butcher_shop',
    'cell_phone_store',
    'clothing_store',
    'convenience_store',
    'department_store',
    'discount_store',
    'electronics_store',
    'food_store',
    'furniture_store',
    'gift_shop',
    'grocery_store',
    'hardware_store',
    'home_goods_store',
    'home_improvement_store',
    'jewelry_store',
    'liquor_store',
    'market',
    'pet_store',
    'shoe_store',
    'shopping_mall',
    'sporting_goods_store',
    'store',
    'supermarket',
    'warehouse_store',
    'wholesaler',
  ],
  ENTERTAINMENT: [
    'adventure_sports_center',
    'amphitheatre',
    'amusement_center',
    'amusement_park',
    'aquarium',
    'bowling_alley',
    'casino',
    'comedy_club',
    'community_center',
    'concert_hall',
    'cultural_center',
    'dance_hall',
    'event_venue',
    'live_music_venue',
    'marina',
    'movie_theater',
    'night_club',
    'observation_deck',
    'opera_house',
    'performing_arts_theater',
    'planetarium',
    'plaza',
    'stadium',
    'tourist_attraction',
    'video_arcade',
    'visitor_center',
    'water_park',
    'zoo',
  ],
  GENERIC: [],
};

const CATEGORY_ICON_KEY_MAP: Record<
  LocationPlaceCategory,
  LocationPlaceIconKey
> = {
  TRANSPORTATION: 'bus',
  ACCOMMODATION: 'lodging',
  FOOD: 'restaurant',
  LANDSCAPE: 'park',
  LANDMARK: 'attraction',
  SHOPPING: 'shop',
  ENTERTAINMENT: 'theatre',
  GENERIC: 'marker',
};

const PLACE_TYPE_ICON_KEY_MAP: Record<string, LocationPlaceIconKey> = {
  acai_shop: 'cafe',
  adventure_sports_center: 'attraction',
  airport: 'airport',
  amphitheatre: 'theatre',
  amusement_center: 'attraction',
  amusement_park: 'attraction',
  aquarium: 'attraction',
  art_gallery: 'museum',
  art_museum: 'museum',
  asian_fusion_restaurant: 'restaurant',
  argentinian_restaurant: 'restaurant',
  australian_restaurant: 'restaurant',
  austrian_restaurant: 'restaurant',
  bagel_shop: 'bakery',
  bakery: 'bakery',
  bar: 'bar',
  bar_and_grill: 'bar',
  barbecue_restaurant: 'restaurant',
  bavarian_restaurant: 'restaurant',
  beer_garden: 'bar',
  belgian_restaurant: 'restaurant',
  beach: 'beach',
  bed_and_breakfast: 'lodging',
  bistro: 'restaurant',
  botanical_garden: 'park',
  bowling_alley: 'gaming',
  breakfast_restaurant: 'restaurant',
  brewery: 'bar',
  brewpub: 'bar',
  british_restaurant: 'restaurant',
  brunch_restaurant: 'restaurant',
  buffet_restaurant: 'restaurant',
  burrito_restaurant: 'fastFood',
  bus_station: 'bus',
  bus_stop: 'bus',
  cafe: 'cafe',
  cafeteria: 'cafe',
  cake_shop: 'bakery',
  campground: 'campsite',
  camping_cabin: 'campsite',
  candy_store: 'bakery',
  caribbean_restaurant: 'restaurant',
  casino: 'gaming',
  castle: 'monument',
  chicken_restaurant: 'restaurant',
  chicken_wings_restaurant: 'fastFood',
  chocolate_shop: 'bakery',
  church: 'monument',
  city_park: 'park',
  clothing_store: 'shop',
  cocktail_bar: 'bar',
  coffee_shop: 'cafe',
  coffee_stand: 'cafe',
  comedy_club: 'theatre',
  community_center: 'theatre',
  concert_hall: 'theatre',
  convenience_store: 'shop',
  croatian_restaurant: 'restaurant',
  cuban_restaurant: 'restaurant',
  cultural_center: 'theatre',
  cultural_landmark: 'monument',
  cycling_park: 'park',
  dance_hall: 'theatre',
  department_store: 'shop',
  dessert_restaurant: 'bakery',
  dessert_shop: 'bakery',
  diner: 'restaurant',
  discount_store: 'shop',
  dog_park: 'park',
  donut_shop: 'bakery',
  electronics_store: 'shop',
  event_venue: 'theatre',
  farmstay: 'lodging',
  fast_food_restaurant: 'fastFood',
  ferry_terminal: 'ferry',
  fine_dining_restaurant: 'restaurant',
  food: 'restaurant',
  food_court: 'fastFood',
  food_store: 'grocery',
  gift_shop: 'shop',
  grocery_store: 'grocery',
  guest_house: 'lodging',
  hamburger_restaurant: 'fastFood',
  hiking_area: 'mountain',
  hindu_temple: 'monument',
  historical_landmark: 'monument',
  historical_place: 'monument',
  history_museum: 'museum',
  hostel: 'lodging',
  hotel: 'lodging',
  ice_cream_shop: 'cafe',
  inn: 'lodging',
  international_airport: 'airport',
  japanese_inn: 'lodging',
  landmark: 'monument',
  light_rail_station: 'rail',
  live_music_venue: 'theatre',
  locality: 'attraction',
  lodging: 'lodging',
  marina: 'ferry',
  market: 'grocery',
  meal_delivery: 'fastFood',
  meal_takeaway: 'fastFood',
  monument: 'monument',
  mosque: 'monument',
  motel: 'lodging',
  movie_theater: 'cinema',
  museum: 'museum',
  national_park: 'park',
  natural_feature: 'mountain',
  neighborhood: 'attraction',
  night_club: 'bar',
  observation_deck: 'attraction',
  opera_house: 'theatre',
  park: 'park',
  performing_arts_theater: 'theatre',
  picnic_ground: 'park',
  pizza_restaurant: 'fastFood',
  planetarium: 'attraction',
  plaza: 'attraction',
  place_of_worship: 'monument',
  point_of_interest: 'marker',
  pub: 'bar',
  ramen_restaurant: 'restaurant',
  resort_hotel: 'lodging',
  restaurant: 'restaurant',
  rv_park: 'campsite',
  sandwich_shop: 'fastFood',
  shoe_store: 'shop',
  shopping_mall: 'shop',
  ski_resort: 'skiing',
  stadium: 'theatre',
  state_park: 'park',
  store: 'shop',
  subway_station: 'subway',
  supermarket: 'grocery',
  synagogue: 'monument',
  taxi_stand: 'bus',
  tea_house: 'cafe',
  tourist_attraction: 'attraction',
  town_square: 'attraction',
  train_station: 'rail',
  transit_station: 'rail',
  video_arcade: 'gaming',
  visitor_center: 'attraction',
  warehouse_store: 'shop',
  water_park: 'attraction',
  wildlife_park: 'park',
  wildlife_refuge: 'park',
  wine_bar: 'bar',
  zoo: 'attraction',
};

const PRICE_SENTIMENT_SET = new Set<string>(LOCATION_PRICE_SENTIMENTS);
const PLACE_CATEGORY_SET = new Set<string>(LOCATION_PLACE_CATEGORIES);

export function isLocationPriceSentiment(
  value: unknown
): value is LocationPriceSentiment {
  return typeof value === 'string' && PRICE_SENTIMENT_SET.has(value);
}

export function isLocationPlaceCategory(
  value: unknown
): value is LocationPlaceCategory {
  return typeof value === 'string' && PLACE_CATEGORY_SET.has(value);
}

export function getPriceSentimentLabel(value: LocationPriceSentiment) {
  return (
    PRICE_SENTIMENT_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}

export function getPlaceCategoryLabel(value: LocationPlaceCategory) {
  return PLACE_CATEGORY_LABELS[value];
}

export function getPlaceCategoryNotesPlaceholder(value: LocationPlaceCategory) {
  return PLACE_CATEGORY_NOTES_PLACEHOLDERS[value];
}

function looksLikeNamedSquare(locationTitle?: string) {
  const normalizedTitle = locationTitle?.trim().toLowerCase();
  if (!normalizedTitle) {
    return false;
  }

  return /\b(piazza|piazzale|plaza|square|campo)\b/.test(normalizedTitle);
}

export function inferPlaceCategory(
  placeTypes: readonly string[],
  locationTitle?: string
): LocationPlaceCategory {
  const normalizedTypes = new Set(
    placeTypes.map((placeType) => placeType.trim()).filter(Boolean)
  );

  if (normalizedTypes.has('route') && looksLikeNamedSquare(locationTitle)) {
    return 'LANDMARK';
  }

  for (const category of LOCATION_PLACE_CATEGORIES) {
    if (category === 'GENERIC') {
      continue;
    }

    const matchingTypes = PLACE_CATEGORY_TYPE_MAP[category];
    if (matchingTypes.some((placeType) => normalizedTypes.has(placeType))) {
      return category;
    }
  }

  return 'GENERIC';
}

export function getLocationPlaceIconKey(
  placeTypes: readonly string[],
  fallbackCategory: LocationPlaceCategory
): LocationPlaceIconKey {
  const normalizedTypes = placeTypes
    .map((placeType) => placeType.trim())
    .filter(Boolean);

  for (const placeType of normalizedTypes) {
    const iconKey = PLACE_TYPE_ICON_KEY_MAP[placeType];
    if (iconKey) {
      return iconKey;
    }
  }

  return CATEGORY_ICON_KEY_MAP[fallbackCategory];
}
