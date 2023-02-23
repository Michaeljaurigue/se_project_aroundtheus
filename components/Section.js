//We can create a class called Section that will be used to create a section that can be used in two different places.
//This will make our code more efficient because we won't have to write the same code twice.
//We will also be able to make changes to the code in one place and those changes will be reflected in both places.
//This is important because it will make our code easier to maintain.
//It's a good idea to create a class for any element that will be used in more than one place.
//Many coders create a class for every element that will be used in more than one place.
//This is not necessary because it will make your code more difficult to read and maintain.

//This class is used to create a section that can be used in two different places.
class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._cardsDisplayed = document.querySelector(classSelector);
  }

  //this method will be used to render the initial list of cards
  renderItems(data) {
    data.forEach((item) => {
      //for each item in the array, call the renderer function
      const card = this._renderer(item);
      //Then append the card to the end of the list
      this._cardsDisplayed.append(item);
    });
  }
  // this method will be used to add a new card to the page
  addItem(item) {
    //append the card to the end of the list
    //I think this is the same as prepend
    const card = this._renderer(item);
    this._cardsDisplayed.prepend(item);
  }
}

export default Section;
