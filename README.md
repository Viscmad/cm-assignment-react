## Refactor notes

###DONE:

- _Makes search results case-insensitive_ [Reason: Picked from mentioned TODO]
- _Adds a generic component_ [Reason: Picked from mentioned TODO]
- _Moves fetchRecipesData out of useEffect_ [Reason: Created a
separate function wrapped in React.callback with empty dependencies
array left blank to stop recursive call behaviour]
- _Fixes error message flashes in the initial load_ [Reason: Picked from mentioned FIXME]
- _Adds loading indicator_ [Reason: Picked from mentioned TODO]
- _Adds alt attribute to the recipe item image_ [Reason: Picked from linting]
- _Adds empty results message_ [Reason: To provided user feed back]
- _Makes consolidated renderNutrientItem function_ [Reason: Removes code smells]

###TODO:

- _Remove API calls form component and moves it to redux_ [Reason: Separation of concern, makes RecipesView component only responsible for rendering out the list rather than having 3 responsibilities - fetch user, fetch recipes and render recipes list]
