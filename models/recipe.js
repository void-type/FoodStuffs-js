
function Recipe(nm, ing, ins, rat, tags) {
    this.Name = nm;
    this.Ingredients = ing;
    this.Instructions = ins;
    this.Rating = 0;
    this.Tags = tags;
    this.CreatedOn = Date.now;
    this.ModifiedOn = Date.now;

    var ratint = parseInt(rat);
    if (ratint >= 0 && ratint <= 10 && !ratint.isNaN) this.Rating = ratint || 0;
}

module.exports = Recipe;