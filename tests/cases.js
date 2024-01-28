//Test1 => 4.0
let test1 = {
    "MAT101": {"grade": "Bestått", "credit": "10"},
    "INF140": {"grade": "A", "credit": "10"},
    "INF100": {"grade": "B", "credit": "10"},
    "MNF130": {"grade": "C", "credit": "10"},
    "INF101": {"grade": "B", "credit": "10"},
    "INF142": {"grade": "B", "credit": "10"},
    "STAT110":{"grade": "E", "credit": "10"},
    "INF113": {"grade": "B", "credit": "10"},
    "INF102": {"grade": "B", "credit": "10"},
    "INF115": {"grade": "A", "credit": "10"},
    "INF143": {"grade": "B", "credit": "10"},
    "MAT121": {"grade": "D", "credit": "10"},
    "INF214": {"grade": "B", "credit": "10"},
    "INF226": {"grade": "B", "credit": "10"},
    "EXPHIL": {"grade": "B", "credit": "10"}
}



//Test1 => 4.4
const test2 =  {
    "MATXYZ": { "grade": "C", "credit": "10" },
    "MAT111": { "grade": "B", "credit": "10" },
    "INF100": { "grade": "A", "credit": "10" },
    "MNF130": { "grade": "A", "credit": "10" },
    "INF101": { "grade": "A", "credit": "10" },
    "INF214": { "grade": "A", "credit": "10" },
    "INF115": { "grade": "B", "credit": "10" },
    "INF122": { "grade": "B", "credit": "10" }
}

const correct1 =  {
    "INF140": {"grade": "A", "credit": "10"},
    "INF115": {"grade": "A", "credit": "10"}
}

const correct2 =  {
    "INF100": { "grade": "A", "credit": "10" },
    "MNF130": { "grade": "A", "credit": "10" },
    "INF101": { "grade": "A", "credit": "10" },
    "INF214": { "grade": "A", "credit": "10" }
}

//Test1 => 4.6
const test3 = {
    "MATÆØÅ": { "grade": "Bestått", "credit": "10" },
    "MAT111": { "grade": "B", "credit": "10" },
    "INF100": { "grade": "A", "credit": "10" },
    "MNF130": { "grade": "A", "credit": "10" },
    "INF101": { "grade": "A", "credit": "10" },
    "INF214": { "grade": "A", "credit": "10" },
    "INF115": { "grade": "B", "credit": "10" },
    "INF122": { "grade": "B", "credit": "10" }
}

module.exports = {test1, test2, correct1, correct2, test3};