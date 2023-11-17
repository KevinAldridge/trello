import ko from 'knockout';

class Card {
    constructor(heading, body, status) {
        this.heading = ko.observable(heading);
        this.body = ko.observable(body);
        this.status = ko.observable(status);
    }
}

class Column {
    constructor(cards) {
        this.cards = ko.observableArray(cards.map(card => new Card(card.heading, card.body, card.status)));
    }
}

class BoardViewModel {
    constructor() {
        this.columns = ko.observableArray([
            new Column([
                { heading: 'Card 1', body: 'Body 1', status: 'Status 1' },
                { heading: 'Card 2', body: 'Body 2', status: 'Status 2' }
            ]),
            new Column([
                { heading: 'Card 3', body: 'Body 3', status: 'Status 3' },
                { heading: 'Card 4', body: 'Body 4', status: 'Status 4' }
            ]),
            new Column([
                { heading: 'Card 5', body: 'Body 5', status: 'Status 5' },
                { heading: 'Card 6', body: 'Body 6', status: 'Status 6' }
            ]),
            new Column([
                { heading: 'Card 7', body: 'Body 7', status: 'Status 7' },
                { heading: 'Card 8', body: 'Body 8', status: 'Status 8' }
            ])
        ]);
    }
}

ko.applyBindings(new BoardViewModel());
