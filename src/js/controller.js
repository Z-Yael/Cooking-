import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import paginationView from './view/paginationView';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//api key 74b01cde-2f8d-4cf1-b357-ca8b782f7389
// console.log('hello, forkify');

if (module.hot) {
  module.hot.accept(); //Come from parcel , not js code.
}

const controlRecipes = async function () {
  try {
    // console.log(window.location.origin);
    const id = window.location.hash.slice(1);
    // console.log('Id is ', id);

    if (!id) return;
    recipeView.renderSpinner();

    //Update results view to mark selected search result.
    resultsView.update(model.getSearchResultsPage());

    //1.Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(recipe);

    //Test
    // controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // console.log(resultsView);
    //1.Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //2. Load search results
    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results);
    //Render Pagination
    //Only render first 10 results
    resultsView.render(model.getSearchResultsPage());

    //Render initial pagination

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // console.log('Pagination Controller');
  // console.log(goToPage);
  //Render New Pagination

  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render new pagination

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe serving (in state)
  model.updateServings(newServings);

  // Update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
