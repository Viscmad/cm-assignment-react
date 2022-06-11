import React from 'react';
import { useNavigate } from 'react-router-dom';
import NutrientItem from '../components/NutrientItem';
import getRecipes from '../api/getRecipes';
import getUser from '../api/getUser';
import trophyIcon from '../assets/trophy.svg';
import './RecipesView.css';
import SearchInput from '../components/SearchInput';
import SpinnerLoader from '../components/SpinnerLoader';
import EmptyResultMessage from '../components/EmptyListMessage';

const RecipesView = () => {
	const navigate = useNavigate();
	const [state, setState] = React.useState({
		isFiltered: false,
		recipes: [],
		filteredRecipes: [],
		user: {},
		error: false,
		loading: true,
	});

	const getEnergy = React.useCallback(
		(recipeUnit, value) => {
			let label;
			if (recipeUnit !== state.user.units.energy) {
				if (recipeUnit === 'kilojoule') {
					label = 'kCal';
					value = value / 4.184;
				} else {
					label = 'kJ';
					value = value * 4.184;
				}
			} else {
				if (recipeUnit === 'kilojoule') {
					label = 'kJ';
				} else {
					label = 'kCal';
				}
			}
			return {
				label,
				value,
			};
		},
		[state.user]
	);

	const filterRecipes = React.useCallback(
		(value) => {
			setState({
				...state,
				isFiltered: value !== '',
				filteredRecipes: state.recipes.filter(({ name }) =>
					name.toLowerCase().includes(value.toLowerCase())
				),
			});
		},
		[setState, state]
	);

	const round = React.useCallback((num, decimalPlaces = 2) => {
		const p = Math.pow(10, decimalPlaces);
		return Math.round(num * p) / p;
	}, []);

	const goToSingleRecipe = React.useCallback(
		(id) => {
			navigate(`/recipe/${id}`, { replace: true });
		},
		[navigate]
	);

	const fetchRecipesData = React.useCallback(async () => {
		try {
			const recipes = await getRecipes();
			const user = await getUser();
			if (!recipes.length) {
				setState({
					...state,
					error: true,
					loading: false,
				});
			} else {
				setState({
					...state,
					recipes,
					user,
					loading: false,
				});
			}
		} catch (e) {
			console.error(e);
		}
		// Dependencies array left blank to stop recursive call behavior
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderNutrientItem = (nutrientItem, index, value, unit) => {
		const getUnitLabel = () => {
			switch (unit) {
				// TODO: add cases as app cases if when needed
				case 'gram':
					return 'g';
				default:
					return '';
			}
		};
		const getName = () => {
			if (index !== 0) return null;
			if (nutrientItem === 'energy') {
				return getEnergy(unit, value).label;
			}
			return nutrientItem.replace(/./, (c) => c.toUpperCase());
		};
		const getValue = () => {
			if (nutrientItem === 'energy') {
				return round(getEnergy(unit, value).value);
			}
			return value + getUnitLabel();
		};
		return (
			<NutrientItem
				name={getName()}
				value={getValue()}
				className={nutrientItem}
			/>
		);
	};

	// Fetch view data on mount
	React.useEffect(() => {
		fetchRecipesData();
	}, [fetchRecipesData]);

	const recipeList = state.isFiltered ? state.filteredRecipes : state.recipes;
	return (
		<div className="recipes">
			{!state.error && (
				<>
					<SearchInput
						placeholder="Search foods and servings&hellip;"
						className="search"
						onChange={(value) => {
							filterRecipes(value);
						}}
					/>
					{state.loading ? (
						<SpinnerLoader />
					) : (
						<div className="list">
							{!recipeList.length && (
								<EmptyResultMessage
									message={
										state.isFiltered
											? 'No results with the applied search/filters!'
											: 'No recipes to display!'
									}
								/>
							)}
							{recipeList.map((recipe, index) => (
								<div
									key={index}
									className="recipe-item"
									onClick={() => goToSingleRecipe(recipe.id)}
								>
									<div className="recipe-name">{recipe.name}</div>
									<img
										className="recipeImage"
										src={recipe.image}
										alt={recipe.name}
									/>
									<div className="nutrients">
										{Object.keys(recipe.nutrients).map((nutrientName) => {
											const { value, unit } = recipe.nutrients[nutrientName];
											return renderNutrientItem(
												nutrientName,
												index,
												value,
												unit
											);
										})}
									</div>
									<div className="tags">
										{recipe.isPremium && (
											<div className="tag premium">
												<img className="trophy" src={trophyIcon} />
												Premium
											</div>
										)}
										{recipe.tags.map((tag) => (
											<div className="tag" key={tag}>
												{tag}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</>
			)}
			{!recipeList.length && state.error && <div>Unable to load recipes</div>}
		</div>
	);
};

export default RecipesView;
