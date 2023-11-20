class Card {
    constructor(heading, body, status) {
        this.heading = ko.observable(heading);
        this.body = ko.observable(body);
        this.status = ko.observable(status);
    }
}

class Column {
    constructor(title, status) {
        this.title = ko.observable(title);
        this.status = ko.observable(status); // Status value for filtering cards
        this.cards = ko.observableArray([]);
    }
}

class BoardViewModel {
    constructor() {

        this.moveCard = (data, event) => {
            const selectedStatus = event.target.value;
            const card = data;

            // Find the corresponding column for the selected status
            const column = this.columns().find(col => col.status() === selectedStatus);

            if (column) {
                // Remove the card from the current column
                const currentColumn = this.columns().find(col => col.status() === card.status());
                if (currentColumn) {
                    currentColumn.cards.remove(card);
                }

                // Update the card's status to the selected status
                card.status(selectedStatus);

                // Add the card to the new column
                column.cards.push(card);
            }
        };

        this.deleteCard = (column, card) => {
            column.cards.remove(card);
            this.cards.remove(card);
        };

        this.addNewCard = () => {
            const newHeading = prompt('Enter card heading:');
            const newBody = prompt('Enter card body:');

            if (newHeading && newBody) {
                const newCard = new Card(newHeading, newBody, 'ToDo');
                const toDoColumn = this.columns().find(col => col.status() === 'ToDo');

                if (toDoColumn) {
                    toDoColumn.cards.push(newCard);
                    this.cards.push(newCard);
                } else {
                    alert('To Do column not found!');
                }
            } else {
                alert('Please provide both heading and body for the new card.');
            }
        };

        this.columns = ko.observableArray([
            new Column("To Do", "ToDo"),
            new Column("In Progress", "InProgress"),
            new Column("Testing", "Testing"),
            new Column("Done", "Done")
        ]);



        this.columnTitles =  ["ToDo", "InProgress", "Testing", "Done"];


        this.cards = ko.observableArray([this.cardsPayload.cards]); // Store all cards
        this.cards.push(new Card("First Card", "First Card Body", "ToDo"));
        this.cards.push(new Card("Second Card", "Second Card Body", "ToDo"));
        this.cards.push(new Card("Third Card", "Third Card Body", "InProgress"));
        this.cards.push(new Card("Fourth Card", "Fourth Card Body", "InProgress"));
        this.cards.push(new Card("Fifth Card", "Fifth Card Body", "Testing"));
        this.cards.push(new Card("Sixth Card", "Sixth Card Body", "Testing"));
        this.cards.push(new Card("Seventh Card", "Seventh Card Body", "Done"));
        this.cards.push(new Card("Eighth Card", "Eighth Card Body", "Done"));
    }
    getCardsForColumn(column) {
        return this.cards().filter(card => card.status() === column.status());
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const viewModel = new BoardViewModel();
    ko.applyBindings(viewModel);
});
