
-- Create a table for lessons/tutorials
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category TEXT NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL, -- Main lesson content
  recipes TEXT[], -- Array of recipe IDs or names related to this lesson
  video_url TEXT,
  tips TEXT[],
  equipment_needed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_lessons_title ON public.lessons(title);
CREATE INDEX idx_lessons_category ON public.lessons(category);
CREATE INDEX idx_lessons_difficulty ON public.lessons(difficulty);

-- Insert sample lesson data
INSERT INTO public.lessons (
  title, description, duration, difficulty, category, image_url, content, recipes, video_url, tips, equipment_needed
) VALUES 
(
  'Introduction to Bartending',
  'Learn the basics of bartending, including essential tools, glassware, and ingredients.',
  '15 min',
  'Beginner',
  'Basics',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
  'Welcome to the world of bartending! This comprehensive introduction will cover everything you need to know to get started behind the bar.

## Essential Tools
Every bartender needs a basic set of tools to create great cocktails:
- **Shaker**: For mixing drinks with ice
- **Jigger**: For precise measurements
- **Bar spoon**: For stirring and layering
- **Strainer**: To separate ice from the finished drink
- **Muddler**: For crushing herbs and fruits

## Basic Glassware
Different cocktails require different glasses:
- **Rocks glass**: For spirits served neat or on the rocks
- **Highball**: For tall mixed drinks
- **Coupe**: For elegant cocktails without ice
- **Martini glass**: For classic martinis and similar drinks

## Core Ingredients
Stock your bar with these essentials:
- Base spirits (vodka, gin, rum, whiskey, tequila)
- Mixers (simple syrup, lime juice, lemon juice)
- Bitters (Angostura, orange)
- Garnishes (olives, cherries, citrus peels)',
  ARRAY['Old Fashioned', 'Martini', 'Manhattan'],
  '',
  ARRAY['Always measure your ingredients for consistency', 'Keep your workspace clean and organized', 'Taste your cocktails before serving'],
  ARRAY['Cocktail shaker', 'Jigger', 'Bar spoon', 'Strainer', 'Various glassware']
),
(
  'Mastering Basic Techniques',
  'Learn essential bartending techniques such as pouring, stirring, shaking, and muddling.',
  '20 min',
  'Beginner',
  'Techniques',
  'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop',
  'Master the fundamental techniques that separate amateur bartenders from professionals.

## Shaking vs. Stirring
**When to shake:**
- Cocktails with citrus juice
- Drinks with cream or egg whites
- When you want to chill and dilute quickly

**When to stir:**
- Spirit-forward cocktails (Martini, Manhattan)
- When you want to maintain clarity
- Delicate flavors that shouldn''t be agitated

## The Perfect Shake
1. Add ingredients to shaker with ice
2. Seal tightly
3. Shake vigorously for 10-15 seconds
4. Listen for the sound - it should be crisp and clear

## Stirring Technique
1. Add ingredients to mixing glass with ice
2. Insert bar spoon and stir smoothly
3. 30-40 stirs for proper dilution
4. Keep the spoon against the glass

## Muddling
- Use gentle pressure
- Press and twist, don''t pulverize
- Fresh herbs need less pressure than fruits',
  ARRAY['Whiskey Sour', 'Daiquiri', 'Mojito', 'Negroni'],
  '',
  ARRAY['Practice makes perfect - repetition builds muscle memory', 'Ice quality matters - use fresh, clean ice', 'Count your stirs for consistency'],
  ARRAY['Cocktail shaker', 'Mixing glass', 'Bar spoon', 'Muddler', 'Quality ice']
),
(
  'Crafting Classic Cocktails',
  'Discover how to make classic cocktails like the Old Fashioned, Margarita, and Martini.',
  '25 min',
  'Intermediate',
  'Recipes',
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop',
  'Learn to craft the cocktails that have stood the test of time and form the foundation of mixology.

## The Old Fashioned
The granddaddy of cocktails, dating back to the 1880s.

**Recipe:**
- 2 oz Bourbon or Rye whiskey
- 1 sugar cube
- 2-3 dashes Angostura bitters
- Orange peel

**Method:**
1. Muddle sugar cube with bitters in rocks glass
2. Add whiskey and large ice cube
3. Stir gently to combine
4. Express orange peel oils over drink

## The Martini
The epitome of cocktail elegance.

**Recipe:**
- 2.5 oz Gin
- 0.5 oz Dry vermouth
- Lemon twist or olives

**Method:**
1. Stir gin and vermouth with ice
2. Strain into chilled martini glass
3. Garnish with lemon twist or olives

## The Margarita
Mexico''s gift to the cocktail world.

**Recipe:**
- 2 oz Tequila blanco
- 1 oz Fresh lime juice
- 0.5 oz Triple sec
- Salt for rim

**Method:**
1. Salt the rim of rocks glass
2. Shake all ingredients with ice
3. Strain over fresh ice',
  ARRAY['Old Fashioned', 'Martini', 'Manhattan', 'Margarita', 'Whiskey Sour', 'Daiquiri'],
  '',
  ARRAY['Quality ingredients make quality cocktails', 'Chill your glassware for better presentation', 'Fresh citrus juice is non-negotiable'],
  ARRAY['Cocktail shaker', 'Mixing glass', 'Jigger', 'Strainer', 'Quality spirits']
),
(
  'Advanced Mixology',
  'Explore advanced mixology techniques and create unique and innovative cocktails.',
  '30 min',
  'Advanced',
  'Advanced',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
  'Take your bartending skills to the next level with advanced techniques and innovative approaches.

## Fat Washing
Infuse spirits with fats for unique flavors:

**Bacon Bourbon:**
1. Cook bacon and reserve fat
2. Mix 750ml bourbon with 2oz warm bacon fat
3. Let sit for 4 hours at room temperature
4. Freeze overnight
5. Strain through coffee filter

## Clarification Techniques
Create crystal-clear cocktails with complex flavors:

**Milk Clarification:**
1. Mix cocktail ingredients with whole milk
2. Let curdle for 2 hours
3. Strain through coffee filter
4. Result: clear liquid with full flavor

## Smoke and Aromatics
Add theatrical elements:
- Use wood chips under a cloche
- Rosemary sprig flambé
- Essential oil sprays

## Fermentation
Create unique ingredients:
- Tepache (fermented pineapple)
- Kombucha cocktails  
- Fermented fruit syrups

## Molecular Mixology
- Spherification for caviar pearls
- Foams using lecithin
- Liquid nitrogen for instant freezing',
  ARRAY['Espresso Martini', 'Aperol Spritz', 'Cosmopolitan'],
  '',
  ARRAY['Safety first when using chemicals or fire', 'Document your experiments for repeatability', 'Not every advanced technique improves a drink'],
  ARRAY['Immersion circulator', 'pH strips', 'Molecular gastronomy kit', 'Smoking gun', 'Precision scale']
);

-- Create a function to update the updated_at timestamp for lessons
CREATE TRIGGER update_lessons_updated_at 
    BEFORE UPDATE ON public.lessons 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a table for reference guides
CREATE TABLE public.reference_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  content TEXT NOT NULL,
  data JSONB, -- For storing structured data like tables, lists, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert reference guide data
INSERT INTO public.reference_guides (title, category, icon_name, content, data) VALUES 
(
  'Ingredient Substitutions',
  'quick_reference',
  'List',
  'Essential ingredient substitutions for when you''re missing key components.',
  '{
    "substitutions": [
      {"ingredient": "Simple Syrup", "substitute": "1:1 sugar and water, dissolved", "ratio": "1:1"},
      {"ingredient": "Triple Sec", "substitute": "Cointreau or Grand Marnier", "ratio": "1:1"},
      {"ingredient": "Angostura Bitters", "substitute": "Orange bitters (different flavor profile)", "ratio": "1:1"},
      {"ingredient": "Fresh Lemon Juice", "substitute": "Fresh lime juice", "ratio": "1:1"},
      {"ingredient": "Grenadine", "substitute": "Cherry juice + simple syrup", "ratio": "2:1"},
      {"ingredient": "Egg White", "substitute": "Aquafaba (chickpea liquid)", "ratio": "1:1"},
      {"ingredient": "Heavy Cream", "substitute": "Half and half", "ratio": "1:1"},
      {"ingredient": "Dry Vermouth", "substitute": "White wine + pinch of salt", "ratio": "1:1"}
    ]
  }'
),
(
  'Prep Times',
  'quick_reference', 
  'Clock',
  'Standard preparation times for common bartending tasks.',
  '{
    "prep_times": [
      {"task": "Simple Syrup", "time": "5 minutes", "notes": "Heat and stir until dissolved"},
      {"task": "Infused Spirits", "time": "2-7 days", "notes": "Depends on ingredient strength"},
      {"task": "Fresh Juice", "time": "Daily", "notes": "Best used within 24 hours"},
      {"task": "Garnish Prep", "time": "30 minutes", "notes": "Cut citrus wheels, prep herbs"},
      {"task": "Ice", "time": "4-6 hours", "notes": "For clear ice cubes"},
      {"task": "Chilling Glassware", "time": "10 minutes", "notes": "In freezer or with ice water"}
    ]
  }'
),
(
  'Glassware Guide',
  'quick_reference',
  'Wine',
  'Complete guide to cocktail glassware and their proper uses.',
  '{
    "glassware": [
      {"name": "Rocks/Old Fashioned", "volume": "8-10 oz", "use": "Spirits neat, on the rocks, or short cocktails", "examples": ["Old Fashioned", "Negroni", "Whiskey neat"]},
      {"name": "Highball", "volume": "10-12 oz", "use": "Tall mixed drinks with ice", "examples": ["Mojito", "Dark & Stormy", "Gin & Tonic"]},
      {"name": "Coupe", "volume": "4-6 oz", "use": "Cocktails served up without ice", "examples": ["Daiquiri", "Whiskey Sour", "Aviation"]},
      {"name": "Martini", "volume": "4-6 oz", "use": "Classic cocktails served up", "examples": ["Martini", "Cosmopolitan", "Manhattan (sometimes)"]},
      {"name": "Collins", "volume": "12-14 oz", "use": "Tall, refreshing cocktails", "examples": ["Tom Collins", "John Collins", "Mojito"]},
      {"name": "Shot", "volume": "1-2 oz", "use": "Shots and small cocktails", "examples": ["Lemon Drop Shot", "Kamikaze", "Tequila shots"]},
      {"name": "Hurricane", "volume": "20 oz", "use": "Large tropical cocktails", "examples": ["Hurricane", "Pina Colada", "Blue Hawaiian"]},
      {"name": "Wine Glass", "volume": "8-12 oz", "use": "Wine-based cocktails and spritzes", "examples": ["Aperol Spritz", "Wine cocktails", "Sangria"]},
      {"name": "Mug", "volume": "8-12 oz", "use": "Hot cocktails", "examples": ["Irish Coffee", "Hot Toddy", "Mulled wine"]}
    ]
  }'
),
(
  'ABV Chart',
  'quick_reference',
  'Scale',
  'Alcohol by volume reference for popular spirits and cocktails.',
  '{
    "spirits": [
      {"category": "Vodka", "abv_range": "37.5-50%", "standard": "40%"},
      {"category": "Gin", "abv_range": "37.5-47%", "standard": "40%"},
      {"category": "Rum", "abv_range": "37.5-75%", "standard": "40%"},
      {"category": "Whiskey", "abv_range": "40-50%", "standard": "40%"},
      {"category": "Tequila", "abv_range": "38-55%", "standard": "40%"},
      {"category": "Brandy", "abv_range": "35-60%", "standard": "40%"},
      {"category": "Liqueurs", "abv_range": "15-55%", "standard": "20-30%"}
    ],
    "cocktails": [
      {"name": "Martini", "abv": "28-32%", "strength": "Strong"},
      {"name": "Old Fashioned", "abv": "30-35%", "strength": "Strong"},
      {"name": "Manhattan", "abv": "28-32%", "strength": "Strong"},
      {"name": "Margarita", "abv": "15-20%", "strength": "Medium"},
      {"name": "Mojito", "abv": "12-15%", "strength": "Medium"},
      {"name": "Aperol Spritz", "abv": "8-10%", "strength": "Low"},
      {"name": "Pina Colada", "abv": "12-15%", "strength": "Medium"}
    ]
  }'
),
(
  'Temperature Conversions',
  'quick_reference',
  'Thermometer',
  'Temperature conversion chart for cocktail service.',
  '{
    "temperatures": [
      {"description": "Frozen cocktails", "fahrenheit": "20-25°F", "celsius": "-7 to -4°C"},
      {"description": "Ideal serving temp for cocktails", "fahrenheit": "32-40°F", "celsius": "0-4°C"},
      {"description": "Chilled glassware", "fahrenheit": "35-40°F", "celsius": "2-4°C"},
      {"description": "Room temperature", "fahrenheit": "68-72°F", "celsius": "20-22°C"},
      {"description": "Warm cocktails", "fahrenheit": "140-160°F", "celsius": "60-71°C"},
      {"description": "Hot cocktails", "fahrenheit": "160-180°F", "celsius": "71-82°C"}
    ]
  }'
),
(
  'Measurement Conversions',
  'quick_reference',
  'Scale',
  'Essential measurement conversions for bartending.',
  '{
    "conversions": [
      {"from": "1 jigger", "to": "1.5 oz", "ml": "44 ml"},
      {"from": "1 pony", "to": "1 oz", "ml": "30 ml"},
      {"from": "1 dash", "to": "1/8 tsp", "ml": "0.6 ml"},
      {"from": "1 splash", "to": "1/4 oz", "ml": "7.5 ml"},
      {"from": "1 barspoon", "to": "1/8 oz", "ml": "3.7 ml"},
      {"from": "1 cup", "to": "8 oz", "ml": "240 ml"},
      {"from": "1 pint", "to": "16 oz", "ml": "473 ml"},
      {"from": "1 fifth", "to": "25.6 oz", "ml": "750 ml"}
    ]
  }'
),
(
  'Classic Cocktails',
  'recommendations',
  'Wine',
  'Essential classic cocktails every bartender should know.',
  '{
    "cocktails": [
      {"name": "Old Fashioned", "era": "1880s", "description": "The original cocktail - spirit, sugar, bitters, water", "difficulty": "Easy"},
      {"name": "Martini", "era": "1860s", "description": "Gin and vermouth perfection", "difficulty": "Easy"},
      {"name": "Manhattan", "era": "1870s", "description": "Whiskey''s answer to the Martini", "difficulty": "Easy"},
      {"name": "Daiquiri", "era": "1900s", "description": "Simple perfection: rum, lime, sugar", "difficulty": "Easy"},
      {"name": "Negroni", "era": "1919", "description": "Equal parts gin, Campari, sweet vermouth", "difficulty": "Easy"},
      {"name": "Sazerac", "era": "1850s", "description": "America''s oldest known cocktail", "difficulty": "Intermediate"},
      {"name": "Ramos Gin Fizz", "era": "1888", "description": "The 12-minute shake cocktail", "difficulty": "Advanced"}
    ]
  }'
),
(
  'Wine Pairings',
  'recommendations',
  'Wine', 
  'Wine and cocktail pairing suggestions.',
  '{
    "pairings": [
      {"wine_type": "Champagne", "cocktail": "French 75", "occasion": "Celebrations", "notes": "Bubbles complement bubbles"},
      {"wine_type": "Red Wine", "cocktail": "New York Sour", "occasion": "Dinner", "notes": "Wine float adds complexity"},
      {"wine_type": "White Wine", "cocktail": "Aperol Spritz", "occasion": "Aperitif", "notes": "Light and refreshing"},
      {"wine_type": "Rosé", "cocktail": "Rosé Spritz", "occasion": "Summer", "notes": "Perfect pink harmony"},
      {"wine_type": "Port", "cocktail": "Port & Tonic", "occasion": "After dinner", "notes": "Fortified wine cocktail"},
      {"wine_type": "Sherry", "cocktail": "Sherry Cobbler", "occasion": "Afternoon", "notes": "Historical Spanish connection"}
    ]
  }'
),
(
  'Craft Beer Styles',
  'recommendations',
  'Coffee',
  'Popular craft beer styles and their characteristics.',
  '{
    "beer_styles": [
      {"style": "IPA", "abv": "5-7%", "flavor": "Hoppy, bitter, citrusy", "food_pairing": "Spicy food, strong cheeses"},
      {"style": "Stout", "abv": "4-9%", "flavor": "Dark, roasted, coffee notes", "food_pairing": "Chocolate, oysters"},
      {"style": "Wheat Beer", "abv": "4-5.5%", "flavor": "Light, citrusy, smooth", "food_pairing": "Salads, seafood"},
      {"style": "Pilsner", "abv": "4-5%", "flavor": "Crisp, clean, hoppy", "food_pairing": "Light dishes, sushi"},
      {"style": "Sour Beer", "abv": "3-8%", "flavor": "Tart, fruity, funky", "food_pairing": "Cheese, fruit desserts"},
      {"style": "Porter", "abv": "4-7%", "flavor": "Dark, malty, chocolate", "food_pairing": "Barbecue, roasted meats"}
    ]
  }'
),
(
  'Top Shelf Spirits',
  'recommendations',
  'Wine',
  'Premium spirits worth the investment.',
  '{
    "spirits": [
      {"category": "Whiskey", "brand": "Macallan 18", "price_range": "$400-500", "notes": "Sherry cask aged perfection"},
      {"category": "Gin", "brand": "Hendricks", "price_range": "$35-45", "notes": "Cucumber and rose petals"},
      {"category": "Vodka", "brand": "Grey Goose", "price_range": "$40-50", "notes": "French wheat, smooth finish"},
      {"category": "Rum", "brand": "Mount Gay XO", "price_range": "$60-80", "notes": "Barbados blend, complex"},
      {"category": "Tequila", "brand": "Don Julio 1942", "price_range": "$120-150", "notes": "Añejo excellence"},
      {"category": "Mezcal", "brand": "Del Maguey Vida", "price_range": "$35-45", "notes": "Smoky, authentic"},
      {"category": "Cognac", "brand": "Hennessy VS", "price_range": "$45-55", "notes": "Classic French brandy"}
    ]
  }'
),
(
  'Non-Alcoholic Options',
  'recommendations',
  'Coffee',
  'Sophisticated non-alcoholic cocktails and ingredients.',
  '{
    "mocktails": [
      {"name": "Virgin Mojito", "ingredients": ["Mint", "Lime", "Soda water", "Simple syrup"], "description": "All the flavor, none of the alcohol"},
      {"name": "Shirley Temple", "ingredients": ["Ginger ale", "Grenadine", "Cherry"], "description": "Classic kid-friendly cocktail"},
      {"name": "Arnold Palmer", "ingredients": ["Iced tea", "Lemonade"], "description": "Half and half perfection"},
      {"name": "Virgin Mary", "ingredients": ["Tomato juice", "Worcestershire", "Tabasco", "Celery salt"], "description": "Bloody Mary without vodka"},
      {"name": "Cucumber Basil Smash", "ingredients": ["Cucumber", "Basil", "Lime", "Soda water"], "description": "Fresh and herbaceous"}
    ],
    "na_spirits": [
      {"brand": "Seedlip", "type": "Gin alternative", "notes": "Herbal, complex"},
      {"brand": "Ritual Zero Proof", "type": "Various spirits", "notes": "Whiskey, gin, rum alternatives"},
      {"brand": "Monday Gin", "type": "Gin alternative", "notes": "Juniper-forward"},
      {"brand": "Lyre''s", "type": "Full range", "notes": "Wide variety of spirit alternatives"}
    ]
  }'
),
(
  'Garnishes',
  'recommendations',
  'List',
  'Essential garnishes and preparation techniques.',
  '{
    "citrus": [
      {"type": "Lemon twist", "preparation": "Use peeler, express oils over drink", "cocktails": ["Martini", "Negroni"]},
      {"type": "Lime wheel", "preparation": "1/4 inch thick slices", "cocktails": ["Margarita", "Mojito"]},
      {"type": "Orange peel", "preparation": "Wide strips, express oils", "cocktails": ["Old Fashioned", "Manhattan"]},
      {"type": "Grapefruit twist", "preparation": "Large peels for big drinks", "cocktails": ["Paloma", "Greyhound"]}
    ],
    "herbs": [
      {"type": "Mint sprig", "preparation": "Slap to release oils", "cocktails": ["Mojito", "Julep"]},
      {"type": "Rosemary", "preparation": "Lightly torch for aroma", "cocktails": ["Gin cocktails", "Smoky drinks"]},
      {"type": "Thyme", "preparation": "Gentle bruise", "cocktails": ["Herbal cocktails"]},
      {"type": "Basil", "preparation": "Clap between hands", "cocktails": ["Gin Basil Smash"]}
    ],
    "other": [
      {"type": "Olives", "preparation": "Quality matters, stuff with blue cheese", "cocktails": ["Martini", "Dirty Martini"]},
      {"type": "Cherries", "preparation": "Luxardo or Amarena preferred", "cocktails": ["Manhattan", "Old Fashioned"]},
      {"type": "Salt rim", "preparation": "Lime juice + coarse salt", "cocktails": ["Margarita", "Salty Dog"]},
      {"type": "Sugar rim", "preparation": "Simple syrup + superfine sugar", "cocktails": ["Lemon Drop", "Sidecar"]}
    ]
  }'
);

-- Create trigger for reference guides
CREATE TRIGGER update_reference_guides_updated_at 
    BEFORE UPDATE ON public.reference_guides 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
