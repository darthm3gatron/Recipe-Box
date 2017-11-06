import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class App extends Component {
  state = {
    recipe: [

    ],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: { recipeName: "", ingredients: [] }
  }
  //Deletes recipe
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({ recipes });
  }
  //Update newestRecipe
  updateNewRecipe(recipeName, ingredients) {
    this.setState({ newestRecipe: { recipeName: recipeName, ingredients: ingredients } });
  }
  //Save new recipe to recipes
  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({ recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
    this.setState({ newestRecipe: { recipeName: "", ingredients: [] } });
    this.close();
  }
  //Closes modal
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false })
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false })
    }
  }
  //Open modal
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  }
  //Updates recipeName
  updateRecipeName(recipeName, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName: recipeName, ingredients: recipes[currentIndex].ingredients }
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState(recipes);
  }
  //Updates ingredients
  updateIngredients(ingredients, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName: recipes[currentIndex].recipeName, ingredients: ingredients }
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  componentDidMount(){
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({recipes});
  }

  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;
    return (
      <div className="App container">
        {recipes.length > 0 && (
          <div>
            <Accordion>
              {recipes.map((recipe, index) => (
                <Panel header={recipe.recipeName} eventKey={index} key={index}>
                  <ol>
                    {recipe.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  <ButtonToolbar>
                    <Button bStyle="danger" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                    <Button bStyle="default" onClick={(event) => this.open("showEdit", index)}>Edit Recipe</Button>
                  </ButtonToolbar>
                </Panel>

              ))}
            </Accordion>
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={recipes[currentIndex].recipeName}
                    placeholder="Enter text" onChange={(event) => this.updateRecipeName(event.target.value.split(','), currentIndex)}
                  ></FormControl>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <Modal show={this.statee.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={(event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                ></FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="textarea"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Ingredients (Seperate By Commas)"
                  onChange={(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.valeu.split(','))}
                  value={newestRecipe.ingredients}
                ></FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(event) => this.saveNewRecipe()}>Save New Recipe</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        <Button bStyle="primary" onClick={(event) => this.open("showAdd", currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
