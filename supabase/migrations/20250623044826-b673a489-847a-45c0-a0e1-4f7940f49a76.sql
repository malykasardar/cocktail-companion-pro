
-- Create the main cocktails table
CREATE TABLE public.cocktails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  drink_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Classic', 'Tiki', 'Dessert', 'Mocktail', 'Modern', 'Shooter', 'Frozen', 'Hot')),
  flavor_profile TEXT[] NOT NULL DEFAULT '{}', -- Array of flavors
  strength TEXT NOT NULL CHECK (strength IN ('Low', 'Medium', 'Strong')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Intermediate', 'Advanced')),
  ingredients TEXT NOT NULL,
  measurements TEXT NOT NULL,
  tools TEXT NOT NULL,
  glass_type TEXT NOT NULL CHECK (glass_type IN ('Coupe', 'Highball', 'Rocks', 'Martini', 'Shot', 'Hurricane', 'Collins', 'Wine', 'Flute', 'Mug', 'Snifter')),
  steps TEXT NOT NULL,
  garnish TEXT,
  tips TEXT,
  video_link TEXT,
  abv_percentage DECIMAL(4,2), -- Allows for 2 decimal places (e.g., 15.25%)
  serving_size TEXT DEFAULT '1 cocktail',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_cocktails_drink_name ON public.cocktails(drink_name);
CREATE INDEX idx_cocktails_category ON public.cocktails(category);
CREATE INDEX idx_cocktails_strength ON public.cocktails(strength);
CREATE INDEX idx_cocktails_difficulty ON public.cocktails(difficulty);
CREATE INDEX idx_cocktails_flavor_profile ON public.cocktails USING GIN (flavor_profile);

-- Insert sample cocktail recipes
INSERT INTO public.cocktails (
  drink_name, category, flavor_profile, strength, difficulty, ingredients, measurements, tools, glass_type, steps, garnish, tips, video_link, abv_percentage, serving_size
) VALUES 
-- Classic Cocktails
('Old Fashioned', 'Classic', '{"Sweet", "Bitter"}', 'Strong', 'Easy', 'Bourbon whiskey, Sugar cube, Angostura bitters, Orange peel', '2 oz bourbon, 1 sugar cube, 2-3 dashes bitters', 'Rocks glass, Bar spoon, Muddler', 'Rocks', '1. Muddle sugar cube with bitters in glass. 2. Add bourbon and ice. 3. Stir gently. 4. Express orange peel oils over drink.', 'Orange peel', 'Use a large ice cube for slower dilution', '', 35.00, '1 cocktail'),

('Martini', 'Classic', '{"Clean", "Herbal"}', 'Strong', 'Easy', 'Gin, Dry vermouth, Olives or lemon twist', '2.5 oz gin, 0.5 oz dry vermouth', 'Mixing glass, Bar spoon, Strainer', 'Martini', '1. Add gin and vermouth to mixing glass with ice. 2. Stir for 30 seconds. 3. Strain into chilled martini glass.', 'Olives or lemon twist', 'Chill the glass beforehand for best results', '', 28.00, '1 cocktail'),

('Manhattan', 'Classic', '{"Sweet", "Complex"}', 'Strong', 'Easy', 'Rye whiskey, Sweet vermouth, Angostura bitters, Maraschino cherry', '2 oz rye whiskey, 1 oz sweet vermouth, 2 dashes bitters', 'Mixing glass, Bar spoon, Strainer', 'Coupe', '1. Combine all ingredients in mixing glass with ice. 2. Stir for 30 seconds. 3. Strain into coupe glass.', 'Maraschino cherry', 'Use high-quality vermouth for best flavor', '', 32.00, '1 cocktail'),

('Negroni', 'Classic', '{"Bitter", "Herbal", "Sweet"}', 'Medium', 'Easy', 'Gin, Campari, Sweet vermouth, Orange peel', '1 oz gin, 1 oz Campari, 1 oz sweet vermouth', 'Rocks glass, Bar spoon', 'Rocks', '1. Add all ingredients to rocks glass with ice. 2. Stir gently. 3. Express orange peel oils over drink.', 'Orange peel', 'Equal parts make this cocktail perfectly balanced', '', 24.00, '1 cocktail'),

('Whiskey Sour', 'Classic', '{"Sour", "Sweet"}', 'Medium', 'Easy', 'Bourbon whiskey, Fresh lemon juice, Simple syrup, Egg white (optional)', '2 oz bourbon, 0.75 oz lemon juice, 0.75 oz simple syrup, 1 egg white', 'Shaker, Strainer', 'Coupe', '1. Dry shake all ingredients without ice. 2. Add ice and shake vigorously. 3. Double strain into coupe glass.', 'Cherry and orange slice', 'Dry shake first for better foam if using egg white', '', 22.00, '1 cocktail'),

('Daiquiri', 'Classic', '{"Sour", "Sweet"}', 'Medium', 'Easy', 'White rum, Fresh lime juice, Simple syrup', '2 oz white rum, 1 oz lime juice, 0.5 oz simple syrup', 'Shaker, Strainer', 'Coupe', '1. Shake all ingredients with ice. 2. Double strain into chilled coupe glass.', 'Lime wheel', 'Use fresh lime juice for best results', '', 20.00, '1 cocktail'),

('Margarita', 'Classic', '{"Sour", "Sweet"}', 'Medium', 'Easy', 'Tequila blanco, Fresh lime juice, Triple sec, Salt', '2 oz tequila, 1 oz lime juice, 0.5 oz triple sec', 'Shaker, Strainer', 'Rocks', '1. Salt rim of glass. 2. Shake all ingredients with ice. 3. Strain over fresh ice.', 'Lime wheel', 'Use 100% agave tequila for best flavor', '', 18.00, '1 cocktail'),

('Mojito', 'Classic', '{"Herbal", "Sweet", "Sour"}', 'Medium', 'Easy', 'White rum, Fresh mint leaves, Fresh lime juice, Simple syrup, Soda water', '2 oz white rum, 8-10 mint leaves, 0.75 oz lime juice, 0.5 oz simple syrup, Soda water', 'Highball glass, Muddler', 'Highball', '1. Gently muddle mint in glass. 2. Add rum, lime juice, and syrup. 3. Fill with ice and top with soda water.', 'Fresh mint sprig and lime wheel', 'Gently muddle mint to avoid bitterness', '', 12.00, '1 cocktail'),

('Cosmopolitan', 'Modern', '{"Sweet", "Sour"}', 'Medium', 'Easy', 'Vodka, Cranberry juice, Fresh lime juice, Triple sec', '1.5 oz vodka, 0.5 oz cranberry juice, 0.75 oz lime juice, 0.5 oz triple sec', 'Shaker, Strainer', 'Martini', '1. Shake all ingredients with ice. 2. Double strain into chilled martini glass.', 'Lime wheel', 'Use just a splash of cranberry for color', '', 19.00, '1 cocktail'),

('Pina Colada', 'Tiki', '{"Sweet", "Tropical"}', 'Medium', 'Easy', 'White rum, Coconut cream, Pineapple juice', '2 oz white rum, 1 oz coconut cream, 3 oz pineapple juice', 'Blender', 'Hurricane', '1. Blend all ingredients with ice until smooth. 2. Pour into hurricane glass.', 'Pineapple wedge and cherry', 'Use frozen pineapple for better texture', '', 12.00, '1 cocktail'),

-- Tiki Cocktails
('Mai Tai', 'Tiki', '{"Sweet", "Complex", "Tropical"}', 'Strong', 'Intermediate', 'Dark rum, Light rum, Orange curacao, Orgeat syrup, Fresh lime juice', '1 oz dark rum, 1 oz light rum, 0.5 oz orange curacao, 0.5 oz orgeat, 0.75 oz lime juice', 'Shaker, Strainer', 'Rocks', '1. Shake all ingredients with ice. 2. Strain over crushed ice.', 'Mint sprig and lime wheel', 'Use high-quality rums for best results', '', 25.00, '1 cocktail'),

('Zombie', 'Tiki', '{"Sweet", "Spicy", "Complex"}', 'Strong', 'Advanced', 'Light rum, Dark rum, Overproof rum, Lime juice, Falernum, Grenadine, Absinthe', '1 oz light rum, 1 oz dark rum, 1 oz overproof rum, 0.75 oz lime juice, 0.5 oz falernum, 0.25 oz grenadine, Few drops absinthe', 'Shaker, Strainer', 'Hurricane', '1. Shake all ingredients except overproof rum with ice. 2. Strain over crushed ice. 3. Float overproof rum on top.', 'Mint sprig', 'Originally limited to 2 per customer due to strength', '', 35.00, '1 cocktail'),

('Blue Hawaiian', 'Tiki', '{"Sweet", "Tropical"}', 'Medium', 'Easy', 'Light rum, Blue curacao, Pineapple juice, Coconut cream', '1 oz light rum, 1 oz blue curacao, 2 oz pineapple juice, 1 oz coconut cream', 'Blender', 'Hurricane', '1. Blend all ingredients with ice until smooth. 2. Pour into hurricane glass.', 'Pineapple wedge and cherry', 'Use quality coconut cream for richness', '', 14.00, '1 cocktail'),

('Painkiller', 'Tiki', '{"Sweet", "Tropical"}', 'Medium', 'Easy', 'Dark rum, Pineapple juice, Orange juice, Coconut cream', '2 oz dark rum, 4 oz pineapple juice, 1 oz orange juice, 1 oz coconut cream', 'Shaker, Strainer', 'Hurricane', '1. Shake all ingredients with ice. 2. Strain over ice.', 'Orange slice and cherry', 'Traditionally made with Pussers Rum', '', 16.00, '1 cocktail'),

-- Dessert Cocktails
('Mudslide', 'Dessert', '{"Sweet", "Rich"}', 'Medium', 'Easy', 'Vodka, Coffee liqueur, Irish cream, Heavy cream', '1 oz vodka, 1 oz coffee liqueur, 1 oz Irish cream, 0.5 oz heavy cream', 'Shaker, Strainer', 'Rocks', '1. Shake all ingredients with ice. 2. Strain over ice.', 'Whipped cream and chocolate shavings', 'Can be made frozen in a blender', '', 20.00, '1 cocktail'),

('White Russian', 'Dessert', '{"Sweet", "Rich"}', 'Medium', 'Easy', 'Vodka, Coffee liqueur, Heavy cream', '2 oz vodka, 1 oz coffee liqueur, 1 oz heavy cream', 'Rocks glass, Bar spoon', 'Rocks', '1. Add vodka and coffee liqueur to glass with ice. 2. Float cream on top.', 'None', 'Do not stir if you want the layered look', '', 18.00, '1 cocktail'),

('Brandy Alexander', 'Dessert', '{"Sweet", "Rich"}', 'Medium', 'Easy', 'Cognac, Crème de cacao, Heavy cream', '1.5 oz cognac, 1 oz crème de cacao, 1 oz heavy cream', 'Shaker, Strainer', 'Coupe', '1. Shake all ingredients with ice. 2. Double strain into coupe glass.', 'Nutmeg', 'Use dark crème de cacao for richer flavor', '', 20.00, '1 cocktail'),

-- Modern Cocktails
('Aperol Spritz', 'Modern', '{"Bitter", "Sweet"}', 'Low', 'Easy', 'Aperol, Prosecco, Soda water', '3 oz Aperol, 3 oz Prosecco, Splash of soda water', 'Wine glass', 'Wine', '1. Add Aperol to glass with ice. 2. Top with Prosecco and soda water. 3. Stir gently.', 'Orange slice', 'Use plenty of ice for proper dilution', '', 8.00, '1 cocktail'),

('Espresso Martini', 'Modern', '{"Bitter", "Sweet"}', 'Medium', 'Intermediate', 'Vodka, Coffee liqueur, Fresh espresso, Simple syrup', '2 oz vodka, 0.5 oz coffee liqueur, 1 oz fresh espresso, 0.25 oz simple syrup', 'Shaker, Strainer', 'Martini', '1. Shake all ingredients vigorously with ice. 2. Double strain into chilled martini glass.', 'Three coffee beans', 'Use hot fresh espresso for best foam', '', 20.00, '1 cocktail'),

-- Shooters
('Kamikaze', 'Shooter', '{"Sour", "Sweet"}', 'Strong', 'Easy', 'Vodka, Triple sec, Lime juice', '0.5 oz vodka, 0.5 oz triple sec, 0.5 oz lime juice', 'Shaker, Strainer', 'Shot', '1. Shake all ingredients with ice. 2. Strain into shot glass.', 'None', 'Serve immediately after making', '', 30.00, '1 shot'),

('Lemon Drop Shot', 'Shooter', '{"Sour", "Sweet"}', 'Strong', 'Easy', 'Vodka, Lemon juice, Simple syrup, Sugar rim', '1 oz vodka, 0.25 oz lemon juice, 0.25 oz simple syrup', 'Shaker, Strainer', 'Shot', '1. Sugar rim of shot glass. 2. Shake all ingredients with ice. 3. Strain into glass.', 'Sugar rim', 'Use fresh lemon juice for best flavor', '', 35.00, '1 shot'),

-- Hot Cocktails
('Hot Toddy', 'Hot', '{"Sweet", "Spicy", "Warm"}', 'Medium', 'Easy', 'Whiskey, Honey, Lemon juice, Hot water, Cinnamon stick', '2 oz whiskey, 1 tbsp honey, 0.5 oz lemon juice, 4 oz hot water, 1 cinnamon stick', 'Mug, Bar spoon', 'Mug', '1. Add honey and lemon juice to mug. 2. Add whiskey and hot water. 3. Stir with cinnamon stick.', 'Cinnamon stick and lemon wheel', 'Perfect remedy for cold weather', '', 15.00, '1 cocktail'),

('Irish Coffee', 'Hot', '{"Sweet", "Bitter", "Rich"}', 'Medium', 'Easy', 'Irish whiskey, Hot coffee, Brown sugar, Heavy cream', '1.5 oz Irish whiskey, 6 oz hot coffee, 1 tsp brown sugar, 1 oz heavy cream', 'Mug, Bar spoon', 'Mug', '1. Add sugar to mug, pour in coffee and stir. 2. Add whiskey. 3. Float lightly whipped cream on top.', 'Whipped cream', 'Do not over-whip the cream', '', 12.00, '1 cocktail'),

-- Mocktails
('Virgin Mojito', 'Mocktail', '{"Herbal", "Sweet", "Sour"}', 'Low', 'Easy', 'Fresh mint leaves, Lime juice, Simple syrup, Soda water', '8-10 mint leaves, 0.75 oz lime juice, 0.5 oz simple syrup, Soda water', 'Highball glass, Muddler', 'Highball', '1. Gently muddle mint in glass. 2. Add lime juice and syrup. 3. Fill with ice and top with soda water.', 'Fresh mint sprig and lime wheel', 'Do not over-muddle the mint', '', 0.00, '1 cocktail'),

('Shirley Temple', 'Mocktail', '{"Sweet", "Fruity"}', 'Low', 'Easy', 'Ginger ale, Grenadine, Maraschino cherry', '6 oz ginger ale, 0.5 oz grenadine, Maraschino cherry', 'Highball glass', 'Highball', '1. Fill glass with ice. 2. Add ginger ale. 3. Slowly pour grenadine for color. 4. Garnish with cherry.', 'Maraschino cherry', 'Named after the famous child actress', '', 0.00, '1 cocktail'),

-- Frozen Cocktails
('Frozen Margarita', 'Frozen', '{"Sour", "Sweet", "Slushy"}', 'Medium', 'Easy', 'Tequila blanco, Triple sec, Lime juice, Simple syrup, Ice', '2 oz tequila, 1 oz triple sec, 1 oz lime juice, 0.5 oz simple syrup, 1 cup ice', 'Blender', 'Rocks', '1. Blend all ingredients until smooth. 2. Pour into salt-rimmed glass.', 'Lime wheel', 'Perfect for hot summer days', '', 16.00, '1 cocktail'),

('Frozen Daiquiri', 'Frozen', '{"Sour", "Sweet", "Slushy"}', 'Medium', 'Easy', 'White rum, Lime juice, Simple syrup, Ice', '2 oz white rum, 1 oz lime juice, 0.5 oz simple syrup, 1 cup ice', 'Blender', 'Hurricane', '1. Blend all ingredients until smooth. 2. Pour into hurricane glass.', 'Lime wheel', 'Classic frozen version of the daiquiri', '', 18.00, '1 cocktail');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_cocktails_updated_at 
    BEFORE UPDATE ON public.cocktails 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
