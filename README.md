## Refactor notes

###DONE:

- Makes search results case-insensitive [Reason: Picked from mentioned TODO]
- Adds a generic component [Reason: Picked from mentioned TODO]
- Moves fetchRecipesData out of useEffect [Reason: Created a
separate function wrapped in React.callback with empty dependencies
array left blank to stop recursive call behaviour]
- Fixes error message flashes in the initial load [Reason: Picked from mentioned FIXME]
- Adds loading indicator [Reason: Picked from mentioned TODO]
- Adds alt attribute to the recipe item image [Reason: Picked from linting]
- Adds empty results message [Reason: To provided user feed back]
- Makes consolidated renderNutrientItem function [Reason: Removes code smells]

###TODO:

- Remove API calls form component and moves it to redux [Reason: Separation of concern, makes RecipesView component only responsible for rendering out the list rather than having 3 responsibilities - fetch user, fetch recipes and render recipes list]
