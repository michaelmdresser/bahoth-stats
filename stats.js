// const SPEED_INDEX = 0
// const MIGHT_INDEX = 1
// const SANITY_INDEX = 2
// const KNOWLEDGE_INDEX = 3
// const STAT_NAMES = ["Speed", "Might", "Sanity", "Knowledge"]
const STATS_TO_INDEX = {
    "Speed": 0,
    "Might": 1,
    "Sanity": 2,
    "Knowledge": 3
}

// https://stackoverflow.com/questions/29462958/unicode-characters-not-rendering-properly-in-html5-canvas
function toUTF16(codePoint) {
    var TEN_BITS = parseInt('1111111111', 2);
    function u(codeUnit) {
        return '\\u'+codeUnit.toString(16).toUpperCase();
    }

    if (codePoint <= 0xFFFF) {
        return u(codePoint);
    }
    codePoint -= 0x10000;

    // Shift right to get to most significant 10 bits
    var leadSurrogate = 0xD800 + (codePoint >> 10);

    // Mask to get least significant 10 bits
    var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

    return u(leadSurrogate) + u(tailSurrogate);
}

class Explorer {
    constructor(
        name,
        stat_arrays,
        initial_index_array,
    ) {
        // TODO: make some assertions
        this.name = name
        this.stat_arrays = stat_arrays
        this.initial_index_array = initial_index_array
        this.current_index_array = initial_index_array
   }

   increase_stat(stat_index) {
       if (this.current_index_array[stat_index] < this.stat_arrays[stat_index].length - 1) {
           console.log("increasing")
           this.current_index_array[stat_index] += 1
       }
   }

   decrease_stat(stat_index) {
       if (this.current_index_array[stat_index] > 0) {
           console.log("decreasing")
           this.current_index_array[stat_index] -= 1
       }
   }

   // lower, current, upper
   get_stat_strings(stat_index) {
       var lower = ""
       var current = "" + this.stat_arrays[stat_index][this.current_index_array[stat_index]] + " "
       var upper = ""

       for (var i = 0; i < this.stat_arrays[stat_index].length; i++) {
           if (i < this.current_index_array[stat_index]) {
               lower += this.stat_arrays[stat_index][i] + " "
           } else if (i > this.current_index_array[stat_index]) {
               upper += this.stat_arrays[stat_index][i] + " "
           }
       }

       return {
           lower: lower,
           current: current,
           upper: upper
       }
   }

   get_stat_chunk(stat_index) {
       var stat_strings = this.get_stat_strings(stat_index)
       var lower = document.createElement("span")
       lower.appendChild(document.createTextNode(stat_strings.lower))
       var current = document.createElement("span")
       current.appendChild(document.createTextNode(stat_strings.current))
       current.style.color = "red"
       var upper = document.createElement("span")
       upper.appendChild(document.createTextNode(stat_strings.upper))

       var stat_chunk = document.createElement("div")
       stat_chunk.style.fontSize = "26px"
       stat_chunk.id = this.name + "-stat-" + stat_index

       var decrement_button = document.createElement("button")
       decrement_button.innerHTML = "-"
       decrement_button.style.paddingLeft = "12px"
       decrement_button.style.paddingRight = "12px"
       var t = this
       decrement_button.addEventListener("click", function() {
           t.decrease_stat(stat_index)
           var current_stat = document.getElementById(t.name + "-stat-" + stat_index)
           current_stat.parentNode.replaceChild(t.get_stat_chunk(stat_index), current_stat)
       })
       stat_chunk.appendChild(decrement_button)

       stat_chunk.appendChild(lower)
       stat_chunk.appendChild(current)
       stat_chunk.appendChild(upper)

       

       var increment_button = document.createElement("button")
       increment_button.innerHTML = "+"
       increment_button.style.paddingLeft = "12px"
       increment_button.style.paddingRight = "12px"
       var t = this
       increment_button.addEventListener("click", function() {
           t.increase_stat(stat_index)
           var current_stat = document.getElementById(t.name + "-stat-" + stat_index)
           current_stat.parentNode.replaceChild(t.get_stat_chunk(stat_index), current_stat)
       })

       stat_chunk.appendChild(increment_button)

       return stat_chunk
   }

   get_explorer_div() {
       var div = document.createElement("div")
       var name = document.createElement("h3")
       name.appendChild(document.createTextNode(this.name))
       div.appendChild(name)

       Object.keys(STATS_TO_INDEX).forEach(item => {
           var stat_name = document.createElement("h5")
           stat_name.appendChild(document.createTextNode(item))
           var stat_chunk = this.get_stat_chunk(STATS_TO_INDEX[item])

           div.appendChild(stat_name)
           div.appendChild(stat_chunk)
       })

       return div
   }
    
}

// const deathstring = "_\uD83D\uDC80_"
const deathstring = "X"

function create_explorers() {
    var explorers_raw = [
        [
            "Heather Granville",
            [
                [deathstring, 3, 3, 4, 5, 6, 6, 7, 8],
                [deathstring, 3, 3, 3, 4, 5, 6, 7, 8],
                [deathstring, 3, 3, 3, 4, 5, 6, 6, 6],
                [deathstring, 2, 3, 3, 4, 5, 6, 7, 8]
            ], 
            [3, 3, 3, 5]
        ],
        [
            "Ox Bellows",
            [
                [deathstring, 2, 2, 2, 3, 4, 5, 5, 6],
                [deathstring, 4, 5, 5, 6, 6, 7, 8, 8],
                [deathstring, 2, 2, 3, 4, 5, 5, 6, 7],
                [deathstring, 2, 2, 3, 3, 5, 5, 6, 6]
            ],
            [5, 3, 3, 3]
        ],
        [
            "Father Rhinehardt",
            [
                [deathstring, 2, 3, 3, 4, 5, 6, 7, 7],
                [deathstring, 1, 2, 2, 4, 4, 5, 5, 7],
                [deathstring, 3, 4, 5, 5, 6, 7, 7, 8],
                [deathstring, 1, 3, 3, 4, 5, 6, 6, 8]
            ],
            [3, 3, 5, 4]
        ],
        [
            "Peter Akimoto",
            [
                [deathstring, 3, 3, 3, 4, 6, 6, 7, 7],
                [deathstring, 2, 3, 3, 4, 5, 5, 6, 8],
                [deathstring, 3, 4, 4, 4, 5, 6, 6, 7],
                [deathstring, 3, 4, 4, 5, 6, 7, 7, 8]
            ],
            [4, 3, 4, 3]
        ],
        [
            "Missy Dubourde",
            [
                [deathstring, 3, 4, 5, 6, 6, 6, 7, 7],
                [deathstring, 2, 3, 3, 3, 4, 5, 6, 7],
                [deathstring, 1, 2, 3, 4, 5, 5, 6, 7],
                [deathstring, 2, 3, 4, 4, 5, 6, 6, 6]
            ],
            [3, 4, 3, 4]
        ],
        [
            "Madame Zostra",
            [
                [deathstring, 2, 3, 3, 5, 5, 6, 6, 7],
                [deathstring, 2, 3, 3, 4, 5, 5, 5, 6],
                [deathstring, 4, 4, 4, 5, 6, 7, 8, 8],
                [deathstring, 1, 3, 4, 4, 4, 5, 6, 6]
            ],
            [3, 4, 3, 4]
        ],
        [
            "Darrin \"Flash\" Williams",
            [
                [deathstring, 4, 4, 4, 5, 6, 7, 7, 8],
                [deathstring, 2, 3, 3, 4, 5, 6, 6, 7],
                [deathstring, 1, 2, 3, 4, 5, 5, 5, 7],
                [deathstring, 2, 3, 3, 4, 5, 5, 5, 7]
            ],
            [5, 3, 3, 3]
        ],
        [
            "Professor Longfellow",
            [
                [deathstring, 2, 2, 4, 4, 5, 5, 6, 6],
                [deathstring, 1, 2, 3, 4, 5, 5, 6, 6],
                [deathstring, 1, 3, 3, 4, 5, 5, 6, 7],
                [deathstring, 4, 5, 5, 5, 5, 6, 7, 8]
            ],
            [4, 3, 3, 5]
        ],
        [
            "Jenny LeClerc",
            [
                [deathstring, 2, 3, 4, 4, 4, 5, 6, 8],
                [deathstring, 3, 4, 4, 4, 4, 5, 6, 8],
                [deathstring, 1, 1, 2, 4, 4, 4, 5, 6],
                [deathstring, 2, 3, 3, 4, 4, 5, 6, 8]
            ],
            [4, 3, 5, 3]
        ]
    ]

    var explorers_objects = []

    explorers_raw.forEach(item => {
        explorers_objects.push(new Explorer(item[0], item[1], item[2]))
    })

    return explorers_objects
}

var explorers = create_explorers()

explorers.forEach(e => {
    document.body.appendChild(e.get_explorer_div())
    document.body.appendChild(document.createElement("br"))
    document.body.appendChild(document.createElement("br"))
})
