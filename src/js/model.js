import { API_URL, RES_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    // console.log(data);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // console.error(`${err} 🔥🔥🔥🔥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);
    const { recipes } = data.data;

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // console.log(state.search.results);
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  // console.log(start, end);
  // console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};
