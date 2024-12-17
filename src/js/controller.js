import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './view/recipeView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//api key 74b01cde-2f8d-4cf1-b357-ca8b782f7389
// console.log('hello, forkify');

const controlRecipes = async function () {
  try {
    console.log(window.location.origin);
    const id = window.location.hash.slice(1);
    // console.log('Id is ', id);

    if (!id) return;
    recipeView.renderSpinner();

    //1.Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
